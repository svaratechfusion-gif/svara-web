<script setup lang="ts">
// PRODUCT EXPERIENCE — the shell.
//
// The page is ONE fixed scene plus a scroll spacer. The scene never scrolls; the
// spacer gives the page its length, and where you are inside that length
// (progress 0 → 1) is the only thing that decides what the scene is doing. That
// is the whole architecture — there are no sections, so there are no section
// boundaries to see.
//
// Layer order inside the pinned container:
//   atmosphere (ground · grid · haze · motes · grain z-5)
//   the hero's 3D intelligence core                 z-4
//   dashboard stages                                z-6
//   editorial overlays                              z-10
//   transition title cards                          z-12
//
// Outside the stage, in normal flow / fixed over it (homepage stacking):
//   site footer (after the scroll spacer)           z-2  (over the fixed stage)
//   global navigation (logo · Menu · Connect)       z-100 (over scene + footer)
//
// `isolation: isolate` on the container scopes the grain's blend mode to the
// scene. Without it the blend group's backdrop is the whole document and the
// compositor re-resolves the stack against a scene that repaints every frame.
import { onMounted } from 'vue'
import { beat } from './scene-sequence'
import { invalidateScrollProgress } from '~/utils/scroll-progress'
import ProductHeroPin from './ProductHeroPin.vue'
import SceneFinale from './SceneFinale.vue'
import GlobalNavigation from '~/components/navigation/GlobalNavigation.vue'
import Footer from '~/components/footer/Footer.vue'
import StrideBlock from '~/components/products/stride/StrideBlock.vue'

const ecoBeat = beat('ecosystem')

// The spacer's height is what the progress reader measures against, so a fresh
// measurement after mount keeps the first frame honest.
onMounted(() => invalidateScrollProgress())
</script>

<template>
  <div class="ps">
    <!-- The pinned scene lives inside a wrapper as tall as the whole sequence. The
         stage is position: sticky, so it holds at the top of the viewport while this
         wrapper scrolls, then scrolls AWAY with the wrapper once the sequence ends —
         leaving the CTA and footer over the page's own background, never behind the
         (transparent) footer. This is what keeps scene content out of the footer. -->
    <!-- SCENE 01 — the hero, now its own pin so the Stride block can follow it
         directly. Was beat one of the sequence below; see ProductHeroPin. -->
    <ProductHeroPin />

    <!-- STRIDE — the six body sections of the Stride fintech design, in normal flow
         between the hero and the film. Both neighbours are pinned scenes; this is an
         ordinary block that scrolls between them. -->
    <StrideBlock />

    <!-- The ten HUD dashboards used to pin here as a 1950vh film. The page was
         converted to the design above, which presents the same ten products in its
         card stack, so the film is no longer mounted. Its components are untouched on
         disk (ProductScene, SceneTitle, SceneEcosystem, the dashboards) and every
         dashboard is still one click away through the Explore overlays. -->

    <!-- FINALE (§29) — the closing statement, a normal BLOCK-LEVEL SECTION in document
         flow AFTER the scene wrapper (which has scrolled its sticky stage away) and
         ABOVE the footer. It owns its own full-height space over the page's own
         background, so the CTA sits completely above the footer with zero overlap and
         nothing from the scene shows behind it. Its reveal eases in as it scrolls up. -->
    <SceneFinale :beat="ecoBeat" class="ps-finale" />

    <!-- The real site footer — the SAME one the homepage uses — in normal flow
         after the finale, stacked above the fixed stage (z-2), exactly how the
         homepage renders its Footer over the fixed canvas. -->
    <Footer class="ps-footer" />

    <!-- Same global chrome as the homepage: the floating logo · Menu · Connect
         dock (GlobalNavigation), fixed at z-100 above the whole page — scene AND
         footer — so it sits outside the stage's isolated stacking context (as on
         the homepage the nav sits above the footer). Replaces the SceneHeader bar. -->
    <GlobalNavigation />
  </div>
</template>

<style scoped>
.ps { position: relative; }

/* The finale section and the site footer both sit in normal flow after the spacer,
   stacked in that order (finale → footer). The stage is fixed at z-index auto (its
   own isolated context); lifting these above it (z-2) lets each paint over the scene
   as it scrolls up — the homepage's fixed-scene / flowing-content stacking, applied
   here. Because both are ordinary flow blocks, the footer can never overlap the CTA:
   the finale finishes its full height, then the footer begins. */
.ps-finale { position: relative; z-index: 2; }
.ps-footer { position: relative; z-index: 2; }
</style>
