<script setup lang="ts">
/**
 * 06 · WHY SVARA — the card grid again, at a different rhythm: the first reason
 * takes the wide card with the dotted circular CTA, two ride the side column,
 * and the last two close the section as a pair. Five cards, one stagger.
 */
import { dxWhy } from '~~/lib/content/home-view'
import ScrambleHeading from '~/components/home/director/ScrambleHeading.vue'
import RevealBox from '~/components/home/director/RevealBox.vue'

const [lead, ...rest] = dxWhy.reasons
const sides = rest.slice(0, 2)
const pair = rest.slice(2)
</script>

<template>
  <section id="why" class="dx-section dxf dxw" aria-labelledby="dxw-h">
    <div class="dx-head dxf__head">
      <div class="dx-head__left">
        <ScrambleHeading id="dxw-h" :faded="dxWhy.heading.faded" :bold="dxWhy.heading.bold" />
      </div>
    </div>

    <div class="dxf__grid">
      <RevealBox variant="blur" class="dxf__main dx-glass">
        <div class="dxf__main-l">
          <h3 class="dxf__t">{{ lead!.title }}</h3>
          <p class="dxf__b">{{ lead!.description }}</p>
        </div>
        <NuxtLink class="dx-circle" :to="dxWhy.cta.to">{{ dxWhy.cta.label }}</NuxtLink>
      </RevealBox>

      <div class="dxf__side-col">
        <RevealBox
          v-for="(reason, i) in sides" :key="reason.title"
          variant="blur" :delay="(i + 1) * 150" class="dxf__side dx-glass"
        >
          <h3 class="dxf__t">{{ reason.title }}</h3>
          <p class="dxf__b" style="margin: 0">{{ reason.description }}</p>
        </RevealBox>
      </div>
    </div>

    <div class="dxw__pair">
      <RevealBox
        v-for="(reason, i) in pair" :key="reason.title"
        variant="blur" :delay="i * 150" class="dxf__side dx-glass"
      >
        <h3 class="dxf__t">{{ reason.title }}</h3>
        <p class="dxf__b" style="margin: 0">{{ reason.description }}</p>
      </RevealBox>
    </div>
  </section>
</template>
