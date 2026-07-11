<script setup lang="ts">
withDefaults(defineProps<{
  /** 'body' 20px · 'lead' 24px · 'small' 16px */
  size?: 'body' | 'lead' | 'small'
  /** secondary text color */
  muted?: boolean
}>(), { size: 'body', muted: false })
</script>

<template>
  <p class="paragraph" :class="[`paragraph--${size}`, { 'paragraph--muted': muted }]">
    <slot />
  </p>
</template>

<style scoped>
.paragraph {
  margin: 0;
  max-width: var(--paragraph-max);
  font-family: var(--font-sans);
  font-weight: var(--weight-regular);
  line-height: var(--leading-body);
  letter-spacing: var(--tracking-body);
  color: var(--color-text);
  text-align: left;
}
.paragraph--body { font-size: var(--type-body); }
.paragraph--lead { font-size: var(--type-lead); }
.paragraph--small { font-size: var(--type-small); }
.paragraph--muted { color: var(--color-text-secondary); }
</style>
