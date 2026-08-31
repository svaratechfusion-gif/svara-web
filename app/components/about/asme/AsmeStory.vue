<script setup lang="ts">
// ABOUT · SECTION 3 (Asme rebuild) — "Our Story": a featured looping video in a
// rounded frame with a bottom gradient, a liquid-glass copy card (SVARA's founding
// story), and an existing CTA. motion-v in-view reveal. id anchors the hero's
// "Discover Our Story" scroll.
import { motion } from 'motion-v'
import { companyContent } from '~~/lib/content/company'

const VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4'

const story = companyContent.architecture.overview
const inView = { once: true, margin: '-100px' } as const
</script>

<template>
  <section id="asme-story" class="as">
    <motion.div
      class="as__frame"
      :initial="{ opacity: 0, y: 60 }"
      :while-in-view="{ opacity: 1, y: 0 }"
      :in-view-options="inView"
      :transition="{ duration: 0.9 }"
    >
      <video class="as__video" muted autoplay loop playsinline preload="auto" aria-hidden="true">
        <source :src="VIDEO" type="video/mp4">
      </video>
      <div class="as__grad" aria-hidden="true" />

      <div class="as__overlay">
        <div class="as__card liquid-glass">
          <span class="as__card-label">Our Story</span>
          <p class="as__card-body">{{ story }}</p>
        </div>
        <NuxtLink to="/contact" class="as__explore liquid-glass">Talk to SVARA</NuxtLink>
      </div>
    </motion.div>
  </section>
</template>

<style scoped>
.as { background: #000; padding: 24px 24px 80px; overflow: hidden; }
@media (min-width: 768px) { .as { padding: 40px 24px 128px; } }

.as__frame { position: relative; max-width: 72rem; margin: 0 auto; border-radius: 24px; overflow: hidden; aspect-ratio: 16 / 9; }
.as__video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.as__grad { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 50%, transparent 100%); }

.as__overlay { position: absolute; left: 0; right: 0; bottom: 0; padding: 24px; display: flex; flex-direction: column; align-items: flex-start; gap: 16px; }
@media (min-width: 768px) { .as__overlay { padding: 40px; flex-direction: row; align-items: flex-end; justify-content: space-between; } }

.as__card { max-width: 28rem; padding: 24px; border-radius: 16px; }
@media (min-width: 768px) { .as__card { padding: 32px; } }
.as__card-label { display: block; margin-bottom: 12px; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255, 255, 255, 0.5); }
.as__card-body { margin: 0; font-size: 14px; line-height: 1.6; color: #fff; }
@media (min-width: 768px) { .as__card-body { font-size: 16px; } }

.as__explore { padding: 12px 32px; border-radius: 999px; color: #fff; font-size: 14px; font-weight: 500; text-decoration: none; white-space: nowrap; transition: transform 0.2s ease; }
.as__explore:hover { transform: scale(1.05); }
.as__explore:active { transform: scale(0.95); }
</style>
