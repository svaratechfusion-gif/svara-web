<script setup lang="ts">
// STATUS BADGE PILL — fully rounded, a status hue behind it, sitting inside a light
// tag surface. Kept in the home palette rather than the reference's mint and honey.
defineProps<{ tone?: 'live' | 'pending' }>()
</script>

<template>
  <span class="fam-badge" :class="tone ? `fam-badge--${tone}` : undefined"><slot /></span>
</template>
