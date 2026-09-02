<script setup lang="ts">
// The six-icon timeline: circular tiles connected by a 1px hairline, each with a
// line-art glyph and a label beneath. The design specifies exactly this — a
// horizontal row of perfect circles joined by a thin rule, not a card grid.
import RayIcon from './RayIcon.vue'
import { RAY_LAYERS, RAY_TRUST } from '~~/lib/technology/raycast'

const tiles = [...RAY_LAYERS.map(l => ({ n: l.n, name: l.name, icon: l.icon })), RAY_TRUST]
</script>

<template>
  <section class="ray-timeline" aria-label="The SVARA intelligence layers">
    <div class="ray-wrap">
      <ol class="ray-timeline__row">
        <li v-for="t in tiles" :key="t.n" class="ray-timeline__item">
          <RayIcon :glyph="t.icon" />
          <span class="ray-timeline__label">{{ t.name }}</span>
          <span class="ray-timeline__n">{{ t.n }}</span>
        </li>
      </ol>
    </div>
  </section>
</template>
