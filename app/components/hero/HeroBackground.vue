<script setup lang="ts">
// Design Language §03 — Background Architectural Language.
// Four quiet layers, all ≤5% presence, aligned to the grid: a soft directional
// daylight wash (same key direction as the Chassis lighting), a blueprint grid,
// and two faint recessed depth planes implying a room, not a void. Static.
</script>

<template>
  <div class="hero-bg" aria-hidden="true">
    <div class="hero-bg__grid" />
    <div class="hero-bg__depth" />
  </div>
</template>

<style scoped>
.hero-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  /* Light: one soft daylight gradient from upper-left. */
  background: radial-gradient(120% 90% at 22% 6%, #ffffff 0%, var(--bg) 55%, #EEF2F7 100%);
}

/* Grid: blueprint lattice, ~5%, faded at the edges so it only resolves centrally. */
.hero-bg__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--fg) 1px, transparent 1px),
    linear-gradient(90deg, var(--fg) 1px, transparent 1px);
  background-size: 32px 32px;
  opacity: 0.05;
  -webkit-mask-image: radial-gradient(130% 100% at 50% 42%, #000 55%, transparent 100%);
  mask-image: radial-gradient(130% 100% at 50% 42%, #000 55%, transparent 100%);
}

/* Depth: two faint recessed planes set BEHIND the object (right side only),
   implying a room without reading as a stray outline. */
.hero-bg__depth {
  position: absolute;
  inset: 20% 8% 16% 52%;
  border: 1px solid var(--border);
  border-radius: 4px;
  opacity: 0.35;
}
.hero-bg__depth::after {
  content: "";
  position: absolute;
  inset: 10% 12%;
  border: 1px solid var(--border);
  border-radius: 4px;
  opacity: 0.7;
}

@media (prefers-reduced-motion: reduce) { /* static already; nothing to disable */ }
</style>
