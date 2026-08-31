<script setup lang="ts">
// PLATFORM MAPPING — one industry in the center, surrounded by SVARA
// platforms. Different combinations are highlighted per industry. The
// selected industry's recommended platforms glow; the rest dim. Motion
// represents system coordination and platform orchestration.
import { ref, computed } from 'vue'
import { INDUSTRIES, PLATFORM_SURROUND } from '~/utils/industries-page'

const active = ref(0)
const selected = computed(() => INDUSTRIES[active.value]!)

// ring-positioned platform nodes
const NODES = PLATFORM_SURROUND.map((name, i) => {
  const a = (i / PLATFORM_SURROUND.length) * Math.PI * 2 - Math.PI / 2
  return { name, i, x: 50 + Math.cos(a) * 40, y: 50 + Math.sin(a) * 40 }
})

function isRecommended(name: string) {
  return selected.value.platforms.some((p) => p.name === name)
}
</script>

<template>
  <section class="pm">
    <div class="pm__head">
      <p class="pm__eyebrow">Platform Mapping</p>
      <h2 class="pm__title">One industry. A unique platform combination.</h2>
      <p class="pm__sub">The same ten SVARA platforms combine differently for each industry — select an industry to see which platforms map to its most critical operations.</p>
    </div>

    <div class="pm__selector">
      <button v-for="(ind, i) in INDUSTRIES" :key="ind.name" class="pm__chip" :class="{ 'is-on': active === i }" @click="active = i">{{ ind.name }}</button>
    </div>

    <div :key="selected.name" class="pm__viz" aria-hidden="true">
      <svg class="pm__wires" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line v-for="n in NODES" :key="`w${n.i}`" x1="50" y1="50" :x2.attr="n.x" :y2.attr="n.y" class="pm__wire" :class="{ 'is-hot': isRecommended(n.name) }" />
      </svg>
      <div class="pm__core">
        <span class="pm__core-label">{{ selected.name }}</span>
      </div>
      <div v-for="n in NODES" :key="`n${n.i}`" class="pm__node" :class="{ 'is-hot': isRecommended(n.name), 'is-dim': !isRecommended(n.name) }" :style="{ left: n.x + '%', top: n.y + '%' }">
        <span class="pm__node-dot" />
        <span class="pm__node-name">{{ n.name }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pm { background: #F1F6FE; padding: var(--space-32) var(--container-pad); }
.pm__head { max-width: 760px; margin: 0 auto var(--space-12); text-align: center; }
.pm__eyebrow { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.pm__title { margin: 0; font-size: clamp(34px, 4.4vw, 56px); font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong); }
.pm__sub { margin: var(--space-5) 0 0; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }

.pm__selector { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; max-width: 1000px; margin: 0 auto var(--space-16); }
.pm__chip { padding: 7px 14px; border-radius: var(--radius-pill); background: transparent; border: 1px solid var(--color-border); font-size: 12px; font-weight: var(--weight-medium); color: var(--color-text-secondary); cursor: pointer; transition: all var(--motion-medium) var(--ease-smooth); }
.pm__chip:hover { border-color: var(--color-accent); color: var(--color-ink-strong); }
.pm__chip.is-on { background: var(--color-ink-strong); color: #fff; border-color: var(--color-ink-strong); }

.pm__viz { position: relative; width: min(680px, 90vw); aspect-ratio: 1.05/1; margin: 0 auto; }
.pm__wires { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.pm__wire { stroke: var(--color-ink-strong); stroke-width: 0.4; vector-effect: non-scaling-stroke; opacity: 0.1; transition: opacity var(--motion-medium) var(--ease-smooth), stroke var(--motion-medium) var(--ease-smooth); }
.pm__wire.is-hot { stroke: var(--color-accent); opacity: 0.7; }
.pm__core { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); z-index: 3; padding: 16px 28px; border-radius: var(--radius-md); background: var(--color-ink-strong); color: #fff; box-shadow: 0 20px 56px rgba(16, 42, 91, 0.22); text-align: center; max-width: 180px; }
.pm__core-label { font-size: 15px; font-weight: var(--weight-bold); }
.pm__node { position: absolute; transform: translate(-50%, -50%); z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 5px; padding: 6px 12px; border-radius: var(--radius-pill); background: rgba(255,255,255,0.85); backdrop-filter: blur(8px); border: 1px solid var(--color-border); transition: all var(--motion-medium) var(--ease-out); }
.pm__node.is-hot { border-color: var(--color-accent); box-shadow: 0 8px 22px rgba(47, 127, 230, 0.2); transform: translate(-50%, -50%) scale(1.08); }
.pm__node.is-dim { opacity: 0.35; }
.pm__node-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--color-text-faint); }
.pm__node.is-hot .pm__node-dot { background: var(--color-accent); box-shadow: 0 0 0 3px rgba(47, 127, 230, 0.16); }
.pm__node-name { font-size: 10.5px; font-weight: var(--weight-semibold); color: var(--color-ink-strong); white-space: nowrap; }
@media (max-width: 768px) { .pm__viz { width: 100%; aspect-ratio: auto; display: flex; flex-direction: column; gap: var(--space-4); } .pm__wires { display: none; } .pm__core { position: static; transform: none; margin: 0 auto var(--space-6); } .pm__node { position: static; transform: none; flex-direction: row; } .pm__node.is-hot { transform: scale(1.03); } .pm__node.is-dim { opacity: 1; } }
</style>