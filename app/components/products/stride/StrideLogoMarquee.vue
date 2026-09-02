<script setup lang="ts">
// Two logo rows whose horizontal motion is tied to SCROLL POSITION, in opposite
// directions — not autoplay. The set is repeated COPIES times and each row's translate
// is wrapped into the [-ONE_SET, 0] band, so the strip is seamless and always filled
// edge to edge at any width.
//
// The source drives this with a react-spring value (tension 90, friction 34) chasing
// `scrollY * speed`. That is a soft, over-damped chase, so a plain per-frame lerp with
// a matching time constant reproduces it — and keeps the row on the site's single
// gsap.ticker instead of a second animation engine.
import { ref } from 'vue'
import { useTicker } from '~/composables/useTicker'
import StrideMark from './StrideMark.vue'
import { STRIDE_LOGOS } from '~~/lib/stride/content'

const COPIES = 6 // repeats of the set; half the track always overflows the viewport
const ONE_SET = 100 / COPIES // percent width of one set
const EASE = 0.06 // per-frame chase — the soft spring's visible time constant

const items = STRIDE_LOGOS.items
/** The repeated track: COPIES × the logo set, each keeping its mark index. */
const track = Array.from({ length: COPIES }).flatMap((_, c) =>
  items.map((name, i) => ({ key: `${c}-${i}`, name, mark: i })),
)

const rowA = ref<HTMLElement | null>(null)
const rowB = ref<HTMLElement | null>(null)
let sA = 0
let sB = 0

/** Wrap into [-ONE_SET, 0] so the strip never shows an end. */
function offsetFor(s: number, direction: 'left' | 'right'): number {
  const m = ((s % ONE_SET) + ONE_SET) % ONE_SET // 0..ONE_SET
  return direction === 'left' ? -m : -(ONE_SET - m)
}

useTicker(() => {
  const y = window.scrollY
  sA += (y * 0.005 - sA) * EASE
  sB += (y * 0.0038 - sB) * EASE
  if (rowA.value) rowA.value.style.transform = `translate3d(${offsetFor(sA, 'left')}%,0,0)`
  if (rowB.value) rowB.value.style.transform = `translate3d(${offsetFor(sB, 'right')}%,0,0)`
})
</script>

<template>
  <section class="sx-marq" :aria-label="STRIDE_LOGOS.label">
    <div class="sx-marq__rows">
      <div class="sx-marq__row">
        <div ref="rowA" class="sx-marq__track">
          <span v-for="l in track" :key="`a-${l.key}`" class="sx-marq__item">
            <StrideMark :i="l.mark" />
            <span class="sx-marq__name">{{ l.name }}</span>
          </span>
        </div>
      </div>
      <div class="sx-marq__row">
        <div ref="rowB" class="sx-marq__track">
          <span v-for="l in track" :key="`b-${l.key}`" class="sx-marq__item">
            <StrideMark :i="l.mark" />
            <span class="sx-marq__name">{{ l.name }}</span>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
