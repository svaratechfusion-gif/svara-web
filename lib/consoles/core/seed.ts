// Deterministic simulation seeds — every console renders believable,
// repeatable telemetry. All "live" values are seeded random walks, so the
// same console always boots into the same plausible state and never
// flickers between SSR-less mounts.

export function hashSeed(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Seeded RNG from any string label. */
export const rng = (seed: string): (() => number) => mulberry32(hashSeed(seed))

/** n seeded values in [min, max). */
export function seededSeries(seed: string, n: number, min: number, max: number): number[] {
  const r = rng(seed)
  return Array.from({ length: n }, () => min + r() * (max - min))
}

export const clamp = (v: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, v))

/** Pick from a list with a seeded roll (or Math.random when r omitted). */
export const pick = <T>(list: readonly T[], r: () => number = Math.random): T =>
  list[Math.floor(r() * list.length)]!

let uid = 0
/** Monotonic id for feed items (stable across a session, unique per item). */
export const nextId = (): number => ++uid

/** "14:03:22"-style wall-clock stamp. */
export const stamp = (d: Date = new Date()): string =>
  d.toTimeString().slice(0, 8)
