<script setup lang="ts">
// TECHNOLOGY · HERO — the reference "Prisma" dark video hero visual, with SVARA's
// own Technology content. NO in-hero navbar (the site's global header is the only
// nav). 12-col hero (8/4): a giant WordsPullUp "Technology" heading with a tiny
// "AI" superscript, a fullscreen background video with noise + gradient overlays,
// SVARA's technology description and a "Build with SVARA" CTA. motion-v = Framer
// Motion. (The pre-redesign TecHero was untracked/overwritten, so copy here is
// restored from SVARA's canonical Technology messaging — page SEO / Content Bible.)
import { ArrowUpRight } from '@lucide/vue'
import { motion } from 'motion-v'
import { HERO_EASE } from '~/utils/hero-motion'
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
          <h1 class="th__title">
            <WordsPullUp text="Technology" :delay="0.1" />
            <sup class="th__sup">
              <motion.span
                :initial="{ opacity: 0, y: 12 }"
                :while-in-view="{ opacity: 1, y: 0 }"
                :in-view-options="{ once: true, amount: 0.3 }"
                :transition="{ duration: 0.7, delay: 0.55, ease: HERO_EASE }"
              >AI</motion.span>
            </sup>
          </h1>
        </div>

        <div class="th__right">
          <motion.p
            class="th__para"
            :initial="{ opacity: 0, y: 24 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :in-view-options="{ once: true, amount: 0.3 }"
            :transition="{ duration: 0.8, delay: 0.5, ease: HERO_EASE }"
          >
            SVARA engineers an AI-native intelligence architecture connecting perception, reasoning, simulation, agents and autonomous systems — from edge inference to cloud orchestration — transforming signals from the physical and digital world into intelligent action.
          </motion.p>

          <motion.div
            :initial="{ opacity: 0, y: 24 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :in-view-options="{ once: true, amount: 0.3 }"
            :transition="{ duration: 0.8, delay: 0.65, ease: HERO_EASE }"
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
  min-height: 100vh;
  max-width: 1831px;
  margin-inline: auto;
  padding: 24px 20px 40px;
}
@media (min-width: 768px) { .th__inner { padding: 32px 40px 56px; } }

/* 12-col hero */
.th__grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  align-items: end;
  gap: 32px;
  padding-block: 40px 8px;
}
.th__left { grid-column: 1 / -1; }
.th__right { grid-column: 1 / -1; display: flex; flex-direction: column; gap: 26px; align-items: flex-start; }
@media (min-width: 1024px) {
  .th__left { grid-column: span 8; }
  .th__right { grid-column: span 4; align-self: end; padding-bottom: 12px; }
}

.th__title {
  position: relative;
  margin: 0;
  line-height: 0.82;
  letter-spacing: -0.02em;
  font-weight: 800;
  text-transform: none;
  color: var(--tec-text);
  font-size: 26vw;
}
@media (min-width: 640px) { .th__title { font-size: 24vw; } }
@media (min-width: 768px) { .th__title { font-size: 22vw; } }
@media (min-width: 1024px) { .th__title { font-size: 20vw; } }
@media (min-width: 1280px) { .th__title { font-size: 19vw; } }
@media (min-width: 1536px) { .th__title { font-size: 20vw; } }
.th__sup {
  position: absolute;
  top: 0.08em;
  right: -0.7em;
  font-size: 0.12em;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--tec-primary);
}
@media (min-width: 1024px) { .th__sup { right: 0.2em; } }

.th__para {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: color-mix(in srgb, var(--tec-text) 85%, transparent);
  max-width: 360px;
}
@media (min-width: 768px) { .th__para { font-size: 15px; } }

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
