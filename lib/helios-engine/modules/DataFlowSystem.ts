import * as THREE from 'three'
import { gsap } from 'gsap'
import { EngineCore } from '../core/EngineCore'
import { World } from './World'
import { ParticleField, ParticleFieldConfig, particlePresets } from './ParticleField'

export interface DataFlowConfig {
  nodes: DataNode[]
  edges: DataEdge[]
  flowSpeed: number
  particleSize: number
  particleColor: THREE.Color | THREE.Color[]
  glowIntensity: number
  pathResolution: number
  autoLayout: boolean
  layoutAlgorithm: LayoutAlgorithm
  clustering: boolean
  clusterRadius: number
  showLabels: boolean
  labelSize: number
  interactive: boolean
  highlightOnHover: boolean
  pulseOnData: boolean
}

export type LayoutAlgorithm = 'force' | 'hierarchical' | 'circular' | 'grid' | 'organic' | 'geo' | 'custom'

export interface DataNode {
  id: string
  position: THREE.Vector3
  type: NodeType
  size: number
  color: THREE.Color
  label: string
  data: Record<string, unknown>
  connections: string[]
  isActive: boolean
  pulseIntensity: number
}

export type NodeType = 
  | 'source' 
  | 'target' 
  | 'processor' 
  | 'storage' 
  | 'gateway' 
  | 'sensor' 
  | 'actuator' 
  | 'hub' 
  | 'custom'

export interface DataEdge {
  id: string
  source: string
  target: string
  type: EdgeType
  weight: number
  color: THREE.Color
  flowDirection: FlowDirection
  dataRate: number
  isActive: boolean
  path?: THREE.Vector3[]
}

export type EdgeType = 'data' | 'control' | 'sync' | 'stream' | 'batch' | 'event'
export type FlowDirection = 'forward' | 'backward' | 'bidirectional'

export interface DataFlowEvents {
  onNodeActivate?: (node: DataNode) => void
  onNodeDeactivate?: (node: DataNode) => void
  onEdgeActivate?: (edge: DataEdge) => void
  onDataPulse?: (edge: DataEdge, amount: number) => void
  onLayoutComplete?: (nodes: DataNode[]) => void
  onClusterFormed?: (clusterId: string, nodes: DataNode[]) => void
}

export class DataFlowSystem {
  private _core: EngineCore
  private _world: World
  private _config: DataFlowConfig
  private _events: DataFlowEvents
  private _nodes: Map<string, DataNode> = new Map()
  private _edges: Map<string, DataEdge> = new Map()
  private _nodeMeshes: Map<string, THREE.Mesh> = new Map()
  private _edgeLines: Map<string, THREE.Line> = new Map()
  private _edgeParticles: Map<string, ParticleField> = new Map()
  private _labelSprites: Map<string, THREE.Sprite> = new Map()
  private _layoutForce: ForceDirectedLayout | null = null
  private _isAnimating = false
  private _time = 0
  private _dataPulseQueue: Array<{ edgeId: string; amount: number; time: number }> = []

  constructor(core: EngineCore, world: World, config: Partial<DataFlowConfig> = {}, events: DataFlowEvents = {}) {
    this._core = core
    this._world = world
    this._config = {
      nodes: [],
      edges: [],
      flowSpeed: 5,
      particleSize: 0.1,
      particleColor: new THREE.Color(0x00ffff),
      glowIntensity: 1,
      pathResolution: 20,
      autoLayout: true,
      layoutAlgorithm: 'force',
      clustering: false,
      clusterRadius: 10,
      showLabels: true,
      labelSize: 1,
      interactive: true,
      highlightOnHover: true,
      pulseOnData: true,
      ...config,
    }
    this._events = events

    this._initializeNodes()
    this._initializeEdges()
    this._createVisuals()

    if (this._config.autoLayout) {
      this._applyLayout()
    }
  }

  private _initializeNodes(): void {
    this._config.nodes.forEach((nodeData) => {
      const node: DataNode = {
        id: nodeData.id,
        position: nodeData.position.clone(),
        type: nodeData.type,
        size: nodeData.size,
        color: nodeData.color.clone(),
        label: nodeData.label,
        data: { ...nodeData.data },
        connections: [...nodeData.connections],
        isActive: nodeData.isActive,
        pulseIntensity: 0,
      }
      this._nodes.set(node.id, node)
    })
  }

  private _initializeEdges(): void {
    this._config.edges.forEach((edgeData) => {
      const edge: DataEdge = {
        id: edgeData.id,
        source: edgeData.source,
        target: edgeData.target,
        type: edgeData.type,
        weight: edgeData.weight,
        color: edgeData.color.clone(),
        flowDirection: edgeData.flowDirection,
        dataRate: edgeData.dataRate,
        isActive: edgeData.isActive,
        path: edgeData.path?.map(p => p.clone()),
      }
      this._edges.set(edge.id, edge)

      if (!edge.path || edge.path.length === 0) {
        this._calculateEdgePath(edge)
      }
    })
  }

  private _calculateEdgePath(edge: DataEdge): void {
    const sourceNode = this._nodes.get(edge.source)
    const targetNode = this._nodes.get(edge.target)

    if (!sourceNode || !targetNode) return

    const start = sourceNode.position.clone()
    const end = targetNode.position.clone()

    const path: THREE.Vector3[] = []

    switch (this._config.layoutAlgorithm) {
      case 'force':
      case 'organic':
        path.push(...this._generateCurvedPath(start, end))
        break
      case 'hierarchical':
        path.push(...this._generateHierarchicalPath(start, end))
        break
      default:
        path.push(start, end)
    }

    edge.path = path
  }

  private _generateCurvedPath(start: THREE.Vector3, end: THREE.Vector3): THREE.Vector3[] {
    const path: THREE.Vector3[] = []
    const mid = new THREE.Vector3().lerpVectors(start, end, 0.5)
    const offset = new THREE.Vector3(
      (Math.random() - 0.5) * 10,
      Math.random() * 10 + 5,
      (Math.random() - 0.5) * 10
    )
    mid.add(offset)

    const curve = new THREE.QuadraticBezierCurve3(start, mid, end)
    const points = curve.getPoints(this._config.pathResolution)
    path.push(...points)

    return path
  }

  private _generateHierarchicalPath(start: THREE.Vector3, end: THREE.Vector3): THREE.Vector3[] {
    const path: THREE.Vector3[] = []
    const midY = Math.max(start.y, end.y) + 5

    path.push(start.clone())
    path.push(new THREE.Vector3(start.x, midY, start.z))
    path.push(new THREE.Vector3(end.x, midY, end.z))
    path.push(end.clone())

    return path
  }

  private _createVisuals(): void {
    this._createNodeMeshes()
    this._createEdgeLines()
    this._createEdgeParticles()
    if (this._config.showLabels) {
      this._createLabels()
    }
  }

  private _createNodeMeshes(): void {
    this._nodes.forEach((node) => {
      const geometry = this._getNodeGeometry(node.type, node.size)
      const material = new THREE.MeshStandardMaterial({
        color: node.color,
        emissive: node.color,
        emissiveIntensity: node.isActive ? node.pulseIntensity : 0,
        metalness: 0.5,
        roughness: 0.3,
        transparent: true,
        opacity: 0.9,
      })

      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.copy(node.position)
      mesh.userData = { nodeId: node.id, type: 'node' }
      mesh.castShadow = true
      mesh.receiveShadow = true

      this._nodeMeshes.set(node.id, mesh)
      this._core.scene.add(mesh)
    })
  }

  private _getNodeGeometry(type: NodeType, size: number): THREE.BufferGeometry {
    switch (type) {
      case 'source':
        return new THREE.ConeGeometry(size, size * 2, 6)
      case 'target':
        return new THREE.CylinderGeometry(size * 0.8, size * 1.2, size * 1.5, 6)
      case 'processor':
        return new THREE.BoxGeometry(size, size, size)
      case 'storage':
        return new THREE.CylinderGeometry(size, size, size * 2, 8)
      case 'gateway':
        return new THREE.TorusGeometry(size, size * 0.3, 8, 16)
      case 'sensor':
        return new THREE.SphereGeometry(size * 0.8, 16, 16)
      case 'actuator':
        return new THREE.OctahedronGeometry(size)
      case 'hub':
        return new THREE.IcosahedronGeometry(size, 1)
      default:
        return new THREE.BoxGeometry(size, size, size)
    }
  }

  private _createEdgeLines(): void {
    this._edges.forEach((edge) => {
      if (!edge.path || edge.path.length === 0) return

      const positions: number[] = []
      edge.path.forEach((point) => {
        positions.push(point.x, point.y, point.z)
      })

      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))

      const material = new THREE.LineBasicMaterial({
        color: edge.color,
        opacity: edge.isActive ? 0.6 : 0.2,
        transparent: true,
        linewidth: 2,
      })

      const line = new THREE.Line(geometry, material)
      line.userData = { edgeId: edge.id, type: 'edge' }

      this._edgeLines.set(edge.id, line)
      this._core.scene.add(line)
    })
  }

  private _createEdgeParticles(): void {
    this._edges.forEach((edge) => {
      if (!edge.path || edge.path.length < 2) return

      const bounds = new THREE.Box3()
      edge.path.forEach(p => bounds.expandByPoint(p))
      bounds.expandByScalar(2)

      const particleConfig = particlePresets.dataFlow(bounds)
      particleConfig.color = edge.color
      particleConfig.spawnRate = edge.dataRate * 10

      const particles = new ParticleField(this._core, this._world, particleConfig, {
        onParticleSpawn: (particle) => {
          particle.customData.set('edgeId', edge.id)
        },
      })

      particles.play()
      this._edgeParticles.set(edge.id, particles)
    })
  }

  private _createLabels(): void {
    this._nodes.forEach((node) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!
      canvas.width = 256
      canvas.height = 64
      ctx.font = 'bold 32px Inter, sans-serif'
      ctx.fillStyle = '#ffffff'
      ctx.textAlign = 'center'
      ctx.fillText(node.label, 128, 40)

      const texture = new THREE.CanvasTexture(canvas)
      texture.needsUpdate = true

      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthTest: false,
      })

      const sprite = new THREE.Sprite(material)
      sprite.position.copy(node.position)
      sprite.position.y += node.size + 2
      sprite.scale.set(this._config.labelSize * 5, this._config.labelSize * 2, 1)
      sprite.userData = { nodeId: node.id, type: 'label' }

      this._labelSprites.set(node.id, sprite)
      this._core.scene.add(sprite)
    })
  }

  private _applyLayout(): void {
    switch (this._config.layoutAlgorithm) {
      case 'force':
        this._applyForceLayout()
        break
      case 'hierarchical':
        this._applyHierarchicalLayout()
        break
      case 'circular':
        this._applyCircularLayout()
        break
      case 'grid':
        this._applyGridLayout()
        break
      case 'organic':
        this._applyOrganicLayout()
        break
    }
    this._events.onLayoutComplete?.(Array.from(this._nodes.values()))
  }

  private _applyForceLayout(): void {
    this._layoutForce = new ForceDirectedLayout(
      Array.from(this._nodes.values()),
      Array.from(this._edges.values()),
      {
        width: 100,
        height: 50,
        depth: 100,
        iterations: 200,
        repulsion: 500,
        attraction: 0.1,
        damping: 0.9,
      }
    )
    this._layoutForce.run()
  }

  private _applyHierarchicalLayout(): void {
    const levels = new Map<number, DataNode[]>()
    this._nodes.forEach((node) => {
      const level = (node.data.level as number) || 0
      if (!levels.has(level)) levels.set(level, [])
      levels.get(level)!.push(node)
    })

    const sortedLevels = Array.from(levels.keys()).sort((a, b) => a - b)
    sortedLevels.forEach((level, i) => {
      const nodes = levels.get(level)!
      const y = i * 20
      nodes.forEach((node, j) => {
        node.position.set((j - nodes.length / 2) * 15, y, 0)
      })
    })
  }

  private _applyCircularLayout(): void {
    const nodes = Array.from(this._nodes.values())
    const radius = 30
    nodes.forEach((node, i) => {
      const angle = (i / nodes.length) * Math.PI * 2
      node.position.set(
        Math.cos(angle) * radius,
        5 + Math.random() * 10,
        Math.sin(angle) * radius
      )
    })
  }

  private _applyGridLayout(): void {
    const nodes = Array.from(this._nodes.values())
    const cols = Math.ceil(Math.sqrt(nodes.length))
    const spacing = 15
    nodes.forEach((node, i) => {
      const col = i % cols
      const row = Math.floor(i / cols)
      node.position.set(
        (col - cols / 2) * spacing,
        5,
        (row - cols / 2) * spacing
      )
    })
  }

  private _applyOrganicLayout(): void {
    this._layoutForce = new ForceDirectedLayout(
      Array.from(this._nodes.values()),
      Array.from(this._edges.values()),
      {
        width: 150,
        height: 80,
        depth: 150,
        iterations: 300,
        repulsion: 800,
        attraction: 0.05,
        damping: 0.85,
      }
    )
    this._layoutForce.run()
  }

  public update(deltaTime: number): void {
    this._time += deltaTime

    this._nodes.forEach((node) => {
      const mesh = this._nodeMeshes.get(node.id)
      if (mesh) {
        mesh.position.lerp(node.position, 0.1)

        if (node.pulseIntensity > 0) {
          const mat = mesh.material as THREE.MeshStandardMaterial
          mat.emissiveIntensity = node.pulseIntensity * Math.sin(this._time * 5) * 0.5 + node.pulseIntensity * 0.5
          node.pulseIntensity *= 0.98
        }

        const scale = 1 + Math.sin(this._time * 2 + node.id.length) * 0.02
        mesh.scale.setScalar(scale)
      }

      const label = this._labelSprites.get(node.id)
      if (label) {
        label.position.lerp(node.position.clone().setY(node.position.y + node.size + 2), 0.1)
        label.lookAt(this._core.camera.position)
      }
    })

    this._edges.forEach((edge) => {
      const particles = this._edgeParticles.get(edge.id)
      if (particles) {
        particles.update(deltaTime)
      }

      const line = this._edgeLines.get(edge.id)
      if (line && edge.path) {
        const positions = line.geometry.attributes.position.array as Float32Array
        const sourceNode = this._nodes.get(edge.source)
        const targetNode = this._nodes.get(edge.target)

        if (sourceNode && targetNode) {
          positions[0] = sourceNode.position.x
          positions[1] = sourceNode.position.y
          positions[2] = sourceNode.position.z

          positions[positions.length - 3] = targetNode.position.x
          positions[positions.length - 2] = targetNode.position.y
          positions[positions.length - 1] = targetNode.position.z

          line.geometry.attributes.position.needsUpdate = true
        }
      }
    })

    this._processDataPulses(deltaTime)
  }

  private _processDataPulses(deltaTime: number): void {
    const now = this._time
    this._dataPulseQueue = this._dataPulseQueue.filter((pulse) => {
      if (pulse.time <= now) {
        const edge = this._edges.get(pulse.edgeId)
        if (edge) {
          this._triggerEdgePulse(edge, pulse.amount)
        }
        return false
      }
      return true
    })
  }

  private _triggerEdgePulse(edge: DataEdge, amount: number): void {
    edge.isActive = true
    const particles = this._edgeParticles.get(edge.id)
    if (particles) {
      particles.setSpawnRate(edge.dataRate * 10 * (1 + amount))
    }

    const line = this._edgeLines.get(edge.id)
    if (line) {
      const mat = line.material as THREE.LineBasicMaterial
      gsap.to(mat, { opacity: 1, duration: 0.1, yoyo: true, repeat: 1 })
    }

    const sourceNode = this._nodes.get(edge.source)
    const targetNode = this._nodes.get(edge.target)
    if (sourceNode) sourceNode.pulseIntensity += amount * 0.5
    if (targetNode) targetNode.pulseIntensity += amount * 0.3

    this._events.onDataPulse?.(edge, amount)
  }

  public pulseData(edgeId: string, amount: number, delay: number = 0): this {
    this._dataPulseQueue.push({
      edgeId,
      amount,
      time: this._time + delay,
    })
    return this
  }

  public activateNode(nodeId: string): this {
    const node = this._nodes.get(nodeId)
    if (node) {
      node.isActive = true
      node.pulseIntensity = 1
      const mesh = this._nodeMeshes.get(nodeId)
      if (mesh) {
        const mat = mesh.material as THREE.MeshStandardMaterial
        gsap.to(mat, { emissiveIntensity: 1, duration: 0.5 })
      }
      this._events.onNodeActivate?.(node)
    }
    return this
  }

  public deactivateNode(nodeId: string): this {
    const node = this._nodes.get(nodeId)
    if (node) {
      node.isActive = false
      const mesh = this._nodeMeshes.get(nodeId)
      if (mesh) {
        const mat = mesh.material as THREE.MeshStandardMaterial
        gsap.to(mat, { emissiveIntensity: 0, duration: 0.5 })
      }
      this._events.onNodeDeactivate?.(node)
    }
    return this
  }

  public activateEdge(edgeId: string): this {
    const edge = this._edges.get(edgeId)
    if (edge) {
      edge.isActive = true
      const line = this._edgeLines.get(edgeId)
      if (line) {
        const mat = line.material as THREE.LineBasicMaterial
        gsap.to(mat, { opacity: 0.8, duration: 0.3 })
      }
      const particles = this._edgeParticles.get(edgeId)
      if (particles) particles.play()
      this._events.onEdgeActivate?.(edge)
    }
    return this
  }

  public deactivateEdge(edgeId: string): this {
    const edge = this._edges.get(edgeId)
    if (edge) {
      edge.isActive = false
      const line = this._edgeLines.get(edgeId)
      if (line) {
        const mat = line.material as THREE.LineBasicMaterial
        gsap.to(mat, { opacity: 0.1, duration: 0.3 })
      }
      const particles = this._edgeParticles.get(edgeId)
      if (particles) particles.pause()
    }
    return this
  }

  public addNode(node: DataNode): this {
    this._nodes.set(node.id, node)
    const geometry = this._getNodeGeometry(node.type, node.size)
    const material = new THREE.MeshStandardMaterial({
      color: node.color,
      emissive: node.color,
      emissiveIntensity: 0,
      metalness: 0.5,
      roughness: 0.3,
    })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.copy(node.position)
    this._nodeMeshes.set(node.id, mesh)
    this._core.scene.add(mesh)
    return this
  }

  public removeNode(nodeId: string): this {
    const node = this._nodes.get(nodeId)
    if (node) {
      this._nodes.delete(nodeId)
      const mesh = this._nodeMeshes.get(nodeId)
      if (mesh) {
        this._core.scene.remove(mesh)
        mesh.geometry.dispose()
        ;(mesh.material as THREE.Material).dispose()
        this._nodeMeshes.delete(nodeId)
      }
      const label = this._labelSprites.get(nodeId)
      if (label) {
        this._core.scene.remove(label)
        ;(label.material as THREE.Material).dispose()
        this._labelSprites.delete(nodeId)
      }
    }
    return this
  }

  public addEdge(edge: DataEdge): this {
    this._edges.set(edge.id, edge)
    this._calculateEdgePath(edge)

    if (edge.path) {
      const positions: number[] = []
      edge.path.forEach((point) => {
        positions.push(point.x, point.y, point.z)
      })
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
      const material = new THREE.LineBasicMaterial({
        color: edge.color,
        opacity: 0.2,
        transparent: true,
      })
      const line = new THREE.Line(geometry, material)
      this._edgeLines.set(edge.id, line)
      this._core.scene.add(line)

      const bounds = new THREE.Box3()
      edge.path.forEach(p => bounds.expandByPoint(p))
      bounds.expandByScalar(2)

      const particleConfig = particlePresets.dataFlow(bounds)
      particleConfig.color = edge.color
      particleConfig.spawnRate = edge.dataRate * 10
      const particles = new ParticleField(this._core, this._world, particleConfig)
      particles.play()
      this._edgeParticles.set(edge.id, particles)
    }
    return this
  }

  public removeEdge(edgeId: string): this {
    const edge = this._edges.get(edgeId)
    if (edge) {
      this._edges.delete(edgeId)
      const line = this._edgeLines.get(edgeId)
      if (line) {
        this._core.scene.remove(line)
        line.geometry.dispose()
        ;(line.material as THREE.Material).dispose()
        this._edgeLines.delete(edgeId)
      }
      const particles = this._edgeParticles.get(edgeId)
      if (particles) {
        particles.dispose()
        this._edgeParticles.delete(edgeId)
      }
    }
    return this
  }

  public setLayout(algorithm: LayoutAlgorithm): this {
    this._config.layoutAlgorithm = algorithm
    this._applyLayout()
    return this
  }

  public setFlowSpeed(speed: number): this {
    this._config.flowSpeed = speed
    this._edgeParticles.forEach((particles) => {
      particles.setConfig({ velocity: new THREE.Vector3(0, 0, speed) })
    })
    return this
  }

  public setParticleColor(color: THREE.Color | THREE.Color[]): this {
    this._config.particleColor = color
    this._edgeParticles.forEach((particles) => {
      particles.setColor(color)
    })
    return this
  }

  public highlightNode(nodeId: string, highlight: boolean): this {
    const mesh = this._nodeMeshes.get(nodeId)
    if (mesh) {
      const mat = mesh.material as THREE.MeshStandardMaterial
      gsap.to(mat, { emissiveIntensity: highlight ? 1.5 : 0, duration: 0.3 })
      gsap.to(mesh.scale, { x: highlight ? 1.2 : 1, y: highlight ? 1.2 : 1, z: highlight ? 1.2 : 1, duration: 0.3 })
    }
    return this
  }

  public getNode(nodeId: string): DataNode | undefined {
    return this._nodes.get(nodeId)
  }

  public getEdge(edgeId: string): DataEdge | undefined {
    return this._edges.get(edgeId)
  }

  public getAllNodes(): DataNode[] {
    return Array.from(this._nodes.values())
  }

  public getAllEdges(): DataEdge[] {
    return Array.from(this._edges.values())
  }

  public getConfig(): Readonly<DataFlowConfig> {
    return { ...this._config }
  }

  public setEvents(events: DataFlowEvents): this {
    this._events = { ...this._events, ...events }
    return this
  }

  public dispose(): void {
    this._nodeMeshes.forEach((mesh) => {
      this._core.scene.remove(mesh)
      mesh.geometry.dispose()
      ;(mesh.material as THREE.Material).dispose()
    })
    this._nodeMeshes.clear()

    this._edgeLines.forEach((line) => {
      this._core.scene.remove(line)
      line.geometry.dispose()
      ;(line.material as THREE.Material).dispose()
    })
    this._edgeLines.clear()

    this._edgeParticles.forEach((particles) => {
      particles.dispose()
    })
    this._edgeParticles.clear()

    this._labelSprites.forEach((sprite) => {
      this._core.scene.remove(sprite)
      ;(sprite.material as THREE.Material).dispose()
    })
    this._labelSprites.clear()

    this._nodes.clear()
    this._edges.clear()
    this._dataPulseQueue.length = 0
  }
}

export interface ForceLayoutConfig {
  width: number
  height: number
  depth: number
  iterations: number
  repulsion: number
  attraction: number
  damping: number
}

class ForceDirectedLayout {
  private _nodes: DataNode[]
  private _edges: DataEdge[]
  private _config: ForceLayoutConfig
  private _positions: Map<string, THREE.Vector3> = new Map()
  private _velocities: Map<string, THREE.Vector3> = new Map()

  constructor(nodes: DataNode[], edges: DataEdge[], config: ForceLayoutConfig) {
    this._nodes = nodes
    this._edges = edges
    this._config = config

    this._nodes.forEach((node) => {
      this._positions.set(node.id, node.position.clone())
      this._velocities.set(node.id, new THREE.Vector3())
    })
  }

  run(): void {
    for (let i = 0; i < this._config.iterations; i++) {
      this._step()
    }

    this._nodes.forEach((node) => {
      const pos = this._positions.get(node.id)
      if (pos) node.position.copy(pos)
    })
  }

  private _step(): void {
    const repulsion = this._config.repulsion
    const attraction = this._config.attraction
    const damping = this._config.damping

    this._nodes.forEach((nodeA) => {
      const posA = this._positions.get(nodeA.id)!
      const velA = this._velocities.get(nodeA.id)!
      const force = new THREE.Vector3()

      this._nodes.forEach((nodeB) => {
        if (nodeA.id === nodeB.id) return
        const posB = this._positions.get(nodeB.id)!
        const diff = new THREE.Vector3().subVectors(posA, posB)
        const dist = diff.length()
        if (dist > 0) {
          force.addScaledVector(diff.normalize(), repulsion / (dist * dist))
        }
      })

      this._edges.forEach((edge) => {
        if (edge.source === nodeA.id || edge.target === nodeA.id) {
          const otherId = edge.source === nodeA.id ? edge.target : edge.source
          const otherNode = this._nodes.find(n => n.id === otherId)
          if (otherNode) {
            const posB = this._positions.get(otherId)!
            const diff = new THREE.Vector3().subVectors(posB, posA)
            const dist = diff.length()
            if (dist > 0) {
              force.addScaledVector(diff.normalize(), attraction * dist * edge.weight)
            }
          }
        }
      })

      velA.addScaledVector(force, 1).multiplyScalar(damping)
      posA.addScaledVector(velA, 1)

      this._constrainPosition(posA)
    })
  }

  private _constrainPosition(position: THREE.Vector3): void {
    const halfW = this._config.width * 0.5
    const halfH = this._config.height * 0.5
    const halfD = this._config.depth * 0.5

    position.x = THREE.MathUtils.clamp(position.x, -halfW, halfW)
    position.y = THREE.MathUtils.clamp(position.y, 0, this._config.height)
    position.z = THREE.MathUtils.clamp(position.z, -halfD, halfD)
  }
}

export const createDataFlowSystem = (
  core: EngineCore,
  world: World,
  config?: Partial<DataFlowConfig>,
  events?: DataFlowEvents
): DataFlowSystem => {
  return new DataFlowSystem(core, world, config, events)
}

export const dataFlowPresets = {
  neuralNetwork: (): Partial<DataFlowConfig> => ({
    nodes: [
      { id: 'input', position: new THREE.Vector3(-30, 10, 0), type: 'source', size: 3, color: new THREE.Color(0x00ff88), label: 'Input', data: {}, connections: [], isActive: true, pulseIntensity: 0 },
      { id: 'hidden1', position: new THREE.Vector3(0, 20, 0), type: 'processor', size: 4, color: new THREE.Color(0x00ffff), label: 'Hidden 1', data: {}, connections: [], isActive: true, pulseIntensity: 0 },
      { id: 'hidden2', position: new THREE.Vector3(0, 0, 0), type: 'processor', size: 4, color: new THREE.Color(0x00ffff), label: 'Hidden 2', data: {}, connections: [], isActive: true, pulseIntensity: 0 },
      { id: 'output', position: new THREE.Vector3(30, 10, 0), type: 'target', size: 3, color: new THREE.Color(0xff00ff), label: 'Output', data: {}, connections: [], isActive: true, pulseIntensity: 0 },
    ],
    edges: [
      { id: 'e1', source: 'input', target: 'hidden1', type: 'data', weight: 1, color: new THREE.Color(0x00ffff), flowDirection: 'forward', dataRate: 50, isActive: true },
      { id: 'e2', source: 'input', target: 'hidden2', type: 'data', weight: 1, color: new THREE.Color(0x00ffff), flowDirection: 'forward', dataRate: 50, isActive: true },
      { id: 'e3', source: 'hidden1', target: 'output', type: 'data', weight: 1, color: new THREE.Color(0xff00ff), flowDirection: 'forward', dataRate: 30, isActive: true },
      { id: 'e4', source: 'hidden2', target: 'output', type: 'data', weight: 1, color: new THREE.Color(0xff00ff), flowDirection: 'forward', dataRate: 30, isActive: true },
    ],
    layoutAlgorithm: 'force',
  }),

  microservices: (): Partial<DataFlowConfig> => ({
    nodes: [
      { id: 'gateway', position: new THREE.Vector3(0, 15, 0), type: 'gateway', size: 4, color: new THREE.Color(0xffff00), label: 'API Gateway', data: {}, connections: [], isActive: true, pulseIntensity: 0 },
      { id: 'auth', position: new THREE.Vector3(-20, 5, -20), type: 'processor', size: 2, color: new THREE.Color(0x00ff88), label: 'Auth', data: {}, connections: [], isActive: true, pulseIntensity: 0 },
      { id: 'users', position: new THREE.Vector3(-20, 5, 20), type: 'storage', size: 2, color: new THREE.Color(0x00ffff), label: 'Users', data: {}, connections: [], isActive: true, pulseIntensity: 0 },
      { id: 'orders', position: new THREE.Vector3(20, 5, -20), type: 'storage', size: 2, color: new THREE.Color(0x00ffff), label: 'Orders', data: {}, connections: [], isActive: true, pulseIntensity: 0 },
      { id: 'payments', position: new THREE.Vector3(20, 5, 20), type: 'processor', size: 2, color: new THREE.Color(0xff00ff), label: 'Payments', data: {}, connections: [], isActive: true, pulseIntensity: 0 },
      { id: 'notifications', position: new THREE.Vector3(0, 5, 30), type: 'actuator', size: 2, color: new THREE.Color(0xff8800), label: 'Notify', data: {}, connections: [], isActive: true, pulseIntensity: 0 },
    ],
    edges: [
      { id: 'e1', source: 'gateway', target: 'auth', type: 'data', weight: 1, color: new THREE.Color(0x00ff88), flowDirection: 'bidirectional', dataRate: 20, isActive: true },
      { id: 'e2', source: 'gateway', target: 'users', type: 'data', weight: 1, color: new THREE.Color(0x00ffff), flowDirection: 'bidirectional', dataRate: 15, isActive: true },
      { id: 'e3', source: 'gateway', target: 'orders', type: 'data', weight: 1, color: new THREE.Color(0x00ffff), flowDirection: 'bidirectional', dataRate: 25, isActive: true },
      { id: 'e4', source: 'gateway', target: 'payments', type: 'data', weight: 1, color: new THREE.Color(0xff00ff), flowDirection: 'bidirectional', dataRate: 10, isActive: true },
      { id: 'e5', source: 'orders', target: 'notifications', type: 'event', weight: 1, color: new THREE.Color(0xff8800), flowDirection: 'forward', dataRate: 5, isActive: true },
      { id: 'e6', source: 'payments', target: 'notifications', type: 'event', weight: 1, color: new THREE.Color(0xff8800), flowDirection: 'forward', dataRate: 5, isActive: true },
    ],
    layoutAlgorithm: 'force',
  }),

  iotNetwork: (): Partial<DataFlowConfig> => ({
    nodes: [
      { id: 'cloud', position: new THREE.Vector3(0, 30, 0), type: 'hub', size: 5, color: new THREE.Color(0x00ffff), label: 'Cloud', data: {}, connections: [], isActive: true, pulseIntensity: 0 },
      { id: 'edge1', position: new THREE.Vector3(-25, 15, -25), type: 'gateway', size: 3, color: new THREE.Color(0x88ff88), label: 'Edge 1', data: {}, connections: [], isActive: true, pulseIntensity: 0 },
      { id: 'edge2', position: new THREE.Vector3(25, 15, -25), type: 'gateway', size: 3, color: new THREE.Color(0x88ff88), label: 'Edge 2', data: {}, connections: [], isActive: true, pulseIntensity: 0 },
      { id: 'edge3', position: new THREE.Vector3(0, 15, 25), type: 'gateway', size: 3, color: new THREE.Color(0x88ff88), label: 'Edge 3', data: {}, connections: [], isActive: true, pulseIntensity: 0 },
    ],
    edges: [
      { id: 'e1', source: 'cloud', target: 'edge1', type: 'stream', weight: 2, color: new THREE.Color(0x00ffff), flowDirection: 'bidirectional', dataRate: 100, isActive: true },
      { id: 'e2', source: 'cloud', target: 'edge2', type: 'stream', weight: 2, color: new THREE.Color(0x00ffff), flowDirection: 'bidirectional', dataRate: 100, isActive: true },
      { id: 'e3', source: 'cloud', target: 'edge3', type: 'stream', weight: 2, color: new THREE.Color(0x00ffff), flowDirection: 'bidirectional', dataRate: 100, isActive: true },
    ],
    layoutAlgorithm: 'hierarchical',
  }),
}