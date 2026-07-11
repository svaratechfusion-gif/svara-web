<script setup lang="ts">
// Engine verification harness — NOT the homepage, NOT a hero.
// Mounts the Helios Engine full-viewport with debug enabled so the
// entity, cursor field, breathing and metrics can be verified.
import { onMounted, onBeforeUnmount, ref } from 'vue'
import type { HeliosEngine } from '~~/lib/helios/HeliosEngine'

definePageMeta({ layout: false })

const mount = ref<HTMLElement>()
let engine: HeliosEngine | null = null

onMounted(async () => {
  if (!mount.value) return
  if (!document.createElement('canvas').getContext('webgl2')) return
  const { HeliosEngine } = await import('~~/lib/helios/HeliosEngine')
  engine = new HeliosEngine(mount.value, { debug: true })
  // lab-only: expose for external benchmarking
  ;(window as unknown as Record<string, unknown>).__heliosEngine = engine
})

onBeforeUnmount(() => {
  engine?.dispose()
  engine = null
})
</script>

<template>
  <div ref="mount" class="helios-lab" />
</template>

<style scoped>
.helios-lab {
  position: fixed;
  inset: 0;
  background: var(--color-bg, #ffffff);
}
.helios-lab :deep(canvas) { display: block; width: 100%; height: 100%; }
</style>
