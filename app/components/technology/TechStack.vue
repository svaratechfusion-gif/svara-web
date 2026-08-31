<script setup lang="ts">
// TECHNOLOGY STACK — a layered architecture: Applications → Enterprise
// Software → AI Models → Data Layer → Cloud → Infrastructure → Hardware.
// Replaces technology logos with one stacked foundation. Each layer
// lights up as it enters the viewport; the stack reads bottom-up as the
// physical foundation, top-down as the application surface. Layer names
// are factual architecture-layer names from the Content Bible.
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { gsap, ScrollTrigger } from '~~/lib/gsap'
import { TECH_STACK } from '~/utils/technology'

const root = ref<HTMLElement>()
const triggers: ScrollTrigger[] = []

// display stack bottom-up (Hardware at bottom, Applications at top)
const STACK = [...TECH_STACK].reverse()

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  gsap.set('.st-layer', { opacity: 0, x: -24 })
  triggers.push(ScrollTrigger.create({
    trigger: root.value!, start: 'top 65%', once: true,
    onEnter: () => gsap.to('.st-layer', { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08 }),
  }))
})
onBeforeUnmount(() => { triggers.forEach(t => t.kill()) })
</script>

<template>
  <section ref="root" class="st">
    <div class="st__head">
      <p class="st__eyebrow">Technology Stack</p>
      <h2 class="st__title">One stacked foundation, top to silicon.</h2>
      <p class="st__sub">Every SVARA capability rests on the same layered architecture — from the hardware that senses the world up to the applications people use. No stitched-together logos; one coherent stack.</p>
    </div>

    <div class="st__stack">
      <div
        v-for="(layer, i) in STACK" :key="layer"
        class="st-layer"
        :class="{ 'st-layer--top': i === STACK.length - 1, 'st-layer--base': i === 0 }"
      >
        <span class="st-layer__num">{{ String(STACK.length - i).padStart(2, '0') }}</span>
        <span class="st-layer__name">{{ layer }}</span>
        <span class="st-layer__bar" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.st { background: #F1F6FE; padding: var(--space-32) var(--container-pad); }
.st__head { max-width: 760px; margin: 0 auto var(--space-20); text-align: center; }
.st__eyebrow { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.st__title { margin: 0 0 var(--space-5); font-size: clamp(34px, 4.4vw, 56px); font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong); }
.st__sub { margin: 0; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }

.st__stack { max-width: 640px; margin: var(--space-20) auto 0; display: flex; flex-direction: column; gap: 6px; }
.st-layer { position: relative; display: flex; align-items: center; gap: var(--space-5); padding: 18px 24px; background: #fff; border: 1px solid var(--color-border); border-radius: var(--radius-md); box-shadow: 0 4px 14px rgba(16, 42, 91, 0.04); transition: border-color var(--motion-medium) var(--ease-smooth), box-shadow var(--motion-medium) var(--ease-smooth); }
.st-layer:hover, .st-layer:focus-visible { border-color: var(--color-accent); box-shadow: 0 8px 24px rgba(16, 42, 91, 0.1); }
.st-layer--top { background: var(--color-ink-strong); color: #fff; border-color: var(--color-ink-strong); }
.st-layer--top .st-layer__num { color: rgba(255, 255, 255, 0.5); }
.st-layer--base { background: var(--color-accent); color: #fff; border-color: var(--color-accent); }
.st-layer--base .st-layer__num { color: rgba(255, 255, 255, 0.6); }
.st-layer__num { font-family: var(--font-mono); font-size: 12px; color: var(--color-text-faint); letter-spacing: 0.08em; width: 24px; }
.st-layer__name { flex: 1; font-size: clamp(18px, 2vw, 26px); font-weight: var(--weight-bold); letter-spacing: -0.01em; }
.st-layer__bar { width: 60px; height: 4px; border-radius: 999px; background: var(--color-accent); opacity: 0.4; }
.st-layer--top .st-layer__bar, .st-layer--base .st-layer__bar { background: #fff; opacity: 0.5; }
</style>