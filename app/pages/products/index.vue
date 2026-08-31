<script setup lang="ts">
// PRODUCTS — a continuous product-intelligence experience, not a product page.
//
// ARCHITECTURE. One fixed full-viewport scene plus a scroll spacer. Page progress
// 0 → 1 through that spacer is the single value that drives everything: which
// dashboard is on stage, where it sits in depth, which editorial overlay is
// cross-faded in, how the atmosphere is lit. There are no sections, so there are
// no section boundaries — the film moves:
//
//   intro → (title card · system) × 10 → ecosystem → finale
//
// THE DASHBOARDS ARE UNTOUCHED. Every scene mounts the existing
// `HUDWindow` + `WorldViz` pair exactly as the rest of the site does. The stage
// around them owns position, depth, scale, blur and opacity; nothing reaches
// inside them. Their size is deliberately dominant (≈64vw, floored and capped by
// viewport height) and is never reduced to make room for copy — the copy moves
// around the dashboard.
//
// Motion reuses what the site already runs: the single Lenis instance ticked by
// `gsap.ticker` (app/plugins/lenis.client.ts). The scene registers ONE callback on
// that same ticker and shares a frame-memoised scroll read with every consumer —
// no competing rAF loops, no second animation architecture.
//
// The pinned scene owns the whole viewport, so this route uses the bare `scene`
// layout and carries its own thin editorial header and closing footer.
import { SITE_URL } from '~~/lib/seo/site'
import { SVARA_OS } from '~/utils/svara-os'
import { useStructuredData } from '~/composables/useStructuredData'
import ProductExperience from '~/components/products/scene/ProductExperience.vue'
import VisionExplore from '~/components/products/vision/VisionExplore.vue'
import DroneExplore from '~/components/products/drone/DroneExplore.vue'
import EdgeExplore from '~/components/products/edge/EdgeExplore.vue'
import CognitiveExplore from '~/components/products/cognitive/CognitiveExplore.vue'
import AgentsExplore from '~/components/products/agents/AgentsExplore.vue'
import TwinExplore from '~/components/products/twin/TwinExplore.vue'
import AiosExplore from '~/components/products/aios/AiosExplore.vue'
import CloudExplore from '~/components/products/cloud/CloudExplore.vue'
import EngineeringExplore from '~/components/products/engineering/EngineeringExplore.vue'
import GrowthExplore from '~/components/products/growth/GrowthExplore.vue'

definePageMeta({ layout: 'scene' })

useSeoMeta({
  title: 'Products | SVARA — Ten Intelligence Systems, One Engineered Stack',
  description:
    'Move through SVARA\'s intelligence architecture: Vision AI, Drone AI, Edge AI, Cognitive AI, Autonomous Agents, Digital Twin, ONE AI OS, Business Cloud, Digital Engineering and Growth Intelligence — ten platforms engineered on one shared AI backbone, each with its own live mission-control system.',
})

useStructuredData({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'SVARA Products — Ten Intelligence Systems, One Engineered Stack',
  description: 'Ten flagship SVARA intelligence platforms engineered on one shared AI backbone.',
  hasPart: SVARA_OS.map((p) => ({
    '@type': 'Product',
    name: p.name,
    description: p.summary,
    category: p.category,
    url: `${SITE_URL}${p.to}`,
  })),
})
</script>

<template>
  <!-- Single root: a multi-root page component cannot receive <NuxtPage>
       transitions, and it fails vue/no-multiple-template-root. `display: contents`
       means this wrapper has no layout effect of its own — the scene stage and the
       teleported Explore overlays position exactly as before. -->
  <div class="products-route">
  <ProductExperience />
  <!-- Immersive Vision Intelligence experience — opens over the page from the Vision AI
       card's Explore control (client-only: motion-v + scroll-lock + Teleport). -->
  <ClientOnly>
    <VisionExplore />
    <DroneExplore />
    <EdgeExplore />
    <CognitiveExplore />
    <AgentsExplore />
    <TwinExplore />
    <AiosExplore />
    <CloudExplore />
    <EngineeringExplore />
    <GrowthExplore />
  </ClientOnly>
  </div>
</template>

<style scoped>
.products-route { display: contents; }
</style>
