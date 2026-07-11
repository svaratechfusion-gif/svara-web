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
  particleSizeMin: 0.008,
  particleSizeMax: 0.02,

  // ---- connections ----
  neighborsPerParticle: 3,
  maxConnectionDistance: 0.16,
  maxStretch: 1.9,
  lineOpacity: 0.32,

  // ---- spring physics ----
  springStiffness: 26,
  springDamping: 5.2,
  cursorRadius: 0.55,
  cursorStrength: 2.6,
  maxDt: 1 / 30,

  // ---- camera ----
  fov: 35,
  cameraZ: 5.1,
  cameraY: 0.62,
  cameraBreatheAmp: 0.045,
  cameraBreathePeriod: 10,
  entityBreatheAmp: 0.004,
  entityBreathePeriod: 8,

  // ---- morph state timing (seconds) ----
  assembleDuration: 2.2,
  dissolveDuration: 1.8,
  reconstructDuration: 1.4,
  /** flow field: spatial frequency + drift amplitude */
  flowFrequency: 1.6,
  flowAmplitude: 0.14,
  /** radius of the scattered cloud used by assemble/dissolve */
  scatterRadius: 2.6,

  // ---- palette (white environment; no neon/purple/bloom) ----
  colors: {
    white: 0xffffff,
    softCyan: 0x8fd1ff,
    blue: 0x4d9dff,
    navy: 0x102a5b,
  },
  colorWeights: [0.18, 0.3, 0.38, 0.14],

  // ---- renderer ----
  maxPixelRatio: 2,
  clearAlpha: 0,
} as const
