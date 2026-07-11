<script setup lang="ts">
// Micro background particles — barely-there drifting dots (canvas 2D).
// ~36 particles, one rAF, paused when the tab is hidden, skipped entirely
// under prefers-reduced-motion. Opacity is whisper-level: texture, not show.
import { onMounted, onBeforeUnmount, ref } from 'vue'

const canvas = ref<HTMLCanvasElement>()
let raf: number | null = null
let onVis: (() => void) | null = null
let onResize: (() => void) | null = null

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const el = canvas.value!
  const ctx = el.getContext('2d')!
  const dpr = Math.min(window.devicePixelRatio || 1, 2)

  let w = 0, h = 0
  const size = () => {
    w = el.clientWidth * dpr
    h = el.clientHeight * dpr
    el.width = w
    el.height = h
  }
  size()

  const N = 36
  const ps = Array.from({ length: N }, (_, i) => ({
    x: Math.random() * 1, y: Math.random() * 1,
    r: (0.8 + Math.random() * 1.6) * dpr,
    vx: (Math.random() - 0.5) * 0.00016,
    vy: -(0.00004 + Math.random() * 0.00012), // slow upward drift
    a: 0.03 + Math.random() * 0.05,
    hue: i % 4 === 0 ? '47,127,230' : '16,42,91',
  }))

  const tick = () => {
    raf = requestAnimationFrame(tick)
    ctx.clearRect(0, 0, w, h)
    for (const p of ps) {
      p.x += p.vx; p.y += p.vy
      if (p.y < -0.02) { p.y = 1.02; p.x = Math.random() }
      if (p.x < -0.02) p.x = 1.02
      if (p.x > 1.02) p.x = -0.02
      ctx.beginPath()
      ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${p.hue},${p.a})`
      ctx.fill()
    }
  }
  tick()

  onVis = () => {
    if (document.hidden) { if (raf) cancelAnimationFrame(raf); raf = null }
    else if (!raf) tick()
  }
  onResize = size
  document.addEventListener('visibilitychange', onVis)
  window.addEventListener('resize', onResize, { passive: true })
})

onBeforeUnmount(() => {
  if (raf) cancelAnimationFrame(raf)
  if (onVis) document.removeEventListener('visibilitychange', onVis)
  if (onResize) window.removeEventListener('resize', onResize)
})
</script>

<template>
  <canvas ref="canvas" class="particles-layer" aria-hidden="true" />
</template>

<style scoped>
.particles-layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
