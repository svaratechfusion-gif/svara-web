/**
 * The /ecosystem cinematic engine — a framework-agnostic Three.js scene ported
 * from the Clarix reference.
 *
 * Two stacked full-screen canvases:
 *   · BACKGROUND (z1) — the procedural ASCII grid, rendered by its own renderer
 *     into its own scene, so it is never affected by the camera flight.
 *   · FOREGROUND (z3) — the hero model in its holographic ASCII shader, the
 *     and the logo particle cloud.
 *
 * Everything is choreographed against ONE normalized scroll progress (0 → 1),
 * mapped from a 2800vh page with the last 100vh reserved as a pause.
 *
 * > Deviation from the reference, deliberate: it creates its own Lenis. This
 * > site has a single authoritative Lenis (app/plugins/lenis.client.ts) that
 * > owns the scroll position, so this engine never touches Lenis and never
 * > drives scroll — it only READS `window.scrollY`. It does keep its own
 * > requestAnimationFrame for rendering; see the loop at the bottom.
 */

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { buildLogoParticles } from './particles'
import {
  BG_FRAG, BG_VERT,
  HOLO_FRAG_BODY, HOLO_FRAG_PREFIX, HOLO_VERT_BODY, HOLO_VERT_PREFIX,
  PARTICLE_FRAG, PARTICLE_VERT,
} from './shaders'

const DRACO_PATH = 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/'

/** Model placement at the end of the scroll's fourth phase. */
const PHASE4 = { x: -1.35, y: -5.4, z: 5.67, scale: 0.85, rotX: 0, rotY: 0.6723, rotZ: 0 }

export interface ClarixFrameState {
  scrollProgress: number
  transition: number
  phase3: number
  phase4: number
  phase5: number
  modelFlyIn: number
}

export interface ClarixOptions {
  /** Element the two canvases are appended to. */
  container: HTMLElement
  /**
   * The element whose height IS the cinematic scroll (the 2800vh spacer).
   *
   * The reference reads `document.body.scrollHeight`, which is only correct
   * while the body contains nothing but the experience. This page appends the
   * site's real footer after it, and that footer would otherwise stretch the
   * phase windows — every beat would land early and the finale would never
   * reach 1. Measuring the spacer keeps the choreography independent of
   * whatever follows it.
   */
  scrollSpan: HTMLElement
  modelUrl: string
  /** SVG the particle cloud is sampled from. */
  logoUrl: string
  /** Called once per frame with the choreography's state. */
  onFrame: (state: ClarixFrameState) => void
  /** Called once on the first frame, so the DOM can reveal itself. */
  onRevealed: () => void
}

export interface ClarixHandle {
  dispose: () => void
}

export function createClarixScene(options: ClarixOptions): ClarixHandle {
  const { container, scrollSpan, modelUrl, logoUrl, onFrame, onRevealed } = options

  /* ── Scenes, camera, renderers ─────────────────────────────────────────── */

  const bgScene = new THREE.Scene()
  bgScene.background = new THREE.Color(0xf6fafe)

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 1, 5)

  const rendererBg = new THREE.WebGLRenderer({ antialias: true })
  rendererBg.setSize(window.innerWidth, window.innerHeight)
  rendererBg.setPixelRatio(window.devicePixelRatio)
  rendererBg.domElement.className = 'clarix-canvas clarix-canvas--bg'
  container.appendChild(rendererBg.domElement)

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.domElement.className = 'clarix-canvas clarix-canvas--fg'
  container.appendChild(renderer.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enabled = false
  controls.enableDamping = true
  controls.dampingFactor = 0.05

  scene.add(new THREE.AmbientLight(0xffffff, 1.0))
  const dir1 = new THREE.DirectionalLight(0xffffff, 2.0)
  dir1.position.set(5, 10, 5)
  scene.add(dir1)
  const dir2 = new THREE.DirectionalLight(0xffffff, 1.0)
  dir2.position.set(-5, -5, -5)
  scene.add(dir2)

  /* ── Shared uniforms ───────────────────────────────────────────────────── */

  const clock = new THREE.Clock()
  const targetMouse = new THREE.Vector2(0.5, 0.5)
  const revealVec = new THREE.Vector3()

  const uniforms = {
    time: { value: 0 },
    mouse: { value: new THREE.Vector2(0.5, 0.5) },
    resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    bgColor: { value: new THREE.Color(0xf6fafe) },
    colorCyan: { value: new THREE.Color(0x00aaff) },
    colorPurple: { value: new THREE.Color(0x8000ff) },
    colorBlue: { value: new THREE.Color(0x0091ff) },
    colorPeach: { value: new THREE.Color(0xff0000) },
    colorHotPink: { value: new THREE.Color(0xff0099) },
    edgeBlurAmount: { value: 0.5 },
    uRevealProgress: { value: 0.0 },
    uRevealOrigin: { value: new THREE.Vector2(0.5, 0.5) },
  }

  /* ── Background ASCII grid ─────────────────────────────────────────────── */

  const bgMat = new THREE.ShaderMaterial({
    uniforms: {
      time: uniforms.time, mouse: uniforms.mouse, bgColor: uniforms.bgColor,
      resolution: uniforms.resolution, colorCyan: uniforms.colorCyan,
      colorBlue: uniforms.colorBlue, colorHotPink: uniforms.colorHotPink,
      colorPeach: uniforms.colorPeach,
    },
    vertexShader: BG_VERT,
    fragmentShader: BG_FRAG,
    depthWrite: false,
    depthTest: false,
  })
  const bgMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), bgMat)
  bgMesh.renderOrder = -1
  bgMesh.frustumCulled = false
  bgScene.add(bgMesh)

  /** Wraps a material in the holographic gradient + ASCII dither + reveal circle. */
  function applyHolographicShader(mat: THREE.Material) {
    mat.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, {
        time: uniforms.time,
        colorCyan: uniforms.colorCyan,
        colorPurple: uniforms.colorPurple,
        colorBlue: uniforms.colorBlue,
        colorPeach: uniforms.colorPeach,
        colorHotPink: uniforms.colorHotPink,
        edgeBlurAmount: uniforms.edgeBlurAmount,
        uRevealProgress: uniforms.uRevealProgress,
        uRevealOrigin: uniforms.uRevealOrigin,
        resolution: uniforms.resolution,
      })
      shader.vertexShader = HOLO_VERT_PREFIX + shader.vertexShader
      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>\n${HOLO_VERT_BODY}`,
      )
      shader.fragmentShader = HOLO_FRAG_PREFIX + shader.fragmentShader
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <dithering_fragment>',
        `#include <dithering_fragment>\n${HOLO_FRAG_BODY}`,
      )
    }
  }

  /* ── Model + particles ─────────────────────────────────────────────────── */

  let mixer: THREE.AnimationMixer | null = null
  let model: THREE.Object3D | null = null
  let modelMaterial: THREE.Material | null = null
  let baseModelScale = 1
  let currentModelScale = 1
  let particles: THREE.Points | null = null
  let particleMat: THREE.ShaderMaterial | null = null

  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath(DRACO_PATH)
  const loader = new GLTFLoader()
  loader.setDRACOLoader(dracoLoader)

  loader.load(modelUrl, (gltf) => {
    const loaded = gltf.scene

    // Normalise: largest dimension becomes 5 units, then re-centre.
    const box = new THREE.Box3().setFromObject(loaded)
    const size = box.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    const scale = 5 / maxDim
    loaded.scale.setScalar(scale)
    baseModelScale = scale
    currentModelScale = scale

    const scaledBox = new THREE.Box3().setFromObject(loaded)
    const center = scaledBox.getCenter(new THREE.Vector3())
    loaded.position.sub(center)

    loaded.traverse((child) => {
      if (!(child as THREE.Mesh).isMesh) return
      const baseMat = new THREE.MeshPhysicalMaterial({
        color: 0x010103, metalness: 0.9, roughness: 0.2, clearcoat: 1.0,
        clearcoatRoughness: 0.1, transparent: true, opacity: 0.95, side: THREE.DoubleSide,
      })
      applyHolographicShader(baseMat)
      ;(child as THREE.Mesh).material = baseMat
      modelMaterial = baseMat
    })

    loaded.position.set(0.1, -3.93, 4.17)
    loaded.rotation.set(-0.05026, -0.92781, -0.12566)
    scene.add(loaded)
    model = loaded

    camera.position.set(-1.8, -1.0, 6.5)
    camera.lookAt(-1.8, 0.5, 0)
    controls.target.set(-1.8, 0.5, 0)
    controls.update()

    if (gltf.animations?.length) {
      mixer = new THREE.AnimationMixer(loaded)
      gltf.animations.forEach((clip) => mixer!.clipAction(clip).play())
    }

    // The logo cloud is sampled from the SVARA mark.
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = logoUrl
    img.onload = () => {
      particleMat = new THREE.ShaderMaterial({
        uniforms: {
          time: uniforms.time, uProgress: { value: 0.0 }, uScale: { value: 1.0 },
          uShatterFade: { value: 0.0 }, colorCyan: uniforms.colorCyan,
          colorBlue: uniforms.colorBlue, colorPeach: uniforms.colorPeach,
          colorHotPink: uniforms.colorHotPink,
        },
        vertexShader: PARTICLE_VERT,
        fragmentShader: PARTICLE_FRAG,
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
      })
      particles = new THREE.Points(buildLogoParticles(img), particleMat)
      particles.position.set(-0.6, -2.0, -3.0)
      particles.frustumCulled = false
      particles.visible = false
      scene.add(particles)
    }
    img.onerror = () => console.error('[clarix] logo failed to load:', logoUrl)
  }, undefined, (error) => {
    console.error('[clarix] model failed to load:', error)
  })

  /* ── Scroll ────────────────────────────────────────────────────────────── */

  let scrollProgress = 0
  let responsiveScale = computeResponsiveScale()

  function computeResponsiveScale() {
    const ratio = window.innerWidth / 1200
    // Grows at 40% speed above 1200px, so 4K monitors don't blow it up.
    return ratio <= 1.0 ? ratio : 1.0 + (ratio - 1.0) * 0.4
  }

  function readScroll() {
    // The last 100vh of the spacer is a pure pause where the animation holds at
    // 100%, so the finale can breathe before the footer scrolls in.
    const animationMaxScroll = Math.max(1, scrollSpan.offsetHeight - window.innerHeight * 2)
    scrollProgress = Math.max(0, Math.min(window.scrollY / animationMaxScroll, 1.0))
  }

  function handleMouseMove(event: MouseEvent) {
    targetMouse.x = event.clientX / window.innerWidth
    targetMouse.y = 1.0 - event.clientY / window.innerHeight
  }

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    rendererBg.setSize(window.innerWidth, window.innerHeight)
    renderer.setSize(window.innerWidth, window.innerHeight)
    uniforms.resolution.value.set(window.innerWidth, window.innerHeight)
    responsiveScale = computeResponsiveScale()
  }

  window.addEventListener('scroll', readScroll, { passive: true })
  window.addEventListener('mousemove', handleMouseMove, { passive: true })
  window.addEventListener('resize', handleResize)

  /* ── Reveal ────────────────────────────────────────────────────────────── */

  // No loading screen: the page reveals on its first frame and the model's
  // intro reveal circle starts from there.
  let revealed = false
  let revealStartTime = 0
  const timers: ReturnType<typeof setTimeout>[] = []

  /* ── Frame ─────────────────────────────────────────────────────────────── */

  const snapLerp = (current: number, target: number, speed: number) =>
    Math.abs(target - current) < 0.0001 ? target : THREE.MathUtils.lerp(current, target, speed)

  /**
   * Longest frame the choreography will integrate, seconds.
   *
   * Every lerp here is written as `lerp(current, target, delta * k)` — the
   * reference's idiom, and correct at 60fps where `delta * k` stays well under
   * 1. But `delta` is unbounded: one long frame (a tab switch, a GC pause, the
   * model finishing its decode) makes the factor exceed 1, and both
   * `MathUtils.lerp` and `Vector2.lerp` EXTRAPOLATE past the target rather than
   * clamping. The mouse uniform then lands far off-screen and the whole ASCII
   * field blinks out; the camera and model overshoot with it.
   *
   * Clamping the frame instead of every call site fixes all of them at once,
   * and costs nothing at a normal frame rate.
   */
  const MAX_FRAME = 1 / 30

  function frame() {
    const delta = Math.min(clock.getDelta(), MAX_FRAME)
    uniforms.time.value += delta
    uniforms.mouse.value.lerp(targetMouse, delta * 3.0)

    if (!revealed) {
      revealed = true
      onRevealed()
    }

    // The model's intro reveal circle, half a second in.
    if (uniforms.uRevealProgress.value < 0.999) {
      if (!revealStartTime) revealStartTime = uniforms.time.value + 0.5
      const elapsed = uniforms.time.value - revealStartTime
      if (elapsed > 0) {
        const progress = Math.min(1.0, elapsed / 2.3)
        uniforms.uRevealProgress.value = 1 - Math.pow(1 - progress, 3)
      }
    }

    // ── Phase windows ──
    const transition = Math.min(1.0, scrollProgress / 0.12)
    const phase3 = Math.max(0, Math.min(1.0, (scrollProgress - 0.40) / 0.14))
    const phase4 = Math.max(0, Math.min(1.0, (scrollProgress - 0.54) / 0.14))
    const phase5 = Math.max(0, Math.min(1.0, (scrollProgress - 0.68) / 0.12))
    const modelFlyIn = Math.max(0, Math.min(1.0, (scrollProgress - 0.86) / 0.14))
    const logoShatter = modelFlyIn

    const lerpSpeed = delta * 6.0

    // ── Camera ──
    const targetCamX = THREE.MathUtils.lerp(-1.8, -0.6, transition)
    const targetFocusX = targetCamX
    const targetCamY = THREE.MathUtils.lerp(-1.0, -2.0, transition)
    const targetFocusY = THREE.MathUtils.lerp(0.5, -2.0, transition)
    const phase3CamZ = THREE.MathUtils.lerp(7.5, 7.15, phase3)
    const targetCamZ = THREE.MathUtils.lerp(6.5, phase3CamZ, transition)
    const finalCamZ = THREE.MathUtils.lerp(targetCamZ, 0.5, phase5)

    camera.position.x = snapLerp(camera.position.x, targetCamX, lerpSpeed)
    camera.position.y = snapLerp(camera.position.y, targetCamY, lerpSpeed)
    camera.position.z = snapLerp(camera.position.z, finalCamZ, lerpSpeed)
    controls.target.x = snapLerp(controls.target.x, targetFocusX, lerpSpeed)
    controls.target.y = snapLerp(controls.target.y, targetFocusY, lerpSpeed)

    const pointerX = targetMouse.x * 2 - 1
    const pointerY = targetMouse.y * 2 - 1

    // ── Model ──
    if (model) {
      const baseX = THREE.MathUtils.lerp(-0.6, -0.5, transition)
      const baseY = THREE.MathUtils.lerp(-3.93, -6.15, transition)
      const baseZ = THREE.MathUtils.lerp(4.17, 7.0, transition)
      const tX = THREE.MathUtils.lerp(baseX, PHASE4.x, phase4)
      const tY = THREE.MathUtils.lerp(baseY, PHASE4.y, phase4)
      const tZ = THREE.MathUtils.lerp(baseZ, PHASE4.z, phase4)

      const p6Ease = 1.0 - Math.pow(1.0 - modelFlyIn, 3)
      const p6X = THREE.MathUtils.lerp(tX, -0.4, p6Ease)
      const p6Y = THREE.MathUtils.lerp(tY, -5.2, p6Ease)
      const p6Z = THREE.MathUtils.lerp(tZ, -1.0, p6Ease)

      const mouseRotX = pointerY * 0.05
      const mouseRotY = pointerX * 0.10
      const rotProgress = Math.max(0, Math.min(1.0, (scrollProgress - 0.12) / 0.28))

      const tRotX = THREE.MathUtils.lerp(-0.05026, -0.2, transition)
      const p6RotX = THREE.MathUtils.lerp(THREE.MathUtils.lerp(tRotX, PHASE4.rotX, phase4), mouseRotX, p6Ease)

      const initialRotY = -0.92781
      const transitionRotY = THREE.MathUtils.lerp(initialRotY, initialRotY + Math.PI, transition)
      const baseRotY = THREE.MathUtils.lerp(transitionRotY, Math.PI * 2, rotProgress)
      const p6RotY = THREE.MathUtils.lerp(THREE.MathUtils.lerp(baseRotY, PHASE4.rotY, phase4), mouseRotY, p6Ease)

      const tRotZ = THREE.MathUtils.lerp(-0.12566, 0.0, transition)
      const p6RotZ = THREE.MathUtils.lerp(THREE.MathUtils.lerp(tRotZ, PHASE4.rotZ, phase4), 0.0, p6Ease)

      model.position.x = snapLerp(model.position.x, p6X, lerpSpeed)
      model.position.y = snapLerp(model.position.y, p6Y, lerpSpeed)
      model.position.z = snapLerp(model.position.z, p6Z, lerpSpeed)
      model.rotation.x = snapLerp(model.rotation.x, p6RotX, lerpSpeed)
      model.rotation.y = snapLerp(model.rotation.y, p6RotY, lerpSpeed)
      model.rotation.z = snapLerp(model.rotation.z, p6RotZ, lerpSpeed)

      const targetScale = THREE.MathUtils.lerp(baseModelScale, baseModelScale * PHASE4.scale, phase4)
      currentModelScale = snapLerp(currentModelScale, targetScale, lerpSpeed)
      model.scale.setScalar(currentModelScale)

      if (modelMaterial) {
        let targetOpacity = 0.95
        if (modelFlyIn > 0) targetOpacity = THREE.MathUtils.lerp(0.0, 0.95, Math.min(1.0, modelFlyIn * 2.0))
        else if (phase5 > 0) targetOpacity = THREE.MathUtils.lerp(0.95, 0.0, Math.min(1.0, phase5 * 2.0))
        ;(modelMaterial as THREE.MeshPhysicalMaterial).opacity = targetOpacity
      }

      // Keep the intro reveal circle centred on the model's real screen position.
      if (uniforms.uRevealProgress.value < 0.999) {
        model.getWorldPosition(revealVec)
        revealVec.project(camera)
        uniforms.uRevealOrigin.value.set(
          (revealVec.x * 0.5 + 0.5) * (window.innerWidth / window.innerHeight),
          revealVec.y * 0.5 + 0.5,
        )
      }
    }

    // ── Logo particles ──
    if (particles && particleMat) {
      if (phase5 > 0) {
        particles.visible = true
        let targetProgress = phase5
        const targetFade = 0.0

        if (logoShatter > 0) {
          const explodeEase = THREE.MathUtils.smoothstep(logoShatter, 0.0, 1.0)
          // The vertex shader assembles on a pow(4) curve; this inverse keeps the
          // explosion linear instead of holding then snapping.
          targetProgress = 1 - Math.pow(explodeEase, 0.3)
        }

        particleMat.uniforms.uProgress!.value = snapLerp(particleMat.uniforms.uProgress!.value, targetProgress, lerpSpeed * 1.5)
        particleMat.uniforms.uShatterFade!.value = snapLerp(particleMat.uniforms.uShatterFade!.value, targetFade, lerpSpeed * 1.5)

        particles.rotation.x = pointerY * 0.15 * phase5
        particles.rotation.y = pointerX * 0.25 * phase5

        const p6Ease = THREE.MathUtils.smoothstep(modelFlyIn, 0.0, 1.0)
        const targetScale = THREE.MathUtils.lerp(1.0, 1.4, p6Ease) * responsiveScale
        const next = snapLerp(particles.scale.x, targetScale, lerpSpeed)
        particles.scale.setScalar(next)
        particleMat.uniforms.uScale!.value = next
      }
      else {
        particles.visible = false
        particleMat.uniforms.uProgress!.value = 0
        particles.rotation.set(0, 0, 0)
        particles.scale.setScalar(1)
        particleMat.uniforms.uScale!.value = 1
      }
    }

    onFrame({
      scrollProgress,
      transition,
      phase3,
      phase4,
      phase5,
      modelFlyIn,
    })

    if (mixer) mixer.update(delta)
    controls.update()
    rendererBg.render(bgScene, camera)
    renderer.render(scene, camera)
  }

  // Own rAF rather than gsap.ticker.
  //
  // The site's rule (app/plugins/lenis.client.ts) is that no component may spawn
  // a competing rAF loop FOR SCROLLING — Lenis owns the scroll position and
  // ScrollTrigger syncs off its tick. This is a render loop: it reads scrollY,
  // it never drives it, so it does not compete for that ownership. It also has
  // to be self-driven in practice — registering on gsap.ticker, the callback
  // was never invoked on this route (verified: `ticker.add` ran, the frame body
  // never did), and a WebGL scene that silently stops rendering is not a
  // failure mode worth inheriting.
  let rafId = 0
  const loop = () => {
    rafId = requestAnimationFrame(loop)
    frame()
  }
  rafId = requestAnimationFrame(loop)

  /* ── Teardown ──────────────────────────────────────────────────────────── */

  return {
    dispose() {
      cancelAnimationFrame(rafId)
      timers.forEach(clearTimeout)
      window.removeEventListener('scroll', readScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      controls.dispose()
      dracoLoader.dispose()
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh
        if (mesh.geometry) mesh.geometry.dispose()
        const m = mesh.material as THREE.Material | THREE.Material[] | undefined
        if (Array.isArray(m)) m.forEach((mm) => mm.dispose())
        else m?.dispose()
      })
      bgMesh.geometry.dispose()
      bgMat.dispose()
      renderer.dispose()
      rendererBg.dispose()
      rendererBg.domElement.remove()
      renderer.domElement.remove()
    },
  }
}
