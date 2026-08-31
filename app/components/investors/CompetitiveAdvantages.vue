<script setup lang="ts">
// COMPETITIVE ADVANTAGES — central SVARA Core with eight animated
// advantage nodes. Each node's description is sourced VERBATIM from the
// Content Bible (investors.ts + company.ts architecture components).
// Hovering a node brightens its connection and lifts the core. Motion
// represents platform strength and competitive moat.
import { ref } from 'vue'
import { advantageNodes } from '~/utils/investors'

const hovered = ref<number | null>(null)

const NODES = advantageNodes.map((n, i) => {
  const a = (i / advantageNodes.length) * Math.PI * 2 - Math.PI / 2
  return { ...n, i, x: 50 + Math.cos(a) * 38, y: 50 + Math.sin(a) * 40 }
})
</script>

<template>
  <section class="ca" @mouseleave="hovered = null">
    <div class="ca__head">
      <p class="ca__eyebrow">Competitive Advantages</p>
      <h2 class="ca__title">Eight reinforcing moats around one core.</h2>
    </div>

    <div class="ca__stage">
      <svg class="ca__wires" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <line v-for="n in NODES" :key="`w${n.i}`" x1="50" y1="50" :x2.attr="n.x" :y2.attr="n.y" class="ca__wire" :class="{ 'is-hot': hovered === n.i }" />
        <circle v-for="n in NODES" :key="`p${n.i}`" r="0.5" class="ca__packet" :class="{ 'is-hot': hovered === n.i }" :style="{ offsetPath: `path('M50 50 L${n.x} ${n.y}')`, animationDelay: `${(-n.i * 0.3).toFixed(2)}s` }" />
      </svg>
      <div class="ca__core" :class="{ 'is-hot': hovered !== null }">
        <span class="ca__core-ring" />
        <span class="ca__core-label">SVARA Core</span>
      </div>
      <button v-for="n in NODES" :key="`n${n.i}`" class="ca__node" :class="{ 'is-hot': hovered === n.i, 'is-dim': hovered !== null && hovered !== n.i }" :style="{ left: n.x + '%', top: n.y + '%' }" @mouseenter="hovered = n.i" @focus="hovered = n.i">
        <span class="ca__node-name">{{ n.name }}</span>
        <span class="ca__node-desc">{{ n.desc }}</span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.ca { background: #F8FBFF; padding: var(--space-32) var(--container-pad); }
.ca__head { max-width: 760px; margin: 0 auto var(--space-16); text-align: center; }
.ca__eyebrow { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.ca__title { margin: 0; font-size: clamp(34px, 4.4vw, 56px); font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong); }

.ca__stage { position: relative; width: min(780px, 90vw); aspect-ratio: 1.05/1; margin: var(--space-16) auto 0; }
.ca__wires { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.ca__wire { stroke: var(--color-ink-strong); stroke-width: 0.4; vector-effect: non-scaling-stroke; opacity: 0.14; transition: opacity var(--motion-medium) var(--ease-smooth), stroke var(--motion-medium) var(--ease-smooth); }
.ca__wire.is-hot { stroke: var(--color-accent); opacity: 0.8; }
.ca__packet { fill: var(--color-accent); opacity: 0.4; animation: ca-flow 3.4s linear infinite; transition: opacity var(--motion-medium) var(--ease-smooth); }
.ca__packet.is-hot { opacity: 1; }
@keyframes ca-flow { from { offset-distance: 0%; } to { offset-distance: 100%; } }
.ca__core { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); z-index: 3; padding: 16px 28px; border-radius: 50%; background: var(--color-ink-strong); color: #fff; box-shadow: 0 24px 70px rgba(16, 42, 91, 0.28); transition: transform var(--motion-medium) var(--ease-out); }
.ca__core.is-hot { transform: translate(-50%, -50%) scale(1.06); }
.ca__core-ring { position: absolute; inset: -10px; border-radius: 50%; border: 1px solid var(--color-accent); opacity: 0.4; animation: ca-pulse 2.4s ease-in-out infinite; }
@keyframes ca-pulse { 0%,100% { transform: scale(1); opacity: 0.4; } 50% { transform: scale(1.08); opacity: 0.08; } }
.ca__core-label { position: relative; z-index: 1; font-size: 14px; font-weight: var(--weight-bold); }
.ca__node { position: absolute; transform: translate(-50%, -50%); z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 8px 14px; border-radius: var(--radius-md); background: rgba(255,255,255,0.85); backdrop-filter: blur(10px); border: 1px solid var(--color-border); box-shadow: 0 6px 18px rgba(16, 42, 91, 0.08); cursor: pointer; text-align: center; max-width: 140px; transition: all var(--motion-medium) var(--ease-out); }
.ca__node.is-hot { transform: translate(-50%, -50%) scale(1.1); border-color: var(--color-accent); box-shadow: 0 12px 32px rgba(47, 127, 230, 0.2); }
.ca__node.is-dim { opacity: 0.45; }
.ca__node-name { font-size: 12px; font-weight: var(--weight-semibold); color: var(--color-ink-strong); letter-spacing: -0.01em; white-space: nowrap; }
.ca__node-desc { font-size: 10px; line-height: 1.4; color: var(--color-text-secondary); display: none; }
.ca__node.is-hot .ca__node-desc { display: block; }
@media (max-width: 860px) { .ca__stage { width: 100%; aspect-ratio: auto; display: flex; flex-direction: column; gap: var(--space-4); } .ca__wires { display: none; } .ca__core { position: static; transform: none; margin: 0 auto var(--space-6); border-radius: var(--radius-pill); } .ca__core.is-hot { transform: scale(1.04); } .ca__node { position: static; transform: none; max-width: none; flex-direction: row; align-items: center; text-align: left; } .ca__node.is-hot { transform: scale(1.02); } .ca__node.is-dim { opacity: 1; } .ca__node-desc { display: block; } }
@media (prefers-reduced-motion: reduce) { .ca__wire, .ca__packet, .ca__core-ring { animation: none; } }
</style>