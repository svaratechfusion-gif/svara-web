<script setup lang="ts">
// Stats bento — a blue collaboration card over a photo, a light-grey commitment card
// with an avatar stack and a pull quote, and a right column of blue data + dark reach.
// The four cards share one staggered reveal (opacity + blur + rise) on scroll-in.
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
      <!-- Collaboration — blue, photo-backed -->
      <article data-card="0" class="sx-stats__card sx-stats__collab">
        <img :src="STRIDE_STATS.people" alt="" class="sx-stats__photo" loading="lazy" decoding="async">
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
          <div class="sx-stats__num">{{ STRIDE_STATS.collab.value }}</div>
          <p class="sx-stats__desc">{{ STRIDE_STATS.collab.desc }}</p>
        </div>
      </article>

      <!-- Commitment — grey, with the quote -->
      <article data-card="1" class="sx-stats__card sx-stats__commit">
        <p class="sx-stats__eyebrow">{{ STRIDE_STATS.commitment.eyebrow }}</p>
        <div class="sx-stats__num sx-stats__num--gap">{{ STRIDE_STATS.commitment.value }}</div>
        <div class="sx-stats__base">
          <div class="sx-stats__avatars">
            <span v-for="(src, i) in STRIDE_STATS.avatars" :key="i" class="sx-stats__avatar">
              <img :src="src" alt="" loading="lazy" decoding="async">
            </span>
          </div>
          <blockquote class="sx-stats__quote">&ldquo;{{ STRIDE_STATS.commitment.quote }}&rdquo;</blockquote>
        </div>
      </article>

      <!-- Right column — blue data over dark reach -->
      <div class="sx-stats__col">
        <article data-card="2" class="sx-stats__card sx-stats__data">
          <p class="sx-stats__label">{{ STRIDE_STATS.data.label }}</p>
          <div class="sx-stats__num sx-stats__num--gap">{{ STRIDE_STATS.data.value }}</div>
          <p class="sx-stats__desc sx-stats__desc--light">{{ STRIDE_STATS.data.desc }}</p>
        </article>
        <article data-card="3" class="sx-stats__card sx-stats__reach">
          <span class="sx-stats__reach-label">{{ STRIDE_STATS.reach.label }}</span>
          <span class="sx-stats__num">{{ STRIDE_STATS.reach.value }}</span>
        </article>
      </div>
    </div>
  </section>
</template>
