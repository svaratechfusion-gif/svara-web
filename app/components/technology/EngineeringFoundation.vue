<script setup lang="ts">
// ENGINEERING THE FOUNDATION — visual storytelling of the Intelligence
// Loop foundation: Observe → Understand → Reason → Predict → Automate →
// Optimize. Each stage activates as the reader scrolls. Motion
// represents the continuous loop of computation across the foundation.
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { ScrollTrigger } from '~~/lib/gsap'
import { FOUNDATION_STAGES } from '~/utils/technology'

const root = ref<HTMLElement>()
const active = ref(-1)
let st: ScrollTrigger | null = null

// precompute the six stage positions on a ring
const STAGES = FOUNDATION_STAGES.map((stage, i) => {
  const a = (i / FOUNDATION_STAGES.length) * Math.PI * 2 - Math.PI / 2
  return { stage, x: 50 + Math.cos(a) * 40, y: 50 + Math.sin(a) * 40 }
})

const CIRCUMFERENCE = 2 * Math.PI * 40
const RING_PATH = 'M50 50 m0 -40 a40 40 0 1 1 0 80 a40 40 0 1 1 0 -80'
const dash = computed(() => {
  const on = Math.max(0, active.value + 1) / FOUNDATION_STAGES.length * CIRCUMFERENCE
  return `${on} ${CIRCUMFERENCE}`
})

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { active.value = FOUNDATION_STAGES.length - 1; return }
  st = ScrollTrigger.create({
    trigger: root.value!,
    start: 'top 70%',
    end: 'bottom 72%',
    scrub: true,
    onUpdate: (self) => { active.value = Math.floor(self.progress * FOUNDATION_STAGES.length) },
  })
})
onBeforeUnmount(() => { st?.kill() })
</script>

<template>
  <section ref="root" class="ef">
    <div class="ef__head">
      <p class="ef__eyebrow">Engineering The Foundation</p>
      <h2 class="ef__title">One continuous loop of intelligence.</h2>
      <p class="ef__sub">The SVARA technology foundation runs a continuous cycle — observe operational reality, understand it, reason over it, predict what comes next, automate the response, and optimize over time.</p>
    </div>

    <div class="ef__loop">
      <svg class="ef__arc" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <circle cx="50" cy="50" r="40" class="ef__track" />
        <path :d="RING_PATH" class="ef__progress" :style="{ strokeDasharray: dash }" />
      </svg>

      <div
        v-for="(s, i) in STAGES" :key="s.stage"
        class="ef__stage"
        :class="{ 'is-on': active >= i }"
        :style="{ left: s.x + '%', top: s.y + '%' }"
      >
        <span class="ef__dot" />
        <span class="ef__label">{{ s.stage }}</span>
      </div>

      <div class="ef__center">
        <span class="ef__center-label">Intelligence Loop</span>
        <span class="ef__center-stage">{{ active >= 0 ? FOUNDATION_STAGES[Math.min(active, FOUNDATION_STAGES.length - 1)]! : '—' }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ef { background: #F8FBFF; padding: var(--space-32) var(--container-pad); }
.ef__head { max-width: 760px; margin: 0 auto var(--space-20); text-align: center; }
.ef__eyebrow { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.ef__title { margin: 0 0 var(--space-5); font-size: clamp(34px, 4.4vw, 56px); font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong); }
.ef__sub { margin: 0; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }

.ef__loop { position: relative; width: min(560px, 88vw); aspect-ratio: 1; margin: var(--space-16) auto 0; }
.ef__arc { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; transform: rotate(-90deg); }
.ef__track { fill: none; stroke: rgba(16, 42, 91, 0.12); stroke-width: 1; vector-effect: non-scaling-stroke; }
.ef__progress { fill: none; stroke: var(--color-accent); stroke-width: 1.5; vector-effect: non-scaling-stroke; transition: stroke-dasharray 0.1s linear; }

.ef__stage { position: absolute; transform: translate(-50%, -50%); display: flex; flex-direction: column; align-items: center; gap: 8px; opacity: 0.35; transition: opacity var(--motion-medium) var(--ease-smooth); }
.ef__stage.is-on { opacity: 1; }
.ef__dot { width: 14px; height: 14px; border-radius: 50%; background: #fff; border: 2px solid var(--color-border-strong); transition: background var(--motion-medium) var(--ease-out), border-color var(--motion-medium) var(--ease-out), box-shadow var(--motion-medium) var(--ease-out); }
.ef__stage.is-on .ef__dot { background: var(--color-accent); border-color: var(--color-accent); box-shadow: 0 0 0 6px rgba(47, 127, 230, 0.16); }
.ef__label { font-size: 15px; font-weight: var(--weight-semibold); color: var(--color-ink-strong); letter-spacing: -0.01em; }

.ef__center { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); display: flex; flex-direction: column; align-items: center; gap: 6px; text-align: center; padding: 18px 26px; border-radius: var(--radius-pill); background: var(--color-ink-strong); color: #fff; box-shadow: 0 20px 56px rgba(16, 42, 91, 0.22); }
.ef__center-label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.6; }
.ef__center-stage { font-size: 18px; font-weight: var(--weight-semibold); color: #cfe2fb; }

@media (max-width: 768px) {
  .ef__loop { width: 100%; aspect-ratio: auto; display: flex; flex-direction: column; gap: var(--space-5); }
  .ef__arc { display: none; }
  .ef__stage { position: static; transform: none; flex-direction: row; }
  .ef__center { position: static; transform: none; margin-top: var(--space-6); }
}
</style>