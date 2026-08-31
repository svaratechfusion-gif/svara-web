// SVARA Resonance — intelligence topology GENERATORS (Prototype B1.3).
// The three candidates now use THREE FUNDAMENTALLY DIFFERENT macro-generation
// strategies (not presets of one density function):
//   A — INTELLIGENCE ARTERY   : streamline / flow-field advection (traced tubes)
//   B — COGNITIVE TERRAIN      : threshold terrain-density field (continents)
//   C — DISTRIBUTED INTELLIGENCE: discrete node-graph point-process (hubs+edges)
// Each allocates its 70k particle budget across a density HIERARCHY (nucleus →
// primary → secondary → atmospheric) and respects a typography exclusion zone so
// the headline stays readable. generateTargets(id, n) returns final xz positions
// + a per-particle tier (0 dense .. 1 atmospheric).

export type TopoId = "A" | "B" | "C"
export const TOPO_SCALE = 1.0
export const GROUP_OFFSET: [number, number, number] = [0.55, -0.05, 0.0]
export const REVIEW_FOV = 40

// ONE fixed framing anchor for ALL candidates (field-local xz) so the review
// camera is identical for A/B/C — fair comparison, no per-candidate auto-frame.
export const ANCHOR: [number, number] = [0.55, 0.0]

// Dominant-mass location per candidate — kept near the ANCHOR so all three fit
// the same fixed frame in the right visual field.
export const NUCLEUS: Record<TopoId, [number, number]> = {
  A: [0.5, 0.0],
  B: [0.5, 0.05],
  C: [0.45, -0.05],
}

// Hard typography exclusion: NO dense structure left of this local-x boundary,
// so nothing dense sits behind "ENGINEERING INTELLIGENCE". Atmospheric grains
// may feather a little further left, sparsely.
const EXCLUDE_X = 0.05
const EXCLUDE_X_ATMO = -0.7

export function resolveTopo(id: string | undefined): TopoId {
  const u = String(id || "").toUpperCase()
  return u === "B" || u === "C" ? (u as TopoId) : "A"
}

// ---- deterministic value noise ----
function hash2(x: number, y: number): number {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453
  return s - Math.floor(s)
}
function vnoise(x: number, y: number): number {
  const xi = Math.floor(x), yi = Math.floor(y)
  const xf = x - xi, yf = y - yi
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf)
  const a = hash2(xi, yi), b = hash2(xi + 1, yi)
  const c = hash2(xi, yi + 1), d = hash2(xi + 1, yi + 1)
  return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v
}
function fbm(x: number, y: number): number {
  let f = 0, amp = 0.5, freq = 1
  for (let o = 0; o < 4; o++) { f += amp * vnoise(x * freq, y * freq); amp *= 0.5; freq *= 2.03 }
  return f
}
// approx standard-normal in [-~1.5, ~1.5]
function gaussian(): number { return (Math.random() + Math.random() + Math.random() - 1.5) }

// A generated particle sink: writes xz into pos, tier into tierArr, honoring the
// typography exclusion (drops dense grains that fall into the headline zone).
interface Sink { pos: Float32Array; tier: Float32Array; i: number; n: number }
function put(s: Sink, x: number, z: number, tier: number): boolean {
  if (s.i >= s.n) return false
  const bound = tier > 0.75 ? EXCLUDE_X_ATMO : EXCLUDE_X
  if (x < bound) return false // exclusion: keep the headline clear
  s.pos[s.i * 3] = x
  s.pos[s.i * 3 + 1] = Math.pow(Math.random(), 3) * 0.05 // thin ridge height
  s.pos[s.i * 3 + 2] = z
  s.tier[s.i] = tier
  s.i++
  return true
}

// ============================================================================
// A — INTELLIGENCE ARTERY : flow-field advection. Curved tubes are TRACED
// through a directional field (not drawn as polylines). Varying thickness, one
// split, some run off-viewport; sparse capillaries; big negative space.
// ============================================================================
// cubic Bézier point + unit tangent
function bez(p0: number[], p1: number[], p2: number[], p3: number[], t: number): [number, number] {
  const u = 1 - t
  const a = u * u * u, b = 3 * u * u * t, c = 3 * u * t * t, d = t * t * t
  return [a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0], a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1]]
}
function bezTan(p0: number[], p1: number[], p2: number[], p3: number[], t: number): [number, number] {
  const u = 1 - t
  const a = 3 * u * u, b = 6 * u * t, c = 3 * t * t
  const dx = a * (p1[0] - p0[0]) + b * (p2[0] - p1[0]) + c * (p3[0] - p2[0])
  const dz = a * (p1[1] - p0[1]) + b * (p2[1] - p1[1]) + c * (p3[1] - p2[1])
  const l = Math.hypot(dx, dz) + 1e-6
  return [dx / l, dz / l]
}

// deposit a volumetric corridor around a cubic Bézier trajectory with a tapering
// gaussian cross-section (thickness thick0 → thickEnd along the path).
interface Artery { p0: number[]; p1: number[]; p2: number[]; p3: number[]; thick0: number; thickEnd: number; budget: number; tier: number }
function depositArtery(s: Sink, a: Artery): void {
  const steps = 80
  const per = Math.max(1, Math.floor(a.budget / steps))
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const [x, z] = bez(a.p0, a.p1, a.p2, a.p3, t)
    const [tx, tz] = bezTan(a.p0, a.p1, a.p2, a.p3, t)
    const nx = -tz, nz2 = tx // path normal
    const thick = a.thick0 + (a.thickEnd - a.thick0) * t
    for (let k = 0; k < per; k++) {
      const off = gaussian() * thick + (vnoise(x * 4 + 7, z * 4) - 0.5) * thick * 0.4
      put(s, x + nx * off, z + nz2 * off, a.tier + t * 0.12)
    }
  }
}

// A — INTELLIGENCE ARTERY. An irregular ELONGATED nucleus (no polar sampling) +
// 4 authored curved Bézier trajectories diverging to the right / up-right /
// down-right with large empty wedges between them. Zero radial spokes.
function genArtery(s: Sink): void {
  const n = s.n
  const [nx, nz] = NUCLEUS.A

  // (1) irregular ELONGATED nucleus (~34%) — offsets along a rotated major/minor
  // axis (NOT angle*radius), noise-deformed. No circle, no ring, no halo.
  const nucBudget = Math.floor(n * 0.34)
  const axis = -0.35, ca = Math.cos(axis), sa = Math.sin(axis)
  for (let k = 0; k < nucBudget; k++) {
    const u = gaussian() * 0.5   // major
    const w = gaussian() * 0.2   // minor
    let x = nx + (u * ca - w * sa)
    let z = nz + (u * sa + w * ca)
    x += (vnoise(x * 3.1, z * 3.1) - 0.5) * 0.12
    z += (vnoise(x * 3.1 + 9, z * 3.1) - 0.5) * 0.12
    put(s, x, z, 0.0)
  }

  // (2) authored curved arteries — all diverging right / up-right / down-right.
  const arteries: Artery[] = [
    // DOMINANT (thick, sweeps down then far to the lower-right, exits)
    { p0: [0.55, -0.1], p1: [1.4, -0.45], p2: [2.3, -0.7], p3: [3.7, -1.5], thick0: 0.2, thickEnd: 0.09, budget: n * 0.24, tier: 0.3 },
    // PRIMARY (medium, arcs to the upper-right, exits top)
    { p0: [0.5, 0.12], p1: [1.05, 0.7], p2: [1.7, 1.4], p3: [2.5, 2.7], thick0: 0.15, thickEnd: 0.07, budget: n * 0.17, tier: 0.32 },
    // SECONDARY branch off the dominant, out to the right
    { p0: [1.7, -0.55], p1: [2.3, -0.25], p2: [2.9, 0.05], p3: [3.7, 0.3], thick0: 0.09, thickEnd: 0.045, budget: n * 0.1, tier: 0.5 },
    // SPARSE branch off the primary, thin, up
    { p0: [1.45, 0.95], p1: [1.7, 1.5], p2: [1.85, 2.1], p3: [2.0, 2.8], thick0: 0.055, thickEnd: 0.03, budget: n * 0.05, tier: 0.62 },
  ]
  for (const a of arteries) depositArtery(s, a)

  // (3) atmospheric dissipation — sparse trailing grains at the artery exits and
  // a faint directional inflow hint (never a halo around the nucleus).
  while (s.i < n) {
    const r = Math.random()
    if (r < 0.6) {
      // dissipate off the lower-right / right exits
      const t = 0.7 + Math.random() * 0.5
      const [bx, bz] = bez(arteries[0].p0, arteries[0].p1, arteries[0].p2, arteries[0].p3, Math.min(1, t))
      put(s, bx + gaussian() * 0.5, bz + gaussian() * 0.5, 0.92)
    } else {
      // faint inflow hint approaching from the upper-left toward the nucleus
      const t = Math.random()
      put(s, nx - 0.4 - t * 0.5 + gaussian() * 0.3, nz + 0.5 + t * 0.6 + gaussian() * 0.3, 0.95)
    }
  }
}

// ============================================================================
// B — COGNITIVE TERRAIN : a continuous terrain-density field thresholded into
// irregular basins (continents), joined by only a FEW narrow saddle channels.
// Importance-sampled — no arms, no hubs-and-tubes.
// ============================================================================
interface Basin { x: number; z: number; amp: number; spread: number }
const TERRAIN_BASINS: Basin[] = [
  { x: 0.75, z: 0.1, amp: 1.0, spread: 0.58 },  // dominant (near anchor, right of headline)
  { x: 2.0, z: -0.9, amp: 0.72, spread: 0.5 },  // medium
  { x: 1.0, z: 1.7, amp: 0.68, spread: 0.5 },   // medium
  { x: 2.8, z: 0.8, amp: 0.4, spread: 0.4 },    // subtle
  { x: 1.7, z: -2.1, amp: 0.36, spread: 0.36 }, // subtle
]
// only SOME basins connect (index pairs) — others stay separated
const TERRAIN_CHANNELS: [number, number][] = [[0, 1], [0, 2], [1, 4]]

function terrainField(x: number, z: number): number {
  let v = 0
  for (const b of TERRAIN_BASINS) {
    const dx = x - b.x, dz = z - b.z
    // noise-deformed radius → irregular continents, not gaussian discs
    const wob = 0.75 + 0.5 * fbm(x * 0.9 + b.x, z * 0.9 - b.z)
    v += b.amp * Math.exp(-(dx * dx + dz * dz) / (b.spread * b.spread * wob))
  }
  // narrow saddle channels between selected basins only
  for (const [i, j] of TERRAIN_CHANNELS) {
    const a = TERRAIN_BASINS[i], b = TERRAIN_BASINS[j]
    const vx = b.x - a.x, vz = b.z - a.z
    const L2 = vx * vx + vz * vz
    const t = Math.max(0, Math.min(1, ((x - a.x) * vx + (z - a.z) * vz) / L2))
    const cxp = a.x + t * vx, czp = a.z + t * vz
    const d2 = (x - cxp) * (x - cxp) + (z - czp) * (z - czp)
    v += 0.32 * Math.exp(-d2 / 0.012) // thin saddle
  }
  // fine terrain grain
  v *= 0.7 + 0.6 * fbm(x * 1.6 + 20, z * 1.6)
  return v
}

function genTerrain(s: Sink): void {
  const n = s.n
  // find field max for importance sampling
  let tmax = 1e-6
  for (const b of TERRAIN_BASINS) tmax = Math.max(tmax, terrainField(b.x, b.z))
  tmax *= 1.1
  const floor = tmax * 0.16 // below this the terrain is EMPTY → negative space + channels
  let guard = 0
  const maxGuard = n * 120
  while (s.i < n && guard < maxGuard) {
    guard++
    const x = -1.0 + Math.random() * 4.4
    const z = -3.0 + Math.random() * 6.0
    const f = terrainField(x, z)
    if (f < floor) continue                       // carve negative space between continents
    if (Math.random() > (f - floor) / (tmax - floor)) continue
    // tier from field magnitude: high terrain = dense basin core, low = periphery
    const fn = Math.min(1, f / tmax)
    const tier = 1 - Math.pow(fn, 0.7)
    put(s, x + gaussian() * 0.02, z + gaussian() * 0.02, tier)
  }
  // top up atmospheric if short
  while (s.i < n) put(s, 0.4 + Math.random() * 2.4, -2 + Math.random() * 4, 0.95)
}

// ============================================================================
// C — DISTRIBUTED INTELLIGENCE : discrete node-graph. 1 dominant + several
// unequal satellites, SPARSE edges (not all-to-all, some incomplete), some
// isolated nodes, spanning the wider right field.
// ============================================================================
// An intelligence region = several overlapping ELONGATED lobes (never a disc),
// deformed edges + carved internal voids → an irregular, fractured silhouette.
interface Lobe { dx: number; dz: number; ex: number; ez: number; ang: number; w: number; tier: number }
interface Region { cx: number; cz: number; lobes: Lobe[]; budget: number; voids: boolean }
function depositMass(s: Sink, r: Region): void {
  const totalW = r.lobes.reduce((a, l) => a + l.w, 0)
  const cnt = Math.floor(r.budget)
  for (let k = 0; k < cnt; k++) {
    let pick = Math.random() * totalW
    let lobe = r.lobes[0]
    for (const l of r.lobes) { pick -= l.w; if (pick <= 0) { lobe = l; break } }
    const ca = Math.cos(lobe.ang), sa = Math.sin(lobe.ang)
    const u = gaussian() * lobe.ex, v = gaussian() * lobe.ez
    let x = r.cx + lobe.dx + (u * ca - v * sa)
    let z = r.cz + lobe.dz + (u * sa + v * ca)
    // fractured edges (asymmetric deformation)
    x += (vnoise(x * 2.6 + 3, z * 2.6) - 0.5) * 0.16
    z += (vnoise(x * 2.6, z * 2.6 - 5) - 0.5) * 0.16
    // internal fissures / local voids
    if (r.voids && vnoise(x * 3.6 + 11, z * 3.6) > 0.73) continue
    // internal density gradient → denser toward the lobe centre
    const dc = Math.hypot(u / (lobe.ex + 1e-3), v / (lobe.ez + 1e-3))
    put(s, x, z, lobe.tier + Math.min(0.25, dc * 0.12) + (Math.random() - 0.5) * 0.06)
  }
}

// A CURRENT = an extremely BROAD, sparse, partially-BROKEN flow field between
// regions. Whole segments drop out (gaps), grains are faint (high tier). Implies
// shared computational flow — never a visible connector line.
function depositCurrent(s: Sink, a: number[], b: number[], budget: number, width: number): void {
  const dx = b[0] - a[0], dz = b[1] - a[1], len = Math.hypot(dx, dz) + 1e-6
  const px = -dz / len, pz = dx / len
  const bow = (Math.random() - 0.5) * 0.55 * len
  const c1x = (a[0] + b[0]) / 2 + px * bow, c1z = (a[1] + b[1]) / 2 + pz * bow
  const steps = 72
  const per = Math.max(1, Math.floor(budget / steps))
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const u = 1 - t
    const x = u * u * a[0] + 2 * u * t * c1x + t * t * b[0]
    const z = u * u * a[1] + 2 * u * t * c1z + t * t * b[1]
    const flow = vnoise(x * 1.5 + t * 3, z * 1.5) // large-scale flow modulation
    if (flow < 0.44) continue                     // whole broken-out segments
    const cnt = Math.floor(per * (flow - 0.44) * 1.9)
    for (let k = 0; k < cnt; k++) {
      const off = (gaussian() + gaussian()) * 0.5 * width // broad, soft-edged
      put(s, x + px * off + (Math.random() - 0.5) * 0.12, z + pz * off + (Math.random() - 0.5) * 0.12, 0.74 + 0.16 * t)
    }
  }
}

// C — DISTRIBUTED INTELLIGENCE (B1.5 polish). ONE unmistakable hero core (larger,
// horizontally expansive, fractured, non-figurative) + 2 secondary regions + a
// few micro-clusters, tied together by broad sparse currents (not islands). The
// bean/wing silhouettes are broken; the ambient field absorbs the loose matter.
function genDistributed(s: Sink): void {
  const n = s.n
  // ---- HERO CORE: 3 overlapping regions expanding HORIZONTALLY (no wings/tail),
  // fractured edges + internal fissures + asymmetric dissolution. ~40% of budget. --
  depositMass(s, {
    cx: 0.74, cz: 0.0, budget: n * 0.42, voids: true,
    lobes: [
      { dx: 0.0, dz: 0.0, ex: 0.54, ez: 0.26, ang: -0.08, w: 1.0, tier: 0.0 },   // dense wide core
      { dx: 0.5, dz: 0.05, ex: 0.44, ez: 0.22, ang: 0.12, w: 0.72, tier: 0.1 },  // horizontal expansion →
      { dx: -0.18, dz: -0.05, ex: 0.3, ez: 0.2, ang: -0.22, w: 0.46, tier: 0.16 }, // small fractured left
    ],
  })
  // ---- 2 SECONDARY regions — preserve the elongated directional language ----
  depositMass(s, {
    cx: 2.05, cz: -1.0, budget: n * 0.12, voids: true,
    lobes: [{ dx: 0, dz: 0, ex: 0.42, ez: 0.19, ang: 0.5, w: 1, tier: 0.34 }, { dx: 0.24, dz: 0.16, ex: 0.22, ez: 0.13, ang: 0.1, w: 0.5, tier: 0.44 }],
  })
  depositMass(s, {
    cx: 1.6, cz: 1.55, budget: n * 0.1, voids: true,
    lobes: [{ dx: 0, dz: 0, ex: 0.38, ez: 0.2, ang: -0.5, w: 1, tier: 0.36 }, { dx: 0.2, dz: -0.14, ex: 0.2, ez: 0.12, ang: -0.15, w: 0.5, tier: 0.46 }],
  })
  // ---- one elongated upper-right region that crops the edge (directional) ----
  depositMass(s, { cx: 3.15, cz: 0.4, budget: n * 0.05, voids: false, lobes: [{ dx: 0, dz: 0, ex: 0.32, ez: 0.14, ang: 0.22, w: 1, tier: 0.48 }] })
  // ---- a few micro-clusters — elongated/fractured, NOT closed beans ----
  depositMass(s, { cx: 2.55, cz: 0.45, budget: n * 0.016, voids: true, lobes: [{ dx: 0, dz: 0, ex: 0.18, ez: 0.1, ang: 0.3, w: 1, tier: 0.6 }] })
  depositMass(s, { cx: 1.15, cz: 1.1, budget: n * 0.014, voids: true, lobes: [{ dx: 0, dz: 0, ex: 0.17, ez: 0.11, ang: -0.3, w: 1, tier: 0.62 }] })
  // lower-right: a fractured directional STREAK (breaks the old bean silhouette)
  depositMass(s, { cx: 2.35, cz: -1.95, budget: n * 0.02, voids: true, lobes: [{ dx: 0, dz: 0, ex: 0.34, ez: 0.1, ang: 0.35, w: 1, tier: 0.58 }] })
  // ---- 3 broad sparse currents implying shared flow (NOT connector lines) ----
  depositCurrent(s, [1.15, 0.1], [3.0, 0.35], n * 0.032, 0.42)   // hero → upper-right
  depositCurrent(s, [0.9, -0.2], [2.0, -1.0], n * 0.03, 0.38)    // hero → lower secondary
  depositCurrent(s, [0.85, 0.2], [1.6, 1.5], n * 0.028, 0.36)    // hero → upper secondary
  // ---- restrained ambient field (~5%) absorbing the loose matter ----
  const ambient = Math.floor(n * 0.045)
  for (let k = 0; k < ambient && s.i < n; k++) {
    put(s, 0.4 + Math.random() * 3.0, -2.5 + Math.random() * 4.7, 0.95)
  }
}

// ---- public: generate final target positions + per-particle tier ----
export function generateTargets(id: TopoId, n: number): { pos: Float32Array; tier: Float32Array } {
  const s: Sink = { pos: new Float32Array(n * 3), tier: new Float32Array(n), i: 0, n }
  if (id === "A") genArtery(s)
  else if (id === "B") genTerrain(s)
  else genDistributed(s)
  // pad any exclusion-shortfall by mirroring earlier accepted grains to the right
  while (s.i < n && s.i > 0) {
    const src = Math.floor(Math.random() * s.i)
    s.pos[s.i * 3] = s.pos[src * 3]; s.pos[s.i * 3 + 1] = s.pos[src * 3 + 1]; s.pos[s.i * 3 + 2] = s.pos[src * 3 + 2]
    s.tier[s.i] = s.tier[src]; s.i++
  }
  return { pos: s.pos, tier: s.tier }
}

// ---- camera + bounds (frame on the nucleus; corridors crop beyond edges) ----
// FIXED for all candidates (frames the ANCHOR, not a per-candidate nucleus) so
// A/B/C are compared under an identical camera / framing / point scale.
export function reviewCameraPose(aspect: number): {
  pos: [number, number, number]; look: [number, number, number]; fov: number
} {
  const cx = ANCHOR[0] * TOPO_SCALE + GROUP_OFFSET[0]
  const cz = ANCHOR[1] * TOPO_SCALE + GROUP_OFFSET[2]
  const tanHalf = Math.tan((REVIEW_FOV * Math.PI) / 180 / 2)
  const frameR = 1.4
  const dist = frameR / (0.5 * tanHalf)
  const halfW = dist * tanHalf * Math.max(1.1, aspect)
  const lookX = cx - 0.42 * halfW           // anchor sits ~71% screen-x (right field)
  const lookZ = cz + 0.1
  const elev = (60 * Math.PI) / 180
  return {
    pos: [lookX, Math.sin(elev) * dist, lookZ + Math.cos(elev) * dist],
    look: [lookX, 0, lookZ],
    fov: REVIEW_FOV,
  }
}

export function topoBounds(id: TopoId): { cx: number; cz: number; radius: number } {
  const [x, z] = NUCLEUS[id]
  return { cx: x, cz: z, radius: 2.4 }
}
