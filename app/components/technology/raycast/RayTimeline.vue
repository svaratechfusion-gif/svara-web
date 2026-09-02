<script setup lang="ts">
// The six-icon timeline: circular tiles connected by a 1px hairline, each with a
// line-art glyph and a label beneath. The design specifies exactly this — a
// horizontal row of perfect circles joined by a thin rule, not a card grid.
import { ref, computed } from 'vue'
import RayIcon from './RayIcon.vue'
import { RAY_LAYERS, RAY_TRUST } from '~~/lib/technology/raycast'
import { useScrollScrub } from '~/composables/useScrollScrub'

const tiles = [...RAY_LAYERS.map(l => ({ n: l.n, name: l.name, icon: l.icon })), RAY_TRUST]

// MOTION: the hairline draws through the row and each tile resolves as it is
// reached, so the timeline reads as a stack being traced rather than six stills.
const row = ref<HTMLElement | null>(null)
const { progress } = useScrollScrub(row, { start: 'top 82%', end: 'bottom 66%' })
const reached = computed(() => progress.value * tiles.length)
</script>

<template>
  <section class="ray-timeline" aria-label="The SVARA intelligence layers">
    <div class="ray-wrap">
      <ol ref="row" class="ray-timeline__row">
        <span class="ray-timeline__draw" :style="{ transform: `scaleX(${progress})` }" aria-hidden="true" />
        <li
          v-for="(t, i) in tiles" :key="t.n"
          class="ray-timeline__item"
          :class="{ 'is-lit': reached > i }"
        >
          <RayIcon :glyph="t.icon" />
          <span class="ray-timeline__label">{{ t.name }}</span>
          <span class="ray-timeline__n">{{ t.n }}</span>
        </li>
      </ol>
    </div>
  </section>
</template>
