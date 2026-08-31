// SVARA INTELLIGENCE CORE — the WebGL scene.
//
// Framework-free on purpose: this module owns the renderer, camera, scene graph,
// framing, pointer easing and teardown, and knows nothing about Vue. The Vue leaf
// (`SvaraIntelligenceCore.vue`) only decides WHEN to call `render`.
//
// It deliberately runs no render loop of its own. This repo has exactly one tick
// source — `gsap.ticker`, which also drives Lenis and the scene's scroll progress
// (app/plugins/lenis.client.ts) — and the caller drives `render` from it. A
// private `requestAnimationFrame` here would be a second, unsynchronised clock.
import {
  Group,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three'
import { buildCore, type CoreObject } from './build-core'
import { createContainmentField, createOrbitRings } from './containment'
import { MOTION, pickQuality } from './core-config'

const FOV = 34
/** World radius the framing must always contain. A touch beyond the containment
 *  shell so the near halo is never cropped at the frame edge. */
const FIT_RADIUS = 2.05

export interface CoreScene {
  /**
   * Advance and draw one frame.
   * @param time      seconds since start — the object's own clock
   * @param presence  0 → 1, how present the hero is (drives opacity + depth)
   * @param scrollT   0 → 1 through the hero, for the drift-back on exit
   */
  render: (time: number, presence: number, scrollT: number) => void
  resize: () => void
  setPointer: (nx: number, ny: number) => void
  dispose: () => void
}

export interface CoreSceneOptions {
  canvas: HTMLCanvasElement
  /** Element whose box the canvas fills. */
  host: HTMLElement
  reducedMotion: boolean
}

export function createCoreScene({ canvas, host, reducedMotion }: CoreSceneOptions): CoreScene {
  const quality = pickQuality(window.innerWidth)

  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false, // point sprites are already soft-edged; MSAA buys nothing here
    powerPreference: 'high-performance',
  })
  renderer.setClearAlpha(0)

  const scene = new Scene()
  const camera = new PerspectiveCamera(FOV, 1, 0.1, 100)

  // Everything the object is made of turns together.
  const group = new Group()
  scene.add(group)

  const core: CoreObject = buildCore(quality)
  group.add(core.points)

  const field = createContainmentField(quality.fieldDetail)
  group.add(field.lines)

  const orbits = createOrbitRings()
  for (const ring of orbits.rings) group.add(ring)

  // Reduced motion keeps the object readable but takes the life out of it: no
  // per-particle drift, no pointer response, and a spin slow enough to be static
  // at a glance.
  const spin = reducedMotion ? MOTION.spin * 0.22 : MOTION.spin
  core.points.material.uniforms.uDriftAmp.value = reducedMotion ? 0 : 1

  // ── framing ──────────────────────────────────────────────────────────────
  let offsetX = 0
  let offsetY = 0
  /**
   * How strongly the object reads at this viewport. On a desktop frame it has its
   * own column beside the headline. On a phone there is no such column — the copy
   * and the object share the same middle band — so the object steps back rather
   * than the type fighting it. The hierarchy is the same either way; only the
   * means of enforcing it changes.
   */
  let strength = 1

  function frame(): void {
    const width = host.clientWidth || 1
    const height = host.clientHeight || 1
    const aspect = width / height

    camera.aspect = aspect
    const halfFov = (FOV * Math.PI) / 360
    // Fit on BOTH axes and take the looser constraint, so a portrait phone pulls
    // the camera back instead of cropping the object.
    const distV = FIT_RADIUS / Math.tan(halfFov)
    const distH = FIT_RADIUS / (Math.tan(halfFov) * aspect)
    const dist = Math.max(distV, distH) * 1.06
    camera.position.set(0, 0, dist)
    camera.updateProjectionMatrix()

    const visibleH = 2 * dist * Math.tan(halfFov)
    const visibleW = visibleH * aspect

    // Desktop composition puts the core right of centre and slightly low, so the
    // editorial headline keeps the upper-left of the frame to itself. Below the
    // two-column breakpoint there is no room to offset into — it centres.
    const wide = width >= 1180
    offsetX = wide ? visibleW * 0.14 : 0
    // Dropped below centre so the headline's second line crosses only the top of
    // the object rather than its dense middle. The type has to stay first in the
    // hierarchy, and it can't if the core sits directly behind it.
    offsetY = wide ? -visibleH * 0.17 : -visibleH * 0.12
    strength = width >= 1180 ? 1 : width >= 900 ? 0.85 : 0.68

    // Depth fade is measured from the camera, so it has to follow the framing.
    // It starts at the object's OWN CENTRE, not in front of it: begin the fade
    // any nearer and the front half of the form is already washing out toward the
    // page, which is what turns a solid into a smudge. Only the back half recedes.
    const u = core.points.material.uniforms
    u.uFogNear.value = dist - 0.2
    u.uFogFar.value = dist + 3.6

    const dpr = Math.min(window.devicePixelRatio || 1, quality.maxDpr)
    renderer.setPixelRatio(dpr)
    renderer.setSize(width, height, false)
    core.resize(renderer.domElement.height)
  }

  frame()

  // ── pointer ──────────────────────────────────────────────────────────────
  // The object never tracks the cursor. It leans, by about a tenth of a turn, and
  // eases there — the difference between an object reacting to you and a puppet.
  let targetYaw = 0
  let targetPitch = 0
  let yaw = 0
  let pitch = 0

  function setPointer(nx: number, ny: number): void {
    if (reducedMotion) return
    targetYaw = nx * MOTION.pointerYaw
    targetPitch = ny * MOTION.pointerPitch
  }

  // ── render ───────────────────────────────────────────────────────────────
  function render(time: number, presence: number, scrollT: number): void {
    const u = core.points.material.uniforms
    u.uTime.value = time
    u.uOpacity.value = presence * strength
    u.uBreath.value = reducedMotion ? 0 : Math.sin(time * MOTION.breathSpeed) * 0.5 + 0.5

    // The lattice is faint to begin with; fading it on the same curve keeps it
    // from being the last thing on screen as the hero leaves.
    field.lines.material.opacity = 0.3 * presence * strength
    for (const ring of orbits.rings) {
      const material = ring.material as { opacity: number }
      material.opacity = (ring === orbits.rings[0] ? 0.2 : 0.12) * presence * strength
    }

    yaw += (targetYaw - yaw) * MOTION.pointerEase
    pitch += (targetPitch - pitch) * MOTION.pointerEase

    group.rotation.y = time * spin + yaw
    group.rotation.x = pitch
    // On exit the object settles back and up rather than simply fading — the
    // hero reads as a camera move away from it, not a light switch.
    group.position.set(offsetX, offsetY + scrollT * 0.55, -scrollT * 1.6)
    group.scale.setScalar(0.94 + presence * 0.06)

    renderer.render(scene, camera)
  }

  function dispose(): void {
    core.dispose()
    field.dispose()
    orbits.dispose()
    scene.clear()
    group.clear()
    renderer.dispose()
    // Drop the GL context explicitly. Browsers cap live contexts (~8–16) and a
    // client-side route change would otherwise leak this one until GC.
    renderer.forceContextLoss()
  }

  return { render, resize: frame, setPointer, dispose }
}
