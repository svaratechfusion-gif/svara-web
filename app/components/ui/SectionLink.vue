<script setup lang="ts">
// The homepage's section-to-page bridge. Every section ends with one of
// these — the homepage becomes navigation, dedicated pages become the
// documentation.
withDefaults(defineProps<{
  to: string
  label?: string
}>(), { label: 'Explore' })
</script>

<template>
  <NuxtLink :to="to" class="section-link">
    <span>{{ label }}</span>
    <span class="section-link__arrow" aria-hidden="true">→</span>
  </NuxtLink>
</template>

<style scoped>
.section-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--type-small);
  font-weight: var(--weight-semibold);
  color: var(--color-accent);
  text-decoration: none;
}
.section-link__arrow {
  transition: transform var(--motion-medium) var(--ease-smooth);
}
.section-link:hover .section-link__arrow { transform: translateX(4px); }
.section-link:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; border-radius: var(--radius-sm); }
@media (prefers-reduced-motion: reduce) { .section-link__arrow { transition: none; } }
</style>
