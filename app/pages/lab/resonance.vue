<script setup lang="ts">
// SVARA hero prototype — the LEFT is the locked editorial typography; the RIGHT
// ~45% is the modular SVARA Intelligence Console (IntelligenceConsole.vue). The
// former particle-topology experiment is retired here (its engine remains in the
// codebase). Warm-ivory canvas + deep-navy type are the locked SVARA palette.
import IntelligenceConsole from '~/components/home/IntelligenceConsole.vue'

definePageMeta({ layout: false })
// Internal prototype: reachable by direct URL, never indexed. Mirrors the
// `/lab/**` routeRule (X-Robots-Tag + sitemap exclude) in nuxt.config.
useSeoMeta({ robots: 'noindex, nofollow' })
useHead({ title: 'SVARA · Engineering Intelligence' })
</script>

<template>
  <div class="hero">
    <!-- RIGHT: SVARA Intelligence Console -->
    <IntelligenceConsole />

    <!-- LEFT: locked hero typography -->
    <div class="hero__type">
      <div class="hero__eyebrow"><span>SVARA</span><span class="hero__eyebrow-sub">AI-NATIVE INTELLIGENCE LAYER</span></div>
      <h1 class="hero__h1">ENGINEERING<br>INTELLIGENCE</h1>
      <p class="hero__sub">SENSE. UNDERSTAND. PREDICT. ACT.</p>
    </div>
  </div>
</template>

<style scoped>
.hero {
  position: fixed;
  inset: 0;
  overflow: hidden;
  font-family: "Geist Sans", system-ui, sans-serif;
  /* locked SVARA warm-ivory canvas */
  background: radial-gradient(125% 100% at 72% 12%, #f7f2e4 0%, #efe9da 44%, #e4ded0 100%);
}

/* ---- locked typography (deep navy) ---- */
.hero__type {
  position: absolute;
  top: 12vh;
  left: 5vw;
  z-index: 3;
  max-width: 52vw;
  pointer-events: none;
}
.hero__eyebrow { display: flex; gap: 1.6rem; align-items: center; font-size: 11px; letter-spacing: 0.28em; font-weight: 500; color: #3a4a6b; }
.hero__eyebrow-sub { color: #8b93a6; }
.hero__h1 {
  margin: 4vh 0 0;
  font-size: clamp(52px, 8.4vw, 158px);
  font-weight: 600;
  line-height: 0.92;
  letter-spacing: -0.02em;
  color: #14223f;
  text-wrap: balance;
}
.hero__sub { margin: 3.4vh 0 0; font-size: clamp(12px, 1vw, 15px); letter-spacing: 0.24em; font-weight: 500; color: #46506e; }

@media (max-width: 900px) {
  .hero__type { max-width: 92vw; }
}
</style>
