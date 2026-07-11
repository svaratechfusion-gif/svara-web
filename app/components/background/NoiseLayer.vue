<script setup lang="ts">
// Static film grain via inline SVG turbulence (data URI — no asset, no
// animation). Kills banding in the gradient; barely perceptible.
</script>

<template>
  <div class="noise-layer" aria-hidden="true" />
</template>

<style scoped>
.noise-layer {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 160px 160px;
  opacity: 0.025;
  pointer-events: none;
}
</style>
