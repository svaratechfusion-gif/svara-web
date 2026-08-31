<script setup lang="ts">
// SVARA INTELLIGENCE ENGINE — one global ambient particle system for the
// whole homepage, mounted once at the page level (see index.vue). A fixed,
// full-viewport, pointer-events:none overlay: a continuous downward-
// flowing cloud that starts once the Hero has scrolled out of view and
// stays alive through the rest of the page — not scoped to any one
// section's layout box. This is no longer the Hero's own visual (that's
// now a static image, see HeroSection.vue) — the Hero simply no longer
// renders anything into this canvas; the engine persists because other
// sections (Problem/Products/Industries/Technology/CTA section-gravity,
// Footer density) still depend on it. See the vault Decision Log for the
// removal of the particle-head visual, cursor interaction, and scroll-
// driven assembly/dissolve that used to live here.
//
// Dormant is fully invisible (see HeliosMaterials PRESENCE); the engine's
// only visible presence during the Hero is the small Orbit halo around
// the Hero image (applyOrbit(), below) — a few particles, dim, parked
// well clear of the headline/CTA column. The IntersectionObserver below
// fires flow() once the Hero scrolls out of view, handing the whole
// budget over to the page-wide ambient current.
import { onMounted, onBeforeUnmount, ref } from 'vue'
import type { HeliosEngine } from '~~/lib/helios'
import { useIntelligenceEngine } from '~/composables/useIntelligenceEngine'

const mount = ref<HTMLElement>()
const sharedEngine = useIntelligenceEngine()
let engine: HeliosEngine | null = null
let heroObserver: IntersectionObserver | null = null

// Below this width the Hero's grid stacks to a single column (see
// HeroSection.vue's own @media 1024px rule) — the cloud should center
// rather than sit offset to the right once there's no side-by-side
// text/visual split to weight against.
const STACK_BREAKPOINT = 1024
// Camera params mirrored from HeliosConfig (fov/cameraZ) so the offset
// lands the cloud at ~70% across on wide screens regardless of how wide
// the viewport actually is — see HeliosConfig for the source values.
const FOV_DEG = 35
const CAMERA_Z = 5.1

function computeEntityOffsetX() {
  if (window.innerWidth < STACK_BREAKPOINT) return 0
  const aspect = window.innerWidth / window.innerHeight
  const visibleHalfHeight = CAMERA_Z * Math.tan((FOV_DEG * Math.PI) / 180 / 2)
  const visibleWidth = visibleHalfHeight * 2 * aspect
  return (0.7 - 0.5) * visibleWidth // 70% across, centered camera at 50%
}

function applyOffset() {
  engine?.setEntityOffset(computeEntityOffsetX())
}

// px rect → NDC (−1…1, Y flipped) — same convention HeliosEngine's
// ndcToWorld expects. Reads the Hero image directly by class rather than
// through HeroVisual's exposed ref: this component is mounted separately
// at the page level (see index.vue) and has no parent/child relationship
// with HeroVisual, so a DOM lookup (matching the existing `.hero` lookup
// pattern below) is simpler than wiring a cross-component ref for one
// read-only rect.
function toNdc(x: number, y: number) {
  return { x: (x / window.innerWidth) * 2 - 1, y: -((y / window.innerHeight) * 2 - 1) }
}

function applyOrbit() {
  const img = document.querySelector('.hero-visual__img')
  if (!img || !engine) return false
  const r = img.getBoundingClientRect()
  if (r.width === 0 || r.height === 0) return false
  const cx = r.left + r.width / 2
  const cy = r.top + r.height / 2
  engine.orbit(toNdc(cx, cy), toNdc(r.right, cy))
  return true
}

function handleResize() {
  applyOffset()
  engine?.resize()
  // only the Hero's halo tracks the image's live size — once Flow has
  // started the cloud no longer cares about the Hero image at all
  if (engine?.store.state.currentState === 'orbit') applyOrbit()
}

onMounted(async () => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const hasWebgl2 = !!document.createElement('canvas').getContext('webgl2')
  if (reduced || !hasWebgl2 || !mount.value) return

  const { HeliosEngine } = await import('~~/lib/helios')

  engine = new HeliosEngine(mount.value)
  engine.initialize()
  applyOffset()
  sharedEngine.value = engine
  window.addEventListener('resize', handleResize, { passive: true })

  // Hero's own accent: a small halo orbiting the Hero image (see
  // HeliosMorph's Orbit state) — falls back to silence if the image isn't
  // laid out yet rather than guessing a radius.
  applyOrbit()

  // start Flow once the Hero scrolls out of view — never while it's still
  // on screen, so the full cloud never overlaps the headline/CTA. One-
  // shot: once it fires, stop observing (Flow never needs to stop again).
  const heroEl = document.querySelector('.hero')
  if (heroEl) {
    heroObserver = new IntersectionObserver(([entry]) => {
      if (entry && !entry.isIntersecting) {
        engine?.flow()
        heroObserver?.disconnect()
        heroObserver = null
      }
    }, { threshold: 0 })
    heroObserver.observe(heroEl)
  } else {
    engine.flow()
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  heroObserver?.disconnect()
  heroObserver = null
  engine?.destroy()
  engine = null
  sharedEngine.value = null
})
</script>

<template>
  <div ref="mount" class="intelligence-engine" aria-hidden="true" />
</template>

<style scoped>
.intelligence-engine {
  position: fixed;
  inset: 0;
  /* BEHIND every section — headings, paragraphs, buttons, images, cards,
     nav. Negative z-index is required, not just "a low number": in-flow
     content with no explicit z-index still paints above ANY positioned
     element with z-index >= 0 per CSS stacking rules. Matches the
     established pattern in background/BackgroundCanvas.vue. */
  z-index: -1;
  pointer-events: none;
}
.intelligence-engine :deep(canvas) { display: block; width: 100%; height: 100%; }
</style>
