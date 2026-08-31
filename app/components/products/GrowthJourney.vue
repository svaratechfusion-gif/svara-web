<script setup lang="ts">
// GROWTH JOURNEY — visualizes modular adoption: start with one platform,
// expand into the full ecosystem, and show intelligence compounding over
// time. As the reader scrolls, platforms light up one-by-one along a
// timeline while an "intelligence compound" curve rises — adoption is not
// linear; each platform adds to a shared intelligence that improves all
// the others. Messaging verbatim from the Content Bible (homeSection06
// "Modular Adoption" reason).
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ScrollTrigger } from '~~/lib/gsap'
import { PLATFORMS } from '~/utils/platforms'
import { homeSection06 } from '~~/lib/content/home'

const root = ref<HTMLElement>()
const progress = ref(0) // 0..1 — how far along the adoption timeline

const adoptCopy = homeSection06.reasons.find((r) => r.title === 'Modular Adoption')?.description ?? ''

let st: ScrollTrigger | null = null

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    progress.value = 1
    return
  }
  st = ScrollTrigger.create({
    trigger: root.value!,
    start: 'top 70%',
    end: 'bottom 80%',
    scrub: true,
    onUpdate: (self) => { progress.value = self.progress },
  })
})
onBeforeUnmount(() => { st?.kill() })

// nodes laid along a horizontal timeline
const STEPS = PLATFORMS.map((p, i) => ({ i, name: p.name, x: (i / (PLATFORMS.length - 1)) * 100 }))

// compound intelligence curve points (relative to progress)
const curve = () => {
  const pts = STEPS.map((s) => {
    const reached = Math.min(1, Math.max(0, (progress.value * PLATFORMS.length) - s.i))
    // exponential compounding: each step lifts the curve more
    const y = 100 - (Math.pow(reached, 1.4) * (1 + s.i * 0.05)) * 88
    return `${s.x},${y}`
  })
  return `M${pts.join(' L')}`
}
</script>

<template>
  <section ref="root" class="gj">
    <div class="gj__head">
      <p class="gj__eyebrow">Growth Journey</p>
      <h2 class="gj__title">Start with one. Grow into the ecosystem.</h2>
      <p class="gj__sub">{{ adoptCopy }}</p>
    </div>

    <div class="gj__viz">
      <svg class="gj__curve" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path :d="curve()" class="gj__path" />
        <path :d="curve()" class="gj__path-glow" />
      </svg>
      <div class="gj__baseline" />
      <div class="gj__nodes">
        <div
          v-for="s in STEPS" :key="s.i"
          class="gj__node"
          :class="{ 'is-on': progress * PLATFORMS.length > s.i }"
          :style="{ left: s.x + '%' }"
        >
          <span class="gj__node-dot" />
          <span class="gj__node-name">{{ s.name }}</span>
        </div>
      </div>

      <div class="gj__readouts">
        <div class="gj__readout">
          <span class="gj__ro-label">Platforms Adopted</span>
          <span class="gj__ro-value">{{ Math.min(PLATFORMS.length, Math.floor(progress * PLATFORMS.length) + 1) }} / {{ PLATFORMS.length }}</span>
        </div>
        <div class="gj__readout">
          <span class="gj__ro-label">Ecosystem Intelligence</span>
          <span class="gj__ro-value">compounding</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gj {
  background: #F8FBFF;
  padding: var(--space-32) var(--container-pad);
}
.gj__head { max-width: 760px; margin: 0 auto var(--space-20); text-align: center; }
.gj__eyebrow {
  margin: 0 0 var(--space-4);
  font-family: var(--font-mono); font-size: var(--type-label);
  letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent);
}
.gj__title {
  margin: 0;
  font-size: clamp(34px, 4.4vw, 56px);
  font-weight: var(--weight-bold); line-height: 1.1;
  letter-spacing: -0.02em; color: var(--color-ink-strong);
}
.gj__sub { margin: var(--space-5) 0 0; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }

.gj__viz {
  position: relative;
  width: 100%;
  max-width: 1180px;
  margin: var(--space-20) auto 0;
  height: 320px;
}
.gj__curve { position: absolute; inset: 0; width: 100%; height: 100%; }
.gj__path { fill: none; stroke: var(--color-accent); stroke-width: 1; vector-effect: non-scaling-stroke; }
.gj__path-glow { fill: none; stroke: var(--color-accent); stroke-width: 4; vector-effect: non-scaling-stroke; opacity: 0.18; }
.gj__baseline { position: absolute; left: 0; right: 0; bottom: 78px; height: 1px; background: rgba(16, 42, 91, 0.12); }

.gj__nodes { position: absolute; left: 0; right: 0; bottom: 78px; transform: translateY(50%); }
.gj__node {
  position: absolute; bottom: 0; transform: translate(-50%, 50%);
  display: flex; flex-direction: column; align-items: center; gap: 10px;
}
.gj__node-dot {
  width: 14px; height: 14px; border-radius: 50%;
  background: #fff; border: 2px solid var(--color-border-strong);
  transition: background var(--motion-medium) var(--ease-out), border-color var(--motion-medium) var(--ease-out), box-shadow var(--motion-medium) var(--ease-out);
}
.gj__node.is-on .gj__node-dot {
  background: var(--color-accent); border-color: var(--color-accent);
  box-shadow: 0 0 0 6px rgba(47, 127, 230, 0.16);
}
.gj__node-name {
  font-size: 11px; font-weight: var(--weight-medium); color: var(--color-text-faint);
  white-space: nowrap;
  transition: color var(--motion-medium) var(--ease-smooth);
}
.gj__node.is-on .gj__node-name { color: var(--color-ink-strong); }

.gj__readouts {
  display: flex; gap: var(--space-12); justify-content: center; margin-top: var(--space-12);
}
.gj__readout { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.gj__ro-label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-text-faint); }
.gj__ro-value { font-size: 26px; font-weight: var(--weight-extrabold); letter-spacing: -0.02em; color: var(--color-ink-strong); }

@media (max-width: 768px) {
  .gj__viz { height: auto; }
  .gj__curve, .gj__baseline { display: none; }
  .gj__nodes { position: static; display: flex; flex-direction: column; gap: var(--space-4); transform: none; }
  .gj__node { position: static; transform: none; flex-direction: row; }
}
@media (prefers-reduced-motion: reduce) {
  .gj__node-dot { transition: none; }
}
</style>