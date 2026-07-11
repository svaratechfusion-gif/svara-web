// Helios Engine — orchestrator. The only class a host app touches:
//   const helios = new HeliosEngine(container, { debug: true })
//   …
//   helios.dispose()
//
// Owns the scene graph, static breathing camera, fixed update order and
// the RAF loop. No Vue, no homepage knowledge.
//
// Update order (per frame):
//   dt → cursor.update → particles.applyCursor → morph.update
//      → particles.update → connections.sync → camera breathe
//      → renderer.render → metrics

import { Scene, PerspectiveCamera, Group, Box3, Box3Helper, Color } from 'three'
import { HeliosConfig, type HeliosOptions } from './HeliosConfig'
import { HeliosStore } from './HeliosStore'
import { HeliosRenderer } from './HeliosRenderer'
import { sampleEntity } from './HeliosEntity'
import { HeliosParticles } from './HeliosParticles'
import { HeliosConnections } from './HeliosConnections'
import { HeliosCursor } from './HeliosCursor'
import { HeliosMorph } from './HeliosMorph'

export class HeliosEngine {
  readonly store = new HeliosStore()
  readonly scene = new Scene()
  readonly camera: PerspectiveCamera
  readonly entityGroup = new Group()

  readonly particles: HeliosParticles
  readonly connections: HeliosConnections
  readonly morph: HeliosMorph

  private rendererWrap: HeliosRenderer
  private cursor: HeliosCursor
  private rafId: number | null = null
  private last = 0
  private elapsed = 0
  private debug: boolean
  private debugEl: HTMLElement | null = null
  private boxHelper: Box3Helper | null = null
  private fpsAccum = 0
  private fpsFrames = 0
  private resizeObserver: ResizeObserver

  constructor(private container: HTMLElement, options: HeliosOptions = {}) {
    this.debug = options.debug ?? new URLSearchParams(location.search).get('debug') === 'true'

    this.rendererWrap = new HeliosRenderer(container)

    this.camera = new PerspectiveCamera(
      HeliosConfig.fov,
      (container.clientWidth || 1) / (container.clientHeight || 1),
      0.1, 50,
    )
    this.camera.position.set(0, HeliosConfig.cameraY, HeliosConfig.cameraZ)
    this.camera.lookAt(0, HeliosConfig.cameraY, 0)

    // ---- entity ----
    const sample = sampleEntity(options.particleCount ?? HeliosConfig.particleCount)
    this.particles = new HeliosParticles(sample)
    this.connections = new HeliosConnections(this.particles)
    this.morph = new HeliosMorph(this.particles, this.store)
    this.entityGroup.add(this.particles.mesh, this.connections.lines)
    this.scene.add(this.entityGroup)

    this.cursor = new HeliosCursor(container, this.camera, this.store)

    this.store.state.metrics.particleCount = this.particles.count
    this.store.state.metrics.connectionCount = this.connections.pairCount

    if (this.debug) this.enableDebug()

    this.resizeObserver = new ResizeObserver(() => this.onResize())
    this.resizeObserver.observe(container)

    this.last = performance.now()
    this.loop()
  }

  // ---------------- loop ----------------

  private loop = () => {
    this.rafId = requestAnimationFrame(this.loop)
    // heartbeat for external verification (lab/debug only)
    ;(globalThis as Record<string, unknown>).__heliosFrames =
      Number((globalThis as Record<string, unknown>).__heliosFrames ?? 0) + 1
    const now = performance.now()
    const dt = Math.min((now - this.last) / 1000, HeliosConfig.maxDt)
    this.last = now
    this.elapsed += dt

    const cpuStart = performance.now()

    // update
    this.cursor.update(dt)
    if (this.cursor.active) this.particles.applyCursor(this.cursor.world, dt)
    this.morph.update(dt)
    this.particles.update(dt)
    this.connections.sync()

    // breathing — entity scale + camera drift, different periods on purpose
    const eb = Math.sin((this.elapsed / HeliosConfig.entityBreathePeriod) * Math.PI * 2)
    const s = 1 + eb * HeliosConfig.entityBreatheAmp
    this.entityGroup.scale.setScalar(s)
    const cb = Math.sin((this.elapsed / HeliosConfig.cameraBreathePeriod) * Math.PI * 2)
    this.camera.position.z = HeliosConfig.cameraZ + cb * HeliosConfig.cameraBreatheAmp

    // render
    this.rendererWrap.render(this.scene, this.camera, this.debug)

    // metrics
    const m = this.store.state.metrics
    m.cpuMs = performance.now() - cpuStart
    m.gpuMs = this.rendererWrap.gpuMs
    m.drawCalls = this.rendererWrap.drawCalls
    this.fpsAccum += dt
    this.fpsFrames++
    if (this.fpsAccum >= 0.5) {
      m.fps = Math.round(this.fpsFrames / this.fpsAccum)
      this.fpsAccum = 0
      this.fpsFrames = 0
      if (this.debug) this.renderDebug()
    }
  }

  private onResize() {
    this.rendererWrap.resize()
    const w = this.container.clientWidth || 1
    const h = this.container.clientHeight || 1
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
  }

  // ---------------- debug ----------------

  private enableDebug() {
    const box = new Box3().setFromObject(this.particles.mesh)
    this.boxHelper = new Box3Helper(box, new Color(HeliosConfig.colors.blue))
    this.scene.add(this.boxHelper)

    this.debugEl = document.createElement('div')
    this.debugEl.style.cssText = [
      'position:absolute', 'bottom:12px', 'left:12px', 'z-index:50',
      'font:11px/1.6 ui-monospace,Menlo,monospace', 'color:#102A5B',
      'background:rgba(255,255,255,0.8)', 'border:1px solid rgba(0,0,0,0.08)',
      'border-radius:8px', 'padding:8px 10px', 'pointer-events:none',
      'white-space:pre',
    ].join(';')
    this.container.style.position ||= 'relative'
    this.container.appendChild(this.debugEl)
    this.renderDebug()
  }

  private renderDebug() {
    if (!this.debugEl) return
    const m = this.store.state.metrics
    this.debugEl.textContent =
      `FPS         ${m.fps}\n` +
      `Particles   ${m.particleCount}\n` +
      `Connections ${m.connectionCount}\n` +
      `CPU         ${m.cpuMs.toFixed(2)} ms\n` +
      `GPU         ${m.gpuMs === null ? 'n/a' : m.gpuMs.toFixed(2) + ' ms'}\n` +
      `Draw calls  ${m.drawCalls}`
  }

  // ---------------- lifecycle ----------------

  dispose() {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId)
    this.resizeObserver.disconnect()
    this.cursor.dispose()
    this.connections.dispose()
    this.particles.dispose()
    this.debugEl?.remove()
    this.rendererWrap.dispose()
  }
}
