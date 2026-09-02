<script setup lang="ts">
// HOME (/) — THE SVARA INTELLIGENCE CANVAS.
// Not eleven stacked sections: one continuous cinematic WebGL experience. A
// single fixed particle-head canvas persists behind the entire page; the SVARA
// narrative (hero + 10 sections + footer) scrolls THROUGH it over a scroll-
// reactive ivory veil. ONE Lenis (global plugin) → ScrollTrigger → this master
// timeline → scene.setProgress + veil opacity + system-progress rail. The WebGL
// scene/shaders/particles/model are LOCKED; scroll only pipes into setProgress.
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ScrollTrigger } from '~~/lib/gsap'
import GlobalNavigation from '~/components/navigation/GlobalNavigation.vue'
import EvolveCanvasLayer from '~/components/home/evolve/EvolveCanvasLayer.vue'
import EvolveHero from '~/components/home/evolve/EvolveHero.vue'
import ScrollProgressRail from '~/components/home/evolve/ScrollProgressRail.vue'
import SectionIntelligenceLayer from '~/components/home/experience/SectionIntelligenceLayer.vue'
import FamBand from '~/components/home/family/FamBand.vue'
import SectionEcosystem from '~/components/home/experience/SectionEcosystem.vue'
import SectionFlagship from '~/components/home/experience/SectionFlagship.vue'
import SectionArchitecture from '~/components/home/experience/SectionArchitecture.vue'
import SectionIndustries from '~/components/home/experience/SectionIndustries.vue'
import SectionDivisions from '~/components/home/experience/SectionDivisions.vue'
import SectionWhy from '~/components/home/experience/SectionWhy.vue'
import SectionVision from '~/components/home/experience/SectionVision.vue'
import SectionPartners from '~/components/home/experience/SectionPartners.vue'
import SectionCta from '~/components/home/experience/SectionCta.vue'
import Footer from '~/components/footer/Footer.vue'

definePageMeta({ layout: 'evolve' })

useHead({
  htmlAttrs: { class: 'evolve-home' },
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500&family=Space+Mono&display=swap' },
  ],
})
useSeoMeta({
  title: 'SVARA — Engineering Intelligence That Evolves With You',
  description: 'From foundation models to production-ready infrastructure. SVARA engineers the enterprise intelligence layer — sensing, reasoning, prediction and action as one connected operating system.',
})

// The 11 experience states (for the system-progress rail).
const SCENES = ['Hero', 'Intelligence Layer', 'The Spread', 'Ecosystem', 'Flagship Products', 'One Architecture', 'Industries', 'Divisions', 'Why SVARA', 'The Vision', 'Partners', 'Get Started']

// Reveal state — flips true on the next frame (see onMounted) so the existing hero
// entrance, progress rail and canvas-lift animations play immediately. There is no
// boot/preloader screen: the page renders straight away and WebGL initializes behind it.
const lifting = ref(false)
const active = ref(false)

// ── master scroll wiring ──
const canvasRef = ref<InstanceType<typeof EvolveCanvasLayer> | null>(null)
const activeScene = ref(0)
let st: ScrollTrigger | null = null

onMounted(() => {
  canvasRef.value?.setProgress(0)

  // Reveal on the next frame so the existing entrance transitions fire (an enter
  // transition needs one painted "hidden" frame first). No preloader, no timeout gate —
  // the page and hero are visible immediately; WebGL keeps initializing in the background.
  requestAnimationFrame(() => requestAnimationFrame(() => {
    active.value = true
    lifting.value = true
  }))

  // THE master timeline for the WebGL narrative — one ScrollTrigger, scrubbed to
  // the whole experience, synced to the single global Lenis via the lenis plugin.
  // It drives the camera chapters + the system-progress rail. There is NO ivory
  // veil: the WebGL world is the ONLY background; content floats over it (the
  // home is a dark-glass / light-ink treatment — styles/home-world.css).
  st = ScrollTrigger.create({
    trigger: '.xp',
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: (self) => {
      const p = self.progress
      canvasRef.value?.setProgress(p)      // imperative → no per-frame Vue churn
      const idx = Math.min(SCENES.length - 1, Math.max(0, Math.floor(p * SCENES.length)))
      if (idx !== activeScene.value) activeScene.value = idx
    },
  })
  ScrollTrigger.refresh()
})

onBeforeUnmount(() => {
  st?.kill()
})
</script>

<template>
  <div class="xp">
    <!-- z0 · persistent WebGL canvas (the ONLY background — never unmounts) -->
    <EvolveCanvasLayer ref="canvasRef" :lifted="lifting" />

    <!-- z100 · the ONE shared SVARA header -->
    <GlobalNavigation />

    <!-- z60 · system-progress rail (01 … 11) -->
    <ScrollProgressRail :scenes="SCENES" :active="activeScene" :shown="active" />

    <!-- z2 · narrative layer — scrolls THROUGH the canvas -->
    <div class="xp__content">
      <EvolveHero :active="active" />
      <div class="svara-home xp__sections">
        <SectionIntelligenceLayer />
        <!-- the reference's storybook spread: illustration clusters flanking a centred
             stack, then the dark action card anchoring a hairline-card grid. It runs as
             the first content beat because the page's own hero is the particle head,
             which is untouched. -->
        <FamBand />
        <SectionEcosystem />
        <SectionFlagship />
        <SectionArchitecture />
        <SectionIndustries />
        <SectionDivisions />
        <SectionWhy />
        <SectionVision />
        <SectionPartners />
        <SectionCta />
      </div>
      <Footer />
    </div>
  </div>
</template>

<style scoped>
/* The WebGL world is the ONLY background. This deep-navy atmosphere shows through
   the transparent canvas where there are no particles — the world's own base,
   not a section mask. */
.xp { position: relative; background: radial-gradient(125% 80% at 50% 10%, #0a1430 0%, #05070f 58%, #000 100%); }

.xp__content { position: relative; z-index: 2; }
</style>
