// Helios Engine — dynamic connection lines.
// Topology (who links to whom) is computed ONCE from the rest pose via a
// spatial-hash k-nearest pass — O(n·k), not O(n²). Per frame we only copy
// live particle positions into the line buffer and update each vertex's
// stretch factor; the shader fades over-stretched lines.

import { BufferGeometry, BufferAttribute, LineSegments, DynamicDrawUsage } from 'three'
import { HeliosConfig } from './HeliosConfig'
import { createConnectionMaterial, paletteColors } from './HeliosMaterials'
import type { HeliosParticles } from './HeliosParticles'

export class HeliosConnections {
  readonly lines: LineSegments
  readonly pairCount: number

  private pairs: Uint32Array          // [a,b] particle indices per segment
  private restLengths: Float32Array   // rest distance per segment
  private posAttr: BufferAttribute
  private stretchAttr: BufferAttribute

  constructor(private particles: HeliosParticles) {
    const rest = particles.rest
    const n = particles.count
    const maxD = HeliosConfig.maxConnectionDistance
    const k = HeliosConfig.neighborsPerParticle

    // ---- spatial hash on rest positions ----
    const cell = maxD
    const hash = new Map<string, number[]>()
    const key = (x: number, y: number, z: number) =>
      `${Math.floor(x / cell)},${Math.floor(y / cell)},${Math.floor(z / cell)}`
    for (let i = 0; i < n; i++) {
      const kk = key(rest[i * 3], rest[i * 3 + 1], rest[i * 3 + 2])
      let arr = hash.get(kk)
      if (!arr) { arr = []; hash.set(kk, arr) }
      arr.push(i)
    }

    // ---- k nearest within maxD, deduped (a<b) ----
    const chosen = new Set<number>() // a * n + b
    const cand: { j: number, d2: number }[] = []
    for (let i = 0; i < n; i++) {
      cand.length = 0
      const px = rest[i * 3], py = rest[i * 3 + 1], pz = rest[i * 3 + 2]
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
      for (let c = 0; c < Math.min(k, cand.length); c++) {
        const j = cand[c].j
        const a = Math.min(i, j), b = Math.max(i, j)
        chosen.add(a * n + b)
      }
    }

    this.pairCount = chosen.size
    this.pairs = new Uint32Array(this.pairCount * 2)
    this.restLengths = new Float32Array(this.pairCount)

    const positions = new Float32Array(this.pairCount * 6)
    const stretches = new Float32Array(this.pairCount * 2)
    const colors = new Float32Array(this.pairCount * 6)
    const palette = paletteColors()
    const navy = palette[3], blue = palette[2]

    let s = 0
    for (const code of chosen) {
      const a = Math.floor(code / n), b = code % n
      this.pairs[s * 2] = a
      this.pairs[s * 2 + 1] = b
      const dx = rest[a * 3] - rest[b * 3]
      const dy = rest[a * 3 + 1] - rest[b * 3 + 1]
      const dz = rest[a * 3 + 2] - rest[b * 3 + 2]
      this.restLengths[s] = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1e-4
      // alternate navy/blue segments for depth without lighting
      const c = s % 3 === 0 ? blue : navy
      colors.set([c.r, c.g, c.b, c.r, c.g, c.b], s * 6)
      s++
    }

    const geo = new BufferGeometry()
    this.posAttr = new BufferAttribute(positions, 3)
    this.posAttr.setUsage(DynamicDrawUsage)
    this.stretchAttr = new BufferAttribute(stretches, 1)
    this.stretchAttr.setUsage(DynamicDrawUsage)
    geo.setAttribute('position', this.posAttr)
    geo.setAttribute('aStretch', this.stretchAttr)
    geo.setAttribute('aColor', new BufferAttribute(colors, 3))

    this.lines = new LineSegments(geo, createConnectionMaterial())
    this.lines.frustumCulled = false
    this.sync()
  }

  /** copy live particle positions into the line buffer + update stretch */
  sync() {
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

  dispose() {
    this.lines.geometry.dispose()
    ;(this.lines.material as { dispose(): void }).dispose()
  }
}
