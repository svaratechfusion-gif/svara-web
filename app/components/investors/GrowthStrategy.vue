<script setup lang="ts">
// GROWTH STRATEGY — interactive roadmap: Foundation → Expansion → Scale →
// Leadership → Global. Reveal milestones progressively as the reader
// scrolls. Each milestone's detail is sourced VERBATIM from the Content
// Bible (investors.ts deployment.steps + architecture.components).
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ScrollTrigger } from '~~/lib/gsap'
import { roadmapMilestones } from '~/utils/investors'

const root = ref<HTMLElement>()
const active = ref(-1)
let st: ScrollTrigger | null = null

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { active.value = roadmapMilestones.length - 1; return }
  st = ScrollTrigger.create({ trigger: root.value!, start: 'top 72%', end: 'bottom 78%', scrub: true, onUpdate: (self) => { active.value = Math.floor(self.progress * roadmapMilestones.length) } })
})
onBeforeUnmount(() => { st?.kill() })
</script>

<template>
  <section ref="root" class="gs">
    <div class="gs__head">
      <p class="gs__eyebrow">Growth Strategy</p>
      <h2 class="gs__title">From pilot to category leadership.</h2>
      <p class="gs__sub">A staged progression from proven pilots to global category ownership — each milestone building on the last with compounding scale.</p>
    </div>

    <div class="gs__roadmap">
      <div class="gs__rail" :style="{ '--p': (active + 1) / roadmapMilestones.length }" />
      <div v-for="(m, i) in roadmapMilestones" :key="m.stage" class="gs__stage" :class="{ 'is-on': active >= i - 0.4, 'is-last': i === roadmapMilestones.length - 1 }">
        <span class="gs__dot" />
        <span class="gs__stage-num">{{ String(i + 1).padStart(2, '0') }}</span>
        <span class="gs__stage-name">{{ m.stage }}</span>
        <span class="gs__tag">{{ m.tag }}</span>
        <p class="gs__detail">{{ m.detail }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gs { background: #F1F6FE; padding: var(--space-32) var(--container-pad); }
.gs__head { max-width: 760px; margin: 0 auto var(--space-16); text-align: center; }
.gs__eyebrow { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.gs__title { margin: 0; font-size: clamp(34px, 4.4vw, 56px); font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong); }
.gs__sub { margin: var(--space-5) 0 0; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }

.gs__roadmap { position: relative; max-width: 1180px; margin: var(--space-16) auto 0; padding-left: 28px; }
.gs__rail { position: absolute; left: 8px; top: 8px; bottom: 8px; width: 2px; background: rgba(16, 42, 91, 0.12); }
.gs__rail::after { content: ""; position: absolute; left: 0; top: 0; width: 100%; height: calc(var(--p, 0) * 100%); background: linear-gradient(var(--color-accent), var(--color-ink-strong)); transition: height 0.1s linear; }
.gs__stage { position: relative; display: flex; flex-direction: column; gap: 6px; padding: var(--space-5) 0; opacity: 0.4; transition: opacity var(--motion-medium) var(--ease-smooth), transform var(--motion-medium) var(--ease-out); }
.gs__stage.is-on { opacity: 1; transform: translateX(6px); }
.gs__dot { position: absolute; left: -28px; top: var(--space-5); width: 16px; height: 16px; border-radius: 50%; background: #fff; border: 2px solid var(--color-border-strong); transition: all var(--motion-medium) var(--ease-out); }
.gs__stage.is-on .gs__dot { background: var(--color-accent); border-color: var(--color-accent); box-shadow: 0 0 0 6px rgba(47,127,230,0.16); }
.gs__stage.is-last.is-on .gs__dot { background: var(--color-ink-strong); border-color: var(--color-ink-strong); }
.gs__stage-num { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.08em; color: var(--color-accent); }
.gs__stage-name { font-size: clamp(22px, 2.4vw, 32px); font-weight: var(--weight-extrabold); color: var(--color-ink-strong); letter-spacing: -0.02em; }
.gs__tag { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-text-faint); }
.gs__detail { margin: 4px 0 0; max-width: 56ch; font-size: 15px; line-height: 1.6; color: var(--color-text-secondary); }
.gs__stage.is-last.is-on .gs__stage-name { color: var(--color-accent); }
@media (max-width: 768px) { .gs__roadmap { padding-left: 22px; } .gs__dot { left: -22px; } }
</style>