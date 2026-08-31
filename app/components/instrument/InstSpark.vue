<script setup lang="ts">
/**
 * InstSpark — the thumbnail trace beside a metric. No axis, no labels: it exists
 * to say which way the number has been moving, at a glance, in the width of the
 * metric cell.
 */
import { computed } from 'vue'
import { sparkPoints } from '~~/lib/instrument/series'

const props = defineProps<{ series: number[], dir: 'up' | 'down' }>()
const H = 12
const points = computed(() => sparkPoints(props.series, H))
</script>

<template>
  <svg class="isp" :class="`isp--${dir}`" :viewBox="`0 0 100 ${H}`" preserveAspectRatio="none" aria-hidden="true">
    <polyline :points="points" />
  </svg>
</template>

<style scoped>
.isp { display: block; width: 100%; height: 14px; overflow: visible; }
.isp polyline { fill: none; stroke: var(--sig); stroke-width: 1.2; vector-effect: non-scaling-stroke; stroke-linecap: round; stroke-linejoin: round; opacity: 0.75; }
/* A falling metric is not automatically bad (latency, churn), so the trace stays
   on the one accent and only the direction chip carries the verdict. */
.isp--down polyline { opacity: 0.5; }
</style>
