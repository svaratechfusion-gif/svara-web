<script setup lang="ts">
// WHY SVARA — storytelling: AI → Enterprise Software → Digital Engineering
// → Infrastructure → Enterprise Intelligence. Emphasizes SVARA builds
// infrastructure, not a standalone product. Framing copy is verbatim from
// the Content Bible (architecture.overview); the four thesis pillars are
// verbatim from the architecture components.
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ScrollTrigger } from '~~/lib/gsap'
import { irHero, transformStory, thesisPillars } from '~/utils/investors'

const root = ref<HTMLElement>()
const active = ref(-1)
let st: ScrollTrigger | null = null

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { active.value = transformStory.length - 1; return }
  st = ScrollTrigger.create({ trigger: root.value!, start: 'top 72%', end: 'bottom 75%', scrub: true, onUpdate: (self) => { active.value = Math.floor(self.progress * transformStory.length) } })
})
onBeforeUnmount(() => { st?.kill() })
</script>

<template>
  <section ref="root" class="ws">
    <div class="ws__head">
      <p class="ws__eyebrow">Why SVARA</p>
      <h2 class="ws__title">Building infrastructure, not a standalone product.</h2>
      <p class="ws__frame">{{ irHero.overview }}</p>
    </div>

    <div class="ws__pipe">
      <div class="ws__rail" :style="{ '--p': (active + 1) / transformStory.length }" />
      <div v-for="(s, i) in transformStory" :key="s" class="ws__stage" :class="{ 'is-on': active >= i - 0.4, 'is-last': i === transformStory.length - 1 }">
        <span class="ws__dot" /><span class="ws__name">{{ s }}</span>
      </div>
    </div>

    <div class="ws__pillars">
      <div v-for="(p, i) in thesisPillars" :key="p.name" class="ws__pillar" :class="{ 'is-on': active >= transformStory.length - 1 }" :style="{ '--d': i }">
        <h3 class="ws__pillar-name">{{ p.name }}</h3>
        <p class="ws__pillar-desc">{{ p.description }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ws { background: #F8FBFF; padding: var(--space-32) var(--container-pad); }
.ws__head { max-width: 760px; margin: 0 auto var(--space-16); text-align: center; }
.ws__eyebrow { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.ws__title { margin: 0 0 var(--space-6); font-size: clamp(34px, 4.4vw, 56px); font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong); }
.ws__frame { margin: 0; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); max-width: 64ch; margin-inline: auto; }

.ws__pipe { position: relative; max-width: 1100px; margin: var(--space-16) auto 0; display: flex; align-items: center; justify-content: space-between; padding-top: 22px; }
.ws__rail { position: absolute; left: 0; right: 0; top: 22px; height: 2px; background: rgba(16, 42, 91, 0.1); }
.ws__rail::after { content: ""; position: absolute; left: 0; top: 0; height: 100%; width: calc(var(--p, 0) * 100%); background: linear-gradient(90deg, var(--color-accent), var(--color-ink-strong)); transition: width 0.1s linear; }
.ws__stage { position: relative; flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px; opacity: 0.35; transition: opacity var(--motion-medium) var(--ease-smooth), transform var(--motion-medium) var(--ease-out); }
.ws__stage.is-on { opacity: 1; }
.ws__stage.is-last.is-on { transform: scale(1.06); }
.ws__dot { position: absolute; top: -22px; width: 14px; height: 14px; border-radius: 50%; background: #fff; border: 2px solid var(--color-border-strong); transition: all var(--motion-medium) var(--ease-out); }
.ws__stage.is-on .ws__dot { background: var(--color-accent); border-color: var(--color-accent); box-shadow: 0 0 0 6px rgba(47, 127, 230, 0.16); }
.ws__stage.is-last.is-on .ws__dot { background: var(--color-ink-strong); border-color: var(--color-ink-strong); }
.ws__name { font-size: clamp(14px, 1.4vw, 18px); font-weight: var(--weight-semibold); color: var(--color-ink-strong); letter-spacing: -0.01em; }
.ws__stage.is-last.is-on .ws__name { color: var(--color-accent); font-weight: var(--weight-bold); }

.ws__pillars { max-width: 1180px; margin: var(--space-20) auto 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: var(--space-6); }
.ws__pillar { padding: var(--space-8); border-radius: var(--radius-lg); background: #F1F6FE; border: 1px solid var(--color-border); }
.ws__pillar-name { margin: 0 0 var(--space-4); font-size: 16px; font-weight: var(--weight-bold); color: var(--color-ink-strong); letter-spacing: -0.01em; }
.ws__pillar-desc { margin: 0; font-size: 14px; line-height: 1.6; color: var(--color-text-secondary); }
@media (max-width: 768px) { .ws__pipe { flex-direction: column; gap: var(--space-6); align-items: flex-start; padding-top: 0; } .ws__rail { display: none; } .ws__stage { flex-direction: row; } .ws__dot { position: static; } }
</style>