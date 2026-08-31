// Helios · engine — LIFECYCLE ONLY: initialize / update / resize / dispose.
// Composes the systems, runs the fixed update order, exposes the public
// API. It owns no rendering, no physics, no geometry of its own.
//
// This is the page-wide ambient particle system — the Hero's own particle-
// head visual (and everything that only existed to serve it: cursor
// interaction, scroll-driven assembly/dissolve) was removed; the Hero now
// uses a static image. What remains is exactly what other sections already
// depend on: the ambient downward Flow, section-gravity, and density
// control (Footer). See the vault Decision Log for the removal.
//
// Public API (everything else internal):
//   initialize() destroy() flow() orbit() setEntityOffset()
//   setSectionTargets() setDensity() resize()
//
// Update order per frame (spec-fixed):
//   section gravity → springs → particles → connections → morph → uniforms → render

import { Box3Helper, Color, Vector3 } from 'three'
import { HeliosConfig, type HeliosOptions } from './HeliosConfig'
import { HeliosStore } from '../store/HeliosStore'
import { HeliosRenderer } from '../render/HeliosRenderer'
import { HeliosEntity } from '../entity/HeliosEntity'
import { HeliosConnections } from '../entity/HeliosConnections'
import { HeliosMorph } from '../entity/HeliosMorph'
import { HeliosParticles } from '../physics/HeliosParticles'
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
  /** world-space section-gravity points — "one particle system, everything
   *  else interacts with it." Set by whichever section is currently in
   *  view; empty when none is. */
  private sectionTargets: Vector3[] = []

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
    this.connections.dispose()
    this.particles.dispose()
    this.materials.dispose()
    this.debugEl?.remove()
    this.rendererSys.dispose()
    this.initialized = false
  }

  /** start the ambient downward current. Runs on its own clock from here
   *  on, independent of scroll. */
  flow() { this.morph.set('flow') }

  /** Hero-only: start the small halo that swirls around the Hero image.
   *  anchor/edge are both NDC (−1…1) — the host converts the image's own
   *  screen rect (its center, and its right edge at the same height) so
   *  the halo's radius tracks the image's actual on-screen size rather
   *  than a guessed constant. */
  orbit(anchorNdc: { x: number, y: number }, edgeNdc: { x: number, y: number }) {
    if (!this.initialized) return
    const anchor = this.ndcToWorld(anchorNdc.x, anchorNdc.y)
    const edge = this.ndcToWorld(edgeNdc.x, edgeNdc.y)
    this.store.state.orbitAnchor = { x: anchor.x, y: anchor.y, z: anchor.z }
    this.store.state.orbitRadius = anchor.distanceTo(edge)
    this.morph.set('orbit')
  }

  /** world-space offset for the whole entity — lets a host bias where the
   *  ambient cloud starts (e.g. weighted toward the Hero's visual column)
   *  even though the canvas itself is a page-wide overlay, not bound to
   *  any section's box. Host-computed (viewport-aspect aware); the engine
   *  just applies it. */
  setEntityOffset(x: number, y = 0) {
    if (this.initialized) this.entity.group.position.set(x, y, 0)
  }

  /** section gravity targets, in NDC (−1…1) — a host converts its own DOM
   *  elements' screen positions to NDC and hands them here; the engine
   *  does the NDC→world projection and applies attraction only while the
   *  cloud is in its free-flowing state. Pass an empty array (or call
   *  again with new points) to clear a section's pull once it scrolls out
   *  of view. */
  setSectionTargets(points: { x: number, y: number }[]) {
    if (!this.initialized) return
    this.sectionTargets = points.map(p => this.ndcToWorld(p.x, p.y))
  }

  /** deliberate density control (distinct from adaptive-quality's FPS-
   *  driven ratio) — e.g. the Footer thinning the cloud out as "particles
   *  become sparse." r is 0-1. */
  setDensity(r: number) {
    if (this.initialized) this.particles.setActiveRatio(r)
  }

  /** NDC → the entity group's LOCAL space (not world space) — particle
   *  positions/forces all live in that local frame (entity.group carries
   *  the page-wide-canvas placement offset from setEntityOffset), so
   *  anything meant to attract particles has to land in the same frame or
   *  every distance/radius check silently misses. */
  private ndcToWorld(x: number, y: number): Vector3 {
    const camera = this.rendererSys.camera
    const ray = new Vector3(x, y, 0.5).unproject(camera).sub(camera.position).normalize()
    const t = -camera.position.z / ray.z
    const world = new Vector3().copy(camera.position)
    if (Number.isFinite(t) && t > 0) world.addScaledVector(ray, t)
    this.entity.group.worldToLocal(world)
    return world
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
    // section gravity only touches the free-flowing cloud. Always run
    // while flowing (even with zero active targets) so a section's pull
    // decays smoothly once it scrolls out of view, instead of freezing.
    if (this.morph.name === 'flow') {
      this.particles.applySectionTargets(
        this.sectionTargets, HeliosConfig.sectionTargetRadius, HeliosConfig.sectionTargetStrength, dt,
      )
    }
    this.particles.updateSprings(dt)           // 1 springs
    this.particles.update(dt)                  // 2 particles (integrate)
    this.connections.sync()                    // 3 connections
    this.morph.update(dt)                      // 4 morph
    this.materials.updateUniforms(this.store)  // 5 uniforms
    this.rendererSys.updateCamera(dt)          //   camera breathing (0 amplitude — static)
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
