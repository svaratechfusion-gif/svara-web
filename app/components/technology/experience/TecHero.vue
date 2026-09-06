<script setup lang="ts">
// TECHNOLOGY · HERO — the reference "Prisma" dark video hero visual, with SVARA's
// own Technology content. NO in-hero navbar (the site's global header is the only
// nav). 12-col hero (8/4), bottom-aligned: eyebrow + the page H1 on the left, the
// canonical Technology description + "Build with SVARA" CTA on the right, over a
// fullscreen background video with noise + gradient overlays. motion-v = Framer
// Motion; entrance timing from the shared hero-motion system.
//
// Copy is the Content Bible's Technology positioning: the page's canonical title
// line ("The Architecture Behind Intelligence", app/pages/technology.vue SEO) as
// the H1, and the canonical Technology description verbatim as the lede.
//
// The H1 carries `svara-hero-h1` — the shared hero-heading token every other page
// hero uses — so Technology reads at the same cinematic scale as the rest of the
// site instead of the previous full-bleed single word.
import { ArrowUpRight } from '@lucide/vue'
import { motion } from 'motion-v'
import { heroInitial, heroAnimate, heroTransition } from '~/utils/hero-motion'
import WordsPullUp from '~/components/common/WordsPullUp.vue'

useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&family=Instrument+Serif:ital@1&display=swap' },
  ],
})
</script>

<template>
  <section class="th tec-dark">
    <!-- background video + noise + gradient overlays -->
    <video class="th__video" autoplay muted loop playsinline aria-hidden="true">
      <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4" type="video/mp4">
    </video>
    <div class="noise-overlay" />
    <div class="th__gradient" aria-hidden="true" />

    <div class="th__inner">
      <!-- 12-col hero (no in-hero navbar — the global site header is the only nav) -->
      <div class="th__grid">
        <div class="th__left">
          <motion.p
            class="th__eyebrow"
            :initial="heroInitial()"
            :animate="heroAnimate"
            :transition="heroTransition(0)"
          >
            SVARA Technology
          </motion.p>

          <!-- the page H1. `immediate` because the hero is bottom-aligned: an
               in-view reveal would never fire (the masked word starts below the fold). -->
          <h1 v-glitch class="th__title svara-hero-h1">
            <span class="th__line">
              <WordsPullUp text="The architecture" :delay="0.14" immediate />
            </span>
            <span class="th__line th__line--accent">
              <WordsPullUp text="behind intelligence." :delay="0.3" immediate />
            </span>
          </h1>
        </div>

        <div class="th__right">
          <motion.p
            v-glitch="{ intensity: 0.68, delay: 1.35 }"
            class="th__para"
            :initial="heroInitial(24)"
            :animate="heroAnimate"
            :transition="heroTransition(3)"
          >
            SVARA engineers an AI-native intelligence architecture connecting perception, reasoning, simulation, agents and autonomous systems — from edge inference to cloud orchestration — transforming signals from the physical and digital world into intelligent action.
          </motion.p>

          <motion.div
            :initial="heroInitial(24)"
            :animate="heroAnimate"
            :transition="heroTransition(4)"
          >
            <NuxtLink to="/contact" class="th__cta">
              Build with SVARA
              <span class="th__cta-icon"><ArrowUpRight :size="16" /></span>
            </NuxtLink>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.th {
  position: relative;
  overflow: hidden;
  min-height: 100vh;
}
.th__video {
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.th__gradient {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.15) 32%, rgba(0, 0, 0, 0.35) 72%, rgba(0, 0, 0, 0.85) 100%);
}
.th__inner {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  /* the site has no global border-box reset — without this the padding is ADDED to
     100vh and the bottom of the heading falls below the fold */
  box-sizing: border-box;
  min-height: 100vh;
  max-width: 1831px;
  margin-inline: auto;
  padding: 24px 20px 40px;
}
@media (min-width: 768px) { .th__inner { padding: 32px 40px 56px; } }

/* 12-col hero */
.th__grid {
  box-sizing: border-box;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  align-items: end;
  /* pack the rows at the bottom too — otherwise the implicit rows stretch and the
     stacked mobile layout leaves a dead gap between the heading and the lede */
  align-content: end;
  gap: 32px;
  padding-block: 40px 8px;
}
.th__left { grid-column: 1 / -1; }
.th__right { grid-column: 1 / -1; display: flex; flex-direction: column; gap: 26px; align-items: flex-start; }
@media (min-width: 1024px) {
  .th__left { grid-column: span 8; }
  .th__right { grid-column: span 4; align-self: end; padding-bottom: 12px; }
}

.th__eyebrow {
  margin: 0 0 clamp(16px, 2.2vh, 28px);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--tec-text) 62%, transparent);
}

/* size / weight / tracking come from the shared `svara-hero-h1` token */
.th__title {
  margin: 0;
  color: var(--tec-text);
}
.th__line { display: block; }
.th__line--accent { color: color-mix(in srgb, var(--tec-text) 58%, transparent); }

.th__para {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: color-mix(in srgb, var(--tec-text) 85%, transparent);
  max-width: 360px;
}
@media (min-width: 768px) { .th__para { font-size: 15px; } }

/* The 12-col grid packs to the bottom, which is right for the wide two-column
   composition but dropped the stacked mobile copy onto the fold. Below the
   breakpoint it centres, matching where architecture and industries sit theirs. */
@media (max-width: 1023px) {
  .th__grid {
    align-items: center;
    align-content: center;
    padding-block: 24px;
  }
}

.th__cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 12px 12px 22px;
  border-radius: 999px;
  background: var(--tec-primary);
  color: #0a0a0a;
  font-size: 14px;
  font-weight: 700;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease;
}
.th__cta:hover { transform: scale(1.03); background: #fff; }
.th__cta-icon {
  display: inline-flex; align-items: center; justify-content: center;
  width: 30px; height: 30px; border-radius: 50%;
  background: #0a0a0a; color: var(--tec-primary);
}
</style>
