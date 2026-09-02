<script setup lang="ts">
// ARCHITECTURE — the definitive visual blueprint of the SVARA AI-native
// enterprise intelligence stack, on the homepage .svara-home DNA. Answers "how
// is SVARA structured as one system?" — the SYSTEM blueprint (layered stack +
// cross-cutting rails), distinct from Technology's intelligence PROCESS. Global
// nav + footer from the default layout. Legacy architecture sections preserved
// (unused). SEO/structured-data from the Content Bible.
import ArcHero from '~/components/architecture/experience/ArcHero.vue'
import AkBlock from '~/components/architecture/authkit/AkBlock.vue'
import { useStructuredData } from '~/composables/useStructuredData'
import { platformContent } from '~~/lib/content/platform'

// The body below the hero is the design's Midnight Canvas, so the footer beneath it
// has to be too — otherwise the fixed hero video reappears behind the last band and
// the page ends on footage, which is exactly what the reference forbids.
useHead({ htmlAttrs: { class: 'arc-midnight' } })

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
    <!-- FIXED HERO VIDEO — the page's background, unchanged. It persists while the
         sections flow up over it (the homepage/divisions model), at z-index:-1 so it
         sits behind all content AND the footer.
         The design layered on top of it needs a near-black ground for its frosted
         glass and luminous type to read, so the video carries a midnight scrim and
         the blueprint grid sits over it — the atmosphere is the video PLUS the
         drawn layer, not one replacing the other. -->
    <div class="architecture-page__bg" aria-hidden="true">
      <video
        class="architecture-page__video"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
        autoplay
        muted
        loop
        playsinline
        preload="auto"
      />
      <div class="architecture-page__scrim" />
      <div class="architecture-page__grid" />
      <div class="architecture-page__halo" />
    </div>

    <!-- transparent full-viewport hero over the fixed video -->
    <ArcHero />

    <!-- the sections flow up over the fixed video; styles/architecture-authkit.css
         gives them the frosted-glass language (transparent ground, glass panels) -->
    <!-- THE BODY, in the AuthKit component set. The previous sections (ArcOverview,
         ArcLayers, ArcDeployment, ArcEvent, ArcApi, ArcCrossCutting, ArcScale,
         ArcReference, ArcToTech, ArcCta) are replaced by the design's own components —
         eyebrow labels flanked by fading hairlines, a frosted icon timeline, glass
         cards, the floating glass plates and its neutral pill actions. Their copy is
         carried over verbatim in lib/architecture/authkit.ts, and every replaced
         component is untouched on disk.
         The hero and its fixed video above are excluded. -->
    <div class="svara-home architecture-page__body">
      <AkBlock />
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
  /* The clip is 13.5MB, so there are a few seconds before its first frame paints.
     Sitting on #05060f made that gap look like a broken background; the footage's own
     night-navy reads as the video arriving late rather than as nothing at all. */
  background: #0a1730;
  pointer-events: none;
  overflow: hidden;
}
.architecture-page__video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Midnight veil — deliberately light.
   The footage opens on a night sky, so it is already close to the canvas value; the
   earlier heavy scrim (0.46 → 0.7) stacked on top of that and the hero read as a flat
   black rectangle. This is a veil, not a scrim: barely anything over the hero, easing
   in further down where the sections are dense and the glass panels need something to
   sit against. Legibility over the footage comes from the panels and the prose halo,
   which is how this page worked before the restyle. */
.architecture-page__scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(5, 6, 15, 0) 0%,
    rgba(5, 6, 15, 0.08) 45%,
    rgba(5, 6, 15, 0.28) 100%
  );
}

/* Blueprint grid — 1px lines at 6% frost, 80px cells, masked so it fades out at the
   edges instead of ending on a hard line. */
.architecture-page__grid {
  position: absolute;
  inset: -1px;
  background-image:
    linear-gradient(to right, rgba(186, 215, 247, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(186, 215, 247, 0.05) 1px, transparent 1px);
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
  opacity: 0.55;
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
