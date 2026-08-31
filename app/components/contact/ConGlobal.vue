<script setup lang="ts">
// CONTACT · Global Collaboration — a slowly rotating dotted globe with a handful
// of glowing connection points and arcs travelling between them. No country
// labels; the points are abstract collaboration hubs (enterprises, research,
// governments, startups, technology partners). Canvas 2D, Fibonacci sphere,
// gated by IntersectionObserver + Page Visibility, reduced-motion safe, and
// redrawn on resize (resize clears the canvas).
import { onMounted, onBeforeUnmount, ref } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let raf = 0
let running = false
let io: IntersectionObserver | null = null
let ro: ResizeObserver | null = null
let onVis: (() => void) | null = null

const N = 420
type P = { x: number, y: number, z: number }
const dots: P[] = []
// A few active hubs (indices into a separate abstract ring)
const HUBS = [
  { lat: 0.5, lon: -1.2 }, { lat: 0.9, lon: 0.4 }, { lat: -0.2, lon: 1.9 },
  { lat: -0.7, lon: -2.4 }, { lat: 0.1, lon: 2.8 }, { lat: 0.6, lon: -2.9 },
]
const hubPts: P[] = []
// arcs connect pairs of hubs
const ARCS: [number, number][] = [[0, 1], [1, 2], [2, 4], [0, 3], [3, 5], [4, 5]]

function sph(lat: number, lon: number): P {
  return { x: Math.cos(lat) * Math.cos(lon), y: Math.sin(lat), z: Math.cos(lat) * Math.sin(lon) }
}
function build() {
  dots.length = 0
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const t = golden * i
    dots.push({ x: Math.cos(t) * r, y, z: Math.sin(t) * r })
  }
  hubPts.length = 0
  for (const h of HUBS) hubPts.push(sph(h.lat, h.lon))
}

let rot = 0
const REDUCED = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function resize() {
  const c = canvas.value; if (!c) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const size = c.clientWidth
  c.width = size * dpr; c.height = size * dpr
  ctx = c.getContext('2d')
  if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

function rotY(p: P, a: number): P {
  const c = Math.cos(a), s = Math.sin(a)
  return { x: p.x * c - p.z * s, y: p.y, z: p.x * s + p.z * c }
}

function frame() {
  const c = canvas.value; if (!c || !ctx) return
  const w = c.clientWidth, h = c.clientHeight
  const cx = w / 2, cy = h / 2, R = Math.min(w, h) * 0.42
  ctx.clearRect(0, 0, w, h)

  // dotted sphere
  for (const d of dots) {
    const p = rotY(d, rot)
    const depth = (p.z + 1) / 2
    const px = cx + p.x * R, py = cy + p.y * R
    ctx.beginPath()
    ctx.arc(px, py, 0.6 + depth * 1.1, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(47,127,230,${0.06 + depth * 0.30})`
    ctx.fill()
  }

  // arcs between hubs
  const proj = hubPts.map(p => rotY(p, rot))
  for (const [a, b] of ARCS) {
    const pa = proj[a]!, pb = proj[b]!
    if (pa.z < -0.2 && pb.z < -0.2) continue
    const ax = cx + pa.x * R, ay = cy + pa.y * R
    const bx = cx + pb.x * R, by = cy + pb.y * R
    const mx = (ax + bx) / 2, my = (ay + by) / 2 - Math.min(w, h) * 0.12
    ctx.beginPath()
    ctx.moveTo(ax, ay)
    ctx.quadraticCurveTo(mx, my, bx, by)
    ctx.strokeStyle = 'rgba(16,42,91,0.16)'
    ctx.lineWidth = 1
    ctx.stroke()
  }

  // hub points
  for (const p of proj) {
    const depth = (p.z + 1) / 2
    const px = cx + p.x * R, py = cy + p.y * R
    ctx.beginPath()
    ctx.arc(px, py, 2 + depth * 2, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(47,127,230,${0.35 + depth * 0.55})`
    ctx.fill()
    if (depth > 0.55) {
      ctx.beginPath()
      ctx.arc(px, py, 5 + depth * 3, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(47,127,230,${(depth - 0.55) * 0.5})`
      ctx.lineWidth = 1
      ctx.stroke()
    }
  }
}

function loop() {
  if (!running) return
  rot += 0.0016
  frame()
  raf = requestAnimationFrame(loop)
}
function start() { if (running || REDUCED) return; running = true; raf = requestAnimationFrame(loop) }
function stop() { running = false; cancelAnimationFrame(raf) }

onMounted(() => {
  build(); resize(); frame()
  if (REDUCED) return
  io = new IntersectionObserver((es) => {
    for (const e of es) e.isIntersecting ? start() : stop()
  }, { threshold: 0.1 })
  if (canvas.value) io.observe(canvas.value)
  onVis = () => { document.hidden ? stop() : (io && start()) }
  document.addEventListener('visibilitychange', onVis)
  ro = new ResizeObserver(() => { resize(); if (!running) frame() })
  if (canvas.value) ro.observe(canvas.value)
})
onBeforeUnmount(() => {
  stop()
  io?.disconnect(); ro?.disconnect()
  if (onVis) document.removeEventListener('visibilitychange', onVis)
})
</script>

<template>
  <section class="cglob">
    <div class="cglob__inner">
      <div class="cglob__copy">
        <p v-reveal class="cglob__eyebrow">Global Collaboration</p>
        <h2 v-reveal class="cglob__title" data-split>Intelligence, built in partnership across the world</h2>
        <p v-reveal class="cglob__sub">We collaborate with enterprises, research institutions, governments, startups and technology partners — wherever data-heavy operations need intelligence.</p>
      </div>
      <div v-reveal class="cglob__stage" aria-hidden="true">
        <canvas ref="canvas" class="cglob__canvas" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.cglob { padding-block: var(--section-y); }
.cglob__inner {
  max-width: var(--container-max); margin-inline: auto; padding-inline: var(--container-pad); box-sizing: border-box;
  display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-16); align-items: center;
}
.cglob__eyebrow { margin: 0 0 var(--space-6); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.cglob__title { margin: 0; font-size: clamp(26px, 3vw, 42px); font-weight: var(--weight-bold); letter-spacing: -0.02em; line-height: 1.15; color: #0d1b3e; }
.cglob__sub { margin: var(--space-6) 0 0; max-width: 46ch; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }
.cglob__stage { display: grid; place-items: center; }
.cglob__canvas { width: min(520px, 92%); aspect-ratio: 1 / 1; display: block; }
@media (max-width: 860px) {
  .cglob__inner { grid-template-columns: 1fr; gap: var(--space-10); }
  .cglob__stage { order: -1; }
}
</style>
