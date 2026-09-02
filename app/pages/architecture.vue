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
    <!-- AMBIENT CANVAS — midnight ground, blueprint grid, spotlight halo.
         This replaced a fixed full-bleed hero video. The design this page now follows
         is explicit that the atmosphere is drawn, not filmed: "no photography, no
         lifestyle imagery" — the grid and the halo ARE the imagery. Fixed at
         z-index:-1 (the site background level) so it sits behind all content AND the
         footer, exactly where the video sat.
         Previous video, if it is ever wanted back:
         https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4 -->
    <div class="architecture-page__bg" aria-hidden="true">
      <div class="architecture-page__grid" />
      <div class="architecture-page__halo" />
    </div>

    <!-- transparent full-viewport hero over the fixed canvas -->
    <ArcHero />

    <!-- the sections flow up over the fixed canvas; styles/architecture-authkit.css
         gives them the frosted-glass language (transparent ground, glass panels) -->
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
  inset: 0;
  /* site background level — behind all content AND the footer */
  z-index: -1;
  background: #05060f; /* Midnight Canvas */
  pointer-events: none;
  overflow: hidden;
}

/* Blueprint grid — 1px lines at 6% frost, 80px cells, masked so it fades out at the
   edges instead of ending on a hard line. */
.architecture-page__grid {
  position: absolute;
  inset: -1px;
  background-image:
    linear-gradient(to right, rgba(186, 215, 247, 0.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(186, 215, 247, 0.06) 1px, transparent 1px);
  background-size: 80px 80px;
  -webkit-mask-image: radial-gradient(120% 90% at 50% 0%, #000 35%, transparent 78%);
  mask-image: radial-gradient(120% 90% at 50% 0%, #000 35%, transparent 78%);
}

/* Spotlight halo — a conic sweep at the top centre that reads as a light source
   above the page rather than a gradient painted on it. */
.architecture-page__halo {
  position: absolute;
  inset: 0;
  background:
    conic-gradient(at 50% -5%,
      transparent 45%,
      rgba(124, 145, 182, 0.3) 49%,
      rgba(124, 145, 182, 0.5) 50%,
      rgba(124, 145, 182, 0.3) 51%,
      transparent 55%),
    radial-gradient(70% 44% at 50% -6%, rgba(124, 145, 182, 0.20), transparent 70%);
  opacity: 0.85;
  /* a spotlight, not a beam: it has to resolve into the canvas rather than run the
     full height of the viewport */
  -webkit-mask-image: linear-gradient(to bottom, #000 0%, rgba(0, 0, 0, 0.45) 46%, transparent 78%);
  mask-image: linear-gradient(to bottom, #000 0%, rgba(0, 0, 0, 0.45) 46%, transparent 78%);
}

@media (prefers-reduced-motion: reduce) {
  .architecture-page__halo { opacity: 0.7; }
}
.architecture-page__body { position: relative; z-index: 1; }
</style>
