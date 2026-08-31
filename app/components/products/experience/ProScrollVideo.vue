<script setup lang="ts">
// SCROLL-SCRUBBED VIDEO BACKGROUND — fixed full-bleed layer (z0), scroll-driven
// only (never a looping autoplay). Faithful port of the NovaAI reference:
//   · poster (optional) → <video> → <canvas> opacity crossfades
//   · progress = scrollY / (scrollHeight - innerHeight), clamped 0..1
//   · lerp smoothing: smoothed += (target - smoothed) * 0.12 per rAF
//   · object-cover draw math (scale to max, centre crop), DPR = min(dpr, 2)
//   · frame cache: offscreen video → up to 90 ImageBitmaps (max 960px wide),
//     started 300ms after the visible video has data; canvas draws them by index
//   · fallback: seek the visible <video> to smoothed*(duration-0.05) (Δ>0.04s)
// SVARA reskin: a cream veil melts the video into the #FDFCF0 page (light theme).
// Cross-origin safe: the visible <video> carries NO crossOrigin (always plays /
// seeks for the fallback); only the offscreen extractor requests CORS, and if it
// is refused the frame cache is abandoned and the fallback carries the scrub.
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{ videoUrl: string, posterUrl?: string }>()

const videoEl = ref<HTMLVideoElement | null>(null)
const canvasEl = ref<HTMLCanvasElement | null>(null)

const videoHasFrame = ref(false) // visible video decoded at least one frame
const framesReady = ref(false)   // offscreen frame cache complete → canvas active

let raf = 0
let target = 0
let smoothed = 0
let reduced = false
let ctx: CanvasRenderingContext2D | null = null
let frames: ImageBitmap[] = []
let offscreen: HTMLVideoElement | null = null
let cacheStarted = false
let posterHidden = ref(false)

// seek throttling for the fallback path
let lastSeek = -1
let seeking = false

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

function computeProgress() {
  const range = document.documentElement.scrollHeight - window.innerHeight
  return range > 0 ? clamp01(window.scrollY / range) : 0
}

function resizeCanvas() {
  const cv = canvasEl.value
  if (!cv) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  cv.width = Math.round(cv.clientWidth * dpr)
  cv.height = Math.round(cv.clientHeight * dpr)
  ctx = cv.getContext('2d')
}

// object-cover: scale source to fill the canvas, centre-crop the overflow
function drawCover(src: CanvasImageSource, sw: number, sh: number) {
  const cv = canvasEl.value
  if (!ctx || !cv || !sw || !sh) return
  const scale = Math.max(cv.width / sw, cv.height / sh)
  const dw = sw * scale
  const dh = sh * scale
  ctx.drawImage(src, (cv.width - dw) / 2, (cv.height - dh) / 2, dw, dh)
}

function renderFrame() {
  if (framesReady.value && frames.length) {
    const idx = Math.min(frames.length - 1, Math.round(smoothed * (frames.length - 1)))
    const bmp = frames[idx]
    if (bmp) drawCover(bmp, bmp.width, bmp.height)
    return
  }
  // fallback: drive the visible <video> element's currentTime
  const v = videoEl.value
  if (!v || !Number.isFinite(v.duration) || v.duration <= 0) return
  const t = smoothed * (v.duration - 0.05)
  if (!seeking && Math.abs(t - lastSeek) > 0.04) {
    seeking = true
    lastSeek = t
    try { v.currentTime = t } catch { seeking = false }
  }
}

function tick() {
  target = computeProgress()
  smoothed += (target - smoothed) * (reduced ? 1 : 0.12)
  renderFrame()
  raf = requestAnimationFrame(tick)
}

// ---- offscreen frame cache (best-effort, CORS-gated) ----
async function buildCache() {
  if (cacheStarted) return
  cacheStarted = true
  try {
    const off = document.createElement('video')
    offscreen = off
    off.crossOrigin = 'anonymous'
    off.muted = true
    off.playsInline = true
    off.preload = 'auto'
    off.src = props.videoUrl

    await new Promise<void>((res, rej) => {
      off.addEventListener('loadedmetadata', () => res(), { once: true })
      off.addEventListener('error', () => rej(new Error('offscreen load failed')), { once: true })
    })

    const duration = off.duration
    if (!Number.isFinite(duration) || duration <= 0) return
    const count = Math.max(24, Math.min(90, Math.round(duration * 12)))
    const resizeWidth = Math.min(off.videoWidth || 960, 960)

    for (let i = 0; i < count; i++) {
      const t = (i / (count - 1)) * duration * 0.999
      await new Promise<void>((res) => {
        const onSeeked = () => { off.removeEventListener('seeked', onSeeked); res() }
        off.addEventListener('seeked', onSeeked)
        try { off.currentTime = t } catch { res() }
      })
      // createImageBitmap throws if the source is CORS-tainted → abort to fallback
      const bmp = await createImageBitmap(off, { resizeWidth, resizeQuality: 'high' })
      frames.push(bmp)
    }

    if (frames.length) {
      framesReady.value = true // canvas fades in, <video> fades out
      resizeCanvas()
    }
  } catch {
    // CORS-tainted / decode failure — keep the fallback (visible-video seeking)
    frames.forEach((b) => b.close?.())
    frames = []
    framesReady.value = false
  } finally {
    if (offscreen) { offscreen.removeAttribute('src'); offscreen.load?.(); offscreen = null }
  }
}

function onVideoData() {
  videoHasFrame.value = true
  posterHidden.value = true
  if (!cacheStarted) window.setTimeout(buildCache, 300) // spec: wait data + 300ms
}
function onSeeked() { seeking = false }
function onResize() { resizeCanvas() }

onMounted(() => {
  if (typeof window === 'undefined') return
  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  resizeCanvas()

  const v = videoEl.value
  if (v) {
    if (v.readyState >= 2) onVideoData()
    else v.addEventListener('loadeddata', onVideoData, { once: true })
    v.addEventListener('seeked', onSeeked)
  }
  window.addEventListener('resize', onResize, { passive: true })

  smoothed = computeProgress()
  target = smoothed
  raf = requestAnimationFrame(tick)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('resize', onResize)
  const v = videoEl.value
  v?.removeEventListener('loadeddata', onVideoData)
  v?.removeEventListener('seeked', onSeeked)
  frames.forEach((b) => b.close?.())
  frames = []
  if (offscreen) { offscreen.removeAttribute('src'); offscreen = null }
})
</script>

<template>
  <div class="sv" aria-hidden="true">
    <img
      v-if="posterUrl"
      class="sv__poster"
      :class="{ 'is-hidden': posterHidden || videoHasFrame }"
      :src="posterUrl"
      alt=""
    >
    <video
      ref="videoEl"
      class="sv__video"
      :class="{ 'is-shown': videoHasFrame && !framesReady }"
      :src="videoUrl"
      muted
      playsinline
      preload="auto"
    />
    <canvas
      ref="canvasEl"
      class="sv__canvas"
      :class="{ 'is-shown': framesReady }"
    />
    <!-- SVARA cream veil: melts the video into the #FDFCF0 page + lifts navy text -->
    <div class="sv__veil" />
  </div>
</template>

<style scoped>
.sv {
  position: fixed;
  inset: 0;
  /* -1: behind the page's in-flow content (product sections + existing footer)
     but above the html ground and the layout's BackgroundCanvas (also -1, but
     earlier in the DOM) — the standard site fixed-background layer. */
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
  background: var(--sx-cream, #fdfcf0);
}
.sv__poster,
.sv__video,
.sv__canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.sv__poster { opacity: 1; transition: opacity 0.5s ease; }
.sv__poster.is-hidden { opacity: 0; }
.sv__video { opacity: 0; transition: opacity 0.5s ease; }
.sv__video.is-shown { opacity: 1; }
.sv__canvas { opacity: 0; transition: opacity 0.5s ease; }
.sv__canvas.is-shown { opacity: 1; }

/* cream vignette — centre stays cinematic video, edges dissolve into #FDFCF0
   so the page reads as SVARA light while navy text stays legible */
.sv__veil {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(125% 100% at 50% 38%,
      rgba(253, 252, 240, 0) 0%,
      rgba(253, 252, 240, 0.14) 44%,
      rgba(253, 252, 240, 0.6) 80%,
      var(--sx-cream, #fdfcf0) 100%),
    linear-gradient(180deg,
      rgba(253, 252, 240, 0.42) 0%,
      rgba(253, 252, 240, 0.12) 26%,
      rgba(253, 252, 240, 0.12) 72%,
      rgba(253, 252, 240, 0.5) 100%);
}
</style>
