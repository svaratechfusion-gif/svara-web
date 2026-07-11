import * as THREE from 'three'
import { EngineCore } from './EngineCore'
import { World } from './World'

export type CameraType = 'perspective' | 'orthographic' | 'cinematic'

export interface CameraConfig {
  type: CameraType
  fov: number
  near: number
  far: number
  aspect: number
  position: THREE.Vector3
  target: THREE.Vector3
  nearPlane: number
  farPlane: number
}

export const defaultCameraConfig: CameraConfig = {
  type: 'perspective',
  fov: 60,
  near: 0.1,
  far: 1000,
  aspect: 1,
  position: new THREE.Vector3(0, 5, 20),
  target: new THREE.Vector3(0, 0, 0),
  nearPlane: 0.1,
  farPlane: 1000,
}

export type CameraMode = 'orbit' | 'follow' | 'path' | 'free' | 'cinematic' | 'fixed'

export interface CameraPathPoint {
  position: THREE.Vector3
  target: THREE.Vector3
  duration: number
  easing?: (t: number) => number
  onComplete?: () => void
}

export interface CameraShakeConfig {
  intensity: number
  duration: number
  frequency: number
  decay: boolean
}

export interface CameraDirectorConfig {
  defaultMode: CameraMode
  enableDamping: boolean
  dampingFactor: number
  minDistance: number
  maxDistance: number
  minPolarAngle: number
  maxPolarAngle: number
  enablePan: boolean
  enableZoom: boolean
  enableRotate: boolean
  autoRotate: boolean
  autoRotateSpeed: number
}

export const defaultCameraDirectorConfig: CameraDirectorConfig = {
  defaultMode: 'orbit',
  enableDamping: true,
  dampingFactor: 0.05,
  minDistance: 1,
  maxDistance: 200,
  minPolarAngle: 0,
  maxPolarAngle: Math.PI,
  enablePan: true,
  enableZoom: true,
  enableRotate: true,
  autoRotate: false,
  autoRotateSpeed: 0.5,
}

export interface CameraState {
  mode: CameraMode
  position: THREE.Vector3
  target: THREE.Vector3
  zoom: number
  isShaking: boolean
  isOnPath: boolean
  pathProgress: number
}

export class CameraDirector {
  private _core: EngineCore
  private _world: World
  private _config: CameraDirectorConfig
  private _camera: THREE.PerspectiveCamera | THREE.OrthographicCamera
  private _cinematicCamera: THREE.PerspectiveCamera
  private _state: CameraState
  private _currentMode: CameraMode
  private _targetPosition: THREE.Vector3 = new THREE.Vector3()
  private _targetTarget: THREE.Vector3 = new THREE.Vector3()
  private _targetZoom: number = 1
  private _pathPoints: CameraPathPoint[] = []
  private _currentPathIndex: number = 0
  private _pathStartTime: number = 0
  private _isOnPath: boolean = false
  private _shakeConfig: CameraShakeConfig | null = null
  private _shakeTime: number = 0
  private _shakeOffset: THREE.Vector3 = new THREE.Vector3()
  private _eventCallbacks: {
    onModeChange?: (mode: CameraMode) => void
    onPathStart?: () => void
    onPathComplete?: () => void
    onPathPoint?: (index: number, point: CameraPathPoint) => void
    onShakeStart?: () => void
    onShakeEnd?: () => void
    onTargetReached?: () => void
  } = {}

  constructor(core: EngineCore, world: World, config: Partial<CameraDirectorConfig> = {}) {
    this._core = core
    this._world = world
    this._config = { ...defaultCameraDirectorConfig, ...config }
    this._currentMode = this._config.defaultMode

    this._camera = this._createCamera()
    this._cinematicCamera = this._createCinematicCamera()

    this._state = {
      mode: this._currentMode,
      position: this._camera.position.clone(),
      target: new THREE.Vector3(),
      zoom: 1,
      isShaking: false,
      isOnPath: false,
      pathProgress: 0,
    }

    this._core.camera = this._camera
    this._setupEventListeners()
  }

  private _createCamera(): THREE.PerspectiveCamera {
    const config = defaultCameraConfig
    const camera = new THREE.PerspectiveCamera(
      config.fov,
      config.aspect,
      config.near,
      config.far
    )
    camera.position.copy(config.position)
    camera.lookAt(config.target)
    return camera
  }

  private _createCinematicCamera(): THREE.PerspectiveCamera {
    const camera = new THREE.PerspectiveCamera(50, this._core.aspect, 0.1, 2000)
    camera.position.set(0, 10, 30)
    return camera
  }

  private _setupEventListeners(): void {
    this._core.onResize = () => {
      this._updateAspectRatio()
    }
  }

  private _updateAspectRatio(): void {
    if (this._camera instanceof THREE.PerspectiveCamera) {
      this._camera.aspect = this._core.aspect
      this._camera.updateProjectionMatrix()
    }
    this._cinematicCamera.aspect = this._core.aspect
    this._cinematicCamera.updateProjectionMatrix()
  }

  private _update(deltaTime: number, elapsedTime: number): void {
    this._updateShake(deltaTime)
    this._updatePath(deltaTime, elapsedTime)
    this._updateDamping(deltaTime)
    this._updateAutoRotate(deltaTime)
    this._syncState()
  }

  private _updateShake(deltaTime: number): void {
    if (!this._shakeConfig) return

    this._shakeTime += deltaTime
    const progress = this._shakeTime / this._shakeConfig.duration

    if (progress >= 1) {
      this._shakeConfig = null
      this._shakeTime = 0
      this._shakeOffset.set(0, 0, 0)
      this._state.isShaking = false
      this._eventCallbacks.onShakeEnd?.()
      return
    }

    const intensity = this._shakeConfig.decay
      ? this._shakeConfig.intensity * (1 - progress)
      : this._shakeConfig.intensity

    const freq = this._shakeConfig.frequency
    this._shakeOffset.x = Math.sin(this._shakeTime * freq) * intensity
    this._shakeOffset.y = Math.cos(this._shakeTime * freq * 1.3) * intensity
    this._shakeOffset.z = Math.sin(this._shakeTime * freq * 0.7) * intensity

    this._state.isShaking = true
  }

  private _updatePath(deltaTime: number, elapsedTime: number): void {
    if (!this._isOnPath || this._pathPoints.length === 0) return

    const currentPoint = this._pathPoints[this._currentPathIndex]
    const nextPoint = this._pathPoints[this._currentPathIndex + 1]

    if (!nextPoint) {
      this._completePath()
      return
    }

    const elapsed = elapsedTime - this._pathStartTime
    const progress = Math.min(elapsed / currentPoint.duration, 1)
    const easedProgress = currentPoint.easing ? currentPoint.easing(progress) : progress

    this._camera.position.lerpVectors(currentPoint.position, nextPoint.position, easedProgress)
    this._targetTarget.lerpVectors(currentPoint.target, nextPoint.target, easedProgress)
    this._camera.lookAt(this._targetTarget)

    this._state.pathProgress = (this._currentPathIndex + easedProgress) / (this._pathPoints.length - 1)
    this._state.isOnPath = true

    if (progress >= 1) {
      this._currentPathIndex++
      this._eventCallbacks.onPathPoint?.(this._currentPathIndex, nextPoint)
      currentPoint.onComplete?.()
    }
  }

  private _completePath(): void {
    this._isOnPath = false
    this._state.isOnPath = false
    this._state.pathProgress = 1
    this._pathPoints = []
    this._currentPathIndex = 0
    this._eventCallbacks.onPathComplete?.()
    this.mode('orbit')
  }

  private _updateDamping(deltaTime: number): void {
    if (!this._config.enableDamping) return
    if (this._isOnPath) return

    const factor = 1 - Math.pow(1 - this._config.dampingFactor, deltaTime * 60)

    this._camera.position.lerp(this._targetPosition, factor)
    this._camera.lookAt(this._targetTarget.lerp(this._camera.getWorldDirection(new THREE.Vector3()).add(this._camera.position), factor))
  }

  private _updateAutoRotate(deltaTime: number): void {
    if (!this._config.autoRotate || this._currentMode !== 'orbit') return
    if (this._isOnPath) return

    const angle = this._config.autoRotateSpeed * deltaTime
    const offset = this._camera.position.clone().sub(this._targetTarget)
    offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), angle)
    this._camera.position.copy(this._targetTarget).add(offset)
    this._camera.lookAt(this._targetTarget)
  }

  private _syncState(): void {
    this._state.position.copy(this._camera.position)
    this._state.target.copy(this._targetTarget)
    this._state.mode = this._currentMode
  }

  public mode(mode: CameraMode): this {
    if (this._currentMode === mode) return this

    const previousMode = this._currentMode
    this._currentMode = mode
    this._state.mode = mode

    switch (mode) {
      case 'orbit':
        this._config.enableRotate = true
        this._config.enableZoom = true
        this._config.enablePan = true
        break
      case 'follow':
        this._config.enableRotate = false
        break
      case 'path':
        this._config.enableRotate = false
        this._config.enableZoom = false
        this._config.enablePan = false
        break
      case 'free':
        this._config.enableRotate = true
        this._config.enableZoom = true
        this._config.enablePan = true
        break
      case 'cinematic':
        this._camera = this._cinematicCamera
        this._core.camera = this._cinematicCamera
        break
      case 'fixed':
        this._config.enableRotate = false
        this._config.enableZoom = false
        this._config.enablePan = false
        break
    }

    this._eventCallbacks.onModeChange?.(mode)
    return this
  }

  public getMode(): CameraMode {
    return this._currentMode
  }

  public orbit(options?: {
    target?: THREE.Vector3
    distance?: number
    azimuth?: number
    polar?: number
    duration?: number
    easing?: (t: number) => number
  }): this {
    this.mode('orbit')

    if (options?.target) {
      this._targetTarget.copy(options.target)
    }

    if (options?.distance !== undefined) {
      const direction = this._camera.position.clone().sub(this._targetTarget).normalize()
      this._targetPosition.copy(this._targetTarget).add(direction.multiplyScalar(options.distance))
    }

    if (options?.azimuth !== undefined || options?.polar !== undefined) {
      const spherical = new THREE.Spherical()
      spherical.setFromVector3(this._camera.position.clone().sub(this._targetTarget))

      if (options.azimuth !== undefined) spherical.theta = options.azimuth
      if (options.polar !== undefined) spherical.phi = options.polar
      spherical.radius = spherical.radius || 10

      this._targetPosition.setFromSpherical(spherical).add(this._targetTarget)
    }

    return this
  }

  public follow(target: THREE.Object3D | THREE.Vector3, options?: {
    offset?: THREE.Vector3
    lerp?: number
    lookAt?: boolean
  }): this {
    this.mode('follow')

    const updateFollow = () => {
      if (target instanceof THREE.Vector3) {
        this._targetTarget.copy(target)
      } else {
        target.getWorldPosition(this._targetTarget)
      }

      if (options?.offset) {
        this._targetPosition.copy(this._targetTarget).add(options.offset)
      }

      if (options?.lookAt !== false) {
        this._camera.lookAt(this._targetTarget)
      }
    }

    this._core.onUpdate = (deltaTime: number) => {
      updateFollow()
      if (options?.lerp) {
        this._camera.position.lerp(this._targetPosition, options.lerp)
      } else {
        this._camera.position.copy(this._targetPosition)
      }
    }

    updateFollow()
    return this
  }

  public path(points: CameraPathPoint[]): this {
    if (points.length < 2) return this

    this._pathPoints = points
    this._currentPathIndex = 0
    this._pathStartTime = this._core.elapsedTime
    this._isOnPath = true
    this.mode('path')

    this._camera.position.copy(points[0].position)
    this._targetTarget.copy(points[0].target)
    this._camera.lookAt(this._targetTarget)

    this._eventCallbacks.onPathStart?.()
    return this
  }

  public focus(target: THREE.Vector3 | THREE.Object3D, options?: {
    duration?: number
    easing?: (t: number) => number
    offset?: THREE.Vector3
    onComplete?: () => void
  }): this {
    const targetPos = target instanceof THREE.Vector3
      ? target.clone()
      : new THREE.Vector3().copy(target.getWorldPosition(new THREE.Vector3()))

    const targetTarget = targetPos.clone()
    const targetPosition = targetPos.clone().add(options?.offset || new THREE.Vector3(0, 2, 10))

    if (options?.duration) {
      const startPos = this._camera.position.clone()
      const startTarget = this._targetTarget.clone()
      const startTime = this._core.elapsedTime
      const duration = options.duration
      const easing = options.easing || ((t: number) => 1 - Math.pow(1 - t, 3))

      const animateFocus = (elapsedTime: number) => {
        const progress = Math.min((elapsedTime - startTime) / duration, 1)
        const eased = easing(progress)

        this._camera.position.lerpVectors(startPos, targetPosition, eased)
        this._targetTarget.lerpVectors(startTarget, targetTarget, eased)
        this._camera.lookAt(this._targetTarget)

        if (progress >= 1) {
          this._core.onUpdate = null
          options?.onComplete?.()
        }
      }

      this._core.onUpdate = animateFocus
    } else {
      this._targetPosition.copy(targetPosition)
      this._targetTarget.copy(targetTarget)
      this._camera.lookAt(this._targetTarget)
      options?.onComplete?.()
    }

    this._eventCallbacks.onTargetReached?.()
    return this
  }

  public shake(config: Partial<CameraShakeConfig>): this {
    this._shakeConfig = {
      intensity: config.intensity ?? 1,
      duration: config.duration ?? 1,
      frequency: config.frequency ?? 20,
      decay: config.decay ?? true,
    }
    this._shakeTime = 0
    this._state.isShaking = true
    this._eventCallbacks.onShakeStart?.()
    return this
  }

  public zoom(factor: number, options?: { duration?: number; easing?: (t: number) => number }): this {
    if (this._camera instanceof THREE.PerspectiveCamera) {
      const targetFov = THREE.MathUtils.clamp(this._camera.fov * factor, 10, 120)

      if (options?.duration) {
        const startFov = this._camera.fov
        const startTime = this._core.elapsedTime
        const easing = options.easing || ((t: number) => 1 - Math.pow(1 - t, 3))

        const animateZoom = (elapsedTime: number) => {
          const progress = Math.min((elapsedTime - startTime) / options.duration!, 1)
          const eased = easing(progress)
          this._camera.fov = THREE.MathUtils.lerp(startFov, targetFov, eased)
          this._camera.updateProjectionMatrix()

          if (progress >= 1) {
            this._core.onUpdate = null
          }
        }

        this._core.onUpdate = animateZoom
      } else {
        this._camera.fov = targetFov
        this._camera.updateProjectionMatrix()
      }
    }

    this._state.zoom = this._camera instanceof THREE.PerspectiveCamera ? this._camera.fov / 60 : 1
    return this
  }

  public dolly(distance: number): this {
    const direction = new THREE.Vector3()
    this._camera.getWorldDirection(direction)
    this._targetPosition.addScaledVector(direction, distance)
    return this
  }

  public truck(x: number, y: number): this {
    const offset = new THREE.Vector3()
    this._camera.getWorldDirection(offset)
    offset.cross(new THREE.Vector3(0, 1, 0)).normalize()
    offset.multiplyScalar(x)
    offset.y += y
    this._targetPosition.add(offset)
    this._targetTarget.add(offset)
    return this
  }

  public pedestal(y: number): this {
    this._targetPosition.y += y
    this._targetTarget.y += y
    return this
  }

  public lookAt(target: THREE.Vector3 | THREE.Object3D): this {
    const targetPos = target instanceof THREE.Vector3
      ? target
      : target.getWorldPosition(new THREE.Vector3())
    this._targetTarget.copy(targetPos)
    this._camera.lookAt(this._targetTarget)
    return this
  }

  public getCamera(): THREE.Camera {
    return this._camera
  }

  public getCinematicCamera(): THREE.PerspectiveCamera {
    return this._cinematicCamera
  }

  public getState(): Readonly<CameraState> {
    return { ...this._state }
  }

  public getPosition(): THREE.Vector3 {
    return this._camera.position.clone()
  }

  public getTarget(): THREE.Vector3 {
    return this._targetTarget.clone()
  }

  public on<K extends keyof CameraDirector['_eventCallbacks']>(
    event: K,
    callback: CameraDirector['_eventCallbacks'][K]
  ): this {
    this._eventCallbacks[event] = callback
    return this
  }

  public off<K extends keyof CameraDirector['_eventCallbacks']>(event: K): this {
    delete this._eventCallbacks[event]
    return this
  }

  public setConfig(config: Partial<CameraDirectorConfig>): this {
    Object.assign(this._config, config)
    return this
  }

  public getConfig(): Readonly<CameraDirectorConfig> {
    return { ...this._config }
  }

  public dispose(): void {
    this._pathPoints = []
    this._isOnPath = false
    this._shakeConfig = null
    this._eventCallbacks = {}
  }
}

export const createCameraDirector = (
  core: EngineCore,
  world: World,
  config?: Partial<CameraDirectorConfig>
): CameraDirector => {
  return new CameraDirector(core, world, config)
}