<script setup lang="ts">
withDefaults(defineProps<{
  /** visual weight: 'flat' surface color · 'raised' + soft shadow · 'outlined' border only */
  variant?: 'flat' | 'raised' | 'outlined'
  /** radius token */
  radius?: 'sm' | 'md' | 'lg'
  /** padding step on the 8px system */
  pad?: 4 | 6 | 8 | 12 | 16
}>(), { variant: 'flat', radius: 'lg', pad: 8 })
</script>

<template>
  <div
    class="surface"
    :class="[`surface--${variant}`]"
    :style="{ borderRadius: `var(--radius-${radius})`, padding: `var(--space-${pad})` }"
  >
    <slot />
  </div>
</template>

<style scoped>
.surface { box-sizing: border-box; }
.surface--flat { background: var(--color-surface); }
.surface--raised { background: var(--color-bg); box-shadow: var(--shadow-med); }
.surface--outlined { background: transparent; border: 1px solid var(--color-border); }
</style>
