<script setup lang="ts">
// DIVISIONS ATMOSPHERE LAYER — mounts the subtle WebGL depth field between the
// hero video and the DOM content, and feeds it the shared scroll progress.
//
// It reuses the site's existing infrastructure, not new systems:
//   · the single tick source — the engine renders on `gsap.ticker` (no private rAF);
//   · the shared frame-memoised scroll read — `useSceneProgress` pipes 0→1 into
//     the engine's `setProgress` (the same reader the products scene uses);
//   · the global Lenis smooth-scroll (already site-wide) drives that scroll value.
// WebGL is built in onMounted only, so this server-renders as an empty canvas host
// and hydrates cleanly; three is loaded after hydration for this route alone.
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useSceneProgress } from '~/composables/useSceneProgress'
import type { AtmosphereHandle } from '~/utils/divisions/atmosphere'

const canvasEl = ref<HTMLCanvasElement | null>(null)
const ready = ref(false)
let handle: AtmosphereHandle | null = null

// Scroll progress → the field's dolly. Null-safe: after unmount this is a no-op.
useSceneProgress((p) => handle?.setProgress(p))

onMounted(async () => {
  if (!canvasEl.value) return
  try {
    const { createDivAtmosphere } = await import('~/utils/divisions/atmosphere')
    handle = await createDivAtmosphere(canvasEl.value, { onFirstFrame: () => { ready.value = true } })
  } catch {
    // No WebGL / context refused — the hero is complete without the depth layer.
  }
})

onBeforeUnmount(() => {
  handle?.dispose()
  handle = null
})
</script>

<template>
  <div class="dvatmo" :class="{ 'is-in': ready }" aria-hidden="true">
    <canvas ref="canvasEl" class="dvatmo__canvas" />
  </div>
</template>

<style scoped>
/* Fixed depth layer at the site's background level (z-index:-1, like the video and
   BackgroundCanvas) — BEHIND all DOM content AND the footer, so no in-flow content
   is ever covered. Placed after the video in the DOM so it composites above it at
   the same level. Fades in once the first frame is drawn so there is never a pop. */
.dvatmo {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0;
  transition: opacity 1200ms ease 200ms;
}
.dvatmo.is-in { opacity: 1; }
.dvatmo__canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
</style>
