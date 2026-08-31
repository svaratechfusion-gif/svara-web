<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps<{ activeId: string | null }>()
const emit = defineEmits<{ select: [id: string | null] }>()

const mount = ref<HTMLElement>()
let root: any = null

async function renderOrbit() {
  if (!mount.value) return

  const React = await import('react')
  const { createRoot } = await import('react-dom/client')
  const Orbit = await import('~~/lib/consoles/ProblemOrbit')

  if (!root) root = createRoot(mount.value)
  root.render(React.createElement(Orbit.default, {
    activeId: props.activeId,
    onSelect: (id: string | null) => emit('select', id),
  }))
}

onMounted(() => {
  void renderOrbit()
})

watch(() => props.activeId, () => {
  if (root) void renderOrbit()
})

onBeforeUnmount(() => {
  root?.unmount()
  root = null
})
</script>

<template>
  <div ref="mount" class="problem-orbit-mount" />
</template>

<style scoped>
.problem-orbit-mount {
  width: 100%;
  min-height: 540px;
}

@media (max-width: 1150px) {
  .problem-orbit-mount { min-height: 490px; }
}

@media (max-width: 720px) {
  .problem-orbit-mount { min-height: 0; }
}
</style>
