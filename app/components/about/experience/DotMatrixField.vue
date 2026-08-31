<script setup lang="ts">
// DotMatrixField — the reference's WebGL "dot-matrix particle field", recreated
// with Three.js and adapted to SVARA branding (navy/blue dots on the warm ivory
// ground, NOT green-on-black). Full-bleed, slow breathing pulse, subtle
// pointer-reactive drift. Respects reduced-motion (renders one static frame) and
// degrades to a CSS dot-grid if WebGL is unavailable. Client-only.
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvasEl = ref<HTMLCanvasElement | null>(null)
const ready = ref(false) // once true, the CSS-dot fallback is hidden
let teardown: (() => void) | null = null

onMounted(async () => {
  if (typeof window === 'undefined' || !canvasEl.value) return
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let THREE: any
  try { THREE = await import('three') } catch { return } // keep CSS fallback

  const canvas = canvasEl.value
  const host = canvas.parentElement as HTMLElement
  let renderer: any
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' })
  } catch { return }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))

  const scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0xf4efe2, 0.11) // ivory fog → soft depth fade
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
  camera.position.set(0, 0, 15)

  // ---- circular dot sprite (soft edge) ----
  const dot = document.createElement('canvas')
  dot.width = dot.height = 64
  const dctx = dot.getContext('2d')!
  const grad = dctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  grad.addColorStop(0, 'rgba(255,255,255,1)')
  grad.addColorStop(0.55, 'rgba(255,255,255,0.65)')
  grad.addColorStop(1, 'rgba(255,255,255,0)')
  dctx.fillStyle = grad
  dctx.beginPath(); dctx.arc(32, 32, 32, 0, Math.PI * 2); dctx.fill()
  const sprite = new THREE.CanvasTexture(dot)

  // ---- dot-matrix grid ----
  const COLS = 76, ROWS = 46, GAP = 0.62
  const positions = new Float32Array(COLS * ROWS * 3)
  const phases = new Float32Array(COLS * ROWS)
  let i = 0
  for (let x = 0; x < COLS; x++) {
    for (let y = 0; y < ROWS; y++) {
      positions[i * 3] = (x - COLS / 2) * GAP
      positions[i * 3 + 1] = (y - ROWS / 2) * GAP
      positions[i * 3 + 2] = (Math.sin(x * 0.5) + Math.cos(y * 0.5)) * 0.6 // gentle depth relief
      phases[i] = (x + y) * 0.35
      i++
    }
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const mat = new THREE.PointsMaterial({
    color: 0x2f7fe6,            // SVARA blue
    size: 0.16,
    map: sprite,
    alphaMap: sprite,
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
    sizeAttenuation: true,
  })
  const field = new THREE.Points(geo, mat)
  scene.add(field)

  // a fainter navy layer behind for density
  const matBack = mat.clone(); matBack.color = new THREE.Color(0x14223f); matBack.opacity = 0.28; matBack.size = 0.12
  const fieldBack = new THREE.Points(geo, matBack)
  fieldBack.position.z = -1.6
  scene.add(fieldBack)

  const resize = () => {
    const w = host.clientWidth, h = host.clientHeight
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.fov = w < 640 ? 62 : 45
    camera.updateProjectionMatrix()
  }
  resize()
  window.addEventListener('resize', resize, { passive: true })

  // pointer drift (subtle)
  const mouse = { x: 0, y: 0 }
  const target = { x: 0, y: 0 }
  const onPointer = (e: PointerEvent) => {
    target.x = (e.clientX / window.innerWidth - 0.5)
    target.y = (e.clientY / window.innerHeight - 0.5)
  }
  if (!reduced) window.addEventListener('pointermove', onPointer, { passive: true })

  ready.value = true
  let raf = 0
  let t = 0
  const start = performance.now()
  const render = (now: number) => {
    t = (now - start) / 1000
    if (!reduced) {
      // slow breathing pulse
      const pulse = 0.42 + Math.sin(t * 0.55) * 0.12
      mat.opacity = pulse
      matBack.opacity = pulse * 0.55
      mat.size = 0.15 + Math.sin(t * 0.55) * 0.02
      // pointer drift
      mouse.x += (target.x - mouse.x) * 0.04
      mouse.y += (target.y - mouse.y) * 0.04
      field.rotation.y = mouse.x * 0.28
      field.rotation.x = mouse.y * 0.2
      fieldBack.rotation.y = mouse.x * 0.34
      fieldBack.rotation.x = mouse.y * 0.26
      camera.position.x = mouse.x * 1.2
      camera.position.y = -mouse.y * 0.8
      camera.lookAt(0, 0, 0)
    }
    renderer.render(scene, camera)
    if (!reduced) raf = requestAnimationFrame(render)
  }
  raf = requestAnimationFrame(render)

  teardown = () => {
    cancelAnimationFrame(raf)
    window.removeEventListener('resize', resize)
    window.removeEventListener('pointermove', onPointer)
    geo.dispose(); mat.dispose(); matBack.dispose(); sprite.dispose(); renderer.dispose()
  }
})

onBeforeUnmount(() => teardown?.())
</script>

<template>
  <div class="dmf" aria-hidden="true">
    <canvas ref="canvasEl" class="dmf__canvas" />
    <div class="dmf__fallback" :class="{ 'is-hidden': ready }" />
  </div>
</template>

<style scoped>
.dmf { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.dmf__canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
/* CSS dot-grid fallback (shown until/unless WebGL initialises) */
.dmf__fallback {
  position: absolute; inset: 0;
  background-image: radial-gradient(rgba(47, 127, 230, 0.4) 1.1px, transparent 1.2px);
  background-size: 26px 26px;
  -webkit-mask-image: radial-gradient(120% 90% at 50% 45%, #000 45%, transparent 100%);
  mask-image: radial-gradient(120% 90% at 50% 45%, #000 45%, transparent 100%);
  opacity: 0.5;
  transition: opacity 0.6s ease;
}
.dmf__fallback.is-hidden { opacity: 0; }
</style>
