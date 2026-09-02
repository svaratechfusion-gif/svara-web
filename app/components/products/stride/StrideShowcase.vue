<script setup lang="ts">
// Four full-height columns split by hairlines. On lg the photo is hidden and REVEALS
// bottom-to-top through a clip-path mask when the column is hovered, while a white
// scrim scales up from the base so the dark caption keeps contrast over the image.
//
// The whole column is the hover target, not the clipped layer: a clip-collapsed
// element has no hit area, so it cannot trigger its own reveal. Below lg there is no
// hover, so the photo is simply always visible with a fixed dark scrim.
//
// The reveal is CSS transition rather than a JS spring — it is a hover state, not a
// scroll-driven value, and the source's spring (tension 170, friction 26) settles in
// about the 260ms this uses.
import StrideHeading from './StrideHeading.vue'
import { STRIDE_SHOWCASE } from '~~/lib/stride/content'
</script>

<template>
  <section class="sx-show" aria-labelledby="stride-showcase-title">
    <!-- Heading + CTA. In flow above the cards on mobile/tablet; on lg overlaid on the
         right half. pointer-events are off there so the columns stay hoverable — the
         button re-enables its own. -->
    <div class="sx-show__head">
      <StrideHeading id="stride-showcase-title" :text="STRIDE_SHOWCASE.heading" class="sx-show__title" />
      <button type="button" class="sx-show__cta">{{ STRIDE_SHOWCASE.cta }}</button>
    </div>

    <div class="sx-show__grid">
      <article v-for="item in STRIDE_SHOWCASE.items" :key="item.name" class="sx-show__col">
        <!-- mobile/tablet: always-on photo -->
        <img :src="item.image" alt="" class="sx-show__img sx-show__img--static" loading="lazy" decoding="async">
        <!-- lg: clip-revealed photo -->
        <div class="sx-show__reveal" aria-hidden="true">
          <img :src="item.image" alt="" class="sx-show__img" loading="lazy" decoding="async">
        </div>
        <div class="sx-show__scrim-dark" aria-hidden="true" />
        <div class="sx-show__scrim-light" aria-hidden="true" />
        <div class="sx-show__label">
          <span class="sx-show__line">{{ item.prefix }}</span>
          <span class="sx-show__line">{{ item.name }}</span>
        </div>
      </article>
    </div>
  </section>
</template>
