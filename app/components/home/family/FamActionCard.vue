<script setup lang="ts">
// DARK FEATURE CARD + ACTION ROWS — the reference's one dark surface, and the only
// place chromatic punctuation appears.
//
// "Stacked list of icon+label rows; each row a circular icon in an app-brand colour,
// label in white, helper text muted. The colourful icons are the chromatic
// punctuation — the rest stays monochrome." Asymmetric 24px left radius, a soft
// drop at rgba(0,0,0,0.15).
//
// The rows are SVARA's real flagship systems, and the icon colours are drawn from the
// home page's existing accents rather than the reference's app-brand set.
import { SVARA_OS } from '~/utils/svara-os'

const rows = ['vision', 'agents', 'twin', 'aios'].map((id) => {
  const p = SVARA_OS.find(x => x.id === id)!
  return { id, name: p.short, helper: p.tagline, to: p.to }
})
</script>

<template>
  <div class="fam-dark">
    <NuxtLink v-for="(r, i) in rows" :key="r.id" :to="r.to" class="fam-row" :data-i="i">
      <span class="fam-row__icon" aria-hidden="true" />
      <span class="fam-row__text">
        <span class="fam-row__label">{{ r.name }}</span>
        <span class="fam-row__helper">{{ r.helper }}</span>
      </span>
      <svg
class="fam-row__chev" viewBox="0 0 24 24" width="16" height="16" fill="none"
           stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="m9 6 6 6-6 6" />
      </svg>
    </NuxtLink>
  </div>
</template>
