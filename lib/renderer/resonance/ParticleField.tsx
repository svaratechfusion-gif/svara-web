/* @jsxRuntime classic */
/* @jsx React.createElement */
/* @jsxFrag React.Fragment */
/* @ts-nocheck — React component in a Vue app; excluded from vue-tsc */
// SVARA Resonance — particle field (Prototype B1, State A dormant → State B lock).
// The dormant distribution (density field with currents + typographic basin) is
// unchanged from A3. On top, each grain now carries a precomputed NODAL TARGET
// (aTarget), a resonance ENERGY (aEnergy, antinode=1), and a staggered DELAY
// (aDelay, regional). A single uProgress uniform, advanced here on a timeline,
// choreographs the whole A→B motion in the vertex shader. Mode changes rebuild
// targets; A→B replay only re-animates uProgress (no remount).

import React, { useMemo, useEffect, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import vertexShader from "./resonance.vert.glsl?raw"
import fragmentShader from "./resonance.frag.glsl?raw"
import { THEMES, resolveTheme } from "./theme"
import { PLATE_RADIUS, FIELD_RADIUS, SURFACE_Y } from "./chladni"
import { generateTargets, resolveTopo } from "./topology"

// full A→B transition length (seconds) at speed 1 — B1.1 is slightly slower to
// let disturbance → discovery read; B1 keeps the original pacing for comparison.
const DURATION_B11 = 6.3
const DURATION_B1 = 5.5

// signal entry point (field-local xz): the disturbance front sweeps from here
// across the field toward the headline territory.
const ENTRY: [number, number] = [1.6, 1.2]

// ---- tiny value noise (deterministic) ----
function hash2(x: number, y: number): number {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453
  return s - Math.floor(s)
}
function vnoise(x: number, y: number): number {
  const xi = Math.floor(x), yi = Math.floor(y)
  const xf = x - xi, yf = y - yi
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf)
  const a = hash2(xi, yi), b = hash2(xi + 1, yi)
  const c = hash2(xi, yi + 1), d = hash2(xi + 1, yi + 1)
  return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v
}
function fbm(x: number, y: number): number {
  let f = 0, amp = 0.5, freq = 1
  for (let o = 0; o < 3; o++) { f += amp * vnoise(x * freq, y * freq); amp *= 0.5; freq *= 2.03 }
  return f
}
function smooth(e0: number, e1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)))
  return t * t * (3 - 2 * t)
}
function lerp3(a: number[], b: number[], t: number): [number, number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]
}

// dormant density: radial spill · clumps · broad curved currents · typo basin
function densityAt(x: number, z: number): number {
  const r = Math.hypot(x, z)
  if (r > FIELD_RADIUS) return 0
  const onPlate = 1 - smooth(PLATE_RADIUS * 0.62, FIELD_RADIUS, r)
  const spill = 0.16 * (1 - smooth(PLATE_RADIUS, FIELD_RADIUS, r))
  const radial = Math.max(onPlate, spill)
  const clump = smooth(0.34, 0.82, fbm(x * 0.6 + 3.2, z * 0.6 - 1.7))
  const cx = x * 0.82 - z * 0.36
  const bands = 0.72 + 0.28 * (0.5 + 0.5 * Math.sin(cx * 0.9 + fbm(x * 0.3, z * 0.3) * 3.4))
  const wx = (x + 1.3) * 0.82
  const wz = z + 1.0
  const warp = (fbm(x * 0.5 + 2.1, z * 0.5 - 4.3) - 0.44) * 0.9
  const bd = Math.hypot(wx, wz) + warp
  const basin = 0.36 + 0.64 * smooth(0.5, 1.7, bd)
  const ridge = 1 + 0.16 * Math.exp(-Math.pow((bd - 1.85) / 0.55, 2))
  return radial * (0.14 + 0.92 * clump) * bands * basin * ridge
}

export function ParticleField({
  count = 70000,
  dpr = 2,
  theme = "dark",
  mode = 1,
  topology = "A",
  playState = "A",
  speed = 1,
  replayNonce = 0,
  immediate = false,
  version = "b11",
  review = false,
  debugPoints = false,
  compositionMap = false,
  mouseState,
  progressRef,
  onProgress,
  offsetX = 0,
  offsetZ = 0,
}: {
  count?: number
  dpr?: number
  theme?: "dark" | "light"
  mode?: number
  topology?: "A" | "B" | "C"
  playState?: "A" | "B"
  speed?: number
  replayNonce?: number
  immediate?: boolean
  version?: "b1" | "b11"
  review?: boolean
  debugPoints?: boolean
  compositionMap?: boolean
  mouseState?: { current: { x: number; y: number } }
  progressRef?: { current: number }
  onProgress?: (p: number) => void
  offsetX?: number
  offsetZ?: number
}) {
  const T = THEMES[resolveTheme(theme)]
  const { camera } = useThree()
  const art = version === "b1" ? 0 : 1
  const duration = version === "b1" ? DURATION_B1 : DURATION_B11

  const geo = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const targets = new Float32Array(count * 3)
    const aSize = new Float32Array(count)
    const aSeed = new Float32Array(count)
    const aSpec = new Float32Array(count)
    const aTension = new Float32Array(count)
    const aEnergy = new Float32Array(count)
    const aDelay = new Float32Array(count)
    const aFlow = new Float32Array(count)
    const aTint = new Float32Array(count * 3)

    const P = T.grain

    // ---- 1. dormant matter: sample State-A positions + per-grain material ----
    const dormAng = new Float32Array(count)
    let i = 0
    let guard = 0
    const maxGuard = count * 40
    while (i < count && guard < maxGuard) {
      guard++
      const ang = Math.random() * Math.PI * 2
      const rr = Math.sqrt(Math.random()) * FIELD_RADIUS
      let x = Math.cos(ang) * rr
      let z = Math.sin(ang) * rr
      if (Math.random() > densityAt(x, z)) continue

      for (let k = 0; k < 2; k++) {
        const e = 0.1
        const gx = vnoise((x + e) * 1.4, z * 1.4) - vnoise((x - e) * 1.4, z * 1.4)
        const gz = vnoise(x * 1.4, (z + e) * 1.4) - vnoise(x * 1.4, (z - e) * 1.4)
        x += gx * 0.4
        z += gz * 0.4
      }

      const h = Math.pow(Math.random(), 4.5)
      const y = SURFACE_Y + h * 0.24 + vnoise(x * 3.0, z * 3.0) * 0.008
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      dormAng[i] = Math.atan2(z, x)

      // size TIERS: ~78% micro · ~18% medium · ~4% large accents
      const rc = Math.random()
      let sizeMul: number
      if (rc < 0.78) sizeMul = 0.3 + Math.random() * 0.3
      else if (rc < 0.96) sizeMul = 0.68 + Math.random() * 0.75
      else sizeMul = 1.7 + Math.random() * 1.5
      aSize[i] = sizeMul

      aSeed[i] = Math.random()
      aTension[i] = 0.2 + 0.8 * fbm(x * 0.7 - 5.1, z * 0.7 + 9.3)

      const mrand = Math.random()
      let base: number[]
      let sp: number
      if (mrand < 0.56) { base = P.graphite; sp = 0.12 }
      else if (mrand < 0.83) { base = P.titanium; sp = 1.05 }
      else if (mrand < 0.95) { base = P.warmSilver; sp = 0.6 }
      else { base = P.ceramic; sp = 0.32 }
      if (Math.random() < 0.02) base = lerp3(base, P.lavender, 0.55)

      const j = (Math.random() - 0.5) * 0.03
      aTint[i * 3] = Math.max(0, base[0] + j)
      aTint[i * 3 + 1] = Math.max(0, base[1] + j * 0.7)
      aTint[i * 3 + 2] = Math.max(0, base[2] + j * 0.4)
      aSpec[i] = sp * (0.7 + 0.6 * Math.random()) * (h > 0.6 ? 1.3 : 1.0)

      i++
    }
    const n = i

    // ---- 2. intelligence topology: generate the final distribution via the
    // candidate's OWN macro-generation strategy (A artery / B terrain / C graph).
    // Returns per-particle positions + a density TIER (0 dense .. 1 atmospheric).
    const gen = generateTargets(resolveTopo(topology), n)
    const tAng = new Float32Array(n)
    for (let k = 0; k < n; k++) tAng[k] = Math.atan2(gen.pos[k * 3 + 2], gen.pos[k * 3])

    // ---- 3. assign by angular rank → migration mostly local, not crossing ----
    const dOrder = Array.from({ length: n }, (_, k) => k).sort((a, b) => dormAng[a] - dormAng[b])
    const tOrder = Array.from({ length: n }, (_, k) => k).sort((a, b) => tAng[a] - tAng[b])
    for (let k = 0; k < n; k++) {
      const di = dOrder[k]
      const tk = tOrder[k]
      const tx = gen.pos[tk * 3], ty = gen.pos[tk * 3 + 1], tz = gen.pos[tk * 3 + 2]
      const tier = gen.tier[tk] // 0 dense structure .. 1 atmospheric
      targets[di * 3] = tx
      targets[di * 3 + 1] = SURFACE_Y + ty
      targets[di * 3 + 2] = tz

      // density HIERARCHY: dense structure is energetic and leads; atmospheric
      // grains settle last. THREE perceptual particle scales for cinematic depth:
      // MACRO grains (rare, concentrated in dense regions), COMPUTATIONAL grains
      // (primary body), and MICRO dust (very small — atmosphere / boundaries).
      aEnergy[di] = 1 - tier
      aFlow[di] = Math.min(1, Math.max(0, tier + (Math.random() - 0.5) * 0.15))
      const rs = Math.random()
      const macroChance = tier < 0.2 ? 0.09 : tier < 0.45 ? 0.04 : 0 // macro concentrates in the hero
      if (rs < macroChance) aSize[di] = 1.8 + Math.random() * 1.4
      else if (tier > 0.78) aSize[di] = 0.2 + Math.random() * 0.16
      else aSize[di] = 0.4 + Math.random() * 0.5 * (1 - 0.3 * tier) // denser regions read a touch larger
      aSpec[di] *= 1 - 0.4 * tier
      const regional = 0.5 + 0.5 * Math.sin(tAng[tk] * 2.0 + Math.hypot(tx, tz) * 1.1)
      aDelay[di] = Math.min(1, 0.35 * Math.random() + 0.65 * regional)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.BufferAttribute(positions.subarray(0, n * 3), 3))
    g.setAttribute("aTarget", new THREE.BufferAttribute(targets.subarray(0, n * 3), 3))
    g.setAttribute("aSize", new THREE.BufferAttribute(aSize.subarray(0, n), 1))
    g.setAttribute("aSeed", new THREE.BufferAttribute(aSeed.subarray(0, n), 1))
    g.setAttribute("aSpec", new THREE.BufferAttribute(aSpec.subarray(0, n), 1))
    g.setAttribute("aTension", new THREE.BufferAttribute(aTension.subarray(0, n), 1))
    g.setAttribute("aEnergy", new THREE.BufferAttribute(aEnergy.subarray(0, n), 1))
    g.setAttribute("aDelay", new THREE.BufferAttribute(aDelay.subarray(0, n), 1))
    g.setAttribute("aFlow", new THREE.BufferAttribute(aFlow.subarray(0, n), 1))
    g.setAttribute("aTint", new THREE.BufferAttribute(aTint.subarray(0, n * 3), 3))
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(0.5, 0.1, 0), 6.0)

    // DEV verification hook: prove selector → state → geometry regeneration and
    // that the generated coordinates are finite / in-frame (read in a browser).
    if (typeof window !== "undefined") {
      let cs = 0, nan = 0, inf = 0
      let minx = Infinity, maxx = -Infinity, miny = Infinity, maxy = -Infinity, minz = Infinity, maxz = -Infinity
      let rminx = Infinity, rmaxx = -Infinity, rminz = Infinity, rmaxz = -Infinity // raw dormant attr
      for (let k = 0; k < n; k++) {
        const tx = targets[k * 3], ty = targets[k * 3 + 1], tz = targets[k * 3 + 2]
        if (Number.isNaN(tx) || Number.isNaN(ty) || Number.isNaN(tz)) nan++
        if (!Number.isFinite(tx) || !Number.isFinite(ty) || !Number.isFinite(tz)) inf++
        cs += tx * 1.13 + tz * 0.79
        if (tx < minx) minx = tx; if (tx > maxx) maxx = tx
        if (ty < miny) miny = ty; if (ty > maxy) maxy = ty
        if (tz < minz) minz = tz; if (tz > maxz) maxz = tz
        const px = positions[k * 3], pz = positions[k * 3 + 2]
        if (px < rminx) rminx = px; if (px > rmaxx) rmaxx = px
        if (pz < rminz) rminz = pz; if (pz > rmaxz) rmaxz = pz
      }
      g.computeBoundingBox()
      const bs = g.boundingSphere!
      ;(window as unknown as { __resonanceDebug?: unknown }).__resonanceDebug = {
        topology: resolveTopo(topology), review, count: n, geometryUUID: g.uuid,
        positionAttrCount: g.getAttribute("position").count,
        checksum: Math.round(cs), nanCount: nan, infCount: inf,
        // RAW = the actual position buffer (dormant scatter, shader displaces it);
        // TARGET = where grains render after shader displacement (local field xz).
        rawBounds: { minX: +rminx.toFixed(2), maxX: +rmaxx.toFixed(2), minZ: +rminz.toFixed(2), maxZ: +rmaxz.toFixed(2) },
        targetBounds: {
          minX: +minx.toFixed(2), maxX: +maxx.toFixed(2),
          minY: +miny.toFixed(3), maxY: +maxy.toFixed(3),
          minZ: +minz.toFixed(2), maxZ: +maxz.toFixed(2),
        },
        boundingSphere: { cx: +bs.center.x.toFixed(2), cy: +bs.center.y.toFixed(2), cz: +bs.center.z.toFixed(2), radius: +bs.radius.toFixed(2) },
      }
    }

    // Debug-bypass geometry: the SAME topology targets as a plain position buffer,
    // so a basic THREE.PointsMaterial (no custom shader) can render them directly.
    const dg = new THREE.BufferGeometry()
    dg.setAttribute("position", new THREE.BufferAttribute(targets.subarray(0, n * 3), 3))
    dg.boundingSphere = g.boundingSphere!.clone() // reuse g's sphere (not the block-scoped `bs`)
    return { g, dg }
  }, [count, theme, mode, topology])
  const geometry = geo.g
  const debugGeometry = geo.dg

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: T.amplitude },
        uSize: { value: T.size },
        uDpr: { value: dpr },
        uProgress: { value: immediate && playState === "B" ? 1 : 0 },
        uArt: { value: art },
        uReview: { value: review ? 1 : 0 },
        uEntry: { value: new THREE.Vector2(ENTRY[0], ENTRY[1]) },
        uLightDir: { value: new THREE.Vector3(...T.lightDir).normalize() },
        uWarm: { value: new THREE.Color(...T.warm) },
        uAmbient: { value: new THREE.Color(...T.ambient) },
        uLavender: { value: new THREE.Color(...T.lavenderSpec) },
        uExposure: { value: T.grainExposure },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uPointerForce: { value: 0 },
        uPointerRadius: { value: 1.35 },
      },
      transparent: true,
      depthWrite: true,
      depthTest: true,
      blending: THREE.NormalBlending,
    })
  }, [dpr, theme])

  // basic bypass material — plain graphite points, large size, NO custom shader,
  // NO aerial fade — used by ?debugpoints to isolate shader vs pipeline bugs.
  const debugMat = useMemo(
    () => new THREE.PointsMaterial({ color: new THREE.Color(0.14, 0.15, 0.18), size: 0.05, sizeAttenuation: true }),
    [],
  )

  // COMPOSITION MAP — dark graphite, CONSTANT screen-size points, opaque, no
  // lighting / glow / transparency / depth fade. Reads pure macro density on a
  // light background (dense = solid dark coverage, sparse = speckled).
  const compMat = useMemo(
    () => new THREE.PointsMaterial({
      color: new THREE.Color(0.09, 0.1, 0.13), size: 2.4, sizeAttenuation: false,
      transparent: false, depthWrite: false,
    }),
    [],
  )

  // dispose each resource independently — a mode change swaps geometry while the
  // material persists, so a combined effect would wrongly dispose the live material.
  useEffect(() => () => { geometry.dispose(); debugGeometry.dispose() }, [geometry, debugGeometry])
  useEffect(() => () => material.dispose(), [material])
  useEffect(() => () => debugMat.dispose(), [debugMat])
  useEffect(() => () => compMat.dispose(), [compMat])

  const reduced = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  )

  // ---- progress timeline controller (A↔B, replay) ----
  const ctl = useRef({
    prog: immediate && playState === "B" ? 1 : 0,
    target: playState === "B" ? 1 : 0,
    nonce: replayNonce,
  })
  // sync latest props into the ref each render (cheap, keeps useFrame current)
  ctl.current.target = playState === "B" ? 1 : 0
  ctl.current.speed = speed
  ctl.current.duration = duration
  material.uniforms.uArt!.value = art // version toggle takes effect live
  material.uniforms.uReview!.value = review ? 1 : 0
  // static review enlarges grains so the composition reads at the review framing
  material.uniforms.uSize!.value = T.size * (review ? 2.5 : 1)
  if (replayNonce !== ctl.current.nonce) {
    ctl.current.nonce = replayNonce
    ctl.current.prog = 0
    ctl.current.target = 1
  }
  const lastReported = useRef(-1)

  // pointer projection state
  const ptr = useRef({ sx: 0, sz: 0, force: 0 })
  const ray = useMemo(() => new THREE.Raycaster(), [])
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), [])
  const hit = useMemo(() => new THREE.Vector3(), [])
  const ndc = useMemo(() => new THREE.Vector2(), [])
  const pointsRef = useRef<THREE.Points>(null)
  const frameN = useRef(0)

  useFrame((state, dt) => {
    // honour prefers-reduced-motion: freeze time so the field holds a static
    // frame (dormant or locked) instead of trembling/drifting continuously.
    if (!reduced) material.uniforms.uTime!.value = state.clock.elapsedTime

    // DEV RUNTIME hook (read in a browser): the actual end-of-pipeline state —
    // canvas size, draw calls/points, camera, material, uProgress, point size.
    if (typeof window !== "undefined" && (frameN.current++ & 15) === 0) {
      const gl = state.gl as THREE.WebGLRenderer
      const cam = state.camera as THREE.PerspectiveCamera
      const pts = pointsRef.current
      ;(window as unknown as { __resonanceRuntime?: unknown }).__resonanceRuntime = {
        canvas: { w: gl.domElement.width, h: gl.domElement.height },
        contextLost: gl.getContext().isContextLost?.() ?? "n/a",
        drawCalls: gl.info.render.calls, pointsDrawn: gl.info.render.points,
        camera: {
          pos: [+cam.position.x.toFixed(2), +cam.position.y.toFixed(2), +cam.position.z.toFixed(2)],
          near: cam.near, far: cam.far, fov: cam.fov,
        },
        uProgress: +material.uniforms.uProgress!.value.toFixed(3),
        uReview: material.uniforms.uReview!.value,
        uSize: +material.uniforms.uSize!.value.toFixed(2),
        material: { visible: (pts?.visible ?? "n/a"), transparent: material.transparent, opacity: material.opacity, using: debugPoints ? "PointsMaterial(bypass)" : "ShaderMaterial" },
      }
    }

    // STATIC REVIEW: lock instantly to the fully-formed topology (no transition,
    // no pointer, no progress-driven framing). Candidate switching = mockup swap.
    if (review) {
      material.uniforms.uProgress!.value = 1
      if (progressRef) progressRef.current = 1
      return
    }

    // advance the transition toward its target (reset is a touch faster)
    const c = ctl.current
    const rate = (c.speed || 1) / (c.duration || DURATION_B11)
    if (reduced) c.prog = c.target // honour reduced motion: no animated transition
    else if (c.prog < c.target) c.prog = Math.min(c.target, c.prog + rate * dt)
    else if (c.prog > c.target) c.prog = Math.max(c.target, c.prog - rate * 1.6 * dt)
    material.uniforms.uProgress!.value = c.prog

    // publish progress: to the camera rig (shared ref) and to the DOM host
    // (throttled) so the typography hierarchy can breathe with the phenomenon.
    if (progressRef) progressRef.current = c.prog
    if (onProgress && Math.abs(c.prog - lastReported.current) > 0.008) {
      lastReported.current = c.prog
      onProgress(c.prog)
    }

    // pointer pressure (inertia + damping); authority fade lives in the shader
    let present = 0
    const m = mouseState?.current
    if (m && !reduced) {
      ndc.set(m.x, m.y)
      ray.setFromCamera(ndc, camera)
      if (ray.ray.intersectPlane(plane, hit)) {
        const lx = hit.x - offsetX
        const lz = hit.z - offsetZ
        if (Math.hypot(lx, lz) < FIELD_RADIUS + 0.6) {
          present = 1
          ptr.current.sx += (lx - ptr.current.sx) * 0.08
          ptr.current.sz += (lz - ptr.current.sz) * 0.08
        }
      }
    }
    ptr.current.force += (present - ptr.current.force) * 0.05
    material.uniforms.uPointer!.value.set(ptr.current.sx, ptr.current.sz)
    material.uniforms.uPointerForce!.value = ptr.current.force
  })

  const useBypassGeo = debugPoints || compositionMap
  return (
    <points
      ref={pointsRef}
      geometry={useBypassGeo ? debugGeometry : geometry}
      material={compositionMap ? compMat : debugPoints ? debugMat : material}
    />
  )
}
