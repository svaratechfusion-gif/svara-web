// SVARA ECOSYSTEM WORLD — the Neural Monitor engine, ported natively to the SVARA
// Three.js stack (the NM source is React/R3F and cannot be dropped into Nuxt/Vue;
// this reproduces its exact architecture from the reference spec). The BRAIN is
// replaced by the SVARA INTELLIGENCE CORE: a dense point-cloud subject (~140k
// area-like sampled points) with 10 ecosystem-node regions the camera isolates.
// Preserved from Neural Monitor, verbatim where subject-agnostic:
//   · the point shaders (colour by centreness / depth / hemi + synapse firing +
//     cursor halo + region highlight/isolation + explode)
//   · the ambient drifting cloud shader
//   · the two-composer render pipeline: RenderPass → GammaCorrection → UnrealBloom
//     (0.69 / 0.75 / 0, threshold 0 = temporally stable) rendered off-screen, then
//     a full-screen warped-gradient composite (deep-blue atmosphere + tScene)
//   · the 7-keyframe camera rig with frame-rate-independent exponential damping,
//     responsive reframing, cursor parallax, and the fly-in reveal.
// SVARA palette throughout (the NM palette is already navy/azure/sky); a restrained
// red appears only as an action-signal on the ACT-layer nodes.
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js'
import { FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass.js'

// ── config (Neural Monitor values — already SVARA navy/azure/sky) ──
const CFG = {
  brainCool: '#0a3f70', brainWarm: '#70bcff', edgeColor: '#1f6ae0', centerColor: '#000000',
  centerRadius: 0.37, centerFalloff: 4, synapseColor: '#eaf3ff', ambientColor: '#2b5a9c',
  particleSize: 0.029, ambientSize: 0.069, ambientCount: 4500, ambientSpeed: 0.03, ambientRange: 15.5,
  rotationSpeed: -0.09, synapseRate: 0.1, flowSpeed: 2.3, flowAmount: 0.025, glowStrength: 2,
  depthDarkness: 1, deepColor: '#010b1e', highlightColor: '#2563eb', highlightRadius: 0.6,
  focusFadeStrength: 0.55, isolateStrength: 0.88, explodeDistance: 5,
  cursorColor: '#000000', cursorStrength: 0.74, cursorRadius: 0.24, cursorFollow: 0.39, cursorFade: 0.1, cursorParallax: 1,
  cornerBlue: '#0f5fcf', cornerOrange: '#040f2e', bloomStrength: 0.69, bloomRadius: 0.75, bloomThreshold: 0,
  redSignal: '#ff3b57',
}
const v3 = (h: string) => { const c = new THREE.Color(h); return new THREE.Vector3(c.r, c.g, c.b) }
const REVEAL_START_Z = 3.6
const SUBJECT_RADIUS = 1.45

// ── the 10 ecosystem nodes as model-space regions on the core (used for focus
// isolation, connections and labels). flow: intel=blue · action=red · infra=white. ──
export interface NodeDef { id: string; short: string; desc: string; pos: [number, number, number]; flow: 'intel' | 'action' | 'infra'; focus: number[] }
export const NODES: NodeDef[] = [
  { id: 'vision', short: 'Vision AI', desc: 'Perception', pos: [0.92, 0.52, 0.58], flow: 'intel', focus: [1] },
  { id: 'drone', short: 'Drone AI', desc: 'Aerial', pos: [1.05, 0.02, -0.22], flow: 'intel', focus: [1] },
  { id: 'edge', short: 'Edge AI', desc: 'On-device', pos: [0.70, -0.62, 0.50], flow: 'intel', focus: [1] },
  { id: 'cognitive', short: 'Generative AI', desc: 'Reasoning', pos: [0.10, 0.96, -0.40], flow: 'intel', focus: [2] },
  { id: 'agents', short: 'AI Agents', desc: 'Autonomy', pos: [-0.22, 0.52, 0.86], flow: 'action', focus: [2, 4] },
  { id: 'aios', short: 'One AI OS', desc: 'Orchestration', pos: [0.02, 1.02, 0.12], flow: 'infra', focus: [2] },
  { id: 'twin', short: 'Digital Twin', desc: 'Simulation', pos: [0.10, -0.10, -1.06], flow: 'intel', focus: [3] },
  { id: 'cloud', short: 'Business Cloud', desc: 'Enterprise', pos: [-0.96, 0.30, -0.30], flow: 'infra', focus: [4] },
  { id: 'engineering', short: 'Engineering', desc: 'Delivery', pos: [-0.86, -0.52, 0.26], flow: 'action', focus: [4] },
  { id: 'growth', short: 'Growth', desc: 'Reach', pos: [-0.40, -0.86, -0.42], flow: 'action', focus: [5] },
]

// ── 7 camera keyframes (position · look-at · focus region · highlight · explode) ──
interface Key { position: [number, number, number]; target: [number, number, number]; region: [number, number, number]; highlight: number; explode: number }
const KEYS: Key[] = [
  { position: [0, 0.25, 5.4], target: [-0.45, 0, 0], region: [0, 0, 0], highlight: 0, explode: 0 },       // 01 Arrival
  { position: [2.5, 0.6, 3.6], target: [0.7, 0.0, 0.2], region: [0.9, -0.03, 0.3], highlight: 1, explode: 0 },// 02 Sense (+x perception)
  { position: [0.2, 1.7, 3.9], target: [0, 0.6, 0], region: [-0.03, 0.83, 0.19], highlight: 1, explode: 0 }, // 03 Understand (up)
  { position: [0.45, 0.4, -3.7], target: [0.05, 0, -0.7], region: [0.1, -0.1, -1.05], highlight: 1, explode: 0 },// 04 Predict (behind → twin)
  { position: [-3.5, 0.0, 2.4], target: [-0.6, 0.05, 0.1], region: [-0.68, 0.1, 0.27], highlight: 1, explode: 0 },// 05 Act (-x)
  { position: [0, 0.45, 5.9], target: [0, 0, 0], region: [0, 0, 0], highlight: 0, explode: 0 },            // 06 Ecosystem (pull back)
  { position: [2.3, 0.8, 4.7], target: [0, 0, 0], region: [0, 0, 0], highlight: 0, explode: 1 },           // 07 Whole (constellation)
]
const FLOW: Record<string, THREE.Color> = { intel: new THREE.Color(CFG.brainWarm), action: new THREE.Color(CFG.redSignal), infra: new THREE.Color('#eaf3ff') }

// ── shaders (Neural Monitor, verbatim; subject-agnostic) ──
const AMBIENT_VERT = /* glsl */`
attribute vec3 aDir; attribute float aSeed;
uniform float iTime; uniform float iResolutionY; uniform float uSize; uniform float uSpeed; uniform float uRange;
varying float vSeed; varying float vPhase;
void main(){
  vSeed=aSeed; float speed=0.35+aSeed*0.9; float phase=fract(iTime*uSpeed*speed+aSeed); vPhase=phase;
  vec3 dir=normalize(aDir+vec3(1e-5)); vec3 p=position+dir*phase*uRange;
  vec4 mv=modelViewMatrix*vec4(p,1.0); gl_Position=projectionMatrix*mv;
  float lifeSize=mix(1.0,0.6,phase); gl_PointSize=uSize*lifeSize*(iResolutionY/720.0)*(200.0/-mv.z);
}`
const AMBIENT_FRAG = /* glsl */`
uniform vec3 uColor; uniform float iAlpha; varying float vSeed; varying float vPhase;
void main(){
  vec2 p=gl_PointCoord-0.5; float r=length(p); if(r>0.5) discard;
  float k=smoothstep(0.5,0.0,r);
  float life=smoothstep(0.0,0.1,vPhase)*smoothstep(1.0,0.7,vPhase);
  float twinkle=0.5+0.5*sin(vSeed*40.0+vPhase*30.0);
  gl_FragColor=vec4(uColor*k*life*(0.4+0.6*twinkle), k*life*iAlpha*0.6);
}`
const SUBJECT_VERT = /* glsl */`
attribute float aSeed; attribute float aOcclusion; attribute vec3 aNormal;
uniform float iTime; uniform float iResolutionY; uniform float uSize; uniform float uSynapseRate;
uniform float uCenterRadius; uniform float uFlowSpeed; uniform float uFlowAmount;
uniform vec3 uHighlightPos; uniform float uHighlightRadius; uniform float uHighlightStrength;
uniform float uExplode; uniform float uExplodeDist;
uniform vec2 uMouse; uniform float uCursor; uniform float uAspect; uniform float uCursorRadius; uniform float uCursorStrength;
varying float vSeed; varying float vSynapse; varying float vHemi; varying float vDepth; varying float vFrontness;
varying float vCenterness; varying float vOcclusion; varying float vHighlight; varying float vFar; varying float vCursor; varying vec3 vWorldPos;
void main(){
  vSeed=aSeed; vOcclusion=aOcclusion; vec3 p=position; vWorldPos=p; vHemi=step(0.0,p.x);
  vHighlight=(1.0-smoothstep(0.0,uHighlightRadius,distance(position,uHighlightPos)))*uHighlightStrength;
  vec3 focalDir=normalize(uHighlightPos+vec3(1e-5)); float align=dot(normalize(position+vec3(1e-5)),focalDir); vFar=smoothstep(0.55,-0.35,align);
  vec3 rad=normalize(p+vec3(1e-5)); float breathe=sin(iTime*1.6+aSeed*6.0)*0.012; p+=rad*breathe;
  vec3 nrm=normalize(aNormal+vec3(1e-5)); vec3 ref=abs(nrm.y)<0.95?vec3(0.0,1.0,0.0):vec3(1.0,0.0,0.0);
  vec3 tA=normalize(cross(nrm,ref)); vec3 tB=cross(nrm,tA);
  float ph=iTime*uFlowSpeed+aSeed*6.2831; vec3 loopDir=tA*cos(ph)+tB*sin(ph); p+=loopDir*uFlowAmount;
  vec3 exDir=normalize(rad+vec3(sin(aSeed*41.0),cos(aSeed*57.0),sin(aSeed*73.0))*0.45); p+=exDir*uExplode*uExplodeDist;
  float period=mix(3.0,9.0,aSeed); float firePhase=aSeed*period; float ft=mod(iTime+firePhase,period);
  float fire=pow(clamp(1.0-ft/0.4,0.0,1.0),2.5); if(aSeed>uSynapseRate) fire=0.0; vSynapse=fire;
  vec4 mv=modelViewMatrix*vec4(p,1.0); vec4 centerMv=modelViewMatrix*vec4(0.0,0.0,0.0,1.0);
  float rel=centerMv.z-mv.z; vFrontness=clamp(rel*0.6+0.5,0.0,1.0);
  gl_Position=projectionMatrix*mv;
  vec4 centerClip=projectionMatrix*centerMv; vec2 centerNDC=centerClip.xy/max(0.0001,centerClip.w); vec2 pNDC=gl_Position.xy/max(0.0001,gl_Position.w);
  float screenDist=length(pNDC-centerNDC); vCenterness=1.0-clamp(screenDist/max(0.05,uCenterRadius),0.0,1.0);
  vec2 dMouse=pNDC-uMouse; dMouse.x*=uAspect; vCursor=(1.0-smoothstep(0.0,uCursorRadius,length(dMouse)))*uCursor;
  float baseSize=uSize*(iResolutionY/720.0)*(200.0/-mv.z);
  gl_PointSize=baseSize*(1.0+fire*2.5+vHighlight*1.8+vCursor*1.3*uCursorStrength);
  vDepth=-mv.z;
}`
const SUBJECT_FRAG = /* glsl */`
uniform vec3 uCool; uniform vec3 uWarm; uniform vec3 uEdgeColor; uniform vec3 uCenterColor; uniform float uCenterFalloff;
uniform vec3 uSynapse; uniform float iAlpha; uniform float uGlow; uniform float uDepthDarkness; uniform vec3 uDeepColor;
uniform float uOcclusionStrength; uniform vec3 uHighlightColor; uniform float uHighlightStrength; uniform float uFocusFadeStrength;
uniform float uIsolateStrength; uniform float uExplode; uniform vec3 uCursorColor; uniform float uCursorStrength;
varying float vSeed; varying float vSynapse; varying float vHemi; varying float vDepth; varying float vFrontness;
varying float vCenterness; varying float vOcclusion; varying float vHighlight; varying float vFar; varying float vCursor; varying vec3 vWorldPos;
void main(){
  vec2 p=gl_PointCoord-0.5; float r=length(p); if(r>0.5) discard;
  float core=pow(smoothstep(0.5,0.0,r),2.2);
  float t=pow(vCenterness,max(0.05,uCenterFalloff)); vec3 base=mix(uEdgeColor,uCenterColor,t);
  vec3 yTint=mix(uCool,uWarm,smoothstep(-0.6,1.0,vWorldPos.y)*0.6+vSeed*0.25);
  yTint=mix(yTint,yTint*vec3(0.95,1.0,1.05),vHemi*0.4); base*=mix(vec3(1.0),yTint,0.35);
  base=mix(base,uDeepColor,clamp(vOcclusion*uOcclusionStrength,0.0,1.0));
  vec3 col=base+uSynapse*vSynapse*2.0;
  col=mix(col,uHighlightColor,vHighlight*0.5); col+=uHighlightColor*vHighlight*0.7;
  float nonFocus=(1.0-vHighlight)*uHighlightStrength; col=mix(col,uDeepColor,nonFocus*uIsolateStrength);
  float depthMul=mix(1.0-uDepthDarkness,1.0,vFrontness); col*=depthMul;
  float alphaOut=core*iAlpha*mix(1.0-uDepthDarkness*0.7,1.0,vFrontness); alphaOut*=1.0+vHighlight*0.8;
  float focusDim=1.0-uHighlightStrength*uFocusFadeStrength*vFar; col*=focusDim; alphaOut*=focusDim;
  col+=uCursorColor*vCursor*0.8*uCursorStrength; alphaOut+=vCursor*core*0.32*uCursorStrength;
  alphaOut*=1.0-smoothstep(0.0,1.0,uExplode)*0.8;
  gl_FragColor=vec4(col*uGlow,alphaOut);
}`
const FINAL_VERT = 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position,1.0); }'
const FINAL_FRAG = /* glsl */`
uniform float iTime; uniform sampler2D tScene; uniform vec3 iCornerBlue; uniform vec3 iCornerOrange; varying vec2 vUv;
vec3 warp3d(vec3 pos,float t){ float curv=.8,a=1.9,b=0.7; pos*=2.;
  pos.x+=curv*sin(t+a*pos.y)+t*b; pos.y+=curv*cos(t+a*pos.x); pos.y+=curv*sin(t+a*pos.z)+t*b;
  pos.z+=curv*cos(t+a*pos.y); pos.z+=curv*sin(t+a*pos.x)+t*b; pos.x+=curv*cos(t+a*pos.z);
  return 0.5+0.5*cos(pos.xyz+vec3(1,2,4)); }
void main(){ vec2 uv=2.*vUv-1.;
  vec3 w=pow(warp3d(vec3(uv.x,sin(uv.y),uv.y),iTime*1.5),vec3(1.5));
  vec3 col=1.5*iCornerBlue*w.x; col*=w.y; col+=iCornerOrange*w.z;
  col*=smoothstep(0.6,1.,abs(uv.y)); col*=smoothstep(-.5,1.,-uv.y*uv.x); col*=smoothstep(-.5,1.,-uv.y*uv.x);
  gl_FragColor=vec4(col+texture2D(tScene,vUv).xyz,1.); }`

export interface WorldHandle { start(): void; setProgress(p: number): void; dispose(): void }
export interface WorldOpts { onReady?: () => void; onError?: (r: string) => void }

function rand(): number { return Math.random() }
function lerp(a: number, b: number, t: number) { return a + (b - a) * t }
function clamp01(x: number) { return x < 0 ? 0 : x > 1 ? 1 : x }

export function createEcosystemWorld(canvas: HTMLCanvasElement, opts: WorldOpts = {}): WorldHandle | null {
  const host = canvas.parentElement as HTMLElement
  const DIAG = !!(import.meta as unknown as { dev?: boolean }).dev
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const mobile = window.innerWidth <= 767
  const surfaceCount = mobile ? 70000 : 140000

  let renderer: THREE.WebGLRenderer
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true }) } catch { opts.onError?.('webgl'); return null }
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  renderer.setPixelRatio(dpr)
  renderer.setSize(host.clientWidth, host.clientHeight, false)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(CFG.brainCool).multiplyScalar(0) // #000, fog carries the navy
  scene.background = new THREE.Color('#01040e')
  scene.fog = new THREE.Fog('#01040e', 0, 18)
  const camera = new THREE.PerspectiveCamera(45, host.clientWidth / host.clientHeight, 0.1, 80)
  camera.position.set(0, 0.25, 5.4)

  const group = new THREE.Group()
  group.position.z = REVEAL_START_Z
  scene.add(group)

  // ── SUBJECT geometry: folded-sphere intelligence core + 10 node clusters ──
  const nodeCluster = mobile ? 220 : 380
  const total = surfaceCount + NODES.length * nodeCluster
  const positions = new Float32Array(total * 3)
  const normals = new Float32Array(total * 3)
  const seeds = new Float32Array(total)
  const occ = new Float32Array(total)   // cavity occlusion — neutral (occlusionStrength 0)
  const golden = Math.PI * (3 - Math.sqrt(5))
  let maxR = 0
  for (let i = 0; i < surfaceCount; i++) {
    const y = 1 - (i / (surfaceCount - 1)) * 2
    const rr = Math.sqrt(Math.max(0, 1 - y * y))
    const th = golden * i
    const dx = Math.cos(th) * rr, dy = y, dz = Math.sin(th) * rr
    // multi-frequency folds → an engineered, organic core surface (not a plain orb)
    const fold = 0.5 * Math.sin(dx * 5.0 + dz * 4.0) + 0.28 * Math.sin(dy * 8.0 + dx * 3.0) + 0.16 * Math.sin(dz * 11.0 - dy * 6.0)
    const rad = SUBJECT_RADIUS * (0.86 + 0.14 * (0.5 + 0.5 * fold))
    const px = dx * rad, py = dy * rad, pz = dz * rad
    positions[i * 3] = px; positions[i * 3 + 1] = py; positions[i * 3 + 2] = pz
    normals[i * 3] = dx; normals[i * 3 + 1] = dy; normals[i * 3 + 2] = dz
    seeds[i] = rand(); occ[i] = 0
    maxR = Math.max(maxR, Math.hypot(px, py, pz))
  }
  // node clusters — dense bright spots the camera isolates
  let o = surfaceCount
  for (const n of NODES) {
    const [nx, ny, nz] = n.pos
    const len = Math.hypot(nx, ny, nz) || 1
    for (let j = 0; j < nodeCluster; j++) {
      const gx = (rand() - 0.5), gy = (rand() - 0.5), gz = (rand() - 0.5)
      positions[o * 3] = nx + gx * 0.13; positions[o * 3 + 1] = ny + gy * 0.13; positions[o * 3 + 2] = nz + gz * 0.13
      normals[o * 3] = nx / len; normals[o * 3 + 1] = ny / len; normals[o * 3 + 2] = nz / len
      seeds[o] = rand(); occ[o] = 0; o++
    }
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geo.setAttribute('aNormal', new THREE.BufferAttribute(normals, 3))
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
  geo.setAttribute('aOcclusion', new THREE.BufferAttribute(occ, 1))

  const iResY = host.clientHeight * dpr
  const subjectMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: {
      iTime: { value: 0 }, iAlpha: { value: 0 }, iResolutionY: { value: iResY },
      uCool: { value: v3(CFG.brainCool) }, uWarm: { value: v3(CFG.brainWarm) }, uEdgeColor: { value: v3(CFG.edgeColor) }, uCenterColor: { value: v3(CFG.centerColor) },
      uCenterRadius: { value: CFG.centerRadius }, uCenterFalloff: { value: CFG.centerFalloff },
      uSynapse: { value: v3(CFG.synapseColor) }, uSize: { value: CFG.particleSize }, uSynapseRate: { value: CFG.synapseRate },
      uFlowSpeed: { value: CFG.flowSpeed }, uFlowAmount: { value: CFG.flowAmount }, uGlow: { value: CFG.glowStrength },
      uDepthDarkness: { value: CFG.depthDarkness }, uDeepColor: { value: v3(CFG.deepColor) }, uOcclusionStrength: { value: 0 },
      uHighlightColor: { value: v3(CFG.highlightColor) }, uHighlightPos: { value: new THREE.Vector3(0, 0, 0) }, uHighlightRadius: { value: CFG.highlightRadius }, uHighlightStrength: { value: 0 },
      uFocusFadeStrength: { value: CFG.focusFadeStrength }, uIsolateStrength: { value: CFG.isolateStrength },
      uExplode: { value: 0 }, uExplodeDist: { value: CFG.explodeDistance },
      uMouse: { value: new THREE.Vector2(-10, -10) }, uCursor: { value: 0 }, uAspect: { value: 1 },
      uCursorRadius: { value: CFG.cursorRadius }, uCursorColor: { value: v3(CFG.cursorColor) }, uCursorStrength: { value: CFG.cursorStrength },
    },
    vertexShader: SUBJECT_VERT, fragmentShader: SUBJECT_FRAG,
  })
  const subject = new THREE.Points(geo, subjectMat); subject.frustumCulled = false; group.add(subject)

  // ── connections (core → node), brightened per active layer ──
  interface Conn { def: NodeDef; mat: THREE.LineBasicMaterial; intensity: number }
  const conns: Conn[] = NODES.map((def) => {
    const mat = new THREE.LineBasicMaterial({ color: FLOW[def.flow], transparent: true, opacity: 0.1, blending: THREE.AdditiveBlending, depthWrite: false })
    const g = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(...def.pos)])
    group.add(new THREE.Line(g, mat))
    return { def, mat, intensity: 0.2 }
  })

  // ── ambient drifting cloud ──
  const ambN = CFG.ambientCount
  const aPos = new Float32Array(ambN * 3), aDir = new Float32Array(ambN * 3), aSeed = new Float32Array(ambN)
  for (let i = 0; i < ambN; i++) {
    const u = rand(), vv = rand(), r = 1.5 + rand() * 0.5, theta = 2 * Math.PI * u, phi = Math.acos(2 * vv - 1)
    aPos[i * 3] = r * Math.sin(phi) * Math.cos(theta); aPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta); aPos[i * 3 + 2] = r * Math.cos(phi)
    const dx = rand() * 2 - 1, dy = rand() * 2 - 1, dz = rand() * 2 - 1, dl = Math.hypot(dx, dy, dz) || 1
    aDir[i * 3] = dx / dl; aDir[i * 3 + 1] = dy / dl; aDir[i * 3 + 2] = dz / dl; aSeed[i] = rand()
  }
  const ambGeo = new THREE.BufferGeometry()
  ambGeo.setAttribute('position', new THREE.BufferAttribute(aPos, 3))
  ambGeo.setAttribute('aDir', new THREE.BufferAttribute(aDir, 3))
  ambGeo.setAttribute('aSeed', new THREE.BufferAttribute(aSeed, 1))
  const ambMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { iTime: { value: 0 }, iAlpha: { value: 0 }, iResolutionY: { value: iResY }, uColor: { value: v3(CFG.ambientColor) }, uSize: { value: CFG.ambientSize }, uSpeed: { value: CFG.ambientSpeed }, uRange: { value: CFG.ambientRange } },
    vertexShader: AMBIENT_VERT, fragmentShader: AMBIENT_FRAG,
  })
  const ambient = new THREE.Points(ambGeo, ambMat); ambient.frustumCulled = false; group.add(ambient)

  // ── two-composer pipeline: scene (gamma → bloom, off-screen) → warped composite ──
  const sceneComposer = new EffectComposer(renderer)
  sceneComposer.renderToScreen = false
  sceneComposer.setPixelRatio(dpr)
  sceneComposer.setSize(host.clientWidth, host.clientHeight)
  sceneComposer.addPass(new RenderPass(scene, camera))
  sceneComposer.addPass(new ShaderPass(GammaCorrectionShader))
  const bloom = new UnrealBloomPass(new THREE.Vector2(host.clientWidth, host.clientHeight), CFG.bloomStrength, CFG.bloomRadius, CFG.bloomThreshold)
  sceneComposer.addPass(bloom)
  const finalMat = new THREE.ShaderMaterial({
    uniforms: { iTime: { value: 0 }, tScene: { value: null }, iCornerBlue: { value: v3(CFG.cornerBlue) }, iCornerOrange: { value: v3(CFG.cornerOrange) } },
    vertexShader: FINAL_VERT, fragmentShader: FINAL_FRAG, depthTest: false, depthWrite: false,
  })
  const finalQuad = new FullScreenQuad(finalMat)

  // ── HUD labels (DOM, projected; sparse — only the focused nodes) ──
  const labelsEl = document.createElement('div'); labelsEl.className = 'ecw-labels'; host.appendChild(labelsEl)
  const labelEls = NODES.map((n) => {
    const el = document.createElement('div'); el.className = 'ecw-label'
    el.innerHTML = `<span class="ecw-label__tick"></span><span class="ecw-label__name">${n.short}</span><span class="ecw-label__desc">${n.desc}</span>`
    labelsEl.appendChild(el); return el
  })

  // ── pointer / cursor halo ──
  const mouseNDC = new THREE.Vector2(-10, -10)
  let cursorOn = false
  function onMove(e: PointerEvent) { mouseNDC.x = (e.clientX / window.innerWidth) * 2 - 1; mouseNDC.y = -((e.clientY / window.innerHeight) * 2 - 1); cursorOn = true }
  function onOut() { cursorOn = false }
  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('pointerout', onOut, { passive: true })

  // ── resize ──
  function resize() {
    const w = host.clientWidth, h = host.clientHeight; if (!w || !h) return
    camera.aspect = w / h; camera.updateProjectionMatrix()
    renderer.setSize(w, h, false); sceneComposer.setSize(w, h); bloom.setSize(w, h)
    subjectMat.uniforms.iResolutionY.value = h * dpr; ambMat.uniforms.iResolutionY.value = h * dpr
    subjectMat.uniforms.uAspect.value = w / h
  }
  const ro = new ResizeObserver(resize); ro.observe(host); resize()

  // ── loop state ──
  let scrollTarget = reduced ? 0 : 0, scrollEased = 0
  let revealStart = -1, alpha = 0
  const uMouseCur = new THREE.Vector2(-10, -10)
  let uCursorCur = 0
  const camLook = new THREE.Vector3(KEYS[0]!.target[0], KEYS[0]!.target[1], KEYS[0]!.target[2])
  const sPos = new THREE.Vector3(), sTgt = new THREE.Vector3(), sRegion = new THREE.Vector3()
  let sHigh = 0, sExplode = 0
  let firstFrame = true, raf = 0, running = false, disposed = false
  const clock = new THREE.Clock()
  const proj = new THREE.Vector3(), wpos = new THREE.Vector3()
  const parallax = new THREE.Vector2(0, 0)

  function sampleKeys(p: number) {
    const s = clamp01(p) * (KEYS.length - 1)
    const i = Math.min(KEYS.length - 1, Math.floor(s)), j = Math.min(KEYS.length - 1, i + 1), t = s - i
    const A = KEYS[i]!, B = KEYS[j]!
    sPos.set(lerp(A.position[0], B.position[0], t), lerp(A.position[1], B.position[1], t), lerp(A.position[2], B.position[2], t))
    sTgt.set(lerp(A.target[0], B.target[0], t), lerp(A.target[1], B.target[1], t), lerp(A.target[2], B.target[2], t))
    sRegion.set(lerp(A.region[0], B.region[0], t), lerp(A.region[1], B.region[1], t), lerp(A.region[2], B.region[2], t))
    sHigh = lerp(A.highlight, B.highlight, t); sExplode = lerp(A.explode, B.explode, t)
  }

  function frame() {
    if (disposed) return
    const dt = Math.min(clock.getDelta(), 0.1); const time = clock.elapsedTime

    // entrance reveal (fly-in + 2π unwind), easeOutQuart over 3.0s
    if (revealStart >= 0) { const e = clamp01((performance.now() - revealStart) / 3000); alpha = 1 - Math.pow(1 - e, 4) }
    const eased = alpha

    // scroll → camera keyframes (exp damping)
    scrollEased += (scrollTarget - scrollEased) * 0.12
    sampleKeys(scrollEased)
    const aspect = camera.aspect, mob = clamp01((1.1 - aspect) / 0.6)
    if (mob > 0) { sTgt.x *= 1 - 0.85 * mob; sTgt.y *= 1 - 0.4 * mob; sPos.multiplyScalar(1 + 0.4 * mob) }
    const k = 1 - Math.exp(-3.2 * Math.min(dt, 0.1))
    if (firstFrame) { camera.position.copy(sPos); camLook.copy(sTgt); firstFrame = false }
    else { camera.position.lerp(sPos, k); camLook.lerp(sTgt, k) }
    camera.lookAt(camLook)

    // group: reveal fly-in + unwind + slow rotation + cursor parallax
    parallax.x += ((cursorOn ? mouseNDC.x : 0) - parallax.x) * 0.04
    parallax.y += ((cursorOn ? mouseNDC.y : 0) - parallax.y) * 0.04
    const tiltY = parallax.x * 0.12 * uCursorCur * CFG.cursorParallax
    const tiltX = -parallax.y * 0.07 * uCursorCur * CFG.cursorParallax
    group.position.z = lerp(REVEAL_START_Z, 0, eased)
    group.rotation.y = time * CFG.rotationSpeed + tiltY + (1 - eased) * Math.PI * 2
    group.rotation.x = tiltX

    // cursor halo uniforms
    uMouseCur.lerp(mouseNDC, CFG.cursorFollow)
    uCursorCur += ((cursorOn ? 1 : 0) - uCursorCur) * CFG.cursorFade
    const camDist = camera.position.distanceTo(camLook)
    const cr = CFG.cursorRadius
    subjectMat.uniforms.uMouse.value.copy(uMouseCur)
    subjectMat.uniforms.uCursor.value = uCursorCur
    subjectMat.uniforms.uCursorRadius.value = Math.min(cr * 1.3, Math.max(cr * 0.4, cr * 4.6 / camDist))

    // focus / isolation + explode
    subjectMat.uniforms.iTime.value = time; subjectMat.uniforms.iAlpha.value = eased
    subjectMat.uniforms.uHighlightPos.value.copy(sRegion)
    subjectMat.uniforms.uHighlightStrength.value = sHigh
    subjectMat.uniforms.uExplode.value = sExplode
    ambMat.uniforms.iTime.value = time; ambMat.uniforms.iAlpha.value = eased

    // per-node connection brightness (which layer is active)
    const cf = clamp01(scrollEased) * (KEYS.length - 1)
    const allBright = Math.max(0, 1 - Math.min(Math.abs(cf - 5), Math.abs(cf - 6)) / 1.2)
    for (const c of conns) {
      let tI = 0.16 + allBright * 0.7
      for (const fc of c.def.focus) tI = Math.max(tI, 0.16 + Math.max(0, 1 - Math.abs(cf - fc) / 1.0) * 0.8)
      c.intensity += (tI - c.intensity) * 0.08
      c.mat.opacity = c.intensity * eased
    }

    // render: scene (gamma → bloom) off-screen, then warped-gradient composite
    sceneComposer.render()
    finalMat.uniforms.iTime.value = time
    finalMat.uniforms.tScene.value = sceneComposer.readBuffer.texture
    renderer.setRenderTarget(null)
    finalQuad.render(renderer)

    // project HUD labels (sparse: only focused nodes)
    const w = host.clientWidth, h = host.clientHeight
    for (let i = 0; i < NODES.length; i++) {
      const el = labelEls[i]!, c = conns[i]!
      wpos.set(...NODES[i]!.pos).applyMatrix4(group.matrixWorld); proj.copy(wpos).project(camera)
      const vis = proj.z < 1 && Math.abs(proj.x) < 1.1 && Math.abs(proj.y) < 1.1 && c.intensity > 0.55 && eased > 0.4
      if (!vis) { el.style.opacity = '0'; continue }
      el.style.transform = `translate(${((proj.x * 0.5 + 0.5) * w).toFixed(1)}px, ${((-proj.y * 0.5 + 0.5) * h).toFixed(1)}px)`
      el.style.opacity = ((c.intensity - 0.5) * 2 * eased).toFixed(3)
      el.classList.toggle('is-focus', c.intensity > 0.75)
    }

    if (running) raf = requestAnimationFrame(frame)
  }

  if (DIAG) console.log('[EcoWorld] ✓ NM engine · subject pts', total, '· ambient', ambN, '· dpr', dpr)
  resize()
  opts.onReady?.()

  function start() { if (running || disposed) return; running = true; if (revealStart < 0) revealStart = performance.now(); clock.getDelta(); raf = requestAnimationFrame(frame) }
  function stop() { running = false; cancelAnimationFrame(raf) }
  const onVis = () => { if (document.hidden) stop(); else start() }
  document.addEventListener('visibilitychange', onVis)

  return {
    start,
    setProgress(p: number) { if (!reduced) scrollTarget = clamp01(p) },
    dispose() {
      disposed = true; stop(); ro.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerout', onOut)
      labelsEl.remove()
      geo.dispose(); subjectMat.dispose(); ambGeo.dispose(); ambMat.dispose()
      finalQuad.dispose(); sceneComposer.dispose?.(); renderer.dispose()
    },
  }
}
