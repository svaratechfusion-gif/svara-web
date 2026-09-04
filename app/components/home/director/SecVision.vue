<script setup lang="ts">
/**
 * 07 · THE VISION — the page stops presenting and states its case. No cards, no
 * imagery: centred type over the humanoid, which by this point in the scroll
 * has receded to a distant intelligence core (chapter 09 of its journey).
 */
import { dxVision } from '~~/lib/content/home-view'
import ScrambleHeading from '~/components/home/director/ScrambleHeading.vue'
import RevealBox from '~/components/home/director/RevealBox.vue'
</script>

<template>
  <section id="vision" class="dx-section dxv" aria-labelledby="dxv-h">
    <ScrambleHeading id="dxv-h" :faded="dxVision.heading.faded" :bold="dxVision.heading.bold" />
    <RevealBox variant="blur" class="dxv__body">
      <p
        v-for="(paragraph, i) in dxVision.paragraphs" :key="paragraph"
        class="dxv__p" :class="{ 'dxv__p--lead': i === dxVision.paragraphs.length - 1 }"
      >{{ paragraph }}</p>
    </RevealBox>
  </section>
</template>
