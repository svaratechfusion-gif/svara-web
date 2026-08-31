<script setup lang="ts">
// COGNITIVE AI — live enterprise knowledge graph. Documents, entities, people,
// projects and policies connect dynamically; a document-ingestion pipeline streams
// (PARSED → EMBEDDED → INDEXED → CONNECTED); a natural-language query highlights
// the relevant subgraph. Click a node to reveal the entity. Deterministic
// SIMULATED telemetry; SSR-safe.
import { reactive, ref, computed } from 'vue'
import { useTicker, wave } from '~/composables/useSystemSim'

const root = ref<HTMLElement | null>(null)

type NType = 'doc' | 'entity' | 'person' | 'project' | 'policy'
interface KNode { t: NType; label: string; x: number; y: number }
const NODES: KNode[] = [
  { t: 'doc', label: 'CONTRACT_731', x: 20, y: 20 }, { t: 'entity', label: 'SUPPLIER A', x: 40, y: 14 },
  { t: 'policy', label: 'RISK POLICY', x: 62, y: 18 }, { t: 'doc', label: 'INVOICE_2048', x: 14, y: 44 },
  { t: 'project', label: 'PROJECT ATLAS', x: 36, y: 38 }, { t: 'person', label: 'A. RAO', x: 56, y: 40 },
  { t: 'entity', label: 'REGION SOUTH', x: 78, y: 34 }, { t: 'doc', label: 'REPORT_Q3', x: 24, y: 62 },
  { t: 'project', label: 'PROC. REVIEW', x: 46, y: 60 }, { t: 'policy', label: 'SLA-04', x: 68, y: 58 },
  { t: 'person', label: 'M. IYER', x: 86, y: 52 }, { t: 'entity', label: 'SUPPLIER B', x: 60, y: 72 },
  { t: 'doc', label: 'POLICY_042', x: 88, y: 20 },
]
// edges: nearest-neighbour links (precomputed once)
const EDGES: { a: number; b: number; seed: number }[] = []
NODES.forEach((n, i) => {
  const d = NODES.map((m, j) => ({ j, dist: (m.x - n.x) ** 2 + (m.y - n.y) ** 2 })).filter(o => o.j !== i).sort((a, b) => a.dist - b.dist)
  for (const near of d.slice(0, 2)) if (!EDGES.some(e => (e.a === near.j && e.b === i))) EDGES.push({ a: i, b: near.j, seed: (i + 1) * (near.j + 3) })
})

const QUERIES = [
  { q: 'Show all contracts related to supplier risk.', hits: [0, 1, 2, 6] },
  { q: 'Which projects touch Region South?', hits: [4, 6, 8] },
  { q: 'Policies governing Supplier B invoices.', hits: [2, 9, 11, 3] },
]
const INGEST = ['Invoice_2048.pdf', 'Contract_731.pdf', 'Policy_042.pdf', 'Report_Q3.pdf']
const STAGES = ['PARSED', 'EMBEDDED', 'INDEXED', 'CONNECTED']

const tk = ref(0)
const queryIdx = ref(0)
const hits = ref<Set<number>>(new Set(QUERIES[0]!.hits))
const ingest = reactive(INGEST.map((name, i) => ({ name, stage: i % STAGES.length })))
const selected = ref<number | null>(null)
const nodesPerMin = ref(1.9)
const reasoning = ref(6.0)
let lastQ = 0, lastIng = 0

const query = computed(() => QUERIES[queryIdx.value]!.q)
const typeColor: Record<NType, string> = { doc: '#67e8f9', entity: '#6c87fe', person: '#eaf6ff', project: '#67e8f9', policy: '#ffcf5c' }
function edgeOn(e: { seed: number }): number {
  return 0.12 + Math.max(0, wave(tk.value, e.seed, -0.3, 1)) * 0.5
}
function connCount(i: number) { return EDGES.filter(e => e.a === i || e.b === i).length }

useTicker((t) => {
  tk.value = t
  nodesPerMin.value = +wave(t, 3, 1.4, 2.4).toFixed(1)
  reasoning.value = +wave(t, 5, 4.8, 7.2).toFixed(1)
  if (t - lastQ > 5) { lastQ = t; queryIdx.value = (queryIdx.value + 1) % QUERIES.length; hits.value = new Set(QUERIES[queryIdx.value]!.hits) }
  if (t - lastIng > 1.2) { lastIng = t; for (const it of ingest) it.stage = (it.stage + (Math.random() < 0.5 ? 1 : 0)) % STAGES.length }
}, { fps: 8, rootRef: root })
</script>

<template>
  <div ref="root" class="cg">
    <div class="cg__bar">
      <span class="cg__chip">KNOWLEDGE NODES <em>412K</em></span>
      <span class="cg__chip">TOKENS/MIN <em>{{ nodesPerMin }}M</em></span>
      <span class="cg__chip cg__chip--grow">REASONING TASKS <em>{{ reasoning }}K</em></span>
    </div>

    <div class="cg__body">
      <div class="cg__graph">
        <svg viewBox="0 0 100 80" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <g class="cg__edges">
            <line v-for="(e, i) in EDGES" :key="i"
              :x1="NODES[e.a]!.x" :y1="NODES[e.a]!.y" :x2="NODES[e.b]!.x" :y2="NODES[e.b]!.y"
              :class="{ 'is-hit': hits.has(e.a) && hits.has(e.b) }"
              :style="{ opacity: hits.has(e.a) && hits.has(e.b) ? 0.9 : edgeOn(e) }" />
          </g>
          <g v-for="(n, i) in NODES" :key="`n${i}`" class="cg__node" :class="[`is-${n.t}`, { 'is-hit': hits.has(i), 'is-sel': selected === i }]"
             @click="selected = selected === i ? null : i" style="cursor: pointer">
            <circle :cx="n.x" :cy="n.y" :r="hits.has(i) ? 2.8 : 2.2" :style="{ fill: typeColor[n.t] }" class="cg__dot" />
            <circle v-if="hits.has(i)" :cx="n.x" :cy="n.y" r="4.5" class="cg__halo" :style="{ stroke: typeColor[n.t] }" />
            <text :x="n.x" :y="n.y - 3.4" text-anchor="middle" class="cg__lbl">{{ n.label }}</text>
          </g>
        </svg>
        <div class="cg__query"><span class="cg__prompt">&gt;</span> {{ query }}<span class="cg__caret">_</span></div>
      </div>

      <div class="cg__side">
        <div class="cg__ingest">
          <span class="cg__ingest-h">DOCUMENT INGESTION</span>
          <div v-for="d in ingest" :key="d.name" class="cg__doc">
            <span class="cg__doc-name">{{ d.name }}</span>
            <span class="cg__doc-stage" :class="`st-${d.stage}`">{{ STAGES[d.stage] }}</span>
          </div>
        </div>
        <div class="cg__detail" :class="{ 'is-on': selected !== null }">
          <template v-if="selected !== null">
            <span class="cg__detail-h" :style="{ color: typeColor[NODES[selected]!.t] }">{{ NODES[selected]!.label }}</span>
            <span class="cg__detail-sub">{{ NODES[selected]!.t.toUpperCase() }} · {{ connCount(selected) }} RELATIONSHIPS</span>
          </template>
          <span v-else class="cg__detail-hint">CLICK A NODE → REVEAL ENTITY</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cg { position: absolute; inset: 7% 5% 5%; background: #07101f; border-radius: 6px; overflow: hidden; display: flex; flex-direction: column; font-family: var(--font-mono, ui-monospace, monospace); color: #cfe0f5; box-shadow: inset 0 0 0 1px rgba(103, 232, 249, 0.12), inset 0 0 60px rgba(3, 12, 26, 0.9); }
.cg__bar { display: flex; align-items: center; gap: 10px; padding: 6px 10px; border-bottom: 1px solid rgba(103, 232, 249, 0.14); font-size: 8px; letter-spacing: 0.08em; }
.cg__chip { color: rgba(207, 224, 245, 0.6); text-transform: uppercase; white-space: nowrap; }
.cg__chip em { color: #eaf6ff; font-style: normal; font-weight: 600; }
.cg__chip--grow { margin-left: auto; }

.cg__body { flex: 1; display: flex; min-height: 0; }
.cg__graph { flex: 1.6; min-width: 0; position: relative; }
.cg__graph svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.cg__edges line { stroke: #67e8f9; stroke-width: 0.35; transition: opacity 0.4s; }
.cg__edges line.is-hit { stroke: #67e8f9; stroke-width: 0.7; }
.cg__dot { transition: r 0.3s; }
.cg__node.is-sel .cg__dot { stroke: #fff; stroke-width: 0.8; }
.cg__halo { fill: none; stroke-width: 0.4; opacity: 0.7; animation: cg-pulse 1.8s ease-in-out infinite; }
@keyframes cg-pulse { 50% { opacity: 0.25; } }
.cg__lbl { fill: rgba(207, 224, 245, 0.7); font-size: 2.5px; letter-spacing: 0.02em; }
.cg__node.is-hit .cg__lbl { fill: #eaf6ff; }
.cg__query { position: absolute; left: 8px; right: 8px; bottom: 6px; font-size: 8px; color: rgba(207, 224, 245, 0.85); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.cg__prompt { color: #67e8f9; }
.cg__caret { color: #67e8f9; animation: cg-blink 1.05s steps(1) infinite; }
@keyframes cg-blink { 50% { opacity: 0; } }

.cg__side { flex: 1; min-width: 0; border-left: 1px solid rgba(103, 232, 249, 0.14); padding: 8px; display: flex; flex-direction: column; gap: 10px; }
.cg__ingest-h { font-size: 6.5px; letter-spacing: 0.12em; color: rgba(103, 232, 249, 0.7); }
.cg__doc { display: flex; justify-content: space-between; align-items: center; margin-top: 5px; padding: 4px 6px; background: rgba(12, 24, 46, 0.6); font-size: 7.5px; }
.cg__doc-name { color: rgba(207, 224, 245, 0.75); }
.cg__doc-stage { font-weight: 600; font-size: 6.5px; letter-spacing: 0.06em; }
.st-0 { color: rgba(207, 224, 245, 0.55); } .st-1 { color: #6c87fe; } .st-2 { color: #ffcf5c; } .st-3 { color: #67e8f9; }
.cg__detail { margin-top: auto; padding: 8px; background: rgba(12, 24, 46, 0.6); border-left: 2px solid rgba(103, 232, 249, 0.3); min-height: 40px; }
.cg__detail-h { display: block; font-size: 9px; font-weight: 600; }
.cg__detail-sub { display: block; margin-top: 3px; font-size: 7px; letter-spacing: 0.06em; color: rgba(103, 232, 249, 0.75); }
.cg__detail-hint { font-size: 7px; letter-spacing: 0.06em; color: rgba(103, 232, 249, 0.55); }

@media (prefers-reduced-motion: reduce) { .cg__halo, .cg__caret { animation: none; } }
@media (max-width: 560px) { .cg__side { display: none; } }
</style>
