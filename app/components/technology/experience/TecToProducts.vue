<script setup lang="ts">
// 16 · TECHNOLOGY INTO PRODUCTS — a restrained architectural transition from
// technology → products → ecosystem, leading to /products.
const productsTo = '/products'
const stages = [
  { k: 'TECHNOLOGY', v: 'One intelligence architecture' },
  { k: 'PRODUCTS', v: 'Ten platforms' },
  { k: 'ECOSYSTEM', v: 'One connected system' },
]
</script>

<template>
  <section class="t2p hx-section">
    <div class="hx-container">
      <header class="t2p__head">
        <p class="hx-eyebrow"><span class="hx-index">16</span> Technology into Products</p>
        <h2 class="hx-title">Engineered on <span class="lite">one foundation.</span></h2>
        <p class="hx-lead">SVARA's products are built on a shared intelligence architecture — perception, cognition, simulation, agents and enterprise systems working as one connected technology stack.</p>
      </header>

      <div class="t2p__flow">
        <span class="t2p__rail" aria-hidden="true" />
        <span class="t2p__signal" aria-hidden="true" />
        <div v-for="(s, i) in stages" :key="s.k" class="t2p__stage" :class="{ 't2p__stage--last': i === stages.length - 1 }">
          <span class="t2p__node" aria-hidden="true" />
          <span class="t2p__k hx-mono">{{ s.k }}</span>
          <span class="t2p__v">{{ s.v }}</span>
        </div>
      </div>

      <div class="t2p__cta">
        <NuxtLink :to="productsTo" class="hx-btn hx-btn--primary">
          Explore SVARA products
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M0 5h14M14 5l-4-4M14 5l-4 4" stroke="currentColor" stroke-width="1.3" /></svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.t2p__head { max-width: 60ch; margin-bottom: clamp(48px, 6vw, 84px); }
.t2p__flow { position: relative; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.t2p__rail { position: absolute; left: 0; right: 0; top: 6px; height: 1px; background: linear-gradient(90deg, rgba(20,34,63,0) 0%, rgba(20,34,63,0.2) 6%, rgba(20,34,63,0.2) 94%, rgba(20,34,63,0) 100%); }
.t2p__signal { position: absolute; top: 3px; left: 0; width: 7px; height: 7px; border-radius: 50%; background: var(--sig); box-shadow: 0 0 0 4px rgba(63,111,176,0.14); animation: t2p-run 6s var(--ease-smooth) infinite; }
@keyframes t2p-run { 0% { left: 2%; opacity: 0; } 8% { opacity: 1; } 92% { opacity: 1; } 100% { left: 98%; opacity: 0; } }
.t2p__stage { position: relative; padding-top: 26px; }
.t2p__node { position: absolute; top: 3px; left: 0; width: 11px; height: 11px; border-radius: 50%; background: #fff; border: 1px solid rgba(20,34,63,0.3); }
.t2p__stage:first-child .t2p__node { background: var(--sig); border-color: var(--sig); }
.t2p__stage--last .t2p__node { background: var(--ink-primary); border-color: var(--ink-primary); }
.t2p__k { display: block; font-size: 12px; letter-spacing: 0.14em; color: var(--ink-primary); }
.t2p__v { display: block; margin-top: 8px; font-size: clamp(16px, 1.7vw, 22px); font-weight: 600; letter-spacing: -0.02em; color: var(--ink-secondary); }
.t2p__cta { margin-top: clamp(44px, 5vw, 72px); }

@media (max-width: 760px) {
  .t2p__flow { grid-template-columns: 1fr; }
  .t2p__rail { left: 5px; right: auto; top: 0; bottom: 0; width: 1px; height: auto; background: linear-gradient(180deg, rgba(20,34,63,0.05), rgba(20,34,63,0.2), rgba(20,34,63,0.05)); }
  .t2p__signal { display: none; }
  .t2p__stage { padding: 0 0 24px 30px; }
  .t2p__node { top: 4px; }
}
@media (prefers-reduced-motion: reduce) { .t2p__signal { animation: none; opacity: 0; } }
</style>
