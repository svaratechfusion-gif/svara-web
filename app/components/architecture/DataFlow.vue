<script setup lang="ts">
// DATA FLOW — animate enterprise data: Camera → Vision AI → AI Agent →
// Decision → Business Cloud → Executive Dashboard. Continuous packet
// movement represents data movement through the architecture, not
// decoration. Stage descriptions are factual workflow stage names.
import { onMounted, ref } from 'vue'
import { DATA_FLOW } from '~/utils/architecture'

const root = ref<HTMLElement>()

onMounted(() => {})
</script>

<template>
  <section ref="root" class="df">
    <div class="df__head">
      <p class="df__eyebrow">Data Flow</p>
      <h2 class="df__title">From sensor to executive — continuously.</h2>
      <p class="df__sub">Enterprise data flows through every layer as one continuous stream — captured, interpreted, decided, synchronized, and surfaced in real time.</p>
    </div>

    <div class="df__board">
      <div class="df__nodes">
        <div
          v-for="(n, i) in DATA_FLOW" :key="n"
          class="df__node"
          :class="{ 'is-last': i === DATA_FLOW.length - 1 }"
        >
          <span class="df__node-dot" />
          <span class="df__node-name">{{ n }}</span>
        </div>
      </div>

      <svg class="df__rail" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <line x1="4" y1="50" x2="96" y2="50" class="df__line" />
        <circle r="0.9" class="df__packet" :style="{ offsetPath: `path('M4 50 L96 50')` }" />
      </svg>

      <!-- edge labels for the flow direction -->
      <div class="df__labels">
        <span>capture</span><span>interpret</span><span>decide</span><span>act</span><span>sync</span><span>surface</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.df { background: #F8FBFF; padding: var(--space-32) var(--container-pad); }
.df__head { max-width: 760px; margin: 0 auto var(--space-20); text-align: center; }
.df__eyebrow { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.df__title { margin: 0 0 var(--space-5); font-size: clamp(34px, 4.4vw, 56px); font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong); }
.df__sub { margin: 0; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }

.df__board { position: relative; max-width: 1180px; margin: var(--space-16) auto 0; }
.df__nodes { position: relative; z-index: 2; display: flex; align-items: center; justify-content: space-between; }
.df__node { position: relative; display: flex; flex-direction: column; align-items: center; gap: 10px; }
.df__node-dot { width: 16px; height: 16px; border-radius: 50%; background: #fff; border: 2px solid var(--color-accent); box-shadow: 0 0 0 5px rgba(47, 127, 230, 0.12); animation: df-pulse 2.4s ease-in-out infinite alternate; }
.df__node:nth-child(even) .df__node-dot { animation-delay: -1.2s; }
.df__node.is-last .df__node-dot { background: var(--color-ink-strong); border-color: var(--color-ink-strong); }
.df__node-name { font-size: 13px; font-weight: var(--weight-semibold); color: var(--color-ink-strong); white-space: nowrap; }
.df__node.is-last .df__node-name { color: var(--color-accent); font-weight: var(--weight-bold); }
@keyframes df-pulse { 0% { box-shadow: 0 0 0 5px rgba(47,127,230,0.12); } 100% { box-shadow: 0 0 0 9px rgba(47,127,230,0.04); } }

.df__rail { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1; }
.df__line { stroke: var(--color-ink-strong); stroke-width: 1; vector-effect: non-scaling-stroke; opacity: 0.18; stroke-dasharray: 3 3; animation: df-dash 5s linear infinite; }
@keyframes df-dash { to { stroke-dashoffset: -40; } }
.df__packet { fill: var(--color-accent); animation: df-flow 4s linear infinite; }
@keyframes df-flow { from { offset-distance: 0%; } to { offset-distance: 100%; } }

.df__labels { display: flex; justify-content: space-between; margin-top: var(--space-12); font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-text-faint); }
.df__labels span { flex: 1; text-align: center; }

@media (max-width: 768px) { .df__nodes { flex-direction: column; gap: var(--space-5); align-items: flex-start; } .df__rail { display: none; } .df__labels { display: none; } }
@media (prefers-reduced-motion: reduce) { .df__node-dot, .df__line, .df__packet { animation: none; } }
</style>