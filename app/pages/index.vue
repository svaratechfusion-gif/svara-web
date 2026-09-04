<script setup lang="ts">
// HOME (/) — THE SVARA INTELLIGENCE CANVAS, art-directed from the Creative
// Director reference.
//
// WHAT SURVIVED THE REDESIGN. Exactly one thing, deliberately: the particle
// humanoid. Its scene, shaders, geometry and ORIGINAL palette (blue key, red
// rim) are untouched, and so is its journey — one fixed canvas behind the whole
// page, one ScrollTrigger scrubbing the eleven camera chapters through
// setProgress(). Everything the user sees around it is new.
//
// WHAT REPLACED THE REST. The reference's system, ported whole: the adaptive rem
// grid, the glyph-scramble headings, mask and blur reveals, the glass-card
// recipe, film grain and the screen-blended closing panel. The site's own type
// (Space Mono) and its shared header and footer are kept. Copy comes from the Content Bible
// (lib/content/home.ts) through lib/content/home-view.ts — verbatim.
//
// The reference's lava-lamp WebGL backdrop is intentionally NOT ported: the
// humanoid is this page's light source, and a second raymarched field behind it
// would fight both its silhouette and the colour we were told to keep.
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ScrollTrigger } from '~~/lib/gsap'
import { useCardSpotlight } from '~/composables/useCardSpotlight'
import GlobalNavigation from '~/components/navigation/GlobalNavigation.vue'
import EvolveCanvasLayer from '~/components/home/evolve/EvolveCanvasLayer.vue'
import DirectorGlow from '~/components/home/director/DirectorGlow.vue'
import DirectorGrain from '~/components/home/director/DirectorGrain.vue'
import DirectorHero from '~/components/home/director/DirectorHero.vue'
import SecProblem from '~/components/home/director/SecProblem.vue'
import SecEcosystem from '~/components/home/director/SecEcosystem.vue'
import SecPlatforms from '~/components/home/director/SecPlatforms.vue'
import SecDivisions from '~/components/home/director/SecDivisions.vue'
import SecIndustries from '~/components/home/director/SecIndustries.vue'
import SecWhy from '~/components/home/director/SecWhy.vue'
import SecVision from '~/components/home/director/SecVision.vue'
import SecContact from '~/components/home/director/SecContact.vue'
import Footer from '~/components/footer/Footer.vue'
import { homeSeo } from '~~/lib/content/home'

definePageMeta({ layout: 'evolve' })

useHead({
  htmlAttrs: { class: 'evolve-home' },
})
useSeoMeta({ title: homeSeo.title, description: homeSeo.description })

// ── the humanoid's journey ──
// One ScrollTrigger over the whole page, scrubbed, piping progress straight into
// the scene. Imperative on purpose: a reactive write here would re-render the
// page on every scroll frame.
const canvasRef = ref<InstanceType<typeof EvolveCanvasLayer> | null>(null)
const pageRef = ref<HTMLElement | null>(null)
const lifting = ref(false)
let st: ScrollTrigger | null = null

// one delegated pointer light for every glass panel on the page
useCardSpotlight(pageRef)

onMounted(() => {
  canvasRef.value?.setProgress(0)
  requestAnimationFrame(() => requestAnimationFrame(() => { lifting.value = true }))

  st = ScrollTrigger.create({
    trigger: '.dx',
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: (self) => {
      const p = self.progress
      canvasRef.value?.setProgress(p)
      // The veil: none through the hero, then up to half, so the head reads as
      // atmosphere behind copy instead of competing with it. A custom property
      // rather than reactive state — this runs on every scroll frame.
      const veil = Math.min(1, Math.max(0, (p - 0.05) / 0.1)) * 0.5
      document.documentElement.style.setProperty('--dx-veil', veil.toFixed(3))
    },
  })
  ScrollTrigger.refresh()
})

onBeforeUnmount(() => { st?.kill() })
</script>

<template>
  <div ref="pageRef" class="dx">
    <!-- ONE isolated stage holds the background layers AND the narrative, so the
         closing panel can blend against the humanoid. See styles/home-director.css. -->
    <div class="dx__stage">
      <!-- the ember, behind the head so the model's own colour is untouched -->
      <DirectorGlow />

      <!-- the blueprint lattice the model floats in -->
      <div class="dx__grid" aria-hidden="true" />

      <!-- the persistent particle humanoid — never unmounts -->
      <EvolveCanvasLayer ref="canvasRef" :lifted="lifting" />

      <!-- the scroll veil, then film grain -->
      <div class="dx__veil" aria-hidden="true" />
      <DirectorGrain />

      <!-- the narrative, scrolling through the canvas -->
      <DirectorHero />
      <SecProblem />
      <SecEcosystem />
      <SecPlatforms />
      <SecDivisions />
      <SecIndustries />
      <SecWhy />
      <SecVision />
      <SecContact />
      <Footer />
    </div>

    <!-- viewport chrome, above the stage -->
    <GlobalNavigation />
  </div>
</template>
