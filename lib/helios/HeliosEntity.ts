// Helios Engine — the Intelligence Entity's FORM.
// Not a mesh: a signed-distance field describing an upper torso — head,
// neck, shoulders, chest, no arms/legs/face — sampled into a shell of
// independent particles. Output is pure data (positions), consumed by
// HeliosParticles / HeliosConnections / HeliosMorph.

import { Vector3 } from 'three'
import { HeliosConfig } from './HeliosConfig'

// ---- SDF primitives ----
function sdSphere(p: Vector3, cx: number, cy: number, cz: number, r: number) {
  const dx = p.x - cx, dy = p.y - cy, dz = p.z - cz
  return Math.sqrt(dx * dx + dy * dy + dz * dz) - r
}
function sdEllipsoid(p: Vector3, cx: number, cy: number, cz: number, rx: number, ry: number, rz: number) {
  const dx = (p.x - cx) / rx, dy = (p.y - cy) / ry, dz = (p.z - cz) / rz
  const k = Math.sqrt(dx * dx + dy * dy + dz * dz)
  return (k - 1) * Math.min(rx, Math.min(ry, rz))
}
/** horizontal capsule along X — the shoulder line */
function sdCapsuleX(p: Vector3, x1: number, x2: number, cy: number, cz: number, r: number) {
  const px = Math.max(x1, Math.min(p.x, x2))
  const dx = p.x - px, dy = p.y - cy, dz = p.z - cz
  return Math.sqrt(dx * dx + dy * dy + dz * dz) - r
}
function smin(a: number, b: number, k: number) {
  const h = Math.max(k - Math.abs(a - b), 0) / k
  return Math.min(a, b) - h * h * k * 0.25
}

/** The bust: head ∪ neck ∪ shoulders ∪ chest, smoothly blended,
 *  softly cut below the sternum so the torso dissolves, not ends. */
export function bustSDF(p: Vector3): number {
  const head = sdSphere(p, 0, 1.42, 0, 0.4)
  const neck = sdCapsuleX(p, -0.001, 0.001, 1.02, 0, 0.16) // ~vertical stub via tiny x-range
  const shoulders = sdCapsuleX(p, -0.78, 0.78, 0.72, 0, 0.24)
  const chest = sdEllipsoid(p, 0, 0.28, 0, 0.62, 0.72, 0.4)

  let d = smin(head, neck, 0.18)
  d = smin(d, shoulders, 0.22)
  d = smin(d, chest, 0.26)

  // soft lower cut: fade the body out below y = -0.25
  const cut = -(p.y + 0.25) // positive below the line
  d = Math.max(d, cut * 0.85)
  return d
}

export interface EntitySample {
  positions: Float32Array   // xyz per particle (rest pose)
  sizes: Float32Array       // per-particle radius
  colorIndex: Uint8Array    // palette index per particle
}

/** Rejection-sample `count` particles into the SDF's surface shell. */
export function sampleEntity(count = HeliosConfig.particleCount): EntitySample {
  const positions = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  const colorIndex = new Uint8Array(count)
  const p = new Vector3()

  // deterministic PRNG so the entity is identical every load
  let seed = 1337
  const rand = () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  const w = HeliosConfig.colorWeights
  const cdf = [w[0], w[0] + w[1], w[0] + w[1] + w[2], 1]

  let i = 0
  let guard = 0
  while (i < count && guard++ < count * 400) {
    p.set(rand() * 2.4 - 1.2, rand() * 2.4 - 0.5, rand() * 1.2 - 0.6)
    const d = bustSDF(p)
    if (Math.abs(d) > HeliosConfig.shellThickness) continue

    positions[i * 3] = p.x
    positions[i * 3 + 1] = p.y
    positions[i * 3 + 2] = p.z
    sizes[i] = HeliosConfig.particleSizeMin
      + rand() * (HeliosConfig.particleSizeMax - HeliosConfig.particleSizeMin)
    const r = rand()
    colorIndex[i] = r < cdf[0] ? 0 : r < cdf[1] ? 1 : r < cdf[2] ? 2 : 3
    i++
  }

  return { positions, sizes, colorIndex }
}
