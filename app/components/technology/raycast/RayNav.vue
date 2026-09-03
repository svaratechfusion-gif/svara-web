<script setup lang="ts">
// GLASS NAVIGATION BAR + GHOST NAV LINKS + NEUTRAL FILLED BUTTON.
//
// The reference's floating pill: backdrop-blur(48px), a 1px #363739 border, an 8px
// radius and a transparent dark fill, sitting over the gradient. Logo diamond in Coral
// Pulse and the wordmark at 13px/500, ghost links in Ash, and the one filled action —
// Mist fill, Iron text — at the right.
//
// It sits INSIDE the page's cinematic band rather than at the top of the viewport, so
// it never competes with GlobalNavigation — which means it can do real work. Each link
// jumps to the layer it names and flashes that card; the filled action goes to the
// architecture page the brief actually lives on.
import { useRayJump } from '~/composables/useRayJump'

// Each label mapped to the layer it refers to, explicitly — Edge is where edge
// inference sits (Perception, 01) and Trust is the concern that runs through them all.
const links: { label: string, target: string }[] = [
  { label: 'Layers', target: 'ray-layer-01' },
  { label: 'Edge', target: 'ray-layer-01' },
  { label: 'Cognition', target: 'ray-layer-03' },
  { label: 'Simulation', target: 'ray-layer-04' },
  { label: 'Autonomy', target: 'ray-layer-05' },
  { label: 'Trust', target: 'ray-feature-08' },
]

const { jump } = useRayJump()
</script>

<template>
  <div class="ray-nav">
    <span class="ray-nav__brand">
      <span class="ray-nav__diamond" aria-hidden="true" />
      <span class="ray-nav__word">SVARA</span>
    </span>
    <nav class="ray-nav__links" aria-label="Jump to a layer">
      <button
        v-for="l in links" :key="l.label"
        type="button"
        class="ray-nav__link"
        @click="jump(l.target)"
      >{{ l.label }}</button>
    </nav>
    <NuxtLink to="/architecture" class="ray-nav__cta">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
        <path d="M12 3v11m0 0 4-4m-4 4-4-4M4 19h16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      Architecture brief
    </NuxtLink>
  </div>
</template>
