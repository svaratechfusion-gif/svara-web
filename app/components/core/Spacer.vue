<script setup lang="ts">
withDefaults(defineProps<{
  /** vertical size step on the 8px system */
  size?: 2 | 4 | 6 | 8 | 12 | 16 | 20 | 24 | 32 | 40
}>(), { size: 16 })
</script>

<template>
  <div class="spacer" :style="{ height: `var(--space-${size})` }" aria-hidden="true" />
</template>

<style scoped>
.spacer { flex-shrink: 0; }
</style>
