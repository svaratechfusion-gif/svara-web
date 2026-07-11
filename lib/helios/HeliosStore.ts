// Helios Engine — tiny framework-agnostic state store (pub/sub).
// Holds runtime metrics + pointer state. No Vue, no external deps.

export interface HeliosMetrics {
  fps: number
  particleCount: number
  connectionCount: number
  cpuMs: number      // JS update + render submit time
  gpuMs: number | null // real GPU time when timer-query ext is available
  drawCalls: number
}

export interface HeliosState {
  pointer: { x: number, y: number, active: boolean } // NDC
  metrics: HeliosMetrics
  morphTarget: string
}

type Listener = (state: HeliosState) => void

export class HeliosStore {
  readonly state: HeliosState = {
    pointer: { x: 0, y: 0, active: false },
    metrics: { fps: 0, particleCount: 0, connectionCount: 0, cpuMs: 0, gpuMs: null, drawCalls: 0 },
    morphTarget: 'entity',
  }

  private listeners = new Set<Listener>()

  subscribe(fn: Listener): () => void {
    this.listeners.add(fn)
    return () => this.listeners.delete(fn)
  }

  notify() {
    for (const fn of this.listeners) fn(this.state)
  }
}
