<script setup lang="ts">
// BUSINESS CLOUD — unified business-intelligence control center. Six modules feed
// one data fabric; cross-functional events stream through it; a Business Pulse
// score tracks the whole. Click a module to reorganize the fabric around it.
// Deterministic SIMULATED telemetry; SSR-safe.
import { reactive, ref, computed } from 'vue'
import { useTicker, wave } from '~/composables/useSystemSim'

const root = ref<HTMLElement | null>(null)

const MODS = ['CRM', 'ERP', 'HRMS', 'LMS', 'HELPDESK', 'AGENTS']
const mods = MODS.map((label, i) => {
  const a = (-90 + i * 60) * Math.PI / 180
  return { label, x: 50 + 38 * Math.cos(a), y: 34 + 25 * Math.sin(a), dur: 1.5 + (i % 4) * 0.5, load: 0.5 }
})
const DASH = [
  { k: 'REVENUE', v: '₹4.2Cr' }, { k: 'PIPELINE', v: '₹9.1Cr' }, { k: 'OPS', v: '98%' },
  { k: 'PEOPLE', v: '412' }, { k: 'FINANCE', v: '+7.4%' }, { k: 'CUSTOMERS', v: '2,840' },
]
const EVENTS = ['NEW DEAL', 'INVOICE GENERATED', 'EMPLOYEE ONBOARDED', 'SUPPORT TICKET', 'PURCHASE ORDER', 'PAYMENT RECEIVED']
const pulse = ref(84.7)
const selected = ref<number | null>(null)
const feed = ref<{ t: string; e: string; m: string }[]>([])
const loads = reactive(mods.map(() => 0.5))
let lastEv = -2, eidx = 0

function clk(t: number) { const tot = 34980 + Math.floor(t * 9); return [Math.floor(tot / 3600) % 24, Math.floor(tot / 60) % 60].map(n => String(n).padStart(2, '0')).join(':') }
const focusName = computed(() => selected.value !== null ? MODS[selected.value] : 'ALL FUNCTIONS')

let lastPulse = -99

useTicker((t) => {
  for (let i = 0; i < mods.length; i++) loads[i] = wave(t, i * 2.1, 0.25, 1)
  // The module bars below stay continuous — they are motion. The pulse readout
  // is a figure, so it settles on a beat rather than re-rolling every frame.
  if (t - lastPulse > 1.1) {
    lastPulse = t
    const bias = selected.value !== null ? 2.5 : 0
    pulse.value = +(wave(t, 4, 80, 90) + bias).toFixed(1)
  }
  if (t - lastEv > 1.5) {
    lastEv = t
    feed.value = [{ t: clk(t), e: EVENTS[eidx % EVENTS.length]!, m: MODS[eidx % MODS.length]! }, ...feed.value].slice(0, 5)
    eidx++
  }
}, { fps: 8, rootRef: root })
</script>

<template>
  <div ref="root" class="bc">
    <div class="bc__bar">
      <span class="bc__chip">BUSINESS PULSE <em>{{ pulse }}</em></span>
      <span class="bc__chip">MODULES <em>{{ MODS.length }}</em></span>
      <span class="bc__chip bc__chip--grow">FOCUS <em>{{ focusName }}</em></span>
    </div>

    <div class="bc__body">
      <div class="bc__fabric">
        <svg viewBox="0 0 100 68" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <g v-for="(m, i) in mods" :key="`l${i}`" :class="{ 'is-sel': selected === i, 'is-dim': selected !== null && selected !== i }">
            <line x1="50" y1="34" :x2="m.x" :y2="m.y" class="bc__link" />
            <circle r="0.9" class="bc__pk"><animateMotion :dur="`${m.dur}s`" repeatCount="indefinite" :path="`M${m.x} ${m.y} L50 34`" /></circle>
          </g>
          <g v-for="(m, i) in mods" :key="`n${i}`" class="bc__mod" :class="{ 'is-sel': selected === i, 'is-dim': selected !== null && selected !== i }"
             @click="selected = selected === i ? null : i" style="cursor: pointer">
            <circle :cx="m.x" :cy="m.y" :r="3 + loads[i]! * 1.5" class="bc__mod-halo" />
            <circle :cx="m.x" :cy="m.y" r="2.8" class="bc__mod-dot" />
            <text :x="m.x" :y="m.y + (m.y < 34 ? -4 : 5.5)" text-anchor="middle" class="bc__mod-lbl">{{ m.label }}</text>
          </g>
          <circle cx="50" cy="34" r="10" class="bc__core-halo" />
          <rect x="41" y="30" width="18" height="8" rx="1" class="bc__core" />
          <text x="50" y="35" text-anchor="middle" class="bc__core-t">DATA FABRIC</text>
        </svg>
        <div class="bc__dash">
          <span v-for="d in DASH" :key="d.k" class="bc__kpi"><b>{{ d.v }}</b><i>{{ d.k }}</i></span>
        </div>
      </div>

      <div class="bc__side">
        <span class="bc__side-h">CROSS-FUNCTIONAL EVENTS</span>
        <TransitionGroup name="bc-ev" tag="div" class="bc__stream">
          <span v-for="(e, i) in feed" :key="e.t + e.e + i" class="bc__ev"><em>{{ e.t }}</em> {{ e.e }} <b>· {{ e.m }}</b></span>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bc { position: absolute; inset: 7% 5% 5%; background: #07101f; border-radius: 6px; overflow: hidden; display: flex; flex-direction: column; font-family: var(--font-mono, ui-monospace, monospace); color: #cfe0f5; box-shadow: inset 0 0 0 1px rgba(103, 232, 249, 0.12), inset 0 0 60px rgba(3, 12, 26, 0.9); }
.bc__bar { display: flex; align-items: center; gap: 10px; padding: 6px 10px; border-bottom: 1px solid rgba(103, 232, 249, 0.14); font-size: 8px; letter-spacing: 0.08em; }
.bc__chip { color: rgba(207, 224, 245, 0.6); text-transform: uppercase; white-space: nowrap; }
.bc__chip em { color: #eaf6ff; font-style: normal; font-weight: 600; }
.bc__chip--grow { margin-left: auto; }

.bc__body { flex: 1; display: flex; min-height: 0; }
.bc__fabric { flex: 1.5; min-width: 0; display: flex; flex-direction: column; padding: 4px; }
.bc__fabric svg { flex: 1; width: 100%; min-height: 0; }
.bc__link { stroke: rgba(103, 232, 249, 0.2); stroke-width: 0.35; }
g.is-sel .bc__link { stroke: rgba(103, 232, 249, 0.7); stroke-width: 0.7; }
g.is-dim { opacity: 0.32; }
.bc__pk { fill: #67e8f9; }
.bc__mod-halo { fill: rgba(103, 232, 249, 0.1); }
.bc__mod-dot { fill: #0b1830; stroke: #67e8f9; stroke-width: 0.6; }
.bc__mod.is-sel .bc__mod-dot { fill: #67e8f9; stroke: #eaf6ff; }
.bc__mod-lbl { fill: rgba(207, 224, 245, 0.75); font-size: 2.7px; letter-spacing: 0.03em; }
.bc__core-halo { fill: rgba(108, 135, 254, 0.14); animation: bc-breathe 3s ease-in-out infinite; transform-origin: 50px 34px; }
@keyframes bc-breathe { 50% { transform: scale(1.12); } }
.bc__core { fill: #0b1830; stroke: #6c87fe; stroke-width: 0.7; }
.bc__core-t { fill: #eaf6ff; font-size: 2.7px; font-weight: 700; }
.bc__dash { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; padding: 4px 2px 2px; }
.bc__kpi { display: flex; flex-direction: column; gap: 1px; padding: 3px 5px; background: rgba(12, 24, 46, 0.5); }
.bc__kpi b { font-size: 8px; color: #eaf6ff; font-weight: 600; }
.bc__kpi i { font-size: 5.5px; font-style: normal; letter-spacing: 0.08em; color: rgba(103, 232, 249, 0.7); }

.bc__side { flex: 1; min-width: 0; border-left: 1px solid rgba(103, 232, 249, 0.14); padding: 8px; }
.bc__side-h { font-size: 6.5px; letter-spacing: 0.1em; color: rgba(103, 232, 249, 0.7); }
.bc__stream { margin-top: 5px; height: 92px; overflow: hidden; }
.bc__ev { display: block; font-size: 7.5px; line-height: 1.7; color: rgba(207, 224, 245, 0.72); white-space: nowrap; }
.bc__ev em { color: #67e8f9; font-style: normal; } .bc__ev b { color: rgba(207, 224, 245, 0.5); font-weight: 400; }
.bc-ev-enter-active { transition: transform 0.4s ease, opacity 0.4s; }
.bc-ev-enter-from { transform: translateY(-8px); opacity: 0; }

@media (prefers-reduced-motion: reduce) { .bc__core-halo { animation: none; } }
@media (max-width: 560px) { .bc__side { display: none; } }
</style>
