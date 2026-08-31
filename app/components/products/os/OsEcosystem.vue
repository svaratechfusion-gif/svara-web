<script setup lang="ts">
// OS · ENTERPRISE INTELLIGENCE PLATFORM + ECOSYSTEM OVERVIEW — the ten products
// around one SVARA core (connected = cross-product integration), plus the
// Intelligence Loop. Content from the corporate profile (portfolio + Chapter 04).
import { computed } from 'vue'
import { SVARA_OS } from '~/utils/svara-os'

const loop = ['Observe', 'Understand', 'Predict', 'Act', 'Learn']
const nodes = computed(() => SVARA_OS.map((p, i) => {
  const a = (i / SVARA_OS.length) * Math.PI * 2 - Math.PI / 2
  return { short: p.short, x: 50 + Math.cos(a) * 40, y: 50 + Math.sin(a) * 40, i }
}))
</script>

<template>
  <section class="oe">
    <div class="oe__inner">
      <header v-reveal class="oe__head">
        <p class="oe__eyebrow px-mono">Enterprise Intelligence Platform</p>
        <h2 class="oe__title">Ten platforms. <span class="px-serif">One intelligence backbone.</span></h2>
        <p class="oe__lead">Each platform solves a specialised business challenge. Together they form a unified enterprise intelligence ecosystem — sharing one architecture, one AI backbone, one security framework and one operational philosophy: observe, understand, predict, act, improve.</p>
      </header>

      <div v-reveal="{ delay: 0.08 }" class="oe__viz">
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <g stroke="var(--px-line)" stroke-width="0.4">
            <line v-for="nd in nodes" :key="`l${nd.i}`" x1="50" y1="50" :x2="nd.x" :y2="nd.y" />
          </g>
          <g v-for="nd in nodes" :key="`s${nd.i}`">
            <circle r="0.7" fill="var(--px-blue)"><animateMotion :dur="`${3 + (nd.i % 4)}s`" :begin="`${nd.i * 0.35}s`" repeatCount="indefinite" :path="`M${nd.x} ${nd.y} L50 50`" /></circle>
          </g>
          <g v-for="nd in nodes" :key="`n${nd.i}`">
            <circle :cx="nd.x" :cy="nd.y" r="2.4" fill="#fff" stroke="var(--px-navy)" stroke-width="0.6" />
          </g>
          <circle class="oe__ring" cx="50" cy="50" r="14" fill="none" stroke="var(--px-blue)" stroke-width="0.4" opacity="0.5" />
          <circle cx="50" cy="50" r="10" fill="var(--px-navy)" />
          <text x="50" y="49" text-anchor="middle" font-size="3" fill="#fff" font-family="var(--font-mono)" letter-spacing="0.4">SVARA</text>
          <text x="50" y="53" text-anchor="middle" font-size="2.2" fill="rgba(255,255,255,0.6)" font-family="var(--font-mono)">CORE</text>
        </svg>
        <ul class="oe__legend">
          <li v-for="nd in nodes" :key="`lg${nd.i}`"><span class="oe__legend-n hx-mono">{{ String(nd.i + 1).padStart(2, '0') }}</span>{{ nd.short }}</li>
        </ul>
      </div>

      <div v-reveal="{ delay: 0.12 }" class="oe__loop">
        <span class="oe__loop-lbl px-mono">The Intelligence Loop</span>
        <div class="oe__loop-row">
          <template v-for="(l, i) in loop" :key="l">
            <span class="oe__loop-step">{{ l }}</span>
            <span v-if="i < loop.length - 1" class="oe__loop-arrow" aria-hidden="true">→</span>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.oe { padding: clamp(72px, 10vw, 130px) 24px; }
.oe__inner { max-width: 1140px; margin: 0 auto; }
.oe__head { max-width: 62ch; margin-bottom: clamp(40px, 5vw, 64px); }
.oe__eyebrow { margin: 0 0 14px; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--px-muted); }
.oe__title { margin: 0; font-size: clamp(28px, 4.2vw, 50px); line-height: 1.06; letter-spacing: -0.025em; color: var(--px-navy); font-weight: 500; }
.oe__title .px-serif { font-weight: 400; }
.oe__lead { margin: 20px 0 0; max-width: 60ch; font-size: clamp(15px, 1.4vw, 17px); line-height: 1.6; color: var(--px-ink); }

.oe__viz { display: grid; grid-template-columns: 1fr; gap: 32px; align-items: center; }
@media (min-width: 860px) { .oe__viz { grid-template-columns: 1.1fr 0.9fr; gap: 56px; } }
.oe__viz svg { width: 100%; max-width: 520px; margin: 0 auto; aspect-ratio: 1; display: block; }
.oe__ring { transform-origin: 50px 50px; animation: oe-spin 40s linear infinite; }
@keyframes oe-spin { to { transform: rotate(360deg); } }
.oe__legend { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 12px 20px; }
.oe__legend li { display: flex; align-items: center; gap: 10px; font-size: 14px; font-weight: 500; color: var(--px-navy); }
.oe__legend-n { font-size: 11px; color: var(--px-blue); }

.oe__loop { margin-top: clamp(48px, 6vw, 72px); padding-top: 32px; border-top: 1px solid var(--px-line); text-align: center; }
.oe__loop-lbl { display: block; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--px-muted); margin-bottom: 18px; }
.oe__loop-row { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 12px 18px; }
.oe__loop-step { font-size: clamp(16px, 2vw, 24px); font-weight: 500; letter-spacing: -0.01em; color: var(--px-navy); }
.oe__loop-arrow { color: var(--px-blue); font-size: 18px; }
@media (prefers-reduced-motion: reduce) { .oe__ring { animation: none; } }
</style>
