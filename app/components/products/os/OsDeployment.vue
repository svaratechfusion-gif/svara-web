<script setup lang="ts">
// OS · ENTERPRISE DEPLOYMENT MODELS — cloud / edge / hybrid / private (profile).
import { OS_DEPLOY } from '~/utils/svara-os'
</script>

<template>
  <section class="od">
    <div class="od__inner">
      <header v-reveal class="od__head">
        <p class="od__eyebrow px-mono">Enterprise Deployment</p>
        <h2 class="od__title">Deploy anywhere. <span class="px-serif">Own everything.</span></h2>
        <p class="od__lead">Cloud-native, edge-first, hybrid or fully on-premise — every model runs on the same architecture with zero-trust security and India-native DPDP data sovereignty.</p>
      </header>
      <div class="od__grid">
        <article v-for="(d, i) in OS_DEPLOY" :key="d.k" v-reveal="{ delay: i * 0.06 }" class="od__card sys-corners" :class="{ 'od__card--dark': i === 0 }">
          <span class="od__card-n hx-mono">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3 class="od__card-title">{{ d.k }}</h3>
          <p class="od__card-desc">{{ d.v }}</p>
        </article>
      </div>
      <div v-reveal="{ delay: 0.1 }" class="od__cta">
        <NuxtLink to="/contact" class="px-btn px-btn--primary">Talk to Sales</NuxtLink>
        <NuxtLink to="/contact" class="px-btn px-btn--secondary">Contact Enterprise Team</NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.od { padding: clamp(64px, 9vw, 110px) 24px; }
.od__inner { max-width: 1140px; margin: 0 auto; }
.od__head { max-width: 58ch; margin-bottom: 40px; }
.od__eyebrow { margin: 0 0 14px; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--px-muted); }
.od__title { margin: 0; font-size: clamp(28px, 4vw, 46px); line-height: 1.06; letter-spacing: -0.025em; color: var(--px-navy); font-weight: 500; }
.od__title .px-serif { font-weight: 400; }
.od__lead { margin: 18px 0 0; max-width: 56ch; font-size: clamp(15px, 1.4vw, 17px); line-height: 1.6; color: var(--px-ink); }
.od__grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
@media (min-width: 640px) { .od__grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1000px) { .od__grid { grid-template-columns: repeat(4, 1fr); } }
.od__card { --sys-mark: rgba(16,33,74,0.28); padding: 26px 24px 30px; border-radius: 2px; background: #fff; border: 1px solid var(--px-line); box-shadow: 0 4px 20px -12px rgba(16,33,74,0.18); display: flex; flex-direction: column; min-height: 220px; }
.od__card--dark { --sys-mark: rgba(103,232,249,0.5); background: var(--px-navy); border-color: var(--px-navy); box-shadow: 0 30px 60px -30px rgba(16,33,74,0.5); }
.od__card-n { font-size: 11px; color: var(--px-blue); }
.od__card-title { margin: 16px 0 0; font-size: 18px; font-weight: 600; letter-spacing: -0.01em; color: var(--px-navy); }
.od__card-desc { margin: 12px 0 0; font-size: 13.5px; line-height: 1.55; color: var(--px-muted); }
.od__card--dark .od__card-title { color: #F6FCFF; }
.od__card--dark .od__card-desc { color: #E0EBF0; }
.od__cta { margin-top: 40px; display: flex; flex-wrap: wrap; gap: 14px; }
</style>
