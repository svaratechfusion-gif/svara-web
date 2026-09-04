<script setup lang="ts">
/**
 * ONE VIDEO ENGINE for every clip on /about.
 *
 * The page carries five clips. Five plain `autoplay loop` tags would fetch and
 * decode all five at once, on a page where at most one is ever on screen — so
 * every clip here is gated on the viewport: `preload="none"` until it first
 * approaches the fold, then play while intersecting and PAUSE when it leaves.
 * Decoding is the expensive part, and a paused video costs nothing.
 *
 * FADE MODE is the hero's crossfade-to-black loop, carried over from the Asme
 * design: rather than the hard cut of a native `loop`, the clip fades out over
 * its last 0.55s, rewinds, and fades back in. `fadingOut` guards the fade-out so
 * `timeupdate` (which fires many times inside that window) starts it once.
 * Everything else loops natively — the cut is hidden by a frame or a gradient.
 *
 * Reduced motion gets a still first frame: loaded and seeked, never played.
 */
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = withDefaults(defineProps<{
  /** clip URL */
  src: string
  /** crossfade-to-black loop instead of a native cut (the hero) */
  fade?: boolean
}>(), { fade: false })

/** how far ahead of the fold a clip starts loading */
const ROOT_MARGIN = '200px'
/** the tail of the clip the fade-out occupies, in seconds */
const FADE_TAIL = 0.55
const FADE_MS = 500

const el = ref<HTMLVideoElement | null>(null)
let io: IntersectionObserver | null = null
let raf = 0
let fadingOut = false
let started = false
let teardown: (() => void) | null = null

function fade(to: number, ms: number): void {
  const v = el.value
  if (!v) return
  cancelAnimationFrame(raf) // resume from wherever the running fade got to
  const from = Number(v.style.opacity || '0')
  const start = performance.now()
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / ms)
    v.style.opacity = String(from + (to - from) * t)
    if (t < 1) raf = requestAnimationFrame(step)
  }
  raf = requestAnimationFrame(step)
}

onMounted(() => {
  const v = el.value
  if (!v) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  v.style.opacity = '0'

  const onCanPlay = () => {
    if (reduced) { v.currentTime = 0.1; v.style.opacity = '1'; return }
    v.play().catch(() => {})
    fadingOut = false
    fade(1, props.fade ? FADE_MS : 320)
  }
  const onTimeUpdate = () => {
    if (!props.fade || reduced || fadingOut || !v.duration) return
    if (v.duration - v.currentTime <= FADE_TAIL) { fadingOut = true; fade(0, FADE_MS) }
  }
  const onEnded = () => {
    if (!props.fade || reduced) return
    v.style.opacity = '0'
    window.setTimeout(() => {
      v.currentTime = 0
      v.play().catch(() => {})
      fadingOut = false
      fade(1, FADE_MS)
    }, 100)
  }

  v.addEventListener('canplay', onCanPlay)
  v.addEventListener('timeupdate', onTimeUpdate)
  v.addEventListener('ended', onEnded)

  io = new IntersectionObserver((entries) => {
    const on = entries[0]?.isIntersecting
    if (on) {
      // first approach: attach the source, which is what actually starts the fetch
      if (!started) { started = true; v.src = props.src; v.load() }
      else if (!reduced) { v.play().catch(() => {}); }
      if (v.readyState >= 3) onCanPlay()
    }
    else if (started) { v.pause() }
  }, { rootMargin: ROOT_MARGIN })
  io.observe(v)

  teardown = () => {
    cancelAnimationFrame(raf)
    io?.disconnect()
    v.removeEventListener('canplay', onCanPlay)
    v.removeEventListener('timeupdate', onTimeUpdate)
    v.removeEventListener('ended', onEnded)
    v.pause()
    v.removeAttribute('src')
    v.load() // releases the decoder rather than leaving it attached to a dead element
  }
})

onBeforeUnmount(() => teardown?.())
</script>

<template>
  <video
    ref="el" class="axv"
    muted playsinline preload="none" aria-hidden="true"
    :loop="!fade"
  />
</template>
