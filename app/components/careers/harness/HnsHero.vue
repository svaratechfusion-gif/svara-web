<script setup lang="ts">
/**
 * HERO — two corners over the retained Mainframe clip: the name of the thing top
 * left, what it means bottom right, and the picture running between them.
 *
 * NO CARD. The copy used to sit on a Carbon Plate because the clip is pale and
 * white type will not hold on it. The plate is gone by request, so the contrast
 * is bought back on the GLYPHS instead — a multi-stop halo that darkens the few
 * pixels around each letter and leaves the picture untouched. Measured off the
 * real clip across its four seconds, the two corners run at luminance ~155
 * (top-left) and ~120 (bottom-right): mid-tone, which is the worst ground there
 * is for type, so the halo is deliberately heavier than the one on /about.
 *
 * The corners are also why the middle stays empty — that is where the clip's
 * subject is.
 */
const props = defineProps<{ video: string }>()

const EMAIL = 'contact@svaratechfusion.com'
</script>

<template>
  <header class="hns__hero">
    <div class="hns__film" aria-hidden="true">
      <video :src="props.video" autoplay muted loop playsinline preload="auto" />
    </div>
    <div class="hns__film-foot" aria-hidden="true" />

    <div class="hns__hero-inner">
      <div class="hns__hero-top">
        <p class="hns__eyebrow">SVARA · Careers</p>
        <h1 class="hns__display">Build the<br>intelligence layer.</h1>
      </div>

      <div class="hns__hero-bot">
        <p class="hns__lede">
          Enterprise Intelligence Infrastructure is a new category. The patterns,
          the standards and the systems are still being written — and the people
          writing them are the ones who ship.
        </p>

        <div class="hns__actions">
          <a href="#roles" class="hns__pill hns__pill--fill">See where you fit</a>
          <NuxtLink to="/contact" class="hns__pill">Join the talent network</NuxtLink>
        </div>

        <p class="hns__hero-mail">
          Reach us: <a :href="`mailto:${EMAIL}`" class="hns__mail">{{ EMAIL }}</a>
        </p>
      </div>
    </div>
  </header>
</template>
