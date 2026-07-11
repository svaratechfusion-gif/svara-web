// Helios Engine — central configuration. Every tunable lives here.

export interface HeliosOptions {
  /** show FPS / counts / timings / bounding box */
  debug?: boolean
  /** override particle count (perf tiers) */
  particleCount?: number
}

export const HeliosConfig = {
  // ---- entity sampling ----
  particleCount: 3200,
  /** shell thickness around the SDF surface that particles may occupy */
  shellThickness: 0.06,

  // ---- particles ----
  particleSizeMin: 0.008,
  particleSizeMax: 0.02,

  // ---- connections ----
  /** neighbors linked per particle (rest topology, computed once) */
  neighborsPerParticle: 3,
  /** max rest distance for a valid connection */
  maxConnectionDistance: 0.16,
  /** opacity fades to 0 as a connection stretches to this multiple */
  maxStretch: 1.9,
  lineOpacity: 0.32,

  // ---- spring physics ----
  springStiffness: 26,     // pull toward rest position
  springDamping: 5.2,      // velocity damping
  cursorRadius: 0.55,      // world units of influence
  cursorStrength: 2.6,     // repulsion impulse scale
  maxDt: 1 / 30,           // clamp integration step

  // ---- camera ----
  fov: 35,
  cameraZ: 5.1,
  cameraY: 0.62,
  /** breathing: amplitude (world units) & period (s) — camera only */
  cameraBreatheAmp: 0.045,
  cameraBreathePeriod: 10,
  /** entity breathing: uniform scale amplitude & period */
  entityBreatheAmp: 0.004,
  entityBreathePeriod: 8,

  // ---- palette (white environment; no neon/purple/bloom) ----
  colors: {
    white: 0xffffff,
    softCyan: 0x8fd1ff,
    blue: 0x4d9dff,     // SVARA Blue
    navy: 0x102a5b,
  },
  /** particle color mix weights [white, softCyan, blue, navy] */
  colorWeights: [0.18, 0.3, 0.38, 0.14],

  // ---- renderer ----
  maxPixelRatio: 2,
  clearAlpha: 0,           // transparent — page paints the white world
} as const

export type HeliosPalette = typeof HeliosConfig.colors
