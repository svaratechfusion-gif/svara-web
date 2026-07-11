<script setup lang="ts">
</script>

<template>
  <p class="section-eyebrow">
    <slot />
  </p>
</template>

<style scoped>
.section-eyebrow {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--type-label);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-text-secondary);
  text-align: left;
}
</style>
