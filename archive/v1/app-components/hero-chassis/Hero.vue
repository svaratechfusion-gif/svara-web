<script setup lang="ts">
import HeroLayout from './HeroLayout.vue'
import HeroBackground from './HeroBackground.vue'
</script>

<template>
  <section class="hero">
    <HeroBackground />
    <HeroLayout />
  </section>
</template>

<style scoped>
.hero {
  position: relative;
}
</style>
