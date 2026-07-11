<script setup lang="ts">
// 07 TECHNOLOGY — the Intelligence Loop as a large architecture diagram.
// Animated SVG connection lines (stroke draw on scroll), minimal labels.
import { onMounted, ref } from 'vue'
import { gsap, ScrollTrigger } from '~~/lib/gsap'
import { ease } from '~~/lib/animation/motion'

const root = ref<HTMLElement>()
const stages = ['Observe', 'Understand', 'Predict', 'Coordinate', 'Improve']

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const paths = root.value!.querySelectorAll<SVGPathElement>('.tech__wire')
  paths.forEach((p) => {
    const len = p.getTotalLength()
    gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
  })
  ScrollTrigger.create({
    trigger: root.value!,
    start: 'top 70%',
    once: true,
    onEnter: () => {
      gsap.to(paths, { strokeDashoffset: 0, duration: 1.4, ease: ease.out, stagger: 0.18 })
      gsap.fromTo(root.value!.querySelectorAll('.tech__node'),
        { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, ease: ease.out, stagger: 0.12 })
    },
  })
})
</script>

<template>
  <section ref="root" class="tech">
    <div class="tech__inner">
      <div v-reveal class="tech__head">
        <p class="tech__eyebrow">Technology</p>
        <h2 class="tech__title">The Intelligence Loop</h2>
        <p class="tech__sub">Five capabilities, one closed loop — every signal becomes understanding, prediction, action, and learning.</p>
      </div>

      <div class="tech__diagram" role="img" aria-label="The Intelligence Loop: Observe, Understand, Predict, Coordinate, Improve — connected in a continuous cycle">
        <svg viewBox="0 0 1000 240" fill="none" preserveAspectRatio="xMidYMid meet">
          <!-- wires -->
          <path class="tech__wire" d="M118 120 H 298" />
          <path class="tech__wire" d="M338 120 H 518" />
          <path class="tech__wire" d="M558 120 H 738" />
          <path class="tech__wire" d="M778 120 H 958" />
          <!-- return loop -->
          <path class="tech__wire tech__wire--return" d="M958 140 C 958 215, 42 215, 42 140 L 42 128" />
        </svg>
        <div class="tech__nodes">
          <div v-for="s in stages" :key="s" class="tech__node">
            <span class="tech__dot" />
            <span class="tech__label mono">{{ s }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tech { background: var(--color-surface); border-block: 1px solid var(--color-border); }
.tech__inner {
  max-width: var(--container-max);
  margin-inline: auto;
  padding: var(--section-y) var(--container-pad);
  box-sizing: border-box;
}
.tech__eyebrow {
  margin: 0 0 var(--space-6);
  font-family: var(--font-mono); font-size: var(--type-label);
  letter-spacing: var(--tracking-label); text-transform: uppercase;
  color: var(--color-accent);
}
.tech__title {
  margin: 0 0 var(--space-4);
  font-size: clamp(34px, 4.4vw, 64px);
  font-weight: var(--weight-bold); letter-spacing: -0.02em; line-height: 1.12;
  color: var(--color-text);
}
.tech__sub {
  margin: 0 0 var(--space-16);
  max-width: var(--paragraph-max);
  font-size: var(--type-body); line-height: var(--leading-body);
  color: var(--color-text-secondary);
}

.tech__diagram { position: relative; }
.tech__diagram svg { width: 100%; height: auto; display: block; }
.tech__wire {
  stroke: var(--color-accent);
  stroke-width: 1.5;
  opacity: 0.7;
}
.tech__wire--return { opacity: 0.35; stroke-dasharray: none; }

.tech__nodes {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
}
.tech__node { display: flex; flex-direction: column; align-items: center; gap: var(--space-3); width: 80px; }
.tech__dot {
  width: 14px; height: 14px; border-radius: 50%;
  background: var(--color-bg);
  border: 2px solid var(--color-accent);
  box-shadow: var(--shadow-soft);
}
.tech__label {
  font-family: var(--font-mono); font-size: var(--type-label);
  letter-spacing: var(--tracking-label); text-transform: uppercase;
  color: var(--color-text);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  padding: 4px 10px;
  white-space: nowrap;
}

@media (max-width: 640px) {
  .tech__label { font-size: 10px; padding: 3px 7px; }
}
</style>
