<script setup lang="ts">
// PRODUCT DASHBOARD STAGE — the cinematic wrapper around an EXISTING SVARA
// dashboard. The stage owns movement; the dashboard owns dashboard UI. Nothing
// in here reaches inside the slotted component: no styling, no sizing overrides,
// no internal spacing, no aspect-ratio change. If a composition problem ever
// looks like it needs an edit inside HUDWindow / WorldViz / *System.vue, it is
// being solved at the wrong level — move the stage instead.
//
// Choreography (§18) — ENTER, HOLD, EXIT, driven by the shared scene progress:
//   ENTER  the window rises out of depth: blur → sharp, tilted → flat, 0 → 1
//   HOLD   stable, with a barely-there ambient drift so it never feels frozen
//   EXIT   it drifts away and defocuses as the next title card arrives
//
// SIZE IS NON-NEGOTIABLE. The dashboard's width is `--ps-stage-w`
// (`clamp(560px, min(64vw, 134vh), 1240px)`) — bound by the viewport's width AND
// height so it stays dominant on a large screen and still fits a short one. It is
// never narrowed to make room for copy; the copy moves around it. The only scale
// the stage applies for layout is `fitScale`, and that engages solely when the
// dashboard's own natural height genuinely exceeds the viewport — never to open
// space for text.
//
// The blur is applied ONLY while the stage is moving. A `filter` at rest would
// promote the window to its own composited layer and resample the HUD's 10px
// type — the dashboard must stay crisp in the hold (§21).
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useSceneProgress, ramp, smoother, clamp01 } from '~/composables/useSceneProgress'
import { MOUNT_MARGIN } from './scene-sequence'

const props = defineProps<{
  /** The stage's four-point window in page progress. */
  stage: { in: number, hold: number, out: number, end: number }
  /** Which side of the frame the dashboard occupies — the copy takes the other. */
  composition: 'right' | 'left'
}>()

const move = ref<HTMLElement | null>(null)
const fit = ref<HTMLElement | null>(null)
const obj = ref<HTMLElement | null>(null)

/**
 * Mount gating. Each product system runs its own throttled telemetry ticker,
 * paused by an IntersectionObserver — but inside a `position: fixed` scene every
 * dashboard is permanently "in view", so all ten would tick forever. Mounting
 * only what is near its window keeps at most two alive. The margin is far wider
 * than the enter ramp, so nothing ever pops in visibly.
 */
const live = ref(false)

/** 1 unless the dashboard's natural height genuinely exceeds the viewport. */
const fitScale = ref(1)

/**
 * Room the scene chrome takes above and below the dashboard. Must match the
 * `--ps-band-top` / `--ps-band-bottom` padding in product-scene.css — if it
 * doesn't, `fitScale` either shrinks a window that fits or leaves one clipped.
 */
const HEADER_PX = 52 // var(--ps-header-h)
function reserve(): number {
  // Stacked layout: the name block sits above the window and the metrics below,
  // so both bands come out of the height available to it.
  return window.innerWidth <= 900 ? HEADER_PX + 212 : HEADER_PX + 26
}

function measure(): void {
  const node = obj.value
  if (!node) return
  // `offsetHeight` is the untransformed layout height, so an ancestor's scale
  // can't feed back into this measurement and oscillate.
  const natural = node.offsetHeight
  if (!natural) return
  const available = window.innerHeight - reserve()
  fitScale.value = Math.min(1, Math.max(0.62, available / natural))
}

let ro: ResizeObserver | null = null
let lastBlurred = true

useSceneProgress((p) => {
  const { stage } = props
  const nearby = p >= stage.in - MOUNT_MARGIN && p <= stage.end + MOUNT_MARGIN
  if (live.value !== nearby) {
    live.value = nearby
    if (nearby) requestAnimationFrame(measure)
  }

  const node = move.value
  if (!node) return

  const enter = smoother(ramp(p, stage.in, stage.hold))
  const exit = smoother(ramp(p, stage.out, stage.end))
  const hold = ramp(p, stage.hold, stage.out)

  const opacity = clamp01(enter * (1 - exit))
  // ENTER from depth → HOLD with a slow ambient rise → EXIT drifting away.
  const y = (1 - enter) * 78 + hold * -22 + exit * -86
  const scale = 0.855 + enter * 0.145 + hold * 0.018 - exit * 0.08
  const tilt = (1 - enter) * 5.2 - exit * 3.4
  const blur = (1 - enter) * 13 + exit * 11

  node.style.opacity = String(opacity)
  node.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) rotateX(${tilt.toFixed(2)}deg) scale(${scale.toFixed(4)})`

  // Only carry a filter while actually blurred — see the note above.
  const blurred = blur > 0.15
  if (blurred) {
    node.style.filter = `blur(${blur.toFixed(2)}px)`
  } else if (lastBlurred) {
    node.style.filter = 'none'
  }
  lastBlurred = blurred
})

onMounted(() => {
  measure()
  if (typeof ResizeObserver !== 'undefined') {
    ro = new ResizeObserver(() => measure())
    ro.observe(document.documentElement)
    if (obj.value) ro.observe(obj.value)
  }
})
onBeforeUnmount(() => ro?.disconnect())
</script>

<template>
  <div class="pds" :data-composition="composition">
    <div ref="move" class="pds__move">
      <div ref="fit" class="pds__fit" :style="{ transform: `scale(${fitScale})` }">
        <div ref="obj" class="pds__obj">
          <ClientOnly>
            <slot v-if="live" />
          </ClientOnly>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pds {
  position: absolute;
  inset: 0;
  z-index: 6; /* above the atmosphere, below the editorial overlays */
  display: flex;
  align-items: center;
  /* Centred in the band BELOW the header — without this the window's top edge
     slides under the header bar on a short viewport. */
  padding-block: var(--ps-band-top) var(--ps-band-bottom);
  pointer-events: none;
  /* Depth for the entrance tilt. */
  perspective: 1900px;
  perspective-origin: 50% 45%;
}

/* The dashboard's position in the frame. Its SIZE never changes with position —
   only where the frame places it, so the copy has somewhere to go. */
.pds { padding-inline: var(--ps-gutter); }
.pds[data-composition='right'] { justify-content: flex-end; }
.pds[data-composition='left'] { justify-content: flex-start; }

.pds__move {
  opacity: 0;
  transform-style: preserve-3d;
  will-change: transform, opacity;
}

.pds__fit { transform-origin: center center; }

.pds__obj {
  /* THE dashboard size. Wide enough to dominate the frame at every desktop
     breakpoint (≈64vw), floored so it never becomes a thumbnail, and capped by
     viewport height so a short screen shrinks it via `fitScale` rather than
     cropping it. Interaction is re-enabled here — the dashboards are live. */
  width: var(--ps-stage-w);
  max-width: 100%;
  pointer-events: auto;
  /* The window is a physical object in the scene: it casts, it doesn't float on
     a white page. */
  filter: drop-shadow(0 60px 90px rgba(16, 34, 74, 0.16));
}

@media (max-width: 900px) {
  .pds {
    align-items: center;
    justify-content: center;
    padding-inline: 0;
    /* The name sits above the window and the metrics below it; these bands must
       clear both, or the copy prints over a dark HUD. Keep in step with
       `reserve()`. */
    padding-block: calc(var(--ps-header-h) + 88px) 124px;
  }
  .pds[data-composition='right'],
  .pds[data-composition='left'] { justify-content: center; }
  .pds__obj { filter: drop-shadow(0 32px 52px rgba(16, 34, 74, 0.14)); }
}
</style>
