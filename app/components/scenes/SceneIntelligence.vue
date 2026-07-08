<script setup lang="ts">
// Scene 05 "Typography is Created" — the particles leave the core, travel
// upward, and build every letter of this headline; when assembly completes,
// the typoSolid channel dims the particles to nothing and raises THIS real
// DOM text in their place. Font size comes from the same sampling metrics
// the particle glyph used (typographyFontSvh, published by
// IntelligenceWorld), so the swap is pixel-aligned and imperceptible:
// intelligence created language, and the language is real, selectable text.
//
// The heading is always in the accessibility tree (opacity, never
// display:none) — screen readers and crawlers see the headline regardless
// of scroll position.
import { sectionSvh } from "~~/lib/experience/pacing";

const HEADLINE_LINES = ["ENGINEERING", "THE INTELLIGENCE", "LAYER", "OF TOMORROW"];

const sectionRef = useSceneRange("intelligence");
const { typographySolid, typographyFontSvh, cameraEnter } = useIntelligenceWorld();
</script>

<template>
  <section ref="sectionRef" class="scene-intelligence" :style="{ height: `${sectionSvh('intelligence')}svh` }">
    <!-- Scene 06 "Camera Enters": as the camera flies through the core, the
         headline scales UP and fades — it falls into depth, passing around
         the visitor, while typographySolid (already dropping in the same
         beat) takes the opacity to zero. -->
    <h2
      class="scene-intelligence__heading"
      :style="{
        opacity: typographySolid,
        fontSize: `${typographyFontSvh}svh`,
        transform: `scale(${1 + cameraEnter * 2.2})`,
      }"
    >
      <span v-for="line in HEADLINE_LINES" :key="line" class="scene-intelligence__line">{{ line }}</span>
    </h2>
  </section>
</template>

<style scoped>
.scene-intelligence {
  position: relative;
  /* height comes from the pacing table via useSceneRange (inline style). */
}

.scene-intelligence__heading {
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100svh;
  color: var(--color-primary);
  font-weight: 700;
  /* MUST match sampleTextBlock's lineHeightEm (1.28) — the particle glyph
     and this text share their line grid. */
  line-height: 1.28;
  text-align: center;
  user-select: text;
}

.scene-intelligence__line {
  display: block;
}
</style>
