<script setup lang="ts">
// SECTION 01 — "The Future Demands More Than Software."
// Large typography left; interactive visualization right: the fragmentation
// terms named in the section copy as disconnected glass nodes with broken
// links. Design + interaction unchanged; copy from the Content Bible.
import { homeSection01 } from '~~/lib/content/home'

// node coordinates keyed to the Bible fragmentation terms
const positions = [{ x: 18, y: 16 }, { x: 70, y: 24 }, { x: 34, y: 70 }]
const fragments = homeSection01.fragments.map((label, i) => ({ label, ...positions[i] }))

// broken links (never touching — the point)
const links = [
  { x1: 30, y1: 22, x2: 62, y2: 26 },
  { x1: 66, y1: 34, x2: 44, y2: 64 },
  { x1: 30, y1: 62, x2: 26, y2: 30 },
]
</script>

<template>
  <section class="problem">
    <div class="problem__inner">
      <div class="problem__copy">
        <p v-reveal class="problem__eyebrow">Section 01</p>
        <h2 class="problem__title" data-split>{{ homeSection01.title }}</h2>
        <p v-for="(p, i) in homeSection01.paragraphs" :key="i" v-reveal="{ delay: 0.08 + i * 0.05 }" class="problem__sub">{{ p }}</p>
      </div>

      <div v-reveal class="problem__viz" :aria-label="`Fragmented systems: ${homeSection01.fragments.join(', ')}`">
        <svg class="problem__links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <line v-for="(l, i) in links" :key="i" :x1="l.x1" :y1="l.y1" :x2="l.x2" :y2="l.y2" />
        </svg>
        <button v-for="f in fragments" :key="f.label" class="problem__node" :style="{ left: f.x + '%', top: f.y + '%' }" type="button">
          <span class="problem__node-dot" aria-hidden="true" />
          {{ f.label }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.problem { background: var(--color-surface); border-block: 1px solid var(--color-border); }
.problem__inner {
  max-width: var(--container-max);
  margin-inline: auto;
  padding: var(--section-y) var(--container-pad);
  display: grid;
  grid-template-columns: 6fr 6fr;
  gap: var(--gap-section);
  align-items: center;
  box-sizing: border-box;
}
.problem__eyebrow {
  margin: 0 0 var(--space-6);
  font-family: var(--font-mono); font-size: var(--type-label);
  letter-spacing: var(--tracking-label); text-transform: uppercase;
  color: var(--color-accent);
}
.problem__title {
  margin: 0 0 var(--space-6);
  font-size: clamp(34px, 4.4vw, 64px);
  font-weight: var(--weight-bold); line-height: 1.12; letter-spacing: -0.02em;
  color: var(--color-text); text-wrap: balance;
}
.problem__sub {
  margin: 0 0 var(--space-6);
  max-width: var(--paragraph-max);
  font-size: var(--type-body); line-height: var(--leading-body);
  color: var(--color-text-secondary);
}
.problem__sub:last-child { margin-bottom: 0; }

.problem__viz {
  position: relative;
  aspect-ratio: 5 / 4;
}
.problem__links {
  position: absolute; inset: 0; width: 100%; height: 100%;
}
.problem__links line {
  stroke: var(--color-text-faint);
  stroke-width: 1px;
  vector-effect: non-scaling-stroke;
  stroke-dasharray: 5 9; /* broken on purpose */
  opacity: 0.55;
  transition: opacity var(--motion-medium) var(--ease-smooth);
}
.problem__node {
  position: absolute;
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(var(--blur-nav));
  -webkit-backdrop-filter: blur(var(--blur-nav));
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-soft);
  font-family: var(--font-mono);
  font-size: var(--type-caption);
  letter-spacing: 0.03em;
  color: var(--color-text);
  cursor: default;
  transition: opacity var(--motion-medium) var(--ease-smooth),
              transform var(--motion-medium) var(--ease-smooth),
              border-color var(--motion-medium) var(--ease-smooth);
}
.problem__node-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--color-text-faint);
  transition: background var(--motion-medium) var(--ease-smooth);
}
/* isolation on hover: the hovered fragment sharpens, everything else dims */
.problem__viz:hover .problem__node { opacity: 0.35; }
.problem__viz:hover .problem__links line { opacity: 0.18; }
.problem__viz .problem__node:hover {
  opacity: 1;
  transform: translateY(-2px);
  border-color: var(--color-border-strong);
}
.problem__node:hover .problem__node-dot { background: var(--color-negative, #cc0000); }
.problem__node:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }

@media (max-width: 900px) {
  .problem__inner { grid-template-columns: 1fr; gap: var(--space-12); }
  .problem__viz { aspect-ratio: 4 / 3; }
  .problem__node { font-size: 11px; padding: var(--space-2) var(--space-4); }
}
@media (prefers-reduced-motion: reduce) {
  .problem__node, .problem__links line, .problem__node-dot { transition: none; }
}
</style>
