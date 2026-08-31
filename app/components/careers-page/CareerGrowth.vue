<script setup lang="ts">
// CAREER GROWTH — interactive journey:
// Intern → Engineer → Senior → Lead → Architect → Director.
// Emphasizes continuous learning and multidisciplinary collaboration.
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ScrollTrigger } from '~~/lib/gsap'
import { GROWTH_LEVELS } from '~/utils/careers-page'

const root = ref<HTMLElement>()
const active = ref(-1)
let st: ScrollTrigger | null = null

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { active.value = GROWTH_LEVELS.length - 1; return }
  st = ScrollTrigger.create({ trigger: root.value!, start: 'top 72%', end: 'bottom 78%', scrub: true, onUpdate: (self) => { active.value = Math.floor(self.progress * GROWTH_LEVELS.length) } })
})
onBeforeUnmount(() => { st?.kill() })
</script>

<template>
  <section ref="root" class="cg">
    <div class="cg__head">
      <p class="cg__eyebrow">Career Growth</p>
      <h2 class="cg__title">A path from intern to director.</h2>
      <p class="cg__sub">Career growth at SVARA is continuous — every level builds on the last with deeper expertise and broader cross-disciplinary collaboration.</p>
    </div>

    <div class="cg__journey">
      <div class="cg__rail" :style="{ '--p': (active + 1) / GROWTH_LEVELS.length }" />
      <div v-for="(l, i) in GROWTH_LEVELS" :key="l" class="cg__level" :class="{ 'is-on': active >= i - 0.3 }">
        <span class="cg__dot" /><span class="cg__level-name">{{ l }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cg { background: #F8FBFF; padding: var(--space-32) var(--container-pad); }
.cg__head { max-width: 760px; margin: 0 auto var(--space-16); text-align: center; }
.cg__eyebrow { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.cg__title { margin: 0; font-size: clamp(34px, 4.4vw, 56px); font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong); }
.cg__sub { margin: var(--space-5) 0 0; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }
.cg__journey { position: relative; max-width: 1100px; margin: var(--space-16) auto 0; display: flex; align-items: center; justify-content: space-between; padding-top: 22px; }
.cg__rail { position: absolute; left: 0; right: 0; top: 22px; height: 2px; background: rgba(16, 42, 91, 0.1); }
.cg__rail::after { content: ""; position: absolute; left: 0; top: 0; height: 100%; width: calc(var(--p, 0) * 100%); background: linear-gradient(90deg, var(--color-accent), var(--color-ink-strong)); transition: width 0.1s linear; }
.cg__level { position: relative; flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px; opacity: 0.35; transition: opacity var(--motion-medium) var(--ease-smooth); }
.cg__level.is-on { opacity: 1; }
.cg__dot { position: absolute; top: -22px; width: 16px; height: 16px; border-radius: 50%; background: #fff; border: 2px solid var(--color-border-strong); transition: all var(--motion-medium) var(--ease-out); }
.cg__level.is-on .cg__dot { background: var(--color-accent); border-color: var(--color-accent); box-shadow: 0 0 0 6px rgba(47, 127, 230, 0.16); }
.cg__level:last-child.is-on .cg__dot { background: var(--color-ink-strong); border-color: var(--color-ink-strong); }
.cg__level-name { font-size: clamp(15px, 1.5vw, 19px); font-weight: var(--weight-semibold); color: var(--color-ink-strong); letter-spacing: -0.01em; }
.cg__level:last-child.is-on .cg__level-name { color: var(--color-accent); font-weight: var(--weight-bold); }
@media (max-width: 768px) { .cg__journey { flex-direction: column; gap: var(--space-6); align-items: flex-start; padding-top: 0; } .cg__rail { display: none; } .cg__level { flex-direction: row; } .cg__dot { position: static; } }
</style>