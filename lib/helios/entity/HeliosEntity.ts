// Helios · entity — owns the entity's DATA: hierarchy (Group), the
// ambient-cloud rest pose, morph target registry, bounding box. Nothing
// rendering-related: no materials, no draw objects beyond the Group
// container.
//
// The particle system is a page-wide ambient cloud only — there is no
// assembled/anatomical form anymore (removed along with the Hero's
// particle-head visual; see the vault Decision Log). Particles live their
// whole life in the same distribution Flow always used for 'scatter'.

import { Group, Box3 } from 'three'
import { HeliosConfig } from '../engine/HeliosConfig'
import { createPrng } from '../math/prng'

export interface EntitySample {
  positions: Float32Array
  sizes: Float32Array
  colorIndex: Uint8Array
}

export class HeliosEntity {
  /** hierarchy root — render systems attach their objects here */
  readonly group = new Group()
  readonly boundingBox = new Box3()

  /** morph target registry — 'scatter' is the only built-in target */
  private targets = new Map<string, Float32Array>()

  /** Ambient scatter-cloud sampling (deterministic) — a uniform-ish shell
   *  of a sphere. This is the particles' permanent home AND the 'scatter'
   *  morph target Flow reads from; there is no separate assembled shape. */
  sample(count: number): EntitySample {
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const colorIndex = new Uint8Array(count)
    const rand = createPrng()

    const w = HeliosConfig.colorWeights
    const cdf = [w[0], w[0] + w[1], w[0] + w[1] + w[2], 1]
    const R = HeliosConfig.scatterRadius

    for (let i = 0; i < count; i++) {
      const u = rand() * 2 - 1
      const t = rand() * Math.PI * 2
      const s = Math.sqrt(1 - u * u)
      const r = R * (0.7 + rand() * 0.3)
      const ix = i * 3
      positions[ix] = s * Math.cos(t) * r
      positions[ix + 1] = u * r + 0.6
      positions[ix + 2] = s * Math.sin(t) * r

      sizes[i] = HeliosConfig.particleSizeMin
        + rand() * (HeliosConfig.particleSizeMax - HeliosConfig.particleSizeMin)
      const cr = rand()
      colorIndex[i] = cr < cdf[0] ? 0 : cr < cdf[1] ? 1 : cr < cdf[2] ? 2 : 3
    }

    this.targets.set('scatter', new Float32Array(positions))
    this.boundingBox.setFromArray(positions)
    return { positions, sizes, colorIndex }
  }

  registerTarget(name: string, positions: Float32Array) {
    this.targets.set(name, positions)
  }

  getTarget(name: string): Float32Array {
    const t = this.targets.get(name)
    if (!t) throw new Error(`[HeliosEntity] unknown morph target "${name}"`)
    return t
  }
}
