// THE SENSING TIER — Vision AI, Drone AI, Edge AI.
//
// Each scene is one idea, drawn as a diagram rather than as an illustration:
// what the product does to the world, in the smallest number of moving parts
// that still reads at 600px square.

import * as THREE from 'three'
import { BLUE, INK, WARM, boxEdges, lineMaterial, pointMaterial, polyline, positionsGeometry, segments, stage, type ViewScene } from '../three-kit'

/** 01 · VISION AI — perception. A sensor sweeps a field; what it sees lights up. */
export function visionAI(): ViewScene {
  const { scene, camera } = stage()
  camera.position.set(0, 0.95, 2.85)
  camera.lookAt(0, -0.18, 0)

  const COLS = 22
  const ROWS = 15
  const APEX = new THREE.Vector3(0, 0.62, 0.92)
  const HALF_ANGLE = 0.32
  const REACH = 2.3
  /** Pitch, so the cone lands ON the field. Aimed level it left the frame. */
  const TILT = -0.74

  const points: number[] = []
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      points.push((col / (COLS - 1) - 0.5) * 2.15, -0.72, (row / (ROWS - 1) - 0.5) * 2.0)
    }
  }
  const geometry = positionsGeometry(points)
  const colors = new Float32Array((points.length / 3) * 3).fill(0.34)
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  const material = pointMaterial(INK, 0.026, 1)
  material.vertexColors = true
  scene.add(new THREE.Points(geometry, material))

  // The frustum, drawn from the apex to a footprint quad. Rotating the group
  // sweeps the footprint across the field for free.
  const far = REACH
  const spread = Math.tan(HALF_ANGLE) * far
  const cone: number[] = []
  const corners: [number, number][] = [[-spread, -spread], [spread, -spread], [spread, spread], [-spread, spread]]
  for (let i = 0; i < 4; i++) {
    const [x, y] = corners[i]!
    const [nx, ny] = corners[(i + 1) % 4]!
    cone.push(0, 0, 0, x, y, -far)
    cone.push(x, y, -far, nx, ny, -far)
  }
  const frustum = segments(cone, BLUE, 0.55)
  frustum.position.copy(APEX)
  // YXZ: yaw first, then pitch — with the default XYZ order the sweep would
  // roll the cone sideways instead of panning it across the ground.
  frustum.rotation.order = 'YXZ'
  frustum.rotation.x = TILT
  const sensor = boxEdges(0.16, 0.1, 0.22, INK, 0.85)
  sensor.position.copy(APEX)
  sensor.rotation.order = 'YXZ'
  sensor.rotation.x = TILT
  scene.add(frustum, sensor)

  const forward = new THREE.Vector3()
  return {
    scene,
    camera,
    update(t) {
      const yaw = Math.sin(t * 0.5) * 0.58
      frustum.rotation.y = yaw
      sensor.rotation.y = yaw
      forward.set(-Math.sin(yaw), 0, -Math.cos(yaw))

      const position = geometry.attributes.position as THREE.BufferAttribute
      for (let i = 0; i < position.count; i++) {
        const dx = position.getX(i) - APEX.x
        const dz = position.getZ(i) - APEX.z
        const length = Math.hypot(dx, dz) || 1
        const alignment = (dx / length) * forward.x + (dz / length) * forward.z
        // 1 inside the cone, 0 outside, with a soft edge so the sweep doesn't strobe.
        const lit = THREE.MathUtils.smoothstep(alignment, Math.cos(HALF_ANGLE * 1.5), Math.cos(HALF_ANGLE * 0.6))
        colors[i * 3] = 0.3 + lit * 0.7
        colors[i * 3 + 1] = 0.3 + lit * 0.75
        colors[i * 3 + 2] = 0.34 + lit * 0.66
      }
      geometry.attributes.color!.needsUpdate = true
    },
  }
}

/** 02 · DRONE AI — a survey pattern flown over terrain, leaving a covered trail. */
export function droneAI(): ViewScene {
  const { scene, camera } = stage()
  camera.position.set(0.12, 1.02, 2.45)
  camera.lookAt(0, -0.34, 0)

  const SPAN = 2.0
  const STEPS = 14
  const terrain: number[] = []
  const height = (x: number, z: number) => Math.sin(x * 2.3) * 0.09 + Math.cos(z * 1.9) * 0.08 - 0.62
  for (let i = 0; i <= STEPS; i++) {
    const along = (i / STEPS - 0.5) * SPAN
    for (let j = 0; j < STEPS; j++) {
      const a = (j / STEPS - 0.5) * SPAN
      const b = ((j + 1) / STEPS - 0.5) * SPAN
      terrain.push(along, height(along, a), a, along, height(along, b), b)
      terrain.push(a, height(a, along), along, b, height(b, along), along)
    }
  }
  scene.add(segments(terrain, INK, 0.14))

  const craft = boxEdges(0.16, 0.05, 0.16, INK, 0.9)
  const rotors = new THREE.Points(
    positionsGeometry([-0.11, 0.03, -0.11, 0.11, 0.03, -0.11, 0.11, 0.03, 0.11, -0.11, 0.03, 0.11]),
    pointMaterial(BLUE, 0.05, 0.95),
  )
  craft.add(rotors)
  scene.add(craft)

  // The trail is a fixed-length ring: 70 samples shifted down the buffer each
  // frame, which is one copyWithin instead of rebuilding a geometry.
  const TRAIL = 70
  const trailPositions = new Float32Array(TRAIL * 3)
  const trailGeometry = positionsGeometry(trailPositions)
  scene.add(new THREE.Line(trailGeometry, lineMaterial(BLUE, 0.6)))

  const LAPS = 3.5
  // An unprimed ring buffer is all zeros, so the trail's first pass draws a
  // line from the world origin to the craft — a stray diagonal across the map.
  let primed = false

  return {
    scene,
    camera,
    update(t) {
      // Lawnmower: x sweeps back and forth while z walks steadily across.
      const phase = (t * 0.14) % 1
      const x = (Math.asin(Math.sin(phase * Math.PI * 2 * LAPS)) / (Math.PI / 2)) * (SPAN / 2)
      const z = (phase - 0.5) * SPAN
      craft.position.set(x, height(x, z) + 0.42, z)
      craft.rotation.y = Math.cos(phase * Math.PI * 2 * LAPS) > 0 ? 0.06 : -0.06

      const buffer = trailGeometry.attributes.position as THREE.BufferAttribute
      const array = buffer.array as Float32Array
      if (!primed) {
        for (let i = 0; i < TRAIL; i++) {
          array[i * 3] = craft.position.x
          array[i * 3 + 1] = craft.position.y - 0.03
          array[i * 3 + 2] = craft.position.z
        }
        primed = true
      }
      array.copyWithin(0, 3)
      array[(TRAIL - 1) * 3] = craft.position.x
      array[(TRAIL - 1) * 3 + 1] = craft.position.y - 0.03
      array[(TRAIL - 1) * 3 + 2] = craft.position.z
      buffer.needsUpdate = true
      rotors.rotation.y = t * 14
    },
  }
}

/** 03 · EDGE AI — compute that stays where it is. Spokes reach in and stop. */
export function edgeAI(): ViewScene {
  const { scene, camera } = stage(3.0)

  const NODES = 8
  const RADIUS = 0.86
  const REACH = 0.38 // fraction of the way to the core — the whole point

  const spokes: number[] = []
  for (let i = 0; i < NODES; i++) {
    const angle = (i / NODES) * Math.PI * 2
    const x = Math.cos(angle) * RADIUS
    const y = Math.sin(angle) * RADIUS
    spokes.push(x, y, 0, x * (1 - REACH), y * (1 - REACH), 0)
  }
  scene.add(segments(spokes, INK, 0.16))

  const ringPoints: THREE.Vector3[] = []
  for (let i = 0; i <= NODES; i++) {
    const angle = (i / NODES) * Math.PI * 2
    ringPoints.push(new THREE.Vector3(Math.cos(angle) * RADIUS, Math.sin(angle) * RADIUS, 0))
  }
  scene.add(polyline(ringPoints, INK, 0.12))

  const nodes = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.17, 0.17, 0.17),
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.92 }),
    NODES,
  )
  const matrix = new THREE.Matrix4()
  const colour = new THREE.Color()
  for (let i = 0; i < NODES; i++) {
    const angle = (i / NODES) * Math.PI * 2
    matrix.makeRotationY(angle)
    matrix.setPosition(Math.cos(angle) * RADIUS, Math.sin(angle) * RADIUS, 0)
    nodes.setMatrixAt(i, matrix)
    nodes.setColorAt(i, colour.setHex(INK))
  }
  scene.add(nodes)

  const core = boxEdges(0.3, 0.3, 0.3, INK, 0.35)
  scene.add(core)

  // One pulse per node, each firing on its own offset, so the ring never beats
  // in unison — edge compute is independent by definition.
  // Hoisted: allocating a Color inside the frame loop is the classic three/R3F
  // leak — eight per frame, sixty times a second, for the life of the page.
  const cool = new THREE.Color(BLUE)
  const warm = new THREE.Color(WARM)
  const base = new THREE.Color(INK)
  return {
    scene,
    camera,
    update(t) {
      for (let i = 0; i < NODES; i++) {
        const beat = (t * 0.55 + i * 0.37) % 1
        const flare = Math.max(0, 1 - beat * 4)
        colour.copy(i % 3 === 0 ? warm : cool).lerp(base, 1 - flare)
        nodes.setColorAt(i, colour)
      }
      if (nodes.instanceColor) nodes.instanceColor.needsUpdate = true
      core.rotation.y = t * 0.3
      core.rotation.x = t * 0.18
      scene.rotation.z = Math.sin(t * 0.12) * 0.06
    },
  }
}
