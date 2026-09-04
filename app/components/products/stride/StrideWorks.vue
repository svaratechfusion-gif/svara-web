<script setup lang="ts">
// THE PRODUCT STACK — all ten SVARA platforms on a scroll-driven cylinder.
//
// This is the section that replaces the pinned ten-dashboard film: same content, the
// whole portfolio in order, presented in the design's card-stack language. Scroll
// progress advances a float index `f` and each card is placed on a vertical cylinder
// from it, so cards travel bottom-to-top and tilt through the focus.
//
// RADIUS 1350 / STEP 27° puts adjacent cards RADIUS·sin(STEP) ≈ 613px apart — clear of
// the card height, so they never intersect mid-transition. The index runs a fraction
// past each end (OVERSCAN 0.2) so the first and last cards sit essentially centred with
// a hint of motion rather than a dead gap or a hard freeze.
//
// PHOTOGRAPH ABOVE, RECORD BELOW. The source design used a portfolio photo per card;
// SVARA now has its own ten-product set, so each card carries one — but the type sits
// in its own band underneath rather than floating on the image, which keeps the
// photograph unobscured and the record on solid ground.
//
// The card is 16/12 for exactly this reason: at the desktop cap (46·--sr = 736px) that
// is 552px tall, which fits a full-width UNCROPPED 16:9 photograph (414px) plus a
// 138px record band, and still clears the RADIUS·sin(STEP) ≈ 613px gap between
// adjacent cards. Going taller to give the band more room would start intersecting
// the neighbours mid-transition.
//
// The metadata row carries the index and the link only. The source design put the
// project name there because its cards were photographs with no text of their own;
// these cards are typographic, so a centred name would have sat on top of the card's
// own h3.
//
// Nothing writes to reactive state during scroll: transforms and the metadata text are
// set directly on DOM nodes, so the component renders once.
import { ref } from 'vue'
import { useTicker } from '~/composables/useTicker'
import { usePendingProductExplore } from '~/composables/useProductExplore'
import { useExploreOpeners } from '~/composables/useProductExplore'
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
const linkElRef = ref<HTMLAnchorElement | null>(null)
const exploreOpeners = useExploreOpeners()

let current = 0
let shownIdx = -1

// OPEN BY ID, NOT BY PATH. The click interceptor in plugins/product-explore
// resolves a link through PRODUCT_PATH_TO_ID, which only knows routes under
// /products/… — and cognitive, engineering and growth all point at the bare
// /products fallback, so their Explore silently did nothing. Marking the anchor
// `data-product-explore` makes the interceptor stand aside (the convention it
// already uses for ProductOverlay's control) and we set the pending id here,
// which is the one thing that always identifies the product. The href is left
// intact, so crawlers and modified clicks still get the document.
const pending = usePendingProductExplore()

function onExplore(event: MouseEvent) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  event.preventDefault()
  pending.value = items[shownIdx < 0 ? 0 : shownIdx]!.id
}

const pad = (n: number): string => String(n).padStart(2, '0')
const clamp01 = (v: number): number => (v < 0 ? 0 : v > 1 ? 1 : v)

function exploreCurrent(event: MouseEvent): void {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
  const item = items[Math.min(count - 1, Math.max(0, Math.round(current)))]
  if (!item) return
  event.preventDefault()
  event.stopImmediatePropagation()
  exploreOpeners[item.id]?.()
}

useTicker(() => {
  const el = sectionRef.value
  const stage = stageRef.value
  if (!el || !stage) return

  const total = el.offsetHeight - window.innerHeight // pinned scroll length
  const p = clamp01(-el.getBoundingClientRect().top / Math.max(1, total))
  const target = p * (count - 1 + OVERSCAN * 2) - OVERSCAN
  current += (target - current) * FOLLOW
  const f = current

  stage.querySelectorAll<HTMLElement>('[data-glow]').forEach((node) => {
    const i = Number(node.dataset.glow)
    node.style.opacity = String(Math.max(0, 1 - Math.abs(i - f)))
    node.style.transform = `translateY(${(i - f) * 22}%)`
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
    if (scrim) scrim.style.opacity = String(Math.min(0.55, d * 0.34))
  })

  const idx = Math.min(count - 1, Math.max(0, Math.round(current)))
  if (idx !== shownIdx) {
    shownIdx = idx
    const item = items[idx]!
    if (indexElRef.value) indexElRef.value.textContent = pad(idx + 1)
    // The metadata button follows the focused card. It is a real link to the product
    // page: crawlers and cmd-click get the document, while the site's own
    // product-explore plugin turns an in-page click into the immersive overlay.
    if (linkElRef.value) {
      linkElRef.value.setAttribute('href', item.to)
      linkElRef.value.setAttribute('aria-label', `${STRIDE_WORKS.viewLabel} ${item.fullName}`)
    }
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
      <!-- Depth wash — one soft field per card, cross-fading to the focused one and
           drifting bottom-to-top with scroll. Replaces the source's blurred photos. -->
      <div class="sx-works__back" aria-hidden="true">
        <div v-for="(item, i) in items" :key="`g-${item.id}`" :data-glow="i" class="sx-works__glow" />
        <div class="sx-works__dim" />
      </div>

      <StrideHeading :text="STRIDE_WORKS.heading" class="sx-works__title" />

      <!-- 3D stage — preserve-3d sorts the cards by depth; no animated z-index. -->
      <div class="sx-works__cards">
        <article v-for="(item, i) in items" :key="item.id" :data-card="i" class="sx-works__card">
          <span class="hx-pin tl" /><span class="hx-pin tr" /><span class="hx-pin bl" /><span class="hx-pin br" />

          <div class="sx-works__card-shot">
            <img
              :src="item.image" alt="" class="sx-works__card-img"
              width="1600" height="900" loading="lazy" decoding="async"
            >
            <span class="sx-works__card-n">{{ item.n }}</span>
          </div>

          <div class="sx-works__card-rec">
            <div class="sx-works__card-body">
              <h3 class="sx-works__card-name">{{ item.name }}</h3>
              <p class="sx-works__card-tag">{{ item.tagline }}</p>
            </div>
            <footer class="sx-works__card-foot">
              <span>{{ item.category }}</span>
              <span>{{ item.deployment }}</span>
            </footer>
          </div>
          <!-- Off-focus cards dim with distance; the centred card stays clear. -->
          <div data-scrim class="sx-works__card-scrim" aria-hidden="true" />
        </article>
      </div>

      <!-- Metadata row — index left, link right; the card itself is the label -->
      <div class="sx-works__meta">
        <span class="sx-works__index"><span ref="indexElRef">{{ pad(1) }}</span> / {{ pad(count) }}</span>
        <a
          ref="linkElRef"
          :href="items[0]!.to"
          class="sx-works__view"
          :aria-label="`${STRIDE_WORKS.viewLabel} ${items[0]!.fullName}`"
          data-product-explore
          @click.capture="exploreCurrent"
        >{{ STRIDE_WORKS.viewLabel }}</a>
      </div>
    </div>
  </section>
</template>
