<script setup lang="ts">
// SCROLL PROGRESS — a hairline readout of how far down the document you are.
//
// It renders no JS of its own: `scroll-motion.client.ts` already publishes
// `--scroll-progress` (0 → 1) on <html> from the site's single gsap.ticker, so this is a
// pure CSS consumer. That keeps the per-frame cost to one transform on one element and
// means the bar works identically under reduced motion (where Lenis is not initialised
// and the value comes from native scroll).
//
// `scaleX` on a pre-composited element rather than `width`, so the frame never relayouts.
// aria-hidden: it is decorative — a screen-reader user already knows their position, and
// announcing a value that changes every frame would be hostile.
</script>

<template>
  <div class="sprog" aria-hidden="true">
    <span class="sprog__bar" />
  </div>
</template>

<style scoped>
.sprog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  z-index: 9998; /* under the chatbot (9999), over page chrome */
  pointer-events: none;
  background: transparent;
}

.sprog__bar {
  display: block;
  height: 100%;
  width: 100%;
  transform-origin: 0 50%;
  /* the whole animation: one var, one transform */
  transform: scaleX(var(--scroll-progress, 0));
  background: linear-gradient(90deg, rgba(0, 229, 255, 0.85) 0%, #6ba6ff 55%, rgba(255, 42, 138, 0.75) 100%);
  will-change: transform;
}

/* the bar brightens while the page is actually moving, then settles */
.sprog__bar { opacity: 0.55; transition: opacity 0.35s ease; }
:global(html.is-scrolling) .sprog__bar { opacity: 1; }

@media (prefers-reduced-motion: reduce) {
  .sprog__bar { transition: none; opacity: 1; }
}
</style>
