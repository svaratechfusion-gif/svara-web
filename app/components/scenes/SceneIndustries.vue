<script setup lang="ts">
// Scene 07 "Industries" — the lateral camera drift and per-industry particle
// environments live in IntelligenceWorld.vue; this component registers the
// scroll range and renders the real-DOM caption tracking whichever industry
// is currently in the camera's foreground.
import { INDUSTRIES } from "~/utils/industries";
import { sectionSvh } from "~~/lib/experience/pacing";

const { activeIndustry } = useIntelligenceWorld();
const sectionRef = useSceneRange("industries");

const current = computed(() => INDUSTRIES.find((industry) => industry.name === activeIndustry.value) ?? null);
</script>

<template>
  <section ref="sectionRef" class="scene-industries" :style="{ height: `${sectionSvh('industries')}svh` }">
    <div class="scene-industries__caption" :class="{ 'scene-industries__caption--visible': !!current }">
      <p class="scene-industries__tagline">One intelligence. Many realities.</p>
      <p v-if="current" class="scene-industries__name">{{ current.name }}</p>
      <p v-if="current" class="scene-industries__copy">{{ current.copy }}</p>
    </div>
    <ul class="scene-industries__full-list">
      <li v-for="industry in INDUSTRIES" :key="industry.name">{{ industry.name }} — {{ industry.copy }}</li>
    </ul>
  </section>
</template>

<style scoped>
.scene-industries {
  position: relative;
  /* height comes from the pacing table via useSceneRange (inline style). */
}

.scene-industries__caption {
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

.scene-industries__caption--visible {
  opacity: 1;
}

.scene-industries__tagline {
  margin-bottom: 4px;
  color: var(--color-muted);
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.scene-industries__name {
  color: var(--color-svara-blue);
  font-size: clamp(1.1rem, 2vw, 1.4rem);
  font-weight: 700;
}

.scene-industries__copy {
  max-width: 26rem;
  padding-inline: 24px;
  color: var(--color-muted);
  font-size: clamp(0.95rem, 1.6vw, 1.1rem);
}

.scene-industries__full-list {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}

@media (prefers-reduced-motion: reduce) {
  .scene-industries__caption {
    transition: none;
  }
}
</style>
