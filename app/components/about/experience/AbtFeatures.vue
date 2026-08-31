<script setup lang="ts">
// ABOUT · SECTION 3 — the reference Features grid, rebuilt with SVARA About copy:
// one full-width video card ("Our Mission.") + three cards (Innovation / Leadership
// / Our Vision) with numbered headers, check-listed values and a Learn More arrow.
// Dark theme, motion-v fade-ups.
import { Check, ArrowUpRight } from '@lucide/vue'
import { motion } from 'motion-v'

const VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4'

const cards = [
  { n: '01', title: 'Innovation', to: '/technology', items: ['Deep AI research', 'Enterprise transformation', 'Future-ready platforms', 'Continuous innovation'] },
  { n: '02', title: 'Leadership', to: '/careers', items: ['Customer-first mindset', 'Engineering excellence', 'Ethical AI', 'Long-term partnerships'] },
  { n: '03', title: 'Our Vision', to: '/ecosystem', items: ['Connected intelligence', 'Autonomous enterprises', 'Sustainable innovation', 'Global impact'] },
]

const enter = {
  initial: { opacity: 0, y: 34 },
  whileInView: { opacity: 1, y: 0 },
  inViewOptions: { once: true, amount: 0.2 },
}
</script>

<template>
  <section class="tf tec-dark">
    <div class="tf__inner">
      <!-- Card 1 — full-width video card -->
      <motion.div
        class="tf__hero"
        :initial="enter.initial"
        :while-in-view="enter.whileInView"
        :in-view-options="enter.inViewOptions"
        :transition="{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }"
      >
        <video class="tf__hero-video" autoplay muted loop playsinline aria-hidden="true">
          <source :src="VIDEO" type="video/mp4">
        </video>
        <div class="noise-overlay" />
        <div class="tf__hero-grad" />
        <NuxtLink to="/about" class="tf__hero-body">
          <h3 class="tf__hero-title">Our Mission.</h3>
          <span class="tf__learn"><span>Learn More</span><ArrowUpRight :size="16" /></span>
        </NuxtLink>
      </motion.div>

      <!-- Cards 2–4 -->
      <div class="tf__grid">
        <motion.article
          v-for="(c, i) in cards"
          :key="c.n"
          class="tf__card"
          :initial="enter.initial"
          :while-in-view="enter.whileInView"
          :in-view-options="enter.inViewOptions"
          :transition="{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }"
        >
          <div class="tf__card-head">
            <h3 class="tf__card-title">{{ c.title }}</h3>
            <span class="tf__card-num">{{ c.n }}</span>
          </div>
          <ul class="tf__list">
            <li v-for="it in c.items" :key="it" class="tf__item">
              <span class="tf__check"><Check :size="13" :stroke-width="2.5" /></span>{{ it }}
            </li>
          </ul>
          <NuxtLink :to="c.to" class="tf__learn tf__learn--card">
            <span>Learn More</span><ArrowUpRight :size="15" />
          </NuxtLink>
        </motion.article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tf { position: relative; background: var(--tec-bg); }
.tf__inner {
  max-width: 1831px; margin-inline: auto; padding: 40px 20px 120px;
  display: flex; flex-direction: column; gap: 20px;
}
@media (min-width: 768px) { .tf__inner { padding: 60px 40px 160px; gap: 24px; } }

.tf__hero {
  position: relative; overflow: hidden; border-radius: 24px; min-height: 380px;
  border: 1px solid rgba(222, 219, 200, 0.12);
}
@media (min-width: 768px) { .tf__hero { min-height: 520px; } }
.tf__hero-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.tf__hero-grad { position: absolute; inset: 0; z-index: 3; background: linear-gradient(180deg, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.8) 100%); pointer-events: none; }
.tf__hero-body {
  position: relative; z-index: 4; display: flex; flex-direction: column; justify-content: flex-end;
  height: 100%; min-height: inherit; padding: clamp(24px, 4vw, 48px); gap: 18px;
}
.tf__hero-title { margin: 0; font-size: clamp(30px, 4.4vw, 60px); font-weight: 800; letter-spacing: -0.02em; line-height: 1; color: var(--tec-text); }

.tf__grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
@media (min-width: 640px) { .tf__grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1024px) { .tf__grid { grid-template-columns: repeat(3, 1fr); gap: 24px; } }
.tf__card {
  display: flex; flex-direction: column; padding: clamp(24px, 3vw, 36px);
  border-radius: 24px; background: #0c0c0a; border: 1px solid rgba(222, 219, 200, 0.12);
}
.tf__card-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
.tf__card-title { margin: 0; font-size: clamp(22px, 2.4vw, 30px); font-weight: 800; letter-spacing: -0.01em; color: var(--tec-text); }
.tf__card-num { font-size: 13px; font-weight: 700; color: color-mix(in srgb, var(--tec-text) 45%, transparent); font-variant-numeric: tabular-nums; }

.tf__list { list-style: none; margin: 28px 0 0; padding: 0; display: flex; flex-direction: column; gap: 13px; flex: 1; }
.tf__item { display: flex; align-items: center; gap: 11px; font-size: 14px; color: color-mix(in srgb, var(--tec-text) 82%, transparent); }
.tf__check {
  display: inline-flex; align-items: center; justify-content: center;
  width: 20px; height: 20px; border-radius: 50%; flex-shrink: 0;
  background: rgba(222, 219, 200, 0.12); color: var(--tec-primary);
}

.tf__learn { display: inline-flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 700; color: var(--tec-text); transition: gap 0.3s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease; }
.tf__learn:hover { gap: 12px; color: var(--tec-primary); }
.tf__learn--card { margin-top: 30px; align-self: flex-start; }
</style>
