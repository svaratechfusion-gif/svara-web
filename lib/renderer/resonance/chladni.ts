// SVARA Resonance — circular-membrane Chladni mathematics (Prototype B1).
// Nodal geometry uses Bessel-function circular membrane modes (NOT the square
// Chladni grid). The displacement field is a superposition of 2–3 compatible
// circular modes so the result reads as PHYSICAL ORDER — precise, complex,
// slightly unfamiliar — rather than a decorative mandala.
//
//   u(r,θ) = Σ  aᵢ · J_{mᵢ}( k_{mᵢ,nᵢ} · r/R ) · cos(mᵢ·θ + φᵢ)
//
// Nodal lines are the zero-set u = 0 (where physical matter collects). Targets
// are found by Newton descent on a precomputed scalar-field grid, so each grain
// migrates to the nodal curve nearest its dormant position — organic, not a
// morph. A whole field is built once per mode (cheap), then sampled per grain.

export const PLATE_RADIUS = 2.5
export const FIELD_RADIUS = 3.35
export const SURFACE_Y = 0.0

// ---- Bessel J (Abramowitz & Stegun rational approximations + recurrence) ----
function bessj0(x: number): number {
  const ax = Math.abs(x)
  if (ax < 8) {
    const y = x * x
    const p1 = -2957821389.0 + y * (7062834065.0 + y * (-512359803.6 + y * (10879881.29 + y * (-86327.92757 + y * 228.4622733))))
    const p2 = 40076544269.0 + y * (745249964.8 + y * (7189466.438 + y * (47447.2647 + y * (226.1030244 + y))))
    return p1 / p2
  }
  const z = 8.0 / ax, y = z * z, xx = ax - 0.785398164
  const p1 = 1.0 + y * (-0.1098628627e-2 + y * (0.2734510407e-4 + y * (-0.2073370639e-5 + y * 0.2093887211e-6)))
  const p2 = -0.1562499995e-1 + y * (0.1430488765e-3 + y * (-0.6911147651e-5 + y * (0.7621095161e-6 + y * -0.934935152e-7)))
  return Math.sqrt(0.636619772 / ax) * (Math.cos(xx) * p1 - z * Math.sin(xx) * p2)
}

function bessj1(x: number): number {
  const ax = Math.abs(x)
  if (ax < 8) {
    const y = x * x
    const p1 = x * (72362614232.0 + y * (-7895059235.0 + y * (242396853.1 + y * (-2972611.439 + y * (15704.4826 + y * -30.16036606)))))
    const p2 = 144725228442.0 + y * (2300535178.0 + y * (18583304.74 + y * (99447.43394 + y * (376.9991397 + y))))
    return p1 / p2
  }
  const z = 8.0 / ax, y = z * z, xx = ax - 2.356194491
  const p1 = 1.0 + y * (0.183105e-2 + y * (-0.3516396496e-4 + y * (0.2457520174e-5 + y * -0.240337019e-6)))
  const p2 = 0.04687499995 + y * (-0.2002690873e-3 + y * (0.8449199096e-5 + y * (-0.88228987e-6 + y * 0.105787412e-6)))
  const ans = Math.sqrt(0.636619772 / ax) * (Math.cos(xx) * p1 - z * Math.sin(xx) * p2)
  return x < 0 ? -ans : ans
}

function bessj(n: number, x: number): number {
  if (n === 0) return bessj0(x)
  if (n === 1) return bessj1(x)
  const ax = Math.abs(x)
  if (ax === 0) return 0
  const ACC = 40, BIGNO = 1e10, BIGNI = 1e-10
  const tox = 2.0 / ax
  let ans: number
  if (ax > n) {
    // upward recurrence is stable when x > n
    let bjm = bessj0(ax), bj = bessj1(ax), bjp: number
    for (let j = 1; j < n; j++) { bjp = j * tox * bj - bjm; bjm = bj; bj = bjp }
    ans = bj
  } else {
    // downward recurrence (Miller's algorithm) when x <= n
    const m = 2 * Math.floor((n + Math.floor(Math.sqrt(ACC * n))) / 2)
    let jsum = 0, sum = 0, bjp = 0.0, bj = 1.0, bjm: number
    ans = 0.0
    for (let j = m; j > 0; j--) {
      bjm = j * tox * bj - bjp
      bjp = bj
      bj = bjm
      if (Math.abs(bj) > BIGNO) { bj *= BIGNI; bjp *= BIGNI; ans *= BIGNI; sum *= BIGNI }
      if (jsum) sum += bj
      jsum = jsum ? 0 : 1
      if (j === n) ans = bjp
    }
    sum = 2.0 * sum - bj
    ans /= sum
  }
  return x < 0 && (n & 1) ? -ans : ans
}

// ---- mode presets: superposition of compatible circular modes ----
// k = the nᵗʰ positive zero of J_m (so r=R sits on a nodal circle of that term).
interface ModeComponent { m: number; k: number; amp: number; phase: number }
export interface ModeDef { id: number; label: string; recommended?: boolean; components: ModeComponent[] }

// Each mode superposes 3 compatible circular modes. The third term breaks the
// decorative symmetry of the first two (an off-axis diameter or ring) so the
// result reads as PHYSICAL ORDER with structural tension, not a mandala.
export const MODES: Record<number, ModeDef> = {
  // 1 — concentric rings broken by a 3-fold structure + an off-axis diameter
  1: {
    id: 1, label: "ring/3",
    components: [
      { m: 0, k: 8.6537, amp: 1.0, phase: 0 },
      { m: 3, k: 6.3802, amp: 0.5, phase: 0.5 },
      { m: 1, k: 7.0156, amp: 0.3, phase: 0.7 }, // asymmetry: offsets the rings
    ],
  },
  // 2 — 2-fold × 5-fold lattice over a faint ring (complex, unfamiliar)
  2: {
    id: 2, label: "2×5",
    components: [
      { m: 2, k: 8.4172, amp: 1.0, phase: 0 },
      { m: 5, k: 8.7715, amp: 0.5, phase: 0.9 },
      { m: 0, k: 5.5201, amp: 0.28, phase: 0 }, // ring underlay for architecture
    ],
  },
  // 3 — a single nodal diameter crossed by a 4-fold field + a 2-fold tension
  //     term. The m=1 diameter breaks radial symmetry → the strongest, most
  //     architectural / brand-distinctive composition (recommended default).
  3: {
    id: 3, label: "1/4", recommended: true,
    components: [
      { m: 1, k: 10.1735, amp: 1.0, phase: 0 },
      { m: 4, k: 9.761, amp: 0.62, phase: 1.1 },
      { m: 2, k: 8.4172, amp: 0.3, phase: 0.4 }, // structural tension
    ],
  },
}

export function resolveMode(id: number | string | undefined): number {
  const n = Number(id)
  return n === 2 || n === 3 ? n : 1
}

function chladniAt(x: number, z: number, mode: ModeDef): number {
  const r = Math.hypot(x, z)
  const theta = Math.atan2(z, x)
  let v = 0
  for (const c of mode.components) {
    v += c.amp * bessj(c.m, (c.k * r) / FIELD_RADIUS) * Math.cos(c.m * theta + c.phase)
  }
  return v
}

// ---- precomputed scalar field grid (fast per-grain sampling) ----
export interface FieldData {
  grid: Float32Array
  size: number
  extent: number
  maxAbs: number
}

export function buildField(modeId: number, size = 220): FieldData {
  const mode = MODES[resolveMode(modeId)]
  const extent = FIELD_RADIUS
  const grid = new Float32Array(size * size)
  let maxAbs = 1e-6
  for (let gy = 0; gy < size; gy++) {
    const z = -extent + (2 * extent * gy) / (size - 1)
    for (let gx = 0; gx < size; gx++) {
      const x = -extent + (2 * extent * gx) / (size - 1)
      const v = chladniAt(x, z, mode)
      grid[gy * size + gx] = v
      const a = Math.abs(v)
      if (a > maxAbs) maxAbs = a
    }
  }
  return { grid, size, extent, maxAbs }
}

export function sampleField(fd: FieldData, x: number, z: number): number {
  const { grid, size, extent } = fd
  const fx = ((x + extent) / (2 * extent)) * (size - 1)
  const fz = ((z + extent) / (2 * extent)) * (size - 1)
  const x0 = Math.max(0, Math.min(size - 1, Math.floor(fx)))
  const z0 = Math.max(0, Math.min(size - 1, Math.floor(fz)))
  const x1 = Math.min(size - 1, x0 + 1)
  const z1 = Math.min(size - 1, z0 + 1)
  const tx = fx - x0, tz = fz - z0
  const a = grid[z0 * size + x0], b = grid[z0 * size + x1]
  const c = grid[z1 * size + x0], d = grid[z1 * size + x1]
  return (a * (1 - tx) + b * tx) * (1 - tz) + (c * (1 - tx) + d * tx) * tz
}

function grad(fd: FieldData, x: number, z: number): [number, number] {
  const h = fd.extent / fd.size
  const gx = sampleField(fd, x + h, z) - sampleField(fd, x - h, z)
  const gz = sampleField(fd, x, z + h) - sampleField(fd, x, z - h)
  return [gx / (2 * h), gz / (2 * h)]
}

// Newton descent on u = 0 → nearest nodal line, clamped to the field disc.
export function projectToNode(fd: FieldData, x: number, z: number): [number, number] {
  let px = x, pz = z
  for (let it = 0; it < 8; it++) {
    const f = sampleField(fd, px, pz)
    const [gx, gz] = grad(fd, px, pz)
    const g2 = gx * gx + gz * gz + 1e-6
    let step = f / g2
    // cap the step so a flat region can't fling the grain across the plate
    const smag = Math.abs(step) * Math.sqrt(g2)
    if (smag > 0.4) step *= 0.4 / smag
    px -= step * gx
    pz -= step * gz
    const r = Math.hypot(px, pz)
    if (r > FIELD_RADIUS) { px *= FIELD_RADIUS / r; pz *= FIELD_RADIUS / r }
  }
  return [px, pz]
}

// tangent of the nodal line at a point (for along-line jitter → ridge width)
export function nodeTangent(fd: FieldData, x: number, z: number): [number, number] {
  const [gx, gz] = grad(fd, x, z)
  const len = Math.hypot(gx, gz) + 1e-6
  return [-gz / len, gx / len]
}

// resonance energy 0..1 — how far from a node this grain started (antinode = 1)
export function energyAt(fd: FieldData, x: number, z: number): number {
  return Math.min(1, Math.abs(sampleField(fd, x, z)) / fd.maxAbs)
}

// Compositional clearance around the headline territory (field-local xz): a
// gentle outward push so nodal targets bend around the type rather than sitting
// under it. Purely a composition mask — kept subtle, never a text-shaped cutout.
const TYPO_CENTER: [number, number] = [-1.3, -1.0]
const TYPO_RADIUS = 1.4
export function typoClearance(x: number, z: number): [number, number] {
  const dx = x - TYPO_CENTER[0]
  const dz = z - TYPO_CENTER[1]
  const d = Math.hypot(dx, dz)
  if (d > TYPO_RADIUS || d < 1e-3) return [0, 0]
  const push = (1 - d / TYPO_RADIUS) * 0.25
  return [(dx / d) * push, (dz / d) * push]
}
