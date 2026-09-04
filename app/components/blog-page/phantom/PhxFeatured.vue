<script setup lang="ts">
/**
 * THE FEATURED LEAD — the newest published piece, in the reference's dark mode:
 * aubergine ground, paper-white display type, one lavender pill.
 *
 * It sits on the dark band deliberately: the hero above it is a dark video, so
 * opening dark and then breaking to paper white is the reference's own rhythm
 * rather than a jolt.
 */
defineProps<{
  featured: {
    category: string
    title: string
    dek: string
    to: string | null
    readingTime: string | null
    heroImage?: { name: string, width: number, height: number }
  }
}>()
</script>

<template>
  <div class="phx__feat">
    <div>
      <span class="phx__chiplet">Featured · {{ featured.category }}</span>
      <h2 class="phx__display" style="margin-top: 20px">{{ featured.title }}</h2>
      <p class="phx__lede" style="margin-top: 18px; max-width: 52ch; opacity: 0.8">{{ featured.dek }}</p>
      <p v-if="featured.readingTime" class="phx__cap" style="margin-top: 14px">{{ featured.readingTime }} read</p>

      <div class="phx__actions">
        <NuxtLink :to="featured.to ?? '/technology'" class="phx__pill phx__pill--primary">
          {{ featured.to ? 'Read the article' : 'Read the thinking' }}
          <span aria-hidden="true">&#8599;</span>
        </NuxtLink>
      </div>
    </div>

    <!-- The article's own banner. This reference is a no-photography system, but
         these are the pieces' own artwork — content, not ornament — so they stay,
         in the reference's soft 24px container. -->
    <NuxtLink v-if="featured.heroImage && featured.to" :to="featured.to" class="phx__feat-shot">
      <picture>
        <source :srcset="`/images/insights/${featured.heroImage.name}.webp`" type="image/webp">
        <img
          :src="`/images/insights/${featured.heroImage.name}.png`" alt=""
          :width="featured.heroImage.width" :height="featured.heroImage.height" decoding="async"
        >
      </picture>
    </NuxtLink>
  </div>
</template>
