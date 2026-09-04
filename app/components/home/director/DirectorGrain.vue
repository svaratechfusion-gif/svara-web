<script setup lang="ts">
/**
 * Film grain. A fixed, viewport-sized overlay-blended noise tile that jumps
 * between five offsets every 80ms — the reference's stepped keyframes, run on
 * the shared ticker as a transform so it costs one compositor property.
 *
 * `overlay` modulates luminance and leaves hue alone, so the particle head
 * gains texture without being recoloured.
 */
import { ref } from 'vue'
import { useTicker } from '~/composables/useTicker'

const STEPS: [number, number][] = [[0, 0], [3.125, 3.125], [-3.125, 3.125], [3.125, -3.125], [-3.125, -3.125]]
const STEP_MS = 80

const el = ref<HTMLElement | null>(null)
let acc = 0
let step = 0

useTicker((dt) => {
  const node = el.value
  if (!node) return
  acc += dt * 1000
  if (acc < STEP_MS) return
  acc = 0
  step = (step + 1) % STEPS.length
  const [x, y] = STEPS[step]!
  node.style.transform = `translate3d(${x}rem, ${y}rem, 0)`
})
</script>

<template>
  <div class="dx-grain" aria-hidden="true">
    <div ref="el" class="dx-grain__tile" />
  </div>
</template>
