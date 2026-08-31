<script setup lang="ts">
// INDUSTRY INTELLIGENCE MAPPING — interactive visualization. Selecting an
// industry dynamically highlights the most relevant SVARA platforms and
// animates connections between the industry and those platforms. Shows
// that one architecture serves many domains. Industries are sourced
// verbatim from the Content Bible (homeIndustries); the platform→industry
// relevance map lives in platforms.ts (UI metadata only, no copy).
import { ref, computed } from 'vue'
import { PLATFORMS, INDUSTRY_MAP } from '~/utils/platforms'

const activeIndustry = ref(0)
const selected = computed(() => INDUSTRY_MAP[activeIndustry.value] ?? INDUSTRY_MAP[0]!)

// node positions on a ring (platforms)
const NODES = PLATFORMS.map((p, i) => {
  const a = (i / PLATFORMS.length) * Math.PI * 2 - Math.PI / 2
  return { i, name: p.name, x: 50 + Math.cos(a) * 36, y: 50 + Math.sin(a) * 38 }
})

// pathways for the active industry — precomputed so the template never
// indexes NODES directly (keeps template + types clean).
const wires = computed(() =>
  selected.value.platforms.map((i) => ({ i, x: NODES[i]!.x, y: NODES[i]!.y })),
)

function isHot(i: number) {
  return selected.value.platforms.includes(i)
}
</script>

<template>
  <section class="im">
    <div class="im__head">
      <p class="im__eyebrow">Industry Intelligence Mapping</p>
      <h2 class="im__title">One architecture. Every industry.</h2>
      <p class="im__sub">Select an industry to see which SVARA platforms map to its most critical operations.</p>
    </div>

    <div class="im__layout">
      <ul class="im__industries" role="list">
        <li
          v-for="(ind, i) in INDUSTRY_MAP" :key="ind.name"
          class="im__ind"
          :class="{ 'is-on': activeIndustry === i }"
        >
          <button @click="activeIndustry = i">
            <span class="im__ind-dot" />
            {{ ind.name }}
          </button>
        </li>
      </ul>

      <div :key="selected.name" class="im__stage">
        <div class="im__industry-label">{{ selected.name }}</div>
        <svg class="im__wires" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <line
            v-for="w in wires" :key="`l${w.i}`"
            :x1.attr="50" :y1.attr="50" :x2.attr="w.x" :y2.attr="w.y"
            class="im__wire"
          />
        </svg>
        <div class="im__core">
          <span class="im__core-label">{{ selected.name }}</span>
          <span class="im__core-meta">{{ selected.platforms.length }} platforms</span>
        </div>
        <span
          v-for="n in NODES" :key="`n${n.i}`"
          class="im__node"
          :class="{ 'is-hot': isHot(n.i), 'is-dim': selected.platforms.length && !isHot(n.i) }"
          :style="{ left: n.x + '%', top: n.y + '%' }"
        >{{ n.name }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.im {
  background: #F8FBFF;
  padding: var(--space-32) var(--container-pad);
}
.im__head { max-width: 760px; margin: 0 auto var(--space-20); text-align: center; }
.im__eyebrow {
  margin: 0 0 var(--space-4);
  font-family: var(--font-mono); font-size: var(--type-label);
  letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent);
}
.im__title {
  margin: 0;
  font-size: clamp(34px, 4.4vw, 56px);
  font-weight: var(--weight-bold); line-height: 1.1;
  letter-spacing: -0.02em; color: var(--color-ink-strong);
}
.im__sub { margin: var(--space-5) 0 0; font-size: var(--type-body); color: var(--color-text-secondary); }

.im__layout {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: var(--space-12);
  max-width: 1180px;
  margin-inline: auto;
}

.im__industries { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 4px; }
.im__ind button {
  display: flex; align-items: center; gap: 10px;
  width: 100%; padding: 12px 14px;
  background: transparent; border: 1px solid transparent;
  border-radius: var(--radius-sm);
  font-size: 15px; font-weight: var(--weight-medium); color: var(--color-text-secondary);
  text-align: left; cursor: pointer;
  transition: background var(--motion-medium) var(--ease-smooth), color var(--motion-medium) var(--ease-smooth), border-color var(--motion-medium) var(--ease-smooth);
}
.im__ind button:hover { background: rgba(47, 127, 230, 0.06); color: var(--color-ink-strong); }
.im__ind.is-on button { background: var(--color-ink-strong); color: #fff; }
.im__ind.is-on button:hover { background: var(--color-ink-strong); }
.im__ind-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--color-accent); box-shadow: 0 0 0 3px rgba(47, 127, 230, 0.16); }
.im__ind.is-on .im__ind-dot { background: #fff; }

.im__stage {
  position: relative;
  width: 100%;
  aspect-ratio: 1.1 / 1;
  border-radius: var(--radius-lg);
  background: #F1F6FE;
  border: 1px solid var(--color-border);
  overflow: hidden;
}
.im__industry-label {
  position: absolute; top: 20px; left: 50%; transform: translateX(-50%);
  z-index: 4;
  font-size: 12px; font-weight: var(--weight-semibold); letter-spacing: 0.04em;
  color: var(--color-ink-strong);
}
.im__wires { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1; }
.im__wire { stroke: var(--color-accent); stroke-width: 1; vector-effect: non-scaling-stroke; opacity: 0; animation: im-draw 0.6s var(--ease-out) forwards; }
@keyframes im-draw { to { opacity: 0.7; } }

.im__core {
  position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
  z-index: 3;
  min-width: 150px; padding: 16px 20px;
  border-radius: var(--radius-md);
  background: var(--color-ink-strong); color: #fff;
  text-align: center;
  box-shadow: 0 20px 56px rgba(16, 42, 91, 0.22);
}
.im__core-label { display: block; font-size: 14px; font-weight: var(--weight-semibold); }
.im__core-meta { display: block; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; opacity: 0.6; margin-top: 4px; }

.im__node {
  position: absolute; transform: translate(-50%, -50%);
  z-index: 2;
  padding: 6px 11px;
  border-radius: var(--radius-pill);
  background: #fff; border: 1px solid var(--color-border);
  font-size: 11px; font-weight: var(--weight-medium); color: var(--color-text-faint);
  white-space: nowrap;
  transition: transform var(--motion-medium) var(--ease-out), border-color var(--motion-medium) var(--ease-smooth), color var(--motion-medium) var(--ease-smooth), opacity var(--motion-medium) var(--ease-smooth), background var(--motion-medium) var(--ease-smooth);
}
.im__node.is-hot { transform: translate(-50%, -50%) scale(1.12); border-color: var(--color-accent); color: var(--color-ink-strong); background: #fff; box-shadow: 0 8px 22px rgba(47, 127, 230, 0.2); }
.im__node.is-dim { opacity: 0.4; }

@media (max-width: 860px) {
  .im__layout { grid-template-columns: 1fr; }
  .im__stage { aspect-ratio: auto; min-height: 360px; }
  .im__industries { flex-direction: row; flex-wrap: wrap; }
  .im__ind { flex: 1 1 45%; }
}
</style>