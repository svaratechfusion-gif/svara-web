<script setup lang="ts">
// ARCHITECTURE HERO — a floating multi-layer architecture visualization:
// Enterprise → Data → Intelligence → Automation → Business Outcomes. Copy
// is pulled verbatim from the Content Bible (platform canonical definition
// + architecture overview). The layers float and subtly connect;
// intelligence packets animate between them — the opening frame of a
// living enterprise operating system blueprint.
import { onMounted, ref } from 'vue'
import { gsap } from '~~/lib/gsap'
import { ease } from '~~/lib/animation/motion'
import { archHero, HERO_LAYERS } from '~/utils/architecture'

const root = ref<HTMLElement>()

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const q = gsap.utils.selector(root.value!)
  const tl = gsap.timeline({ defaults: { ease: ease.out } })
  tl.fromTo(q('.ah__eyebrow'), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 })
    .fromTo(q('.ah__title-line > span'), { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.08 }, '-=0.2')
    .fromTo(q('.ah__lead'), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
    .fromTo(q('.ah__layer'), { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.12 }, '-=0.4')
    .fromTo(q('.ah__flow'), { opacity: 0 }, { opacity: 0.6, duration: 0.8 }, '-=0.3')
    .fromTo(q('.ah__packet'), { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.1 }, '-=0.4')
})
</script>

<template>
  <section ref="root" class="ah">
    <div class="ah__inner">
      <div class="ah__copy">
        <p class="ah__eyebrow">Architecture</p>
        <h1 class="ah__title">
          <span class="ah__title-line"><span>{{ archHero.title }}</span></span>
        </h1>
        <p class="ah__lead">{{ archHero.def }}</p>
        <p class="ah__overview">{{ archHero.overview }}</p>
      </div>

      <div class="ah__viz" aria-hidden="true">
        <svg class="ah__flow" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="50" y1="6" x2="50" y2="94" class="ah__spine" />
          <circle
            v-for="(l, i) in HERO_LAYERS" :key="`p${i}`"
            r="0.8" class="ah__packet"
            :style="{ offsetPath: `path('M50 6 L50 94')`, animationDelay: `${(-i * 0.5).toFixed(2)}s` }"
          />
        </svg>

        <div
          v-for="(l, i) in HERO_LAYERS" :key="l.name"
          class="ah__layer"
          :style="{ '--n': HERO_LAYERS.length, '--i': i }"
        >
          <span class="ah__layer-name">{{ l.name }}</span>
          <span class="ah__layer-tag">{{ l.tag }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ah {
  position: relative; min-height: 100vh;
  background: #F8FBFF;
  display: flex; align-items: center; justify-content: center;
  padding: calc(var(--nav-height) + var(--space-16)) var(--container-pad) var(--space-20);
  box-sizing: border-box; overflow: hidden;
}
.ah::before {
  content: ""; position: absolute; inset: 0; z-index: 1;
  background-image:
    linear-gradient(rgba(16, 42, 91, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(16, 42, 91, 0.045) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(circle at 50% 42%, #000 0%, transparent 72%);
  pointer-events: none;
}
.ah__inner {
  position: relative; z-index: 2; width: 100%;
  max-width: 1180px; margin-inline: auto;
  display: grid; grid-template-columns: 1.15fr 1fr; gap: var(--space-16);
  align-items: center;
}
.ah__copy { display: flex; flex-direction: column; }
.ah__eyebrow { margin: 0 0 var(--space-6); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.ah__title { margin: 0; font-size: clamp(64px, 9vw, 144px); font-weight: var(--weight-extrabold); line-height: 0.98; letter-spacing: -0.04em; color: var(--color-ink-strong); }
.ah__title-line { display: block; overflow: hidden; padding-bottom: 0.1em; margin-bottom: -0.1em; }
.ah__title-line > span { display: block; }
.ah__lead { margin: var(--space-8) 0 0; max-width: 52ch; font-size: clamp(18px, 1.6vw, 22px); line-height: var(--leading-body); color: var(--color-text-secondary); }
.ah__overview { margin: var(--space-5) 0 0; max-width: 54ch; font-size: var(--type-body); line-height: 1.7; color: var(--color-text-faint); }

.ah__viz { position: relative; width: 100%; aspect-ratio: 1/1.1; }
.ah__flow { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.ah__spine { stroke: var(--color-ink-strong); stroke-width: 0.6; vector-effect: non-scaling-stroke; opacity: 0.18; stroke-dasharray: 2 3; animation: ah-dash 6s linear infinite; }
@keyframes ah-dash { to { stroke-dashoffset: -50; } }
.ah__packet { fill: var(--color-accent); animation: ah-flow 4s linear infinite; }
@keyframes ah-flow { from { offset-distance: 0%; } to { offset-distance: 100%; } }

.ah__layer {
  position: absolute; left: 50%; transform: translateX(-50%);
  top: calc((var(--i) + 0.5) / var(--n) * 100%);
  display: inline-flex; flex-direction: column; align-items: center; gap: 4px;
  padding: 12px 22px; border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(10px);
  border: 1px solid var(--color-border); box-shadow: 0 6px 20px rgba(16, 42, 91, 0.08);
  white-space: nowrap; animation: ah-float 7s ease-in-out infinite;
}
.ah__layer:nth-child(odd) { animation-duration: 9s; animation-delay: -2s; }
.ah__layer-name { font-size: 14px; font-weight: var(--weight-bold); color: var(--color-ink-strong); letter-spacing: -0.01em; }
.ah__layer-tag { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-accent); }
@keyframes ah-float { 0%,100% { transform: translateX(-50%); } 50% { transform: translateX(calc(-50% - 6px)); } }

@media (max-width: 1024px) {
  .ah__inner { grid-template-columns: 1fr; gap: var(--space-12); }
  .ah__viz { max-width: 480px; margin-inline: auto; }
}
@media (max-width: 768px) {
  .ah__lead { max-width: 40ch; }
  .ah__layer { padding: 9px 16px; }
  .ah__layer-name { font-size: 12px; }
}
@media (prefers-reduced-motion: reduce) { .ah__spine, .ah__packet, .ah__layer { animation: none; } }
</style>