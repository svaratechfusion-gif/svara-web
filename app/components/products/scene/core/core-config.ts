// SVARA INTELLIGENCE CORE — configuration.
//
// The "design tokens" of the WebGL layer: every colour, count and geometry
// number lives here rather than as magic numbers inside the builders, because a
// three.js material cannot read the CSS custom properties the rest of the scene
// uses. Keep the colours in step with `styles/product-scene.css`.
//
// Ported from the Auralis particle scene's architecture — NOT its look. Two
// things invert on a white page and drive most of the differences below:
//   · Auralis dissolves particles into a DARK fog; here depth fades to WHITE, or
//     the object reads as a hole punched in the page.
//   · Auralis leans on additive bloom. Additive bloom over white is invisible,
//     so there is no post-processing chain at all — the "glow" is carried by
//     brighter, larger hero particles instead. That also buys back the frame
//     budget an EffectComposer would have cost.

/** Rounded-cube exponent for the core volume. 2 = sphere, ∞ = cube. 4 reads as
 *  an engineered object rather than a crystal ball. */
export const SUPERQUADRIC_N = 4

export interface CoreQuality {
  /** Particles in the dense body. */
  core: number
  /** Particles in the bright nucleus. */
  nucleus: number
  /** Particles in the sparse outer halo. */
  halo: number
  /** Upper bound on device pixel ratio. */
  maxDpr: number
  /** Wireframe subdivision of the containment shell. */
  fieldDetail: number
}

/**
 * Particle budgets per class of device. The counts sit at the lower end of the
 * brief's ranges on purpose: these are `Points`, not instanced spheres, so they
 * carry far more visual weight per particle than Auralis's instanced geometry —
 * and this canvas shares a frame with ten live dashboards further down the page.
 */
export const QUALITY: Record<'desktop' | 'tablet' | 'mobile', CoreQuality> = {
  // `fieldDetail` is the icosahedron subdivision. 2 (320 faces) reads as a smooth
  // sphere outline — a bubble. 1 (80 faces) reads as a geodesic lattice, which is
  // the engineering-envelope look the field is for.
  desktop: { core: 26000, nucleus: 3600, halo: 3200, maxDpr: 2, fieldDetail: 1 },
  tablet: { core: 15000, nucleus: 2200, halo: 2000, maxDpr: 1.75, fieldDetail: 1 },
  mobile: { core: 7500, nucleus: 1200, halo: 1200, maxDpr: 1.5, fieldDetail: 0 },
}

export function pickQuality(width: number): CoreQuality {
  if (width < 768) return QUALITY.mobile
  if (width < 1180) return QUALITY.tablet
  return QUALITY.desktop
}

export const PALETTE = {
  /** Shadow side of the form — deep SVARA navy. */
  shadow: '#0E2148',
  /** Lit side — SVARA blue. */
  lit: '#2F7FE6',
  /** Highlight on the brightest particles — soft cyan-blue, never neon. */
  highlight: '#7FC9F2',
  /** The page. Depth and the halo dissolve into this. */
  fog: '#FFFFFF',
  /** Containment lattice. */
  field: '#2F7FE6',
} as const

export const GEOMETRY = {
  /** Half-extent of the core body, in world units. */
  radius: 1,
  /** Radius of the dense nucleus. */
  nucleusRadius: 0.3,
  /** How far the sparse halo reaches. */
  haloRadius: 1.85,
  /** Fraction of core samples kept regardless of depth — the interior density
   *  that stops it reading as a hollow shell.
   *
   *  These two numbers are what decide whether the object reads as ENGINEERED or
   *  as a fuzzy ball. A shallow curve spreads particles evenly through the volume,
   *  and an evenly-filled volume of any shape projects to a circle — the
   *  superquadric silhouette simply never appears. A steep curve concentrates them
   *  on the surface, so the rounded-cube form is legible, while the floor keeps
   *  enough interior to read as solid rather than as a shell. */
  shellFloor: 0.06,
  /** How sharply density climbs toward the surface. */
  shellPower: 6,
  /** Containment shell radius. */
  fieldRadius: 1.42,
} as const

export const MOTION = {
  /** Continuous spin, radians/second. Slow enough that you notice it only if you look. */
  spin: 0.042,
  /** How far the cursor may turn the object, radians. ~12% visual response. */
  pointerYaw: 0.2,
  pointerPitch: 0.12,
  /** Per-frame easing toward the pointer target — spring-like, never tracking. */
  pointerEase: 0.045,
  /** Breathing period, seconds, and amplitude as a fraction of radius. */
  breathAmp: 0.014,
  breathSpeed: 0.34,
  /** Per-particle positional noise amplitude. */
  driftAmp: 0.03,
  driftSpeed: 0.22,
} as const

/**
 * Point sprite sizing. These are NOT world units — they are the numerator of
 * `size × (drawingBufferHeight / 2) / depth`, so the rendered diameter in CSS px
 * is roughly `size × viewportHeight / 2 / cameraDistance`. At an 800px-tall
 * viewport with the camera ~6 units out, `0.034` lands at ~2.3 CSS px, which is
 * the smallest a bead can be and still read as a lit sphere rather than noise.
 */
export const SIZING = {
  core: 0.034,
  nucleus: 0.044,
  halo: 0.026,
  /** Fraction of particles rendered oversized and brighter — the "hero" beads
   *  that stand in for the bloom pass this scene does not run. */
  heroFraction: 0.05,
  heroScale: 2.5,
} as const
