<script setup lang="ts">
// EXPLORE ENTERPRISE INTELLIGENCE — visual storytelling:
// Research → Engineering → Knowledge → Innovation → Transformation.
// Progressive reveal while scrolling. Framing copy is verbatim from the
// Content Bible (knowledge-hub architecture overview).
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ScrollTrigger } from '~~/lib/gsap'
import { EXPLORE_STORY, blogHero } from '~/utils/blog-page'

const root = ref<HTMLElement>()
const active = ref(-1)
let st: ScrollTrigger | null = null

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { active.value = EXPLORE_STORY.length - 1; return }
  st = ScrollTrigger.create({ trigger: root.value!, start: 'top 72%', end: 'bottom 75%', scrub: true, onUpdate: (self) => { active.value = Math.floor(self.progress * EXPLORE_STORY.length) } })
})
onBeforeUnmount(() => { st?.kill() })
</script>

<template>
  <section ref="root" class="ei">
    <div class="ei__head">
      <p class="ei__eyebrow">Explore Enterprise Intelligence</p>
      <h2 class="ei__title">From research to transformation.</h2>
      <p class="ei__frame">{{ blogHero.overview }}</p>
    </div>
    <div class="ei__pipe">
      <div class="ei__rail" :style="{ '--p': (active + 1) / EXPLORE_STORY.length }" />
      <div v-for="(s, i) in EXPLORE_STORY" :key="s" class="ei__stage" :class="{ 'is-on': active >= i - 0.4, 'is-last': i === EXPLORE_STORY.length - 1 }">
        <span class="ei__dot" /><span class="ei__name">{{ s }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ei { background: #F8FBFF; padding: var(--space-32) var(--container-pad); }
.ei__head { max-width: 760px; margin: 0 auto var(--space-16); text-align: center; }
.ei__eyebrow { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.ei__title { margin: 0 0 var(--space-6); font-size: clamp(34px, 4.4vw, 56px); font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong); }
.ei__frame { margin: 0; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); max-width: 64ch; margin-inline: auto; }
.ei__pipe { position: relative; max-width: 1100px; margin: var(--space-16) auto 0; display: flex; align-items: center; justify-content: space-between; padding-top: 22px; }
.ei__rail { position: absolute; left: 0; right: 0; top: 22px; height: 2px; background: rgba(16, 42, 91, 0.1); }
.ei__rail::after { content: ""; position: absolute; left: 0; top: 0; height: 100%; width: calc(var(--p, 0) * 100%); background: linear-gradient(90deg, var(--color-accent), var(--color-ink-strong)); transition: width 0.1s linear; }
.ei__stage { position: relative; flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px; opacity: 0.35; transition: opacity var(--motion-medium) var(--ease-smooth), transform var(--motion-medium) var(--ease-out); }
.ei__stage.is-on { opacity: 1; }
.ei__stage.is-last.is-on { transform: scale(1.06); }
.ei__dot { position: absolute; top: -22px; width: 14px; height: 14px; border-radius: 50%; background: #fff; border: 2px solid var(--color-border-strong); transition: all var(--motion-medium) var(--ease-out); }
.ei__stage.is-on .ei__dot { background: var(--color-accent); border-color: var(--color-accent); box-shadow: 0 0 0 6px rgba(47, 127, 230, 0.16); }
.ei__stage.is-last.is-on .ei__dot { background: var(--color-ink-strong); border-color: var(--color-ink-strong); }
.ei__name { font-size: clamp(14px, 1.4vw, 18px); font-weight: var(--weight-semibold); color: var(--color-ink-strong); letter-spacing: -0.01em; }
.ei__stage.is-last.is-on .ei__name { color: var(--color-accent); font-weight: var(--weight-bold); }
@media (max-width: 768px) { .ei__pipe { flex-direction: column; gap: var(--space-6); align-items: flex-start; padding-top: 0; } .ei__rail { display: none; } .ei__stage { flex-direction: row; } .ei__dot { position: static; } }
</style>