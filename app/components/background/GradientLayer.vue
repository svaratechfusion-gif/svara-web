<script setup lang="ts">
// Static daylight wash — one soft directional gradient from upper-left.
</script>

<template>
  <div class="gradient-layer" aria-hidden="true" />
</template>

<style scoped>
.gradient-layer {
  position: absolute;
  inset: 0;
  background: radial-gradient(120% 90% at 22% 0%, var(--color-bg) 0%, var(--color-bg) 50%, var(--color-surface) 100%);
  pointer-events: none;
}
</style>
