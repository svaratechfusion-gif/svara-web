<script setup lang="ts">
// Scene 09 "Ending" — everything calms in IntelligenceWorld.vue (motion
// damps, connections fade to a faint minimum, camera settles). This
// component registers the scroll range and renders the closing lines — no
// CTA button, no form, just an understated text link (matching this
// project's existing .link-explore idiom in main.css, minus the SVG icon
// that idiom assumes — a plain arrow character keeps this dependency-free
// per the "no icon library" rule) pointing at the same #contact anchor
// AppHeader's nav already uses.
import { sectionSvh } from "~~/lib/experience/pacing";

const { sceneProgress } = useIntelligenceWorld();
const sectionRef = useSceneRange("ending");

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

const reveal = computed(() => clamp01((sceneProgress("ending") - 0.2) / 0.5));
</script>

<template>
  <section ref="sectionRef" class="scene-ending" :style="{ height: `${sectionSvh('ending')}svh` }">
    <!-- No button. No giant CTA. Just the question, a breath, the answer. -->
    <div class="scene-ending__copy" :style="{ opacity: reveal }">
      <p class="scene-ending__line">Ready to build intelligence?</p>
      <span class="scene-ending__down" aria-hidden="true">&darr;</span>
      <p class="scene-ending__line scene-ending__line--accent">Let's engineer tomorrow.</p>
      <a href="#contact" class="scene-ending__link">Get in touch <span class="scene-ending__arrow">&rarr;</span></a>
    </div>
  </section>
</template>

<style scoped>
.scene-ending {
  position: relative;
  /* height comes from the pacing table via useSceneRange (inline style). */
}

.scene-ending__copy {
  position: sticky;
  top: 0;
  display: flex;
  height: 100svh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  /* Lift the copy off the settled core below — the words and the world
     share the frame without fighting for the same pixels. */
  padding-bottom: 26svh;
  text-align: center;
  /* The closing lines exhale in — the slowest fade on the page. */
  transition: opacity 0.9s ease;
}

.scene-ending__line {
  max-width: 40rem;
  padding-inline: 24px;
  color: var(--color-primary);
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  line-height: 1.15;
}

.scene-ending__line--accent {
  color: var(--color-svara-blue);
}

/* The breath between question and answer — a slow, quiet drift downward. */
.scene-ending__down {
  color: var(--color-muted);
  font-size: 1.4rem;
  animation: scene-ending-drift 2.6s ease-in-out infinite;
}

@keyframes scene-ending-drift {
  0%,
  100% {
    transform: translateY(-4px);
    opacity: 0.5;
  }
  50% {
    transform: translateY(4px);
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .scene-ending__down {
    animation: none;
  }
}

.scene-ending__link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  color: var(--color-svara-blue);
  font-weight: 600;
  text-decoration: none;
}

.scene-ending__arrow {
  transition: transform var(--duration-fast) ease;
}

.scene-ending__link:hover .scene-ending__arrow {
  transform: translateX(4px);
}

@media (prefers-reduced-motion: reduce) {
  .scene-ending__copy {
    transition: none;
  }
}
</style>
