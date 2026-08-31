<script setup lang="ts">
// DIGITAL TWIN — an interactive pseudo-3D facility. Isometric machines + conveyors
// with live sensor telemetry; a time slider (PAST ← NOW → SIMULATION) and scenario
// controls (NORMAL / HIGH LOAD / FAILURE / MAINTENANCE / OPTIMIZED) that change the
// twin's state. Deterministic SIMULATED telemetry; SSR-safe. (SVG-based — a
// Three.js upgrade is a follow-up option.)
import { reactive, ref, computed } from 'vue'
import { useTicker, wave } from '~/composables/useSystemSim'

const root = ref<HTMLElement | null>(null)

const OX = 50, OY = 15, TW = 7.4, TH = 3.5, HZ = 6.4, GW = 5, GD = 4
function proj(gx: number, gy: number, gz: number) { return [OX + (gx - gy) * TW, OY + (gx + gy) * TH - gz * HZ] as const }
function poly(...c: [number, number, number][]) { return c.map(([x, y, z]) => proj(x, y, z).join(',')).join(' ') }

interface Machine { id: string; gx: number; gy: number; w: number; d: number; h: number; temp: number; vib: number; load: number }
const machines = reactive<Machine[]>([
  { id: 'MOTOR 031', gx: 0.4, gy: 0.4, w: 1, d: 1, h: 1.4, temp: 58, vib: 0.4, load: 70 },
  { id: 'PRESS 07', gx: 2.1, gy: 0.4, w: 1.2, d: 1, h: 1.1, temp: 52, vib: 0.3, load: 63 },
  { id: 'ROBOT 12', gx: 0.4, gy: 2.2, w: 1, d: 1.3, h: 1.6, temp: 61, vib: 0.5, load: 74 },
  { id: 'CONV 04', gx: 2.4, gy: 2.2, w: 1.4, d: 1, h: 0.8, temp: 47, vib: 0.2, load: 55 },
  { id: 'CHILLER 02', gx: 3.7, gy: 0.9, w: 1, d: 1, h: 1.8, temp: 44, vib: 0.3, load: 49 },
])
const SCENARIOS = ['NORMAL', 'HIGH LOAD', 'FAILURE', 'MAINTENANCE', 'OPTIMIZED']
const scenario = ref(0)
const time = ref(0)          // -100 (past) … 0 (now) … 100 (simulation)
const selected = ref<number>(0)

const floorLines = computed(() => {
  const L: { x1: number; y1: number; x2: number; y2: number }[] = []
  for (let i = 0; i <= GW; i++) { const a = proj(i, 0, 0), b = proj(i, GD, 0); L.push({ x1: a[0], y1: a[1], x2: b[0], y2: b[1] }) }
  for (let j = 0; j <= GD; j++) { const a = proj(0, j, 0), b = proj(GW, j, 0); L.push({ x1: a[0], y1: a[1], x2: b[0], y2: b[1] }) }
  return L
})

// scenario base status per machine
function status(i: number): 'ok' | 'warn' | 'crit' | 'off' {
  const sc = scenario.value
  if (sc === 3 && i === 3) return 'off'                 // MAINTENANCE
  if (sc === 2 && i === 2) return 'crit'                // FAILURE
  if (sc === 1) return machines[i]!.load > 82 ? 'crit' : 'warn'  // HIGH LOAD
  if (sc === 4) return 'ok'                             // OPTIMIZED
  return machines[i]!.temp > 72 ? 'warn' : 'ok'         // NORMAL
}
const COLORS: Record<string, { top: string; l: string; r: string; dot: string }> = {
  ok: { top: '#1f4a6b', l: '#123049', r: '#0d2338', dot: '#4ad991' },
  warn: { top: '#5b4a1e', l: '#3d3214', r: '#2a230e', dot: '#ffcf5c' },
  crit: { top: '#5b1e2c', l: '#3d141d', r: '#2a0e14', dot: '#ff5c7a' },
  off: { top: '#26303f', l: '#1a222e', r: '#141a24', dot: '#4a5a72' },
}
const timeMode = computed(() => time.value < -8 ? 'PAST' : time.value > 8 ? 'SIMULATION' : 'LIVE')
const sel = computed(() => machines[selected.value]!)
const selStatus = computed(() => status(selected.value))

useTicker((t) => {
  const scBias = scenario.value === 1 ? 18 : scenario.value === 4 ? -14 : 0
  const tf = 1 + time.value / 260                        // time slider projects load/temp
  for (let i = 0; i < machines.length; i++) {
    const m = machines[i]!
    if (scenario.value === 3 && i === 3) { m.load = 0; m.temp = 24; m.vib = 0; continue }
    m.load = Math.max(0, Math.round((wave(t, i * 2.1, 48, 78) + scBias) * tf))
    m.temp = Math.round((wave(t, i * 1.6 + 2, 46, 68) + scBias * 0.7) * tf)
    m.vib = +(wave(t, i * 3.1 + 1, 0.2, 0.6) * (scenario.value === 2 && i === 2 ? 2.4 : 1)).toFixed(2)
  }
}, { fps: 8, rootRef: root })
</script>

<template>
  <div ref="root" class="tw">
    <div class="tw__bar">
      <span class="tw__chip">STATE <em :class="`tw-${timeMode.toLowerCase()}`">{{ timeMode }}</em></span>
      <span class="tw__chip">SCENARIO <em>{{ SCENARIOS[scenario] }}</em></span>
      <span class="tw__chip tw__chip--grow">TWIN SYNC <em>99.2%</em></span>
    </div>

    <div class="tw__stage">
      <svg viewBox="0 0 100 66" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <line v-for="(l, i) in floorLines" :key="`f${i}`" :x1="l.x1" :y1="l.y1" :x2="l.x2" :y2="l.y2" class="tw__floor" />
        <!-- conveyor -->
        <line :x1="proj(1.4,0.9,0)[0]" :y1="proj(1.4,0.9,0)[1]" :x2="proj(2.4,2.7,0)[0]" :y2="proj(2.4,2.7,0)[1]" class="tw__conv" />
        <g v-for="(m, i) in machines" :key="m.id" class="tw__machine" :class="{ 'is-sel': selected === i }"
           @click="selected = i" style="cursor: pointer">
          <polygon :points="poly([m.gx, m.gy+m.d, m.h],[m.gx+m.w, m.gy+m.d, m.h],[m.gx+m.w, m.gy+m.d, 0],[m.gx, m.gy+m.d, 0])" :fill="COLORS[status(i)]!.l" />
          <polygon :points="poly([m.gx+m.w, m.gy, m.h],[m.gx+m.w, m.gy+m.d, m.h],[m.gx+m.w, m.gy+m.d, 0],[m.gx+m.w, m.gy, 0])" :fill="COLORS[status(i)]!.r" />
          <polygon :points="poly([m.gx, m.gy, m.h],[m.gx+m.w, m.gy, m.h],[m.gx+m.w, m.gy+m.d, m.h],[m.gx, m.gy+m.d, m.h])" :fill="COLORS[status(i)]!.top" :stroke="selected === i ? '#67e8f9' : 'rgba(103,232,249,0.25)'" stroke-width="0.4" />
          <circle :cx="proj(m.gx+m.w/2, m.gy+m.d/2, m.h)[0]" :cy="proj(m.gx+m.w/2, m.gy+m.d/2, m.h)[1] - 2" r="1.1" :fill="COLORS[status(i)]!.dot" class="tw__sensor" />
        </g>
      </svg>
    </div>

    <!-- selected machine readout -->
    <div class="tw__readout">
      <span class="tw__ro-id" :style="{ color: COLORS[selStatus]!.dot }">{{ sel.id }}</span>
      <span class="tw__ro-m">TEMP <b>{{ sel.temp }}°C</b></span>
      <span class="tw__ro-m">VIBRATION <b>{{ sel.vib }}</b></span>
      <span class="tw__ro-m">LOAD <b>{{ sel.load }}%</b></span>
      <span class="tw__ro-status" :style="{ color: COLORS[selStatus]!.dot }">● {{ selStatus.toUpperCase() }}</span>
    </div>

    <!-- controls -->
    <div class="tw__controls">
      <div class="tw__scen">
        <button v-for="(s, i) in SCENARIOS" :key="s" type="button" class="tw__scen-btn" :class="{ 'is-on': scenario === i }" @click="scenario = i">{{ s }}</button>
      </div>
      <div class="tw__time">
        <span class="tw__time-l">PAST</span>
        <input type="range" min="-100" max="100" step="1" v-model.number="time" class="tw__slider" aria-label="Twin time">
        <span class="tw__time-l">SIM</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tw { position: absolute; inset: 7% 5% 5%; background: #07101f; border-radius: 6px; overflow: hidden; display: flex; flex-direction: column; font-family: var(--font-mono, ui-monospace, monospace); color: #cfe0f5; box-shadow: inset 0 0 0 1px rgba(103, 232, 249, 0.12), inset 0 0 60px rgba(3, 12, 26, 0.9); }
.tw__bar { display: flex; align-items: center; gap: 10px; padding: 6px 10px; border-bottom: 1px solid rgba(103, 232, 249, 0.14); font-size: 8px; letter-spacing: 0.08em; }
.tw__chip { color: rgba(207, 224, 245, 0.6); text-transform: uppercase; white-space: nowrap; }
.tw__chip em { color: #eaf6ff; font-style: normal; font-weight: 600; }
.tw__chip--grow { margin-left: auto; }
.tw-live { color: #4ad991 !important; } .tw-simulation { color: #67e8f9 !important; } .tw-past { color: #ffcf5c !important; }

.tw__stage { flex: 1; min-height: 0; position: relative; background: radial-gradient(120% 90% at 50% 10%, #0b1a30, #060e1c 82%); }
.tw__stage svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.tw__floor { stroke: rgba(103, 232, 249, 0.10); stroke-width: 0.3; }
.tw__conv { stroke: rgba(103, 232, 249, 0.4); stroke-width: 0.8; stroke-dasharray: 1.5 1.2; }
.tw__machine { transition: opacity 0.3s; }
.tw__sensor { animation: tw-pulse 1.6s ease-in-out infinite; }
@keyframes tw-pulse { 50% { opacity: 0.4; } }

.tw__readout { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 12px; padding: 5px 10px; border-top: 1px solid rgba(103, 232, 249, 0.12); font-size: 7.5px; }
.tw__ro-id { font-weight: 600; letter-spacing: 0.04em; }
.tw__ro-m { color: rgba(207, 224, 245, 0.55); } .tw__ro-m b { color: #eaf6ff; font-weight: 600; }
.tw__ro-status { margin-left: auto; font-weight: 600; }

.tw__controls { padding: 6px 10px 8px; display: flex; flex-direction: column; gap: 6px; border-top: 1px solid rgba(103, 232, 249, 0.12); }
.tw__scen { display: flex; gap: 4px; flex-wrap: wrap; }
.tw__scen-btn { flex: 1; min-width: 44px; padding: 4px 3px; font: inherit; font-size: 6.5px; letter-spacing: 0.04em; background: rgba(12, 24, 46, 0.6); border: 1px solid rgba(103, 232, 249, 0.18); color: rgba(207, 224, 245, 0.7); cursor: pointer; transition: all 0.25s; }
.tw__scen-btn.is-on { background: rgba(103, 232, 249, 0.16); border-color: rgba(103, 232, 249, 0.6); color: #9be7f5; }
.tw__time { display: flex; align-items: center; gap: 8px; }
.tw__time-l { font-size: 6.5px; color: rgba(103, 232, 249, 0.7); letter-spacing: 0.08em; }
.tw__slider { flex: 1; -webkit-appearance: none; appearance: none; height: 3px; background: linear-gradient(90deg, rgba(255,207,92,0.4), rgba(103,232,249,0.4)); border-radius: 2px; outline: none; }
.tw__slider::-webkit-slider-thumb { -webkit-appearance: none; width: 10px; height: 10px; border-radius: 50%; background: #67e8f9; border: 1px solid #eaf6ff; cursor: pointer; box-shadow: 0 0 8px rgba(103, 232, 249, 0.7); }
.tw__slider::-moz-range-thumb { width: 10px; height: 10px; border-radius: 50%; background: #67e8f9; border: 1px solid #eaf6ff; cursor: pointer; }

@media (prefers-reduced-motion: reduce) { .tw__sensor { animation: none; } }
</style>
