<script setup lang="ts">
/**
 * WHAT WE DO WITH IT — the previous (Asme) design's capability cards, brought
 * across: a clip filling each card, a gradient foot, and the copy sitting on it.
 *
 * These two use cases are the only Content Bible entries this page had not yet
 * spent, which is why the treatment lands here rather than being invented for a
 * band that already says something.
 *
 * The copy used to sit on a gradient laid over the clip. It sits UNDER the clip
 * now: the picture plays unobstructed and the text is on solid card colour
 * instead of over moving footage. The Asme original's hover zoom is kept — a
 * still card holding a moving picture reads as a bug.
 */
import { companyContent } from '~~/lib/content/company'
import AxVideo from './AxVideo.vue'

const CARDS = [
  {
    tag: 'Platform',
    use: companyContent.useCases[0]!,
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4',
  },
  {
    tag: 'Category',
    use: companyContent.useCases[1]!,
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4',
  },
]
</script>

<template>
  <div>
    <div class="abx__head">
      <p class="abx__eyebrow">What it does</p>
      <h2 class="abx__h2">One layer, two jobs.</h2>
    </div>

    <div class="abx__grid abx__grid--2">
      <article v-for="card in CARDS" :key="card.use.title" class="abx__vcard">
        <div class="abx__vcard-film" aria-hidden="true">
          <AxVideo :src="card.video" />
        </div>
        <div class="abx__vcard-body">
          <span class="abx__tag">{{ card.tag }}</span>
          <h3 class="abx__h3">{{ card.use.title }}</h3>
          <p class="abx__body">{{ card.use.description }}</p>
        </div>
      </article>
    </div>
  </div>
</template>
