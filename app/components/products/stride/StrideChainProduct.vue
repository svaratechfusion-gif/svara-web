<script setup lang="ts">
// STRIDE SCENE C — the pinned stage, and the Product bento that slides up over it.
//
// The two halves live in ONE component because the pin couples them: the stage is
// sticky for the length of this wrapper, and the Product section scrolling over it is
// what ends the pin.
//
// THE STAGE CARRIES BOTH. StrideHeroPanel is the supplied interactive hero — a
// cursor-scrubbed clip behind a typewritten headline and a multi-select of SVARA's
// five real product categories. The travelling chrome model, which the panel had
// replaced outright, is layered back between the panel's clip and its copy: it falls
// through the frame as the section is scrolled (0 = above the top edge, 0.5 = centred,
// 1 = below the bottom), and scroll speed nudges its spin.
//
// It renders on a TRANSPARENT canvas, so the clip still shows through around it, and
// it sits UNDER .sxh__content so it can never cross the headline or the pills.
//
// The stage keeps its heading for assistive tech only — the panel carries the visible
// headline now, and two competing h2s would be a heading-order problem.
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRevealCascade } from '~/composables/useRevealCascade'
import StrideHeading from './StrideHeading.vue'
import StrideHeroPanel from './StrideHeroPanel.vue'
import { createGradientBackground, type GradientBackgroundHandle } from '~~/lib/stride/gradient-background'
import { createChromeModel, type ChromeModelHandle } from '~~/lib/stride/chrome-model'
import { useTicker } from '~/composables/useTicker'
import { STRIDE_CHAIN, STRIDE_PRODUCT } from '~~/lib/stride/content'
import { useExploreOpeners } from '~/composables/useProductExplore'

const CARD_RISE = 24 // px cards rise from
const CARD_BLUR = 12 // px soft start blur

const wrapRef = ref<HTMLElement | null>(null)
const bgRef = ref<HTMLCanvasElement | null>(null)
const modelRef = ref<HTMLCanvasElement | null>(null)
let bgHandle: GradientBackgroundHandle | undefined
let modelHandle: ChromeModelHandle | null = null
/** Model fall progress: 0 = above the frame, 0.5 = centred, 1 = below. */
let fall = 0.5
const exploreOpeners = useExploreOpeners()

function explorePlatform(event: MouseEvent): void {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
  event.preventDefault()
  event.stopImmediatePropagation()
  exploreOpeners[STRIDE_PRODUCT.id]?.()
}

onMounted(() => {
  const bg = bgRef.value
  if (!bg) return
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

  const model = modelRef.value
  if (!model) return
  try {
    modelHandle = createChromeModel(model, {
      url: STRIDE_CHAIN.model,
      progress: () => fall,
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      scrollSpin: true, // scroll speeds the spin up, then it eases back to idle
      spinAccel: 0.00004, // very subtle scroll→spin coupling
      maxSpin: 0.045, // low rad/frame cap — even a fast flick only nudges it
    })
  }
  catch (err) {
    // Same contract as the backdrop: degrade to the clip behind, but say so.
    console.warn('[stride] chrome model unavailable:', err)
  }
})

// The fall is driven from the wrapper's own scroll position: approaching the
// viewport it drops from above to centred, then the pin carries it out the
// bottom. Lerped at 0.12 so a flick does not snap it.
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

onBeforeUnmount(() => {
  modelHandle?.dispose()
  modelHandle = null
  bgHandle?.dispose()
  bgHandle = undefined
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
    <!-- PINNED — the interactive hero panel (was the chrome GLB model) -->
    <section class="sx-chain" aria-labelledby="stride-chain-title">
      <canvas ref="bgRef" aria-hidden="true" class="sx-chain__canvas" />
      <h2 id="stride-chain-title" class="sx-chain__sr">{{ STRIDE_CHAIN.heading }}</h2>
      <StrideHeroPanel />
      <canvas ref="modelRef" aria-hidden="true" class="sx-chain__canvas sx-chain__canvas--model" />
    </section>

    <!-- SCROLLS UP OVER IT — the Product bento -->
    <section class="sx-prod" :aria-labelledby="STRIDE_PRODUCT.labelId">
      <div class="sx-prod__head">
        <StrideHeading :id="STRIDE_PRODUCT.labelId" :text="STRIDE_PRODUCT.heading" class="sx-prod__title" />
        <NuxtLink
          :to="STRIDE_PRODUCT.ctaTo"
          class="sx-prod__cta"
          data-product-explore
          @click.capture="explorePlatform"
        >{{ STRIDE_PRODUCT.cta }}</NuxtLink>
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
