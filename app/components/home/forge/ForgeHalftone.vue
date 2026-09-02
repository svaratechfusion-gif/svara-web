<script setup lang="ts">
// HERO HALFTONE BLOCK — Caldera's most recognisable motif.
//
// "A large rounded rectangle filled with a Plasma Violet to Ember gradient overlaid
// with an orange halftone dot pattern, 40px radius, fading to solid orange at the top
// right." Built from a radial-gradient dot grid over the gradient — no image asset, so
// it scales cleanly and costs nothing to load.
//
// Purely brand artwork: inert and hidden from assistive tech.
defineProps<{ tone?: 'hero' | 'plasma' }>()
</script>

<template>
  <div class="fg-halftone" :class="`fg-halftone--${tone ?? 'hero'}`" aria-hidden="true">
    <span class="fg-halftone__grad" />
    <span class="fg-halftone__dots" />
  </div>
</template>
