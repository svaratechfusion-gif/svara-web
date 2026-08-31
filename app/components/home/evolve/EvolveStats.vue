<script setup lang="ts">
// EVOLVE · grid-pinned stats. Figures render as real text (in the DOM), then on the
// entrance beat scramble from glyphs and settle left-to-right.
import { ref, watch, onBeforeUnmount } from 'vue'

const props = defineProps<{ active: boolean }>()
const GLYPHS = '0123456789#%$&*+<>/\\'
const stats = [
  { figure: '99.99%', label: 'Platform uptime', pin: { left: 'calc(87.5% + 0.625rem)', top: '27.125%', width: '7.125rem' } },
  { figure: '45B+', label: 'Tokens processed daily', pin: { left: 'calc(75% + 0.625rem)', top: '52.25%', width: '7.125rem' } },
  { figure: '120+', label: 'Enterprise customers', pin: { left: 'calc(12.5% + 0.625rem)', top: '70.875%', width: '9.375rem' } },
]
const display = ref(stats.map((s) => s.figure)) // real text present before JS touches it
let raf = 0
let timer: ReturnType<typeof setTimeout> | null = null

function scramble() {
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) return
  const start = performance.now()
  const step = (now: number) => {
    const p = Math.min(1, (now - start) / 700)
    display.value = stats.map((s) => {
      const chars = Array.from(s.figure)
      const locked = Math.floor(p * chars.length)
      return chars.map((c, i) => {
        if (c === '.' || c === ',') return c
        if (i < locked) return c
        return GLYPHS[(Math.random() * GLYPHS.length) | 0]
      }).join('')
    })
    if (p < 1) raf = requestAnimationFrame(step)
    else display.value = stats.map((s) => s.figure)
  }
  raf = requestAnimationFrame(step)
}

watch(() => props.active, (v) => { if (v) timer = setTimeout(scramble, 2000) })
onBeforeUnmount(() => { cancelAnimationFrame(raf); if (timer) clearTimeout(timer) })
</script>

<template>
  <div class="est" :class="{ 'is-in': active }" aria-hidden="false">
    <div v-for="(s, i) in stats" :key="i" class="est__item" :style="s.pin">
      <span class="est__fig">{{ display[i] }}</span>
      <span class="est__lbl">{{ s.label }}</span>
    </div>
  </div>
</template>

<style scoped>
.est__item { position: absolute; display: flex; flex-direction: column; gap: 0.125rem; font-family: var(--font-mono); font-size: 0.75rem; line-height: 1.2; text-transform: uppercase; color: var(--foreground-muted); z-index: 5; opacity: 0; transform: translateY(0.75rem); transition: opacity 700ms var(--ease) 2000ms, transform 700ms var(--ease) 2000ms; }
.est.is-in .est__item { opacity: 1; transform: none; }
.est__fig { color: var(--foreground-muted); font-variant-numeric: tabular-nums; }
@media (max-width: 1279px) { .est__item { font-size: clamp(12px, 1.05vw, 14px); } }
@media (max-width: 767px) {
  .est { display: flex; flex-direction: column; gap: 0.75rem; }
  .est__item { position: static !important; width: auto !important; flex-direction: row; justify-content: space-between; }
}
@media (prefers-reduced-motion: reduce) { .est__item { transition: none; opacity: 1; transform: none; } }
</style>
