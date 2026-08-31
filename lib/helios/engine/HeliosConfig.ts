// Helios · engine — central configuration. Every tunable lives here.

export interface HeliosOptions {
  /** show FPS / counts / timings / bounding box */
  debug?: boolean
  /** hard override of the tier-detected particle budget */
  particleCount?: number
}

export const HeliosConfig = {
  // ---- entity sampling ----
  shellThickness: 0.06,

  // ---- particles ----
  // "Tiny particles only... no oversized nodes."
  particleSizeMin: 0.006,
  particleSizeMax: 0.014,

  // ---- connections ----
  // "Very few connection lines" — both a low per-particle neighbor count
  // and a low base opacity, not just one or the other.
  neighborsPerParticle: 1,
  maxConnectionDistance: 0.25,
  maxStretch: 1.9,
  lineOpacity: 0.06,

  // ---- spring physics ----
  springStiffness: 34,
  springDamping: 7.5,
  /** section gravity — "one particle system, everything else interacts
   *  with it." Gentle strength — a section should read as "particles
   *  drawn toward it," not a hard snap. */
  sectionTargetRadius: 0.9,
  sectionTargetStrength: 0.9,
  maxDt: 1 / 30,

  // ---- camera ----
  // Static — kept at 0 breathing amplitude rather than removing the
  // mechanism (HeliosRenderer.updateCamera) so it stays a one-line,
  // reversible tuning knob, not deleted code.
  fov: 35,
  cameraZ: 5.1,
  cameraY: 0.9,
  cameraBreatheAmp: 0,
  cameraBreathePeriod: 10,

  /** radius of the ambient scatter cloud */
  scatterRadius: 2.6,

  // ---- flow motion ----
  /** base amplitude of the lateral drift — "maximum deviation from the
   *  spline should be very small." Two sine components at different
   *  frequencies (see HeliosMorph Flow state) approximate organic curl-
   *  noise texture without a noise-library dependency; this is the
   *  amplitude of the slower/larger of the two. */
  flowSwayAmp: 0.07,
  /** frequency + relative-amplitude of the second, faster component —
   *  what keeps the drift from reading as one obvious sine wave. */
  flowSwayFreq2: 3.7,
  flowSwayAmp2: 0.35, // × flowSwayAmp
  /** depth-layer fall-speed multipliers — "background very slow, middle
   *  normal, front slightly faster... creates depth without blocking
   *  content." Assigned once per particle (derived from noiseOffset, no
   *  extra random source needed), never reassigned. */
  depthSpeedBack: 0.55,
  depthSpeedMid: 1.0,
  depthSpeedFront: 1.35,

  // ---- orbit (Hero-only halo) ----
  /** fraction of the particle budget that actually orbits — the rest
   *  parks off-screen (see orbitParkY) so the Hero reads as "a small
   *  accent," not "the whole cloud turned on." */
  orbitFraction: 0.14,
  /** halo radius = the Hero image's on-screen half-width × this — sits
   *  past the glass panel's edge, so the orbit reads as a halo around the
   *  artifact rather than being fully hidden behind its blurred glass
   *  (the panel's own backdrop-filter washes out anything drawn behind it
   *  within its bounds, so the halo needs real clearance to read at all). */
  orbitRadiusMultiplier: 1.35,
  /** ± range (of the base radius) per particle, from noiseOffset — avoids
   *  a single flat ring. */
  orbitRadiusJitter: 0.3,
  /** rad/s — slow enough that it reads as "engineered," not spinning. */
  orbitAngularSpeed: 0.09,
  /** gentle vertical bob amplitude, world units. */
  orbitVerticalAmp: 0.18,
  /** parked (non-orbiting) particles sit here — well outside any visible
   *  frame regardless of viewport aspect. */
  orbitParkY: -20,

  // ---- palette (white environment; no neon/purple/bloom) ----
  // "95% white, 5% SVARA blue" — softCyan/blue/navy together are the 5%.
  colors: {
    white: 0xffffff,
    softCyan: 0x8fd1ff,
    blue: 0x4d9dff,
    navy: 0x102a5b,
  },
  colorWeights: [0.95, 0.02, 0.02, 0.01],

  // ---- renderer ----
  maxPixelRatio: 2,
  clearAlpha: 0,
} as const
