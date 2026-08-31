<script setup lang="ts">
// EnterpriseBrain — the climax of the Products page. Ten product systems converge
// into one central SVARA intelligence core: a dark cinematic constellation with
// orbital rings, animated signal streams and enterprise telemetry. "Entering the
// SVARA operating system." Full-bleed dark; resolves back into the cream page.
import { computed } from 'vue'
import { SVARA_OS } from '~/utils/svara-os'

const nodes = computed(() => SVARA_OS.map((p, i) => {
  const a = (i / SVARA_OS.length) * Math.PI * 2 - Math.PI / 2
  return { short: p.short, n: p.n, x: 50 + Math.cos(a) * 38, y: 50 + Math.sin(a) * 38, i }
}))
</script>

<template>
  <section class="eb">
    <div class="eb__grid" aria-hidden="true" />
    <span class="eb__tl sys-label sys-label--sm">SYSTEM 11 <span class="eb__sep">//</span> CONVERGENCE</span>
    <span class="eb__tr sys-label sys-label--sm">STATUS <span class="eb__cy">● OPERATIONAL</span></span>
    <span class="eb__bl sys-label sys-label--sm">10 SYSTEMS <span class="eb__sep">//</span> 1 CORE</span>
    <span class="eb__br sys-label sys-label--sm">SVARA OS <span class="eb__sep">//</span> ONLINE</span>

    <div class="eb__inner">
      <header class="eb__head">
        <p class="eb__eyebrow sys-label">The Convergence</p>
        <h2 class="eb__title">Everything<br><span class="eb__title-cy">converges.</span></h2>
        <p class="eb__sub">Ten intelligence systems. One operating core. Every signal, every decision, every action — connected through the SVARA intelligence layer.</p>
      </header>

      <div class="eb__viz">
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <!-- orbital rings -->
          <circle class="eb__ring" cx="50" cy="50" r="44" fill="none" stroke="rgba(103,232,249,0.16)" stroke-width="0.3" stroke-dasharray="1 2" />
          <circle class="eb__ring eb__ring--2" cx="50" cy="50" r="30" fill="none" stroke="rgba(103,232,249,0.2)" stroke-width="0.3" />
          <!-- connections -->
          <g stroke="rgba(103,232,249,0.22)" stroke-width="0.3">
            <line v-for="nd in nodes" :key="`l${nd.i}`" x1="50" y1="50" :x2="nd.x" :y2="nd.y" />
          </g>
          <!-- streams converging inward -->
          <g v-for="nd in nodes" :key="`s${nd.i}`">
            <circle r="0.6" fill="#67E8F9"><animateMotion :dur="`${2.6 + (nd.i % 4) * 0.7}s`" :begin="`${nd.i * 0.28}s`" repeatCount="indefinite" :path="`M${nd.x} ${nd.y} L50 50`" /></circle>
          </g>
          <!-- product nodes -->
          <g v-for="nd in nodes" :key="`n${nd.i}`">
            <rect :x="nd.x - 2.4" :y="nd.y - 2.4" width="4.8" height="4.8" fill="#0a1428" stroke="#67E8F9" stroke-width="0.4" />
            <text :x="nd.x" :y="nd.y - 4" text-anchor="middle" class="eb__node-t">{{ nd.short }}</text>
          </g>
          <!-- core -->
          <circle cx="50" cy="50" r="12" fill="none" stroke="rgba(103,232,249,0.4)" stroke-width="0.4"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="30s" repeatCount="indefinite" /></circle>
          <circle cx="50" cy="50" r="8.5" fill="#0a1428" stroke="#67E8F9" stroke-width="0.5" />
          <circle cx="50" cy="50" r="2" fill="#67E8F9"><animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" /></circle>
          <text x="50" y="48.6" text-anchor="middle" class="eb__core-t">SVARA</text>
          <text x="50" y="52.4" text-anchor="middle" class="eb__core-s">CORE</text>
        </svg>
      </div>

      <div class="eb__cta">
        <NuxtLink to="/contact" class="sys-btn eb__btn">Enter the Operating System<span aria-hidden="true">→</span></NuxtLink>
      </div>
    </div>
    <div class="eb__seam" aria-hidden="true" />
  </section>
</template>

<style scoped>
.eb {
  --sys-mark: rgba(103, 232, 249, 0.5);
  position: relative; overflow: hidden; isolation: isolate;
  padding: clamp(96px, 16vh, 200px) clamp(24px, 5vw, 64px) clamp(120px, 20vh, 260px);
  background: #060b16; color: #fff;
}
.eb__grid { position: absolute; inset: 0; z-index: 0; pointer-events: none; background-image: linear-gradient(rgba(103,232,249,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(103,232,249,0.05) 1px, transparent 1px); background-size: 60px 60px; -webkit-mask-image: radial-gradient(120% 100% at 50% 45%, #000 40%, transparent 100%); mask-image: radial-gradient(120% 100% at 50% 45%, #000 40%, transparent 100%); }

.eb__tl, .eb__tr, .eb__bl, .eb__br { position: absolute; z-index: 3; color: rgba(255, 255, 255, 0.5); }
.eb__tl { top: 24px; left: clamp(24px, 5vw, 64px); } .eb__tr { top: 24px; right: clamp(24px, 5vw, 64px); }
.eb__bl { bottom: 24px; left: clamp(24px, 5vw, 64px); } .eb__br { bottom: 24px; right: clamp(24px, 5vw, 64px); }
.eb__sep { opacity: 0.4; } .eb__cy { color: #67E8F9; }

.eb__inner { position: relative; z-index: 2; max-width: 1100px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; text-align: center; }
.eb__eyebrow { color: rgba(255, 255, 255, 0.6); margin-bottom: 22px; }
.eb__title { margin: 0; font-size: clamp(44px, 9vw, 128px); font-weight: 200; line-height: 0.94; letter-spacing: -0.02em; text-transform: uppercase; }
.eb__title-cy { color: #67E8F9; text-shadow: 0 0 50px rgba(103, 232, 249, 0.5); }
.eb__sub { margin: 26px auto 0; max-width: 56ch; font-size: clamp(14px, 1.5vw, 18px); line-height: 1.6; color: rgba(255, 255, 255, 0.62); }

.eb__viz { width: 100%; max-width: 620px; margin: clamp(32px, 5vw, 56px) auto 0; }
.eb__viz svg { width: 100%; aspect-ratio: 1; display: block; overflow: visible; }
.eb__ring { transform-origin: 50px 50px; animation: eb-spin 60s linear infinite; }
.eb__ring--2 { animation: eb-spin 40s linear infinite reverse; }
@keyframes eb-spin { to { transform: rotate(360deg); } }
:deep(.eb__node-t) { font-family: var(--font-mono, monospace); font-size: 2.1px; letter-spacing: 0.1em; fill: rgba(255, 255, 255, 0.72); text-transform: uppercase; }
:deep(.eb__core-t) { font-family: var(--font-mono, monospace); font-size: 3px; letter-spacing: 0.3px; fill: #fff; }
:deep(.eb__core-s) { font-family: var(--font-mono, monospace); font-size: 2px; fill: #67E8F9; }

.eb__cta { margin-top: clamp(40px, 6vw, 64px); }
.eb__btn { color: #fff; border-color: rgba(255, 255, 255, 0.4); }
.eb__btn:hover { background: #fff; color: #060b16; }

.eb__seam { position: absolute; left: 0; right: 0; bottom: 0; z-index: 1; height: clamp(90px, 14vh, 180px); background: linear-gradient(to bottom, rgba(6,11,22,0) 0%, #FDFCF8 100%); pointer-events: none; }

@media (prefers-reduced-motion: reduce) { .eb__ring, .eb__ring--2 { animation: none; } }
</style>
