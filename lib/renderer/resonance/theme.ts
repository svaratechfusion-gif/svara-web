// SVARA Resonance — two evaluation modes for Prototype A2 (State A only).
// DARK MINERAL: graphite room, ivory type, titanium powder.
// VANILLA CERAMIC: warm ivory room, deep-navy type, dark mineral powder.
// One source of truth: the R3F scene (plate/room/lights) and the grain material
// both read their numbers from here so the two modes stay coherent.

export type ThemeName = "dark" | "light"

type RGB = [number, number, number]

export interface GrainPalette {
  graphite: RGB // majority — deep matte mineral
  titanium: RGB // structural mid, catches light
  warmSilver: RGB // warmer metallic accent
  ceramic: RGB // rare bright grain (sparkle anchor)
  lavender: RGB // extremely restrained optical highlight
}

export interface ResonanceThemeDef {
  // ---- grain material (drives the ShaderMaterial uniforms) ----
  grain: GrainPalette
  lightDir: RGB // eye-space key direction (normalised in shader)
  warm: RGB // specular glint colour
  ambient: RGB // ambient fill colour on each grain
  lavenderSpec: RGB // restrained lavender-mist glint during resonance
  grainExposure: number // overall grain brightness trim
  size: number // uSize base (perceived grain diameter)
  amplitude: number // dormant motion amplitude

  // ---- scene (plate + room + post) ----
  scene: {
    ambientColor: string
    ambientIntensity: number
    keyColor: string
    keyIntensity: number
    keyPos: RGB
    fillColor: string
    fillIntensity: number
    envPreset: "apartment" | "studio" | "city" | "warehouse"
    envIntensity: number
    plateColor: string
    plateMetal: number
    plateRough: number
    rimColor: string
    rimOpacity: number
    floorColor: string
    bloomThreshold: number
    bloomIntensity: number
    toneExposure: number
  }
}

export const THEMES: Record<ThemeName, ResonanceThemeDef> = {
  // ── DARK MINERAL ────────────────────────────────────────────────────────
  dark: {
    grain: {
      graphite: [0.05, 0.053, 0.062],
      titanium: [0.19, 0.19, 0.208],
      warmSilver: [0.31, 0.28, 0.235],
      ceramic: [0.46, 0.45, 0.44],
      lavender: [0.30, 0.28, 0.40],
    },
    lightDir: [0.5, 0.55, 0.68],
    warm: [1.0, 0.88, 0.62],
    ambient: [0.34, 0.4, 0.55],
    lavenderSpec: [0.52, 0.46, 0.72],
    grainExposure: 1.0,
    size: 1.55,
    amplitude: 0.007,
    scene: {
      ambientColor: "#8ea0c0",
      ambientIntensity: 0.22,
      keyColor: "#ffe6b8",
      keyIntensity: 2.4,
      keyPos: [5, 6, 3],
      fillColor: "#7f97c8",
      fillIntensity: 0.45,
      envPreset: "apartment",
      envIntensity: 0.4,
      plateColor: "#0c1420",
      plateMetal: 0.22,
      plateRough: 0.78,
      rimColor: "#2f3540",
      rimOpacity: 0.45,
      floorColor: "#08080a",
      bloomThreshold: 0.78,
      bloomIntensity: 0.26,
      toneExposure: 1.05,
    },
  },

  // ── VANILLA CERAMIC ─────────────────────────────────────────────────────
  light: {
    grain: {
      // On a bright ivory field grains must read DARK to be visible — the
      // powder is dark mineral dust, the sparkle comes from specular glints.
      graphite: [0.055, 0.058, 0.07],
      titanium: [0.14, 0.14, 0.16],
      warmSilver: [0.24, 0.21, 0.18],
      ceramic: [0.34, 0.33, 0.33],
      lavender: [0.24, 0.2, 0.33],
    },
    lightDir: [0.42, 0.6, 0.62],
    warm: [1.0, 0.93, 0.74],
    ambient: [0.13, 0.14, 0.19],
    // vanilla lavender mist (#D2C3F6-ish), reads only on the glint
    lavenderSpec: [0.62, 0.53, 0.82],
    grainExposure: 1.0,
    size: 1.45,
    amplitude: 0.007,
    scene: {
      ambientColor: "#efe9d8",
      ambientIntensity: 0.5,
      keyColor: "#fff4d8",
      keyIntensity: 2.1,
      keyPos: [4, 6, 3],
      fillColor: "#d0d6e6",
      fillIntensity: 0.5,
      envPreset: "apartment",
      envIntensity: 0.95,
      plateColor: "#e8e3d3",
      plateMetal: 0.05,
      plateRough: 0.9,
      rimColor: "#cabfa6",
      rimOpacity: 0.35,
      floorColor: "#efe9d8",
      bloomThreshold: 0.86,
      bloomIntensity: 0.18,
      toneExposure: 1.1,
    },
  },
}

export function resolveTheme(name: string | undefined): ThemeName {
  return name === "light" ? "light" : "dark"
}
