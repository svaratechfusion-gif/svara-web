<script setup lang="ts">
/**
 * 04 · SIX DIVISIONS — the card archetype in a three-across grid, each division
 * named above its own artwork. The frame is cut to the source's native 1:1, so
 * nothing is cropped; the earlier 4/3 frame was quietly trimming the top and
 * bottom off every render.
 */
import { dxDivisions } from '~~/lib/content/home-view'
import ScrambleHeading from '~/components/home/director/ScrambleHeading.vue'
import RevealBox from '~/components/home/director/RevealBox.vue'
</script>

<template>
  <section id="divisions" class="dx-section dxd" aria-labelledby="dxd-h">
    <div class="dx-head">
      <div class="dx-head__left">
        <ScrambleHeading id="dxd-h" :faded="dxDivisions.heading.faded" :bold="dxDivisions.heading.bold" />
      </div>
      <div class="dx-head__right">
        <p class="dx-body-sm">{{ dxDivisions.description }}</p>
        <NuxtLink class="dx-btn" :to="dxDivisions.cta.to">{{ dxDivisions.cta.label }}</NuxtLink>
      </div>
    </div>

    <ul class="dxd__grid">
      <li v-for="(item, i) in dxDivisions.items" :key="item.name" class="dxd__cell dx-glass">
        <header class="dxd__head">
          <span class="dxd__n">{{ item.n }}</span>
          <h3 class="dxd__t">{{ item.name }}</h3>
        </header>

        <RevealBox variant="mask" direction="top" :delay="(i % 3) * 150" class="dxd__reveal">
          <div class="dxd__inner" :style="{ '--dx-img': `url('${item.image}')` }" role="img" :aria-label="item.name" />
        </RevealBox>
      </li>
    </ul>
  </section>
</template>
