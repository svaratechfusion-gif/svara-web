<script setup lang="ts">
// EVOLVE layout — the Home page is intentionally a different visual system: a bare
// black canvas with NO global navigation, footer, background or app-shell. The
// Evolve hero provides its own minimal navigation (per spec). Other routes keep the
// default layout (global header/footer) untouched.
</script>

<template>
  <div class="evolve-layout">
    <slot />
  </div>
</template>

<style scoped>
.evolve-layout { min-height: 100dvh; background: #000; color: #fff; }
</style>
