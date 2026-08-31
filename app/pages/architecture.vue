<script setup lang="ts">
// ARCHITECTURE — the definitive visual blueprint of the SVARA AI-native
// enterprise intelligence stack, on the homepage .svara-home DNA. Answers "how
// is SVARA structured as one system?" — the SYSTEM blueprint (layered stack +
// cross-cutting rails), distinct from Technology's intelligence PROCESS. Global
// nav + footer from the default layout. Legacy architecture sections preserved
// (unused). SEO/structured-data from the Content Bible.
import ArcHero from '~/components/architecture/experience/ArcHero.vue'
import ArcOverview from '~/components/architecture/experience/ArcOverview.vue'
import ArcLayers from '~/components/architecture/experience/ArcLayers.vue'
import ArcDeployment from '~/components/architecture/experience/ArcDeployment.vue'
import ArcEvent from '~/components/architecture/experience/ArcEvent.vue'
import ArcApi from '~/components/architecture/experience/ArcApi.vue'
import ArcCrossCutting from '~/components/architecture/experience/ArcCrossCutting.vue'
import ArcScale from '~/components/architecture/experience/ArcScale.vue'
import ArcReference from '~/components/architecture/experience/ArcReference.vue'
import ArcToTech from '~/components/architecture/experience/ArcToTech.vue'
import ArcCta from '~/components/architecture/experience/ArcCta.vue'
import { useStructuredData } from '~/composables/useStructuredData'
import { platformContent } from '~~/lib/content/platform'

useSeoMeta({
  title: 'Architecture | SVARA — One Stack, Every Layer of Intelligence',
  description:
    'The SVARA system architecture — physical systems, edge intelligence, enterprise data, AI models, autonomous agents, simulation and applications connected through one unified AI-native stack, with security, governance, observability and infrastructure across every layer.',
})

useStructuredData({
  '@context': 'https://schema.org',
  '@type': 'Article',
  name: 'SVARA Enterprise Intelligence Architecture',
  description: platformContent.architecture.overview,
  about: platformContent.architecture.components.map((c) => c.name),
})
</script>

<template>
  <div class="architecture-page">
    <!-- fixed full-viewport hero video background — it persists while the sections
         flow up over it (same model as the homepage/divisions). z-index:-1 (the
         site background level) so it sits behind all content AND the footer. -->
    <video
      class="architecture-page__bg"
      src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
      autoplay
      muted
      loop
      playsinline
      preload="auto"
      aria-hidden="true"
    />

    <!-- transparent full-viewport hero over the fixed video -->
    <ArcHero />

    <!-- the sections flow up over the fixed hero video (opaque .svara-home ivory,
         so their navy text stays legible over this dark-navy video) -->
    <div class="svara-home architecture-page__body">
      <ArcOverview />
      <ArcLayers />
      <ArcDeployment />
      <ArcEvent />
      <ArcApi />
      <ArcCrossCutting />
      <ArcScale />
      <ArcReference />
      <ArcToTech />
      <ArcCta />
    </div>
  </div>
</template>

<style scoped>
.architecture-page { position: relative; }
.architecture-page__bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  object-fit: cover;
  /* site background level — behind all content AND the footer; own dark-navy
     ground so the hero can't flash before the video paints */
  z-index: -1;
  background: #101d38;
  pointer-events: none;
}
.architecture-page__body { position: relative; z-index: 1; }
</style>
