import * as THREE from 'three'
import { gsap } from 'gsap'

export interface EngineConfig {
  canvas: HTMLCanvasElement
  width: number
  height: number
  pixelRatio?: number
  antialias?: boolean
  alpha?: boolean
  toneMapping?: THREE.ToneMapping
  toneMappingExposure?: number
}

export interface EngineStats {
  fps: number
  frameTime: number
  drawCalls: number
  triangles: number
  geometries: number
  textures: number
}

export class EngineCore {
  public renderer: THREE.WebGLRenderer
  public scene: THREE.Scene
  public camera: THREE.PerspectiveCamera
  public clock: THREE.Clock
  public stats: EngineStats

  private _config: EngineConfig
  private _animationId: number | null = null
  private _isRunning = false
  private _resizeObserver: ResizeObserver | null = null
  private _lastTime = 0

  constructor(config: EngineConfig) {
    this._config = {
      pixelRatio: Math.min(window.devicePixelRatio, 2),
      antialias: true,
      alpha: true,
      toneMapping: THREE.ACESFilmicToneMapping,
      toneMappingExposure: 1,
      ...config,
    }

    this.clock = new THREE.Clock()
    this.stats = {
      fps: 60,
      frameTime: 0,
      drawCalls: 0,
      triangles: 0,
      geometries: 0,
      textures: 0,
    }

    this.renderer = this._createRenderer()
    this.scene = this._createScene()
    this.camera = this._createCamera()
    this._setupResizeObserver()
  }

  private _createRenderer(): THREE.WebGLRenderer {
    const renderer = new THREE.WebGLRenderer({
      canvas: this._config.canvas,
      antialias: this._config.antialias,
      alpha: this._config.alpha,
      powerPreference: 'high-performance',
    })

    renderer.setSize(this._config.width, this._config.height)
    renderer.setPixelRatio(this._config.pixelRatio!)
    renderer.toneMapping = this._config.toneMapping!
    renderer.toneMappingExposure = this._config.toneMappingExposure!
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.physicallyCorrectLights = true

    return renderer
  }

  private _createScene(): THREE.Scene {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)
    return scene
  }

  private _createCamera(): THREE.PerspectiveCamera {
    const aspect = this._config.width / this._config.height
    const camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 10000)
    camera.position.set(0, 5, 20)
    return camera
  }

  private _setupResizeObserver(): void {
    if (typeof ResizeObserver !== 'undefined') {
      this._resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const width = entry.contentRect.width
          const height = entry.contentRect.height
          this.resize(width, height)
        }
      })
      this._resizeObserver.observe(this._config.canvas)
    }
  }

  public resize(width: number, height: number): void {
    this._config.width = width
    this._config.height = height
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
  }

  public setPixelRatio(ratio: number): void {
    this.renderer.setPixelRatio(Math.min(ratio, 2))
  }

  public start(): void {
    if (this._isRunning) return
    this._isRunning = true
    this._lastTime = performance.now()
    this._animate()
  }

  public stop(): void {
    this._isRunning = false
    if (this._animationId !== null) {
      cancelAnimationFrame(this._animationId)
      this._animationId = null
    }
  }

  private _animate = (time: number): void => {
    if (!this._isRunning) return

    this._animationId = requestAnimationFrame(this._animate)

    const deltaTime = this.clock.getDelta()
    const elapsedTime = this.clock.getElapsedTime()

    this._updateStats(time)

    this.onUpdate?.(deltaTime, elapsedTime)

    this.renderer.render(this.scene, this.camera)
  }

  private _updateStats(time: number): void {
    const frameTime = time - this._lastTime
    this._lastTime = time

    this.stats.fps = Math.round(1000 / frameTime)
    this.stats.frameTime = frameTime

    const info = this.renderer.info
    this.stats.drawCalls = info.render.calls
    this.stats.triangles = info.render.triangles
    this.stats.geometries = info.memory.geometries
    this.stats.textures = info.memory.textures
  }

  public onUpdate?: (deltaTime: number, elapsedTime: number) => void

  public dispose(): void {
    this.stop()

    if (this._resizeObserver) {
      this._resizeObserver.disconnect()
      this._resizeObserver = null
    }

    this.renderer.dispose()
    this.scene.clear()
    this.camera.clear()
  }

  get isRunning(): boolean {
    return this._isRunning
  }

  get width(): number {
    return this._config.width
  }

  get height(): number {
    return this._config.height
  }
}

export const createEngineCore = (config: EngineConfig): EngineCore => {
  return new EngineCore(config)
}
