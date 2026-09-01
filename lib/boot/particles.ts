// BOOT PARTICLES — turns the SVARA logo into a point cloud that assembles itself.
//
// The logo is rasterised once into an offscreen canvas and its opaque pixels become
// particle targets, so the assembled form is the REAL logo (every curve of the mark and
// the wordmark), not an approximation drawn by hand. Sampling is on a fixed grid step,
// tuned so the cloud lands near TARGET_POINTS regardless of the viewport it is drawn at.
//
// Same-origin SVG → the canvas is never tainted, so getImageData is allowed.

/** Roughly how many particles we want on screen; the sample step is derived from this. */
const TARGET_POINTS = 12000
/** Never sample finer than this, or a big viewport melts the main thread. */
const MIN_STEP = 2
/**
 * Rasterise for SAMPLING at this width, not at display size. getImageData has to read
 * back every pixel, and doing that on a 720px-wide bitmap measured ~2s — long enough to
 * blow the entire boot budget before a single particle moved. The cloud is ~7000 points
 * either way; sampling a small raster and scaling the coordinates up is visually
 * identical and roughly an order of magnitude cheaper.
 */
const RASTER_W = 420

export interface Point {
  /** target position, in canvas pixels */
  tx: number
  ty: number
  /** start position (scatter origin) — kept so the whole cloud can be driven from one
      normalised 0→1 value instead of 7000 individual tweens */
  sx: number
  sy: number
  /** 0..1 position in the stagger window, so each particle starts at its own moment */
  d: number
  /** per-particle colour + size, so the cloud reads as a material rather than a blob */
  c: string
  r: number
}

/**
 * The boot palette — LIGHT INK ON A DARK GROUND.
 *
 * The first version put navy particles on a near-white panel and was almost invisible on
 * a real screen: a light 1px dot on a light background carries almost no contrast, and
 * the whole point of a boot screen is that it cannot be missed. Inverting it also matches
 * the site's own dark cinematic language, and keeps the cyan / blue / magenta of the hero
 * glitch (utils/glitch.ts) so the entrance and the headings speak the same colours.
 */
const PALETTE = ['#FFFFFF', '#BFD4FF', '#6BA6FF', '#4C80B7', '#00E5FF', '#FF2A8A']
const WEIGHTS = [0.30, 0.22, 0.18, 0.12, 0.12, 0.06]

function pickColour(rand: number): string {
  let acc = 0
  for (let i = 0; i < PALETTE.length; i++) {
    acc += WEIGHTS[i]!
    if (rand <= acc) return PALETTE[i]!
  }
  return PALETTE[0]!
}

/** Rasterise an image source and read back its opaque pixels as particle targets. */
export async function samplePoints(
  src: string,
  boxW: number,
  boxH: number,
): Promise<Point[]> {
  const img = new Image()
  img.decoding = 'async'
  img.src = src
  await img.decode()

  // Fit the logo inside the box, then rasterise at RASTER_W and scale the resulting
  // coordinates back up to that box.
  const fit = Math.min(boxW / img.width, boxH / img.height)
  const dispW = Math.max(1, Math.round(img.width * fit))
  const dispH = Math.max(1, Math.round(img.height * fit))
  const raster = Math.min(1, RASTER_W / dispW)
  const w = Math.max(1, Math.round(dispW * raster))
  const h = Math.max(1, Math.round(dispH * raster))
  const up = dispW / w   // raster px → display px

  const off = document.createElement('canvas')
  off.width = w
  off.height = h
  const ctx = off.getContext('2d', { willReadFrequently: true })
  if (!ctx) return []
  ctx.drawImage(img, 0, 0, w, h)

  const { data } = ctx.getImageData(0, 0, w, h)

  // derive the grid step from the ink area so the count is stable across viewports
  let ink = 0
  for (let i = 3; i < data.length; i += 4) if (data[i]! > 40) ink++
  const step = Math.max(MIN_STEP, Math.round(Math.sqrt(ink / TARGET_POINTS)) || MIN_STEP)

  const points: Point[] = []
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      const alpha = data[(y * w + x) * 4 + 3]!
      if (alpha < 40) continue
      points.push({
        tx: x * up + (boxW - dispW) / 2,
        ty: y * up + (boxH - dispH) / 2,
        sx: 0, sy: 0, d: 0,
        c: pickColour(Math.random()),
        // a minority of larger dots gives the cloud depth instead of a flat dither
        r: Math.random() < 0.18 ? 2.4 : 1.4,
      })
    }
  }
  return points
}

/**
 * Scatter every particle to its start position: a ring well outside the frame, so the
 * assembly reads as the logo pulling itself together out of noise rather than a fade-in.
 */
export function scatter(points: Point[], w: number, h: number): void {
  const cx = w / 2
  const cy = h / 2
  const radius = Math.hypot(w, h) * 0.62
  // stagger from the centre outward, so the mark resolves before the tagline
  let maxDist = 1
  for (const p of points) maxDist = Math.max(maxDist, Math.hypot(p.tx - cx, p.ty - cy))
  for (const p of points) {
    const a = Math.random() * Math.PI * 2
    const d = radius * (0.45 + Math.random() * 0.75)
    p.sx = cx + Math.cos(a) * d
    p.sy = cy + Math.sin(a) * d * 0.72
    p.x = p.sx
    p.y = p.sy
    p.d = Math.hypot(p.tx - cx, p.ty - cy) / maxDist
  }
}

/** easeOutCubic — the arrival curve, applied per particle in the draw loop. */
const ease = (t: number): number => 1 - Math.pow(1 - t, 3)

/**
 * Place every particle for a single normalised progress value.
 *
 * This is the whole reason the cloud is cheap: ONE tween drives `t`, and the stagger is
 * expressed as a per-particle offset into it. Tweening the 7000 point objects directly
 * (GSAP building 7000 tweens for the assembly and 7000 more for the exit) was adding
 * seconds to the boot on its own.
 */
export function place(points: Point[], t: number, staggerFrac = 0.35): void {
  const span = 1 - staggerFrac
  for (const p of points) {
    const local = ease(Math.min(1, Math.max(0, (t - p.d * staggerFrac) / span)))
    p.x = p.sx + (p.tx - p.sx) * local
    p.y = p.sy + (p.ty - p.sy) * local
  }
}

/** Disperse outward from centre for the exit, driven by the same single value. */
export function disperse(points: Point[], t: number, w: number, h: number): void {
  const cx = w / 2
  const cy = h / 2
  for (const p of points) {
    p.x = p.tx + (p.tx - cx) * 0.6 * t
    p.y = p.ty + (p.ty - cy) * 0.6 * t
  }
}
