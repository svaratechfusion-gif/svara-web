<script setup lang="ts">
// 03 SOLUTION — "Engineering The Intelligence Layer."
// The narrative pivot between problem and products: five scattered inputs
// converge into one layer (SVG lines drawn on scroll — the visual answer
// to the Problem section's broken links).
import { onMounted, ref } from 'vue'
import { gsap, ScrollTrigger } from '~~/lib/gsap'
import { ease } from '~~/lib/animation/motion'

const root = ref<HTMLElement>()
const inputs = ['AI', 'Automation', 'Simulation', 'Edge Computing', 'Enterprise Software']

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
      <p v-reveal class="solution__eyebrow">The Solution</p>
      <h2 class="solution__title" data-split>Engineering The Intelligence Layer</h2>
      <p v-reveal="{ delay: 0.08 }" class="solution__sub">SVARA connects AI, automation, simulation, edge computing and enterprise software into one intelligence infrastructure — the layer where fragmented systems become one coordinated whole.</p>

      <div class="solution__diagram" role="img" aria-label="AI, automation, simulation, edge computing and enterprise software converging into one intelligence layer">
        <div class="solution__inputs">
          <span v-for="t in inputs" :key="t" class="solution__chip mono">{{ t }}</span>
        </div>
        <svg viewBox="0 0 1000 150" preserveAspectRatio="none" aria-hidden="true">
          <path class="solution__wire" d="M100 0 C 100 90, 500 40, 500 140" />
          <path class="solution__wire" d="M300 0 C 300 80, 500 50, 500 140" />
          <path class="solution__wire" d="M500 0 C 500 70, 500 70, 500 140" />
          <path class="solution__wire" d="M700 0 C 700 80, 500 50, 500 140" />
          <path class="solution__wire" d="M900 0 C 900 90, 500 40, 500 140" />
        </svg>
        <div class="solution__layer">One Intelligence Infrastructure</div>
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
  margin: 0 0 var(--space-16);
  max-width: var(--paragraph-max);
  font-size: var(--type-body); line-height: var(--leading-body);
  color: var(--color-text-secondary);
}

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
