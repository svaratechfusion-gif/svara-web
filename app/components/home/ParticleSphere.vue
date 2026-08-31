<script setup lang="ts">
// Vue mount bridge for the ORIGINAL React ParticleSphere (lib/vendor/
// ParticleSphere.tsx). The React component is used verbatim — this file
// only creates a React root inside a div on the client and renders it with
// the component defaults. React + the vendored .tsx are dynamically
// imported inside onMounted so they never load during SSR. The React glue
// is typed `any` on purpose: mixing React's and Vue's global JSX namespaces
// otherwise produces a spurious type clash in this .vue file.
/* eslint-disable @typescript-eslint/no-explicit-any */
import { onMounted, onBeforeUnmount, ref } from 'vue'

const mount = ref<HTMLElement>()
let root: any = null

onMounted(async () => {
  if (!mount.value) return
  const React: any = await import('react')
  const { createRoot } = await import('react-dom/client')
  const mod: any = await import('~~/lib/vendor/ParticleSphere')
  root = createRoot(mount.value)
  // no props → the component runs on its own COMPONENT_DEFAULTS
  root.render(React.createElement(mod.default))
})

onBeforeUnmount(() => {
  root?.unmount()
  root = null
})
</script>

<template>
  <div ref="mount" class="particle-sphere" aria-hidden="true" />
</template>

<style scoped>
.particle-sphere { position: relative; width: 100%; height: 100%; overflow: visible; }
</style>
