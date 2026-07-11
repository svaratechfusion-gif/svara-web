<script setup lang="ts">
// 06 ARCHITECTURE — the engineering blueprint: how data becomes outcomes.
// Five stages, left→right, joined by animated flow lines drawn on scroll
// with a traveling pulse. No marketing graphics — mono labels, hairlines,
// blueprint register.
import { onMounted, ref } from 'vue'
import { gsap, ScrollTrigger } from '~~/lib/gsap'
import { ease } from '~~/lib/animation/motion'

const root = ref<HTMLElement>()

const stages = [
  { id: 'in', label: 'Data In', sub: 'Cameras · Sensors · ERP · IoT' },
  { id: 'ai', label: 'AI Processing', sub: 'Vision · Models · Inference' },
  { id: 'decide', label: 'Decision Layer', sub: 'Reasoning · Prediction' },
  { id: 'auto', label: 'Automation Layer', sub: 'Agents · Workflows' },
  { id: 'out', label: 'Business Outcomes', sub: 'Coordinated · Measured' },
]

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const wires = root.value!.querySelectorAll<SVGPathElement>('.arch__wire')
  const pulses = root.value!.querySelectorAll<SVGCircleElement>('.arch__pulse')
  wires.forEach((w) => {
    const len = w.getTotalLength()
    gsap.set(w, { strokeDasharray: len, strokeDashoffset: len })
  })
  ScrollTrigger.create({
    trigger: root.value!,
    start: 'top 68%',
    once: true,
    onEnter: () => {
      gsap.to(wires, { strokeDashoffset: 0, duration: 0.9, ease: ease.out, stagger: 0.14 })
      gsap.fromTo(root.value!.querySelectorAll('.arch__stage'),
        { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: ease.out, stagger: 0.14 })
      // traveling pulses along each wire (repeats — the "flow")
      pulses.forEach((p, i) => {
        gsap.fromTo(p, { attr: { cx: i * 25 } }, {
          attr: { cx: i * 25 + 25 }, duration: 1.6, ease: 'none', repeat: -1, delay: 1 + i * 0.2,
        })
      })
    },
  })
})
</script>

<template>
  <section ref="root" class="arch">
    <div class="arch__inner">
      <div v-reveal class="arch__head">
        <p class="arch__eyebrow">Architecture</p>
        <h2 class="arch__title" data-split>From raw signal to business outcome.</h2>
      </div>

      <div class="arch__flow" role="img" aria-label="Data In flows to AI Processing, then the Decision Layer, then the Automation Layer, producing Business Outcomes">
        <svg class="arch__wires" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
          <path class="arch__wire" d="M10 5 H 30" />
          <path class="arch__wire" d="M35 5 H 55" />
          <path class="arch__wire" d="M60 5 H 80" />
          <path class="arch__wire" d="M85 5 H 100" transform="translate(-15,0)" />
          <circle v-for="i in 4" :key="i" class="arch__pulse" :cx="(i - 1) * 25" cy="5" r="0.8" />
        </svg>

        <ol class="arch__stages">
          <li v-for="(s, i) in stages" :key="s.id" class="arch__stage">
            <span class="arch__index mono">0{{ i + 1 }}</span>
            <span class="arch__node" />
            <span class="arch__label">{{ s.label }}</span>
            <span class="arch__sub mono">{{ s.sub }}</span>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped>
.arch__inner {
  max-width: var(--container-max);
  margin-inline: auto;
  padding: var(--section-y) var(--container-pad);
  box-sizing: border-box;
}
.arch__eyebrow {
  margin: 0 0 var(--space-6);
  font-family: var(--font-mono); font-size: var(--type-label);
  letter-spacing: var(--tracking-label); text-transform: uppercase;
  color: var(--color-accent);
}
.arch__title {
  margin: 0 0 var(--space-20);
  font-size: clamp(34px, 4.4vw, 64px);
  font-weight: var(--weight-bold); line-height: 1.12; letter-spacing: -0.02em;
  color: var(--color-text); text-wrap: balance;
}

.arch__flow { position: relative; }
.arch__wires {
  position: absolute;
  top: 34px; left: 0; right: 0;
  width: 100%; height: 10px;
}
.arch__wire {
  fill: none;
  stroke: var(--color-accent);
  stroke-width: 1.5px;
  vector-effect: non-scaling-stroke;
  opacity: 0.6;
}
.arch__pulse { fill: var(--color-accent); }

.arch__stages {
  list-style: none; margin: 0; padding: 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--space-4);
}
.arch__stage {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-2);
}
.arch__index { color: var(--color-text-faint); font-size: var(--type-label); letter-spacing: var(--tracking-label); }
.arch__node {
  width: 16px; height: 16px; border-radius: 50%;
  background: var(--color-bg);
  border: 2px solid var(--color-accent);
  box-shadow: var(--shadow-soft);
  margin: var(--space-2) 0;
}
.arch__label {
  font-size: 18px; font-weight: var(--weight-semibold);
  letter-spacing: -0.01em; color: var(--color-text);
}
.arch__sub {
  font-family: var(--font-mono); font-size: var(--type-label);
  letter-spacing: 0.04em; color: var(--color-text-secondary);
}

@media (max-width: 860px) {
  .arch__wires { display: none; }
  .arch__stages { grid-template-columns: 1fr; gap: var(--space-8); }
  .arch__stage {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-areas: 'node label' 'node sub';
    column-gap: var(--space-6); align-items: center;
    border-left: 1px solid var(--color-border);
    padding-left: var(--space-6);
  }
  .arch__index { display: none; }
  .arch__node { grid-area: node; margin: 0; }
  .arch__label { grid-area: label; }
  .arch__sub { grid-area: sub; }
}
</style>
