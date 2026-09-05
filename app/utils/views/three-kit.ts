// Small shared primitives for the scissored product views.
//
// Deliberately thin: line art, points and instanced boxes. Nothing here loads a
// texture, a GLTF or a shader chunk, because ten of these have to live inside
// one homepage section without adding a megabyte to the route.

import * as THREE from 'three'

/** The director palette, as numbers. --dx-fg, plus one cool and one warm accent. */
export const INK = 0xffffff
export const BLUE = 0x5b8cff
export const WARM = 0xff7a4a

/** One product visual: a scene, its camera, and how it moves. */
export interface ViewScene {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  /** t = seconds since the view started, dt = seconds since the last frame. */
  update?: (t: number, dt: number) => void
  dispose?: () => void
}

/**
 * A square-ish stage. The card figure is `aspect-ratio: 1`, so at fov 38 and
 * z 3.2 the frame is about 2.2 units tall — every scene below stays inside ±1.
 */
export function stage(z = 3.2, fov = 38) {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(fov, 1, 0.1, 40)
  camera.position.set(0, 0, z)
  camera.lookAt(0, 0, 0)
  return { scene, camera }
}

export function lineMaterial(color: number, opacity = 0.5): THREE.LineBasicMaterial {
  return new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false })
}

export function pointMaterial(color: number, size = 0.028, opacity = 0.9): THREE.PointsMaterial {
  return new THREE.PointsMaterial({ color, size, transparent: true, opacity, depthWrite: false })
}

export function positionsGeometry(xyz: ArrayLike<number>): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(xyz), 3))
  return geometry
}

export function segments(xyz: ArrayLike<number>, color: number, opacity = 0.3): THREE.LineSegments {
  return new THREE.LineSegments(positionsGeometry(xyz), lineMaterial(color, opacity))
}

export function polyline(points: THREE.Vector3[], color: number, opacity = 0.5): THREE.Line {
  const xyz: number[] = []
  for (const p of points) xyz.push(p.x, p.y, p.z)
  return new THREE.Line(positionsGeometry(xyz), lineMaterial(color, opacity))
}

/** Wireframe box edges — the house "module" shape, used by half the scenes. */
export function boxEdges(w: number, h: number, d: number, color: number, opacity = 0.5): THREE.LineSegments {
  const box = new THREE.BoxGeometry(w, h, d)
  const edges = new THREE.EdgesGeometry(box)
  box.dispose()
  return new THREE.LineSegments(edges, lineMaterial(color, opacity))
}

/**
 * mulberry32 — a seeded PRNG. Scene layout must be deterministic: these visuals
 * are decoration on a marketing page, and a node cloud that reshuffles on every
 * reload reads as noise rather than as a diagram of something.
 */
export function seeded(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** 0→1→0 with eased ends, for pulses that must not pop at the loop seam. */
export function pingpong(t: number, period: number): number {
  const x = (t % period) / period
  return 0.5 - 0.5 * Math.cos(x * Math.PI * 2)
}

/** Release every geometry and material under a scene. */
export function disposeScene(scene: THREE.Scene): void {
  scene.traverse((object) => {
    const mesh = object as THREE.Mesh
    mesh.geometry?.dispose?.()
    const material = mesh.material
    if (Array.isArray(material)) material.forEach((m) => m.dispose())
    else material?.dispose?.()
  })
  scene.clear()
}
