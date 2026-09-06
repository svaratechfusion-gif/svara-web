// Evolve particle-head WebGL scene — framework-agnostic (imported client-side only).
// Faithful to the Evolve specification: tens of thousands of glowing points forming a
// human head/shoulders, cream key + pale-silver rim lighting, UnrealBloom at half CSS size,
// a temporal frame-blend + glow-smoothing anti-flicker pair, pointer parallax +
// scatter, per-point idle drift, depth fade, device tiers and idle-skip. Nothing
// here touches the DOM presentation beyond the supplied canvas.
import * as THREE from 'three'
import { isScrolling } from '~~/lib/perf/scroll-activity'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'
import { SavePass } from 'three/examples/jsm/postprocessing/SavePass.js'
import { Pass, FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass.js'

const VERTICES_URL = 'https://storage.getlayers.ai/assets/evolve-f940e12f08/vertices.json'
const TAU = 6.2831853

type Tier = 'mobile' | 'tablet' | 'desktop'
interface TierCfg { dpr: number; stride: number; frameBudget: number; pointScale: number; bloom: boolean; camera: number; modelY: number | null; scale: number | null }
const TIERS: Record<Tier, TierCfg> = {
  mobile: { dpr: 0.85, stride: 4, frameBudget: 1000 / 30, pointScale: 0.68, bloom: false, camera: 4.3, modelY: -0.62, scale: 0.78 },
  tablet: { dpr: 1.25, stride: 2, frameBudget: 1000 / 45, pointScale: 1.1, bloom: true, camera: 4.0, modelY: -0.62, scale: 1.24 },
  desktop: { dpr: 1.5, stride: 1, frameBudget: 0, pointScale: 1, bloom: true, camera: 3.4, modelY: null, scale: null },
}

// ── CAMERA CHAPTERS — one continuous cinematic journey (11 states). Values are
// GENTLE deltas from the locked hero framing, so chapter 0 === the current hero
// EXACTLY (all zero / base). Scroll interpolates between them with an eased hold
// near each chapter. Apple × engineering-film restraint: slow push, slight orbit,
// pull-back, reveal — never thrown around. Tune these; they are the storyboard.
interface Chapter { cam: [number, number, number]; tgt: [number, number, number]; fov: number; scale: number; head: [number, number]; yaw: number; drift: number }
const CHAPTERS: Chapter[] = [
  // 01 Hero — identity (locked look)
  { cam: [0, 0, 0], tgt: [0, 0, 0], fov: 32, scale: 1.00, head: [0, 0], yaw: 0.00, drift: 0.003 },
  // 02 Intelligence Layer — slow push in, head drifts right + grows
  { cam: [0.16, 0.05, -0.5], tgt: [0.18, 0, 0], fov: 31, scale: 1.12, head: [0.12, 0.0], yaw: 0.12, drift: 0.004 },
  // 03 Ecosystem — pull back + up, network expands, head becomes a node
  { cam: [0, 0.30, 1.25], tgt: [0, 0, 0], fov: 37, scale: 0.90, head: [0, 0], yaw: 0.30, drift: 0.005 },
  // 04 Flagship Products — move left toward the product nodes
  { cam: [-0.55, 0.02, -0.2], tgt: [-0.12, 0, 0], fov: 33, scale: 1.02, head: [-0.06, 0], yaw: 0.14, drift: 0.004 },
  // 05 Architecture — travel UP the stack
  { cam: [0, 0.58, 0.2], tgt: [0, 0.30, 0], fov: 34, scale: 0.98, head: [0, 0.02], yaw: 0.05, drift: 0.004 },
  // 06 Industries — gentle orbit right
  { cam: [0.52, 0.06, 0.1], tgt: [0.16, 0, 0], fov: 33, scale: 0.98, head: [0.05, 0], yaw: 0.34, drift: 0.004 },
  // 07 Divisions — gentle orbit left
  { cam: [-0.44, 0.08, 0.15], tgt: [-0.13, 0, 0], fov: 32, scale: 0.98, head: [-0.04, 0], yaw: 0.20, drift: 0.004 },
  // 08 Why SVARA — calmer, mature, slight pull-back to centre
  { cam: [0, 0.10, 0.45], tgt: [0, 0.05, 0], fov: 33, scale: 0.95, head: [0, 0], yaw: 0.10, drift: 0.0035 },
  // 09 Vision — minimal: recede to a central intelligence core
  { cam: [0, 0, 1.6], tgt: [0, 0, 0], fov: 41, scale: 0.80, head: [0, 0.03], yaw: 0.05, drift: 0.003 },
  // 10 Partners — expand again, reconnect
  { cam: [0.30, 0.12, 0.6], tgt: [0.05, 0, 0], fov: 36, scale: 0.92, head: [0.05, 0], yaw: 0.22, drift: 0.004 },
  // 11 CTA — resolve to a composed final state
  { cam: [0, 0.05, 0.2], tgt: [0, 0, 0], fov: 33, scale: 1.00, head: [0, 0], yaw: 0.40, drift: 0.004 },
]
function lerp(a: number, b: number, t: number) { return a + (b - a) * t }
// smootherstep: eases in AND out, so motion holds near each chapter, then flows.
function smoother(t: number) { t = t < 0 ? 0 : t > 1 ? 1 : t; return t * t * t * (t * (t * 6 - 15) + 10) }

function resolveTier(): Tier {
  const w = window.innerWidth
  const coarse = window.matchMedia('(pointer: coarse)').matches
  if (w <= 767) return 'mobile'
  if (w <= 1279 || coarse) return 'tablet'
  return 'desktop'
}

function lowPower(): boolean {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nav = navigator as any
  const saveData = !!(nav.connection && nav.connection.saveData)
  const lowMem = typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 2
  const mobile = window.innerWidth <= 767
  return reduced || (mobile && (saveData || lowMem))
}

const VERT = /* glsl */`
attribute vec3 aNormal;
attribute vec3 aRandom;
uniform float uSize; uniform float uScale; uniform float uTime;
uniform vec3 uCursor; uniform float uScatterRadius; uniform float uScatterForce; uniform float uTurbulence;
uniform float uDriftAmount; uniform float uDriftSpeed;
uniform float uDepthNear; uniform float uDepthFar; uniform float uDepthStart; uniform float uDepthStrength;
uniform vec3 uKeyColor; uniform vec3 uRimColor; uniform vec3 uFillColor;
varying vec3 vColor; varying float vFade;
const vec3 KEY_DIR = vec3(-0.55, 0.25, 0.79);
const vec3 RIM_DIR = vec3(0.85, 0.08, -0.52);
const float KEY_WRAP = 0.5; const float KEY_FALLOFF = 2.2; const float KEY_INTENSITY = 1.5;
const float RIM_FALLOFF = 1.6; const float RIM_INTENSITY = 1.3;
const float TAU = 6.2831853;
vec3 driftOffset(vec3 normal, vec3 seed, float t) {
  vec3 guide = abs(normal.y) > 0.9 ? vec3(0.0, 0.0, 1.0) : vec3(0.0, 1.0, 0.0);
  vec3 tangent = normalize(cross(normal, guide));
  vec3 bitangent = cross(normal, tangent);
  return tangent   * sin(t * (1.00 + seed.x * 0.40) + seed.x * TAU)
       + bitangent * sin(t * (0.83 + seed.y * 0.40) + seed.y * TAU) * 0.9
       + normal    * sin(t * (0.61 + seed.z * 0.40) + seed.z * TAU) * 0.3;
}
void main() {
  vec3 normal = normalize(aNormal);
  float key = pow(max(0.0, dot(normal, normalize(KEY_DIR)) * KEY_WRAP + (1.0 - KEY_WRAP)), KEY_FALLOFF) * KEY_INTENSITY;
  float rim = pow(max(0.0, dot(normal, normalize(RIM_DIR))), RIM_FALLOFF) * RIM_INTENSITY;
  vColor = min(vec3(1.0), uFillColor + uKeyColor * key + uRimColor * rim);
  vec3 displaced = position;
  if (uDriftAmount > 0.0) { displaced += driftOffset(normal, aRandom, uTime * uDriftSpeed) * uDriftAmount; }
  if (uScatterForce > 0.0) {
    vec3 away = displaced - uCursor;
    float dist = length(away);
    float influence = 1.0 - smoothstep(0.0, uScatterRadius, dist);
    if (influence > 0.0) {
      vec3 direction = normalize(away + aRandom * uTurbulence + vec3(1e-5));
      displaced += direction * influence * uScatterForce;
    }
  }
  vec4 viewPosition = modelViewMatrix * vec4(displaced, 1.0);
  float through = clamp((-viewPosition.z - uDepthNear) / max(uDepthFar - uDepthNear, 1e-4), 0.0, 1.0);
  vFade = 1.0 - uDepthStrength * smoothstep(min(uDepthStart, 0.99), 1.0, through);
  gl_PointSize = uSize * (uScale / -viewPosition.z);
  gl_Position = projectionMatrix * viewPosition;
}`

const FRAG = /* glsl */`
varying vec3 vColor; varying float vFade;
const float MIN_ALPHA = 0.004;
void main() {
  vec2 offset = gl_PointCoord - 0.5;
  float distanceSquared = dot(offset, offset);
  if (distanceSquared > 0.25) discard;
  float alpha = smoothstep(0.25, 0.02, distanceSquared) * vFade;
  if (alpha < MIN_ALPHA) discard;
  gl_FragColor = vec4(vColor, alpha);
  #include <colorspace_fragment>
}`

// ── temporal filter pass: frame blend + glow smoothing (anti-flicker) ────────────
const PASS_VERT = 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position, 1.0); }'
const BLEND_FRAG = /* glsl */`
varying vec2 vUv;
uniform sampler2D tDiffuse; uniform sampler2D tLast;
uniform sampler2D tGlow; uniform sampler2D tGlowHist;
uniform float uFrameMix; uniform float uUseGlow;
void main() {
  vec4 frame = texture2D(tDiffuse, vUv);
  vec4 last = texture2D(tLast, vUv);
  vec4 outc = mix(frame, last, uFrameMix);
  if (uUseGlow > 0.5) {
    vec3 glow = texture2D(tGlow, vUv).rgb;
    vec3 glowH = texture2D(tGlowHist, vUv).rgb;
    outc.rgb -= (glow - glowH);
  }
  gl_FragColor = outc;
}`
const GLOWAVG_FRAG = 'varying vec2 vUv; uniform sampler2D tPrev; uniform sampler2D tGlow; uniform float uW; void main(){ gl_FragColor = vec4(mix(texture2D(tPrev, vUv).rgb, texture2D(tGlow, vUv).rgb, uW), 1.0); }'

class TemporalPass extends Pass {
  blendQuad: FullScreenQuad
  glowQuad: FullScreenQuad
  blendMat: THREE.ShaderMaterial
  glowMat: THREE.ShaderMaterial
  glowA: THREE.WebGLRenderTarget | null = null
  glowB: THREE.WebGLRenderTarget | null = null
  savePass: SavePass
  bloomPass: UnrealBloomPass | null
  useGlow: boolean
  frameMix = 0
  firstGlow = true
  constructor(savePass: SavePass, bloomPass: UnrealBloomPass | null, useGlow: boolean) {
    super()
    this.savePass = savePass
    this.bloomPass = bloomPass
    this.useGlow = useGlow
    this.needsSwap = true
    this.blendMat = new THREE.ShaderMaterial({
      uniforms: { tDiffuse: { value: null }, tLast: { value: null }, tGlow: { value: null }, tGlowHist: { value: null }, uFrameMix: { value: 0 }, uUseGlow: { value: useGlow ? 1 : 0 } },
      vertexShader: PASS_VERT, fragmentShader: BLEND_FRAG, blending: THREE.NoBlending, depthTest: false, depthWrite: false,
    })
    this.glowMat = new THREE.ShaderMaterial({
      uniforms: { tPrev: { value: null }, tGlow: { value: null }, uW: { value: 0.15 } },
      vertexShader: PASS_VERT, fragmentShader: GLOWAVG_FRAG, blending: THREE.NoBlending, depthTest: false, depthWrite: false,
    })
    this.blendQuad = new FullScreenQuad(this.blendMat)
    this.glowQuad = new FullScreenQuad(this.glowMat)
  }
  ensureGlowTargets() {
    if (!this.bloomPass || !this.useGlow) return
    const src = this.bloomPass.renderTargetsHorizontal?.[0] as THREE.WebGLRenderTarget | undefined
    if (!src) return
    const w = src.width, h = src.height
    if (!this.glowA || this.glowA.width !== w || this.glowA.height !== h) {
      this.glowA?.dispose(); this.glowB?.dispose()
      this.glowA = new THREE.WebGLRenderTarget(w, h, { depthBuffer: false })
      this.glowB = new THREE.WebGLRenderTarget(w, h, { depthBuffer: false })
      this.firstGlow = true
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render(renderer: THREE.WebGLRenderer, writeBuffer: any, readBuffer: any) {
    // glow smoothing → produce steadied glow in glowB
    if (this.useGlow && this.bloomPass) {
      this.ensureGlowTargets()
      const glowSrc = this.bloomPass.renderTargetsHorizontal?.[0] as THREE.WebGLRenderTarget | undefined
      if (glowSrc && this.glowA && this.glowB) {
        this.glowMat.uniforms.tPrev.value = this.glowA.texture
        this.glowMat.uniforms.tGlow.value = glowSrc.texture
        this.glowMat.uniforms.uW.value = this.firstGlow ? 1 : 0.15
        renderer.setRenderTarget(this.glowB)
        this.glowQuad.render(renderer)
        const tmp = this.glowA; this.glowA = this.glowB; this.glowB = tmp // glowA now holds steadied glow
        this.firstGlow = false
        this.blendMat.uniforms.tGlow.value = glowSrc.texture
        this.blendMat.uniforms.tGlowHist.value = this.glowA.texture
      }
    }
    this.blendMat.uniforms.tDiffuse.value = readBuffer.texture
    this.blendMat.uniforms.tLast.value = this.savePass.renderTarget.texture
    this.blendMat.uniforms.uFrameMix.value = this.frameMix
    renderer.setRenderTarget(this.renderToScreen ? null : writeBuffer)
    if (this.clear) renderer.clear()
    this.blendQuad.render(renderer)
  }
  dispose() { this.blendMat.dispose(); this.glowMat.dispose(); this.blendQuad.dispose(); this.glowQuad.dispose(); this.glowA?.dispose(); this.glowB?.dispose() }
}

export interface EvolveHandle { start(): void; setProgress(p: number): void; dispose(): void }
export interface EvolveOpts { onFirstFrame?: () => void; onError?: (reason: string) => void }

export async function createEvolveScene(canvas: HTMLCanvasElement, opts: EvolveOpts = {}): Promise<EvolveHandle | null> {
  const host = canvas.parentElement as HTMLElement
  const tier = resolveTier()
  const cfg = TIERS[tier]
  const fine = window.matchMedia('(pointer: fine)').matches
  const staticOnly = lowPower()

  let renderer: THREE.WebGLRenderer
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, stencil: false, powerPreference: tier === 'desktop' ? 'high-performance' : 'default' })
  } catch { opts.onError?.('webgl'); return null }
  const dpr = Math.min(window.devicePixelRatio || 1, cfg.dpr)
  renderer.setPixelRatio(dpr)
  renderer.setClearColor(0x000000, 0)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(32, host.clientWidth / host.clientHeight, 0.1, 100)
  camera.position.set(0, 0, cfg.camera)

  const group = new THREE.Group()
  group.position.set(0.04, cfg.modelY ?? -0.37, 0)
  const groupScale = cfg.scale ?? 1.33
  group.scale.setScalar(groupScale)
  group.rotation.set(0, THREE.MathUtils.degToRad(24), 0)
  scene.add(group)

  // ── data ──
  const DIAG = !!(import.meta as unknown as { dev?: boolean }).dev
  if (DIAG) console.log('[EvolveScene] ✓ Three.js + composer imports loaded · tier', tier)
  let verts: number[]
  try {
    const res = await fetch(VERTICES_URL)
    if (!res.ok) throw new Error(`Vertex asset failed: ${res.status}`)
    const json = await res.json()
    const objectKeys = Object.keys(json?.objects || {})
    if (!objectKeys.length) throw new Error('No vertex objects found')
    // NB: NEVER `push(...v)` — a 260k-element spread overflows the argument limit
    // (RangeError) in the browser. concat/assign instead.
    verts = []
    for (const key of objectKeys) {
      const v = json.objects[key]?.verts
      if (Array.isArray(v) && v.length) verts = verts.length ? verts.concat(v) : v.slice()
    }
    if (!verts.length) throw new Error('Vertex array missing')
    if (DIAG) console.log('[EvolveScene] ✓ vertices loaded · source verts', verts.length, '(' + (verts.length / 3) + ' points) · objects', objectKeys)
  } catch (e) { if (DIAG) console.error('[EvolveScene] ✗ vertices', e); opts.onError?.('vertices'); renderer.dispose(); return null }

  // convert + stride (X-sorted → keep every Nth, never truncate)
  const converted: number[] = []
  for (let i = 0; i < verts.length; i += 3) converted.push(verts[i]!, verts[i + 2]!, -verts[i + 1]!)
  const total = converted.length / 3
  const kept: number[] = []
  for (let i = 0; i < total; i += cfg.stride) { const o = i * 3; kept.push(converted[o]!, converted[o + 1]!, converted[o + 2]!) }
  const count = kept.length / 3

  let cx = 0, cy = 0, cz = 0
  for (let i = 0; i < kept.length; i += 3) { cx += kept[i]!; cy += kept[i + 1]!; cz += kept[i + 2]! }
  cx /= count; cy /= count; cz /= count

  const positions = new Float32Array(kept)
  const normals = new Float32Array(count * 3)
  const randoms = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const o = i * 3
    let nx = kept[o]! - cx, ny = (kept[o + 1]! - cy) * 0.35, nz = kept[o + 2]! - cz
    const len = Math.hypot(nx, ny, nz) || 1
    normals[o] = nx / len; normals[o + 1] = ny / len; normals[o + 2] = nz / len
    randoms[o] = Math.random() * 2 - 1; randoms[o + 1] = Math.random() * 2 - 1; randoms[o + 2] = Math.random() * 2 - 1
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('aNormal', new THREE.BufferAttribute(normals, 3))
  geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 3))
  geometry.computeBoundingSphere()
  const sphere = geometry.boundingSphere!

  const uScale0 = host.clientHeight * dpr * 0.5
  const material = new THREE.ShaderMaterial({
    transparent: true, depthWrite: true,
    uniforms: {
      uSize: { value: 4.6 * cfg.pointScale * dpr * cfg.camera / uScale0 },
      uScale: { value: uScale0 }, uTime: { value: 0 },
      uCursor: { value: new THREE.Vector3(1e5, 1e5, 1e5) },
      uScatterRadius: { value: 0.34 }, uScatterForce: { value: 0 }, uTurbulence: { value: 1 },
      uDriftAmount: { value: staticOnly ? 0 : 0.003 }, uDriftSpeed: { value: 1 },
      uDepthNear: { value: 0 }, uDepthFar: { value: 1 }, uDepthStart: { value: 0.35 }, uDepthStrength: { value: 0.85 },
      uKeyColor: { value: new THREE.Color(0x968a6e) }, uRimColor: { value: new THREE.Color(0xbcc4d6) }, uFillColor: { value: new THREE.Color(0x14100a) },
    },
    vertexShader: VERT, fragmentShader: FRAG,
  })
  const points = new THREE.Points(geometry, material)
  points.frustumCulled = false
  group.add(points)

  // ── composer ──
  const composer = new EffectComposer(renderer)
  composer.setPixelRatio(dpr)
  composer.setSize(host.clientWidth, host.clientHeight)
  const renderPass = new RenderPass(scene, camera)
  renderPass.clearColor = new THREE.Color(0x000000)
  renderPass.clearAlpha = 0
  composer.addPass(renderPass)
  let bloomPass: UnrealBloomPass | null = null
  if (cfg.bloom) {
    bloomPass = new UnrealBloomPass(new THREE.Vector2(host.clientWidth, host.clientHeight), 0.72, 0.45, 0.46)
    bloomPass.setSize(host.clientWidth * 0.5, host.clientHeight * 0.5)
    composer.addPass(bloomPass)
  }
  const savePass = new SavePass()
  const temporal = new TemporalPass(savePass, bloomPass, cfg.bloom)
  composer.addPass(temporal)
  composer.addPass(savePass)
  const outputPass = new OutputPass()
  composer.addPass(outputPass)

  // ── scroll-input channel (the master-experience plug) ──
  // The narrative layer feeds a 0→1 page-scroll progress here; the frame loop
  // eases toward it and applies GENTLE, reversible camera/orientation/drift
  // response. It NEVER touches the shader, geometry, particle count, or model.
  // At scrollTarget 0 the head is identical to the locked hero look.
  let scrollTarget = 0
  let scrollEased = 0

  // ── pointer ──
  const pointer = new THREE.Vector2(0, 0)
  const eased = new THREE.Vector2(0, 0)
  let inside = false
  let scatterAmount = 0
  const smoothedCursor = new THREE.Vector3(0, 0, 0)
  const localCursor = new THREE.Vector3()
  function onMove(e: PointerEvent) {
    const r = host.getBoundingClientRect()
    pointer.x = THREE.MathUtils.clamp(((e.clientX - r.left) / r.width) * 2 - 1, -1, 1)
    pointer.y = THREE.MathUtils.clamp(-(((e.clientY - r.top) / r.height) * 2 - 1), -1, 1)
    inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom
  }
  function onLeave() { inside = false }
  if (fine) { window.addEventListener('pointermove', onMove, { passive: true }); window.addEventListener('pointerout', onLeave, { passive: true }) }

  // ── resize ──
  function resize() {
    const w = host.clientWidth, h = host.clientHeight
    if (!w || !h) return
    camera.aspect = w / h; camera.updateProjectionMatrix()
    renderer.setSize(w, h, false)
    composer.setSize(w, h)
    bloomPass?.setSize(w * 0.5, h * 0.5)
    const us = h * dpr * 0.5
    material.uniforms.uScale.value = us
    material.uniforms.uSize.value = 4.6 * cfg.pointScale * dpr * cfg.camera / us
    temporal.frameMix = 0
  }
  const ro = new ResizeObserver(resize)
  ro.observe(host)

  // ── depth band + parallax + scatter + idle-skip ──
  const pxPerWorld = host.clientHeight / (2 * cfg.camera * Math.tan(THREE.MathUtils.degToRad(32) / 2))
  const restYaw = THREE.MathUtils.degToRad(24)
  const baseGroupPos = new THREE.Vector3(group.position.x, group.position.y, group.position.z)
  let lastPitch = 0, lastYaw = restYaw, lastForce = 0, lastScale = groupScale
  const lastCamPos = new THREE.Vector3(0, 0, cfg.camera)
  const lastCursorPos = new THREE.Vector3(1e5, 1e5, 1e5)
  let hasDrawn = false
  let raf = 0, running = false
  /**
   * FRAME BUDGET — the minimum gap between two composer.render() calls.
   *
   * cfg.frameBudget has been in the tier table from the start (30fps on mobile,
   * 45 on tablet, uncapped on desktop) but was never read, so every device drew
   * on every rAF. The existing idle-skip below only helps when the scene is
   * nearly still; during a scroll it is moving by definition, which is exactly
   * when the page can least afford a full composer pass per frame.
   *
   * Only the RENDER is gated. The maths above still runs every frame, so the
   * camera easing and pointer parallax keep their timing — a capped render
   * shows a slightly older frame, it does not slow the motion down.
   */
  let lastRenderAt = 0
  const clock = new THREE.Clock()
  const ndc = new THREE.Vector3()
  const camPos = new THREE.Vector3()

  function frame() {
    const dt = Math.min(clock.getDelta(), 0.05)
    material.uniforms.uTime.value += dt

    // parallax + scroll-driven CAMERA CHAPTERS. Scroll interpolates the camera
    // (position / lookAt target / fov), the head (scale / offset / yaw) and drift
    // between the 11 chapters — never the shader, geometry or particle system.
    // sp=0 → identical to the locked hero; pointer parallax layers on top as a
    // subtle head tilt so the world still feels alive when idle.
    eased.x += (pointer.x - eased.x) * 0.04
    eased.y += (pointer.y - eased.y) * 0.04
    scrollEased += (scrollTarget - scrollEased) * 0.08
    const sp = THREE.MathUtils.clamp(scrollEased, 0, 1)
    const f = sp * (CHAPTERS.length - 1)
    const i0 = Math.min(CHAPTERS.length - 1, Math.floor(f))
    const i1 = Math.min(CHAPTERS.length - 1, i0 + 1)
    const ct = smoother(f - i0)
    const A = CHAPTERS[i0]!, B = CHAPTERS[i1]!
    camera.position.set(lerp(A.cam[0], B.cam[0], ct), lerp(A.cam[1], B.cam[1], ct), cfg.camera + lerp(A.cam[2], B.cam[2], ct))
    camera.lookAt(lerp(A.tgt[0], B.tgt[0], ct), lerp(A.tgt[1], B.tgt[1], ct), lerp(A.tgt[2], B.tgt[2], ct))
    const fov = lerp(A.fov, B.fov, ct)
    if (Math.abs(camera.fov - fov) > 1e-3) { camera.fov = fov; camera.updateProjectionMatrix() }
    camera.updateMatrixWorld()
    const pitch = eased.y * 0.28
    const yaw = restYaw + eased.x * 0.45 + lerp(A.yaw, B.yaw, ct)
    group.scale.setScalar(groupScale * lerp(A.scale, B.scale, ct))
    group.position.set(baseGroupPos.x + lerp(A.head[0], B.head[0], ct), baseGroupPos.y + lerp(A.head[1], B.head[1], ct), baseGroupPos.z)
    group.rotation.set(pitch, yaw, 0)
    group.updateMatrixWorld()
    material.uniforms.uDriftAmount.value = staticOnly ? 0 : lerp(A.drift, B.drift, ct)

    // scatter
    let force = 0
    if (fine && cfg.stride <= 2) {
      scatterAmount += ((inside ? 1 : 0) - scatterAmount) * 0.09
      // project eased pointer onto model z-plane
      ndc.set(eased.x, eased.y, 0.5).unproject(camera)
      camPos.copy(camera.position)
      const dir = ndc.sub(camPos).normalize()
      const t = (group.position.z - camPos.z) / (dir.z || 1e-5)
      const world = camPos.clone().add(dir.multiplyScalar(t))
      smoothedCursor.lerp(world, 0.09)
      localCursor.copy(smoothedCursor); group.worldToLocal(localCursor)
      material.uniforms.uCursor.value.copy(localCursor)
      force = 0.2 * scatterAmount
      material.uniforms.uScatterForce.value = force
    }

    // depth fade band
    const centre = sphere.center.clone().applyMatrix4(group.matrixWorld)
    const centreDepth = camera.position.z - centre.z
    const halfBand = sphere.radius * group.scale.x
    material.uniforms.uDepthNear.value = centreDepth - halfBand
    material.uniforms.uDepthFar.value = centreDepth + halfBand

    // idle-skip / temporal frameMix (motion in css px vs last drawn frame)
    const rot = (Math.abs(pitch - lastPitch) + Math.abs(yaw - lastYaw)) * 1 * pxPerWorld
    const scat = Math.abs(force - lastForce) * pxPerWorld
    const curMove = lastCursorPos.x < 1e4 ? localCursor.distanceTo(lastCursorPos) * pxPerWorld : 0
    const driftMove = (material.uniforms.uDriftAmount.value > 0 ? 0.003 * 1 * group.scale.x * dt : 0) * pxPerWorld
    const camMove = camera.position.distanceTo(lastCamPos) * pxPerWorld
    const scaleMove = Math.abs(group.scale.x - lastScale) * pxPerWorld
    const motionPx = rot + scat + curMove + driftMove + camMove + scaleMove

    if (hasDrawn && motionPx < 0.05) { raf = requestAnimationFrame(frame); return }

    // Hold to the tier's frame budget. Desktop is normally 0 (uncapped), but
    // WHILE THE PAGE IS SCROLLING every tier caps at 30fps: that is the moment
    // the frame is contended and the moment the cap cannot be seen.
    const nowMs = performance.now()
    const budget = isScrolling() ? Math.max(cfg.frameBudget, 1000 / 30) : cfg.frameBudget
    if (hasDrawn && budget > 0 && nowMs - lastRenderAt < budget) {
      raf = requestAnimationFrame(frame)
      return
    }
    lastRenderAt = nowMs

    const mixW = 1 - (0.22 + 0.78 * smoothstepN(0, 1.5, motionPx))
    temporal.frameMix = hasDrawn ? mixW : 0
    composer.render()

    lastPitch = pitch; lastYaw = yaw; lastForce = force; lastCamPos.copy(camera.position); lastScale = group.scale.x; lastCursorPos.copy(localCursor); hasDrawn = true
    if (running) raf = requestAnimationFrame(frame)
  }

  function smoothstepN(e0: number, e1: number, x: number) { const t = THREE.MathUtils.clamp((x - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t) }

  // ── boot: compile + one frame, report ready ──
  if (DIAG) console.log('[EvolveScene] ✓ geometry created · kept points', count, '· stride', cfg.stride, '· sphere r', sphere.radius.toFixed(3), '· center', [sphere.center.x.toFixed(2), sphere.center.y.toFixed(2), sphere.center.z.toFixed(2)])
  if (DIAG) console.log('[EvolveScene] ✓ camera', [camera.position.x, camera.position.y, camera.position.z], '· group pos', [group.position.x, group.position.y, group.position.z], '· scale', group.scale.x)
  renderer.compile(scene, camera)
  if (DIAG) console.log('[EvolveScene] ✓ shader compiled · canvas', renderer.domElement.width + '×' + renderer.domElement.height)
  temporal.frameMix = 0
  try {
    composer.render()
  } catch (e) {
    if (DIAG) console.error('[EvolveScene] ✗ composer failed — falling back to bloom-only (temporal disabled)', e)
    const it = composer.passes.indexOf(temporal); if (it >= 0) composer.passes.splice(it, 1)
    const is = composer.passes.indexOf(savePass); if (is >= 0) composer.passes.splice(is, 1)
    try { composer.render() } catch (e2) { if (DIAG) console.error('[EvolveScene] ✗ fallback render failed', e2) }
  }
  hasDrawn = true
  if (DIAG) console.log('[EvolveScene] ✓ first frame rendered')
  opts.onFirstFrame?.()

  const onVisibility = () => { if (document.hidden) stop(); else if (!staticOnly) start() }
  document.addEventListener('visibilitychange', onVisibility)

  function start() { if (running || staticOnly) return; running = true; clock.getDelta(); raf = requestAnimationFrame(frame) }
  function stop() { running = false; cancelAnimationFrame(raf) }

  return {
    start,
    setProgress(p: number) { scrollTarget = p },
    dispose() {
      stop(); ro.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      if (fine) { window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerout', onLeave) }
      geometry.dispose(); material.dispose(); temporal.dispose(); composer.dispose?.(); renderer.dispose()
    },
  }
}
