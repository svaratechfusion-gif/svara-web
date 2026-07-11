<script setup lang="ts">
// Primary interactive pill. Accent color is reserved for interactive states —
// this is one of the few places it appears.
</script>

<template>
  <NuxtLink to="/contact" class="connect-button">
    Connect
  </NuxtLink>
</template>

<style scoped>
.connect-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  padding-inline: var(--space-8);
  border-radius: var(--radius-pill);
  background: var(--color-text);
  color: var(--color-inverse);
  font-family: var(--font-sans);
  font-size: var(--type-small);
  font-weight: var(--weight-semibold);
  text-decoration: none;
  transition: background var(--motion-medium) var(--ease-smooth),
              transform var(--motion-fast) var(--ease-smooth);
}
.connect-button:hover {
  background: var(--color-accent);
  transform: translateY(-2px);
}
.connect-button:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}
@media (prefers-reduced-motion: reduce) {
  .connect-button { transition: none; }
  .connect-button:hover { transform: none; }
}
</style>
