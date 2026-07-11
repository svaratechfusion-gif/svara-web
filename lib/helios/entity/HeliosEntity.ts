// Helios · entity — owns the entity's DATA: hierarchy (Group), skeleton
// (rest-pose targets = the morph "skeleton"), morph target registry,
// bounding box, transforms (breathing), and state. Nothing rendering-
// related: no materials, no draw objects beyond the Group container.

import { Group, Box3, Vector3 } from 'three'
import { HeliosConfig } from '../engine/HeliosConfig'
import { bustSDF } from '../math/sdf'
import { createPrng } from '../math/prng'
import { REGION_PARAMS, REGION_INDEX, classifyRegion, type Region } from '../math/regions'

export interface EntitySample {
  positions: Float32Array
  sizes: Float32Array
  colorIndex: Uint8Array
  /** anatomical region per particle (index into REGION_INDEX) */
  regionIndex: Uint8Array
}

export class HeliosEntity {
  /** hierarchy root — render systems attach their objects here */
  readonly group = new Group()
  readonly boundingBox = new Box3()

  /** morph target registry — 'entity' and 'scatter' are built in */
  private targets = new Map<string, Float32Array>()
  private elapsed = 0

  /** Region-quota sampling of the bust (deterministic).
   *  Budgets follow the anatomy spec (reference @5000: head 1400 · neck 450
   *  · chest/shoulders remainder), scaled to the tier count. Each region
   *  applies its own density, shell softness and particle size. */
  sample(count: number): EntitySample {
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const colorIndex = new Uint8Array(count)
    const regionIndex = new Uint8Array(count)
    const rand = createPrng()
    const p = new Vector3()

    const w = HeliosConfig.colorWeights
    const cdf = [w[0], w[0] + w[1], w[0] + w[1] + w[2], 1]

    // per-region remaining quotas (largest-remainder rounding)
    const quotas = REGION_INDEX.map(r => Math.round(REGION_PARAMS[r].quota * count))
    quotas[2] += count - quotas.reduce((a, b) => a + b, 0) // dump rounding into chest

    let i = 0
    let guard = 0
    while (i < count && guard++ < count * 800) {
      p.set(rand() * 2.4 - 1.2, rand() * 2.4 - 0.5, rand() * 1.2 - 0.6)
      const region = classifyRegion(p.x, p.y)
      const ri = REGION_INDEX.indexOf(region)
      if (quotas[ri] <= 0) continue
      const params = REGION_PARAMS[region]

      // soft/crisp boundary per region + density as acceptance probability
      if (Math.abs(bustSDF(p)) > HeliosConfig.shellThickness * params.shell) continue
      if (rand() > params.density / 1.8) continue // normalize vs max density

      positions.set([p.x, p.y, p.z], i * 3)
      sizes[i] = (HeliosConfig.particleSizeMin
        + rand() * (HeliosConfig.particleSizeMax - HeliosConfig.particleSizeMin)) * params.size
      const r = rand()
      colorIndex[i] = r < cdf[0] ? 0 : r < cdf[1] ? 1 : r < cdf[2] ? 2 : 3
      regionIndex[i] = ri
      quotas[ri]--
      i++
    }
    // fill any shortfall (region exhausted spatially) with unrestricted samples
    while (i < count && guard++ < count * 1200) {
      p.set(rand() * 2.4 - 1.2, rand() * 2.4 - 0.5, rand() * 1.2 - 0.6)
      if (Math.abs(bustSDF(p)) > HeliosConfig.shellThickness) continue
      positions.set([p.x, p.y, p.z], i * 3)
      sizes[i] = HeliosConfig.particleSizeMin
        + rand() * (HeliosConfig.particleSizeMax - HeliosConfig.particleSizeMin)
      colorIndex[i] = 2
      regionIndex[i] = REGION_INDEX.indexOf(classifyRegion(p.x, p.y))
      i++
    }

    // built-in morph targets
    this.targets.set('entity', new Float32Array(positions))
    const scatter = new Float32Array(count * 3)
    const R = HeliosConfig.scatterRadius
    for (let j = 0; j < count; j++) {
      // uniform-ish shell of a sphere around the entity center
      const u = rand() * 2 - 1
      const t = rand() * Math.PI * 2
      const s = Math.sqrt(1 - u * u)
      const r = R * (0.7 + rand() * 0.3)
      scatter.set([s * Math.cos(t) * r, u * r + 0.6, s * Math.sin(t) * r], j * 3)
    }
    this.targets.set('scatter', scatter)

    this.boundingBox.setFromArray(positions)
    return { positions, sizes, colorIndex, regionIndex }
  }

  registerTarget(name: string, positions: Float32Array) {
    this.targets.set(name, positions)
  }

  getTarget(name: string): Float32Array {
    const t = this.targets.get(name)
    if (!t) throw new Error(`[HeliosEntity] unknown morph target "${name}"`)
    return t
  }

  /** transforms: whole-entity breathing scale. Called once per frame. */
  updateTransforms(dt: number) {
    this.elapsed += dt
    const b = Math.sin((this.elapsed / HeliosConfig.entityBreathePeriod) * Math.PI * 2)
    this.group.scale.setScalar(1 + b * HeliosConfig.entityBreatheAmp)
  }
}
