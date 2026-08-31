<script setup lang="ts">
// ENTERPRISE OUTCOMES — large editorial sequence:
// Observe → Understand → Predict → Automate → Optimize → Grow.
// Subtle animation with supporting metrics from the selected industry's
// ROI data (verbatim from the Content Bible — no fake metrics).
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { ScrollTrigger } from '~~/lib/gsap'
import { OUTCOMES, INDUSTRIES } from '~/utils/industries-page'

const root = ref<HTMLElement>()
const active = ref(-1)
const indIndex = ref(0)
let st: ScrollTrigger | null = null

const selected = computed(() => INDUSTRIES[indIndex.value]!)

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { active.value = OUTCOMES.length - 1; return }
  st = ScrollTrigger.create({ trigger: root.value!, start: 'top 72%', end: 'bottom 78%', scrub: true, onUpdate: (self) => { active.value = Math.floor(self.progress * OUTCOMES.length) } })
})
onBeforeUnmount(() => { st?.kill() })
</script>

<template>
  <section ref="root" class="eo">
    <div class="eo__head">
      <p class="eo__eyebrow">Enterprise Outcomes</p>
      <h2 class="eo__title">From observation to growth — one continuous loop.</h2>
    </div>

    <div class="eo__selector">
      <button v-for="(ind, i) in INDUSTRIES" :key="ind.name" class="eo__chip" :class="{ 'is-on': indIndex === i }" @click="indIndex = i">{{ ind.name }}</button>
    </div>

    <ol class="eo__seq" role="list">
      <li v-for="(o, i) in OUTCOMES" :key="o" class="eo__item" :class="{ 'is-on': active >= i - 0.3 }">
        <span class="eo__num">{{ String(i + 1).padStart(2, '0') }}</span>
        <span class="eo__word">{{ o }}</span>
      </li>
    </ol>

    <div :key="selected.name" class="eo__metrics">
      <div v-for="m in selected.roiMetrics" :key="m.label" class="eo__metric">
        <span class="eo__ml">{{ m.label }}</span>
        <span class="eo__mv">{{ m.value }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.eo { background: #F8FBFF; padding: var(--space-32) var(--container-pad); }
.eo__head { max-width: 760px; margin: 0 auto var(--space-12); text-align: center; }
.eo__eyebrow { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.eo__title { margin: 0; font-size: clamp(34px, 4.4vw, 56px); font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong); }

.eo__selector { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; max-width: 1000px; margin: 0 auto var(--space-16); }
.eo__chip { padding: 7px 14px; border-radius: var(--radius-pill); background: transparent; border: 1px solid var(--color-border); font-size: 12px; font-weight: var(--weight-medium); color: var(--color-text-secondary); cursor: pointer; transition: all var(--motion-medium) var(--ease-smooth); }
.eo__chip:hover { border-color: var(--color-accent); color: var(--color-ink-strong); }
.eo__chip.is-on { background: var(--color-ink-strong); color: #fff; border-color: var(--color-ink-strong); }

.eo__seq { list-style: none; margin: 0 auto; padding: 0; max-width: 1000px; display: flex; flex-direction: column; }
.eo__item { display: flex; align-items: baseline; gap: var(--space-6); padding: var(--space-6) 0; border-top: 1px solid rgba(16, 42, 91, 0.1); opacity: 0.35; transition: opacity var(--motion-medium) var(--ease-smooth); }
.eo__item:last-child { border-bottom: 1px solid rgba(16, 42, 91, 0.1); }
.eo__item.is-on { opacity: 1; }
.eo__num { font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: 0.1em; color: var(--color-text-faint); width: 32px; flex-shrink: 0; }
.eo__word { font-size: clamp(32px, 5.5vw, 80px); font-weight: var(--weight-extrabold); letter-spacing: -0.03em; line-height: 1; color: var(--color-ink-strong); }
.eo__item:nth-child(even).is-on .eo__word { color: var(--color-accent); }

.eo__metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: var(--space-6); max-width: 1000px; margin: var(--space-16) auto 0; }
.eo__metric { padding: var(--space-6); border-radius: var(--radius-md); background: #F1F6FE; border: 1px solid var(--color-border); text-align: center; }
.eo__ml { display: block; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-text-faint); margin-bottom: 6px; }
.eo__mv { display: block; font-size: 22px; font-weight: var(--weight-extrabold); color: var(--color-ink-strong); letter-spacing: -0.02em; }
</style>