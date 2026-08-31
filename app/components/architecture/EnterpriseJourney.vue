<script setup lang="ts">
// ENTERPRISE JOURNEY — animate a complete business workflow from sensor to
// executive decision, ending in continuous learning. As the reader
// scrolls, each stage lights up; the final stage loops back to the first
// to visualize the continuous-learning loop. Motion represents workflow
// execution and continuous learning.
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ScrollTrigger } from '~~/lib/gsap'
import { JOURNEY_STAGES } from '~/utils/architecture'

const root = ref<HTMLElement>()
const active = ref(-1)
let st: ScrollTrigger | null = null

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { active.value = JOURNEY_STAGES.length - 1; return }
  st = ScrollTrigger.create({
    trigger: root.value!, start: 'top 72%', end: 'bottom 78%', scrub: true,
    onUpdate: (self) => { active.value = Math.floor(self.progress * JOURNEY_STAGES.length) },
  })
})
onBeforeUnmount(() => { st?.kill() })
</script>

<template>
  <section ref="root" class="ej">
    <div class="ej__head">
      <p class="ej__eyebrow">Enterprise Journey</p>
      <h2 class="ej__title">From sensor to executive decision — and back.</h2>
      <p class="ej__sub">A complete business workflow runs through the architecture: a sensor captures reality, the intelligence layer interprets and forecasts, an agent decides and acts, Business Cloud synchronizes the result, the executive sees it, and the loop learns for next time.</p>
    </div>

    <div class="ej__flow">
      <div class="ej__rail" :style="{ '--p': (active + 1) / JOURNEY_STAGES.length }" />
      <div
        v-for="(s, i) in JOURNEY_STAGES" :key="s.stage"
        class="ej__stage"
        :class="{ 'is-on': active >= i - 0.3, 'is-last': i === JOURNEY_STAGES.length - 1 }"
      >
        <span class="ej__dot" />
        <span class="ej__stage-name">{{ s.stage }}</span>
        <span class="ej__tag">{{ s.tag }}</span>
      </div>
      <div class="ej__loop" :class="{ 'is-on': active >= JOURNEY_STAGES.length - 1 }">
        <span class="ej__loop-arrow" aria-hidden="true">↺</span>
        <span class="ej__loop-text">continuous learning</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ej { background: #F1F6FE; padding: var(--space-32) var(--container-pad); }
.ej__head { max-width: 760px; margin: 0 auto var(--space-20); text-align: center; }
.ej__eyebrow { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.ej__title { margin: 0 0 var(--space-5); font-size: clamp(34px, 4.4vw, 56px); font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong); }
.ej__sub { margin: 0; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }

.ej__flow { position: relative; max-width: 1180px; margin: var(--space-20) auto 0; display: flex; align-items: flex-start; justify-content: space-between; padding-top: 22px; }
.ej__rail { position: absolute; left: 0; right: 0; top: 22px; height: 2px; background: rgba(16, 42, 91, 0.1); }
.ej__rail::after { content: ""; position: absolute; left: 0; top: 0; height: 100%; width: calc(var(--p, 0) * 100%); background: linear-gradient(90deg, var(--color-accent), var(--color-ink-strong)); transition: width 0.1s linear; }

.ej__stage { position: relative; flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; text-align: center; opacity: 0.35; transition: opacity var(--motion-medium) var(--ease-smooth), transform var(--motion-medium) var(--ease-out); }
.ej__stage.is-on { opacity: 1; }
.ej__stage.is-last.is-on { transform: scale(1.05); }
.ej__dot { position: absolute; top: -22px; width: 14px; height: 14px; border-radius: 50%; background: #fff; border: 2px solid var(--color-border-strong); transition: background var(--motion-medium) var(--ease-out), border-color var(--motion-medium) var(--ease-out), box-shadow var(--motion-medium) var(--ease-out); }
.ej__stage.is-on .ej__dot { background: var(--color-accent); border-color: var(--color-accent); box-shadow: 0 0 0 6px rgba(47, 127, 230, 0.16); }
.ej__stage.is-last.is-on .ej__dot { background: var(--color-ink-strong); border-color: var(--color-ink-strong); }
.ej__stage-name { font-size: 14px; font-weight: var(--weight-semibold); color: var(--color-ink-strong); letter-spacing: -0.01em; }
.ej__tag { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-text-faint); }
.ej__stage.is-last.is-on .ej__stage-name { color: var(--color-accent); font-weight: var(--weight-bold); }

.ej__loop { position: absolute; right: -8px; top: -56px; display: flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: var(--radius-pill); background: transparent; border: 1px dashed var(--color-text-faint); opacity: 0; transform: translateY(8px); transition: opacity var(--motion-medium) var(--ease-smooth), transform var(--motion-medium) var(--ease-out); }
.ej__loop.is-on { opacity: 1; transform: translateY(0); border-color: var(--color-accent); }
.ej__loop-arrow { font-size: 16px; color: var(--color-accent); animation: ej-spin 3s linear infinite; }
@keyframes ej-spin { to { transform: rotate(360deg); } }
.ej__loop-text { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-accent); }

@media (max-width: 768px) {
  .ej__flow { flex-direction: column; gap: var(--space-6); align-items: flex-start; padding-top: 0; }
  .ej__rail { display: none; }
  .ej__stage { flex-direction: row; align-items: center; gap: 10px; text-align: left; }
  .ej__dot { position: static; }
  .ej__loop { position: static; margin-top: var(--space-6); }
}
@media (prefers-reduced-motion: reduce) { .ej__loop-arrow { animation: none; } }
</style>