<script setup lang="ts">
// WordsPullUpMultiStyle — the section-2 heading: multiple segments (own line
// each), one of which (serif) renders in Instrument Serif Italic, all words
// pull up with a single global stagger. Framer Motion → motion-v.
//
// The in-view trigger lives on the MASK, and the word animates via variants the
// mask propagates — see the note in WordsPullUp.vue: a target translated outside
// its own overflow-hidden mask has its intersection rect clipped to ~0%, so an
// in-view trigger on the word never fires at any scroll position.
import { computed } from 'vue'
import { motion } from 'motion-v'

const props = defineProps<{ segments: { text: string, serif?: boolean }[] }>()

const lines = computed(() => {
  let idx = 0
  return props.segments.map((seg) => ({
    serif: !!seg.serif,
    words: seg.text.split(' ').map((w) => ({ w, i: idx++ })),
  }))
})

const variants = { hidden: { y: '115%' }, show: { y: '0%' } }
</script>

<template>
  <h2 class="wpms">
    <span
      v-for="(line, li) in lines"
      :key="li"
      class="wpms__line"
      :class="{ 'tec-serif': line.serif }"
    >
      <motion.span
        v-for="word in line.words"
        :key="word.i"
        class="wpms__mask"
        initial="hidden"
        while-in-view="show"
        :in-view-options="{ once: true, amount: 0.2 }"
      >
        <motion.span
          class="wpms__word"
          :variants="variants"
          :transition="{ duration: 0.9, delay: word.i * 0.05, ease: [0.16, 1, 0.3, 1] }"
        >{{ word.w }}</motion.span>
      </motion.span>
    </span>
  </h2>
</template>

<style scoped>
.wpms { margin: 0; }
.wpms__line { display: flex; flex-wrap: wrap; column-gap: 0.28em; }
.wpms__mask { display: inline-block; overflow: hidden; padding-bottom: 0.06em; }
.wpms__word { display: inline-block; will-change: transform; }
</style>
