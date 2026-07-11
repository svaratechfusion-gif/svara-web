<script setup lang="ts">
withDefaults(defineProps<{
  as?: 'h1' | 'h2' | 'div'
}>(), { as: 'h1' })
</script>

<template>
  <component :is="as" class="display-headline">
    <slot />
  </component>
</template>

<style scoped>
.display-headline {
  margin: 0;
  font-family: var(--font-sans);
  font-size: var(--type-display);
  font-weight: var(--weight-extrabold);
  line-height: var(--leading-display);
  letter-spacing: var(--tracking-display);
  color: var(--color-text);
  text-align: left;
  text-wrap: balance;
}
</style>
