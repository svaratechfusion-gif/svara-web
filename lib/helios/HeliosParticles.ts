// Helios Engine — particle simulation + instanced rendering.
// Each particle exists independently: position, velocity, rest target.
// Spring-damper integration pulls every particle home; the cursor injects
// radial impulses. One InstancedMesh = one draw call for the whole body.

import {
  InstancedMesh, SphereGeometry, Matrix4, Vector3, DynamicDrawUsage,
} from 'three'
import { HeliosConfig } from './HeliosConfig'
import { createParticleMaterial, paletteColors } from './HeliosMaterials'
import type { EntitySample } from './HeliosEntity'

const _m = new Matrix4()
const _diff = new Vector3()

export class HeliosParticles {
  readonly mesh: InstancedMesh
  readonly count: number

  /** live positions (xyz) — the single source other systems read */
  readonly positions: Float32Array
  /** rest pose the springs pull toward (HeliosMorph retargets this) */
  readonly rest: Float32Array
  private velocities: Float32Array
  private sizes: Float32Array

  constructor(sample: EntitySample) {
    this.count = sample.sizes.length
    this.positions = new Float32Array(sample.positions) // start at rest
    this.rest = new Float32Array(sample.positions)
    this.velocities = new Float32Array(this.count * 3)
    this.sizes = sample.sizes

    const geo = new SphereGeometry(1, 6, 5)
    this.mesh = new InstancedMesh(geo, createParticleMaterial(), this.count)
    this.mesh.instanceMatrix.setUsage(DynamicDrawUsage)

    const palette = paletteColors()
    for (let i = 0; i < this.count; i++) {
      this.mesh.setColorAt(i, palette[sample.colorIndex[i]])
    }
    if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true
    this.writeMatrices()
  }

  /** cursor influence: radial spring-y repulsion, nothing exaggerated */
  applyCursor(world: Vector3, dt: number) {
    const r = HeliosConfig.cursorRadius
    const r2 = r * r
    const strength = HeliosConfig.cursorStrength
    for (let i = 0; i < this.count; i++) {
      const ix = i * 3
      const dx = this.positions[ix] - world.x
      const dy = this.positions[ix + 1] - world.y
      const dz = this.positions[ix + 2] - world.z
      const d2 = dx * dx + dy * dy + dz * dz
      if (d2 > r2 || d2 < 1e-6) continue
      const d = Math.sqrt(d2)
      const falloff = 1 - d / r            // 1 at center → 0 at edge
      const impulse = strength * falloff * falloff * dt
      this.velocities[ix] += (dx / d) * impulse
      this.velocities[ix + 1] += (dy / d) * impulse
      this.velocities[ix + 2] += (dz / d) * impulse
    }
  }

  /** spring-damper integration toward rest pose */
  update(dt: number) {
    const k = HeliosConfig.springStiffness
    const damp = HeliosConfig.springDamping
    for (let i = 0; i < this.count * 3; i++) {
      const x = this.positions[i]
      const v = this.velocities[i]
      const a = (this.rest[i] - x) * k - v * damp
      const nv = v + a * dt
      this.velocities[i] = nv
      this.positions[i] = x + nv * dt
    }
    this.writeMatrices()
  }

  private writeMatrices() {
    for (let i = 0; i < this.count; i++) {
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
    ;(this.mesh.material as { dispose(): void }).dispose()
    this.mesh.dispose()
  }
}
