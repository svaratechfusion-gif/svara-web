// Helios · physics — cursor system: pointer tracking, plane raycast,
// interaction radius, force calculation. It COMPUTES the force and applies
// it through the particle pool's generic applyForce() — it renders nothing
// and owns no geometry.

import { Vector3, type PerspectiveCamera } from 'three'
import { HeliosConfig } from '../engine/HeliosConfig'
import type { HeliosStore } from '../store/HeliosStore'
import type { HeliosParticles } from './HeliosParticles'

export class HeliosCursor {
  readonly world = new Vector3()
  private target = new Vector3()
  private ray = new Vector3()
  private el: HTMLElement | null = null
  private onMove = (e: PointerEvent) => this.track(e)
  private onLeave = () => { this.store.state.pointer.active = false }

  constructor(private camera: PerspectiveCamera, private store: HeliosStore) {}

  /** attach DOM listeners (host may instead feed setCursor via the store) */
  attach(el: HTMLElement) {
    this.el = el
    el.addEventListener('pointermove', this.onMove, { passive: true })
    el.addEventListener('pointerleave', this.onLeave, { passive: true })
  }

  private track(e: PointerEvent) {
    if (!this.el) return
    const r = this.el.getBoundingClientRect()
    if (!r.width || !r.height) return
    const p = this.store.state.pointer
    p.x = ((e.clientX - r.left) / r.width) * 2 - 1
    p.y = -((e.clientY - r.top) / r.height) * 2 + 1
    p.active = true
  }

  /** raycast pointer → entity plane (z=0), smooth, inject spring force */
  update(dt: number, particles: HeliosParticles) {
    const p = this.store.state.pointer
    if (!p.active) return

    this.ray.set(p.x, p.y, 0.5).unproject(this.camera).sub(this.camera.position).normalize()
    const t = -this.camera.position.z / this.ray.z
    if (!Number.isFinite(t) || t <= 0) return
    this.target.copy(this.camera.position).addScaledVector(this.ray, t)
    this.world.lerp(this.target, Math.min(1, dt * 10))

    particles.applyForce(this.world, HeliosConfig.cursorRadius, HeliosConfig.cursorStrength, dt)
  }

  dispose() {
    if (!this.el) return
    this.el.removeEventListener('pointermove', this.onMove)
    this.el.removeEventListener('pointerleave', this.onLeave)
  }
}
