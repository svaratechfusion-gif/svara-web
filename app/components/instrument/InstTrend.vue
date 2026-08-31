<script setup lang="ts">
/**
 * InstTrend — the analysis chart on every instrument: a gridded field, a filled
 * area under a smooth curve, a hatched "projected" band over the last stretch,
 * axis ticks with labels, and a readout pill anchored to the active sample.
 *
 * INTERACTIVE. Move the pointer across it (or focus it and use the arrow keys)
 * and it scrubs: the marker, guide line and pill track the nearest sample and
 * report that sample's ACTUAL value, formatted from the same series the chart is
 * drawn from and the readout beneath it is computed from. Leaving returns it to
 * the highlighted sample the author chose. There is no separate display copy to
 * drift — the number under the cursor is the number in the data.
 *
 * Colour comes entirely from `currentColor` and `--sig`, so page-level dark
 * re-skins flip it with everything else and it needs no light/dark branch.
 */
import { computed, ref } from 'vue'
import { areaPath, linePath, xAt, yAt } from '~~/lib/instrument/series'

const props = defineProps<{
  series: number[]
  /** Tick labels along the x axis — spaced evenly, independent of sample count. */
  axis: string[]
  /** Index of the sample highlighted at rest. */
  markIndex: number
  /** What that sample reads as at rest (already formatted, e.g. "48.2k / s"). */
  markLabel: string
  /** How many trailing samples are forecast rather than observed. */
  projected?: number
  /** Unit suffix for scrubbed values. */
  unit?: string
  /** Decimal places for scrubbed values. */
  precision?: number
  /** What the series measures — used for the accessible name. */
  label?: string
}>()

/** viewBox height. Width is always 100, so the SVG stretches to its box. */
const H = 46

const line = computed(() => linePath(props.series, H))
const area = computed(() => areaPath(props.series, H))
/** Where the forecast band starts, in viewBox x. */
const splitX = computed(() =>
  props.projected ? xAt(props.series.length - 1 - props.projected, props.series.length) : 100)

/** The sample under the cursor / caret. Null = at rest on `markIndex`. */
const scrubbed = ref<number | null>(null)
const active = computed(() => scrubbed.value ?? props.markIndex)
const isScrubbing = computed(() => scrubbed.value !== null)

const markX = computed(() => xAt(active.value, props.series.length))
const markY = computed(() => yAt(props.series[active.value] ?? 0, props.series, H))
/** Keep the pill inside the frame at both ends rather than letting it clip. */
const pillAnchor = computed(() => (markX.value > 72 ? 'end' : markX.value < 12 ? 'start' : 'mid'))
/** Is the active sample inside the forecast tail? */
const isProjected = computed(() =>
  !!props.projected && active.value > props.series.length - 1 - props.projected)

const format = (n: number): string => `${n.toFixed(props.precision ?? 1)}${props.unit ?? ''}`
/** At rest the author's label; while scrubbing, the sample's real value. */
const readout = computed(() =>
  isScrubbing.value ? format(props.series[active.value] ?? 0) : props.markLabel)

/** Approximate x-axis position of the active sample, for the accessible name. */
const axisAt = computed(() => {
  const n = props.axis.length
  if (n === 0) return ''
  const t = props.series.length <= 1 ? 0 : active.value / (props.series.length - 1)
  return props.axis[Math.min(n - 1, Math.round(t * (n - 1)))] ?? ''
})

const clampIndex = (i: number) => Math.max(0, Math.min(props.series.length - 1, i))

function scrubTo(clientX: number, el: HTMLElement) {
  const r = el.getBoundingClientRect()
  if (r.width === 0) return
  const t = (clientX - r.left) / r.width
  scrubbed.value = clampIndex(Math.round(t * (props.series.length - 1)))
}
function onPointerMove(e: PointerEvent) {
  scrubTo(e.clientX, e.currentTarget as HTMLElement)
}
function onLeave() {
  scrubbed.value = null
}
function onKey(e: KeyboardEvent) {
  const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
  if (step === 0) {
    if (e.key === 'Home') scrubbed.value = 0
    else if (e.key === 'End') scrubbed.value = props.series.length - 1
    else if (e.key === 'Escape') scrubbed.value = null
    else return
  }
  else {
    scrubbed.value = clampIndex(active.value + step)
  }
  e.preventDefault()
}
</script>

<template>
  <div class="itr">
    <!-- Focusable and arrow-key navigable: the chart is a real readout, so it has
         to be reachable without a pointer. `aria-live` announces each sample as
         the caret moves rather than re-reading the whole group. -->
    <div
      class="itr__plot"
      tabindex="0"
      role="group"
      :aria-label="`${label ?? 'Trend'} — ${series.length} samples. Use arrow keys to read each one.`"
      @pointermove="onPointerMove"
      @pointerleave="onLeave"
      @blur="onLeave"
      @keydown="onKey"
    >
      <svg class="itr__svg" :viewBox="`0 0 100 ${H}`" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient :id="`itr-fill-${markIndex}`" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="currentColor" stop-opacity="0.28" />
            <stop offset="100%" stop-color="currentColor" stop-opacity="0.02" />
          </linearGradient>
          <!-- the forecast tail reads as hatched rather than solid, so an estimate
               is never mistaken for a measurement -->
          <pattern :id="`itr-hatch-${markIndex}`" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="3" stroke="currentColor" stroke-width="0.7" stroke-opacity="0.34" />
          </pattern>
          <clipPath :id="`itr-clip-${markIndex}`">
            <rect :x.attr="splitX" y="0" :width.attr="100 - splitX" :height.attr="H" />
          </clipPath>
        </defs>

        <g class="itr__grid">
          <line v-for="t in [0.25, 0.5, 0.75]" :key="t" x1="0" :y1.attr="H * t" x2="100" :y2.attr="H * t" />
        </g>

        <path class="itr__area" :d="area" :fill="`url(#itr-fill-${markIndex})`" />
        <path
          v-if="projected"
          class="itr__proj"
          :d="area"
          :fill="`url(#itr-hatch-${markIndex})`"
          :clip-path="`url(#itr-clip-${markIndex})`"
        />
        <path class="itr__line" :d="line" />

        <g class="itr__mark" :class="{ 'is-live': isScrubbing }">
          <line :x1.attr="markX" y1="0" :x2.attr="markX" :y2.attr="H" />
          <circle :cx.attr="markX" :cy.attr="markY" r="1.5" />
        </g>
      </svg>

      <!-- The pill is DOM, not SVG: `preserveAspectRatio="none"` stretches the
           viewBox non-uniformly, which would shear any text drawn inside it. -->
      <span
        class="itr__pill"
        :class="[`itr__pill--${pillAnchor}`, { 'is-live': isScrubbing, 'is-proj': isProjected }]"
        :style="{ left: `${markX}%`, top: `${(markY / H) * 100}%` }"
      >{{ readout }}<em v-if="isProjected"> · projected</em></span>
    </div>

    <div class="itr__axis">
      <span v-for="a in axis" :key="a">{{ a }}</span>
    </div>

    <!-- what a screen reader hears as the caret moves -->
    <p class="itr__sr" aria-live="polite">
      <template v-if="isScrubbing">{{ axisAt }}: {{ format(series[active] ?? 0) }}{{ isProjected ? ', projected' : '' }}</template>
    </p>
  </div>
</template>

<style scoped>
.itr { position: relative; }
.itr__plot { position: relative; cursor: crosshair; outline: none; }
.itr__plot:focus-visible { outline: 1px solid var(--sig); outline-offset: 3px; }
.itr__svg { display: block; width: 100%; height: clamp(112px, 15vw, 168px); color: var(--sig); overflow: visible; }
.itr__grid line { stroke: currentColor; stroke-opacity: 0.14; stroke-width: 0.4; vector-effect: non-scaling-stroke; }
.itr__line { fill: none; stroke: var(--sig); stroke-width: 1.4; vector-effect: non-scaling-stroke; stroke-linecap: round; }

.itr__mark line { stroke: var(--sig); stroke-width: 1; stroke-opacity: 0.4; stroke-dasharray: 2 2; vector-effect: non-scaling-stroke; }
.itr__mark circle { fill: var(--sig); transition: r 120ms var(--ease-out, ease-out); }
.itr__mark.is-live line { stroke-opacity: 0.85; stroke-dasharray: none; }

.itr__pill {
  position: absolute;
  transform: translate(-50%, -184%);
  padding: 3px 7px;
  font-family: var(--font-mono);
  font-size: 9.5px;
  letter-spacing: 0.06em;
  white-space: nowrap;
  background: var(--sig);
  color: #fff;
  border-radius: 2px;
  pointer-events: none;
  font-variant-numeric: tabular-nums;
}
.itr__pill--end { transform: translate(-100%, -184%); }
.itr__pill--start { transform: translate(0, -184%); }
.itr__pill em { font-style: normal; opacity: 0.7; }

.itr__axis {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  padding-top: 7px;
  border-top: 1px solid var(--edge-metal, rgba(20, 34, 63, 0.14));
  font-family: var(--font-mono);
  font-size: 8.5px;
  letter-spacing: 0.12em;
  color: var(--ink-muted);
}

.itr__sr { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

@media (prefers-reduced-motion: reduce) {
  .itr__mark circle { transition: none; }
}
</style>
