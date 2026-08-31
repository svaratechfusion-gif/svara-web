<script setup lang="ts">
// ENGINEERING — live software-engineering control. A CI/CD pipeline with a build
// moving through the stages, a rolling build feed, and a service architecture
// graph with a deployment packet. Deterministic SIMULATED telemetry; SSR-safe.
import { reactive, ref, computed } from 'vue'
import { useTicker, wave } from '~/composables/useSystemSim'

const root = ref<HTMLElement | null>(null)

const PIPE = ['PLAN', 'CODE', 'BUILD', 'TEST', 'SECURITY', 'DEPLOY', 'OBSERVE']
const ARCH = [
  { k: 'FRONTEND', x: 16, y: 16 }, { k: 'API', x: 50, y: 14 }, { k: 'AI LAYER', x: 84, y: 20 },
  { k: 'DATABASE', x: 24, y: 52 }, { k: 'EDGE', x: 58, y: 48 }, { k: 'CLOUD', x: 86, y: 54 }, { k: 'OBSERVE', x: 44, y: 74 },
]
const ARCH_LINKS = [[0, 1], [1, 2], [1, 3], [1, 4], [2, 4], [4, 5], [3, 6], [4, 6], [5, 6]]

const stage = ref(2)
const builds = reactive([
  { id: 5821, st: 'BUILDING' }, { id: 5820, st: 'PASSED' }, { id: 5819, st: 'DEPLOYED' }, { id: 5818, st: 'DEPLOYED' },
])
const selected = ref<number | null>(null)
const coverage = ref(94)
const deployFreq = ref(38)
const buildsDay = ref(212)
let lastStage = 0, lastBuild = 0

const stClass = (s: string) => 'b-' + s.toLowerCase()

useTicker((t) => {
  coverage.value = +wave(t, 3, 91.5, 96.8).toFixed(1)
  deployFreq.value = Math.round(wave(t, 5, 28, 52))
  buildsDay.value = Math.round(wave(t, 7, 180, 260))
  if (t - lastStage > 1.5) { lastStage = t; stage.value = (stage.value + 1) % PIPE.length }
  if (t - lastBuild > 2.2) {
    lastBuild = t
    builds[0]!.st = Math.random() > 0.85 ? 'FAILED' : 'PASSED'
    builds.pop()
    builds.unshift({ id: builds[0]!.id + 1, st: 'BUILDING' })
  }
}, { fps: 6, rootRef: root })

const packetPath = computed(() => 'M16 16 L50 14 L58 48 L86 54')
</script>

<template>
  <div ref="root" class="en">
    <div class="en__bar">
      <span class="en__chip">BUILDS/DAY <em>{{ buildsDay }}</em></span>
      <span class="en__chip">COVERAGE <em>{{ coverage }}%</em></span>
      <span class="en__chip">DEPLOY/DAY <em>{{ deployFreq }}</em></span>
      <span class="en__chip en__chip--grow">SERVICES <em>7 · HEALTHY</em></span>
    </div>

    <!-- pipeline -->
    <div class="en__pipe">
      <div v-for="(p, i) in PIPE" :key="p" class="en__pstage" :class="{ 'is-active': i === stage, 'is-done': i < stage }">
        <span class="en__pdot" /><span class="en__plabel">{{ p }}</span>
      </div>
    </div>

    <div class="en__body">
      <div class="en__feed">
        <span class="en__col-h">BUILD FEED</span>
        <button v-for="(b, i) in builds" :key="b.id" type="button" class="en__build" :class="[stClass(b.st), { 'is-sel': selected === i }]"
          @click="selected = selected === i ? null : i">
          <span class="en__b-id">BUILD #{{ b.id }}</span>
          <span class="en__b-st">{{ b.st }}</span>
          <span v-if="selected === i" class="en__b-tl">PLAN ✓ · CODE ✓ · BUILD ✓ · TEST {{ b.st === 'FAILED' ? '✕' : '✓' }} · DEPLOY {{ b.st === 'DEPLOYED' ? '✓' : '·' }}</span>
        </button>
      </div>

      <div class="en__arch">
        <span class="en__col-h">ARCHITECTURE</span>
        <svg viewBox="0 0 100 84" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <line v-for="(l, i) in ARCH_LINKS" :key="i" :x1="ARCH[l[0]!]!.x" :y1="ARCH[l[0]!]!.y" :x2="ARCH[l[1]!]!.x" :y2="ARCH[l[1]!]!.y" class="en__alink" />
          <path :d="packetPath" fill="none" stroke="none" id="enpk" />
          <circle r="1.3" class="en__apk"><animateMotion dur="3.2s" repeatCount="indefinite"><mpath href="#enpk" /></animateMotion></circle>
          <g v-for="(n, i) in ARCH" :key="i" class="en__anode">
            <circle :cx="n.x" :cy="n.y" r="2.6" /><text :x="n.x" :y="n.y - 3.6" text-anchor="middle">{{ n.k }}</text>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
.en { position: absolute; inset: 7% 5% 5%; background: #07101f; border-radius: 6px; overflow: hidden; display: flex; flex-direction: column; font-family: var(--font-mono, ui-monospace, monospace); color: #cfe0f5; box-shadow: inset 0 0 0 1px rgba(103, 232, 249, 0.12), inset 0 0 60px rgba(3, 12, 26, 0.9); }
.en__bar { display: flex; align-items: center; gap: 10px; padding: 6px 10px; border-bottom: 1px solid rgba(103, 232, 249, 0.14); font-size: 8px; letter-spacing: 0.08em; }
.en__chip { color: rgba(207, 224, 245, 0.6); text-transform: uppercase; white-space: nowrap; }
.en__chip em { color: #eaf6ff; font-style: normal; font-weight: 600; }
.en__chip--grow { margin-left: auto; }
.en__col-h { font-size: 6.5px; letter-spacing: 0.12em; color: rgba(103, 232, 249, 0.7); }

.en__pipe { display: flex; align-items: center; justify-content: space-between; gap: 3px; padding: 8px 10px; border-bottom: 1px solid rgba(103, 232, 249, 0.1); }
.en__pstage { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; position: relative; }
.en__pstage::after { content: ""; position: absolute; top: 3px; left: 50%; width: 100%; height: 1px; background: rgba(103, 232, 249, 0.15); z-index: 0; }
.en__pstage:last-child::after { display: none; }
.en__pdot { width: 7px; height: 7px; border-radius: 50%; background: #0b1830; border: 1px solid rgba(103, 232, 249, 0.35); position: relative; z-index: 1; transition: all 0.3s; }
.en__pstage.is-done .en__pdot { background: #4ad991; border-color: #4ad991; }
.en__pstage.is-active .en__pdot { background: #67e8f9; border-color: #67e8f9; box-shadow: 0 0 8px #67e8f9; animation: en-pulse 1.2s ease-in-out infinite; }
@keyframes en-pulse { 50% { transform: scale(1.3); } }
.en__plabel { font-size: 6px; letter-spacing: 0.04em; color: rgba(207, 224, 245, 0.5); }
.en__pstage.is-active .en__plabel { color: #67e8f9; }

.en__body { flex: 1; display: flex; min-height: 0; }
.en__feed { flex: 1; min-width: 0; padding: 8px; display: flex; flex-direction: column; gap: 5px; }
.en__build { display: grid; grid-template-columns: 1fr auto; gap: 2px 6px; padding: 5px 7px; background: rgba(12, 24, 46, 0.6); border-left: 2px solid rgba(103, 232, 249, 0.3); cursor: pointer; text-align: left; border-top: 0; border-right: 0; border-bottom: 0; }
.en__b-id { font-size: 8px; color: #eaf6ff; font-weight: 600; }
.en__b-st { font-size: 7px; font-weight: 600; letter-spacing: 0.06em; }
.en__b-tl { grid-column: 1 / -1; font-size: 6.5px; color: rgba(207, 224, 245, 0.6); margin-top: 2px; }
.b-building { border-left-color: #67e8f9; } .b-building .en__b-st { color: #67e8f9; }
.b-passed { border-left-color: #4ad991; } .b-passed .en__b-st { color: #4ad991; }
.b-deployed { border-left-color: #6c87fe; } .b-deployed .en__b-st { color: #6c87fe; }
.b-failed { border-left-color: #ff5c7a; } .b-failed .en__b-st { color: #ff5c7a; }

.en__arch { flex: 1.1; min-width: 0; border-left: 1px solid rgba(103, 232, 249, 0.14); padding: 8px; display: flex; flex-direction: column; }
.en__arch svg { flex: 1; width: 100%; margin-top: 4px; }
.en__alink { stroke: rgba(103, 232, 249, 0.2); stroke-width: 0.35; }
.en__apk { fill: #67e8f9; }
.en__anode circle { fill: #0b1830; stroke: rgba(103, 232, 249, 0.5); stroke-width: 0.6; }
.en__anode text { fill: rgba(207, 224, 245, 0.7); font-size: 2.7px; letter-spacing: 0.02em; }

@media (prefers-reduced-motion: reduce) { .en__pstage.is-active .en__pdot, .en__apk { animation: none; } }
@media (max-width: 560px) { .en__arch { display: none; } }
</style>
