<script setup lang="ts">
// The Caldera opening beat: ultrabold compressed display at near-architectural scale,
// DM Sans medium body, the ember pill and its quieter outlined partner, and the
// halftone block as the visual centrepiece.
//
// The 189px display is the reference's signature — "compressed, almost structural
// rather than typographic" — with the unusual POSITIVE tracking that keeps the heavy
// strokes from closing up.
import ForgeHalftone from './ForgeHalftone.vue'
</script>

<template>
  <section class="fg fg-hero" aria-labelledby="fg-hero-title">
    <div class="fg__wrap fg-hero__grid">
      <div class="fg-hero__copy">
        <p class="fg-eyebrow">The intelligence layer</p>
        <h2 id="fg-hero-title" class="fg-display">
          BUILT<br>TO<br>THINK
        </h2>
        <p class="fg-body fg-hero__lead">
          SVARA engineers the enterprise intelligence layer — sensing, reasoning,
          prediction and action as one connected operating system.
        </p>
        <div class="fg-actions">
          <NuxtLink to="/products" class="fg-btn fg-btn--ember">Explore the stack</NuxtLink>
          <NuxtLink to="/architecture" class="fg-btn fg-btn--outline">See the architecture</NuxtLink>
        </div>
      </div>

      <ForgeHalftone tone="hero" />
    </div>
  </section>
</template>
