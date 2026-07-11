<script setup lang="ts">
// The canonical glass implementation. Every other glass component composes
// this exact recipe (tokens only): bg .18 white · blur 24 · border .35 ·
// top reflection · very soft shadow · radius 28.
withDefaults(defineProps<{
  /** padding step on the 8px system */
  pad?: 4 | 6 | 8 | 12 | 16
  as?: string
}>(), { pad: 8, as: 'div' })
</script>

<template>
  <component :is="as" class="glass-panel" :style="{ padding: `var(--space-${pad})` }">
    <slot />
  </component>
</template>

<style scoped>
.glass-panel {
  position: relative;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: var(--glass-border);
  border-radius: var(--glass-radius);
  box-shadow: var(--glass-shadow);
  box-sizing: border-box;
  overflow: hidden;
}
/* top reflection */
.glass-panel::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--glass-reflection);
  pointer-events: none;
}
.glass-panel > :deep(*) { position: relative; }
</style>
