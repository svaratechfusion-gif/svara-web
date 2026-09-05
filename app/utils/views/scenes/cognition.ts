// THE COGNITION TIER — Generative & Cognitive AI, Autonomous AI Agents,
// Digital Twin. Three ideas about thinking: structure emerging from noise,
// choices being taken, and a model tracking a real thing.

import * as THREE from 'three'
import { BLUE, INK, WARM, boxEdges, lineMaterial, pointMaterial, polyline, positionsGeometry, seeded, segments, stage, type ViewScene } from '../three-kit'

/** 04 · GENERATIVE & COGNITIVE AI — a token cloud condensing into a lattice. */
export function cognitiveAI(): ViewScene {
  const { scene, camera } = stage(3.1)

  const SIDE = 7
  const COUNT = SIDE * SIDE * SIDE
  const random = seeded(0x5a17)
  const scattered = new Float32Array(COUNT * 3)
  const ordered = new Float32Array(COUNT * 3)

  let i = 0
  for (let x = 0; x < SIDE; x++) {
    for (let y = 0; y < SIDE; y++) {
      for (let z = 0; z < SIDE; z++) {
        ordered[i * 3] = (x / (SIDE - 1) - 0.5) * 1.35
        ordered[i * 3 + 1] = (y / (SIDE - 1) - 0.5) * 1.35
        ordered[i * 3 + 2] = (z / (SIDE - 1) - 0.5) * 1.35
        // A sphere of noise, so the "before" state has no structure at all.
        const theta = random() * Math.PI * 2
        const phi = Math.acos(2 * random() - 1)
        const radius = 0.55 + random() * 0.75
        scattered[i * 3] = Math.sin(phi) * Math.cos(theta) * radius
        scattered[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * radius
        scattered[i * 3 + 2] = Math.cos(phi) * radius
        i++
      }
    }
  }

  const geometry = positionsGeometry(scattered)
  const material = pointMaterial(INK, 0.03, 0.85)
  const cloud = new THREE.Points(geometry, material)
  scene.add(cloud, boxEdges(1.5, 1.5, 1.5, INK, 0.14))

  const accent = new THREE.Color(BLUE)
  const ink = new THREE.Color(INK)
  return {
    scene,
    camera,
    update(t) {
      // Hold scattered, condense, hold ordered, disperse — a 9s breath.
      const cycle = (t % 9) / 9
      const settled = THREE.MathUtils.smoothstep(cycle, 0.12, 0.42) - THREE.MathUtils.smoothstep(cycle, 0.68, 0.94)
      const eased = settled * settled * (3 - 2 * settled)
      const buffer = geometry.attributes.position as THREE.BufferAttribute
      const array = buffer.array as Float32Array
      for (let n = 0; n < array.length; n++) {
        array[n] = scattered[n]! + (ordered[n]! - scattered[n]!) * eased
      }
      buffer.needsUpdate = true
      material.color.copy(ink).lerp(accent, eased * 0.8)
      cloud.rotation.y = t * 0.16
      cloud.rotation.x = Math.sin(t * 0.21) * 0.2
    },
  }
}

/** 05 · AUTONOMOUS AI AGENTS — workers moving through a decision graph. */
export function agentsAI(): ViewScene {
  const { scene, camera } = stage(3.0)

  // Four ranks; every node connects forward to two of the next rank.
  const RANKS = [1, 3, 3, 2]
  const nodes: THREE.Vector3[] = []
  const rankStart: number[] = []
  RANKS.forEach((count, rank) => {
    rankStart.push(nodes.length)
    for (let i = 0; i < count; i++) {
      const y = count === 1 ? 0 : (i / (count - 1) - 0.5) * 1.25
      nodes.push(new THREE.Vector3((rank / (RANKS.length - 1) - 0.5) * 1.9, y, 0))
    }
  })

  const edges: [number, number][] = []
  for (let rank = 0; rank < RANKS.length - 1; rank++) {
    const from = rankStart[rank]!
    const to = rankStart[rank + 1]!
    for (let a = 0; a < RANKS[rank]!; a++) {
      for (let b = 0; b < RANKS[rank + 1]!; b++) {
        if (Math.abs(a - b) <= 1) edges.push([from + a, to + b])
      }
    }
  }

  const wires: number[] = []
  for (const [a, b] of edges) {
    wires.push(nodes[a]!.x, nodes[a]!.y, 0, nodes[b]!.x, nodes[b]!.y, 0)
  }
  scene.add(segments(wires, INK, 0.2))
  scene.add(new THREE.Points(positionsGeometry(nodes.flatMap((n) => [n.x, n.y, 0])), pointMaterial(INK, 0.06, 0.7)))

  const AGENTS = 4
  const agentGeometry = positionsGeometry(new Float32Array(AGENTS * 3))
  scene.add(new THREE.Points(agentGeometry, pointMaterial(WARM, 0.085, 1)))

  // Each agent walks its own route; the route is re-picked at the far end, so
  // the branch actually taken changes from pass to pass.
  const random = seeded(0x0a9e)
  // Adjacency precomputed once: the branch decision happens mid-frame, and
  // filtering the edge list there would allocate on every arrival.
  const onwardFrom = nodes.map((_, n) => edges.map((e, i) => (e[0] === n ? i : -1)).filter((i) => i >= 0))
  const rootEdges = onwardFrom[0]!
  const routes = Array.from({ length: AGENTS }, () => Math.floor(random() * edges.length))
  const phases = Array.from({ length: AGENTS }, (_, i) => i / AGENTS)

  return {
    scene,
    camera,
    update(t, dt) {
      const buffer = agentGeometry.attributes.position as THREE.BufferAttribute
      const array = buffer.array as Float32Array
      for (let i = 0; i < AGENTS; i++) {
        phases[i] = phases[i]! + dt * 0.42
        if (phases[i]! >= 1) {
          phases[i] = 0
          // Continue from the node just reached, or start over at the root.
          const arrived = edges[routes[i]!]![1]
          const onward = onwardFrom[arrived]!
          const next = onward.length ? onward : rootEdges
          routes[i] = next[Math.floor(random() * next.length)]!
        }
        const [a, b] = edges[routes[i]!]!
        const p = phases[i]!
        array[i * 3] = nodes[a]!.x + (nodes[b]!.x - nodes[a]!.x) * p
        array[i * 3 + 1] = nodes[a]!.y + (nodes[b]!.y - nodes[a]!.y) * p
        array[i * 3 + 2] = 0.02
      }
      buffer.needsUpdate = true
      scene.rotation.y = Math.sin(t * 0.2) * 0.16
    },
  }
}

/** 06 · DIGITAL TWIN — the thing, and the model of it, converging. */
export function digitalTwin(): ViewScene {
  const { scene, camera } = stage(3.2)
  camera.position.set(0, 0.35, 3.2)
  camera.lookAt(0, -0.05, 0)

  const shape = new THREE.IcosahedronGeometry(0.42, 1)
  const real = new THREE.LineSegments(new THREE.WireframeGeometry(shape), lineMaterial(INK, 0.85))
  const twin = new THREE.LineSegments(new THREE.WireframeGeometry(shape), lineMaterial(BLUE, 0.7))
  shape.dispose()
  real.position.y = 0.5
  twin.position.y = -0.5
  twin.scale.y = -1 // a reflection, not a copy
  scene.add(real, twin)

  // The mirror plane, drawn as a dashed rule rather than a surface.
  const plane: number[] = []
  for (let i = 0; i <= 16; i++) {
    const x = (i / 16 - 0.5) * 2.1
    plane.push(x, 0, -0.5, x, 0, 0.5)
  }
  scene.add(segments(plane, INK, 0.1))
  scene.add(polyline([new THREE.Vector3(-1.05, 0, 0), new THREE.Vector3(1.05, 0, 0)], INK, 0.3))

  const linkMaterial = lineMaterial(WARM, 0.5)
  scene.add(new THREE.Line(positionsGeometry([0, 0.5, 0, 0, -0.5, 0]), linkMaterial))

  return {
    scene,
    camera,
    update(t) {
      real.rotation.y = t * 0.4
      real.rotation.x = Math.sin(t * 0.33) * 0.35
      // The twin trails the real object, then locks on: the sync is the story.
      const lock = 0.5 + 0.5 * Math.sin(t * 0.28)
      const lag = 0.55 * (1 - lock)
      twin.rotation.y = (t - lag) * 0.4
      twin.rotation.x = Math.sin((t - lag) * 0.33) * 0.35
      linkMaterial.opacity = 0.15 + lock * 0.6
    },
  }
}
