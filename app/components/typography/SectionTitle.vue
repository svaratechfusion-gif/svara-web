<script setup lang="ts">
withDefaults(defineProps<{
  as?: 'h2' | 'h3' | 'div'
}>(), { as: 'h2' })
</script>

<template>
  <component :is="as" class="section-title">
    <slot />
  </component>
</template>

<style scoped>
.section-title {
  margin: 0;
  font-family: var(--font-sans);
  font-size: var(--type-title);
  font-weight: var(--weight-bold);
  line-height: var(--leading-title);
  letter-spacing: var(--tracking-title);
  color: var(--color-text);
  text-align: left;
  text-wrap: balance;
}
</style>
