// Helios · engine — LIFECYCLE ONLY: initialize / update / resize / dispose.
// Composes the systems, runs the fixed update order, exposes the public
// API. It owns no rendering, no physics, no geometry of its own.
//
// Public API (everything else internal):
//   initialize() destroy() assemble() dissolve() flow() reconstruct()
//   setCursor() setScroll() resize()
//
// Update order per frame (spec-fixed):
//   cursor → springs → particles → connections → morph → uniforms → render

import { Box3Helper, Color } from 'three'
import { HeliosConfig, type HeliosOptions } from './HeliosConfig'
import { HeliosStore } from '../store/HeliosStore'
import { HeliosRenderer } from '../render/HeliosRenderer'
import { HeliosEntity } from '../entity/HeliosEntity'
import { HeliosConnections } from '../entity/HeliosConnections'
import { HeliosMorph } from '../entity/HeliosMorph'
import { HeliosParticles } from '../physics/HeliosParticles'
import { HeliosCursor } from '../physics/HeliosCursor'
import { HeliosMaterials } from '../materials/HeliosMaterials'
import { detectTier } from '../utils/device'
import { AdaptiveQuality } from '../utils/adaptiveQuality'

export class HeliosEngine {
  readonly store = new HeliosStore()

  private container: HTMLElement
  private options: HeliosOptions
  private rendererSys!: HeliosRenderer
  private entity!: HeliosEntity
  private particles!: HeliosParticles
  private connections!: HeliosConnections
  private cursor!: HeliosCursor
  private morph!: HeliosMorph
  private materials!: HeliosMaterials
  private quality!: AdaptiveQuality

  private rafId: number | null = null
  private last = 0
  private initialized = false
  private debug = false
  private debugEl: HTMLElement | null = null
  private fpsAccum = 0
  private fpsFrames = 0
  private resizeObserver: ResizeObserver | null = null

  constructor(container: HTMLElement, options: HeliosOptions = {}) {
    this.container = container
    this.options = options
  }

  // ---------------- public API ----------------

  initialize() {
    if (this.initialized) return
    this.initialized = true
    this.debug = this.options.debug
      ?? new URLSearchParams(location.search).get('debug') === 'true'

    const tier = detectTier()
    this.store.state.device = tier.tier
    const count = this.options.particleCount ?? tier.particleCount

    this.rendererSys = new HeliosRenderer(this.container)
    this.materials = new HeliosMaterials()
    this.entity = new HeliosEntity()

    const sample = this.entity.sample(count)
    this.particles = new HeliosParticles(sample, this.materials)
    this.connections = new HeliosConnections(this.particles, this.materials)
    this.morph = new HeliosMorph(this.particles, this.entity, this.store)
    this.cursor = new HeliosCursor(this.rendererSys.camera, this.store)
    this.cursor.attach(this.container)

    this.entity.group.add(this.particles.mesh, this.connections.lines)
    this.rendererSys.add(this.entity.group)

    this.quality = new AdaptiveQuality(tier.targetFps, {
      setPixelRatio: r => this.rendererSys.setPixelRatio(r),
      setConnectionsVisible: v => this.connections.setVisible(v),
      setActiveParticleRatio: r => this.particles.setActiveRatio(r),
    }, HeliosConfig.maxPixelRatio)

    this.store.state.particleCount = this.particles.capacity
    this.store.state.activeParticleCount = this.particles.active
    this.store.state.connectionCount = this.connections.pairCount

    if (this.debug) this.enableDebug()

    this.resizeObserver = new ResizeObserver(() => this.resize())
    this.resizeObserver.observe(this.container)

    this.last = performance.now()
    this.loop()
  }

  destroy() {
    if (!this.initialized) return
    if (this.rafId !== null) cancelAnimationFrame(this.rafId)
    this.resizeObserver?.disconnect()
    this.cursor.dispose()
    this.connections.dispose()
    this.particles.dispose()
    this.materials.dispose()
    this.debugEl?.remove()
    this.rendererSys.dispose()
    this.initialized = false
  }

  dormant() { this.morph.set('dormant') }
  assemble() { this.morph.set('assemble') }
  dissolve() { this.morph.set('dissolve') }
  flow() { this.morph.set('flow') }
  reassemble() { this.morph.set('reassemble') }
  /** @deprecated renamed — use reassemble() */
  reconstruct() { this.reassemble() }

  /** host-driven cursor (NDC −1…1); alternative to DOM tracking */
  setCursor(x: number, y: number, active = true) {
    const p = this.store.state.pointer
    p.x = x; p.y = y; p.active = active
  }

  /** normalized page scroll 0–1, fed by the host's scroll system */
  setScroll(progress: number) {
    this.store.state.scroll = Math.max(0, Math.min(1, progress))
  }

  resize() {
    if (this.initialized) this.rendererSys.resize()
  }

  // ---------------- internal ----------------

  private loop = () => {
    this.rafId = requestAnimationFrame(this.loop)
    ;(globalThis as Record<string, unknown>).__heliosFrames =
      Number((globalThis as Record<string, unknown>).__heliosFrames ?? 0) + 1

    const now = performance.now()
    const dt = Math.min((now - this.last) / 1000, HeliosConfig.maxDt)
    this.last = now
    const cpuStart = performance.now()

    this.update(dt)
    this.rendererSys.render(dt, this.debug)

    this.metrics(dt, cpuStart)
  }

  /** spec-fixed order. No allocation inside. */
  private update(dt: number) {
    // STATE 4 gate: idle ⇄ interact is pointer-driven; the cursor force
    // only exists inside the interact state.
    const state = this.morph.name
    const pointerActive = this.store.state.pointer.active
    if (state === 'idle' && pointerActive) this.morph.set('interact')
    else if (state === 'interact' && !pointerActive) this.morph.set('idle')

    if (this.morph.name === 'interact') {
      this.cursor.update(dt, this.particles)   // 1 cursor (+ force)
    }
    this.particles.updateSprings(dt)           // 2 springs
    this.particles.update(dt)                  // 3 particles (integrate)
    this.connections.sync()                    // 4 connections
    this.morph.update(dt)                      // 5 morph
    this.materials.updateUniforms(this.store)  // 6 uniforms
    this.entity.updateTransforms(dt)           //   transforms (entity-owned)
    this.rendererSys.updateCamera(dt)          //   camera breathing
    this.quality.update(dt)                    //   adaptive quality
  }

  private metrics(dt: number, cpuStart: number) {
    const perf = this.store.state.performance
    perf.cpuMs = performance.now() - cpuStart
    perf.gpuMs = this.rendererSys.gpuMs
    perf.drawCalls = this.rendererSys.drawCalls
    perf.qualityLevel = this.quality.level
    this.store.state.activeParticleCount = this.particles.active
    this.fpsAccum += dt
    this.fpsFrames++
    if (this.fpsAccum >= 0.5) {
      perf.fps = Math.round(this.fpsFrames / this.fpsAccum)
      this.fpsAccum = 0
      this.fpsFrames = 0
      if (this.debug) this.renderDebug()
      this.store.notify()
    }
  }

  private enableDebug() {
    this.rendererSys.add(new Box3Helper(this.entity.boundingBox, new Color(HeliosConfig.colors.blue)))
    this.debugEl = document.createElement('div')
    this.debugEl.style.cssText =
      'position:absolute;bottom:12px;left:12px;z-index:50;font:11px/1.6 ui-monospace,Menlo,monospace;'
      + 'color:#102A5B;background:rgba(255,255,255,.8);border:1px solid rgba(0,0,0,.08);'
      + 'border-radius:8px;padding:8px 10px;pointer-events:none;white-space:pre'
    this.container.style.position ||= 'relative'
    this.container.appendChild(this.debugEl)
    this.renderDebug()
  }

  private renderDebug() {
    if (!this.debugEl) return
    const s = this.store.state
    const p = s.performance
    this.debugEl.textContent =
      `FPS         ${p.fps}\n`
      + `State       ${s.currentState} (${s.progress.toFixed(2)})\n`
      + `Device      ${s.device} · Q${p.qualityLevel}\n`
      + `Particles   ${s.activeParticleCount}/${s.particleCount}\n`
      + `Connections ${s.connectionCount}\n`
      + `CPU         ${p.cpuMs.toFixed(2)} ms\n`
      + `GPU         ${p.gpuMs === null ? 'n/a' : p.gpuMs.toFixed(2) + ' ms'}\n`
      + `Draw calls  ${p.drawCalls}`
  }
}
