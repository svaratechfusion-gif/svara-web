<script setup lang="ts">
// PRODUCT SCENE — one system, as one cinematic beat.
//
//   <ProductScene>
//     <SceneTitle>              the enormous editorial word that announces it
//     <ProductDashboardStage>   the EXISTING dashboard, moved but never modified
//     <ProductOverlay>          label · name · one line · capabilities · metrics
//   </ProductScene>
//
// The dashboard component passed through the stage is the source of truth and is
// rendered exactly as it is used everywhere else on the site.
import type { ProductBeat } from './scene-sequence'
import { fadeIn, fadeOut } from './scene-sequence'
import SceneTitle from './SceneTitle.vue'
import ProductDashboardStage from './ProductDashboardStage.vue'
import ProductOverlay from './ProductOverlay.vue'
import ScrollFade from './ScrollFade.vue'
import HUDWindow from '~/components/products/worlds/HUDWindow.vue'
import WorldViz from '~/components/products/worlds/WorldViz.vue'

const props = defineProps<{ beat: ProductBeat }>()

const p = props.beat.product

/** The metric strip HUDWindow already expects — same shape it is given elsewhere. */
function fmt(v: number): string {
  const n = Math.max(0, v)
  if (n >= 1e9) return `${(n / 1e9).toFixed(n % 1e9 === 0 ? 0 : 1)}B`
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}k`
  return String(Math.round(n))
}
const hudMetrics = p.kpis.slice(0, 4).map((k) => ({
  label: k.label,
  value: `${k.prefix ?? ''}${fmt(k.value)}${k.suffix ?? ''}`,
}))

// The copy holds a touch inside the dashboard's window, so the reveal's own exit
// is what you actually see and the block fade only mops up behind it.
const sceneLen = props.beat.scene.end - props.beat.scene.start
const overlayWindow: [number, number] = [
  props.beat.scene.start + sceneLen * 0.05,
  props.beat.scene.end - sceneLen * 0.1,
]
</script>

<template>
  <div class="pscn">
    <!-- The transition word that hands the scene over to this system. -->
    <SceneTitle :beat="beat.title" :word="beat.word" :line="beat.line" :index="`System ${p.n}`" />

    <!-- THE DASHBOARD. Untouched — the stage only moves it. -->
    <ProductDashboardStage :stage="beat.stage" :composition="beat.composition">
      <HUDWindow
        :title="p.name"
        :system-id="p.n"
        :code="p.code"
        :status="p.status"
        :metrics="hudMetrics"
        :kind="p.id"
      >
        <WorldViz :kind="p.id" />
      </HUDWindow>
    </ProductDashboardStage>

    <!-- The editorial copy around it. -->
    <ScrollFade
      :appear="fadeIn(beat.scene, 0.24)"
      :disappear="fadeOut(beat.scene, 0.22)"
      class="ps-overlay"
    >
      <ProductOverlay :product="p" :window="overlayWindow" :composition="beat.composition" :anchor="beat.anchor" />
    </ScrollFade>
  </div>
</template>

<style scoped>
.pscn { position: absolute; inset: 0; pointer-events: none; }
.pscn :deep(.ps-overlay) { pointer-events: none; }
</style>
