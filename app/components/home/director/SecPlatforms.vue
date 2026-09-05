<script setup lang="ts">
/**
 * 03 · TEN PLATFORMS — the reference's carousel section, carrying the ten
 * platforms of the ecosystem. Each card links to that platform's own page.
 *
 * Each card's figure is also a live 3D metaphor for what that product does —
 * see PlatformViews, which paints all ten through one scissored WebGL context
 * without touching the carousel's markup. `is-gl` is set only once a context
 * exists, so the still artwork remains the default everywhere else.
 */
import { ref } from 'vue'
import { dxPlatforms } from '~~/lib/content/home-view'
import ScrambleHeading from '~/components/home/director/ScrambleHeading.vue'
import DirectorCarousel from '~/components/home/director/DirectorCarousel.vue'
import PlatformViews from '~/components/home/director/PlatformViews.vue'

const root = ref<HTMLElement | null>(null)
const gl = ref(false)
</script>

<template>
  <section
    id="platforms" ref="root" class="dx-section dx-section--ruled dxc"
    :class="{ 'is-gl': gl }" aria-labelledby="dxpl-h"
  >
    <div class="dxc__head">
      <p class="dxc__label">{{ dxPlatforms.label }}</p>
      <ScrambleHeading id="dxpl-h" :faded="dxPlatforms.heading.faded" :bold="dxPlatforms.heading.bold" />
      <p class="dxc__note">{{ dxPlatforms.note }}</p>
    </div>

    <DirectorCarousel :items="dxPlatforms.items" />

    <ClientOnly>
      <PlatformViews :root="root" @live="gl = $event" />
    </ClientOnly>
  </section>
</template>
