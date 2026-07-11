<script setup lang="ts">
withDefaults(defineProps<{
  /** uppercase technical register */
  uppercase?: boolean
}>(), { uppercase: true })
</script>

<template>
  <span class="mono-label" :class="{ 'mono-label--upper': uppercase }">
    <slot />
  </span>
</template>

<style scoped>
.mono-label {
  font-family: var(--font-mono);
  font-size: var(--type-label);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-label);
  color: var(--color-text-secondary);
  font-variant-numeric: tabular-nums;
}
.mono-label--upper { text-transform: uppercase; }
</style>
