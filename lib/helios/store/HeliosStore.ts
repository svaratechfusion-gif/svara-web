// Helios · store — global engine state. The single shared blackboard:
// current morph state, particle counts, scroll/cursor input, performance,
// device tier. Pub/sub, framework-agnostic, no logic.

import type { DeviceTier } from '../utils/device'

export type MorphStateName =
  | 'dormant' // asleep: scattered, dim, no connections — pre-boot rest
  | 'orbit'   // Hero-only: a small halo swirling around the Hero image
  | 'flow'    // the ambient cloud's continuous downward current

export interface HeliosState {
  currentState: MorphStateName
  /** 0–1 progress of the active state transition */
  progress: number
  particleCount: number
  activeParticleCount: number
  connectionCount: number
  device: DeviceTier
  /** orbit state's center + radius, entity-local space — set by
   *  HeliosEngine.orbit(), read by the Orbit morph state */
  orbitAnchor: { x: number, y: number, z: number }
  orbitRadius: number
  performance: {
    fps: number
    cpuMs: number
    gpuMs: number | null
    drawCalls: number
    qualityLevel: number
  }
}

type Listener = (s: HeliosState) => void

export class HeliosStore {
  readonly state: HeliosState = {
    currentState: 'dormant',
    progress: 1,
    particleCount: 0,
    activeParticleCount: 0,
    connectionCount: 0,
    device: 'desktop',
    orbitAnchor: { x: 0, y: 0, z: 0 },
    orbitRadius: 0,
    performance: { fps: 0, cpuMs: 0, gpuMs: null, drawCalls: 0, qualityLevel: 0 },
  }

  private listeners = new Set<Listener>()

  subscribe(fn: Listener) {
    this.listeners.add(fn)
    return () => this.listeners.delete(fn)
  }

  notify() {
    for (const fn of this.listeners) fn(this.state)
  }
}
