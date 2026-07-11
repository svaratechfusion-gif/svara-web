<script setup lang="ts">
// 08 METRICS — large numbers, animated count. Nothing else.
// Honest platform-scope numbers (products/industries/capabilities are
// real counts from the content system).
import { onMounted, ref } from 'vue'
import { gsap, ScrollTrigger } from '~~/lib/gsap'

const root = ref<HTMLElement>()
const metrics = [
  { value: 9, suffix: '', label: 'Products, one platform' },
  { value: 12, suffix: '', label: 'Industries served' },
  { value: 5, suffix: '', label: 'Capabilities in one loop' },
  { value: 24, suffix: '/7', label: 'Continuous operation' },
]

onMounted(() => {
  const els = root.value!.querySelectorAll<HTMLElement>('.metrics__value')
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  els.forEach((el, i) => {
    const target = metrics[i].value
    const state = { n: 0 }
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => gsap.to(state, {
        n: target, duration: 1.2, ease: 'power2.out',
        onUpdate: () => { el.textContent = String(Math.round(state.n)) },
      }),
    })
  })
})
</script>

<template>
  <section ref="root" class="metrics">
    <div class="metrics__inner">
      <div v-for="m in metrics" :key="m.label" class="metrics__item">
        <div class="metrics__num">
          <span class="metrics__value">{{ m.value }}</span><span class="metrics__suffix">{{ m.suffix }}</span>
        </div>
        <p class="metrics__label">{{ m.label }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.metrics__inner {
  max-width: var(--container-max);
  margin-inline: auto;
  padding: var(--section-y) var(--container-pad);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--gap-card);
  box-sizing: border-box;
}
.metrics__num {
  font-size: clamp(64px, 8vw, 128px);
  font-weight: var(--weight-extrabold);
  letter-spacing: -0.03em;
  line-height: 1;
  color: var(--color-text);
  font-variant-numeric: tabular-nums;
}
.metrics__suffix { color: var(--color-accent); }
.metrics__label {
  margin: var(--space-4) 0 0;
  font-size: var(--type-small);
  color: var(--color-text-secondary);
}
@media (max-width: 900px) { .metrics__inner { grid-template-columns: repeat(2, 1fr); row-gap: var(--space-16); } }
@media (max-width: 480px) { .metrics__inner { grid-template-columns: 1fr; } }
</style>
