import * as THREE from 'three'
import { gsap } from 'gsap'
import { EngineCore } from '../core/EngineCore'
import { World } from './World'

export interface TypographyConfig {
  font: string
  fontWeight: number
  size: number
  height: number
  curveSegments: number
  bevelEnabled: boolean
  bevelThickness: number
  bevelSize: number
  bevelOffset: number
  bevelSegments: number
  color: THREE.Color
  emissiveColor: THREE.Color
  emissiveIntensity: number
  materialType: TypographyMaterial
  alignment: TextAlignment
  anchor: TextAnchor
  letterSpacing: number
  lineHeight: number
  maxWidth: number
  wordWrap: boolean
  effects: TypographyEffect[]
  animation: TypographyAnimation
}

export type TypographyMaterial = 'basic' | 'standard' | 'physical' | 'glass' | 'metal' | 'emissive' | 'hologram' | 'neon' | 'chrome' | 'matte'

export type TextAlignment = 'left' | 'center' | 'right' | 'justify'
export type TextAnchor = 'top-left' | 'top-center' | 'top-right' | 'middle-left' | 'middle-center' | 'middle-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

export interface TypographyEffect {
  type: EffectType
  config: Record<string, unknown>
  enabled: boolean
}

export type EffectType = 
  | 'outline' 
  | 'glow' 
  | 'shadow' 
  | 'reflection' 
  | 'distort' 
  | 'wave' 
  | 'noise' 
  | 'scanline' 
  | 'chromatic' 
  | 'hologram' 
  | 'neon-flicker' 
  | 'typewriter' 
  | 'scramble' 
  | 'morph'

export interface TypographyAnimation {
  type: AnimationType
  duration: number
  delay: number
  easing: string
  stagger: number
  loop: boolean
  yoyo: boolean
}

export type AnimationType = 
  | 'none' 
  | 'fade-in' 
  | 'slide-up' 
  | 'slide-down' 
  | 'slide-left' 
  | 'slide-right' 
  | 'scale' 
  | 'rotate' 
  | 'typewriter' 
  | 'scramble' 
  | 'wave' 
  | 'morph' 
  | 'assemble' 
  | 'disassemble' 
  | 'custom'

export interface TextBlock {
  id: string
  text: string
  position: THREE.Vector3
  rotation: THREE.Euler
  scale: THREE.Vector3
  config: Partial<TypographyConfig>
  geometry: THREE.BufferGeometry | null
  mesh: THREE.Mesh | null
  isVisible: boolean
  opacity: number
}

export interface TypographyComposerEvents {
  onTextComplete?: (block: TextBlock) => void
  onAnimationStart?: (block: TextBlock, animation: TypographyAnimation) => void
  onAnimationComplete?: (block: TextBlock) => void
  onEffectChange?: (block: TextBlock, effect: TypographyEffect) => void
}

export const defaultTypographyConfig: TypographyConfig = {
  font: 'Inter',
  fontWeight: 400,
  size: 5,
  height: 0.5,
  curveSegments: 12,
  bevelEnabled: true,
  bevelThickness: 0.1,
  bevelSize: 0.05,
  bevelOffset: 0,
  bevelSegments: 3,
  color: new THREE.Color(0xffffff),
  emissiveColor: new THREE.Color(0x00ffff),
  emissiveIntensity: 0,
  materialType: 'physical',
  alignment: 'center',
  anchor: 'middle-center',
  letterSpacing: 0,
  lineHeight: 1.2,
  maxWidth: 100,
  wordWrap: true,
  effects: [],
  animation: {
    type: 'fade-in',
    duration: 1,
    delay: 0,
    easing: 'power2.out',
    stagger: 0.05,
    loop: false,
    yoyo: false,
  },
}

export class TypographyComposer {
  private _core: EngineCore
  private _world: World
  private _config: TypographyConfig
  private _events: TypographyComposerEvents
  private _blocks: Map<string, TextBlock> = new Map()
  private _font: THREE.Font | null = null
  private _loader: THREE.FontLoader
  private _isFontLoaded = false
  private _materialCache: Map<string, THREE.Material> = new Map()
  private _geometryCache: Map<string, THREE.BufferGeometry> = new Map()

  constructor(core: EngineCore, world: World, config: Partial<TypographyConfig> = {}, events: TypographyComposerEvents = {}) {
    this._core = core
    this._world = world
    this._config = { ...defaultTypographyConfig, ...config }
    this._events = events
    this._loader = new THREE.FontLoader()

    this._loadFont()
  }

  private _loadFont(): void {
    const fontUrls: Record<string, string> = {
      'Inter': '/fonts/Inter_Regular.json',
      'Inter-Bold': '/fonts/Inter_Bold.json',
      'JetBrainsMono': '/fonts/JetBrainsMono_Regular.json',
      'JetBrainsMono-Bold': '/fonts/JetBrainsMono_Bold.json',
      'Geist': '/fonts/Geist_Regular.json',
      'Geist-Bold': '/fonts/Geist_Bold.json',
    }

    const url = fontUrls[this._config.font] || fontUrls['Inter']

    this._loader.load(
      url,
      (font) => {
        this._font = font
        this._isFontLoaded = true
        this._rebuildAllBlocks()
      },
      undefined,
      (error) => {
        console.warn('Failed to load font, using fallback:', error)
        this._createFallbackFont()
      }
    )
  }

  private _createFallbackFont(): void {
    this._font = new THREE.Font({
      family: 'system',
      weight: 'normal',
      style: 'normal',
      glyphs: {},
    } as any)
    this._isFontLoaded = true
    this._rebuildAllBlocks()
  }

  private _rebuildAllBlocks(): void {
    this._blocks.forEach((block) => {
      this._buildBlock(block)
    })
  }

  public setText(id: string, text: string, config?: Partial<TypographyConfig>): this {
    let block = this._blocks.get(id)

    if (!block) {
      block = {
        id,
        text,
        position: new THREE.Vector3(),
        rotation: new THREE.Euler(),
        scale: new THREE.Vector3(1, 1, 1),
        config: config || {},
        geometry: null,
        mesh: null,
        isVisible: true,
        opacity: 1,
      }
      this._blocks.set(id, block)
    } else {
      block.text = text
      if (config) block.config = { ...block.config, ...config }
    }

    this._buildBlock(block)
    return this
  }

  private _buildBlock(block: TextBlock): void {
    if (!this._isFontLoaded || !this._font) return

    const mergedConfig = { ...this._config, ...block.config }
    const { size, height, curveSegments, bevelEnabled, bevelThickness, bevelSize, bevelOffset, bevelSegments, letterSpacing, lineHeight, maxWidth, wordWrap, alignment, anchor } = mergedConfig

    if (block.geometry) {
      block.geometry.dispose()
    }

    if (block.mesh) {
      this._core.scene.remove(block.mesh)
      block.mesh.geometry.dispose()
      if (Array.isArray(block.mesh.material)) {
        block.mesh.material.forEach(m => m.dispose())
      } else {
        block.mesh.material.dispose()
      }
    }

    const shapes = this._font.generateShapes(block.text, size)
    const geometry = new THREE.ShapeGeometry(shapes, curveSegments)
    geometry.computeBoundingBox()

    const bbox = geometry.boundingBox!
    const width = bbox.max.x - bbox.min.x
    const textHeight = bbox.max.y - bbox.min.y

    if (bevelEnabled) {
      const extrudeSettings: THREE.ExtrudeGeometryOptions = {
        depth: height,
        bevelEnabled: true,
        bevelThickness,
        bevelSize,
        bevelOffset,
        bevelSegments,
        curveSegments,
      }
      const extrudeGeo = new THREE.ExtrudeGeometry(shapes, extrudeSettings)
      extrudeGeo.computeBoundingBox()
      block.geometry = extrudeGeo
    } else {
      const extrudeGeo = new THREE.ExtrudeGeometry(shapes, {
        depth: height,
        bevelEnabled: false,
        curveSegments,
      })
      extrudeGeo.computeBoundingBox()
      block.geometry = extrudeGeo
    }

    const material = this._createMaterial(mergedConfig)
    const mesh = new THREE.Mesh(block.geometry, material)
    mesh.castShadow = true
    mesh.receiveShadow = true
    mesh.userData = { blockId: block.id, type: 'text' }

    const anchorOffset = this._calculateAnchorOffset(bbox, anchor, width, textHeight)
    mesh.position.copy(block.position).add(anchorOffset)
    mesh.rotation.copy(block.rotation)
    mesh.scale.copy(block.scale)

    block.mesh = mesh
    this._core.scene.add(mesh)

    if (mergedConfig.animation.type !== 'none') {
      this._animateBlock(block, mergedConfig.animation)
    }

    this._applyEffects(block, mergedConfig.effects)
  }

  private _calculateAnchorOffset(bbox: THREE.Box3, anchor: TextAnchor, width: number, height: number): THREE.Vector3 {
    const offset = new THREE.Vector3()

    if (anchor.includes('left')) offset.x = -width * 0.5
    else if (anchor.includes('center')) offset.x = 0
    else if (anchor.includes('right')) offset.x = width * 0.5

    if (anchor.includes('top')) offset.y = height * 0.5
    else if (anchor.includes('middle')) offset.y = 0
    else if (anchor.includes('bottom')) offset.y = -height * 0.5

    return offset
  }

  private _createMaterial(config: TypographyConfig): THREE.Material {
    const cacheKey = this._getMaterialCacheKey(config)
    if (this._materialCache.has(cacheKey)) {
      return this._materialCache.get(cacheKey)!.clone()
    }

    let material: THREE.Material

    switch (config.materialType) {
      case 'basic':
        material = new THREE.MeshBasicMaterial({
          color: config.color,
          transparent: true,
          opacity: 1,
        })
        break

      case 'standard':
        material = new THREE.MeshStandardMaterial({
          color: config.color,
          metalness: 0.3,
          roughness: 0.7,
          emissive: config.emissiveColor,
          emissiveIntensity: config.emissiveIntensity,
        })
        break

      case 'physical':
        material = new THREE.MeshPhysicalMaterial({
          color: config.color,
          metalness: 0.2,
          roughness: 0.4,
          clearcoat: 0.5,
          clearcoatRoughness: 0.1,
          emissive: config.emissiveColor,
          emissiveIntensity: config.emissiveIntensity,
          transmission: 0.1,
          thickness: 0.5,
        })
        break

      case 'glass':
        material = new THREE.MeshPhysicalMaterial({
          color: config.color,
          metalness: 0,
          roughness: 0,
          transmission: 0.95,
          thickness: 0.5,
          ior: 1.5,
          clearcoat: 1,
          clearcoatRoughness: 0,
          emissive: config.emissiveColor,
          emissiveIntensity: config.emissiveIntensity * 0.5,
        })
        break

      case 'metal':
        material = new THREE.MeshStandardMaterial({
          color: config.color,
          metalness: 1,
          roughness: 0.1,
          emissive: config.emissiveColor,
          emissiveIntensity: config.emissiveIntensity,
        })
        break

      case 'emissive':
        material = new THREE.MeshBasicMaterial({
          color: config.emissiveColor,
          transparent: true,
          opacity: 1,
        })
        break

      case 'hologram':
        material = new THREE.MeshPhysicalMaterial({
          color: config.color,
          metalness: 0,
          roughness: 0.2,
          transmission: 0.5,
          thickness: 0.1,
          clearcoat: 1,
          clearcoatRoughness: 0,
          emissive: config.emissiveColor,
          emissiveIntensity: 1,
          transparent: true,
          opacity: 0.7,
        })
        break

      case 'neon':
        material = new THREE.MeshBasicMaterial({
          color: config.color,
          transparent: true,
          opacity: 1,
        })
        break

      case 'chrome':
        material = new THREE.MeshStandardMaterial({
          color: config.color,
          metalness: 1,
          roughness: 0,
          envMapIntensity: 2,
        })
        break

      case 'matte':
        material = new THREE.MeshStandardMaterial({
          color: config.color,
          metalness: 0,
          roughness: 1,
        })
        break

      default:
        material = new THREE.MeshStandardMaterial({
          color: config.color,
          metalness: 0.3,
          roughness: 0.7,
        })
    }

    this._materialCache.set(cacheKey, material)
    return material.clone()
  }

  private _getMaterialCacheKey(config: TypographyConfig): string {
    return `${config.materialType}-${config.color.getHexString()}-${config.emissiveColor.getHexString()}-${config.emissiveIntensity}`
  }

  private _animateBlock(block: TextBlock, animation: TypographyAnimation): void {
    if (!block.mesh) return

    const { type, duration, delay, easing, stagger, loop, yoyo } = animation

    switch (type) {
      case 'fade-in':
        block.mesh.material.opacity = 0
        gsap.to(block.mesh.material, {
          opacity: block.opacity,
          duration,
          delay,
          ease: easing,
          onComplete: () => this._events.onAnimationComplete?.(block),
        })
        break

      case 'slide-up':
        block.mesh.position.y -= 10
        block.mesh.material.opacity = 0
        gsap.to(block.mesh.position, { y: block.position.y, duration, delay, ease: easing })
        gsap.to(block.mesh.material, { opacity: block.opacity, duration, delay, ease: easing })
        break

      case 'slide-down':
        block.mesh.position.y += 10
        block.mesh.material.opacity = 0
        gsap.to(block.mesh.position, { y: block.position.y, duration, delay, ease: easing })
        gsap.to(block.mesh.material, { opacity: block.opacity, duration, delay, ease: easing })
        break

      case 'slide-left':
        block.mesh.position.x -= 10
        block.mesh.material.opacity = 0
        gsap.to(block.mesh.position, { x: block.position.x, duration, delay, ease: easing })
        gsap.to(block.mesh.material, { opacity: block.opacity, duration, delay, ease: easing })
        break

      case 'slide-right':
        block.mesh.position.x += 10
        block.mesh.material.opacity = 0
        gsap.to(block.mesh.position, { x: block.position.x, duration, delay, ease: easing })
        gsap.to(block.mesh.material, { opacity: block.opacity, duration, delay, ease: easing })
        break

      case 'scale':
        block.mesh.scale.set(0.1, 0.1, 0.1)
        gsap.to(block.mesh.scale, { x: 1, y: 1, z: 1, duration, delay, ease: easing, stagger })
        break

      case 'rotate':
        block.mesh.rotation.x = Math.PI
        gsap.to(block.mesh.rotation, { x: 0, duration, delay, ease: easing, stagger })
        break

      case 'typewriter':
        this._animateTypewriter(block, duration, delay, easing)
        break

      case 'scramble':
        this._animateScramble(block, duration, delay, easing, loop, yoyo)
        break

      case 'wave':
        this._animateWave(block, duration, delay, easing, loop, yoyo)
        break

      case 'morph':
        this._animateMorph(block, duration, delay, easing, loop, yoyo)
        break

      case 'assemble':
        this._animateAssemble(block, duration, delay, easing)
        break

      case 'disassemble':
        this._animateDisassemble(block, duration, delay, easing)
        break
    }

    this._events.onAnimationStart?.(block, animation)
  }

  private _animateTypewriter(block: TextBlock, duration: number, delay: number, easing: string): void {
    if (!block.mesh || !block.geometry) return

    const positions = block.geometry.attributes.position.array as Float32Array
    const vertexCount = positions.length / 3

    const originalPositions = new Float32Array(positions)
    for (let i = 0; i < vertexCount; i++) {
      positions[i * 3 + 1] = -100
    }
    block.geometry.attributes.position.needsUpdate = true

    const chars = block.text.length
    const charVertices = vertexCount / chars

    for (let c = 0; c < chars; c++) {
      const charDelay = delay + (c / chars) * duration
      gsap.to({}, {
        duration: 0,
        delay: charDelay,
        onComplete: () => {
          for (let v = 0; v < charVertices; v++) {
            const idx = c * charVertices + v
            if (idx < vertexCount) {
              positions[idx * 3] = originalPositions[idx * 3]
              positions[idx * 3 + 1] = originalPositions[idx * 3 + 1]
              positions[idx * 3 + 2] = originalPositions[idx * 3 + 2]
            }
          }
          block.geometry!.attributes.position.needsUpdate = true
        },
      })
    }
  }

  private _animateScramble(block: TextBlock, duration: number, delay: number, easing: string, loop: boolean, yoyo: boolean): void {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()'
    const originalText = block.text

    const scramble = () => {
      let progress = 0
      const interval = setInterval(() => {
        progress += 0.1
        let displayText = ''
        for (let i = 0; i < originalText.length; i++) {
          if (Math.random() < progress) {
            displayText += originalText[i]
          } else {
            displayText += chars[Math.floor(Math.random() * chars.length)]
          }
        }
        this.setText(block.id, displayText)

        if (progress >= 1) {
          clearInterval(interval)
          if (loop) {
            setTimeout(scramble, yoyo ? 2000 : 0)
          }
        }
      }, 50)
    }

    setTimeout(scramble, delay * 1000)
  }

  private _animateWave(block: TextBlock, duration: number, delay: number, easing: string, loop: boolean, yoyo: boolean): void {
    if (!block.mesh) return

    const animate = () => {
      gsap.to(block.mesh!.rotation, {
        x: Math.sin(Date.now() * 0.001) * 0.2,
        z: Math.cos(Date.now() * 0.001) * 0.1,
        duration: 0.1,
        ease: 'none',
        onComplete: loop ? animate : undefined,
      })
    }

    setTimeout(animate, delay * 1000)
  }

  private _animateMorph(block: TextBlock, duration: number, delay: number, easing: string, loop: boolean, yoyo: boolean): void {
    if (!block.mesh || !block.geometry) return

    const positions = block.geometry.attributes.position.array as Float32Array
    const originalPositions = new Float32Array(positions)

    const morph = () => {
      const time = Date.now() * 0.001
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] = originalPositions[i + 1] + Math.sin(time * 2 + positions[i] * 0.1) * 0.5
      }
      block.geometry!.attributes.position.needsUpdate = true

      if (loop) {
        requestAnimationFrame(morph)
      }
    }

    setTimeout(morph, delay * 1000)
  }

  private _animateAssemble(block: TextBlock, duration: number, delay: number, easing: string): void {
    if (!block.mesh) return

    block.mesh.scale.set(0, 0, 0)
    const parts: THREE.Vector3[] = []
    const bbox = new THREE.Box3().setFromObject(block.mesh)
    const center = new THREE.Vector3()
    bbox.getCenter(center)

    block.mesh.geometry.computeBoundingBox()
    const geoBbox = block.mesh.geometry.boundingBox!
    const geoCenter = new THREE.Vector3()
    geoBbox.getCenter(geoCenter)

    const positions = block.mesh.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < positions.length; i += 9) {
      const v = new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2])
      v.applyMatrix4(block.mesh.matrixWorld)
      parts.push(v)
    }

    const targetPositions = parts.map(p => p.clone().sub(center))

    parts.forEach((part, i) => {
      const randomPos = new THREE.Vector3(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50
      )
      gsap.to(randomPos, {
        x: targetPositions[i].x,
        y: targetPositions[i].y,
        z: targetPositions[i].z,
        duration,
        delay: delay + i * 0.01,
        ease: easing,
      })
    })
  }

  private _animateDisassemble(block: TextBlock, duration: number, delay: number, easing: string): void {
    if (!block.mesh) return

    gsap.to(block.mesh.scale, {
      x: 0,
      y: 0,
      z: 0,
      duration,
      delay,
      ease: easing,
    })
  }

  private _applyEffects(block: TextBlock, effects: TypographyEffect[]): void {
    if (!block.mesh) return

    effects.forEach((effect) => {
      if (!effect.enabled) return

      switch (effect.type) {
        case 'glow':
          this._applyGlowEffect(block, effect.config)
          break
        case 'outline':
          this._applyOutlineEffect(block, effect.config)
          break
        case 'shadow':
          this._applyShadowEffect(block, effect.config)
          break
        case 'neon-flicker':
          this._applyNeonFlicker(block, effect.config)
          break
        case 'hologram':
          this._applyHologramEffect(block, effect.config)
          break
        case 'distort':
          this._applyDistortEffect(block, effect.config)
          break
      }

      this._events.onEffectChange?.(block, effect)
    })
  }

  private _applyGlowEffect(block: TextBlock, config: Record<string, unknown>): void {
    const intensity = config.intensity as number || 1
    const color = config.color as THREE.Color || new THREE.Color(0x00ffff)

    if (block.mesh!.material instanceof THREE.MeshStandardMaterial) {
      block.mesh!.material.emissive = color
      block.mesh!.material.emissiveIntensity = intensity
    }
  }

  private _applyOutlineEffect(block: TextBlock, config: Record<string, unknown>): void {
    const thickness = config.thickness as number || 0.1
    const color = config.color as THREE.Color || new THREE.Color(0x000000)

    const outlineGeo = block.geometry!.clone()
    const positions = outlineGeo.attributes.position.array as Float32Array
    const normals = outlineGeo.attributes.normal.array as Float32Array

    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += normals[i] * thickness
      positions[i + 1] += normals[i + 1] * thickness
      positions[i + 2] += normals[i + 2] * thickness
    }

    const outlineMat = new THREE.MeshBasicMaterial({
      color,
      side: THREE.BackSide,
    })

    const outlineMesh = new THREE.Mesh(outlineGeo, outlineMat)
    block.mesh!.add(outlineMesh)
  }

  private _applyShadowEffect(block: TextBlock, config: Record<string, unknown>): void {
    block.mesh!.castShadow = true
    block.mesh!.receiveShadow = true
  }

  private _applyNeonFlicker(block: TextBlock, config: Record<string, unknown>): void {
    const speed = config.speed as number || 1
    const intensity = config.intensity as number || 1

    gsap.to(block.mesh!.material, {
      opacity: 0.1,
      duration: 0.1 / speed,
      repeat: -1,
      yoyo: true,
      ease: 'rough({strength: 0.5, points: 10})',
    })

    if (block.mesh!.material instanceof THREE.MeshStandardMaterial) {
      gsap.to(block.mesh!.material, {
        emissiveIntensity: intensity * 2,
        duration: 0.05 / speed,
        repeat: -1,
        yoyo: true,
        ease: 'rough({strength: 0.8, points: 20})',
      })
    }
  }

  private _applyHologramEffect(block: TextBlock, config: Record<string, unknown>): void {
    const scanSpeed = config.scanSpeed as number || 1

    const scanLine = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 0.5),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(0x00ffff),
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    )
    scanLine.rotation.x = -Math.PI / 2
    block.mesh!.add(scanLine)

    gsap.to(scanLine.position, {
      y: 10,
      duration: 2 / scanSpeed,
      repeat: -1,
      ease: 'none',
    })
  }

  private _applyDistortEffect(block: TextBlock, config: Record<string, unknown>): void {
    const strength = config.strength as number || 0.5
    const speed = config.speed as number || 1

    const originalPositions = new Float32Array(block.geometry!.attributes.position.array)

    const distort = () => {
      const time = Date.now() * 0.001 * speed
      const positions = block.geometry!.attributes.position.array as Float32Array

      for (let i = 0; i < positions.length; i += 3) {
        const noise = Math.sin(time + positions[i] * 0.1) * Math.cos(time + positions[i + 2] * 0.1)
        positions[i] = originalPositions[i] + noise * strength
        positions[i + 1] = originalPositions[i + 1] + noise * strength * 0.5
        positions[i + 2] = originalPositions[i + 2] + noise * strength
      }

      block.geometry!.attributes.position.needsUpdate = true
      requestAnimationFrame(distort)
    }

    distort()
  }

  public setPosition(id: string, position: THREE.Vector3): this {
    const block = this._blocks.get(id)
    if (block && block.mesh) {
      block.position.copy(position)
      block.mesh.position.lerp(position, 0.1)
    }
    return this
  }

  public setRotation(id: string, rotation: THREE.Euler): this {
    const block = this._blocks.get(id)
    if (block && block.mesh) {
      block.rotation.copy(rotation)
      block.mesh.rotation.copy(rotation)
    }
    return this
  }

  public setScale(id: string, scale: THREE.Vector3): this {
    const block = this._blocks.get(id)
    if (block && block.mesh) {
      block.scale.copy(scale)
      block.mesh.scale.copy(scale)
    }
    return this
  }

  public setOpacity(id: string, opacity: number): this {
    const block = this._blocks.get(id)
    if (block && block.mesh) {
      block.opacity = opacity
      block.mesh.material.opacity = opacity
      block.mesh.material.transparent = opacity < 1
    }
    return this
  }

  public setColor(id: string, color: THREE.Color): this {
    const block = this._blocks.get(id)
    if (block && block.mesh) {
      block.config.color = color
      block.mesh.material.color.copy(color)
    }
    return this
  }

  public setEmissive(id: string, color: THREE.Color, intensity: number): this {
    const block = this._blocks.get(id)
    if (block && block.mesh && block.mesh.material instanceof THREE.MeshStandardMaterial) {
      block.config.emissiveColor = color
      block.config.emissiveIntensity = intensity
      block.mesh.material.emissive = color
      block.mesh.material.emissiveIntensity = intensity
    }
    return this
  }

  public show(id: string): this {
    const block = this._blocks.get(id)
    if (block && block.mesh) {
      block.isVisible = true
      block.mesh.visible = true
    }
    return this
  }

  public hide(id: string): this {
    const block = this._blocks.get(id)
    if (block && block.mesh) {
      block.isVisible = false
      block.mesh.visible = false
    }
    return this
  }

  public animate(id: string, animation: Partial<TypographyAnimation>): this {
    const block = this._blocks.get(id)
    if (block) {
      block.config.animation = { ...block.config.animation, ...animation }
      if (block.mesh) {
        this._animateBlock(block, block.config.animation)
      }
    }
    return this
  }

  public morphTo(id: string, newText: string, duration: number = 1): this {
    const block = this._blocks.get(id)
    if (block) {
      const oldText = block.text
      block.text = newText
      this._buildBlock(block)

      gsap.from(block.mesh!.scale, {
        x: 0.5,
        y: 0.5,
        z: 0.5,
        duration,
        ease: 'elastic.out(1, 0.5)',
      })
    }
    return this
  }

  public getBlock(id: string): TextBlock | undefined {
    return this._blocks.get(id)
  }

  public getAllBlocks(): TextBlock[] {
    return Array.from(this._blocks.values())
  }

  public removeBlock(id: string): this {
    const block = this._blocks.get(id)
    if (block) {
      if (block.mesh) {
        this._core.scene.remove(block.mesh)
        block.mesh.geometry.dispose()
        if (Array.isArray(block.mesh.material)) {
          block.mesh.material.forEach(m => m.dispose())
        } else {
          block.mesh.material.dispose()
        }
      }
      if (block.geometry) {
        block.geometry.dispose()
      }
      this._blocks.delete(id)
    }
    return this
  }

  public clear(): this {
    this._blocks.forEach((_, id) => this.removeBlock(id))
    return this
  }

  public setConfig(config: Partial<TypographyConfig>): this {
    this._config = { ...this._config, ...config }
    return this
  }

  public getConfig(): Readonly<TypographyConfig> {
    return { ...this._config }
  }

  public setEvents(events: TypographyComposerEvents): this {
    this._events = { ...this._events, ...events }
    return this
  }

  public dispose(): void {
    this.clear()
    this._materialCache.forEach((mat) => mat.dispose())
    this._materialCache.clear()
    this._geometryCache.forEach((geo) => geo.dispose())
    this._geometryCache.clear()
  }
}

export const createTypographyComposer = (
  core: EngineCore,
  world: World,
  config?: Partial<TypographyConfig>,
  events?: TypographyComposerEvents
): TypographyComposer => {
  return new TypographyComposer(core, world, config, events)
}

export const typographyPresets = {
  hero: (): Partial<TypographyConfig> => ({
    font: 'Inter-Bold',
    fontWeight: 700,
    size: 12,
    height: 1,
    color: new THREE.Color(0xffffff),
    emissiveColor: new THREE.Color(0x00ffff),
    emissiveIntensity: 0.5,
    materialType: 'physical',
    alignment: 'center',
    anchor: 'middle-center',
    letterSpacing: 0.1,
    effects: [
      { type: 'glow', config: { intensity: 1, color: new THREE.Color(0x00ffff) }, enabled: true },
      { type: 'hologram', config: { scanSpeed: 0.5 }, enabled: true },
    ],
    animation: { type: 'assemble', duration: 2, delay: 0, easing: 'elastic.out(1, 0.5)', stagger: 0.02, loop: false, yoyo: false },
  }),

  neon: (): Partial<TypographyConfig> => ({
    font: 'Geist-Bold',
    fontWeight: 700,
    size: 8,
    height: 0.5,
    color: new THREE.Color(0xff00ff),
    emissiveColor: new THREE.Color(0xff00ff),
    emissiveIntensity: 2,
    materialType: 'neon',
    alignment: 'center',
    anchor: 'middle-center',
    effects: [
      { type: 'glow', config: { intensity: 3, color: new THREE.Color(0xff00ff) }, enabled: true },
      { type: 'neon-flicker', config: { speed: 2, intensity: 2 }, enabled: true },
    ],
    animation: { type: 'fade-in', duration: 1, delay: 0, easing: 'power2.out', stagger: 0, loop: false, yoyo: false },
  }),

  hologram: (): Partial<TypographyConfig> => ({
    font: 'JetBrainsMono',
    fontWeight: 400,
    size: 6,
    height: 0.3,
    color: new THREE.Color(0x00ffff),
    emissiveColor: new THREE.Color(0x00ffff),
    emissiveIntensity: 1,
    materialType: 'hologram',
    alignment: 'left',
    anchor: 'middle-left',
    effects: [
      { type: 'hologram', config: { scanSpeed: 1 }, enabled: true },
      { type: 'distort', config: { strength: 0.2, speed: 1 }, enabled: true },
    ],
    animation: { type: 'fade-in', duration: 1.5, delay: 0, easing: 'power2.out', stagger: 0.03, loop: false, yoyo: false },
  }),

  chrome: (): Partial<TypographyConfig> => ({
    font: 'Inter-Bold',
    fontWeight: 700,
    size: 10,
    height: 0.8,
    color: new THREE.Color(0xcccccc),
    emissiveColor: new THREE.Color(0xffffff),
    emissiveIntensity: 0.3,
    materialType: 'chrome',
    alignment: 'center',
    anchor: 'middle-center',
    bevelEnabled: true,
    bevelThickness: 0.2,
    bevelSize: 0.1,
    animation: { type: 'slide-up', duration: 1.5, delay: 0.3, easing: 'elastic.out(1, 0.5)', stagger: 0.05, loop: false, yoyo: false },
  }),

  data: (): Partial<TypographyConfig> => ({
    font: 'JetBrainsMono',
    fontWeight: 400,
    size: 4,
    height: 0.2,
    color: new THREE.Color(0x00ff88),
    emissiveColor: new THREE.Color(0x00ff88),
    emissiveIntensity: 0.5,
    materialType: 'emissive',
    alignment: 'left',
    anchor: 'top-left',
    letterSpacing: 0.05,
    lineHeight: 1.5,
    effects: [
      { type: 'glow', config: { intensity: 0.5, color: new THREE.Color(0x00ff88) }, enabled: true },
      { type: 'scanline', config: {}, enabled: true },
    ],
    animation: { type: 'typewriter', duration: 2, delay: 0, easing: 'none', stagger: 0.02, loop: false, yoyo: false },
  }),
}