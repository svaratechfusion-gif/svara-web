<script setup lang="ts">
// GLASS NAVIGATION BAR + GHOST NAV LINKS + NEUTRAL FILLED BUTTON.
//
// The reference's floating pill: backdrop-blur(48px), a 1px #363739 border, an 8px
// radius and a transparent dark fill, sitting over the gradient. Logo diamond in Coral
// Pulse and the wordmark at 13px/500, ghost links in Ash, and the one filled action —
// Mist fill, Iron text — at the right.
//
// This is a MOCKUP inside the page's cinematic band, not site navigation: the real nav
// is GlobalNavigation and two live navigations would fight for the same corner. It is
// part of the product-shot composition, so it is inert and aria-hidden.
const links = ['Layers', 'Edge', 'Cognition', 'Simulation', 'Autonomy', 'Trust']
</script>

<template>
  <div class="ray-nav" aria-hidden="true">
    <span class="ray-nav__brand">
      <span class="ray-nav__diamond" />
      <span class="ray-nav__word">SVARA</span>
    </span>
    <nav class="ray-nav__links">
      <span v-for="l in links" :key="l" class="ray-nav__link">{{ l }}</span>
    </nav>
    <span class="ray-nav__cta">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
        <path d="M12 3v11m0 0 4-4m-4 4-4-4M4 19h16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      Architecture brief
    </span>
  </div>
</template>
