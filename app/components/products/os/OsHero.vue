<script setup lang="ts">
// OS · HERO — the Products page as SVARA's Digital Operating System.
import { OS_PLATFORM_STATS } from '~/utils/svara-os'
function scrollTo(sel: string): void {
  if (typeof document === 'undefined') return
  document.querySelector(sel)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <section class="oh">
    <div class="oh__grid" aria-hidden="true" />
    <div class="oh__inner">
      <p v-reveal="{ delay: 0.05 }" class="oh__label px-mono"><span class="oh__label-dot" />SVARA · DIGITAL OPERATING SYSTEM</p>
      <h1 v-reveal="{ delay: 0.15 }" class="oh__title">Not software.<br><span class="px-serif">An operating system for intelligence.</span></h1>
      <p v-reveal="{ delay: 0.28 }" class="oh__desc">
        SVARA unifies disconnected enterprise systems into one intelligent operating layer — connecting Vision AI, Edge AI, Digital Twins, Enterprise SaaS, Autonomous Agents and Cognitive AI into a single ecosystem capable of observing, understanding, predicting and acting in real time.
      </p>
      <div v-reveal="{ delay: 0.4 }" class="oh__ctas">
        <button type="button" class="px-btn px-btn--primary" @click="scrollTo('#os-products')">Explore the Product Dashboards</button>
        <NuxtLink to="/contact" class="px-btn px-btn--secondary">Book Enterprise Demo</NuxtLink>
      </div>
      <ul v-reveal="{ delay: 0.5 }" class="oh__stats">
        <li v-for="s in OS_PLATFORM_STATS" :key="s.label">
          <span class="oh__stat-v">{{ s.value }}</span>
          <span class="oh__stat-l px-mono">{{ s.label }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.oh { position: relative; overflow: hidden; padding: clamp(120px, 18vh, 220px) 24px clamp(64px, 9vw, 100px); }
.oh__grid { position: absolute; inset: 0; pointer-events: none; background-image: linear-gradient(rgba(16,33,74,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(16,33,74,0.04) 1px, transparent 1px); background-size: 52px 52px; -webkit-mask-image: radial-gradient(120% 90% at 50% 0%, #000 40%, transparent 100%); mask-image: radial-gradient(120% 90% at 50% 0%, #000 40%, transparent 100%); }
.oh__inner { position: relative; max-width: 940px; margin: 0 auto; text-align: center; display: flex; flex-direction: column; align-items: center; }
.oh__label { display: inline-flex; align-items: center; gap: 9px; margin: 0 0 24px; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--px-muted); }
.oh__label-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--px-blue); box-shadow: 0 0 0 3px rgba(93,168,255,0.18); }
.oh__title { margin: 0; font-size: clamp(36px, 6.4vw, 76px); line-height: 1.02; letter-spacing: -0.03em; color: var(--px-navy); font-weight: 500; }
.oh__title .px-serif { font-weight: 400; letter-spacing: -0.01em; }
.oh__desc { margin: 26px 0 0; max-width: 62ch; font-size: clamp(15px, 1.5vw, 19px); line-height: 1.6; color: var(--px-ink); }
.oh__ctas { margin-top: 30px; display: flex; flex-wrap: wrap; gap: 14px; justify-content: center; }
.oh__stats { list-style: none; margin: clamp(48px, 7vw, 80px) 0 0; padding: 0; display: flex; flex-wrap: wrap; justify-content: center; gap: clamp(28px, 6vw, 64px); }
.oh__stats li { display: flex; flex-direction: column; align-items: center; gap: 6px; }
.oh__stat-v { font-size: clamp(24px, 3vw, 36px); font-weight: 600; letter-spacing: -0.02em; color: var(--px-navy); }
.oh__stat-l { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--px-muted); }
@media (max-width: 480px) { .oh__ctas { flex-direction: column; width: 100%; } .oh__ctas > * { width: 100%; } }
</style>
