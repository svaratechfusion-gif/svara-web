<script setup lang="ts">
// VISION AI — live computer-vision command wall. Six simulated camera feeds with
// live bounding boxes, per-camera FPS/latency, a rolling detection stream, and
// threat/active/load telemetry — all driven by the deterministic sim engine.
// Hover a camera to expand; click to enter focused inspection (shows detection
// metadata). SIMULATED demo telemetry. SSR-safe (static first frame).
import { reactive, ref, computed } from 'vue'
import { useTicker, wave } from '~/composables/useSystemSim'

const root = ref<HTMLElement | null>(null)

interface Box { seed: number; cls: string; bx: number; by: number; x: number; y: number; w: number; h: number; conf: number; on: boolean }
interface Cam { id: string; scene: string; hue: number; fps: number; lat: number; det: number; boxes: Box[] }

const SCENES = ['FACTORY FLOOR', 'WAREHOUSE', 'ROAD INTERSECTION', 'CONSTRUCTION', 'FACILITY ENTRANCE', 'LOADING BAY']
const BOX_LAYOUTS = [
  [
    { cls: 'FORKLIFT', x: 13, y: 25, w: 31, h: 28 },
    { cls: 'ZONE', x: 57, y: 42, w: 25, h: 22 },
  ],
  [
    { cls: 'HELMET', x: 14, y: 50, w: 21, h: 15 },
    { cls: 'VEHICLE', x: 52, y: 29, w: 30, h: 24 },
  ],
  [
    { cls: 'PERSON', x: 35, y: 45, w: 15, h: 18 },
    { cls: 'RESTRICTED', x: 62, y: 29, w: 33, h: 24 },
  ],
  [
    { cls: 'ZONE', x: 19, y: 38, w: 34, h: 31 },
    { cls: 'FORKLIFT', x: 61, y: 27, w: 18, h: 25 },
  ],
  [
    { cls: 'VEHICLE', x: 22, y: 52, w: 32, h: 22 },
    { cls: 'FORKLIFT', x: 60, y: 36, w: 31, h: 28 },
  ],
  [
    { cls: 'HELMET', x: 18, y: 30, w: 17, h: 22 },
    { cls: 'FORKLIFT', x: 55, y: 50, w: 27, h: 20 },
  ],
] as const

const cams = reactive<Cam[]>(SCENES.map((scene, i) => ({
  id: 'CAM ' + String(i + 1).padStart(2, '0'),
  scene, hue: 198 + i * 6, fps: 60, lat: 9, det: 0,
  boxes: BOX_LAYOUTS[i]!.map((b, bi) => ({
    seed: (i + 1) * 17 + bi * 13,
    cls: b.cls,
    bx: b.x, by: b.y, x: b.x, y: b.y, w: b.w, h: b.h,
    conf: 0.9, on: true,
  })),
})))

const threat = ref(0.18)          // 0..1
const load = ref(46)              // %
const totalDet = ref(0)
const feed = ref<{ t: string; cam: string; cls: string; conf: number }[]>([])
const hovered = ref<number | null>(null)
const focused = ref<number | null>(null)
let lastFeed = -2
let fseq = 0

const threatLabel = computed(() => (threat.value > 0.66 ? 'ELEVATED' : threat.value > 0.33 ? 'GUARDED' : 'NOMINAL'))
const activeCams = computed(() => cams.filter(c => c.fps > 20).length)

function clock(t: number): string {
  const total = 30600 + Math.floor(t * 7)     // ~08:30 start, deterministic
  const h = Math.floor(total / 3600) % 24, m = Math.floor(total / 60) % 60, s = total % 60
  return [h, m, s].map(n => String(n).padStart(2, '0')).join(':')
}

useTicker((t) => {
  let det = 0
  for (let i = 0; i < cams.length; i++) {
    const c = cams[i]!
    c.fps = Math.round(wave(t, i * 3.1, 28, 60))
    c.lat = Math.round(wave(t, i * 1.7 + 5, 6, 19))
    let on = 0
    for (const b of c.boxes) {
      b.on = wave(t, b.seed, -0.35, 1) > 0.36
      if (b.on) {
        on++
        b.conf = wave(t, b.seed * 1.7, 0.87, 0.99)
        b.x = b.bx + Math.sin(t * 0.5 + b.seed) * 2.2
        b.y = b.by + Math.cos(t * 0.42 + b.seed * 1.3) * 1.6
      }
    }
    c.det = on; det += on
  }
  totalDet.value = det + Math.floor(t * 2.3)
  threat.value = wave(t, 9, 0.08, 0.72)
  load.value = Math.round(wave(t, 3, 38, 82))

  // rolling detection stream — a new deterministic event ~every 1.4s
  if (t - lastFeed > 1.4) {
    lastFeed = t
    const ci = fseq % cams.length
    const b = cams[ci]!.boxes[fseq % cams[ci]!.boxes.length]!
    feed.value = [{ t: clock(t), cam: cams[ci]!.id, cls: b.cls, conf: b.conf }, ...feed.value].slice(0, 5)
    fseq++
  }
}, { fps: 10, rootRef: root })

function onCam(i: number) { focused.value = focused.value === i ? null : i }
</script>

<template>
  <div ref="root" class="vis" :class="{ 'is-focused': focused !== null }">
    <!-- telemetry bar -->
    <div class="vis__bar">
      <span class="vis__chip"><b :class="`is-${threatLabel.toLowerCase()}`">●</b> THREAT <em>{{ threatLabel }}</em></span>
      <span class="vis__chip">ACTIVE <em>{{ activeCams }}/6</em></span>
      <span class="vis__chip">LOAD <em>{{ load }}%</em></span>
      <span class="vis__chip vis__chip--grow">DETECTIONS <em>{{ totalDet.toLocaleString() }}</em></span>
    </div>

    <!-- camera wall -->
    <div class="vis__grid">
      <button
        v-for="(c, i) in cams" :key="c.id" type="button" class="vis__cam"
        :class="{ 'is-hover': hovered === i, 'is-focus': focused === i, 'is-off': focused !== null && focused !== i }"
        :style="{ '--hue': c.hue }"
        @pointerenter="hovered = i" @pointerleave="hovered = null" @click="onCam(i)"
        :aria-label="`${c.id} ${c.scene}`"
      >
        <span class="vis__scene" aria-hidden="true"><span class="vis__scan" /></span>
        <svg class="vis__boxes" viewBox="0 0 100 72" preserveAspectRatio="none" aria-hidden="true">
          <g v-for="(b, bi) in c.boxes" :key="bi" :class="{ 'is-on': b.on }" class="vis__box">
            <rect :x="b.x" :y="b.y" :width="b.w" :height="b.h" />
            <text :x="b.x" :y="b.y - 1.5">{{ b.cls }} {{ b.conf.toFixed(2) }}</text>
          </g>
        </svg>
        <span class="vis__hud">
          <span class="vis__id"><span class="vis__live" /> {{ c.id }}</span>
          <span class="vis__meta">{{ c.fps }}FPS · {{ c.lat }}MS</span>
        </span>
        <span class="vis__scene-name">{{ c.scene }}</span>
      </button>
    </div>

    <!-- detection stream -->
    <div class="vis__stream" aria-hidden="true">
      <span class="vis__stream-h">LIVE DETECTION STREAM</span>
      <TransitionGroup name="vis-feed" tag="div" class="vis__stream-list">
        <span v-for="(e, i) in feed" :key="e.t + e.cam + i" class="vis__ev">
          <em>{{ e.t }}</em> {{ e.cam }} · <b>{{ e.cls }}</b> {{ e.conf.toFixed(2) }}
        </span>
      </TransitionGroup>
    </div>

    <!-- focus inspection panel -->
    <div v-if="focused !== null" class="vis__inspect" @click.self="focused = null">
      <div class="vis__inspect-card">
        <span class="vis__inspect-h">{{ cams[focused]!.id }} · {{ cams[focused]!.scene }}</span>
        <span class="vis__inspect-sub">FOCUSED INSPECTION · {{ cams[focused]!.fps }}FPS · {{ cams[focused]!.lat }}MS LATENCY</span>
        <ul class="vis__inspect-list">
          <li v-for="(b, bi) in cams[focused]!.boxes" :key="bi" :class="{ 'is-off': !b.on }">
            <span class="vis__inspect-cls">{{ b.cls }}</span>
            <span class="vis__inspect-conf">{{ b.on ? b.conf.toFixed(3) : '—' }}</span>
          </li>
        </ul>
        <button type="button" class="vis__inspect-close" @click="focused = null">CLOSE ⏎</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vis {
  position: absolute; inset: 7% 5% 5%;
  background: #07101f; border-radius: 6px; overflow: hidden;
  display: flex; flex-direction: column;
  font-family: var(--font-mono, ui-monospace, monospace); color: #cfe0f5;
  box-shadow: inset 0 0 0 1px rgba(103, 232, 249, 0.12), inset 0 0 60px rgba(3, 12, 26, 0.9);
}
.vis__bar { display: flex; align-items: center; gap: 10px; padding: 6px 10px; border-bottom: 1px solid rgba(103, 232, 249, 0.14); font-size: 8px; letter-spacing: 0.08em; }
.vis__chip { display: inline-flex; align-items: center; gap: 5px; color: rgba(207, 224, 245, 0.6); text-transform: uppercase; white-space: nowrap; }
.vis__chip em { color: #eaf6ff; font-style: normal; font-weight: 600; }
.vis__chip--grow { margin-left: auto; }
.vis__chip b { font-size: 9px; }
.vis__chip b.is-nominal { color: #67e8f9; }
.vis__chip b.is-guarded { color: #ffcf5c; }
.vis__chip b.is-elevated { color: #ff5c7a; }

.vis__grid { position: relative; flex: 1; display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(2, 1fr); gap: 3px; padding: 3px; min-height: 0; }
.vis__cam {
  position: relative; overflow: hidden; padding: 0; border: 1px solid rgba(103, 232, 249, 0.14);
  background: #0a1526; cursor: pointer; transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.28s, box-shadow 0.28s, opacity 0.28s;
}
.vis__cam.is-hover { transform: scale(1.04); z-index: 4; border-color: rgba(103, 232, 249, 0.5); box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.7); }
.vis__cam.is-off { opacity: 0.28; }
.vis__cam.is-focus { z-index: 5; }
.vis__scene { position: absolute; inset: 0; background: radial-gradient(120% 90% at 30% 20%, hsl(var(--hue) 55% 22%), #060e1c 78%); }
.vis__scene::before { content: ""; position: absolute; inset: 0; background-image: linear-gradient(rgba(103, 232, 249, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(103, 232, 249, 0.05) 1px, transparent 1px); background-size: 14px 14px; }
.vis__scan { position: absolute; left: 0; right: 0; height: 22%; top: -22%; background: linear-gradient(180deg, transparent, hsl(var(--hue) 80% 60% / 0.14)); animation: vis-scan 4.5s linear infinite; }
@keyframes vis-scan { to { top: 100%; } }
.vis__boxes { position: absolute; inset: 0; width: 100%; height: 100%; }
.vis__box { opacity: 0; transition: opacity 0.3s; }
.vis__box.is-on { opacity: 1; }
.vis__box rect { fill: none; stroke: #67e8f9; stroke-width: 0.6; vector-effect: non-scaling-stroke; }
.vis__box text { fill: #9be7f5; font-size: 3.4px; font-family: var(--font-mono, monospace); }
.vis__hud { position: absolute; top: 3px; left: 4px; right: 4px; display: flex; justify-content: space-between; font-size: 6.5px; letter-spacing: 0.04em; color: rgba(207, 224, 245, 0.85); pointer-events: none; }
.vis__id { display: inline-flex; align-items: center; gap: 3px; }
.vis__live { width: 4px; height: 4px; border-radius: 50%; background: #ff5c7a; box-shadow: 0 0 6px #ff5c7a; animation: vis-blink 1.4s steps(1) infinite; }
@keyframes vis-blink { 50% { opacity: 0.3; } }
.vis__meta { color: rgba(155, 231, 245, 0.7); }
.vis__scene-name { position: absolute; bottom: 3px; left: 4px; font-size: 6px; letter-spacing: 0.1em; color: rgba(207, 224, 245, 0.55); pointer-events: none; }

.vis__stream { border-top: 1px solid rgba(103, 232, 249, 0.14); padding: 5px 10px 7px; }
.vis__stream-h { font-size: 7px; letter-spacing: 0.14em; color: rgba(103, 232, 249, 0.7); }
.vis__stream-list { position: relative; margin-top: 3px; height: 46px; overflow: hidden; }
.vis__ev { display: block; font-size: 8px; line-height: 1.55; color: rgba(207, 224, 245, 0.72); white-space: nowrap; }
.vis__ev em { color: #67e8f9; font-style: normal; }
.vis__ev b { color: #eaf6ff; font-weight: 600; }
.vis-feed-enter-active { transition: transform 0.4s var(--ease-out, ease), opacity 0.4s; }
.vis-feed-enter-from { transform: translateY(-8px); opacity: 0; }

.vis__inspect { position: absolute; inset: 0; z-index: 10; display: grid; place-items: center; background: rgba(4, 10, 22, 0.72); backdrop-filter: blur(3px); }
.vis__inspect-card { width: min(78%, 260px); padding: 14px 16px; background: #0b1830; border: 1px solid rgba(103, 232, 249, 0.4); box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.8); clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%); }
.vis__inspect-h { display: block; font-size: 11px; font-weight: 600; letter-spacing: 0.02em; color: #eaf6ff; }
.vis__inspect-sub { display: block; margin-top: 3px; font-size: 7.5px; letter-spacing: 0.08em; color: rgba(103, 232, 249, 0.75); }
.vis__inspect-list { list-style: none; margin: 10px 0 0; padding: 0; display: flex; flex-direction: column; gap: 4px; }
.vis__inspect-list li { display: flex; justify-content: space-between; font-size: 9px; padding: 3px 0; border-bottom: 1px solid rgba(103, 232, 249, 0.1); }
.vis__inspect-list li.is-off { opacity: 0.35; }
.vis__inspect-cls { color: #cfe0f5; }
.vis__inspect-conf { color: #67e8f9; font-variant-numeric: tabular-nums; }
.vis__inspect-close { margin-top: 12px; width: 100%; padding: 7px; background: rgba(103, 232, 249, 0.12); border: 1px solid rgba(103, 232, 249, 0.4); color: #9be7f5; font: inherit; font-size: 8px; letter-spacing: 0.12em; cursor: pointer; }
.vis__inspect-close:hover { background: rgba(103, 232, 249, 0.2); }

@media (prefers-reduced-motion: reduce) { .vis__scan, .vis__live { animation: none; } }
@media (max-width: 560px) { .vis__scene-name, .vis__stream { display: none; } }
</style>
