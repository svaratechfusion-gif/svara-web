// SVARA INTELLIGENCE CORE — the particle object itself.
//
// Three nested populations, sampled once at build time into a single draw call:
//
//   NUCLEUS   a small dense centre — the thing that reads as "there is something
//             solid in here" rather than a puff of smoke
//   BODY      a rounded-cube (superquadric) volume, density biased toward the
//             surface but never hollow, carrying a baked directional shade
//   HALO      sparse strays falling off with distance, dissolving into the page
//
// Auralis builds its clouds from instanced spheres with a patched
// MeshStandardMaterial — ~96 triangles per particle, which is affordable when the
// scene IS the page. Here the object shares a page with ten live dashboards, so
// this uses GPU point sprites: one draw call, depth-attenuated sizes, and the
// lighting BAKED per particle from the analytic superquadric normal. The form
// still reads as lit and solid; it just costs a fraction of the fill.
//
// The layout is seeded, so the composition is identical on every load.
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  NormalBlending,
  Points,
  ShaderMaterial,
} from 'three'
import { seededRandom } from '~/composables/useSystemSim'
import { GEOMETRY, MOTION, PALETTE, SIZING, SUPERQUADRIC_N, type CoreQuality } from './core-config'

const SEED = 20260820
/** Direction the key light arrives from. Up, front and slightly left. */
const LIGHT = [-0.42, 0.76, 0.5] as const

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uSizeScale;
  uniform float uBreath;
  uniform float uFogNear;
  uniform float uFogFar;
  uniform float uDriftAmp;

  attribute float aSeed;
  attribute float aScale;
  attribute float aShade;
  attribute float aRadial;
  attribute float aHero;
  attribute vec3 aDrift;

  varying float vShade;
  varying float vRadial;
  varying float vHero;
  varying float vFog;

  void main() {
    vec3 p = position;

    // The whole form inhales — a single shared breath, not per-particle noise,
    // so it reads as one object expanding rather than a cloud jittering.
    p *= 1.0 + uBreath * ${MOTION.breathAmp.toFixed(4)};

    // Per-particle drift on its own phase. Amplitude is a uniform so reduced
    // motion can take it to zero without rebuilding the geometry.
    float phase = aSeed * 6.2831853;
    p += aDrift * sin(uTime * ${MOTION.driftSpeed.toFixed(3)} + phase) * uDriftAmp;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float depth = -mv.z;
    gl_Position = projectionMatrix * mv;

    // Perspective size attenuation — this, plus the fog below, is what makes a
    // sprite cloud read as a volume instead of a flat texture.
    gl_PointSize = aScale * (uSizeScale / max(depth, 0.001));

    vShade = aShade;
    vRadial = aRadial;
    vHero = aHero;
    vFog = smoothstep(uFogNear, uFogFar, depth);
  }
`

const FRAGMENT = /* glsl */ `
  uniform vec3 uShadow;
  uniform vec3 uLit;
  uniform vec3 uHighlight;
  uniform vec3 uFog;
  uniform float uOpacity;

  varying float vShade;
  varying float vRadial;
  varying float vHero;
  varying float vFog;

  void main() {
    // Soft round bead. The wide smoothstep is the whole reason this doesn't look
    // like confetti — hard-edged squares are the tell of an untreated point cloud.
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.12, d);
    if (a < 0.01) discard;

    vec3 col = mix(uShadow, uLit, vShade);
    // Hero beads carry the highlight. They stand in for the bloom pass that an
    // additive composite over a white page could never deliver.
    col = mix(col, uHighlight, vHero * 0.8);
    // Periphery and depth both dissolve into the page, never into darkness.
    col = mix(col, uFog, vRadial * 0.32);
    col = mix(col, uFog, vFog);

    float alpha = a * uOpacity * (1.0 - vFog * 0.85) * (1.0 - vRadial * 0.58);
    gl_FragColor = vec4(col, alpha);
  }
`

export interface CoreObject {
  points: Points<BufferGeometry, ShaderMaterial>
  /** Keep point-size attenuation correct when the drawing buffer resizes. */
  resize: (drawingBufferHeight: number) => void
  dispose: () => void
}

/** Outward normal of the superquadric at a point — analytic, so the shade is
 *  exact rather than approximated from the position vector. */
function superquadricNormal(x: number, y: number, z: number): [number, number, number] {
  const e = SUPERQUADRIC_N - 1
  const nx = Math.sign(x) * Math.abs(x) ** e
  const ny = Math.sign(y) * Math.abs(y) ** e
  const nz = Math.sign(z) * Math.abs(z) ** e
  const len = Math.hypot(nx, ny, nz) || 1
  return [nx / len, ny / len, nz / len]
}

export function buildCore(quality: CoreQuality): CoreObject {
  const random = seededRandom(SEED)
  const total = quality.core + quality.nucleus + quality.halo

  const positions = new Float32Array(total * 3)
  const drift = new Float32Array(total * 3)
  const seeds = new Float32Array(total)
  const scales = new Float32Array(total)
  const shades = new Float32Array(total)
  const radials = new Float32Array(total)
  const heroes = new Float32Array(total)

  let i = 0

  /** Common per-particle setup: drift vector, seed, hero flag, size. */
  const write = (x: number, y: number, z: number, shade: number, radial: number, size: number): void => {
    positions[i * 3] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z
    // Drift direction is random but its magnitude scales with distance from the
    // centre, so the nucleus stays put and the outskirts breathe the most.
    const amp = MOTION.driftAmp * (0.25 + radial)
    drift[i * 3] = (random() * 2 - 1) * amp
    drift[i * 3 + 1] = (random() * 2 - 1) * amp
    drift[i * 3 + 2] = (random() * 2 - 1) * amp
    seeds[i] = random()
    shades[i] = shade
    radials[i] = radial
    const isHero = random() < SIZING.heroFraction
    heroes[i] = isHero ? 1 : 0
    scales[i] = size * (0.72 + random() * 0.56) * (isHero ? SIZING.heroScale : 1)
    i += 1
  }

  // ── BODY — rejection-sampled inside the superquadric ─────────────────────
  const { radius, nucleusRadius, haloRadius, shellFloor, shellPower } = GEOMETRY
  let guard = 0
  const maxGuard = quality.core * 80
  while (i < quality.core && guard < maxGuard) {
    guard += 1
    const x = random() * 2 - 1
    const y = random() * 2 - 1
    const z = random() * 2 - 1
    const d = Math.abs(x) ** SUPERQUADRIC_N + Math.abs(y) ** SUPERQUADRIC_N + Math.abs(z) ** SUPERQUADRIC_N
    if (d > 1) continue
    // Superquadric "radius" 0 → 1. Density climbs toward the surface, but never
    // to zero inside: `shellFloor` is the interior volume you can see through
    // the shell, and it is what separates a solid from a bubble.
    const r = d ** (1 / SUPERQUADRIC_N)
    if (random() > shellFloor + (1 - shellFloor) * r ** shellPower) continue

    const [nx, ny, nz] = superquadricNormal(x, y, z)
    const lambert = nx * LIGHT[0] + ny * LIGHT[1] + nz * LIGHT[2]
    // Wrapped lighting: even the shadow side keeps some value, or the unlit half
    // of the form disappears against nothing.
    const shade = Math.min(1, Math.max(0, 0.5 + lambert * 0.5) ** 1.35)
    write(x * radius, y * radius, z * radius, shade, r * 0.42, SIZING.core)
  }

  // ── NUCLEUS — dense and DARK ─────────────────────────────────────────────
  // Counter-intuitively the centre is the least lit part, not the brightest.
  // A bright saturated centre is exactly the "glowing orb" read the brief rules
  // out; a dense dark mass behind a blue-lit shell is what makes the object feel
  // like it has weight.
  const nucleusEnd = i + quality.nucleus
  while (i < nucleusEnd) {
    // Direction on the sphere, radius biased inward for a genuinely dense centre.
    const u = random() * 2 - 1
    const theta = random() * Math.PI * 2
    const s = Math.sqrt(1 - u * u)
    const r = nucleusRadius * random() ** 0.55
    const x = s * Math.cos(theta) * r
    const y = s * Math.sin(theta) * r
    const z = u * r
    write(x, y, z, 0.2 + random() * 0.24, (r / nucleusRadius) * 0.08, SIZING.nucleus)
  }

  // ── HALO — sparse strays dissolving into the page ────────────────────────
  const haloEnd = i + quality.halo
  while (i < haloEnd) {
    const u = random() * 2 - 1
    const theta = random() * Math.PI * 2
    const s = Math.sqrt(1 - u * u)
    // Cubic bias keeps most strays hugging the body. A shallower curve scatters
    // isolated dots across the whole frame, and isolated dark dots on a white page
    // read as dirt on the screen, not as atmosphere.
    const r = radius * 1.05 + random() ** 3 * (haloRadius - radius * 1.05)
    const x = s * Math.cos(theta) * r
    const y = s * Math.sin(theta) * r
    const z = u * r
    const t = (r - radius) / (haloRadius - radius)
    write(x, y, z, 0.45 + random() * 0.3, 0.46 + t * 0.54, SIZING.halo)
  }

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(positions, 3))
  geometry.setAttribute('aDrift', new BufferAttribute(drift, 3))
  geometry.setAttribute('aSeed', new BufferAttribute(seeds, 1))
  geometry.setAttribute('aScale', new BufferAttribute(scales, 1))
  geometry.setAttribute('aShade', new BufferAttribute(shades, 1))
  geometry.setAttribute('aRadial', new BufferAttribute(radials, 1))
  geometry.setAttribute('aHero', new BufferAttribute(heroes, 1))

  const material = new ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uSizeScale: { value: 500 },
      uBreath: { value: 0 },
      uOpacity: { value: 0 },
      uDriftAmp: { value: 1 },
      uFogNear: { value: 6 },
      uFogFar: { value: 10 },
      uShadow: { value: new Color(PALETTE.shadow) },
      uLit: { value: new Color(PALETTE.lit) },
      uHighlight: { value: new Color(PALETTE.highlight) },
      uFog: { value: new Color(PALETTE.fog) },
    },
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    transparent: true,
    // Dark beads on a light page: normal blending. Additive — Auralis's choice
    // against a black backdrop — would only ever brighten white toward white.
    blending: NormalBlending,
    // Sprites this soft gain nothing from depth sorting and lose the popping
    // that comes with it; depth is carried by size attenuation and fog.
    depthWrite: false,
    depthTest: false,
  })

  const points = new Points(geometry, material)
  points.frustumCulled = false
  points.renderOrder = 0

  return {
    points,
    resize: (drawingBufferHeight: number) => {
      material.uniforms.uSizeScale.value = drawingBufferHeight * 0.5
    },
    dispose: () => {
      geometry.dispose()
      material.dispose()
    },
  }
}