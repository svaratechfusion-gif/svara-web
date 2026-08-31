<script setup lang="ts">
// DRONE AI — autonomous fleet command. A tactical map with mission zones and five
// drones flying live paths, per-drone telemetry (altitude/speed/battery/signal),
// and a rolling mission timeline. Click a drone to follow it. Deterministic
// SIMULATED telemetry; SSR-safe.
import { reactive, ref, computed } from 'vue'
import { useTicker, wave } from '~/composables/useSystemSim'

const root = ref<HTMLElement | null>(null)

interface Drone { id: string; path: string; dur: number; alt: number; spd: number; bat: number; sig: number; state: string }
const STATES = ['PATROL', 'INSPECT', 'RETURN', 'HOVER', 'TRACK']
const drones = reactive<Drone[]>([
  { id: 'DR-01', path: 'M8 60 C28 40 40 20 62 24 S86 52 92 18', dur: 11, alt: 120, spd: 42, bat: 88, sig: 96, state: 'PATROL' },
  { id: 'DR-02', path: 'M12 20 C30 34 44 60 66 54 S88 24 94 46', dur: 13, alt: 95, spd: 38, bat: 74, sig: 92, state: 'INSPECT' },
  { id: 'DR-03', path: 'M6 40 C26 52 48 44 60 30 S82 40 96 32', dur: 9, alt: 140, spd: 51, bat: 63, sig: 88, state: 'TRACK' },
  { id: 'DR-04', path: 'M14 66 C34 54 46 30 70 36 S88 60 90 40', dur: 15, alt: 78, spd: 29, bat: 91, sig: 98, state: 'HOVER' },
  { id: 'DR-05', path: 'M10 30 C32 22 50 50 68 44 S84 18 92 56', dur: 12, alt: 110, spd: 45, bat: 55, sig: 84, state: 'RETURN' },
])
const selected = ref<number | null>(null)
const incidents = ref(1)
const feed = ref<{ t: string; msg: string }[]>([])
const SCRIPT = ['PATROL STARTED', 'OBJECT DETECTED', 'CLASSIFIED · VEHICLE', 'ROUTE UPDATED', 'THERMAL LOCK', 'ZONE CLEARED', 'INCIDENT RESOLVED', 'RTK RE-SYNC']
let lastEv = -3, sidx = 0

const activeMissions = computed(() => drones.filter(d => d.state !== 'RETURN').length)
function clk(t: number) { const tot = 31260 + Math.floor(t * 11); return [Math.floor(tot / 3600) % 24, Math.floor(tot / 60) % 60].map(n => String(n).padStart(2, '0')).join(':') }

useTicker((t) => {
  for (let i = 0; i < drones.length; i++) {
    const d = drones[i]!
    d.alt = Math.round(wave(t, i * 2.2, 70, 150))
    d.spd = Math.round(wave(t, i * 1.4 + 1, 24, 56))
    d.sig = Math.round(wave(t, i * 3.1 + 2, 80, 99))
    d.bat = Math.max(18, Math.round(88 - ((t * (0.4 + i * 0.12)) % 70)))
  }
  incidents.value = wave(t, 6, 0, 3) > 1.8 ? 2 : 1
  if (t - lastEv > 2) {
    lastEv = t
    feed.value = [{ t: clk(t), msg: `${drones[sidx % drones.length]!.id} · ${SCRIPT[sidx % SCRIPT.length]}` }, ...feed.value].slice(0, 5)
    sidx++
  }
}, { fps: 8, rootRef: root })
</script>

<template>
  <div ref="root" class="dr">
    <div class="dr__bar">
      <span class="dr__chip">FLEET <em>{{ drones.length }}/37</em></span>
      <span class="dr__chip">ACTIVE <em>{{ activeMissions }}</em></span>
      <span class="dr__chip">INCIDENTS <em :class="{ 'dr__hot': incidents > 1 }">{{ incidents }}</em></span>
      <span class="dr__chip dr__chip--grow">MODE <em>BVLOS · RTK LOCK</em></span>
    </div>

    <div class="dr__body">
      <div class="dr__map">
        <svg viewBox="0 0 100 72" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <pattern id="drgrid" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M8 0H0V8" fill="none" stroke="rgba(103,232,249,0.08)" stroke-width="0.3" /></pattern>
          </defs>
          <rect x="0" y="0" width="100" height="72" fill="url(#drgrid)" />
          <!-- zones -->
          <polygon points="6,44 30,36 34,64 10,68" class="dr__zone dr__zone--patrol" /><text x="18" y="54" class="dr__zt">PATROL</text>
          <rect x="66" y="8" width="26" height="20" rx="1" class="dr__zone dr__zone--restrict" /><text x="79" y="20" class="dr__zt dr__zt--r">RESTRICTED</text>
          <circle cx="58" cy="46" r="9" class="dr__zone dr__zone--incident" /><text x="58" y="47" class="dr__zt dr__zt--a" text-anchor="middle">INCIDENT</text>
          <circle cx="86" cy="56" r="6" class="dr__zone dr__zone--target" /><text x="86" y="57" class="dr__zt dr__zt--c" text-anchor="middle">TARGET</text>
          <!-- flight paths + drones -->
          <g v-for="(d, i) in drones" :key="d.id" class="dr__unit" :class="{ 'is-sel': selected === i, 'is-dim': selected !== null && selected !== i }"
             @click="selected = selected === i ? null : i" style="cursor: pointer">
            <path :id="`fp${i}`" :d="d.path" class="dr__path" fill="none" />
            <g class="dr__marker">
              <polygon points="0,-2.4 2,2 -2,2" class="dr__craft" />
              <animateMotion :dur="`${d.dur}s`" repeatCount="indefinite" rotate="auto"><mpath :href="`#fp${i}`" /></animateMotion>
            </g>
          </g>
        </svg>
      </div>

      <div class="dr__side">
        <div class="dr__tele">
          <span class="dr__tele-h">{{ selected !== null ? drones[selected]!.id : 'FLEET TELEMETRY' }}</span>
          <div class="dr__tele-grid">
            <span>ALT <b class="dr__cy">{{ selected !== null ? drones[selected]!.alt : Math.round(drones.reduce((s, d) => s + d.alt, 0) / drones.length) }}M</b></span>
            <span>SPEED <b>{{ selected !== null ? drones[selected]!.spd : Math.round(drones.reduce((s, d) => s + d.spd, 0) / drones.length) }}KMH</b></span>
            <span>BATTERY <b>{{ selected !== null ? drones[selected]!.bat : Math.round(drones.reduce((s, d) => s + d.bat, 0) / drones.length) }}%</b></span>
            <span>SIGNAL <b>{{ selected !== null ? drones[selected]!.sig : 94 }}%</b></span>
            <span>THERMAL <b class="dr__cy">ON</b></span>
            <span>EDGE <b class="dr__cy">INFER</b></span>
          </div>
          <span class="dr__tele-state" v-if="selected !== null">STATE · {{ drones[selected]!.state }}</span>
        </div>
        <div class="dr__mission">
          <span class="dr__mission-h">MISSION TIMELINE</span>
          <TransitionGroup name="dr-ev" tag="div" class="dr__mission-list">
            <span v-for="(e, i) in feed" :key="e.t + e.msg + i" class="dr__ev"><em>{{ e.t }}</em> {{ e.msg }}</span>
          </TransitionGroup>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dr { position: absolute; inset: 7% 5% 5%; background: #07101f; border-radius: 6px; overflow: hidden; display: flex; flex-direction: column; font-family: var(--font-mono, ui-monospace, monospace); color: #cfe0f5; box-shadow: inset 0 0 0 1px rgba(103, 232, 249, 0.12), inset 0 0 60px rgba(3, 12, 26, 0.9); }
.dr__bar { display: flex; align-items: center; gap: 10px; padding: 6px 10px; border-bottom: 1px solid rgba(103, 232, 249, 0.14); font-size: 8px; letter-spacing: 0.08em; }
.dr__chip { color: rgba(207, 224, 245, 0.6); text-transform: uppercase; white-space: nowrap; }
.dr__chip em { color: #eaf6ff; font-style: normal; font-weight: 600; }
.dr__chip--grow { margin-left: auto; }
.dr__hot { color: #ff5c7a !important; }
.dr__cy { color: #67e8f9 !important; }

.dr__body { flex: 1; display: flex; min-height: 0; }
.dr__map { flex: 1.5; min-width: 0; position: relative; background: radial-gradient(120% 100% at 50% 0%, #0b1a30, #060e1c 80%); }
.dr__map svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.dr__zone { stroke-width: 0.5; }
.dr__zone--patrol { fill: rgba(108, 135, 254, 0.08); stroke: rgba(108, 135, 254, 0.5); }
.dr__zone--restrict { fill: rgba(255, 92, 122, 0.06); stroke: rgba(255, 92, 122, 0.45); stroke-dasharray: 2 1.5; }
.dr__zone--incident { fill: rgba(255, 207, 92, 0.08); stroke: rgba(255, 207, 92, 0.6); animation: dr-pulse 2.2s ease-in-out infinite; transform-origin: 58px 46px; }
.dr__zone--target { fill: rgba(103, 232, 249, 0.08); stroke: rgba(103, 232, 249, 0.6); }
@keyframes dr-pulse { 50% { opacity: 0.55; } }
.dr__zt { fill: rgba(108, 135, 254, 0.85); font-size: 2.7px; letter-spacing: 0.1em; }
.dr__zt--r { fill: rgba(255, 92, 122, 0.85); } .dr__zt--a { fill: rgba(255, 207, 92, 0.9); } .dr__zt--c { fill: rgba(103, 232, 249, 0.9); }
.dr__path { stroke: rgba(103, 232, 249, 0.28); stroke-width: 0.4; stroke-dasharray: 1.5 1.5; }
.dr__unit.is-sel .dr__path { stroke: rgba(103, 232, 249, 0.8); stroke-width: 0.7; stroke-dasharray: none; }
.dr__unit.is-dim { opacity: 0.34; }
.dr__craft { fill: #07101f; stroke: #67e8f9; stroke-width: 0.7; }
.dr__unit.is-sel .dr__craft { fill: #67e8f9; stroke: #eaf6ff; }

.dr__side { flex: 1; min-width: 0; border-left: 1px solid rgba(103, 232, 249, 0.14); padding: 8px; display: flex; flex-direction: column; gap: 10px; }
.dr__tele-h { font-size: 8px; font-weight: 600; letter-spacing: 0.06em; color: #eaf6ff; }
.dr__tele-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px 8px; margin-top: 6px; font-size: 7.5px; color: rgba(207, 224, 245, 0.6); }
.dr__tele-grid b { color: #eaf6ff; font-weight: 600; font-variant-numeric: tabular-nums; }
.dr__tele-state { display: block; margin-top: 6px; font-size: 7px; letter-spacing: 0.08em; color: rgba(103, 232, 249, 0.75); }
.dr__mission { margin-top: auto; }
.dr__mission-h { font-size: 6.5px; letter-spacing: 0.12em; color: rgba(103, 232, 249, 0.7); }
.dr__mission-list { margin-top: 4px; height: 66px; overflow: hidden; }
.dr__ev { display: block; font-size: 7.5px; line-height: 1.6; color: rgba(207, 224, 245, 0.72); white-space: nowrap; }
.dr__ev em { color: #67e8f9; font-style: normal; }
.dr-ev-enter-active { transition: transform 0.4s ease, opacity 0.4s; }
.dr-ev-enter-from { transform: translateY(-8px); opacity: 0; }

@media (prefers-reduced-motion: reduce) { .dr__zone--incident { animation: none; } }
@media (max-width: 560px) { .dr__side { display: none; } }
</style>
