<script setup lang="ts">
// CHART CONTAINER — the reference's data-visualization wrapper: transparent inside
// the dark card, TWO series in Clinical Cyan and Mint Vital, Iris Border gridlines,
// Cloud White axis labels, and the selected environment ringed.
//
// WHAT IT PLOTS IS REAL, and it is a comparison of the content rather than telemetry:
// for every operational environment, how many architecture components its own content
// file defines (cyan) against how many SVARA platforms apply to it (mint). Both are
// counted at build time from lib/content — nothing is asserted.
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap, ScrollTrigger } from '~~/lib/gsap'

const props = defineProps<{
  series: { short: string, parts: number, platforms: number }[]
  activeIndex: number
}>()

const root = ref<HTMLElement | null>(null)
const drawn = ref(0)

const max = computed(() => Math.max(...props.series.flatMap(s => [s.parts, s.platforms]), 1))
const cols = computed(() =>
  props.series.map((s, i) => ({
    ...s,
    partsH: (s.parts / max.value) * 100,
    platH: (s.platforms / max.value) * 100,
    on: i === props.activeIndex,
  })),
)
/** A gridline at every whole step the data actually spans. */
const grid = computed(() => Array.from({ length: max.value + 1 }, (_, i) => (i / max.value) * 100))

let st: ScrollTrigger | null = null
onMounted(() => {
  if (!root.value) return
  const o = { v: 0 }
  st = ScrollTrigger.create({
    trigger: root.value,
    start: 'top 84%',
    once: true,
    onEnter: () => gsap.to(o, { v: 1, duration: 1.2, ease: 'power3.out', onUpdate: () => (drawn.value = o.v) }),
  })
})
onBeforeUnmount(() => st?.kill())
</script>

<template>
  <figure ref="root" class="im-chart">
    <figcaption class="im-chart__head">
      <span class="im-chart__title">Architecture depth by environment</span>
      <span class="im-chart__legend">
        <i class="im-chart__key im-chart__key--cyan" />components
        <i class="im-chart__key im-chart__key--mint" />platforms
      </span>
    </figcaption>

    <div class="im-chart__plot">
      <span v-for="(g, i) in grid" :key="`g${i}`" class="im-chart__grid" :style="{ bottom: `${g}%` }" />
      <div class="im-chart__cols">
        <div v-for="c in cols" :key="c.short" class="im-chart__col" :class="{ 'is-on': c.on }">
          <span class="im-chart__pair">
            <span class="im-chart__bar im-chart__bar--cyan" :style="{ height: `${c.partsH * drawn}%` }" />
            <span class="im-chart__bar im-chart__bar--mint" :style="{ height: `${c.platH * drawn}%` }" />
          </span>
        </div>
      </div>
    </div>

    <div class="im-chart__axis">
      <span v-for="c in cols" :key="`x${c.short}`" :class="{ 'is-on': c.on }">{{ c.short }}</span>
    </div>
  </figure>
</template>
