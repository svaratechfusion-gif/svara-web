<script setup lang="ts">
// The architecture chapters (06–08) as edge-highlight cards: defined by a 1px border
// and the inset highlight rather than by a fill, which is the design's variant for a
// card that needs to be read as an edge instead of a surface. Two columns, wider
// blocks — the design's other grid.
import RayIcon from './RayIcon.vue'
import { RAY_FEATURES } from '~~/lib/technology/raycast'
</script>

<template>
  <section class="ray-features" aria-label="How the stack is engineered">
    <div class="ray-wrap">
      <ul class="ray-grid ray-grid--3">
        <li v-for="f in RAY_FEATURES" :key="f.n" class="ray-card ray-card--edge">
          <div class="ray-card__top">
            <RayIcon :glyph="f.icon" />
            <span class="ray-card__n">{{ f.n }}</span>
          </div>
          <h3 class="ray-card__title">{{ f.title }}</h3>
          <p class="ray-body">{{ f.body }}</p>
          <ul class="ray-tags">
            <li v-for="m in f.meta" :key="m" class="ray-tag">{{ m }}</li>
          </ul>
        </li>
      </ul>
    </div>
  </section>
</template>
