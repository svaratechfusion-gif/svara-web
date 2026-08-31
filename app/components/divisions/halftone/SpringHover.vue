<script setup lang="ts">
// A hover that answers on a spring rather than a CSS transition — quicker than
// the entrance (tension 240) but still critically damped, never springy.
// Publishes `--h` (0 → 1); the consumer's CSS decides what that drives.
import { onBeforeUnmount, ref } from 'vue'
import { HOVER_SPRING, Spring } from '~~/lib/motion/spring'
import { useReducedMotion } from '~/composables/useReducedMotion'
import { useTicker } from '~/composables/useTicker'

withDefaults(defineProps<{ as?: string }>(), { as: 'span' })

const el = ref<HTMLElement | null>(null)
const prefersReducedMotion = useReducedMotion()
const spring = new Spring(0, HOVER_SPRING)

function enter() {
  if (prefersReducedMotion.value) return
  spring.setTarget(1)
}

function leave() {
  spring.setTarget(0)
}

onBeforeUnmount(leave)

useTicker((dt) => {
  if (spring.isSettled) return
  el.value?.style.setProperty('--h', String(spring.advance(dt)))
})
</script>

<template>
  <component
    :is="as"
    ref="el"
    class="dv-hover"
    style="--h: 0"
    @pointerenter="enter"
    @pointerleave="leave"
    @focusin="enter"
    @focusout="leave"
  >
    <slot />
  </component>
</template>

<style>
/* Unscoped, namespaced by the `dv-hover` prefix — see SpringIn.vue. */
.dv-hover {
  display: inline-flex;
}
</style>
