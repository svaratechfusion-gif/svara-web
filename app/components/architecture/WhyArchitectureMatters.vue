<script setup lang="ts">
// WHY ARCHITECTURE MATTERS — visual storytelling: Software → Data →
// Intelligence → Automation → Transformation. Progressive scroll reveal.
// Framing copy is verbatim from the Content Bible (platform architecture
// overview).
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ScrollTrigger } from '~~/lib/gsap'
import { TRANSFORM_STORY, archHero } from '~/utils/architecture'

const root = ref<HTMLElement>()
const active = ref(-1)
let st: ScrollTrigger | null = null

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { active.value = TRANSFORM_STORY.length - 1; return }
  st = ScrollTrigger.create({
    trigger: root.value!, start: 'top 72%', end: 'bottom 75%', scrub: true,
    onUpdate: (self) => { active.value = Math.floor(self.progress * TRANSFORM_STORY.length) },
  })
})
onBeforeUnmount(() => { st?.kill() })
</script>

<template>
  <section ref="root" class="wm">
    <div class="wm__head">
      <p class="wm__eyebrow">Why Architecture Matters</p>
      <h2 class="wm__title">Architecture is the difference between software and transformation.</h2>
      <p class="wm__frame">{{ archHero.overview }}</p>
    </div>

    <div class="wm__pipe">
      <div class="wm__rail" :style="{ '--p': (active + 1) / TRANSFORM_STORY.length }" />
      <div
        v-for="(s, i) in TRANSFORM_STORY" :key="s"
        class="wm__stage"
        :class="{ 'is-on': active >= i - 0.4 }"
      >
        <span class="wm__dot" />
        <span class="wm__name">{{ s }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.wm { background: #F8FBFF; padding: var(--space-32) var(--container-pad); }
.wm__head { max-width: 760px; margin: 0 auto var(--space-20); text-align: center; }
.wm__eyebrow { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.wm__title { margin: 0 0 var(--space-6); font-size: clamp(34px, 4.4vw, 56px); font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong); }
.wm__frame { margin: 0; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); max-width: 64ch; margin-inline: auto; }

.wm__pipe { position: relative; max-width: 1100px; margin: var(--space-20) auto 0; display: flex; align-items: center; justify-content: space-between; padding-top: 22px; }
.wm__rail { position: absolute; left: 0; right: 0; top: 22px; height: 2px; background: rgba(16, 42, 91, 0.1); }
.wm__rail::after { content: ""; position: absolute; left: 0; top: 0; height: 100%; width: calc(var(--p, 0) * 100%); background: linear-gradient(90deg, var(--color-accent), var(--color-ink-strong)); transition: width 0.1s linear; }
.wm__stage { position: relative; flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px; opacity: 0.35; transition: opacity var(--motion-medium) var(--ease-smooth), transform var(--motion-medium) var(--ease-out); }
.wm__stage.is-on { opacity: 1; }
.wm__stage:last-child.is-on { transform: scale(1.06); }
.wm__dot { position: absolute; top: -22px; width: 14px; height: 14px; border-radius: 50%; background: #fff; border: 2px solid var(--color-border-strong); transition: background var(--motion-medium) var(--ease-out), border-color var(--motion-medium) var(--ease-out), box-shadow var(--motion-medium) var(--ease-out); }
.wm__stage.is-on .wm__dot { background: var(--color-accent); border-color: var(--color-accent); box-shadow: 0 0 0 6px rgba(47, 127, 230, 0.16); }
.wm__stage:last-child.is-on .wm__dot { background: var(--color-ink-strong); border-color: var(--color-ink-strong); }
.wm__name { font-size: clamp(15px, 1.5vw, 19px); font-weight: var(--weight-semibold); color: var(--color-ink-strong); letter-spacing: -0.01em; max-width: 12ch; text-align: center; }
.wm__stage:last-child.is-on .wm__name { color: var(--color-accent); font-weight: var(--weight-bold); }

@media (max-width: 768px) { .wm__pipe { flex-direction: column; gap: var(--space-6); align-items: flex-start; padding-top: 0; } .wm__rail { display: none; } .wm__stage { flex-direction: row; } .wm__dot { position: static; } }
</style>