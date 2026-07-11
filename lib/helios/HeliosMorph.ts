// Helios Engine — morph system.
// The entity's rest pose is retargetable: future scenes register alternate
// particle layouts (a network, a city grid, a datastream …) and the engine
// eases every particle's REST position toward the target. The spring sim
// does the actual motion, so morphs inherit the same physical feel.

import type { HeliosParticles } from './HeliosParticles'
import type { HeliosStore } from './HeliosStore'

const EASE = (t: number) => 1 - Math.pow(1 - t, 3) // cubic out — no bounce

export class HeliosMorph {
  private targets = new Map<string, Float32Array>()
  private from: Float32Array | null = null
  private to: Float32Array | null = null
  private t = 0
  private duration = 1

  constructor(private particles: HeliosParticles, private store: HeliosStore) {
    // the sampled bust is the default target
    this.targets.set('entity', new Float32Array(particles.rest))
  }

  register(name: string, positions: Float32Array) {
    if (positions.length !== this.particles.rest.length) {
      throw new Error(`[HeliosMorph] "${name}" length ${positions.length} ≠ ${this.particles.rest.length}`)
    }
    this.targets.set(name, positions)
  }

  morphTo(name: string, duration = 1.6) {
    const target = this.targets.get(name)
    if (!target) throw new Error(`[HeliosMorph] unknown target "${name}"`)
    this.from = new Float32Array(this.particles.rest)
    this.to = target
    this.t = 0
    this.duration = Math.max(0.01, duration)
    this.store.state.morphTarget = name
  }

  update(dt: number) {
    if (!this.from || !this.to) return
    this.t = Math.min(1, this.t + dt / this.duration)
    const e = EASE(this.t)
    const rest = this.particles.rest
    for (let i = 0; i < rest.length; i++) {
      rest[i] = this.from[i] + (this.to[i] - this.from[i]) * e
    }
    if (this.t >= 1) { this.from = this.to = null }
  }
}
