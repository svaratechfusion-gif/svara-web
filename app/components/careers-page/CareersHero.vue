<script setup lang="ts">
// CAREERS HERO — a futuristic engineering workspace visualization where
// AI models, enterprise systems, code, and product architecture connect.
// Copy is verbatim from the Content Bible (company canonicalDefinition +
// Company Mission). Motion represents engineering and product development.
import { onMounted, ref } from 'vue'
import { gsap } from '~~/lib/gsap'
import { ease } from '~~/lib/animation/motion'
import { careersHero } from '~/utils/careers-page'

const root = ref<HTMLElement>()

// engineering workspace nodes — representing the connected systems an
// engineer works with at SVARA
const NODES = [
  { name: 'AI Models', a: 0 }, { name: 'Enterprise Systems', a: 1 },
  { name: 'Code', a: 2 }, { name: 'Product', a: 3 },
  { name: 'Architecture', a: 4 }, { name: 'Edge', a: 5 },
].map((n, i) => {
  const ang = (i / 6) * Math.PI * 2 - Math.PI / 2
  return { ...n, x: 50 + Math.cos(ang) * 38, y: 50 + Math.sin(ang) * 38 }
})

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const q = gsap.utils.selector(root.value!)
  const tl = gsap.timeline({ defaults: { ease: ease.out } })
  tl.fromTo(q('.ch__eyebrow'), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 })
    .fromTo(q('.ch__title-line > span'), { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.08 }, '-=0.2')
    .fromTo(q('.ch__mission'), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
    .fromTo(q('.ch__core'), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 1 }, '-=0.5')
    .fromTo(q('.ch__node'), { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.06 }, '-=0.6')
    .fromTo(q('.ch__wire'), { opacity: 0 }, { opacity: 0.3, duration: 0.5, stagger: 0.03 }, '-=0.5')
})
</script>

<template>
  <section ref="root" class="ch">
    <div class="ch__inner">
      <p class="ch__eyebrow">{{ careersHero.eyebrow }}</p>
      <h1 class="ch__title">
        <span class="ch__title-line"><span>{{ careersHero.title }}</span></span>
      </h1>
      <p class="ch__mission">{{ careersHero.mission }}</p>

      <div class="ch__viz" aria-hidden="true">
        <svg class="ch__wires" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line v-for="n in NODES" :key="`w${n.name}`" x1="50" y1="50" :x2.attr="n.x" :y2.attr="n.y" class="ch__wire" />
          <circle v-for="n in NODES" :key="`p${n.name}`" r="0.5" class="ch__packet" :style="{ offsetPath: `path('M50 50 L${n.x} ${n.y}')`, animationDelay: `${(-n.a * 0.35).toFixed(2)}s` }" />
        </svg>
        <div class="ch__core">
          <span class="ch__core-ring" />
          <span class="ch__core-label">SVARA</span>
          <span class="ch__core-tag">Engineering</span>
        </div>
        <div v-for="n in NODES" :key="`n${n.name}`" class="ch__node" :style="{ left: n.x + '%', top: n.y + '%' }">
          <span class="ch__node-dot" />
          <span class="ch__node-name">{{ n.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ch { position: relative; min-height: 100vh; background: #F8FBFF; display: flex; align-items: center; justify-content: center; padding: calc(var(--nav-height) + var(--space-16)) var(--container-pad) var(--space-20); box-sizing: border-box; overflow: hidden; }
.ch::before { content: ""; position: absolute; inset: 0; z-index: 1; background-image: linear-gradient(rgba(16, 42, 91, 0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 42, 91, 0.045) 1px, transparent 1px); background-size: 56px 56px; mask-image: radial-gradient(circle at 50% 42%, #000 0%, transparent 72%); pointer-events: none; }
.ch__inner { position: relative; z-index: 2; width: 100%; max-width: 1120px; margin-inline: auto; text-align: center; display: flex; flex-direction: column; align-items: center; }
.ch__eyebrow { margin: 0 0 var(--space-6); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.ch__title { margin: 0; font-size: clamp(48px, 7vw, 104px); font-weight: var(--weight-extrabold); line-height: 1.0; letter-spacing: -0.035em; color: var(--color-ink-strong); }
.ch__title-line { display: block; overflow: hidden; padding-bottom: 0.1em; margin-bottom: -0.1em; }
.ch__title-line > span { display: block; }
.ch__mission { margin: var(--space-8) auto 0; max-width: 56ch; font-size: clamp(18px, 1.6vw, 22px); line-height: var(--leading-body); color: var(--color-text-secondary); }
.ch__viz { position: relative; width: min(540px, 84vw); aspect-ratio: 1; margin-top: var(--space-16); }
.ch__wires { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.ch__wire { stroke: var(--color-ink-strong); stroke-width: 0.4; vector-effect: non-scaling-stroke; opacity: 0.3; stroke-dasharray: 2 3; animation: ch-dash 7s linear infinite; }
@keyframes ch-dash { to { stroke-dashoffset: -50; } }
.ch__packet { fill: var(--color-accent); animation: ch-flow 4s linear infinite; }
@keyframes ch-flow { from { offset-distance: 0%; } to { offset-distance: 100%; } }
.ch__core { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); z-index: 3; width: 120px; height: 120px; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; background: var(--color-ink-strong); color: #fff; box-shadow: 0 24px 70px rgba(16, 42, 91, 0.28); }
.ch__core-ring { position: absolute; inset: -12px; border-radius: 50%; border: 1px solid var(--color-accent); opacity: 0.4; animation: ch-pulse 2.6s ease-in-out infinite; }
@keyframes ch-pulse { 0%,100% { transform: scale(1); opacity: 0.4; } 50% { transform: scale(1.08); opacity: 0.08; } }
.ch__core-label { font-size: 16px; font-weight: var(--weight-extrabold); letter-spacing: -0.02em; }
.ch__core-tag { font-family: var(--font-mono); font-size: 8px; letter-spacing: 0.1em; text-transform: uppercase; opacity: 0.6; }
.ch__node { position: absolute; transform: translate(-50%, -50%); z-index: 2; display: inline-flex; flex-direction: column; align-items: center; gap: 4px; animation: ch-float 7s ease-in-out infinite; }
.ch__node:nth-child(odd) { animation-duration: 9s; animation-delay: -2s; }
.ch__node-dot { width: 7px; height: 7px; border-radius: 50%; background: #fff; border: 2px solid var(--color-accent); box-shadow: 0 0 0 4px rgba(47, 127, 230, 0.12); }
.ch__node-name { font-size: 11px; font-weight: var(--weight-semibold); color: var(--color-ink-strong); white-space: nowrap; padding: 3px 9px; background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(8px); border: 1px solid var(--color-border); border-radius: var(--radius-pill); }
@keyframes ch-float { 0%,100% { transform: translate(-50%, -50%); } 50% { transform: translate(-50%, calc(-50% - 6px)); } }
@media (max-width: 768px) { .ch__mission { max-width: 40ch; } .ch__viz { width: 94vw; margin-top: var(--space-12); } .ch__node-name { font-size: 9px; } .ch__core { width: 88px; height: 88px; } }
@media (prefers-reduced-motion: reduce) { .ch__wire, .ch__packet, .ch__node, .ch__core-ring { animation: none; } }
</style>