<script setup lang="ts">
// The bento: a photo-backed platform-count card, a categories card, and a right column
// of the Intelligence count over deployment. The four cards share one staggered reveal
// (opacity + blur + rise) on scroll-in.
//
// Two changes from the source design, both because its content was placeholder:
// the stock avatar stack is now the five product categories with their counts, and the
// fabricated customer quote is now the portfolio's own description of the ONE AI OS
// layer — a statement, not a testimonial, so it is not marked up as a blockquote.
import { useRevealCascade } from '~/composables/useRevealCascade'
import { STRIDE_STATS } from '~~/lib/stride/content'

const CARD_RISE = 24 // px cards rise from
const CARD_BLUR = 12 // px soft start blur

const { rootRef } = useRevealCascade({
  total: () => 4,
  apply: (_p, localProg) => {
    const root = rootRef.value
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
  <section class="sx-stats" :aria-label="STRIDE_STATS.label">
    <div ref="rootRef" class="sx-stats__grid">
      <!-- Platform count, over a real SVARA product visual -->
      <article data-card="0" class="sx-stats__card sx-stats__collab">
        <img :src="STRIDE_STATS.image" alt="" class="sx-stats__photo" loading="lazy" decoding="async">
        <div class="sx-stats__scrim" aria-hidden="true" />
        <span class="sx-stats__brand">{{ STRIDE_STATS.brand }}</span>
        <span class="sx-stats__badge">
          <svg viewBox="0 0 24 24" class="sx-stats__bars" fill="currentColor" aria-hidden="true">
            <rect x="4" y="12" width="4" height="8" rx="1" />
            <rect x="10" y="7" width="4" height="13" rx="1" />
            <rect x="16" y="3" width="4" height="17" rx="1" />
          </svg>
        </span>
        <div class="sx-stats__inner">
          <div class="sx-stats__num">{{ STRIDE_STATS.platforms.value }}</div>
          <p class="sx-stats__desc">{{ STRIDE_STATS.platforms.desc }}</p>
        </div>
      </article>

      <!-- Categories, with the count per category -->
      <article data-card="1" class="sx-stats__card sx-stats__commit">
        <p class="sx-stats__eyebrow">{{ STRIDE_STATS.categories.eyebrow }}</p>
        <div class="sx-stats__num sx-stats__num--gap">{{ STRIDE_STATS.categories.value }}</div>
        <div class="sx-stats__base">
          <ul class="sx-stats__chips">
            <li v-for="c in STRIDE_STATS.categories.chips" :key="c.name" class="sx-stats__chip">
              {{ c.name }}<span class="sx-stats__chip-n">{{ c.count }}</span>
            </li>
          </ul>
          <p class="sx-stats__statement">{{ STRIDE_STATS.categories.statement }}</p>
        </div>
      </article>

      <!-- Right column — the Intelligence layer, then deployment -->
      <div class="sx-stats__col">
        <article data-card="2" class="sx-stats__card sx-stats__data">
          <p class="sx-stats__label">{{ STRIDE_STATS.intelligence.label }}</p>
          <div class="sx-stats__num sx-stats__num--gap">{{ STRIDE_STATS.intelligence.value }}</div>
          <p class="sx-stats__desc sx-stats__desc--light">{{ STRIDE_STATS.intelligence.desc }}</p>
        </article>
        <article data-card="3" class="sx-stats__card sx-stats__reach">
          <span class="sx-stats__reach-label">{{ STRIDE_STATS.deployment.label }}</span>
          <span class="sx-stats__deploy">{{ STRIDE_STATS.deployment.value }}</span>
        </article>
      </div>
    </div>
  </section>
</template>
