<script setup lang="ts">
import SectionFigure from './SectionFigure.vue'
// 03 · SVARA ECOSYSTEM — a living intelligence constellation. Eight products are
// nodes orbiting one animated intelligence core; connections carry travelling
// particles; hover dims the field and floats an info card; click pins an
// expanded card; the whole graph parallaxes to the pointer and flies in on
// scroll. Not a product grid, not a flowchart — one connected organism.
// Copy (eyebrow/title/lead) and the eight products are unchanged. SSR renders a
// spine-threaded list (SEO + no-JS + mobile); the graph is a client enhancement.
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import type { Component } from 'vue'
import { Eye, Plane, Cpu, Sparkles, Bot, Boxes, Command, Cloud, ArrowRight, X } from '@lucide/vue'

interface Node {
  name: string
  copy: string          // short line shown under the node
  detail: string        // sentence shown in the info card
  to: string
  x: number             // 100×60 constellation space (core = 50,30)
  y: number
  depth: number         // independent parallax factor
  icon: Component
  industries: string[]
}

const nodes: Node[] = [
  { name: 'Vision AI', copy: 'Video into operational intelligence', detail: 'Transforms cameras into real-time operational intelligence.', to: '/products/vision-ai', x: 19, y: 11, depth: 1.15, icon: Eye, industries: ['Manufacturing', 'Retail', 'Smart City', 'Security'] },
  { name: 'Drone AI', copy: 'Autonomous aerial visibility', detail: 'Autonomous aerial perception for sites too large or risky to watch.', to: '/products/drone-ai', x: 50, y: 6, depth: 1.3, icon: Plane, industries: ['Infrastructure', 'Agriculture', 'Logistics', 'Security'] },
  { name: 'Edge AI', copy: 'Intelligence where decisions happen', detail: 'Runs perception and inference on-site, where milliseconds matter.', to: '/products/edge-ai', x: 81, y: 11, depth: 1.15, icon: Cpu, industries: ['Manufacturing', 'Energy', 'Automotive', 'Telecom'] },
  { name: 'Generative AI', copy: 'Knowledge, reasoning, productivity', detail: 'Reasoning and knowledge work, grounded in your own operations.', to: '/products', x: 92, y: 31, depth: 1.0, icon: Sparkles, industries: ['Knowledge', 'Support', 'R&D', 'Marketing'] },
  { name: 'AI Agents', copy: 'Digital workers across operations', detail: 'Digital workers that carry decisions through every function.', to: '/products/ai-agents', x: 81, y: 51, depth: 1.15, icon: Bot, industries: ['Operations', 'Finance', 'Support', 'HR'] },
  { name: 'Digital Twin', copy: 'Model, simulate, optimize the real world', detail: 'A live model of the real world — simulate before you act.', to: '/products/digital-twin', x: 50, y: 56, depth: 1.3, icon: Boxes, industries: ['Manufacturing', 'Energy', 'Urban', 'Logistics'] },
  { name: 'AI OS', copy: 'A conversational layer over the enterprise', detail: 'One conversational surface across every system you run.', to: '/products/ai-os', x: 19, y: 51, depth: 1.15, icon: Command, industries: ['Enterprise', 'Operations', 'Analytics'] },
  { name: 'Unified Business Cloud', copy: 'Connect every business function', detail: 'Connects every business function on one intelligent backbone.', to: '/products/business-cloud', x: 8, y: 31, depth: 1.0, icon: Cloud, industries: ['Finance', 'HR', 'Sales', 'Operations'] },
]

const cx = 50
const cy = 30

const graphRef = ref<HTMLElement | null>(null)
const coreRef = ref<HTMLElement | null>(null)

const hovered = ref<number | null>(null)
const pinned = ref<number | null>(null)
const active = computed<number | null>(() => (pinned.value ?? hovered.value))
const activeNode = computed<Node | null>(() => (active.value == null ? null : nodes[active.value]))

function onEnter(i: number) { hovered.value = i }
function toggle(i: number) { pinned.value = pinned.value === i ? null : i }
function unpin() { pinned.value = null }

// quadrant placement so the card floats outward from its node and stays inside
function cardClass(n: Node) {
  return {
    'ec__card--l': n.x > 55,
    'ec__card--r': n.x < 45,
    'ec__card--cx': n.x >= 45 && n.x <= 55,
    'ec__card--up': n.y > 40,
    'ec__card--dn': n.y <= 40,
  }
}

// pointer parallax → CSS vars on the graph root (rAF-throttled)
let raf = 0
let mx = 0
let my = 0
function onPointerMove(e: PointerEvent) {
  const el = graphRef.value
  if (!el) return
  const r = el.getBoundingClientRect()
  mx = (e.clientX - r.left) / r.width - 0.5
  my = (e.clientY - r.top) / r.height - 0.5
  if (raf) return
  raf = requestAnimationFrame(() => {
    raf = 0
    const g = graphRef.value
    if (!g) return
    g.style.setProperty('--mx', `${(mx * 10).toFixed(2)}px`)
    g.style.setProperty('--my', `${(my * 10).toFixed(2)}px`)
    g.style.setProperty('--rot', `${(mx * 4).toFixed(2)}deg`)
  })
}
function onLeaveGraph() {
  hovered.value = null
  const g = graphRef.value
  if (!g) return
  g.style.setProperty('--mx', '0px')
  g.style.setProperty('--my', '0px')
  g.style.setProperty('--rot', '0deg')
}

onMounted(async () => {
  const graph = graphRef.value
  if (!graph || typeof window === 'undefined') return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  graph.addEventListener('pointermove', onPointerMove, { passive: true })

  // scroll-entrance: core blooms, wires draw, nodes fly in one after another
  const { gsap } = await import('~~/lib/gsap')
  await nextTick()
  const core = coreRef.value
  const nodeEls = Array.from(graph.querySelectorAll<HTMLElement>('.ec__node'))
  const wireEls = Array.from(graph.querySelectorAll<SVGPathElement>('.ec__wire'))

  gsap.set(core, { opacity: 0, scale: 0.6 })
  gsap.set(nodeEls, { opacity: 0, y: 18, scale: 0.85 })
  if (wireEls.length) gsap.set(wireEls, { drawSVG: '0%' })

  gsap.timeline({ scrollTrigger: { trigger: graph, start: 'top 72%', once: true } })
    .to(core, { opacity: 1, scale: 1, duration: 0.9, ease: 'back.out(1.6)' })
    .to(wireEls, { drawSVG: '100%', duration: 0.7, stagger: 0.05, ease: 'power2.out' }, '-=0.45')
    .to(nodeEls, { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' }, '-=0.5')
})

onBeforeUnmount(() => {
  if (raf) cancelAnimationFrame(raf)
  graphRef.value?.removeEventListener('pointermove', onPointerMove)
})
</script>

<template>
  <section class="ec hx-section">
    <div class="hx-container">
      <div class="ec__intro">
        <header class="ec__head">
          <p class="hx-eyebrow"><span class="hx-index">03</span> The SVARA Ecosystem</p>
          <h2 class="hx-title">One ecosystem. <span class="lite">Every intelligence connected.</span></h2>
          <p class="hx-lead">Vision, drones, edge, generative models, agents, twins and the AI OS — specialized platforms that solve real problems while running on one shared intelligence infrastructure.</p>
        </header>

        <SectionFigure
          side
          name="ecosystem-orbital"
          alt="An orbital model of the SVARA ecosystem: a central AI OS ring — unified intelligence infrastructure — with six connected platforms arranged around it. Vision Intelligence for advanced perception, Autonomous Drones for aerial intelligence and inspection, Edge Intelligence for distributed compute and real-time decisions, Generative Models for content generation and synthetic intelligence, Intelligent Agents for autonomous operations and decision systems, and Digital Twins for real-time virtual representation."
          caption="Six specialised systems on a shared AI OS."
        />
      </div>

      <!-- desktop / tablet: the living constellation -->
      <div
        ref="graphRef"
        class="ec__graph"
        :class="{ 'is-active': active != null, 'is-pinned': pinned != null }"
        @pointerleave="onLeaveGraph"
      >
        <div class="ec__stage">
          <!-- connections + travelling particles (reactive SVG → client only) -->
          <ClientOnly>
            <svg class="ec__wires" viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true">
              <g
                v-for="(n, i) in nodes"
                :key="`w-${n.name}`"
                class="ec__wg"
                :class="{ 'is-on': active === i, 'is-dim': active != null && active !== i }"
              >
                <path class="ec__wire" :d="`M${cx} ${cy} L${n.x} ${n.y}`" vector-effect="non-scaling-stroke" />
                <circle class="ec__flow" r="0.55">
                  <animateMotion :dur="`${3 + (i % 3)}s`" repeatCount="indefinite" :path="`M${cx} ${cy} L${n.x} ${n.y}`" />
                </circle>
                <circle class="ec__flow ec__flow--2" r="0.4">
                  <animateMotion :dur="`${4 + (i % 2)}s`" begin="1.4s" repeatCount="indefinite" :path="`M${cx} ${cy} L${n.x} ${n.y}`" />
                </circle>
              </g>
            </svg>
          </ClientOnly>

          <!-- the intelligence core -->
          <div ref="coreRef" class="ec__core" aria-hidden="true">
            <span class="ec__pulse" />
            <span class="ec__ring" /><span class="ec__ring ec__ring--2" />
            <span class="ec__orbit"><i /><i /><i /></span>
            <span class="ec__sphere">
              <span class="ec__sphere-glow" />
              <span class="ec__core-dot" />
              <span class="ec__core-kicker hx-mono-label">SVARA</span>
              <span class="ec__core-title">One Intelligence<br>Infrastructure</span>
            </span>
          </div>

          <!-- product nodes -->
          <button
            v-for="(n, i) in nodes"
            :key="`node-${n.name}`"
            type="button"
            class="ec__node"
            :class="{ 'is-on': active === i, 'is-dim': active != null && active !== i, 'ec__node--labeltop': n.y > 45 }"
            :style="{ left: `${n.x}%`, top: `${(n.y / 60) * 100}%`, '--depth': n.depth }"
            :aria-label="n.name"
            :aria-expanded="pinned === i"
            @pointerenter="onEnter(i)"
            @focus="onEnter(i)"
            @click="toggle(i)"
          >
            <span class="ec__node-chip">
              <span class="ec__node-jack" />
              <component :is="n.icon" class="ec__node-ico" :size="19" :stroke-width="1.6" />
            </span>
            <span class="ec__node-label">
              <span class="ec__node-name">{{ n.name }}</span>
              <span class="ec__node-copy">{{ n.copy }}</span>
            </span>
          </button>

          <!-- floating info card (preview on hover, interactive + expanded on click) -->
          <Transition name="ec-card">
            <div
              v-if="activeNode"
              class="ec__card"
              :class="[cardClass(activeNode), { 'is-pinned': pinned != null }]"
              :style="{ left: `${activeNode.x}%`, top: `${(activeNode.y / 60) * 100}%` }"
            >
              <button v-if="pinned != null" type="button" class="ec__card-x" aria-label="Close" @click="unpin">
                <X :size="14" :stroke-width="1.8" />
              </button>
              <div class="ec__card-head">
                <span class="ec__card-ico"><component :is="activeNode.icon" :size="17" :stroke-width="1.7" /></span>
                <span class="ec__card-name">{{ activeNode.name }}</span>
              </div>
              <p class="ec__card-detail">{{ activeNode.detail }}</p>
              <p class="ec__card-lbl hx-mono">INDUSTRIES</p>
              <ul class="ec__card-inds">
                <li v-for="ind in activeNode.industries" :key="ind">{{ ind }}</li>
              </ul>
              <NuxtLink :to="activeNode.to" class="ec__card-cta">
                <span>{{ pinned != null ? 'Open product' : 'Explore' }}</span>
                <ArrowRight :size="15" :stroke-width="1.8" />
              </NuxtLink>
            </div>
          </Transition>
        </div>
      </div>

      <!-- mobile / no-JS: spine-threaded list (SSR, real links) -->
      <ol class="ec__list">
        <li v-for="(n, i) in nodes" :key="`li-${n.name}`" class="ec__li">
          <NuxtLink :to="n.to" class="ec__li-link">
            <span class="ec__li-idx hx-mono">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="ec__li-name">{{ n.name }}</span>
            <span class="ec__li-copy">{{ n.copy }}</span>
          </NuxtLink>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.ec__head { max-width: 60ch; }
/* copy left, render right — the constellation below stays full width */
.ec__intro { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 0.82fr); gap: clamp(28px, 4vw, 64px); align-items: center; }

/* ---- the graph field ---- */
.ec__graph {
  position: relative;
  margin-top: clamp(48px, 6vw, 90px);
  width: 100%;
  aspect-ratio: 100 / 58;
  perspective: 1200px;
  --mx: 0px; --my: 0px; --rot: 0deg;
}
.ec__stage {
  position: absolute; inset: 0;
  transform: translate3d(var(--mx), var(--my), 0);
  transition: transform 0.5s var(--ease-out);
}

/* ---- connections ---- */
.ec__wires { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; pointer-events: none; }
.ec__wire { stroke: rgba(20, 34, 63, 0.12); stroke-width: 1; fill: none; transition: stroke 0.3s var(--ease-smooth); }
.ec__flow { fill: var(--sig-soft); opacity: 0.55; }
.ec__wg { transition: opacity 0.35s var(--ease-smooth); }
.ec__wg.is-on .ec__wire { stroke: var(--sig); stroke-width: 1.6; }
.ec__wg.is-on .ec__flow { fill: var(--sig); opacity: 1; }
.ec__wg.is-dim { opacity: 0.28; }

/* ---- the intelligence core ---- */
.ec__core {
  position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
  width: clamp(158px, 15.5vw, 214px); aspect-ratio: 1; z-index: 2;
  display: grid; place-items: center; pointer-events: none;
}
.ec__pulse {
  position: absolute; inset: 24%; border-radius: 50%;
  border: 1px solid rgba(63, 111, 176, 0.35);
  animation: ec-pulse 3.6s var(--ease-out) infinite;
}
@keyframes ec-pulse {
  0% { transform: scale(0.7); opacity: 0.7; }
  70% { opacity: 0; }
  100% { transform: scale(1.9); opacity: 0; }
}
.ec__ring {
  position: absolute; inset: 0; border-radius: 50%;
  border: 1px solid rgba(20, 34, 63, 0.14);
  animation: ec-spin 46s linear infinite;
}
.ec__ring::after {
  content: ""; position: absolute; top: -3px; left: 50%; width: 5px; height: 5px;
  border-radius: 50%; background: var(--sig-soft); box-shadow: 0 0 8px rgba(63, 111, 176, 0.6);
}
.ec__ring--2 { inset: 15px; border-style: dashed; border-color: rgba(20, 34, 63, 0.1); animation-duration: 32s; animation-direction: reverse; }
.ec__orbit { position: absolute; inset: 7%; border-radius: 50%; animation: ec-spin 18s linear infinite; }
.ec__orbit i {
  position: absolute; top: 50%; left: 50%; width: 4px; height: 4px; border-radius: 50%;
  background: var(--sig); margin: -2px; box-shadow: 0 0 7px rgba(63, 111, 176, 0.6);
}
.ec__orbit i:nth-child(1) { transform: rotate(0deg) translateX(clamp(79px, 7.7vw, 107px)); }
.ec__orbit i:nth-child(2) { transform: rotate(130deg) translateX(clamp(79px, 7.7vw, 107px)); opacity: 0.7; }
.ec__orbit i:nth-child(3) { transform: rotate(245deg) translateX(clamp(79px, 7.7vw, 107px)); opacity: 0.5; }

.ec__sphere {
  position: relative; width: 66%; aspect-ratio: 1; border-radius: 50%;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; text-align: center;
  background:
    radial-gradient(circle at 38% 32%, rgba(255, 255, 255, 0.95), rgba(232, 238, 246, 0.75) 52%, rgba(43, 62, 99, 0.16) 100%);
  border: 1px solid rgba(20, 34, 63, 0.18);
  box-shadow:
    0 34px 66px -30px rgba(16, 42, 91, 0.42),
    inset 0 3px 8px rgba(255, 255, 255, 0.8),
    inset 0 -10px 22px rgba(43, 62, 99, 0.12);
  transform: rotateY(var(--rot)) rotateX(calc(var(--rot) * -0.4));
  transition: box-shadow 0.4s var(--ease-smooth), transform 0.4s var(--ease-out);
}
.ec__sphere-glow {
  position: absolute; inset: -6%; border-radius: 50%; opacity: 0; z-index: -1;
  background: radial-gradient(circle, rgba(63, 111, 176, 0.4), rgba(63, 111, 176, 0) 68%);
  transition: opacity 0.45s var(--ease-smooth);
}
.ec__graph.is-active .ec__sphere-glow { opacity: 1; }
.ec__graph.is-active .ec__sphere { box-shadow: 0 34px 66px -26px rgba(16, 42, 91, 0.5), inset 0 3px 8px rgba(255, 255, 255, 0.85), 0 0 0 6px rgba(63, 111, 176, 0.08); }
.ec__core-dot { width: 9px; height: 9px; border-radius: 50%; background: var(--sig); box-shadow: 0 0 0 4px rgba(63, 111, 176, 0.16); }
.ec__core-kicker { color: var(--ink-muted); }
.ec__core-title { font-size: clamp(12px, 1.1vw, 15px); font-weight: 600; line-height: 1.15; letter-spacing: -0.01em; color: var(--ink-primary); }
@keyframes ec-spin { to { transform: rotate(360deg); } }

/* ---- product nodes (dots, not cards) ---- */
.ec__node {
  position: absolute; z-index: 3;
  transform: translate(-50%, -50%) translate3d(calc(var(--mx) * var(--depth) * 0.4), calc(var(--my) * var(--depth) * 0.4), 0);
  display: grid; place-items: center;
  padding: 0; border: 0; background: none; cursor: pointer;
  transition: transform 0.5s var(--ease-out), opacity 0.35s var(--ease-smooth);
}
.ec__node-chip {
  position: relative; display: grid; place-items: center;
  width: clamp(46px, 4.4vw, 58px); aspect-ratio: 1; border-radius: 50%;
  background: linear-gradient(158deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.6));
  backdrop-filter: blur(14px);
  border: 1px solid rgba(20, 34, 63, 0.14);
  box-shadow: 0 18px 38px -24px rgba(16, 42, 91, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.85);
  color: var(--ink-primary);
  transition: transform 0.32s var(--ease-out), box-shadow 0.32s var(--ease-out), border-color 0.3s var(--ease-smooth), color 0.3s var(--ease-smooth);
}
.ec__node-jack { position: absolute; top: -4px; left: 50%; transform: translateX(-50%); width: 7px; height: 7px; border-radius: 50%; background: #fff; border: 1px solid rgba(20, 34, 63, 0.3); }
.ec__node-ico { display: block; }
.ec__node-label {
  position: absolute; top: calc(100% + 9px); left: 50%; transform: translateX(-50%);
  width: max-content; max-width: 168px; text-align: center; pointer-events: none;
  transition: opacity 0.35s var(--ease-smooth);
}
.ec__node--labeltop .ec__node-label { top: auto; bottom: calc(100% + 9px); }
.ec__node-name { display: block; font-size: 14px; font-weight: 600; letter-spacing: -0.01em; color: var(--ink-primary); }
.ec__node-copy { display: block; margin-top: 3px; font-size: 11px; line-height: 1.35; color: var(--ink-secondary); }

.ec__node:hover .ec__node-chip,
.ec__node.is-on .ec__node-chip {
  transform: scale(1.14);
  border-color: rgba(63, 111, 176, 0.55);
  color: var(--sig);
  box-shadow: 0 24px 48px -22px rgba(16, 42, 91, 0.5), 0 0 0 5px rgba(63, 111, 176, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9);
}
.ec__node.is-dim { opacity: 0.2; }
.ec__node:focus-visible { outline: none; }
.ec__node:focus-visible .ec__node-chip { outline: 2px solid var(--sig); outline-offset: 4px; }

/* ---- floating info card ---- */
.ec__card {
  position: absolute; z-index: 6; width: clamp(210px, 19vw, 248px);
  padding: 16px 16px 15px; pointer-events: none;
  background: linear-gradient(158deg, rgba(255, 255, 255, 0.99), rgba(250, 249, 245, 0.97));
  backdrop-filter: blur(20px) saturate(130%);
  border: 1px solid rgba(20, 34, 63, 0.16);
  box-shadow: 0 40px 80px -28px rgba(16, 42, 91, 0.5), 0 2px 8px rgba(16, 42, 91, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.9);
  clip-path: polygon(0 13px, 13px 0, 100% 0, 100% calc(100% - 13px), calc(100% - 13px) 100%, 0 100%);
}
.ec__card.is-pinned { pointer-events: auto; border-color: rgba(63, 111, 176, 0.32); }
/* quadrant offsets: float the card outward from the node */
.ec__card--r { margin-left: 40px; }
.ec__card--l { transform: translateX(-100%); margin-left: -40px; }
.ec__card--cx { transform: translateX(-50%); }
.ec__card--up { margin-top: -18px; transform: translateY(-100%); }
.ec__card--up.ec__card--l { transform: translate(-100%, -100%); }
.ec__card--up.ec__card--cx { transform: translate(-50%, -100%); }
.ec__card--dn { margin-top: 18px; }
.ec__card-x { position: absolute; top: 9px; right: 9px; display: grid; place-items: center; width: 22px; height: 22px; border: 0; border-radius: 6px; background: rgba(20, 34, 63, 0.05); color: var(--ink-muted); cursor: pointer; transition: background 0.2s, color 0.2s; }
.ec__card-x:hover { background: rgba(20, 34, 63, 0.1); color: var(--ink-primary); }
.ec__card-head { display: flex; align-items: center; gap: 9px; }
.ec__card-ico { display: grid; place-items: center; width: 30px; height: 30px; border-radius: 8px; background: rgba(63, 111, 176, 0.1); color: var(--sig); flex: none; }
.ec__card-name { font-size: 15px; font-weight: 600; letter-spacing: -0.01em; color: var(--ink-primary); }
.ec__card-detail { margin: 11px 0 0; font-size: 12.5px; line-height: 1.5; color: var(--ink-secondary); }
.ec__card-lbl { margin: 13px 0 8px; font-size: 9px; letter-spacing: 0.16em; color: var(--ink-muted); }
.ec__card-inds { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 6px; }
.ec__card-inds li { font-size: 10.5px; letter-spacing: 0.02em; color: var(--ink-secondary); padding: 3px 8px; border-radius: 999px; background: rgba(20, 34, 63, 0.05); border: 1px solid rgba(20, 34, 63, 0.08); }
.ec__card-cta { display: inline-flex; align-items: center; gap: 7px; margin-top: 14px; font-size: 12px; font-weight: 600; letter-spacing: 0.01em; color: var(--sig); }
.ec__card-cta svg { transition: transform 0.25s var(--ease-out); }
.ec__card-cta:hover svg { transform: translateX(3px); }

.ec-card-enter-active, .ec-card-leave-active { transition: opacity 0.28s var(--ease-smooth), translate 0.28s var(--ease-out); }
.ec-card-enter-from, .ec-card-leave-to { opacity: 0; translate: 0 6px; }

/* ---- mobile list ---- */
.ec__list { display: none; }
.ec__li-link {
  display: grid; grid-template-columns: auto 1fr; gap: 4px 14px; align-items: baseline;
  padding: 18px 0; border-top: 1px solid rgba(20, 34, 63, 0.1);
}
.ec__li-idx { grid-row: span 2; color: var(--ink-muted); font-size: 12px; }
.ec__li-name { font-size: 18px; font-weight: 600; color: var(--ink-primary); }
.ec__li-copy { font-size: 14px; color: var(--ink-secondary); }

@media (max-width: 860px) {
  .ec__graph { display: none; }
  .ec__list { display: block; margin-top: 40px; }
}
@media (prefers-reduced-motion: reduce) {
  .ec__pulse, .ec__ring, .ec__orbit, .ec__flow animateMotion { animation: none; }
  .ec__stage { transition: none; }
}
</style>
