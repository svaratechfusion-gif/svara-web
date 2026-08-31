<script setup lang="ts">
// ABOUT · SECTION 4 (Asme rebuild) — "Mission × Vision": Instrument-Serif heading
// ("Mission × Vision"), a left video + right two text blocks (Mission / Vision)
// split by a divider. motion-v in-view reveals (x-slide from each side).
import { motion } from 'motion-v'
import { companyContent } from '~~/lib/content/company'

const VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4'

// verified statements
const mission = companyContent.architecture.components[0]!.description // Company Mission
const vision = companyContent.useCases[1]!.description // Category Definition — the forward vision
const inView = { once: true, margin: '-100px' } as const
</script>

<template>
  <section class="am">
    <div class="am__inner">
      <motion.h2
        class="am__heading"
        :initial="{ opacity: 0, y: 40 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :in-view-options="inView"
        :transition="{ duration: 0.8 }"
      >Mission <em>×</em> Vision</motion.h2>

      <div class="am__grid">
        <motion.div
          class="am__media"
          :initial="{ opacity: 0, x: -40 }"
          :while-in-view="{ opacity: 1, x: 0 }"
          :in-view-options="inView"
          :transition="{ duration: 0.8 }"
        >
          <video class="am__video" muted autoplay loop playsinline preload="auto" aria-hidden="true">
            <source :src="VIDEO" type="video/mp4">
          </video>
        </motion.div>

        <motion.div
          class="am__text"
          :initial="{ opacity: 0, x: 40 }"
          :while-in-view="{ opacity: 1, x: 0 }"
          :in-view-options="inView"
          :transition="{ duration: 0.8 }"
        >
          <div class="am__block">
            <span class="am__label">Mission</span>
            <p class="am__body">{{ mission }}</p>
          </div>
          <div class="am__divider" aria-hidden="true" />
          <div class="am__block">
            <span class="am__label">Vision</span>
            <p class="am__body">{{ vision }}</p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.am { background: #000; padding: 112px 24px; overflow: hidden; }
@media (min-width: 768px) { .am { padding: 160px 24px; } }
.am__inner { max-width: 72rem; margin: 0 auto; }

.am__heading {
  margin: 0 0 64px;
  font-size: clamp(40px, 8vw, 112px);
  line-height: 1;
  letter-spacing: -0.02em;
  color: #fff;
  font-weight: 400;
}
@media (min-width: 768px) { .am__heading { margin-bottom: 96px; } }
.am__heading em { font-family: 'Instrument Serif', serif; font-style: italic; color: rgba(255, 255, 255, 0.4); }

.am__grid { display: grid; grid-template-columns: 1fr; gap: 32px; }
@media (min-width: 768px) { .am__grid { grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; } }

.am__media { border-radius: 24px; overflow: hidden; aspect-ratio: 4 / 3; }
.am__video { width: 100%; height: 100%; object-fit: cover; display: block; }

.am__text { display: flex; flex-direction: column; }
.am__label { display: block; margin-bottom: 16px; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255, 255, 255, 0.4); }
.am__body { margin: 0; font-size: 16px; line-height: 1.6; color: rgba(255, 255, 255, 0.7); }
@media (min-width: 768px) { .am__body { font-size: 18px; } }
.am__divider { width: 100%; height: 1px; background: rgba(255, 255, 255, 0.1); margin: 32px 0; }
</style>
