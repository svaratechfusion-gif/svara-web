<script setup lang="ts">
withDefaults(defineProps<{
  /** 'default' = capped at --container-max · 'full' = uncapped, keeps padding */
  width?: 'default' | 'full'
}>(), { width: 'default' })
</script>

<template>
  <div class="container" :class="{ 'container--full': width === 'full' }">
    <slot />
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--container-pad);
  box-sizing: border-box;
}
.container--full {
  max-width: none;
}
</style>
