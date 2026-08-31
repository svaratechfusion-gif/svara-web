<script setup lang="ts">
/**
 * InstStats — the descriptive readout under a chart: how many samples the curve
 * is drawn from, and its min / max / median / average. It is what turns a shape
 * into a measurement, and it is computed FROM the plotted series, so the strip
 * can never drift out of step with the curve above it.
 */
import { computed } from 'vue'
import { statsOf } from '~~/lib/instrument/series'

const props = defineProps<{
  series: number[]
  unit?: string
  /** Decimal places for the derived figures. */
  precision?: number
}>()

const s = computed(() => statsOf(props.series))
const fmt = (n: number) => n.toFixed(props.precision ?? 1)
</script>

<template>
  <div class="ist">
    <span class="ist__n"><b>{{ s.points }}</b> samples</span>
    <span><i>min</i> {{ fmt(s.min) }}</span>
    <span><i>max</i> {{ fmt(s.max) }}</span>
    <span><i>median</i> {{ fmt(s.median) }}</span>
    <span class="ist__avg"><i>avg</i> {{ fmt(s.average) }}<em v-if="unit">{{ unit }}</em></span>
  </div>
</template>

<style scoped>
.ist {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 6px 16px;
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.08em;
  color: var(--ink-secondary);
  font-variant-numeric: tabular-nums;
}
.ist i { font-style: normal; color: var(--ink-muted); margin-right: 5px; }
.ist b { font-weight: 600; color: var(--ink-primary); }
.ist em { font-style: normal; margin-left: 2px; color: var(--ink-muted); }
.ist__avg { color: var(--sig); }
.ist__avg i { color: var(--ink-muted); }
</style>
