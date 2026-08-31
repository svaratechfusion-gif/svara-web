<script setup lang="ts">
// DIVISIONS HERO — Volume 03 hero. One organization branches into six
// specialized engineering divisions and reconnects into one ecosystem.
// Copy is drawn verbatim from the Content Bible (homeSection04 title +
// teaser). The visualization is the page's signature: a single node
// forks into six streams that loop back into one closed system — motion
// represents division specialization and ecosystem re-convergence, not
// decoration. White ground, navy accents; no purple, no neon.
import { onMounted, ref } from 'vue'
import { gsap } from '~~/lib/gsap'
import { ease } from '~~/lib/animation/motion'
import { homeSection04 } from '~~/lib/content/home'
import { STUDIOS } from '~/utils/divisions'

const root = ref<HTMLElement>()

const title = homeSection04.title
const teaser = homeSection04.teaser

// six division nodes around a ring; top single source, bottom convergence
const NODES = STUDIOS.map((s, i) => {
  const a = (i / STUDIOS.length) * Math.PI * 2 - Math.PI / 2
  return { i, name: s.name, x: 50 + Math.cos(a) * 40, y: 50 + Math.sin(a) * 40 }
})

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const q = gsap.utils.selector(root.value!)
  const tl = gsap.timeline({ defaults: { ease: ease.out } })
  tl.fromTo(q('.dh__eyebrow'), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 })
    .fromTo(q('.dh__title-line > span'), { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.08 }, '-=0.2')
    .fromTo(q('.dh__lead'), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
    .fromTo(q('.dh__branch'), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 1 }, '-=0.5')
    .fromTo(q('.dh__fade'), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.6, stagger: 0.06 }, '-=0.8')
    .fromTo(q('.dh__core'), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.8 }, '-=0.5')
})
</script>

<template>
  <section ref="root" class="dh">
    <div class="dh__inner">
      <p class="dh__eyebrow">Divisions</p>
      <h1 class="dh__title">
        <span class="dh__title-line"><span>{{ title }}</span></span>
      </h1>
      <p class="dh__lead">{{ teaser }}</p>

      <div class="dh__branch" aria-hidden="true">
        <svg class="dh__paths" viewBox="0 0 100 100" preserveAspectRatio="none">
          <!-- one organization → six divisions -->
          <path
            v-for="n in NODES" :key="`s${n.i}`"
            :d="`M50 8 Q50 30 ${n.x} ${n.y}`"
            class="dh__flow dh__flow--out"
          />
          <!-- six divisions → one ecosystem -->
          <path
            v-for="n in NODES" :key="`r${n.i}`"
            :d="`M${n.x} ${n.y} Q50 70 50 92`"
            class="dh__flow dh__flow--in"
          />
          <!-- intelligence packets -->
          <circle
            v-for="n in NODES" :key="`p${n.i}`"
            r="0.6" class="dh__packet"
            :style="{ offsetPath: `path('M50 8 Q50 30 ${n.x} ${n.y}')`, animationDelay: `${(-n.i * 0.35).toFixed(2)}s` }"
          />
          <circle
            v-for="n in NODES" :key="`q${n.i}`"
            r="0.6" class="dh__packet dh__packet--rev"
            :style="{ offsetPath: `path('M${n.x} ${n.y} Q50 70 50 92')`, animationDelay: `${(-n.i * 0.35 - 1.5).toFixed(2)}s` }"
          />
        </svg>

        <!-- source: one organization -->
        <div class="dh__source" style="left:50%;top:8%">
          <span>One Organization</span>
        </div>

        <!-- six division nodes -->
        <div
          v-for="n in NODES" :key="`n${n.i}`"
          class="dh__node dh__fade"
          :style="{ left: n.x + '%', top: n.y + '%' }"
        >
          <span class="dh__node-num">{{ String(n.i + 1).padStart(2, '0') }}</span>
          <span class="dh__node-name">{{ n.name }}</span>
        </div>

        <!-- convergence: one ecosystem -->
        <div class="dh__core" style="left:50%;top:92%">
          <span class="dh__core-ring" />
          <span class="dh__core-label">One Ecosystem</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dh {
  position: relative;
  min-height: 100vh;
  background: #F8FBFF;
  display: flex; align-items: center; justify-content: center;
  padding: calc(var(--nav-height) + var(--space-16)) var(--container-pad) var(--space-20);
  box-sizing: border-box; overflow: hidden;
}
.dh__inner {
  position: relative; z-index: 2;
  width: 100%; max-width: 1120px; margin-inline: auto;
  text-align: center; display: flex; flex-direction: column; align-items: center;
}
.dh__eyebrow {
  margin: 0 0 var(--space-6);
  font-family: var(--font-mono); font-size: var(--type-label);
  letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent);
}
.dh__title {
  margin: 0; font-size: clamp(48px, 7vw, 112px);
  font-weight: var(--weight-extrabold); line-height: 1.02;
  letter-spacing: -0.035em; color: var(--color-ink-strong);
}
.dh__title-line { display: block; overflow: hidden; padding-bottom: 0.1em; margin-bottom: -0.1em; }
.dh__title-line > span { display: block; }
.dh__lead {
  margin: var(--space-8) auto 0; max-width: 56ch;
  font-size: clamp(18px, 1.6vw, 22px); line-height: var(--leading-body);
  color: var(--color-text-secondary);
}

.dh__branch {
  position: relative; width: min(680px, 86vw); aspect-ratio: 1 / 1.18;
  margin-top: var(--space-16);
}
.dh__paths { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.dh__flow {
  fill: none; stroke: var(--color-ink-strong); stroke-width: 0.5;
  vector-effect: non-scaling-stroke; opacity: 0.18;
  stroke-dasharray: 2 3; animation: dh-dash 7s linear infinite;
}
.dh__flow--in { stroke: var(--color-accent); opacity: 0.22; }
@keyframes dh-dash { to { stroke-dashoffset: -50; } }
.dh__packet { fill: var(--color-accent); animation: dh-flow 3.8s linear infinite; }
.dh__packet--rev { animation-direction: reverse; }
@keyframes dh-flow { from { offset-distance: 0%; } to { offset-distance: 100%; } }

.dh__source, .dh__core {
  position: absolute; transform: translate(-50%, -50%); z-index: 3;
  padding: 10px 18px; border-radius: var(--radius-pill);
  font-size: 13px; font-weight: var(--weight-semibold); color: #fff;
  background: var(--color-ink-strong); box-shadow: 0 14px 40px rgba(16, 42, 91, 0.2);
  white-space: nowrap;
}
.dh__core-ring {
  position: absolute; inset: -8px; border-radius: var(--radius-pill);
  border: 1px solid var(--color-accent); opacity: 0.5;
  animation: dh-pulse 2.4s ease-in-out infinite;
}
@keyframes dh-pulse { 0%,100% { transform: scale(1); opacity: 0.5; } 50% { transform: scale(1.06); opacity: 0.1; } }
.dh__core-label { position: relative; z-index: 1; }

.dh__node {
  position: absolute; transform: translate(-50%, -50%); z-index: 2;
  display: inline-flex; flex-direction: column; align-items: center; gap: 4px;
  padding: 10px 16px; border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(10px);
  border: 1px solid var(--color-border); box-shadow: 0 6px 20px rgba(16, 42, 91, 0.08);
  animation: dh-float 7s ease-in-out infinite;
  white-space: nowrap;
}
.dh__node:nth-child(odd) { animation-duration: 9s; animation-delay: -2s; }
.dh__node-num { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.1em; color: var(--color-accent); }
.dh__node-name { font-size: 12.5px; font-weight: var(--weight-semibold); color: var(--color-ink-strong); letter-spacing: -0.01em; }
@keyframes dh-float { 0%,100% { transform: translate(-50%, -50%); } 50% { transform: translate(-50%, calc(-50% - 7px)); } }

/* faint ground grid */
.dh::before {
  content: ""; position: absolute; inset: 0; z-index: 1;
  background-image:
    linear-gradient(rgba(16, 42, 91, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(16, 42, 91, 0.045) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(circle at 50% 42%, #000 0%, transparent 72%);
  pointer-events: none;
}

@media (max-width: 768px) {
  .dh__lead { max-width: 40ch; }
  .dh__branch { width: 94vw; margin-top: var(--space-12); }
  .dh__node { padding: 7px 11px; }
  .dh__node-name { font-size: 10.5px; }
}
@media (prefers-reduced-motion: reduce) {
  .dh__flow, .dh__packet, .dh__node, .dh__core-ring { animation: none; }
}
</style>