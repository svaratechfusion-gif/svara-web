<script setup lang="ts">
// THE HOME EXPERIENCE — Caldera's forge language and Family's storybook spread, mixed.
//
// Two acts. Caldera opens: a warm Pumice ground, the halftone block, ultrabold
// compressed display, ember stat cards, limestone content cards with sulfur tags, and
// the dotted-divider strip. Family answers in the middle: cream parchment, hand-drawn
// mascots and confetti, hairline-inset cards and the one dark action card. Caldera's
// Obsidian close is not here — it ends the whole page, below the existing sections.
//
// The particle-head hero above this is untouched, as it has been throughout.
import ForgeHero from './ForgeHero.vue'
import ForgeStats from './ForgeStats.vue'
import ForgeCards from './ForgeCards.vue'
import ForgePartners from './ForgePartners.vue'
import FamBand from '../family/FamBand.vue'
</script>

<template>
  <div class="fg-block">
    <!-- navy world → the warm ground, so the act opens rather than cuts -->
    <div class="fg-seam fg-seam--open" aria-hidden="true" />
    <ForgeHero />
    <ForgeStats />
    <ForgeCards />
    <ForgePartners />
    <FamBand />
    <!-- cream → the deep-navy world the rest of the narrative runs in, so the act
         resolves into it rather than cutting -->
    <div class="fg-seam" aria-hidden="true" />
  </div>
</template>
