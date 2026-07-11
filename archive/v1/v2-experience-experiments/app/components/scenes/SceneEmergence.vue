<script setup lang="ts">
// Scene 02 "Emergence" — also no DOM copy per the storyboard. Reserves the
// scroll distance over which IntelligenceWorld.vue organizes the particle
// field toward its (still dim, not-yet-activated) nucleus and fades in
// connection lines.
import { sectionSvh } from "~~/lib/experience/pacing";

const sectionRef = useSceneRange("emergence");
</script>

<template>
  <section ref="sectionRef" class="scene-emergence" aria-hidden="true" :style="{ height: `${sectionSvh('emergence')}svh` }" />
</template>

<style scoped>
.scene-emergence {
  /* height comes from the pacing table via useSceneRange (inline style). */
}
</style>
