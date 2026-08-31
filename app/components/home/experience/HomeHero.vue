<script setup lang="ts">
// 01 · HERO — LOCKED composition. LEFT: the locked ENGINEERING INTELLIGENCE
// typography (z3) on the warm ivory canvas. RIGHT: cinematic space — ONLY the
// interactive humanoid video (z0), feathered into the ivory so there is no
// white seam. The former RHS technical dashboard (IntelligenceConsole) has
// been intentionally removed so the video carries the visual side alone; the
// negative space is deliberate — do NOT add replacement UI. The video has
// absolute pointer-driven native scrubbing on desktop, muted inline autoplay
// on mobile, a restrained entrance choreography (CSS transitions gated by
// `ready` — the site's Vue pattern, NOT framer-motion), and a typewriter on
// the existing status line. Background, copy, navigation and every section
// below are unchanged. This layer owns only video.currentTime.
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useTypewriter } from '~/composables/useTypewriter'

const HERO_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4'

const root = ref<HTMLElement>()
const videoEl = ref<HTMLVideoElement>()
const ready = ref(false)
const videoReady = ref(false) // fade the video in on real data, not on the rAF entrance
// typewriter drives the existing supporting status line (NOT the headline)
const { displayed: statusText, done: statusDone } = useTypewriter('SENSE. UNDERSTAND. PREDICT. ACT.', 46, 700)

let teardown: (() => void) | null = null

onMounted(() => {
  // restrained entrance on next frame (degrades to instantly-visible w/o JS)
  const entranceFrame = requestAnimationFrame(() => { ready.value = true })

  const el = videoEl.value
  if (!el) {
    teardown = () => cancelAnimationFrame(entranceFrame)
    return
  }

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const cleanups: Array<() => void> = []
  let heroVisible = true
  let mode: 'desktop' | 'mobile' | 'reduced' | null = null
  let pointerAttached = false
  let timelineReady = false
  let useRestingFrame = true
  const SEEK_INTERVAL = 48
  const SEEK_EPSILON = 0.008
  let targetTimeRef = 0
  let pendingTimeRef: number | null = null
  let isSeekingRef = false
  let lastSeekAtRef = 0
  let seekTimerRef: number | null = null
  let observer: IntersectionObserver | null = null

  const isDesktop = () => window.innerWidth >= 1024
  const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))
  const safeDuration = () => {
    const duration = el.duration
    return Number.isFinite(duration) && duration > 0 ? Math.max(0, duration - 0.05) : null
  }
  const cancelPendingSeek = () => {
    if (seekTimerRef !== null) window.clearTimeout(seekTimerRef)
    seekTimerRef = null
    pendingTimeRef = null
  }
  const canScrub = () => !reduced && isDesktop() && heroVisible && timelineReady
  const performLatestSeek = () => {
    seekTimerRef = null
    if (!canScrub() || isSeekingRef || pendingTimeRef === null) return

    const duration = safeDuration()
    if (duration === null) return
    const next = clamp(pendingTimeRef, 0, duration)
    pendingTimeRef = null

    // A second MP4 seek is only started after the browser has settled the
    // preceding one. Intermediate pointer positions are deliberately dropped.
    if (Math.abs(el.currentTime - next) < SEEK_EPSILON) return
    isSeekingRef = true
    lastSeekAtRef = performance.now()
    try {
      el.currentTime = next
    } catch {
      isSeekingRef = false
    }
  }
  const scheduleLatestSeek = (immediate = false) => {
    if (!canScrub() || isSeekingRef || pendingTimeRef === null) return
    if (seekTimerRef !== null) {
      if (!immediate) return
      window.clearTimeout(seekTimerRef)
      seekTimerRef = null
    }

    const wait = immediate ? 0 : Math.max(0, SEEK_INTERVAL - (performance.now() - lastSeekAtRef))
    if (wait === 0) {
      performLatestSeek()
      return
    }
    seekTimerRef = window.setTimeout(performLatestSeek, wait)
  }
  const queueSeek = (time: number, immediate = false) => {
    targetTimeRef = time
    pendingTimeRef = time
    scheduleLatestSeek(immediate)
  }
  const prepareTimeline = () => {
    const duration = safeDuration()
    if (duration === null) return false

    const videoTime = Number.isFinite(el.currentTime) ? clamp(el.currentTime, 0, duration) : 0
    // Preserve the approved opening frame on the first desktop visit. Later
    // desktop entries pick up from the mobile video's actual current frame.
    const initialTime = useRestingFrame && videoTime < 0.001 ? duration * 0.12 : videoTime
    timelineReady = true
    queueSeek(initialTime, true)
    return true
  }
  const onSeeked = () => {
    isSeekingRef = false
    scheduleLatestSeek()
  }
  const onPointerMove = (event: PointerEvent) => {
    if (!canScrub()) return
    const duration = safeDuration()
    if (duration === null) return

    const normalizedX = clamp(event.clientX / Math.max(window.innerWidth, 1), 0, 1)
    queueSeek(normalizedX * duration)
  }
  const attachPointer = () => {
    if (pointerAttached || !heroVisible || reduced || !isDesktop()) return
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    pointerAttached = true
  }
  const detachPointer = () => {
    if (!pointerAttached) return
    window.removeEventListener('pointermove', onPointerMove)
    pointerAttached = false
  }

  // fade the video in once it actually has renderable frames (no black flash)
  const onLoaded = () => { videoReady.value = true }
  if (el.readyState >= 2) videoReady.value = true
  else { el.addEventListener('loadeddata', onLoaded); cleanups.push(() => el.removeEventListener('loadeddata', onLoaded)) }

  const holdReducedFrame = () => {
    detachPointer()
    cancelPendingSeek()
    el.loop = false
    el.pause()
    const duration = safeDuration()
    if (duration === null) return
    targetTimeRef = duration * 0.5
    timelineReady = true
    try { el.currentTime = targetTimeRef } catch { /* ignore media seek races */ }
  }
  const startMobilePlayback = () => {
    detachPointer()
    cancelPendingSeek()
    timelineReady = false
    el.loop = true
    el.muted = true
    el.playsInline = true
    if (el.paused) {
      const playback = el.play()
      if (playback && typeof playback.catch === 'function') playback.catch(() => {})
    }
  }
  const startDesktopScrubbing = () => {
    el.loop = false
    el.pause()
    if (!timelineReady) prepareTimeline()
    if (heroVisible) attachPointer()
    else {
      detachPointer()
      cancelPendingSeek()
    }
  }
  const syncMode = () => {
    if (!isDesktop()) {
      if (mode !== 'mobile') {
        mode = 'mobile'
        useRestingFrame = false
      }
      startMobilePlayback()
      return
    }

    if (reduced) {
      mode = 'reduced'
      holdReducedFrame()
      return
    }

    if (mode !== 'desktop') {
      useRestingFrame = mode === null
      timelineReady = false
      mode = 'desktop'
    }
    startDesktopScrubbing()
  }
  const onMetadata = () => syncMode()
  const onResize = () => syncMode()

  el.addEventListener('seeked', onSeeked)
  cleanups.push(() => el.removeEventListener('seeked', onSeeked))
  el.addEventListener('loadedmetadata', onMetadata)
  cleanups.push(() => el.removeEventListener('loadedmetadata', onMetadata))
  window.addEventListener('resize', onResize, { passive: true })
  cleanups.push(() => window.removeEventListener('resize', onResize))

  if (root.value && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(([entry]) => {
      heroVisible = Boolean(entry?.isIntersecting)
      syncMode()
    }, { threshold: 0.08 })
    observer.observe(root.value)
  }

  syncMode()

  teardown = () => {
    cancelAnimationFrame(entranceFrame)
    detachPointer()
    cancelPendingSeek()
    observer?.disconnect()
    cleanups.forEach(fn => fn())
    el.pause()
  }
})

onBeforeUnmount(() => { teardown?.() })
</script>

<template>
  <section ref="root" class="hh" :class="{ 'is-ready': ready }" aria-label="SVARA — Engineering Intelligence">
    <!-- cinematic video layer: z0, BELOW the console, feathered into the ivory -->
    <div class="hh__media" aria-hidden="true">
      <video
        ref="videoEl"
        class="hh__video"
        :class="{ 'is-loaded': videoReady }"
        :src="HERO_VIDEO"
        muted
        playsinline
        preload="auto"
      />
    </div>

    <div class="hh__type">
      <div class="hh__eyebrow"><span>SVARA</span><span class="hh__eyebrow-sub">AI-NATIVE INTELLIGENCE LAYER</span></div>
      <h1 class="hh__h1">ENGINEERING<br>INTELLIGENCE</h1>
      <p class="hh__sub" aria-label="SENSE. UNDERSTAND. PREDICT. ACT.">
        <span aria-hidden="true">{{ statusText }}</span><span class="hh__caret" :class="{ 'is-done': statusDone }" aria-hidden="true" />
      </p>
    </div>

    <div class="hh__scroll" aria-hidden="true">
      <span>SCROLL</span>
      <svg width="10" height="26" viewBox="0 0 10 26" fill="none"><path d="M5 0V24M5 24L1 20M5 24L9 20" stroke="currentColor" stroke-width="1.2" /></svg>
    </div>
  </section>
</template>

<style scoped>
.hh {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  font-family: "Geist Sans", system-ui, sans-serif;
  /* locked SVARA warm-ivory canvas */
  background: radial-gradient(125% 100% at 72% 12%, #f7f2e4 0%, #efe9da 44%, #e4ded0 100%);
}

/* ---- cinematic video layer (feathered into ivory; below console z1) ---- */
.hh__media {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  /* dissolve the left edge so the type area stays clean ivory (no rectangle) */
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, transparent 20%, #000 52%, #000 100%);
  mask-image: linear-gradient(90deg, transparent 0%, transparent 20%, #000 52%, #000 100%);
}
.hh__video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 80% center;
  opacity: 0;
  transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.hh__video.is-loaded { opacity: 0.88; }
/* warm vignette melts the video edges into the approved ivory — no seam */
.hh__media::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(120% 96% at 82% 42%, rgba(239, 233, 218, 0) 0%, rgba(239, 233, 218, 0) 46%, rgba(239, 233, 218, 0.55) 78%, #e4ded0 100%),
    linear-gradient(90deg, rgba(247, 242, 228, 0.5) 0%, rgba(247, 242, 228, 0) 34%);
}

/* ---- locked typography (deep navy) ---- */
.hh__type {
  position: absolute;
  top: 12vh;
  left: 5vw;
  z-index: 3;
  max-width: 52vw;
  pointer-events: none;
}
.hh__eyebrow { display: flex; gap: 1.6rem; align-items: center; font-size: 11px; letter-spacing: 0.28em; font-weight: 500; color: #3a4a6b; }
.hh__eyebrow-sub { color: #8b93a6; }
.hh__h1 {
  margin: 4vh 0 0;
  font-size: clamp(52px, 8.4vw, 158px);
  font-weight: 600;
  line-height: 0.92;
  letter-spacing: -0.02em;
  color: #14223f;
  text-wrap: balance;
}
.hh__sub {
  margin: 3.4vh 0 0;
  min-height: 1.2em; /* reserve height so the typewriter causes no layout shift */
  font-size: clamp(12px, 1vw, 15px);
  letter-spacing: 0.24em;
  font-weight: 500;
  color: #46506e;
  display: flex;
  align-items: center;
}
/* typewriter caret — 2px wide, ~1.1em tall, SVARA typography colour */
.hh__caret {
  display: inline-block;
  width: 2px;
  height: 1.1em;
  margin-left: 3px;
  background: #46506e;
  animation: hh-blink 1s step-end infinite;
}
.hh__caret.is-done { animation: none; opacity: 0; } /* retire caret when finished */
@keyframes hh-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

/* ---- restrained entrance choreography (opacity + small y, staggered) ---- */
.hh__eyebrow,
.hh__h1,
.hh__sub {
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
}
.hh.is-ready .hh__eyebrow { opacity: 1; transform: none; transition-delay: 0.15s; }
.hh.is-ready .hh__h1 { opacity: 1; transform: none; transition-delay: 0.25s; }
.hh.is-ready .hh__sub { opacity: 1; transform: none; transition-delay: 0.40s; }

.hh__scroll {
  position: absolute; left: 5vw; bottom: 4vh; z-index: 3;
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.24em; color: #8b93a6;
  opacity: 0; transition: opacity 0.9s ease;
}
.hh.is-ready .hh__scroll { opacity: 1; transition-delay: 0.7s; }
.hh__scroll svg { color: #8b93a6; animation: hh-bob 2.4s ease-in-out infinite; }
@keyframes hh-bob { 0%, 100% { transform: translateY(0); opacity: 0.5; } 50% { transform: translateY(5px); opacity: 1; } }

@media (max-width: 900px) {
  .hh__type { max-width: 92vw; }
  .hh__scroll { display: none; }
  /* mobile: keep the video subtler behind wider type, centre the subject */
  .hh__video { object-position: 68% center; }
  .hh__video.is-loaded { opacity: 0.6; }
  .hh__media {
    -webkit-mask-image: linear-gradient(90deg, transparent 0%, transparent 6%, #000 60%, #000 100%);
    mask-image: linear-gradient(90deg, transparent 0%, transparent 6%, #000 60%, #000 100%);
  }
}
@media (prefers-reduced-motion: reduce) {
  .hh__scroll svg { animation: none; }
  .hh__caret { animation: none; opacity: 0; }
  /* content is always present regardless of the entrance choreography */
  .hh__eyebrow, .hh__h1, .hh__sub, .hh__scroll { opacity: 1 !important; transform: none !important; transition: none !important; }
}
</style>
