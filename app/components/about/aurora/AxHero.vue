<script setup lang="ts">
/**
 * THE HERO — the clip, full bleed, and nothing on top of it.
 *
 * The reference's aurora beam and its warm sunburst used to sit here as CSS
 * gradients, with the footage dimmed underneath so the beam stayed the one light
 * source. Both are gone: they were a colour layer across the middle of the frame,
 * and the clip could not be seen through them. The film is the hero now, so it is
 * the film that lights the section.
 *
 * The copy keeps its legibility from a text halo (see .abx__hero-inner) rather
 * than from anything laid over the picture.
 *
 * TWO CORNERS, like the other heroes on the site: the name of the thing sits top
 * left, what it means sits bottom right, and the clip runs between them. Splitting
 * the copy to opposite corners is what lets the middle of the frame — the subject
 * of every one of these clips — stay empty.
 *
 * Copy is the Content Bible's own definition of the company, verbatim.
 */
import { companyContent } from '~~/lib/content/company'
import AxVideo from './AxVideo.vue'

/** the Asme hero clip */
const VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4'

const definition = companyContent.canonicalDefinition
</script>

<template>
  <header class="abx__hero">
    <div class="abx__hero-film" aria-hidden="true">
      <AxVideo :src="VIDEO" fade />
    </div>

    <div class="abx__hero-inner">
      <div class="abx__hero-top">
        <p class="abx__eyebrow">SVARA · Enterprise Intelligence Infrastructure</p>
        <h1 class="abx__display">
          The intelligence layer<br>for enterprise operations.
        </h1>
      </div>

      <div class="abx__hero-bot">
        <p class="abx__lede">{{ definition }}</p>

        <div class="abx__actions">
          <NuxtLink to="/platform" class="abx__btn abx__btn--white">
            See the Intelligence Loop <span aria-hidden="true">&#8594;</span>
          </NuxtLink>
          <NuxtLink to="/contact" class="abx__btn abx__btn--ghost">Talk to us</NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>
