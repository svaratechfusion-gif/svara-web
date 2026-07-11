// Helios Engine — renderer ownership: WebGL context, sizing, color space,
// pixel-ratio cap, optional GPU timing (EXT_disjoint_timer_query_webgl2).

import { WebGLRenderer, SRGBColorSpace, type Scene, type Camera } from 'three'
import { HeliosConfig } from './HeliosConfig'

export class HeliosRenderer {
  readonly renderer: WebGLRenderer
  private gpuExt: unknown | null = null
  private gpuQuery: WebGLQuery | null = null
  /** last resolved GPU frame time (ms), or null if unsupported */
  gpuMs: number | null = null

  constructor(private container: HTMLElement) {
    this.renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, HeliosConfig.maxPixelRatio))
    this.renderer.outputColorSpace = SRGBColorSpace
    this.renderer.setClearAlpha(HeliosConfig.clearAlpha)
    this.resize()
    container.appendChild(this.renderer.domElement)

    const gl = this.renderer.getContext() as WebGL2RenderingContext
    this.gpuExt = gl.getExtension('EXT_disjoint_timer_query_webgl2')
  }

  resize() {
    const w = this.container.clientWidth || 1
    const h = this.container.clientHeight || 1
    this.renderer.setSize(w, h)
  }

  render(scene: Scene, camera: Camera, measureGpu = false) {
    const gl = this.renderer.getContext() as WebGL2RenderingContext
    const ext = this.gpuExt as { TIME_ELAPSED_EXT: number, GPU_DISJOINT_EXT: number } | null

    // resolve previous frame's query (async — one frame of latency)
    if (ext && this.gpuQuery) {
      const available = gl.getQueryParameter(this.gpuQuery, gl.QUERY_RESULT_AVAILABLE)
      const disjoint = gl.getParameter(ext.GPU_DISJOINT_EXT)
      if (available && !disjoint) {
        this.gpuMs = Number(gl.getQueryParameter(this.gpuQuery, gl.QUERY_RESULT)) / 1e6
        gl.deleteQuery(this.gpuQuery)
        this.gpuQuery = null
      }
    }

    if (measureGpu && ext && !this.gpuQuery) {
      this.gpuQuery = gl.createQuery()
      if (this.gpuQuery) gl.beginQuery(ext.TIME_ELAPSED_EXT, this.gpuQuery)
      this.renderer.render(scene, camera)
      gl.endQuery(ext.TIME_ELAPSED_EXT)
    } else {
      this.renderer.render(scene, camera)
    }
  }

  get drawCalls() {
    return this.renderer.info.render.calls
  }

  dispose() {
    this.renderer.dispose()
    this.renderer.domElement.remove()
  }
}
