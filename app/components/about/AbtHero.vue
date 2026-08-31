<script setup lang="ts">
// ABOUT · Hero — a subtle intelligence-core visualization representing SVARA's
// PURPOSE (the Intelligence Loop), not its products: a central core encircled
// by the five loop capabilities, quietly orbiting. Hero copy is sourced from
// Volume 08 (companyContent): aiAnswerTarget as the statement (trimmed at the
// em-dash for hero brevity), the remainder of canonicalDefinition as support.
import { companyContent } from '~~/lib/content/company'

const statement = companyContent.aiAnswerTarget.replace(/\*\*/g, '').split(' — ')[0] + '.'

// The five Intelligence Loop capabilities, placed around the core (positions
// computed like the divisions network so they sit on the outer ring reliably).
const CENTER = { x: 50, y: 50 }
const R = 42
const loop = ['Observe', 'Understand', 'Predict', 'Coordinate', 'Improve']
const capNodes = loop.map((label, i) => {
  const theta = -Math.PI / 2 + (i / loop.length) * Math.PI * 2
  const x = +(CENTER.x + R * Math.cos(theta)).toFixed(2)
  const y = +(CENTER.y + R * Math.sin(theta)).toFixed(2)
  return { label, x, y }
})
</script>

<template>
  <section class="ahero">
    <div class="ahero__copy">
      <p class="ahero__eyebrow">About SVARA</p>
      <h1 class="ahero__title" data-split>{{ statement }}</h1>
      <p class="ahero__sub">A connected system of sensing, reasoning, prediction, orchestration, and learning — built to transform fragmented enterprise data into continuously improving operational intelligence.</p>
    </div>

    <div v-reveal class="ahero__core" aria-hidden="true">
      <span class="ahero__ring ahero__ring--1" />
      <span class="ahero__ring ahero__ring--2" />
      <span class="ahero__ring ahero__ring--3" />
      <span class="ahero__nucleus">SVARA</span>
      <span
        v-for="c in capNodes" :key="c.label"
        class="ahero__cap"
        :style="{ left: c.x + '%', top: c.y + '%' }"
      >{{ c.label }}</span>
    </div>
  </section>
</template>

<style scoped>
.ahero {
  min-height: 100vh;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: calc(var(--nav-height) + var(--space-16)) var(--container-pad) var(--space-24);
  box-sizing: border-box; text-align: center;
}
.ahero__copy { max-width: 860px; }
.ahero__eyebrow { margin: 0 0 var(--space-6); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: 0.2em; text-transform: uppercase; color: var(--color-accent); }
.ahero__title { margin: 0; font-size: clamp(30px, 4.4vw, 60px); font-weight: var(--weight-bold); line-height: 1.08; letter-spacing: -0.025em; color: #0d1b3e; text-wrap: balance; }
.ahero__sub { margin: var(--space-8) auto 0; max-width: 640px; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }

/* intelligence core */
.ahero__core {
  position: relative; margin-top: var(--space-16);
  width: min(520px, 84vw); aspect-ratio: 1 / 1;
  display: grid; place-items: center;
}
.ahero__ring {
  position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
  border-radius: 50%; border: 1px solid rgba(47, 127, 230, 0.18);
}
.ahero__ring--1 { width: 34%; height: 34%; }
.ahero__ring--2 { width: 64%; height: 64%; border-color: rgba(47, 127, 230, 0.13); }
.ahero__ring--3 { width: 92%; height: 92%; border-color: rgba(47, 127, 230, 0.08); }
.ahero__nucleus {
  position: relative; z-index: 2;
  width: 118px; height: 118px; border-radius: 50%; display: grid; place-items: center;
  background: #102A5B; color: #fff; font-size: 18px; font-weight: var(--weight-extrabold); letter-spacing: -0.02em;
  box-shadow: 0 20px 50px rgba(16, 42, 91, 0.24);
}
.ahero__nucleus::after {
  content: ''; position: absolute; inset: -10px; border-radius: 50%;
  border: 1px solid rgba(47, 127, 230, 0.35); animation: ahero-pulse 3.4s var(--ease-smooth) infinite;
}
@keyframes ahero-pulse { 0% { transform: scale(1); opacity: 0.5; } 70% { transform: scale(1.35); opacity: 0; } 100% { opacity: 0; } }

/* capability nodes placed on the outer ring */
.ahero__cap {
  position: absolute; transform: translate(-50%, -50%);
  display: inline-flex; align-items: center; white-space: nowrap;
  padding: 7px 13px; border-radius: var(--radius-pill);
  background: var(--color-bg); border: 1px solid var(--color-border); box-shadow: var(--shadow-soft);
  font-size: var(--type-caption); font-weight: var(--weight-medium); color: #0d1b3e;
}
@media (prefers-reduced-motion: reduce) { .ahero__nucleus::after { animation: none; } }
@media (max-width: 560px) { .ahero__cap { font-size: 10px; padding: 5px 9px; } }
</style>
