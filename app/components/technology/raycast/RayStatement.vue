<script setup lang="ts">
// One strong typographic statement, which is the design's whole section model:
// an 11px tracked eyebrow, a large headline at REGULAR weight with slightly positive
// tracking, and a single line of muted body at ~640px. Nothing else in the band.
import { RAY_STATEMENT } from '~~/lib/technology/raycast'
</script>

<template>
  <section class="ray-statement">
    <div class="ray-wrap">
      <p class="ray-eyebrow">{{ RAY_STATEMENT.eyebrow }}</p>
      <h2 class="ray-display">{{ RAY_STATEMENT.headline }}</h2>
      <p class="ray-body ray-measure">{{ RAY_STATEMENT.body }}</p>
    </div>
  </section>
</template>
