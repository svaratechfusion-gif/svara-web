<script setup lang="ts">
// The design's section opening, which it prescribes for EVERY section: a centred
// all-caps eyebrow flanked by hairlines that fade from transparent to 12% frost and
// back, then a large centred heading carrying the Skywash gradient, then one line of
// muted body at ~640px.
defineProps<{ eyebrow: string, headline: readonly string[], body?: string }>()
</script>

<template>
  <header class="ak-head">
    <p class="ak-eyebrow">{{ eyebrow }}</p>
    <h2 class="ak-display">
      <span v-for="(l, i) in headline" :key="i" class="ak-display__line">{{ l }}</span>
    </h2>
    <p v-if="body" class="ak-body ak-measure">{{ body }}</p>
  </header>
</template>
