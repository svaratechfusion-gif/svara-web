// DIVISIONS ATMOSPHERE — a subtle volumetric particle depth field.
//
// This is deliberately NOT the Evolve head. It reuses the Evolve engine's
// ARCHITECTURE — the site's single tick source (`gsap.ticker`, no private rAF),
// device tiers + DPR clamp, eased pointer parallax, an eased scroll dolly fed by
// `setProgress`, a reduced-motion opt-out, and a complete dispose — but renders a
// calm field of soft depth motes. It adds cinematic depth BEHIND the Divisions
// content and OVER the hero video without a big object and without obscuring the
// video (transparent clear; the video reads at full strength through the gaps).
import * as THREE from 'three'
import { gsap } from '~~/lib/gsap'

type Tier = 'mobile' | 'tablet' | 'desktop'

// Mirrors scene.ts's tiered budget: fewer points + lower DPR on smaller devices.
const TIERS: Record<Tier, { dpr: number; count: number; size: number }> = {
  mobile: { dpr: 1.0, count: 420, size: 0.26 },
  tablet: { dpr: 1.25, count: 900, size: 0.24 },
  desktop: { dpr: 1.5, count: 1500, size: 0.22 },
}

function tierOf(): Tier {
  const w = window.innerWidth
  if (w <= 767) return 'mobile'
  if (w <= 1279) return 'tablet'
  return 'desktop'
}

export interface AtmosphereHandle {
  /** Scroll progress 0 → 1; eased into a slow camera dolly through the field. */
  setProgress(p: number): void
  dispose(): void
}

/** A soft radial dot so the motes read as premium atmosphere, not hard squares. */
function softDotTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const g = c.getContext('2d')!
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32)
  grad.addColorStop(0, 'rgba(255,255,255,1)')
  grad.addColorStop(0.35, 'rgba(255,255,255,0.55)')
  grad.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grad
  g.fillRect(0, 0, 64, 64)
  const t = new THREE.CanvasTexture(c)
  t.needsUpdate = true
  return t
}

export async function createDivAtmosphere(
  canvas: HTMLCanvasElement,
  opts: { onFirstFrame?: () => void } = {},
): Promise<AtmosphereHandle | null> {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const fine = window.matchMedia('(pointer: fine)').matches
  const cfg = TIERS[tierOf()]

  let renderer: THREE.WebGLRenderer
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'high-performance' })
  } catch {
    return null // no WebGL — the hero is complete without the depth layer
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, cfg.dpr))
  renderer.setClearColor(0x000000, 0) // transparent: the hero video shows through
  const resize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight, false)
  }
  resize()

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(0, 0, 9)

  // A slab of points: wide/tall spread, receding in depth (0 near → -DEPTH far).
  const N = cfg.count
  const positions = new Float32Array(N * 3)
  const SPREAD_X = 26
  const SPREAD_Y = 18
  const DEPTH = 34
  for (let i = 0; i < N; i++) {
    positions[i * 3] = (Math.random() - 0.5) * SPREAD_X
    positions[i * 3 + 1] = (Math.random() - 0.5) * SPREAD_Y
    positions[i * 3 + 2] = -Math.random() * DEPTH
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const sprite = softDotTexture()
  const material = new THREE.PointsMaterial({
    // SVARA blue, dark enough to read as depth over the bright video (normal
    // blending, not additive — additive would vanish on the near-white footage).
    color: 0x2f5fa8,
    map: sprite,
    size: cfg.size,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
    blending: THREE.NormalBlending,
  })
  const field = new THREE.Points(geometry, material)
  scene.add(field)

  // Pointer parallax (fine pointers only) — extremely subtle drift.
  const pointer = { x: 0, y: 0, ex: 0, ey: 0 }
  const onMove = (e: PointerEvent) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1
  }
  if (fine && !reduced) window.addEventListener('pointermove', onMove, { passive: true })

  let resizeRAF = 0
  const onResize = () => {
    cancelAnimationFrame(resizeRAF)
    resizeRAF = requestAnimationFrame(() => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      resize()
    })
  }
  window.addEventListener('resize', onResize, { passive: true })

  let scrollTarget = 0
  let scrollEased = 0
  let t0 = -1
  let firstFrame = true

  const draw = (elapsed: number, sp: number) => {
    // Slow ambient drift + scroll dolly + eased pointer parallax — all restrained.
    field.rotation.y = elapsed * 0.012 + pointer.ex * 0.18
    field.rotation.x = Math.sin(elapsed * 0.05) * 0.02 - pointer.ey * 0.12
    camera.position.z = 9 - sp * 5.5 // dolly INTO the field as the page scrolls
    camera.position.x += (pointer.ex * 0.6 - camera.position.x) * 0.04
    camera.position.y += (-pointer.ey * 0.4 - camera.position.y) * 0.04
    camera.lookAt(0, 0, -6)
    renderer.render(scene, camera)
    if (firstFrame) {
      firstFrame = false
      opts.onFirstFrame?.()
    }
  }

  let removeTick: (() => void) | null = null
  if (reduced) {
    // Static field, no motion — one frame at rest.
    draw(0, 0)
  } else {
    const frame = (time: number) => {
      if (t0 < 0) t0 = time
      scrollEased += (scrollTarget - scrollEased) * 0.06
      pointer.ex += (pointer.x - pointer.ex) * 0.05
      pointer.ey += (pointer.y - pointer.ey) * 0.05
      draw(time - t0, scrollEased)
    }
    gsap.ticker.add(frame)
    removeTick = () => gsap.ticker.remove(frame)
  }

  return {
    setProgress(p: number) {
      scrollTarget = p < 0 ? 0 : p > 1 ? 1 : p
    },
    dispose() {
      removeTick?.()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(resizeRAF)
      geometry.dispose()
      material.dispose()
      sprite.dispose()
      renderer.dispose()
    },
  }
}
