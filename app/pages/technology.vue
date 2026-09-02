<script setup lang="ts">
// TECHNOLOGY — redesigned as the deepest technical expression of SVARA: a
// journey THROUGH the intelligence architecture (signals → perception →
// intelligence → reasoning → simulation → autonomy → orchestration → action)
// on the homepage .svara-home DNA. Global nav + footer from the default layout.
// Legacy technology sections are preserved (unused). SEO from the Content Bible.
import TecHero from '~/components/technology/experience/TecHero.vue'
import RayBlock from '~/components/technology/raycast/RayBlock.vue'
import { useStructuredData } from '~/composables/useStructuredData'
import { CONSTELLATION } from '~/utils/technology'

// The canvas is Void Black to the last pixel; the footer sits outside this page's
// wrapper, so the ground is carried to it by a route-scoped class. The reference is
// explicit that the system has no alternating light/dark bands.
useHead({ htmlAttrs: { class: 'ray-void' } })

useSeoMeta({
  title: 'Technology | SVARA — The Architecture Behind Intelligence',
  description:
    'SVARA engineers an AI-native intelligence architecture connecting perception, reasoning, simulation, agents and autonomous systems — from edge inference to cloud orchestration — transforming signals from the physical and digital world into intelligent action.',
})

useStructuredData({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'SVARA Technology',
  description: 'The AI-native intelligence architecture powering SVARA — perception, context, cognition, simulation, autonomy and orchestration as one connected technology stack.',
  hasPart: CONSTELLATION.map((n) => ({ '@type': 'Thing', name: n.name })),
})
</script>

<template>
  <div class="svara-home technology-page">
    <TecHero />
    <!-- THE BODY, in the Raycast component set. The previous sections (TecIntro,
         TecFeatures, TecLayers, the tflow chapters, TecToProducts, TecCta) are
         replaced by the design's own components — a six-tile icon timeline,
         key-shadowed card grids, the command-window mockup, the tile inventory and a
         monospace meta strip. Their copy is carried over verbatim in
         lib/technology/raycast.ts, and every replaced component is untouched on disk.
         The hero above is excluded, as asked. -->
    <RayBlock />
  </div>
</template>

<style scoped>
/* Clone of TecLayers' .tly / .tly__chapters / .tly__pathway so 06+ carry the same
   continuous left timeline. Values copied verbatim from TecLayers. */
.tflow { position: relative; padding-block: clamp(40px, 5vh, 80px); }
.tflow__chapters { position: relative; }
/* extend the pathway UP through TecLayers' bottom padding + this section's top
   padding (both the same clamp) so the timeline reads continuous from 05 → 06 */
.tflow__pathway { position: absolute; left: 5px; top: calc(-2 * clamp(40px, 5vh, 80px)); bottom: 0; width: 1px; background: rgba(20, 34, 63, 0.1); }
</style>
