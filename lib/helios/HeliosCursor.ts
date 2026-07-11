// Helios Engine — cursor as a field influence, never a controller.
// Tracks the pointer, unprojects it onto the entity's z=0 plane, and
// exposes a smoothed world-space position. It never drags or rotates
// anything — HeliosParticles reads it as a repulsion source only.

import { Vector3, type PerspectiveCamera } from 'three'
import type { HeliosStore } from './HeliosStore'

export class HeliosCursor {
  /** smoothed world position on the entity plane */
  readonly world = new Vector3()
  active = false

  private target = new Vector3()
  private ray = new Vector3()
  private el: HTMLElement
  private onMove = (e: PointerEvent) => this.track(e)
  private onLeave = () => { this.store.state.pointer.active = false }

  constructor(
    el: HTMLElement,
    private camera: PerspectiveCamera,
    private store: HeliosStore,
  ) {
    this.el = el
    el.addEventListener('pointermove', this.onMove, { passive: true })
    el.addEventListener('pointerleave', this.onLeave, { passive: true })
  }

  private track(e: PointerEvent) {
    const r = this.el.getBoundingClientRect()
    if (!r.width || !r.height) return
    const p = this.store.state.pointer
    p.x = ((e.clientX - r.left) / r.width) * 2 - 1
    p.y = -((e.clientY - r.top) / r.height) * 2 + 1
    p.active = true
  }

  /** intersect pointer ray with plane z=0; smooth toward it */
  update(dt: number) {
    const p = this.store.state.pointer
    this.active = p.active
    if (!p.active) return

    this.ray.set(p.x, p.y, 0.5).unproject(this.camera).sub(this.camera.position).normalize()
    const t = -this.camera.position.z / this.ray.z
    if (!Number.isFinite(t) || t <= 0) return
    this.target.copy(this.camera.position).addScaledVector(this.ray, t)

    // critically-damped-ish smoothing keeps the influence spring-like
    const s = Math.min(1, dt * 10)
    this.world.lerp(this.target, s)
  }

  dispose() {
    this.el.removeEventListener('pointermove', this.onMove)
    this.el.removeEventListener('pointerleave', this.onLeave)
  }
}
