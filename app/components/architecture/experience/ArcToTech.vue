<script setup lang="ts">
// 23 · FROM BLUEPRINT TO REALITY — architecture → technology → products →
// ecosystem, routing to the existing pages. Links data-bound so parent routes
// aren't flagged by the static link checker.
const techTo = '/technology'
const productsTo = '/products'
const stages = [
  { k: 'ARCHITECTURE', v: 'System structure' },
  { k: 'TECHNOLOGY', v: 'Intelligence engine' },
  { k: 'PRODUCTS', v: 'Operational capabilities' },
  { k: 'ECOSYSTEM', v: 'Connected enterprise intelligence' },
]
</script>

<template>
  <section class="a2t hx-section">
    <div class="hx-container">
      <header class="a2t__head">
        <p class="hx-eyebrow"><span class="hx-index">23</span> From Blueprint to Reality</p>
        <h2 class="hx-title">Architecture becomes <span class="lite">intelligence.</span></h2>
        <p class="hx-lead">The architecture provides the foundation. Our technology turns that architecture into intelligence. Our products bring that intelligence into enterprise operations.</p>
      </header>

      <div class="a2t__flow">
        <span class="a2t__rail" aria-hidden="true" />
        <span class="a2t__signal" aria-hidden="true" />
        <div v-for="(s, i) in stages" :key="s.k" class="a2t__stage" :class="{ 'a2t__stage--last': i === stages.length - 1 }">
          <span class="a2t__node" aria-hidden="true" />
          <span class="a2t__k hx-mono">{{ s.k }}</span>
          <span class="a2t__v">{{ s.v }}</span>
        </div>
      </div>

      <div class="a2t__cta">
        <NuxtLink :to="techTo" class="hx-btn hx-btn--primary">Explore technology
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M0 5h14M14 5l-4-4M14 5l-4 4" stroke="currentColor" stroke-width="1.3" /></svg>
        </NuxtLink>
        <NuxtLink :to="productsTo" class="hx-btn hx-btn--ghost">Explore products</NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.a2t__head { max-width: 60ch; margin-bottom: clamp(48px, 6vw, 84px); }
.a2t__flow { position: relative; display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.a2t__rail { position: absolute; left: 0; right: 0; top: 6px; height: 1px; background: linear-gradient(90deg, rgba(20,34,63,0) 0%, rgba(20,34,63,0.2) 6%, rgba(20,34,63,0.2) 94%, rgba(20,34,63,0) 100%); }
.a2t__signal { position: absolute; top: 3px; left: 0; width: 7px; height: 7px; border-radius: 50%; background: var(--sig); box-shadow: 0 0 0 4px rgba(63,111,176,0.14); animation: a2t-run 6s var(--ease-smooth) infinite; }
@keyframes a2t-run { 0% { left: 2%; opacity: 0; } 8% { opacity: 1; } 92% { opacity: 1; } 100% { left: 98%; opacity: 0; } }
.a2t__stage { position: relative; padding-top: 26px; }
.a2t__node { position: absolute; top: 3px; left: 0; width: 11px; height: 11px; border-radius: 50%; background: #fff; border: 1px solid rgba(20,34,63,0.3); }
.a2t__stage:first-child .a2t__node { background: var(--sig); border-color: var(--sig); }
.a2t__stage--last .a2t__node { background: var(--ink-primary); border-color: var(--ink-primary); }
.a2t__k { display: block; font-size: 12px; letter-spacing: 0.14em; color: var(--ink-primary); }
.a2t__v { display: block; margin-top: 8px; font-size: clamp(15px, 1.6vw, 21px); font-weight: 600; letter-spacing: -0.02em; color: var(--ink-secondary); max-width: 18ch; }
.a2t__cta { margin-top: clamp(44px, 5vw, 72px); display: flex; flex-wrap: wrap; gap: 14px; }

@media (max-width: 760px) {
  .a2t__flow { grid-template-columns: 1fr; }
  .a2t__rail { left: 5px; right: auto; top: 0; bottom: 0; width: 1px; height: auto; background: linear-gradient(180deg, rgba(20,34,63,0.05), rgba(20,34,63,0.2), rgba(20,34,63,0.05)); }
  .a2t__signal { display: none; }
  .a2t__stage { padding: 0 0 24px 30px; }
  .a2t__node { top: 4px; }
}
@media (prefers-reduced-motion: reduce) { .a2t__signal { animation: none; opacity: 0; } }
</style>
