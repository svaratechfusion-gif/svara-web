// Helios · store — global engine state. The single shared blackboard:
// current morph state, particle counts, scroll/cursor input, performance,
// device tier. Pub/sub, framework-agnostic, no logic.

import type { DeviceTier } from '../utils/device'

export type MorphStateName = 'assemble' | 'idle' | 'dissolve' | 'flow' | 'reconstruct'

export interface HeliosState {
  currentState: MorphStateName
  /** 0–1 progress of the active state transition */
  progress: number
  /** normalized page scroll fed by the host via setScroll() */
  scroll: number
  pointer: { x: number, y: number, active: boolean } // NDC
  particleCount: number
  activeParticleCount: number
  connectionCount: number
  device: DeviceTier
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
    currentState: 'idle',
    progress: 1,
    scroll: 0,
    pointer: { x: 0, y: 0, active: false },
    particleCount: 0,
    activeParticleCount: 0,
    connectionCount: 0,
    device: 'desktop',
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
