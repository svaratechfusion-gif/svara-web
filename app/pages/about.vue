<script setup lang="ts">
// ABOUT (/about — canonical; /company redirects here).
//
// REBUILT (2026-09) to the Huly reference's design language, replacing the
// "Asme" treatment. The reference's structure IS the page: a full-bleed void
// hero carrying ONE aurora beam, then alternating dark and light bands at a 96px
// gap, pill geometry throughout, and a two-colour vocabulary — Electric Iris for
// the single most important action, Ember Pulse as warm punctuation.
//
// Its typography is NOT adopted: the reference pairs Inter with a condensed
// display face, and this site is Space Mono everywhere. The scale is recut for a
// monospace advance instead (see styles/about-huly.css).
//
// Every word is the Content Bible's (lib/content/company.ts, plus the loop's own
// layer copy from platform.ts). The ROI figures in that file are deliberately
// NOT surfaced — they are on the unsourced-claims list in
// docs/CONTENT-CLAIMS-AUDIT.md, and this page makes no outcome claim.
import { companyContent } from '~~/lib/content/company'
import { useStructuredData } from '~/composables/useStructuredData'
import { SITE_URL } from '~~/lib/seo/site'
import AxBand from '~/components/about/aurora/AxBand.vue'
import AxHero from '~/components/about/aurora/AxHero.vue'
import AxLoop from '~/components/about/aurora/AxLoop.vue'
import AxPillars from '~/components/about/aurora/AxPillars.vue'
import AxEngage from '~/components/about/aurora/AxEngage.vue'
import AxIndustries from '~/components/about/aurora/AxIndustries.vue'
import AxCapabilities from '~/components/about/aurora/AxCapabilities.vue'
import AxDifferent from '~/components/about/aurora/AxDifferent.vue'
import AxNext from '~/components/about/aurora/AxNext.vue'

useSeoMeta({
  title: 'About | SVARA — The Intelligence Layer for Enterprise Operations',
  description: companyContent.aiAnswerTarget.replace(/\*\*/g, ''),
})
useStructuredData({
  '@context': 'https://schema.org', '@type': 'AboutPage', name: 'About SVARA',
  description: companyContent.aiAnswerTarget.replace(/\*\*/g, ''),
  url: `${SITE_URL}/about`,
})

/** The closing band's ground — the previous (Asme) design's "Mission x Vision"
 *  clip, bookending the hero's footage. The band owns it, not AxNext: mounted
 *  inside the section it would stop at the text column. */
const CLOSING_FILM = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4'
</script>

<template>
  <div class="abx">
    <AxHero />

    <!-- the alternation below the hero is the page's structural rhythm -->
    <AxBand mode="light"><AxLoop /></AxBand>
    <AxBand mode="dark"><AxPillars /></AxBand>
    <AxBand mode="void"><AxCapabilities /></AxBand>
    <AxBand mode="linen"><AxDifferent /></AxBand>
    <AxBand mode="void"><AxEngage /></AxBand>
    <AxBand mode="dark"><AxIndustries /></AxBand>
    <AxBand mode="void" :film="CLOSING_FILM"><AxNext /></AxBand>
  </div>
</template>
