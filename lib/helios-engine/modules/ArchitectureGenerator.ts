import * as THREE from 'three'
import { gsap } from 'gsap'
import { EngineCore } from '../core/EngineCore'
import { World } from './World'

export interface ArchitectureConfig {
  seed?: number
  style?: ArchitectureStyle
  density?: number
  heightRange?: [number, number]
  widthRange?: [number, number]
  depthRange?: [number, number]
  colorScheme?: ColorScheme
  materialType?: MaterialType
  gridSize?: number
  variation?: number
}

export type ArchitectureStyle = 
  | 'brutalist'
  | 'futuristic'
  | 'organic'
  | 'geometric'
  | 'minimal'
  | 'industrial'
  | 'cyberpunk'
  | 'biomorphic'

export type ColorScheme = 
  | 'monochrome'
  | 'neon'
  | 'earth'
  | 'corporate'
  | 'dark'
  | 'light'
  | 'custom'

export type MaterialType = 
  | 'standard'
  | 'physical'
  | 'glass'
  | 'metal'
  | 'concrete'
  | 'emissive'
  | 'holographic'

export interface BuildingSpec {
  position: THREE.Vector3
  width: number
  height: number
  depth: number
  rotation?: number
  style?: ArchitectureStyle
  floors?: number
  details?: BuildingDetails
}

export interface BuildingDetails {
  windows?: WindowConfig
  roof?: RoofConfig
  base?: BaseConfig
  facade?: FacadeConfig
  lighting?: BuildingLightingConfig
}

export interface WindowConfig {
  enabled: boolean
  spacing: number
  size: THREE.Vector2
  glowIntensity: number
  color: THREE.Color
  pattern?: WindowPattern
}

export type WindowPattern = 'grid' | 'random' | 'strips' | 'corner' | 'none'

export interface RoofConfig {
  type: RoofType
  height: number
  detailLevel: number
  hasHelipad: boolean
  hasAntenna: boolean
  gardenLevel: number
}

export type RoofType = 'flat' | 'sloped' | 'domed' | 'terraced' | 'spire' | 'green'

export interface BaseConfig {
  height: number
  detailLevel: number
  hasEntrance: boolean
  entranceWidth: number
  plazaSize: number
}

export interface FacadeConfig {
  pattern: FacadePattern
  depth: number
  panelSize: number
  grooveDepth: number
  materialVariation: number
}

export type FacadePattern = 
  | 'none' 
  | 'vertical-strips' 
  | 'horizontal-bands' 
  | 'grid' 
  | 'diagonal' 
  | 'organic' 
  | 'parametric' 
  | 'brutalist'

export interface BuildingLightingConfig {
  windowGlow: boolean
  accentLights: boolean
  accentColor: THREE.Color
  pulseSpeed: number
  intensity: number
}

export interface CityBlockConfig {
  bounds: THREE.Box3
  blockSize: number
  streetWidth: number
  density: number
  heightVariation: number
  style: ArchitectureStyle
  centerFocus: boolean
}

export interface ArchitectureGeneratorEvents {
  onBuildingComplete?: (building: THREE.Group, spec: BuildingSpec) => void
  onBlockComplete?: (block: THREE.Group, config: CityBlockConfig) => void
  onGenerationComplete?: (city: THREE.Group) => void
  onProgress?: (progress: number, current: number, total: number) => void
}

export class ArchitectureGenerator {
  private _core: EngineCore
  private _world: World
  private _config: ArchitectureConfig
  private _events: ArchitectureGeneratorEvents
  private _city: THREE.Group
  private _buildings: Map<string, THREE.Group> = new Map()
  private _rng: SeededRandom
  private _isGenerating = false
  private _geometryCache: Map<string, THREE.BufferGeometry> = new Map()
  private _materialCache: Map<string, THREE.Material> = new Map()

  constructor(core: EngineCore, world: World, config: ArchitectureConfig = {}, events: ArchitectureGeneratorEvents = {}) {
    this._core = core
    this._world = world
    this._config = {
      seed: Date.now(),
      style: 'futuristic',
      density: 0.7,
      heightRange: [5, 80],
      widthRange: [8, 30],
      depthRange: [8, 30],
      colorScheme: 'corporate',
      materialType: 'physical',
      gridSize: 40,
      variation: 0.3,
      ...config,
    }
    this._events = events
    this._rng = new SeededRandom(this._config.seed)
    this._city = new THREE.Group()
    this._city.name = 'ArchitectureCity'
    this._initMaterials()
  }

  private _initMaterials(): void {
    const schemes = this._getColorSchemes()
    const scheme = schemes[this._config.colorScheme!] || schemes.corporate

    this._createMaterial('building-base', {
      color: scheme.base,
      metalness: 0.3,
      roughness: 0.7,
    })

    this._createMaterial('window-glass', {
      color: scheme.window,
      metalness: 0,
      roughness: 0,
      transmission: 0.9,
      thickness: 0.5,
      transparent: true,
      opacity: 0.3,
    })

    this._createMaterial('window-glow', {
      color: scheme.windowGlow,
      emissive: scheme.windowGlow,
      emissiveIntensity: 1,
    })

    this._createMaterial('accent', {
      color: scheme.accent,
      metalness: 0.8,
      roughness: 0.2,
      emissive: scheme.accent,
      emissiveIntensity: 0.3,
    })

    this._createMaterial('roof', {
      color: scheme.roof,
      metalness: 0.5,
      roughness: 0.5,
    })

    this._createMaterial('ground', {
      color: scheme.ground,
      metalness: 0.1,
      roughness: 0.9,
    })
  }

  private _getColorSchemes(): Record<ColorScheme, ColorSchemeColors> {
    return {
      monochrome: {
        base: new THREE.Color(0x222222),
        window: new THREE.Color(0x444444),
        windowGlow: new THREE.Color(0xffffff),
        accent: new THREE.Color(0x888888),
        roof: new THREE.Color(0x111111),
        ground: new THREE.Color(0x0a0a0a),
      },
      neon: {
        base: new THREE.Color(0x0d0d1a),
        window: new THREE.Color(0x00ffff),
        windowGlow: new THREE.Color(0xff00ff),
        accent: new THREE.Color(0x00ffff),
        roof: new THREE.Color(0x000033),
        ground: new THREE.Color(0x050510),
      },
      earth: {
        base: new THREE.Color(0x8b7355),
        window: new THREE.Color(0xffd700),
        windowGlow: new THREE.Color(0xffaa00),
        accent: new THREE.Color(0xcd853f),
        roof: new THREE.Color(0x5d4e37),
        ground: new THREE.Color(0x3d2b1f),
      },
      corporate: {
        base: new THREE.Color(0x1a1a2e),
        window: new THREE.Color(0x00d4ff),
        windowGlow: new THREE.Color(0x00ffff),
        accent: new THREE.Color(0x00ff88),
        roof: new THREE.Color(0x0f0f1a),
        ground: new THREE.Color(0x0a0a12),
      },
      dark: {
        base: new THREE.Color(0x0a0a0a),
        window: new THREE.Color(0x1a1a1a),
        windowGlow: new THREE.Color(0x333333),
        accent: new THREE.Color(0x222222),
        roof: new THREE.Color(0x050505),
        ground: new THREE.Color(0x000000),
      },
      light: {
        base: new THREE.Color(0xf0f0f0),
        window: new THREE.Color(0x888888),
        windowGlow: new THREE.Color(0xcccccc),
        accent: new THREE.Color(0xdddddd),
        roof: new THREE.Color(0xe0e0e0),
        ground: new THREE.Color(0xfafafa),
      },
      custom: {
        base: new THREE.Color(0x1a1a2e),
        window: new THREE.Color(0x00d4ff),
        windowGlow: new THREE.Color(0x00ffff),
        accent: new THREE.Color(0x00ff88),
        roof: new THREE.Color(0x0f0f1a),
        ground: new THREE.Color(0x0a0a12),
      },
    }
  }

  private _createMaterial(name: string, params: THREE.MeshStandardMaterialParameters): void {
    const material = new THREE.MeshStandardMaterial(params)
    material.name = name
    this._materialCache.set(name, material)
  }

  private _getMaterial(name: string): THREE.Material {
    return this._materialCache.get(name) || new THREE.MeshStandardMaterial()
  }

  private _getCachedGeometry(key: string, creator: () => THREE.BufferGeometry): THREE.BufferGeometry {
    if (!this._geometryCache.has(key)) {
      this._geometryCache.set(key, creator())
    }
    return this._geometryCache.get(key)!
  }

  public generateCity(config: CityBlockConfig): THREE.Group {
    this._isGenerating = true
    const city = new THREE.Group()
    city.name = 'GeneratedCity'

    const { bounds, blockSize, streetWidth, density, heightVariation, style, centerFocus } = config
    const size = new THREE.Vector3()
    bounds.getSize(size)

    const blocksX = Math.floor(size.x / (blockSize + streetWidth))
    const blocksZ = Math.floor(size.z / (blockSize + streetWidth))

    let buildingCount = 0
    const totalBlocks = blocksX * blocksZ

    for (let bx = 0; bx < blocksX; bx++) {
      for (let bz = 0; bz < blocksZ; bz++) {
        const blockCenter = new THREE.Vector3(
          bounds.min.x + (bx + 0.5) * (blockSize + streetWidth),
          0,
          bounds.min.z + (bz + 0.5) * (blockSize + streetWidth)
        )

        const block = this._generateBlock({
          center: blockCenter,
          size: blockSize,
          density,
          heightVariation,
          style,
          isCenter: centerFocus && bx === Math.floor(blocksX / 2) && bz === Math.floor(blocksZ / 2),
        })

        city.add(block)

        buildingCount++
        this._events.onProgress?.(buildingCount / totalBlocks, buildingCount, totalBlocks)
        this._events.onBlockComplete?.(block, config)
      }
    }

    this._city = city
    this._isGenerating = false
    this._events.onGenerationComplete?.(city)

    return city
  }

  private _generateBlock(config: {
    center: THREE.Vector3
    size: number
    density: number
    heightVariation: number
    style: ArchitectureStyle
    isCenter: boolean
  }): THREE.Group {
    const block = new THREE.Group()
    block.name = 'CityBlock'

    const { center, size, density, heightVariation, style, isCenter } = config
    const halfSize = size * 0.5
    const buildingCount = Math.floor((size * size * density) / 400)

    for (let i = 0; i < buildingCount; i++) {
      const x = this._rng.random() * size - halfSize
      const z = this._rng.random() * size - halfSize

      const distanceFromCenter = Math.sqrt(x * x + z * z)
      const maxDistance = halfSize * 0.9

      if (distanceFromCenter > maxDistance) continue

      const heightMultiplier = isCenter 
        ? 1.5 + this._rng.random() * heightVariation * 2
        : 0.5 + this._rng.random() * heightVariation

      const buildingHeight = THREE.MathUtils.lerp(
        this._config.heightRange![0],
        this._config.heightRange![1],
        heightMultiplier
      )

      const buildingWidth = THREE.MathUtils.lerp(
        this._config.widthRange![0],
        this._config.widthRange![1],
        this._rng.random()
      )

      const buildingDepth = THREE.MathUtils.lerp(
        this._config.depthRange![0],
        this._config.depthRange![1],
        this._rng.random()
      )

      const spec: BuildingSpec = {
        position: new THREE.Vector3(center.x + x, 0, center.z + z),
        width: buildingWidth,
        height: buildingHeight,
        depth: buildingDepth,
        rotation: this._rng.random() * Math.PI * 2,
        style,
        floors: Math.floor(buildingHeight / 4),
        details: this._generateBuildingDetails(style, isCenter),
      }

      const building = this._generateBuilding(spec)
      block.add(building)
      this._buildings.set(building.uuid, building)
      this._events.onBuildingComplete?.(building, spec)
    }

    return block
  }

  private _generateBuildingDetails(style: ArchitectureStyle, isCenter: boolean): BuildingDetails {
    const baseDetails: BuildingDetails = {
      windows: {
        enabled: true,
        spacing: 3 + this._rng.random() * 2,
        size: new THREE.Vector2(1, 1.5),
        glowIntensity: 0.5 + this._rng.random() * 0.5,
        color: this._getWindowColor(style),
        pattern: this._getWindowPattern(style),
      },
      roof: {
        type: this._getRoofType(style),
        height: 2 + this._rng.random() * 4,
        detailLevel: this._rng.random(),
        hasHelipad: isCenter && this._rng.random() > 0.7,
        hasAntenna: isCenter || this._rng.random() > 0.8,
        gardenLevel: this._rng.random() * 0.3,
      },
      base: {
        height: 2 + this._rng.random() * 4,
        detailLevel: this._rng.random(),
        hasEntrance: this._rng.random() > 0.5,
        entranceWidth: 4 + this._rng.random() * 6,
        plazaSize: isCenter ? 20 + this._rng.random() * 20 : 0,
      },
      facade: {
        pattern: this._getFacadePattern(style),
        depth: 0.2 + this._rng.random() * 0.5,
        panelSize: 2 + this._rng.random() * 4,
        grooveDepth: 0.05 + this._rng.random() * 0.15,
        materialVariation: this._rng.random() * 0.3,
      },
      lighting: {
        windowGlow: true,
        accentLights: this._rng.random() > 0.5,
        accentColor: this._getAccentColor(style),
        pulseSpeed: 0.5 + this._rng.random() * 2,
        intensity: 0.3 + this._rng.random() * 0.5,
      },
    }

    return baseDetails
  }

  private _getWindowColor(style: ArchitectureStyle): THREE.Color {
    const colors: Record<ArchitectureStyle, THREE.Color> = {
      brutalist: new THREE.Color(0xffaa00),
      futuristic: new THREE.Color(0x00ffff),
      organic: new THREE.Color(0x88ff88),
      geometric: new THREE.Color(0xffffff),
      minimal: new THREE.Color(0xdddddd),
      industrial: new THREE.Color(0xff8800),
      cyberpunk: new THREE.Color(0xff00ff),
      biomorphic: new THREE.Color(0x00ffaa),
    }
    return colors[style] || colors.futuristic
  }

  private _getWindowPattern(style: ArchitectureStyle): WindowPattern {
    const patterns: Record<ArchitectureStyle, WindowPattern> = {
      brutalist: 'grid',
      futuristic: 'strips',
      organic: 'random',
      geometric: 'grid',
      minimal: 'none',
      industrial: 'grid',
      cyberpunk: 'random',
      biomorphic: 'corner',
    }
    return patterns[style] || 'grid'
  }

  private _getRoofType(style: ArchitectureStyle): RoofType {
    const types: Record<ArchitectureStyle, RoofType> = {
      brutalist: 'flat',
      futuristic: 'domed',
      organic: 'green',
      geometric: 'flat',
      minimal: 'flat',
      industrial: 'flat',
      cyberpunk: 'terraced',
      biomorphic: 'domed',
    }
    return types[style] || 'flat'
  }

  private _getFacadePattern(style: ArchitectureStyle): FacadePattern {
    const patterns: Record<ArchitectureStyle, FacadePattern> = {
      brutalist: 'brutalist',
      futuristic: 'parametric',
      organic: 'organic',
      geometric: 'grid',
      minimal: 'none',
      industrial: 'vertical-strips',
      cyberpunk: 'diagonal',
      biomorphic: 'organic',
    }
    return patterns[style] || 'none'
  }

  private _getAccentColor(style: ArchitectureStyle): THREE.Color {
    const colors: Record<ArchitectureStyle, THREE.Color> = {
      brutalist: new THREE.Color(0xff6600),
      futuristic: new THREE.Color(0x00ffff),
      organic: new THREE.Color(0x44ff44),
      geometric: new THREE.Color(0xffffff),
      minimal: new THREE.Color(0xaaaaaa),
      industrial: new THREE.Color(0xff8800),
      cyberpunk: new THREE.Color(0xff00ff),
      biomorphic: new THREE.Color(0x00ffaa),
    }
    return colors[style] || colors.futuristic
  }

  private _generateBuilding(spec: BuildingSpec): THREE.Group {
    const building = new THREE.Group()
    building.name = `Building_${spec.width.toFixed(0)}x${spec.height.toFixed(0)}x${spec.depth.toFixed(0)}`

    const { width, height, depth, position, rotation, details } = spec
    const halfW = width * 0.5
    const halfD = depth * 0.5

    // Main tower
    const towerGeo = this._getCachedGeometry(`tower-${width}-${height}-${depth}`, () => 
      new THREE.BoxGeometry(width, height, depth)
    )
    const tower = new THREE.Mesh(towerGeo, this._getMaterial('building-base'))
    tower.position.y = height * 0.5
    tower.castShadow = true
    tower.receiveShadow = true
    building.add(tower)

    // Base
    if (details?.base) {
      this._addBase(building, spec, details.base)
    }

    // Facade details
    if (details?.facade) {
      this._addFacade(building, spec, details.facade)
    }

    // Windows
    if (details?.windows?.enabled) {
      this._addWindows(building, spec, details.windows)
    }

    // Roof
    if (details?.roof) {
      this._addRoof(building, spec, details.roof)
    }

    // Lighting
    if (details?.lighting) {
      this._addBuildingLighting(building, spec, details.lighting)
    }

    // Animation
    this._addBuildingAnimation(building, spec)

    // Position and rotation
    building.position.copy(position)
    building.rotation.y = rotation

    return building
  }

  private _addBase(building: THREE.Group, spec: BuildingSpec, base: BaseConfig): void {
    const { width, depth } = spec
    const baseHeight = base.height

    const baseGeo = new THREE.BoxGeometry(width * 1.1, baseHeight, depth * 1.1)
    const baseMesh = new THREE.Mesh(baseGeo, this._getMaterial('building-base'))
    baseMesh.position.y = baseHeight * 0.5
    baseMesh.castShadow = true
    baseMesh.receiveShadow = true
    building.add(baseMesh)

    // Entrance
    if (base.hasEntrance) {
      this._addEntrance(building, spec, base)
    }

    // Plaza
    if (base.plazaSize > 0) {
      this._addPlaza(building, base.plazaSize)
    }
  }

  private _addEntrance(building: THREE.Group, spec: BuildingSpec, base: BaseConfig): void {
    const entranceGeo = new THREE.BoxGeometry(base.entranceWidth, base.height * 0.8, 2)
    const entranceMat = this._getMaterial('accent')
    const entrance = new THREE.Mesh(entranceGeo, entranceMat)
    entrance.position.set(0, base.height * 0.4, spec.depth * 0.55 + 1)
    entrance.castShadow = true
    building.add(entrance)

    // Canopy
    const canopyGeo = new THREE.BoxGeometry(base.entranceWidth + 2, 0.3, 4)
    const canopy = new THREE.Mesh(canopyGeo, this._getMaterial('accent'))
    canopy.position.set(0, base.height * 0.8, spec.depth * 0.55 + 2)
    building.add(canopy)
  }

  private _addPlaza(building: THREE.Group, size: number): void {
    const plazaGeo = new THREE.CylinderGeometry(size, size, 0.2, 32)
    const plazaMat = new THREE.MeshStandardMaterial({
      color: 0x2a2a3a,
      roughness: 0.8,
      metalness: 0.1,
    })
    const plaza = new THREE.Mesh(plazaGeo, plazaMat)
    plaza.position.y = 0.1
    plaza.receiveShadow = true
    building.add(plaza)
  }

  private _addFacade(building: THREE.Group, spec: BuildingSpec, facade: FacadeConfig): void {
    const { width, height, depth } = spec
    const pattern = facade.pattern

    if (pattern === 'none') return

    const detailGeo = this._createFacadeGeometry(spec, facade)
    const detailMesh = new THREE.Mesh(detailGeo, this._getMaterial('building-base'))
    detailMesh.position.y = height * 0.5
    building.add(detailMesh)
  }

  private _createFacadeGeometry(spec: BuildingSpec, facade: FacadeConfig): THREE.BufferGeometry {
    const { width, height, depth } = spec
    const geo = new THREE.BufferGeometry()
    const positions: number[] = []
    const indices: number[] = []

    const panelSize = facade.panelSize
    const grooveDepth = facade.grooveDepth
    const cols = Math.floor(width / panelSize)
    const rows = Math.floor(height / panelSize)

    let vertexIndex = 0

    for (let face = 0; face < 4; face++) {
      const faceWidth = face % 2 === 0 ? width : depth
      const faceCols = Math.floor(faceWidth / panelSize)

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < faceCols; col++) {
          const x = (col / faceCols - 0.5) * faceWidth
          const y = (row / rows - 0.5) * height

          // Add panel vertices with groove
          const offset = (face === 0 || face === 1) ? depth * 0.5 + grooveDepth : -depth * 0.5 - grooveDepth
          const z = face < 2 ? offset : -offset

          positions.push(x - panelSize * 0.5, y - panelSize * 0.5, z)
          positions.push(x + panelSize * 0.5, y - panelSize * 0.5, z)
          positions.push(x + panelSize * 0.5, y + panelSize * 0.5, z)
          positions.push(x - panelSize * 0.5, y + panelSize * 0.5, z)

          indices.push(vertexIndex, vertexIndex + 1, vertexIndex + 2)
          indices.push(vertexIndex, vertexIndex + 2, vertexIndex + 3)
          vertexIndex += 4
        }
      }
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geo.setIndex(indices)
    geo.computeVertexNormals()

    return geo
  }

  private _addWindows(building: THREE.Group, spec: BuildingSpec, windows: WindowConfig): void {
    const { width, height, depth } = spec
    const { spacing, size, glowIntensity, color, pattern } = windows

    const windowGeo = this._getCachedGeometry(
      `window-${size.x}-${size.y}`,
      () => new THREE.PlaneGeometry(size.x, size.y)
    )

    const windowMat = this._getMaterial('window-glass') as THREE.MeshStandardMaterial
    const glowMat = this._getMaterial('window-glow') as THREE.MeshBasicMaterial
    glowMat.color.copy(color)
    glowMat.opacity = glowIntensity

    const cols = Math.floor(width / spacing)
    const rows = Math.floor(height / spacing)

    for (let face = 0; face < 4; face++) {
      const faceWidth = face % 2 === 0 ? width : depth
      const faceCols = Math.floor(faceWidth / spacing)

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < faceCols; col++) {
          if (pattern === 'grid' || (pattern === 'random' && this._rng.random() > 0.3) ||
              (pattern === 'strips' && row % 2 === 0) ||
              (pattern === 'corner' && (col === 0 || col === faceCols - 1))) {

            const x = (col / faceCols - 0.5) * faceWidth
            const y = (row / rows - 0.5) * height
            const z = face < 2 ? depth * 0.501 : -depth * 0.501

            const windowMesh = new THREE.Mesh(windowGeo, windowMat)
            windowMesh.position.set(
              face % 2 === 0 ? x : (face === 1 ? depth * 0.501 : -depth * 0.501),
              y,
              face % 2 === 0 ? (face === 0 ? z : -z) : x
            )
            windowMesh.rotation.y = face === 1 ? Math.PI * 0.5 : face === 2 ? Math.PI : face === 3 ? -Math.PI * 0.5 : 0
            building.add(windowMesh)

            // Glow behind
            const glowMesh = new THREE.Mesh(windowGeo, glowMat)
            glowMesh.position.copy(windowMesh.position)
            glowMesh.rotation.copy(windowMesh.rotation)
            glowMesh.position.z += face < 2 ? 0.01 : -0.01
            building.add(glowMesh)
          }
        }
      }
    }
  }

  private _addRoof(building: THREE.Group, spec: BuildingSpec, roof: RoofConfig): void {
    const { width, height, depth } = spec
    const roofY = height + roof.height * 0.5

    let roofGeo: THREE.BufferGeometry
    let roofMat = this._getMaterial('roof')

    switch (roof.type) {
      case 'flat':
        roofGeo = new THREE.BoxGeometry(width * 1.02, roof.height, depth * 1.02)
        break
      case 'sloped':
        roofGeo = new THREE.ConeGeometry(Math.max(width, depth) * 0.6, roof.height, 4)
        break
      case 'domed':
        roofGeo = new THREE.SphereGeometry(Math.max(width, depth) * 0.55, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.5)
        break
      case 'terraced':
        roofGeo = this._createTerracedRoof(width, depth, roof.height)
        break
      case 'spire':
        roofGeo = new THREE.ConeGeometry(width * 0.3, roof.height * 2, 8)
        break
      case 'green':
        roofGeo = new THREE.BoxGeometry(width * 0.95, 0.5, depth * 0.95)
        roofMat = new THREE.MeshStandardMaterial({
          color: 0x2d5a2d,
          roughness: 0.9,
          metalness: 0,
        })
        break
      default:
        roofGeo = new THREE.BoxGeometry(width, roof.height, depth)
    }

    const roofMesh = new THREE.Mesh(roofGeo, roofMat)
    roofMesh.position.y = roofY
    roofMesh.castShadow = true
    building.add(roofMesh)

    // Helipad
    if (roof.hasHelipad) {
      this._addHelipad(building, roofY + roof.height * 0.5)
    }

    // Antenna
    if (roof.hasAntenna) {
      this._addAntenna(building, roofY + roof.height)
    }
  }

  private _createTerracedRoof(width: number, depth: number, height: number): THREE.BufferGeometry {
    const geo = new THREE.BufferGeometry()
    const positions: number[] = []
    const indices: number[] = []
    const levels = 4
    let vertexIndex = 0

    for (let level = 0; level < levels; level++) {
      const scale = 1 - (level / levels) * 0.5
      const levelHeight = height / levels
      const w = width * scale
      const d = depth * scale
      const y = level * levelHeight

      // Create box for each level
      const boxGeo = new THREE.BoxGeometry(w, levelHeight, d)
      const boxPositions = boxGeo.attributes.position.array as Float32Array

      for (let i = 0; i < boxPositions.length; i += 3) {
        positions.push(
          boxPositions[i],
          boxPositions[i + 1] + y + levelHeight * 0.5,
          boxPositions[i + 2]
        )
      }

      const boxIndices = boxGeo.index?.array as Uint16Array | Uint32Array | undefined
      if (boxIndices) {
        for (let i = 0; i < boxIndices.length; i++) {
          indices.push(vertexIndex + boxIndices[i])
        }
      }

      vertexIndex += boxPositions.length / 3
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geo.setIndex(indices)
    geo.computeVertexNormals()

    return geo
  }

  private _addHelipad(building: THREE.Group, y: number): void {
    const padGeo = new THREE.CylinderGeometry(3, 3, 0.1, 8)
    const padMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3,
      metalness: 0.8,
    })
    const pad = new THREE.Mesh(padGeo, padMat)
    pad.position.y = y
    building.add(pad)

    // H symbol
    const hGeo = new THREE.BoxGeometry(2, 0.05, 0.3)
    const hMat = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    const h1 = new THREE.Mesh(hGeo, hMat)
    h1.position.set(-1, y + 0.01, 0)
    building.add(h1)
    const h2 = h1.clone()
    h2.position.set(1, y + 0.01, 0)
    building.add(h2)
    const h3 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.05, 2), hMat)
    h3.position.set(0, y + 0.01, 0)
    building.add(h3)
  }

  private _addAntenna(building: THREE.Group, y: number): void {
    const antennaGeo = new THREE.CylinderGeometry(0.1, 0.1, 10, 6)
    const antennaMat = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.5,
      metalness: 0.8,
    })
    const antenna = new THREE.Mesh(antennaGeo, antennaMat)
    antenna.position.y = y + 5
    building.add(antenna)

    // Blinking light
    const lightGeo = new THREE.SphereGeometry(0.3, 8, 6)
    const lightMat = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    const light = new THREE.Mesh(lightGeo, lightMat)
    light.position.y = y + 10
    building.add(light)

    gsap.to(light.material, {
      opacity: 0.1,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
    })
  }

  private _addBuildingLighting(building: THREE.Group, spec: BuildingSpec, lighting: BuildingLightingConfig): void {
    if (lighting.windowGlow) {
      this._addWindowGlow(building, spec, lighting)
    }

    if (lighting.accentLights) {
      this._addAccentLights(building, lighting)
    }
  }

  private _addWindowGlow(building: THREE.Group, spec: BuildingSpec, lighting: BuildingLightingConfig): void {
    building.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material.name === 'window-glow') {
        const mat = child.material as THREE.MeshBasicMaterial
        gsap.to(mat, {
          opacity: lighting.intensity,
          duration: 1 / lighting.pulseSpeed,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: Math.random() * 2,
        })
      }
    })
  }

  private _addAccentLights(building: THREE.Group, lighting: BuildingLightingConfig): void {
    building.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material.name === 'accent') {
        const mat = child.material as THREE.MeshStandardMaterial
        gsap.to(mat, {
          emissiveIntensity: 0.8,
          duration: 1 / lighting.pulseSpeed,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: Math.random() * 2,
        })
      }
    })
  }

  private _addBuildingAnimation(building: THREE.Group, spec: BuildingSpec): void {
    const baseScale = building.scale.clone()
    gsap.to(building.scale, {
      x: baseScale.x * 1.002,
      y: baseScale.y * 1.001,
      z: baseScale.z * 1.002,
      duration: 4 + Math.random() * 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: Math.random() * 2,
    })
  }

  public activate(preset?: ArchitecturePreset): this {
    if (preset) {
      this.applyPreset(preset)
    }
    this._city.visible = true
    this._core.scene.add(this._city)
    return this
  }

  public deactivate(): this {
    this._city.visible = false
    this._core.scene.remove(this._city)
    return this
  }

  public applyPreset(preset: ArchitecturePreset): this {
    this._config = { ...this._config, ...preset.config }
    this._initMaterials()
    return this
  }

  public density(value: number): this {
    this._config.density = THREE.MathUtils.clamp(value, 0, 1)
    return this
  }

  public style(style: ArchitectureStyle): this {
    this._config.style = style
    this._initMaterials()
    return this
  }

  public colorScheme(scheme: ColorScheme): this {
    this._config.colorScheme = scheme
    this._initMaterials()
    return this
  }

  public heightRange(min: number, max: number): this {
    this._config.heightRange = [min, max]
    return this
  }

  public gridSize(size: number): this {
    this._config.gridSize = size
    return this
  }

  public variation(amount: number): this {
    this._config.variation = THREE.MathUtils.clamp(amount, 0, 1)
    return this
  }

  public seed(value: number): this {
    this._config.seed = value
    this._rng = new SeededRandom(value)
    return this
  }

  public getCity(): THREE.Group {
    return this._city
  }

  public getBuildings(): THREE.Group[] {
    return Array.from(this._buildings.values())
  }

  public getConfig(): Readonly<ArchitectureConfig> {
    return { ...this._config }
  }

  public setEvents(events: ArchitectureGeneratorEvents): this {
    this._events = { ...this._events, ...events }
    return this
  }

  public dispose(): void {
    this._buildings.clear()
    this._geometryCache.forEach((geo) => geo.dispose())
    this._geometryCache.clear()
    this._materialCache.forEach((mat) => mat.dispose())
    this._materialCache.clear()
    this._city.clear()
  }
}

export interface ColorSchemeColors {
  base: THREE.Color
  window: THREE.Color
  windowGlow: THREE.Color
  accent: THREE.Color
  roof: THREE.Color
  ground: THREE.Color
}

export interface ArchitecturePreset {
  name: string
  config: Partial<ArchitectureConfig>
}

export const architecturePresets: ArchitecturePreset[] = [
  {
    name: 'Corporate Metropolis',
    config: {
      style: 'futuristic',
      colorScheme: 'corporate',
      density: 0.8,
      heightRange: [20, 120],
      gridSize: 50,
    },
  },
  {
    name: 'Cyberpunk Sprawl',
    config: {
      style: 'cyberpunk',
      colorScheme: 'neon',
      density: 0.9,
      heightRange: [10, 200],
      variation: 0.8,
    },
  },
  {
    name: 'Brutalist District',
    config: {
      style: 'brutalist',
      colorScheme: 'monochrome',
      density: 0.6,
      heightRange: [15, 60],
      gridSize: 40,
      variation: 0.2,
    },
  },
  {
    name: 'Organic City',
    config: {
      style: 'organic',
      colorScheme: 'earth',
      density: 0.5,
      heightRange: [8, 50],
      variation: 0.6,
    },
  },
  {
    name: 'Futuristic Skyline',
    config: {
      style: 'futuristic',
      colorScheme: 'corporate',
      density: 0.75,
      heightRange: [30, 150],
      gridSize: 60,
    },
  },
]

class SeededRandom {
  private _seed: number

  constructor(seed: number) {
    this._seed = seed
  }

  random(): number {
    this._seed = (this._seed * 1664525 + 1013904223) % 4294967296
    return this._seed / 4294967296
  }

  randomRange(min: number, max: number): number {
    return min + this.random() * (max - min)
  }

  randomInt(min: number, max: number): number {
    return Math.floor(this.randomRange(min, max + 1))
  }

  choice<T>(array: T[]): T {
    return array[this.randomInt(0, array.length - 1)]
  }
}

export const createArchitectureGenerator = (
  core: EngineCore,
  world: World,
  config?: ArchitectureConfig,
  events?: ArchitectureGeneratorEvents
): ArchitectureGenerator => {
  return new ArchitectureGenerator(core, world, config, events)
}