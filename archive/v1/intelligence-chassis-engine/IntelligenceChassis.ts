// SVARA — The Intelligence Chassis
//
// The signature identity object and the DNA of the whole site. A precision
// architectural framework that houses intelligence: an OPEN anodized-aluminium
// space-frame (never a closed box), with modular compute cells of mixed
// material — frosted glass, optical crystal, transparent acrylic, skeletal
// aluminium — suspended asymmetrically inside, laced with integrated blue
// optical conduits. Craftsmanship, not sci-fi. Suspended in white daylight.
//
// Reuse map (later pages consume PARTS of this same architecture):
//   Home → whole chassis · Platform → exploded view · Products → single cells
//   Technology → the optical conduits · Industries → cells re-skinned per env.
//
// Document 001 Step 4 scope = STATIC only (form, materials, scale, lighting,
// composition). No breathing, cursor or scroll — those attach to render()/the
// group in Steps 7–8.
//
// Deliberately NOT: closed enclosure, machine housing, sphere, orb, node graph.

import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Group,
  HemisphereLight,
  DirectionalLight,
  PMREMGenerator,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  ShadowMaterial,
  BoxGeometry,
  OctahedronGeometry,
  PlaneGeometry,
  Mesh,
  Vector3,
  ACESFilmicToneMapping,
  SRGBColorSpace,
  PCFShadowMap,
} from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

const ACCENT_BLUE = 0x4d9dff

export class IntelligenceChassis {
  private container: HTMLElement
  private scene = new Scene()
  private camera: PerspectiveCamera
  private renderer: WebGLRenderer
  private chassis = new Group()
  private resizeObserver: ResizeObserver | null = null
  private disposables: Array<{ dispose: () => void }> = []

  // Shared unit primitives — every rail/cell/conduit is this box or octa,
  // scaled. Keeps geometry count low (PRD: "use instancing where possible").
  private unitBox = new BoxGeometry(1, 1, 1)
  private unitOcta = new OctahedronGeometry(0.5, 0)

  // Shared materials (one instance per material, reused across meshes).
  private matAluminium!: MeshStandardMaterial
  private matGlass!: MeshPhysicalMaterial
  private matCrystal!: MeshPhysicalMaterial
  private matAcrylic!: MeshPhysicalMaterial
  private matConduit!: MeshStandardMaterial

  constructor(container: HTMLElement) {
    this.container = container

    this.renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(container.clientWidth, container.clientHeight)
    this.renderer.toneMapping = ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.1
    this.renderer.outputColorSpace = SRGBColorSpace
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = PCFShadowMap
    container.appendChild(this.renderer.domElement)

    this.camera = new PerspectiveCamera(35, container.clientWidth / container.clientHeight, 0.1, 100)
    // Static, near-front with a slight 3/4 turn + slight elevation so the OPEN
    // depth of the frame reads while the recognizable rectangular silhouette
    // survives. Premium product-photography framing.
    this.camera.position.set(1.55, 0.75, 4.5)
    this.camera.lookAt(0, 0, 0)

    this.disposables.push(this.unitBox, this.unitOcta)
    this.setupEnvironment()
    this.setupLights()
    this.createMaterials()
    this.buildChassis()
    this.scene.add(this.chassis)

    this.observeResize()
    this.render()
  }

  private setupEnvironment() {
    const pmrem = new PMREMGenerator(this.renderer)
    const envScene = new RoomEnvironment()
    this.scene.environment = pmrem.fromScene(envScene, 0.04).texture
    envScene.dispose?.()
    pmrem.dispose()
  }

  private setupLights() {
    this.scene.add(new HemisphereLight(0xffffff, 0xdfe6f0, 0.85))

    const key = new DirectionalLight(0xffffff, 2.3)
    key.position.set(3, 5, 4)
    key.castShadow = true
    key.shadow.mapSize.set(1024, 1024)
    key.shadow.camera.near = 1
    key.shadow.camera.far = 20
    key.shadow.radius = 6
    key.shadow.bias = -0.0005
    this.scene.add(key)

    const fill = new DirectionalLight(0xeef3fb, 0.55)
    fill.position.set(-4, 1.5, 2)
    this.scene.add(fill)
  }

  private createMaterials() {
    this.matAluminium = new MeshStandardMaterial({ color: 0xccd1d8, metalness: 1, roughness: 0.42 })
    this.matGlass = new MeshPhysicalMaterial({
      color: 0xffffff, transmission: 1, roughness: 0.34, thickness: 0.5, ior: 1.5,
      clearcoat: 0.4, clearcoatRoughness: 0.3, transparent: true,
    })
    this.matCrystal = new MeshPhysicalMaterial({
      color: 0xeaf3ff, transmission: 1, roughness: 0.02, thickness: 1.0, ior: 1.7,
      clearcoat: 1, clearcoatRoughness: 0.05, transparent: true,
    })
    this.matAcrylic = new MeshPhysicalMaterial({
      color: 0xdcebff, transmission: 0.92, roughness: 0.12, thickness: 0.3, ior: 1.49, transparent: true,
    })
    // "Depth over glow" — conduits read as lit channels via emissive, not bloom.
    this.matConduit = new MeshStandardMaterial({
      color: 0x123055, emissive: ACCENT_BLUE, emissiveIntensity: 1.1, roughness: 0.4, metalness: 0,
    })
    this.disposables.push(this.matAluminium, this.matGlass, this.matCrystal, this.matAcrylic, this.matConduit)
  }

  // ---- geometry helpers (everything is the shared unit box, scaled) ----

  private box(mat: MeshStandardMaterial | MeshPhysicalMaterial, sx: number, sy: number, sz: number, px: number, py: number, pz: number, shadow = false) {
    const m = new Mesh(this.unitBox, mat)
    m.scale.set(sx, sy, sz)
    m.position.set(px, py, pz)
    if (shadow) { m.castShadow = true }
    this.chassis.add(m)
    return m
  }

  // A square-section aluminium rail between two points (for frame edges).
  private rail(a: Vector3, b: Vector3, t: number) {
    const mid = a.clone().add(b).multiplyScalar(0.5)
    const len = a.distanceTo(b)
    // Axis-aligned frame, so exactly one component differs.
    if (Math.abs(a.x - b.x) > 1e-4) this.box(this.matAluminium, len, t, t, mid.x, mid.y, mid.z, true)
    else if (Math.abs(a.y - b.y) > 1e-4) this.box(this.matAluminium, t, len, t, mid.x, mid.y, mid.z, true)
    else this.box(this.matAluminium, t, t, len, mid.x, mid.y, mid.z, true)
  }

  // A rectangular aluminium frame ring at height y (top/bottom/shelf).
  private ring(y: number, w: number, d: number, t: number) {
    const x = w / 2, z = d / 2
    const c = [
      new Vector3(-x, y, -z), new Vector3(x, y, -z),
      new Vector3(x, y, z), new Vector3(-x, y, z),
    ]
    for (let i = 0; i < 4; i++) this.rail(c[i], c[(i + 1) % 4], t)
  }

  // ---- the chassis ----

  private buildChassis() {
    const W = 1.6, H = 2.2, D = 1.2, t = 0.05
    const x = W / 2, y = H / 2, z = D / 2

    // 1 — OPEN space-frame: four corner posts + top & bottom rings. No faces.
    const corners: Array<[number, number]> = [[-x, -z], [x, -z], [x, z], [-x, z]]
    for (const [cx, cz] of corners) this.box(this.matAluminium, t, H, t, cx, 0, cz, true)
    this.ring(y, W, D, t)
    this.ring(-y, W, D, t)

    // Precision machined joint nodes at the 8 outer corners.
    for (const [cx, cz] of corners) {
      this.box(this.matAluminium, t * 1.9, t * 1.9, t * 1.9, cx, y, cz, true)
      this.box(this.matAluminium, t * 1.9, t * 1.9, t * 1.9, cx, -y, cz, true)
    }

    // 2 — Two internal load-bearing shelves at ASYMMETRIC heights.
    this.ring(0.28, W, D, t * 0.8)
    this.ring(-0.62, W, D, t * 0.8)

    // 3 — Modular compute cells, mixed material, asymmetric but balanced.
    //   heavy frosted-glass block low-left  ⇄  skeletal + crystal upper-right
    // 3a frosted glass processing block (lower-left)
    this.box(this.matGlass, 0.62, 0.6, 0.62, -0.34, -0.32, 0, true)
    // 3b optical crystal core (center, above the mid shelf) — faceted
    const crystal = new Mesh(this.unitOcta, this.matCrystal)
    crystal.scale.set(0.42, 0.9, 0.42)
    crystal.position.set(0.06, 0.62, 0)
    this.chassis.add(crystal)
    // 3c skeletal sub-frame cell (upper-right) — edges only, houses nothing yet
    this.subFrame(0.42, 0.62, 0.5, 0.5, 0.62, 0, t * 0.6)
    // 3d transparent acrylic slab (mid-left, thin)
    this.box(this.matAcrylic, 0.5, 0.04, 0.62, -0.34, 0.28, 0, true)
    // 3e small crystal sensor node (lower-right)
    const sensor = new Mesh(this.unitOcta, this.matCrystal)
    sensor.scale.set(0.22, 0.22, 0.22)
    sensor.position.set(0.42, -0.62, 0)
    this.chassis.add(sensor)

    // 4 — Integrated optical conduits (data pathways) threaded through structure.
    // vertical bus riser along the front-right post line
    this.box(this.matConduit, 0.02, H * 0.82, 0.02, x - t, 0, z - t, false)
    // horizontal runs linking glass block → crystal → skeletal cell
    this.box(this.matConduit, 0.02, 0.02, 0.5, -0.02, -0.02, 0.24, false)
    this.box(this.matConduit, 0.44, 0.02, 0.02, 0.28, 0.62, 0.16, false)
    this.box(this.matConduit, 0.02, 0.5, 0.02, 0.42, -0.36, 0.16, false)

    // 5 — Transparent acrylic structural braces (see-through, load-carrying).
    this.brace(new Vector3(-x, -y, z), new Vector3(x, y, z), 0.035)
    this.brace(new Vector3(x, -y, -z), new Vector3(x, y, z), 0.035)

    // Soft contact shadow.
    const shadowMat = new ShadowMaterial({ opacity: 0.13 })
    this.disposables.push(shadowMat)
    const floor = new Mesh(new PlaneGeometry(9, 9), shadowMat)
    this.disposables.push(floor.geometry)
    floor.rotation.x = -Math.PI / 2
    floor.position.y = -y - 0.18
    floor.receiveShadow = true
    this.scene.add(floor)
  }

  // Skeletal cell = 12 thin aluminium edges of a box (open, houses nothing).
  private subFrame(w: number, h: number, d: number, px: number, py: number, pz: number, t: number) {
    const x = w / 2, y = h / 2, z = d / 2
    const V = (a: number, b: number, c: number) => new Vector3(px + a, py + b, pz + c)
    const bottom = [V(-x, -y, -z), V(x, -y, -z), V(x, -y, z), V(-x, -y, z)]
    const top = [V(-x, y, -z), V(x, y, -z), V(x, y, z), V(-x, y, z)]
    for (let i = 0; i < 4; i++) {
      this.rail(bottom[i], bottom[(i + 1) % 4], t)
      this.rail(top[i], top[(i + 1) % 4], t)
      this.rail(bottom[i], top[i], t)
    }
  }

  // Transparent acrylic diagonal brace between two points (thin flat strut).
  private brace(a: Vector3, b: Vector3, t: number) {
    const mid = a.clone().add(b).multiplyScalar(0.5)
    const len = a.distanceTo(b)
    const m = new Mesh(this.unitBox, this.matAcrylic)
    m.scale.set(t, len, t)
    m.position.copy(mid)
    // orient local +Y along (b-a)
    const dir = b.clone().sub(a).normalize()
    const up = new Vector3(0, 1, 0)
    m.quaternion.setFromUnitVectors(up, dir)
    this.chassis.add(m)
  }

  private observeResize() {
    this.resizeObserver = new ResizeObserver(() => this.onResize())
    this.resizeObserver.observe(this.container)
  }

  private onResize() {
    const w = this.container.clientWidth
    const h = this.container.clientHeight
    if (!w || !h) return
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(w, h)
    this.render()
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }

  dispose() {
    this.resizeObserver?.disconnect()
    for (const d of this.disposables) d.dispose()
    this.scene.environment?.dispose()
    this.renderer.dispose()
    this.renderer.domElement.remove()
  }
}
