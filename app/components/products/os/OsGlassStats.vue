<script setup lang="ts">
// OS · GLASS SYSTEM STATS — a Clarix-style cinematic "reset" between product
// groups. A frosted glass panel scales from small → full and reveals the SVARA
// platform signals as the user scrolls. Shell layer only; real values come from
// OS_PLATFORM_STATS (no invented statistics). SVARA restrained-blue accent.
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap, ScrollTrigger } from '~~/lib/gsap'
import { OS_PLATFORM_STATS } from '~/utils/svara-os'

const root = ref<HTMLElement | null>(null)
const panel = ref<HTMLElement | null>(null)
let ctx: ReturnType<typeof gsap.context> | null = null

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !root.value) return
  ctx = gsap.context(() => {
    const stats = root.value!.querySelectorAll<HTMLElement>('.ogs__stat')
    const tl = gsap.timeline({ scrollTrigger: { trigger: root.value!, start: 'top top', end: 'bottom bottom', scrub: 0.8 } })
    tl.fromTo(panel.value!, { scale: 0.72, yPercent: 6, opacity: 0.35, '--r': 4 }, { scale: 1, yPercent: 0, opacity: 1, '--r': 30, ease: 'power2.out', duration: 0.45 })
      .fromTo(stats, { y: 26, opacity: 0 }, { y: 0, opacity: 1, ease: 'power3.out', stagger: 0.05, duration: 0.35 }, 0.28)
      .to(panel.value!, { scale: 1, duration: 0.55 })
  }, root.value)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <section ref="root" class="ogs">
    <div class="ogs__sticky">
      <div ref="panel" class="ogs__panel">
        <div class="ogs__glow" aria-hidden="true" />
        <div class="ogs__head">
          <p class="ogs__eyebrow sys-label">System Signals</p>
          <h2 class="ogs__title">One backbone.<br><span class="ogs__title-lite">Measured across the stack.</span></h2>
        </div>
        <div class="ogs__grid">
          <div v-for="s in OS_PLATFORM_STATS" :key="s.label" class="ogs__stat">
            <span class="ogs__stat-v">{{ s.value }}</span>
            <span class="ogs__stat-l sys-label sys-label--sm">{{ s.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ogs { position: relative; height: 150vh; }
.ogs__sticky { position: sticky; top: 0; height: 100vh; display: grid; place-items: center; padding: clamp(24px, 6vw, 80px); }
.ogs__panel {
  position: relative; width: min(1200px, 100%); padding: clamp(32px, 5vw, 72px); overflow: hidden;
  border-radius: calc(var(--r, 30) * 1px);
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.66), rgba(246, 249, 252, 0.5));
  border: 1px solid rgba(16, 33, 74, 0.10);
  box-shadow: 0 50px 120px -60px rgba(16, 33, 74, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.7);
  -webkit-backdrop-filter: blur(22px); backdrop-filter: blur(22px);
  will-change: transform, opacity;
}
.ogs__glow { position: absolute; top: -30%; left: -10%; width: 55%; height: 90%; z-index: 0; pointer-events: none; background: radial-gradient(closest-side, rgba(108, 135, 254, 0.20), transparent 72%); filter: blur(30px); }
.ogs__head { position: relative; z-index: 1; max-width: 52ch; }
.ogs__eyebrow { color: var(--px-blue, #6C87FE); }
.ogs__title { margin: 16px 0 0; font-family: var(--font-sans, system-ui, sans-serif); font-weight: 200; font-size: clamp(2rem, 4.6vw, 3.6rem); line-height: 1.05; letter-spacing: -0.03em; color: var(--px-navy, #10214A); }
.ogs__title-lite { color: var(--px-muted, rgba(16, 33, 74, 0.5)); }
.ogs__grid { position: relative; z-index: 1; margin-top: clamp(32px, 4vw, 56px); display: grid; grid-template-columns: repeat(2, 1fr); gap: clamp(24px, 3vw, 44px); }
@media (min-width: 720px) { .ogs__grid { grid-template-columns: repeat(4, 1fr); } }
.ogs__stat { display: flex; flex-direction: column; gap: 8px; padding-top: 20px; border-top: 1px solid rgba(16, 33, 74, 0.12); }
.ogs__stat-v { font-family: var(--font-sans, system-ui, sans-serif); font-weight: 300; font-size: clamp(2rem, 3.4vw, 3rem); letter-spacing: -0.03em; line-height: 1; color: var(--px-navy, #10214A); font-variant-numeric: tabular-nums; }
.ogs__stat-l { color: var(--px-muted, rgba(16, 33, 74, 0.55)); }
</style>
