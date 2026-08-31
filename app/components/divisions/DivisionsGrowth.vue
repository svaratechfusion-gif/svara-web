<script setup lang="ts">
// ENTERPRISE GROWTH JOURNEY — visualize modular adoption across the SVARA
// divisions: One Division → Multiple Divisions → Connected Enterprise →
// Continuous Innovation. As the reader scrolls, each stage fills with
// intelligence and the curve compounds — adoption is not linear; each
// division adds to a shared intelligence that strengthens the others.
// Motion represents collaboration and continuous innovation.
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ScrollTrigger } from '~~/lib/gsap'
import { GROWTH_STAGES } from '~/utils/divisions'

const root = ref<HTMLElement>()
const progress = ref(0)
let st: ScrollTrigger | null = null

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { progress.value = 1; return }
  st = ScrollTrigger.create({
    trigger: root.value!,
    start: 'top 72%',
    end: 'bottom 78%',
    scrub: true,
    onUpdate: (self) => { progress.value = self.progress },
  })
})
onBeforeUnmount(() => { st?.kill() })

const reached = (i: number) => progress.value * GROWTH_STAGES.length > i

// compounding curve points relative to progress
const curvePath = () => {
  const n = GROWTH_STAGES.length
  const pts = GROWTH_STAGES.map((_, i) => {
    const x = (i / (n - 1)) * 100
    const reached = Math.min(1, Math.max(0, progress.value * n - i))
    const y = 100 - Math.pow(reached, 1.3) * (1 + i * 0.08) * 88
    return `${x},${y}`
  })
  return `M${pts.join(' L')}`
}
</script>

<template>
  <section ref="root" class="dg">
    <div class="dg__head">
      <p class="dg__eyebrow">Enterprise Growth Journey</p>
      <h2 class="dg__title">Start with one division. Grow into the ecosystem.</h2>
      <p class="dg__sub">Each division you adopt compounds the intelligence of the others — modular today, a connected enterprise tomorrow.</p>
    </div>

    <div class="dg__viz">
      <svg class="dg__curve" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path :d="curvePath()" class="dg__path" />
        <path :d="curvePath()" class="dg__path-glow" />
      </svg>
      <div class="dg__baseline" />
      <div class="dg__stages">
        <div
          v-for="(s, i) in GROWTH_STAGES" :key="s"
          class="dg__node"
          :class="{ 'is-on': reached(i) }"
          :style="{ left: (i / (GROWTH_STAGES.length - 1)) * 100 + '%' }"
        >
          <span class="dg__dot" />
          <span class="dg__name">{{ s }}</span>
        </div>
      </div>
      <div class="dg__readout">
        <span class="dg__rl">Stage</span>
        <span class="dg__rv">{{ Math.min(GROWTH_STAGES.length, Math.floor(progress * GROWTH_STAGES.length) + 1) }} / {{ GROWTH_STAGES.length }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dg { background: #F8FBFF; padding: var(--space-32) var(--container-pad); }
.dg__head { max-width: 760px; margin: 0 auto var(--space-20); text-align: center; }
.dg__eyebrow {
  margin: 0 0 var(--space-4);
  font-family: var(--font-mono); font-size: var(--type-label);
  letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent);
}
.dg__title {
  margin: 0 0 var(--space-5);
  font-size: clamp(34px, 4.4vw, 56px);
  font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong);
}
.dg__sub { margin: 0; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }

.dg__viz { position: relative; width: 100%; max-width: 1100px; margin: var(--space-20) auto 0; height: 340px; }
.dg__curve { position: absolute; inset: 0; width: 100%; height: 100%; }
.dg__path { fill: none; stroke: var(--color-accent); stroke-width: 1; vector-effect: non-scaling-stroke; }
.dg__path-glow { fill: none; stroke: var(--color-accent); stroke-width: 4; vector-effect: non-scaling-stroke; opacity: 0.16; }
.dg__baseline { position: absolute; left: 0; right: 0; bottom: 90px; height: 1px; background: rgba(16, 42, 91, 0.12); }
.dg__stages { position: absolute; left: 0; right: 0; bottom: 90px; transform: translateY(50%); }
.dg__node { position: absolute; bottom: 0; transform: translate(-50%, 50%); display: flex; flex-direction: column; align-items: center; gap: 10px; }
.dg__dot { width: 16px; height: 16px; border-radius: 50%; background: #fff; border: 2px solid var(--color-border-strong); transition: background var(--motion-medium) var(--ease-out), border-color var(--motion-medium) var(--ease-out), box-shadow var(--motion-medium) var(--ease-out); }
.dg__node.is-on .dg__dot { background: var(--color-accent); border-color: var(--color-accent); box-shadow: 0 0 0 6px rgba(47, 127, 230, 0.16); }
.dg__name { font-size: 12.5px; font-weight: var(--weight-semibold); color: var(--color-text-faint); white-space: nowrap; transition: color var(--motion-medium) var(--ease-smooth); }
.dg__node.is-on .dg__name { color: var(--color-ink-strong); }

.dg__readout { display: flex; flex-direction: column; align-items: center; gap: 4px; margin-top: var(--space-12); }
.dg__rl { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-text-faint); }
.dg__rv { font-size: 28px; font-weight: var(--weight-extrabold); letter-spacing: -0.02em; color: var(--color-ink-strong); }

@media (max-width: 768px) {
  .dg__viz { height: auto; }
  .dg__curve, .dg__baseline { display: none; }
  .dg__stages { position: static; display: flex; flex-direction: column; gap: var(--space-5); transform: none; }
  .dg__node { position: static; transform: none; flex-direction: row; }
}
</style>