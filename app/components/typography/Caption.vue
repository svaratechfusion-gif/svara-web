<script setup lang="ts">
</script>

<template>
  <p class="caption">
    <slot />
  </p>
</template>

<style scoped>
.caption {
  margin: 0;
  font-family: var(--font-sans);
  font-size: var(--type-caption);
  font-weight: var(--weight-regular);
  line-height: var(--leading-tight);
  color: var(--color-text-secondary);
  text-align: left;
}
</style>
