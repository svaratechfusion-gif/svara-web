<script setup lang="ts">
// INDUSTRIES OVERVIEW — a premium responsive grid. One tile per industry.
// Hover reveals a miniature operational dashboard and the recommended
// SVARA platforms. Each tile's description is verbatim from the Content
// Bible per-industry content file.
import { ref } from 'vue'
import { INDUSTRIES } from '~/utils/industries-page'

const hovered = ref<number | null>(null)
</script>

<template>
  <section class="og">
    <div class="og__head">
      <p class="og__eyebrow">Industries Overview</p>
      <h2 class="og__title">Twelve industries. One platform.</h2>
      <p class="og__sub">Hover any industry to see its operational snapshot and recommended SVARA platforms.</p>
    </div>

    <div class="og__grid">
      <NuxtLink
        v-for="(ind, i) in INDUSTRIES" :key="ind.name"
        :to="`/industries/${ind.slug}`"
        class="og__tile"
        :class="{ 'is-hot': hovered === i, 'is-dim': hovered !== null && hovered !== i }"
        @mouseenter="hovered = i"
        @mouseleave="hovered = null"
      >
        <div class="og__tile-head">
          <span class="og__num">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3 class="og__name">{{ ind.name }}</h3>
        </div>

        <p class="og__def">{{ ind.def }}</p>

        <Transition name="og-expand">
          <div v-if="hovered === i" class="og__reveal">
            <div class="og__mini-dash">
              <div class="og__mini-bar"><span class="og__mini-dots"><i /><i /><i /></span><span class="og__mini-live">LIVE</span></div>
              <div class="og__mini-kpis">
                <span v-for="m in ind.roiMetrics.slice(0, 3)" :key="m.label" class="og__mini-kpi">
                  <span class="og__mini-ml">{{ m.label }}</span>
                  <span class="og__mini-mv">{{ m.value }}</span>
                </span>
              </div>
            </div>
            <div class="og__platforms">
              <span v-for="p in ind.platforms.slice(0, 5)" :key="p.name" class="og__platform">{{ p.name }}</span>
            </div>
          </div>
        </Transition>

        <span class="og__arrow" aria-hidden="true">→</span>
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.og { background: #F8FBFF; padding: var(--space-32) var(--container-pad); }
.og__head { max-width: 760px; margin: 0 auto var(--space-16); text-align: center; }
.og__eyebrow { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.og__title { margin: 0; font-size: clamp(34px, 4.4vw, 56px); font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong); }
.og__sub { margin: var(--space-5) 0 0; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }

.og__grid { max-width: 1180px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--space-6); }
.og__tile { position: relative; display: flex; flex-direction: column; gap: var(--space-4); padding: var(--space-8); border-radius: var(--radius-lg); background: #fff; border: 1px solid var(--color-border); box-shadow: 0 4px 14px rgba(16, 42, 91, 0.05); text-decoration: none; color: inherit; transition: all var(--motion-medium) var(--ease-out); overflow: hidden; }
.og__tile.is-hot { border-color: rgba(47, 127, 230, 0.4); box-shadow: 0 8px 24px rgba(16, 42, 91, 0.1), 0 32px 80px rgba(16, 42, 91, 0.14); transform: translateY(-4px); }
.og__tile.is-dim { opacity: 0.5; }
.og__tile:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }
.og__tile-head { display: flex; align-items: baseline; gap: var(--space-4); }
.og__num { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.08em; color: var(--color-text-faint); }
.og__name { margin: 0; font-size: 19px; font-weight: var(--weight-bold); color: var(--color-ink-strong); letter-spacing: -0.01em; }
.og__def { margin: 0; font-size: 13.5px; line-height: 1.55; color: var(--color-text-secondary); }

.og__reveal { display: flex; flex-direction: column; gap: var(--space-4); padding-top: var(--space-4); border-top: 1px dashed var(--color-border); }
.og__mini-dash { border-radius: var(--radius-md); background: #07111F; overflow: hidden; }
.og__mini-bar { display: flex; align-items: center; gap: 6px; padding: 6px 10px; background: #0E1B33; border-bottom: 1px solid rgba(125, 200, 255, 0.12); }
.og__mini-dots { display: inline-flex; gap: 4px; }
.og__mini-dots i { width: 7px; height: 7px; border-radius: 50%; background: rgba(125, 200, 255, 0.2); }
.og__mini-live { margin-left: auto; font-family: var(--font-mono); font-size: 8px; letter-spacing: 0.12em; color: #4FA8FF; }
.og__mini-kpis { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(125, 200, 255, 0.08); }
.og__mini-kpi { padding: 8px; background: #07111F; display: flex; flex-direction: column; gap: 3px; }
.og__mini-ml { font-family: var(--font-mono); font-size: 7.5px; letter-spacing: 0.04em; text-transform: uppercase; color: #6B85A6; }
.og__mini-mv { font-size: 12px; font-weight: var(--weight-bold); color: #cfe2fb; }
.og__platforms { display: flex; flex-wrap: wrap; gap: 5px; }
.og__platform { padding: 4px 9px; border-radius: var(--radius-pill); background: var(--color-accent-bg); border: 1px solid rgba(47, 127, 230, 0.25); font-size: 10.5px; font-weight: var(--weight-medium); color: var(--color-accent); }
.og__arrow { position: absolute; top: var(--space-8); right: var(--space-8); font-size: 14px; color: var(--color-accent); opacity: 0; transform: translateX(-4px); transition: all var(--motion-medium) var(--ease-smooth); }
.og__tile.is-hot .og__arrow { opacity: 1; transform: translateX(0); }

.og-expand-enter-active, .og-expand-leave-active { transition: opacity var(--motion-medium) var(--ease-smooth), max-height var(--motion-medium) var(--ease-out); overflow: hidden; }
.og-expand-enter-from, .og-expand-leave-to { opacity: 0; max-height: 0; }
.og-expand-enter-to, .og-expand-leave-from { opacity: 1; max-height: 400px; }
@media (max-width: 768px) { .og__tile.is-dim { opacity: 1; } }
</style>