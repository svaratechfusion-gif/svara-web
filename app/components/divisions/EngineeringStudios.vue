<script setup lang="ts">
// SIX ENGINEERING STUDIOS — six immersive full-width sections, one per
// division. Each studio renders a DISTINCT enterprise application mock so
// no two feel identical, yet all share the SVARA design system (white
// ground, navy accents, mono labels) so they clearly belong to one
// ecosystem. The division name is rendered VERBATIM from the Content
// Bible; the `focus` line is taken verbatim from the page brief and
// describes each studio's engineering surface. Motion represents the live
// engineering happening inside each studio (sensing, simulating, building,
// orchestrating, deploying, campaigning) — nothing decorative.
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { gsap, ScrollTrigger } from '~~/lib/gsap'
import { STUDIOS } from '~/utils/divisions'

const root = ref<HTMLElement>()
const triggers: ScrollTrigger[] = []

// representative mock data per studio visual (purely structural)
const inferenceBoxes = [
  { x: 8, y: 14, w: 30, h: 22, label: 'person · 0.97' },
  { x: 52, y: 26, w: 24, h: 18, label: 'vehicle · 0.93' },
  { x: 18, y: 56, w: 20, h: 16, label: 'asset · 0.88' },
]
const twinNodes = [
  { x: 22, y: 30 }, { x: 54, y: 22 }, { x: 78, y: 40 },
  { x: 38, y: 62 }, { x: 68, y: 70 },
]
const saasWindows = [
  { name: 'ERP', x: 4, y: 18, w: 44, z: 2 },
  { name: 'CRM', x: 30, y: 8, w: 40, z: 3 },
  { name: 'Inventory', x: 52, y: 30, w: 42, z: 1 },
]
const osTurns = [
  { role: 'user', text: 'Summarize plant downtime this week.' },
  { role: 'os', text: 'Cross-referencing Vision AI + Digital Twin feeds…' },
  { role: 'os', text: '3 root causes isolated. Scheduling 2 preventive workflows.' },
]
const devopsStages = ['Lint', 'Build', 'Test', 'Scan', 'Deploy']
const devopsStageState = (i: number) => (i < 3 ? 'done' : i === 3 ? 'run' : 'idle')
const growthChannels = [
  { name: 'Search', value: 71, color: 'var(--color-accent)' },
  { name: 'PR', value: 48, color: 'var(--color-ink-strong)' },
  { name: 'Social', value: 63, color: 'var(--color-accent)' },
  { name: 'Direct', value: 39, color: 'var(--color-ink-strong)' },
]

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const panels = root.value!.querySelectorAll<HTMLElement>('.es-panel')
  panels.forEach((panel) => {
    const q = gsap.utils.selector(panel)
    gsap.set(q('.es-rise'), { opacity: 0, y: 40 })
    const t = ScrollTrigger.create({
      trigger: panel,
      start: 'top 62%',
      once: true,
      onEnter: () => gsap.to(q('.es-rise'), { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 }),
    })
    triggers.push(t)
  })
})
onBeforeUnmount(() => { triggers.forEach(t => t.kill()) })
</script>

<template>
  <div ref="root" class="es">
    <div class="es__intro">
      <p class="es__eyebrow">Six Engineering Studios</p>
      <h2 class="es__title">Specialized divisions, one engineering system.</h2>
      <p class="es__sub">Every SVARA platform is built through one of six specialized technology divisions — each a studio with its own engineering surface, all contributing to one unified platform.</p>
    </div>

    <section
      v-for="(s, i) in STUDIOS" :key="s.name"
      class="es-panel"
      :class="[`es-panel--${i % 2}`, `es-panel--v-${s.visual}`]"
    >
      <div class="es-panel__inner">
        <div class="es-copy es-rise">
          <div class="es-mark">
            <span class="es-num">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="es-tag">{{ s.tag }}</span>
          </div>
          <h3 class="es-name">{{ s.name }}</h3>
          <p class="es-focus">{{ s.focus }}</p>
          <ul class="es-metrics" role="list">
            <li v-for="m in s.metrics" :key="m.label">
              <span class="es-ml">{{ m.label }}</span>
              <span class="es-mv">{{ m.value }}</span>
            </li>
          </ul>
        </div>

        <!-- distinct enterprise-application mock per studio -->
        <div class="es-app es-rise" :class="`es-app--${s.visual}`" aria-hidden="true">
          <div class="es-app__bar">
            <span class="es-app__dots"><i /><i /><i /></span>
            <span class="es-app__title">{{ s.tag }}</span>
            <span class="es-app__live">LIVE</span>
          </div>

          <!-- AI / Deep Tech: computer-vision inference -->
          <div v-if="s.visual === 'inference'" class="cv">
            <div class="cv__frame">
              <div class="cv__grid" />
              <div
                v-for="(b, k) in inferenceBoxes" :key="k"
                class="cv__box"
                :style="{ left: b.x + '%', top: b.y + '%', width: b.w + '%', height: b.h + '%' }"
              ><span>{{ b.label }}</span></div>
              <span class="cv__scan" />
            </div>
            <div class="cv__panel">
              <span class="cv__row">model: svara-vision-v4</span>
              <span class="cv__row">stream: plant-cam-02</span>
              <span class="cv__row cv__row--acc">inference: 11ms · 48.2k fps</span>
            </div>
          </div>

          <!-- Interactive AI & Simulation: factory digital twin -->
          <div v-else-if="s.visual === 'twin'" class="tw">
            <svg class="tw__floor" viewBox="0 0 100 70" preserveAspectRatio="none">
              <path class="tw__line" d="M10 10 L90 10 L90 60 L10 60 Z M10 35 L90 35" />
              <line
v-for="(nd, k) in twinNodes" :key="`l${k}`"
                :x1.attr="twinNodes[k % (twinNodes.length - 1)]!.x" :y1.attr="twinNodes[k % (twinNodes.length - 1)]!.y" :x2.attr="nd.x" :y2.attr="nd.y"
                class="tw__link" />
              <circle v-for="(nd, k) in twinNodes" :key="`n${k}`" :cx.attr="nd.x" :cy.attr="nd.y" r="2.4" class="tw__node" :style="{ animationDelay: `${-k * 0.6}s` }" />
            </svg>
            <div class="tw__readout">
              <span class="tw__r">fidelity: 99.2%</span>
              <span class="tw__r">simulations: 18.4k</span>
              <span class="tw__r tw__r--acc">forecast horizon: 72h</span>
            </div>
          </div>

          <!-- Business SaaS Studio: floating enterprise application windows -->
          <div v-else-if="s.visual === 'saas'" class="bs">
            <div
              v-for="w in saasWindows" :key="w.name"
              class="bs__win"
              :style="{ left: w.x + '%', top: w.y + '%', width: w.w + '%', zIndex: w.z }"
            >
              <div class="bs__winbar"><span class="bs__wdots"><i /><i /></span><span class="bs__wname">{{ w.name }}</span></div>
              <div class="bs__wrows">
                <span /><span /><span /><span />
              </div>
            </div>
          </div>

          <!-- One AI OS & Intelligence Platform: assistant + orchestration -->
          <div v-else-if="s.visual === 'os'" class="os">
            <div class="os__chat">
              <div v-for="(t, k) in osTurns" :key="k" class="os__turn" :class="`os__turn--${t.role}`">
                <span class="os__role">{{ t.role === 'user' ? 'You' : 'SVARA OS' }}</span>
                <span class="os__text">{{ t.text }}</span>
              </div>
            </div>
            <div class="os__orch">
              <span class="os__node">Vision</span>
              <span class="os__flow" />
              <span class="os__core">Reason</span>
              <span class="os__flow" />
              <span class="os__node">Act</span>
            </div>
          </div>

          <!-- Digital Engineering: pipelines + devops -->
          <div v-else-if="s.visual === 'devops'" class="dv">
            <div class="dv__pipe">
              <span
                v-for="(stage, k) in devopsStages" :key="stage"
                class="dv__stage"
                :class="`dv__stage--${devopsStageState(k)}`"
              >{{ stage }}</span>
            </div>
            <div class="dv__log">
              <span class="dv__line dv__line--ok">✓ build #4281 passed</span>
              <span class="dv__line dv__line--ok">✓ unit tests 2,914 passed</span>
              <span class="dv__line dv__line--run">▸ deploying to edge cluster…</span>
              <span class="dv__line">pushing image: svara/api:1.42.0</span>
            </div>
          </div>

          <!-- Digital Growth & PR Tech: campaign dashboard -->
          <div v-else-if="s.visual === 'growth'" class="gr">
            <div class="gr__channels">
              <div v-for="c in growthChannels" :key="c.name" class="gr__ch">
                <span class="gr__cname">{{ c.name }}</span>
                <div class="gr__ctrack"><span class="gr__cfill" :style="{ width: c.value + '%', background: c.color }" /></div>
                <span class="gr__cval">{{ c.value }}</span>
              </div>
            </div>
            <div class="gr__spark">
              <span v-for="(h, k) in [40, 64, 48, 78, 62, 88, 71]" :key="k" :style="{ height: h + '%' }" />
            </div>
            <div class="gr__kpis">
              <span>reach 42.8M</span><span>engagement +34%</span><span>index 7.9</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.es { background: #F8FBFF; padding: var(--space-32) var(--container-pad) 0; }
.es__intro { max-width: 760px; margin: 0 auto var(--space-24); text-align: center; }
.es__eyebrow {
  margin: 0 0 var(--space-4);
  font-family: var(--font-mono); font-size: var(--type-label);
  letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent);
}
.es__title {
  margin: 0 0 var(--space-5);
  font-size: clamp(34px, 4.4vw, 56px);
  font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong);
}
.es__sub { margin: 0; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }

/* per-studio full-width panels — alternating copy/app sides; subtle tints
   keep the six studios identifiable yet unified. */
.es-panel { position: relative; border-top: 1px solid rgba(16, 42, 91, 0.08); padding: var(--space-24) 0; }
.es-panel--v-twin, .es-panel--v-os, .es-panel--v-growth { background: #F1F6FE; }
.es-panel__inner {
  max-width: 1180px; margin-inline: auto; padding-inline: var(--container-pad);
  display: grid; grid-template-columns: 1fr 1.1fr; gap: var(--space-16); align-items: center;
}
.es-panel--1 .es-panel__inner,
.es-panel--3 .es-panel__inner,
.es-panel--5 .es-panel__inner { direction: rtl; }
.es-panel--1 .es-panel__inner > *, .es-panel--3 .es-panel__inner > *, .es-panel--5 .es-panel__inner > * { direction: ltr; }

/* copy */
.es-mark { display: flex; align-items: baseline; gap: var(--space-4); margin-bottom: var(--space-6); }
.es-num { font-family: var(--font-mono); font-size: clamp(40px, 5vw, 72px); font-weight: var(--weight-extrabold); color: rgba(16, 42, 91, 0.14); letter-spacing: -0.03em; line-height: 1; }
.es-tag { font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.es-name {
  margin: 0; font-size: clamp(36px, 5vw, 64px);
  font-weight: var(--weight-extrabold); line-height: 1.02;
  letter-spacing: -0.03em; color: var(--color-ink-strong);
}
.es-focus { margin: var(--space-5) 0 0; font-size: clamp(16px, 1.4vw, 20px); line-height: var(--leading-body); color: var(--color-text-secondary); max-width: 38ch; }
.es-metrics { list-style: none; margin: var(--space-8) 0 0; padding: var(--space-6) 0 0; border-top: 1px dashed var(--color-border); display: flex; flex-wrap: wrap; gap: var(--space-8); }
.es-metrics li { display: flex; flex-direction: column; gap: 4px; }
.es-ml { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-text-faint); }
.es-mv { font-size: 20px; font-weight: var(--weight-bold); color: var(--color-ink-strong); letter-spacing: -0.01em; }

/* shared application chrome */
.es-app {
  border-radius: var(--radius-lg);
  background: #ffffff; border: 1px solid var(--color-border);
  box-shadow: 0 4px 14px rgba(16, 42, 91, 0.05), 0 40px 90px rgba(16, 42, 91, 0.12);
  overflow: hidden; min-height: 360px;
}
.es-app__bar { display: flex; align-items: center; gap: var(--space-3); padding: 11px 16px; background: #F4F7FC; border-bottom: 1px solid var(--color-border); }
.es-app__dots { display: inline-flex; gap: 6px; }
.es-app__dots i { width: 10px; height: 10px; border-radius: 50%; background: rgba(16, 42, 91, 0.16); }
.es-app__dots i:first-child { background: rgba(16, 42, 91, 0.4); }
.es-app__title { flex: 1; font-size: 12px; font-weight: var(--weight-semibold); color: var(--color-ink-strong); }
.es-app__live { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.12em; color: var(--color-accent); animation: es-blink 1.6s ease-in-out infinite; }
@keyframes es-blink { 0%,100% { opacity: 1; } 50% { opacity: 0.25; } }

/* ---- computer-vision inference ---- */
.cv { display: grid; grid-template-columns: 1.6fr 1fr; }
.cv__frame { position: relative; background: #0E1B33; aspect-ratio: 4/3; overflow: hidden; }
.cv__grid {
  position: absolute; inset: 8%; border: 1px solid rgba(125, 200, 255, 0.18);
  background-image: linear-gradient(rgba(125, 200, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(125, 200, 255, 0.1) 1px, transparent 1px);
  background-size: 20% 25%;
}
.cv__box { position: absolute; border: 1.5px solid #4FA8FF; border-radius: 3px; box-shadow: 0 0 0 3px rgba(79, 168, 255, 0.15); animation: cv-pulse 2.4s ease-in-out infinite alternate; }
.cv__box span { position: absolute; top: -18px; left: -1px; font-family: var(--font-mono); font-size: 9px; background: #4FA8FF; color: #04122B; padding: 2px 5px; border-radius: 3px; white-space: nowrap; }
@keyframes cv-pulse { 0% { opacity: 0.85; } 100% { opacity: 1; } }
.cv__scan { position: absolute; left: 0; right: 0; top: 0; height: 24%; background: linear-gradient(rgba(79, 168, 255, 0), rgba(79, 168, 255, 0.18), rgba(79, 168, 255, 0)); animation: cv-scan 3.6s linear infinite; }
@keyframes cv-scan { 0% { transform: translateY(0); } 100% { transform: translateY(420%); } }
.cv__panel { display: flex; flex-direction: column; gap: 8px; padding: var(--space-6); background: #07111F; }
.cv__row { font-family: var(--font-mono); font-size: 10.5px; color: #9DB6D6; letter-spacing: 0.04em; }
.cv__row--acc { color: #4FA8FF; }

/* ---- factory digital twin ---- */
.tw { padding: var(--space-8); }
.tw__floor { width: 100%; height: 200px; }
.tw__line { fill: none; stroke: rgba(16, 42, 91, 0.2); stroke-width: 1; vector-effect: non-scaling-stroke; }
.tw__link { stroke: var(--color-accent); stroke-width: 0.6; opacity: 0.3; stroke-dasharray: 2 3; vector-effect: non-scaling-stroke; animation: dh-dash 5s linear infinite; }
@keyframes dh-dash { to { stroke-dashoffset: -30; } }
.tw__node { fill: var(--color-accent); animation: tw-node 2.4s ease-in-out infinite alternate; }
@keyframes tw-node { 0%,100% { opacity: 0.5; transform-box: fill-box; transform-origin: center; transform: scale(0.9); } 50% { opacity: 1; transform: scale(1.15); } }
.tw__readout { display: flex; gap: var(--space-5); margin-top: var(--space-5); flex-wrap: wrap; }
.tw__r { font-family: var(--font-mono); font-size: 10.5px; color: var(--color-text-secondary); }
.tw__r--acc { color: var(--color-accent); font-weight: var(--weight-semibold); }

/* ---- business SaaS windows ---- */
.bs { position: relative; min-height: 360px; background:
  radial-gradient(circle at 30% 20%, rgba(47,127,230,0.06), transparent 60%),
  linear-gradient(#F4F7FC, #ffffff); }
.bs__win { position: absolute; border-radius: var(--radius-md); background: #fff; border: 1px solid var(--color-border); box-shadow: 0 12px 30px rgba(16, 42, 91, 0.1); overflow: hidden; animation: bs-float 6s ease-in-out infinite; }
.bs__win:nth-child(2) { animation-duration: 8s; animation-delay: -1.5s; }
.bs__win:nth-child(3) { animation-duration: 7s; animation-delay: -3s; }
@keyframes bs-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
.bs__winbar { display: flex; align-items: center; gap: 8px; padding: 7px 10px; background: #F4F7FC; border-bottom: 1px solid var(--color-border); }
.bs__wdots { display: inline-flex; gap: 5px; }
.bs__wdots i { width: 8px; height: 8px; border-radius: 50%; background: rgba(16,42,91,0.2); }
.bs__wname { font-size: 11px; font-weight: var(--weight-semibold); color: var(--color-ink-strong); }
.bs__wrows { display: flex; flex-direction: column; gap: 7px; padding: var(--space-4); }
.bs__wrows span { height: 9px; border-radius: 3px; background: rgba(16, 42, 91, 0.07); }
.bs__wrows span:nth-child(even) { width: 70%; }

/* ---- One AI OS ---- */
.os { display: flex; flex-direction: column; }
.os__chat { padding: var(--space-6); display: flex; flex-direction: column; gap: 12px; flex: 1; }
.os__turn { display: flex; flex-direction: column; gap: 3px; max-width: 86%; }
.os__turn--user { align-self: flex-end; text-align: right; }
.os__role { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-text-faint); }
.os__text { font-size: 13px; line-height: 1.5; color: var(--color-ink-strong); background: #F1F6FE; border: 1px solid var(--color-border); border-radius: 12px; padding: 9px 12px; }
.os__turn--user .os__text { background: var(--color-ink-strong); color: #fff; border-color: var(--color-ink-strong); }
.os__orch { display: flex; align-items: center; gap: 8px; padding: var(--space-5) var(--space-6); border-top: 1px solid var(--color-border); background: #F4F7FC; }
.os__node { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-ink-strong); padding: 5px 10px; border: 1px solid var(--color-border); border-radius: var(--radius-pill); background: #fff; }
.os__core { padding: 5px 12px; border-radius: var(--radius-pill); background: var(--color-accent); color: #fff; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; }
.os__flow { flex: 1; height: 1px; background: repeating-linear-gradient(90deg, var(--color-accent) 0 6px, transparent 6px 12px); animation: os-flow 1.4s linear infinite; }
@keyframes os-flow { to { background-position: 12px 0; } }

/* ---- digital engineering ---- */
.dv { padding: var(--space-8); }
.dv__pipe { display: flex; align-items: center; gap: 0; margin-bottom: var(--space-6); }
.dv__stage { flex: 1; text-align: center; fontsize: 11px; padding: 10px 6px; border: 1px solid var(--color-border); background: #fff; font-size: 11px; font-weight: var(--weight-semibold); color: var(--color-text-faint); position: relative; }
.dv__stage + .dv__stage { margin-left: -1px; }
.dv__stage--done { color: var(--color-ink-strong); border-color: var(--color-accent); }
.dv__stage--done::before { content: "✓"; color: var(--color-accent); margin-right: 5px; }
.dv__stage--run { background: var(--color-ink-strong); color: #fff; border-color: var(--color-ink-strong); }
.dv__stage--run::after { content: ""; position: absolute; inset: -2px; border: 2px solid var(--color-accent); border-radius: inherit; animation: dv-run 1s ease-in-out infinite; opacity: 0.5; }
@keyframes dv-run { 0%,100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 0; transform: scale(1.04); } }
.dv__log { background: #07111F; border-radius: var(--radius-md); padding: var(--space-5); display: flex; flex-direction: column; gap: 6px; min-height: 130px; }
.dv__line { font-family: var(--font-mono); font-size: 11px; color: #6B85A6; letter-spacing: 0.02em; }
.dv__line--ok { color: #4FA8FF; }
.dv__line--run { color: #fff; }
.dv__line--run::after { content: "▋"; margin-left: 4px; animation: dv-cursor 1s steps(2) infinite; }
@keyframes dv-cursor { 50% { opacity: 0; } }

/* ---- digital growth dashboard ---- */
.gr { padding: var(--space-8); }
.gr__channels { display: flex; flex-direction: column; gap: 10px; margin-bottom: var(--space-6); }
.gr__ch { display: grid; grid-template-columns: 64px 1fr 32px; align-items: center; gap: 10px; }
.gr__cname { font-size: 11px; font-weight: var(--weight-semibold); color: var(--color-ink-strong); }
.gr__ctrack { height: 6px; border-radius: 999px; background: rgba(16, 42, 91, 0.08); overflow: hidden; }
.gr__cfill { display: block; height: 100%; border-radius: inherit; animation: gr-tick 3s ease-in-out infinite alternate; transform-origin: left; }
@keyframes gr-tick { 0% { transform: scaleX(0.92); opacity: 0.85; } 100% { transform: scaleX(1); opacity: 1; } }
.gr__cval { font-family: var(--font-mono); font-size: 11px; color: var(--color-text-secondary); text-align: right; }
.gr__spark { display: flex; align-items: flex-end; gap: 5px; height: 60px; margin-bottom: var(--space-5); }
.gr__spark span { flex: 1; background: linear-gradient(var(--color-accent), var(--color-ink-strong)); border-radius: 3px 3px 0 0; animation: gr-bar 2.4s ease-in-out infinite alternate; transform-origin: bottom; }
.gr__spark span:nth-child(even) { animation-delay: -1.2s; }
@keyframes gr-bar { 0% { transform: scaleY(0.7); } 100% { transform: scaleY(1); } }
.gr__kpis { display: flex; gap: var(--space-5); flex-wrap: wrap; font-family: var(--font-mono); font-size: 10.5px; color: var(--color-text-secondary); border-top: 1px dashed var(--color-border); padding-top: var(--space-4); }

@media (max-width: 1024px) {
  .es-panel__inner { grid-template-columns: 1fr; gap: var(--space-12); }
  .es-panel--1 .es-panel__inner, .es-panel--3 .es-panel__inner, .es-panel--5 .es-panel__inner { direction: ltr; }
  .cv { grid-template-columns: 1fr; }
  .cv__panel { min-height: 80px; }
}
@media (prefers-reduced-motion: reduce) {
  .cv__box, .cv__scan, .tw__node, .tw__link, .bs__win, .os__flow, .dv__stage--run::after, .dv__line--run::after, .gr__cfill, .gr__spark span, .es-app__live { animation: none; }
}
</style>