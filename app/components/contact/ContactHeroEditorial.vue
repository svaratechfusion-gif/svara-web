<script setup lang="ts">
// CONTACT · HERO — the editorial video design language applied as a VISUAL SYSTEM
// only: three vertical bands (nav space / middle / bottom), bottom-anchored tagline
// + CTA + micro-description + stacked clip-reveal heading, Framer-Motion (motion-v)
// entrance. Adapted to SVARA — the reference purple accent → SVARA blue, black ink →
// SVARA navy. All copy is SVARA's own Contact content (Content Bible). The reference
// stats row is REMOVED (the Contact page has no statistics — no fabricated metrics).
// No in-hero navbar (the global site header is the only nav). The hero is TRANSPARENT
// — the editorial video now lives as a FIXED full-page background in contact.vue, so
// the form section flows up over it (homepage/careers/industries model).
import { motion } from 'motion-v'
import { HERO_EASE } from '~/utils/hero-motion'
import { contactContent } from '~~/lib/content/contact'

const description = contactContent.canonicalDefinition
const words = ['Choose', 'Your', 'Channel.'] // existing heading "Choose your channel."
const ease = HERO_EASE // shared Investors hero motion language

// Inter — the reference's typography
useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap' },
  ],
})
</script>

<template>
  <section class="ce">
    <!-- transparent over the fixed page video (contact.vue) — no in-hero video -->

    <!-- 1 · nav band is the global header (skipped) — this spacer clears it -->
    <div class="ce__navspace" aria-hidden="true" />

    <!-- 2 · middle band (reference stats removed — no fabricated metrics) -->
    <div class="ce__mid" aria-hidden="true" />

    <!-- 3 · bottom content -->
    <div class="ce__bottom">
      <!-- Row A — tagline + CTA -->
      <div class="ce__rowA">
        <motion.p
          class="ce__tagline"
          :initial="{ opacity: 0, y: 32 }" :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: 0.6, ease }"
        >Contact SVARA<br>Mission Control</motion.p>

        <motion.a
          href="#form"
          class="ce__cta"
          :initial="{ opacity: 0, y: 32 }" :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: 0.72, ease }"
        >
          Send message
          <svg class="ce__cta-arrow" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </motion.a>
      </div>

      <!-- Row B — micro-description + stacked heading -->
      <div class="ce__rowB">
        <motion.p
          class="ce__desc"
          :initial="{ opacity: 0, y: 32 }" :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: 0.84, ease }"
        >{{ description }}</motion.p>

        <h1 class="ce__heading">
          <span v-for="(w, i) in words" :key="w" class="ce__word-clip">
            <motion.span
              class="ce__word svara-hero-h1"
              :initial="{ y: '110%' }" :animate="{ y: 0 }"
              :transition="{ duration: 0.7, delay: 0.4 + i * 0.14, ease }"
            >{{ w }}</motion.span>
          </span>
        </h1>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ce {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  isolation: isolate;
  background: transparent; /* the fixed page video (contact.vue) shows through */
  font-family: 'Inter', system-ui, sans-serif;
  color: var(--ink-primary, #14223f);
  text-transform: uppercase;
  --ce-accent: #2f7fe6; /* SVARA brand blue (replaces the reference purple) */
}

.ce__navspace { min-height: calc(var(--nav-height, 80px) + 4px); flex-shrink: 0; }
.ce__mid { flex: 1 1 auto; }

.ce__bottom {
  position: relative; z-index: 2;
  display: flex; flex-direction: column; gap: 24px;
  padding: 0 20px 32px;
}
@media (min-width: 640px) { .ce__bottom { padding: 0 32px 32px; } }
@media (min-width: 768px) { .ce__bottom { gap: 48px; padding: 0 48px 48px; } }

/* Row A */
.ce__rowA { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.ce__tagline {
  margin: 0; max-width: 130px;
  font-size: 10px; font-weight: 600; letter-spacing: 0.18em; line-height: 1.5;
  color: var(--ink-primary, #14223f);
}
@media (min-width: 640px) { .ce__tagline { max-width: 160px; font-size: 12px; } }
@media (min-width: 768px) { .ce__tagline { max-width: 20rem; font-size: 14px; } }

.ce__cta {
  display: inline-flex; align-items: center; gap: 6px; white-space: nowrap;
  font-size: 16px; font-weight: 600; letter-spacing: 0.08em; text-decoration: none;
  color: var(--ce-accent);
  transition: opacity 0.2s ease;
}
.ce__cta:hover { opacity: 0.72; }
.ce__cta-arrow { width: 18px; height: 18px; }
@media (min-width: 640px) { .ce__cta { font-size: 20px; } .ce__cta-arrow { width: 22px; height: 22px; } }
@media (min-width: 768px) { .ce__cta { font-size: 24px; } }

/* Row B */
.ce__rowB { display: flex; align-items: flex-end; justify-content: space-between; gap: 12px; }
@media (min-width: 640px) { .ce__rowB { gap: 16px; } }

.ce__desc {
  margin: 0; flex-shrink: 0; width: 120px;
  font-size: 9px; font-weight: 600; letter-spacing: 0.14em; line-height: 1.5;
  color: var(--ink-primary, #14223f);
  text-align: left;
}
@media (min-width: 640px) { .ce__desc { width: 180px; font-size: 12px; } }
@media (min-width: 768px) { .ce__desc { width: 280px; font-size: 14px; text-align: right; } }

.ce__heading { margin: 0; text-align: right; }
.ce__word-clip { display: block; overflow: hidden; }
.ce__word {
  display: block;
  font-size: clamp(2rem, 9vw, 9rem);
  line-height: 0.88;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--ink-primary, #14223f);
}

@media (prefers-reduced-motion: reduce) {
  .ce__cta { transition: none; }
}
</style>
