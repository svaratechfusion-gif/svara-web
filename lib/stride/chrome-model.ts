// STRIDE SCENE C — a chrome GLB on a transparent canvas.
//
// Loads a Draco-compressed GLB, gives every mesh one shared chrome material (metal +
// a PMREM RoomEnvironment for reflections) and renders it over nothing, so the
// gradient backdrop shows through. The caller drives its vertical position each frame
// via `progress` (0 = above the top edge, 0.5 = centred, 1 = below the bottom edge),
// so the same factory can hold a model dead-centre or fly it in with parallax.
//
// PORTED FROM three r0.143 TO THE PROJECT'S r0.185. Two API changes:
//  · `renderer.outputEncoding = sRGBEncoding` → `outputColorSpace = SRGBColorSpace`
//    (the encoding enum was removed in r165).
//  · `mesh.isMesh` is not on the base Object3D type in current typings, so the
//    traverse narrows through `THREE.Mesh` explicitly.
// Everything else — the constants, the light, the fit, the spin model — is unchanged.
//
// This owns its own rAF rather than the site's gsap.ticker, deliberately: it is WebGL
// artwork that must be gated by an IntersectionObserver and stopped dead when
// off-screen. Three unconditioned WebGL loops were the source project's main scroll
// jank; the observer is the fix, and it needs to own start/stop.
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { isScrolling } from '~~/lib/perf/scroll-activity'

/** Tunable chrome-material look for the model. */
export interface ChromeMaterialConfig {
  /** Base tint (hex) — white keeps it a pure mirror. */
  color: string
  /** 0 = dielectric, 1 = metal. */
  metalness: number
  /** 0 = mirror, 1 = matte. */
  roughness: number
  /** Strength of the environment reflection. */
  envMapIntensity: number
  /** Renderer tone-mapping exposure (overall brightness). */
  exposure: number
}

export const defaultChromeMaterial: ChromeMaterialConfig = {
  color: '#a5ade3',
  metalness: 1,
  roughness: 0.1,
  envMapIntensity: 2.8,
  exposure: 0.2,
}

export interface ChromeModelOptions {
  url: string
  /** Fall progress 0..1, read each frame: 0 = above the top edge, 0.5 = centred, 1 = below. */
  progress: () => number
  reducedMotion: boolean
  material?: ChromeMaterialConfig
  /** Spin sense: +1 (default) or −1 to turn the other way. */
  spinDirection?: number
  /** true (default): scroll adds spin momentum. false: constant linear spin. */
  scrollSpin?: boolean
  /** rad added to the spin per px of scroll. Defaults to `SCROLL_ACCEL`. */
  spinAccel?: number
  /** rad/frame cap on the scroll-injected spin. Defaults to `MAX_SPIN`. */
  maxSpin?: number
}

export interface ChromeModelHandle {
  dispose: () => void
  update: (material: ChromeMaterialConfig) => void
}

const IDLE_SPIN = 0.004 // rad/frame — gentle constant turn when idle
const SCROLL_ACCEL = 0.00009 // how much a px of scroll adds to the spin
const FRICTION = 0.965 // momentum decay toward the idle turn
const MAX_SPIN = 0.22 // rad/frame cap so fast scrolls can't spin it wildly
const TILT_X = 0.22 // fixed viewing tilt
const FALL_TOP = 9 // world Y above the frame at progress 0
const FALL_BOTTOM = -9 // world Y below the frame at progress 1

export function createChromeModel(
  canvas: HTMLCanvasElement,
  {
    url,
    progress,
    reducedMotion,
    material = defaultChromeMaterial,
    spinDirection = 1,
    scrollSpin = true,
    spinAccel = SCROLL_ACCEL,
    maxSpin = MAX_SPIN,
  }: ChromeModelOptions,
): ChromeModelHandle {
  const parent = canvas.parentElement ?? canvas
  const sizeOf = () => {
    const r = parent.getBoundingClientRect()
    return { w: Math.max(1, r.width), h: Math.max(1, r.height) }
  }
  let { w, h } = sizeOf()

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(w, h, false)
  renderer.setClearColor(0x000000, 0)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = material.exposure

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100)
  camera.position.set(0, 0, 8)

  // Chrome environment — a soft studio room, prefiltered for metal reflections.
  const pmrem = new THREE.PMREMGenerator(renderer)
  const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04)
  scene.environment = envRT.texture

  const key = new THREE.DirectionalLight(0xffffff, 2.2)
  key.position.set(4, 6, 5)
  scene.add(key)

  const chrome = new THREE.MeshStandardMaterial({
    color: new THREE.Color(material.color),
    metalness: material.metalness,
    roughness: material.roughness,
    envMapIntensity: material.envMapIntensity,
  })

  const group = new THREE.Group()
  scene.add(group)

  // The GLB is Draco-compressed, and getting its decoder right took two attempts:
  //  · The source project's own copied 1.5.x decoder threw "Unexpected geometry type"
  //    — it predates this loader's wrapper contract.
  //  · Letting r0.185 use its bundled decoder (no setDecoderPath) 404s under Vite: the
  //    loader resolves the files relative to `import.meta.url`, which points into
  //    Vite's pre-bundled dep cache, and Vite copies the JS module there but not its
  //    sibling .wasm/.js assets.
  // So: THREE's OWN decoder, copied to public/draco/ (see the note there) and served
  // from a stable URL. Loader and decoder ship from the same three version, so they
  // cannot drift apart on an upgrade without the copy being refreshed too.
  const draco = new DRACOLoader()
  draco.setDecoderPath('/draco/')
  const loader = new GLTFLoader()
  loader.setDRACOLoader(draco)

  let disposed = false
  loader.load(
    url,
    (gltf) => {
      if (disposed) return
      const model = gltf.scene
      const box = new THREE.Box3().setFromObject(model)
      const size = box.getSize(new THREE.Vector3())
      const center = box.getCenter(new THREE.Vector3())
      model.position.sub(center) // centre on origin
      const maxDim = Math.max(size.x, size.y, size.z) || 1
      model.scale.setScalar(3.6 / maxDim) // fit to ~3.6 world units
      model.traverse((o) => {
        const mesh = o as THREE.Mesh
        if (mesh.isMesh) mesh.material = chrome
      })
      group.add(model)
      // Precompile the chrome shader now (off the scroll path), so the first frame
      // after the model scrolls into view doesn't hitch on JIT compilation.
      try {
        renderer.compile(scene, camera)
      }
      catch {
        /* compile is best-effort — the first render will compile if this throws */
      }
    },
    undefined,
    () => {
      /* model failed to load — the gradient backdrop stays */
    },
  )

  group.rotation.x = TILT_X // centred; only Y spins
  let lastScroll = typeof window !== 'undefined' ? window.scrollY : 0
  let spinVel = 0 // scroll-injected angular momentum

  const render = () => {
    // Fall from above the top edge, through centre, out the bottom.
    const p = Math.min(Math.max(progress(), 0), 1)
    group.position.y = FALL_TOP + (FALL_BOTTOM - FALL_TOP) * p

    if (!reducedMotion) {
      if (scrollSpin) {
        const sc = window.scrollY
        // Scroll adds momentum; it eases back toward the idle turn (never stops).
        spinVel = spinVel * FRICTION + (sc - lastScroll) * spinAccel
        spinVel = Math.max(-maxSpin, Math.min(maxSpin, spinVel)) // cap fast-scroll spin
        lastScroll = sc
        group.rotation.y += spinDirection * (IDLE_SPIN + spinVel)
      }
      else {
        // Constant, linear spin — a steady angular velocity, no scroll momentum.
        group.rotation.y += spinDirection * IDLE_SPIN
      }
    }
    renderer.render(scene, camera)
  }

  // Visibility-gated render loop: only render while the section is on (or near) screen.
  let raf = 0
  let running = false
  /** Last render timestamp, for the scroll-time frame cap below. */
  let lastRenderAt = 0
  const loop = () => {
    // WHILE THE PAGE IS SCROLLING this decorative model holds ~30fps. It is a
    // background flourish on a moving page: the frame is contended exactly then,
    // and a halved rate is not perceptible on something turning this slowly.
    // Idle, it runs at full rate as before.
    const now = performance.now()
    if (!isScrolling() || now - lastRenderAt >= 1000 / 30) {
      lastRenderAt = now
      render()
    }
    raf = requestAnimationFrame(loop)
  }
  const startLoop = () => {
    if (running || reducedMotion) return
    running = true
    lastScroll = window.scrollY // reset so a paused gap doesn't inject a spin spike
    raf = requestAnimationFrame(loop)
  }
  const stopLoop = () => {
    if (!running) return
    running = false
    cancelAnimationFrame(raf)
    raf = 0
  }
  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) startLoop()
      else stopLoop()
    },
    { rootMargin: '300px 0px' }, // spin up a little before it scrolls into view
  )
  io.observe(parent)
  // Reduced motion never starts the loop, so draw the one static frame it gets.
  if (reducedMotion) render()

  const resize = () => {
    const s = sizeOf()
    w = s.w
    h = s.h
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  const ro = new ResizeObserver(resize)
  ro.observe(parent)

  return {
    update(next: ChromeMaterialConfig) {
      chrome.color.set(next.color)
      chrome.metalness = next.metalness
      chrome.roughness = next.roughness
      chrome.envMapIntensity = next.envMapIntensity
      renderer.toneMappingExposure = next.exposure
    },
    dispose() {
      disposed = true
      stopLoop()
      io.disconnect()
      ro.disconnect()
      group.traverse((o) => {
        const mesh = o as THREE.Mesh
        if (mesh.isMesh) mesh.geometry.dispose()
      })
      chrome.dispose()
      draco.dispose()
      envRT.dispose()
      pmrem.dispose()
      renderer.dispose()
      renderer.forceContextLoss()
    },
  }
}
