<script setup lang="ts">
/**
 * The homepage's scramble, as a component. The algorithm lives in
 * `~/utils/scramble` and is shared with the `v-scramble` directive and the
 * site-wide auto-reveal, so there is one implementation of the timing table.
 *
 * This wrapper exists for the two things the directive cannot express here: the
 * text is split into per-line spans so the hero can break its headline exactly
 * where the design breaks it, and the reveal is gated on a `play` prop the page
 * controls rather than on the element's own visibility.
 *
 * SSR renders the real text, so crawlers and no-JS visitors read the copy; the
 * pending state only hides it between hydration and the first frame, so the copy
 * is not seen fully formed and then restarted as it types.
 */
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { attachScramble } from '~/utils/scramble'

const props = withDefaults(defineProps<{
  text: string
  play: boolean
  /** hero: every character scrambles at once. headings: typewriter cadence. */
  simultaneous?: boolean
}>(), { simultaneous: false })

const lines = computed(() => props.text.split('\n'))
const root = ref<HTMLElement | null>(null)
const armed = ref(false)
const started = ref(false)
let detach: (() => void) | null = null

function begin() {
  if (started.value || !root.value) return
  started.value = true
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  detach = attachScramble(root.value, { simultaneous: props.simultaneous })
}

onMounted(() => {
  armed.value = true
  if (props.play) begin()
})
watch(() => props.play, v => { if (v) begin() })
onBeforeUnmount(() => detach?.())
</script>

<template>
  <span ref="root" class="dx-scr" :class="{ 'dx-scr--pending': armed && !started }">
    <span v-for="(line, i) in lines" :key="`${i}-${line}`" class="dx-sl">{{ line }}</span>
  </span>
</template>
