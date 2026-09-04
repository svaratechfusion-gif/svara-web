<script setup lang="ts">
/**
 * The horizontal project strip. Cards wipe in through a top-down mask, staggered
 * 150ms apart and all triggered by the TRACK entering view, so the row deals
 * itself left to right rather than each card waking up on its own.
 *
 * The arrows tween `scrollLeft` in JS on the shared ticker — the reference is
 * explicit that this is not CSS smooth-scroll, because the page already owns a
 * smooth-scroll engine and the two fight over the same wheel events.
 */
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useTicker } from '~/composables/useTicker'
import { useInViewOnce } from '~/composables/useInViewOnce'
import RevealBox from '~/components/home/director/RevealBox.vue'

export interface CarouselItem { n: string, title: string, body: string, to: string, image: string }

const props = defineProps<{ items: CarouselItem[], stagger?: number }>()
const STAGGER = props.stagger ?? 150
const TWEEN_MS = 600

const track = ref<HTMLElement | null>(null)
const atStart = ref(true)
const atEnd = ref(false)

// One observer for the whole strip: every card reveals off the row arriving.
const { inView: strip } = useInViewOnce(track, 0.15)

let from = 0
let to = 0
let elapsed = 0
let running = false

/** easeOutCubic — the settle the whole page uses. */
const ease = (t: number) => 1 - Math.pow(1 - t, 3)

function edges() {
  const el = track.value
  if (!el) return
  atStart.value = el.scrollLeft <= 1
  atEnd.value = el.scrollLeft >= el.scrollWidth - el.clientWidth - 1
}

function step(direction: 1 | -1) {
  const el = track.value
  if (!el) return
  const item = el.querySelector('li')
  const gap = Number.parseFloat(getComputedStyle(el).columnGap) || 0
  const distance = (item ? item.getBoundingClientRect().width : el.clientWidth) + gap
  from = el.scrollLeft
  to = Math.max(0, Math.min(from + direction * distance, el.scrollWidth - el.clientWidth))
  elapsed = 0
  running = from !== to
}

useTicker((dt) => {
  if (!running) return
  const el = track.value
  if (!el) { running = false; return }
  elapsed += dt * 1000
  const t = Math.min(1, elapsed / TWEEN_MS)
  el.scrollLeft = from + (to - from) * ease(t)
  if (t >= 1) { running = false; edges() }
})

function onScroll() { if (!running) edges() }

onMounted(() => { edges(); track.value?.addEventListener('scroll', onScroll, { passive: true }) })
onBeforeUnmount(() => track.value?.removeEventListener('scroll', onScroll))
</script>

<template>
  <div class="dxc__row">
    <div class="dxc__arrows">
      <button type="button" class="dxc__arrow" aria-label="Previous" :disabled="atStart" @click="step(-1)">&#8592;</button>
      <button type="button" class="dxc__arrow" aria-label="Next" :disabled="atEnd" @click="step(1)">&#8594;</button>
    </div>

    <ul ref="track" class="dxc__track">
      <li v-for="(item, i) in items" :key="item.title" class="dxc__item">
        <NuxtLink class="dxc__card dx-glass" :to="item.to" :aria-label="`${item.title} — ${item.body}`">
          <header class="dxc__top">
            <div>
              <h3 class="dxc__t">{{ item.title }}</h3>
              <p class="dxc__b">{{ item.body }}</p>
            </div>
            <span class="dxc__n">{{ item.n }}</span>
          </header>

          <RevealBox variant="mask" direction="top" :delay="i * STAGGER" :active="strip" class="dxc__reveal">
            <span class="dxc__figure" :style="{ '--dx-img': `url('${item.image}')` }" aria-hidden="true" />
          </RevealBox>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
