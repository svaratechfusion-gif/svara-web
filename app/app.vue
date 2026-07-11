<template>
  <div class="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// Terminal interface - no Lenis/GSAP needed
// Smooth scroll handled by native CSS scroll-behavior
// Animations via CSS transitions and minimal Vue transitions
</script>

<style>
/* Global terminal styles are imported via terminal.client.ts plugin */
/* This file only provides app-level layout */

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Ensure NuxtLayout fills space */
.app > div {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>