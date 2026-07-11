// Helios · physics — particle pool + springs + instancing.
// The pool is allocated ONCE at the tier budget; nothing allocates per
// frame. Owns creation, pooling, live positions, colors, lifecycle and
// the InstancedMesh. Springs are a separate update step (updateSprings)
// so the engine loop can order cursor → springs → particles explicitly.

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
  readonly rest: Float32Array
  private velocities: Float32Array
  private sizes: Float32Array

  constructor(sample: EntitySample, materials: HeliosMaterials) {
    this.capacity = sample.sizes.length
    this.active = this.capacity
    this.positions = new Float32Array(sample.positions)
    this.rest = new Float32Array(sample.positions)
    this.velocities = new Float32Array(this.capacity * 3)
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

  /** external force injection (cursor). Radial falloff², impulse-based. */
  applyForce(world: Vector3, radius: number, strength: number, dt: number) {
    const r2 = radius * radius
    for (let i = 0; i < this.active; i++) {
      const ix = i * 3
      const dx = this.positions[ix] - world.x
      const dy = this.positions[ix + 1] - world.y
      const dz = this.positions[ix + 2] - world.z
      const d2 = dx * dx + dy * dy + dz * dz
      if (d2 > r2 || d2 < 1e-6) continue
      const d = Math.sqrt(d2)
      const falloff = 1 - d / radius
      const impulse = strength * falloff * falloff * dt
      this.velocities[ix] += (dx / d) * impulse
      this.velocities[ix + 1] += (dy / d) * impulse
      this.velocities[ix + 2] += (dz / d) * impulse
    }
  }

  /** spring step — accelerate toward rest pose (semi-implicit Euler) */
  updateSprings(dt: number) {
    const k = HeliosConfig.springStiffness
    const damp = HeliosConfig.springDamping
    const n = this.active * 3
    for (let i = 0; i < n; i++) {
      const a = (this.rest[i] - this.positions[i]) * k - this.velocities[i] * damp
      this.velocities[i] += a * dt
    }
  }

  /** integration + instance upload */
  update(dt: number) {
    const n = this.active * 3
    for (let i = 0; i < n; i++) {
      this.positions[i] += this.velocities[i] * dt
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
