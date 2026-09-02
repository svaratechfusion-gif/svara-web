<script setup lang="ts">
// STAT FEATURE CARDS — "the system's most visually dominant elements after the hero":
// solid Ember, Chalk text, 40px radius, 40px padding, the metric in the compressed
// display face at 80px.
//
// Every figure is a COUNT of something in the portfolio you can verify by reading
// app/utils/svara-os.ts — ten platforms, five categories, five Intelligence systems —
// plus the eight architecture layers. No invented metrics.
import { SVARA_OS } from '~/utils/svara-os'

const categories = [...new Set(SVARA_OS.map(p => p.category))]
const stats = [
  { label: 'Flagship platforms', value: String(SVARA_OS.length) },
  { label: 'Product categories', value: String(categories.length) },
  { label: 'Intelligence systems', value: String(SVARA_OS.filter(p => p.category === 'Intelligence').length) },
  { label: 'Architecture layers', value: '8' },
]
</script>

<template>
  <section class="fg fg-stats" aria-label="The stack in numbers">
    <div class="fg__wrap fg-stats__row">
      <article v-for="s in stats" :key="s.label" class="fg-stat">
        <p class="fg-stat__l">{{ s.label }}</p>
        <p class="fg-stat__v">{{ s.value }}</p>
      </article>
    </div>
  </section>
</template>
