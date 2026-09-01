<script setup lang="ts">
// WordsPullUp — masked word "pull-up" reveal (Framer Motion → motion-v). Each
// word sits in an overflow-hidden mask and translates from 115% (below) to 0,
// staggered.
//
// The in-view trigger lives on the MASK, and the word animates via variants the
// mask propagates. It must NOT live on the word itself: IntersectionObserver
// clips a target's intersection rect against every ancestor overflow clip, and
// the word starts translated fully OUTSIDE its overflow-hidden mask — so it
// measures ~0% visible at every scroll position and the reveal never fires.
//
// `immediate` plays on mount instead of on scroll-into-view — use it for hero
// headings, which should never depend on a scroll the user may not make.
import { computed } from 'vue'
import { motion } from 'motion-v'

const props = withDefaults(defineProps<{
  text: string
  delay?: number
  stagger?: number
  duration?: number
  once?: boolean
  immediate?: boolean
}>(), { delay: 0, stagger: 0.08, duration: 0.9, once: true, immediate: false })

const words = computed(() => props.text.split(' '))
const variants = { hidden: { y: '115%' }, show: { y: '0%' } }
</script>

<template>
  <span class="wpu">
    <motion.span
      v-for="(w, i) in words"
      :key="i"
      class="wpu__mask"
      initial="hidden"
      :animate="immediate ? 'show' : undefined"
      :while-in-view="immediate ? undefined : 'show'"
      :in-view-options="{ once, amount: 0.25 }"
    >
      <motion.span
        class="wpu__word"
        :variants="variants"
        :transition="{ duration, delay: delay + i * stagger, ease: [0.16, 1, 0.3, 1] }"
      >{{ w }}</motion.span>
    </motion.span>
  </span>
</template>

<style scoped>
.wpu { display: inline-flex; flex-wrap: wrap; column-gap: 0.25em; }
.wpu__mask { display: inline-block; overflow: hidden; padding-bottom: 0.08em; }
.wpu__word { display: inline-block; will-change: transform; }
</style>
