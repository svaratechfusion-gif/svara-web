<script setup lang="ts">
// ABOUT (/about — canonical route; /company now redirects here) — REBUILT (2026-08) to the dark cinematic
// "Asme" design language: a black, Instrument-Serif, liquid-glass, video-driven
// company profile in five sections (Hero · Who We Are · Our Story · Mission ×
// Vision · Our Capabilities). All copy is SVARA's own (Content Bible) — no
// leadership (only placeholder names exist), no fabricated facts. Global nav +
// footer come from the default layout. SEO / structured data preserved.
import { companyContent } from '~~/lib/content/company'
import { useStructuredData } from '~/composables/useStructuredData'
import { SITE_URL } from '~~/lib/seo/site'
import AsmeHero from '~/components/about/asme/AsmeHero.vue'
import AsmeWhoWeAre from '~/components/about/asme/AsmeWhoWeAre.vue'
import AsmeStory from '~/components/about/asme/AsmeStory.vue'
import AsmeMissionVision from '~/components/about/asme/AsmeMissionVision.vue'
import AsmeCapabilities from '~/components/about/asme/AsmeCapabilities.vue'

// Instrument Serif (display, italic + regular) — the reference typography.
useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap' },
  ],
})

useSeoMeta({
  title: 'About | SVARA — The Intelligence Layer for Enterprise Operations',
  description: companyContent.aiAnswerTarget.replace(/\*\*/g, ''),
})
useStructuredData({
  '@context': 'https://schema.org', '@type': 'AboutPage', name: 'About SVARA',
  description: companyContent.aiAnswerTarget.replace(/\*\*/g, ''),
  url: `${SITE_URL}/about`,
})
</script>

<template>
  <div class="asme-page">
    <AsmeHero />
    <AsmeWhoWeAre />
    <AsmeStory />
    <AsmeMissionVision />
    <AsmeCapabilities />
  </div>
</template>
