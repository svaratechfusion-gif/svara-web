<script setup lang="ts">
// INVESTORS HERO — central connected ecosystem visualization representing
// SVARA as an enterprise intelligence platform. Copy is verbatim from the
// Content Bible (investors canonicalDefinition + architecture overview).
// The connected nodes orbit a central SVARA Core; intelligence packets
// flow outward and back. Motion represents confidence and platform scale.
import { onMounted, ref } from 'vue'
import { gsap } from '~~/lib/gsap'
import { ease } from '~~/lib/animation/motion'
import { irHero } from '~/utils/investors'

const root = ref<HTMLElement>()

const NODES = [
  { name: 'AI', a: 0 }, { name: 'IoT', a: 1 }, { name: 'Industrial', a: 2 },
  { name: 'Enterprise SW', a: 3 }, { name: 'Edge', a: 4 }, { name: 'Cloud', a: 5 },
].map((n, i) => {
  const ang = (i / 6) * Math.PI * 2 - Math.PI / 2
  return { ...n, x: 50 + Math.cos(ang) * 38, y: 50 + Math.sin(ang) * 38 }
})

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const q = gsap.utils.selector(root.value!)
  const tl = gsap.timeline({ defaults: { ease: ease.out } })
  tl.fromTo(q('.ih__eyebrow'), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 })
    .fromTo(q('.ih__title-line > span'), { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.08 }, '-=0.2')
    .fromTo(q('.ih__def'), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
    .fromTo(q('.ih__hub'), { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 1 }, '-=0.5')
    .fromTo(q('.ih__node'), { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.06 }, '-=0.7')
    .fromTo(q('.ih__wire'), { opacity: 0 }, { opacity: 0.4, duration: 0.6, stagger: 0.04 }, '-=0.6')
})
</script>

<template>
  <section ref="root" class="ih">
    <div class="ih__inner">
      <p class="ih__eyebrow">Investor Relations</p>
      <h1 class="ih__title">
        <span class="ih__title-line"><span>{{ irHero.title }}</span></span>
      </h1>
      <p class="ih__def">{{ irHero.def }}</p>

      <div class="ih__hub" aria-hidden="true">
        <svg class="ih__wires" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line v-for="n in NODES" :key="`w${n.name}`" x1="50" y1="50" :x2.attr="n.x" :y2.attr="n.y" class="ih__wire" />
          <circle
v-for="n in NODES" :key="`p${n.name}`" r="0.6" class="ih__packet"
            :style="{ offsetPath: `path('M50 50 L${n.x} ${n.y}')`, animationDelay: `${(-n.a * 0.4).toFixed(2)}s` }" />
        </svg>
        <div class="ih__core">
          <span class="ih__core-ring" />
          <span class="ih__core-label">SVARA</span>
          <span class="ih__core-tag">Intelligence Infrastructure</span>
        </div>
        <div v-for="n in NODES" :key="`n${n.name}`" class="ih__node" :style="{ left: n.x + '%', top: n.y + '%' }">
          <span class="ih__node-dot" />
          <span class="ih__node-name">{{ n.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ih { position: relative; min-height: 100vh; background: #F8FBFF; display: flex; align-items: center; justify-content: center; padding: calc(var(--nav-height) + var(--space-16)) var(--container-pad) var(--space-20); box-sizing: border-box; overflow: hidden; }
.ih::before { content: ""; position: absolute; inset: 0; z-index: 1; background-image: linear-gradient(rgba(16, 42, 91, 0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 42, 91, 0.045) 1px, transparent 1px); background-size: 56px 56px; mask-image: radial-gradient(circle at 50% 42%, #000 0%, transparent 72%); pointer-events: none; }
.ih__inner { position: relative; z-index: 2; width: 100%; max-width: 1120px; margin-inline: auto; text-align: center; display: flex; flex-direction: column; align-items: center; }
.ih__eyebrow { margin: 0 0 var(--space-6); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.ih__title { margin: 0; font-size: clamp(64px, 10vw, 160px); font-weight: var(--weight-extrabold); line-height: 0.98; letter-spacing: -0.04em; color: var(--color-ink-strong); }
.ih__title-line { display: block; overflow: hidden; padding-bottom: 0.1em; margin-bottom: -0.1em; }
.ih__title-line > span { display: block; }
.ih__def { margin: var(--space-8) auto 0; max-width: 60ch; font-size: clamp(18px, 1.6vw, 22px); line-height: var(--leading-body); color: var(--color-text-secondary); }

.ih__hub { position: relative; width: min(560px, 82vw); aspect-ratio: 1; margin-top: var(--space-16); }
.ih__wires { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.ih__wire { stroke: var(--color-ink-strong); stroke-width: 0.5; vector-effect: non-scaling-stroke; opacity: 0.4; stroke-dasharray: 2 3; animation: ih-dash 7s linear infinite; }
@keyframes ih-dash { to { stroke-dashoffset: -50; } }
.ih__packet { fill: var(--color-accent); animation: ih-flow 4s linear infinite; }
@keyframes ih-flow { from { offset-distance: 0%; } to { offset-distance: 100%; } }
.ih__core { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); z-index: 3; width: 132px; height: 132px; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; background: var(--color-ink-strong); color: #fff; box-shadow: 0 24px 70px rgba(16, 42, 91, 0.28); }
.ih__core-ring { position: absolute; inset: -12px; border-radius: 50%; border: 1px solid var(--color-accent); opacity: 0.4; animation: ih-pulse 2.6s ease-in-out infinite; }
@keyframes ih-pulse { 0%,100% { transform: scale(1); opacity: 0.4; } 50% { transform: scale(1.08); opacity: 0.08; } }
.ih__core-label { font-size: 18px; font-weight: var(--weight-extrabold); letter-spacing: -0.02em; }
.ih__core-tag { font-family: var(--font-mono); font-size: 7.5px; letter-spacing: 0.1em; text-transform: uppercase; opacity: 0.65; }
.ih__node { position: absolute; transform: translate(-50%, -50%); z-index: 2; display: inline-flex; flex-direction: column; align-items: center; gap: 5px; animation: ih-float 7s ease-in-out infinite; }
.ih__node:nth-child(odd) { animation-duration: 9s; animation-delay: -2s; }
.ih__node-dot { width: 8px; height: 8px; border-radius: 50%; background: #fff; border: 2px solid var(--color-accent); box-shadow: 0 0 0 4px rgba(47, 127, 230, 0.12); }
.ih__node-name { font-size: 11.5px; font-weight: var(--weight-semibold); color: var(--color-ink-strong); white-space: nowrap; padding: 4px 10px; background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(8px); border: 1px solid var(--color-border); border-radius: var(--radius-pill); }
@keyframes ih-float { 0%,100% { transform: translate(-50%, -50%); } 50% { transform: translate(-50%, calc(-50% - 7px)); } }
@media (max-width: 768px) { .ih__def { max-width: 40ch; } .ih__hub { width: 94vw; margin-top: var(--space-12); } .ih__node-name { font-size: 9.5px; } .ih__core { width: 96px; height: 96px; } }
@media (prefers-reduced-motion: reduce) { .ih__wire, .ih__packet, .ih__node, .ih__core-ring { animation: none; } }
</style>