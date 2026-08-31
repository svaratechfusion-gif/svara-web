<script setup lang="ts">
import { onMounted } from 'vue'
// DIVISIONS — a halftone hero over the whole page.
//
// The background is a live video rendered as a soft halftone dot field: a head
// that TURNS TO FOLLOW THE CURSOR (the pointer scrubs the clip's timeline) and
// leans in perspective toward it. Over it sits one 1440×800 editorial frame —
// headline, copy hung off a vertical rule, a 2×2 stat panel, and two pills on
// the bottom row.
//
// The page opens on a two-curtain preloader carrying a counting dial. When it
// begins to lift, everything else starts at once: the field develops in from
// the bottom like a photograph, and every piece of the frame springs into place
// on the staggered timeline in `halftone/reveal.ts`.
//
// The four existing sections are unchanged in markup and flow up over the
// field; `styles/divisions-halftone.css` re-skins them for the dark ground.
// The superseded hero (`experience/DivHero.vue`) and its atmosphere layer are
// left in place, unused.
import DivCta from '~/components/divisions/experience/DivCta.vue'
import DivShowcase from '~/components/divisions/experience/DivShowcase.vue'
import DivToProducts from '~/components/divisions/experience/DivToProducts.vue'
import DivUnify from '~/components/divisions/experience/DivUnify.vue'
import HalftoneField from '~/components/divisions/halftone/HalftoneField.vue'
import HeroFrame from '~/components/divisions/halftone/HeroFrame.vue'
import { useIntroReveal } from '~/composables/useIntroReveal'
import { useStructuredData } from '~/composables/useStructuredData'
import { homeSection04 } from '~~/lib/content/home'

/**
 * The entrance signal. The intro preloader used to publish this when its
 * curtains began to lift; with the preloader gone the page publishes it itself,
 * one frame after mount — so the halftone field still develops in and every
 * piece still springs into place on the staggered timeline, it just no longer
 * waits behind a loading screen.
 */
const { revealed, markRevealed } = useIntroReveal()

onMounted(() => {
  // Next frame, not this one: the entrances read `revealed` to flip their
  // springs' targets, and they need one frame at the "out" state first or there
  // is nothing to animate from.
  requestAnimationFrame(() => markRevealed())
})

// Every entrance here is a spring driven from JS, so without it the hero would
// render at its "out" state and stay invisible behind a curtain that never
// lifts. This lands everything and drops the curtain instead.
//
// It goes through the head rather than the template on purpose: Vue's compiler
// strips <style> out of a component template ("Tags with side effect are
// ignored in client component templates"), so the same block written inline
// renders an EMPTY <noscript> — and errors the dev server while doing it.
useHead({
  noscript: [{
    innerHTML: '<style>.dv-spring,.dv-text__unit{opacity:1!important;transform:none!important;filter:none!important}.dv-pre{display:none!important}</style>',
  }],
})

useSeoMeta({
  title: 'Divisions | SVARA — Six Specialized Technology Divisions, One Company',
  description:
    'SVARA operates through six specialized technology divisions — from artificial intelligence and simulation to enterprise software, cloud infrastructure and digital transformation — engineered as one unified technology company.',
})

useStructuredData({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'SVARA Technology Divisions',
  description: homeSection04.paragraphs[0],
  hasPart: homeSection04.divisions.map((name) => ({ '@type': 'Thing', name })),
})
</script>

<template>
  <div class="divisions-page">
    <HalftoneField src="/videos/halftone-portrait.mp4" :reveal="revealed" />

    <HeroFrame />

    <!-- the sections flow up over the fixed field, which stays visible through
         their transparent ground — the site's fixed-background / flowing-content
         model. `styles/divisions-halftone.css` flips their ink and surfaces. -->
    <div class="svara-home divisions-page__body">
      <DivShowcase />
      <DivToProducts />
      <DivUnify />
      <DivCta />
    </div>
  </div>
</template>
