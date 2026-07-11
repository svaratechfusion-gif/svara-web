<script setup lang="ts">
withDefaults(defineProps<{
  /** vertical rhythm: 'default' = --section-y · 'compact' = half · 'none' */
  spacing?: 'default' | 'compact' | 'none'
  /** paints --color-surface behind the section */
  surface?: boolean
  /** semantic tag */
  as?: string
}>(), { spacing: 'default', surface: false, as: 'section' })
</script>

<template>
  <component
    :is="as"
    class="section"
    :class="[`section--${spacing}`, { 'section--surface': surface }]"
  >
    <slot />
  </component>
</template>

<style scoped>
.section { position: relative; }
.section--default { padding-block: var(--section-y); }
.section--compact { padding-block: calc(var(--section-y) / 2); }
.section--none { padding-block: 0; }
.section--surface { background: var(--color-surface); }
</style>
