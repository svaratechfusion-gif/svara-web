<script setup lang="ts">
// PRODUCT HERO VIDEO — the hero's visual layer.
//
// The exact supplied MP4 is the hero visual (it replaces the particle object at
// the same z-4 layer, behind the intro copy — the headline still wins). Nothing
// else in the scene is touched: the dashboards, overlays, header and sequence are
// unchanged. Its presence fades out as the hero leaves, mirroring the object it
// replaces, so the film's opening still hands off cleanly to the first system.
//
//   · Desktop (fine pointer, ≥1024px): the video is PAUSED and the POINTER OWNS
//     ITS TIMELINE, on the same model as the /divisions hero — the left edge of
//     the window is the first frame, the right edge the last, so the subject
//     genuinely tracks where the cursor IS rather than how far it has travelled.
//     The clip also LEANS toward the cursor. Both ride the shared pointer spring
//     (`lib/motion/spring.ts`, tension 120 / friction 26) — the same curve
//     /divisions uses, so the two heroes feel like one hand made them.
//   · Mobile / coarse pointer / <1024px / reduced-motion: normal muted autoplay
//     loop, no scrubbing, no lean.
//
// > Not ported from /divisions: its pre-decoded frame array. That exists because
// > seeking a <video> every frame judders, but it needs `createImageBitmap` on
// > the element — which throws a SecurityError on a cross-origin video, and this
// > clip is served from CloudFront with no CORS headers. So this keeps seeking
// > `currentTime`, with the spring doing the smoothing.
//
// Rendering rides `gsap.ticker` (the repo's single tick source) — no rAF of its
// own, no reactive writes per frame (opacity + currentTime are set imperatively).
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { POINTER_SPRING, Spring } from '~~/lib/motion/spring'
import { useSceneProgress, ramp, smooth } from '~/composables/useSceneProgress'

const props = defineProps<{
  /** The hero's window in page progress — the visual lives and dies inside it. */
  window: [number, number]
}>()

// The EXACT asset URL — used verbatim, never substituted.
const VIDEO_SRC = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4'

const host = ref<HTMLElement | null>(null)
const video = ref<HTMLVideoElement | null>(null)
const heroEnd = props.window[1]

/** How far the clip leans toward the cursor, degrees. Past ~8° it stops reading
 *  as a lean and starts reading as a skew. */
const TILT_Y = 6
const TILT_X = 4
/** Slight overscale so the lean can never expose an edge of the frame. */
const TILT_SCALE = 1.06

let scrollPresence = 1
let removeTick: (() => void) | null = null
let scrub = false
let duration = 0
let startTime = -1

// Absolute pointer state, spring-smoothed so the clip GLIDES to the cursor
// instead of snapping to it. `progress` starts centred and the tilts flat —
// where an untouched page sits.
const progress = new Spring(0.5, POINTER_SPRING)
const tiltX = new Spring(0, POINTER_SPRING)
const tiltY = new Spring(0, POINTER_SPRING)
let lastSeek = -1

useSceneProgress((p) => {
  // Same envelope as the object it replaces: full through the opening, gone by the
  // time the first system title arrives.
  scrollPresence = 1 - smooth(ramp(p, heroEnd * 0.45, heroEnd * 0.95))
})

/** Maps a coordinate from one range onto another. */
function transformRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  if (inMax === inMin) return outMin
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin)
}

function onPointerMove(event: PointerEvent): void {
  // Below 1024px there is no cursor scrubbing — the existing mobile behaviour stands.
  if (window.innerWidth < 1024) return
  // ABSOLUTE, not accumulated: the window's left edge is the first frame and its
  // right edge the last. The old delta model drifted — the subject's pose
  // depended on how far the cursor had travelled, so it never came back to a
  // known state and slowly wandered out of frame.
  progress.setTarget(Math.min(Math.max(event.clientX / window.innerWidth, 0), 1))
  tiltX.setTarget(transformRange(event.clientY, 0, window.innerHeight, -1, 1))
  tiltY.setTarget(transformRange(event.clientX, 0, window.innerWidth, -1, 1))
}

onMounted(async () => {
  const v = video.value
  const h = host.value
  if (!v || !h) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  scrub = !reduced && window.matchMedia('(pointer: fine)').matches

  const onMeta = (): void => { duration = v.duration || 0 }
  if (v.readyState >= 1 && v.duration) duration = v.duration
  else v.addEventListener('loadedmetadata', onMeta, { once: true })

  if (scrub) {
    // Desktop: pointer owns the timeline; the clip itself never plays.
    v.pause()
    window.addEventListener('pointermove', onPointerMove, { passive: true })
  } else {
    // Mobile / coarse / reduced-motion: plain muted autoplay loop.
    v.loop = true
    v.muted = true
    v.play().catch(() => { /* autoplay refused — the poster frame is fine */ })
  }

  const { gsap } = await import('~~/lib/gsap')
  // gsap.ticker hands the frame delta in MILLISECONDS; the springs integrate in
  // seconds and clamp long frames themselves (see lib/motion/spring.ts).
  const tick = (time: number, deltaMs: number): void => {
    if (startTime < 0) startTime = time
    const entered = smooth(Math.min(1, (time - startTime) / 1.2))
    h.style.opacity = String(entered * scrollPresence)

    if (!scrub) return

    const dt = deltaMs / 1000
    const p = progress.advance(dt)
    const rx = tiltX.advance(dt)
    const ry = tiltY.advance(dt)

    if (duration > 0) {
      const seek = Math.max(0, Math.min(duration - 0.05, p * duration))
      // Only seek when the frame would actually change — a seek per frame at
      // sub-frame deltas just thrashes the decoder.
      if (Math.abs(seek - lastSeek) > 0.008) {
        v.currentTime = seek
        lastSeek = seek
      }
    }

    // The lean. /divisions leans the plane the shader SAMPLES from, which it can
    // do because it owns the fragment stage; this is a plain <video>, so the
    // equivalent gesture is a real perspective rotation of the element.
    v.style.transform =
      `scale(${TILT_SCALE}) rotateX(${-rx * TILT_X}deg) rotateY(${ry * TILT_Y}deg)`
  }
  gsap.ticker.add(tick)
  removeTick = () => gsap.ticker.remove(tick)
})

onBeforeUnmount(() => {
  removeTick?.()
  removeTick = null
  window.removeEventListener('pointermove', onPointerMove)
})
</script>

<template>
  <div ref="host" class="phv" aria-hidden="true">
    <video ref="video" class="phv__video" muted playsinline preload="auto" :src="VIDEO_SRC" />
  </div>
</template>

<style scoped>
.phv {
  position: absolute;
  inset: 0;
  /* Depth for the lean. Without it rotateX/rotateY are flat shears. */
  perspective: 1400px;
  /* Same layer the particle object held: atmosphere (5) < THIS (4) < dashboard
     stages (6) < editorial overlays (10) < header (30). The headline always wins. */
  z-index: 4;
  pointer-events: none;
  overflow: hidden;
  opacity: 0;                 /* the ticker fades it in on the entrance envelope */
}
.phv__video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: right bottom;   /* desktop composition — keep the subject */
  /* The lean is written per frame by the ticker; these only set the stage for it.
     `will-change` keeps the rotation on its own layer instead of repainting the
     video every frame. */
  transform-origin: 50% 55%;
  will-change: transform;
  backface-visibility: hidden;
}
/* Portrait keeps only ~26% of a 16:9 source's width under `cover`, and
   `center bottom` put that window on the floor beside the figure — the frame
   showed a shoulder and nothing else. Anchoring right-of-centre and near the
   top follows the subject, which stands on the right of this clip. */
@media (max-width: 767px) { .phv__video { object-position: 70% 22%; } }
</style>
