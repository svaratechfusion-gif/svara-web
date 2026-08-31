<script setup lang="ts">
// SECURITY & ARCHITECTURE — Zero Trust, Encryption, Governance, Identity,
// Compliance, and Monitoring represented as one connected security layer
// wrapping the SVARA Core. Motion represents continuous monitoring and
// policy enforcement, not decoration. Layer names are factual security
// domains (not marketing copy).
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { gsap, ScrollTrigger } from '~~/lib/gsap'
import { SECURITY_LAYERS } from '~/utils/technology'

const root = ref<HTMLElement>()
const triggers: ScrollTrigger[] = []

const NODES = SECURITY_LAYERS.map((name, i) => {
  const a = (i / SECURITY_LAYERS.length) * Math.PI * 2 - Math.PI / 2
  return { name, x: 50 + Math.cos(a) * 40, y: 50 + Math.sin(a) * 40 }
})

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  gsap.set('.sa-rise', { opacity: 0, y: 36 })
  triggers.push(ScrollTrigger.create({
    trigger: root.value!, start: 'top 65%', once: true,
    onEnter: () => gsap.to('.sa-rise', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 }),
  }))
})
onBeforeUnmount(() => { triggers.forEach(t => t.kill()) })
</script>

<template>
  <section ref="root" class="sa">
    <div class="sa__head sa-rise">
      <p class="sa__eyebrow">Security & Architecture</p>
      <h2 class="sa__title">One connected security layer.</h2>
      <p class="sa__sub">Security is not bolted on — Zero Trust, Encryption, Governance, Identity, Compliance, and Monitoring form one continuous security layer beneath every SVARA capability.</p>
    </div>

    <div class="sa__viz sa-rise" aria-hidden="true">
      <svg class="sa__wires" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line v-for="n in NODES" :key="`w${n.name}`" x1="50" y1="50" :x2.attr="n.x" :y2.attr="n.y" class="sa__wire" />
        <circle
v-for="n in NODES" :key="`p${n.name}`" r="0.6" class="sa__packet"
          :style="{ offsetPath: `path('M50 50 L${n.x} ${n.y}')` }" />
      </svg>
      <div class="sa__core">
        <span class="sa__core-ring" />
        <span class="sa__core-label">SVARA Core</span>
      </div>
      <div v-for="n in NODES" :key="n.name" class="sa__node" :style="{ left: n.x + '%', top: n.y + '%' }">
        <span class="sa__node-dot" />
        <span class="sa__node-name">{{ n.name }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sa { background: #F8FBFF; padding: var(--space-32) var(--container-pad); }
.sa__head { max-width: 760px; margin: 0 auto var(--space-20); text-align: center; }
.sa__eyebrow { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.sa__title { margin: 0 0 var(--space-5); font-size: clamp(34px, 4.4vw, 56px); font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong); }
.sa__sub { margin: 0; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }

.sa__viz { position: relative; width: min(620px, 88vw); aspect-ratio: 1; margin: var(--space-16) auto 0; }
.sa__wires { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.sa__wire { stroke: var(--color-ink-strong); stroke-width: 0.5; vector-effect: non-scaling-stroke; opacity: 0.18; stroke-dasharray: 2 3; animation: sa-dash 6s linear infinite; }
@keyframes sa-dash { to { stroke-dashoffset: -40; } }
.sa__packet { fill: var(--color-accent); opacity: 0.5; animation: sa-flow 3.6s linear infinite; }
@keyframes sa-flow { from { offset-distance: 0%; } to { offset-distance: 100%; } }

.sa__core { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); z-index: 3; padding: 16px 26px; border-radius: var(--radius-pill); background: var(--color-ink-strong); color: #fff; box-shadow: 0 20px 56px rgba(16, 42, 91, 0.22); }
.sa__core-ring { position: absolute; inset: -8px; border-radius: var(--radius-pill); border: 1px solid var(--color-accent); opacity: 0.4; animation: sa-pulse 2.4s ease-in-out infinite; }
@keyframes sa-pulse { 0%,100% { transform: scale(1); opacity: 0.4; } 50% { transform: scale(1.06); opacity: 0.1; } }
.sa__core-label { position: relative; z-index: 1; font-size: 14px; font-weight: var(--weight-semibold); }

.sa__node { position: absolute; transform: translate(-50%, -50%); z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 6px; }
.sa__node-dot { width: 9px; height: 9px; border-radius: 50%; background: #fff; border: 2px solid var(--color-accent); box-shadow: 0 0 0 4px rgba(47, 127, 230, 0.12); animation: sa-blink 2s ease-in-out infinite alternate; }
@keyframes sa-blink { 0% { box-shadow: 0 0 0 4px rgba(47,127,230,0.12); } 100% { box-shadow: 0 0 0 6px rgba(47,127,230,0.2); } }
.sa__node-name { font-size: 11.5px; font-weight: var(--weight-semibold); color: var(--color-ink-strong); white-space: nowrap; padding: 4px 10px; background: rgba(255,255,255,0.85); backdrop-filter: blur(8px); border: 1px solid var(--color-border); border-radius: var(--radius-pill); }

@media (max-width: 768px) {
  .sa__viz { width: 100%; aspect-ratio: auto; display: flex; flex-direction: column; gap: var(--space-4); }
  .sa__wires { display: none; }
  .sa__core { position: static; transform: none; margin: 0 auto var(--space-6); }
  .sa__node { position: static; transform: none; flex-direction: row; }
}
@media (prefers-reduced-motion: reduce) { .sa__wire, .sa__packet, .sa__core-ring, .sa__node-dot { animation: none; } }
</style>