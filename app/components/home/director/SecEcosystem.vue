<script setup lang="ts">
/**
 * 02 · THE CONNECTED ECOSYSTEM — the reference's card-grid archetype.
 *
 * Heading, a lead paragraph with two label/value rows beside it, then the grid:
 * one wide card carrying the Intelligence Loop (its five layers, verbatim from
 * lib/content/platform.ts) with the dotted circular CTA, and two supporting
 * cards that blur-reveal 150ms and 300ms behind it.
 */
import { dxEcosystem } from '~~/lib/content/home-view'
import ScrambleHeading from '~/components/home/director/ScrambleHeading.vue'
import RevealBox from '~/components/home/director/RevealBox.vue'
</script>

<template>
  <section id="ecosystem" class="dx-section dxf" aria-labelledby="dxe-h">
    <div class="dx-head dxf__head">
      <div class="dx-head__left">
        <ScrambleHeading id="dxe-h" :faded="dxEcosystem.heading.faded" :bold="dxEcosystem.heading.bold" />
      </div>
    </div>

    <div class="dxf__mid">
      <div class="dxf__mid-l">
        <p class="dx-lead">{{ dxEcosystem.lead }}</p>
      </div>
      <div class="dxf__mid-r">
        <div v-for="pair in dxEcosystem.pairs" :key="pair.k" class="dxf__pair">
          <h3 class="dxf__pair-k">{{ pair.k }}</h3>
          <ul v-if="pair.list" class="dxf__list">
            <li v-for="item in pair.list" :key="item">{{ item }}</li>
          </ul>
          <p v-else class="dxf__pair-v">{{ pair.v }}</p>
        </div>
      </div>
    </div>

    <div class="dxf__grid">
      <RevealBox variant="blur" class="dxf__main dx-glass">
        <div class="dxf__main-l">
          <h3 class="dxf__t">{{ dxEcosystem.main.title }}</h3>
          <p class="dxf__b">{{ dxEcosystem.main.body }}</p>
          <ol class="dxf__loop">
            <li
              v-for="(layer, i) in dxEcosystem.main.layers" :key="layer.name"
              class="dxf__loop-row" :style="{ '--i': i }"
            >
              <span class="dxf__loop-n">{{ layer.n }}</span>
              <span class="dxf__loop-name">{{ layer.name }}</span>
              <span class="dxf__loop-b">{{ layer.body }}</span>
            </li>
          </ol>
        </div>
        <NuxtLink class="dx-circle" :to="dxEcosystem.main.cta.to">{{ dxEcosystem.main.cta.label }}</NuxtLink>
      </RevealBox>

      <div class="dxf__side-col">
        <RevealBox
          v-for="(card, i) in dxEcosystem.sides" :key="card.title"
          variant="blur" :delay="(i + 1) * 150" class="dxf__side dx-glass"
        >
          <h4 class="dxf__t">{{ card.title }}</h4>
          <ul v-if="card.chips" class="dxf__chips">
            <li v-for="(chip, ci) in card.chips" :key="chip" class="dx-pill" :style="{ '--i': ci }">{{ chip }}</li>
          </ul>
          <p v-else class="dxf__b" style="margin: 0">{{ card.body }}</p>
        </RevealBox>
      </div>
    </div>
  </section>
</template>
