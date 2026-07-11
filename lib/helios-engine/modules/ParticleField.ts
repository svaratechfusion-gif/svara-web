import * as THREE from 'three'
import { gsap } from 'gsap'
import { EngineCore } from '../core/EngineCore'
import { World } from './World'

export interface ParticleFieldConfig {
  count: number
  type: ParticleType
  size: number
  sizeVariation: number
  color: THREE.Color | THREE.Color[]
  opacity: number
  opacityVariation: number
  blending: THREE.Blending
  depthWrite: boolean
  transparent: boolean
  bounds: THREE.Box3
  velocity: THREE.Vector3
  velocityVariation: number
  acceleration: THREE.Vector3
  lifetime: number
  lifetimeVariation: number
  spawnRate: number
  spawnShape: SpawnShape
  spawnShapeParams: SpawnShapeParams
  rotationSpeed: number
  rotationVariation: number
  scaleOverLifetime: boolean
  colorOverLifetime: THREE.Color[]
  opacityOverLifetime: number[]
  noiseStrength: number
  noiseScale: number
  noiseSpeed: number
  attractors: ParticleAttractor[]
  repulsors: ParticleRepulsor[]
  collisions: boolean
  collisionBounce: number
  subEmitter: SubEmitterConfig | null
}

export type ParticleType = 
  | 'points' 
  | 'sprites' 
  | 'meshes' 
  | 'lines' 
  | 'ribbons' 
  | 'glow' 
  | 'data' 
  | 'organic'

export type SpawnShape = 
  | 'box' 
  | 'sphere' 
  | 'cylinder' 
  | 'cone' 
  | 'torus' 
  | 'plane' 
  | 'custom'

export interface SpawnShapeParams {
  radius?: number
  radiusVariation?: number
  height?: number
  width?: number
  depth?: number
  innerRadius?: number
  arc?: number
  position?: THREE.Vector3
  rotation?: THREE.Euler
}

export interface ParticleAttractor {
  position: THREE.Vector3
  strength: number
  radius: number
  falloff: number
}

export interface ParticleRepulsor {
  position: THREE.Vector3
  strength: number
  radius: number
}

export interface SubEmitterConfig {
  count: number
  trigger: 'death' | 'collision' | 'time'
  triggerValue: number
  config: Partial<ParticleFieldConfig>
}

export interface ParticleData {
  position: THREE.Vector3
  velocity: THREE.Vector3
  acceleration: THREE.Vector3
  size: number
  color: THREE.Color
  opacity: number
  rotation: number
  rotationSpeed: number
  age: number
  lifetime: number
  isAlive: boolean
  initialSize: number
  initialColor: THREE.Color
  initialOpacity: number
  customData: Map<string, unknown>
}

export interface ParticleFieldEvents {
  onParticleSpawn?: (particle: ParticleData, index: number) => void
  onParticleDeath?: (particle: ParticleData, index: number) => void
  onParticleCollision?: (particle: ParticleData, normal: THREE.Vector3) => void
  onEmitterEmpty?: () => void
  onUpdate?: (deltaTime: number, aliveCount: number) => void
}

export const defaultParticleFieldConfig: ParticleFieldConfig = {
  count: 10000,
  type: 'points',
  size: 0.1,
  sizeVariation: 0.5,
  color: new THREE.Color(0x00ffff),
  opacity: 0.8,
  opacityVariation: 0.3,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  transparent: true,
  bounds: new THREE.Box3(new THREE.Vector3(-50, -50, -50), new THREE.Vector3(50, 50, 50)),
  velocity: new THREE.Vector3(0, 0.5, 0),
  velocityVariation: 0.5,
  acceleration: new THREE.Vector3(0, -0.1, 0),
  lifetime: 10,
  lifetimeVariation: 5,
  spawnRate: 100,
  spawnShape: 'box',
  spawnShapeParams: {
    width: 100,
    height: 50,
    depth: 100,
  },
  rotationSpeed: 0,
  rotationVariation: 0,
  scaleOverLifetime: true,
  colorOverLifetime: [],
  opacityOverLifetime: [],
  noiseStrength: 1,
  noiseScale: 0.01,
  noiseSpeed: 0.1,
  attractors: [],
  repulsors: [],
  collisions: false,
  collisionBounce: 0.5,
  subEmitter: null,
}

export class ParticleField {
  private _core: EngineCore
  private _world: World
  private _config: ParticleFieldConfig
  private _events: ParticleFieldEvents
  private _particles: ParticleData[] = []
  private _geometry: THREE.BufferGeometry
  private _material: THREE.Material
  private _mesh: THREE.Points | THREE.Mesh | THREE.LineSegments
  private _isActive = false
  private _spawnTimer = 0
  private _aliveCount = 0
  private _totalSpawned = 0
  private _time = 0
  private _noiseOffset = new THREE.Vector3()
  private _attributeBuffers: Map<string, THREE.BufferAttribute> = new Map()
  private _updateFunctions: Map<ParticleType, (particle: ParticleData, deltaTime: number) => void> = new Map()

  constructor(core: EngineCore, world: World, config: Partial<ParticleFieldConfig> = {}, events: ParticleFieldEvents = {}) {
    this._core = core
    this._world = world
    this._config = { ...defaultParticleFieldConfig, ...config }
    this._events = events

    this._geometry = new THREE.BufferGeometry()
    this._material = this._createMaterial()
    this._mesh = this._createMesh()
    this._initializeParticles()
    this._setupUpdateFunctions()

    this._core.scene.add(this._mesh)
  }

  private _createMaterial(): THREE.Material {
    const { type, color, opacity, blending, depthWrite, transparent, size } = this._config

    switch (type) {
      case 'sprites':
        return new THREE.SpriteMaterial({
          color: color instanceof THREE.Color ? color : color[0],
          opacity,
          transparent,
          blending,
          depthWrite,
          sizeAttenuation: true,
        })

      case 'points':
      case 'glow':
      case 'data':
      case 'organic':
        return new THREE.PointsMaterial({
          color: color instanceof THREE.Color ? color : color[0],
          size,
          opacity,
          transparent,
          blending,
          depthWrite,
          sizeAttenuation: true,
          vertexColors: true,
        })

      case 'lines':
      case 'ribbons':
        return new THREE.LineBasicMaterial({
          color: color instanceof THREE.Color ? color : color[0],
          opacity,
          transparent,
          blending,
          depthWrite,
          vertexColors: true,
        })

      case 'meshes':
        return new THREE.MeshBasicMaterial({
          color: color instanceof THREE.Color ? color : color[0],
          opacity,
          transparent,
          blending,
          depthWrite,
          vertexColors: true,
        })

      default:
        return new THREE.PointsMaterial({
          color: color instanceof THREE.Color ? color : color[0],
          size,
          opacity,
          transparent,
          blending,
          depthWrite,
          sizeAttenuation: true,
          vertexColors: true,
        })
    }
  }

  private _createMesh(): THREE.Points | THREE.Mesh | THREE.LineSegments {
    const { type, count } = this._config

    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const opacities = new Float32Array(count)
    const rotations = new Float32Array(count)
    const ages = new Float32Array(count)
    const lifetimes = new Float32Array(count)
    const velocities = new Float32Array(count * 3)
    const customData = new Float32Array(count * 4)

    this._geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    this._geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    this._geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    this._geometry.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1))
    this._geometry.setAttribute('rotation', new THREE.BufferAttribute(rotations, 1))
    this._geometry.setAttribute('age', new THREE.BufferAttribute(ages, 1))
    this._geometry.setAttribute('lifetime', new THREE.BufferAttribute(lifetimes, 1))
    this._geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3))
    this._geometry.setAttribute('customData', new THREE.BufferAttribute(customData, 4))

    this._geometry.setDrawRange(0, 0)

    switch (type) {
      case 'sprites':
        const sprites = new THREE.Group()
        sprites.name = 'ParticleSprites'
        for (let i = 0; i < count; i++) {
          const sprite = new THREE.Sprite(this._material as THREE.SpriteMaterial)
          sprite.scale.setScalar(this._config.size)
          sprites.add(sprite)
        }
        return sprites as unknown as THREE.Points

      case 'meshes':
        const meshGeo = new THREE.BoxGeometry(1, 1, 1)
        const mesh = new THREE.InstancedMesh(meshGeo, this._material, count)
        mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
        mesh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(count * 3), 3)
        return mesh

      case 'lines':
      case 'ribbons':
        const lineGeo = new THREE.BufferGeometry()
        const linePositions = new Float32Array(count * 6)
        lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
        lineGeo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(count * 6), 3))
        return new THREE.LineSegments(lineGeo, this._material)

      default:
        return new THREE.Points(this._geometry, this._material as THREE.PointsMaterial)
    }
  }

  private _initializeParticles(): void {
    const { count, bounds, lifetime, lifetimeVariation } = this._config

    for (let i = 0; i < count; i++) {
      this._particles.push({
        position: new THREE.Vector3(),
        velocity: new THREE.Vector3(),
        acceleration: new THREE.Vector3(),
        size: 0,
        color: new THREE.Color(),
        opacity: 0,
        rotation: 0,
        rotationSpeed: 0,
        age: 0,
        lifetime: 0,
        isAlive: false,
        initialSize: 0,
        initialColor: new THREE.Color(),
        initialOpacity: 0,
        customData: new Map(),
      })
    }

    this._spawnInitialParticles()
  }

  private _spawnInitialParticles(): void {
    const initialSpawn = Math.min(this._config.count, this._config.spawnRate * 2)
    for (let i = 0; i < initialSpawn; i++) {
      this._spawnParticle(i)
    }
  }

  private _spawnParticle(index: number): ParticleData | null {
    const particle = this._particles[index]
    if (!particle) return null

    const { bounds, size, sizeVariation, color, opacity, opacityVariation, velocity, velocityVariation, acceleration, lifetime, lifetimeVariation, rotationSpeed, rotationVariation, spawnShape, spawnShapeParams } = this._config

    particle.isAlive = true
    particle.age = 0
    particle.lifetime = lifetime + (Math.random() - 0.5) * 2 * lifetimeVariation

    this._spawnPosition(particle.position, spawnShape, spawnShapeParams, bounds)

    particle.velocity.set(
      velocity.x + (Math.random() - 0.5) * 2 * velocityVariation,
      velocity.y + (Math.random() - 0.5) * 2 * velocityVariation,
      velocity.z + (Math.random() - 0.5) * 2 * velocityVariation
    )

    particle.acceleration.copy(acceleration)

    particle.initialSize = size * (1 + (Math.random() - 0.5) * 2 * sizeVariation)
    particle.size = particle.initialSize

    if (color instanceof THREE.Color) {
      particle.initialColor = color.clone()
    } else {
      particle.initialColor = color[Math.floor(Math.random() * color.length)].clone()
    }
    particle.color.copy(particle.initialColor)

    particle.initialOpacity = opacity + (Math.random() - 0.5) * 2 * opacityVariation
    particle.opacity = Math.max(0, Math.min(1, particle.initialOpacity))

    particle.rotation = Math.random() * Math.PI * 2
    particle.rotationSpeed = (Math.random() - 0.5) * 2 * rotationSpeed + (Math.random() - 0.5) * 2 * rotationVariation

    particle.customData.clear()

    this._aliveCount++
    this._totalSpawned++

    this._events.onParticleSpawn?.(particle, index)

    return particle
  }

  private _spawnPosition(
    position: THREE.Vector3,
    shape: SpawnShape,
    params: SpawnShapeParams,
    bounds: THREE.Box3
  ): void {
    const center = new THREE.Vector3()
    bounds.getCenter(center)
    const size = new THREE.Vector3()
    bounds.getSize(size)

    switch (shape) {
      case 'box':
        position.set(
          center.x + (Math.random() - 0.5) * (params.width || size.x),
          center.y + (Math.random() - 0.5) * (params.height || size.y),
          center.z + (Math.random() - 0.5) * (params.depth || size.z)
        )
        break

      case 'sphere':
        const radius = params.radius || Math.min(size.x, size.y, size.z) * 0.5
        const r = radius * Math.cbrt(Math.random())
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        position.set(
          center.x + r * Math.sin(phi) * Math.cos(theta),
          center.y + r * Math.sin(phi) * Math.sin(theta),
          center.z + r * Math.cos(phi)
        )
        break

      case 'cylinder':
        const cylRadius = params.radius || size.x * 0.5
        const cylHeight = params.height || size.y
        const cylTheta = Math.random() * Math.PI * 2
        const cylR = cylRadius * Math.sqrt(Math.random())
        position.set(
          center.x + cylR * Math.cos(cylTheta),
          center.y + (Math.random() - 0.5) * cylHeight,
          center.z + cylR * Math.sin(cylTheta)
        )
        break

      case 'cone':
        const coneHeight = params.height || size.y
        const coneRadius = params.radius || size.x * 0.5
        const coneY = (Math.random() - 0.5) * coneHeight
        const coneR = coneRadius * (1 - Math.abs(coneY) / (coneHeight * 0.5)) * Math.sqrt(Math.random())
        const coneTheta = Math.random() * Math.PI * 2
        position.set(
          center.x + coneR * Math.cos(coneTheta),
          center.y + coneY,
          center.z + coneR * Math.sin(coneTheta)
        )
        break

      case 'torus':
        const torusRadius = params.radius || size.x * 0.5
        const tubeRadius = params.innerRadius || torusRadius * 0.3
        const torusTheta = Math.random() * Math.PI * 2
        const torusPhi = Math.random() * Math.PI * 2
        position.set(
          center.x + (torusRadius + tubeRadius * Math.cos(torusPhi)) * Math.cos(torusTheta),
          center.y + tubeRadius * Math.sin(torusPhi),
          center.z + (torusRadius + tubeRadius * Math.cos(torusPhi)) * Math.sin(torusTheta)
        )
        break

      case 'plane':
        position.set(
          center.x + (Math.random() - 0.5) * (params.width || size.x),
          center.y,
          center.z + (Math.random() - 0.5) * (params.depth || size.z)
        )
        break

      case 'custom':
        if (params.position) {
          position.copy(params.position)
        }
        break
    }

    if (params.rotation) {
      position.applyEuler(params.rotation)
    }
  }

  private _setupUpdateFunctions(): void {
    this._updateFunctions.set('points', this._updatePointParticle.bind(this))
    this._updateFunctions.set('sprites', this._updateSpriteParticle.bind(this))
    this._updateFunctions.set('meshes', this._updateMeshParticle.bind(this))
    this._updateFunctions.set('lines', this._updateLineParticle.bind(this))
    this._updateFunctions.set('ribbons', this._updateRibbonParticle.bind(this))
    this._updateFunctions.set('glow', this._updateGlowParticle.bind(this))
    this._updateFunctions.set('data', this._updateDataParticle.bind(this))
    this._updateFunctions.set('organic', this._updateOrganicParticle.bind(this))
  }

  private _updatePointParticle(particle: ParticleData, deltaTime: number): void {
    particle.velocity.addScaledVector(particle.acceleration, deltaTime)
    particle.position.addScaledVector(particle.velocity, deltaTime)
    particle.rotation += particle.rotationSpeed * deltaTime

    this._applyNoise(particle, deltaTime)
    this._applyForces(particle, deltaTime)
    this._checkBounds(particle)
    this._updateOverLifetime(particle)
  }

  private _updateSpriteParticle(particle: ParticleData, deltaTime: number): void {
    this._updatePointParticle(particle, deltaTime)
  }

  private _updateMeshParticle(particle: ParticleData, deltaTime: number): void {
    this._updatePointParticle(particle, deltaTime)
  }

  private _updateLineParticle(particle: ParticleData, deltaTime: number): void {
    this._updatePointParticle(particle, deltaTime)
  }

  private _updateRibbonParticle(particle: ParticleData, deltaTime: number): void {
    this._updatePointParticle(particle, deltaTime)
  }

  private _updateGlowParticle(particle: ParticleData, deltaTime: number): void {
    this._updatePointParticle(particle, deltaTime)
    particle.opacity = Math.sin(particle.age * 5) * 0.5 + 0.5
  }

  private _updateDataParticle(particle: ParticleData, deltaTime: number): void {
    this._updatePointParticle(particle, deltaTime)
    const dataValue = particle.customData.get('value') as number || 0
    particle.size = particle.initialSize * (0.5 + dataValue * 0.5)
  }

  private _updateOrganicParticle(particle: ParticleData, deltaTime: number): void {
    particle.velocity.addScaledVector(particle.acceleration, deltaTime)
    particle.position.addScaledVector(particle.velocity, deltaTime)
    particle.rotation += particle.rotationSpeed * deltaTime

    this._applyNoise(particle, deltaTime)
    this._applyForces(particle, deltaTime)
    this._checkBounds(particle)
    this._updateOverLifetime(particle)

    const sway = Math.sin(this._time * 2 + particle.customData.get('phase') as number) * 0.1
    particle.position.x += sway * deltaTime
    particle.position.z += sway * deltaTime
  }

  private _applyNoise(particle: ParticleData, deltaTime: number): void {
    const { noiseStrength, noiseScale, noiseSpeed } = this._config
    if (noiseStrength === 0) return

    this._noiseOffset.x += noiseSpeed * deltaTime
    this._noiseOffset.y += noiseSpeed * deltaTime * 0.7
    this._noiseOffset.z += noiseSpeed * deltaTime * 1.3

    const noise = this._simplexNoise(
      particle.position.x * noiseScale + this._noiseOffset.x,
      particle.position.y * noiseScale + this._noiseOffset.y,
      particle.position.z * noiseScale + this._noiseOffset.z
    )

    particle.velocity.x += (noise.x - 0.5) * noiseStrength * deltaTime
    particle.velocity.y += (noise.y - 0.5) * noiseStrength * deltaTime
    particle.velocity.z += (noise.z - 0.5) * noiseStrength * deltaTime
  }

  private _simplexNoise(x: number, y: number, z: number): THREE.Vector3 {
    return new THREE.Vector3(
      Math.sin(x * 12.9898 + y * 78.233) * 43758.5453 % 1,
      Math.sin(y * 12.9898 + z * 78.233) * 43758.5453 % 1,
      Math.sin(z * 12.9898 + x * 78.233) * 43758.5453 % 1
    )
  }

  private _applyForces(particle: ParticleData, deltaTime: number): void {
    const { attractors, repulsors } = this._config

    attractors.forEach((attractor) => {
      const toAttractor = new THREE.Vector3().subVectors(attractor.position, particle.position)
      const distance = toAttractor.length()
      if (distance < attractor.radius && distance > 0.01) {
        const force = toAttractor.normalize().multiplyScalar(
          attractor.strength * Math.pow(1 - distance / attractor.radius, attractor.falloff)
        )
        particle.velocity.addScaledVector(force, deltaTime)
      }
    })

    repulsors.forEach((repulsor) => {
      const fromRepulsor = new THREE.Vector3().subVectors(particle.position, repulsor.position)
      const distance = fromRepulsor.length()
      if (distance < repulsor.radius && distance > 0.01) {
        const force = fromRepulsor.normalize().multiplyScalar(
          repulsor.strength * (1 - distance / repulsor.radius)
        )
        particle.velocity.addScaledVector(force, deltaTime)
      }
    })
  }

  private _checkBounds(particle: ParticleData): void {
    const { bounds, collisions, collisionBounce } = this._config

    if (!bounds.containsPoint(particle.position)) {
      if (collisions) {
        const normal = this._getBoundsNormal(particle.position, bounds)
        particle.velocity.reflect(normal).multiplyScalar(collisionBounce)
        particle.position.addScaledVector(normal, 0.1)
        this._events.onParticleCollision?.(particle, normal)
      } else {
        this._killParticle(particle)
      }
    }
  }

  private _getBoundsNormal(position: THREE.Vector3, bounds: THREE.Box3): THREE.Vector3 {
    const center = new THREE.Vector3()
    bounds.getCenter(center)
    const size = new THREE.Vector3()
    bounds.getSize(size)

    const dx = Math.min(position.x - bounds.min.x, bounds.max.x - position.x)
    const dy = Math.min(position.y - bounds.min.y, bounds.max.y - position.y)
    const dz = Math.min(position.z - bounds.min.z, bounds.max.z - position.z)

    const minDist = Math.min(dx, dy, dz)

    if (minDist === dx) return new THREE.Vector3(position.x < center.x ? -1 : 1, 0, 0)
    if (minDist === dy) return new THREE.Vector3(0, position.y < center.y ? -1 : 1, 0)
    return new THREE.Vector3(0, 0, position.z < center.z ? -1 : 1)
  }

  private _updateOverLifetime(particle: ParticleData): void {
    const progress = particle.age / particle.lifetime

    if (this._config.scaleOverLifetime) {
      particle.size = particle.initialSize * (1 - progress)
    }

    if (this._config.colorOverLifetime.length > 0) {
      const colorIndex = Math.min(
        Math.floor(progress * (this._config.colorOverLifetime.length - 1)),
        this._config.colorOverLifetime.length - 2
      )
      const nextColorIndex = colorIndex + 1
      const localProgress = (progress * (this._config.colorOverLifetime.length - 1)) % 1
      particle.color.lerpColors(
        this._config.colorOverLifetime[colorIndex],
        this._config.colorOverLifetime[nextColorIndex],
        localProgress
      )
    }

    if (this._config.opacityOverLifetime.length > 0) {
      const opacityIndex = Math.min(
        Math.floor(progress * (this._config.opacityOverLifetime.length - 1)),
        this._config.opacityOverLifetime.length - 2
      )
      const nextOpacityIndex = opacityIndex + 1
      const localProgress = (progress * (this._config.opacityOverLifetime.length - 1)) % 1
      particle.opacity = THREE.MathUtils.lerp(
        this._config.opacityOverLifetime[opacityIndex],
        this._config.opacityOverLifetime[nextOpacityIndex],
        localProgress
      )
    } else {
      particle.opacity = particle.initialOpacity * (1 - progress)
    }
  }

  private _killParticle(particle: ParticleData): void {
    const index = this._particles.indexOf(particle)
    if (index !== -1) {
      particle.isAlive = false
      this._aliveCount--
      this._events.onParticleDeath?.(particle, index)
    }
  }

  public update(deltaTime: number): void {
    if (!this._isActive) return

    this._time += deltaTime
    this._spawnTimer += deltaTime

    const spawnInterval = 1 / this._config.spawnRate
    while (this._spawnTimer >= spawnInterval && this._aliveCount < this._config.count) {
      this._spawnTimer -= spawnInterval
      const deadIndex = this._particles.findIndex(p => !p.isAlive)
      if (deadIndex !== -1) {
        this._spawnParticle(deadIndex)
      } else {
        break
      }
    }

    const updateFn = this._updateFunctions.get(this._config.type) || this._updatePointParticle

    let aliveIndex = 0
    this._particles.forEach((particle, index) => {
      if (particle.isAlive) {
        particle.age += deltaTime

        if (particle.age >= particle.lifetime) {
          this._handleSubEmitter(particle, index)
          this._killParticle(particle)
        } else {
          updateFn(particle, deltaTime)
          this._writeParticleToBuffer(particle, aliveIndex)
          aliveIndex++
        }
      }
    })

    this._geometry.setDrawRange(0, this._aliveCount)
    this._geometry.attributes.position.needsUpdate = true
    this._geometry.attributes.color.needsUpdate = true
    this._geometry.attributes.size.needsUpdate = true
    this._geometry.attributes.opacity.needsUpdate = true
    this._geometry.attributes.rotation.needsUpdate = true
    this._geometry.attributes.age.needsUpdate = true

    this._events.onUpdate?.(deltaTime, this._aliveCount)

    if (this._aliveCount === 0 && this._totalSpawned > 0) {
      this._events.onEmitterEmpty?.()
    }
  }

  private _writeParticleToBuffer(particle: ParticleData, index: number): void {
    const posAttr = this._geometry.attributes.position as THREE.BufferAttribute
    const colorAttr = this._geometry.attributes.color as THREE.BufferAttribute
    const sizeAttr = this._geometry.attributes.size as THREE.BufferAttribute
    const opacityAttr = this._geometry.attributes.opacity as THREE.BufferAttribute
    const rotationAttr = this._geometry.attributes.rotation as THREE.BufferAttribute
    const ageAttr = this._geometry.attributes.age as THREE.BufferAttribute

    posAttr.setXYZ(index, particle.position.x, particle.position.y, particle.position.z)
    colorAttr.setXYZ(index, particle.color.r, particle.color.g, particle.color.b)
    sizeAttr.setX(index, particle.size)
    opacityAttr.setX(index, particle.opacity)
    rotationAttr.setX(index, particle.rotation)
    ageAttr.setX(index, particle.age)
  }

  private _handleSubEmitter(particle: ParticleData, index: number): void {
    const { subEmitter } = this._config
    if (!subEmitter) return

    if (subEmitter.trigger === 'death') {
      for (let i = 0; i < subEmitter.count; i++) {
        const deadIndex = this._particles.findIndex(p => !p.isAlive)
        if (deadIndex !== -1) {
          const subParticle = this._spawnParticle(deadIndex)
          if (subParticle) {
            subParticle.position.copy(particle.position)
            subParticle.velocity.addScaledVector(particle.velocity, 0.5)
            subParticle.lifetime *= 0.5
          }
        }
      }
    }
  }

  public play(): this {
    this._isActive = true
    return this
  }

  public pause(): this {
    this._isActive = false
    return this
  }

  public stop(): this {
    this._isActive = false
    this._particles.forEach(p => p.isAlive = false)
    this._aliveCount = 0
    this._geometry.setDrawRange(0, 0)
    return this
  }

  public burst(count: number, position?: THREE.Vector3): this {
    for (let i = 0; i < count; i++) {
      const deadIndex = this._particles.findIndex(p => !p.isAlive)
      if (deadIndex !== -1) {
        const particle = this._spawnParticle(deadIndex)
        if (particle && position) {
          particle.position.copy(position)
          particle.velocity.add(new THREE.Vector3(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
          ))
        }
      }
    }
    return this
  }

  public emit(position: THREE.Vector3, count: number = 1): this {
    for (let i = 0; i < count; i++) {
      const deadIndex = this._particles.findIndex(p => !p.isAlive)
      if (deadIndex !== -1) {
        const particle = this._spawnParticle(deadIndex)
        if (particle) {
          particle.position.copy(position)
        }
      }
    }
    return this
  }

  public setConfig(config: Partial<ParticleFieldConfig>): this {
    Object.assign(this._config, config)
    if (config.type && config.type !== this._config.type) {
      this._recreateMesh()
    }
    return this
  }

  private _recreateMesh(): void {
    this._core.scene.remove(this._mesh)
    this._geometry.dispose()
    this._geometry = new THREE.BufferGeometry()
    this._material = this._createMaterial()
    this._mesh = this._createMesh()
    this._initializeParticles()
    this._core.scene.add(this._mesh)
  }

  public addAttractor(attractor: ParticleAttractor): this {
    this._config.attractors.push(attractor)
    return this
  }

  public removeAttractor(index: number): this {
    this._config.attractors.splice(index, 1)
    return this
  }

  public addRepulsor(repulsor: ParticleRepulsor): this {
    this._config.repulsors.push(repulsor)
    return this
  }

  public removeRepulsor(index: number): this {
    this._config.repulsors.splice(index, 1)
    return this
  }

  public setColor(color: THREE.Color | THREE.Color[]): this {
    this._config.color = color
    if (this._material instanceof THREE.PointsMaterial || this._material instanceof THREE.SpriteMaterial) {
      if (color instanceof THREE.Color) {
        this._material.color.copy(color)
      } else {
        this._material.color.copy(color[0])
      }
    }
    return this
  }

  public setSize(size: number): this {
    this._config.size = size
    if (this._material instanceof THREE.PointsMaterial) {
      this._material.size = size
    }
    return this
  }

  public setOpacity(opacity: number): this {
    this._config.opacity = opacity
    if (this._material instanceof THREE.Material) {
      this._material.opacity = opacity
    }
    return this
  }

  public setBounds(bounds: THREE.Box3): this {
    this._config.bounds = bounds
    return this
  }

  public setVelocity(velocity: THREE.Vector3): this {
    this._config.velocity = velocity
    return this
  }

  public setSpawnRate(rate: number): this {
    this._config.spawnRate = rate
    return this
  }

  public getMesh(): THREE.Object3D {
    return this._mesh
  }

  public getGeometry(): THREE.BufferGeometry {
    return this._geometry
  }

  public getMaterial(): THREE.Material {
    return this._material
  }

  public getAliveCount(): number {
    return this._aliveCount
  }

  public getTotalSpawned(): number {
    return this._totalSpawned
  }

  public getConfig(): Readonly<ParticleFieldConfig> {
    return { ...this._config }
  }

  public setEvents(events: ParticleFieldEvents): this {
    this._events = { ...this._events, ...events }
    return this
  }

  public dispose(): void {
    this.stop()
    this._core.scene.remove(this._mesh)
    this._geometry.dispose()
    if (Array.isArray(this._material)) {
      this._material.forEach(m => m.dispose())
    } else {
      this._material.dispose()
    }
    this._particles.length = 0
  }
}

export const createParticleField = (
  core: EngineCore,
  world: World,
  config?: Partial<ParticleFieldConfig>,
  events?: ParticleFieldEvents
): ParticleField => {
  return new ParticleField(core, world, config, events)
}

export const particlePresets = {
  ambient: (bounds: THREE.Box3): Partial<ParticleFieldConfig> => ({
    count: 5000,
    type: 'points',
    size: 0.05,
    color: new THREE.Color(0x00ffff),
    opacity: 0.3,
    blending: THREE.AdditiveBlending,
    bounds,
    velocity: new THREE.Vector3(0, 0.1, 0),
    lifetime: 30,
    spawnRate: 50,
    noiseStrength: 0.5,
    noiseScale: 0.005,
  }),

  dataFlow: (bounds: THREE.Box3): Partial<ParticleFieldConfig> => ({
    count: 10000,
    type: 'data',
    size: 0.08,
    color: [new THREE.Color(0x00ffff), new THREE.Color(0x00ff88), new THREE.Color(0xff00ff)],
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    bounds,
    velocity: new THREE.Vector3(0, 0, 5),
    velocityVariation: 0.2,
    lifetime: 10,
    spawnRate: 200,
    spawnShape: 'plane',
    spawnShapeParams: { width: 20, depth: 20 },
    colorOverLifetime: [new THREE.Color(0x00ffff), new THREE.Color(0x00ff88), new THREE.Color(0xff00ff)],
    opacityOverLifetime: [0, 1, 1, 0],
  }),

  spark: (bounds: THREE.Box3): Partial<ParticleFieldConfig> => ({
    count: 1000,
    type: 'glow',
    size: 0.2,
    sizeVariation: 0.5,
    color: new THREE.Color(0xffaa00),
    opacity: 1,
    blending: THREE.AdditiveBlending,
    bounds,
    velocity: new THREE.Vector3(0, 5, 0),
    velocityVariation: 1,
    acceleration: new THREE.Vector3(0, -20, 0),
    lifetime: 2,
    lifetimeVariation: 1,
    spawnRate: 50,
    spawnShape: 'sphere',
    spawnShapeParams: { radius: 2 },
    rotationSpeed: 10,
    rotationVariation: 5,
  }),

  organic: (bounds: THREE.Box3): Partial<ParticleFieldConfig> => ({
    count: 2000,
    type: 'organic',
    size: 0.3,
    sizeVariation: 0.4,
    color: [new THREE.Color(0x44ff44), new THREE.Color(0x88ff88), new THREE.Color(0x22aa22)],
    opacity: 0.6,
    blending: THREE.NormalBlending,
    bounds,
    velocity: new THREE.Vector3(0, 0.2, 0),
    velocityVariation: 0.3,
    lifetime: 20,
    lifetimeVariation: 10,
    spawnRate: 20,
    spawnShape: 'box',
    noiseStrength: 2,
    noiseScale: 0.01,
    noiseSpeed: 0.05,
    scaleOverLifetime: true,
    opacityOverLifetime: [0, 0.6, 0.6, 0],
  }),

  cyberpunk: (bounds: THREE.Box3): Partial<ParticleFieldConfig> => ({
    count: 15000,
    type: 'points',
    size: 0.04,
    color: [new THREE.Color(0xff00ff), new THREE.Color(0x00ffff), new THREE.Color(0xffff00)],
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
    bounds,
    velocity: new THREE.Vector3(0, 0, 0),
    velocityVariation: 0.5,
    lifetime: 15,
    lifetimeVariation: 5,
    spawnRate: 100,
    spawnShape: 'box',
    noiseStrength: 1,
    noiseScale: 0.01,
    attractors: [
      { position: new THREE.Vector3(0, 50, 0), strength: 5, radius: 100, falloff: 2 },
    ],
  }),

  rain: (bounds: THREE.Box3): Partial<ParticleFieldConfig> => ({
    count: 20000,
    type: 'lines',
    size: 0.02,
    color: new THREE.Color(0x88ccff),
    opacity: 0.4,
    blending: THREE.NormalBlending,
    bounds,
    velocity: new THREE.Vector3(0, -30, 0),
    velocityVariation: 2,
    lifetime: 5,
    spawnRate: 1000,
    spawnShape: 'box',
    spawnShapeParams: { width: 100, height: 50, depth: 100 },
    collisions: true,
    collisionBounce: 0.1,
  }),

  snow: (bounds: THREE.Box3): Partial<ParticleFieldConfig> => ({
    count: 10000,
    type: 'sprites',
    size: 0.1,
    sizeVariation: 0.5,
    color: new THREE.Color(0xffffff),
    opacity: 0.8,
    blending: THREE.NormalBlending,
    bounds,
    velocity: new THREE.Vector3(0, -1, 0),
    velocityVariation: 0.5,
    acceleration: new THREE.Vector3(0, -0.5, 0),
    lifetime: 30,
    lifetimeVariation: 10,
    spawnRate: 200,
    spawnShape: 'box',
    spawnShapeParams: { width: 100, height: 50, depth: 100 },
    rotationSpeed: 0.5,
    rotationVariation: 0.5,
    noiseStrength: 0.5,
    noiseScale: 0.02,
  }),
}