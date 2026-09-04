<script setup lang="ts">
/**
 * THE FLAME — the reference's mouse-follow glow, and the one place its palette
 * (#ff4600 → #e62800) touches ours.
 *
 * It is deliberately painted BEHIND the particle head, not over it. Screen-
 * blended on top it would wash the model orange, and the model's own light
 * (blue key, red rim) is the thing this redesign was told to keep. Behind it,
 * the head is silhouetted against a moving ember — the same effect, with the
 * subject untouched.
 *
 * Static gradient, transform-only per frame, on the site's single gsap.ticker.
 * Frozen while the hero is off-screen, since nothing below the fold sees it.
 */
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useTicker } from '~/composables/useTicker'

const FOLLOW = 0.08
const FLARE_GAIN = 0.8
const FLARE_MAX = 20
const FLARE_EASE = 0.05
const TIME_SCALE = 0.0015
const RADIUS_RATIO = 0.65
const FRAME_MS = 15

const el = ref<HTMLElement | null>(null)
const mouse = { x: 50, y: 50 }
const pos = { x: 50, y: 50 }
let flare = 0
let size = 0
let acc = 0
let visible = true
let observer: IntersectionObserver | null = null

function onMove(e: MouseEvent) {
  mouse.x = (e.clientX / window.innerWidth) * 100
  mouse.y = (e.clientY / window.innerHeight) * 100
}

function resize() {
  const radius = Math.hypot(window.innerWidth, window.innerHeight) / 2
  size = Math.round(2 * RADIUS_RATIO * radius)
  if (el.value) { el.value.style.width = `${size}px`; el.value.style.height = `${size}px` }
}

onMounted(() => {
  resize()
  window.addEventListener('resize', resize)
  if (window.matchMedia('(pointer: fine)').matches) document.addEventListener('mousemove', onMove, { passive: true })

  const hero = document.querySelector('.dxh')
  if (hero) {
    observer = new IntersectionObserver(([entry]) => { visible = !!entry?.isIntersecting })
    observer.observe(hero)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
  document.removeEventListener('mousemove', onMove)
  observer?.disconnect()
})

useTicker((dt) => {
  const node = el.value
  if (!node || !visible) return
  acc += dt * 1000
  if (acc < FRAME_MS) return
  acc = 0

  const dx = mouse.x - pos.x
  const dy = mouse.y - pos.y
  pos.x += dx * FOLLOW
  pos.y += dy * FOLLOW

  const target = Math.min(Math.hypot(dx, dy) * FLARE_GAIN, FLARE_MAX)
  flare += (target - flare) * FLARE_EASE

  const time = Date.now() * TIME_SCALE
  const breath = Math.sin(time) * 4
  const wobbleX = Math.cos(time * 1.5) * 1.5
  const wobbleY = Math.sin(time * 1.8) * 1.5

  const px = ((pos.x + wobbleX) / 100) * window.innerWidth - size / 2
  const py = ((pos.y + wobbleY) / 100) * window.innerHeight - size / 2
  const pulse = (65 + breath * 1.5 + flare) / 65
  node.style.transform = `translate3d(${px}px, ${py}px, 0) scale(${pulse})`
})
</script>

<template>
  <div class="dx__glow-layer" aria-hidden="true">
    <div ref="el" class="dx-glow" />
  </div>
</template>
