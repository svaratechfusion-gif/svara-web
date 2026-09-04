<script setup lang="ts">
/**
 * A section heading that scrambles once when 30% of it enters the viewport —
 * the reference's threshold. Both halves (faded lead-in, solid statement) type
 * at the same time, each with its own typewriter cadence.
 */
import { ref } from 'vue'
import { useInViewOnce } from '~/composables/useInViewOnce'
import ScrambleText from '~/components/home/director/ScrambleText.vue'

defineProps<{ id?: string, faded: string, bold: string }>()

const root = ref<HTMLElement | null>(null)
const { inView } = useInViewOnce(root, 0.3)
</script>

<template>
  <h2 :id="id" ref="root" class="dx-h2">
    <ScrambleText :text="faded" :play="inView" class="dx-h2__faded" />
    <ScrambleText :text="bold" :play="inView" class="dx-h2__bold" />
  </h2>
</template>
