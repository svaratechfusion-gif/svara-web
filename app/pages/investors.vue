<script setup lang="ts">
// INVESTORS — the "SynapseX" film: five full-viewport beats over CloudFront
// video, on black, in Space Mono.
//
//   scrubbed hero → cinematic statement → figures → category → the loop
//
// then a closing band and the site's real footer. The hero (IRHeroCinematic)
// already was this design; it had been flattened into a fixed autoplay
// background, and this restores its mouse-scrub and its own video.
//
// > DELIBERATE REVERSAL — read before "fixing" this.
// > This page previously OMITTED all hard financial figures ("no fabricated
// > metrics, claims kept appropriate to SVARA's actual stage"). The figures in
// > SECTION 3 are now shown, on an explicit instruction. They are the Content
// > Bible's own numbers (lib/content/investors.ts → roi.metrics), read from the
// > file rather than typed in, so they cannot drift from it — but they ARE
// > forward-looking market claims on an investor-facing page. Nothing invented
// > was added: the reference's own metrics (2.4ms latency, 99.7% accuracy,
// > 140B parameters) belong to a fictional product and were NOT used.
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { investorsContent } from '~~/lib/content/investors'
import { useStructuredData } from '~/composables/useStructuredData'
import IRHeroCinematic from '~/components/investors/IRHeroCinematic.vue'
import SynapseCinematic from '~/components/investors/synapse/SynapseCinematic.vue'
import SynapseMetrics from '~/components/investors/synapse/SynapseMetrics.vue'
import SynapseAdaptive from '~/components/investors/synapse/SynapseAdaptive.vue'
import SynapseArchitecture from '~/components/investors/synapse/SynapseArchitecture.vue'
import SynapseClose from '~/components/investors/synapse/SynapseClose.vue'

const page = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  const root = page.value
  if (!root) return
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('is-inview')
      observer?.unobserve(entry.target)
    })
  }, { threshold: 0.3 })
  root.querySelectorAll('.syn-metrics, .syn-adapt, .syn-arch').forEach(el => observer!.observe(el))
})

onBeforeUnmount(() => observer?.disconnect())

useSeoMeta({
  title: investorsContent.metadata.title,
  description: investorsContent.aiAnswerTarget.replace(/\*\*/g, ''),
})
useStructuredData({
  '@context': 'https://schema.org', '@type': 'Article',
  name: investorsContent.metadata.title,
  description: investorsContent.aiAnswerTarget.replace(/\*\*/g, ''),
  about: investorsContent.metadata.mentions,
})
</script>

<template>
  <div ref="page" class="investors-page">
    <!-- 1 · HERO — owns its own mouse-scrubbed video (no fixed page background) -->
    <IRHeroCinematic />

    <div class="investors-page__body">
      <!-- 2 · the statement, leaning in 3D as it passes -->
      <SynapseCinematic />

      <!-- 3 · the figures — see the reversal note at the top of this file -->
      <SynapseMetrics />

      <!-- 4 · why the category holds -->
      <SynapseAdaptive />

      <!-- 5 · the loop, on black — the one still beat -->
      <SynapseArchitecture />

      <!-- closing band. NOT the footer: the site's real Footer follows it from
           the default layout, so this page never carries a second copy of the
           site's navigation. -->
      <SynapseClose />
    </div>
  </div>
</template>

<style scoped>
/* FIXED hero video + flowing sections (homepage/divisions model) */
.investors-page { position: relative; }
.investors-page__bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
  background: #0a1428;
  pointer-events: none;
}
.investors-page__body { position: relative; z-index: 1; background: transparent; }

/* Hero styles now live in IRHeroCinematic.vue (the redesigned cinematic hero). */

.ir-thesis__head, .ir-opp__head, .ir-model__head, .ir-traj__head, .ir-shift__copy { max-width: 62ch; margin-bottom: clamp(38px, 4vw, 60px); }
.ir-shift__copy { margin-bottom: 0; }
.ir-thesis__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.ir-thesis__card { padding: 28px 26px; }
.ir-thesis__n { font-size: 12px; color: var(--sig); letter-spacing: 0.1em; }
.ir-thesis__title { margin: 16px 0 0; font-size: 21px; font-weight: 600; letter-spacing: -0.02em; line-height: 1.18; color: var(--ink-primary); }
.ir-thesis__body { margin: 12px 0 0; font-size: 14px; line-height: 1.6; color: var(--ink-secondary); }

.ir-shift__grid { display: grid; grid-template-columns: 1fr 1.05fr; gap: clamp(36px, 5vw, 84px); align-items: center; }
.ir-shift__viz { position: relative; aspect-ratio: 360 / 220; padding: 16px; overflow: hidden; }
.ir-shift__code { position: absolute; top: 12px; left: 16px; z-index: 2; font-size: 8.5px; letter-spacing: 0.12em; color: var(--ink-muted); }
.ir-shift__svg { position: absolute; inset: 16px; width: calc(100% - 32px); height: calc(100% - 32px); margin-top: 8px; }

.ir-opp__grid { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.ir-opp__cell { padding: 26px 22px; display: flex; flex-direction: column; gap: 14px; min-height: 116px; }
.ir-opp__k { font-size: 11px; color: var(--ink-muted); letter-spacing: 0.1em; }
.ir-opp__name { font-size: 17px; font-weight: 600; letter-spacing: -0.015em; line-height: 1.2; color: var(--ink-primary); margin-top: auto; }

.ir-model__frame { padding: clamp(8px, 2vw, 20px) clamp(20px, 4vw, 48px); }
.ir-model__list { list-style: none; margin: 0; padding: 0; }
.ir-model__row { display: grid; grid-template-columns: 44px 180px 1fr; gap: 24px; padding: 26px 0; border-bottom: 1px solid var(--sv-border-subtle); align-items: baseline; }
.ir-model__row:last-child { border-bottom: none; }
.ir-model__idx { font-size: 12px; color: var(--sig); letter-spacing: 0.08em; }
.ir-model__k { font-size: clamp(19px, 2.2vw, 28px); font-weight: 600; letter-spacing: -0.02em; color: var(--ink-primary); }
.ir-model__v { font-size: 16px; line-height: 1.6; color: var(--ink-secondary); max-width: 56ch; }

.ir-traj__spine { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; position: relative; }
.ir-traj__spine::before { content: ""; position: absolute; top: 5px; left: 0; right: 0; height: 1px; background: var(--sv-border-lavender); }
.ir-traj__stop { position: relative; padding: 26px 20px 0 0; display: flex; flex-direction: column; gap: 12px; }
.ir-traj__dot { position: absolute; top: 0; left: 0; width: 11px; height: 11px; border-radius: 50%; background: rgba(255,255,255,0.9); border: 1px solid var(--sig); }
.ir-traj__stop:first-child .ir-traj__dot { background: var(--sig); box-shadow: 0 0 0 4px rgba(63,111,176,0.14); }
.ir-traj__phase { font-size: 11px; color: var(--sig); letter-spacing: 0.08em; }
.ir-traj__text { font-size: 15px; line-height: 1.5; color: var(--ink-primary); max-width: 26ch; }

.ir-cta__frame { padding: clamp(48px, 8vw, 104px) clamp(28px, 6vw, 88px); text-align: center; }
.ir-cta__inner { display: flex; flex-direction: column; align-items: center; }
.ir-cta__code { font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-muted); }
.ir-cta__title { margin: 18px 0 0; font-size: clamp(34px, 4.2vw, 64px); font-weight: 600; letter-spacing: -0.03em; line-height: 1.02; color: var(--ink-primary); text-wrap: balance; }
.ir-cta__title .lite { color: var(--ink-secondary); }
.ir-cta__lead { margin: 22px auto 0; max-width: 46ch; font-size: var(--type-lead); line-height: 1.55; color: var(--ink-secondary); }
.ir-cta__actions { margin-top: 34px; display: flex; flex-wrap: wrap; gap: 14px; justify-content: center; }

@media (max-width: 1024px) {
  .ir-thesis__grid { grid-template-columns: repeat(2, 1fr); }
  .ir-shift__grid { grid-template-columns: 1fr; gap: 32px; }
  .ir-opp__grid { grid-template-columns: repeat(2, 1fr); }
  .ir-model__row { grid-template-columns: 44px 1fr; row-gap: 6px; }
  .ir-model__v { grid-column: 2; }
  .ir-traj__spine { grid-template-columns: 1fr; gap: 22px; }
  .ir-traj__spine::before { top: 0; bottom: 0; left: 5px; right: auto; width: 1px; height: auto; }
  .ir-traj__stop { padding: 0 0 0 28px; }
}
@media (max-width: 560px) { .ir-thesis__grid { grid-template-columns: 1fr; } .ir-opp__grid { grid-template-columns: 1fr; } }
@media (prefers-reduced-motion: reduce) { .ir-shift__sig circle { animation: none; } }
</style>
