<script setup lang="ts">
/**
 * THE FIGURE BAND — a full-width interlude that carries the travelling chrome
 * humanoid between a page's hero and its CTA.
 *
 * WHY A BAND AND NOT A FIXED LAYER. The obvious approach — one fixed canvas
 * spanning the page body — cannot work on these pages: they paint an opaque
 * ground (e.g. `.technology-page .ray`), so a fixed layer is either behind that
 * ground and invisible, or above it and crossing the reading copy. There is no
 * z-index in between. The products stage reads because it OWNS its backdrop, and
 * this band is that same arrangement made portable: the band brings its own
 * gradient ground, and the figure travels over it while the band is on screen.
 *
 * Nothing outside the band changes: it is one section in normal flow, and every
 * page keeps its own layering.
 *
 * The band carries no copy on purpose. It is a visual rest between two sections
 * that already speak, and inventing a headline for it would be inventing content.
 */
import { ref, watch, onBeforeUnmount, shallowRef } from 'vue'
import { useTicker } from '~/composables/useTicker'
import type { GradientBackgroundHandle } from '~~/lib/stride/gradient-background'
import type { ChromeModelHandle } from '~~/lib/stride/chrome-model'

const props = withDefaults(defineProps<{
  /** Gradient ground. Defaults to the products stage's blue, so the figure reads. */
  base?: string
  light?: string
  seed?: number
  /** Band height, as a viewport fraction. */
  height?: string
  model?: string
}>(), {
  base: '#1c3ee6',
  light: '#eef3ff',
  seed: 3.7,
  height: '78svh',
  model: '/ecosystem/hero-model.glb',
})

const bandRef = ref<HTMLElement | null>(null)
const bgRef = ref<HTMLCanvasElement | null>(null)
const modelRef = ref<HTMLCanvasElement | null>(null)
const bgHandle = shallowRef<GradientBackgroundHandle | null>(null)
const modelHandle = shallowRef<ChromeModelHandle | null>(null)
/** 0 = above the frame, 0.5 = centred, 1 = below. Read by the model each frame. */
let fall = 0.5

// The canvases are inside <ClientOnly>, so they do not exist at onMounted —
// watching is what catches them. (Booting in the hook found a null ref.)
/** Phones do not get the band's two WebGL contexts. It is decoration, and on a
 *  throttled device the contexts measurably cost frame time during scroll —
 *  which is the one thing a scrolling page cannot spend. The CSS ground on
 *  .fband stands in, so the band still reads as a deliberate colour break. */
const HEAVY_ENOUGH = 900

watch(modelRef, async (el) => {
  if (!el || modelHandle.value) return
  if (window.innerWidth < HEAVY_ENOUGH || !window.matchMedia('(pointer: fine)').matches) return
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (bgRef.value) {
    try {
      const { createGradientBackground } = await import('~~/lib/stride/gradient-background')
      bgHandle.value = createGradientBackground(bgRef.value, {
        base: props.base, light: props.light, seed: props.seed,
      })
    }
    catch (err) {
      // The band still reads as a flat ground without it, but a silent failure
      // here is undiagnosable in production.
      console.warn('[band] gradient backdrop unavailable:', err)
    }
  }

  try {
    const { createChromeModel } = await import('~~/lib/stride/chrome-model')
    modelHandle.value = createChromeModel(el, {
      url: props.model,
      progress: () => fall,
      reducedMotion,
      scrollSpin: true,
      spinAccel: 0.00004,
      maxSpin: 0.045,
    })
  }
  catch (err) {
    console.warn('[band] chrome model unavailable:', err)
  }
}, { immediate: true })

onBeforeUnmount(() => {
  modelHandle.value?.dispose()
  modelHandle.value = null
  bgHandle.value?.dispose()
  bgHandle.value = null
})

// The figure falls through the band as the band crosses the viewport: it is
// above the frame as the band arrives and below it as the band leaves.
useTicker(() => {
  const band = bandRef.value
  if (!band || document.hidden) return
  const vh = window.innerHeight || 1
  const r = band.getBoundingClientRect()
  if (r.bottom < -200 || r.top > vh + 200) return
  const travel = Math.max(1, r.height + vh)
  const target = Math.min(1, Math.max(0, (vh - r.top) / travel))
  fall += (target - fall) * 0.12
})
</script>

<template>
  <section ref="bandRef" class="fband" :style="{ '--fband-h': height }" aria-hidden="true">
    <ClientOnly>
      <canvas ref="bgRef" class="fband__canvas" />
      <canvas ref="modelRef" class="fband__canvas fband__canvas--model" />
    </ClientOnly>
  </section>
</template>

<style scoped>
.fband {
  position: relative;
  width: 100%;
  height: var(--fband-h);
  overflow: hidden;
  /* The gradient paints over this; it is the colour before the canvas arrives
     and the fallback where WebGL is unavailable. */
  background: #0c1b4d;
}
.fband__canvas { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
/* The model rides above the gradient on a transparent canvas. */
.fband__canvas--model { z-index: 1; pointer-events: none; }
</style>
