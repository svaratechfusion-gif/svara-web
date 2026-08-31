<script setup lang="ts">
// FadeUp — the reference FadeUp.tsx ported 1:1 to Vue via motion-v (Motion for
// Vue = Framer Motion for Vue). Same params: initial { opacity:0, y }, whileInView
// { opacity:1, y:0 }, viewport { once, amount:0.2 }, transition { duration, delay,
// ease:[0.22,1,0.36,1] }. Nothing about the motion logic is changed.
import { computed } from 'vue'
import { motion } from 'motion-v'
import { HERO_EASE } from '~/utils/hero-motion'

const props = withDefaults(defineProps<{
  delay?: number
  duration?: number
  y?: number
  as?: 'div' | 'section' | 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'nav'
  once?: boolean
}>(), {
  delay: 0,
  duration: 0.7,
  y: 24,
  as: 'div',
  once: true,
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tag = computed<any>(() => (motion as any)[props.as] ?? (motion as any).div)
</script>

<template>
  <component
    :is="tag"
    :initial="{ opacity: 0, y }"
    :while-in-view="{ opacity: 1, y: 0 }"
    :in-view-options="{ once, amount: 0.2 }"
    :transition="{ duration, delay, ease: HERO_EASE }"
  >
    <slot />
  </component>
</template>
