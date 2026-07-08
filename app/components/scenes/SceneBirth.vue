<script setup lang="ts">
// Scene 01 "Birth" — no headline, no logo, no DOM copy at all per the
// storyboard (docs/creative-direction.md §2). This component exists purely
// to reserve scroll real estate and register its fraction of the document
// with the shared IntelligenceWorld — the actual boot animation is
// time-based (see IntelligenceWorld.vue) and plays out while this section
// is held at the top of the page.
import { sectionSvh } from "~~/lib/experience/pacing";

const sectionRef = useSceneRange("birth");
</script>

<template>
  <section ref="sectionRef" class="scene-birth" aria-hidden="true" :style="{ height: `${sectionSvh('birth')}svh` }" />
</template>

<style scoped>
.scene-birth {
  /* height comes from the pacing table via useSceneRange (inline style). */
}
</style>
