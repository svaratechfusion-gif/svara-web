<script setup lang="ts">
// SVARA Resonance Hero — PROTOTYPE host (Prototype B1, State A → State B).
// Vue↔React bridge: mounts the R3F ResonanceCanvas via createRoot behind the
// DOM. Mirrors the disposal discipline of SvaraCanvas.vue (which it does NOT
// modify). Re-renders the React tree whenever a control prop changes so State,
// mode, speed and replay drive the scene without a full page reload.
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import type { Root } from 'react-dom/client'

const props = withDefaults(defineProps<{
  count?: number
  dprCap?: number
  bloom?: boolean
  theme?: 'dark' | 'light'
  mode?: number
  topology?: 'A' | 'B' | 'C'
  playState?: 'A' | 'B'
  speed?: number
  replayNonce?: number
  immediate?: boolean
  version?: 'b1' | 'b11'
  review?: boolean
  debugPoints?: boolean
  debugMode?: 'box' | 'points' | 'topology' | 'shader'
  onProgress?: (p: number) => void
  onStats?: (s: unknown) => void
}>(), {
  count: 70000, dprCap: 2, bloom: true, theme: 'light',
  mode: 3, topology: 'A', playState: 'A', speed: 1, replayNonce: 0, immediate: false, version: 'b11',
  review: false, debugPoints: false, debugMode: 'shader',
  onProgress: undefined, onStats: undefined,
})

const mountEl = ref<HTMLElement>()
const rootRef = ref<Root | null>(null)
let ResonanceCanvasCmp: unknown = null
let ReactRef: unknown = null
let cancelled = false

// mouse bridge — React reads .current each frame (no reactive proxy needed)
const mouseState = { current: { x: 0, y: 0 } }
function onPointerMove(e: PointerEvent) {
  mouseState.current.x = (e.clientX / window.innerWidth) * 2 - 1
  mouseState.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
}

function renderScene() {
  if (!rootRef.value || !ResonanceCanvasCmp || !ReactRef) return
  const React = ReactRef as typeof import('react')
  rootRef.value.render(
    React.createElement(ResonanceCanvasCmp as never, {
      count: props.count,
      dprCap: props.dprCap,
      bloom: props.bloom,
      theme: props.theme,
      mode: props.mode,
      topology: props.topology,
      playState: props.playState,
      speed: props.speed,
      replayNonce: props.replayNonce,
      immediate: props.immediate,
      version: props.version,
      review: props.review,
      debugPoints: props.debugPoints,
      debugMode: props.debugMode,
      onProgress: props.onProgress,
      onStats: props.onStats,
      mouseState,
    }),
  )
}

onMounted(async () => {
  if (!mountEl.value) return
  const { createRoot } = await import('react-dom/client')
  if (cancelled || !mountEl.value) return
  const mod = await import('~~/lib/renderer/resonance')
  if (cancelled || !mountEl.value) return
  const React = (await import('react')).default
  if (cancelled || !mountEl.value) return

  ResonanceCanvasCmp = mod.ResonanceCanvas
  ReactRef = React
  rootRef.value = createRoot(mountEl.value)
  renderScene()
  window.addEventListener('pointermove', onPointerMove, { passive: true })
})

// re-render on any live control change (theme, mode, state, speed, replay, version)
watch(
  () => [props.theme, props.mode, props.topology, props.playState, props.speed, props.replayNonce, props.version, props.review, props.debugPoints, props.debugMode],
  () => renderScene(),
)

onBeforeUnmount(() => {
  cancelled = true
  window.removeEventListener('pointermove', onPointerMove)
  if (rootRef.value) { rootRef.value.unmount(); rootRef.value = null }
})
</script>

<template>
  <div class="resonance-hero" :class="`resonance-hero--${props.theme}`" aria-hidden="true">
    <div ref="mountEl" class="resonance-hero__canvas" />
  </div>
</template>

<style scoped>
.resonance-hero {
  position: absolute;
  inset: 0;
  overflow: hidden;
}
/* Dark mineral — graphite room, warm key from upper-right. */
.resonance-hero--dark {
  background: radial-gradient(125% 95% at 78% 8%, #241d15 0%, #141210 34%, #08080a 100%);
}
/* Vanilla ceramic — warm ivory room, desaturated toward premium. */
.resonance-hero--light {
  background: radial-gradient(120% 100% at 74% 10%, #f7f2e4 0%, #efe9da 42%, #e4ded0 100%);
}
.resonance-hero__canvas { position: absolute; inset: 0; }
.resonance-hero__canvas :deep(canvas) { display: block; width: 100% !important; height: 100% !important; }
</style>
