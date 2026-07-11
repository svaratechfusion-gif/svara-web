<script setup lang="ts">
// 03 SOLUTION — "Engineering The Intelligence Layer."
// The narrative pivot between problem and products: five scattered inputs
// converge into one layer (SVG lines drawn on scroll — the visual answer
// to the Problem section's broken links).
import { onMounted, ref } from 'vue'
import { gsap, ScrollTrigger } from '~~/lib/gsap'
import { ease } from '~~/lib/animation/motion'
import { homeSection02 } from '~~/lib/content/home'

const root = ref<HTMLElement>()
const inputs = homeSection02.sources
const wires = inputs.map((_, i) => {
  const x = Math.round(70 + (860 / (inputs.length - 1)) * i)
  return `M${x} 0 C ${x} 85, 500 45, 500 140`
})

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const paths = root.value!.querySelectorAll<SVGPathElement>('.solution__wire')
  paths.forEach((p) => {
    const len = p.getTotalLength()
    gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
  })
  ScrollTrigger.create({
    trigger: root.value!,
    start: 'top 70%',
    once: true,
    onEnter: () => {
      gsap.to(paths, { strokeDashoffset: 0, duration: 1.2, ease: ease.out, stagger: 0.12 })
      gsap.fromTo(root.value!.querySelector('.solution__layer'),
        { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7, ease: ease.out, delay: 0.7 })
    },
  })
})
</script>

<template>
  <section ref="root" class="solution">
    <div class="solution__inner">
      <p v-reveal class="solution__eyebrow">Section 02</p>
      <h2 class="solution__title" data-split>{{ homeSection02.title }}</h2>
      <p v-for="(p, i) in homeSection02.paragraphs" :key="i" v-reveal="{ delay: 0.08 + i * 0.05 }" class="solution__sub">{{ p }}</p>

      <div class="solution__diagram" role="img" :aria-label="`${inputs.join(', ')} converging into ${homeSection02.convergeLabel}`">
        <div class="solution__inputs">
          <span v-for="t in inputs" :key="t" class="solution__chip mono">{{ t }}</span>
        </div>
        <svg viewBox="0 0 1000 150" preserveAspectRatio="none" aria-hidden="true">
          <path v-for="(d, i) in wires" :key="i" class="solution__wire" :d="d" />
        </svg>
        <div class="solution__layer">{{ homeSection02.convergeLabel }}</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.solution__inner {
  max-width: var(--container-max);
  margin-inline: auto;
  padding: var(--section-y) var(--container-pad);
  box-sizing: border-box;
}
.solution__eyebrow {
  margin: 0 0 var(--space-6);
  font-family: var(--font-mono); font-size: var(--type-label);
  letter-spacing: var(--tracking-label); text-transform: uppercase;
  color: var(--color-accent);
}
.solution__title {
  margin: 0 0 var(--space-6);
  max-width: 16ch;
  font-size: clamp(38px, 5vw, 76px);
  font-weight: var(--weight-bold); line-height: 1.08; letter-spacing: -0.02em;
  color: var(--color-text); text-wrap: balance;
}
.solution__sub {
  margin: 0 0 var(--space-6);
  max-width: var(--paragraph-max);
  font-size: var(--type-body); line-height: var(--leading-body);
  color: var(--color-text-secondary);
}
.solution__sub:last-of-type { margin-bottom: var(--space-16); }

.solution__inputs {
  display: flex;
  justify-content: space-between;
  gap: var(--space-4);
  flex-wrap: wrap;
}
.solution__chip {
  font-family: var(--font-mono);
  font-size: var(--type-label);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-text);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  padding: var(--space-3) var(--space-6);
}
.solution__diagram svg { display: block; width: 100%; height: 130px; }
.solution__wire {
  fill: none;
  stroke: var(--color-accent);
  stroke-width: 1.5;
  opacity: 0.6;
}
.solution__layer {
  margin-inline: auto;
  width: fit-content;
  padding: var(--space-4) var(--space-10);
  border-radius: var(--radius-pill);
  background: var(--color-text);
  color: var(--color-inverse);
  font-size: var(--type-small);
  font-weight: var(--weight-semibold);
}

@media (max-width: 700px) {
  .solution__inputs { justify-content: flex-start; }
  .solution__diagram svg { height: 90px; }
}
</style>
