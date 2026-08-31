<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

type EcosystemItem = {
  i: number
  id: string
  name: string
  category: string
  description: string
  asset: string
  x: number
  y: number
  size?: number
  float?: number
  delay?: number
  tilt?: number
}

const props = defineProps<{ items: EcosystemItem[], selectedId: number | null }>()
const emit = defineEmits<{ hover: [id: number | null], select: [id: number | null] }>()

const mount = ref<HTMLElement>()
let root: any = null

async function renderModules() {
  if (!mount.value) return

  const React = await import('react')
  const { createRoot } = await import('react-dom/client')
  const Modules = await import('~~/lib/consoles/EcosystemModules')

  if (!root) root = createRoot(mount.value)
  root.render(React.createElement(Modules.default, {
    items: props.items,
    selectedId: props.selectedId,
    onHover: (id: number | null) => emit('hover', id),
    onSelect: (id: number | null) => emit('select', id),
  }))
}

onMounted(() => {
  void renderModules()
})

watch(() => props.selectedId, () => {
  if (root) void renderModules()
})

onBeforeUnmount(() => {
  root?.unmount()
  root = null
})
</script>

<template>
  <div ref="mount" class="ecosystem-modules-mount" />
</template>

<style scoped>
.ecosystem-modules-mount {
  position: absolute;
  inset: 0;
  z-index: 4;
}
</style>
