<script setup lang="ts">
// ECOSYSTEM · Intelligence Backbone — the central SVARA Core connected to the
// six specialized divisions, with data flowing between them. Copy verbatim
// from the Content Bible (homeSection04): title, paragraphs and the six
// division names.
import { homeSection04 } from '~~/lib/content/home'

const CENTER = { x: 50, y: 50 }
const divisions = homeSection04.divisions.map((name, i) => {
  const theta = -Math.PI / 2 + (i / homeSection04.divisions.length) * Math.PI * 2
  const x = +(CENTER.x + 40 * Math.cos(theta)).toFixed(2)
  const y = +(CENTER.y + 40 * Math.sin(theta)).toFixed(2)
  return { name, x, y, path: `M${x} ${y} L${CENTER.x} ${CENTER.y}`, i }
})
</script>

<template>
  <section class="eback">
    <div class="eback__inner">
      <div class="eback__copy">
        <p v-reveal class="eback__eyebrow">The Backbone</p>
        <h2 v-reveal class="eback__title" data-split>{{ homeSection04.title }}</h2>
        <p v-for="(para, i) in homeSection04.paragraphs" :key="i" v-reveal="{ delay: 0.05 * i }" class="eback__para">{{ para }}</p>
      </div>

      <div v-reveal class="eback__viz" aria-hidden="true">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <line v-for="d in divisions" :key="`l${d.i}`" class="eback__wire" :x1.attr="d.x" :y1.attr="d.y" :x2.attr="CENTER.x" :y2.attr="CENTER.y" />
          <template v-for="d in divisions" :key="`p${d.i}`">
            <circle r="0.8" class="eback__packet" :style="{ offsetPath: `path('${d.path}')`, animationDelay: `${(-d.i * 0.4).toFixed(2)}s` }" />
            <circle r="0.8" class="eback__packet eback__packet--rev" :style="{ offsetPath: `path('${d.path}')`, animationDelay: `${(-d.i * 0.4 - 2).toFixed(2)}s` }" />
          </template>
        </svg>
        <div v-for="d in divisions" :key="d.name" class="eback__div" :style="{ left: d.x + '%', top: d.y + '%' }">
          <span class="eback__div-dot" />{{ d.name }}
        </div>
        <div class="eback__core" :style="{ left: CENTER.x + '%', top: CENTER.y + '%' }">
          <span class="eback__core-mark">SVARA</span><span class="eback__core-sub">Core</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.eback { padding-block: var(--section-y); }
.eback__inner {
  max-width: var(--container-max); margin-inline: auto; padding-inline: var(--container-pad);
  display: grid; grid-template-columns: 5fr 7fr; gap: var(--gap-section); align-items: center; box-sizing: border-box;
}
.eback__eyebrow { margin: 0 0 var(--space-6); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.eback__title { margin: 0 0 var(--space-8); font-size: clamp(28px, 3.4vw, 48px); font-weight: var(--weight-bold); line-height: 1.12; letter-spacing: -0.02em; color: #0d1b3e; }
.eback__para { margin: 0 0 var(--space-5); max-width: 52ch; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }

.eback__viz { position: relative; aspect-ratio: 1 / 1; }
.eback__viz svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.eback__wire { stroke: var(--color-accent); stroke-width: 1; vector-effect: non-scaling-stroke; opacity: 0.35; }
.eback__packet { fill: var(--color-accent); opacity: 0.7; animation: eback-flow 4s linear infinite; }
.eback__packet--rev { animation-direction: reverse; fill: #102A5B; }
@keyframes eback-flow { from { offset-distance: 0%; } to { offset-distance: 100%; } }
.eback__div {
  position: absolute; transform: translate(-50%, -50%);
  display: inline-flex; align-items: center; gap: 8px;
  padding: 9px 14px; border-radius: var(--radius-pill);
  background: var(--color-bg); border: 1px solid var(--color-border); box-shadow: var(--shadow-soft);
  font-size: var(--type-caption); font-weight: var(--weight-medium); color: #0d1b3e; white-space: nowrap; text-align: center;
}
.eback__div-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--color-accent); flex-shrink: 0; }
.eback__core {
  position: absolute; transform: translate(-50%, -50%);
  width: 128px; height: 128px; border-radius: 50%;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px;
  background: #102A5B; color: #fff; box-shadow: 0 18px 48px rgba(16, 42, 91, 0.28);
}
.eback__core-mark { font-size: 18px; font-weight: var(--weight-extrabold); letter-spacing: -0.02em; }
.eback__core-sub { font-family: var(--font-mono); font-size: 9px; letter-spacing: var(--tracking-label); text-transform: uppercase; opacity: 0.7; }

@media (max-width: 900px) {
  .eback__inner { grid-template-columns: 1fr; gap: var(--space-16); }
  .eback__viz { max-width: 460px; margin-inline: auto; width: 100%; }
}
@media (prefers-reduced-motion: reduce) { .eback__packet { display: none; } }
</style>
