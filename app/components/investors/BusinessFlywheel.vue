<script setup lang="ts">
// BUSINESS FLYWHEEL — animated ecosystem showing compounding growth:
// Digital Engineering → Enterprise Clients → SaaS → AI Platforms →
// Recurring Revenue → R&D → Better Products → More Clients. Continuous
// circular motion illustrates the compounding loop. Motion represents
// compounding growth and recurring value creation, not decoration.
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { flywheelStages } from '~/utils/investors'

const root = ref<HTMLElement>()
let observer: IntersectionObserver | null = null

const NODES = flywheelStages.map((stage, i) => {
  const a = (i / flywheelStages.length) * Math.PI * 2 - Math.PI / 2
  return { stage, i, x: 50 + Math.cos(a) * 40, y: 50 + Math.sin(a) * 40, a }
})

function start() { /* visual on-scroll activation */ }
function stop() { /* visual deactivation */ }

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  observer = new IntersectionObserver(([e]) => { if (e?.isIntersecting) start(); else stop() }, { threshold: 0.25 })
  if (root.value) observer.observe(root.value)
})
onBeforeUnmount(() => { observer?.disconnect() })
</script>

<template>
  <section ref="root" class="bf">
    <div class="bf__head">
      <p class="bf__eyebrow">Business Flywheel</p>
      <h2 class="bf__title">Compounding growth, by design.</h2>
      <p class="bf__sub">Each turn of the flywheel strengthens the next — engineering delivers value to enterprise clients, clients fund recurring revenue, revenue funds R&D, R&D builds better products, and better products win more clients.</p>
    </div>

    <div class="bf__viz" aria-hidden="true">
      <svg class="bf__ring" viewBox="0 0 100 100" preserveAspectRatio="none">
        <circle cx="50" cy="50" r="40" class="bf__track" />
        <circle v-for="(n, i) in NODES" :key="`p${i}`" r="0.7" class="bf__packet" :style="{ offsetPath: `path('M${n.x} ${n.y} L${NODES[(i + 1) % NODES.length]!.x} ${NODES[(i + 1) % NODES.length]!.y}')`, animationDelay: `${(-i * 0.3).toFixed(2)}s` }" />
      </svg>
      <div class="bf__core">
        <span class="bf__core-label">Compounding</span>
        <span class="bf__core-tag">Growth Loop</span>
      </div>
      <div v-for="n in NODES" :key="`n${n.i}`" class="bf__node" :style="{ left: n.x + '%', top: n.y + '%' }">
        <span class="bf__node-num">{{ String(n.i + 1).padStart(2, '0') }}</span>
        <span class="bf__node-name">{{ n.stage }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bf { background: #F8FBFF; padding: var(--space-32) var(--container-pad); }
.bf__head { max-width: 760px; margin: 0 auto var(--space-16); text-align: center; }
.bf__eyebrow { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.bf__title { margin: 0; font-size: clamp(34px, 4.4vw, 56px); font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong); }
.bf__sub { margin: var(--space-5) 0 0; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }

.bf__viz { position: relative; width: min(580px, 88vw); aspect-ratio: 1; margin: var(--space-16) auto 0; }
.bf__ring { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.bf__track { fill: none; stroke: rgba(16, 42, 91, 0.12); stroke-width: 0.4; vector-effect: non-scaling-stroke; }
.bf__packet { fill: var(--color-accent); opacity: 0.6; animation: bf-flow 2.8s linear infinite; }
@keyframes bf-flow { from { offset-distance: 0%; } to { offset-distance: 100%; } }

.bf__core { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); z-index: 3; padding: 18px 28px; border-radius: 50%; background: var(--color-ink-strong); color: #fff; box-shadow: 0 20px 56px rgba(16, 42, 91, 0.22); text-align: center; }
.bf__core-label { display: block; font-size: 16px; font-weight: var(--weight-extrabold); letter-spacing: -0.02em; }
.bf__core-tag { display: block; font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.6; margin-top: 4px; }

.bf__node { position: absolute; transform: translate(-50%, -50%); z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 8px 14px; border-radius: var(--radius-pill); background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(10px); border: 1px solid var(--color-border); box-shadow: 0 6px 18px rgba(16, 42, 91, 0.08); white-space: nowrap; animation: bf-float 7s ease-in-out infinite; }
.bf__node:nth-child(odd) { animation-duration: 9s; animation-delay: -2s; }
.bf__node-num { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.1em; color: var(--color-accent); }
.bf__node-name { font-size: 11.5px; font-weight: var(--weight-semibold); color: var(--color-ink-strong); }
@keyframes bf-float { 0%,100% { transform: translate(-50%, -50%); } 50% { transform: translate(-50%, calc(-50% - 5px)); } }

@media (max-width: 768px) { .bf__viz { width: 100%; aspect-ratio: auto; display: flex; flex-direction: column; gap: var(--space-4); } .bf__ring { display: none; } .bf__core { position: static; transform: none; margin: 0 auto var(--space-6); border-radius: var(--radius-pill); } .bf__node { position: static; transform: none; flex-direction: row; } }
@media (prefers-reduced-motion: reduce) { .bf__packet, .bf__node { animation: none; } }
</style>