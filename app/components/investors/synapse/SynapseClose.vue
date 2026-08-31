<script setup lang="ts">
// CLOSING BAND — the reference's footer composition (video left, statement
// right). It is a closing SECTION, not the footer: the site's real Footer.vue
// follows it, so the page never carries a second, divergent copy of the site's
// navigation.
const VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_080203_fd7f4f85-3a86-4837-8192-85e7bfe68e75.mp4'
</script>

<template>
  <section class="syn-close">
    <div class="syn-close__media">
      <video class="syn-close__video" :src="VIDEO" autoplay muted loop playsinline preload="auto" aria-hidden="true" />
    </div>
    <div class="syn-close__copy">
      <div>
        <div class="syn-close__brand">
          <img src="/brand/logo/svara-logo-white.svg" alt="" class="syn-close__logo">
        </div>
        <p class="syn-close__lead">
          Enterprise intelligence infrastructure — a category defined at the intersection of AI,
          IoT, industrial automation and enterprise software.
        </p>
      </div>
      <NuxtLink to="/contact" class="syn-close__cta">Request the thesis</NuxtLink>
    </div>
  </section>
</template>
