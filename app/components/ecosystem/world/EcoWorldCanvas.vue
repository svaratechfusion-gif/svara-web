<script setup lang="ts">
// The persistent SVARA ecosystem WebGL world — fixed, full-viewport, behind the
// entire /ecosystem narrative; never unmounts. Client-only dynamic import; the
// scene, nodes, connections, camera rig and bloom are all owned by world.ts.
// Exposes setProgress() so the master scroll timeline drives the camera journey.
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import type { WorldHandle } from '~/utils/ecosystem/world'

const props = defineProps<{ started: boolean }>()
const emit = defineEmits<{ ready: [] }>()

const canvasEl = ref<HTMLCanvasElement | null>(null)
const ready = ref(false)
let handle: WorldHandle | null = null

onMounted(async () => {
  if (!canvasEl.value) return
  try {
    const { createEcosystemWorld } = await import('~/utils/ecosystem/world')
    handle = createEcosystemWorld(canvasEl.value, { onReady: () => { ready.value = true; emit('ready') } })
    if (props.started) handle?.start()
  } catch { /* webgl unavailable — loader failsafe opens the page */ }
})

watch(() => props.started, (v) => { if (v) handle?.start() })
onBeforeUnmount(() => handle?.dispose())

defineExpose({ setProgress: (p: number) => handle?.setProgress(p) })
</script>

<template>
  <div class="ecw" :class="{ 'is-in': ready }" aria-hidden="true">
    <canvas ref="canvasEl" class="ecw__canvas" />
  </div>
</template>

<style scoped>
.ecw { position: fixed; inset: 0; z-index: 0; opacity: 0; transition: opacity 1000ms cubic-bezier(0.16, 1, 0.3, 1) 150ms; }
.ecw.is-in { opacity: 1; }
.ecw__canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
</style>
