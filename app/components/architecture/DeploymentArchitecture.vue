<script setup lang="ts">
// DEPLOYMENT ARCHITECTURE — interactive deployment selector: Cloud,
// Hybrid, On-Premises, Edge, Offline. Selecting a deployment updates the
// architecture visualization to highlight the active nodes; only the
// active nodes pulse, the rest dim. Motion represents where compute
// actually runs in each deployment mode.
import { ref, computed } from 'vue'
import { DEPLOYMENTS } from '~/utils/architecture'

const active = ref(1) // default to Hybrid (the reference deployment)

// which architecture nodes are active per deployment mode
const modes = {
  Cloud: { cloud: true, edge: false, device: false },
  Hybrid: { cloud: true, edge: true, device: false },
  'On-Premises': { cloud: false, edge: true, device: false },
  Edge: { cloud: false, edge: true, device: true },
  Offline: { cloud: false, edge: false, device: true },
} as const

const state = computed(() => {
  const m = modes as Record<string, { cloud: boolean; edge: boolean; device: boolean }>
  return m[DEPLOYMENTS[active.value]!.mode]!
})
</script>

<template>
  <section class="da">
    <div class="da__head">
      <p class="da__eyebrow">Deployment Architecture</p>
      <h2 class="da__title">Deploy anywhere intelligence runs.</h2>
      <p class="da__sub">The same architecture runs across five deployment modes — from fully managed cloud to fully disconnected edge. Select a mode to see where compute actually lives.</p>
    </div>

    <div class="da__layout">
      <ul class="da__modes" role="list">
        <li v-for="(d, i) in DEPLOYMENTS" :key="d.mode" class="da__mode" :class="{ 'is-on': active === i }">
          <button @click="active = i">
            <span class="da__mode-name">{{ d.mode }}</span>
            <span class="da__mode-tag">{{ d.tag }}</span>
          </button>
        </li>
      </ul>

      <div :key="DEPLOYMENTS[active]!.mode" class="da__viz">
        <div class="da__arch-line" />
        <div class="da__node da__node--cloud" :class="{ 'is-on': state.cloud }">
          <span class="da__node-label">Cloud</span>
        </div>
        <div class="da__node da__node--edge" :class="{ 'is-on': state.edge }">
          <span class="da__node-label">Edge Gateway</span>
        </div>
        <div class="da__node da__node--device" :class="{ 'is-on': state.device }">
          <span class="da__node-label">Device / Sensor</span>
        </div>
      </div>

      <p class="da__desc">{{ DEPLOYMENTS[active]!.desc }}</p>
    </div>
  </section>
</template>

<style scoped>
.da { background: #F1F6FE; padding: var(--space-32) var(--container-pad); }
.da__head { max-width: 760px; margin: 0 auto var(--space-16); text-align: center; }
.da__eyebrow { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.da__title { margin: 0; font-size: clamp(34px, 4.4vw, 56px); font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong); }
.da__sub { margin: var(--space-5) 0 0; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }

.da__layout { display: grid; grid-template-columns: 280px 1fr; gap: var(--space-12); max-width: 1180px; margin: var(--space-16) auto 0; align-items: start; }
.da__modes { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 6px; }
.da__mode button { display: flex; align-items: baseline; gap: 10px; width: 100%; padding: 12px 16px; background: transparent; border: 1px solid var(--color-border); border-radius: var(--radius-sm); text-align: left; cursor: pointer; transition: background var(--motion-medium) var(--ease-smooth), border-color var(--motion-medium) var(--ease-smooth), color var(--motion-medium) var(--ease-smooth); }
.da__mode button:hover { background: rgba(47, 127, 230, 0.06); }
.da__mode.is-on button { background: var(--color-ink-strong); color: #fff; border-color: var(--color-ink-strong); }
.da__mode-name { font-size: 15px; font-weight: var(--weight-semibold); }
.da__mode-tag { font-family: var(--font-mono); font-size: 10px; color: var(--color-text-faint); text-transform: uppercase; letter-spacing: 0.08em; margin-left: auto; }
.da__mode.is-on .da__mode-tag { color: rgba(255, 255, 255, 0.6); }

.da__viz { position: relative; min-height: 360px; display: flex; flex-direction: column; gap: var(--space-6); justify-content: center; padding: var(--space-8); border-radius: var(--radius-lg); background: #fff; border: 1px solid var(--color-border); box-shadow: 0 4px 14px rgba(16, 42, 91, 0.05), 0 30px 70px rgba(16, 42, 91, 0.06); }
.da__arch-line { position: absolute; left: 50%; top: 16%; bottom: 16%; width: 2px; background: rgba(16, 42, 91, 0.12); transform: translateX(-50%); }
.da__node { position: relative; z-index: 2; margin: 0 auto; padding: 14px 28px; border-radius: var(--radius-pill); background: #F4F7FC; border: 1px solid var(--color-border); display: flex; align-items: center; gap: 10px; opacity: 0.4; transition: opacity var(--motion-medium) var(--ease-out), background var(--motion-medium) var(--ease-out), border-color var(--motion-medium) var(--ease-out), box-shadow var(--motion-medium) var(--ease-out); }
.da__node.is-on { opacity: 1; background: var(--color-ink-strong); color: #fff; border-color: var(--color-ink-strong); box-shadow: 0 0 0 5px rgba(47,127,230,0.14), 0 14px 36px rgba(16, 42, 91, 0.18); animation: da-pulse 2.4s ease-in-out infinite alternate; }
@keyframes da-pulse { 0% { box-shadow: 0 0 0 5px rgba(47,127,230,0.14), 0 14px 36px rgba(16, 42, 91, 0.18); } 100% { box-shadow: 0 0 0 9px rgba(47,127,230,0.04), 0 14px 36px rgba(16, 42, 91, 0.18); } }
.da__node-label { font-size: 13px; font-weight: var(--weight-semibold); white-space: nowrap; }

.da__desc { grid-column: 1 / -1; max-width: 760px; margin: var(--space-8) auto 0; text-align: center; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }

@media (max-width: 860px) { .da__layout { grid-template-columns: 1fr; } .da__modes { flex-direction: row; flex-wrap: wrap; } .da__mode { flex: 1 1 45%; } }
@media (prefers-reduced-motion: reduce) { .da__node.is-on { animation: none; } }
</style>