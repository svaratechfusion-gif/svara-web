<script setup lang="ts">
// THE AURORA BEAM — Huly's signature visual, and its strictest rule: "it should
// appear once per page, not repeated", "never as a full background fill".
//
// A narrow vertical streak, ~18% of page width, running Electric Iris → Ember Pulse
// → white, with the warm radial sunburst at its base. It is painted in CSS, so it
// costs nothing and scales cleanly, and it sits BEHIND the particle head rather than
// over it — the humanoid stays the page's subject and the aurora is the sky it
// travels through.
</script>

<template>
  <div class="au-beam" aria-hidden="true">
    <span class="au-beam__streak" />
    <span class="au-beam__burst" />
  </div>
</template>
