<script setup lang="ts">
// TECHNOLOGY SECTIONS — seven immersive full-width sections, one per
// technology surface (Artificial Intelligence, Computer Vision, Edge AI,
// Digital Twin, AI Agents, Enterprise Cloud, Digital Engineering). Each
// renders a DISTINCT engineering visualization — neural network, live
// inference, cloud-to-edge, blueprint→sim, agent orchestration, systems
// sync, dev pipeline — so no two feel identical, yet all share the SVARA
// design system. Canonical copy (definition, overview, components) comes
// VERBATIM from the Content Bible per-technology files via technology.ts.
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { gsap, ScrollTrigger } from '~~/lib/gsap'
import {
  aiSection, computerVisionSection, edgeAiSection, digitalTwinSection,
  aiAgentsSection, enterpriseCloudSection,
  DEV_PIPELINE, AGENT_FLOW, CV_PIPELINE, EDGE_METRICS, BUSINESS_SYSTEMS,
} from '~/utils/technology'
import { businessCloudContent } from '~~/lib/content/business-cloud'

const root = ref<HTMLElement>()
const triggers: ScrollTrigger[] = []

// Digital Engineering has no dedicated content file; it sources its
// canonical copy from the Business Cloud architecture (the unified API +
// data-abstraction layer that software is engineered on top of) — the
// canonical content for the software-delivery surface.
const digitalEngineeringSection = {
  name: 'Digital Engineering',
  def: businessCloudContent.architecture.overview,
  overview: businessCloudContent.architecture.overview,
  components: businessCloudContent.architecture.components,
}

const SECTIONS = [
  { visual: 'ai', ...aiSection },
  { visual: 'cv', ...computerVisionSection },
  { visual: 'edge', ...edgeAiSection },
  { visual: 'twin', ...digitalTwinSection },
  { visual: 'agents', ...aiAgentsSection },
  { visual: 'cloud', ...enterpriseCloudSection },
  { visual: 'devops', ...digitalEngineeringSection },
] as const

// neural network for the AI mock
const NN_LAYERS = [4, 6, 6, 3]
const nnNodes = NN_LAYERS.flatMap((count, li) =>
  Array.from({ length: count }, (_, ni) => {
    const x = (li / (NN_LAYERS.length - 1)) * 78 + 11
    const span = 68
    const y = (count === 1 ? 50 : (ni / (count - 1)) * span + 16)
    return { id: `${li}-${ni}`, li, x, y }
  }),
)
const nnLinks = nnNodes.flatMap((n) =>
  nnNodes.filter((m) => m.li === n.li + 1).map((m) => ({ x1: n.x, y1: n.y, x2: m.x, y2: m.y, di: m.id, si: n.id })),
)

// digital twin blueprint nodes
const twinNodes = [
  { x: 20, y: 30 }, { x: 50, y: 22 }, { x: 80, y: 36 },
  { x: 32, y: 64 }, { x: 64, y: 70 },
]
const twinEdges = [
  { x1: 20, y1: 30, x2: 50, y2: 22 }, { x1: 50, y1: 22, x2: 80, y2: 36 },
  { x1: 32, y1: 64, x2: 64, y2: 70 }, { x1: 20, y1: 30, x2: 32, y2: 64 },
  { x1: 80, y1: 36, x2: 64, y2: 70 },
]

// CV inference boxes
const cvBoxes = [
  { x: 8, y: 14, w: 30, h: 24, label: 'person · 0.97' },
  { x: 52, y: 22, w: 26, h: 20, label: 'vehicle · 0.93' },
  { x: 20, y: 58, w: 22, h: 18, label: 'asset · 0.88' },
]

// edge nodes around the ring
const edgeNodes = Array.from({ length: 6 }, (_, i) => {
  const a = (i / 6) * Math.PI * 2 - Math.PI / 2
  return { x: 50 + Math.cos(a) * 34, y: 50 + Math.sin(a) * 36 }
})

// agent tool calls
const agentTools = ['Vision API', 'Twin API', 'ERP API', 'Alert API']

// devops stage state
const devStageState = (i: number) => (i < 3 ? 'done' : i === 3 ? 'run' : 'idle')

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const panels = root.value!.querySelectorAll<HTMLElement>('.ts-panel')
  panels.forEach((panel) => {
    const q = gsap.utils.selector(panel)
    gsap.set(q('.ts-rise'), { opacity: 0, y: 40 })
    triggers.push(ScrollTrigger.create({
      trigger: panel, start: 'top 62%', once: true,
      onEnter: () => gsap.to(q('.ts-rise'), { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 }),
    }))
  })
})
onBeforeUnmount(() => { triggers.forEach(t => t.kill()) })
</script>

<template>
  <div ref="root" class="ts-wrap">
    <section
      v-for="(s, i) in SECTIONS" :key="s.name"
      class="ts-panel"
      :class="[`ts-panel--${i % 2}`, `ts-panel--${s.visual}`]"
    >
      <div class="ts-panel__inner">
        <div class="ts-copy ts-rise">
          <div class="ts-mark">
            <span class="ts-num">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="ts-tag">{{ s.name }}</span>
          </div>
          <h3 class="ts-name">{{ s.name }}</h3>
          <p class="ts-def">{{ s.def }}</p>
          <p v-if="s.overview" class="ts-overview">{{ s.overview }}</p>
          <ul v-if="s.components" class="ts-components" role="list">
            <li v-for="c in s.components" :key="c.name">
              <span class="ts-comp-name">{{ c.name }}</span>
              <span class="ts-comp-desc">{{ c.description }}</span>
            </li>
          </ul>
        </div>

        <!-- distinct engineering visualization per technology -->
        <div class="ts-viz ts-rise" :class="`ts-viz--${s.visual}`" aria-hidden="true">

          <!-- AI: animated neural network -->
          <div v-if="s.visual === 'ai'" class="nn">
            <div class="nn__chrome"><span class="nn__label">neural activation · forward pass</span><span class="nn__live">LIVE</span></div>
            <svg class="nn__svg" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line v-for="(l, k) in nnLinks" :key="`l${k}`" :x1.attr="l.x1" :y1.attr="l.y1" :x2.attr="l.x2" :y2.attr="l.y2" class="nn__link" :style="{ animationDelay: `${(-k * 0.08).toFixed(2)}s` }" />
              <circle v-for="(n, k) in nnNodes" :key="`n${k}`" :cx.attr="n.x" :cy.attr="n.y" r="2.4" class="nn__node" :style="{ animationDelay: `${(-n.li * 0.4).toFixed(2)}s` }" />
            </svg>
            <div class="nn__legend"><span>input</span><span>hidden</span><span>output</span></div>
          </div>

          <!-- Computer Vision: live inference simulation -->
          <div v-else-if="s.visual === 'cv'" class="cv">
            <div class="cv__pipeline">
              <span v-for="(p, k) in CV_PIPELINE" :key="p" class="cv__step" :class="{ 'is-on': k <= 3 }">{{ p }}</span>
            </div>
            <div class="cv__frame">
              <div class="cv__grid" />
              <div v-for="(b, k) in cvBoxes" :key="k" class="cv__box" :style="{ left: b.x + '%', top: b.y + '%', width: b.w + '%', height: b.h + '%' }"><span>{{ b.label }}</span></div>
              <span class="cv__scan" />
            </div>
            <div class="cv__counters">
              <span class="cv__counter"><i />detections <b>48,214</b></span>
              <span class="cv__counter"><i />events <b>312</b></span>
              <span class="cv__counter"><i />fps <b>30</b></span>
            </div>
          </div>

          <!-- Edge AI: cloud-to-edge architecture -->
          <div v-else-if="s.visual === 'edge'" class="ed">
            <svg class="ed__svg" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line v-for="(nd, k) in edgeNodes" :key="`l${k}`" x1="50" y1="50" :x2.attr="nd.x" :y2.attr="nd.y" class="ed__link" :style="{ animationDelay: `${(-k * 0.3).toFixed(2)}s` }" />
              <circle v-for="(nd, k) in edgeNodes" :key="`n${k}`" :cx.attr="nd.x" :cy.attr="nd.y" r="2.4" class="ed__node" />
            </svg>
            <div class="ed__core">Cloud</div>
            <div v-for="(nd, k) in edgeNodes" :key="`e${k}`" class="ed__edge" :style="{ left: nd.x + '%', top: nd.y + '%' }">E{{ k + 1 }}</div>
            <div class="ed__metrics">
              <div v-for="m in EDGE_METRICS" :key="m.label" class="ed__m">
                <span class="ed__ml">{{ m.label }}</span>
                <div class="ed__bar"><span class="ed__fill" :style="{ width: m.fill + '%' }" /></div>
                <span class="ed__mv">{{ m.value }}</span>
              </div>
            </div>
          </div>

          <!-- Digital Twin: blueprint → live simulation -->
          <div v-else-if="s.visual === 'twin'" class="dt">
            <div class="dt__floor">
              <svg class="dt__svg" viewBox="0 0 100 80" preserveAspectRatio="none">
                <path class="dt__outline" d="M10 10 L90 10 L90 70 L10 70 Z M10 40 L90 40 M30 10 L30 70" />
                <line v-for="(e, k) in twinEdges" :key="`e${k}`" :x1.attr="e.x1" :y1.attr="e.y1" :x2.attr="e.x2" :y2.attr="e.y2" class="dt__edge" />
                <circle v-for="(nd, k) in twinNodes" :key="`n${k}`" :cx.attr="nd.x" :cy.attr="nd.y" r="2.2" class="dt__node" :style="{ animationDelay: `${-k * 0.5}s` }" />
              </svg>
            </div>
            <div class="dt__readout">
              <span class="dt__r">fidelity: 99.2%</span>
              <span class="dt__r">sync: &lt;1s</span>
              <span class="dt__r dt__r--acc">simulation: 18.4k runs</span>
            </div>
          </div>

          <!-- AI Agents: planning → reasoning → orchestration → complete -->
          <div v-else-if="s.visual === 'agents'" class="ag">
            <div class="ag__flow">
              <span v-for="(st, k) in AGENT_FLOW" :key="st" class="ag__stage" :class="{ 'is-on': k < 3, 'is-active': k === 3 }">{{ st }}</span>
            </div>
            <div class="ag__plan">
              <span class="ag__step ag__step--done">✓ evaluate production anomaly</span>
              <span class="ag__step ag__step--done">✓ correlate with Digital Twin forecast</span>
              <span class="ag__step ag__step--active">▸ calling tools to resolve…</span>
            </div>
            <div class="ag__tools">
              <span v-for="t in agentTools" :key="t" class="ag__tool">{{ t }}</span>
            </div>
          </div>

          <!-- Enterprise Cloud: business systems → One AI OS -->
          <div v-else-if="s.visual === 'cloud'" class="ec">
            <div class="ec__systems">
              <span v-for="sys in BUSINESS_SYSTEMS" :key="sys" class="ec__sys">{{ sys }}</span>
            </div>
            <svg class="ec__svg" viewBox="0 0 100 30" preserveAspectRatio="none">
              <line x1="10" y1="2" x2="50" y2="28" class="ec__link" />
              <line x1="30" y1="2" x2="50" y2="28" class="ec__link" />
              <line x1="50" y1="2" x2="50" y2="28" class="ec__link" />
              <line x1="70" y1="2" x2="50" y2="28" class="ec__link" />
              <line x1="90" y1="2" x2="50" y2="28" class="ec__link" />
              <circle v-for="(x, k) in [10, 30, 50, 70, 90]" :key="`p${k}`" :cx.attr="x" cy="2" r="1.4" class="ec__packet" :style="{ animationDelay: `${(-k * 0.3).toFixed(2)}s` }" />
            </svg>
            <div class="ec__core">One AI OS</div>
            <div class="ec__status">all systems synchronized</div>
          </div>

          <!-- Digital Engineering: dev pipeline (uses DEV_PIPELINE) -->
          <div v-else class="de">
            <div class="de__pipe">
              <span v-for="(p, k) in DEV_PIPELINE" :key="p.stage" class="de__stage" :class="`de__stage--${devStageState(k)}`">{{ p.stage }}</span>
            </div>
            <div class="de__log">
              <span class="de__line de__line--ok">✓ build #4281 passed</span>
              <span class="de__line de__line--ok">✓ tests 2,914 passed</span>
              <span class="de__line de__line--run">▸ deploying to edge cluster…</span>
              <span class="de__line">pushing image: svara/api:1.42.0</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.ts-wrap { background: #F8FBFF; }
.ts-panel { position: relative; border-top: 1px solid rgba(16, 42, 91, 0.08); padding: var(--space-24) 0; }
.ts-panel--cv, .ts-panel--twin, .ts-panel--cloud { background: #F1F6FE; }
.ts-panel__inner { max-width: 1180px; margin-inline: auto; padding-inline: var(--container-pad); display: grid; grid-template-columns: 1fr 1.1fr; gap: var(--space-16); align-items: center; }
.ts-panel--1 .ts-panel__inner, .ts-panel--3 .ts-panel__inner, .ts-panel--5 .ts-panel__inner { direction: rtl; }
.ts-panel--1 .ts-panel__inner > *, .ts-panel--3 .ts-panel__inner > *, .ts-panel--5 .ts-panel__inner > * { direction: ltr; }

.ts-mark { display: flex; align-items: baseline; gap: var(--space-4); margin-bottom: var(--space-6); }
.ts-num { font-family: var(--font-mono); font-size: clamp(40px, 5vw, 72px); font-weight: var(--weight-extrabold); color: rgba(16, 42, 91, 0.14); letter-spacing: -0.03em; line-height: 1; }
.ts-tag { font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.ts-name { margin: 0; font-size: clamp(36px, 5vw, 64px); font-weight: var(--weight-extrabold); line-height: 1.02; letter-spacing: -0.03em; color: var(--color-ink-strong); }
.ts-def { margin: var(--space-5) 0 0; font-size: clamp(16px, 1.4vw, 19px); line-height: 1.55; color: var(--color-text-secondary); max-width: 42ch; }
.ts-overview { margin: var(--space-4) 0 0; font-size: var(--type-small); line-height: 1.6; color: var(--color-text-faint); max-width: 44ch; }
.ts-components { list-style: none; margin: var(--space-8) 0 0; padding: var(--space-6) 0 0; border-top: 1px dashed var(--color-border); display: flex; flex-direction: column; gap: var(--space-4); }
.ts-components li { display: flex; flex-direction: column; gap: 3px; }
.ts-comp-name { font-size: 13px; font-weight: var(--weight-semibold); color: var(--color-ink-strong); }
.ts-comp-desc { font-size: 13px; line-height: 1.5; color: var(--color-text-secondary); }

.ts-viz { border-radius: var(--radius-lg); background: #ffffff; border: 1px solid var(--color-border); box-shadow: 0 4px 14px rgba(16, 42, 91, 0.05), 0 40px 90px rgba(16, 42, 91, 0.12); overflow: hidden; min-height: 380px; }

/* ---- AI: neural network ---- */
.nn { display: flex; flex-direction: column; }
.nn__chrome { display: flex; align-items: center; justify-content: space-between; padding: 11px 16px; background: #F4F7FC; border-bottom: 1px solid var(--color-border); }
.nn__label { font-family: var(--font-mono); font-size: 11px; color: var(--color-ink-strong); }
.nn__live { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.12em; color: var(--color-accent); animation: ts-blink 1.6s ease-in-out infinite; }
.nn__svg { width: 100%; height: 260px; }
.nn__link { stroke: var(--color-accent); stroke-width: 0.3; vector-effect: non-scaling-stroke; opacity: 0.25; animation: nn-pulse 2.4s ease-in-out infinite alternate; }
@keyframes nn-pulse { 0% { opacity: 0.12; } 100% { opacity: 0.45; } }
.nn__node { fill: var(--color-accent); animation: nn-act 2.4s ease-in-out infinite alternate; transform-box: fill-box; transform-origin: center; }
@keyframes nn-act { 0%,100% { opacity: 0.6; transform: scale(0.9); } 50% { opacity: 1; transform: scale(1.2); } }
.nn__legend { display: flex; justify-content: space-around; padding: 10px; font-family: var(--font-mono); font-size: 10px; color: var(--color-text-faint); letter-spacing: 0.08em; text-transform: uppercase; }

/* ---- Computer Vision ---- */
.cv { display: flex; flex-direction: column; }
.cv__pipeline { display: flex; align-items: center; gap: 0; padding: 12px 16px; background: #F4F7FC; border-bottom: 1px solid var(--color-border); }
.cv__step { flex: 1; text-align: center; font-size: 11px; font-weight: var(--weight-semibold); color: var(--color-text-faint); padding: 8px 4px; border: 1px solid var(--color-border); background: #fff; }
.cv__step + .cv__step { margin-left: -1px; }
.cv__step.is-on { color: #fff; background: var(--color-accent); border-color: var(--color-accent); }
.cv__frame { position: relative; background: #0E1B33; aspect-ratio: 16/10; overflow: hidden; }
.cv__grid { position: absolute; inset: 6%; border: 1px solid rgba(125, 200, 255, 0.16); background-image: linear-gradient(rgba(125, 200, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(125, 200, 255, 0.08) 1px, transparent 1px); background-size: 20% 25%; }
.cv__box { position: absolute; border: 1.5px solid #4FA8FF; border-radius: 3px; box-shadow: 0 0 0 3px rgba(79, 168, 255, 0.14); animation: cv-pulse 2.4s ease-in-out infinite alternate; }
.cv__box span { position: absolute; top: -18px; left: -1px; font-family: var(--font-mono); font-size: 9px; background: #4FA8FF; color: #04122B; padding: 2px 5px; border-radius: 3px; white-space: nowrap; }
@keyframes cv-pulse { 0% { opacity: 0.85; } 100% { opacity: 1; } }
.cv__scan { position: absolute; left: 0; right: 0; top: 0; height: 22%; background: linear-gradient(rgba(79,168,255,0), rgba(79,168,255,0.18), rgba(79,168,255,0)); animation: cv-scan 3.6s linear infinite; }
@keyframes cv-scan { 0% { transform: translateY(0); } 100% { transform: translateY(440%); } }
.cv__counters { display: flex; gap: var(--space-5); padding: 12px 16px; }
.cv__counter { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 11px; color: var(--color-text-secondary); }
.cv__counter i { width: 6px; height: 6px; border-radius: 50%; background: var(--color-accent); animation: ts-blink 1.6s ease-in-out infinite; }
.cv__counter b { color: var(--color-ink-strong); font-weight: var(--weight-bold); }

/* ---- Edge AI ---- */
.ed { position: relative; min-height: 380px; background: radial-gradient(circle at 50% 50%, rgba(47,127,230,0.04), transparent 60%), #fff; }
.ed__svg { position: absolute; inset: 0; width: 100%; height: 260px; }
.ed__link { stroke: var(--color-accent); stroke-width: 0.5; vector-effect: non-scaling-stroke; opacity: 0.4; stroke-dasharray: 2 3; animation: ts-dash 5s linear infinite; }
@keyframes ts-dash { to { stroke-dashoffset: -40; } }
.ed__node { fill: var(--color-accent); opacity: 0.7; }
.ed__core { position: absolute; left: 50%; top: calc(50% - 30px); transform: translate(-50%, -50%); padding: 10px 22px; border-radius: var(--radius-pill); background: var(--color-ink-strong); color: #fff; font-size: 13px; font-weight: var(--weight-semibold); box-shadow: 0 14px 40px rgba(16, 42, 91, 0.2); }
.ed__edge { position: absolute; transform: translate(-50%, -50%); padding: 5px 9px; background: #fff; border: 1px solid var(--color-border); border-radius: var(--radius-pill); font-family: var(--font-mono); font-size: 10px; font-weight: var(--weight-semibold); color: var(--color-ink-strong); }
.ed__metrics { position: absolute; bottom: 0; left: 0; right: 0; display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-4) var(--space-6); padding: var(--space-6); border-top: 1px solid var(--color-border); background: #F4F7FC; }
.ed__m { display: flex; flex-direction: column; gap: 4px; }
.ed__ml { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-text-faint); }
.ed__bar { height: 4px; border-radius: 999px; background: rgba(16, 42, 91, 0.08); overflow: hidden; }
.ed__fill { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, var(--color-accent), var(--color-ink-strong)); animation: ed-tick 2.6s ease-in-out infinite alternate; transform-origin: left; }
@keyframes ed-tick { 0% { transform: scaleX(0.92); } 100% { transform: scaleX(1); } }
.ed__mv { font-size: 15px; font-weight: var(--weight-bold); color: var(--color-ink-strong); }

/* ---- Digital Twin ---- */
.dt { padding: var(--space-8); }
.dt__floor { background: #0E1B33; border-radius: var(--radius-md); padding: var(--space-6); }
.dt__svg { width: 100%; height: 220px; }
.dt__outline { fill: none; stroke: rgba(125, 200, 255, 0.3); stroke-width: 0.6; vector-effect: non-scaling-stroke; stroke-dasharray: 3 2; animation: ts-dash 6s linear infinite; }
.dt__edge { stroke: var(--color-accent); stroke-width: 0.5; vector-effect: non-scaling-stroke; opacity: 0.5; }
.dt__node { fill: #4FA8FF; animation: dt-node 2.4s ease-in-out infinite alternate; transform-box: fill-box; transform-origin: center; }
@keyframes dt-node { 0%,100% { opacity: 0.6; transform: scale(0.9); } 50% { opacity: 1; transform: scale(1.2); } }
.dt__readout { display: flex; gap: var(--space-5); margin-top: var(--space-5); flex-wrap: wrap; }
.dt__r { font-family: var(--font-mono); font-size: 11px; color: var(--color-text-secondary); }
.dt__r--acc { color: var(--color-accent); font-weight: var(--weight-semibold); }

/* ---- AI Agents ---- */
.ag { padding: var(--space-8); display: flex; flex-direction: column; gap: var(--space-6); }
.ag__flow { display: flex; align-items: center; gap: 0; }
.ag__stage { flex: 1; text-align: center; font-size: 11px; font-weight: var(--weight-semibold); color: var(--color-text-faint); padding: 9px 4px; border: 1px solid var(--color-border); background: #fff; }
.ag__stage + .ag__stage { margin-left: -1px; }
.ag__stage.is-on { color: var(--color-ink-strong); border-color: var(--color-accent); }
.ag__stage.is-on::before { content: "✓ "; color: var(--color-accent); }
.ag__stage.is-active { background: var(--color-ink-strong); color: #fff; border-color: var(--color-ink-strong); }
.ag__plan { border-radius: var(--radius-md); background: #07111F; padding: var(--space-5); display: flex; flex-direction: column; gap: 6px; min-height: 110px; }
.ag__step { font-family: var(--font-mono); font-size: 11px; color: #6B85A6; }
.ag__step--done { color: #4FA8FF; }
.ag__step--active { color: #fff; }
.ag__step--active::after { content: "▋"; margin-left: 4px; animation: ag-cursor 1s steps(2) infinite; }
@keyframes ag-cursor { 50% { opacity: 0; } }
.ag__tools { display: flex; flex-wrap: wrap; gap: 8px; }
.ag__tool { padding: 6px 12px; border-radius: var(--radius-pill); background: #F1F6FE; border: 1px solid var(--color-border); font-family: var(--font-mono); font-size: 10px; font-weight: var(--weight-semibold); color: var(--color-ink-strong); }

/* ---- Enterprise Cloud ---- */
.ec { display: flex; flex-direction: column; align-items: center; padding: var(--space-10); gap: var(--space-3); min-height: 380px; justify-content: center; }
.ec__systems { display: flex; flex-wrap: wrap; gap: var(--space-4); justify-content: center; width: 100%; }
.ec__sys { padding: 8px 16px; border-radius: var(--radius-pill); background: #fff; border: 1px solid var(--color-border); font-size: 12px; font-weight: var(--weight-semibold); color: var(--color-ink-strong); animation: ec-sync 2s ease-in-out infinite alternate; }
.ec__sys:nth-child(even) { animation-delay: -1s; }
@keyframes ec-sync { 0% { border-color: var(--color-border); } 100% { border-color: var(--color-accent); box-shadow: 0 0 0 3px rgba(47,127,230,0.12); } }
.ec__svg { width: 100%; height: 60px; }
.ec__link { stroke: var(--color-accent); stroke-width: 0.6; vector-effect: non-scaling-stroke; opacity: 0.3; }
.ec__packet { fill: var(--color-accent); animation: ec-flow 2.5s linear infinite; }
@keyframes ec-flow { from { offset-distance: 0%; } to { offset-distance: 100%; } }
.ec__core { padding: 12px 28px; border-radius: var(--radius-pill); background: var(--color-ink-strong); color: #fff; font-size: 16px; font-weight: var(--weight-bold); box-shadow: 0 14px 40px rgba(16, 42, 91, 0.2); }
.ec__status { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em; color: var(--color-accent); }

/* ---- Digital Engineering ---- */
.de { padding: var(--space-8); }
.de__pipe { display: flex; align-items: center; gap: 0; margin-bottom: var(--space-6); }
.de__stage { flex: 1; text-align: center; font-size: 11px; font-weight: var(--weight-semibold); color: var(--color-text-faint); padding: 10px 4px; border: 1px solid var(--color-border); background: #fff; position: relative; }
.de__stage + .de__stage { margin-left: -1px; }
.de__stage--done { color: var(--color-ink-strong); border-color: var(--color-accent); }
.de__stage--done::before { content: "✓"; color: var(--color-accent); margin-right: 5px; }
.de__stage--run { background: var(--color-ink-strong); color: #fff; border-color: var(--color-ink-strong); }
.de__stage--run::after { content: ""; position: absolute; inset: -2px; border: 2px solid var(--color-accent); border-radius: inherit; animation: de-run 1s ease-in-out infinite; opacity: 0.5; }
@keyframes de-run { 0%,100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 0; transform: scale(1.04); } }
.de__log { background: #07111F; border-radius: var(--radius-md); padding: var(--space-5); display: flex; flex-direction: column; gap: 6px; min-height: 120px; }
.de__line { font-family: var(--font-mono); font-size: 11px; color: #6B85A6; }
.de__line--ok { color: #4FA8FF; }
.de__line--run { color: #fff; }
.de__line--run::after { content: "▋"; margin-left: 4px; animation: ag-cursor 1s steps(2) infinite; }

@keyframes ts-blink { 0%,100% { opacity: 1; } 50% { opacity: 0.25; } }

@media (max-width: 1024px) {
  .ts-panel__inner { grid-template-columns: 1fr; gap: var(--space-12); }
  .ts-panel--1 .ts-panel__inner, .ts-panel--3 .ts-panel__inner, .ts-panel--5 .ts-panel__inner { direction: ltr; }
}
@media (prefers-reduced-motion: reduce) {
  .nn__link, .nn__node, .cv__box, .cv__scan, .ed__link, .ed__fill, .dt__node, .dt__outline, .ec__sys, .ec__packet, .de__stage--run::after, .de__line--run::after, .ag__step--active::after, .ts-viz .nn__live, .cv__counter i { animation: none; }
}
</style>