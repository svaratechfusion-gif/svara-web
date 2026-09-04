<script setup lang="ts">
/**
 * 03 · TEN PLATFORMS — the reference's carousel section, carrying the ten
 * platforms of the ecosystem. Each card links to that platform's own page.
 */
import { dxPlatforms } from '~~/lib/content/home-view'
import ScrambleHeading from '~/components/home/director/ScrambleHeading.vue'
import DirectorCarousel from '~/components/home/director/DirectorCarousel.vue'
</script>

<template>
  <section id="platforms" class="dx-section dx-section--ruled dxc" aria-labelledby="dxpl-h">
    <div class="dxc__head">
      <p class="dxc__label">{{ dxPlatforms.label }}</p>
      <ScrambleHeading id="dxpl-h" :faded="dxPlatforms.heading.faded" :bold="dxPlatforms.heading.bold" />
      <p class="dxc__note">{{ dxPlatforms.note }}</p>
    </div>

    <DirectorCarousel :items="dxPlatforms.items" />
  </section>
</template>
