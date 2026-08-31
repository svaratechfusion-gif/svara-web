<script setup lang="ts">
// TECHNOLOGY — redesigned as the deepest technical expression of SVARA: a
// journey THROUGH the intelligence architecture (signals → perception →
// intelligence → reasoning → simulation → autonomy → orchestration → action)
// on the homepage .svara-home DNA. Global nav + footer from the default layout.
// Legacy technology sections are preserved (unused). SEO from the Content Bible.
import TecHero from '~/components/technology/experience/TecHero.vue'
import TecIntro from '~/components/technology/experience/TecIntro.vue'
import TecFeatures from '~/components/technology/experience/TecFeatures.vue'
import TecLayers from '~/components/technology/experience/TecLayers.vue'
import TecEdgeCloud from '~/components/technology/experience/TecEdgeCloud.vue'
import TecLifecycle from '~/components/technology/experience/TecLifecycle.vue'
import TecTrust from '~/components/technology/experience/TecTrust.vue'
import TecStack from '~/components/technology/experience/TecStack.vue'
import TecToProducts from '~/components/technology/experience/TecToProducts.vue'
import TecCta from '~/components/technology/experience/TecCta.vue'
import { useStructuredData } from '~/composables/useStructuredData'
import { CONSTELLATION } from '~/utils/technology'

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
    <TecIntro />
    <TecFeatures />
    <TecLayers />

    <!-- 06+ share ONE continuous timeline pathway, exactly like TecLayers'
         internal .tly__chapters/.tly__pathway. TecLayers itself is untouched. -->
    <section class="tflow">
      <div class="hx-container">
        <div class="tflow__chapters">
          <span class="tflow__pathway" aria-hidden="true" />
          <TecEdgeCloud />
          <TecLifecycle />
          <TecTrust />
          <TecStack />
        </div>
      </div>
    </section>

    <TecToProducts />
    <TecCta />
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
