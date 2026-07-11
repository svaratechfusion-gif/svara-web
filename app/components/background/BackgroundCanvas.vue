<script setup lang="ts">
// Composes the background layers into one fixed canvas behind all content.
// Gradient/blueprint/noise are static; ParticlesLayer adds micro drifting
// dots (Experience Polish task 8) and the blueprint's slow scroll drift is
// driven externally by the master timeline (experience.client.ts).
import GradientLayer from './GradientLayer.vue'
import BlueprintLayer from './BlueprintLayer.vue'
import NoiseLayer from './NoiseLayer.vue'
import ParticlesLayer from './ParticlesLayer.vue'
</script>

<template>
  <div class="background-canvas" aria-hidden="true">
    <GradientLayer />
    <BlueprintLayer />
    <ClientOnly><ParticlesLayer /></ClientOnly>
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
