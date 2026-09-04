<script setup lang="ts">
// Engine verification harness — NOT the homepage, NOT a hero.
// Public API only: initialize/destroy (+ morph state buttons for testing).
import { onMounted, onBeforeUnmount, ref } from 'vue'
import type { HeliosEngine } from '~~/lib/helios'

definePageMeta({ layout: false })
// Internal prototype: reachable by direct URL, never indexed. Mirrors the
// `/lab/**` routeRule (X-Robots-Tag + sitemap exclude) in nuxt.config.
useSeoMeta({ robots: 'noindex, nofollow' })

const mount = ref<HTMLElement>()
let engine: HeliosEngine | null = null
const ready = ref(false)

onMounted(async () => {
  if (!mount.value) return
  if (!document.createElement('canvas').getContext('webgl2')) return
  const { HeliosEngine } = await import('~~/lib/helios')
  engine = new HeliosEngine(mount.value, { debug: true })
  engine.initialize()
  ready.value = true
  // lab-only: expose for external benchmarking
  ;(window as unknown as Record<string, unknown>).__heliosEngine = engine
})

onBeforeUnmount(() => {
  engine?.destroy()
  engine = null
})

const states = ['dormant', 'assemble', 'dissolve', 'flow', 'reassemble'] as const
function trigger(s: typeof states[number]) {
  engine?.[s]()
}
</script>

<template>
  <div ref="mount" class="helios-lab">
    <div v-if="ready" class="helios-lab__states">
      <button v-for="s in states" :key="s" @click="trigger(s)">{{ s }}</button>
    </div>
  </div>
</template>

<style scoped>
.helios-lab {
  position: fixed;
  inset: 0;
  background: var(--color-bg, #ffffff);
}
.helios-lab :deep(canvas) { display: block; width: 100%; height: 100%; }
.helios-lab__states {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 60;
  display: flex;
  gap: 6px;
}
.helios-lab__states button {
  font: 11px ui-monospace, Menlo, monospace;
  padding: 6px 10px;
  border: 1px solid rgba(0,0,0,.12);
  border-radius: 999px;
  background: rgba(255,255,255,.85);
  color: #102A5B;
  cursor: pointer;
}
.helios-lab__states button:hover { border-color: #2F7FE6; }
</style>
