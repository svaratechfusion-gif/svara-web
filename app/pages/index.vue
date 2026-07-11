<script setup lang="ts">
// SVARA 2.0 — placeholder. The V4 homepage is built section-by-section after
// Sprint 0 approval. V1 homepage lives in archive/v1/ and git history.
</script>

<template>
  <main class="v2-placeholder">
    <h1>SVARA</h1>
    <p>Version 2.0 — under construction.</p>
  </main>
</template>

<style scoped>
.v2-placeholder {
  min-height: calc(100vh - var(--header-height, 64px));
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 clamp(24px, 6vw, 64px);
  gap: 8px;
}
.v2-placeholder h1 {
  font-family: var(--font-display);
  font-size: clamp(40px, 6vw, 80px);
  letter-spacing: -0.03em;
  margin: 0;
  color: var(--fg);
}
.v2-placeholder p {
  font-family: var(--font-sans);
  color: var(--fg-muted);
  margin: 0;
}
</style>
