<script setup lang="ts">
/**
 * WHAT WE ARE NOT — the Content Bible's own comparisons, which are the sharpest
 * statement of the company's position on the page. Pale cards, because a light
 * band never carries a dark card in this system.
 *
 * SUBGRID, because the comparison only reads if it scans ACROSS the cards: the
 * two "Not this" claims sit on one line, the two SVARA answers on another. The
 * descriptions are different lengths, so left to itself each card stacks to its
 * own rhythm and the answers drift out of step. Each card spans the five shared
 * rows of the parent instead, so every row aligns whatever the copy does.
 */
import { companyContent } from '~~/lib/content/company'

const comparisons = companyContent.comparisons
</script>

<template>
  <div>
    <div class="abx__head">
      <p class="abx__eyebrow">The distinction</p>
      <h2 class="abx__h2">A platform, not a project.</h2>
    </div>

    <div class="abx__grid abx__grid--2 abx__grid--rows">
      <article v-for="row in comparisons" :key="row.concept" class="abx__card abx__card--pale abx__vs">
        <span class="abx__tag abx__tag--ember">Not this</span>
        <h3 class="abx__h3">{{ row.concept }}</h3>
        <p class="abx__body">{{ row.description }}</p>
        <span class="abx__tag abx__vs__answer">SVARA</span>
        <p class="abx__body">{{ row.differentiator }}</p>
      </article>
    </div>
  </div>
</template>
