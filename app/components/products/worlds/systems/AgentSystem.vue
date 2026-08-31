<script setup lang="ts">
// AI AGENTS — multi-agent orchestration command center. A SVARA Agent Core with
// seven specialist agents in a ring, tasks flowing along the connectors, a live
// task queue, and orchestration metrics. Click an agent to focus its stream.
// Deterministic SIMULATED telemetry; SSR-safe.
import { reactive, ref, computed } from 'vue'
import { useTicker, wave, seededRandom } from '~/composables/useSystemSim'

const root = ref<HTMLElement | null>(null)

const AGENTS = ['SALES', 'SUPPORT', 'FINANCE', 'HR', 'OPS', 'RESEARCH', 'VOICE']
const N = AGENTS.length
const nodes = AGENTS.map((label, i) => {
  const a = (-90 + i * (360 / N)) * Math.PI / 180
  return { label, x: 50 + 37 * Math.cos(a), y: 50 + 37 * Math.sin(a), dur: 2.2 + (i % 4) * 0.6 }
})

const STATES = ['RUNNING', 'COMPLETED', 'WAITING', 'ESCALATED'] as const
const rnd = seededRandom(731042)
const tasks = reactive(Array.from({ length: 6 }, (_, i) => ({
  id: 2481 + i, agent: Math.floor(rnd() * N), state: STATES[Math.floor(rnd() * 3)]!,
})))
let nextId = 2481 + 6

const agentsActive = ref(6)
const tasksMin = ref(64)
const success = ref(98.6)
const load = reactive(nodes.map(() => 0.4))
const selected = ref<number | null>(null)
let lastTask = -1

const autonomy = computed(() => (success.value > 99 ? 'L4 · SUPERVISED-OPTIONAL' : 'L3 · SUPERVISED'))
const stateClass = (s: string) => 's-' + s.toLowerCase()

useTicker((t) => {
  agentsActive.value = Math.round(wave(t, 2, 5, 7))
  tasksMin.value = Math.round(wave(t, 5, 42, 92))
  success.value = +wave(t, 8, 96.2, 99.7).toFixed(1)
  for (let i = 0; i < N; i++) load[i] = wave(t, i * 2.3, 0.2, 1)
  // advance the queue deterministically ~every 1.1s
  if (t - lastTask > 1.1) {
    lastTask = t
    const idx = Math.floor(t * 3) % tasks.length
    const cur = tasks[idx]!
    if (cur.state === 'RUNNING') cur.state = rnd() > 0.82 ? 'ESCALATED' : 'COMPLETED'
    else { cur.id = nextId++; cur.agent = Math.floor(rnd() * N); cur.state = rnd() > 0.7 ? 'WAITING' : 'RUNNING' }
  }
}, { fps: 8, rootRef: root })
</script>

<template>
  <div ref="root" class="ag">
    <div class="ag__bar">
      <span class="ag__chip">AGENTS <em>{{ agentsActive }}/7</em></span>
      <span class="ag__chip">TASKS/MIN <em>{{ tasksMin }}</em></span>
      <span class="ag__chip">SUCCESS <em>{{ success }}%</em></span>
      <span class="ag__chip ag__chip--grow">AUTONOMY <em>{{ autonomy }}</em></span>
    </div>

    <div class="ag__body">
      <div class="ag__swarm">
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <!-- connectors + flowing tasks -->
          <g v-for="(n, i) in nodes" :key="`c${i}`" :class="{ 'is-sel': selected === i, 'is-dim': selected !== null && selected !== i }" class="ag__conn">
            <line x1="50" y1="50" :x2="n.x" :y2="n.y" />
            <circle r="1.3" class="ag__tok"><animateMotion :dur="`${n.dur}s`" repeatCount="indefinite" :path="`M50 50 L${n.x} ${n.y}`" /></circle>
            <circle r="1" class="ag__tok ag__tok--in"><animateMotion :dur="`${n.dur + 1}s`" begin="0.6s" repeatCount="indefinite" :path="`M${n.x} ${n.y} L50 50`" /></circle>
          </g>
          <!-- agents -->
          <g v-for="(n, i) in nodes" :key="`n${i}`" class="ag__node" :class="{ 'is-sel': selected === i, 'is-dim': selected !== null && selected !== i }"
             @click="selected = selected === i ? null : i" style="cursor: pointer">
            <circle :cx="n.x" :cy="n.y" :r="4.4 + load[i]! * 1.6" class="ag__node-halo" />
            <circle :cx="n.x" :cy="n.y" r="3.4" class="ag__node-dot" />
            <text :x="n.x" :y="n.y - 6.5" text-anchor="middle" class="ag__node-lbl">{{ n.label }}</text>
          </g>
          <!-- core -->
          <circle cx="50" cy="50" r="12" class="ag__core-halo" />
          <circle cx="50" cy="50" r="8" class="ag__core" />
          <text x="50" y="49" text-anchor="middle" class="ag__core-t1">SVARA</text>
          <text x="50" y="53.5" text-anchor="middle" class="ag__core-t2">CORE</text>
        </svg>
      </div>

      <div class="ag__queue">
        <span class="ag__queue-h">TASK QUEUE {{ selected !== null ? '· ' + AGENTS[selected] : '' }}</span>
        <ul class="ag__queue-list">
          <li v-for="tk in tasks" :key="tk.id" :class="[stateClass(tk.state), { 'is-focus': selected === tk.agent }]">
            <span class="ag__q-id">TASK {{ tk.id }}</span>
            <span class="ag__q-agent">{{ AGENTS[tk.agent] }}</span>
            <span class="ag__q-state">{{ tk.state }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ag { position: absolute; inset: 7% 5% 5%; background: #07101f; border-radius: 6px; overflow: hidden; display: flex; flex-direction: column; font-family: var(--font-mono, ui-monospace, monospace); color: #cfe0f5; box-shadow: inset 0 0 0 1px rgba(103, 232, 249, 0.12), inset 0 0 60px rgba(3, 12, 26, 0.9); }
.ag__bar { display: flex; align-items: center; gap: 10px; padding: 6px 10px; border-bottom: 1px solid rgba(103, 232, 249, 0.14); font-size: 8px; letter-spacing: 0.08em; }
.ag__chip { color: rgba(207, 224, 245, 0.6); text-transform: uppercase; white-space: nowrap; }
.ag__chip em { color: #eaf6ff; font-style: normal; font-weight: 600; }
.ag__chip--grow { margin-left: auto; }

.ag__body { flex: 1; display: flex; min-height: 0; }
.ag__swarm { flex: 1.35; min-width: 0; display: grid; place-items: center; padding: 4px; }
.ag__swarm svg { width: 100%; height: 100%; }

.ag__conn line { stroke: rgba(103, 232, 249, 0.22); stroke-width: 0.4; }
.ag__conn.is-sel line { stroke: rgba(103, 232, 249, 0.7); stroke-width: 0.7; }
.ag__conn.is-dim { opacity: 0.3; }
.ag__tok { fill: #67e8f9; }
.ag__tok--in { fill: #6c87fe; }

.ag__node-halo { fill: rgba(103, 232, 249, 0.10); transition: fill 0.3s; }
.ag__node-dot { fill: #0b1830; stroke: #67e8f9; stroke-width: 0.7; transition: stroke 0.3s, fill 0.3s; }
.ag__node-lbl { fill: rgba(207, 224, 245, 0.8); font-size: 3.1px; font-family: var(--font-mono, monospace); letter-spacing: 0.04em; }
.ag__node.is-sel .ag__node-dot { fill: #67e8f9; stroke: #eaf6ff; }
.ag__node.is-sel .ag__node-halo { fill: rgba(103, 232, 249, 0.28); }
.ag__node.is-dim { opacity: 0.4; }

.ag__core-halo { fill: rgba(108, 135, 254, 0.14); animation: ag-breathe 3s ease-in-out infinite; transform-origin: 50px 50px; }
@keyframes ag-breathe { 50% { transform: scale(1.12); } }
.ag__core { fill: #0b1830; stroke: #6c87fe; stroke-width: 0.8; }
.ag__core-t1 { fill: #eaf6ff; font-size: 3.4px; font-weight: 700; text-anchor: middle; }
.ag__core-t2 { fill: rgba(103, 232, 249, 0.85); font-size: 2.6px; letter-spacing: 0.1em; }

.ag__queue { flex: 1; min-width: 0; border-left: 1px solid rgba(103, 232, 249, 0.14); padding: 7px 8px; display: flex; flex-direction: column; }
.ag__queue-h { font-size: 7px; letter-spacing: 0.12em; color: rgba(103, 232, 249, 0.7); }
.ag__queue-list { list-style: none; margin: 6px 0 0; padding: 0; display: flex; flex-direction: column; gap: 4px; }
.ag__queue-list li { display: grid; grid-template-columns: 1fr auto; grid-template-rows: auto auto; gap: 0 6px; padding: 5px 7px; background: rgba(12, 24, 46, 0.7); border-left: 2px solid rgba(103, 232, 249, 0.3); font-size: 8px; transition: border-color 0.3s, background 0.3s; }
.ag__queue-list li.is-focus { background: rgba(103, 232, 249, 0.10); }
.ag__q-id { color: #eaf6ff; font-weight: 600; }
.ag__q-agent { grid-row: 2; color: rgba(207, 224, 245, 0.55); font-size: 7px; }
.ag__q-state { grid-column: 2; grid-row: 1 / span 2; align-self: center; font-size: 7px; font-weight: 600; letter-spacing: 0.06em; }
.ag__queue-list li.s-running { border-left-color: #67e8f9; } .s-running .ag__q-state { color: #67e8f9; }
.ag__queue-list li.s-completed { border-left-color: #4ad991; } .s-completed .ag__q-state { color: #4ad991; }
.ag__queue-list li.s-waiting { border-left-color: #ffcf5c; } .s-waiting .ag__q-state { color: #ffcf5c; }
.ag__queue-list li.s-escalated { border-left-color: #ff5c7a; } .s-escalated .ag__q-state { color: #ff5c7a; }

@media (prefers-reduced-motion: reduce) { .ag__core-halo { animation: none; } }
@media (max-width: 560px) { .ag__queue { display: none; } }
</style>
