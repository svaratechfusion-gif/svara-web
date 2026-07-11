<script setup lang="ts">
// Scene 06 "Products" — the camera orbit and per-product particle behaviors
// live in IntelligenceWorld.vue; this component registers the scroll range
// and renders one real-DOM caption line that tracks whichever product is
// currently in the camera's foreground (activeProduct, written by
// IntelligenceWorld's render loop) — no cards, no icons, no grid.
//
// Vision AI's focus window is the one product moment with its own stage:
// the entire world darkens and a live CCTV monitor (VisionAiFeed) moves
// toward the camera — detection boxes, heatmap, tiny HUD. The dim layer +
// feed live in an absolutely-positioned wrapper so they don't add scroll
// height; only the sticky stage inside it pins to the viewport.
import { PRODUCTS } from "~/utils/products";
import { sectionSvh } from "~~/lib/experience/pacing";

const { activeProductIndex } = useIntelligenceWorld();
const sectionRef = useSceneRange("products");

const current = computed(
  () => (activeProductIndex.value !== null ? PRODUCTS[activeProductIndex.value] ?? null : null)
);
const visionActive = computed(() => current.value?.name === "Vision AI");
</script>

<template>
  <section ref="sectionRef" class="scene-products" :style="{ height: `${sectionSvh('products')}svh` }">
    <div class="scene-products__overlay" aria-hidden="false">
      <div class="scene-products__stage">
        <!-- The entire world darkens for the Vision AI moment. -->
        <div class="scene-products__dim" :class="{ 'scene-products__dim--on': visionActive }" aria-hidden="true" />
        <Transition name="vision-approach">
          <VisionAiFeed v-if="visionActive" class="scene-products__feed" />
        </Transition>
      </div>
    </div>
    <div
      class="scene-products__caption"
      :class="{ 'scene-products__caption--visible': !!current, 'scene-products__caption--dark': visionActive }"
    >
      <p v-if="current" class="scene-products__name">{{ current.name }}</p>
      <p v-if="current" class="scene-products__copy">{{ current.copy }}</p>
    </div>
    <!-- Every product name stays in the accessibility tree/DOM regardless of
         which one is currently visible, so the full list is real, indexable
         content — not just whatever happens to be in view. -->
    <ul class="scene-products__full-list">
      <li v-for="product in PRODUCTS" :key="product.name">{{ product.name }} — {{ product.copy }}</li>
    </ul>
  </section>
</template>

<style scoped>
.scene-products {
  position: relative;
  /* height comes from the pacing table via useSceneRange (inline style). */
}

.scene-products__overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.scene-products__stage {
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100svh;
}

.scene-products__dim {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 44%, rgba(6, 12, 24, 0.86), rgba(2, 5, 12, 0.95));
  opacity: 0;
  transition: opacity 0.8s ease;
}

.scene-products__dim--on {
  opacity: 1;
}

.scene-products__feed {
  position: relative;
}

/* "Moves toward camera": the monitor arrives from depth — scale + rise, a
   fast confident approach, and recedes the same way it came. */
.vision-approach-enter-active {
  transition:
    opacity 0.7s ease,
    transform 0.7s cubic-bezier(0.22, 0.9, 0.32, 1);
}

.vision-approach-leave-active {
  transition:
    opacity 0.45s ease,
    transform 0.45s ease-in;
}

.vision-approach-enter-from,
.vision-approach-leave-to {
  opacity: 0;
  transform: scale(0.72) translateY(30px);
}

.scene-products__caption {
  position: sticky;
  top: 0;
  display: flex;
  height: 100svh;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  padding-bottom: clamp(48px, 8vh, 96px);
  text-align: center;
  opacity: 0;
  /* Nothing pops — captions surface at the world's pace. */
  transition: opacity 0.6s ease;
}

.scene-products__caption--visible {
  opacity: 1;
}

.scene-products__name {
  color: var(--color-svara-blue);
  font-size: clamp(1.1rem, 2vw, 1.4rem);
  font-weight: 700;
  transition: color 0.6s ease;
}

.scene-products__copy {
  max-width: 26rem;
  padding-inline: 24px;
  color: var(--color-muted);
  font-size: clamp(0.95rem, 1.6vw, 1.1rem);
  transition: color 0.6s ease;
}

/* On the darkened Vision AI stage, the caption flips to light ink. */
.scene-products__caption--dark .scene-products__name {
  color: var(--color-electric-blue);
}

.scene-products__caption--dark .scene-products__copy {
  color: rgba(226, 238, 252, 0.72);
}

.scene-products__full-list {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}

@media (prefers-reduced-motion: reduce) {
  .scene-products__caption,
  .scene-products__dim {
    transition: none;
  }

  .vision-approach-enter-active,
  .vision-approach-leave-active {
    transition: opacity 0.3s ease;
  }

  .vision-approach-enter-from,
  .vision-approach-leave-to {
    transform: none;
  }
}
</style>
