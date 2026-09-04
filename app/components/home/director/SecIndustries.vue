<script setup lang="ts">
/**
 * 05 · INDUSTRIES — fifteen destinations, so the card archetype would drown the
 * page. Instead the design's glass recipe becomes a dense field of numbered
 * cells: the same border, blur and hover language at list scale.
 */
import { dxIndustries } from '~~/lib/content/home-view'
import ScrambleHeading from '~/components/home/director/ScrambleHeading.vue'
import RevealBox from '~/components/home/director/RevealBox.vue'
</script>

<template>
  <section id="industries" class="dx-section dx-section--ruled dxi" aria-labelledby="dxi-h">
    <div class="dx-head">
      <div class="dx-head__left">
        <ScrambleHeading id="dxi-h" :faded="dxIndustries.heading.faded" :bold="dxIndustries.heading.bold" />
      </div>
      <div class="dx-head__right">
        <p class="dx-body-sm">{{ dxIndustries.intro }}</p>
      </div>
    </div>

    <RevealBox variant="blur">
      <ul class="dxi__grid">
        <li v-for="item in dxIndustries.items" :key="item.n">
          <NuxtLink class="dxi__cell dx-glass" :to="item.to">
            <span class="dxi__top">
              <span class="dxi__name">{{ item.name }}</span>
              <span class="dxi__n">{{ item.n }}</span>
            </span>
            <!-- the industries page's own artwork for this environment; the name
                 above already labels it, so the image is decorative -->
            <span class="dxi__shot" :style="{ '--dx-img': `url('${item.image}')` }" role="presentation" />
          </NuxtLink>
        </li>
      </ul>
    </RevealBox>
  </section>
</template>
