<script setup lang="ts">
// BLOG HERO — a connected knowledge network visualization with topics
// (AI, Vision AI, Digital Twin, etc.) orbiting a central Knowledge Core.
// Copy is verbatim from the Content Bible (knowledge-hub canonicalDefinition
// + architecture overview). Motion represents curiosity and discovery.
import { onMounted, ref } from 'vue'
import { gsap } from '~~/lib/gsap'
import { ease } from '~~/lib/animation/motion'
import { blogHero, KNOWLEDGE_TOPICS } from '~/utils/blog-page'

const root = ref<HTMLElement>()

const NODES = KNOWLEDGE_TOPICS.map((name, i) => {
  const a = (i / KNOWLEDGE_TOPICS.length) * Math.PI * 2 - Math.PI / 2
  return { name, i, x: 50 + Math.cos(a) * 40, y: 50 + Math.sin(a) * 40 }
})

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const q = gsap.utils.selector(root.value!)
  const tl = gsap.timeline({ defaults: { ease: ease.out } })
  tl.fromTo(q('.bh__eyebrow'), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 })
    .fromTo(q('.bh__title-line > span'), { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.08 }, '-=0.2')
    .fromTo(q('.bh__def'), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
    .fromTo(q('.bh__core'), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 1 }, '-=0.5')
    .fromTo(q('.bh__node'), { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.06 }, '-=0.6')
    .fromTo(q('.bh__wire'), { opacity: 0 }, { opacity: 0.3, duration: 0.5, stagger: 0.03 }, '-=0.5')
})
</script>

<template>
  <section ref="root" class="bh">
    <div class="bh__inner">
      <p class="bh__eyebrow">{{ blogHero.eyebrow }}</p>
      <h1 class="bh__title">
        <span class="bh__title-line"><span>{{ blogHero.title }}</span></span>
      </h1>
      <p class="bh__def">{{ blogHero.def }}</p>

      <div class="bh__viz" aria-hidden="true">
        <svg class="bh__wires" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line v-for="n in NODES" :key="`w${n.i}`" x1="50" y1="50" :x2.attr="n.x" :y2.attr="n.y" class="bh__wire" />
          <circle v-for="n in NODES" :key="`p${n.i}`" r="0.5" class="bh__packet" :style="{ offsetPath: `path('M50 50 L${n.x} ${n.y}')`, animationDelay: `${(-n.i * 0.35).toFixed(2)}s` }" />
        </svg>
        <div class="bh__core">
          <span class="bh__core-ring" />
          <span class="bh__core-label">Knowledge</span>
          <span class="bh__core-tag">Hub</span>
        </div>
        <div v-for="n in NODES" :key="`n${n.i}`" class="bh__node" :style="{ left: n.x + '%', top: n.y + '%' }">
          <span class="bh__node-dot" />
          <span class="bh__node-name">{{ n.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bh { position: relative; min-height: 100vh; background: #F8FBFF; display: flex; align-items: center; justify-content: center; padding: calc(var(--nav-height) + var(--space-16)) var(--container-pad) var(--space-20); box-sizing: border-box; overflow: hidden; }
.bh::before { content: ""; position: absolute; inset: 0; z-index: 1; background-image: linear-gradient(rgba(16, 42, 91, 0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 42, 91, 0.045) 1px, transparent 1px); background-size: 56px 56px; mask-image: radial-gradient(circle at 50% 42%, #000 0%, transparent 72%); pointer-events: none; }
.bh__inner { position: relative; z-index: 2; width: 100%; max-width: 1120px; margin-inline: auto; text-align: center; display: flex; flex-direction: column; align-items: center; }
.bh__eyebrow { margin: 0 0 var(--space-6); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.bh__title { margin: 0; font-size: clamp(48px, 7vw, 104px); font-weight: var(--weight-extrabold); line-height: 1.0; letter-spacing: -0.035em; color: var(--color-ink-strong); }
.bh__title-line { display: block; overflow: hidden; padding-bottom: 0.1em; margin-bottom: -0.1em; }
.bh__title-line > span { display: block; }
.bh__def { margin: var(--space-8) auto 0; max-width: 60ch; font-size: clamp(17px, 1.5vw, 20px); line-height: var(--leading-body); color: var(--color-text-secondary); }
.bh__viz { position: relative; width: min(540px, 84vw); aspect-ratio: 1; margin-top: var(--space-16); }
.bh__wires { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.bh__wire { stroke: var(--color-ink-strong); stroke-width: 0.4; vector-effect: non-scaling-stroke; opacity: 0.3; stroke-dasharray: 2 3; animation: bh-dash 7s linear infinite; }
@keyframes bh-dash { to { stroke-dashoffset: -50; } }
.bh__packet { fill: var(--color-accent); animation: bh-flow 4s linear infinite; }
@keyframes bh-flow { from { offset-distance: 0%; } to { offset-distance: 100%; } }
.bh__core { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); z-index: 3; width: 120px; height: 120px; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; background: var(--color-ink-strong); color: #fff; box-shadow: 0 24px 70px rgba(16, 42, 91, 0.28); }
.bh__core-ring { position: absolute; inset: -12px; border-radius: 50%; border: 1px solid var(--color-accent); opacity: 0.4; animation: bh-pulse 2.6s ease-in-out infinite; }
@keyframes bh-pulse { 0%,100% { transform: scale(1); opacity: 0.4; } 50% { transform: scale(1.08); opacity: 0.08; } }
.bh__core-label { font-size: 15px; font-weight: var(--weight-extrabold); letter-spacing: -0.02em; }
.bh__core-tag { font-family: var(--font-mono); font-size: 8px; letter-spacing: 0.1em; text-transform: uppercase; opacity: 0.6; }
.bh__node { position: absolute; transform: translate(-50%, -50%); z-index: 2; display: inline-flex; flex-direction: column; align-items: center; gap: 4px; animation: bh-float 7s ease-in-out infinite; }
.bh__node:nth-child(odd) { animation-duration: 9s; animation-delay: -2s; }
.bh__node-dot { width: 7px; height: 7px; border-radius: 50%; background: #fff; border: 2px solid var(--color-accent); box-shadow: 0 0 0 4px rgba(47, 127, 230, 0.12); }
.bh__node-name { font-size: 11px; font-weight: var(--weight-semibold); color: var(--color-ink-strong); white-space: nowrap; padding: 3px 9px; background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(8px); border: 1px solid var(--color-border); border-radius: var(--radius-pill); }
@keyframes bh-float { 0%,100% { transform: translate(-50%, -50%); } 50% { transform: translate(-50%, calc(-50% - 6px)); } }
@media (max-width: 768px) { .bh__def { max-width: 40ch; } .bh__viz { width: 94vw; margin-top: var(--space-12); } .bh__node-name { font-size: 9px; } .bh__core { width: 88px; height: 88px; } }
@media (prefers-reduced-motion: reduce) { .bh__wire, .bh__packet, .bh__node, .bh__core-ring { animation: none; } }
</style>