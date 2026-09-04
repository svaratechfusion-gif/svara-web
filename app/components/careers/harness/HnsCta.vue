<script setup lang="ts">
/**
 * CLOSING — one filled white pill, which is the page's single primary action,
 * beside one ghost. The reference allows exactly one filled control per screen.
 */
</script>

<template>
  <div class="hns__well">
    <h2 class="hns__h2">Think you should be here?</h2>
    <p class="hns__lede">
      Tell us what you want to build. The strongest introductions start with the work.
    </p>
    <div class="hns__actions">
      <NuxtLink to="/contact" class="hns__pill hns__pill--fill">
        Introduce yourself <span aria-hidden="true">&#8594;</span>
      </NuxtLink>
      <NuxtLink to="/about" class="hns__pill">About SVARA</NuxtLink>
    </div>
  </div>
</template>
