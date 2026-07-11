<script setup lang="ts">
</script>

<template>
  <div class="hero-heading">
    <h1 class="hero-heading__title">
      <span>ENGINEERING</span>
      <span>THE INTELLIGENCE</span>
      <span>LAYER</span>
      <span>OF TOMORROW</span>
    </h1>
    <p class="hero-heading__subhead">AI-native enterprise infrastructure that connects vision, automation, simulation, and intelligence into one unified platform.</p>
  </div>
</template>

<style scoped>
/* Typography per Design Language §02: Geist display, huge, immediate (no
   entrance animation). The widest line ("THE INTELLIGENCE") intentionally
   overruns the 7-col box into the seam — that overrun is what the Chassis
   overlaps. */
.hero-heading__title {
  margin: 0;
  text-align: left;
  font-family: var(--font-display);
  font-size: clamp(44px, 7.6vw, 108px);
  font-weight: 800;
  line-height: 0.92;
  letter-spacing: -0.04em;
  color: var(--fg);
  white-space: nowrap;
}

.hero-heading__title span {
  display: block;
}

.hero-heading__subhead {
  margin: 32px 0 0;
  max-width: 520px;
  font-family: var(--font-sans);
  font-size: clamp(15px, 1.4vw, 18px);
  line-height: 1.5;
  color: var(--fg-muted);
}

@media (max-width: 1024px) {
  .hero-heading__title { white-space: normal; }
}

@media (max-width: 768px) {
  .hero-heading__title { font-size: clamp(34px, 11vw, 56px); }
}
</style>
