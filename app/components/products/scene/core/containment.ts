// CONTAINMENT FIELD — the faint geometric shell around the core.
//
// Auralis wraps its figure in a triangulated cylinder wireframe that reads as a
// holographic net. The idea ports; the execution doesn't. A cylinder around a
// rounded cube reads as a container you put an object INTO — a cage. An
// icosahedron shell at the same radius reads as the object's own field: a
// structural boundary, the way an engineering drawing shows an envelope.
//
// Two rules keep it a field rather than a HUD:
//   · It fades to nothing at the poles. An unfaded shell has a hard rim, and a
//     hard rim is a box.
//   · Opacity is low enough that it registers as structure, not as a graphic.
//     If you notice the wireframe before the core, it is too strong.
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineLoop,
  LineSegments,
  WireframeGeometry,
} from 'three'
import { GEOMETRY, PALETTE } from './core-config'

export interface ContainmentField {
  lines: LineSegments<WireframeGeometry, LineBasicMaterial>
  dispose: () => void
}

/**
 * The shell. `WireframeGeometry` over an icosahedron draws every triangle edge,
 * which is what gives the criss-crossed weave rather than a latitude/longitude
 * grid — the same reason Auralis wireframes a cylinder instead of drawing rings.
 *
 * `LineBasicMaterial` has no per-vertex alpha, so the pole fade is patched into
 * the shader: opacity is multiplied by `sin(π·t)` of the vertex's own latitude.
 * `opacity` below therefore sets the strength at the EQUATOR, not the average.
 */
export function createContainmentField(detail: number): ContainmentField {
  const shell = new IcosahedronGeometry(GEOMETRY.fieldRadius, detail)
  const geometry = new WireframeGeometry(shell)
  shell.dispose()

  const material = new LineBasicMaterial({
    color: new Color(PALETTE.field),
    transparent: true,
    opacity: 0.3,
    depthWrite: false,
    depthTest: false,
  })

  material.onBeforeCompile = (shader) => {
    shader.uniforms.uFieldRadius = { value: GEOMETRY.fieldRadius }
    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        '#include <common>\nvarying float vFade;\nuniform float uFieldRadius;',
      )
      .replace(
        '#include <begin_vertex>',
        [
          '#include <begin_vertex>',
          '\tfloat lat = position.y / uFieldRadius * 0.5 + 0.5;',
          '\tvFade = pow(clamp(sin(lat * 3.14159265), 0.0, 1.0), 1.6);',
        ].join('\n'),
      )
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying float vFade;')
      .replace(
        'vec4 diffuseColor = vec4( diffuse, opacity );',
        'vec4 diffuseColor = vec4( diffuse, opacity * vFade );',
      )
  }

  const lines = new LineSegments(geometry, material)
  lines.frustumCulled = false
  lines.renderOrder = 1

  return {
    lines,
    dispose: () => {
      geometry.dispose()
      material.dispose()
    },
  }
}

export interface OrbitRings {
  rings: LineLoop[]
  dispose: () => void
}

/**
 * Two thin off-axis rings. They give the object an axis to turn around — without
 * them a near-symmetrical cloud's rotation is almost impossible to read.
 *
 * Built as a `LineLoop` over an explicit circle of vertices, NOT as a wireframed
 * `RingGeometry`: a ring whose inner and outer radius are equal is a strip of
 * degenerate triangles, and wireframing it yields doubled edges of zero width.
 */
export function createOrbitRings(): OrbitRings {
  const SEGMENTS = 128
  const rings: LineLoop[] = []
  const disposers: (() => void)[] = []

  for (const [radius, tilt, opacity] of [
    [GEOMETRY.fieldRadius * 1.12, 0.42, 0.2],
    [GEOMETRY.fieldRadius * 1.38, -0.7, 0.12],
  ] as const) {
    const points = new Float32Array(SEGMENTS * 3)
    for (let i = 0; i < SEGMENTS; i += 1) {
      const a = (i / SEGMENTS) * Math.PI * 2
      points[i * 3] = Math.cos(a) * radius
      points[i * 3 + 1] = 0
      points[i * 3 + 2] = Math.sin(a) * radius
    }
    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new BufferAttribute(points, 3))

    const material = new LineBasicMaterial({
      color: new Color(PALETTE.field),
      transparent: true,
      opacity,
      depthWrite: false,
      depthTest: false,
    })

    const line = new LineLoop(geometry, material)
    line.rotation.x = tilt
    line.rotation.z = tilt * 0.5
    line.frustumCulled = false
    line.renderOrder = 1
    rings.push(line)
    disposers.push(() => {
      geometry.dispose()
      material.dispose()
    })
  }

  return { rings, dispose: () => disposers.forEach((d) => d()) }
}
