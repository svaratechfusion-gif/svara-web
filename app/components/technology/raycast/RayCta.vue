<script setup lang="ts">
// The closing block, built the way the design closes: a statement, a neutral filled
// button group — the system has no chromatic CTA, the primary action is a light Mist
// fill on the dark page — and beneath it a monospace meta strip separated by pipes,
// which is how technical metadata is rendered here.
import { RAY_CTA, RAY_META } from '~~/lib/technology/raycast'
</script>

<template>
  <section class="ray-cta">
    <div class="ray-wrap ray-cta__inner">
      <h2 class="ray-display ray-display--sm">{{ RAY_CTA.title }}</h2>
      <p class="ray-body ray-measure">{{ RAY_CTA.body }}</p>

      <div class="ray-actions">
        <NuxtLink :to="RAY_CTA.primary.to" class="ray-btn ray-btn--fill">{{ RAY_CTA.primary.label }}</NuxtLink>
        <NuxtLink :to="RAY_CTA.secondary.to" class="ray-btn">{{ RAY_CTA.secondary.label }}</NuxtLink>
      </div>

      <p class="ray-meta">
        <template v-for="(m, i) in RAY_META" :key="m">
          <span>{{ m }}</span><span v-if="i < RAY_META.length - 1" class="ray-meta__pipe" aria-hidden="true">|</span>
        </template>
      </p>
    </div>
  </section>
</template>
