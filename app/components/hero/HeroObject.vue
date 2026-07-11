<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import type { IntelligenceChassis } from '~/lib/engine/IntelligenceChassis'

const mount = ref<HTMLElement>()
let chassis: IntelligenceChassis | null = null

onMounted(async () => {
  if (!mount.value) return
  const hasWebGL2 = !!document.createElement('canvas').getContext('webgl2')
  if (!hasWebGL2) return // graceful: empty container, layout unaffected

  const { IntelligenceChassis } = await import('~/lib/engine/IntelligenceChassis')
  chassis = new IntelligenceChassis(mount.value)
})

onBeforeUnmount(() => {
  chassis?.dispose()
  chassis = null
})
</script>

<template>
  <div ref="mount" class="hero-object" aria-hidden="true" />
</template>

<style scoped>
.hero-object {
  width: 100%;
  max-width: 720px;
  aspect-ratio: 1 / 1;
  position: relative;
}

.hero-object :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
