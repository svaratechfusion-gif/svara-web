<script setup lang="ts">
// Scene 05 "SVARA" — the AI Core's activation happens in IntelligenceWorld.vue
// (same nucleus position as Scene 02, now bright + reconnected). This
// component registers the scroll range and reveals the wordmark/headline
// only once activation is underway — the message should land after the
// visual reveal, not compete with it.
import { sectionSvh } from "~~/lib/experience/pacing";

const { sceneProgress } = useIntelligenceWorld();
const sectionRef = useSceneRange("svara");

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

// Reveals across the back half of the scene, once reconnection is visibly
// underway — mirrors HeroSection.vue's existing --copy-progress idiom
// rather than inventing a new reveal mechanism.
const reveal = computed(() => clamp01((sceneProgress("svara") - 0.4) / 0.5));
</script>

<template>
  <section ref="sectionRef" class="scene-svara" :style="{ height: `${sectionSvh('svara')}svh` }">
    <!-- No paragraph. Ever. The reconnection IS the message — the visitor
         understands "SVARA reconnects intelligence" from watching the core
         wake; these few words only confirm it. -->
    <div class="scene-svara__copy" :style="{ '--reveal': reveal }">
      <p class="scene-svara__wordmark">SVARA</p>
      <h2 class="scene-svara__headline">Intelligence, reconnected.</h2>
    </div>
  </section>
</template>

<style scoped>
.scene-svara {
  position: relative;
  /* height comes from the pacing table via useSceneRange (inline style). */
}

.scene-svara__copy {
  position: sticky;
  top: 0;
  display: flex;
  height: 100svh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  text-align: center;
  opacity: var(--reveal);
  transform: translateY(calc((1 - var(--reveal)) * 24px));
}

.scene-svara__wordmark {
  color: var(--color-svara-blue);
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.scene-svara__headline {
  max-width: 46rem;
  padding-inline: 24px;
  color: var(--color-primary);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  line-height: 1.08;
}

@media (prefers-reduced-motion: reduce) {
  .scene-svara__copy {
    transition: none;
  }
}
</style>
