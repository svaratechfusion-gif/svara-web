<script setup lang="ts">
// One strong typographic statement, which is the design's whole section model:
// an 11px tracked eyebrow, a large headline at REGULAR weight with slightly positive
// tracking, and a single line of muted body at ~640px. Nothing else in the band.
import { RAY_LAYERS, RAY_STATEMENT, RAY_TILES } from '~~/lib/technology/raycast'

// NUMERIC STAT CALLOUTS — the design renders these at 24-32px weight 500 as the
// one place a number is allowed to be loud. Both figures are counted from the stack
// itself; the third is the deployment surface set the architecture runs on.
const stats = [
  { v: String(RAY_LAYERS.length).padStart(2, '0'), l: 'Intelligence layers' },
  { v: String(RAY_TILES.length), l: 'Technologies' },
  { v: '03', l: 'Deployment surfaces' },
]
</script>

<template>
  <section class="ray-statement">
    <div class="ray-wrap">
      <p class="ray-eyebrow">{{ RAY_STATEMENT.eyebrow }}</p>
      <h2 class="ray-display">{{ RAY_STATEMENT.headline }}</h2>
      <p class="ray-body ray-measure">{{ RAY_STATEMENT.body }}</p>

      <dl class="ray-stats">
        <div v-for="st in stats" :key="st.l" class="ray-stat">
          <dt class="ray-stat__v">{{ st.v }}</dt>
          <dd class="ray-stat__l">{{ st.l }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>
