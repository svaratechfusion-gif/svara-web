<script setup lang="ts">
// SVARA AI — the intelligence-core identity mark. A central glowing point (breathing),
// one or two orbit rings, a tiny moving particle and a subtle pulse. Optional
// mouse-reactivity nudges the core ≤2px toward the cursor. Restrained and precise —
// the futuristic character comes from motion, not size (≤42px in use).
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { motion } from 'motion-v'

const props = withDefaults(defineProps<{ size?: number, rings?: number, interactive?: boolean }>(), {
  size: 40,
  rings: 2,
  interactive: false,
})

const el = ref<HTMLElement | null>(null)
const reduced = ref(false)
const px = ref(0)
const py = ref(0)

function onMove(e: PointerEvent): void {
  const node = el.value
  if (!node) return
  const r = node.getBoundingClientRect()
  const dx = e.clientX - (r.left + r.width / 2)
  const dy = e.clientY - (r.top + r.height / 2)
  const d = Math.hypot(dx, dy) || 1
  const reach = 140
  const pull = Math.min(1, Math.max(0, 1 - d / reach)) * 2 // ≤2px
  px.value = (dx / d) * pull
  py.value = (dy / d) * pull
}

onMounted(() => {
  reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (props.interactive && !reduced.value) window.addEventListener('pointermove', onMove, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('pointermove', onMove))

const boxStyle = computed(() => ({ width: `${props.size}px`, height: `${props.size}px` }))
const orbitR = computed(() => props.size / 2 - 1)

const pulseAnimate = computed(() => reduced.value ? { scale: 1, opacity: 0.4 } : { scale: [1, 1.22, 1], opacity: [0.45, 0, 0.45] })
const pulseTransition = computed(() => reduced.value ? { duration: 0 } : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' })

const coreAnimate = computed(() => reduced.value ? { scale: 1, opacity: 1 } : { scale: [1, 1.12, 1], opacity: [0.85, 1, 0.85] })
const coreTransition = computed(() => reduced.value ? { duration: 0 } : { duration: 2.6, repeat: Infinity, ease: 'easeInOut' })

const orbitAnimate = computed(() => reduced.value ? { rotate: 0 } : { rotate: 360 })
const orbitTransition = computed(() => reduced.value ? { duration: 0 } : { duration: 8, repeat: Infinity, ease: 'linear' })

const nudge = computed(() => ({ x: px.value, y: py.value }))
</script>

<template>
  <span ref="el" class="ic" :style="boxStyle" aria-hidden="true">
    <span class="ic__ring ic__ring--outer" />
    <span v-if="rings >= 2" class="ic__ring ic__ring--inner" />
    <motion.span class="ic__pulse" :animate="pulseAnimate" :transition="pulseTransition" />

    <motion.span class="ic__orbit" :animate="orbitAnimate" :transition="orbitTransition">
      <span class="ic__sat" :style="{ transform: `translateY(-${orbitR}px)` }" />
    </motion.span>

    <motion.span
      class="ic__core"
      :animate="{ ...coreAnimate, ...nudge }"
      :transition="coreTransition"
    />
  </span>
</template>

<style scoped>
.ic { position: relative; display: inline-grid; place-items: center; flex-shrink: 0; }

.ic__ring { position: absolute; border-radius: 50%; }
.ic__ring--outer { inset: 0; border: 1px solid color-mix(in srgb, var(--sv-blue, #5d8fbe) 42%, transparent); }
.ic__ring--inner { inset: 24%; border: 1px solid color-mix(in srgb, var(--sv-navy, #0f1b4d) 18%, transparent); }

.ic__pulse {
  position: absolute; inset: 0; border-radius: 50%;
  border: 1px solid color-mix(in srgb, var(--sv-blue, #5d8fbe) 38%, transparent);
  transform-origin: center;
}

.ic__orbit { position: absolute; inset: 0; border-radius: 50%; }
.ic__sat {
  position: absolute; top: 50%; left: 50%;
  width: 3px; height: 3px; margin: -1.5px 0 0 -1.5px;
  border-radius: 50%;
  background: var(--sv-blue-2, #76a8d6);
  box-shadow: 0 0 4px color-mix(in srgb, var(--sv-blue, #5d8fbe) 65%, transparent);
}

.ic__core {
  position: relative;
  width: 24%; height: 24%; min-width: 5px; min-height: 5px;
  border-radius: 50%;
  background: radial-gradient(circle at 38% 34%, var(--sv-blue-2, #76a8d6), var(--sv-navy, #0f1b4d));
  box-shadow: 0 0 8px color-mix(in srgb, var(--sv-blue, #5d8fbe) 55%, transparent);
}
</style>
