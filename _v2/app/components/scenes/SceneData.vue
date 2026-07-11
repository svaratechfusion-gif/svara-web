<script setup lang="ts">
// Scene 07 "Data Collapse" — the torrent + the uneased 80% cut both live in
// IntelligenceWorld.vue; this component registers the scroll range and
// renders the TINY caption that appears only after the silence. The visitor
// experiences the loss first — the caption confirms it, quietly. It must
// never read as a stat card.
//
// Timing: the disconnect cut fires at beat fraction 0.6 = 96svh into a
// 160svh beat, and this section's sticky range spans 130svh (weight + hold
// − one viewport), so the cut lands at sceneProgress ≈ 0.74. The caption
// waits until 0.82 — a held breath of pure emptiness between loss and word.
import { sectionSvh } from "~~/lib/experience/pacing";

const { sceneProgress } = useIntelligenceWorld();
const sectionRef = useSceneRange("data");

const captionVisible = computed(() => sceneProgress("data") >= 0.82);
</script>

<template>
  <section ref="sectionRef" class="scene-data" :style="{ height: `${sectionSvh('data')}svh` }">
    <p class="scene-data__caption" :class="{ 'scene-data__caption--visible': captionVisible }">
      <span class="scene-data__figure">80%</span>
      <span class="scene-data__line">of enterprise intelligence</span>
      <span class="scene-data__line">never becomes action.</span>
    </p>
  </section>
</template>

<style scoped>
.scene-data {
  position: relative;
  /* height comes from the pacing table via useSceneRange (inline style). */
}

.scene-data__caption {
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  height: 100svh;
  max-width: 32rem;
  margin-inline: auto;
  padding-inline: 24px;
  text-align: center;
  opacity: 0;
  /* A slow, quiet arrival — the hard cut was the particle system's moment;
     the caption surfaces out of the silence, it never snaps. */
  transition: opacity 0.9s ease;
}

.scene-data__caption--visible {
  opacity: 1;
}

/* Tiny. You don't read it — you experience the loss; this just names it. */
.scene-data__figure {
  color: var(--color-primary);
  font-size: 1.05rem;
  font-weight: 650;
  letter-spacing: 0.14em;
}

.scene-data__line {
  color: var(--color-muted);
  font-size: 0.85rem;
  font-weight: 450;
  letter-spacing: 0.04em;
}

@media (prefers-reduced-motion: reduce) {
  .scene-data__caption {
    transition: none;
  }
}
</style>
