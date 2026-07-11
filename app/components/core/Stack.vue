<script setup lang="ts">
withDefaults(defineProps<{
  /** spacing token step: 2·4·6·8·12·16·20·24·32 (8px system) */
  gap?: 2 | 4 | 6 | 8 | 12 | 16 | 20 | 24 | 32
  /** flex direction */
  direction?: 'column' | 'row'
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between'
}>(), { gap: 8, direction: 'column', align: 'stretch', justify: 'start' })
</script>

<template>
  <div
    class="stack"
    :style="{
      '--stack-gap': `var(--space-${gap})`,
      flexDirection: direction,
      alignItems: align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : align,
      justifyContent: justify === 'between' ? 'space-between'
        : justify === 'start' ? 'flex-start'
        : justify === 'end' ? 'flex-end' : justify,
    }"
  >
    <slot />
  </div>
</template>

<style scoped>
.stack {
  display: flex;
  gap: var(--stack-gap);
}
</style>
