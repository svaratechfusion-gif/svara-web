<script setup lang="ts">
// HeroVisual — the robot head, integrated into the Hero rather than
// framed by it. Four stacked layers, image last so it's always the
// topmost/focal element and free to overflow the other three:
//   __glow   — soft radial white→light-blue gradient, fills the space a
//              card used to occupy instead of framing one.
//   __panel  — a minimal glass hint (inset, low-fill, thin border) — a
//              trace of surface, not a container. Doesn't wrap the image,
//              so it never clips it.
//   __ground — a soft blurred shadow roughly under the neck/shoulder line,
//              anchoring the figure now that it's floating free of a box.
//   __float/__img — the image itself, sized ~113% of the slot (was 90%)
//              so it naturally overflows the panel's edges.
// No particle logic here (that's HeroParticleField.vue, mounted separately
// at the page level).
//
// Two independent transforms, two elements, so neither fights the other:
//   .hero-visual__float — cursor parallax (this file, below): translate
//     only, spring-interpolated, max 12px toward the pointer.
//   .hero-visual__img   — the entrance animation (HeroSection.vue's
//     timeline): scale + y, one-shot on mount.
// Centering/sizing on the panel itself is flexbox, not `transform`, so
// both of the above have the property to themselves.
//
// The parallax spring is semi-implicit Euler — same physics language as
// Helios's particle springs (lib/helios/physics/HeliosParticles.ts) — just
// applied to one 2D point instead of thousands. Damping is set just above
// critical for its stiffness, so it settles without ever overshooting:
// "floating glass," not a bounce.
//
// SAMPLING SURFACE — scaffolding only, nothing consumes this yet. Exposed
// via defineExpose (see lib/types/heroVisual.ts for the contract) so a
// future particle engine can read the image's on-screen bounds and its
// per-pixel alpha without this component knowing anything about particles,
// dissolve, or Three.js. No morph/dissolve logic lives here — do not wire
// this into lib/helios/ until that work is explicitly scoped.
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { gsap } from '~~/lib/gsap'
import type { HeroImageBounds, HeroImageMask } from '~~/lib/types/heroVisual'

const floatEl = ref<HTMLElement>()
const imageRef = ref<HTMLImageElement>()

const bounds = ref<HeroImageBounds>({ x: 0, y: 0, width: 0, height: 0 })
const mask = ref<HeroImageMask | null>(null)

/** downsample cap — a future sampler needs a silhouette, not photographic
 *  fidelity; this keeps the one-time canvas read cheap regardless of the
 *  source asset's actual resolution. */
const MASK_MAX_DIM = 256

function updateBounds() {
  if (!imageRef.value) return
  const r = imageRef.value.getBoundingClientRect()
  bounds.value = { x: r.left, y: r.top, width: r.width, height: r.height }
}

/** one-time: draw the loaded image onto an offscreen canvas and extract
 *  its alpha channel. Same-origin asset (public/), so no CORS/taint risk. */
function buildMask() {
  const img = imageRef.value
  if (!img || !img.naturalWidth || !img.naturalHeight) return
  const scale = MASK_MAX_DIM / Math.max(img.naturalWidth, img.naturalHeight)
  const w = Math.max(1, Math.round(img.naturalWidth * scale))
  const h = Math.max(1, Math.round(img.naturalHeight * scale))

  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return
  ctx.drawImage(img, 0, 0, w, h)

  const { data: rgba } = ctx.getImageData(0, 0, w, h)
  const alpha = new Uint8ClampedArray(w * h)
  for (let i = 0; i < alpha.length; i++) alpha[i] = rgba[i * 4 + 3]!
  mask.value = { width: w, height: h, data: alpha }
}

function getAlphaAt(u: number, v: number): number {
  const m = mask.value
  if (!m || u < 0 || u > 1 || v < 0 || v > 1) return 0
  const x = Math.min(m.width - 1, Math.floor(u * m.width))
  const y = Math.min(m.height - 1, Math.floor(v * m.height))
  return m.data[y * m.width + x]! / 255
}

const MAX_OFFSET = 12 // px
const STIFFNESS = 45
const DAMPING = 14 // critical damping for STIFFNESS=45 is 2*sqrt(45)≈13.4 — no wobble

let x = 0, y = 0, vx = 0, vy = 0
let targetX = 0, targetY = 0
let heroEl: HTMLElement | null = null

function onPointerMove(e: PointerEvent) {
  if (!heroEl) return
  const r = heroEl.getBoundingClientRect()
  const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
  const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
  targetX = Math.max(-1, Math.min(1, dx)) * MAX_OFFSET
  targetY = Math.max(-1, Math.min(1, dy)) * MAX_OFFSET
}

function onPointerLeave() {
  targetX = 0
  targetY = 0
}

// GSAP ticker deltaTime is milliseconds — this rides the same shared tick
// source as the rest of the site's motion rather than a private rAF loop.
function tick(_time: number, deltaMs: number) {
  const dt = Math.min(deltaMs / 1000, 1 / 30)
  const ax = (targetX - x) * STIFFNESS - vx * DAMPING
  const ay = (targetY - y) * STIFFNESS - vy * DAMPING
  vx += ax * dt
  vy += ay * dt
  x += vx * dt
  y += vy * dt
  if (floatEl.value) floatEl.value.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`
}

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const hoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  if (!reduced && hoverCapable) {
    heroEl = document.querySelector('.hero')
    if (heroEl) {
      heroEl.addEventListener('pointermove', onPointerMove, { passive: true })
      heroEl.addEventListener('pointerleave', onPointerLeave, { passive: true })
      gsap.ticker.add(tick)
    }
  }

  // sampling surface — independent of the reduced-motion/hover gate above,
  // since a future consumer may want bounds/mask regardless of whether
  // the parallax itself is active
  const img = imageRef.value
  if (img) {
    if (img.complete && img.naturalWidth) buildMask()
    else img.addEventListener('load', buildMask, { once: true })
  }
  updateBounds()
  window.addEventListener('resize', updateBounds, { passive: true })
})

onBeforeUnmount(() => {
  gsap.ticker.remove(tick)
  heroEl?.removeEventListener('pointermove', onPointerMove)
  heroEl?.removeEventListener('pointerleave', onPointerLeave)
  window.removeEventListener('resize', updateBounds)
  imageRef.value?.removeEventListener('load', buildMask)
})

defineExpose({ imageRef, bounds, mask, getAlphaAt })
</script>

<template>
  <div class="hero-visual">
    <div class="hero-visual__glow" aria-hidden="true" />
    <div class="hero-visual__panel" aria-hidden="true" />
    <div class="hero-visual__ground" aria-hidden="true" />
    <div ref="floatEl" class="hero-visual__float">
      <img
        ref="imageRef"
        class="hero-visual__img"
        src="/images/hero/robot-head.png"
        alt="SVARA's enterprise intelligence platform, visualized"
        fetchpriority="high"
        decoding="async"
      >
    </div>
  </div>
</template>

<style scoped>
.hero-visual {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: visible; /* the image is meant to spill past this box */
  background: transparent;
  /* flexbox centers/right-biases the float wrapper — deliberately not
     `transform`, which the two child elements above own exclusively */
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

/* soft white→light-blue radial glow, roughly centered on the head — this
   is what fills the space the old opaque glass card used to occupy.
   Renders behind the image; robot-head.png has no real alpha channel
   (verified — it's a fully opaque render), so the glow shows in the
   margins around the figure rather than through it, which is the point:
   it replaces the card's presence, it doesn't need to shine through it. */
.hero-visual__glow {
  position: absolute;
  left: 50%;
  top: 28%;
  width: 130%;
  height: 100%;
  transform: translate(-50%, -38%);
  background: radial-gradient(circle,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(224, 238, 253, 0.55) 32%,
    rgba(224, 238, 253, 0.22) 52%,
    rgba(224, 238, 253, 0) 72%);
  pointer-events: none;
  z-index: 0;
}

/* the glass panel, deliberately minor — a trace of surface, not a card.
   Inset from the column edges and a sibling of the image (not a wrapper),
   so it never clips or frames it; the image floats free on top. */
.hero-visual__panel {
  position: absolute;
  inset: 8%;
  border-radius: var(--radius-image);
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow: var(--shadow-soft);
  z-index: 1;
}

.hero-visual__panel::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--glass-reflection);
  opacity: 0.5; /* the panel is already minimal — keep the sheen commensurately faint */
  pointer-events: none;
}

/* anchors the figure now that it floats free of a box — a soft blurred
   shadow roughly under the neck/shoulder line, not a hard drop-shadow */
.hero-visual__ground {
  position: absolute;
  left: 53%;
  bottom: 34%;
  width: 40%;
  height: 10%;
  transform: translateX(-50%);
  background: radial-gradient(ellipse at center, rgba(16, 42, 91, 0.24) 0%, rgba(16, 42, 91, 0) 72%);
  filter: blur(8px);
  pointer-events: none;
  z-index: 2;
}

/* ~113% of the slot (was 90%) — the head overflows the panel/glow edges
   naturally instead of sitting padded inside them. Owns the cursor-
   parallax transform (translate only — see script). */
.hero-visual__float {
  position: relative;
  width: 113%;
  height: 113%;
  will-change: transform;
  z-index: 3;
}

/* fills the float wrapper; owns the entrance-animation transform
   (scale + y — see HeroSection.vue). object-fit: contain + no filter on
   this element keeps the artwork itself pixel-crisp — only the glow/
   ground layers behind it are blurred. */
.hero-visual__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: right center;
}
</style>
