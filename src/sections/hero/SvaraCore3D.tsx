"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import type { Group, Mesh } from "three";

// R3F's ResizeObserver-driven initial canvas sizing doesn't fire reliably on
// first mount in this Next.js 16 (Turbopack) + React 19 setup — the canvas
// buffer sticks at the browser's default 300x150 until something forces a
// re-measure. Dispatching a synthetic resize shortly after mount is the
// standard workaround; confirmed fixing it (300x150 -> matches container).
function useForceCanvasResize() {
  useEffect(() => {
    // setTimeout, not requestAnimationFrame — rAF can be suspended entirely
    // on a backgrounded/hidden tab, which would silently drop this fix.
    const id = setTimeout(() => window.dispatchEvent(new Event("resize")), 50);
    return () => clearTimeout(id);
  }, []);
}

// Shown until a real GLB is provided (or while one is loading) — a simple
// glowing wireframe-free icosahedron, just enough to prove the R3F pipeline
// (lighting, rotation, mouse-tilt) renders correctly in this Next.js setup.
function PlaceholderCore() {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.15;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.2, 1]} />
      <meshStandardMaterial
        color="#5EC8FF"
        emissive="#2A4DBF"
        emissiveIntensity={0.6}
        metalness={0.7}
        roughness={0.2}
      />
    </mesh>
  );
}

function GltfCore({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath);
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.15;
  });
  return (
    <Center>
      <group ref={ref}>
        <primitive object={scene} />
      </group>
    </Center>
  );
}

// Subtly tilts the whole core toward the cursor — damped toward the target
// each frame rather than snapping, so it reads as a gentle drift, not a
// hard follow.
function MouseTilt({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    const targetTiltX = state.pointer.y * 0.15;
    const targetTiltZ = state.pointer.x * 0.15;
    groupRef.current.rotation.x += (targetTiltX - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.z += (targetTiltZ - groupRef.current.rotation.z) * 0.05;
  });
  return <group ref={groupRef}>{children}</group>;
}

export default function SvaraCore3D({ modelPath }: { modelPath?: string }) {
  useForceCanvasResize();
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Canvas camera={{ position: [0, 0, 4], fov: 40 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[3, 3, 3]} intensity={1.2} color="#5EC8FF" />
        <pointLight position={[-3, -2, 2]} intensity={0.6} color="#2A4DBF" />
        <MouseTilt>
          <Suspense fallback={<PlaceholderCore />}>
            {modelPath ? <GltfCore modelPath={modelPath} /> : <PlaceholderCore />}
          </Suspense>
        </MouseTilt>
      </Canvas>
    </div>
  );
}
