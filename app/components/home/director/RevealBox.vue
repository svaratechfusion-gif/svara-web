<script setup lang="ts">
/**
 * The two entrance recipes the design uses everywhere, in one wrapper:
 *
 *  · mask   — a solid mask grows from the top or bottom edge over 1400ms
 *             (card imagery wipes into view)
 *  · blur   — 900ms fade + 0.625rem blur + 1.875rem rise (the glass cards)
 *  · panel  — 1400ms fade + 1.875rem blur + rise + scale (the closing panel)
 *
 * The transition itself lives in CSS; this only decides WHEN `is-in` lands, and
 * can stagger it. Pass `active` to drive a whole row from one shared trigger —
 * that is how the carousel deals its cards left to right instead of letting
 * each one wake up independently as it scrolls past.
 */
import { ref, watch, onBeforeUnmount } from 'vue'
import { useInViewOnce } from '~/composables/useInViewOnce'

const props = withDefaults(defineProps<{
  variant?: 'mask' | 'blur' | 'panel'
  direction?: 'top' | 'bottom'
  delay?: number
  threshold?: number
  /** External trigger. When omitted the box observes itself. */
  active?: boolean
}>(), { variant: 'blur', direction: 'top', delay: 0, threshold: 0.2, active: undefined })

const self = ref<HTMLElement | null>(null)
const shown = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

const { inView } = useInViewOnce(self, props.threshold)

function reveal() {
  if (shown.value) return
  if (!props.delay) { shown.value = true; return }
  timer = setTimeout(() => { shown.value = true }, props.delay)
}

watch(
  () => (props.active === undefined ? inView.value : props.active),
  v => { if (v) reveal() },
  { immediate: true },
)

onBeforeUnmount(() => { if (timer) clearTimeout(timer) })
defineExpose({ el: self })
</script>

<template>
  <div
    ref="self"
    :class="[
      variant === 'mask' ? `dx-mask dx-mask--${direction}` : 'dx-blur',
      variant === 'panel' && 'dx-blur--panel',
      shown && 'is-in',
    ]"
  >
    <slot />
  </div>
</template>
