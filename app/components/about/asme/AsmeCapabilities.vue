<script setup lang="ts">
// ABOUT · SECTION 5 (Asme rebuild) — "Our Capabilities": header row + a two-card
// liquid-glass grid (Enterprise Intelligence / Digital Transformation), each with a
// hover-zoom video, gradient, tag, arrow, title and description. motion-v in-view
// staggered reveal. Card copy is verified SVARA content.
import { motion } from 'motion-v'
import { companyContent } from '~~/lib/content/company'

const inView = { once: true, margin: '-100px' } as const

const cards = [
  {
    tag: 'Platform',
    title: 'Enterprise Intelligence',
    body: companyContent.useCases[0]!.description, // unified intelligence layer
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4',
  },
  {
    tag: 'Engineering',
    title: 'Digital Transformation',
    body: companyContent.deployment.overview, // pilot → scale across the enterprise
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4',
  },
]
</script>

<template>
  <section class="ac">
    <div class="ac__glow" aria-hidden="true" />
    <div class="ac__inner">
      <motion.div
        class="ac__head"
        :initial="{ opacity: 0, y: 30 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :in-view-options="inView"
        :transition="{ duration: 0.7 }"
      >
        <h2 class="ac__title">Our Capabilities</h2>
        <span class="ac__eyebrow">What we do</span>
      </motion.div>

      <div class="ac__grid">
        <motion.article
          v-for="(c, i) in cards" :key="c.title"
          class="ac__card liquid-glass"
          :initial="{ opacity: 0, y: 50 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :in-view-options="inView"
          :transition="{ duration: 0.8, delay: i * 0.15 }"
        >
          <div class="ac__media">
            <video class="ac__video" muted autoplay loop playsinline preload="auto" aria-hidden="true">
              <source :src="c.video" type="video/mp4">
            </video>
            <div class="ac__media-grad" aria-hidden="true" />
          </div>
          <div class="ac__body">
            <div class="ac__row">
              <span class="ac__tag">{{ c.tag }}</span>
              <span class="ac__arrow liquid-glass">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
              </span>
            </div>
            <h3 class="ac__card-title">{{ c.title }}</h3>
            <p class="ac__desc">{{ c.body }}</p>
          </div>
        </motion.article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ac { position: relative; background: #000; padding: 112px 24px; overflow: hidden; }
@media (min-width: 768px) { .ac { padding: 160px 24px; } }
.ac__glow { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.02) 0%, transparent 60%); }
.ac__inner { position: relative; max-width: 72rem; margin: 0 auto; }

.ac__head { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 48px; }
.ac__title { margin: 0; font-size: clamp(28px, 5vw, 56px); letter-spacing: -0.02em; color: #fff; font-weight: 400; }
.ac__eyebrow { font-size: 14px; color: rgba(255, 255, 255, 0.4); }
@media (max-width: 767px) { .ac__eyebrow { display: none; } }

.ac__grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
@media (min-width: 768px) { .ac__grid { grid-template-columns: 1fr 1fr; gap: 32px; } }

.ac__card { border-radius: 24px; overflow: hidden; }
.ac__media { position: relative; aspect-ratio: 16 / 9; overflow: hidden; }
.ac__video { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s ease; }
.ac__card:hover .ac__video { transform: scale(1.05); }
.ac__media-grad { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent); }

.ac__body { padding: 24px; }
@media (min-width: 768px) { .ac__body { padding: 32px; } }
.ac__row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.ac__tag { font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255, 255, 255, 0.4); }
.ac__arrow { display: inline-flex; align-items: center; justify-content: center; padding: 8px; border-radius: 999px; color: #fff; }
.ac__card-title { margin: 0 0 12px; font-size: clamp(20px, 2.4vw, 26px); letter-spacing: -0.01em; color: #fff; font-weight: 500; }
.ac__desc { margin: 0; font-size: 14px; line-height: 1.6; color: rgba(255, 255, 255, 0.5); }
</style>
