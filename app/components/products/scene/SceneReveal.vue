<script setup lang="ts">
// ENTRY PROGRESS FOR A NORMAL FLOW SECTION.
//
// RevealItem and RevealText are driven by scene progress, which used to mean "how far
// through the pinned film are we". With the film gone, the finale had no scene to read
// and fell back to whole-page progress — where its window `[0.92, 1]` only opens once
// you are already into the footer. It rendered as a blank screen.
//
// This provides a different progress for its subtree: 0 when the block's top edge sits
// at the bottom of the viewport, 1 when that edge reaches the top. A section reveals as
// it rises into view, which is what a flow block wants — no pin required.
import { ref, provide } from 'vue'
import { SCENE_PROGRESS_EL } from '~/composables/useSceneProgress'

const rootRef = ref<HTMLElement | null>(null)

const clamp01 = (v: number): number => (v < 0 ? 0 : v > 1 ? 1 : v)

provide(SCENE_PROGRESS_EL, (): number => {
  const el = rootRef.value
  if (!el || typeof window === 'undefined') return 0
  const vh = window.innerHeight || 1
  return clamp01((vh - el.getBoundingClientRect().top) / vh)
})
</script>

<template>
  <div ref="rootRef" class="scene-reveal">
    <slot />
  </div>
</template>

<style scoped>
/* NOT `display: contents`: an element with no box returns an all-zero
   getBoundingClientRect, and this element's rect is the measurement. A plain block
   wrapping one full-height section changes nothing about the layout. */
.scene-reveal { position: relative; }
</style>
