<script setup lang="ts">
// Consistent section layout — heading, body, optional evidence/CTA.
// No motion. Pure content grid.

withDefaults(
  defineProps<{
    heading?: string;
    headingTag?: "h2" | "h3";
    wide?: boolean;
    class?: string;
  }>(),
  { headingTag: "h2", wide: false }
);
</script>

<template>
  <ContentSlot :class="class">
    <h2
      v-if="heading"
      :is="headingTag"
      class="text-h2"
    >
      {{ heading }}
    </h2>
    <div :class="wide ? 'max-w-4xl' : 'max-w-2xl'">
      <slot />
    </div>
  </ContentSlot>
</template>
