<script setup lang="ts">
// Glass laid OVER media (e.g. a caption bar on a GlassImage). Absolute
// positioned within any relative parent.
withDefaults(defineProps<{
  position?: 'top' | 'bottom'
  pad?: 4 | 6 | 8
}>(), { position: 'bottom', pad: 6 })
</script>

<template>
  <div
    class="glass-overlay"
    :class="`glass-overlay--${position}`"
    :style="{ padding: `var(--space-${pad})` }"
  >
    <slot />
  </div>
</template>

<style scoped>
.glass-overlay {
  position: absolute;
  left: var(--space-4);
  right: var(--space-4);
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: var(--glass-border);
  border-radius: var(--radius-md);
  box-shadow: var(--glass-shadow);
  box-sizing: border-box;
}
.glass-overlay--top { top: var(--space-4); }
.glass-overlay--bottom { bottom: var(--space-4); }
</style>
