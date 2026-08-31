<script setup lang="ts">
// SVARA INTELLIGENCE CORE — the hero's 3D object.
//
// A volumetric particle object standing for SVARA intelligence itself, shown once
// at the top of the Products experience before the individual product systems
// arrive. It is NOT another dashboard and carries no data.
//
// This component is the thin Vue leaf: it owns lifecycle, the scroll/pointer
// wiring and teardown. The WebGL lives in `core/core-scene.ts`.
//
// Three things it deliberately does not do:
//   · No `requestAnimationFrame` of its own. Rendering rides `gsap.ticker`, the
//     single tick source this repo already uses for Lenis and scene progress.
//   · No second renderer. The Products page has no other WebGL context; this is
//     the only one, and it is released on unmount.
//   · No work at all once the hero has left the screen — past that point the
//     ticker callback returns before touching the GPU.
//
// The markup is static, so it server-renders and hydrates cleanly; WebGL is built
// in `onMounted`, which never runs on the server.
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useSceneProgress, ramp, smooth, smoother } from '~/composables/useSceneProgress'
import type { CoreScene } from './core/core-scene'

const props = defineProps<{
  /** The hero's window in page progress — the object lives and dies inside it. */
  window: [number, number]
}>()

const host = ref<HTMLElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)

let scene: CoreScene | null = null
let removeTick: (() => void) | null = null
let observer: ResizeObserver | null = null
let reduced = false

/** Scroll-driven presence, written by the progress subscription. */
let scrollPresence = 1
let scrollT = 0
/** Entrance envelope, 0 → 1 over the first moments after mount. */
let entered = 0
let startTime = -1
/** Whether the last frame drawn was a blank one, so we can stop cleanly. */
let cleared = false

const heroEnd = props.window[1]

useSceneProgress((p) => {
  // Holds full through the opening, then leaves before the intro copy does — the
  // object should be on its way out as the first system title arrives, not
  // competing with it.
  scrollPresence = 1 - smooth(ramp(p, heroEnd * 0.45, heroEnd * 0.95))
  scrollT = smoother(ramp(p, 0, heroEnd))
})

function onPointerMove(event: PointerEvent): void {
  if (!scene) return
  scene.setPointer(
    (event.clientX / window.innerWidth) * 2 - 1,
    (event.clientY / window.innerHeight) * 2 - 1,
  )
}

onMounted(async () => {
  const canvasEl = canvas.value
  const hostEl = host.value
  if (!canvasEl || !hostEl) return

  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  let createCoreScene: typeof import('./core/core-scene').createCoreScene
  try {
    // three is a heavy dependency and only this one route needs it — load it
    // after hydration rather than in the page bundle.
    ;({ createCoreScene } = await import('./core/core-scene'))
    scene = createCoreScene({ canvas: canvasEl, host: hostEl, reducedMotion: reduced })
  } catch {
    // No WebGL (or a context the driver refused): the hero is complete without
    // the object, so fail silently rather than breaking the page.
    return
  }

  observer = new ResizeObserver(() => scene?.resize())
  observer.observe(hostEl)

  if (!reduced && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('pointermove', onPointerMove, { passive: true })
  }

  const { gsap } = await import('~~/lib/gsap')
  const tick = (time: number): void => {
    if (!scene) return
    if (startTime < 0) startTime = time
    const elapsed = time - startTime

    // Entrance: the object materialises rather than switching on. Runs on its own
    // clock because the page opens at scroll 0, where there is no scroll to drive it.
    entered = smooth(Math.min(1, elapsed / 1.6))
    const presence = entered * scrollPresence

    if (presence < 0.004) {
      // Draw one blank frame so the canvas doesn't keep the last image, then go
      // quiet until the hero comes back.
      if (!cleared) {
        scene.render(elapsed, 0, scrollT)
        cleared = true
      }
      return
    }
    cleared = false
    scene.render(elapsed, presence, scrollT)
  }
  gsap.ticker.add(tick)
  removeTick = () => gsap.ticker.remove(tick)
})

onBeforeUnmount(() => {
  removeTick?.()
  removeTick = null
  observer?.disconnect()
  observer = null
  window.removeEventListener('pointermove', onPointerMove)
  scene?.dispose()
  scene = null
})
</script>

<template>
  <div ref="host" class="sic" aria-hidden="true">
    <canvas ref="canvas" class="sic__canvas" />
  </div>
</template>

<style scoped>
.sic {
  position: absolute;
  inset: 0;
  /* The shell's layer stack: atmosphere (grain z-5) < THIS (4) < dashboard
     stages (6) < editorial overlays (10) < header (30). The headline always
     wins — the object is the second thing in the hierarchy, never the first. */
  z-index: 4;
  pointer-events: none;
  overflow: hidden;
}

.sic__canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
