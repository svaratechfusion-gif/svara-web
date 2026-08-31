<script setup lang="ts">
// REVEAL ITEM — the non-text counterpart to RevealText: metric blocks, capability
// lines, hairline rules, links. Same motion language as the copy (rises from below
// on the same soft curve) so the scene reads as one system rather than text moving
// one way and blocks another.
//
// No `filter` here, deliberately: any non-`none` filter promotes the element to
// its own composited layer, and a promoted layer picks up an ancestor's opacity
// change a frame late — which reads as the metadata lagging behind the copy.
// Text keeps its blur; these blocks rise and fade only.
import { useSceneWindow } from '~/composables/useSceneProgress'

const props = withDefaults(defineProps<{
  window: [number, number]
  /** Position within a group — staggers entry, and the exit in reverse. */
  index?: number
  count?: number
  step?: number
  delay?: number
  tag?: string
  class?: string
}>(), { index: 0, count: 1, step: 70, delay: 0, tag: 'div' })

const active = useSceneWindow(props.window[0], props.window[1])
</script>

<template>
  <component
    :is="tag"
    :class="['ps-item', props.class, { 'is-in': active }]"
    :style="{
      transitionDelay: active
        ? `${delay + index * step}ms`
        : `${(count - 1 - index) * step * 0.6}ms`,
    }"
  >
    <slot />
  </component>
</template>

<style scoped>
.ps-item {
  opacity: 0;
  transform: translateY(22px);
  transition:
    opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
}
.ps-item.is-in { opacity: 1; transform: translateY(0); }

@media (prefers-reduced-motion: reduce) {
  .ps-item { opacity: 1; transform: none; transition: none; }
}
</style>
