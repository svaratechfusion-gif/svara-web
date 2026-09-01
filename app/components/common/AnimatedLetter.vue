<script setup lang="ts">
// AnimatedLetter — scroll-linked opacity reveal: each word brightens from dim to
// full as the paragraph scrolls through the viewport (Framer Motion useScroll +
// per-word useTransform → motion-v). Word-level (not per-glyph) for performance.
import { ref } from 'vue'
import { motion, useScroll, useTransform } from 'motion-v'

const props = defineProps<{ text: string }>()

const el = ref<HTMLElement | null>(null)
const { scrollYProgress } = useScroll({ target: el, offset: ['start 0.85', 'start 0.3'] })

// the separator travels INSIDE each word: a standalone `&#32;` text node is
// stripped by Vue's default whitespace: 'condense', which ran the paragraph
// together as one unbroken string.
const words = props.text.split(' ').map((w) => w + ' ')
const total = words.length
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const opacities = words.map((_, i) =>
  useTransform(scrollYProgress, [i / total, Math.min(1, (i + 1) / total + 0.12)], [0.16, 1]),
)
</script>

<template>
  <p ref="el" class="al">
    <motion.span
      v-for="(w, i) in words"
      :key="i"
      class="al__w"
      :style="{ opacity: opacities[i] }"
    >{{ w }}</motion.span>
  </p>
</template>

<style scoped>
.al { margin: 0; }
/* the separating space is INSIDE each inline-block, where normal whitespace
   processing collapses a trailing space away — `pre` keeps it. Words still break
   between the inline-block boxes, so the paragraph wraps as usual. */
.al__w { display: inline-block; white-space: pre; }
</style>
