// Helios · physics — particle pool + springs + instancing.
// The pool is allocated ONCE at the tier budget; nothing allocates per
// frame. Owns creation, pooling, live positions, colors, lifecycle and
// the InstancedMesh. Springs are a separate update step (updateSprings)
// so the engine loop can order forces → springs → particles explicitly.
//
// Per-particle data model (every particle knows):
//   home        — permanent scatter-cloud anchor, set once, never mutated
//   velocity    — current velocity, spring + force driven
//   noiseOffset — per-particle random phase, staggers Flow's fall cycle
//   target      — the live spring target (morph states write only here)
//   life        — 0-1, Flow's per-particle fall-cycle position
//   sectionPull — persistent section-gravity offset, see applySectionTargets
//   depthSpeed  — fixed fall-speed multiplier (back/mid/front band), gives
//                 the flow depth without ever touching particle size

import { InstancedMesh, SphereGeometry, Matrix4, Vector3, DynamicDrawUsage } from 'three'
import { HeliosConfig } from '../engine/HeliosConfig'
import type { HeliosMaterials } from '../materials/HeliosMaterials'
import type { EntitySample } from '../entity/HeliosEntity'

const _m = new Matrix4()

export class HeliosParticles {
  readonly mesh: InstancedMesh
  /** pool size (allocated once) */
  readonly capacity: number
  /** currently rendered count (adaptive quality may lower it) */
  active: number

  readonly positions: Float32Array
  readonly home: Float32Array
  readonly target: Float32Array
  readonly velocity: Float32Array
  readonly noiseOffset: Float32Array
  readonly life: Float32Array
  /** persistent world-space offset toward the nearest active section
   *  target, smoothed frame-to-frame and decayed to zero out of range —
   *  read (added into the flow target) by HeliosMorph's Flow state, since
   *  Flow recomputes `target` from a pure time formula every frame and a
   *  bare velocity impulse would get erased by the spring chasing that
   *  fresh target the very next tick. */
  readonly sectionPull: Float32Array
  readonly depthSpeed: Float32Array
  private sizes: Float32Array

  constructor(sample: EntitySample, materials: HeliosMaterials) {
    this.capacity = sample.sizes.length
    this.active = this.capacity
    this.positions = new Float32Array(sample.positions)
    this.home = new Float32Array(sample.positions) // permanent — never mutated after this
    this.target = new Float32Array(sample.positions)
    this.velocity = new Float32Array(this.capacity * 3)
    this.noiseOffset = new Float32Array(this.capacity)
    for (let i = 0; i < this.capacity; i++) this.noiseOffset[i] = Math.random() * Math.PI * 2
    this.life = new Float32Array(this.capacity).fill(1)
    this.sectionPull = new Float32Array(this.capacity * 3)
    // depth band from noiseOffset (0..2π) — no extra random source needed,
    // deterministic per particle, assigned once and never reassigned.
    // Roughly 45% back / 35% mid / 20% front.
    this.depthSpeed = new Float32Array(this.capacity)
    for (let i = 0; i < this.capacity; i++) {
      const t = this.noiseOffset[i]! / (Math.PI * 2)
      this.depthSpeed[i] = t < 0.45 ? HeliosConfig.depthSpeedBack
        : t < 0.8 ? HeliosConfig.depthSpeedMid
        : HeliosConfig.depthSpeedFront
    }
    this.sizes = sample.sizes

    const geo = new SphereGeometry(1, 6, 5)
    this.mesh = new InstancedMesh(geo, materials.particleMaterial, this.capacity)
    this.mesh.instanceMatrix.setUsage(DynamicDrawUsage)
    this.mesh.frustumCulled = false
    for (let i = 0; i < this.capacity; i++) {
      this.mesh.setColorAt(i, materials.palette[sample.colorIndex[i]])
    }
    if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true
    this.writeMatrices()
  }

  /** adaptive quality hook — draws fewer instances without reallocating */
  setActiveRatio(r: number) {
    this.active = Math.max(1, Math.floor(this.capacity * r))
    this.mesh.count = this.active
  }

  /** section gravity — "one particle system, everything else interacts
   *  with it": each nearby particle is pulled toward whichever of several
   *  world-space points is closest (a section's floating panels, product
   *  capsules, industry markers, whatever it registers). Writes into
   *  `sectionPull` (a persistent, lerped-in/decayed-out offset) rather
   *  than nudging velocity directly — the flow state's own target is
   *  recomputed from scratch every frame, so a one-shot velocity impulse
   *  would be erased before it ever became visible; this offset is added
   *  back into that computation instead, so it survives. Only touches
   *  particles within `radius` of their nearest target — particles
   *  elsewhere in the flow keep drifting untouched, so this reads as
   *  "particles traveling toward" rather than a global pull. Always walks
   *  every active particle (even with zero targets) so pull decays
   *  smoothly back to zero once a section scrolls out of view. */
  applySectionTargets(targets: Vector3[], radius: number, strength: number, dt: number) {
    const r2 = radius * radius
    const lerp = Math.min(1, dt * 4)
    const decay = 1 - Math.min(1, dt * 3)
    for (let i = 0; i < this.active; i++) {
      const ix = i * 3
      const px = this.positions[ix]!, py = this.positions[ix + 1]!, pz = this.positions[ix + 2]!

      let bestD2 = Infinity, bestTarget: Vector3 | null = null
      for (let t = 0; t < targets.length; t++) {
        const target = targets[t]!
        const dx = px - target.x, dy = py - target.y, dz = pz - target.z
        const d2 = dx * dx + dy * dy + dz * dz
        if (d2 < bestD2) { bestD2 = d2; bestTarget = target }
      }
      if (bestTarget && bestD2 <= r2) {
        const d = Math.sqrt(bestD2) || 1e-6
        const falloff = 1 - d / radius
        const pull = strength * falloff * falloff
        this.sectionPull[ix] += ((bestTarget.x - px) * pull - this.sectionPull[ix]!) * lerp
        this.sectionPull[ix + 1] += ((bestTarget.y - py) * pull - this.sectionPull[ix + 1]!) * lerp
        this.sectionPull[ix + 2] += ((bestTarget.z - pz) * pull - this.sectionPull[ix + 2]!) * lerp
      } else {
        this.sectionPull[ix] *= decay
        this.sectionPull[ix + 1] *= decay
        this.sectionPull[ix + 2] *= decay
      }
    }
  }

  /** spring step — accelerate toward the live target (semi-implicit Euler) */
  updateSprings(dt: number) {
    const k = HeliosConfig.springStiffness
    const damp = HeliosConfig.springDamping
    const n = this.active * 3
    for (let i = 0; i < n; i++) {
      const a = (this.target[i] - this.positions[i]) * k - this.velocity[i] * damp
      this.velocity[i] += a * dt
    }
  }

  /** integration + instance upload */
  update(dt: number) {
    const n = this.active * 3
    for (let i = 0; i < n; i++) {
      this.positions[i] += this.velocity[i] * dt
    }
    this.writeMatrices()
  }

  private writeMatrices() {
    for (let i = 0; i < this.active; i++) {
      const ix = i * 3
      const s = this.sizes[i]
      _m.makeScale(s, s, s)
      _m.setPosition(this.positions[ix], this.positions[ix + 1], this.positions[ix + 2])
      this.mesh.setMatrixAt(i, _m)
    }
    this.mesh.instanceMatrix.needsUpdate = true
  }

  dispose() {
    this.mesh.geometry.dispose()
    this.mesh.dispose()
  }
}
