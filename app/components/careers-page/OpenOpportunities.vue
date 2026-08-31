<script setup lang="ts">
// OPEN OPPORTUNITIES — since there are currently no live openings, this
// section prominently features the Talent Network submission flow instead.
// When roles become available, they'll be sourced from a content file.
import { HAS_OPENINGS } from '~/utils/careers-page'
</script>

<template>
  <section class="oo">
    <div class="oo__head">
      <p class="oo__eyebrow">Open Opportunities</p>
      <h2 class="oo__title">{{ HAS_OPENINGS ? 'Current openings.' : 'No open roles — yet.' }}</h2>
      <p class="oo__sub">{{ HAS_OPENINGS ? 'Find your next role below.' : "We don't have open roles right now, but we're always looking for exceptional people. Join our Talent Network and we'll reach out when the right opportunity arises." }}</p>
    </div>

    <div v-if="HAS_OPENINGS" class="oo__list">
      <!-- Roles will render here when available -->
    </div>

    <div v-else class="oo__network">
      <div class="oo__network-icon" aria-hidden="true">
        <svg viewBox="0 0 100 100" class="oo__network-svg">
          <circle cx="50" cy="50" r="20" class="oo__network-core" />
          <circle cx="20" cy="30" r="8" class="oo__network-node" />
          <circle cx="80" cy="30" r="8" class="oo__network-node" />
          <circle cx="20" cy="70" r="8" class="oo__network-node" />
          <circle cx="80" cy="70" r="8" class="oo__network-node" />
          <line x1="28" y1="34" x2="42" y2="44" class="oo__network-link" />
          <line x1="72" y1="34" x2="58" y2="44" class="oo__network-link" />
          <line x1="28" y1="66" x2="42" y2="56" class="oo__network-link" />
          <line x1="72" y1="66" x2="58" y2="56" class="oo__network-link" />
        </svg>
      </div>
      <div class="oo__network-body">
        <h3 class="oo__network-title">Join Our Talent Network</h3>
        <p class="oo__network-desc">Submit your details and we'll reach out when a role matches your expertise. We're always looking for exceptional engineers, researchers, product thinkers, and operators to build the future of enterprise intelligence.</p>
        <NuxtLink to="#talent" class="oo__network-btn">Join the Network →</NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.oo { background: #F1F6FE; padding: var(--space-32) var(--container-pad); }
.oo__head { max-width: 760px; margin: 0 auto var(--space-16); text-align: center; }
.oo__eyebrow { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.oo__title { margin: 0; font-size: clamp(34px, 4.4vw, 56px); font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong); }
.oo__sub { margin: var(--space-5) 0 0; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }

.oo__network { max-width: 760px; margin: var(--space-16) auto 0; display: grid; grid-template-columns: 200px 1fr; gap: var(--space-12); align-items: center; padding: var(--space-12); border-radius: var(--radius-lg); background: #fff; border: 1px solid var(--color-border); box-shadow: 0 4px 14px rgba(16, 42, 91, 0.05), 0 30px 80px rgba(16, 42, 91, 0.08); }
.oo__network-svg { width: 100%; height: auto; }
.oo__network-core { fill: var(--color-ink-strong); }
.oo__network-node { fill: var(--color-accent); opacity: 0.7; animation: oo-pulse 2.4s ease-in-out infinite alternate; }
.oo__network-node:nth-child(odd) { animation-delay: -1.2s; }
@keyframes oo-pulse { 0%,100% { opacity: 0.5; } 100% { opacity: 1; } }
.oo__network-link { stroke: var(--color-accent); stroke-width: 1; opacity: 0.3; stroke-dasharray: 2 3; animation: oo-dash 5s linear infinite; }
@keyframes oo-dash { to { stroke-dashoffset: -30; } }
.oo__network-title { margin: 0 0 var(--space-4); font-size: 24px; font-weight: var(--weight-extrabold); color: var(--color-ink-strong); letter-spacing: -0.02em; }
.oo__network-desc { margin: 0 0 var(--space-6); font-size: 15px; line-height: 1.6; color: var(--color-text-secondary); }
.oo__network-btn { display: inline-flex; align-items: center; gap: 6px; padding: 12px 26px; border-radius: var(--radius-pill); background: var(--color-ink-strong); color: #fff; font-size: 15px; font-weight: var(--weight-semibold); text-decoration: none; transition: all var(--motion-medium) var(--ease-smooth); }
.oo__network-btn:hover { background: var(--color-accent); transform: translateY(-2px); }
@media (max-width: 768px) { .oo__network { grid-template-columns: 1fr; text-align: center; } }
@media (prefers-reduced-motion: reduce) { .oo__network-node, .oo__network-link { animation: none; } }
</style>