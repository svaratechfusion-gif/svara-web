<script setup lang="ts">
// REVENUE ARCHITECTURE — visualize five revenue streams and how they
// reinforce each other. Stream descriptions are sourced VERBATIM from the
// Content Bible (investors.ts architecture components, deployment steps,
// faq business model description). No invented claims. Motion represents
// recurring value creation.
import { revenueStreams } from '~/utils/investors'
</script>

<template>
  <section class="ra">
    <div class="ra__head">
      <p class="ra__eyebrow">Revenue Architecture</p>
      <h2 class="ra__title">Multiple streams. One reinforcing engine.</h2>
      <p class="ra__sub">SVARA's revenue architecture is not a single line — it is a portfolio of reinforcing streams that compound as the platform expands inside and across customers.</p>
    </div>

    <div class="ra__streams">
      <div v-for="(s, i) in revenueStreams" :key="s.name" class="ra__stream" :style="{ '--i': i }">
        <span class="ra__num">{{ String(i + 1).padStart(2, '0') }}</span>
        <h3 class="ra__name">{{ s.name }}</h3>
        <p class="ra__desc">{{ s.desc }}</p>
        <span class="ra__pulse" />
      </div>
    </div>

    <div class="ra__reinforce">
      <div class="ra__reinforce-label">Reinforces</div>
      <div class="ra__reinforce-line" />
      <div class="ra__reinforce-label">SVARA Platform Expansion</div>
    </div>
  </section>
</template>

<style scoped>
.ra { background: #F1F6FE; padding: var(--space-32) var(--container-pad); }
.ra__head { max-width: 760px; margin: 0 auto var(--space-16); text-align: center; }
.ra__eyebrow { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.ra__title { margin: 0; font-size: clamp(34px, 4.4vw, 56px); font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong); }
.ra__sub { margin: var(--space-5) 0 0; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }

.ra__streams { max-width: 1180px; margin: var(--space-16) auto 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: var(--space-6); }
.ra__stream { position: relative; padding: var(--space-8); border-radius: var(--radius-lg); background: #fff; border: 1px solid var(--color-border); box-shadow: 0 4px 14px rgba(16, 42, 91, 0.05), 0 24px 56px rgba(16, 42, 91, 0.06); overflow: hidden; }
.ra__num { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.08em; color: var(--color-text-faint); display: block; margin-bottom: var(--space-4); }
.ra__name { margin: 0 0 var(--space-3); font-size: 18px; font-weight: var(--weight-bold); color: var(--color-ink-strong); letter-spacing: -0.01em; }
.ra__desc { margin: 0; font-size: 13.5px; line-height: 1.6; color: var(--color-text-secondary); }
.ra__pulse { position: absolute; top: 0; left: calc(var(--i, 0) * 0%); height: 3px; width: 0; background: var(--color-accent); animation: ra-pulse 3s ease-in-out infinite alternate; animation-delay: calc(var(--i, 0) * -0.5s); }
@keyframes ra-pulse { 0% { width: 0; opacity: 0.3; } 100% { width: 100%; opacity: 1; } }

.ra__reinforce { max-width: 760px; margin: var(--space-16) auto 0; display: flex; align-items: center; gap: var(--space-5); justify-content: center; }
.ra__reinforce-label { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-accent); font-weight: var(--weight-semibold); }
.ra__reinforce-line { flex: 1; max-width: 160px; height: 1px; background: repeating-linear-gradient(90deg, var(--color-accent) 0 6px, transparent 6px 12px); animation: ra-flow 1.4s linear infinite; }
@keyframes ra-flow { to { background-position: 12px 0; } }
@media (prefers-reduced-motion: reduce) { .ra__pulse, .ra__reinforce-line { animation: none; } }
</style>