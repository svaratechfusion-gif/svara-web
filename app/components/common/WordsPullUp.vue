<script setup lang="ts">
// WordsPullUp — masked word "pull-up" reveal (Framer Motion → motion-v). Each
// word sits in an overflow-hidden mask and translates from 110% (below) to 0,
// staggered. Used verbatim by the giant hero heading + section-2 heading.
import { computed } from 'vue'
import { motion } from 'motion-v'

const props = withDefaults(defineProps<{
  text: string
  delay?: number
  stagger?: number
  duration?: number
  once?: boolean
}>(), { delay: 0, stagger: 0.08, duration: 0.9, once: true })

const words = computed(() => props.text.split(' '))
</script>

<template>
  <span class="wpu">
    <span v-for="(w, i) in words" :key="i" class="wpu__mask">
      <motion.span
        class="wpu__word"
        :initial="{ y: '115%' }"
        :while-in-view="{ y: '0%' }"
        :in-view-options="{ once, amount: 0.25 }"
        :transition="{ duration, delay: delay + i * stagger, ease: [0.16, 1, 0.3, 1] }"
      >{{ w }}</motion.span>
    </span>
  </span>
</template>

<style scoped>
.wpu { display: inline-flex; flex-wrap: wrap; column-gap: 0.25em; }
.wpu__mask { display: inline-block; overflow: hidden; padding-bottom: 0.08em; }
.wpu__word { display: inline-block; will-change: transform; }
</style>
