<script setup lang="ts">
// TECHNOLOGY HERO — a living Technology Constellation. Eight connected
// technology nodes (Artificial Intelligence, Computer Vision, Edge AI,
// Digital Twin, AI Agents, Enterprise Cloud, API Layer, One AI OS) orbit
// a central core with subtle data flow travelling along every pathway.
// Copy is drawn verbatim from the Content Bible per-technology content
// files (lib/content/*.ts) via technology.ts. Motion represents
// computation and intelligence flowing across the technology foundation.
import { onMounted, ref } from 'vue'
import { gsap } from '~~/lib/gsap'
import { ease } from '~~/lib/animation/motion'
import { CONSTELLATION } from '~/utils/technology'

const root = ref<HTMLElement>()

// place the 8 nodes around a ring; precompute x/y once
const NODES = CONSTELLATION.map((n) => {
  const cx = 50 + Math.cos(n.a) * 38 * n.ring
  const cy = 50 + Math.sin(n.a) * 38 * n.ring
  return { ...n, x: cx, y: cy }
})

// every node connects to the core + to its neighbors
const spokes = NODES.map((n) => ({ x: n.x, y: n.y }))
const rings = NODES.map((_, i) => ({
  x1: NODES[i]!.x, y1: NODES[i]!.y,
  x2: NODES[(i + 1) % NODES.length]!.x,
  y2: NODES[(i + 1) % NODES.length]!.y,
}))

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const q = gsap.utils.selector(root.value!)
  const tl = gsap.timeline({ defaults: { ease: ease.out } })
  tl.fromTo(q('.th__eyebrow'), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 })
    .fromTo(q('.th__title-line > span'), { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.08 }, '-=0.2')
    .fromTo(q('.th__lead'), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
    .fromTo(q('.th__core'), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 1 }, '-=0.6')
    .fromTo(q('.th__wire'), { opacity: 0 }, { opacity: 0.4, duration: 0.6, stagger: 0.03 }, '-=0.6')
    .fromTo(q('.th__node'), { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.06 }, '-=0.7')
})
</script>

<template>
  <section ref="root" class="th">
    <div class="th__inner">
      <p class="th__eyebrow">Technology</p>
      <h1 class="th__title">
        <span class="th__title-line"><span>Engineering The</span></span>
        <span class="th__title-line"><span>Technology Foundation</span></span>
      </h1>
      <p class="th__lead">The technology foundation powering the SVARA ecosystem — one connected layer of intelligence across sensing, reasoning, simulation, orchestration, and automation.</p>

      <div class="th__constellation" aria-hidden="true">
        <svg class="th__wires" viewBox="0 0 100 100" preserveAspectRatio="none">
          <!-- spokes to core -->
          <line v-for="(s, i) in spokes" :key="`sp${i}`" x1="50" y1="50" :x2.attr="s.x" :y2.attr="s.y" class="th__wire" />
          <!-- neighbor ring -->
          <line v-for="(r, i) in rings" :key="`rg${i}`" :x1.attr="r.x1" :y1.attr="r.y1" :x2.attr="r.x2" :y2.attr="r.y2" class="th__wire th__wire--ring" />
          <!-- intelligence packets flowing core → node → core -->
          <circle
            v-for="(n, i) in NODES" :key="`p${i}`"
            r="0.55" class="th__packet"
            :style="{ offsetPath: `path('M50 50 L${n.x} ${n.y}')`, animationDelay: `${(-i * 0.4).toFixed(2)}s` }"
          />
        </svg>

        <div class="th__core">
          <span class="th__core-ring" />
          <span class="th__core-label">SVARA Core</span>
          <span class="th__core-state">Computing</span>
        </div>

        <div
          v-for="(n, i) in NODES" :key="`n${i}`"
          class="th__node"
          :style="{ left: n.x + '%', top: n.y + '%' }"
        >
          <span class="th__node-dot" />
          <span class="th__node-name">{{ n.name }}</span>
        </div>
      </div>

      <div class="th__scroll">
        <span>Scroll to explore the foundation</span>
        <span class="th__scroll-line" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.th {
  position: relative; min-height: 100vh;
  background: #F8FBFF;
  display: flex; align-items: center; justify-content: center;
  padding: calc(var(--nav-height) + var(--space-16)) var(--container-pad) var(--space-20);
  box-sizing: border-box; overflow: hidden;
}
.th::before {
  content: ""; position: absolute; inset: 0; z-index: 1;
  background-image:
    linear-gradient(rgba(16, 42, 91, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(16, 42, 91, 0.045) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(circle at 50% 42%, #000 0%, transparent 72%);
  pointer-events: none;
}
.th__inner { position: relative; z-index: 2; width: 100%; max-width: 1120px; margin-inline: auto; text-align: center; display: flex; flex-direction: column; align-items: center; }
.th__eyebrow { margin: 0 0 var(--space-6); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.th__title { margin: 0; font-size: clamp(48px, 7.5vw, 120px); font-weight: var(--weight-extrabold); line-height: 1.0; letter-spacing: -0.04em; color: var(--color-ink-strong); }
.th__title-line { display: block; overflow: hidden; padding-bottom: 0.1em; margin-bottom: -0.1em; }
.th__title-line > span { display: block; }
.th__title-line:nth-child(2) > span { color: var(--color-accent); }
.th__lead { margin: var(--space-8) auto 0; max-width: 58ch; font-size: clamp(18px, 1.6vw, 22px); line-height: var(--leading-body); color: var(--color-text-secondary); }

.th__constellation { position: relative; width: min(660px, 88vw); aspect-ratio: 1; margin-top: var(--space-16); }
.th__wires { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.th__wire { stroke: var(--color-ink-strong); stroke-width: 0.4; vector-effect: non-scaling-stroke; opacity: 0.4; stroke-dasharray: 2 3; animation: th-dash 7s linear infinite; }
.th__wire--ring { stroke: var(--color-accent); opacity: 0.18; }
@keyframes th-dash { to { stroke-dashoffset: -50; } }
.th__packet { fill: var(--color-accent); animation: th-flow 4s linear infinite; }
@keyframes th-flow { from { offset-distance: 0%; } to { offset-distance: 100%; } }

.th__core { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); z-index: 3; width: 128px; height: 128px; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; background: var(--color-ink-strong); color: #fff; box-shadow: 0 24px 70px rgba(16, 42, 91, 0.28); }
.th__core-ring { position: absolute; inset: -12px; border-radius: 50%; border: 1px solid var(--color-accent); opacity: 0.4; animation: th-pulse 2.6s ease-in-out infinite; }
@keyframes th-pulse { 0%,100% { transform: scale(1); opacity: 0.4; } 50% { transform: scale(1.08); opacity: 0.08; } }
.th__core-label { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.14em; text-transform: uppercase; opacity: 0.7; }
.th__core-state { font-size: 15px; font-weight: var(--weight-semibold); color: #cfe2fb; letter-spacing: -0.01em; }

.th__node { position: absolute; transform: translate(-50%, -50%); z-index: 2; display: inline-flex; flex-direction: column; align-items: center; gap: 5px; animation: th-float 7s ease-in-out infinite; }
.th__node:nth-child(odd) { animation-duration: 9s; animation-delay: -2s; }
.th__node-dot { width: 8px; height: 8px; border-radius: 50%; background: #fff; border: 2px solid var(--color-accent); box-shadow: 0 0 0 4px rgba(47, 127, 230, 0.12); }
.th__node-name { font-size: 11.5px; font-weight: var(--weight-semibold); color: var(--color-ink-strong); white-space: nowrap; padding: 4px 10px; background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(8px); border: 1px solid var(--color-border); border-radius: var(--radius-pill); }
@keyframes th-float { 0%,100% { transform: translate(-50%, -50%); } 50% { transform: translate(-50%, calc(-50% - 7px)); } }

.th__scroll { position: absolute; bottom: var(--space-10); left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--color-text-faint); }
.th__scroll-line { width: 1px; height: 40px; background: linear-gradient(var(--color-accent), transparent); animation: th-scroll 2s ease-in-out infinite; }
@keyframes th-scroll { 0%,100% { transform: scaleY(0.4); transform-origin: top; } 50% { transform: scaleY(1); } }

@media (max-width: 768px) {
  .th__lead { max-width: 40ch; }
  .th__constellation { width: 94vw; margin-top: var(--space-12); }
  .th__node-name { font-size: 9.5px; padding: 3px 7px; }
  .th__core { width: 96px; height: 96px; }
}
@media (prefers-reduced-motion: reduce) { .th__wire, .th__packet, .th__node, .th__core-ring, .th__scroll-line { animation: none; } }
</style>