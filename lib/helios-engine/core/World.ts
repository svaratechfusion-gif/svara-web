import * as THREE from 'three'
import { EngineCore } from './EngineCore'

export interface WorldConfig {
  density: number
  fogEnabled: boolean
  fogColor: number
  fogNear: number
  fogFar: number
  backgroundColor: number
  ambientColor: number
  ambientIntensity: number
  gravity: number
}

export const defaultWorldConfig: WorldConfig = {
  density: 0.5,
  fogEnabled: true,
  fogColor: 0x0a0a0f,
  fogNear: 10,
  fogFar: 100,
  backgroundColor: 0x0a0a0f,
  ambientColor: 0xffffff,
  ambientIntensity: 0.3,
  gravity: -9.81,
}

export interface WorldState {
  density: number
  time: number
  deltaTime: number
  isActive: boolean
}

export interface WorldEvents {
  onDensityChange: (density: number) => void
  onTimeUpdate: (time: number, deltaTime: number) => void
  onStateChange: (state: Partial<WorldState>) => void
}

export class World {
  private _core: EngineCore
  private _config: WorldConfig
  private _state: WorldState
  private _scene: THREE.Scene
  private _fog: THREE.Fog | THREE.FogExp2 | null = null
  private _ambientLight: THREE.AmbientLight | null = null
  private _eventCallbacks: Partial<WorldEvents> = {}
  private _objects: Map<string, THREE.Object3D> = new Map()
  private _systems: Map<string, WorldSystem> = new Map()

  constructor(core: EngineCore, config: Partial<WorldConfig> = {}) {
    this._core = core
    this._config = { ...defaultWorldConfig, ...config }
    this._scene = core.scene
    this._state = {
      density: this._config.density,
      time: 0,
      deltaTime: 0,
      isActive: true,
    }

    this._initialize()
    this._setupEventListeners()
  }

  private _initialize(): void {
    this._scene.background = new THREE.Color(this._config.backgroundColor)

    if (this._config.fogEnabled) {
      this._fog = new THREE.FogExp2(this._config.fogColor, this._config.density * 0.02)
      this._scene.fog = this._fog
    }

    this._ambientLight = new THREE.AmbientLight(this._config.ambientColor, this._config.ambientIntensity)
    this._scene.add(this._ambientLight)

    this._core.onUpdate = (deltaTime: number, elapsedTime: number) => {
      this._update(deltaTime, elapsedTime)
    }
  }

  private _setupEventListeners(): void {
    this._core.onResize = () => {
      if (this._fog && this._fog instanceof THREE.FogExp2) {
        this._fog.density = this._config.density * 0.02
      }
    }
  }

  private _update(deltaTime: number, elapsedTime: number): void {
    if (!this._state.isActive) return

    this._state.deltaTime = deltaTime
    this._state.time = elapsedTime

    this._systems.forEach((system) => {
      if (system.isActive) {
        system.update(deltaTime, elapsedTime, this._state)
      }
    })

    this._eventCallbacks.onTimeUpdate?.(elapsedTime, deltaTime)
  }

  public density(value: number): this {
    this._config.density = Math.max(0, Math.min(1, value))
    this._state.density = this._config.density

    if (this._fog && this._fog instanceof THREE.FogExp2) {
      this._fog.density = this._config.density * 0.05
    }

    this._eventCallbacks.onDensityChange?.(this._config.density)
    this._eventCallbacks.onStateChange?.({ density: this._config.density })

    return this
  }

  public getDensity(): number {
    return this._config.density
  }

  public setFog(enabled: boolean, color?: number, near?: number, far?: number): this {
    this._config.fogEnabled = enabled

    if (enabled) {
      if (color !== undefined) this._config.fogColor = color
      if (near !== undefined) this._config.fogNear = near
      if (far !== undefined) this._config.fogFar = far

      this._fog = new THREE.Fog(this._config.fogColor, this._config.fogNear, this._config.fogFar)
      this._scene.fog = this._fog
    } else {
      this._scene.fog = null
      this._fog = null
    }

    return this
  }

  public setAmbient(color: number, intensity: number): this {
    this._config.ambientColor = color
    this._config.ambientIntensity = intensity

    if (this._ambientLight) {
      this._ambientLight.color.setHex(color)
      this._ambientLight.intensity = intensity
    }

    return this
  }

  public setBackground(color: number): this {
    this._config.backgroundColor = color
    this._scene.background = new THREE.Color(color)
    return this
  }

  public setGravity(gravity: number): this {
    this._config.gravity = gravity
    return this
  }

  public addObject(key: string, object: THREE.Object3D): this {
    this._objects.set(key, object)
    this._scene.add(object)
    return this
  }

  public removeObject(key: string): this {
    const object = this._objects.get(key)
    if (object) {
      this._scene.remove(object)
      this._objects.delete(key)
    }
    return this
  }

  public getObject(key: string): THREE.Object3D | undefined {
    return this._objects.get(key)
  }

  public addSystem(name: string, system: WorldSystem): this {
    this._systems.set(name, system)
    system.init(this._scene, this._core)
    return this
  }

  public removeSystem(name: string): this {
    const system = this._systems.get(name)
    if (system) {
      system.dispose()
      this._systems.delete(name)
    }
    return this
  }

  public getSystem(name: string): WorldSystem | undefined {
    return this._systems.get(name)
  }

  public pause(): this {
    this._state.isActive = false
    this._eventCallbacks.onStateChange?.({ isActive: false })
    return this
  }

  public resume(): this {
    this._state.isActive = true
    this._eventCallbacks.onStateChange?.({ isActive: true })
    return this
  }

  public on<K extends keyof WorldEvents>(event: K, callback: WorldEvents[K]): this {
    this._eventCallbacks[event] = callback
    return this
  }

  public off<K extends keyof WorldEvents>(event: K): this {
    delete this._eventCallbacks[event]
    return this
  }

  public getState(): Readonly<WorldState> {
    return { ...this._state }
  }

  public getScene(): THREE.Scene {
    return this._scene
  }

  public getConfig(): Readonly<WorldConfig> {
    return { ...this._config }
  }

  public dispose(): void {
    this._systems.forEach((system) => system.dispose())
    this._systems.clear()

    this._objects.forEach((object) => {
      this._scene.remove(object)
      object.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose()
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose())
          } else {
            child.material.dispose()
          }
        }
      })
    })
    this._objects.clear()

    if (this._ambientLight) {
      this._scene.remove(this._ambientLight)
      this._ambientLight = null
    }

    this._scene.fog = null
    this._fog = null
    this._eventCallbacks = {}
  }
}

export interface WorldSystem {
  name: string
  isActive: boolean
  init(scene: THREE.Scene, core: EngineCore): void
  update(deltaTime: number, elapsedTime: number, state: WorldState): void
  dispose(): void
}

export const createWorld = (core: EngineCore, config?: Partial<WorldConfig>): World => {
  return new World(core, config)
}