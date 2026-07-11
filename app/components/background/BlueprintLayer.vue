<script setup lang="ts">
// Static blueprint lattice at token opacity (~4%), masked so it only
// resolves toward the center — structure, not decoration.
</script>

<template>
  <div class="blueprint-layer" aria-hidden="true" />
</template>

<style scoped>
.blueprint-layer {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--color-text) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-text) 1px, transparent 1px);
  background-size: 32px 32px;
  opacity: var(--opacity-faint);
  -webkit-mask-image: radial-gradient(130% 100% at 50% 40%, #000 55%, transparent 100%);
  mask-image: radial-gradient(130% 100% at 50% 40%, #000 55%, transparent 100%);
  pointer-events: none;
}
</style>
