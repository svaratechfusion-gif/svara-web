<script setup lang="ts">
// Client-only bridge for the Framer Motion product walkthrough navigator.
/* eslint-disable @typescript-eslint/no-explicit-any */
import { onBeforeUnmount, onMounted, ref } from 'vue'

type NavigatorItem = {
  id: string
  index: number
  label: string
}

const props = defineProps<{ items: NavigatorItem[] }>()

const mount = ref<HTMLElement>()
let root: any = null

onMounted(async () => {
  if (!mount.value) return
  const React = await import('react')
  const { createRoot } = await import('react-dom/client')
  const Navigator = await import('~~/lib/consoles/ProductNavigator')
  root = createRoot(mount.value)
  root.render(React.createElement(Navigator.default, { items: props.items }))
})

onBeforeUnmount(() => {
  root?.unmount()
  root = null
})
</script>

<template>
  <div ref="mount" class="product-navigator-mount" />
</template>
