<script setup lang="ts">
// Generic page shell: paints the ground, hosts fixed chrome (nav) and the
// page content. Knows nothing about the brand.
</script>

<template>
  <div class="app-shell">
    <slot name="background" />
    <slot name="navigation" />
    <main class="app-shell__main">
      <slot />
    </main>
    <slot name="footer" />
  </div>
</template>

<style scoped>
.app-shell {
  position: relative;
  min-height: 100vh;
  /* No background here: the ground is painted by html (tokens) and the
     #background slot's fixed canvas at z-index:-1 — an opaque layer here
     would sit above and hide it. */
  color: var(--color-text);
  font-family: var(--font-sans);
  display: flex;
  flex-direction: column;
}
.app-shell__main {
  flex: 1;
  position: relative;
}
</style>
