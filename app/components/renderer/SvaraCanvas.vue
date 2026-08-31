<script setup lang="ts">
// SvaraCanvas — Vue bridge that mounts the React Three Fiber Intelligence
// Core scene behind the hero HTML. Manages the shared state objects that
// the R3F scene reads each frame: scroll progress (from GSAP ScrollTrigger)
// and mouse position (from pointer events).
//
// The React tree is mounted via createRoot into a container div and the
// R3F <Canvas> renders its WebGL content inside that container, positioned
// as a fixed full-viewport overlay behind all HTML content.
//
// The canvas fades in via CSS animation once the lazy imports resolve.
import { onMounted, onBeforeUnmount, ref } from 'vue'
import type { Root } from 'react-dom/client'
import { gsap } from '~~/lib/gsap'

const props = withDefaults(
  defineProps<{
    /** CSS z-index within the host section's stacking context. The host
     *  (e.g. the hero) should `isolation: isolate` and place its content
     *  above this. Default 0 (host background layer). */
    zIndex?: number
  }>(),
  { zIndex: 0 },
)

const mountEl = ref<HTMLElement>()
const rootRef = ref<Root | null>(null)
// Guards for the async mount: `cancelled` aborts the import chain if the
// component unmounts mid-flight; `initTimer` is cleared so a pending setup
// never runs (and re-leaks a ScrollTrigger + listener) after unmount.
let cancelled = false
let initTimer: ReturnType<typeof setTimeout> | null = null

// ================================================================
// SHARED STATE BRIDGE
// React expects MutableRefObject-like { current: SvaraCoreState } objects.
// We create stable wrapper objects whose .current field is mutated in
// place by the Vue side and read by the React useFrame loop. No reactive
// Vue proxy needed — React reads .current directly each frame.
// ================================================================

const scrollBridge = { current: { scrollProgress: 0, mouseX: 0, mouseY: 0 } }
const mouseBridge = { current: { scrollProgress: 0, mouseX: 0, mouseY: 0 } }

// ================================================================
// SCROLL PROGRESS — GSAP ScrollTrigger on the hero section
// ================================================================

let scrollTween: gsap.core.Tween | null = null

function setupScrollTracking() {
  const hero = document.querySelector('.hero')
  if (!hero) return

  scrollTween = gsap.to(scrollBridge.current, {
    scrollProgress: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.4,
    },
  } as gsap.TweenVars)
}

// ================================================================
// MOUSE TRACKING — normalized −1…1 coordinates
// ================================================================

function onPointerMove(e: PointerEvent) {
  mouseBridge.current.mouseX = (e.clientX / window.innerWidth) * 2 - 1
  mouseBridge.current.mouseY = -((e.clientY / window.innerHeight) * 2 - 1)
}

// ================================================================
// MOUNT / UNMOUNT
// ================================================================

onMounted(async () => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced || !mountEl.value) return

  // Dynamically import React + the R3F scene (lazy loading — keeps the
  // initial bundle lean; React and Three.js only load when the hero mounts).
  // Re-check `cancelled`/`mountEl` after every await: a fast unmount mid-import
  // must not createRoot on a nulled element (orphaned root, never unmounted).
  const { createRoot } = await import('react-dom/client')
  if (cancelled || !mountEl.value) return
  const { SvaraCoreCanvas } = await import('~~/lib/renderer')
  if (cancelled || !mountEl.value) return
  const React = (await import('react')).default
  if (cancelled || !mountEl.value) return

  const root = createRoot(mountEl.value)
  rootRef.value = root

  // IMPORTANT: Use React.createElement explicitly here, NOT JSX.
  // This file is a .vue <script setup> block compiled by Vue's JSX
  // transform, which produces Vue VNodes — not React elements. Using
  // React.createElement bypasses Vue's transform entirely.
  root.render(
    React.createElement(SvaraCoreCanvas, {
      scrollState: scrollBridge,
      mouseState: mouseBridge,
    }),
  )

  // Start tracking after a brief delay to let the scene initialize. Store the
  // id so unmount can cancel it (otherwise it re-adds a ScrollTrigger +
  // listener after unmount, both of which then leak for the page lifetime).
  initTimer = setTimeout(() => {
    initTimer = null
    setupScrollTracking()
    window.addEventListener('pointermove', onPointerMove, { passive: true })
  }, 300)
})

onBeforeUnmount(() => {
  cancelled = true
  if (initTimer) { clearTimeout(initTimer); initTimer = null }
  scrollBridge.current.scrollProgress = 0
  mouseBridge.current.mouseX = 0
  mouseBridge.current.mouseY = 0
  scrollTween?.scrollTrigger?.kill()
  scrollTween?.kill()
  scrollTween = null
  window.removeEventListener('pointermove', onPointerMove)

  if (rootRef.value) {
    rootRef.value.unmount()
    rootRef.value = null
  }
})
</script>

<template>
  <div
    ref="mountEl"
    class="svara-canvas"
    :style="{ zIndex: zIndex }"
    aria-hidden="true"
  />
</template>

<style scoped>
.svara-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  /* This div IS the dark stage: a deep-navy radial gradient. The transparent
     WebGL canvas renders the Intelligence Core over it. Being an opaque layer,
     it covers the global light BackgroundCanvas within the hero region. */
  background: radial-gradient(circle at 50% 42%, #0e1c3f 0%, #081228 50%, #050c1c 100%);
}
.svara-canvas :deep(canvas) {
  display: block;
  width: 100% !important;
  height: 100% !important;
  /* Prevent canvas from intercepting pointer events */
  pointer-events: none !important;
}

/* Fade-in entrance for the WebGL canvas — appears once the lazy imports
   resolve and the scene initializes (typically 200–400ms after mount) */
.svara-canvas {
  opacity: 0;
  animation: canvas-fade-in 0.8s ease-out 0.3s forwards;
}

@keyframes canvas-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .svara-canvas {
    opacity: 1;
    animation: none;
  }
}
</style>
