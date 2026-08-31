<script setup lang="ts">
// WHY WORK AT SVARA — five immersive sections, each with a unique visual
// narrative. Each section's copy is VERBATIM from the Content Bible
// (company.ts architecture components + overview + dataFlow). Section titles
// from the brief. No generic cards — each is a full-width editorial spread
// with a distinct engineering visual.
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { gsap, ScrollTrigger } from '~~/lib/gsap'
import { whyWorkSections } from '~/utils/careers-page'

const root = ref<HTMLElement>()
const triggers: ScrollTrigger[] = []

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const items = root.value!.querySelectorAll<HTMLElement>('.ww-item')
  items.forEach((item) => {
    gsap.set(item, { opacity: 0, y: 50 })
    triggers.push(ScrollTrigger.create({ trigger: item, start: 'top 75%', once: true, onEnter: () => gsap.to(item, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }) }))
  })
})
onBeforeUnmount(() => { triggers.forEach(t => t.kill()) })
</script>

<template>
  <div ref="root" class="ww">
    <div class="ww__head">
      <p class="ww__eyebrow">Why Work At SVARA</p>
      <h2 class="ww__title">Five reasons engineers choose SVARA.</h2>
    </div>

    <section
      v-for="(s, i) in whyWorkSections" :key="s.title"
      class="ww-item"
      :class="[`ww-item--${i % 2}`, `ww-item--${i}`]"
    >
      <div class="ww-item__inner">
        <div class="ww-item__copy">
          <span class="ww-item__num">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3 class="ww-item__title">{{ s.title }}</h3>
          <p class="ww-item__copy-text">{{ s.copy }}</p>
        </div>
        <div class="ww-item__visual" aria-hidden="true">
          <!-- unique visual per section -->
          <div v-if="i === 0" class="ww-problem">
            <div class="ww-problem__line" /><div class="ww-problem__line" /><div class="ww-problem__line" />
            <span class="ww-problem__label">fragmented</span>
            <span class="ww-problem__arrow">→</span>
            <span class="ww-problem__label ww-problem__label--acc">unified</span>
          </div>
          <div v-else-if="i === 1" class="ww-loop">
            <svg viewBox="0 0 100 100" class="ww-loop__svg"><circle cx="50" cy="50" r="38" class="ww-loop__ring" /><circle r="0.5" class="ww-loop__packet" :style="{ offsetPath: `path('M12 50 A38 38 0 1 1 88 50 A38 38 0 1 1 12 50')` }" /></svg>
            <span v-for="(l, k) in ['Observe','Understand','Predict','Coordinate','Improve']" :key="l" class="ww-loop__stage" :style="{ '--a': `${(k / 5) * 360}deg` }">{{ l }}</span>
          </div>
          <div v-else-if="i === 2" class="ww-learn">
            <span v-for="k in 5" :key="k" class="ww-learn__bar" :style="{ animationDelay: `${-k * 0.3}s` }" />
          </div>
          <div v-else-if="i === 3" class="ww-innovate">
            <span v-for="k in ['Vision AI','Digital Twin','AI Agents','Business Cloud','One AI OS']" :key="k" class="ww-innovate__chip">{{ k }}</span>
          </div>
          <div v-else class="ww-collab">
            <span class="ww-collab__node">AI</span><span class="ww-collab__link" /><span class="ww-collab__node">SW</span><span class="ww-collab__link" /><span class="ww-collab__node">Cloud</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.ww { background: #F8FBFF; }
.ww__head { max-width: 760px; margin: 0 auto; padding: var(--space-32) var(--container-pad) var(--space-16); text-align: center; }
.ww__eyebrow { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.ww__title { margin: 0; font-size: clamp(34px, 4.4vw, 56px); font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong); }

.ww-item { position: relative; padding: var(--space-24) 0; border-top: 1px solid rgba(16, 42, 91, 0.08); }
.ww-item--1, .ww-item--3 { background: #F1F6FE; }
.ww-item__inner { max-width: 1180px; margin-inline: auto; padding-inline: var(--container-pad); display: grid; grid-template-columns: 1.1fr 1fr; gap: var(--space-16); align-items: center; }
.ww-item--1 .ww-item__inner, .ww-item--3 .ww-item__inner { direction: rtl; }
.ww-item--1 .ww-item__inner > *, .ww-item--3 .ww-item__inner > * { direction: ltr; }

.ww-item__num { font-family: var(--font-mono); font-size: clamp(40px, 5vw, 72px); font-weight: var(--weight-extrabold); color: rgba(16, 42, 91, 0.12); letter-spacing: -0.03em; line-height: 1; display: block; margin-bottom: var(--space-4); }
.ww-item__title { margin: 0 0 var(--space-5); font-size: clamp(32px, 4vw, 52px); font-weight: var(--weight-extrabold); line-height: 1.05; letter-spacing: -0.025em; color: var(--color-ink-strong); }
.ww-item__copy-text { margin: 0; font-size: clamp(16px, 1.4vw, 19px); line-height: 1.65; color: var(--color-text-secondary); max-width: 44ch; }

.ww-item__visual { min-height: 280px; display: flex; align-items: center; justify-content: center; border-radius: var(--radius-lg); background: #fff; border: 1px solid var(--color-border); overflow: hidden; }

/* visual 0: problem → unified */
.ww-problem { display: flex; align-items: center; gap: 16px; }
.ww-problem__line { width: 60px; height: 3px; border-radius: 999px; background: var(--color-text-faint); opacity: 0.5; }
.ww-problem__label { font-family: var(--font-mono); font-size: 12px; color: var(--color-text-faint); }
.ww-problem__label--acc { color: var(--color-accent); font-weight: var(--weight-bold); }
.ww-problem__arrow { color: var(--color-accent); font-size: 18px; }

/* visual 1: intelligence loop */
.ww-loop { position: relative; width: 240px; height: 240px; }
.ww-loop__svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.ww-loop__ring { fill: none; stroke: rgba(16, 42, 91, 0.12); stroke-width: 0.5; }
.ww-loop__packet { fill: var(--color-accent); animation: ww-flow 4s linear infinite; }
@keyframes ww-flow { from { offset-distance: 0%; } to { offset-distance: 100%; } }
.ww-loop__stage { position: absolute; left: 50%; top: 50%; transform: rotate(var(--a)) translateY(-130px) rotate(calc(-1 * var(--a))); font-size: 10px; font-weight: var(--weight-semibold); color: var(--color-ink-strong); white-space: nowrap; }

/* visual 2: learning bars */
.ww-learn { display: flex; align-items: flex-end; gap: 12px; height: 160px; }
.ww-learn__bar { width: 24px; border-radius: 4px 4px 0 0; background: linear-gradient(var(--color-accent), var(--color-ink-strong)); animation: ww-bar 2.4s ease-in-out infinite alternate; transform-origin: bottom; }
.ww-learn__bar:nth-child(1) { height: 40%; } .ww-learn__bar:nth-child(2) { height: 65%; } .ww-learn__bar:nth-child(3) { height: 50%; } .ww-learn__bar:nth-child(4) { height: 85%; } .ww-learn__bar:nth-child(5) { height: 70%; }
@keyframes ww-bar { 0% { transform: scaleY(0.7); } 100% { transform: scaleY(1); } }

/* visual 3: innovation chips */
.ww-innovate { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; max-width: 320px; }
.ww-innovate__chip { padding: 8px 16px; border-radius: var(--radius-pill); background: var(--color-accent-bg); border: 1px solid rgba(47, 127, 230, 0.25); font-size: 13px; font-weight: var(--weight-semibold); color: var(--color-accent); animation: ww-chip 3s ease-in-out infinite alternate; }
.ww-innovate__chip:nth-child(odd) { animation-delay: -1.5s; }
@keyframes ww-chip { 0% { transform: translateY(0); } 100% { transform: translateY(-4px); } }

/* visual 4: collaboration */
.ww-collab { display: flex; align-items: center; gap: 8px; }
.ww-collab__node { padding: 10px 18px; border-radius: var(--radius-pill); background: var(--color-ink-strong); color: #fff; font-size: 14px; font-weight: var(--weight-bold); }
.ww-collab__link { flex: 1; max-width: 40px; height: 2px; background: repeating-linear-gradient(90deg, var(--color-accent) 0 6px, transparent 6px 12px); animation: ww-flow-link 1.4s linear infinite; }
@keyframes ww-flow-link { to { background-position: 12px 0; } }

@media (max-width: 1024px) { .ww-item__inner { grid-template-columns: 1fr; gap: var(--space-12); } .ww-item--1 .ww-item__inner, .ww-item--3 .ww-item__inner { direction: ltr; } }
@media (prefers-reduced-motion: reduce) { .ww-loop__packet, .ww-learn__bar, .ww-innovate__chip, .ww-collab__link { animation: none; } }
</style>