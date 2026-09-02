<script setup lang="ts">
// A scroll-driven 3D card stack, pinned over a tall scroll region. Scroll progress
// advances a float index `f`; each card is placed on a VERTICAL CYLINDER from that
// index, so cards travel bottom-to-top and tilt through the focus.
//
// RADIUS 1350 / STEP 27° puts adjacent cards RADIUS·sin(STEP) ≈ 613px apart — clear of
// the ~460px card height, so they never intersect mid-transition.
//
// The index runs a small fraction past each end (OVERSCAN 0.2). A full card of
// overscan left a dead gap on entry and an early exit; a fraction keeps the end cards
// essentially centred with just a hint of motion — no lead-in gap, no early departure,
// and never a hard freeze.
//
// Nothing here writes to reactive state during scroll: the transforms and the metadata
// text are set directly on DOM nodes, so the component renders once and the scroll path
// stays free of Vue re-renders.
import { ref } from 'vue'
import { useTicker } from '~/composables/useTicker'
import StrideHeading from './StrideHeading.vue'
import { STRIDE_WORKS } from '~~/lib/stride/content'

const SCROLL_PER_CARD = 60 // vh of scroll per card
const RADIUS = 1350 // px — cylinder radius (larger = more vertical spacing)
const STEP = 27 // deg between adjacent cards around the cylinder
const OVERSCAN = 0.2 // how far past each end the index runs
const FOLLOW = 0.14 // low-pass on the (cross-frame) scroll read

const items = STRIDE_WORKS.items
const count = items.length
const sectionHeight = `${100 + (count - 1) * SCROLL_PER_CARD}vh`

const sectionRef = ref<HTMLElement | null>(null)
const stageRef = ref<HTMLElement | null>(null)
const indexElRef = ref<HTMLElement | null>(null)
const nameElRef = ref<HTMLElement | null>(null)

let current = 0
let shownIdx = -1

const pad = (n: number): string => String(n).padStart(2, '0')
const clamp01 = (v: number): number => (v < 0 ? 0 : v > 1 ? 1 : v)

useTicker(() => {
  const el = sectionRef.value
  const stage = stageRef.value
  if (!el || !stage) return

  const total = el.offsetHeight - window.innerHeight // pinned scroll length
  const p = clamp01(-el.getBoundingClientRect().top / Math.max(1, total))
  const target = p * (count - 1 + OVERSCAN * 2) - OVERSCAN
  current += (target - current) * FOLLOW
  const f = current

  stage.querySelectorAll<HTMLElement>('[data-back]').forEach((node) => {
    const i = Number(node.dataset.back)
    node.style.opacity = String(Math.max(0, 1 - Math.abs(i - f)))
    node.style.transform = `translateY(${(i - f) * 22}%) scale(1.6)`
  })

  stage.querySelectorAll<HTMLElement>('[data-card]').forEach((node) => {
    const i = Number(node.dataset.card)
    const rel = i - f
    const rad = (rel * STEP * Math.PI) / 180
    const y = RADIUS * Math.sin(rad)
    const z = RADIUS * Math.cos(rad) - RADIUS // focus at 0, others recede
    const d = Math.abs(rel)
    node.style.transform = `translate3d(0px, ${y}px, ${z}px) rotateX(${rel * STEP}deg) translate(-50%, -50%)`
    node.style.opacity = d > 3.6 ? '0' : String(Math.max(0, 1 - d * 0.24))
    const scrim = node.querySelector<HTMLElement>('[data-scrim]')
    if (scrim) scrim.style.opacity = String(Math.min(0.35, d * 0.22))
  })

  const idx = Math.min(count - 1, Math.max(0, Math.round(current)))
  if (idx !== shownIdx) {
    shownIdx = idx
    if (indexElRef.value) indexElRef.value.textContent = pad(idx + 1)
    if (nameElRef.value) nameElRef.value.textContent = items[idx]!.name
  }
})
</script>

<template>
  <section
    ref="sectionRef"
    class="sx-works"
    :style="{ height: sectionHeight }"
    :aria-label="STRIDE_WORKS.heading"
  >
    <div ref="stageRef" class="sx-works__stage">
      <!-- Blurred backdrop — each card's photo cross-fading to the focused one and
           drifting bottom-to-top with scroll, dimmed so the cards stay dominant. -->
      <div class="sx-works__back" aria-hidden="true">
        <div v-for="(item, i) in items" :key="`b-${item.name}`" :data-back="i" class="sx-works__back-layer">
          <img :src="item.image" alt="" loading="lazy" decoding="async">
        </div>
        <div class="sx-works__dim" />
      </div>

      <StrideHeading :text="STRIDE_WORKS.heading" class="sx-works__title" />

      <!-- 3D stage — preserve-3d sorts the cards by depth; no animated z-index. -->
      <div class="sx-works__cards">
        <div v-for="(item, i) in items" :key="item.name" :data-card="i" class="sx-works__card">
          <img :src="item.image" :alt="item.name" loading="lazy" decoding="async">
          <!-- Scrim only on the off-focus cards; the centred one stays clear. -->
          <div data-scrim class="sx-works__card-scrim" aria-hidden="true" />
        </div>
      </div>

      <!-- Metadata row — index left, name centred, view button right -->
      <div class="sx-works__meta">
        <span class="sx-works__index"><span ref="indexElRef">{{ pad(1) }}</span> / {{ pad(count) }}</span>
        <span ref="nameElRef" class="sx-works__name">{{ items[0]!.name }}</span>
        <button type="button" class="sx-works__view">{{ STRIDE_WORKS.viewLabel }}</button>
      </div>
    </div>
  </section>
</template>
