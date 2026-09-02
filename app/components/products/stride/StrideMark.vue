<script setup lang="ts">
// One of five flat monochrome logo marks, picked by index (the source's `<Mark i>`).
// All one colour via currentColor — the marquee sets the ink.
//
// Rendered as real elements rather than an SVG string through `v-html`: the shapes are
// hardcoded so there is no injection risk either way, but v-html is a rule the project
// lints against, and a template is just as short here.
const props = defineProps<{ i: number }>()
const shape = computed(() => props.i % 5)
</script>

<template>
  <svg viewBox="0 0 24 24" class="sx-marq__mark" fill="currentColor" aria-hidden="true">
    <circle v-if="shape === 0" cx="12" cy="12" r="9" />
    <rect v-else-if="shape === 1" x="4" y="4" width="16" height="16" rx="5" />
    <path v-else-if="shape === 2" d="M12 2.5 21 20.5 3 20.5Z" />
    <path v-else-if="shape === 3" d="M12 3a9 9 0 1 0 9 9h-9Z" />
    <path v-else d="M12 2l2.6 6.4L21 9l-5 4.2L17.8 20 12 16.3 6.2 20 8 13.2 3 9l6.4-.6z" />
  </svg>
</template>
