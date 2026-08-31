<script setup lang="ts">
// CROSS-INDUSTRY WORKFLOW — animate: Industry → Operational Data → AI
// Platform → Intelligence → Automation → Business Decisions. The workflow
// adapts dynamically based on the selected industry from the selector
// above (shared via a prop or default). Motion represents workflow
// execution and system coordination.
import { ref, computed } from 'vue'
import { INDUSTRIES } from '~/utils/industries-page'

const active = ref(0)
const selected = computed(() => INDUSTRIES[active.value]!)

// the data-source label adapts per industry using verbatim component names
const dataSource = computed(() => selected.value.components[0]?.name ?? 'Operational Data')
</script>

<template>
  <section class="cw">
    <div class="cw__head">
      <p class="cw__eyebrow">Cross-Industry Workflow</p>
      <h2 class="cw__title">The same workflow. Different data. Different outcomes.</h2>
      <p class="cw__sub">Every industry runs the same Intelligence Loop workflow — only the data, the intelligence, and the decisions change. Select an industry to see the workflow adapt.</p>
    </div>

    <div class="cw__selector">
      <button v-for="(ind, i) in INDUSTRIES" :key="ind.name" class="cw__chip" :class="{ 'is-on': active === i }" @click="active = i">{{ ind.name }}</button>
    </div>

    <div :key="selected.name" class="cw__flow">
      <div class="cw__stage cw__stage--start">
        <span class="cw__dot" /><span class="cw__label">{{ selected.name }}</span>
      </div>
      <span class="cw__arrow" />
      <div class="cw__stage">
        <span class="cw__dot" /><span class="cw__label">{{ dataSource }}</span>
      </div>
      <span class="cw__arrow" />
      <div class="cw__stage">
        <span class="cw__dot" /><span class="cw__label">AI Platform</span>
      </div>
      <span class="cw__arrow" />
      <div class="cw__stage">
        <span class="cw__dot" /><span class="cw__label">Intelligence</span>
      </div>
      <span class="cw__arrow" />
      <div class="cw__stage">
        <span class="cw__dot" /><span class="cw__label">Automation</span>
      </div>
      <span class="cw__arrow" />
      <div class="cw__stage cw__stage--end">
        <span class="cw__dot" /><span class="cw__label">Business Decisions</span>
      </div>
    </div>

    <div class="cw__packets" aria-hidden="true">
      <svg class="cw__rail" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line x1="4" y1="50" x2="96" y2="50" class="cw__line" />
        <circle r="0.6" class="cw__packet" :style="{ offsetPath: `path('M4 50 L96 50')` }" />
      </svg>
    </div>
  </section>
</template>

<style scoped>
.cw { background: #F8FBFF; padding: var(--space-32) var(--container-pad); }
.cw__head { max-width: 760px; margin: 0 auto var(--space-12); text-align: center; }
.cw__eyebrow { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.cw__title { margin: 0; font-size: clamp(34px, 4.4vw, 56px); font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong); }
.cw__sub { margin: var(--space-5) 0 0; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }

.cw__selector { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; max-width: 1000px; margin: 0 auto var(--space-12); }
.cw__chip { padding: 7px 14px; border-radius: var(--radius-pill); background: transparent; border: 1px solid var(--color-border); font-size: 12px; font-weight: var(--weight-medium); color: var(--color-text-secondary); cursor: pointer; transition: all var(--motion-medium) var(--ease-smooth); }
.cw__chip:hover { border-color: var(--color-accent); color: var(--color-ink-strong); }
.cw__chip.is-on { background: var(--color-ink-strong); color: #fff; border-color: var(--color-ink-strong); }

.cw__flow { display: flex; align-items: center; gap: var(--space-3); justify-content: center; flex-wrap: wrap; max-width: 1180px; margin: 0 auto; }
.cw__stage { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 14px 18px; border-radius: var(--radius-md); background: #fff; border: 1px solid var(--color-border); box-shadow: 0 4px 14px rgba(16, 42, 91, 0.05); animation: cw-reveal 0.4s var(--ease-out) backwards; }
.cw__stage:nth-child(1) { animation-delay: 0s; }
.cw__stage:nth-child(3) { animation-delay: 0.06s; }
.cw__stage:nth-child(5) { animation-delay: 0.12s; }
.cw__stage:nth-child(7) { animation-delay: 0.18s; }
.cw__stage:nth-child(9) { animation-delay: 0.24s; }
.cw__stage:nth-child(11) { animation-delay: 0.3s; }
@keyframes cw-reveal { from { opacity: 0; transform: translateY(8px); } }
.cw__stage--start { background: var(--color-ink-strong); color: #fff; border-color: var(--color-ink-strong); }
.cw__stage--start .cw__dot { background: #fff; border-color: #fff; }
.cw__stage--end { background: var(--color-accent); color: #fff; border-color: var(--color-accent); }
.cw__stage--end .cw__dot { background: #fff; border-color: #fff; }
.cw__dot { width: 10px; height: 10px; border-radius: 50%; background: var(--color-accent); border: 2px solid var(--color-accent); }
.cw__label { font-size: 12px; font-weight: var(--weight-semibold); white-space: nowrap; }
.cw__arrow { color: var(--color-text-faint); font-size: 14px; }

.cw__packets { max-width: 1180px; margin: var(--space-8) auto 0; height: 2px; position: relative; }
.cw__rail { position: absolute; inset: 0; width: 100%; height: 100%; }
.cw__line { stroke: var(--color-accent); stroke-width: 0.5; vector-effect: non-scaling-stroke; opacity: 0.2; stroke-dasharray: 2 3; animation: cw-dash 5s linear infinite; }
@keyframes cw-dash { to { stroke-dashoffset: -40; } }
.cw__packet { fill: var(--color-accent); animation: cw-flow 4s linear infinite; }
@keyframes cw-flow { from { offset-distance: 0%; } to { offset-distance: 100%; } }
@media (max-width: 768px) { .cw__arrow { transform: rotate(90deg); } }
@media (prefers-reduced-motion: reduce) { .cw__line, .cw__packet, .cw__stage { animation: none; } }
</style>