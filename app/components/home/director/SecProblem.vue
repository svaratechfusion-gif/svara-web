<script setup lang="ts">
/**
 * 01 · THE PROBLEM — the reference's two-card archetype.
 *
 * The caption sits ABOVE the frame rather than across it. The artwork in this
 * library is light-background 3D renders, and white type laid over them needs
 * either the image dimmed or a plate floated on top of it — both of which spend
 * the photograph to buy legibility. Given its own place on the card's surface,
 * the type is simply readable and the image is simply visible.
 *
 * The image still wipes in through a growing mask, the left card from the top
 * and the right from the bottom, so the pair reads as one gesture opening out.
 */
import { dxProblem } from '~~/lib/content/home-view'
import ScrambleHeading from '~/components/home/director/ScrambleHeading.vue'
import RevealBox from '~/components/home/director/RevealBox.vue'
</script>

<template>
  <section id="problem" class="dx-section dxp" aria-labelledby="dxp-h">
    <div class="dx-head">
      <div class="dx-head__left">
        <ScrambleHeading id="dxp-h" :faded="dxProblem.heading.faded" :bold="dxProblem.heading.bold" />
      </div>
      <div class="dx-head__right">
        <p class="dx-body-sm">{{ dxProblem.description }}</p>
        <NuxtLink class="dx-btn" :to="dxProblem.cta.to">{{ dxProblem.cta.label }}</NuxtLink>
      </div>
    </div>

    <div class="dx-meta">
      <ul class="dx-meta__tags" aria-label="What fragmentation looks like">
        <li v-for="tag in dxProblem.tags" :key="tag" class="dx-pill">{{ tag }}</li>
      </ul>
      <p class="dx-meta__center">{{ dxProblem.centerText }}</p>
      <p class="dx-meta__right">{{ dxProblem.rightText }}</p>
    </div>

    <div class="dxp__cards">
      <article v-for="card in dxProblem.cards" :key="card.title" class="dxp__card dx-glass">
        <header class="dxp__head">
          <span v-if="card.badge" class="dx-pill">{{ card.badge }}</span>
          <h3 class="dxp__t">{{ card.title }}</h3>
          <p v-if="card.body" class="dxp__b">{{ card.body }}</p>
        </header>

        <RevealBox variant="mask" :direction="card.variant === 'left' ? 'top' : 'bottom'" class="dxp__reveal">
          <div class="dxp__inner" :style="{ '--dx-img': `url('${card.image}')` }" role="img" :aria-label="card.alt" />
        </RevealBox>
      </article>
    </div>
  </section>
</template>
