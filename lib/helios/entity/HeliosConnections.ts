// Helios · entity — connection topology + dynamic lines.
// Owns: kNN topology (≤3 neighbors, distance-capped, spatial hash — never
// the full graph), topology REBUILD against a new rest pose (on morph
// completion), per-frame position sync and stretch-based fading data.
// No cursor logic, no materials (materials come from HeliosMaterials).

import { BufferGeometry, BufferAttribute, LineSegments, DynamicDrawUsage } from 'three'
import { HeliosConfig } from '../engine/HeliosConfig'
import { REGION_PARAMS, REGION_INDEX, isFace, FACE_CONNECTION_BIAS } from '../math/regions'
import type { HeliosMaterials } from '../materials/HeliosMaterials'
import type { HeliosParticles } from '../physics/HeliosParticles'

export class HeliosConnections {
  readonly lines: LineSegments
  pairCount = 0

  /** preallocated at max capacity — rebuilds reuse these, never realloc */
  private readonly maxPairs: number
  private pairs: Uint32Array
  private restLengths: Float32Array
  private posAttr: BufferAttribute
  private stretchAttr: BufferAttribute
  private colorAttr: BufferAttribute
  private boostAttr: BufferAttribute
  visible = true

  constructor(private particles: HeliosParticles, private materials: HeliosMaterials) {
    this.maxPairs = particles.capacity * HeliosConfig.neighborsPerParticle
    this.pairs = new Uint32Array(this.maxPairs * 2)
    this.restLengths = new Float32Array(this.maxPairs)

    const geo = new BufferGeometry()
    this.posAttr = new BufferAttribute(new Float32Array(this.maxPairs * 6), 3)
    this.posAttr.setUsage(DynamicDrawUsage)
    this.stretchAttr = new BufferAttribute(new Float32Array(this.maxPairs * 2), 1)
    this.stretchAttr.setUsage(DynamicDrawUsage)
    this.colorAttr = new BufferAttribute(new Float32Array(this.maxPairs * 6), 3)
    this.boostAttr = new BufferAttribute(new Float32Array(this.maxPairs * 2), 1)
    geo.setAttribute('position', this.posAttr)
    geo.setAttribute('aStretch', this.stretchAttr)
    geo.setAttribute('aColor', this.colorAttr)
    geo.setAttribute('aBoost', this.boostAttr)

    this.lines = new LineSegments(geo, materials.connectionMaterial)
    this.lines.frustumCulled = false

    this.rebuild()
  }

  /** recompute topology from the CURRENT rest pose (spatial hash kNN).
   *  Region-aware: per-region neighbor bias (head 0.6, face 0.8 —
   *  topology is the ONLY face feature), spread (shoulders reach wider)
   *  and line weight (neck/chest read thicker). */
  rebuild() {
    const rest = this.particles.rest
    const regions = this.particles.regionIndex
    const n = this.particles.active
    const baseD = HeliosConfig.maxConnectionDistance
    const k = HeliosConfig.neighborsPerParticle
    const maxSpread = Math.max(...REGION_INDEX.map(r => REGION_PARAMS[r].spread))
    const cell = baseD * maxSpread

    const hash = new Map<string, number[]>()
    for (let i = 0; i < n; i++) {
      const kk = `${Math.floor(rest[i * 3] / cell)},${Math.floor(rest[i * 3 + 1] / cell)},${Math.floor(rest[i * 3 + 2] / cell)}`
      let arr = hash.get(kk)
      if (!arr) { arr = []; hash.set(kk, arr) }
      arr.push(i)
    }

    const chosen = new Set<number>()
    const cand: { j: number, d2: number }[] = []
    for (let i = 0; i < n; i++) {
      cand.length = 0
      const px = rest[i * 3], py = rest[i * 3 + 1], pz = rest[i * 3 + 2]
      const params = REGION_PARAMS[REGION_INDEX[regions[i]]]
      const maxD = baseD * params.spread
      // face: topology-only variation — a denser link bias, never features
      const bias = isFace(px, py, pz) ? FACE_CONNECTION_BIAS : params.connectionBias
      const kEff = Math.max(1, Math.round(k * bias))

      const cx = Math.floor(px / cell), cy = Math.floor(py / cell), cz = Math.floor(pz / cell)
      for (let ox = -1; ox <= 1; ox++) for (let oy = -1; oy <= 1; oy++) for (let oz = -1; oz <= 1; oz++) {
        const bucket = hash.get(`${cx + ox},${cy + oy},${cz + oz}`)
        if (!bucket) continue
        for (const j of bucket) {
          if (j === i) continue
          const dx = rest[j * 3] - px, dy = rest[j * 3 + 1] - py, dz = rest[j * 3 + 2] - pz
          const d2 = dx * dx + dy * dy + dz * dz
          if (d2 <= maxD * maxD) cand.push({ j, d2 })
        }
      }
      cand.sort((a, b) => a.d2 - b.d2)
      const kk = Math.min(kEff, cand.length)
      for (let c = 0; c < kk; c++) {
        const j = cand[c].j
        chosen.add(Math.min(i, j) * n + Math.max(i, j))
      }
    }

    const colors = this.colorAttr.array as Float32Array
    const boosts = this.boostAttr.array as Float32Array
    const palette = this.materials.palette
    const navy = palette[3], blue = palette[2]

    let s = 0
    for (const code of chosen) {
      if (s >= this.maxPairs) break
      const a = Math.floor(code / n), b = code % n
      this.pairs[s * 2] = a
      this.pairs[s * 2 + 1] = b
      const dx = rest[a * 3] - rest[b * 3]
      const dy = rest[a * 3 + 1] - rest[b * 3 + 1]
      const dz = rest[a * 3 + 2] - rest[b * 3 + 2]
      this.restLengths[s] = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1e-4
      const c = s % 3 === 0 ? blue : navy
      colors[s * 6] = c.r; colors[s * 6 + 1] = c.g; colors[s * 6 + 2] = c.b
      colors[s * 6 + 3] = c.r; colors[s * 6 + 4] = c.g; colors[s * 6 + 5] = c.b
      // line weight = mean of both endpoints' region weights
      const wgt = (REGION_PARAMS[REGION_INDEX[regions[a]]].lineWeight
        + REGION_PARAMS[REGION_INDEX[regions[b]]].lineWeight) * 0.5
      boosts[s * 2] = wgt
      boosts[s * 2 + 1] = wgt
      s++
    }
    this.pairCount = s
    this.colorAttr.needsUpdate = true
    this.boostAttr.needsUpdate = true
    this.lines.geometry.setDrawRange(0, s * 2)
  }

  /** per-frame: copy live positions + stretch. Zero allocation. */
  sync() {
    if (!this.visible) return
    const live = this.particles.positions
    const pos = this.posAttr.array as Float32Array
    const str = this.stretchAttr.array as Float32Array
    for (let s = 0; s < this.pairCount; s++) {
      const a = this.pairs[s * 2] * 3
      const b = this.pairs[s * 2 + 1] * 3
      const o = s * 6
      pos[o] = live[a]; pos[o + 1] = live[a + 1]; pos[o + 2] = live[a + 2]
      pos[o + 3] = live[b]; pos[o + 4] = live[b + 1]; pos[o + 5] = live[b + 2]
      const dx = live[a] - live[b], dy = live[a + 1] - live[b + 1], dz = live[a + 2] - live[b + 2]
      const stretch = Math.sqrt(dx * dx + dy * dy + dz * dz) / this.restLengths[s]
      str[s * 2] = stretch
      str[s * 2 + 1] = stretch
    }
    this.posAttr.needsUpdate = true
    this.stretchAttr.needsUpdate = true
  }

  setVisible(v: boolean) {
    this.visible = v
    this.lines.visible = v
  }

  dispose() {
    this.lines.geometry.dispose()
  }
}
