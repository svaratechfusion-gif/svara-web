<script setup lang="ts">
// 08–15 · THE EIGHT ARCHITECTURE LAYERS — sources, edge, data, AI, cognition,
// simulation, orchestration, applications. Each is a distinct architecture
// diagram (not cards), alternating on one continuous spine. Reveal + domain
// motion on view; paused off-screen.
//
// Every frame pairs its diagram with the shared analysis column
// (`components/instrument/*`) — trend with a hatched forecast tail, the
// descriptive readout computed from that series, and a composition ring — then a
// metric rail with movement and traces, and the goal bar that closes it. Same
// grammar as the division, industry and technology instruments: a blueprint that
// also states how the layer behaves once it is running.
import { onBeforeUnmount, onMounted, ref } from 'vue'
import InstDonut from '~/components/instrument/InstDonut.vue'
import InstMetric from '~/components/instrument/InstMetric.vue'
import InstStats from '~/components/instrument/InstStats.vue'
import InstTarget from '~/components/instrument/InstTarget.vue'
import InstTrend from '~/components/instrument/InstTrend.vue'

interface Metric { l: string, v: string, d: string, dir: 'up' | 'down', s: number[] }
/** The analysis column beside each layer's diagram — the same three reads the
 *  division, industry and technology instruments carry. REPRESENTATIONAL: these
 *  give the blueprint a believable operating shape, they are not measured SVARA
 *  telemetry and must not be quoted as performance claims. */
interface Analysis {
  status: string
  trend: { label: string, series: number[], axis: string[], mark: { i: number, v: string }, projected: number, unit: string, precision: number }
  mix: { label: string, total: string, totalLabel: string, segments: { k: string, v: number }[] }
  metrics: Metric[]
  target: { k: string, now: number, goal: number, unit: string }
}
interface Layer { n: string, eyebrow: string, headline: string[], body: string, chips: string[], visual: string, an: Analysis }
const layers: Layer[] = [
  { n: '01', eyebrow: 'Input Architecture', headline: ['Every system', 'becomes a signal.'], visual: 'sources',
    body: 'SVARA begins by connecting the physical and digital environments where enterprise operations already exist.',
    chips: ['CAMERAS', 'DRONES', 'IOT', 'MACHINES', 'SENSORS', 'ERP', 'CRM', 'DATABASES', 'APIs', 'CLOUD'], an: { status: 'INGESTING',
      trend: { label: 'SOURCES CONNECTED · 12MO', unit: 'k', precision: 1, projected: 2,
        series: [6.1, 6.8, 7.4, 7.2, 8.3, 9.0, 9.6, 10.2, 10.9, 11.4, 12.0, 12.4, 13.1, 13.8],
        axis: ['Q1', 'Q2', 'Q3', 'Q4'], mark: { i: 11, v: '12.4k endpoints' } },
      mix: { label: 'SOURCE CLASS', total: '12.4k', totalLabel: 'ENDPOINTS', segments: [{ k: 'MACHINES', v: 34 }, { k: 'CAMERAS', v: 28 }, { k: 'ENTERPRISE', v: 24 }, { k: 'IOT', v: 14 }] },
      metrics: [
        { l: 'CONNECTED ENDPOINTS', v: '12.4k', d: '+18.6%', dir: 'up', s: [6.1, 7.4, 8.3, 9.6, 10.9, 11.7, 12.1, 12.4] },
        { l: 'INGEST RATE', v: '940k/s', d: '+22%', dir: 'up', s: [510, 578, 641, 704, 776, 843, 902, 940] },
        { l: 'SCHEMA COVERAGE', v: '96.2%', d: '+4.1%', dir: 'up', s: [88.4, 90.1, 91.6, 92.9, 94.1, 95.2, 95.8, 96.2] },
      ],
      target: { k: 'SYSTEM ONBOARDING', now: 77, goal: 96, unit: '%' } } },
  { n: '02', eyebrow: 'Distributed Intelligence', headline: ['Compute closer', 'to the signal.'], visual: 'edge',
    body: 'SVARA can process intelligence at the edge, within enterprise infrastructure or through the cloud — by latency, privacy and operational need. Not all raw data must travel the whole system.',
    chips: ['EDGE AI', 'VISION INFERENCE', 'DRONE COMPUTE', 'LOCAL PROCESSING', 'EVENT FILTERING', 'OFFLINE OPERATION'], an: { status: 'DISTRIBUTED',
      trend: { label: 'EDGE INFERENCE LATENCY · 30D', unit: 'ms', precision: 0, projected: 2,
        series: [21, 20, 19, 20, 17, 16, 15, 14, 13, 12, 11, 9, 9, 8],
        axis: ['D-30', 'D-20', 'D-10', 'NOW'], mark: { i: 11, v: '9ms' } },
      mix: { label: 'COMPUTE PLACEMENT', total: '318', totalLabel: 'NODES', segments: [{ k: 'EDGE', v: 46 }, { k: 'ENTERPRISE', v: 31 }, { k: 'CLOUD', v: 23 }] },
      metrics: [
        { l: 'EDGE LATENCY', v: '9ms', d: '-34%', dir: 'down', s: [21, 19, 17, 15, 13, 11, 10, 9] },
        { l: 'LOCAL PROCESSING', v: '78%', d: '+12pt', dir: 'up', s: [61, 64, 67, 70, 72, 75, 77, 78] },
        { l: 'EDGE NODES', v: '318', d: '+64', dir: 'up', s: [196, 218, 241, 262, 281, 297, 309, 318] },
      ],
      target: { k: 'OFFLINE RESILIENCE', now: 84, goal: 99, unit: '%' } } },
  { n: '03', eyebrow: 'Intelligence Fabric', headline: ['One context across', 'every system.'], visual: 'data',
    body: 'SVARA unifies operational streams, enterprise systems and contextual knowledge into a shared intelligence fabric AI systems can understand and act upon.',
    chips: ['REAL-TIME STREAMS', 'ENTERPRISE DATA', 'KNOWLEDGE BASES', 'VECTOR STORES', 'EVENT HISTORY', 'OPERATIONAL CONTEXT'], an: { status: 'UNIFYING',
      trend: { label: 'CONTEXT FRESHNESS · 24H', unit: 's', precision: 1, projected: 2,
        series: [3.4, 3.2, 3.0, 3.1, 2.7, 2.5, 2.3, 2.1, 1.9, 1.7, 1.6, 1.4, 1.3, 1.2],
        axis: ['00:00', '06:00', '12:00', '18:00', '24:00'], mark: { i: 11, v: '1.4s' } },
      mix: { label: 'FABRIC CONTENT', total: '4.8B', totalLabel: 'RECORDS', segments: [{ k: 'RT STREAMS', v: 36 }, { k: 'ENTERPRISE', v: 29 }, { k: 'KNOWLEDGE', v: 21 }, { k: 'VECTORS', v: 14 }] },
      metrics: [
        { l: 'CONTEXT FRESHNESS', v: '1.4s', d: '-41%', dir: 'down', s: [3.4, 3.0, 2.7, 2.3, 1.9, 1.7, 1.5, 1.4] },
        { l: 'UNIFIED RECORDS', v: '4.8B', d: '+26.4%', dir: 'up', s: [2.6, 2.9, 3.3, 3.6, 4.0, 4.3, 4.6, 4.8] },
        { l: 'QUERY LATENCY', v: '18ms', d: '-19%', dir: 'down', s: [31, 29, 27, 25, 23, 21, 19, 18] },
      ],
      target: { k: 'FABRIC COVERAGE', now: 72, goal: 94, unit: '%' } } },
  { n: '04', eyebrow: 'Intelligence Services', headline: ['Multiple models.', 'One intelligence layer.'], visual: 'ai',
    body: 'Different operational problems require different forms of intelligence. Specialized AI systems operate independently while contributing to a shared intelligence environment — model-agnostic across external, open and internal models.',
    chips: ['VISION', 'MULTIMODAL', 'LANGUAGE', 'PREDICTIVE', 'ANOMALY', 'RECOMMENDATION'], an: { status: 'SERVING',
      trend: { label: 'MODEL THROUGHPUT · 24H', unit: 'k/s', precision: 1, projected: 3,
        series: [28.4, 31.2, 36.8, 41.4, 46.1, 49.8, 53.2, 56.7, 59.1, 61.0, 62.4, 61.8, 64.2, 66.5],
        axis: ['00:00', '06:00', '12:00', '18:00', '24:00'], mark: { i: 10, v: '62.4k / s' } },
      mix: { label: 'MODEL CLASS', total: '46', totalLabel: 'MODELS', segments: [{ k: 'VISION', v: 38 }, { k: 'LANGUAGE', v: 26 }, { k: 'PREDICTIVE', v: 21 }, { k: 'ANOMALY', v: 15 }] },
      metrics: [
        { l: 'MODEL THROUGHPUT', v: '62.4k', d: '+19.8%', dir: 'up', s: [28.4, 36.8, 44.1, 51.2, 56.7, 59.8, 61.4, 62.4] },
        { l: 'MODELS DEPLOYED', v: '46', d: '+9', dir: 'up', s: [31, 34, 36, 39, 41, 43, 45, 46] },
        { l: 'ROUTING ACCURACY', v: '98.3%', d: '+1.6%', dir: 'up', s: [95.1, 95.8, 96.4, 96.9, 97.4, 97.8, 98.1, 98.3] },
      ],
      target: { k: 'MODEL PORTABILITY', now: 88, goal: 100, unit: '%' } } },
  { n: '05', eyebrow: 'Cognitive Architecture', headline: ['From inference', 'to decision.'], visual: 'cognition',
    body: "SVARA's cognitive layer lets agents interpret objectives, access tools, coordinate specialized capabilities and execute controlled multi-step workflows.",
    chips: ['MEMORY', 'CONTEXT', 'TOOLS', 'PERMISSIONS', 'STATE', 'HUMAN APPROVAL'], an: { status: 'DECIDING',
      trend: { label: 'DECISION SUCCESS · 30D', unit: '%', precision: 1, projected: 2,
        series: [86.2, 87.1, 88.4, 87.9, 89.6, 90.7, 91.6, 92.4, 93.2, 94.0, 94.7, 95.2, 95.7, 96.1],
        axis: ['D-30', 'D-20', 'D-10', 'NOW'], mark: { i: 11, v: '95.2%' } },
      mix: { label: 'DECISION PATH', total: '38k', totalLabel: 'DECISIONS', segments: [{ k: 'AGENTS', v: 35 }, { k: 'TOOLS', v: 27 }, { k: 'MEMORY', v: 20 }, { k: 'APPROVAL', v: 18 }] },
      metrics: [
        { l: 'DECISION SUCCESS', v: '95.2%', d: '+4.4%', dir: 'up', s: [86.2, 88.4, 89.6, 91.6, 93.2, 94.3, 94.9, 95.2] },
        { l: 'HUMAN APPROVALS', v: '12%', d: '-7pt', dir: 'down', s: [19, 18, 17, 16, 15, 14, 13, 12] },
        { l: 'TOOL INVOCATIONS', v: '214k', d: '+31%', dir: 'up', s: [104, 122, 139, 156, 174, 191, 204, 214] },
      ],
      target: { k: 'GOVERNED AUTONOMY', now: 66, goal: 92, unit: '%' } } },
  { n: '06', eyebrow: 'Simulation Architecture', headline: ['Model the world', 'before changing it.'], visual: 'simulation',
    body: "SVARA's simulation layer bridges operational reality and predictive intelligence, evaluating possible outcomes before execution — continuously synchronized, both directions.",
    chips: ['DIGITAL TWINS', 'SIMULATION', 'FORECASTING', 'SCENARIO MODELLING', 'OPTIMIZATION'], an: { status: 'MODELLING',
      trend: { label: 'TWIN SYNC LAG · 30D', unit: 's', precision: 1, projected: 2,
        series: [4.8, 4.6, 4.3, 4.4, 3.9, 3.6, 3.3, 3.0, 2.8, 2.5, 2.3, 2.1, 2.0, 1.8],
        axis: ['D-30', 'D-20', 'D-10', 'NOW'], mark: { i: 11, v: '2.1s' } },
      mix: { label: 'SIMULATION LOAD', total: '96', totalLabel: 'TWINS', segments: [{ k: 'SCENARIO', v: 40 }, { k: 'FORECAST', v: 27 }, { k: 'OPTIMIZATION', v: 20 }, { k: 'SYNTHETIC', v: 13 }] },
      metrics: [
        { l: 'TWIN SYNC LAG', v: '2.1s', d: '-44%', dir: 'down', s: [4.8, 4.3, 3.9, 3.3, 2.8, 2.4, 2.2, 2.1] },
        { l: 'ACTIVE TWINS', v: '96', d: '+22', dir: 'up', s: [58, 63, 69, 75, 81, 87, 92, 96] },
        { l: 'SCENARIO ACCURACY', v: '96.8%', d: '+2.2%', dir: 'up', s: [93.1, 93.9, 94.6, 95.2, 95.8, 96.2, 96.6, 96.8] },
      ],
      target: { k: 'BIDIRECTIONAL SYNC', now: 74, goal: 98, unit: '%' } } },
  { n: '07', eyebrow: 'Control Plane', headline: ['One control layer', 'across intelligence.'], visual: 'orchestration',
    body: "SVARA's orchestration architecture coordinates models, agents, workflows, enterprise systems and autonomous operations through a unified control plane — the nervous system of the architecture.",
    chips: ['MODEL ROUTING', 'AGENT ROUTING', 'WORKFLOW ENGINE', 'EVENT BUS', 'POLICY ENGINE', 'SCHEDULER', 'API GATEWAY'], an: { status: 'ROUTING',
      trend: { label: 'CONTROL PLANE THROUGHPUT · 24H', unit: 'k/s', precision: 1, projected: 3,
        series: [9.2, 11.4, 14.1, 16.8, 19.2, 21.0, 22.6, 23.8, 24.6, 24.1, 25.4, 26.2, 27.1, 28.4],
        axis: ['00:00', '06:00', '12:00', '18:00', '24:00'], mark: { i: 8, v: '24.6k / s' } },
      mix: { label: 'PLANE TRAFFIC', total: '1.8M', totalLabel: 'REQUESTS', segments: [{ k: 'AGENT ROUTING', v: 32 }, { k: 'MODEL ROUTING', v: 28 }, { k: 'WORKFLOW', v: 24 }, { k: 'EVENTS', v: 16 }] },
      metrics: [
        { l: 'ROUTED / SEC', v: '24.6k', d: '+28.4%', dir: 'up', s: [9.2, 14.1, 17.8, 21.0, 22.9, 23.8, 24.3, 24.6] },
        { l: 'P99 ROUTING', v: '6ms', d: '-24%', dir: 'down', s: [11, 10, 9, 9, 8, 7, 7, 6] },
        { l: 'POLICY DECISIONS', v: '1.8M', d: '+33.1%', dir: 'up', s: [0.9, 1.04, 1.19, 1.34, 1.49, 1.62, 1.72, 1.8] },
      ],
      target: { k: 'PLANE COVERAGE', now: 91, goal: 100, unit: '%' } } },
  { n: '08', eyebrow: 'Application Layer', headline: ['Intelligence', 'where people work.'], visual: 'applications',
    body: 'SVARA exposes intelligence through applications, dashboards, APIs, command environments and enterprise systems — bringing AI directly into operational workflows as architecture endpoints.',
    chips: ['ONE AI OS', 'COMMAND CENTER', 'ENTERPRISE SOFTWARE', 'DASHBOARDS', 'APIs', 'WORKFLOWS'], an: { status: 'DELIVERING',
      trend: { label: 'ACTIVE ENDPOINTS · 12MO', unit: '', precision: 0, projected: 2,
        series: [284, 312, 348, 341, 392, 424, 458, 486, 514, 548, 578, 612, 641, 674],
        axis: ['Q1', 'Q2', 'Q3', 'Q4'], mark: { i: 11, v: '612 endpoints' } },
      mix: { label: 'ENDPOINT TYPE', total: '612', totalLabel: 'ENDPOINTS', segments: [{ k: 'APPLICATIONS', v: 34 }, { k: 'APIs', v: 28 }, { k: 'DASHBOARDS', v: 22 }, { k: 'WORKFLOWS', v: 16 }] },
      metrics: [
        { l: 'ACTIVE ENDPOINTS', v: '612', d: '+118', dir: 'up', s: [284, 348, 392, 458, 514, 562, 592, 612] },
        { l: 'API CALLS / DAY', v: '84M', d: '+24.7%', dir: 'up', s: [42, 48, 54, 61, 68, 74, 80, 84] },
        { l: 'TIME TO INTEGRATE', v: '3.2d', d: '-46%', dir: 'down', s: [7.4, 6.6, 5.9, 5.2, 4.6, 4.0, 3.6, 3.2] },
      ],
      target: { k: 'WORKFLOW EMBEDDING', now: 70, goal: 95, unit: '%' } } },
]
const id = (i: number) => `arc-layer-${i + 1}`

const sources = { phys: ['CAMERAS', 'DRONES', 'MACHINES', 'SENSORS', 'IOT'], dig: ['ERP', 'CRM', 'DATABASES', 'APIs', 'CLOUD'] }
const edgeNodes = ['FACTORY EDGE', 'SITE EDGE', 'FLEET EDGE']
const dataStages = ['INGEST', 'NORMALIZE', 'INDEX', 'CONTEXTUALIZE', 'SERVE']
const aiModules = ['Vision', 'Multimodal', 'Language', 'Predictive', 'Anomaly', 'Recommendation']
const cogFlow = ['OBJECTIVE', 'ORCHESTRATOR', 'PLANNER', 'AGENTS', 'TOOLS', 'VERIFY', 'ACTION']
const cogAgents = ['Vision', 'Data', 'Operations', 'Analysis']
const orchFlow = ['REQUEST', 'POLICY', 'ROUTING', 'SERVICE', 'AGENT / WORKFLOW', 'EXECUTION', 'OBSERVABILITY', 'RESULT']
const appEndpoints = ['One AI OS', 'Command Center', 'Enterprise Software', 'Dashboards', 'APIs', 'Workflows']
const simScenarios = [{ l: 'SCENARIO A', v: 74 }, { l: 'SCENARIO B', v: 88 }, { l: 'SCENARIO C', v: 81 }, { l: 'OPTIMIZED', v: 96, acc: true }]

const revealed = ref(new Set<string>())
let observer: IntersectionObserver | null = null
onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { const el = e.target as HTMLElement; if (!revealed.value.has(el.id)) revealed.value = new Set([...revealed.value, el.id]) } })
  }, { rootMargin: '0px 0px -35% 0px', threshold: 0.05 })
  layers.forEach((_, i) => { const el = document.getElementById(id(i)); if (el) observer?.observe(el) })
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <section class="aly">
    <div class="hx-container">
      <div class="aly__chapters">
        <span class="aly__spine" aria-hidden="true" />
        <article
          v-for="(l, i) in layers"
          :id="id(i)"
          :key="l.n"
          class="alay"
          :class="{ 'is-revealed': revealed.has(id(i)), 'alay--rev': i % 2 === 1 }"
        >
          <div class="alay__marker" aria-hidden="true"><span class="alay__node" /></div>
          <div class="alay__grid">
            <div class="alay__copy">
              <p class="alay__eyebrow hx-mono-label"><span class="alay__n">{{ l.n }}</span> // {{ l.eyebrow }}</p>
              <h3 class="alay__name"><span v-for="(line, k) in l.headline" :key="k" :class="{ lite: k > 0 }">{{ line }}<br v-if="k < l.headline.length - 1"></span></h3>
              <p class="alay__body">{{ l.body }}</p>
              <ul class="alay__chips"><li v-for="c in l.chips" :key="c">{{ c }}</li></ul>
            </div>

            <div class="alay__frame">
              <span class="hx-pin tl" /><span class="hx-pin tr" /><span class="hx-pin bl" /><span class="hx-pin br" />
              <div class="alay__frame-bar">
                <span class="hx-mono"><span class="hx-dot" /> SVARA · {{ l.eyebrow.toUpperCase() }} / L{{ l.n }}</span>
                <span class="alay__status">{{ l.an.status }}<i /></span>
              </div>
              <div class="alay__main">
              <div class="avz" aria-hidden="true">
                <!-- 01 sources: converging input topology -->
                <div v-if="l.visual === 'sources'" class="av-src">
                  <div class="av-src__col"><span class="av-src__h">PHYSICAL</span><span v-for="s in sources.phys" :key="s" class="av-src__chip">{{ s }}<i /></span></div>
                  <div class="av-src__port"><span class="av-src__port-dot" />SVARA<br>PORT</div>
                  <div class="av-src__col av-src__col--r"><span class="av-src__h">DIGITAL</span><span v-for="s in sources.dig" :key="s" class="av-src__chip"><i />{{ s }}</span></div>
                </div>

                <!-- 02 edge: raw → event distributed nodes -->
                <div v-else-if="l.visual === 'edge'" class="av-edge">
                  <div v-for="(e, k) in edgeNodes" :key="e" class="av-edge__node" :style="{ '--k': k }">
                    <span class="av-edge__name">{{ e }}</span>
                    <span class="av-edge__flow"><b>RAW</b><i class="av-edge__filter">FILTER</i><b class="av-edge__ev">EVENT</b></span>
                  </div>
                  <div class="av-edge__central"><span class="av-edge__central-dot" />CENTRAL<br>INTELLIGENCE</div>
                </div>

                <!-- 03 data: normalization pipeline + streams -->
                <div v-else-if="l.visual === 'data'" class="av-data">
                  <div class="av-data__streams"><span>REAL-TIME</span><span class="av-data__hist">HISTORICAL</span></div>
                  <div class="av-data__pipe"><span v-for="(d, k) in dataStages" :key="d" class="av-data__st" :style="{ '--k': k }">{{ d }}</span></div>
                  <div class="av-data__unified"><span class="av-data__unified-dot" />UNIFIED CONTEXT LAYER</div>
                </div>

                <!-- 04 ai: modular services → router -->
                <div v-else-if="l.visual === 'ai'" class="av-ai">
                  <div class="av-ai__mods"><span v-for="m in aiModules" :key="m" class="av-ai__mod">{{ m }}</span></div>
                  <div class="av-ai__router"><span class="av-ai__router-dot" />MODEL ROUTER</div>
                  <div class="av-ai__out"><span>INFERENCE</span><span>CONTEXT ENGINE</span></div>
                </div>

                <!-- 05 cognition: multi-agent flow -->
                <div v-else-if="l.visual === 'cognition'" class="av-cog">
                  <div class="av-cog__flow"><span v-for="(c, k) in cogFlow" :key="c" class="av-cog__step" :class="{ 'is-agents': c === 'AGENTS' }" :style="{ '--k': k }">{{ c }}<span v-if="c === 'AGENTS'" class="av-cog__agents"><i v-for="a in cogAgents" :key="a">{{ a }}</i></span></span></div>
                </div>

                <!-- 06 simulation: real ↕ twin → scenarios -->
                <div v-else-if="l.visual === 'simulation'" class="av-sim">
                  <div class="av-sim__pair"><span class="av-sim__w">PHYSICAL</span><b class="av-sim__sync">⇅</b><span class="av-sim__w av-sim__w--twin">DIGITAL TWIN</span></div>
                  <span class="av-sim__engine">SIMULATION ENGINE</span>
                  <div class="av-sim__scen"><div v-for="s in simScenarios" :key="s.l" class="av-sim__sc" :class="{ 'is-acc': s.acc }"><span>{{ s.l }}</span><div class="av-sim__tr"><i :style="{ width: s.v + '%' }" /></div><b>{{ s.v }}</b></div></div>
                  <span class="av-sim__rec">→ RECOMMENDED ACTION</span>
                </div>

                <!-- 07 orchestration: control plane -->
                <div v-else-if="l.visual === 'orchestration'" class="av-orch">
                  <div class="av-orch__flow"><span v-for="(o, k) in orchFlow" :key="o" class="av-orch__step" :style="{ '--k': k }"><i />{{ o }}</span></div>
                </div>

                <!-- 08 applications: architecture → endpoints -->
                <div v-else class="av-app">
                  <div class="av-app__core"><span class="av-app__core-dot" />SVARA<br>ARCHITECTURE</div>
                  <div class="av-app__ends"><span v-for="(e, k) in appEndpoints" :key="e" class="av-app__end" :style="{ '--k': k }">{{ e }}</span></div>
                </div>
              </div>

              <aside class="alay__an">
                <div class="alay__an-head">
                  <span class="hx-mono-label alay__an-label">{{ l.an.trend.label }}</span>
                  <span class="alay__an-legend"><i />observed<b />projected</span>
                </div>
                <InstTrend
                  :series="l.an.trend.series" :axis="l.an.trend.axis"
                  :mark-index="l.an.trend.mark.i" :mark-label="l.an.trend.mark.v"
                  :projected="l.an.trend.projected"
                  :unit="l.an.trend.unit" :precision="l.an.trend.precision" :label="l.an.trend.label"
                />
                <InstStats :series="l.an.trend.series" :unit="l.an.trend.unit" :precision="l.an.trend.precision" />
                <InstDonut
                  :label="l.an.mix.label" :segments="l.an.mix.segments"
                  :total="l.an.mix.total" :total-label="l.an.mix.totalLabel"
                />
              </aside>
              </div>

              <div class="alay__rail">
                <InstMetric
                  v-for="m in l.an.metrics" :key="m.l" class="alay__rail-cell"
                  :label="m.l" :value="m.v" :delta="m.d" :dir="m.dir" :series="m.s"
                />
              </div>

              <div class="alay__foot">
                <InstTarget
                  :label="l.an.target.k" :now="l.an.target.now"
                  :goal="l.an.target.goal" :unit="l.an.target.unit"
                />
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.aly { position: relative; padding-block: clamp(40px, 5vh, 80px); }
.aly__chapters { position: relative; }
.aly__spine { position: absolute; left: 5px; top: 0; bottom: 0; width: 1px; background: rgba(20,34,63,0.1); }
.alay { position: relative; padding-left: 34px; margin-bottom: clamp(76px, 9vw, 140px); scroll-margin-top: 100px; }
.alay:last-child { margin-bottom: 0; }
.alay__marker { position: absolute; left: 0; top: 8px; }
.alay__node { display: block; width: 12px; height: 12px; border-radius: 50%; background: #fff; border: 1px solid rgba(20,34,63,0.3); transition: all var(--motion-medium) var(--ease-out); }
.alay.is-revealed .alay__node { background: var(--sig); border-color: var(--sig); box-shadow: 0 0 0 4px rgba(63,111,176,0.16); }
.alay__grid { display: grid; grid-template-columns: minmax(0, 0.64fr) minmax(0, 1.36fr); gap: clamp(24px, 2.8vw, 52px); align-items: center; opacity: 0; transform: translateY(26px); transition: opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out); }
.alay.is-revealed .alay__grid { opacity: 1; transform: none; }
/* Reversed layers put the diagram first — so the TRACKS have to swap too, or
   every other layer would hand its instrument the narrow column. */
.alay--rev .alay__grid { grid-template-columns: minmax(0, 1.36fr) minmax(0, 0.64fr); }
.alay--rev .alay__copy { order: 2; }
.alay__eyebrow { display: flex; align-items: center; gap: 8px; color: var(--ink-muted); }
.alay__n { color: var(--sig); }
.alay__name { margin: 14px 0 0; font-size: clamp(27px, 3.2vw, 46px); font-weight: 600; letter-spacing: -0.03em; line-height: 0.98; color: var(--ink-primary); }
.alay__name .lite { color: var(--ink-secondary); }
.alay__body { margin: 20px 0 0; max-width: 46ch; font-size: var(--type-lead); line-height: 1.55; color: var(--ink-secondary); }
.alay__chips { list-style: none; margin: 24px 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 7px 8px; }
.alay__chips li { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.08em; color: var(--ink-secondary); padding: 4px 9px; border: 1px solid rgba(20,34,63,0.14); border-radius: var(--radius-pill); background: rgba(255,255,255,0.44); }

.alay__frame { position: relative; padding: 12px; background: linear-gradient(158deg, rgba(255,255,255,0.44), rgba(255,255,255,0.22)); border: 1px solid rgba(20,34,63,0.14); box-shadow: 0 40px 90px -50px rgba(16,42,91,0.34), inset 0 1px 0 rgba(255,255,255,0.6); clip-path: polygon(0 16px, 16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%); }
.alay__frame-bar { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; padding: 3px 8px 12px; }
.alay__frame-bar .hx-mono { display: inline-flex; align-items: center; gap: 8px; font-size: 9px; letter-spacing: 0.1em; color: var(--ink-primary); }
.alay__status { display: inline-flex; align-items: center; gap: 7px; font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.14em; color: var(--ink-muted); }
.alay__status i { width: 5px; height: 5px; border-radius: 50%; background: var(--sig); }

/* architecture diagram on one side, the shared analysis column on the other */
.alay__main { display: grid; grid-template-columns: minmax(0, 1fr) minmax(228px, 0.86fr); }
.alay__an { display: flex; flex-direction: column; gap: 15px; padding: 4px 10px 10px 18px; border-left: 1px solid rgba(20,34,63,0.1); min-width: 0; }
.alay__an-head { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
.alay__an-label { color: var(--ink-muted); }
.alay__an-legend { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 8px; letter-spacing: 0.1em; color: var(--ink-muted); }
.alay__an-legend i, .alay__an-legend b { width: 9px; height: 3px; border-radius: 1px; }
.alay__an-legend i { background: var(--sig); }
.alay__an-legend b { background: repeating-linear-gradient(45deg, var(--sig) 0 1px, transparent 1px 3px); opacity: 0.8; }

.alay__rail { margin-top: 14px; padding: 16px 8px 0; border-top: 1px solid rgba(20,34,63,0.1); display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(14px, 2vw, 26px); }
.alay__foot { margin-top: 16px; padding: 16px 8px 6px; border-top: 1px solid rgba(20,34,63,0.1); }
.alay__frame-bar .hx-mono-label { color: var(--ink-muted); }
.avz { position: relative; border-radius: 12px; overflow: hidden; background: #fff; border: 1px solid rgba(20,34,63,0.08); min-height: 300px; padding: 22px; display: flex; align-items: center; justify-content: center; }
.alay:not(.is-revealed) .avz *, .alay:not(.is-revealed) .avz { animation-play-state: paused !important; }

.avz [class$='-dot'] { display: block; width: 7px; height: 7px; border-radius: 50%; background: var(--sig); margin: 0 auto 6px; box-shadow: 0 0 0 3px rgba(63,111,176,0.16); }

/* 01 sources */
.av-src { display: grid; grid-template-columns: 1fr auto 1fr; gap: 16px; align-items: center; width: 100%; }
.av-src__col { display: flex; flex-direction: column; gap: 6px; }
.av-src__h { font-family: var(--font-mono); font-size: 8px; letter-spacing: 0.14em; color: var(--ink-muted); margin-bottom: 3px; }
.av-src__chip { display: flex; align-items: center; gap: 7px; justify-content: flex-start; font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.04em; color: var(--ink-secondary); padding: 5px 9px; border: 1px solid rgba(20,34,63,0.12); border-radius: 5px; background: rgba(255,255,255,0.6); }
.av-src__col--r .av-src__chip { justify-content: flex-end; }
.av-src__chip i { width: 4px; height: 4px; border-radius: 50%; background: var(--sig-soft); }
.av-src__port { text-align: center; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em; color: var(--ink-primary); padding: 16px 14px; border: 1px solid rgba(63,111,176,0.3); border-radius: 12px; background: rgba(63,111,176,0.06); }

/* 02 edge */
.av-edge { display: flex; flex-direction: column; gap: 8px; width: 100%; }
.av-edge__node { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 10px 13px; border: 1px solid rgba(20,34,63,0.12); border-radius: 8px; background: rgba(255,255,255,0.6); }
.av-edge__name { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.06em; color: var(--ink-primary); }
.av-edge__flow { display: inline-flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 8px; letter-spacing: 0.06em; color: var(--ink-muted); }
.av-edge__flow b { padding: 3px 7px; border-radius: 4px; background: rgba(20,34,63,0.06); }
.av-edge__filter { font-style: normal; color: var(--sig); }
.av-edge__ev { color: var(--sig) !important; background: rgba(63,111,176,0.1) !important; }
.av-edge__central { margin-top: 4px; text-align: center; font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.08em; color: var(--ink-primary); padding: 12px; border: 1px solid rgba(63,111,176,0.3); border-radius: 10px; background: rgba(63,111,176,0.05); }

/* 03 data */
.av-data { display: flex; flex-direction: column; gap: 12px; width: 100%; align-items: center; }
.av-data__streams { display: flex; gap: 10px; }
.av-data__streams span { font-family: var(--font-mono); font-size: 8.5px; letter-spacing: 0.08em; color: var(--sig); padding: 4px 10px; border: 1px solid rgba(63,111,176,0.25); border-radius: var(--radius-pill); }
.av-data__hist { color: var(--ink-muted) !important; border-color: rgba(20,34,63,0.14) !important; }
.av-data__pipe { display: flex; flex-wrap: wrap; justify-content: center; }
.av-data__st { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.06em; color: var(--ink-primary); padding: 8px 12px; border: 1px solid rgba(20,34,63,0.14); background: #fff; }
.av-data__st + .av-data__st { margin-left: -1px; }
.av-data__unified { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.08em; color: var(--ink-primary); padding: 12px 18px; border: 1px solid rgba(63,111,176,0.3); border-radius: 10px; background: rgba(63,111,176,0.06); text-align: center; }

/* 04 ai */
.av-ai { display: flex; flex-direction: column; gap: 14px; width: 100%; align-items: center; }
.av-ai__mods { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; width: 100%; }
.av-ai__mod { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.04em; color: var(--ink-primary); text-align: center; padding: 10px 8px; border: 1px solid rgba(20,34,63,0.12); border-radius: 7px; background: rgba(255,255,255,0.7); }
.av-ai__router { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em; color: var(--ink-primary); padding: 11px 20px; border: 1px solid rgba(63,111,176,0.3); border-radius: 10px; background: rgba(63,111,176,0.06); }
.av-ai__out { display: flex; gap: 10px; }
.av-ai__out span { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.06em; color: var(--ink-secondary); padding: 6px 12px; border: 1px solid rgba(20,34,63,0.12); border-radius: var(--radius-pill); }

/* 05 cognition */
.av-cog__flow { display: flex; flex-direction: column; gap: 6px; width: 100%; }
.av-cog__step { position: relative; font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.08em; color: var(--ink-primary); padding: 9px 13px; border: 1px solid rgba(20,34,63,0.12); border-radius: 7px; background: rgba(255,255,255,0.6); }
.av-cog__step.is-agents { border-color: rgba(63,111,176,0.3); background: rgba(63,111,176,0.05); }
.av-cog__agents { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 7px; }
.av-cog__agents i { font-style: normal; font-size: 8px; color: var(--sig); padding: 3px 8px; border: 1px solid rgba(63,111,176,0.25); border-radius: var(--radius-pill); }

/* 06 simulation */
.av-sim { display: flex; flex-direction: column; gap: 12px; width: 100%; align-items: center; }
.av-sim__pair { display: flex; align-items: center; gap: 14px; }
.av-sim__w { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.08em; color: var(--ink-primary); padding: 10px 16px; border: 1px solid rgba(20,34,63,0.16); border-radius: 8px; background: rgba(255,255,255,0.6); }
.av-sim__w--twin { color: var(--sig); border-color: rgba(63,111,176,0.3); border-style: dashed; }
.av-sim__sync { font-size: 18px; color: var(--sig); }
.av-sim__engine { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.08em; color: var(--ink-muted); }
.av-sim__scen { display: flex; flex-direction: column; gap: 6px; width: 100%; }
.av-sim__sc { display: grid; grid-template-columns: 78px 1fr 28px; align-items: center; gap: 10px; }
.av-sim__sc span { font-family: var(--font-mono); font-size: 8.5px; letter-spacing: 0.06em; color: var(--ink-secondary); }
.av-sim__tr { height: 6px; border-radius: 999px; background: rgba(20,34,63,0.08); overflow: hidden; }
.av-sim__tr i { display: block; height: 100%; background: rgba(20,34,63,0.3); }
.av-sim__sc.is-acc span { color: var(--sig); font-weight: 600; } .av-sim__sc.is-acc .av-sim__tr i { background: linear-gradient(90deg, var(--sig), var(--sig-soft)); }
.av-sim__sc b { font-family: var(--font-mono); font-size: 9px; color: var(--ink-primary); text-align: right; }
.av-sim__rec { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.08em; color: var(--sig); }

/* 07 orchestration */
.av-orch__flow { display: flex; flex-direction: column; gap: 5px; width: 100%; }
.av-orch__step { display: flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.06em; color: var(--ink-primary); padding: 8px 12px; border-left: 2px solid var(--sig); background: rgba(255,255,255,0.5); }
.av-orch__step i { width: 5px; height: 5px; border-radius: 50%; background: var(--sig-soft); flex: none; }

/* 08 applications */
.av-app { display: grid; grid-template-columns: auto 1fr; gap: 18px; align-items: center; width: 100%; }
.av-app__core { text-align: center; font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.08em; color: #fff; padding: 16px 14px; border-radius: 12px; background: var(--ink-primary); }
.av-app__ends { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.av-app__end { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.04em; color: var(--ink-primary); padding: 10px 12px; border: 1px solid rgba(20,34,63,0.12); border-radius: 7px; background: rgba(255,255,255,0.7); text-align: center; }

@media (max-width: 1024px) {
  .alay__grid, .alay--rev .alay__grid { grid-template-columns: 1fr; gap: 28px; }
  .alay--rev .alay__copy { order: 0; }
  .alay__main { grid-template-columns: 1fr; }
  .alay__an { border-left: 0; border-top: 1px solid rgba(20,34,63,0.1); padding: 16px 8px 10px; }
  .alay__rail { grid-template-columns: 1fr; gap: 18px; }
  .av-app { grid-template-columns: 1fr; }
}
@media (max-width: 760px) { .alay { padding-left: 24px; } .av-src { grid-template-columns: 1fr; } }
@media (prefers-reduced-motion: reduce) { .alay__grid { transition: none; } .avz *, .avz { animation: none !important; } }
</style>
