<script setup lang="ts">
// MARKET OPPORTUNITY — interactive industry visualization. Selecting an
// industry reveals market relevance. Market size data is VERBATIM from the
// Content Bible (investors.roi — no invented metrics). Industry surface
// spans the ten sectors named in the brief.
import { ref, computed } from 'vue'
import { marketSurface, marketSize } from '~/utils/investors'

const active = ref(0)
const selected = computed(() => marketSurface[active.value]!)

// ring-positioned industry nodes
const NODES = marketSurface.map((s, i) => {
  const a = (i / marketSurface.length) * Math.PI * 2 - Math.PI / 2
  return { ...s, i, x: 50 + Math.cos(a) * 36, y: 50 + Math.sin(a) * 38 }
})
</script>

<template>
  <section class="mo">
    <div class="mo__head">
      <p class="mo__eyebrow">Market Opportunity</p>
      <h2 class="mo__title">A category-defining market.</h2>
      <p class="mo__sub">Select an industry to see SVARA's relevance across the enterprise intelligence market.</p>
    </div>

    <div class="mo__layout">
      <ul class="mo__list" role="list">
        <li v-for="(s, i) in marketSurface" :key="s.name" class="mo__item" :class="{ 'is-on': active === i }">
          <button @click="active = i">
            <span class="mo__item-dot" />{{ s.name }}
          </button>
        </li>
      </ul>

      <div :key="selected.name" class="mo__stage">
        <div class="mo__industry-label">{{ selected.name }}</div>
        <div class="mo__industry-tag">{{ selected.tag }}</div>
        <svg class="mo__wires" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <line v-for="n in [0, 1, 2, 3]" :key="n" :x1.attr="50" :y1.attr="50" :x2.attr="NODES[n]!.x" :y2.attr="NODES[n]!.y" class="mo__wire" />
        </svg>
        <div class="mo__core"><span class="mo__core-label">{{ selected.name }}</span></div>
        <span v-for="n in NODES" :key="`n${n.i}`" class="mo__node" :class="{ 'is-active': n.i === active }" :style="{ left: n.x + '%', top: n.y + '%' }">{{ n.name }}</span>
      </div>
    </div>

    <div class="mo__metrics">
      <div v-for="m in marketSize.metrics" :key="m.label" class="mo__metric">
        <span class="mo__ml">{{ m.label }}</span>
        <span class="mo__mv">{{ m.value }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.mo { background: #F1F6FE; padding: var(--space-32) var(--container-pad); }
.mo__head { max-width: 760px; margin: 0 auto var(--space-16); text-align: center; }
.mo__eyebrow { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.mo__title { margin: 0; font-size: clamp(34px, 4.4vw, 56px); font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong); }
.mo__sub { margin: var(--space-5) 0 0; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }

.mo__layout { display: grid; grid-template-columns: 320px 1fr; gap: var(--space-12); max-width: 1180px; margin: var(--space-16) auto 0; align-items: start; }
.mo__list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 4px; }
.mo__item button { display: flex; align-items: center; gap: 10px; width: 100%; padding: 11px 14px; background: transparent; border: 1px solid transparent; border-radius: var(--radius-sm); font-size: 14px; font-weight: var(--weight-medium); color: var(--color-text-secondary); text-align: left; cursor: pointer; transition: all var(--motion-medium) var(--ease-smooth); }
.mo__item button:hover { background: rgba(47, 127, 230, 0.06); color: var(--color-ink-strong); }
.mo__item.is-on button { background: var(--color-ink-strong); color: #fff; }
.mo__item-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--color-accent); box-shadow: 0 0 0 3px rgba(47,127,230,0.16); }
.mo__item.is-on .mo__item-dot { background: #fff; }

.mo__stage { position: relative; width: 100%; aspect-ratio: 1.1/1; border-radius: var(--radius-lg); background: #fff; border: 1px solid var(--color-border); overflow: hidden; }
.mo__industry-label { position: absolute; top: 18px; left: 50%; transform: translateX(-50%); z-index: 4; font-size: 14px; font-weight: var(--weight-bold); color: var(--color-ink-strong); }
.mo__industry-tag { position: absolute; top: 40px; left: 50%; transform: translateX(-50%); z-index: 4; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-accent); }
.mo__wires { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1; }
.mo__wire { stroke: var(--color-accent); stroke-width: 1; vector-effect: non-scaling-stroke; opacity: 0; animation: mo-draw 0.6s var(--ease-out) forwards; }
@keyframes mo-draw { to { opacity: 0.6; } }
.mo__core { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); z-index: 3; min-width: 140px; padding: 14px 22px; border-radius: var(--radius-md); background: var(--color-ink-strong); color: #fff; text-align: center; box-shadow: 0 18px 50px rgba(16, 42, 91, 0.22); }
.mo__core-label { font-size: 13px; font-weight: var(--weight-semibold); }
.mo__node { position: absolute; transform: translate(-50%, -50%); z-index: 2; padding: 5px 10px; border-radius: var(--radius-pill); background: #fff; border: 1px solid var(--color-border); font-size: 10.5px; font-weight: var(--weight-medium); color: var(--color-text-faint); white-space: nowrap; transition: all var(--motion-medium) var(--ease-out); }
.mo__node.is-active { transform: translate(-50%, -50%) scale(1.15); border-color: var(--color-accent); color: var(--color-ink-strong); box-shadow: 0 8px 22px rgba(47, 127, 230, 0.2); background: var(--color-accent); color: #fff; }

.mo__metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-6); max-width: 1100px; margin: var(--space-16) auto 0; }
.mo__metric { padding: var(--space-6); border-radius: var(--radius-md); background: #fff; border: 1px solid var(--color-border); text-align: center; }
.mo__ml { display: block; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-text-faint); margin-bottom: 6px; }
.mo__mv { display: block; font-size: 24px; font-weight: var(--weight-extrabold); color: var(--color-ink-strong); letter-spacing: -0.02em; }
@media (max-width: 860px) { .mo__layout { grid-template-columns: 1fr; } .mo__stage { aspect-ratio: auto; min-height: 340px; } .mo__list { flex-direction: row; flex-wrap: wrap; } .mo__item { flex: 1 1 45%; } }
</style>