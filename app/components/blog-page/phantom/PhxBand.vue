<script setup lang="ts">
/**
 * One band of the journal. This reference is explicitly a MIXED theme — "both
 * modes are equally native" — so the band declares which of the three surfaces it
 * is (paper, bone, aubergine) and the page alternates them for rhythm.
 * It also carries the rise-on-scroll so no section wires its own.
 */
import { ref } from 'vue'
import { useInViewOnce } from '~/composables/useInViewOnce'

withDefaults(defineProps<{ mode?: 'paper' | 'bone' | 'dark' }>(), { mode: 'paper' })

const root = ref<HTMLElement | null>(null)
const { inView } = useInViewOnce(root, 0.1)
</script>

<template>
  <section ref="root" class="phx__band" :class="`phx__band--${mode}`">
    <div class="phx__inner phx__rise" :class="{ 'is-in': inView }">
      <slot />
    </div>
  </section>
</template>
