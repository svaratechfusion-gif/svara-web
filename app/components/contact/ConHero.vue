<script setup lang="ts">
// CONTACT · Hero — an enterprise collaboration network: SVARA at the centre,
// connected to the seven collaboration constituencies, with data flowing
// between them. Hero copy verbatim from Volume 12 (contactContent):
// aiAnswerTarget as the statement, canonicalDefinition as support.
import { contactContent } from '~~/lib/content/contact'

const CENTER = { x: 50, y: 50 }
const parties = ['Enterprise', 'Strategic Partners', 'Investors', 'Governments', 'Researchers', 'Startups', 'Media']
const nodes = parties.map((label, i) => {
  const theta = -Math.PI / 2 + (i / parties.length) * Math.PI * 2
  const x = +(CENTER.x + 40 * Math.cos(theta)).toFixed(2)
  const y = +(CENTER.y + 40 * Math.sin(theta)).toFixed(2)
  return { label, x, y, path: `M${x} ${y} L${CENTER.x} ${CENTER.y}`, i }
})
// aiAnswerTarget carries markdown emphasis (**Contact SVARA**) — strip it
const statement = contactContent.aiAnswerTarget.replace(/\*\*/g, '')
</script>

<template>
  <section class="chero">
    <div class="chero__copy">
      <p class="chero__eyebrow">Enterprise Collaboration Center</p>
      <h1 class="chero__title" data-split>{{ statement }}</h1>
      <p class="chero__sub">{{ contactContent.canonicalDefinition }}</p>
    </div>

    <div v-reveal class="chero__net" aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <line v-for="n in nodes" :key="`l${n.i}`" class="chero__wire" :x1.attr="n.x" :y1.attr="n.y" :x2.attr="CENTER.x" :y2.attr="CENTER.y" />
        <template v-for="n in nodes" :key="`p${n.i}`">
          <circle r="0.7" class="chero__packet" :style="{ offsetPath: `path('${n.path}')`, animationDelay: `${(-n.i * 0.5).toFixed(2)}s` }" />
          <circle r="0.7" class="chero__packet chero__packet--rev" :style="{ offsetPath: `path('${n.path}')`, animationDelay: `${(-n.i * 0.5 - 2.5).toFixed(2)}s` }" />
        </template>
      </svg>
      <div v-for="n in nodes" :key="n.label" class="chero__node" :style="{ left: n.x + '%', top: n.y + '%' }">
        <span class="chero__node-dot" />{{ n.label }}
      </div>
      <div class="chero__core" :style="{ left: CENTER.x + '%', top: CENTER.y + '%' }">SVARA</div>
    </div>
  </section>
</template>

<style scoped>
.chero {
  min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: calc(var(--nav-height) + var(--space-16)) var(--container-pad) var(--space-24);
  box-sizing: border-box; text-align: center;
}
.chero__copy { max-width: 820px; }
.chero__eyebrow { margin: 0 0 var(--space-6); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: 0.2em; text-transform: uppercase; color: var(--color-accent); }
.chero__title { margin: 0; font-size: clamp(30px, 4.2vw, 58px); font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: #0d1b3e; text-wrap: balance; }
.chero__sub { margin: var(--space-8) auto 0; max-width: 620px; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }

.chero__net { position: relative; width: min(720px, 92vw); aspect-ratio: 1 / 1; margin-top: var(--space-16); }
.chero__net svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.chero__wire { stroke: var(--color-accent); stroke-width: 1; vector-effect: non-scaling-stroke; opacity: 0.32; }
.chero__packet { fill: var(--color-accent); opacity: 0.7; animation: chero-flow 5s linear infinite; }
.chero__packet--rev { animation-direction: reverse; fill: #102A5B; }
@keyframes chero-flow { from { offset-distance: 0%; } to { offset-distance: 100%; } }
.chero__node {
  position: absolute; transform: translate(-50%, -50%);
  display: inline-flex; align-items: center; gap: 7px;
  padding: 8px 14px; border-radius: var(--radius-pill);
  background: var(--color-bg); border: 1px solid var(--color-border); box-shadow: var(--shadow-soft);
  font-size: var(--type-caption); font-weight: var(--weight-medium); color: #0d1b3e; white-space: nowrap;
}
.chero__node-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--color-accent); }
.chero__core {
  position: absolute; transform: translate(-50%, -50%);
  width: 108px; height: 108px; border-radius: 50%; display: grid; place-items: center;
  background: #102A5B; color: #fff; font-size: 18px; font-weight: var(--weight-extrabold); letter-spacing: -0.02em;
  box-shadow: 0 16px 44px rgba(16, 42, 91, 0.26);
}
@media (max-width: 620px) {
  .chero__node { font-size: 10px; padding: 6px 10px; }
}
@media (prefers-reduced-motion: reduce) { .chero__packet { display: none; } }
</style>
