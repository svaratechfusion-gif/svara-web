<script setup lang="ts">
// Isolated prototype route — not linked from nav, excluded from indexing.
// See docs/intelligence-engine-plan.md for why this lives on its own page
// instead of editing the live Hero directly.
useSeoMeta({ robots: "noindex, nofollow" });
</script>

<template>
  <div class="lab-stage">
    <ClientOnly>
      <BirthSequence />
    </ClientOnly>
  </div>
</template>

<style scoped>
.lab-stage {
  position: relative;
  height: 100svh;
  width: 100%;
  background: #f9fafc;
}
</style>
