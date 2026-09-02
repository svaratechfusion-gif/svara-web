<script setup lang="ts">
// The five layers as feature cards in a three-column grid — the design's primary
// content block. Each card is the "key" treatment: 16px radius, 24px padding, a
// circular icon container, a subheading, muted body, then the technology list as
// badge tags.
//
// Elevation is the inset key stack, never a drop shadow — a card should read as a
// pressed key cap rather than a floating panel.
import RayIcon from './RayIcon.vue'
import { RAY_LAYERS } from '~~/lib/technology/raycast'
</script>

<template>
  <section class="ray-layers" aria-label="Intelligence layers">
    <div class="ray-wrap">
      <ul class="ray-grid ray-grid--3">
        <li v-for="l in RAY_LAYERS" :key="l.n" class="ray-card">
          <div class="ray-card__top">
            <RayIcon :glyph="l.icon" />
            <span class="ray-card__n">{{ l.n }}</span>
          </div>
          <h3 class="ray-card__title">{{ l.headline[0] }}<br>{{ l.headline[1] }}</h3>
          <p class="ray-body">{{ l.body }}</p>
          <ul class="ray-tags">
            <li v-for="t in l.techs" :key="t" class="ray-tag">{{ t }}</li>
          </ul>
        </li>
      </ul>
    </div>
  </section>
</template>
