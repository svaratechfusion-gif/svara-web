<script setup lang="ts">
// Scene 08 "Scale" — the continuous camera dolly-out and background lattice
// reveal live in IntelligenceWorld.vue; this component registers the scroll
// range and renders the one short caption line.
import { sectionSvh } from "~~/lib/experience/pacing";

const { sceneProgress } = useIntelligenceWorld();
const sectionRef = useSceneRange("scale");

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

// Timed WITH the sudden lattice resolve (IntelligenceWorld reveals it over
// scale 0.6→0.88) — the words land as the realization does, not before.
const reveal = computed(() => clamp01((sceneProgress("scale") - 0.68) / 0.24));
</script>

<template>
  <section ref="sectionRef" class="scene-scale" :style="{ height: `${sectionSvh('scale')}svh` }">
    <p class="scene-scale__caption" :style="{ opacity: reveal }">
      Everything you just explored is one node. That is SVARA.
    </p>
  </section>
</template>

<style scoped>
.scene-scale {
  position: relative;
  /* height comes from the pacing table via useSceneRange (inline style). */
}

.scene-scale__caption {
  position: sticky;
  top: 0;
  display: flex;
  height: 100svh;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: clamp(48px, 8vh, 96px);
  color: var(--color-primary);
  font-size: clamp(1.1rem, 2.2vw, 1.4rem);
  font-weight: 600;
}
</style>
