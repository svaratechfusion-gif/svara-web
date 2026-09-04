<script setup lang="ts">
/**
 * One band of the careers page. The reference never breaks out of the dark
 * spectrum — there is no light-section variant here on purpose — so a band only
 * carries the void canvas and the rise-on-scroll, and no section wires its own.
 */
import { ref } from 'vue'
import { useInViewOnce } from '~/composables/useInViewOnce'

const root = ref<HTMLElement | null>(null)
const { inView } = useInViewOnce(root, 0.12)
</script>

<template>
  <section ref="root" class="hns__band">
    <div class="hns__inner hns__rise" :class="{ 'is-in': inView }">
      <slot />
    </div>
  </section>
</template>
