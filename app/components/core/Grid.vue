<script setup lang="ts">
withDefaults(defineProps<{
  /** number of columns (desktop); collapses responsively */
  cols?: number
  /** gap token: 'gutter' 24 · 'card' 32 · 'section' 80 */
  gap?: 'gutter' | 'card' | 'section'
  /** min column width that triggers auto-collapse below */
  collapse?: string
}>(), { cols: 12, gap: 'gutter', collapse: '280px' })
</script>

<template>
  <div
    class="grid"
    :class="`grid--gap-${gap}`"
    :style="{ '--cols': cols, '--collapse': collapse }"
  >
    <slot />
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
}
.grid--gap-gutter { gap: var(--grid-gutter); }
.grid--gap-card { gap: var(--gap-card); }
.grid--gap-section { gap: var(--gap-section); }

@media (max-width: 1024px) {
  .grid { grid-template-columns: repeat(auto-fit, minmax(var(--collapse), 1fr)); }
}
@media (max-width: 640px) {
  .grid { grid-template-columns: 1fr; }
}
</style>
