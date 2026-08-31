<script setup lang="ts">
// ECOSYSTEM · Business Outcomes — large typography, revealed sequentially on
// scroll. These six outcome lines are the directed copy for this section.
import { onMounted, ref } from 'vue'
import { gsap, ScrollTrigger } from '~~/lib/gsap'
import { ease } from '~~/lib/animation/motion'

const outcomes = [
  'Better Operational Visibility',
  'Faster Decision-Making',
  'Reduced Complexity',
  'Intelligent Automation',
  'Scalable Enterprise Transformation',
  'Future-Ready Infrastructure',
]
const root = ref<HTMLElement>()
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const items = root.value!.querySelectorAll<HTMLElement>('.eout__item')
  gsap.set(items, { opacity: 0.12, y: 20 })
  items.forEach((el) => {
    ScrollTrigger.create({
      trigger: el, start: 'top 82%', once: true,
      onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.7, ease: ease.out }),
    })
  })
})
</script>

<template>
  <section ref="root" class="eout">
    <div class="eout__inner">
      <p v-reveal class="eout__eyebrow">Business Outcomes</p>
      <ol class="eout__list">
        <li v-for="(o, i) in outcomes" :key="o" class="eout__item">
          <span class="eout__index">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="eout__label">{{ o }}</span>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.eout { padding-block: var(--section-y); }
.eout__inner { max-width: 1200px; margin-inline: auto; padding-inline: var(--container-pad); box-sizing: border-box; }
.eout__eyebrow {
  margin: 0 0 var(--space-12); font-family: var(--font-mono); font-size: var(--type-label);
  letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent);
}
.eout__list { list-style: none; margin: 0; padding: 0; }
.eout__item {
  display: flex; align-items: baseline; gap: var(--space-8);
  padding: var(--space-6) 0; border-top: 1px solid var(--color-border);
}
.eout__item:last-child { border-bottom: 1px solid var(--color-border); }
.eout__index {
  flex-shrink: 0; font-family: var(--font-mono); font-size: var(--type-small);
  color: var(--color-accent); letter-spacing: 0.04em; padding-top: 0.4em;
}
.eout__label {
  font-size: clamp(28px, 4.6vw, 64px); font-weight: var(--weight-bold);
  line-height: 1.06; letter-spacing: -0.02em; color: #0d1b3e; text-wrap: balance;
}
@media (max-width: 620px) {
  .eout__item { gap: var(--space-5); }
}
</style>
