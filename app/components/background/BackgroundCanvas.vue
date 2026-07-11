<script setup lang="ts">
// Composes the three static layers into one fixed background. Sits behind
// all content (z-index 0 in normal stacking, content renders above).
// Static only — no animation, no particles.
import GradientLayer from './GradientLayer.vue'
import BlueprintLayer from './BlueprintLayer.vue'
import NoiseLayer from './NoiseLayer.vue'
</script>

<template>
  <div class="background-canvas" aria-hidden="true">
    <GradientLayer />
    <BlueprintLayer />
    <NoiseLayer />
  </div>
</template>

<style scoped>
.background-canvas {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}
</style>
