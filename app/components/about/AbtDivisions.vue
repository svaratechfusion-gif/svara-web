<script setup lang="ts">
// ABOUT · One Company. Six Specialized Divisions — SVARA at the centre with the
// six divisions connected around it, intelligence flowing between them. The six
// division names are verbatim from the Content Bible (homeSection04.divisions).
import { homeSection04 } from '~~/lib/content/home'

const CENTER = { x: 50, y: 50 }
const names = homeSection04.divisions
const nodes = names.map((label, i) => {
  const theta = -Math.PI / 2 + (i / names.length) * Math.PI * 2
  const x = +(CENTER.x + 38 * Math.cos(theta)).toFixed(2)
  const y = +(CENTER.y + 38 * Math.sin(theta)).toFixed(2)
  return { label, x, y, path: `M${x} ${y} L${CENTER.x} ${CENTER.y}`, i }
})
</script>

<template>
  <section class="adiv">
    <div class="adiv__head">
      <p v-reveal class="adiv__eyebrow">One Company</p>
      <h2 v-reveal class="adiv__title" data-split>One company. Six specialized divisions.</h2>
      <p v-reveal class="adiv__sub">Every platform in the SVARA ecosystem is engineered through six specialized technology divisions — deep expertise, one unified intelligence.</p>
    </div>

    <div v-reveal class="adiv__net" aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <line v-for="n in nodes" :key="`l${n.i}`" class="adiv__wire" :x1.attr="n.x" :y1.attr="n.y" :x2.attr="CENTER.x" :y2.attr="CENTER.y" />
        <template v-for="n in nodes" :key="`p${n.i}`">
          <circle r="0.7" class="adiv__packet" :style="{ offsetPath: `path('${n.path}')`, animationDelay: `${(-n.i * 0.6).toFixed(2)}s` }" />
          <circle r="0.7" class="adiv__packet adiv__packet--rev" :style="{ offsetPath: `path('${n.path}')`, animationDelay: `${(-n.i * 0.6 - 3).toFixed(2)}s` }" />
        </template>
      </svg>
      <div v-for="n in nodes" :key="n.label" class="adiv__node" :style="{ left: n.x + '%', top: n.y + '%' }">
        <span class="adiv__node-dot" />{{ n.label }}
      </div>
      <div class="adiv__core" :style="{ left: CENTER.x + '%', top: CENTER.y + '%' }">SVARA</div>
    </div>
  </section>
</template>

<style scoped>
.adiv { padding-block: var(--section-y); }
.adiv__head { max-width: var(--container-max); margin-inline: auto; padding-inline: var(--container-pad); text-align: center; box-sizing: border-box; }
.adiv__eyebrow { margin: 0 0 var(--space-6); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.adiv__title { margin: 0; font-size: clamp(28px, 3.4vw, 48px); font-weight: var(--weight-bold); letter-spacing: -0.02em; color: #0d1b3e; }
.adiv__sub { margin: var(--space-6) auto 0; max-width: 56ch; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }

.adiv__net { position: relative; width: min(720px, 92vw); aspect-ratio: 1 / 1; margin: var(--space-16) auto 0; }
.adiv__net svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.adiv__wire { stroke: var(--color-accent); stroke-width: 1; vector-effect: non-scaling-stroke; opacity: 0.3; }
.adiv__packet { fill: var(--color-accent); opacity: 0.7; animation: adiv-flow 5.5s linear infinite; }
.adiv__packet--rev { animation-direction: reverse; fill: #102A5B; }
@keyframes adiv-flow { from { offset-distance: 0%; } to { offset-distance: 100%; } }
.adiv__node {
  position: absolute; transform: translate(-50%, -50%);
  display: inline-flex; align-items: center; gap: 7px;
  padding: 8px 14px; border-radius: var(--radius-pill);
  background: var(--color-bg); border: 1px solid var(--color-border); box-shadow: var(--shadow-soft);
  font-size: var(--type-caption); font-weight: var(--weight-medium); color: #0d1b3e; white-space: nowrap;
}
.adiv__node-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--color-accent); }
.adiv__core {
  position: absolute; transform: translate(-50%, -50%);
  width: 112px; height: 112px; border-radius: 50%; display: grid; place-items: center;
  background: #102A5B; color: #fff; font-size: 18px; font-weight: var(--weight-extrabold); letter-spacing: -0.02em;
  box-shadow: 0 16px 44px rgba(16, 42, 91, 0.26);
}
@media (max-width: 620px) {
  .adiv__node { font-size: 10px; padding: 6px 10px; }
  .adiv__core { width: 88px; height: 88px; font-size: 15px; }
}
@media (prefers-reduced-motion: reduce) { .adiv__packet { display: none; } }
</style>
