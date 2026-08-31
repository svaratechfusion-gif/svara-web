<script setup lang="ts">
// SVARA AI — floating trigger. A compact futuristic capsule that reads clearly as
// "SVARA AI": glass surface, tiny live intelligence core, and a blue light that
// travels around the border on hover. Subtle lift + magnetic pull (≤5px) toward the
// cursor. A premium AI-product control — not a generic chat bubble.
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { motion } from 'motion-v'
import { ArrowUpRight } from '@lucide/vue'
import IntelligenceCore from './IntelligenceCore.vue'

defineEmits<{ open: [] }>()

const hovered = ref(false)
const mx = ref(0)
const my = ref(0)
const MAX = 5
const RANGE = 130
let reduced = false

/**
 * The trigger's own DOM node.
 *
 * The template root is <motion.button> — a COMPONENT — so a template `ref` on
 * it yields a component instance, not an element. Reading
 * `getBoundingClientRect` off that threw on EVERY pointermove
 * ("node.getBoundingClientRect is not a function"), which also meant the
 * magnetic pull below had never once run. Its `$el` did not resolve to an
 * element either.
 *
 * So the ref goes on a plain child element and we walk up one level: that is a
 * real DOM node either way, and it keeps working regardless of how motion-v
 * chooses to render. `?? null` means a markup change degrades the pull instead
 * of throwing sixty times a second.
 */
const anchor = ref<HTMLElement | null>(null)
function resolveEl(): HTMLElement | null {
  return anchor.value?.parentElement ?? null
}

function onMove(e: PointerEvent): void {
  const node = resolveEl()
  if (!node) return
  const r = node.getBoundingClientRect()
  const dx = e.clientX - (r.left + r.width / 2)
  const dy = e.clientY - (r.top + r.height / 2)
  const d = Math.hypot(dx, dy)
  if (d > RANGE) { mx.value = 0; my.value = 0; return }
  const pull = (1 - d / RANGE) * MAX
  mx.value = (dx / (d || 1)) * pull
  my.value = (dy / (d || 1)) * pull
}

onMounted(() => {
  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!reduced) window.addEventListener('pointermove', onMove, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('pointermove', onMove))

const animate = computed(() => ({
  x: mx.value,
  y: my.value + (hovered.value ? -2 : 0),
  scale: hovered.value ? 1.03 : 1,
}))
</script>

<template>
  <motion.button
    type="button"
    class="ct"
    :class="{ 'is-hover': hovered }"
    aria-label="Open SVARA AI"
    :animate="animate"
    :transition="{ type: 'spring', stiffness: 200, damping: 18, mass: 0.5 }"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    @focusin="hovered = true"
    @focusout="hovered = false"
    @click="$emit('open')"
  >
    <span ref="anchor" class="ct__glow" aria-hidden="true" />
    <span class="ct__core"><IntelligenceCore :size="20" :rings="1" /></span>
    <span class="ct__label">SVARA&nbsp;AI</span>
    <ArrowUpRight class="ct__arrow" :size="15" :stroke-width="1.9" />
  </motion.button>
</template>

<style scoped>
.ct {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-width: 158px;
  height: 50px;
  padding: 0 16px 0 14px;
  box-sizing: border-box;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--sv-navy, #0f1b4d) 16%, transparent);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(247, 249, 252, 0.82));
  -webkit-backdrop-filter: blur(16px) saturate(1.15);
  backdrop-filter: blur(16px) saturate(1.15);
  box-shadow:
    0 12px 30px -12px rgba(15, 27, 77, 0.32),
    0 0 0 3px rgba(93, 143, 190, 0.05),
    0 0 20px -8px rgba(93, 143, 190, 0.4); /* subtle blue ambient glow */
  color: var(--sv-navy, #0f1b4d);
  cursor: pointer;
  white-space: nowrap;
  isolation: isolate;
}
.ct:focus-visible { outline: 2px solid var(--sv-blue, #5d8fbe); outline-offset: 3px; }

/* blue light that travels around the border on hover (masked to the border ring) */
.ct__glow {
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  padding: 1.4px;
  background: conic-gradient(from 0turn,
    transparent 0turn,
    transparent 0.55turn,
    color-mix(in srgb, var(--sv-blue-2, #76a8d6) 95%, transparent) 0.82turn,
    transparent 1turn);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.ct.is-hover .ct__glow { opacity: 1; animation: ct-travel 2.4s linear infinite; }
@keyframes ct-travel { to { transform: rotate(360deg); } }

.ct__core { display: inline-flex; transition: transform 0.3s ease; }
.ct.is-hover .ct__core { transform: scale(1.12); }

.ct__label { font-size: 13.5px; font-weight: 600; letter-spacing: 0.02em; }

.ct__arrow { color: var(--sv-muted, rgba(15, 27, 77, 0.55)); transition: transform 0.25s ease, color 0.25s ease; }
.ct.is-hover .ct__arrow { transform: translate(3px, -3px); color: var(--sv-blue, #5d8fbe); }

@media (prefers-reduced-motion: reduce) {
  .ct.is-hover .ct__glow { animation: none; }
}
@media (max-width: 560px) {
  .ct { right: 14px; bottom: 14px; min-width: 0; height: 48px; padding: 0 15px 0 13px; gap: 9px; }
}
</style>
