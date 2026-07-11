<script setup lang="ts">
// GlassPanel specialization for content cards: same glass recipe plus an
// optional interactive hover treatment (lift + deepened shadow).
import GlassPanel from './GlassPanel.vue'

withDefaults(defineProps<{
  interactive?: boolean
  pad?: 4 | 6 | 8 | 12 | 16
}>(), { interactive: false, pad: 8 })
</script>

<template>
  <GlassPanel :pad="pad" class="glass-card" :class="{ 'glass-card--interactive': interactive }">
    <slot />
  </GlassPanel>
</template>

<style scoped>
.glass-card--interactive {
  transition:
    transform var(--motion-medium) var(--ease-smooth),
    box-shadow var(--motion-medium) var(--ease-smooth);
}
.glass-card--interactive:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-large);
}
@media (prefers-reduced-motion: reduce) {
  .glass-card--interactive { transition: none; }
  .glass-card--interactive:hover { transform: none; }
}
</style>
