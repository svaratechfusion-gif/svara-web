<script setup lang="ts">
// ContentSlot is the single entry point for content on every page.
// It manages scroll intersection and provides consistent spacing.
// Content-only — no motion logic.

withDefaults(
  defineProps<{
    tag?: string;
    class?: string;
  }>(),
  { tag: "section" }
);
</script>

<template>
  <component
    :is="tag"
    class="px-8 py-24 md:py-32"
    :class="[class]"
  >
    <div class="mx-auto max-w-7xl">
      <slot />
    </div>
  </component>
</template>
