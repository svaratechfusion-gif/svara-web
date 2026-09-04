<script setup lang="ts">
/**
 * WHAT THE COMPANY IS BUILT ON — the four pillars from the Content Bible's own
 * architecture block, as the reference's feature-card grid: dark card, hairline
 * border, no drop shadow. Two carry the radial gradient bleed, alternating warm
 * and cool, so the glow reads as punctuation rather than decoration on every card.
 *
 * THE FILM BESIDE THE LEDE is the previous (Asme) design's "Our Story" treatment,
 * brought back where its copy already lives: this lede IS the founding story, so
 * the clip sits with it rather than in a band of its own repeating it. The frame
 * gives the clip an edge on the dark band; the caption sits under it, so nothing
 * covers the picture.
 */
import { companyContent } from '~~/lib/content/company'
import AxVideo from './AxVideo.vue'

/** the Asme "Our Story" clip */
const VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4'

const pillars = companyContent.architecture.components
</script>

<template>
  <div>
    <div class="abx__split">
      <div class="abx__head abx__head--flush">
        <p class="abx__eyebrow">What we are</p>
        <h2 class="abx__h2">Built on one idea, carried through four.</h2>
        <p class="abx__lede">{{ companyContent.architecture.overview }}</p>
      </div>

      <figure class="abx__film">
        <div class="abx__film-shot"><AxVideo :src="VIDEO" /></div>
        <figcaption class="abx__film-foot">The Intelligence Loop, running.</figcaption>
      </figure>
    </div>

    <div class="abx__grid abx__grid--4">
      <article
        v-for="(pillar, i) in pillars" :key="pillar.name"
        class="abx__card"
        :class="{ 'abx__card--glow': i === 0, 'abx__card--iris abx__card--glow': i === 2 }"
      >
        <span class="abx__card-n">{{ String(i + 1).padStart(2, '0') }}</span>
        <h3 class="abx__h3">{{ pillar.name }}</h3>
        <p class="abx__body">{{ pillar.description }}</p>
      </article>
    </div>
  </div>
</template>
