<script setup lang="ts">
// ECOSYSTEM · Final CTA — minimal, large typography, a very subtle drifting
// node field behind it (an intelligence field, not decorative floating).
// Copy verbatim from the Content Bible (homeFinalCta).
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { homeFinalCta } from '~~/lib/content/home'

const canvas = ref<HTMLCanvasElement>()
const host = ref<HTMLElement>()
let cleanup: (() => void) | null = null

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const cv = canvas.value, box = host.value
  if (!cv || !box) return
  const ctx = cv.getContext('2d')!
  let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2)
  const N = 46
  const nodes = Array.from({ length: N }, () => ({ x: Math.random(), y: Math.random(), vy: 0.02 + Math.random() * 0.03 }))
  function resize() {
    const r = box!.getBoundingClientRect(); w = r.width; h = r.height
    cv!.width = w * dpr; cv!.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }
  resize()
  const ro = new ResizeObserver(() => { resize(); if (!running) frame() }); ro.observe(box)
  let raf = 0, running = false, inView = false
  function frame() {
    ctx.clearRect(0, 0, w, h)
    for (const n of nodes) {
      if (!reduced) { n.y -= n.vy / 100; if (n.y < -0.02) { n.y = 1.02; n.x = Math.random() } }
      ctx.beginPath(); ctx.arc(n.x * w, n.y * h, 1.4, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(16,42,91,0.28)'; ctx.fill()
    }
    if (running) raf = requestAnimationFrame(frame)
  }
  function start() { if (running || reduced) return; running = true; raf = requestAnimationFrame(frame) }
  function stop() { running = false; if (raf) cancelAnimationFrame(raf); raf = 0 }
  const evaluate = () => { if (inView && !document.hidden) start(); else stop() }
  const onVis = () => evaluate()
  const observer = new IntersectionObserver(([e]) => { inView = !!e?.isIntersecting; evaluate() }, { threshold: 0.05 })
  observer.observe(box)
  document.addEventListener('visibilitychange', onVis)
  if (reduced) frame()
  cleanup = () => { stop(); ro.disconnect(); observer.disconnect(); document.removeEventListener('visibilitychange', onVis) }
})
onBeforeUnmount(() => cleanup?.())
</script>

<template>
  <section class="ecta">
    <div ref="host" class="ecta__field"><canvas ref="canvas" aria-hidden="true" /></div>
    <div class="ecta__inner">
      <h2 v-reveal class="ecta__title" data-split>{{ homeFinalCta.title }}</h2>
      <p v-reveal class="ecta__sub">{{ homeFinalCta.description }}</p>
      <div v-reveal class="ecta__actions">
        <NuxtLink :to="homeFinalCta.primaryCta.to" class="ecta__btn">{{ homeFinalCta.primaryCta.label }}</NuxtLink>
        <NuxtLink :to="homeFinalCta.secondaryCta.to" class="ecta__btn ecta__btn--ghost">{{ homeFinalCta.secondaryCta.label }}</NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ecta { position: relative; padding-block: var(--space-40); overflow: hidden; }
.ecta__field { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
.ecta__field canvas { width: 100%; height: 100%; display: block; }
.ecta__inner { position: relative; z-index: 1; max-width: 900px; margin-inline: auto; padding-inline: var(--container-pad); text-align: center; box-sizing: border-box; }
.ecta__title { margin: 0; font-size: clamp(34px, 5vw, 72px); font-weight: var(--weight-extrabold); line-height: 1.06; letter-spacing: -0.02em; color: #0d1b3e; text-wrap: balance; }
.ecta__sub { margin: var(--space-8) auto 0; max-width: 560px; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }
.ecta__actions { display: flex; flex-wrap: wrap; justify-content: center; gap: var(--space-4); margin-top: var(--space-10); }
.ecta__btn {
  display: inline-flex; align-items: center; height: 56px; padding-inline: var(--space-8);
  border-radius: var(--radius-pill); background: #102A5B; color: #fff;
  font-size: var(--type-small); font-weight: var(--weight-semibold); text-decoration: none;
  transition: background var(--motion-medium) var(--ease-smooth), transform var(--motion-fast) var(--ease-smooth);
}
.ecta__btn:hover { background: var(--color-accent); transform: translateY(-2px); }
.ecta__btn:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }
.ecta__btn--ghost { background: transparent; color: #0d1b3e; border: 1px solid var(--color-border-strong); }
.ecta__btn--ghost:hover { background: transparent; color: var(--color-accent); border-color: var(--color-accent); }
</style>
