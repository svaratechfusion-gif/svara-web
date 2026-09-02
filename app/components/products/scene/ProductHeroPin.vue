<script setup lang="ts">
// THE HERO, AS ITS OWN PINNED SCENE.
//
// This used to be beat one of the single 2070vh product sequence. It was lifted out so
// the Stride block can sit directly after it — inside the old sequence there was no
// slot for flow content between the hero and the ten dashboards, because the whole
// film is one sticky stage over one spacer.
//
// The hero owns this wrapper outright, so its progress is the wrapper's own 0 → 1
// (HERO_BEAT is `[0, 1]`). It publishes that through SCENE_PROGRESS_EL, and every
// descendant that calls useSceneProgress picks it up by injection instead of the
// whole-page value — which is what lets two pinned scenes coexist on one page.
//
// The composition inside is byte-for-byte the old opening: same video layer, same
// ScrollFade window (fadeOut at 0.42 of the beat → [0.58, 1]), same SceneIntro.
import { ref, provide } from 'vue'
import { SCENE_PROGRESS_EL } from '~/composables/useSceneProgress'
import { HERO_VH, HERO_BEAT } from './scene-sequence'
import SceneAtmosphere from './SceneAtmosphere.vue'
import ProductHeroVideo from './ProductHeroVideo.vue'
import SceneIntro from './SceneIntro.vue'
import ScrollFade from './ScrollFade.vue'

const rootRef = ref<HTMLElement | null>(null)
provide(SCENE_PROGRESS_EL, rootRef)
</script>

<template>
  <div ref="rootRef" class="ps-hero" :style="{ height: `${HERO_VH}vh` }">
    <div class="ps-stage-root">
      <!-- hold=0: the hero sat at the very bottom of the old progress range, where the
           atmosphere's ground wash is effectively off. See SceneAtmosphere. -->
      <SceneAtmosphere :hold="0" />

      <ProductHeroVideo :window="[0, 1]" />

      <ScrollFade :appear="[0, 0]" :disappear="[0.58, 1]" class="ps-overlay">
        <SceneIntro :beat="HERO_BEAT" />
      </ScrollFade>
    </div>
  </div>
</template>
