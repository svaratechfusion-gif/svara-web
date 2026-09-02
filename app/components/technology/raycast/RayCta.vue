<script setup lang="ts">
// The closing block, built the way the design closes: a statement, a neutral filled
// button group — the system has no chromatic CTA, the primary action is a light Mist
// fill on the dark page — and beneath it a monospace meta strip separated by pipes,
// which is how technical metadata is rendered here.
import RayDownload from './RayDownload.vue'
import { RAY_CTA } from '~~/lib/technology/raycast'
</script>

<template>
  <section class="ray-cta">
    <div class="ray-wrap ray-cta__inner">
      <h2 class="ray-display ray-display--sm">{{ RAY_CTA.title }}</h2>
      <p class="ray-body ray-measure">{{ RAY_CTA.body }}</p>

      <RayDownload />
    </div>
  </section>
</template>
