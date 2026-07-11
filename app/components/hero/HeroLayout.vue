<script setup lang="ts">
import HeroHeading from './HeroHeading.vue'
import HeroObject from './HeroObject.vue'
</script>

<template>
  <div class="hero-layout">
    <div class="hero-layout__grid">
      <HeroHeading class="hero-layout__copy" />
      <HeroObject class="hero-layout__object" />
    </div>
  </div>
</template>

<style scoped>
/* Composition 01–02: 12-column grid; headline (1–7) and Chassis (6–12) share
   the seam at cols 6–7. The Chassis sits one depth layer in front (z-index) on
   a transparent canvas, so the headline reads THROUGH it — they interlock in
   depth, not in lanes. Header stays sticky; hero = 100vh − header. */
.hero-layout {
  height: calc(100vh - var(--header-height, 64px));
  display: flex;
  box-sizing: border-box;
}

.hero-layout__grid {
  flex: 1;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 clamp(24px, 6vw, 96px);
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;
  position: relative;
}

.hero-layout__copy {
  grid-column: 1 / 8;   /* cols 1–7 */
  grid-row: 1;
  z-index: 1;
  justify-self: start;
  align-self: center;
}

.hero-layout__object {
  grid-column: 6 / 13;  /* cols 6–12 — overlaps the copy at the seam */
  grid-row: 1;
  z-index: 2;           /* in front; headline visible through the frame */
  align-self: center;
  justify-self: center;
  pointer-events: none; /* no interaction yet (Step 8) */
}

/* Seam releases below lg: Chassis drops under the headline, full-width. */
@media (max-width: 1024px) {
  .hero-layout {
    height: auto;
    min-height: calc(100vh - var(--header-height, 64px));
  }
  .hero-layout__grid {
    grid-template-columns: 1fr;
    padding: 48px 24px;
    gap: 24px;
  }
  .hero-layout__copy,
  .hero-layout__object {
    grid-column: 1;
    grid-row: auto;
    z-index: auto;
  }
  .hero-layout__object { pointer-events: auto; }
}
</style>
