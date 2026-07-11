// Helios · math — signed distance fields. Pure functions, no state.

import type { Vector3 } from 'three'

export function sdSphere(p: Vector3, cx: number, cy: number, cz: number, r: number) {
  const dx = p.x - cx, dy = p.y - cy, dz = p.z - cz
  return Math.sqrt(dx * dx + dy * dy + dz * dz) - r
}

export function sdEllipsoid(p: Vector3, cx: number, cy: number, cz: number, rx: number, ry: number, rz: number) {
  const dx = (p.x - cx) / rx, dy = (p.y - cy) / ry, dz = (p.z - cz) / rz
  const k = Math.sqrt(dx * dx + dy * dy + dz * dz)
  return (k - 1) * Math.min(rx, Math.min(ry, rz))
}

/** capsule along X — shoulder line */
export function sdCapsuleX(p: Vector3, x1: number, x2: number, cy: number, cz: number, r: number) {
  const px = Math.max(x1, Math.min(p.x, x2))
  const dx = p.x - px, dy = p.y - cy, dz = p.z - cz
  return Math.sqrt(dx * dx + dy * dy + dz * dz) - r
}

/** polynomial smooth-min blend */
export function smin(a: number, b: number, k: number) {
  const h = Math.max(k - Math.abs(a - b), 0) / k
  return Math.min(a, b) - h * h * k * 0.25
}

/** The Intelligence Entity: head ∪ neck ∪ shoulders ∪ chest, soft lower cut. */
export function bustSDF(p: Vector3): number {
  const head = sdSphere(p, 0, 1.42, 0, 0.4)
  const neck = sdCapsuleX(p, -0.001, 0.001, 1.02, 0, 0.16)
  const shoulders = sdCapsuleX(p, -0.78, 0.78, 0.72, 0, 0.24)
  const chest = sdEllipsoid(p, 0, 0.28, 0, 0.62, 0.72, 0.4)
  let d = smin(head, neck, 0.18)
  d = smin(d, shoulders, 0.22)
  d = smin(d, chest, 0.26)
  return Math.max(d, -(p.y + 0.25) * 0.85)
}
