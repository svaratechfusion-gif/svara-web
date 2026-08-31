<script setup lang="ts">
// MORE THAN A CAREER. BUILD A LEGACY. — storytelling sequence:
// Learn → Build → Innovate → Scale → Lead. Progressive reveal with
// editorial typography.
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ScrollTrigger } from '~~/lib/gsap'
import { LEGACY_STORY } from '~/utils/careers-page'

const root = ref<HTMLElement>()
const active = ref(-1)
let st: ScrollTrigger | null = null

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { active.value = LEGACY_STORY.length - 1; return }
  st = ScrollTrigger.create({ trigger: root.value!, start: 'top 70%', end: 'bottom 75%', scrub: true, onUpdate: (self) => { active.value = Math.floor(self.progress * LEGACY_STORY.length) } })
})
onBeforeUnmount(() => { st?.kill() })
</script>

<template>
  <section ref="root" class="lg">
    <div class="lg__head">
      <p class="lg__eyebrow">More Than A Career</p>
      <h2 class="lg__title">Build a legacy.</h2>
    </div>
    <ol class="lg__seq" role="list">
      <li v-for="(s, i) in LEGACY_STORY" :key="s" class="lg__item" :class="{ 'is-on': active >= i - 0.3 }">
        <span class="lg__num">{{ String(i + 1).padStart(2, '0') }}</span>
        <span class="lg__word">{{ s }}</span>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.lg { background: #F8FBFF; padding: var(--space-32) var(--container-pad); }
.lg__head { max-width: 760px; margin: 0 auto var(--space-16); text-align: center; }
.lg__eyebrow { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.lg__title { margin: 0; font-size: clamp(40px, 5.5vw, 80px); font-weight: var(--weight-extrabold); line-height: 1.02; letter-spacing: -0.03em; color: var(--color-ink-strong); }
.lg__seq { list-style: none; margin: 0 auto; padding: 0; max-width: 1000px; display: flex; flex-direction: column; }
.lg__item { display: flex; align-items: baseline; gap: var(--space-6); padding: var(--space-6) 0; border-top: 1px solid rgba(16, 42, 91, 0.1); opacity: 0.3; transition: opacity var(--motion-medium) var(--ease-smooth); }
.lg__item:last-child { border-bottom: 1px solid rgba(16, 42, 91, 0.1); }
.lg__item.is-on { opacity: 1; }
.lg__num { font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: 0.1em; color: var(--color-text-faint); width: 32px; flex-shrink: 0; }
.lg__word { font-size: clamp(36px, 6vw, 88px); font-weight: var(--weight-extrabold); letter-spacing: -0.03em; line-height: 1; color: var(--color-ink-strong); }
.lg__item:nth-child(even).is-on .lg__word { color: var(--color-accent); }
</style>