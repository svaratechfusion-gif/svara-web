<script setup lang="ts">
// INVESTORS · HERO — the "SynapseX" cinematic design language applied as a VISUAL
// SYSTEM only: mouse-scrubbed fullscreen hero video, dot-grid overlay, Anton-SC
// watermark, ScrambleIn headline reveal, bottom-anchored editorial split, staggered
// Framer-Motion (motion-v) entrance. Monochrome-black is adapted to SVARA — deep
// navy ground, SVARA blue accent, white ink, muted blue-gray. All copy + CTAs are
// SVARA's own (Content Bible). No in-hero navbar (the global site header is the
// only nav). No SynapseX branding/logo/download/metrics.
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { motion } from 'motion-v'
import { investorsContent } from '~~/lib/content/investors'
import ScrambleIn from '~/components/investors/ScrambleIn.vue'
import { HERO_EASE } from '~/utils/hero-motion'

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4'

const body = investorsContent.aiAnswerTarget.replace(/\*\*/g, '')
const softEase = HERO_EASE // the master hero motion language (this hero is its origin)

const videoEl = ref<HTMLVideoElement | null>(null)
const entranceComplete = ref(false)

// Space Mono (body) + Anton SC (watermark) — the reference's typography.
useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Anton+SC&display=swap',
    },
  ],
})

// ── mouse-scrubbed hero video (delta-based, chained via `seeked`) ──────────────
const SENSITIVITY = 0.8
let duration = 0
let target = 0
let seeking = false
let pending = false
let lastX: number | null = null
let entranceTimer: ReturnType<typeof setTimeout> | null = null
let cleanupPointer: (() => void) | null = null

function seekTo(): void {
  const v = videoEl.value
  if (!v) return
  seeking = true
  try { v.currentTime = target } catch { /* ignore transient seek errors */ }
}
function onSeeked(): void {
  if (pending) { pending = false; seekTo() }
  else seeking = false
}
function onMove(e: PointerEvent): void {
  if (!duration) return
  if (lastX === null) { lastX = e.clientX; return }
  const dx = e.clientX - lastX
  lastX = e.clientX
  target += (dx / window.innerWidth) * duration * SENSITIVITY
  target = ((target % duration) + duration) % duration // wrap seamlessly
  if (seeking) pending = true
  else seekTo()
}

onMounted(() => {
  entranceTimer = setTimeout(() => { entranceComplete.value = true }, 800)

  const v = videoEl.value
  if (!v) return
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const coarse = window.matchMedia('(pointer: coarse)').matches

  const initMeta = () => {
    duration = v.duration || 0
    if (coarse || reduced) {
      // touch / reduced-motion: no scrub target — play a calm muted loop instead
      v.loop = true
      v.muted = true
      v.play().catch(() => { /* autoplay may be blocked; static frame is fine */ })
    } else {
      v.pause()
      try { v.currentTime = 0.001 } catch { /* force first-frame decode */ }
    }
  }
  if (v.readyState >= 1) initMeta()
  else v.addEventListener('loadedmetadata', initMeta, { once: true })

  if (!coarse && !reduced) {
    v.addEventListener('seeked', onSeeked)
    window.addEventListener('pointermove', onMove, { passive: true })
    cleanupPointer = () => {
      v.removeEventListener('seeked', onSeeked)
      window.removeEventListener('pointermove', onMove)
    }
  }
})

onBeforeUnmount(() => {
  if (entranceTimer) clearTimeout(entranceTimer)
  cleanupPointer?.()
})
</script>

<template>
  <section class="irx">
    <!-- mouse-scrubbed background video (NOT autoplay on desktop) -->
    <video
      ref="videoEl"
      class="irx__video"
      muted
      playsinline
      preload="auto"
      aria-hidden="true"
    >
      <source :src="HERO_VIDEO" type="video/mp4">
    </video>

    <!-- dot-grid overlay -->
    <div class="irx__grid" aria-hidden="true" />
    <!-- oversized watermark -->
    <div class="irx__mark" aria-hidden="true">SVARA</div>
    <!-- cinematic fade → resolves into the page's ivory ground below -->
    <div class="irx__seam" aria-hidden="true" />

    <!-- content — pushed to the bottom via the flex spacer -->
    <div class="irx__spacer" aria-hidden="true" />
    <div class="irx__row">
      <div class="irx__left">
        <motion.p
          class="irx__eyebrow"
          :initial="{ opacity: 0, y: 12 }"
          :animate="entranceComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }"
          :transition="{ duration: 0.8, ease: softEase, delay: 0.1 }"
        >Investor Relations</motion.p>

        <!-- ONE page heading. The phrase is split across two layout positions,
             so the <h1> carries the whole thing as its accessible name and the
             second half below is marked decorative — otherwise the page ships
             two competing H1s and dilutes its own topic signal. -->
        <motion.h1
          class="irx__title svara-hero-h1"
          aria-label="A category. Not a product."
          :initial="{ opacity: 0 }"
          :animate="entranceComplete ? { opacity: 1 } : { opacity: 0 }"
          :transition="{ duration: 1, ease: softEase }"
        >
          <ScrambleIn text="A category." :delay="200" :triggered="entranceComplete" />
        </motion.h1>

        <motion.p
          class="irx__def"
          :initial="{ opacity: 0, y: 25 }"
          :animate="entranceComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }"
          :transition="{ duration: 0.9, ease: softEase, delay: 0.2 }"
        >{{ body }}</motion.p>

        <motion.div
          class="irx__ctas"
          :initial="{ opacity: 0, y: 16 }"
          :animate="entranceComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }"
          :transition="{ duration: 0.8, ease: softEase, delay: 0.4 }"
        >
          <NuxtLink to="/contact" class="irx__cta irx__cta--primary">Request the thesis</NuxtLink>
          <NuxtLink to="/technology" class="irx__cta irx__cta--ghost">See the technology</NuxtLink>
        </motion.div>
      </div>

      <motion.p
        class="irx__title irx__title--right svara-hero-h1"
        aria-hidden="true"
        :initial="{ opacity: 0 }"
        :animate="entranceComplete ? { opacity: 1 } : { opacity: 0 }"
        :transition="{ duration: 1, ease: softEase }"
      >
        <ScrambleIn text="Not a product." :delay="500" :triggered="entranceComplete" />
      </motion.p>
    </div>
  </section>
</template>

<style scoped>
.irx {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  isolation: isolate;
  background: #0a1428; /* SVARA deep navy (adapted from the reference black) */
  color: #fff;
  font-family: 'Space Mono', ui-monospace, monospace;
  padding: calc(var(--nav-height, 80px) + 8px) clamp(16px, 4vw, 32px) clamp(32px, 6vh, 48px);
  box-sizing: border-box;
  --irx-muted: rgba(196, 210, 236, 0.6);
  --irx-accent: #6ba6ff;
}

.irx__video { position: absolute; inset: 0; z-index: 0; width: 100%; height: 100%; object-fit: cover; }

/* dot grid */
.irx__grid {
  position: absolute; inset: 0; z-index: 1; pointer-events: none; opacity: 0.05;
  background-image: radial-gradient(#ffffff 1px, transparent 1px);
  background-size: 24px 24px;
}

/* oversized navy-blue watermark */
.irx__mark {
  position: absolute; left: 50%; top: calc(50% + 50px); transform: translate(-50%, -50%);
  z-index: 1; pointer-events: none; user-select: none; white-space: nowrap;
  font-family: 'Anton SC', 'Space Mono', sans-serif;
  font-size: clamp(120px, 30vw, 521px); line-height: 1; text-transform: uppercase;
  letter-spacing: -4px; opacity: 0.1;
  background: radial-gradient(circle, rgba(47, 127, 230, 0) 0%, #2c4a7a 70%);
  -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent;
}

/* bottom seam → page ivory (#f6f2ea) */
.irx__seam {
  position: absolute; left: 0; right: 0; bottom: 0; z-index: 1; height: clamp(120px, 20vh, 240px);
  background: linear-gradient(to bottom, rgba(10, 20, 40, 0) 0%, #f6f2ea 100%);
  pointer-events: none;
}

.irx__spacer { flex: 1; }

/* bottom editorial row */
.irx__row {
  position: relative; z-index: 2; width: 100%;
  display: flex; flex-direction: column; gap: 24px;
}
/* min-width:0 lets these flex items shrink so the oversized headings WRAP inside the
   hero instead of overflowing and being clipped by the section's overflow:hidden.
   (Typography/scale unchanged — this is a layout-only fix for the clipping.) */
.irx__left { display: flex; flex-direction: column; gap: 16px; min-width: 0; }

.irx__eyebrow {
  margin: 0; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--irx-muted);
}

.irx__title {
  margin: 0;
  font-family: 'Space Mono', ui-monospace, monospace;
  font-weight: 400;
  font-size: clamp(40px, 10vw, 100px);
  line-height: 0.95;
  letter-spacing: -0.03em;
  color: #fff;
}
.irx__title--right { color: var(--irx-muted); min-width: 0; overflow-wrap: break-word; }

.irx__def {
  margin: 0; max-width: 24rem;
  font-size: 13px; line-height: 1.65; color: var(--irx-muted);
}

.irx__ctas { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 8px; }
.irx__cta {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 13px 26px; border-radius: 999px;
  font-family: 'Space Mono', ui-monospace, monospace; font-size: 13px; letter-spacing: 0.01em;
  text-decoration: none; cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}
.irx__cta--primary { background: #fff; color: #0a1428; }
.irx__cta--primary:hover { transform: scale(1.03); background: #e2e6f0; }
.irx__cta--ghost { background: transparent; color: #fff; border: 1px solid rgba(196, 210, 236, 0.35); }
.irx__cta--ghost:hover { transform: scale(1.03); border-color: var(--irx-accent); color: var(--irx-accent); }

@media (min-width: 768px) {
  .irx__row { flex-direction: row; align-items: flex-end; justify-content: space-between; gap: 32px; }
  .irx__def { font-size: 15px; }
  .irx__title--right { text-align: right; }
}

@media (max-width: 480px) { .irx__ctas { width: 100%; } .irx__cta { flex: 1; } }

@media (prefers-reduced-motion: reduce) {
  .irx__cta { transition: none; }
}
</style>
