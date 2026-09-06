<script setup lang="ts">
// EVOLVE CANVAS LAYER — the SVARA Intelligence Canvas. A single fixed, full-
// viewport WebGL host that lives BEHIND the entire homepage narrative and never
// unmounts as the user scrolls. It owns the ONE particle-head scene (client-only
// dynamic import) and exposes setProgress() so the master scroll timeline can
// drive camera/particle evolution. The scene, shaders, particle system and model
// are untouched — this component only relocates the canvas and pipes scroll in.
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import type { EvolveHandle, HeroBand } from '~/utils/evolve/scene'

const props = defineProps<{ lifted: boolean }>()
const emit = defineEmits<{ ready: [], vertfail: [] }>()

const canvasEl = ref<HTMLCanvasElement | null>(null)
const ready = ref(false)
const failed = ref(false)
let handle: EvolveHandle | null = null

/**
 * THE BAND THE HERO LEAVES FOR THE HEAD, in CSS px down from the hero's top
 * edge: from the foot of the headline to the top of the standfirst.
 *
 * On a phone the hero pushes its type to the two ends of the frame (see the
 * ≤767px block in styles/home-director.css) and the head is meant to own what
 * is left. Measuring it here rather than hardcoding it in the scene means the
 * framing follows the type — through a copy change, a font, a breakpoint, or a
 * viewport the design never anticipated.
 *
 * Both edges are read relative to the hero section, so the answer does not
 * depend on where the page happens to be scrolled. Null whenever the hero is
 * not on the page, which hands the scene back its own fallback.
 */
function heroBand(): HeroBand | null {
  const hero = document.querySelector('.dxh')
  const headline = document.querySelector('.dxh__blk--b')
  const standfirst = document.querySelector('.dxh__desc')
  if (!hero || !headline || !standfirst) return null
  const top = hero.getBoundingClientRect().top
  return {
    top: headline.getBoundingClientRect().bottom - top,
    bottom: standfirst.getBoundingClientRect().top - top,
  }
}

onMounted(async () => {
  if (!canvasEl.value) return
  try {
    const { createEvolveScene } = await import('~/utils/evolve/scene')
    handle = await createEvolveScene(canvasEl.value, {
      onFirstFrame: () => { ready.value = true; emit('ready') },
      onError: (reason: string) => { if (reason === 'vertices') { failed.value = true; emit('vertfail') } },
      heroBand,
    })
    if (props.lifted) handle?.start()
  } catch { /* webgl unavailable — loader failsafe opens the page */ }
})

watch(() => props.lifted, (v) => { if (v) handle?.start() })
onBeforeUnmount(() => handle?.dispose())

// Imperative API for the master scroll timeline — no reactive churn per frame.
defineExpose({ setProgress: (p: number) => handle?.setProgress(p) })
</script>

<template>
  <div class="xpc" :class="{ 'is-in': ready }" aria-hidden="true">
    <canvas ref="canvasEl" class="xpc__canvas" />
    <div v-if="failed" class="xpc__notice" role="status">
      <span class="xpc__notice-dot" />Unable to load the intelligence model. The system is online — visuals will resume shortly.
    </div>
  </div>
</template>

<style scoped>
/* Fixed, full-viewport, behind everything. The scene sizes to this element
   (canvas.parentElement), so the head framing matches the former 100dvh hero. */
.xpc { position: fixed; inset: 0; z-index: 0; opacity: 0; transition: opacity 900ms var(--ease) 200ms; pointer-events: none; }
.xpc.is-in { opacity: 1; }
.xpc__canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.xpc__notice { position: absolute; left: 50%; top: 42%; transform: translate(-50%, -50%); display: inline-flex; align-items: center; gap: 0.75rem; max-width: 24rem; text-align: left; font-family: var(--font-mono); font-size: 0.75rem; line-height: 1.4; color: var(--foreground-muted); text-transform: uppercase; letter-spacing: 0.04em; }
.xpc__notice-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--scene-rim); flex-shrink: 0; }
@media (prefers-reduced-motion: reduce) { .xpc { transition: none; } }
</style>
