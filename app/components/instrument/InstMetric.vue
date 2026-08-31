<script setup lang="ts">
/**
 * InstMetric — one cell on an instrument's metric rail: the oversized figure, how
 * it has moved, the trace behind it, and what it measures.
 *
 * A falling number is not automatically bad — latency, wait time and shrinkage
 * all improve by going down — so the chip states the DIRECTION and lets the
 * label carry the meaning. It never colours a fall as a failure.
 */
import InstSpark from './InstSpark.vue'

defineProps<{
  label: string
  value: string
  /** The movement, already formatted (`+12.4%`, `-8.1%`, `+6`). */
  delta: string
  dir: 'up' | 'down'
  /** The trace behind the figure. */
  series: number[]
}>()
</script>

<template>
  <div class="imt">
    <div class="imt__top">
      <span class="imt__v">{{ value }}</span>
      <span class="imt__d" :class="`is-${dir}`">
        <i aria-hidden="true">{{ dir === 'up' ? '▲' : '▼' }}</i>{{ delta }}
      </span>
    </div>
    <InstSpark :series="series" :dir="dir" />
    <span class="imt__l">{{ label }}</span>
  </div>
</template>

<style scoped>
.imt { display: flex; flex-direction: column; gap: 8px; min-width: 0; }
.imt__top { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; }
.imt__v { font-size: clamp(28px, 3.1vw, 46px); font-weight: 600; letter-spacing: -0.03em; line-height: 1; color: var(--ink-primary); font-variant-numeric: tabular-nums; }
.imt__d { display: inline-flex; align-items: center; gap: 4px; padding: 2px 6px; border-radius: 2px; font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.04em; white-space: nowrap; }
.imt__d i { font-style: normal; font-size: 7px; line-height: 1; }
.imt__d.is-up { color: var(--sig); background: color-mix(in srgb, var(--sig) 15%, transparent); }
.imt__d.is-down { color: var(--ink-secondary); background: color-mix(in srgb, var(--ink-primary) 9%, transparent); }
.imt__l { font-family: var(--font-mono); font-size: 8.5px; letter-spacing: 0.12em; color: var(--ink-muted); }
</style>
