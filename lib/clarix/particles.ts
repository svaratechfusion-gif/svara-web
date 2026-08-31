import * as THREE from 'three'

/**
 * Builds the point cloud that spin-assembles the SVARA logo.
 *
 * The logo is rasterised to a small canvas and every opaque pixel becomes
 * particles: one on the front face, one on the back, and — for pixels on the
 * silhouette — a few more spread through the thickness, so the assembled mark
 * reads as a solid slab rather than two flat sheets. A field of ambient points
 * is scattered far around it for depth.
 *
 * Each particle carries the position it must END at, a random cylindrical
 * origin it starts from, and a delay keyed to its distance from the centre, so
 * the assembly rushes inward as a radial wave. The motion itself is entirely on
 * the GPU (see PARTICLE_VERT).
 */

/** Rasterisation width, px. Height follows the artwork's aspect. */
const CANVAS_WIDTH = 450
/** A pixel counts as ink above this alpha. */
const ALPHA_THRESHOLD = 128
/** Depth of the extruded slab, world units. */
const THICKNESS = 0.25
/** Extra points spread through the thickness on silhouette pixels. */
const SIDE_POINTS = 3
/** Background points, scattered wide for depth. */
const AMBIENT_COUNT = 3500
/** World width of the assembled logo = CANVAS_WIDTH * LOGO_SCALE. */
const LOGO_SPAN = 5.7

interface Point {
  x: number
  y: number
  z: number
  isAmbient: number
}

/** Rasterise `image`, sample its alpha, and return the finished geometry. */
export function buildLogoParticles(image: HTMLImageElement): THREE.BufferGeometry {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) throw new Error('[clarix] 2D context unavailable')

  const aspect = image.height / image.width
  canvas.width = CANVAS_WIDTH
  canvas.height = Math.floor(CANVAS_WIDTH * aspect)

  ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)

  const alphaAt = (x: number, y: number): number => {
    if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) return 0
    return imgData.data[(y * canvas.width + x) * 4 + 3]!
  }

  const points: Point[] = []

  for (let y = 0; y < canvas.height; y += 1) {
    for (let x = 0; x < canvas.width; x += 1) {
      if (alphaAt(x, y) <= ALPHA_THRESHOLD) continue

      // Front and back faces
      points.push({ x, y, z: THICKNESS / 2, isAmbient: 0 })
      points.push({ x, y, z: -THICKNESS / 2, isAmbient: 0 })

      // A silhouette pixel also gets points through the thickness, so the slab
      // has sides instead of reading as two detached sheets.
      const isEdge = alphaAt(x - 1, y) <= ALPHA_THRESHOLD
        || alphaAt(x + 1, y) <= ALPHA_THRESHOLD
        || alphaAt(x, y - 1) <= ALPHA_THRESHOLD
        || alphaAt(x, y + 1) <= ALPHA_THRESHOLD
      if (!isEdge) continue

      for (let s = 1; s < SIDE_POINTS; s += 1) {
        points.push({ x, y, z: -THICKNESS / 2 + (THICKNESS * s) / SIDE_POINTS, isAmbient: 0 })
      }
    }
  }

  // Ambient depth field — a tall, wide galaxy the logo assembles inside.
  for (let i = 0; i < AMBIENT_COUNT; i += 1) {
    points.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * canvas.width * 3.0,
      y: canvas.height / 2 + (Math.random() - 0.5) * canvas.height * 10.0,
      z: (Math.random() - 0.5) * 20.0,
      isAmbient: 1,
    })
  }

  const logoScale = LOGO_SPAN / canvas.width
  const count = points.length

  const positions = new Float32Array(count * 3)
  const randomPositions = new Float32Array(count * 3)
  const delays = new Float32Array(count)
  const isAmbientArray = new Float32Array(count)

  for (let i = 0; i < count; i += 1) {
    const pt = points[i]!

    // Jitter breaks the perfect pixel grid so the mark reads as ink, not a raster.
    const jitterX = (Math.random() - 0.5) * 1.2
    const jitterY = (Math.random() - 0.5) * 1.2
    const jitterZ = (Math.random() - 0.5) * 0.1

    positions[i * 3 + 0] = (pt.x + jitterX - canvas.width / 2) * logoScale
    positions[i * 3 + 1] = -(pt.y + jitterY - canvas.height / 2) * logoScale
    positions[i * 3 + 2] = pt.z + jitterZ

    // Origin: a wide cylinder, so the scatter is radially symmetric.
    const angle = Math.random() * Math.PI * 2
    const radius = 25 + Math.random() * 25
    randomPositions[i * 3 + 0] = Math.cos(angle) * radius
    randomPositions[i * 3 + 1] = (Math.random() - 0.5) * 45
    randomPositions[i * 3 + 2] = Math.sin(angle) * radius

    // Delay by distance from centre → the assembly lands as a radial wave.
    const dx = pt.x - canvas.width / 2
    const dy = pt.y - canvas.height / 2
    const normalizedDist = Math.sqrt(dx * dx + dy * dy) / (canvas.width / 2)
    delays[i] = Math.random() * 0.5 + normalizedDist * 0.5

    isAmbientArray[i] = pt.isAmbient
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('aRandomPosition', new THREE.BufferAttribute(randomPositions, 3))
  geometry.setAttribute('aDelay', new THREE.BufferAttribute(delays, 1))
  geometry.setAttribute('aIsAmbient', new THREE.BufferAttribute(isAmbientArray, 1))
  return geometry
}
