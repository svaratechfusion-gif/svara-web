<script setup lang="ts">
// SCROLL FADE — the ONE place scroll-driven cross-fading lives (§24). Every scene
// overlay is wrapped in one of these; none of them contains scroll logic of its own.
//
// `appear` and `disappear` are `[start, end]` windows in real page progress 0–1.
// Opacity ramps up over `appear` and back down over `disappear`; a smoothstep on
// each window is what makes the hand-off read as a dissolve rather than a switch.
//
// Omit `disappear` entirely for an overlay that never leaves (the finale). Do NOT
// express "never" as a zero-width window like [1, 1] — a zero-width window is a
// STEP at its start, which is what makes `appear=[0,0]` mean "on from the
// beginning"; [1, 1] would therefore blank the overlay at the very bottom of the
// page, and the smooth scroll settling on that value makes it blink.
//
// Fully faded overlays are `visibility: hidden` so they never intercept a click.
import { ref } from 'vue'
import { useSceneProgress, ramp, smooth } from '~/composables/useSceneProgress'

const props = defineProps<{
  appear: [number, number]
  disappear?: [number, number]
}>()

const el = ref<HTMLElement | null>(null)
let lastOpacity = -1

useSceneProgress((p) => {
  const node = el.value
  if (!node) return
  const inOp = smooth(ramp(p, props.appear[0], props.appear[1]))
  const outOp = props.disappear ? 1 - smooth(ramp(p, props.disappear[0], props.disappear[1])) : 1
  const opacity = Math.max(0, Math.min(inOp, outOp))
  if (Math.abs(opacity - lastOpacity) < 0.001) return
  lastOpacity = opacity
  node.style.opacity = String(opacity)
  node.style.visibility = opacity < 0.01 ? 'hidden' : 'visible'
})
</script>

<template>
  <div ref="el" class="ps-fade">
    <slot />
  </div>
</template>

<style scoped>
.ps-fade {
  /* Starts hidden: the server renders the full markup (so the copy is in the HTML
     for crawlers) and the first frame after hydration resolves the real opacity. */
  opacity: 0;
  will-change: opacity;
}
</style>
