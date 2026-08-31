<script setup lang="ts">
// 07–11 · THE FIVE TECHNOLOGY LAYERS — Perception, Intelligence, Cognition,
// Simulation, Autonomy. Each is a distinct engineered instrument (not cards),
// alternating on one continuous pathway. Reveal + domain motion on view; paused
// off-screen for performance.
//
// Each frame carries the domain visualisation BESIDE the shared analysis column
// (`components/instrument/*`) — trend with a hatched forecast tail, the
// descriptive readout computed from that series, and a composition ring — then a
// metric rail with movement and traces, and the goal bar that closes it. Same
// grammar as the division dashboards and the homepage industries panel.
//
// ON THE FIGURES: representational. They give each layer a believable shape and
// density; they are product illustration, not measured SVARA telemetry.
import { onBeforeUnmount, onMounted, ref } from 'vue'
import InstDonut from '~/components/instrument/InstDonut.vue'
import InstMetric from '~/components/instrument/InstMetric.vue'
import InstStats from '~/components/instrument/InstStats.vue'
import InstTarget from '~/components/instrument/InstTarget.vue'
import InstTrend from '~/components/instrument/InstTrend.vue'

interface Metric { l: string, v: string, d: string, dir: 'up' | 'down', s: number[] }
/** The analysis column beside each layer's visualisation — the same three reads
 *  the division and industry instruments carry, so the whole site rhymes. */
interface Analysis {
  status: string
  trend: { label: string, series: number[], axis: string[], mark: { i: number, v: string }, projected: number, unit: string, precision: number }
  mix: { label: string, total: string, totalLabel: string, segments: { k: string, v: number }[] }
  metrics: Metric[]
  target: { k: string, now: number, goal: number, unit: string }
}
interface Layer { n: string, eyebrow: string, headline: string[], body: string, techs: string[], visual: string, an: Analysis }
const layers: Layer[] = [
  { n: '01', eyebrow: 'Perception', headline: ['Intelligence begins', 'with perception.'], visual: 'perception',
    body: 'SVARA transforms visual streams, sensor signals, machine telemetry and enterprise data into structured, real-time intelligence.',
    techs: ['COMPUTER VISION', 'MULTIMODAL PERCEPTION', 'SENSOR FUSION', 'VIDEO INTELLIGENCE', 'DRONE PERCEPTION', 'EDGE INFERENCE'], an: {
      status: 'STREAMING',
      trend: { label: 'SIGNALS PROCESSED · 24H', unit: 'M/h', precision: 1, projected: 3,
        series: [1.2, 1.1, 1.4, 1.7, 2.0, 2.3, 2.4, 2.6, 2.5, 2.8, 3.0, 3.1, 3.3, 3.5],
        axis: ['00:00', '06:00', '12:00', '18:00', '24:00'], mark: { i: 10, v: '3.0M / h' } },
      mix: { label: 'SIGNAL SOURCES', total: '1,860', totalLabel: 'FEEDS', segments: [{ k: 'VISION', v: 48 }, { k: 'SENSOR', v: 27 }, { k: 'TELEMETRY', v: 15 }, { k: 'DRONE', v: 10 }] },
      metrics: [
        { l: 'SIGNALS / HOUR', v: '3.0M', d: '+14.2%', dir: 'up', s: [1.2, 1.5, 1.8, 2.1, 2.4, 2.7, 2.9, 3.0] },
        { l: 'EDGE INFERENCE', v: '9ms', d: '-12%', dir: 'down', s: [16, 15, 14, 13, 12, 11, 10, 9] },
        { l: 'ACTIVE FEEDS', v: '1,860', d: '+240', dir: 'up', s: [1180, 1290, 1400, 1510, 1620, 1710, 1790, 1860] },
      ],
      target: { k: 'STREAM COVERAGE', now: 79, goal: 96, unit: '%' },
    } },
  { n: '02', eyebrow: 'Intelligence', headline: ['From data', 'to context.'], visual: 'context',
    body: 'AI becomes useful when raw signals become contextual understanding — SVARA combines models, enterprise knowledge and real-time data into a continuously evolving intelligence layer.',
    techs: ['FOUNDATION MODELS', 'MULTIMODAL AI', 'ENTERPRISE KNOWLEDGE', 'CONTEXT ENGINES', 'VECTOR INTELLIGENCE', 'REAL-TIME DATA'], an: {
      status: 'RESOLVING',
      trend: { label: 'CONTEXT RESOLUTION · 24H', unit: '%', precision: 1, projected: 2,
        series: [88.4, 89.1, 90.3, 89.8, 91.6, 92.4, 93.1, 94.0, 94.6, 95.2, 96.1, 96.8, 97.2, 97.6],
        axis: ['00:00', '06:00', '12:00', '18:00', '24:00'], mark: { i: 11, v: '96.8%' } },
      mix: { label: 'CONTEXT SOURCES', total: '48M', totalLabel: 'VECTORS', segments: [{ k: 'ENT. KNOWLEDGE', v: 36 }, { k: 'VECTOR INDEX', v: 28 }, { k: 'REAL-TIME DATA', v: 22 }, { k: 'MODELS', v: 14 }] },
      metrics: [
        { l: 'CONTEXT RESOLVED', v: '96.8%', d: '+3.2%', dir: 'up', s: [88.4, 90.3, 91.6, 93.1, 94.6, 95.6, 96.3, 96.8] },
        { l: 'ENTITY LINKS', v: '48M', d: '+18.4%', dir: 'up', s: [28, 31, 34, 37, 41, 44, 46, 48] },
        { l: 'RETRIEVAL LATENCY', v: '24ms', d: '-21%', dir: 'down', s: [41, 38, 35, 32, 30, 28, 26, 24] },
      ],
      target: { k: 'KNOWLEDGE COVERAGE', now: 71, goal: 92, unit: '%' },
    } },
  { n: '03', eyebrow: 'Cognition', headline: ['Intelligence', 'that can reason.'], visual: 'reasoning',
    body: "SVARA's cognitive systems interpret context, decompose complex objectives, plan multi-step actions and coordinate specialized AI agents across enterprise environments.",
    techs: ['AI AGENTS', 'MULTI-AGENT SYSTEMS', 'PLANNING', 'TOOL USE', 'REASONING', 'MEMORY'], an: {
      status: 'REASONING',
      trend: { label: 'PLAN SUCCESS RATE · 30D', unit: '%', precision: 1, projected: 2,
        series: [84.1, 85.4, 86.2, 85.9, 87.8, 88.6, 89.4, 90.2, 91.1, 92.0, 92.8, 93.6, 94.1, 94.7],
        axis: ['D-30', 'D-20', 'D-10', 'NOW'], mark: { i: 11, v: '93.6%' } },
      mix: { label: 'AGENT WORK', total: '2,410', totalLabel: 'PLANS', segments: [{ k: 'REASONING', v: 34 }, { k: 'PLANNING', v: 27 }, { k: 'TOOL USE', v: 24 }, { k: 'MEMORY', v: 15 }] },
      metrics: [
        { l: 'PLAN SUCCESS', v: '93.6%', d: '+5.1%', dir: 'up', s: [84.1, 86.2, 87.8, 89.4, 91.1, 92.4, 93.1, 93.6] },
        { l: 'STEPS / OBJECTIVE', v: '6.2', d: '-1.4', dir: 'down', s: [9.1, 8.6, 8.1, 7.6, 7.2, 6.8, 6.5, 6.2] },
        { l: 'TOOL CALLS', v: '184k', d: '+27.3%', dir: 'up', s: [92, 106, 118, 131, 146, 160, 173, 184] },
      ],
      target: { k: 'AUTONOMOUS RESOLUTION', now: 64, goal: 90, unit: '%' },
    } },
  { n: '04', eyebrow: 'Simulation', headline: ['See what', 'happens next.'], visual: 'simulation',
    body: 'Digital twins and simulation systems let enterprises model environments, test scenarios and predict operational outcomes before decisions affect the real world.',
    techs: ['DIGITAL TWINS', 'SIMULATION', 'PREDICTIVE MODELS', 'SCENARIO ANALYSIS', 'FORECASTING', 'SYNTHETIC ENVIRONMENTS'], an: {
      status: 'PROJECTING',
      trend: { label: 'TWIN ACCURACY · 30D', unit: '%', precision: 1, projected: 2,
        series: [93.2, 93.8, 94.1, 94.7, 94.4, 95.3, 95.8, 96.2, 96.6, 97.0, 97.2, 97.4, 97.7, 98.0],
        axis: ['D-30', 'D-20', 'D-10', 'NOW'], mark: { i: 11, v: '97.4%' } },
      mix: { label: 'SIMULATION LOAD', total: '9,240', totalLabel: 'RUNS', segments: [{ k: 'SCENARIO', v: 38 }, { k: 'PREDICTIVE', v: 29 }, { k: 'SYNTHETIC', v: 19 }, { k: 'FORECAST', v: 14 }] },
      metrics: [
        { l: 'TWIN ACCURACY', v: '97.4%', d: '+1.8%', dir: 'up', s: [93.2, 94.1, 94.9, 95.8, 96.4, 96.9, 97.2, 97.4] },
        { l: 'SCENARIOS / DAY', v: '9,240', d: '+34.6%', dir: 'up', s: [4.1, 4.9, 5.6, 6.4, 7.2, 8.0, 8.7, 9.2] },
        { l: 'TIME TO FORECAST', v: '42s', d: '-38%', dir: 'down', s: [98, 88, 79, 70, 62, 54, 47, 42] },
      ],
      target: { k: 'ENVIRONMENT COVERAGE', now: 73, goal: 95, unit: '%' },
    } },
  { n: '05', eyebrow: 'Autonomy', headline: ['From decision', 'to action.'], visual: 'autonomy',
    body: 'SVARA connects intelligence to enterprise workflows, machines and autonomous systems — moving decisions beyond dashboards and into real operations.',
    techs: ['AUTONOMOUS AGENTS', 'WORKFLOW AUTOMATION', 'ROBOTICS INTEGRATION', 'DRONE AUTONOMY', 'ENTERPRISE ACTIONS', 'CONTROL SYSTEMS'], an: {
      status: 'EXECUTING',
      trend: { label: 'ACTIONS EXECUTED · 30D', unit: 'k/d', precision: 0, projected: 2,
        series: [58, 64, 71, 69, 78, 84, 91, 97, 104, 110, 118, 128, 134, 141],
        axis: ['D-30', 'D-20', 'D-10', 'NOW'], mark: { i: 11, v: '128k / day' } },
      mix: { label: 'ACTION TARGETS', total: '128k', totalLabel: 'ACTIONS', segments: [{ k: 'WORKFLOW', v: 34 }, { k: 'ENTERPRISE', v: 26 }, { k: 'MACHINE', v: 22 }, { k: 'DRONE', v: 18 }] },
      metrics: [
        { l: 'ACTIONS EXECUTED', v: '128k', d: '+41.2%', dir: 'up', s: [58, 71, 84, 97, 110, 119, 124, 128] },
        { l: 'HUMAN HANDOFFS', v: '−36%', d: '-9%', dir: 'down', s: [100, 93, 86, 80, 75, 70, 67, 64] },
        { l: 'EXECUTION SUCCESS', v: '99.1%', d: '+0.7%', dir: 'up', s: [97.8, 98.0, 98.3, 98.5, 98.7, 98.9, 99.0, 99.1] },
      ],
      target: { k: 'CLOSED-LOOP ACTIONS', now: 68, goal: 94, unit: '%' },
    } },
]
const id = (i: number) => `layer-${i + 1}`

const perceptionFeeds = ['CAMERA 01', 'CAMERA 02', 'DRONE FEED', 'IOT SENSOR', 'MACHINE TELEMETRY']
const contextEntities = [
  { l: 'PEOPLE', x: 50, y: 8 }, { l: 'ASSETS', x: 90, y: 32 }, { l: 'EVENTS', x: 80, y: 78 },
  { l: 'SYSTEMS', x: 20, y: 78 }, { l: 'LOCATIONS', x: 10, y: 32 }, { l: 'WORKFLOWS', x: 50, y: 96 },
]
const reasoningSteps = [
  { k: 'OBJECTIVE', t: 'Reduce plant downtime', agent: 'PLANNER' },
  { k: 'OBSERVE', t: 'Vision AI detects recurring anomaly', agent: 'VISION' },
  { k: 'ANALYZE', t: 'Operational data identifies machine pattern', agent: 'ANALYST' },
  { k: 'REASON', t: 'Probable root causes isolated', agent: 'REASONER' },
  { k: 'PLAN', t: 'Preventive workflow generated', agent: 'PLANNER' },
  { k: 'ACT', t: 'Maintenance task scheduled', agent: 'EXECUTOR' },
]
const scenarios = [
  { l: 'BASELINE', v: 82, acc: false }, { l: 'SCENARIO A', v: 74, acc: false },
  { l: 'SCENARIO B', v: 91, acc: false }, { l: 'OPTIMIZED', v: 97, acc: true },
]
const actionLanes = [
  { l: 'ERP', s: 'COMPLETE' }, { l: 'CRM', s: 'VERIFIED' }, { l: 'MAINTENANCE', s: 'EXECUTING' },
  { l: 'DRONE', s: 'EXECUTING' }, { l: 'EDGE DEVICE', s: 'QUEUED' }, { l: 'WORKFLOW', s: 'VERIFIED' }, { l: 'NOTIFICATION', s: 'COMPLETE' },
]

const revealed = ref(new Set<string>())
let observer: IntersectionObserver | null = null
onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting && !revealed.value.has((e.target as HTMLElement).id)) {
        revealed.value = new Set([...revealed.value, (e.target as HTMLElement).id])
      }
    })
  }, { rootMargin: '0px 0px -35% 0px', threshold: 0.06 })
  layers.forEach((_, i) => { const el = document.getElementById(id(i)); if (el) observer?.observe(el) })
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <section class="tly">
    <div class="hx-container">
      <div class="tly__chapters">
        <span class="tly__pathway" aria-hidden="true" />

        <article
          v-for="(l, i) in layers"
          :id="id(i)"
          :key="l.n"
          class="tlay"
          :class="{ 'is-revealed': revealed.has(id(i)), 'tlay--rev': i % 2 === 1 }"
        >
          <div class="tlay__marker" aria-hidden="true"><span class="tlay__node" /></div>
          <div class="tlay__grid">
            <div class="tlay__copy">
              <p class="tlay__eyebrow hx-mono-label"><span class="tlay__n">{{ l.n }}</span> // {{ l.eyebrow }}</p>
              <h3 class="tlay__name"><span v-for="(line, k) in l.headline" :key="k" :class="{ lite: k > 0 }">{{ line }}<br v-if="k < l.headline.length - 1"></span></h3>
              <p class="tlay__body">{{ l.body }}</p>
              <ul class="tlay__techs"><li v-for="t in l.techs" :key="t">{{ t }}</li></ul>
            </div>

            <div class="tlay__frame">
              <span class="hx-pin tl" /><span class="hx-pin tr" /><span class="hx-pin bl" /><span class="hx-pin br" />
              <div class="tlay__frame-bar">
                <span class="hx-mono"><span class="hx-dot" /> SVARA · {{ l.eyebrow.toUpperCase() }} / L{{ l.n }}</span>
                <span class="tlay__status">{{ l.an.status }}<i /></span>
              </div>
              <div class="tlay__main">
              <div class="tvz" aria-hidden="true">
                <!-- PERCEPTION -->
                <div v-if="l.visual === 'perception'" class="pc">
                  <div class="pc__feeds">
                    <span v-for="(f, k) in perceptionFeeds" :key="f" class="pc__feed" :style="{ '--k': k }"><i />{{ f }}</span>
                  </div>
                  <div class="pc__engine"><span class="pc__engine-dot" />PERCEPTION<br>ENGINE</div>
                  <div class="pc__out">
                    <div class="pc__mon">
                      <span class="pc__box" style="left:14%;top:20%;width:34%;height:38%"><i>person · 0.97</i></span>
                      <span class="pc__box" style="left:58%;top:44%;width:28%;height:30%"><i>asset · 0.91</i></span>
                      <span class="pc__scan" />
                    </div>
                    <svg class="pc__graph" viewBox="0 0 100 24" preserveAspectRatio="none"><polyline points="0,18 14,12 28,15 42,7 56,11 70,4 84,9 100,5" /></svg>
                  </div>
                </div>

                <!-- CONTEXT -->
                <div v-else-if="l.visual === 'context'" class="ctxv">
                  <svg class="ctxv__wires" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path v-for="e in contextEntities" :key="e.l" :d="`M50 50 L${e.x} ${e.y}`" vector-effect="non-scaling-stroke" />
                    <path class="ctxv__rel" d="M50 8 L90 32 M90 32 L80 78 M20 78 L10 32 M10 32 L50 8" vector-effect="non-scaling-stroke" />
                    <circle class="ctxv__pulse" r="1.2" fill="var(--sig)"><animateMotion dur="4s" repeatCount="indefinite" path="M50 8 L50 50" /></circle>
                    <circle class="ctxv__pulse" r="1.2" fill="var(--sig)"><animateMotion dur="5s" begin="1s" repeatCount="indefinite" path="M90 32 L50 50" /></circle>
                  </svg>
                  <span v-for="e in contextEntities" :key="`n-${e.l}`" class="ctxv__ent" :style="{ left: `${e.x}%`, top: `${e.y}%` }">{{ e.l }}</span>
                  <div class="ctxv__core"><span class="ctxv__core-dot" />CONTEXT</div>
                </div>

                <!-- REASONING -->
                <div v-else-if="l.visual === 'reasoning'" class="rs">
                  <span class="rs__bus" />
                  <div v-for="(s, k) in reasoningSteps" :key="s.k" class="rs__step" :style="{ '--k': k }">
                    <span class="rs__dot" />
                    <div class="rs__body">
                      <span class="rs__k">{{ s.k }} <b>{{ s.agent }}</b></span>
                      <span class="rs__t">{{ s.t }}</span>
                    </div>
                  </div>
                </div>

                <!-- SIMULATION -->
                <div v-else-if="l.visual === 'simulation'" class="sm">
                  <div class="sm__pair">
                    <div class="sm__world"><span class="sm__world-l">REAL</span><svg viewBox="0 0 60 40"><rect x="8" y="16" width="18" height="16" /><rect x="30" y="10" width="22" height="22" /><circle ctxv="17" cy="24" r="2" /><circle ctxv="41" cy="21" r="2" /></svg></div>
                    <span class="sm__link">⇅</span>
                    <div class="sm__world sm__world--twin"><span class="sm__world-l">DIGITAL TWIN</span><svg viewBox="0 0 60 40"><rect x="8" y="16" width="18" height="16" /><rect x="30" y="10" width="22" height="22" /><circle ctxv="17" cy="24" r="2" /><circle ctxv="41" cy="21" r="2" /></svg></div>
                  </div>
                  <div class="sm__scenarios">
                    <div v-for="sc in scenarios" :key="sc.l" class="sm__sc" :class="{ 'is-acc': sc.acc }">
                      <span class="sm__sc-l">{{ sc.l }}</span>
                      <div class="sm__sc-track"><span class="sm__sc-fill" :style="{ width: sc.v + '%' }" /></div>
                      <span class="sm__sc-v">{{ sc.v }}</span>
                    </div>
                  </div>
                </div>

                <!-- AUTONOMY -->
                <div v-else class="au">
                  <div class="au__decision"><span class="au__decision-dot" />DECISION</div>
                  <div class="au__lanes">
                    <div v-for="(a, k) in actionLanes" :key="a.l" class="au__lane" :style="{ '--k': k }">
                      <span class="au__lane-l">{{ a.l }}</span>
                      <span class="au__lane-s" :class="`au__lane-s--${a.s.toLowerCase()}`">{{ a.s }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <aside class="tlay__an">
                <div class="tlay__an-head">
                  <span class="hx-mono-label tlay__an-label">{{ l.an.trend.label }}</span>
                  <span class="tlay__an-legend"><i />observed<b />projected</span>
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

              <div class="tlay__rail">
                <InstMetric
                  v-for="m in l.an.metrics" :key="m.l" class="tlay__rail-cell"
                  :label="m.l" :value="m.v" :delta="m.d" :dir="m.dir" :series="m.s"
                />
              </div>

              <div class="tlay__foot">
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
.tly { position: relative; padding-block: clamp(40px, 5vh, 80px); }
.tly__chapters { position: relative; }
.tly__pathway { position: absolute; left: 5px; top: 0; bottom: 0; width: 1px; background: rgba(20,34,63,0.1); }

.tlay { position: relative; padding-left: 34px; margin-bottom: clamp(80px, 10vw, 150px); scroll-margin-top: 100px; }
.tlay:last-child { margin-bottom: 0; }
.tlay__marker { position: absolute; left: 0; top: 8px; }
.tlay__node { display: block; width: 12px; height: 12px; border-radius: 50%; background: #fff; border: 1px solid rgba(20,34,63,0.3); transition: all var(--motion-medium) var(--ease-out); }
.tlay.is-revealed .tlay__node { background: var(--sig); border-color: var(--sig); box-shadow: 0 0 0 4px rgba(63,111,176,0.16); }

.tlay__grid { display: grid; grid-template-columns: minmax(0, 0.64fr) minmax(0, 1.36fr); gap: clamp(24px, 2.8vw, 52px); align-items: center; opacity: 0; transform: translateY(26px); transition: opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out); }
.tlay.is-revealed .tlay__grid { opacity: 1; transform: none; }
/* Reversed layers put the instrument first — so the TRACKS have to swap too, or
   every other layer would hand its dashboard the narrow column. */
.tlay--rev .tlay__grid { grid-template-columns: minmax(0, 1.36fr) minmax(0, 0.64fr); }
.tlay--rev .tlay__copy { order: 2; }

.tlay__eyebrow { display: flex; align-items: center; gap: 8px; color: var(--ink-muted); }
.tlay__n { color: var(--sig); }
.tlay__name { margin: 14px 0 0; font-size: clamp(28px, 3.4vw, 50px); font-weight: 600; letter-spacing: -0.03em; line-height: 0.98; color: var(--ink-primary); }
.tlay__name .lite { color: var(--ink-secondary); }
.tlay__body { margin: 20px 0 0; max-width: 44ch; font-size: var(--type-lead); line-height: 1.55; color: var(--ink-secondary); }
.tlay__techs { list-style: none; margin: 24px 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 7px 8px; }
.tlay__techs li { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.1em; color: var(--ink-secondary); padding: 4px 10px; border: 1px solid rgba(20,34,63,0.14); border-radius: var(--radius-pill); background: rgba(255,255,255,0.44); }

.tlay__frame { position: relative; padding: 12px; background: linear-gradient(158deg, rgba(255,255,255,0.44), rgba(255,255,255,0.22)); border: 1px solid rgba(20,34,63,0.14); box-shadow: 0 40px 90px -50px rgba(16,42,91,0.34), inset 0 1px 0 rgba(255,255,255,0.6); clip-path: polygon(0 16px, 16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%); }
.tlay__frame-bar { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; padding: 3px 8px 12px; }
.tlay__frame-bar .hx-mono { display: inline-flex; align-items: center; gap: 8px; font-size: 9.5px; letter-spacing: 0.1em; color: var(--ink-primary); }
.tlay__frame-bar .hx-mono-label { color: var(--ink-muted); }
.tlay__status { display: inline-flex; align-items: center; gap: 7px; font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.14em; color: var(--ink-muted); }
.tlay__status i { width: 5px; height: 5px; border-radius: 50%; background: var(--sig); }

/* domain visualisation on one side, the shared analysis column on the other */
.tlay__main { display: grid; grid-template-columns: minmax(0, 1fr) minmax(228px, 0.86fr); gap: 0; }
.tlay__an { display: flex; flex-direction: column; gap: 15px; padding: 4px 10px 10px 18px; border-left: 1px solid rgba(20,34,63,0.1); min-width: 0; }
.tlay__an-head { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
.tlay__an-label { color: var(--ink-muted); }
.tlay__an-legend { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 8px; letter-spacing: 0.1em; color: var(--ink-muted); }
.tlay__an-legend i, .tlay__an-legend b { width: 9px; height: 3px; border-radius: 1px; }
.tlay__an-legend i { background: var(--sig); }
.tlay__an-legend b { background: repeating-linear-gradient(45deg, var(--sig) 0 1px, transparent 1px 3px); opacity: 0.8; }

.tlay__rail { margin-top: 14px; padding-top: 16px; border-top: 1px solid rgba(20,34,63,0.1); display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(14px, 2vw, 26px); padding-inline: 8px; }
.tlay__foot { margin-top: 16px; padding: 16px 8px 6px; border-top: 1px solid rgba(20,34,63,0.1); }
.tvz { position: relative; border-radius: 12px; overflow: hidden; background: #fff; border: 1px solid rgba(20,34,63,0.08); min-height: 320px; padding: 20px; }
.tlay:not(.is-revealed) .tvz *, .tlay:not(.is-revealed) .tvz { animation-play-state: paused !important; }

/* ---- perception ---- */
.pc { display: grid; grid-template-columns: auto 1fr; grid-template-areas: "feeds engine" "feeds out"; gap: 14px 18px; align-items: center; height: 100%; }
.pc__feeds { grid-area: feeds; display: flex; flex-direction: column; gap: 7px; }
.pc__feed { display: inline-flex; align-items: center; gap: 7px; font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.04em; color: var(--ink-secondary); padding: 6px 9px; border: 1px solid rgba(20,34,63,0.12); border-radius: 6px; background: rgba(255,255,255,0.6); }
.pc__feed i { width: 5px; height: 5px; border-radius: 50%; background: var(--sig); animation: pc-blink 1.6s ease-in-out infinite; animation-delay: calc(var(--k) * 0.2s); }
@keyframes pc-blink { 0%,100% { opacity: 1; } 50% { opacity: 0.25; } }
.pc__engine { grid-area: engine; justify-self: center; text-align: center; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; color: var(--ink-primary); padding: 12px 16px; border: 1px solid rgba(63,111,176,0.3); border-radius: 10px; background: rgba(63,111,176,0.06); position: relative; }
.pc__engine-dot { display: block; width: 7px; height: 7px; border-radius: 50%; background: var(--sig); margin: 0 auto 6px; box-shadow: 0 0 0 3px rgba(63,111,176,0.16); }
.pc__out { grid-area: out; }
.pc__mon { position: relative; aspect-ratio: 16/7; background: #0E1B33; border-radius: 8px; overflow: hidden; }
.pc__box { position: absolute; border: 1.4px solid #4FA8FF; border-radius: 3px; box-shadow: 0 0 0 3px rgba(79,168,255,0.14); }
.pc__box i { position: absolute; top: -15px; left: -1px; font-family: var(--font-mono); font-size: 7.5px; font-style: normal; background: #4FA8FF; color: #04122B; padding: 1px 4px; border-radius: 2px; white-space: nowrap; }
.pc__scan { position: absolute; left: 0; right: 0; top: 0; height: 26%; background: linear-gradient(rgba(79,168,255,0), rgba(79,168,255,0.18), rgba(79,168,255,0)); animation: pc-scan 3.4s linear infinite; }
@keyframes pc-scan { 0% { transform: translateY(0); } 100% { transform: translateY(380%); } }
.pc__graph { width: 100%; height: 26px; margin-top: 8px; }
.pc__graph polyline { fill: none; stroke: var(--sig); stroke-width: 1.2; vector-effect: non-scaling-stroke; }

/* ---- context ---- */
.ctxv { position: relative; height: 100%; min-height: 300px; }
.ctxv__wires { position: absolute; inset: 0; width: 100%; height: 100%; }
.ctxv__wires path { stroke: rgba(20,34,63,0.14); stroke-width: 0.5; fill: none; }
.ctxv__rel { stroke: rgba(63,111,176,0.3) !important; stroke-dasharray: 2 2; }
.ctxv__ent { position: absolute; transform: translate(-50%, -50%); font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.08em; color: var(--ink-primary); padding: 5px 9px; background: rgba(255,255,255,0.8); border: 1px solid rgba(20,34,63,0.14); border-radius: var(--radius-pill); white-space: nowrap; }
.ctxv__core { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); display: flex; flex-direction: column; align-items: center; gap: 5px; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; color: var(--ink-primary); padding: 14px 18px; border-radius: 50%; aspect-ratio: 1; place-content: center; background: radial-gradient(circle at 42% 36%, rgba(255,255,255,0.92), rgba(232,238,246,0.7) 60%, rgba(43,62,99,0.12)); border: 1px solid rgba(20,34,63,0.18); box-shadow: 0 20px 40px -22px rgba(16,42,91,0.4); }
.ctxv__core-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--sig); box-shadow: 0 0 0 3px rgba(63,111,176,0.16); }

/* ---- reasoning ---- */
.rs { position: relative; padding-left: 6px; }
.rs__bus { position: absolute; left: 11px; top: 8px; bottom: 8px; width: 1px; background: linear-gradient(180deg, var(--sig), var(--sig-soft)); }
.rs__step { position: relative; display: flex; gap: 14px; padding: 7px 0; align-items: flex-start; }
.rs__dot { position: relative; z-index: 1; margin-top: 3px; width: 11px; height: 11px; border-radius: 50%; background: #fff; border: 1px solid var(--sig); flex: none; }
.rs__step:last-child .rs__dot { background: var(--sig); }
.rs__k { display: block; font-family: var(--font-mono); font-size: 8.5px; letter-spacing: 0.12em; color: var(--ink-muted); }
.rs__k b { color: var(--sig); font-weight: 600; margin-left: 6px; }
.rs__t { display: block; margin-top: 2px; font-size: 12.5px; color: var(--ink-primary); line-height: 1.3; }

/* ---- simulation ---- */
.sm__pair { display: flex; align-items: center; justify-content: center; gap: 14px; margin-bottom: 18px; }
.sm__world { position: relative; padding: 14px 16px 10px; border: 1px solid rgba(20,34,63,0.14); border-radius: 10px; background: rgba(255,255,255,0.6); }
.sm__world svg { width: 96px; height: 60px; }
.sm__world svg rect, .sm__world svg circle { fill: none; stroke: rgba(20,34,63,0.4); stroke-width: 1; vector-effect: non-scaling-stroke; }
.sm__world--twin svg rect, .sm__world--twin svg circle { stroke: var(--sig); stroke-dasharray: 3 2; }
.sm__world-l { position: absolute; top: 6px; left: 10px; font-family: var(--font-mono); font-size: 8px; letter-spacing: 0.1em; color: var(--ink-muted); }
.sm__world--twin .sm__world-l { color: var(--sig); }
.sm__link { font-size: 18px; color: var(--ink-muted); }
.sm__scenarios { display: flex; flex-direction: column; gap: 8px; }
.sm__sc { display: grid; grid-template-columns: 88px 1fr 30px; align-items: center; gap: 10px; }
.sm__sc-l { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.06em; color: var(--ink-secondary); }
.sm__sc-track { height: 7px; border-radius: 999px; background: rgba(20,34,63,0.08); overflow: hidden; }
.sm__sc-fill { display: block; height: 100%; border-radius: inherit; background: rgba(20,34,63,0.3); animation: sm-grow 2.6s ease-in-out infinite alternate; transform-origin: left; }
.sm__sc.is-acc .sm__sc-l { color: var(--sig); font-weight: 600; }
.sm__sc.is-acc .sm__sc-fill { background: linear-gradient(90deg, var(--sig), var(--sig-soft)); }
@keyframes sm-grow { 0% { transform: scaleX(0.94); } 100% { transform: scaleX(1); } }
.sm__sc-v { font-family: var(--font-mono); font-size: 10px; color: var(--ink-primary); text-align: right; }

/* ---- autonomy ---- */
.au { display: grid; grid-template-columns: auto 1fr; gap: 16px; align-items: center; height: 100%; }
.au__decision { justify-self: center; text-align: center; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; color: #fff; padding: 12px 14px; border-radius: 10px; background: var(--ink-primary); }
.au__decision-dot { display: block; width: 7px; height: 7px; border-radius: 50%; background: var(--sig); margin: 0 auto 6px; }
.au__lanes { display: flex; flex-direction: column; gap: 6px; }
.au__lane { display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 10px; padding: 7px 11px; border: 1px solid rgba(20,34,63,0.1); border-radius: 7px; background: rgba(255,255,255,0.6); }
.au__lane-l { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.06em; color: var(--ink-primary); }
.au__lane-s { font-family: var(--font-mono); font-size: 8px; letter-spacing: 0.08em; padding: 3px 8px; border-radius: var(--radius-pill); }
.au__lane-s--queued { color: var(--ink-muted); background: rgba(20,34,63,0.06); }
.au__lane-s--executing { color: var(--sig); background: rgba(63,111,176,0.1); }
.au__lane-s--executing::after { content: "…"; }
.au__lane-s--verified, .au__lane-s--complete { color: #2f8f5b; background: rgba(47,143,91,0.1); }

@media (max-width: 1024px) {
  .tlay__grid, .tlay--rev .tlay__grid { grid-template-columns: 1fr; gap: 28px; }
  .tlay--rev .tlay__copy { order: 0; }
  .tlay__main { grid-template-columns: 1fr; }
  .tlay__an { border-left: 0; border-top: 1px solid rgba(20,34,63,0.1); padding: 16px 8px 10px; }
  .tlay__rail { grid-template-columns: 1fr; gap: 18px; }
  .pc { grid-template-columns: 1fr; grid-template-areas: "feeds" "engine" "out"; }
  .au { grid-template-columns: 1fr; }
}
@media (max-width: 760px) { .tlay { padding-left: 24px; } }
@media (prefers-reduced-motion: reduce) { .tlay__grid { transition: none; } .tvz *, .tvz { animation: none !important; } }
</style>
