<script setup lang="ts">
// THE image treatment for the whole site: every image renders through this
// component — glass frame, reflection, soft shadow, 28px radius.
withDefaults(defineProps<{
  src: string
  alt: string
  /** aspect ratio, e.g. '16/10'; 'auto' = natural */
  ratio?: string
  loading?: 'lazy' | 'eager'
}>(), { ratio: 'auto', loading: 'lazy' })
</script>

<template>
  <figure class="glass-image" :style="ratio !== 'auto' ? { aspectRatio: ratio } : undefined">
    <img :src="src" :alt="alt" :loading="loading" class="glass-image__img" >
    <span class="glass-image__reflection" aria-hidden="true" />
  </figure>
</template>

<style scoped>
.glass-image {
  position: relative;
  margin: 0;
  border: var(--glass-border);
  border-radius: var(--glass-radius);
  box-shadow: var(--glass-shadow);
  overflow: hidden;
}
.glass-image__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.glass-image__reflection {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--glass-reflection);
  opacity: 0.35;
  pointer-events: none;
}
</style>
