<script setup lang="ts">
// THE CINEMATIC BAND — the one place the system breaks its own rules.
//
// The reference is explicit: "color, blur, and scale are cranked to maximum for a
// cinematic moment before the page returns to the austere dark surface below." A blue
// radial wash anchored at 50% 26%, diagonal coral bars cutting across it at 40px+
// blur, reading like a motion-graphics title sequence rather than a background.
//
// Everywhere else on this page coral is rationed to a single selected row. Here it is
// the artwork, which is the only exemption the system grants it.
//
// It is pure decoration, so it is inert and hidden from assistive tech; the content it
// backs is passed through the slot and sits above it.
</script>

<template>
  <div class="ray-atmos">
    <div class="ray-atmos__art" aria-hidden="true">
      <span class="ray-atmos__wash" />
      <span class="ray-atmos__bar ray-atmos__bar--a" />
      <span class="ray-atmos__bar ray-atmos__bar--b" />
      <span class="ray-atmos__bar ray-atmos__bar--c" />
      <span class="ray-atmos__grain" />
    </div>
    <div class="ray-atmos__content"><slot /></div>
  </div>
</template>
