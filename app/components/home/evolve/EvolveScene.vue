<script setup lang="ts">
// EVOLVE · WebGL host. Mounts a transparent canvas and drives the framework-agnostic
// particle-head scene (client-only dynamic import). Reports the first rendered frame
// up (loader milestone). On vertices failure, shows a visible notice — never a
// silent empty hero. Entrance: wrapper fades in; the cloud scales 1.06 → 1.
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps<{ active: boolean, lifted: boolean }>()
const emit = defineEmits<{ ready: [], vertfail: [] }>()

const canvasEl = ref<HTMLCanvasElement | null>(null)
const failed = ref(false)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let handle: any = null

onMounted(async () => {
  if (!canvasEl.value) return
  try {
    const { createEvolveScene } = await import('~/utils/evolve/scene')
    handle = await createEvolveScene(canvasEl.value, {
      onFirstFrame: () => emit('ready'),
      onError: (reason: string) => { if (reason === 'vertices') { failed.value = true; emit('vertfail') } },
    })
    if (props.lifted) handle?.start()
  } catch { /* webgl unavailable — loader failsafe opens the page */ }
})

watch(() => props.lifted, (v) => { if (v) handle?.start() })

onBeforeUnmount(() => handle?.dispose())
</script>

<template>
  <div class="es" :class="{ 'is-in': active }">
    <div class="es__inner">
      <canvas ref="canvasEl" class="es__canvas" />
    </div>
    <div v-if="failed" class="es__notice" role="status">
      <span class="es__notice-dot" />Unable to load the intelligence model. The system is online — visuals will resume shortly.
    </div>
  </div>
</template>

<style scoped>
.es { position: absolute; inset: 0; z-index: 1; opacity: 0; transition: opacity 700ms var(--ease) 400ms; }
.es.is-in { opacity: 1; }
.es__inner { position: absolute; inset: 0; transform: scale(1.06); transition: transform 2500ms var(--ease) 400ms; will-change: transform; }
.es.is-in .es__inner { transform: scale(1); }
.es__canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.es__notice { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); z-index: 2; display: inline-flex; align-items: center; gap: 0.75rem; max-width: 24rem; text-align: left; font-family: var(--font-mono); font-size: 0.75rem; line-height: 1.4; color: var(--foreground-muted); text-transform: uppercase; letter-spacing: 0.04em; }
.es__notice-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--scene-rim); flex-shrink: 0; }
@media (prefers-reduced-motion: reduce) { .es, .es__inner { transition: none; } }
</style>
