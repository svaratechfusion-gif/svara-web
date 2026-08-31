<script setup lang="ts">
// ENGINEERING CULTURE — visual workflow:
// Experiment → Prototype → Build → Deploy → Learn → Improve.
// Subtle engineering-themed animations.
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ScrollTrigger } from '~~/lib/gsap'
import { CULTURE_FLOW } from '~/utils/careers-page'

const root = ref<HTMLElement>()
const active = ref(-1)
let st: ScrollTrigger | null = null

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { active.value = CULTURE_FLOW.length - 1; return }
  st = ScrollTrigger.create({ trigger: root.value!, start: 'top 70%', end: 'bottom 75%', scrub: true, onUpdate: (self) => { active.value = Math.floor(self.progress * CULTURE_FLOW.length) } })
})
onBeforeUnmount(() => { st?.kill() })
</script>

<template>
  <section ref="root" class="ec">
    <div class="ec__head">
      <p class="ec__eyebrow">Engineering Culture</p>
      <h2 class="ec__title">How we build.</h2>
      <p class="ec__sub">Every cycle moves from experiment to deployed production, then back to learning. Engineering culture is the loop that powers our products.</p>
    </div>

    <div class="ec__flow">
      <div class="ec__rail" :style="{ '--p': (active + 1) / CULTURE_FLOW.length }" />
      <div v-for="(s, i) in CULTURE_FLOW" :key="s" class="ec__stage" :class="{ 'is-on': active >= i - 0.4 }">
        <span class="ec__dot" /><span class="ec__name">{{ s }}</span>
      </div>
      <div class="ec__loop" :class="{ 'is-on': active >= CULTURE_FLOW.length - 1 }">
        <span class="ec__loop-arrow">↺</span><span class="ec__loop-text">continuous</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ec { background: #F8FBFF; padding: var(--space-32) var(--container-pad); }
.ec__head { max-width: 760px; margin: 0 auto var(--space-16); text-align: center; }
.ec__eyebrow { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.ec__title { margin: 0; font-size: clamp(34px, 4.4vw, 56px); font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong); }
.ec__sub { margin: var(--space-5) 0 0; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }
.ec__flow { position: relative; max-width: 1100px; margin: var(--space-16) auto 0; display: flex; align-items: center; justify-content: space-between; padding-top: 22px; }
.ec__rail { position: absolute; left: 0; right: 0; top: 22px; height: 2px; background: rgba(16, 42, 91, 0.1); }
.ec__rail::after { content: ""; position: absolute; left: 0; top: 0; height: 100%; width: calc(var(--p, 0) * 100%); background: linear-gradient(90deg, var(--color-accent), var(--color-ink-strong)); transition: width 0.1s linear; }
.ec__stage { position: relative; flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px; opacity: 0.35; transition: opacity var(--motion-medium) var(--ease-smooth); }
.ec__stage.is-on { opacity: 1; }
.ec__dot { position: absolute; top: -22px; width: 14px; height: 14px; border-radius: 50%; background: #fff; border: 2px solid var(--color-border-strong); transition: all var(--motion-medium) var(--ease-out); }
.ec__stage.is-on .ec__dot { background: var(--color-accent); border-color: var(--color-accent); box-shadow: 0 0 0 6px rgba(47, 127, 230, 0.16); }
.ec__name { font-size: clamp(13px, 1.3vw, 17px); font-weight: var(--weight-semibold); color: var(--color-ink-strong); letter-spacing: -0.01em; }
.ec__loop { position: absolute; right: -10px; top: -50px; display: flex; align-items: center; gap: 5px; padding: 5px 10px; border-radius: var(--radius-pill); border: 1px dashed var(--color-text-faint); opacity: 0; transform: translateY(8px); transition: all var(--motion-medium) var(--ease-out); }
.ec__loop.is-on { opacity: 1; transform: translateY(0); border-color: var(--color-accent); }
.ec__loop-arrow { font-size: 14px; color: var(--color-accent); animation: ec-spin 3s linear infinite; }
@keyframes ec-spin { to { transform: rotate(360deg); } }
.ec__loop-text { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-accent); }
@media (max-width: 768px) { .ec__flow { flex-direction: column; gap: var(--space-6); align-items: flex-start; padding-top: 0; } .ec__rail { display: none; } .ec__stage { flex-direction: row; } .ec__dot { position: static; } }
@media (prefers-reduced-motion: reduce) { .ec__loop-arrow { animation: none; } }
</style>