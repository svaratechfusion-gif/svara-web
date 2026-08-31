/* @jsxRuntime classic */
/* @jsx React.createElement */
/* @jsxFrag React.Fragment */
/* @ts-nocheck — React component in a Vue app; excluded from vue-tsc */
// SVARA Intelligence Core — production R3F scene.
// The GPU particle sphere (Fibonacci-distributed, sapphire + white, mouse-
// reactive) is the centerpiece — restored as the brand signature and
// upgraded in place, not replaced. It sits inside a glass shell with a
// bright inner energy core, surrounded by three independently rotating
// orbital rings carrying light-pulse trails, plus an ambient particle
// field in the background. Physically based rendering (glass, brushed
// titanium, acrylic, emissive sapphire), HDR environment lighting, contact
// shadows, ACES tone mapping, bloom on the brightest particles. GSAP
// scroll progress drives dissolution as the user scrolls past the hero.
// Mouse-reactive camera + particle displacement. Designed for reuse
// across the site.

import React, { useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import {
  Environment,
  ContactShadows,
  Sparkles,
} from "@react-three/drei"
import { EffectComposer, Bloom, SSAO } from "@react-three/postprocessing"
import * as THREE from "three"

// ================================================================
// TYPES
// ================================================================

/** Mutable state shared between Vue and React. The Vue wrapper writes to
 *  these fields; the React scene reads them in useFrame.
 *
 *  Passed as a { current: SvaraCoreState } object (mimicking
 *  React.MutableRefObject) so the Vue side mutates .current directly
 *  and the React side reads .current each frame. */
export interface SvaraCoreState {
  scrollProgress: number // 0…1 — driven by GSAP ScrollTrigger
  mouseX: number // normalized −1…1
  mouseY: number // normalized −1…1
}

// ================================================================
// PBR MATERIALS — EXPORTED factory functions for reuse across site.
// Import in any R3F scene:
//   import { createGlassMaterial } from '~~/lib/renderer'
// ================================================================

export function createGlassMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0.82, 0.88, 0.97),
    metalness: 0,
    roughness: 0.04,
    transmission: 0.88,
    thickness: 0.5,
    ior: 1.5,
    clearcoat: 0.12,
    clearcoatRoughness: 0.25,
    envMapIntensity: 1.4,
    transparent: true,
    opacity: 0.65,
    side: THREE.DoubleSide,
  })
}

export function createTitaniumMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0.72, 0.76, 0.81),
    metalness: 0.92,
    roughness: 0.2,
    anisotropy: 1.0,
    anisotropyRotation: 0.35,
    envMapIntensity: 1.8,
    clearcoat: 0.04,
    clearcoatRoughness: 0.5,
    side: THREE.DoubleSide,
  })
}

export function createSapphireMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0.03, 0.10, 0.32),
    metalness: 0.12,
    roughness: 0.10,
    emissive: new THREE.Color(0.18, 0.50, 0.90),
    emissiveIntensity: 0.55,
    clearcoat: 0.45,
    clearcoatRoughness: 0.12,
    envMapIntensity: 0.7,
  })
}

export function createAcrylicMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0.85, 0.92, 1.0),
    metalness: 0,
    roughness: 0.08,
    transmission: 0.7,
    thickness: 0.3,
    ior: 1.45,
    clearcoat: 0.6,
    clearcoatRoughness: 0.15,
    envMapIntensity: 1.2,
    transparent: true,
    opacity: 0.55,
    side: THREE.DoubleSide,
  })
}

// ================================================================
// PARTICLE SPHERE — the restored centerpiece. GPU-driven Fibonacci-sphere
// point cloud (sapphire + white), mouse-reactive displacement, breathing,
// and traveling energy-pulse ripples — all computed in the vertex/fragment
// shader so 20k–50k particles stay cheap. Wrapped in a bright inner
// "energy core" and an outer refractive glass shell.
// ================================================================

const SPHERE_RADIUS = 1.0
const SPHERE_BASE_SCALE = 0.85

// sapphire-blue and white, mixed per-particle
const COLOR_SAPPHIRE = new THREE.Color(0.28, 0.56, 0.98)
const COLOR_WHITE = new THREE.Color(1.0, 1.0, 1.0)

const PARTICLE_VERTEX_SHADER = /* glsl */ `
  attribute vec3 aColor;
  attribute float aRandom;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uMouseRadius;
  uniform float uMouseStrength;
  uniform float uSize;
  varying vec3 vColor;
  varying float vBrightness;

  void main() {
    vec3 dir = normalize(position);
    vec3 pos = position;

    // Breathing — slow radial pulse
    float breath = 1.0 + 0.025 * sin(uTime * 0.35 + aRandom * 6.2831);
    pos *= breath;

    // Energy pulse — a band that travels across the sphere, gated by a
    // slow envelope so it reads as an occasional ripple, not a strobe
    float wave = sin(dir.y * 6.0 - uTime * 0.6) * 0.5 + 0.5;
    float envelope = pow(0.5 + 0.5 * sin(uTime * 0.15 + aRandom * 3.0), 3.0);
    float pulse = wave * envelope;

    // Mouse repulsion in clip space, displaced along the sphere normal
    vec4 mvBase = modelViewMatrix * vec4(pos, 1.0);
    vec4 clipBase = projectionMatrix * mvBase;
    vec2 ndc = clipBase.xy / clipBase.w;
    float distToMouse = distance(ndc, uMouse);
    float influence = smoothstep(uMouseRadius, 0.0, distToMouse);
    pos += dir * influence * uMouseStrength;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float brightness = clamp(pulse * 0.9 + influence * 0.6 + aRandom * 0.18, 0.0, 1.0);
    vBrightness = brightness;
    vColor = aColor;

    float size = uSize * (0.70 + brightness * 1.1) * (1.0 + influence * 0.7);
    gl_PointSize = size * (280.0 / -mvPosition.z);
  }
`

const PARTICLE_FRAGMENT_SHADER = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vBrightness;

  void main() {
    vec2 c = gl_PointCoord - vec2(0.5);
    float d = length(c);
    if (d > 0.5) discard;
    float edge = smoothstep(0.5, 0.1, d);
    // brightest particles push toward white — feeds the bloom threshold
    vec3 glow = mix(vColor, vec3(1.0), vBrightness * 0.92);
    float alpha = edge * uOpacity * (0.85 + vBrightness * 0.5);
    gl_FragColor = vec4(glow, alpha);
  }
`

function ParticleSphere({
  scrollProgressRef,
  mouseRef,
}: {
  scrollProgressRef: React.MutableRefObject<number>
  mouseRef: React.MutableRefObject<{ x: number; y: number }>
}) {
  const pointsRef = useRef<THREE.Points>(null!)
  const groupRef = useRef<THREE.Group>(null!)
  const matRef = useRef<THREE.ShaderMaterial>(null!)
  const targetScale = useRef(SPHERE_BASE_SCALE)

  // The dense GPU particle cloud — SVARA's brand signature. 40k on desktop,
  // 24k on mobile (in the requested 20k–50k range). Cost stays trivial because
  // all displacement / pulse / colour lives in the vertex+fragment shader.
  const particleCount = useMemo(() => {
    if (typeof window === "undefined") return 40000
    return window.innerWidth < 768 ? 24000 : 40000
  }, [])

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const randoms = new Float32Array(particleCount)

    // Fibonacci sphere — even distribution across the surface
    const goldenAngle = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < particleCount; i++) {
      const y = 1 - (i / (particleCount - 1)) * 2
      const radiusAtY = Math.sqrt(1 - y * y)
      const theta = goldenAngle * i

      const x = Math.cos(theta) * radiusAtY * SPHERE_RADIUS
      const py = y * SPHERE_RADIUS
      const z = Math.sin(theta) * radiusAtY * SPHERE_RADIUS

      positions[i * 3] = x
      positions[i * 3 + 1] = py
      positions[i * 3 + 2] = z

      // ~86% sapphire, ~14% white highlights, with brightness jitter
      const isWhite = Math.random() < 0.28
      const c = (isWhite ? COLOR_WHITE : COLOR_SAPPHIRE).clone()
      const jitter = 0.85 + Math.random() * 0.3
      colors[i * 3] = c.r * jitter
      colors[i * 3 + 1] = c.g * jitter
      colors[i * 3 + 2] = c.b * jitter

      randoms[i] = Math.random()
    }

    g.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    g.setAttribute("aColor", new THREE.BufferAttribute(colors, 3))
    g.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1))
    return g
  }, [particleCount])

  const material = useMemo(() => {
    const m = new THREE.ShaderMaterial({
      vertexShader: PARTICLE_VERTEX_SHADER,
      fragmentShader: PARTICLE_FRAGMENT_SHADER,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uMouseRadius: { value: 0.35 },
        uMouseStrength: { value: 0.15 },
        uOpacity: { value: 0.95 },
        uSize: { value: 3.8 },
      },
      transparent: true,
      depthWrite: false,
      // Additive blending — the authentic energy-nucleus glow. This washed the
      // frame to white ONLY while the scene sat over the light background (the
      // old z-index bug); with the opaque dark backdrop (SceneBackdrop) it now
      // reads as a glowing sapphire cloud. Bloom lifts the brightest to white.
      blending: THREE.AdditiveBlending,
    })
    matRef.current = m
    return m
  }, [])

  const glassMatRef = useRef<THREE.MeshPhysicalMaterial>(null!)
  const glassMat = useMemo(() => {
    const m = createGlassMaterial()
    glassMatRef.current = m
    return m
  }, [])

  const coreMatRef = useRef<THREE.MeshPhysicalMaterial>(null!)
  const coreMat = useMemo(() => {
    const m = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0.08, 0.30, 0.70),
      emissive: new THREE.Color(0.35, 0.65, 1.0),
      emissiveIntensity: 2.6,
      roughness: 0.05,
      metalness: 0,
      transparent: true,
      opacity: 0.9,
    })
    coreMatRef.current = m
    return m
  }, [])

  // Dispose all GPU resources on unmount. The glass/core <primitive> materials
  // are NOT auto-disposed by R3F, and the geometry + shader material would
  // otherwise linger (matters for HMR churn and rapid re-mount).
  useEffect(
    () => () => {
      geometry.dispose()
      material.dispose()
      glassMat.dispose()
      coreMat.dispose()
    },
    [geometry, material, glassMat, coreMat],
  )

  useFrame((state, delta) => {
    const sp = scrollProgressRef.current
    const presence = 1 - Math.min(sp * 1.5, 1)

    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime
      matRef.current.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y)
      matRef.current.uniforms.uOpacity.value = 0.95 * presence
    }
    if (coreMatRef.current) {
      coreMatRef.current.emissiveIntensity = 2.6 * presence
      coreMatRef.current.opacity = 0.9 * presence
    }
    if (glassMatRef.current) {
      glassMatRef.current.opacity = 0.35 * presence
    }

    targetScale.current = SPHERE_BASE_SCALE * (0.5 + 0.5 * presence)

    if (groupRef.current) {
      // one revolution roughly every 75 seconds
      groupRef.current.rotation.y += (Math.PI * 2 * delta) / 75
      const s = groupRef.current.scale.x
      groupRef.current.scale.setScalar(s + (targetScale.current - s) * 0.04)
    }
  })

  return (
    <group ref={groupRef} scale={SPHERE_BASE_SCALE}>
      {/* Inner energy core — bright faceted glow at the center */}
      <mesh scale={0.55}>
        <icosahedronGeometry args={[1, 2]} />
        <primitive object={coreMat} />
      </mesh>

      {/* Inner glow core — smaller, brighter, for volumetric depth */}
      <mesh scale={0.3}>
        <icosahedronGeometry args={[1, 3]} />
        <meshBasicMaterial
          color={new THREE.Color(0.5, 0.75, 1.0)}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* The particle sphere itself */}
      <points ref={pointsRef} geometry={geometry} material={material} />

      {/* Outer glass shell — refractive, encases the particle cloud */}
      <mesh scale={1.3}>
        <icosahedronGeometry args={[1, 2]} />
        <primitive object={glassMat} />
      </mesh>
    </group>
  )
}

// ================================================================
// ORBIT RINGS — brushed titanium, independent rotation
// ================================================================

const RING_RADIUS = 1.65
const RING_TUBE = 0.018
const RING_RADIAL = 64
const RING_TUBULAR = 12

function OrbitRing({
  tiltX = 0,
  tiltZ = 0,
  speed = 0.15,
  direction = 1,
  variant = "titanium",
  scrollProgressRef,
}: {
  tiltX?: number
  tiltZ?: number
  speed?: number
  direction?: number
  variant?: "titanium" | "acrylic"
  scrollProgressRef: React.MutableRefObject<number>
}) {
  const ref = useRef<THREE.Mesh>(null!)
  const mat = useMemo(
    () => (variant === "acrylic" ? createAcrylicMaterial() : createTitaniumMaterial()),
    [variant],
  )
  const geo = useMemo(
    () => new THREE.TorusGeometry(RING_RADIUS, RING_TUBE, RING_TUBULAR, RING_RADIAL),
    [],
  )

  useFrame((_, dt) => {
    const sp = scrollProgressRef.current
    const clampedDt = Math.min(dt / 16.67, 3)
    const speedMul = 1 - sp * 0.6
    if (ref.current) ref.current.rotation.z += direction * speed * speedMul * clampedDt * 0.01
    mat.opacity = 1 - sp * 0.7
    mat.transparent = true
  })

  return (
    <group rotation={[tiltX, 0, tiltZ]}>
      <mesh ref={ref} geometry={geo} material={mat} />
    </group>
  )
}

// ================================================================
// ENERGY PULSES — emissive spheres traveling along the rings
// ================================================================

const PULSE_COUNT = 6

function PulseGroup({
  tiltX = 0,
  tiltZ = 0,
  speed = 0.2,
  direction = 1,
  scrollProgressRef,
}: {
  tiltX?: number
  tiltZ?: number
  speed?: number
  direction?: number
  scrollProgressRef: React.MutableRefObject<number>
}) {
  const groupRef = useRef<THREE.Group>(null!)
  const pulseRefs = useRef<THREE.Mesh[]>([])
  const offsets = useMemo(
    () => Array.from({ length: PULSE_COUNT }, (_, i) => (i / PULSE_COUNT) * Math.PI * 2),
    [],
  )

  useFrame((state, dt) => {
    const sp = scrollProgressRef.current
    const clampedDt = Math.min(dt / 16.67, 3)
    const speedMul = (1 - sp * 0.5) * 0.015 * direction * clampedDt

    offsets.forEach((offset, i) => {
      const angle = (state.clock.elapsedTime * speedMul + offset) * speed * 10
      const pulse = pulseRefs.current[i]
      if (!pulse) return

      const x = Math.cos(angle) * RING_RADIUS
      const z = Math.sin(angle) * RING_RADIUS
      pulse.position.set(x, 0, z)

      const brightness = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(angle * 3))
      pulse.material.emissiveIntensity = brightness * (1 - sp * 0.5)
    })
  })

  return (
    <group ref={groupRef} rotation={[tiltX, 0, tiltZ]}>
      {offsets.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) pulseRefs.current[i] = el
          }}
        >
          <sphereGeometry args={[0.055, 8, 8]} />
          <meshPhysicalMaterial
            color={new THREE.Color(0.6, 0.85, 1.0)}
            emissive={new THREE.Color(0.4, 0.8, 1.0)}
            emissiveIntensity={1.4}
            roughness={0}
            metalness={0}
          />
        </mesh>
      ))}
    </group>
  )
}

// ================================================================
// RADIAL LIGHT BEAMS — thin emissive lines radiating from the core.
// Blueprint-style connection lines that pulse slowly, giving the
// intelligence nucleus its "connected infrastructure" feel.
// ================================================================

const BEAM_COUNT = 12
const BEAM_LENGTH = 2.2

function RadialBeams({ scrollProgressRef }: { scrollProgressRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null!)
  const beamRefs = useRef<THREE.Mesh[]>([])
  const beamData = useMemo(() => {
    const data: { angle: number; length: number; speed: number }[] = []
    for (let i = 0; i < BEAM_COUNT; i++) {
      const angle = (i / BEAM_COUNT) * Math.PI * 2
      const length = BEAM_LENGTH * (0.7 + Math.random() * 0.6)
      const speed = 0.3 + Math.random() * 0.4
      data.push({ angle, length, speed })
    }
    return data
  }, [])

  useFrame((state) => {
    const sp = scrollProgressRef.current
    const presence = 1 - Math.min(sp * 1.5, 1)
    beamRefs.current.forEach((beam, i) => {
      if (!beam) return
      const d = beamData[i]!
      const t = state.clock.elapsedTime
      // Subtle pulse: beams breathe in brightness
      const pulse = 0.15 + 0.12 * Math.sin(t * d.speed + d.angle * 2)
      const mat = beam.material as THREE.MeshBasicMaterial
      mat.opacity = pulse * presence
    })
  })

  return (
    <group ref={groupRef} rotation={[0, 0, 0]}>
      {beamData.map((d, i) => {
        // Each beam is a thin cylinder radiating from just outside the
        // sphere surface outward, oriented by its angle around the Y axis
        const innerR = 0.95
        const outerR = innerR + d.length
        const midR = (innerR + outerR) / 2
        const halfLen = d.length / 2
        return (
          <mesh
            key={i}
            ref={(el) => { if (el) beamRefs.current[i] = el }}
            position={[Math.cos(d.angle) * midR, 0, Math.sin(d.angle) * midR]}
            rotation={[0, 0, -d.angle + Math.PI / 2]}
          >
            <cylinderGeometry args={[0.012, 0.004, halfLen, 6]} />
            <meshBasicMaterial
              color={new THREE.Color(0.45, 0.72, 1.0)}
              transparent
              opacity={0.18}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        )
      })}
    </group>
  )
}

// ================================================================
// SPHERE GLOW — billboard sprite for volumetric presence around
// the particle sphere. A soft radial gradient that gives the core
// its atmospheric halo, without any geometry overhead.
// ================================================================

function SphereGlow({ scrollProgressRef }: { scrollProgressRef: React.MutableRefObject<number> }) {
  const spriteRef = useRef<THREE.Sprite>(null!)
  const matRef = useRef<THREE.SpriteMaterial>(null!)
  const textureRef = useRef<THREE.CanvasTexture | null>(null)

  const texture = useMemo(() => {
    const size = 256
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')!
    // Radial gradient: bright sapphire center fading to transparent
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    gradient.addColorStop(0, 'rgba(74, 144, 255, 0.35)')
    gradient.addColorStop(0.3, 'rgba(74, 144, 255, 0.15)')
    gradient.addColorStop(0.6, 'rgba(100, 170, 255, 0.06)')
    gradient.addColorStop(1, 'rgba(100, 170, 255, 0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)
    const tex = new THREE.CanvasTexture(canvas)
    tex.needsUpdate = true
    textureRef.current = tex
    return tex
  }, [])

  useEffect(() => {
    return () => {
      if (textureRef.current) {
        textureRef.current.dispose()
        textureRef.current = null
      }
    }
  }, [])

  useFrame((state) => {
    const sp = scrollProgressRef.current
    const presence = 1 - Math.min(sp * 1.5, 1)
    if (matRef.current) {
      matRef.current.opacity = 0.6 * presence
    }
    if (spriteRef.current) {
      // Subtle scale pulse — breathing
      const breath = 1 + 0.03 * Math.sin(state.clock.elapsedTime * 0.4)
      spriteRef.current.scale.setScalar(3.2 * breath)
    }
  })

  return (
    <sprite ref={spriteRef} scale={3.2}>
      <spriteMaterial
        ref={matRef}
        map={texture}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </sprite>
  )
}

// ================================================================
// CAMERA CONTROLLER — mouse-reactive orbit + scroll-aware distance
// ================================================================

function CameraController({
  mouseState,
  scrollProgressRef,
}: {
  mouseState: React.MutableRefObject<{ x: number; y: number }>
  scrollProgressRef: React.MutableRefObject<number>
}) {
  const { camera } = useThree()
  const position = useRef({ x: 0, y: 0 })
  const targetDistance = useRef(4.2)
  const currentDistance = useRef(4.2)
  const baseDistance = 4.2

  useFrame(() => {
    const sp = scrollProgressRef.current
    targetDistance.current = baseDistance + sp * 0.8
    currentDistance.current += (targetDistance.current - currentDistance.current) * 0.03

    const mx = mouseState.current.x
    const my = mouseState.current.y
    position.current.x += (mx * 0.03 - position.current.x) * 0.04
    position.current.y += (-my * 0.02 - position.current.y) * 0.04

    camera.position.x = position.current.x
    camera.position.y = position.current.y
    camera.position.z = currentDistance.current
    camera.lookAt(0, 0, 0)
  })

  return null
}

// ================================================================
// SCENE — assembles all elements with environment and post-processing
// ================================================================

function SvaraCoreScene({
  scrollState,
  mouseState,
}: {
  scrollState: React.MutableRefObject<SvaraCoreState>
  mouseState: React.MutableRefObject<SvaraCoreState>
}) {
  const scrollProgressRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0 })

  // Bridge: read from the Vue-provided shared state each frame
  useFrame(() => {
    scrollProgressRef.current = scrollState.current.scrollProgress
    mouseRef.current.x = mouseState.current.mouseX
    mouseRef.current.y = mouseState.current.mouseY
  })

  return (
    <>
      {/* Fog fades distant particles into the navy depth. */}
      <fog attach="fog" args={["#060e22", 5.5, 15]} />

      {/* Opaque dark backdrop dome — an inward-facing sphere that gives the
         additive particle cloud a dark surface to GLOW against inside WebGL
         (postprocessing forces a transparent canvas, so additive over the CSS
         gradient alone reads dim). It also robustly covers the site's light
         background layer within the hero. Sits inside the camera far plane. */}
      <mesh scale={12} renderOrder={-1}>
        <sphereGeometry args={[1, 32, 24]} />
        <meshBasicMaterial color="#050c1c" side={THREE.BackSide} fog={false} depthWrite={false} />
      </mesh>

      {/* Environmental lighting — key + fill + sapphire accent for the PBR
         materials. Kept restrained so the core reads against the dark stage. */}
      <ambientLight intensity={0.22} />
      <directionalLight position={[5, 8, 6]} intensity={1.6} />
      <directionalLight position={[-4, 3, -5]} intensity={0.5} />
      <pointLight position={[0, 3, 0]} intensity={0.6} color="#4d9dff" />
      <pointLight position={[0, 0, 2]} intensity={0.3} color="#6aafff" />

      {/* HDR environment — soft studio reflections for the metal/glass,
         explicitly NOT shown as background (the dark stage above owns that) */}
      <Environment preset="studio" background={false} />

      {/* Contact shadow under the core */}
      <ContactShadows
        position={[0, -0.85, 0]}
        scale={4}
        blur={2.5}
        far={2}
        opacity={0.25}
        resolution={256}
      />

      {/* Radial light beams — blueprint-style connection lines from the core */}
      <RadialBeams scrollProgressRef={scrollProgressRef} />

      {/* Volumetric glow — billboard sprite halo around the sphere */}
      <SphereGlow scrollProgressRef={scrollProgressRef} />

      {/* The Particle Sphere — centerpiece, surrounded by the rings below */}
      <ParticleSphere scrollProgressRef={scrollProgressRef} mouseRef={mouseRef} />

      {/* Orbit ring 1 — 30° tilt, titanium */}
      <OrbitRing
        tiltX={0.35}
        tiltZ={0.1}
        speed={0.12}
        direction={1}
        variant="titanium"
        scrollProgressRef={scrollProgressRef}
      />

      {/* Orbit ring 2 — 55° tilt, opposite direction, titanium */}
      <OrbitRing
        tiltX={0.65}
        tiltZ={-0.2}
        speed={0.18}
        direction={-1}
        variant="titanium"
        scrollProgressRef={scrollProgressRef}
      />

      {/* Orbit ring 3 — near-equatorial, acrylic, independent speed */}
      <OrbitRing
        tiltX={0.08}
        tiltZ={0.5}
        speed={0.09}
        direction={1}
        variant="acrylic"
        scrollProgressRef={scrollProgressRef}
      />

      {/* Energy pulses along ring 1 */}
      <PulseGroup
        tiltX={0.35}
        tiltZ={0.1}
        speed={0.22}
        direction={1}
        scrollProgressRef={scrollProgressRef}
      />

      {/* Energy pulses along ring 2 */}
      <PulseGroup
        tiltX={0.65}
        tiltZ={-0.2}
        speed={0.28}
        direction={-1}
        scrollProgressRef={scrollProgressRef}
      />

      {/* Energy pulses along ring 3 */}
      <PulseGroup
        tiltX={0.08}
        tiltZ={0.5}
        speed={0.16}
        direction={1}
        scrollProgressRef={scrollProgressRef}
      />

      {/* Ambient particle field — dense, distant, drifting — the 
         intelligence atmosphere surrounding the core */}
      <Sparkles
        count={140}
        scale={10}
        size={2}
        speed={0.12}
        opacity={0.22}
        color="#8fb8ff"
      />

      {/* Camera — mouse + scroll reactive */}
      <CameraController
        mouseState={mouseRef}
        scrollProgressRef={scrollProgressRef}
      />
    </>
  )
}

// ================================================================
// CANVAS WRAPPER — configures R3F Canvas with ACES tone mapping,
// shadows, and post-processing (bloom via EffectComposer)
// ================================================================

export function SvaraCoreCanvas({
  scrollState,
  mouseState,
}: {
  scrollState: React.MutableRefObject<SvaraCoreState>
  mouseState: React.MutableRefObject<SvaraCoreState>
}) {
  // The postprocessing EffectComposer (multisampled HDR targets + Bloom mip
  // chain) is not auto-disposed by R3F — release it on unmount.
  const composerRef = useRef<{ dispose: () => void } | null>(null)
  useEffect(() => () => composerRef.current?.dispose(), [])

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4.2], fov: 40, near: 0.1, far: 20 }}
      gl={{
        outputColorSpace: THREE.SRGBColorSpace,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
        antialias: true,
        alpha: true,
      }}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <SvaraCoreScene scrollState={scrollState} mouseState={mouseState} />

      {/* Post-processing — strong bloom for the intelligence nucleus feel. 
         Tone mapping is handled by the Canvas gl config (ACESFilmicToneMapping). */}
      <EffectComposer ref={composerRef} enableNormalPass>
        {/* Ambient occlusion — subtle contact darkening in the creases between
           the core, rings and glass shell, for grounded cinematic depth. */}
        <SSAO
          samples={16}
          radius={0.12}
          intensity={18}
          luminanceInfluence={0.6}
          color="black"
        />
        {/* Bloom — lifts only the brightest particles / emissive core to glow. */}
        <Bloom
          luminanceThreshold={0.5}
          luminanceSmoothing={0.2}
          intensity={0.7}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  )
}
