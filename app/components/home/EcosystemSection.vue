<script setup lang="ts">
// SECTION 03 — "One Ecosystem. Ten Enterprise Platforms."
// Full-width visualization: every platform connected through the central
// intelligence layer. Hovering a platform lights it and reveals its
// description. Design + interaction unchanged; the ten platforms and their
// descriptions come from the Content Bible.
import { ref, computed } from 'vue'
import { homeSection03, homePlatforms } from '~~/lib/content/home'

const CENTER = { x: 50, y: 47 }
// distribute the ten platforms evenly around an ellipse
const nodes = homePlatforms.map((p, i) => {
  const theta = (-Math.PI / 2) + (i / homePlatforms.length) * Math.PI * 2
  return {
    id: String(i),
    label: p.name,
    rel: p.description,
    x: +(CENTER.x + 46 * Math.cos(theta)).toFixed(2),
    y: +(CENTER.y + 40 * Math.sin(theta)).toFixed(2),
  }
})

const active = ref<string | null>(null)
const activeNode = computed(() => nodes.find(n => n.id === active.value) ?? null)

function isLit(n: { id: string }) { return !active.value || n.id === active.value }
function spokeLit(n: { id: string }) { return !active.value || n.id === active.value }
</script>

<template>
  <section class="eco">
    <div class="eco__inner">
      <div v-reveal class="eco__head">
        <p class="eco__eyebrow">Section 03</p>
        <h2 class="eco__title" data-split>{{ homeSection03.title }}</h2>
        <p class="eco__intro">{{ homeSection03.intro }}</p>
      </div>

      <div class="eco__viz" @mouseleave="active = null">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <line
            v-for="n in nodes" :key="n.id"
            :x1="n.x" :y1="n.y" :x2="CENTER.x" :y2="CENTER.y"
            :class="{ 'eco__spoke--dim': !spokeLit(n) }"
            class="eco__spoke"
          />
        </svg>

        <button
          v-for="n in nodes" :key="n.id"
          class="eco__node glass-react"
          :class="{ 'eco__node--dim': !isLit(n) }"
          :style="{ left: n.x + '%', top: n.y + '%' }"
          type="button"
          @mouseenter="active = n.id"
          @focus="active = n.id"
        >{{ n.label }}</button>

        <div class="eco__center" :class="{ 'eco__center--active': active }">
          {{ homeSection03.centerLabel }}<br ><span>Unified Architecture</span>
        </div>

        <p class="eco__rel" :class="{ 'eco__rel--show': activeNode }" aria-live="polite">
          {{ activeNode?.rel ?? '' }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.eco { background: var(--color-surface); border-block: 1px solid var(--color-border); }
.eco__inner {
  max-width: var(--container-max);
  margin-inline: auto;
  padding: var(--section-y) var(--container-pad);
  box-sizing: border-box;
}
.eco__eyebrow {
  margin: 0 0 var(--space-6);
  font-family: var(--font-mono); font-size: var(--type-label);
  letter-spacing: var(--tracking-label); text-transform: uppercase;
  color: var(--color-accent);
}
.eco__title {
  margin: 0 0 var(--space-6);
  font-size: clamp(34px, 4.4vw, 64px);
  font-weight: var(--weight-bold); line-height: 1.12; letter-spacing: -0.02em;
  color: var(--color-text); text-wrap: balance;
}
.eco__intro {
  margin: 0 0 var(--space-16);
  max-width: var(--paragraph-max);
  font-size: var(--type-body); line-height: var(--leading-body);
  color: var(--color-text-secondary);
}

/* taller frame to seat ten platforms without collision */
.eco__viz { position: relative; aspect-ratio: 3 / 2; }
.eco__viz svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.eco__spoke {
  stroke: var(--color-accent);
  stroke-width: 1px;
  vector-effect: non-scaling-stroke;
  opacity: 0.4;
  transition: opacity var(--motion-medium) var(--ease-smooth);
}
.eco__spoke--dim { opacity: 0.08; }

.eco__node {
  position: absolute;
  transform: translate(-50%, -50%);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(var(--blur-nav));
  -webkit-backdrop-filter: blur(var(--blur-nav));
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-soft);
  font-family: var(--font-mono);
  font-size: var(--type-caption);
  letter-spacing: 0.03em;
  color: var(--color-text);
  cursor: pointer;
  transition: opacity var(--motion-medium) var(--ease-smooth),
              border-color var(--motion-medium) var(--ease-smooth),
              transform var(--motion-fast) var(--ease-smooth);
}
.eco__node:hover { border-color: var(--color-accent); transform: translate(-50%, -50%) translateY(-2px); }
.eco__node--dim { opacity: 0.3; }
.eco__node:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }

.eco__center {
  position: absolute;
  left: 50%; top: 47%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: var(--space-6) var(--space-10);
  border-radius: var(--radius-lg);
  background: var(--color-text);
  color: var(--color-inverse);
  font-size: var(--type-small);
  font-weight: var(--weight-bold);
  letter-spacing: -0.01em;
  line-height: 1.35;
  transition: box-shadow var(--motion-medium) var(--ease-smooth);
}
.eco__center span {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  opacity: 0.7;
}
.eco__center--active { box-shadow: var(--shadow-med); }

.eco__rel {
  position: absolute;
  left: 0; right: 0; bottom: -8px;
  margin: 0;
  text-align: center;
  font-size: var(--type-caption);
  color: var(--color-text-secondary);
  opacity: 0;
  transform: translateY(4px);
  transition: opacity var(--motion-medium) var(--ease-smooth),
              transform var(--motion-medium) var(--ease-smooth);
  min-height: 1.4em;
}
.eco__rel--show { opacity: 1; transform: none; }

@media (max-width: 900px) {
  .eco__viz { aspect-ratio: 4 / 5; }
  .eco__node { font-size: 11px; padding: var(--space-2) var(--space-4); }
  .eco__center { padding: var(--space-4) var(--space-6); font-size: var(--type-caption); }
}
@media (prefers-reduced-motion: reduce) {
  .eco__spoke, .eco__node, .eco__rel, .eco__center { transition: none; }
}
</style>
