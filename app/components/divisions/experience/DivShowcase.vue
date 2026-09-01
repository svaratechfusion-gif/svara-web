<script setup lang="ts">
// DIVISIONS · SHOWCASE — the SVARA Intelligence Instrument System.
//
// Not six variations of one analytics UI: each division is a DIFFERENT instrument
// inside one unified system. Every division is a single editorial intelligence
// SURFACE — a thin, chamfered, low-shadow panel carrying (A) a technical header,
// (B) a domain-specific primary visualisation beside a shared ANALYSIS column
// (trend curve with a hatched forecast tail + callout, descriptive readout, and a
// segmented composition ring), (C) a rail of OVERSIZED typographic metrics, each
// with its movement and the trace behind it, and (D) the goal bar that closes it. No pill grids, no equal KPI cards,
// no floating-widget shadows — structure comes from space, hierarchy and 1px lines.
// One accent (--sig) keeps the six unified; composition keeps them distinct. Domain
// motion is paused until a division is revealed (perf); reduced-motion respected.
import { onBeforeUnmount, onMounted, ref } from 'vue'

/** A metric on the rail: value, its movement, and the trace behind it. */
import InstDonut from '~/components/instrument/InstDonut.vue'
import InstMetric from '~/components/instrument/InstMetric.vue'
import InstStats from '~/components/instrument/InstStats.vue'
import InstTarget from '~/components/instrument/InstTarget.vue'
import InstTrend from '~/components/instrument/InstTrend.vue'

interface Metric { l: string, v: string, d: string, dir: 'up' | 'down', s: number[] }
/** The analysis column beside each division's primary visualisation. */
interface Analysis {
  label: string
  series: number[]
  axis: string[]
  /** Which sample carries the callout pill, and what it reads as. */
  mark: { i: number, v: string }
  /** Trailing samples that are forecast, drawn hatched rather than solid. */
  projected: number
  unit: string
  precision: number
  breakdown: { label: string, segments: { k: string, v: number }[], total: string, totalLabel: string }
  target: { k: string, now: number, goal: number, unit: string }
}
interface Div {
  n: string, division: string, kind: string, headline: string[], desc: string,
  labels: string[], status: string, metrics: Metric[], visual: string, an: Analysis,
  /** Basename in /public/images/divisions, and the /divisions/<slug> segment. */
  img: string
  /** Describes the render's CONTENT for anyone who cannot see it. */
  imgAlt: string
}
const divisions: Div[] = [
  { n: '01', division: 'Deep Tech & Autonomous Intelligence', kind: 'Autonomous Intelligence Command', headline: ['Artificial', 'Intelligence'], desc: 'AI inference, computer vision and autonomous systems — perception engineered to run in real time.', labels: ['INFERENCE', 'VISION', 'AUTONOMY', 'PERCEPTION', 'SENSOR FUSION'], status: 'PERCEIVING', metrics: [{ l: 'INFERENCE THROUGHPUT', v: '48.2k', d: '+12.4%', dir: 'up', s: [31, 34, 39, 41, 44, 46, 48, 51] }, { l: 'MODEL LATENCY', v: '11ms', d: '-8.1%', dir: 'down', s: [19, 18, 16, 15, 14, 13, 12, 11] }, { l: 'ACTIVE MODELS', v: '312', d: '+6', dir: 'up', s: [288, 292, 297, 301, 304, 308, 310, 312] }], visual: 'inference', img: 'autonomous-intelligence', imgAlt: 'A perception command centre. A curved screen wall carries camera feeds, a rotating globe of tracked assets and analytics; operators sit at consoles around a holographic city table. Signal paths run out to a refinery, a substation and pylons on the left, a survey drone and a satellite overhead, a vessel under way in a channel, a sensor-equipped vehicle and a telecom mast on the right. A strip of five screens along the foot shows a global link graph, people detection, street-level vehicle tracking, a face-mesh network and layered analytics.', an: {
    label: 'INFERENCE THROUGHPUT · 24H', unit: 'k/s', precision: 1, projected: 3,
    series: [18.4, 17.9, 19.2, 22.6, 28.1, 34.7, 39.2, 41.8, 44.3, 46.1, 48.2, 47.4, 45.9, 47.8, 49.6, 51.2],
    axis: ['00:00', '06:00', '12:00', '18:00', '24:00'],
    mark: { i: 10, v: '48.2k / s' },
    breakdown: { label: 'MODEL CLASS', total: '312', totalLabel: 'MODELS', segments: [{ k: 'VISION', v: 46 }, { k: 'LANGUAGE', v: 24 }, { k: 'SENSOR', v: 19 }, { k: 'CONTROL', v: 11 }] },
    target: { k: 'PERCEPTION COVERAGE', now: 82, goal: 95, unit: '%' },
  } },
  { n: '02', division: 'Business SaaS Product Studio', kind: 'Connected Enterprise Workspace', headline: ['Enterprise', 'Software'], desc: 'Intelligent enterprise applications engineered to connect operations, workflows and business systems.', labels: ['ERP', 'CRM', 'HRM', 'OPERATIONS', 'FINANCE', 'ANALYTICS'], status: 'SYNCED', metrics: [{ l: 'MODULES LIVE', v: '47', d: '+5', dir: 'up', s: [38, 39, 41, 42, 44, 45, 46, 47] }, { l: 'RECORDS SYNCED', v: '1.2B', d: '+9.7%', dir: 'up', s: [0.8, 0.86, 0.94, 1.0, 1.06, 1.11, 1.16, 1.2] }, { l: 'ACTIVE SESSIONS', v: '8,206', d: '+3.1%', dir: 'up', s: [7.1, 7.3, 7.5, 7.7, 7.9, 8.0, 8.1, 8.2] }], visual: 'saas', img: 'enterprise-software', imgAlt: 'An enterprise operations room. The screen wall reports a global performance overview beside module panels for ERP, CRM, HRM, Operations, Finance and Analytics, each with a completion dial and its own figures; three staff work consoles beneath it. In the foreground a lit network core connects six platform plinths — ERP, CRM, HRM, Operations, Finance and Analytics — each captioned with what it does, from managing core resources and supply chains to turning data into confident decisions.', an: {
    label: 'RECORD SYNC VOLUME · 7D', unit: 'M', precision: 0, projected: 2,
    series: [104, 118, 131, 127, 149, 162, 158, 171, 184, 179, 196, 208, 214, 226],
    axis: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
    mark: { i: 11, v: '208M synced' },
    breakdown: { label: 'MODULE LOAD', total: '47', totalLabel: 'MODULES', segments: [{ k: 'ERP', v: 38 }, { k: 'CRM', v: 27 }, { k: 'FINANCE', v: 21 }, { k: 'HRM', v: 14 }] },
    target: { k: 'WORKFLOW AUTOMATION', now: 68, goal: 90, unit: '%' },
  } },
  { n: '03', division: 'Interactive AI & Simulation', kind: 'Scenario Intelligence Environment', headline: ['Simulation'], desc: 'Digital twins, simulations and scenario modelling — compute possible futures and predict what comes next.', labels: ['DIGITAL TWIN', 'SCENARIO', 'PROBABILITY', 'FORECAST', 'HORIZON'], status: 'FORECASTING', metrics: [{ l: 'TWIN FIDELITY', v: '99.2%', d: '+0.4', dir: 'up', s: [98.1, 98.3, 98.5, 98.7, 98.8, 99.0, 99.1, 99.2] }, { l: 'SIMULATIONS RUN', v: '18.4k', d: '+21.8%', dir: 'up', s: [9.4, 10.8, 12.1, 13.6, 14.9, 16.2, 17.3, 18.4] }, { l: 'FORECAST HORIZON', v: '72h', d: '+24h', dir: 'up', s: [24, 24, 36, 36, 48, 48, 60, 72] }], visual: 'twin', img: 'simulation', imgAlt: 'A scenario modelling suite. A single operator faces a wall showing a system twin of an industrial plant, a scenario list from base case to extreme weather, a probability distribution reading 72%, a forecast outlook, key drivers, a risk map and a horizon view running from year one to year ten. A holographic twin of the plant turns on a table in front of the screens, with a physical site model to one side and a wind-and-solar model to the other. Five plinths along the foot read digital twin, scenario, probability, forecast and horizon.', an: {
    label: 'FORECAST CONFIDENCE · 72H', unit: '', precision: 2, projected: 3,
    series: [0.94, 0.93, 0.91, 0.88, 0.86, 0.83, 0.79, 0.76, 0.72, 0.69, 0.66, 0.62, 0.59, 0.55, 0.51],
    axis: ['t0', 't+12', 't+24', 't+48', 't+72'],
    mark: { i: 11, v: 'P(sel) 0.62' },
    breakdown: { label: 'SCENARIO WEIGHT', total: '18.4k', totalLabel: 'RUNS', segments: [{ k: 'PEAK LOAD', v: 44 }, { k: 'STAGGERED', v: 31 }, { k: 'FAILURE', v: 16 }, { k: 'BASELINE', v: 9 }] },
    target: { k: 'TWIN FIDELITY', now: 99.2, goal: 99.9, unit: '%' },
  } },
  { n: '04', division: 'Digital Engineering & App Development', kind: 'Engineering Intelligence Workspace', headline: ['Digital', 'Engineering'], desc: 'APIs, cloud architecture, deployments and DevOps — the living delivery system behind every platform.', labels: ['ARCHITECTURE', 'PIPELINE', 'EDGE CLUSTER', 'DEPLOYMENT', 'DEPENDENCIES'], status: 'DEPLOYING', metrics: [{ l: 'ACTIVE PIPELINES', v: '318', d: '+12', dir: 'up', s: [271, 279, 288, 295, 302, 309, 314, 318] }, { l: 'DEPLOYMENTS', v: '5,914', d: '+18.2%', dir: 'up', s: [3.6, 3.9, 4.3, 4.6, 5.0, 5.3, 5.6, 5.9] }, { l: 'BUILD HEALTH', v: '99.4%', d: '+0.6%', dir: 'up', s: [98.2, 98.4, 98.7, 98.9, 99.0, 99.2, 99.3, 99.4] }], visual: 'devops', img: 'digital-engineering', imgAlt: 'A delivery engineering console. The wall reports system architecture and cloud infrastructure, a CI/CD pipeline stepping through code, build, test, scan and deploy with a 98.6% success rate, a world map of edge nodes with availability and latency, environment status for development, staging and production, and a service dependency graph. An engineer works six code screens below. Five plinths along the foot read architecture, pipeline, edge cluster, deployment and dependencies.', an: {
    label: 'DEPLOY FREQUENCY · 14D', unit: '/d', precision: 0, projected: 2,
    series: [26, 31, 29, 38, 42, 37, 46, 51, 48, 57, 62, 59, 68, 74],
    axis: ['D-14', 'D-10', 'D-6', 'D-2', 'NOW'],
    mark: { i: 10, v: '62 deploys' },
    breakdown: { label: 'PIPELINE TIME', total: '318', totalLabel: 'PIPELINES', segments: [{ k: 'BUILD', v: 41 }, { k: 'TEST', v: 28 }, { k: 'SCAN', v: 18 }, { k: 'DEPLOY', v: 13 }] },
    target: { k: 'BUILD HEALTH', now: 99.4, goal: 99.9, unit: '%' },
  } },
  { n: '05', division: 'AI Wrapper & Orchestration', kind: 'Intelligence Orchestration Console', headline: ['Intelligence', 'Platform'], desc: 'The enterprise AI operating layer — agents, orchestration and reasoning across every connected system.', labels: ['ORCHESTRATION', 'REASONING', 'AGENTS', 'TOOLS', 'MEMORY'], status: 'ORCHESTRATING', metrics: [{ l: 'INTENT RESOLVED', v: '94.1%', d: '+2.3%', dir: 'up', s: [88.4, 89.6, 90.7, 91.5, 92.3, 93.1, 93.7, 94.1] }, { l: 'ORCHESTRATIONS', v: '52.7k', d: '+31.4%', dir: 'up', s: [21, 25, 29, 34, 39, 44, 48, 52.7] }, { l: 'AGENTS ACTIVE', v: '128', d: '+16', dir: 'up', s: [92, 98, 104, 110, 116, 121, 125, 128] }], visual: 'os', img: 'intelligence-platform', imgAlt: 'An agent orchestration console in pale ceramic and violet. The wall shows a system overview graph, an activity stream, an orchestration flow of trigger, analyse, plan, execute and monitor, a reasoning engine reporting context, confidence, accuracy and latency, an agent network of 128 agents at a 98.3% success rate, and a memory system listing knowledge graph, vector store, long-term and working memory. Five plinths along the foot read orchestration, reasoning, agents, tools and memory.', an: {
    label: 'ORCHESTRATION LOAD · 24H', unit: 'k', precision: 1, projected: 3,
    series: [12.1, 14.8, 19.4, 24.6, 31.2, 36.9, 41.4, 44.8, 47.2, 49.6, 52.7, 51.3, 54.1, 56.8],
    axis: ['00:00', '06:00', '12:00', '18:00', '24:00'],
    mark: { i: 10, v: '52.7k routed' },
    breakdown: { label: 'AGENT ACTIVITY', total: '128', totalLabel: 'AGENTS', segments: [{ k: 'REASONING', v: 39 }, { k: 'TOOL CALL', v: 29 }, { k: 'MEMORY', v: 18 }, { k: 'ROUTING', v: 14 }] },
    target: { k: 'INTENT RESOLVED', now: 94.1, goal: 98, unit: '%' },
  } },
  { n: '06', division: 'Digital Growth & PR Tech', kind: 'Growth Intelligence System', headline: ['Digital', 'Growth'], desc: 'Marketing intelligence, search, analytics and campaign systems — growth engineered as a connected flow.', labels: ['ACQUISITION', 'AUDIENCE', 'CONVERSION', 'RETENTION', 'ATTRIBUTION'], status: 'COMPOUNDING', metrics: [{ l: 'ENGAGEMENT LIFT', v: '+34%', d: '+6pt', dir: 'up', s: [12, 15, 18, 21, 25, 28, 31, 34] }, { l: 'REACH / MO', v: '42.8M', d: '+11.6%', dir: 'up', s: [29.3, 31.7, 33.2, 36.4, 38.1, 40.6, 42.0, 42.8] }, { l: 'CONVERSION INDEX', v: '7.9', d: '+0.8', dir: 'up', s: [6.1, 6.4, 6.7, 7.0, 7.2, 7.5, 7.7, 7.9] }], visual: 'growth', img: 'digital-growth', imgAlt: 'A growth analytics console in warm neutrals. The wall reports overall growth performance and top channels, acquisition traffic sources totalling 235K sessions, an audience overview with users by region, a 3.65% conversion rate with top conversions, a weekly user-retention cohort grid, and data-driven attribution by channel. An analyst works five screens below. Five plinths along the foot read acquisition, audience, conversion, retention and attribution.', an: {
    label: 'AUDIENCE REACH · 12MO', unit: 'M', precision: 1, projected: 2,
    series: [18.2, 19.6, 22.4, 24.1, 26.8, 29.3, 31.7, 33.2, 36.4, 38.1, 40.6, 42.8, 44.9, 47.2],
    axis: ['Q1', 'Q2', 'Q3', 'Q4'],
    mark: { i: 11, v: '42.8M / mo' },
    breakdown: { label: 'CHANNEL MIX', total: '42.8M', totalLabel: 'REACH', segments: [{ k: 'SEARCH', v: 34 }, { k: 'SOCIAL', v: 27 }, { k: 'PR', v: 22 }, { k: 'DIRECT', v: 17 }] },
    target: { k: 'CONVERSION INDEX', now: 7.9, goal: 10, unit: '' },
  } },
]
const id = (i: number) => `division-${i + 1}`

// ── representational instrument data ─────────────────────────────────────────
// STRUCTURAL ONLY. These figures exist to give each instrument a believable
// shape and density — they are product illustration, not measured SVARA
// telemetry, and nothing here should be quoted as a performance claim. The
// series are what the charts derive their statistics from, so a curve and the
// readout beneath it can never disagree.
const detections = [
  { x: 9, y: 16, w: 30, h: 24, label: 'PERSON', conf: '0.97' },
  { x: 54, y: 30, w: 26, h: 20, label: 'VEHICLE', conf: '0.93' },
  { x: 20, y: 60, w: 20, h: 18, label: 'ASSET', conf: '0.88' },
]
const fusion = [{ k: 'VISION', v: 96 }, { k: 'LIDAR', v: 82 }, { k: 'RADAR', v: 71 }]
// enterprise nodes positioned radially around a central intelligence layer
const enterprise = [
  { k: 'ERP', x: 50, y: 13 }, { k: 'CRM', x: 86, y: 32 }, { k: 'FINANCE', x: 86, y: 70 },
  { k: 'ANALYTICS', x: 50, y: 87 }, { k: 'OPS', x: 14, y: 70 }, { k: 'HRM', x: 14, y: 32 },
]
const scenarios = ['A · PEAK LOAD', 'B · STAGGERED', 'C · FAILURE']
const scenarioPaths = [
  'M6 32 C 30 32, 40 16, 96 8',
  'M6 32 C 30 32, 44 26, 96 22',
  'M6 32 C 32 32, 46 38, 96 40',
]
const activeScenario = ref(0)
// engineering system-map layers (living dependency graph)
const engNodes = [
  { k: 'edge', x: 14, y: 24, s: 'ok' }, { k: 'api', x: 42, y: 16, s: 'ok' }, { k: 'gateway', x: 72, y: 26, s: 'run' },
  { k: 'service', x: 30, y: 58, s: 'ok' }, { k: 'twin', x: 60, y: 52, s: 'ok' }, { k: 'data', x: 86, y: 62, s: 'ok' },
  { k: 'queue', x: 46, y: 84, s: 'ok' },
]
const engLinks = [[0, 1], [1, 2], [1, 3], [3, 4], [4, 5], [2, 5], [3, 6], [4, 6]]
const osAgents = [
  { k: 'VISION AGENT', v: 'reasoning' }, { k: 'OPS AGENT', v: 'executing' },
  { k: 'FINANCE AGENT', v: 'idle' }, { k: 'GROWTH AGENT', v: 'reasoning' },
]
const growthStages = [
  { k: 'AWARENESS', w: 100 }, { k: 'ENGAGEMENT', w: 74 }, { k: 'CONVERSION', w: 46 }, { k: 'RETENTION', w: 31 },
]
const growthChannels = [{ k: 'SEARCH', v: 71 }, { k: 'PR', v: 48 }, { k: 'SOCIAL', v: 63 }, { k: 'DIRECT', v: 39 }]

const revealed = ref(new Set<string>())
const activeIndex = ref(0)
let observer: IntersectionObserver | null = null

function scrollTo(i: number) {
  document.getElementById(id(i))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return
      const el = e.target as HTMLElement
      if (!revealed.value.has(el.id)) revealed.value = new Set([...revealed.value, el.id])
      const i = Number(el.dataset.index)
      if (!Number.isNaN(i)) activeIndex.value = i
    })
  }, { rootMargin: '0px 0px -40% 0px', threshold: 0.06 })
  divisions.forEach((_, i) => {
    const el = document.getElementById(id(i))
    if (el) observer?.observe(el)
  })
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <section class="dsw">
    <div class="hx-container">
      <header class="dsw__head">
        <p class="hx-eyebrow"><span class="hx-index">08</span> Specialized by Design</p>
        <h2 class="hx-title">Six instruments. <span class="lite">One intelligence system.</span></h2>
        <p class="hx-lead">Each SVARA division is a different instrument inside one connected intelligence architecture — engineered around a specialized technology domain, unified by a single design system.</p>
      </header>

      <div class="dsw__journey">
        <aside class="dsw__index">
          <span class="dsw__index-label hx-mono-label">Instruments</span>
          <ul>
            <li v-for="(d, i) in divisions" :key="d.n">
              <button class="dsw__ix" :class="{ 'is-active': activeIndex === i }" @click="scrollTo(i)">
                <span class="dsw__ix-n hx-mono">D{{ d.n }}</span>
                <span class="dsw__ix-name">{{ d.division }}</span>
                <span class="dsw__ix-dot" />
              </button>
            </li>
          </ul>
        </aside>

        <div class="dsw__chapters">
          <span class="dsw__pathway" aria-hidden="true" />
          <span class="dsw__progress" :style="{ transform: `scaleY(${(activeIndex + 1) / divisions.length})` }" aria-hidden="true" />

          <article
            v-for="(d, i) in divisions"
            :id="id(i)"
            :key="d.n"
            :data-index="i"
            class="dchap"
            :class="{ 'is-revealed': revealed.has(id(i)), 'is-active': activeIndex === i }"
          >
            <div class="dchap__marker" aria-hidden="true"><span class="dchap__node" /></div>

            <div class="dchap__grid">
              <!-- editorial lead: story + oversized name, thin inline metadata -->
              <div class="dchap__lead">
                <p class="dchap__meta hx-mono-label"><span class="dchap__meta-n">D{{ d.n }}</span><span class="dchap__meta-sep">/</span>{{ d.kind }}</p>
                <h3 class="dchap__name">
                  <span v-for="(line, li) in d.headline" :key="li" :class="{ lite: li === d.headline.length - 1 && d.headline.length > 1 }">{{ line }}<br v-if="li < d.headline.length - 1"></span>
                </h3>
                <p class="dchap__desc">{{ d.desc }}</p>
                <p class="dchap__tags">
                  <span v-for="(l, li) in d.labels" :key="l">{{ l }}<span v-if="li < d.labels.length - 1" class="dchap__tags-sep" aria-hidden="true">·</span></span>
                </p>

                <!-- The slug is the render's basename: one key for the asset and
                     the route, so a division cannot link somewhere its own
                     picture does not come from. -->
                <NuxtLink :to="`/divisions/${d.img}`" class="dchap__more">
                  Learn more
                  <span class="dchap__more-x" aria-hidden="true">about {{ d.headline.join(' ') }}</span>
                  <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true"><path d="M0 5h14M14 5l-4-4M14 5l-4 4" stroke="currentColor" stroke-width="1.3" /></svg>
                </NuxtLink>

              </div>

              <!-- Full-bleed within the chapter: the render is the division's
                   establishing shot, so it gets the whole column and its own
                   16:9, uncropped. The dashboard reads it from underneath. -->
              <a
                class="dchap__art"
                :href="`/images/divisions/${d.img}.png`"
                target="_blank"
                rel="noopener"
                :aria-label="`${d.headline.join(' ')} — open the full-resolution render in a new tab`"
              >
                <picture>
                  <source :srcset="`/images/divisions/${d.img}.webp`" type="image/webp">
                  <img
                    class="dchap__art-img"
                    :src="`/images/divisions/${d.img}.png`"
                    :alt="d.imgAlt"
                    width="1672"
                    height="941"
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                  >
                </picture>
                <span class="dchap__art-zoom" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="4.2" stroke="currentColor" stroke-width="1.3" /><path d="M9.2 9.2 13 13M6 4.2v3.6M4.2 6h3.6" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" /></svg>
                  View full size
                </span>
              </a>

              <!-- the intelligence surface: header · primary visualisation · metric rail -->
              <div class="dinst">
                <span class="hx-pin tl" /><span class="hx-pin tr" /><span class="hx-pin bl" /><span class="hx-pin br" />

                <div class="dinst__bar">
                  <span class="dinst__id"><span class="dinst__live" /> SVARA / {{ d.headline.join(' ').toUpperCase() }} / D{{ d.n }}</span>
                  <span class="dinst__status">{{ d.status }}<i /></span>
                </div>

                <div class="dinst__main">
                <div class="dinst__hero" aria-hidden="true">
                  <!-- 01 · AUTONOMOUS INTELLIGENCE — spatial perception field -->
                  <div v-if="d.visual === 'inference'" class="iq">
                    <div class="iq__view">
                      <span class="iq__grid" />
                      <span class="iq__scan" />
                      <div v-for="(b, k) in detections" :key="k" class="iq__box" :style="{ left: b.x + '%', top: b.y + '%', width: b.w + '%', height: b.h + '%' }">
                        <span class="iq__tag">{{ b.label }} <b>{{ b.conf }}</b></span>
                      </div>
                      <span class="iq__crosshair" />
                    </div>
                    <div class="iq__side">
                      <span class="iq__lbl hx-mono-label">SENSOR FUSION</span>
                      <div v-for="f in fusion" :key="f.k" class="iq__f">
                        <span class="iq__fk">{{ f.k }}</span>
                        <span class="iq__ftrack"><i :style="{ width: f.v + '%' }" /></span>
                        <span class="iq__fv">{{ f.v }}</span>
                      </div>
                      <div class="iq__read">
                        <span>model · svara-vision-v4</span>
                        <span>stream · plant-cam-02</span>
                        <span class="iq__read-acc">inference · 11ms</span>
                      </div>
                    </div>
                  </div>

                  <!-- 02 · CONNECTED ENTERPRISE — radial operational architecture -->
                  <div v-else-if="d.visual === 'saas'" class="eq">
                    <svg class="eq__net" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                      <g class="eq__links">
                        <line v-for="e in enterprise" :key="e.k" x1="50" y1="50" :x2.attr="e.x" :y2.attr="e.y" />
                      </g>
                      <circle v-for="(e, k) in enterprise" :key="e.k" class="eq__pulse" r="0.9">
                        <animateMotion :dur="4 + k * 0.6 + 's'" repeatCount="indefinite" :path="`M50 50 L${e.x} ${e.y}`" />
                      </circle>
                    </svg>
                    <div class="eq__core"><span>INTELLIGENCE</span><b>LAYER</b></div>
                    <div v-for="e in enterprise" :key="e.k" class="eq__node" :style="{ left: e.x + '%', top: e.y + '%' }">{{ e.k }}</div>
                  </div>

                  <!-- 03 · SCENARIO ENVIRONMENT — branching futures + prediction band -->
                  <div v-else-if="d.visual === 'twin'" class="sq">
                    <div class="sq__tabs">
                      <button v-for="(s, k) in scenarios" :key="s" class="sq__tab" :class="{ 'is-on': activeScenario === k }" @click.stop="activeScenario = k">{{ s }}</button>
                    </div>
                    <svg class="sq__field" viewBox="0 0 100 46" preserveAspectRatio="none">
                      <g class="sq__axis"><line x1="0" y1="45" x2="100" y2="45" /><line v-for="t in [25,50,75]" :key="t" :x1.attr="t" y1="43" :x2.attr="t" y2="45" /></g>
                      <path class="sq__band" d="M6 30 C 34 30, 40 12, 96 4 L96 44 C 40 30, 34 40, 6 34 Z" />
                      <path class="sq__branch" d="M6 32 C 30 32, 40 16, 96 8" />
                      <path class="sq__branch" d="M6 32 C 30 32, 44 26, 96 22" />
                      <path class="sq__branch" d="M6 32 C 32 32, 46 38, 96 40" />
                      <path class="sq__sel" :d="scenarioPaths[activeScenario]" />
                      <circle class="sq__origin" cx="6" cy="32" r="1.6" />
                    </svg>
                    <div class="sq__read">
                      <span>ORIGIN · t0</span><span>PATHS · 3</span><span class="sq__read-acc">P(sel) · 0.62</span>
                    </div>
                  </div>

                  <!-- 04 · ENGINEERING — living system / dependency map -->
                  <div v-else-if="d.visual === 'devops'" class="gq">
                    <svg class="gq__map" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                      <g class="gq__links">
                        <line v-for="(lk, k) in engLinks" :key="k" :x1.attr="engNodes[lk[0]!]!.x" :y1.attr="engNodes[lk[0]!]!.y" :x2.attr="engNodes[lk[1]!]!.x" :y2.attr="engNodes[lk[1]!]!.y" />
                      </g>
                      <g class="gq__flow">
                        <circle v-for="(lk, k) in engLinks.slice(0,4)" :key="k" r="0.8">
                          <animateMotion :dur="3 + k + 's'" repeatCount="indefinite" :path="`M${engNodes[lk[0]!]!.x} ${engNodes[lk[0]!]!.y} L${engNodes[lk[1]!]!.x} ${engNodes[lk[1]!]!.y}`" />
                        </circle>
                      </g>
                    </svg>
                    <div v-for="n in engNodes" :key="n.k" class="gq__node" :class="'gq__node--' + n.s" :style="{ left: n.x + '%', top: n.y + '%' }">{{ n.k }}</div>
                    <div class="gq__pipe">
                      <span class="gq__pk hx-mono-label">PIPELINE</span>
                      <span v-for="(st, k) in ['lint','build','test','scan','deploy']" :key="st" class="gq__st" :class="{ 'is-done': k < 3, 'is-run': k === 3 }">{{ st }}</span>
                    </div>
                  </div>

                  <!-- 05 · ORCHESTRATION CONSOLE — agent graph + activity rail -->
                  <div v-else-if="d.visual === 'os'" class="oq">
                    <div class="oq__graph">
                      <svg class="oq__net" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                        <g class="oq__links">
                          <line x1="50" y1="50" x2="20" y2="20" /><line x1="50" y1="50" x2="80" y2="22" />
                          <line x1="50" y1="50" x2="16" y2="72" /><line x1="50" y1="50" x2="82" y2="74" /><line x1="50" y1="50" x2="50" y2="90" />
                        </g>
                        <circle class="oq__pulse" r="1"><animateMotion dur="3s" repeatCount="indefinite" path="M20 20 L50 50" /></circle>
                        <circle class="oq__pulse" r="1"><animateMotion dur="4s" begin="1s" repeatCount="indefinite" path="M82 74 L50 50" /></circle>
                      </svg>
                      <span class="oq__core">REASON</span>
                      <span class="oq__n" style="left:20%;top:20%">MODELS</span>
                      <span class="oq__n" style="left:80%;top:22%">TOOLS</span>
                      <span class="oq__n" style="left:16%;top:72%">MEMORY</span>
                      <span class="oq__n" style="left:82%;top:74%">KNOWLEDGE</span>
                      <span class="oq__n oq__n--out" style="left:50%;top:90%">ACT</span>
                    </div>
                    <div class="oq__rail">
                      <span class="oq__lbl hx-mono-label">ACTIVE AGENTS</span>
                      <div v-for="a in osAgents" :key="a.k" class="oq__agent" :class="'is-' + a.v">
                        <span class="oq__ad" /><span class="oq__ak">{{ a.k }}</span><span class="oq__av">{{ a.v }}</span>
                      </div>
                      <div class="oq__usage"><span>MODEL USAGE</span><span class="oq__usage-acc">62%</span></div>
                    </div>
                  </div>

                  <!-- 06 · GROWTH SYSTEM — audience flow + channel contribution -->
                  <div v-else class="wq">
                    <div class="wq__flow">
                      <span class="wq__flabel hx-mono-label">AUDIENCE FLOW</span>
                      <div v-for="(s, k) in growthStages" :key="s.k" class="wq__stage">
                        <span class="wq__sk">{{ s.k }}</span>
                        <span class="wq__sbar" :style="{ width: s.w + '%' }"><i /></span>
                        <span v-if="k < growthStages.length - 1" class="wq__sarrow" aria-hidden="true">↓</span>
                      </div>
                    </div>
                    <div class="wq__ch">
                      <span class="wq__flabel hx-mono-label">CHANNEL CONTRIBUTION</span>
                      <div class="wq__bars">
                        <div v-for="c in growthChannels" :key="c.k" class="wq__cbar">
                          <span class="wq__ctrack"><i :style="{ height: c.v + '%' }" /></span>
                          <span class="wq__cv">{{ c.v }}</span>
                          <span class="wq__ck">{{ c.k }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- ANALYSIS COLUMN — the same three reads on every instrument, so six
                     different domains stay comparable: how the primary series has
                     moved, what it measures out to, and what it is made of. -->
                <aside class="dinst__an">
                  <div class="dinst__an-head">
                    <span class="dinst__an-label hx-mono-label">{{ d.an.label }}</span>
                    <span class="dinst__an-legend"><i />observed<b />projected</span>
                  </div>
                  <InstTrend
                    :series="d.an.series"
                    :axis="d.an.axis"
                    :mark-index="d.an.mark.i"
                    :mark-label="d.an.mark.v"
                    :projected="d.an.projected"
                    :unit="d.an.unit" :precision="d.an.precision" :label="d.an.label"
                  />
                  <InstStats :series="d.an.series" :unit="d.an.unit" :precision="d.an.precision" />
                  <InstDonut
                    :label="d.an.breakdown.label"
                    :segments="d.an.breakdown.segments"
                    :total="d.an.breakdown.total"
                    :total-label="d.an.breakdown.totalLabel"
                  />
                </aside>
                </div>

                <!-- metric rail: oversized figure, its movement, and its trace -->
                <div class="dinst__rail">
                  <InstMetric
                    v-for="m in d.metrics"
                    :key="m.l"
                    class="dinst__metric"
                    :label="m.l" :value="m.v" :delta="m.d" :dir="m.dir" :series="m.s"
                  />
                </div>

                <div class="dinst__foot">
                  <InstTarget
                    :label="d.an.target.k"
                    :now="d.an.target.now"
                    :goal="d.an.target.goal"
                    :unit="d.an.target.unit"
                  />
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dsw { position: relative; padding-block: clamp(60px, 7vh, 110px); }
/* Centred. `text-align` alone is not enough: .hx-title and .hx-lead carry their
   own measures (20ch / 40ch), so they need margin-inline to centre as blocks.
   The head's own cap is dropped — it only existed to stop left-aligned copy
   running full width, which the children already handle. */
.dsw__head { margin-bottom: clamp(48px, 6vw, 88px);; text-align: center; }
.dsw__head .hx-title, .dsw__head .hx-lead { margin-inline: auto; }
/* two lines, not a column: this lead is 180 characters, so it needs ~90ch
   to break in half. `balance` evens the two rather than leaving an orphan. */
.dsw__head .hx-lead { max-width: 96ch; text-wrap: balance; }
.dsw__journey { display: grid; grid-template-columns: 176px minmax(0, 1fr); gap: clamp(28px, 3vw, 56px); }

/* division index */
.dsw__index { position: sticky; top: 108px; align-self: start; z-index: 20; }
.dsw__index-label { display: block; padding: 0 8px 10px; color: var(--ink-muted); }
.dsw__index ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; }
.dsw__ix { position: relative; display: grid; grid-template-columns: 26px minmax(0, 1fr) 6px; align-items: center; gap: 9px; width: 100%; padding: 9px 8px; border: 0; background: transparent; color: var(--ink-secondary); cursor: pointer; text-align: left; border-left: 1px solid transparent; transition: color var(--motion-fast) var(--ease-smooth), border-color var(--motion-fast); }
.dsw__ix-n { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.08em; color: var(--ink-muted); }
.dsw__ix-name { min-width: 0; font-size: 10.5px; line-height: 1.25; font-weight: 500; letter-spacing: -0.01em; }
.dsw__ix-dot { width: 5px; height: 5px; border-radius: 50%; background: transparent; transition: background var(--motion-fast) var(--ease-smooth); }
.dsw__ix.is-active { color: var(--ink-primary); border-left-color: var(--sig); }
.dsw__ix.is-active .dsw__ix-n { color: var(--sig); }
.dsw__ix.is-active .dsw__ix-dot { background: var(--sig); box-shadow: 0 0 0 3px rgba(63,111,176,0.14); }
.dsw__ix:hover { color: var(--ink-primary); }

/* pathway */
.dsw__chapters { position: relative; }
.dsw__pathway { position: absolute; left: 5px; top: 0; bottom: 0; width: 1px; background: rgba(20,34,63,0.1); }
.dsw__progress { position: absolute; left: 4.5px; top: 0; bottom: 0; width: 2px; background: linear-gradient(var(--sig), var(--sig-soft)); transform-origin: top; transition: transform 0.6s var(--ease-out); }

.dchap { position: relative; padding-left: 34px; margin-bottom: clamp(90px, 11vw, 170px); scroll-margin-top: 100px; }
.dchap:last-child { margin-bottom: 0; }
.dchap__marker { position: absolute; left: 0; top: 8px; }
.dchap__node { display: block; width: 12px; height: 12px; border-radius: 50%; background: rgba(255,255,255,0.9); border: 1px solid rgba(20,34,63,0.3); transition: all var(--motion-medium) var(--ease-out); }
.dchap.is-active .dchap__node { background: var(--sig); border-color: var(--sig); box-shadow: 0 0 0 4px rgba(63,111,176,0.16); }

/* Each division is its own stacked section now — the story, then the render at
   full column width, then the dashboard reading it from underneath. It used to
   be a two-column grid with the render squeezed into the narrow story side. */
.dchap__grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: clamp(22px, 2.6vw, 40px); align-items: stretch; opacity: 0; transform: translateY(26px); transition: opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out); }
.dchap.is-revealed .dchap__grid { opacity: 1; transform: none; }

/* editorial lead */
.dchap__meta { display: flex; align-items: center; gap: 8px; color: var(--ink-muted); }
.dchap__meta-n { color: var(--sig); }
.dchap__meta-sep { opacity: 0.4; }
.dchap__name { margin: 16px 0 0; font-size: clamp(32px, 3.7vw, 56px); font-weight: 600; letter-spacing: -0.035em; line-height: 0.94; color: var(--ink-primary); }
.dchap__name .lite { color: var(--ink-secondary); }
.dchap__desc { margin: 20px 0 0; max-width: 40ch; font-size: var(--type-lead); line-height: 1.55; color: var(--ink-secondary); }
/* the division render. `__art`, not `__card`/`__tile`/`__mod` — svara-3d.css
   attaches bevel, hover-lift and a cursor tilt to those suffixes by attribute
   selector. Whole frame, never cropped: every one of these scenes carries its
   meaning across the full 16:9, captions included. */
.dchap__art { position: relative; display: block; }
.dchap__art picture {
  display: block; overflow: hidden; border-radius: 2px;
  /* on the frame, not the <img> — an inset shadow on a replaced element paints
     behind its content and would never be seen */
  box-shadow: inset 0 0 0 1px rgba(20, 34, 63, 0.16), 0 16px 34px -24px rgba(16, 42, 91, 0.55);
}
.dchap__art-img { display: block; width: 100%; height: auto; }
.dchap__art-zoom {
  position: absolute; right: 9px; bottom: 9px;
  display: inline-flex; align-items: center; gap: 6px; padding: 5px 9px;
  font-family: var(--font-mono); font-size: 8.5px; letter-spacing: 0.12em; text-transform: uppercase;
  color: #14223f; background: rgba(255, 255, 255, 0.88);
  -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px);
  box-shadow: inset 0 0 0 1px rgba(20, 34, 63, 0.14);
  opacity: 0; transform: translateY(4px);
  transition: opacity 200ms var(--ease-out), transform 200ms var(--ease-out);
}
.dchap__art:hover .dchap__art-zoom, .dchap__art:focus-visible .dchap__art-zoom { opacity: 1; transform: none; }
.dchap__art:focus-visible { outline: 2px solid var(--sig); outline-offset: 3px; }
@media (hover: none) { .dchap__art-zoom { opacity: 1; transform: none; } }

.dchap__lead { max-width: 78ch; }
.dchap__more {
  margin-top: 26px;
  display: inline-flex; align-items: center; gap: 10px;
  padding: 12px 20px;
  font-family: var(--font-mono); font-size: 11.5px; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--ink-primary); text-decoration: none;
  border: 1px solid rgba(20, 34, 63, 0.2); border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.5);
  transition: background var(--motion-fast) var(--ease-smooth), border-color var(--motion-fast) var(--ease-smooth);
}
.dchap__more svg { transition: transform var(--motion-medium) var(--ease-out); }
.dchap__more:hover { background: rgba(255, 255, 255, 0.72); border-color: rgba(20, 34, 63, 0.34); }
.dchap__more:hover svg { transform: translateX(4px); }
.dchap__more:focus-visible { outline: 2px solid var(--sig); outline-offset: 3px; }
/* Six links reading "Learn more" are six identical accessible names out of
   context. This names the division for assistive tech without printing it. */
.dchap__more-x { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip-path: inset(50%); white-space: nowrap; border: 0; }
@media (prefers-reduced-motion: reduce) { .dchap__more:hover svg { transform: none; } }
.dchap__tags { margin: 22px 0 0; display: flex; flex-wrap: wrap; gap: 0; font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.12em; color: var(--ink-secondary); }
.dchap__tags-sep { margin: 0 8px; color: var(--sig); opacity: 0.7; }

/* ── the intelligence surface ─────────────────────────────────────────────── */
.dinst {
  position: relative;
  background: linear-gradient(158deg, rgba(255,255,255,0.62), rgba(255,255,255,0.4));
  -webkit-backdrop-filter: blur(16px) saturate(1.04); backdrop-filter: blur(16px) saturate(1.04);
  border: 1px solid rgba(20,34,63,0.14);
  box-shadow: 0 34px 80px -64px rgba(16,42,91,0.4);
  clip-path: polygon(0 18px, 18px 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%);
}
.dinst__bar { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; padding: 12px 18px; border-bottom: 1px solid rgba(20,34,63,0.1); }
.dinst__id { display: inline-flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.1em; color: var(--ink-primary); }
.dinst__live { width: 6px; height: 6px; border-radius: 50%; background: var(--sig); box-shadow: 0 0 0 3px rgba(63,111,176,0.16); animation: dinst-live 2.4s ease-in-out infinite; }
@keyframes dinst-live { 50% { opacity: 0.35; } }
.dinst__status { display: inline-flex; align-items: center; gap: 7px; font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.14em; color: var(--ink-muted); }
.dinst__status i { width: 5px; height: 5px; border-radius: 50%; background: var(--sig); }

/* the instrument body: domain visualisation on the left, the shared analysis
   column on the right, divided by one hairline */
.dinst__main { display: grid; grid-template-columns: minmax(0, 1fr) minmax(232px, 0.86fr); }
.dinst__hero { position: relative; min-height: 288px; overflow: hidden; }

.dinst__an { display: flex; flex-direction: column; gap: 16px; padding: 18px 20px; border-left: 1px solid rgba(20,34,63,0.1); min-width: 0; }
.dinst__an-head { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
.dinst__an-label { color: var(--ink-muted); }
.dinst__an-legend { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 8px; letter-spacing: 0.1em; color: var(--ink-muted); }
.dinst__an-legend i, .dinst__an-legend b { width: 9px; height: 3px; border-radius: 1px; }
.dinst__an-legend i { background: var(--sig); }
.dinst__an-legend b { background: repeating-linear-gradient(45deg, var(--sig) 0 1px, transparent 1px 3px); opacity: 0.8; }
/* perf: domain motion runs only once the division is revealed */
.dchap:not(.is-revealed) .dinst__hero *, .dchap:not(.is-revealed) .dinst__hero { animation-play-state: paused !important; }

/* metric rail — oversized typographic anchors, hairline-separated (no cards) */
.dinst__rail { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid rgba(20,34,63,0.12); }
.dinst__metric { padding: 18px 22px; }
.dinst__metric + .dinst__metric { border-left: 1px solid rgba(20,34,63,0.1); }
.dinst__foot { padding: 16px 22px 18px; border-top: 1px solid rgba(20,34,63,0.1); }

/* ── 01 · autonomous intelligence — spatial perception ───────────────────── */
.iq { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(126px, 1fr); height: 100%; min-height: 288px; }
.iq__view { position: relative; background: #0C1830; overflow: hidden; }
.iq__grid { position: absolute; inset: 7%; border: 1px solid rgba(125,200,255,0.16); background-image: linear-gradient(rgba(125,200,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(125,200,255,0.08) 1px, transparent 1px); background-size: 16.66% 20%; }
.iq__scan { position: absolute; left: 7%; right: 7%; top: 7%; height: 20%; background: linear-gradient(rgba(79,168,255,0), rgba(79,168,255,0.16), rgba(79,168,255,0)); animation: iq-scan 4s linear infinite; }
@keyframes iq-scan { 0% { transform: translateY(0); } 100% { transform: translateY(380%); } }
.iq__box { position: absolute; border: 1.2px solid #4FA8FF; box-shadow: inset 0 0 0 1px rgba(79,168,255,0.14); }
.iq__tag { position: absolute; top: -16px; left: -1px; font-family: var(--font-mono); font-size: 8px; letter-spacing: 0.08em; color: #9FD0FF; white-space: nowrap; }
.iq__tag b { color: #4FA8FF; }
.iq__crosshair { position: absolute; left: 50%; top: 50%; width: 20px; height: 20px; margin: -10px 0 0 -10px; border: 1px solid rgba(79,168,255,0.4); border-radius: 50%; }
.iq__crosshair::before, .iq__crosshair::after { content: ""; position: absolute; background: rgba(79,168,255,0.4); }
.iq__crosshair::before { left: 50%; top: -6px; width: 1px; height: 32px; }
.iq__crosshair::after { top: 50%; left: -6px; height: 1px; width: 32px; }
.iq__side { display: flex; flex-direction: column; gap: 12px; padding: 16px 14px; background: #08111F; min-width: 0; }
.iq__lbl { color: #6B85A6; }
.iq__f { display: grid; grid-template-columns: 42px minmax(0, 1fr) 20px; align-items: center; gap: 7px; }
.iq__fk { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.06em; color: #9DB6D6; }
.iq__ftrack { height: 3px; background: rgba(125,200,255,0.14); }
.iq__ftrack i { display: block; height: 100%; background: #4FA8FF; }
.iq__fv { font-family: var(--font-mono); font-size: 9px; color: #4FA8FF; text-align: right; }
.iq__read { margin-top: auto; display: flex; flex-direction: column; gap: 5px; font-family: var(--font-mono); font-size: 8.5px; color: #6B85A6; letter-spacing: 0.02em; overflow-wrap: anywhere; }
.iq__read-acc { color: #4FA8FF; }

/* ── 02 · connected enterprise — radial architecture ─────────────────────── */
.eq { position: relative; min-height: 288px; background: radial-gradient(circle at 50% 50%, rgba(63,111,176,0.06), transparent 60%); }
.eq__net { position: absolute; inset: 0; width: 100%; height: 100%; }
.eq__links line { stroke: rgba(20,34,63,0.14); stroke-width: 0.4; vector-effect: non-scaling-stroke; }
.eq__pulse { fill: var(--sig); filter: drop-shadow(0 0 1px rgba(63,111,176,0.6)); }
.eq__core { position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); display: flex; flex-direction: column; align-items: center; gap: 1px; width: 92px; height: 92px; justify-content: center; border: 1px solid var(--sig); border-radius: 50%; background: rgba(255,255,255,0.7); font-family: var(--font-mono); font-size: 8px; letter-spacing: 0.12em; color: var(--ink-muted); box-shadow: 0 0 0 6px rgba(63,111,176,0.05); }
.eq__core b { font-size: 11px; letter-spacing: 0.1em; color: var(--sig); }
.eq__node { position: absolute; transform: translate(-50%,-50%); font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.06em; color: var(--ink-primary); background: rgba(255,255,255,0.82); border: 1px solid rgba(20,34,63,0.14); padding: 6px 9px; white-space: nowrap; }

/* ── 03 · scenario environment — branching futures ───────────────────────── */
.sq { display: flex; flex-direction: column; padding: 16px 18px; min-height: 288px; }
.sq__tabs { display: flex; gap: 6px; margin-bottom: 14px; }
.sq__tab { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.08em; color: var(--ink-muted); background: transparent; border: 1px solid rgba(20,34,63,0.14); padding: 5px 10px; cursor: pointer; transition: color var(--motion-fast), border-color var(--motion-fast); }
.sq__tab.is-on { color: var(--sig); border-color: var(--sig); }
.sq__field { width: 100%; flex: 1; min-height: 170px; }
.sq__axis line { stroke: rgba(20,34,63,0.18); stroke-width: 0.4; vector-effect: non-scaling-stroke; }
.sq__band { fill: rgba(63,111,176,0.08); }
.sq__branch { fill: none; stroke: rgba(20,34,63,0.22); stroke-width: 0.5; vector-effect: non-scaling-stroke; }
.sq__sel { fill: none; stroke: var(--sig); stroke-width: 1; vector-effect: non-scaling-stroke; stroke-dasharray: 200; stroke-dashoffset: 200; animation: sq-draw 2.4s var(--ease-out) forwards; transition: d 0.5s var(--ease-out); }
@keyframes sq-draw { to { stroke-dashoffset: 0; } }
.sq__origin { fill: var(--sig); }
.sq__read { display: flex; gap: 20px; margin-top: 12px; flex-wrap: wrap; font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.04em; color: var(--ink-secondary); }
.sq__read-acc { color: var(--sig); }

/* ── 04 · engineering — living system map ────────────────────────────────── */
.gq { position: relative; min-height: 288px; padding-bottom: 44px; }
.gq__map { position: absolute; inset: 0; width: 100%; height: calc(100% - 44px); }
.gq__links line { stroke: rgba(20,34,63,0.16); stroke-width: 0.4; vector-effect: non-scaling-stroke; }
.gq__flow circle { fill: var(--sig); }
.gq__node { position: absolute; transform: translate(-50%,-50%); font-family: var(--font-mono); font-size: 8.5px; letter-spacing: 0.05em; color: var(--ink-primary); background: rgba(255,255,255,0.85); border: 1px solid rgba(20,34,63,0.16); padding: 5px 8px; white-space: nowrap; }
.gq__node--run { border-color: var(--sig); color: var(--sig); box-shadow: 0 0 0 4px rgba(63,111,176,0.08); }
.gq__pipe { position: absolute; left: 0; right: 0; bottom: 0; display: flex; align-items: center; gap: 0; padding: 10px 14px; border-top: 1px solid rgba(20,34,63,0.1); }
.gq__pk { margin-right: 12px; color: var(--ink-muted); }
.gq__st { flex: 1; text-align: center; font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.06em; color: var(--ink-muted); padding: 6px 4px; border: 1px solid rgba(20,34,63,0.12); }
.gq__st + .gq__st { border-left: 0; }
.gq__st.is-done { color: var(--sig); border-color: rgba(63,111,176,0.3); }
.gq__st.is-run { color: #fff; background: var(--ink-primary); border-color: var(--ink-primary); }

/* ── 05 · orchestration console — agent graph + rail ─────────────────────── */
.oq { display: grid; grid-template-columns: 1.35fr 1fr; min-height: 288px; }
.oq__graph { position: relative; }
.oq__net { position: absolute; inset: 0; width: 100%; height: 100%; }
.oq__links line { stroke: rgba(20,34,63,0.14); stroke-width: 0.4; vector-effect: non-scaling-stroke; }
.oq__pulse { fill: var(--sig); }
.oq__core { position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.1em; color: #fff; background: var(--sig); padding: 8px 12px; border-radius: 50%; box-shadow: 0 0 0 6px rgba(63,111,176,0.12); }
.oq__n { position: absolute; transform: translate(-50%,-50%); font-family: var(--font-mono); font-size: 8px; letter-spacing: 0.08em; color: var(--ink-secondary); background: rgba(255,255,255,0.82); border: 1px solid rgba(20,34,63,0.14); padding: 4px 7px; white-space: nowrap; }
.oq__n--out { color: var(--sig); border-color: var(--sig); }
.oq__rail { display: flex; flex-direction: column; gap: 8px; padding: 18px; border-left: 1px solid rgba(20,34,63,0.1); }
.oq__lbl { color: var(--ink-muted); margin-bottom: 2px; }
.oq__agent { display: grid; grid-template-columns: 6px 1fr auto; align-items: center; gap: 9px; padding: 7px 0; border-bottom: 1px solid rgba(20,34,63,0.07); }
.oq__ad { width: 6px; height: 6px; border-radius: 50%; background: rgba(20,34,63,0.2); }
.oq__agent.is-reasoning .oq__ad { background: var(--sig); box-shadow: 0 0 0 3px rgba(63,111,176,0.14); animation: dinst-live 2s ease-in-out infinite; }
.oq__agent.is-executing .oq__ad { background: var(--sig); }
.oq__ak { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.05em; color: var(--ink-primary); }
.oq__av { font-family: var(--font-mono); font-size: 8.5px; color: var(--ink-muted); }
.oq__usage { display: flex; align-items: baseline; justify-content: space-between; margin-top: auto; padding-top: 10px; font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.08em; color: var(--ink-muted); }
.oq__usage-acc { font-size: 20px; font-weight: 600; letter-spacing: -0.02em; color: var(--ink-primary); }

/* ── 06 · growth system — audience flow + channels ───────────────────────── */
.wq { display: grid; grid-template-columns: 1.35fr 1fr; gap: 22px; padding: 20px; min-height: 288px; }
.wq__flabel { display: block; color: var(--ink-muted); margin-bottom: 14px; }
.wq__flow { display: flex; flex-direction: column; }
.wq__stage { position: relative; margin-bottom: 16px; }
.wq__sk { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.08em; color: var(--ink-secondary); }
.wq__sbar { display: block; height: 12px; margin-top: 5px; background: linear-gradient(90deg, var(--sig), var(--sig-soft)); }
.wq__sbar i { display: block; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4)); animation: wq-shine 3s linear infinite; }
@keyframes wq-shine { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
.wq__sarrow { position: absolute; left: 0; bottom: -14px; font-size: 9px; color: var(--sig); }
.wq__ch { display: flex; flex-direction: column; }
.wq__bars { display: flex; align-items: flex-end; gap: 12px; flex: 1; }
.wq__cbar { display: flex; flex-direction: column; align-items: center; gap: 6px; flex: 1; }
.wq__ctrack { width: 100%; max-width: 26px; height: 120px; display: flex; align-items: flex-end; background: rgba(20,34,63,0.06); }
.wq__ctrack i { display: block; width: 100%; background: var(--sig); }
.wq__cv { font-family: var(--font-mono); font-size: 10px; color: var(--ink-primary); }
.wq__ck { font-family: var(--font-mono); font-size: 8px; letter-spacing: 0.06em; color: var(--ink-muted); }

/* ── responsive ──────────────────────────────────────────────────────────── */
@media (max-width: 1160px) {
  .dsw__journey { display: block; }
  .dsw__index { position: sticky; top: 74px; margin-bottom: 40px; }
  .dsw__index ul { flex-direction: row; overflow-x: auto; gap: 4px; }
  .dsw__index-label { display: none; }
  .dsw__ix { grid-template-columns: auto auto; width: auto; border-left: 0; border-bottom: 1px solid transparent; }
  .dsw__ix.is-active { border-bottom-color: var(--sig); }
  .dsw__ix-name { display: none; }
  .dchap__grid { gap: 26px; }
}
@media (max-width: 760px) {
  .dchap { padding-left: 24px; }
  .iq, .oq, .wq { grid-template-columns: 1fr; }
  .dinst__main { grid-template-columns: 1fr; }
  .dinst__an { border-left: 0; border-top: 1px solid rgba(20,34,63,0.1); }
  .dinst__rail { grid-template-columns: 1fr; }
  .dinst__metric { flex-direction: row; align-items: baseline; justify-content: space-between; padding: 14px 18px; }
  .dinst__metric + .dinst__metric { border-left: 0; border-top: 1px solid rgba(20,34,63,0.1); }
  .dinst__metric :deep(.imt__v) { font-size: clamp(28px, 8vw, 40px); }
  .wq__ctrack { height: 80px; }
}
@media (prefers-reduced-motion: reduce) {
  .dchap__grid { transition: none; }
  .dinst__hero *, .dinst__hero { animation: none !important; }
  .sq__sel { stroke-dashoffset: 0; }
}
</style>
