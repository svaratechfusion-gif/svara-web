// THE SYSTEMS TIER — Unified Business Cloud, One AI OS, Digital Engineering,
// Growth & PR Tech. Four ideas about the enterprise as a whole: functions
// joined, a layer over the stack, modules assembled, a signal spreading.

import * as THREE from 'three'
import { BLUE, INK, WARM, boxEdges, lineMaterial, pointMaterial, polyline, positionsGeometry, seeded, segments, stage, type ViewScene } from '../three-kit'

/** 07 · UNIFIED BUSINESS CLOUD — separate functions, joined through one hub. */
export function businessCloud(): ViewScene {
  const { scene, camera } = stage(3.1)

  const FUNCTIONS = 6
  const RADIUS = 0.92
  const hub = boxEdges(0.26, 0.26, 0.26, INK, 0.6)
  scene.add(hub)

  const arcs: THREE.LineBasicMaterial[] = []
  for (let i = 0; i < FUNCTIONS; i++) {
    const angle = (i / FUNCTIONS) * Math.PI * 2 - Math.PI / 2
    const at = new THREE.Vector3(Math.cos(angle) * RADIUS, Math.sin(angle) * RADIUS, 0)

    const silo = boxEdges(0.3, 0.42, 0.3, INK, 0.45)
    silo.position.copy(at)
    scene.add(silo)

    // A quadratic bezier bowed out of plane, so six links read as six paths
    // rather than as one flat asterisk.
    const curve = new THREE.QuadraticBezierCurve3(
      at,
      new THREE.Vector3(at.x * 0.42, at.y * 0.42, 0.55),
      new THREE.Vector3(0, 0, 0),
    )
    const link = polyline(curve.getPoints(24), BLUE, 0.2)
    arcs.push(link.material as THREE.LineBasicMaterial)
    scene.add(link)
  }

  return {
    scene,
    camera,
    update(t) {
      // The links light in sequence — one enterprise, consolidating.
      for (let i = 0; i < arcs.length; i++) {
        const beat = (t * 0.4 + i / arcs.length) % 1
        arcs[i]!.opacity = 0.14 + Math.max(0, 1 - beat * 3.2) * 0.72
      }
      scene.rotation.y = Math.sin(t * 0.18) * 0.3
      hub.rotation.y = t * 0.5
      hub.rotation.x = t * 0.3
    },
  }
}

/** 08 · ONE AI OS — one conversational layer sitting over the whole stack. */
export function aiOS(): ViewScene {
  const { scene, camera } = stage(3.2)
  camera.position.set(0, 0.5, 3.1)
  camera.lookAt(0, -0.12, 0)

  const LAYERS = 4
  const slabs: THREE.LineSegments[] = []
  for (let i = 0; i < LAYERS; i++) {
    const slab = boxEdges(1.5 - i * 0.08, 0.16, 0.72 - i * 0.04, INK, 0.34)
    slab.position.y = -0.22 - i * 0.26
    scene.add(slab)
    slabs.push(slab)
  }

  // The conversational surface: a live waveform above the stack.
  const SAMPLES = 64
  const wave = new Float32Array(SAMPLES * 3)
  for (let i = 0; i < SAMPLES; i++) wave[i * 3] = (i / (SAMPLES - 1) - 0.5) * 1.6
  const waveGeometry = positionsGeometry(wave)
  scene.add(new THREE.Line(waveGeometry, lineMaterial(BLUE, 0.85)))

  const probe = new THREE.Points(positionsGeometry([0, 0.62, 0]), pointMaterial(WARM, 0.09, 1))
  scene.add(probe)

  const TOP = 0.62
  const BOTTOM = -0.22 - (LAYERS - 1) * 0.26
  return {
    scene,
    camera,
    update(t) {
      const buffer = waveGeometry.attributes.position as THREE.BufferAttribute
      const array = buffer.array as Float32Array
      for (let i = 0; i < SAMPLES; i++) {
        const x = array[i * 3]!
        // An envelope, so the waveform speaks in bursts instead of droning.
        const envelope = 0.35 + 0.65 * Math.max(0, Math.sin(t * 0.9))
        array[i * 3 + 1] = TOP + Math.sin(x * 7 + t * 4.2) * 0.075 * envelope * Math.cos(x * 1.6)
      }
      buffer.needsUpdate = true

      // A query travels down through the layers and the answer comes back up.
      const trip = (t * 0.33) % 1
      const depth = trip < 0.5 ? trip * 2 : (1 - trip) * 2
      probe.position.y = TOP + (BOTTOM - TOP) * depth
      for (let i = 0; i < LAYERS; i++) {
        const reached = 1 - Math.min(1, Math.abs(depth - (i + 0.5) / LAYERS) * 5)
        ;(slabs[i]!.material as THREE.LineBasicMaterial).opacity = 0.24 + Math.max(0, reached) * 0.62
      }
    },
  }
}

/** 09 · DIGITAL ENGINEERING — modules arriving and locking into a structure. */
export function digitalEngineering(): ViewScene {
  const { scene, camera } = stage(3.1)

  const COUNT = 12
  const random = seeded(0xd161)
  const modules = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.34, 0.2, 0.34),
    new THREE.MeshBasicMaterial({ color: INK, wireframe: true, transparent: true, opacity: 0.55 }),
    COUNT,
  )
  scene.add(modules)

  const assembled: THREE.Vector3[] = []
  const loose: THREE.Vector3[] = []
  for (let i = 0; i < COUNT; i++) {
    const tier = Math.floor(i / 3)
    const slot = i % 3
    assembled.push(new THREE.Vector3((slot - 1) * 0.38, tier * 0.24 - 0.36, 0))
    loose.push(new THREE.Vector3((random() - 0.5) * 3, (random() - 0.5) * 2.6, (random() - 0.5) * 2))
  }

  const matrix = new THREE.Matrix4()
  const position = new THREE.Vector3()
  const quaternion = new THREE.Quaternion()
  const euler = new THREE.Euler()
  const one = new THREE.Vector3(1, 1, 1)

  return {
    scene,
    camera,
    update(t) {
      for (let i = 0; i < COUNT; i++) {
        // Staggered arrival: the lower modules land first, so the stack builds.
        const cycle = (t * 0.13 + i * 0.02) % 1
        const arrive = THREE.MathUtils.smoothstep(cycle, 0.05, 0.4) - THREE.MathUtils.smoothstep(cycle, 0.78, 0.98)
        position.copy(loose[i]!).lerp(assembled[i]!, arrive)
        euler.set((1 - arrive) * (i + 1) * 0.7, (1 - arrive) * (i + 1) * 0.5, 0)
        quaternion.setFromEuler(euler)
        matrix.compose(position, quaternion, one)
        modules.setMatrixAt(i, matrix)
      }
      modules.instanceMatrix.needsUpdate = true
      scene.rotation.y = t * 0.22
      scene.rotation.x = Math.sin(t * 0.17) * 0.14
    },
  }
}

/** 10 · GROWTH & PR TECH — one signal, spreading through a network. */
export function growthTech(): ViewScene {
  const { scene, camera } = stage(3.0)

  const COUNT = 46
  const random = seeded(0x9704)
  const nodes: THREE.Vector3[] = []
  for (let i = 0; i < COUNT; i++) {
    // A golden-angle spiral: even coverage without clumping, and it stays put.
    const angle = i * 2.399963
    const radius = Math.sqrt(i / COUNT) * 1.02
    nodes.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, (random() - 0.5) * 0.18))
  }

  const wires: number[] = []
  for (let i = 0; i < COUNT; i++) {
    for (let j = i + 1; j < COUNT; j++) {
      if (nodes[i]!.distanceTo(nodes[j]!) < 0.33) {
        wires.push(nodes[i]!.x, nodes[i]!.y, nodes[i]!.z, nodes[j]!.x, nodes[j]!.y, nodes[j]!.z)
      }
    }
  }
  scene.add(segments(wires, INK, 0.16))

  const geometry = positionsGeometry(nodes.flatMap((n) => [n.x, n.y, n.z]))
  const colors = new Float32Array(COUNT * 3).fill(0.35)
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  const material = pointMaterial(INK, 0.055, 1)
  material.vertexColors = true
  scene.add(new THREE.Points(geometry, material))

  const ripplePoints: THREE.Vector3[] = []
  for (let i = 0; i <= 48; i++) {
    const angle = (i / 48) * Math.PI * 2
    ripplePoints.push(new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0))
  }
  const ripple = polyline(ripplePoints, WARM, 0.4)
  scene.add(ripple)

  const accent = new THREE.Color(BLUE)
  return {
    scene,
    camera,
    update(t) {
      const front = ((t * 0.32) % 1) * 1.15
      ripple.scale.setScalar(Math.max(0.001, front))
      ;(ripple.material as THREE.LineBasicMaterial).opacity = 0.55 * (1 - front / 1.15)

      for (let i = 0; i < COUNT; i++) {
        const distance = Math.hypot(nodes[i]!.x, nodes[i]!.y)
        // Bright as the front passes, fading behind it — reach, not a glow.
        const lit = Math.max(0, 1 - Math.abs(distance - front) * 7)
        colors[i * 3] = 0.32 + lit * (1 - accent.r) + lit * accent.r * 0.4
        colors[i * 3 + 1] = 0.32 + lit * 0.68
        colors[i * 3 + 2] = 0.36 + lit * 0.64
      }
      geometry.attributes.color!.needsUpdate = true
      scene.rotation.z = t * 0.05
    },
  }
}
