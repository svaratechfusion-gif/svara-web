/* @jsxRuntime classic */
/* @jsx React.createElement */
/* @jsxFrag React.Fragment */
/* @ts-nocheck — React component in a Vue app; excluded from vue-tsc */
// SVARA Resonance — prototype scene (Prototype A2). The PARTICLE FIELD is the
// subject. The plate is now a DELIBERATELY QUIET anchor: a low, near-flush,
// matte disc with a barely-there rim — no bowl walls, no chrome. The whole
// field+plate group sits right-of-centre so the composition opens negative
// space upper-left for the headline. Plate / room / lighting / post all read
// from the active theme (dark mineral · vanilla ceramic).

import React, { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import * as THREE from "three"
import { ParticleField } from "./ParticleField"
import { THEMES, resolveTheme } from "./theme"
import { GROUP_OFFSET, reviewCameraPose } from "./topology"

const FIXED_FOV = 32 // box/points diagnostic camera only

function smooth01(e0: number, e1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)))
  return t * t * (3 - 2 * t)
}

// The ONE fixed production/static-review camera — identical for A/B/C (frames the
// shared ANCHOR, never per-candidate) so compositions can be compared fairly.
function applyReviewPose(state: { camera: THREE.Camera; size: { width: number; height: number } }) {
  const aspect = state.size.width / Math.max(1, state.size.height)
  const pose = reviewCameraPose(aspect)
  const cam = state.camera as THREE.PerspectiveCamera
  cam.position.set(pose.pos[0], pose.pos[1], pose.pos[2])
  if (cam.fov !== pose.fov) { cam.fov = pose.fov; cam.updateProjectionMatrix() }
  cam.lookAt(pose.look[0], pose.look[1], pose.look[2])
}

// Diagnostic camera that shares the exact review pose (TOPOLOGY/COMPOSITION ↔ SHADER).
function ReviewCam() {
  useFrame((state) => applyReviewPose(state))
  return null
}

// Progress-motivated camera: intimate at dormant (feel the matter), a microscopic
// perspective nudge through vibration, then a slow dolly-back through migration so
// the whole resonance structure enters the frame by discovery — arriving BEFORE
// the lock. Never orbits; parallax settles toward lock so the final frame is calm.
function CameraRig({
  mouseState, progressRef, review,
}: {
  mouseState: React.MutableRefObject<{ x: number; y: number }>
  progressRef: React.MutableRefObject<number>
  review: boolean
}) {
  const cx = GROUP_OFFSET[0]
  useFrame((state) => {
    // STATIC REVIEW: the SHARED production camera (reviewCameraPose) — the exact
    // same coordinate space + framing the TOPOLOGY diagnostic uses, so a
    // composition approved here renders identically under the shader.
    if (review) { applyReviewPose(state); return }

    const p = progressRef.current
    const pull = smooth01(0.30, 0.92, p)          // dolly arrives by ~0.92 (before lock)
    const vib = smooth01(0.16, 0.40, p) * (1 - pull)
    // B1.2 framing: dolly stays close so the topology CROPS the edges (larger than
    // the screen), with a stronger elevation gain toward a "viewed-from-above"
    // intelligence fabric, and an off-centre look so it never reads as a centred
    // specimen on a stage.
    const baseZ = 3.2 + pull * 1.45 - vib * 0.06
    const baseY = 1.15 + pull * 0.95 + vib * 0.03
    const par = 0.16 * (1 - 0.75 * p)             // parallax authority settles at lock
    const lookX = cx - pull * 0.42                // off-centre: nucleus sits right, crops

    const m = mouseState.current
    const tx = lookX + m.x * par
    const ty = baseY + m.y * par * 0.5
    const cam = state.camera
    cam.position.x += (tx - cam.position.x) * 0.05
    cam.position.y += (ty - cam.position.y) * 0.05
    cam.position.z += (baseZ - cam.position.z) * 0.05
    cam.lookAt(lookX, 0.02 + pull * 0.02, 0)
  })
  return null
}

// Dormant anchor only: a low, matte, near-flush disc with NO rim (the old
// titanium rim read as a decorative orbit). It fades out as the field resonates,
// so State B is a topology floating in the room — never a specimen on a stage.
function Stage({ theme, progressRef }: {
  theme: "dark" | "light"
  progressRef: React.MutableRefObject<number>
}) {
  const s = THEMES[resolveTheme(theme)].scene
  const ref = useRef<THREE.Mesh>(null)
  const maxOpacity = theme === "light" ? 0.9 : 0.85
  useFrame(() => {
    const o = (1 - smooth01(0.25, 0.85, progressRef.current)) * maxOpacity
    const mesh = ref.current
    if (mesh) (mesh.material as THREE.Material & { opacity: number }).opacity = o
  })
  return (
    <mesh ref={ref} position={[0, -0.02, 0]} receiveShadow>
      <cylinderGeometry args={[2.5, 2.5, 0.04, 96]} />
      <meshStandardMaterial
        color={s.plateColor} metalness={s.plateMetal} roughness={s.plateRough}
        transparent opacity={maxOpacity}
      />
    </mesh>
  )
}

// ============================================================================
// DIAGNOSTIC HARNESS (B1.2 render debugging). Four isolated modes prove each
// layer of the pipeline independently. NONE of these use postprocessing, the
// cinematic/review camera rigs, custom shaders, progress, or animation.
// ============================================================================

// A known-safe fixed camera: dead-on at `target`, 11 units back and a little up.
function FixedCam({ target }: { target: [number, number, number] }) {
  useFrame((state) => {
    const cam = state.camera as THREE.PerspectiveCamera
    cam.position.set(target[0], target[1] + 2.5, target[2] + 11)
    if (cam.fov !== FIXED_FOV) { cam.fov = FIXED_FOV; cam.updateProjectionMatrix() }
    cam.lookAt(target[0], target[1], target[2])
  })
  return null
}

// TEST 1 — a large unmistakable unlit box at world origin.
function TestBox() {
  return (
    <mesh position={[0, 0.5, 0]}>
      <boxGeometry args={[2.4, 2.4, 2.4]} />
      <meshBasicMaterial color="#ff2d78" />
    </mesh>
  )
}

// TEST 2 — a hard-coded 8×8 grid of points with a basic PointsMaterial.
function TestPoints() {
  const geo = React.useMemo(() => {
    const n = 64
    const pos = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      pos[i * 3] = ((i % 8) / 7 - 0.5) * 4.5
      pos[i * 3 + 1] = (Math.floor(i / 8) / 7 - 0.5) * 4.5
      pos[i * 3 + 2] = 0
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3))
    return g
  }, [])
  const mat = React.useMemo(() => new THREE.PointsMaterial({ color: "#1e9fff", size: 0.4, sizeAttenuation: true }), [])
  React.useEffect(() => () => { geo.dispose(); mat.dispose() }, [geo, mat])
  return <points geometry={geo} material={mat} />
}

// Reports the true end-of-pipeline state to the DOM HUD every few frames.
function Diag({ onStats, mode, positions }: {
  onStats?: (s: unknown) => void
  mode: string
  positions: number
}) {
  const nRef = useRef(0)
  useFrame((state) => {
    if ((nRef.current++ & 7) !== 0) return
    const gl = state.gl as THREE.WebGLRenderer
    const ctx = gl.getContext()
    const cam = state.camera as THREE.PerspectiveCamera
    const dbg = (window as unknown as { __resonanceDebug?: Record<string, unknown> }).__resonanceDebug
    const rt = (window as unknown as { __resonanceRuntime?: Record<string, unknown> }).__resonanceRuntime
    // world (post-object) bounds = local target bounds + the group offset
    const tb = dbg?.targetBounds as { minX: number; maxX: number; minZ: number; maxZ: number } | undefined
    const worldBounds = tb ? {
      minX: +(tb.minX + GROUP_OFFSET[0]).toFixed(2), maxX: +(tb.maxX + GROUP_OFFSET[0]).toFixed(2),
      minZ: +(tb.minZ + GROUP_OFFSET[2]).toFixed(2), maxZ: +(tb.maxZ + GROUP_OFFSET[2]).toFixed(2),
    } : null
    onStats?.({
      canvasW: gl.domElement.width, canvasH: gl.domElement.height,
      webgl: ctx && !ctx.isContextLost() ? "OK" : "FAIL",
      drawCalls: gl.info.render.calls, points: gl.info.render.points, triangles: gl.info.render.triangles,
      mode, positions,
      cam: [+cam.position.x.toFixed(1), +cam.position.y.toFixed(1), +cam.position.z.toFixed(1)],
      fov: +cam.fov.toFixed(1),
      objPos: mode === "box" || mode === "points" ? [0, 0, 0] : GROUP_OFFSET,
      objRot: [0, 0, 0], objScale: [1, 1, 1],
      progress: rt?.uProgress ?? (mode === "topology" ? 1 : "—"),
      rawBounds: dbg?.rawBounds ?? null,
      worldBounds,
    })
  })
  return null
}

function Scene({
  count, dpr, theme, mode, topology, playState, speed, replayNonce, immediate, version, review, debugPoints, debugMode, onProgress, onStats, mouseState,
}: {
  count: number; dpr: number; theme: "dark" | "light"
  mode: number; topology: "A" | "B" | "C"; playState: "A" | "B"; speed: number; replayNonce: number; immediate: boolean
  version: "b1" | "b11"; review: boolean; debugPoints: boolean
  debugMode: "box" | "points" | "topology" | "composition" | "shader"
  onProgress?: (p: number) => void; onStats?: (s: unknown) => void
  mouseState: React.MutableRefObject<{ x: number; y: number }>
}) {
  const s = THEMES[resolveTheme(theme)].scene
  const progressRef = useRef(0)

  // ---- DIAGNOSTIC MODES: isolated pipeline tests, fixed camera, no postproc ----
  const showField = debugMode === "topology" || debugMode === "composition"
  if (debugMode === "box" || debugMode === "points" || showField) {
    return (
      <>
        {/* box/points use a generic fixed cam; TOPOLOGY & COMPOSITION use the
            SHARED review pose so they match SHADER exactly (coordinate parity). */}
        {showField ? <ReviewCam /> : <FixedCam target={[0, 0, 0]} />}
        <Diag onStats={onStats} mode={debugMode} positions={showField ? count : debugMode === "points" ? 64 : 0} />
        {debugMode === "box" && <TestBox />}
        {debugMode === "points" && <TestPoints />}
        {/* composition map: guaranteed light backdrop so dark density reads */}
        {debugMode === "composition" && (
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[GROUP_OFFSET[0] + 1, -0.5, 0]}>
            <planeGeometry args={[50, 50]} />
            <meshBasicMaterial color="#f2efe6" />
          </mesh>
        )}
        {showField && (
          <group position={GROUP_OFFSET}>
            <ParticleField
              count={count} dpr={dpr} theme={theme}
              mode={mode} topology={topology} playState="B" speed={speed} replayNonce={replayNonce} immediate={true}
              version={version} review={false}
              debugPoints={debugMode === "topology"} compositionMap={debugMode === "composition"}
              progressRef={progressRef}
              mouseState={mouseState} offsetX={GROUP_OFFSET[0]} offsetZ={GROUP_OFFSET[2]}
            />
          </group>
        )}
      </>
    )
  }

  // ---- NORMAL SCENE (debugMode === "shader") ----
  return (
    <>
      <ambientLight intensity={s.ambientIntensity} color={s.ambientColor} />
      <directionalLight position={s.keyPos} intensity={s.keyIntensity} color={s.keyColor} castShadow />
      <directionalLight position={[-4, 2.5, -2]} intensity={s.fillIntensity} color={s.fillColor} />

      <Suspense fallback={null}>
        <Environment preset={s.envPreset} background={false} environmentIntensity={s.envIntensity} />
      </Suspense>

      <group position={GROUP_OFFSET}>
        <Stage theme={theme} progressRef={progressRef} />
        <ParticleField
          count={count} dpr={dpr} theme={theme}
          mode={mode} topology={topology} playState={playState} speed={speed} replayNonce={replayNonce} immediate={immediate}
          version={version} review={review} debugPoints={debugPoints} progressRef={progressRef} onProgress={onProgress}
          mouseState={mouseState} offsetX={GROUP_OFFSET[0]} offsetZ={GROUP_OFFSET[2]}
        />
      </group>

      {/* room floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.06, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color={s.floorColor} roughness={0.96} metalness={0} />
      </mesh>

      <CameraRig mouseState={mouseState} progressRef={progressRef} review={review} />
      <Diag onStats={onStats} mode="shader" positions={count} />
    </>
  )
}

export function ResonanceCanvas({
  count = 70000,
  dprCap = 2,
  bloom = true,
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
  debugMode = "shader",
  onProgress,
  onStats,
  mouseState,
}: {
  count?: number
  dprCap?: number
  bloom?: boolean
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
  debugMode?: "box" | "points" | "topology" | "composition" | "shader"
  onProgress?: (p: number) => void
  onStats?: (s: unknown) => void
  mouseState: React.MutableRefObject<{ x: number; y: number }>
}) {
  const s = THEMES[resolveTheme(theme)].scene
  const isTest = debugMode === "box" || debugMode === "points" || debugMode === "topology"
  return (
    <Canvas
      shadows
      dpr={[1, dprCap]}
      camera={{ position: [0.4, 1.15, 3.2], fov: 32, near: 0.1, far: 60 }}
      gl={{
        outputColorSpace: THREE.SRGBColorSpace,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: s.toneExposure,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <Scene
        count={count} dpr={dprCap} theme={theme}
        mode={mode} topology={topology} playState={playState} speed={speed} replayNonce={replayNonce} immediate={immediate}
        version={version} review={review} debugPoints={debugPoints} debugMode={debugMode}
        onProgress={onProgress} onStats={onStats}
        mouseState={mouseState}
      />
      {/* postprocessing is DISABLED in diagnostic test modes so the pipeline is
          isolated (a failing EffectComposer would blank both materials). */}
      {bloom && !isTest && (
        <EffectComposer>
          <Bloom luminanceThreshold={s.bloomThreshold} luminanceSmoothing={0.25} intensity={s.bloomIntensity} mipmapBlur />
        </EffectComposer>
      )}
    </Canvas>
  )
}
