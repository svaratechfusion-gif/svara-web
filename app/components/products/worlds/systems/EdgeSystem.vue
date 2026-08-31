<script setup lang="ts">
// EDGE AI — distributed edge-intelligence network. A live topology of edge nodes
// around a gateway + cloud, packets streaming between them, per-node compute
// telemetry, a rolling edge-latency sparkline, and a cloud-vs-edge race. Click a
// node to inspect its local inference. Deterministic SIMULATED telemetry; SSR-safe.
import { reactive, ref, computed } from 'vue'
import { useTicker, wave } from '~/composables/useSystemSim'

const root = ref<HTMLElement | null>(null)

interface Node { key: string; label: string; x: number; y: number; cpu: number; npu: number; lat: number; temp: number }
const nodes = reactive<Node[]>([
  { key: 'factory', label: 'FACTORY', x: 12, y: 58, cpu: 40, npu: 55, lat: 11, temp: 48 },
  { key: 'vehicle', label: 'VEHICLE', x: 30, y: 64, cpu: 52, npu: 61, lat: 9, temp: 51 },
  { key: 'camera', label: 'CAMERA', x: 50, y: 66, cpu: 61, npu: 72, lat: 8, temp: 55 },
  { key: 'plc', label: 'PLC', x: 70, y: 64, cpu: 38, npu: 44, lat: 12, temp: 46 },
  { key: 'sensor', label: 'SENSOR', x: 88, y: 58, cpu: 29, npu: 33, lat: 10, temp: 42 },
])
const GATEWAY = { x: 50, y: 34 }
const CLOUD = { x: 50, y: 9 }

const latHist = ref<number[]>(Array.from({ length: 26 }, () => 11))
const bwSaved = ref(99)
const selected = ref<number | null>(null)
const onlineCount = computed(() => nodes.length)

useTicker((t) => {
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i]!
    n.cpu = Math.round(wave(t, i * 2.1, 22, 74))
    n.npu = Math.round(wave(t, i * 1.6 + 3, 30, 88))
    n.lat = Math.round(wave(t, i * 3.3 + 1, 7, 15))
    n.temp = Math.round(wave(t, i * 0.9 + 2, 40, 62))
  }
  const edgeLat = Math.round(wave(t, 4, 8, 14))
  latHist.value = [...latHist.value.slice(1), edgeLat]
  bwSaved.value = +wave(t, 7, 98.2, 99.6).toFixed(1)
}, { fps: 8, rootRef: root })

const spark = computed(() => latHist.value.map((v, i) => `${(i / (latHist.value.length - 1)) * 100},${28 - ((v - 6) / 12) * 24}`).join(' '))
</script>

<template>
  <div ref="root" class="ed">
    <div class="ed__bar">
      <span class="ed__chip">LOCAL INFERENCE <em>{{ latHist[latHist.length - 1] }}ms</em></span>
      <span class="ed__chip">BANDWIDTH SAVED <em>{{ bwSaved }}%</em></span>
      <span class="ed__chip">NODES <em>{{ onlineCount }} ONLINE</em></span>
      <span class="ed__chip ed__chip--grow">MODE <em>OFFLINE-CAPABLE</em></span>
    </div>

    <div class="ed__body">
      <div class="ed__net">
        <svg viewBox="0 0 100 72" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <!-- links + packets -->
          <line :x1="CLOUD.x" :y1="CLOUD.y" :x2="GATEWAY.x" :y2="GATEWAY.y" class="ed__link ed__link--cloud" />
          <circle r="1" class="ed__pk ed__pk--up"><animateMotion dur="3.4s" repeatCount="indefinite" :path="`M${GATEWAY.x} ${GATEWAY.y} L${CLOUD.x} ${CLOUD.y}`" /></circle>
          <g v-for="(n, i) in nodes" :key="`l${i}`" :class="{ 'is-sel': selected === i, 'is-dim': selected !== null && selected !== i }">
            <line :x1="GATEWAY.x" :y1="GATEWAY.y" :x2="n.x" :y2="n.y" class="ed__link" />
            <circle r="0.9" class="ed__pk"><animateMotion :dur="`${1 + (i % 3) * 0.5}s`" repeatCount="indefinite" :path="`M${n.x} ${n.y} L${GATEWAY.x} ${GATEWAY.y}`" /></circle>
          </g>
          <!-- cloud + gateway -->
          <g class="ed__cloud"><circle :cx="CLOUD.x" :cy="CLOUD.y" r="4.5" /><text :x="CLOUD.x" :y="CLOUD.y - 6" text-anchor="middle">CLOUD</text></g>
          <g class="ed__gw"><rect :x="GATEWAY.x - 5" :y="GATEWAY.y - 3" width="10" height="6" rx="1" /><text :x="GATEWAY.x" :y="GATEWAY.y - 5" text-anchor="middle">GATEWAY</text></g>
          <!-- edge nodes -->
          <g v-for="(n, i) in nodes" :key="`n${i}`" class="ed__node" :class="{ 'is-sel': selected === i, 'is-dim': selected !== null && selected !== i }"
             @click="selected = selected === i ? null : i" style="cursor: pointer">
            <circle :cx="n.x" :cy="n.y" r="3.2" class="ed__node-dot" />
            <circle :cx="n.x" :cy="n.y" :r="3.2 + (n.npu / 100) * 2.2" class="ed__node-ring" />
            <text :x="n.x" :y="n.y + 6.5" text-anchor="middle" class="ed__node-lbl">{{ n.label }}</text>
          </g>
        </svg>
      </div>

      <div class="ed__side">
        <!-- cloud vs edge race -->
        <div class="ed__race">
          <div class="ed__race-row"><span>CLOUD</span><span class="ed__track"><i class="ed__req ed__req--cloud" /></span><b>1,240ms</b></div>
          <div class="ed__race-row ed__race-row--edge"><span>EDGE</span><span class="ed__track"><i class="ed__req ed__req--edge" /></span><b class="ed__cy">11ms</b></div>
        </div>
        <!-- latency sparkline -->
        <div class="ed__spark">
          <span class="ed__spark-h">EDGE LATENCY · ms</span>
          <svg viewBox="0 0 100 30" preserveAspectRatio="none"><polyline :points="spark" fill="none" /></svg>
        </div>
        <!-- selected node detail -->
        <div class="ed__detail" :class="{ 'is-on': selected !== null }">
          <template v-if="selected !== null">
            <span class="ed__detail-h">{{ nodes[selected]!.label }} · LOCAL INFERENCE</span>
            <div class="ed__detail-grid">
              <span>CPU <b>{{ nodes[selected]!.cpu }}%</b></span>
              <span>NPU <b>{{ nodes[selected]!.npu }}%</b></span>
              <span>LAT <b class="ed__cy">{{ nodes[selected]!.lat }}ms</b></span>
              <span>TEMP <b>{{ nodes[selected]!.temp }}°C</b></span>
            </div>
          </template>
          <span v-else class="ed__detail-hint">CLICK A NODE → LOCAL MODEL EXECUTION</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ed { position: absolute; inset: 7% 5% 5%; background: #07101f; border-radius: 6px; overflow: hidden; display: flex; flex-direction: column; font-family: var(--font-mono, ui-monospace, monospace); color: #cfe0f5; box-shadow: inset 0 0 0 1px rgba(103, 232, 249, 0.12), inset 0 0 60px rgba(3, 12, 26, 0.9); }
.ed__bar { display: flex; align-items: center; gap: 10px; padding: 6px 10px; border-bottom: 1px solid rgba(103, 232, 249, 0.14); font-size: 8px; letter-spacing: 0.08em; }
.ed__chip { color: rgba(207, 224, 245, 0.6); text-transform: uppercase; white-space: nowrap; }
.ed__chip em { color: #eaf6ff; font-style: normal; font-weight: 600; }
.ed__chip--grow { margin-left: auto; }
.ed__cy { color: #67e8f9 !important; }

.ed__body { flex: 1; display: flex; min-height: 0; }
.ed__net { flex: 1.4; min-width: 0; display: grid; place-items: center; padding: 4px; }
.ed__net svg { width: 100%; height: 100%; }
.ed__link { stroke: rgba(103, 232, 249, 0.22); stroke-width: 0.4; }
.ed__link--cloud { stroke: rgba(108, 135, 254, 0.4); stroke-dasharray: 2 2; }
.ed__link.is-sel, g.is-sel .ed__link { stroke: rgba(103, 232, 249, 0.7); stroke-width: 0.7; }
g.is-dim { opacity: 0.32; }
.ed__pk { fill: #67e8f9; }
.ed__pk--up { fill: #6c87fe; }
.ed__cloud circle { fill: #0b1830; stroke: #6c87fe; stroke-width: 0.7; }
.ed__cloud text, .ed__gw text { fill: rgba(207, 224, 245, 0.8); font-size: 2.8px; }
.ed__gw rect { fill: #0b1830; stroke: #67e8f9; stroke-width: 0.6; }
.ed__node-dot { fill: #0b1830; stroke: #67e8f9; stroke-width: 0.7; }
.ed__node-ring { fill: none; stroke: rgba(103, 232, 249, 0.28); stroke-width: 0.3; }
.ed__node-lbl { fill: rgba(207, 224, 245, 0.75); font-size: 2.7px; letter-spacing: 0.03em; }
.ed__node.is-sel .ed__node-dot { fill: #67e8f9; stroke: #eaf6ff; }

.ed__side { flex: 1; min-width: 0; border-left: 1px solid rgba(103, 232, 249, 0.14); padding: 8px; display: flex; flex-direction: column; gap: 10px; }
.ed__race { display: flex; flex-direction: column; gap: 6px; }
.ed__race-row { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 6px; font-size: 7.5px; color: rgba(207, 224, 245, 0.7); }
.ed__race-row b { color: #eaf6ff; font-weight: 600; }
.ed__track { position: relative; height: 3px; background: rgba(103, 232, 249, 0.12); border-radius: 2px; overflow: hidden; }
.ed__req { position: absolute; top: 0; left: 0; width: 8px; height: 3px; border-radius: 2px; }
.ed__req--cloud { background: #6c87fe; animation: ed-run 3.4s linear infinite; }
.ed__req--edge { background: #67e8f9; animation: ed-run 0.34s linear infinite; }
@keyframes ed-run { from { left: -8px; } to { left: 100%; } }

.ed__spark-h { font-size: 6.5px; letter-spacing: 0.1em; color: rgba(103, 232, 249, 0.7); }
.ed__spark svg { width: 100%; height: 30px; margin-top: 2px; }
.ed__spark polyline { stroke: #67e8f9; stroke-width: 1; vector-effect: non-scaling-stroke; }

.ed__detail { margin-top: auto; padding: 7px 8px; background: rgba(12, 24, 46, 0.6); border-left: 2px solid rgba(103, 232, 249, 0.3); min-height: 46px; }
.ed__detail-h { display: block; font-size: 8px; font-weight: 600; color: #eaf6ff; }
.ed__detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3px 8px; margin-top: 5px; font-size: 7.5px; color: rgba(207, 224, 245, 0.6); }
.ed__detail-grid b { color: #eaf6ff; font-weight: 600; }
.ed__detail-hint { font-size: 7px; letter-spacing: 0.06em; color: rgba(103, 232, 249, 0.55); }

@media (prefers-reduced-motion: reduce) { .ed__req, .ed__pk, .ed__pk--up { animation: none; } }
@media (max-width: 560px) { .ed__side { display: none; } }
</style>
