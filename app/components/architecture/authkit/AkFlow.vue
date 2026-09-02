<script setup lang="ts">
// The eight-stage flow as the design's icon-tile timeline: circular frosted tiles
// joined by a single hairline, each with a line-art glyph and a label beneath.
//
// MOTION: the hairline draws left to right as the section scrolls and each tile
// lights as the line reaches it, so the stack reads as a pathway being traced
// rather than eight static tiles. One scrubbed ScrollTrigger; off under
// prefers-reduced-motion, where every tile renders already lit.
import { ref, computed } from 'vue'
import AkIcon from './AkIcon.vue'
import AkHead from './AkHead.vue'
import { AK_STATEMENT, AK_FLOW, AK_CROSS } from '~~/lib/architecture/authkit'
import { useScrollScrub } from '~/composables/useScrollScrub'

const row = ref<HTMLElement | null>(null)
const { progress } = useScrollScrub(row, { start: 'top 78%', end: 'bottom 62%' })

/** How many tiles the drawn line has reached. */
const reached = computed(() => progress.value * AK_FLOW.length)
</script>

<template>
  <section class="ak-section ak-flow">
    <div class="ak-wrap">
      <AkHead :eyebrow="AK_STATEMENT.eyebrow" :headline="AK_STATEMENT.headline" :body="AK_STATEMENT.body" />

      <ol ref="row" class="ak-flow__row">
        <span class="ak-flow__line" aria-hidden="true" />
        <span class="ak-flow__line ak-flow__line--draw" :style="{ transform: `scaleX(${progress})` }" aria-hidden="true" />
        <li
          v-for="(s, i) in AK_FLOW" :key="s.n"
          class="ak-flow__item"
          :class="{ 'is-lit': reached > i }"
        >
          <AkIcon :glyph="s.icon" />
          <span class="ak-flow__label">{{ s.name }}</span>
          <span class="ak-flow__n">{{ s.n }}</span>
        </li>
      </ol>

      <div class="ak-cross">
        <span class="ak-cross__label">Cross-cutting</span>
        <ul class="ak-tags">
          <li v-for="c in AK_CROSS" :key="c" class="ak-tag">{{ c }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>
