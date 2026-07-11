// Helios · render — owns Renderer, Camera, Scene, Composer slot, pixel
// ratio, resize and the render submission. Nothing else lives here.

import {
  WebGLRenderer, Scene, PerspectiveCamera, SRGBColorSpace, type Object3D,
} from 'three'
import { HeliosConfig } from '../engine/HeliosConfig'

export class HeliosRenderer {
  readonly renderer: WebGLRenderer
  readonly scene = new Scene()
  readonly camera: PerspectiveCamera
  /** post-processing slot — intentionally null (no bloom/no effects per
   *  design language); pages that ever need a pass can install one here
   *  without touching the render loop. */
  composer: { render: (dt: number) => void } | null = null

  gpuMs: number | null = null
  private gpuExt: { TIME_ELAPSED_EXT: number, GPU_DISJOINT_EXT: number } | null = null
  private gpuQuery: WebGLQuery | null = null
  private elapsed = 0

  constructor(private container: HTMLElement) {
    this.renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, HeliosConfig.maxPixelRatio))
    this.renderer.outputColorSpace = SRGBColorSpace
    this.renderer.setClearAlpha(HeliosConfig.clearAlpha)
    container.appendChild(this.renderer.domElement)

    this.camera = new PerspectiveCamera(
      HeliosConfig.fov,
      (container.clientWidth || 1) / (container.clientHeight || 1),
      0.1, 50,
    )
    this.camera.position.set(0, HeliosConfig.cameraY, HeliosConfig.cameraZ)
    this.camera.lookAt(0, HeliosConfig.cameraY, 0)

    const gl = this.renderer.getContext() as WebGL2RenderingContext
    this.gpuExt = gl.getExtension('EXT_disjoint_timer_query_webgl2')

    this.resize()
  }

  add(...objects: Object3D[]) {
    this.scene.add(...objects)
  }

  setPixelRatio(r: number) {
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, r))
  }

  resize() {
    const w = this.container.clientWidth || 1
    const h = this.container.clientHeight || 1
    this.renderer.setSize(w, h)
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
  }

  /** camera breathing — the camera's only motion. */
  updateCamera(dt: number) {
    this.elapsed += dt
    const b = Math.sin((this.elapsed / HeliosConfig.cameraBreathePeriod) * Math.PI * 2)
    this.camera.position.z = HeliosConfig.cameraZ + b * HeliosConfig.cameraBreatheAmp
  }

  render(dt: number, measureGpu = false) {
    if (this.composer) { this.composer.render(dt); return }

    const gl = this.renderer.getContext() as WebGL2RenderingContext
    const ext = this.gpuExt
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
      this.renderer.render(this.scene, this.camera)
      gl.endQuery(ext.TIME_ELAPSED_EXT)
    } else {
      this.renderer.render(this.scene, this.camera)
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
