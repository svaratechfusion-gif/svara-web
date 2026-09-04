<script setup lang="ts">
// STRIDE SCENE C — the pinned stage, and the Product bento that slides up over it.
//
// The two halves live in ONE component because the pin couples them: the stage is
// sticky for the length of this wrapper, and the Product section scrolling over it is
// what ends the pin.
//
// THE STAGE USED TO BE A CHROME GLB MODEL. It is now StrideHeroPanel — the supplied
// interactive hero: a cursor-scrubbed clip behind a typewritten headline and a
// multi-select of SVARA's five real product categories. The model, its fall/spin
// choreography and the ticker that drove them are gone; the gradient backdrop stays,
// because the panel's clip is composited over it.
//
// The stage keeps its heading for assistive tech only — the panel carries the visible
// headline now, and two competing h2s would be a heading-order problem.
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRevealCascade } from '~/composables/useRevealCascade'
import StrideHeading from './StrideHeading.vue'
import StrideHeroPanel from './StrideHeroPanel.vue'
import { createGradientBackground, type GradientBackgroundHandle } from '~~/lib/stride/gradient-background'
import { STRIDE_CHAIN, STRIDE_PRODUCT } from '~~/lib/stride/content'
import { useExploreOpeners } from '~/composables/useProductExplore'

const CARD_RISE = 24 // px cards rise from
const CARD_BLUR = 12 // px soft start blur

const wrapRef = ref<HTMLElement | null>(null)
const bgRef = ref<HTMLCanvasElement | null>(null)
let bgHandle: GradientBackgroundHandle | undefined
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
})

onBeforeUnmount(() => {
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
