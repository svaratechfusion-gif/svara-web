<script setup lang="ts">
/**
 * THE TRAVELLING CHROME FIGURE — one humanoid that descends through a page as
 * you scroll it.
 *
 * The same model and the same choreography as the products page's pinned stage
 * (see products/stride/StrideChainProduct.vue), lifted into something a page can
 * drop in with one line. It renders on a FIXED, transparent, pointer-events:none
 * canvas, so it never takes part in layout and never intercepts a click.
 *
 * THE TRAVEL SPANS TWO ANCHORS. Where the component sits in the DOM is the
 * start — put it straight after the hero — and `until` names the element that
 * ends it, normally the page's CTA. Scroll position between those two maps to
 * the model's fall: 0 = above the top edge, 0.5 = centred, 1 = below. Outside
 * that span the canvas is faded out and the render loop is idle, so a page only
 * pays for the figure while the figure is actually on it.
 *
 * IT SITS BEHIND THE COPY. `z-index` defaults to 0, which on these pages puts it
 * over a fixed background (which sits at −1) and under the sections, whose own
 * stacking wins. A page whose body paints an opaque ground needs a different
 * number, so it is a prop rather than a constant.
 */
import { ref, watch, onBeforeUnmount, shallowRef } from 'vue'
import { useTicker } from '~/composables/useTicker'
import type { ChromeModelHandle } from '~~/lib/stride/chrome-model'

const props = withDefaults(defineProps<{
  /** Selector for the element that ENDS the travel — usually the CTA. */
  until: string
  /** SVARA's own humanoid by default. */
  model?: string
  /** Stacking position against the host page's own layers. */
  z?: number
  /** Peak opacity, for grounds the chrome would otherwise shout over. */
  opacity?: number
}>(), {
  model: '/ecosystem/hero-model.glb',
  z: 0,
  opacity: 1,
})

const anchorRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const handle = shallowRef<ChromeModelHandle | null>(null)
/** 0 = above the frame, 0.5 = centred, 1 = below. Read by the model each frame. */
let fall = 0.5
/** 0..1 fade, so the figure arrives and leaves rather than popping. */
const visible = ref(0)
let unavailable = false

async function boot(): Promise<void> {
  if (unavailable || handle.value || !canvasRef.value) return
  const { createChromeModel } = await import('~~/lib/stride/chrome-model')
  try {
    handle.value = createChromeModel(canvasRef.value, {
      url: props.model,
      progress: () => fall,
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      scrollSpin: true,
      spinAccel: 0.00004,
      maxSpin: 0.045,
    })
  }
  catch (err) {
    // No WebGL, or the GLB failed. The page is unchanged without it — but a
    // swallowed failure here is invisible in production, so it is reported.
    unavailable = true
    console.warn('[figure] chrome model unavailable:', err)
  }
}

// The canvas lives inside <ClientOnly>, so it does not exist yet when onMounted
// runs — booting there silently found a null ref and gave up. Watch for it.
watch(canvasRef, (el) => {
  if (!el || handle.value) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  void boot()
}, { immediate: true })

onBeforeUnmount(() => {
  handle.value?.dispose()
  handle.value = null
})

useTicker(() => {
  const anchor = anchorRef.value
  if (!anchor || document.hidden) return
  const end = document.querySelector(props.until)
  if (!end) return

  const vh = window.innerHeight || 1
  // Distance from the anchor (start) to the CTA (end), in page space.
  const startY = anchor.getBoundingClientRect().top
  const endY = end.getBoundingClientRect().top
  const span = Math.max(1, endY - startY)
  // 0 when the anchor is at the fold, 1 when the CTA reaches it.
  const t = Math.min(1, Math.max(0, (vh * 0.5 - startY) / span))

  fall += (t - fall) * 0.12
  // Fade in as the anchor arrives, out as the CTA lands.
  const near = startY < vh && endY > 0
  visible.value += ((near ? props.opacity : 0) - visible.value) * 0.08
})
</script>

<template>
  <!-- Zero-height marker, in flow: this is WHERE the travel begins. -->
  <div ref="anchorRef" class="tfig-anchor" aria-hidden="true" />

  <!-- The stage is a separate FIXED, full-viewport box. It has to carry real
       dimensions: createChromeModel sizes its renderer from the canvas's parent
       and gates its loop on an IntersectionObserver watching that same parent,
       so a zero-height wrapper renders a zero-pixel scene that never starts. -->
  <ClientOnly>
    <div class="tfig" :style="{ zIndex: z, opacity: visible }" aria-hidden="true">
      <canvas ref="canvasRef" class="tfig__canvas" />
    </div>
  </ClientOnly>
</template>

<style scoped>
.tfig-anchor { position: relative; height: 0; }
.tfig {
  position: fixed; inset: 0;
  pointer-events: none;
}
.tfig__canvas { display: block; width: 100%; height: 100%; }
</style>
