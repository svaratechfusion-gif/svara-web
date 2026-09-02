<script setup lang="ts">
// A LAYERED PINNED REVEAL. The chrome-chain stage is sticky at the top of the viewport
// while the Product bento scrolls up over it — two layers at different scroll
// "heights", so the Product reads as sliding out from under the model.
//
// The two halves live in ONE component because the pin couples them: the model's
// vertical travel is driven off the WRAPPER's scroll, not the pinned section's (whose
// rect.top is frozen at 0 for the whole pin). Splitting them would mean reaching for
// `parentElement` from a child, which breaks the moment anything is nested between.
//
// Two continuous phases, no stop:
//  · fly-in (wrapper top: vh → 0) — the model descends from the top edge to centre.
//  · pinned (wrapper top: 0 → −pinDist) — as the Product slides up over it, the model
//    keeps drifting slowly down and out the bottom. pinDist ≈ the Product's height, so
//    the drift is far slower than the fly-in: a gentle deceleration into a slow fall
//    rather than an abrupt halt at centre.
//
// The fall is low-passed (0.12) rather than tracked 1:1 — tracking scroll exactly felt
// rigid; the lag adds inertia through the phase change so the whole scroll reads smoother.
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useTicker } from '~/composables/useTicker'
import { useRevealCascade } from '~/composables/useRevealCascade'
import StrideHeading from './StrideHeading.vue'
import { createGradientBackground, type GradientBackgroundHandle } from '~~/lib/stride/gradient-background'
import { createChromeModel, type ChromeModelHandle } from '~~/lib/stride/chrome-model'
import { STRIDE_CHAIN, STRIDE_PRODUCT } from '~~/lib/stride/content'

const CARD_RISE = 24 // px cards rise from
const CARD_BLUR = 12 // px soft start blur

const wrapRef = ref<HTMLElement | null>(null)
const bgRef = ref<HTMLCanvasElement | null>(null)
const modelRef = ref<HTMLCanvasElement | null>(null)

/** Model fall progress: 0 = above the frame, 0.5 = centred, 1 = below. */
let fall = 0.5
let bgHandle: GradientBackgroundHandle | undefined
let modelHandle: ChromeModelHandle | null = null

/** Per-letter alpha ramp on the chain heading — white fading toward muted. */
const chainAlpha = (f: number): number => 1 - f * 0.65

onMounted(() => {
  const bg = bgRef.value
  const model = modelRef.value
  if (!bg || !model) return

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  try {
    bgHandle = createGradientBackground(bg, {
      base: STRIDE_CHAIN.base,
      light: STRIDE_CHAIN.light,
      seed: STRIDE_CHAIN.seed,
    })
  }
  catch (err) {
    // No WebGL, or the scene failed to build. The section degrades to the page behind
    // it — but a swallowed failure here is invisible in production and impossible to
    // diagnose, so it is reported rather than dropped.
    console.warn('[stride] gradient backdrop unavailable:', err)
  }
  try {
    modelHandle = createChromeModel(model, {
      url: STRIDE_CHAIN.model,
      progress: () => fall,
      reducedMotion,
      scrollSpin: true, // scroll speeds up the spin (eases back to idle)
      spinAccel: 0.00004, // very subtle scroll→spin coupling
      maxSpin: 0.045, // low rad/frame cap — even fast flicks only nudge it above idle
    })
  }
  catch (err) {
    console.warn('[stride] chrome model unavailable:', err)
  }
})

onBeforeUnmount(() => {
  modelHandle?.dispose()
  modelHandle = null
  bgHandle?.dispose()
  bgHandle = undefined
})

useTicker(() => {
  const wrap = wrapRef.value
  if (!wrap) return
  const vh = window.innerHeight || 1
  const wt = wrap.getBoundingClientRect().top
  const pinDist = Math.max(1, wrap.offsetHeight - vh)
  const target = wt > 0
    ? 0.5 * (1 - Math.min(wt / vh, 1))
    : 0.5 + 0.5 * Math.min(-wt / pinDist, 1)
  fall += (target - fall) * 0.12
})

// The Product bento's three cards share one staggered reveal.
const { rootRef: bentoRef } = useRevealCascade({
  total: () => 3,
  apply: (_p, localProg) => {
    const root = bentoRef.value
    if (!root) return
    root.querySelectorAll<HTMLElement>('[data-card]').forEach((el) => {
      const lp = localProg(Number(el.dataset.card))
      el.style.opacity = String(lp)
      el.style.transform = `translateY(${CARD_RISE * (1 - lp)}px)`
      el.style.filter = `blur(${CARD_BLUR * (1 - lp)}px)`
    })
  },
})
</script>

<template>
  <div ref="wrapRef" class="sx-layer">
    <!-- PINNED — the chrome stage -->
    <section class="sx-chain" aria-labelledby="stride-chain-title">
      <canvas ref="bgRef" aria-hidden="true" class="sx-chain__canvas" />
      <canvas ref="modelRef" aria-hidden="true" class="sx-chain__canvas" />

      <div class="sx-chain__ui">
        <StrideHeading
          id="stride-chain-title"
          :text="STRIDE_CHAIN.heading"
          :alpha="chainAlpha"
          class="sx-chain__h"
        />
        <div class="sx-chain__bottom">
          <p class="sx-chain__tagline">{{ STRIDE_CHAIN.tagline }}</p>
          <p class="sx-chain__aside">{{ STRIDE_CHAIN.aside }}</p>
        </div>
      </div>
    </section>

    <!-- SCROLLS UP OVER IT — the Product bento -->
    <section class="sx-prod" :aria-labelledby="STRIDE_PRODUCT.labelId">
      <div class="sx-prod__head">
        <StrideHeading :id="STRIDE_PRODUCT.labelId" :text="STRIDE_PRODUCT.heading" class="sx-prod__title" />
        <NuxtLink :to="STRIDE_PRODUCT.ctaTo" class="sx-prod__cta">{{ STRIDE_PRODUCT.cta }}</NuxtLink>
      </div>

      <div ref="bentoRef" class="sx-prod__bento">
        <article data-card="0" class="sx-prod__card sx-prod__card--wide">
          <img :src="STRIDE_PRODUCT.image" alt="" class="sx-prod__img" loading="lazy" decoding="async">
          <h3 class="sx-prod__card-title">{{ STRIDE_PRODUCT.cards[0]!.title }}</h3>
          <p class="sx-prod__card-body sx-prod__card-body--narrow">{{ STRIDE_PRODUCT.cards[0]!.body }}</p>
        </article>
        <article data-card="1" class="sx-prod__card sx-prod__card--grey">
          <h3 class="sx-prod__card-title">{{ STRIDE_PRODUCT.cards[1]!.title }}</h3>
          <p class="sx-prod__card-body">{{ STRIDE_PRODUCT.cards[1]!.body }}</p>
        </article>
        <article data-card="2" class="sx-prod__card sx-prod__card--grey">
          <h3 class="sx-prod__card-title">{{ STRIDE_PRODUCT.cards[2]!.title }}</h3>
          <p class="sx-prod__card-body">{{ STRIDE_PRODUCT.cards[2]!.body }}</p>
        </article>
      </div>
    </section>
  </div>
</template>
