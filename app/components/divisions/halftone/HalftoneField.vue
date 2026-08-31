<script setup lang="ts">
// The signature visual: a fixed, full-viewport video rendered as a soft
// halftone dot field. The <video> never paints — a WebGL2 fragment shader
// samples it once per grid cell and draws a round dot whose SIZE grows with the
// cell's brightness and whose SHADE is a ramp across the frame.
//
// Two things drive it, both spring-smoothed:
//
//   · the POINTER scrubs the clip's timeline (left edge = first frame, right
//     edge = last), so the head appears to track the cursor, and leans the
//     sampled plane in perspective toward it;
//   · the REVEAL wave climbs from the bottom when the preloader lifts, so the
//     picture develops out of the ground like a photograph.
//
// Scrubbing reads decoded stills, not `currentTime`: a seek costs ~25–65ms, so
// seeking per frame never lets the decoder settle and the picture judders.
// Without WebGL2 this degrades to the plain object-fit:cover video.
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { captureFrames } from '~~/lib/halftone/capture-frames'
import { readCssColor, type Rgb } from '~~/lib/halftone/color'
import { createHalftoneRenderer, type HalftoneRenderer } from '~~/lib/halftone/renderer'
import { FIELD_REVEAL_SPRING, POINTER_SPRING, Spring } from '~~/lib/motion/spring'
import { useReducedMotion } from '~/composables/useReducedMotion'
import { useTicker } from '~/composables/useTicker'

const props = withDefaults(defineProps<{
  src: string
  /** Whether the field has been told to develop in. */
  reveal?: boolean
}>(), { reveal: false })

/* ── Fixed field parameters. The reference build's values, unchanged. ─────── */

/** Dot cell size, CSS px — smaller means a finer, denser field. */
const CELL_SIZE = 9
/** Dot diameter at full brightness, in cells. Past ~0.8 the cell clips it square. */
const DOT_SCALE = 0.72
/** Extra edge blur beyond antialiasing, in cells. */
const SOFTNESS = 0
/** Exposure on the sampled luminance — raised for this dark footage. */
const GAIN = 1.9
/** Below 1, lifts midtones into larger dots. */
const GAMMA = 0.62
/** This clip faces the other way. */
const MIRROR = true
/** How far the sampled plane leans toward the pointer. Past ~0.4 it smears. */
const TILT = 0.24
/** How tightly the three ink stops pack around the centre of the frame. */
const INK_SPREAD = 2.5
/** Developing-wave thickness, in screen heights. */
const REVEAL_BAND = 0.28
/** Stills decoded across the clip. Each is ~300kB. */
const SCRUB_FRAMES = 120
/** Beyond 2x the extra pixels cost far more than they show. */
const MAX_DPR = 2

/** Used only if a `--halftone-*` token is missing, so the field still renders. */
const FALLBACK_COLORS = {
  bg: [0.016, 0.027, 0.059] as Rgb,
  inkLight: [0.624, 0.910, 1] as Rgb,
  inkMid: [0.184, 0.498, 0.902] as Rgb,
  inkDeep: [0.063, 0.165, 0.357] as Rgb,
}

const videoEl = ref<HTMLVideoElement | null>(null)
const canvasEl = ref<HTMLCanvasElement | null>(null)
const isSupported = ref(true)

const prefersReducedMotion = useReducedMotion()

let renderer: HalftoneRenderer | null = null
let frames: ImageBitmap[] = []
let colors = FALLBACK_COLORS
let dpr = 1
let cancelled = false

// Spring-smoothed so the clip glides to the pointer instead of stepping to it.
// Starts centred and flat, which is where an untouched page sits.
const progress = new Spring(0.5, POINTER_SPRING)
const tiltX = new Spring(0, POINTER_SPRING)
const tiltY = new Spring(0, POINTER_SPRING)
const wave = new Spring(0, FIELD_REVEAL_SPRING)

function resize() {
  if (!renderer) return
  renderer.resize(
    Math.round(window.innerWidth * dpr),
    Math.round(window.innerHeight * dpr),
  )
}

/** Maps a coordinate from one range onto another. */
function transformRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  if (inMax === inMin) return outMin
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin)
}

function handlePointerMove(event: PointerEvent) {
  progress.setTarget(Math.min(Math.max(event.clientX / window.innerWidth, 0), 1))
  tiltX.setTarget(transformRange(event.clientX, 0, window.innerWidth, -1, 1))
  tiltY.setTarget(transformRange(event.clientY, 0, window.innerHeight, -1, 1))
}

/** Walk the clip once and publish each still as it lands. */
async function decodeFrames(video: HTMLVideoElement) {
  if (video.readyState < video.HAVE_CURRENT_DATA) {
    // Metadata is not enough: createImageBitmap needs a decoded frame, and
    // throws InvalidStateError on a video that only knows its dimensions.
    await new Promise<void>((resolve) => {
      const done = () => {
        video.removeEventListener('loadeddata', done)
        resolve()
      }
      video.addEventListener('loadeddata', done)
    })
  }
  if (cancelled) return

  try {
    await captureFrames({
      video,
      count: SCRUB_FRAMES,
      isCancelled: () => cancelled,
      // Publish each frame as it lands: the loop reads whatever exists, so the
      // head of the clip is already scrubbable while the tail decodes.
      onFrame: (frame) => frames.push(frame),
    })
  }
  catch (error) {
    // Leaves the loop on its live-video fallback: a still hero, not a blank one.
    console.error('[halftone] frame capture failed:', error)
  }
}

onMounted(() => {
  const canvas = canvasEl.value
  const video = videoEl.value
  if (!canvas || !video) return

  dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)

  colors = {
    bg: readCssColor(canvas, '--halftone-bg', FALLBACK_COLORS.bg),
    inkLight: readCssColor(canvas, '--halftone-ink-light', FALLBACK_COLORS.inkLight),
    inkMid: readCssColor(canvas, '--halftone-ink-mid', FALLBACK_COLORS.inkMid),
    inkDeep: readCssColor(canvas, '--halftone-ink-deep', FALLBACK_COLORS.inkDeep),
  }

  renderer = createHalftoneRenderer(canvas)
  if (!renderer) {
    isSupported.value = false
    return
  }
  // Size it now rather than waiting for a resize event, or the first frames
  // draw into the canvas's default 300x150.
  resize()
  window.addEventListener('resize', resize)

  // Set imperatively too: a muted video is the only kind allowed to autoplay,
  // and the attribute alone isn't always honoured on first mount.
  video.muted = true
  // Scrubbing reads decoded stills, so playback has to stay parked.
  video.pause()

  void decodeFrames(video)

  if (!prefersReducedMotion.value) {
    // Bound to the window, not the canvas: as a background it sits under the
    // page content and would never receive the events itself.
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
  }
})

onBeforeUnmount(() => {
  cancelled = true
  window.removeEventListener('resize', resize)
  window.removeEventListener('pointermove', handlePointerMove)
  frames.forEach((frame) => frame.close())
  frames = []
  renderer?.dispose()
  renderer = null
})

// The wave's target is the reveal signal. Reduced motion skips the develop-in
// entirely and holds the field up, which is what "no intro" means here.
watch(
  () => [props.reveal, prefersReducedMotion.value] as const,
  ([reveal, reduced]) => {
    if (reduced) {
      wave.set(1)
      return
    }
    wave.setTarget(reveal ? 1 : 0)
  },
  { immediate: true },
)

useTicker((dt) => {
  const video = videoEl.value
  if (!renderer || !video) return

  progress.advance(dt)
  tiltX.advance(dt)
  tiltY.advance(dt)
  wave.advance(dt)

  const shared = {
    cell: CELL_SIZE * dpr,
    dotScale: DOT_SCALE,
    softness: SOFTNESS,
    gain: GAIN,
    gamma: GAMMA,
    mirror: MIRROR,
    tilt: [tiltX.value * TILT, tiltY.value * TILT] as [number, number],
    inkSpread: INK_SPREAD,
    reveal: wave.value,
    revealBand: REVEAL_BAND,
    ...colors,
  }

  if (frames.length) {
    // Clamp into what has decoded so far, not the eventual count.
    const index = Math.max(
      Math.min(Math.round(progress.value * (SCRUB_FRAMES - 1)), frames.length - 1),
      0,
    )
    const frame = frames[index]!
    renderer.render({
      ...shared,
      source: frame,
      sourceKey: index,
      sourceSize: [frame.width, frame.height],
    })
    return
  }

  // No stills yet (still decoding, or the capture failed) — fall back to the
  // video element itself so the hero is never blank.
  if (video.readyState < video.HAVE_CURRENT_DATA) return
  if (!video.videoWidth || !video.videoHeight) return

  renderer.render({
    ...shared,
    source: video,
    sourceKey: video.currentTime,
    sourceSize: [video.videoWidth, video.videoHeight],
  })
})
</script>

<template>
  <div class="dv-field" aria-hidden="true">
    <video
      ref="videoEl"
      class="dv-field__video"
      :src="src"
      loop
      muted
      playsinline
      preload="auto"
    />
    <canvas v-show="isSupported" ref="canvasEl" class="dv-field__canvas" />
  </div>
</template>

<style scoped>
/* The site's fixed background level — behind all content and the footer, which
   composite above it normally. */
.dv-field {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background: var(--halftone-bg);
}

.dv-field__video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dv-field__canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: var(--halftone-bg);
}
</style>
