<script setup lang="ts">
// 06 · INDUSTRIES — an interactive deployment console. Select an environment on
// the left; the right module evolves into a full deployment instrument for it —
// the outcome line, the stack that ships, how the headline measure has moved,
// what the deployment is made of, and how far the rollout has got.
//
// Same instrument grammar as the six division dashboards (`components/instrument/*`),
// so a visitor who has seen one reads the other immediately.
//
// ON THE FIGURES: the outcome line of each industry (OEE, response time,
// shrinkage…) is existing marketing copy. Everything ADDED here is deliberately
// operational — coverage, sites live, nodes connected, rollout progress — rather
// than more outcome claims, and the whole set is REPRESENTATIONAL: illustrative
// of the shape of a SVARA deployment, not measured customer results.
import { ref } from 'vue'
import InstDonut from '~/components/instrument/InstDonut.vue'
import InstMetric from '~/components/instrument/InstMetric.vue'
import InstStats from '~/components/instrument/InstStats.vue'
import InstTarget from '~/components/instrument/InstTarget.vue'
import InstTrend from '~/components/instrument/InstTrend.vue'

interface Metric { l: string, v: string, d: string, dir: 'up' | 'down', s: number[] }
interface Industry {
  name: string
  line: string
  applies: string[]
  metric: string
  unit: string
  status: string
  /** The headline measure over time, and how to read it. */
  trend: { label: string, series: number[], axis: string[], mark: { i: number, v: string }, projected: number, unit: string, precision: number }
  /** What the deployed stack is made of. */
  mix: { total: string, totalLabel: string, segments: { k: string, v: number }[] }
  metrics: Metric[]
  target: { k: string, now: number, goal: number, unit: string }
}
const industries: Industry[] = [
  {
    name: 'Manufacturing', line: 'Zero-downtime production through predictive, self-optimising operations.',
    applies: ['Vision AI', 'Digital Twin', 'Edge AI'], metric: '+18%', unit: 'OEE', status: 'RUNNING',
    trend: { label: 'OEE · 12 MONTHS', series: [71, 72, 74, 73, 76, 78, 79, 81, 83, 82, 85, 87, 88, 89], axis: ['Q1', 'Q2', 'Q3', 'Q4'], mark: { i: 10, v: '85% OEE' }, projected: 3, unit: '%', precision: 0 },
    mix: { total: '168', totalLabel: 'LINES', segments: [{ k: 'VISION AI', v: 44 }, { k: 'DIGITAL TWIN', v: 32 }, { k: 'EDGE AI', v: 24 }] },
    metrics: [
      { l: 'OEE', v: '+18%', d: '+4pt', dir: 'up', s: [71, 74, 76, 79, 82, 85, 87, 89] },
      { l: 'UNPLANNED STOPS', v: '−42%', d: '-9%', dir: 'down', s: [100, 91, 84, 77, 71, 65, 60, 58] },
      { l: 'LINES INSTRUMENTED', v: '168', d: '+21', dir: 'up', s: [104, 117, 128, 139, 147, 156, 162, 168] },
    ],
    target: { k: 'LINE COVERAGE', now: 74, goal: 95, unit: '%' },
  },
  {
    name: 'Smart Cities', line: 'City-scale awareness — mobility, safety and infrastructure in one view.',
    applies: ['Vision AI', 'Drone AI', 'One AI OS'], metric: '−34%', unit: 'RESPONSE TIME', status: 'WATCHING',
    trend: { label: 'INCIDENT RESPONSE · 12 MONTHS', series: [14.2, 13.8, 13.1, 12.6, 12.9, 12.1, 11.6, 11.2, 10.7, 10.4, 9.9, 9.7, 9.5, 9.4], axis: ['Q1', 'Q2', 'Q3', 'Q4'], mark: { i: 10, v: '9.9 min' }, projected: 3, unit: 'min', precision: 1 },
    mix: { total: '1,240', totalLabel: 'NODES', segments: [{ k: 'VISION AI', v: 41 }, { k: 'DRONE AI', v: 31 }, { k: 'ONE AI OS', v: 28 }] },
    metrics: [
      { l: 'RESPONSE TIME', v: '−34%', d: '-4.8min', dir: 'down', s: [14.2, 13.1, 12.6, 11.6, 10.7, 10.1, 9.7, 9.4] },
      { l: 'INTERSECTIONS LIVE', v: '1,240', d: '+186', dir: 'up', s: [780, 862, 934, 1010, 1084, 1152, 1204, 1240] },
      { l: 'INCIDENT RECALL', v: '96.4%', d: '+2.1%', dir: 'up', s: [91.2, 92.4, 93.1, 94.0, 94.8, 95.4, 96.0, 96.4] },
    ],
    target: { k: 'CORRIDOR COVERAGE', now: 61, goal: 90, unit: '%' },
  },
  {
    name: 'Logistics', line: 'End-to-end visibility from the dock to the doorstep.',
    applies: ['Vision AI', 'AI Agents', 'Business Cloud'], metric: '+22%', unit: 'THROUGHPUT', status: 'FLOWING',
    trend: { label: 'DOCK THROUGHPUT · 12 MONTHS', series: [100, 103, 107, 106, 111, 114, 117, 116, 120, 122, 124, 126, 129, 131], axis: ['Q1', 'Q2', 'Q3', 'Q4'], mark: { i: 10, v: '124 idx' }, projected: 3, unit: '', precision: 0 },
    mix: { total: '412', totalLabel: 'NODES', segments: [{ k: 'VISION AI', v: 38 }, { k: 'AI AGENTS', v: 34 }, { k: 'BUSINESS CLOUD', v: 28 }] },
    metrics: [
      { l: 'THROUGHPUT', v: '+22%', d: '+5pt', dir: 'up', s: [100, 106, 111, 116, 120, 124, 128, 131] },
      { l: 'DWELL TIME', v: '−29%', d: '-6%', dir: 'down', s: [100, 94, 88, 83, 79, 76, 73, 71] },
      { l: 'NODES CONNECTED', v: '412', d: '+64', dir: 'up', s: [248, 279, 306, 331, 356, 378, 397, 412] },
    ],
    target: { k: 'NETWORK VISIBILITY', now: 78, goal: 98, unit: '%' },
  },
  {
    name: 'Retail', line: 'Understand every aisle, shelf and shopper in real time.',
    applies: ['Vision AI', 'Generative AI', 'Edge AI'], metric: '−27%', unit: 'SHRINKAGE', status: 'SENSING',
    trend: { label: 'SHRINKAGE RATE · 12 MONTHS', series: [2.4, 2.35, 2.28, 2.19, 2.22, 2.08, 1.99, 1.94, 1.87, 1.82, 1.79, 1.76, 1.74, 1.72], axis: ['Q1', 'Q2', 'Q3', 'Q4'], mark: { i: 10, v: '1.79%' }, projected: 3, unit: '%', precision: 2 },
    mix: { total: '340', totalLabel: 'STORES', segments: [{ k: 'VISION AI', v: 46 }, { k: 'GENERATIVE AI', v: 29 }, { k: 'EDGE AI', v: 25 }] },
    metrics: [
      { l: 'SHRINKAGE', v: '−27%', d: '-0.7pt', dir: 'down', s: [2.4, 2.28, 2.19, 2.05, 1.94, 1.84, 1.77, 1.72] },
      { l: 'SHELF ACCURACY', v: '97.1%', d: '+3.4%', dir: 'up', s: [91.4, 92.6, 93.8, 94.7, 95.4, 96.1, 96.7, 97.1] },
      { l: 'STORES LIVE', v: '340', d: '+58', dir: 'up', s: [196, 218, 241, 262, 284, 305, 324, 340] },
    ],
    target: { k: 'STORE ROLLOUT', now: 66, goal: 95, unit: '%' },
  },
  {
    name: 'Healthcare', line: 'Safer, faster and more coordinated clinical operations.',
    applies: ['Vision AI', 'AI Agents', 'Digital Twin'], metric: '−41%', unit: 'WAIT TIME', status: 'COORDINATING',
    trend: { label: 'PATIENT WAIT · 12 MONTHS', series: [64, 61, 58, 59, 54, 51, 48, 46, 43, 41, 39, 38, 37, 36], axis: ['Q1', 'Q2', 'Q3', 'Q4'], mark: { i: 10, v: '39 min' }, projected: 3, unit: 'min', precision: 0 },
    mix: { total: '54', totalLabel: 'DEPTS', segments: [{ k: 'AI AGENTS', v: 37 }, { k: 'VISION AI', v: 35 }, { k: 'DIGITAL TWIN', v: 28 }] },
    metrics: [
      { l: 'WAIT TIME', v: '−41%', d: '-26min', dir: 'down', s: [64, 58, 54, 48, 43, 40, 38, 36] },
      { l: 'BED TURNOVER', v: '+19%', d: '+3pt', dir: 'up', s: [100, 104, 107, 110, 113, 116, 118, 119] },
      { l: 'DEPARTMENTS LIVE', v: '54', d: '+11', dir: 'up', s: [31, 35, 39, 43, 46, 49, 52, 54] },
    ],
    target: { k: 'PATHWAY COVERAGE', now: 58, goal: 85, unit: '%' },
  },
  {
    name: 'Energy', line: 'Autonomous inspection and predictive grid intelligence.',
    applies: ['Drone AI', 'Edge AI', 'Digital Twin'], metric: '99.9%', unit: 'UPTIME', status: 'INSPECTING',
    trend: { label: 'GRID UPTIME · 12 MONTHS', series: [99.1, 99.2, 99.15, 99.3, 99.35, 99.4, 99.5, 99.55, 99.6, 99.7, 99.75, 99.8, 99.85, 99.9], axis: ['Q1', 'Q2', 'Q3', 'Q4'], mark: { i: 10, v: '99.75%' }, projected: 3, unit: '%', precision: 2 },
    mix: { total: '8,400', totalLabel: 'ASSETS', segments: [{ k: 'DRONE AI', v: 39 }, { k: 'EDGE AI', v: 33 }, { k: 'DIGITAL TWIN', v: 28 }] },
    metrics: [
      { l: 'UPTIME', v: '99.9%', d: '+0.8%', dir: 'up', s: [99.1, 99.2, 99.35, 99.5, 99.6, 99.7, 99.8, 99.9] },
      { l: 'INSPECTION COST', v: '−36%', d: '-8%', dir: 'down', s: [100, 93, 87, 81, 75, 71, 67, 64] },
      { l: 'ASSETS MONITORED', v: '8,400', d: '+1.4k', dir: 'up', s: [5.2, 5.8, 6.3, 6.8, 7.3, 7.8, 8.1, 8.4] },
    ],
    target: { k: 'ASSET COVERAGE', now: 81, goal: 99, unit: '%' },
  },
  {
    name: 'Construction', line: 'Site intelligence — progress, safety and assets tracked continuously.',
    applies: ['Drone AI', 'Vision AI', 'Digital Twin'], metric: '−30%', unit: 'REWORK', status: 'SURVEYING',
    trend: { label: 'REWORK RATE · 12 MONTHS', series: [9.4, 9.1, 8.7, 8.9, 8.2, 7.8, 7.5, 7.1, 6.9, 6.6, 6.4, 6.2, 6.1, 5.9], axis: ['Q1', 'Q2', 'Q3', 'Q4'], mark: { i: 10, v: '6.4%' }, projected: 3, unit: '%', precision: 1 },
    mix: { total: '96', totalLabel: 'SITES', segments: [{ k: 'DRONE AI', v: 42 }, { k: 'VISION AI', v: 33 }, { k: 'DIGITAL TWIN', v: 25 }] },
    metrics: [
      { l: 'REWORK', v: '−30%', d: '-3.5pt', dir: 'down', s: [9.4, 8.7, 8.2, 7.5, 6.9, 6.5, 6.2, 5.9] },
      { l: 'SCHEDULE VARIANCE', v: '−24%', d: '-5pt', dir: 'down', s: [100, 94, 89, 85, 82, 79, 77, 76] },
      { l: 'SITES ACTIVE', v: '96', d: '+18', dir: 'up', s: [52, 59, 66, 73, 79, 86, 91, 96] },
    ],
    target: { k: 'SITE COVERAGE', now: 69, goal: 92, unit: '%' },
  },
]
const active = ref(0)
</script>

<template>
  <section class="in hx-section">
    <div class="hx-container">
      <header class="in__head">
        <p class="hx-eyebrow"><span class="hx-index">06</span> Industries</p>
        <h2 class="hx-title">One intelligence stack. <span class="lite">Every environment.</span></h2>
      </header>

      <div class="in__console">
        <ul class="in__list" role="tablist">
          <li v-for="(ind, i) in industries" :key="ind.name">
            <button
              class="in__item" :class="{ 'is-active': active === i }"
              role="tab" :aria-selected="active === i"
              @mouseenter="active = i" @focus="active = i" @click="active = i"
            >
              <span class="in__item-n hx-mono">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="in__item-name">{{ ind.name }}</span>
              <span class="in__item-bar" aria-hidden="true" />
            </button>
          </li>
        </ul>

        <div class="in__panel hx-panel">
          <span class="hx-pin tl" /><span class="hx-pin tr" /><span class="hx-pin bl" /><span class="hx-pin br" />
          <Transition name="in-swap" mode="out-in">
            <div :key="active" class="in__panel-body">
              <div class="in__panel-top">
                <span class="in__panel-kicker hx-mono-label"><span class="hx-dot" /> DEPLOYMENT · {{ industries[active]!.name.toUpperCase() }}</span>
                <span class="in__status">{{ industries[active]!.status }}<i /></span>
              </div>
              <p class="in__line">{{ industries[active]!.line }}</p>

              <div class="in__stack">
                <span class="in__stack-label hx-mono-label">STACK</span>
                <div class="in__applies">
                  <span v-for="a in industries[active]!.applies" :key="a" class="in__chip">{{ a }}</span>
                </div>
              </div>

              <!-- ANALYSIS — how the headline measure has moved, what it measures
                   out to, and what the deployment is made of. Same three reads as
                   the division instruments, so the two sections rhyme. -->
              <div class="in__an">
                <div class="in__an-head">
                  <span class="hx-mono-label in__an-label">{{ industries[active]!.trend.label }}</span>
                  <span class="in__an-legend"><i />observed<b />projected</span>
                </div>
                <div class="in__an-grid">
                  <div class="in__an-chart">
                    <InstTrend
                      :series="industries[active]!.trend.series"
                      :axis="industries[active]!.trend.axis"
                      :mark-index="industries[active]!.trend.mark.i"
                      :mark-label="industries[active]!.trend.mark.v"
                      :projected="industries[active]!.trend.projected"
                      :unit="industries[active]!.trend.unit"
                      :precision="industries[active]!.trend.precision"
                      :label="industries[active]!.trend.label"
                    />
                    <InstStats
                      :series="industries[active]!.trend.series"
                      :unit="industries[active]!.trend.unit"
                      :precision="industries[active]!.trend.precision"
                    />
                  </div>
                  <InstDonut
                    label="DEPLOYED STACK"
                    :segments="industries[active]!.mix.segments"
                    :total="industries[active]!.mix.total"
                    :total-label="industries[active]!.mix.totalLabel"
                  />
                </div>
              </div>

              <div class="in__rail">
                <InstMetric
                  v-for="m in industries[active]!.metrics"
                  :key="m.l"
                  class="in__rail-cell"
                  :label="m.l" :value="m.v" :delta="m.d" :dir="m.dir" :series="m.s"
                />
              </div>

              <div class="in__foot">
                <InstTarget
                  :label="industries[active]!.target.k"
                  :now="industries[active]!.target.now"
                  :goal="industries[active]!.target.goal"
                  :unit="industries[active]!.target.unit"
                />
              </div>
            </div>
          </Transition>
          <svg class="in__diagram" viewBox="0 0 400 90" preserveAspectRatio="none" aria-hidden="true">
            <path class="hx-rail hx-rail--faint" d="M0 45 H400 M60 20 V70 M160 20 V70 M260 20 V70 M340 20 V70" />
            <circle class="in__diag-dot" r="3" fill="var(--sig)"><animateMotion dur="4s" repeatCount="indefinite" path="M0 45 H400" /></circle>
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.in__head { margin-bottom: clamp(40px, 5vw, 72px); }
.in__console { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: clamp(32px, 4vw, 64px); align-items: stretch; }

.in__list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
.in__item {
  position: relative; width: 100%; display: grid; grid-template-columns: auto 1fr; align-items: baseline; gap: 16px;
  padding: 18px 4px; background: none; border: none; border-top: 1px solid rgba(20, 34, 63, 0.1);
  text-align: left; cursor: pointer; color: var(--ink-secondary);
  transition: color var(--motion-fast) var(--ease-smooth), padding-left var(--motion-medium) var(--ease-out);
}
.in__list li:last-child .in__item { border-bottom: 1px solid rgba(20, 34, 63, 0.1); }
.in__item-n { font-size: 12px; color: var(--ink-muted); }
.in__item-name { font-size: clamp(20px, 2.4vw, 32px); font-weight: 600; letter-spacing: -0.02em; line-height: 1; transition: color var(--motion-fast) var(--ease-smooth); }
.in__item-bar { position: absolute; left: 0; bottom: -1px; height: 2px; width: 0; background: var(--sig); transition: width var(--motion-medium) var(--ease-out); }
.in__item.is-active { color: var(--ink-primary); padding-left: 14px; }
.in__item.is-active .in__item-name { color: var(--ink-primary); }
.in__item.is-active .in__item-bar { width: 100%; }
.in__item:focus-visible { outline: 2px solid var(--sig); outline-offset: 2px; }

.in__panel { display: flex; flex-direction: column; padding: 26px 28px; min-height: 340px; }
.in__panel-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.in__status { display: inline-flex; align-items: center; gap: 7px; font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.14em; color: var(--ink-muted); }
.in__status i { width: 5px; height: 5px; border-radius: 50%; background: var(--sig); }
.in__panel-kicker { display: inline-flex; align-items: center; gap: 8px; color: var(--ink-muted); }
.in__panel-body { flex: 1; display: flex; flex-direction: column; }
.in__panel-top + .in__line { margin-top: 26px; }
.in__line { margin: 0; font-size: clamp(19px, 2.05vw, 27px); font-weight: 500; letter-spacing: -0.02em; line-height: 1.25; color: var(--ink-primary); max-width: 34ch; }
.in__stack { padding-top: 24px; display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
.in__stack-label { color: var(--ink-muted); }
.in__applies { display: flex; flex-wrap: wrap; gap: 8px; }
.in__chip { font-family: var(--font-mono); font-size: 11.5px; letter-spacing: 0.04em; color: var(--ink-primary); padding: 6px 12px; border: 1px solid rgba(20, 34, 63, 0.16); border-radius: var(--radius-pill); background: rgba(255, 255, 255, 0.5); }
/* ── the deployment instrument ─────────────────────────────────────────────── */
.in__an { margin-top: 26px; padding-top: 22px; border-top: 1px solid var(--edge-metal, rgba(20, 34, 63, 0.12)); display: flex; flex-direction: column; gap: 14px; }
.in__an-head { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
.in__an-label { color: var(--ink-muted); }
.in__an-legend { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 8px; letter-spacing: 0.1em; color: var(--ink-muted); }
.in__an-legend i, .in__an-legend b { width: 9px; height: 3px; border-radius: 1px; }
.in__an-legend i { background: var(--sig); }
.in__an-legend b { background: repeating-linear-gradient(45deg, var(--sig) 0 1px, transparent 1px 3px); opacity: 0.8; }
.in__an-grid { display: grid; grid-template-columns: minmax(0, 1.24fr) minmax(210px, 1fr); gap: clamp(18px, 2.4vw, 34px); align-items: start; }
.in__an-chart { display: flex; flex-direction: column; gap: 12px; min-width: 0; }

.in__rail { margin-top: 26px; padding-top: 22px; border-top: 1px solid var(--edge-metal, rgba(20, 34, 63, 0.12)); display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(14px, 2vw, 28px); }
.in__foot { margin-top: 22px; padding-top: 20px; border-top: 1px solid var(--edge-metal, rgba(20, 34, 63, 0.12)); }

.in__diagram { margin-top: 22px; width: 100%; height: 54px; }
.in__diag-dot { filter: drop-shadow(0 0 2px rgba(63, 111, 176, 0.6)); }

.in-swap-enter-active, .in-swap-leave-active { transition: opacity var(--motion-medium) var(--ease-out), transform var(--motion-medium) var(--ease-out); }
.in-swap-enter-from { opacity: 0; transform: translateY(12px); }
.in-swap-leave-to { opacity: 0; transform: translateY(-8px); }

@media (max-width: 1180px) {
  .in__an-grid { grid-template-columns: 1fr; }
}
@media (max-width: 900px) {
  .in__console { grid-template-columns: 1fr; gap: 28px; }
  .in__item-name { font-size: 22px; }
  .in__rail { grid-template-columns: 1fr; gap: 18px; }
}
@media (prefers-reduced-motion: reduce) {
  .in__diag-dot { animation: none; display: none; }
  .in-swap-enter-active, .in-swap-leave-active { transition: opacity var(--motion-fast) linear; }
  .in-swap-enter-from, .in-swap-leave-to { transform: none; }
}
</style>
