<script setup lang="ts">
/**
 * HeadParticles — the WebGL scene behind the contact hero: a 3D head point cloud
 * (front-lit face, real PCA normals) over a navy god-ray background, with a
 * dark-side upward particle flow, rising embers, and chromatic dispersion. It
 * fills its positioned parent and is `aria-hidden` — the hero's real headings
 * live in the overlay above it.
 *
 * The head materialises on a bottom→top scan as the page opens, then turns
 * slightly to follow the cursor with a soft light burst under it.
 *
 * How heavy the scene is allowed to be — and whether the pointer drives it at
 * all — comes from the `SceneQuality` tier resolved once at mount (see
 * `lib/noema/quality.ts`). On a coarse pointer the parallax/burst listeners are
 * never attached: there is no cursor to follow, only drags to misread.
 *
 * ── on the render loop ──────────────────────────────────────────────────────
 * This owns a private rAF. The site's standing rule is that no component may
 * spawn a competing loop *for scrolling* — Lenis owns that, and this scene never
 * reads or drives scroll. It is a self-contained canvas clock, gated three ways
 * (off-screen, hidden tab, nothing-changed) so it costs nothing when idle, and
 * it stops entirely once the intro settles on the reduced-motion / mobile tier.
 */
import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { DecodedPointCloud } from '~~/lib/noema/decode-points'
import { loadPointCloud } from '~~/lib/noema/load'
import { resolveSceneQuality } from '~~/lib/noema/quality'
import { ParticleRenderer } from '~~/lib/noema/renderer'

const props = defineProps<{
  /** Absolute URL of the point-cloud manifest (`/assets/head/…json`). */
  manifestSrc: string
  /** Delay (ms) from mount before the materialisation scan begins. */
  introDelay?: number
  /**
   * Element whose visibility gates rendering. The canvas is a FIXED page layer —
   * it never leaves the viewport, so watching it would mean drawing forever.
   * Watching the hero instead lets the scene freeze on its last frame once the
   * reader scrolls into the sections, which is exactly what should happen: WebGL
   * keeps that frame on screen at zero cost. Falls back to the canvas.
   */
  gate?: HTMLElement | null
}>()

// Fixed base orientation; the head only turns slightly with the pointer.
const BASE_YAW = -2.088
const BASE_PITCH = 0.05
const POINTER_PARALLAX = 0.22
const PITCH_RANGE = 0.12
const POINTER_EASE = 0.06
const BURST_EASE = 0.12
const SETTLE_EPSILON = 0.0002
/** How long the bottom→top scan takes to fully materialise the head. */
const INTRO_MS = 3000
/** How long to keep drawing after the intro settles, before the freeze path
 *  (reduced motion / mobile) stops the loop on a fully-formed frame. */
const FREEZE_SETTLE_MS = 600

type Rgb = [number, number, number]

const canvasRef = ref<HTMLCanvasElement | null>(null)
const failure = ref<string | null>(null)

const parseColor = (value: string): Rgb | null => {
  const v = value.trim()
  const hex = v.match(/^#([0-9a-f]{6})$/i)
  if (hex) {
    const n = Number.parseInt(hex[1]!, 16)
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
  }
  const nums = v.match(/-?\d+(?:\.\d+)?/g)
  if (nums && nums.length >= 3)
    return [Number(nums[0]) / 255, Number(nums[1]) / 255, Number(nums[2]) / 255]
  return null
}

const readColor = (el: Element, prop: string, fallback: Rgb): Rgb =>
  parseColor(getComputedStyle(el).getPropertyValue(prop)) ?? fallback

let teardown: (() => void) | null = null

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  const quality = resolveSceneQuality()

  let renderer: ParticleRenderer
  try {
    renderer = new ParticleRenderer(canvas, quality)
  }
  catch (err) {
    failure.value = err instanceof Error ? err.message : 'WebGL unavailable'
    return
  }

  // Custom properties inherit, so reading them off the canvas picks up whatever
  // the page scope defines — no dependency on them living at :root.
  renderer.setColor(readColor(canvas, 'color', [1, 1, 1]))
  renderer.setBackground({
    top: readColor(canvas, '--noema-backdrop-top', [0.055, 0.11, 0.243]),
    bottom: readColor(canvas, '--noema-backdrop-bottom', [0.016, 0.024, 0.059]),
    ray: readColor(canvas, '--noema-ray', [0.29, 0.447, 0.816]),
    lightUv: [0.54, 0.74],
  })

  const dpr = quality.dpr
  let appliedW = 0
  let appliedH = 0
  let targetX = 0
  let targetY = 0
  let curX = 0
  let curY = 0
  let burst = 0
  let pointerInside = false
  let elapsed = 0
  let lastFrameMs = performance.now()
  const mountTime = lastFrameMs
  let introStart: number | null = null
  let geometryReady = false
  let needsRender = true
  let cloud: DecodedPointCloud | null = null

  // Re-sizing the drawing buffer re-allocates the framebuffer (and the
  // dispersion target), which mid-scroll on iOS reads as a whole-scene flash —
  // and iOS changes the viewport every time the URL bar collapses. So on touch
  // the surface is sized once and kept; the canvas is sized against the LARGE
  // viewport, so that first size already covers the screen in both URL-bar
  // states. Desktop keeps following its box.
  const syncSize = (): boolean => {
    if (appliedW > 0 && !quality.resize) return false
    const cw = canvas.clientWidth
    const ch = canvas.clientHeight
    if (cw > 0 && ch > 0 && (cw !== appliedW || ch !== appliedH)) {
      renderer.resize(cw, ch, dpr)
      appliedW = cw
      appliedH = ch
      return true
    }
    return false
  }
  const hasSize = (): boolean => appliedW > 0 && appliedH > 0

  // Render-on-demand gate. A hidden tab paints nothing, and a canvas scrolled out
  // of view is pure waste — the observer keeps a viewport of margin so the scene
  // is already warm when it arrives back.
  let onScreen = true
  const observer = new IntersectionObserver(([entry]) => {
    onScreen = entry?.isIntersecting ?? true
    if (onScreen) needsRender = true
  }, { rootMargin: '100% 0px' })
  observer.observe(props.gate ?? canvas)
  const isVisible = (): boolean => onScreen && !document.hidden

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  let reduced = motionQuery.matches
  const smooth01 = (t: number): number => {
    const c = t < 0 ? 0 : t > 1 ? 1 : t
    // easeOutCubic: starts at full speed (the reveal begins promptly, not after a
    // slow ramp) and reaches zero velocity at the end (settles without a snap).
    const inv = 1 - c
    return 1 - inv * inv * inv
  }
  /** 0 = head hidden, 1 = fully materialised. Jumps to 1 under reduced motion. */
  const computeReveal = (nowMs: number): number =>
    reduced ? 1 : introStart === null ? 0 : smooth01((nowMs - introStart) / INTRO_MS)

  const renderAt = (time: number, burstVal: number, reveal: number): void => {
    if (!hasSize()) return
    renderer.render({
      time,
      yaw: BASE_YAW + curX * POINTER_PARALLAX,
      pitch: BASE_PITCH + curY * PITCH_RANGE,
      pointer: [curX, curY],
      burst: burstVal,
      reveal,
    })
  }
  const draw = (): void => {
    syncSize()
    renderAt(elapsed, burst, computeReveal(performance.now()))
  }
  draw()

  const onPointerMove = (event: PointerEvent): void => {
    const rect = canvas.getBoundingClientRect()
    targetX = ((event.clientX - rect.left) / rect.width) * 2 - 1
    targetY = -(((event.clientY - rect.top) / rect.height) * 2 - 1)
    pointerInside = true
    needsRender = true
  }
  const onPointerLeave = (): void => {
    targetX = 0
    targetY = 0
    pointerInside = false
    needsRender = true
  }
  // Listen on the window so the pointer still drives the scene through the
  // overlaid hero content, which sits above the canvas. Skipped entirely on a
  // coarse pointer: with no cursor the head just stays at its base pose.
  if (quality.pointer) {
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('pointerleave', onPointerLeave, { passive: true })
  }

  let frozen = false
  let settleStart = 0

  const onMotionChange = (): void => {
    reduced = motionQuery.matches
    needsRender = true
  }
  motionQuery.addEventListener('change', onMotionChange)

  const onVisibility = (): void => {
    if (!document.hidden) needsRender = true
  }
  document.addEventListener('visibilitychange', onVisibility)

  let rafId = 0
  const frame = (time: number): void => {
    rafId = requestAnimationFrame(frame)
    if (frozen || !isVisible()) return
    if (syncSize()) needsRender = true

    // Accumulated from a CLAMPED delta, not `time - start`: coming back from a
    // hidden tab (or a long stall) would otherwise hand the shader a multi-second
    // jump and teleport every particle mid-drift.
    const dt = Math.min(0.05, Math.max(0, (time - lastFrameMs) / 1000))
    lastFrameMs = time
    if (!reduced) {
      elapsed += dt // animate shimmer + rays continuously
      needsRender = true
    }

    if (quality.pointer) {
      const nextX = curX + (targetX - curX) * POINTER_EASE
      const nextY = curY + (targetY - curY) * POINTER_EASE
      if (Math.abs(nextX - curX) > SETTLE_EPSILON) needsRender = true
      if (Math.abs(nextY - curY) > SETTLE_EPSILON) needsRender = true
      curX = nextX
      curY = nextY

      const bt = pointerInside ? 1 : 0
      const nextBurst = burst + (bt - burst) * BURST_EASE
      if (Math.abs(nextBurst - burst) > SETTLE_EPSILON) needsRender = true
      burst = nextBurst
    }

    // Start the materialisation scan on the first visible frame that has the
    // head, never earlier. A page opened into a background tab therefore still
    // gets the full reveal when the visitor arrives, instead of finding the scan
    // already run to completion against a clock that ticked while nothing was
    // being drawn.
    if (introStart === null && geometryReady)
      introStart = Math.max(mountTime + (props.introDelay ?? 0), time)

    const reveal = computeReveal(time)
    if (reveal < 1) needsRender = true // keep animating the intro

    if (!needsRender) return
    needsRender = false
    renderAt(elapsed, burst, reveal)

    // Reduced-motion / mobile path: once the intro has fully materialised, stop
    // drawing. WebGL keeps the last frame on the canvas, so the head stays on
    // screen at zero cost — the continuous loop is exactly what drags a
    // constrained phone down.
    if (quality.freeze && reveal >= 1) {
      if (settleStart === 0) settleStart = time
      else if (time - settleStart > FREEZE_SETTLE_MS) frozen = true
    }
  }
  rafId = requestAnimationFrame(frame)

  // Load + decode the head, then hand it to the renderer.
  const controller = new AbortController()
  let worker: Worker | null = null
  loadPointCloud(props.manifestSrc, controller.signal, (w) => { worker = w })
    .then((data) => {
      if (controller.signal.aborted) return
      cloud = data
      renderer.setGeometry(cloud)
      // Compile/link/allocate everything NOW — a program finalised or a render
      // target allocated on a frame the visitor can see is a micro-freeze.
      renderer.prewarm()
      geometryReady = true
      needsRender = true
      draw()
    })
    .catch((error: unknown) => {
      if (controller.signal.aborted) return
      failure.value = error instanceof Error ? error.message : String(error)
    })

  teardown = () => {
    cancelAnimationFrame(rafId)
    controller.abort()
    worker?.terminate()
    observer.disconnect()
    window.removeEventListener('pointermove', onPointerMove)
    document.removeEventListener('pointerleave', onPointerLeave)
    motionQuery.removeEventListener('change', onMotionChange)
    document.removeEventListener('visibilitychange', onVisibility)
    renderer.dispose()
  }
})

onBeforeUnmount(() => {
  teardown?.()
  teardown = null
})
</script>

<template>
  <!-- `transform: translateZ(0)` promotes the canvas to its own compositor layer;
       without it a neighbouring fixed element repainting invalidates the WebGL
       composite on WebKit and the whole scene flickers. -->
  <canvas ref="canvasRef" class="nm-canvas" aria-hidden="true" />
  <div aria-hidden="true" class="nm-grain" />
  <p v-if="failure" role="alert" class="nm-fail">
    The scene could not start on this device.
  </p>
</template>

<style scoped>
.nm-canvas {
  position: absolute;
  inset: 0;
  z-index: 0;
  display: block;
  width: 100%;
  height: 100%;
  transform: translateZ(0);
  backface-visibility: hidden;
  color: var(--noema-ink, #fff);
}

/* Film grain — a static fractal-noise tile laid over the canvas. */
.nm-grain {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='140'%20height='140'%3E%3Cfilter%20id='n'%3E%3CfeTurbulence%20type='fractalNoise'%20baseFrequency='0.9'%20numOctaves='2'%20stitchTiles='stitch'/%3E%3C/filter%3E%3Crect%20width='100%25'%20height='100%25'%20filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 140px 140px;
  mix-blend-mode: overlay;
  opacity: 0.55;
}

.nm-fail {
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  margin: 0;
  padding: 16px;
  text-align: center;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
}
</style>
