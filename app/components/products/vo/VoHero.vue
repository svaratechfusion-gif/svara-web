<script setup lang="ts">
// PRODUCTS · HERO — centered editorial hero (reference layout, SVARA content).
// Label + serif-accent heading + description + two CTAs. v-reveal staggered fades.
function scrollTo(sel: string): void {
  if (typeof document === 'undefined') return
  document.querySelector(sel)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <section class="vh">
    <div class="vh__inner">
      <p v-reveal="{ delay: 0.1 }" class="vh__label px-mono">SVARA PRODUCT ECOSYSTEM</p>

      <h1 v-reveal="{ delay: 0.3 }" class="vh__title">
        One Platform.<br><span class="px-serif">Infinite Intelligence.</span>
      </h1>

      <div v-reveal="{ delay: 0.4 }" class="vh__desc">
        <p>Every SVARA product is engineered to solve a specific enterprise challenge while working together as one connected intelligence ecosystem.</p>
        <p>From Vision AI and Digital Twins to AI Agents, Business Cloud and Growth Intelligence, each platform shares the same intelligence fabric.</p>
      </div>

      <div v-reveal="{ delay: 0.5 }" class="vh__ctas">
        <button type="button" class="px-btn px-btn--primary" @click="scrollTo('#px-showcase')">Explore Products</button>
        <NuxtLink to="/contact" class="px-btn px-btn--secondary">Book Enterprise Demo</NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.vh { padding: clamp(96px, 14vh, 180px) 24px 0; }
.vh__inner { max-width: 620px; margin: 0 auto; text-align: center; display: flex; flex-direction: column; align-items: center; }
.vh__label { margin: 0 0 20px; font-size: 12px; letter-spacing: 0.18em; color: var(--px-muted); text-transform: uppercase; }
.vh__title { margin: 0; font-size: clamp(36px, 6vw, 60px); line-height: 1.05; letter-spacing: -0.03em; color: var(--px-navy); font-weight: 500; }
.vh__title .px-serif { font-weight: 400; letter-spacing: -0.01em; }
.vh__desc { margin: 24px 0 0; display: flex; flex-direction: column; gap: 18px; max-width: 52ch; }
.vh__desc p { margin: 0; font-size: clamp(15px, 1.4vw, 17px); line-height: 1.6; color: var(--px-ink); }
.vh__ctas { margin-top: 28px; display: flex; flex-wrap: wrap; gap: 14px; justify-content: center; }
@media (max-width: 480px) { .vh__ctas { flex-direction: column; width: 100%; } .vh__ctas > * { width: 100%; } }
</style>
