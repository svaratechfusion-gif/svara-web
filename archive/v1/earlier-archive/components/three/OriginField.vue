<script setup lang="ts">
import * as THREE from "three";

const PRODUCT_NAMES = [
  "Vision AI",
  "Drone AI",
  "Edge AI",
  "Digital Twin",
  "AI Agents",
  "Business Cloud",
  "Command Center",
  "Growth Tech",
];

const props = withDefaults(
  defineProps<{
    scrollProgress?: number;
    activeProduct?: string | null;
    selectedProduct?: string | null;
  }>(),
  {
    scrollProgress: 0,
    activeProduct: null,
    selectedProduct: null,
  }
);

const fieldRef = ref<HTMLElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const x = clamp01((value - edge0) / (edge1 - edge0));
  return x * x * (3 - 2 * x);
}

function seededRandom(seed: number) {
  let state = seed;
  return () => {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeCoreGeometry() {
  const latSegments = 38;
  const lonSegments = 76;
  const positions: number[] = [];
  const indices: number[] = [];

  for (let lat = 0; lat <= latSegments; lat++) {
    const v = lat / latSegments;
    const phi = v * Math.PI;

    for (let lon = 0; lon <= lonSegments; lon++) {
      const u = lon / lonSegments;
      const theta = u * Math.PI * 2;
      const ripple =
        1.34 +
        Math.sin(theta * 5 + phi * 1.7) * 0.18 +
        Math.cos(phi * 6 - theta * 2.4) * 0.13 +
        Math.sin(theta * 9) * Math.sin(phi * 3) * 0.08;
      const twist = theta + Math.sin(phi * 2.8) * 0.34;
      const pinch = 0.72 + Math.sin(phi) * 0.34;

      positions.push(
        Math.sin(phi) * Math.cos(twist) * ripple * pinch,
        Math.cos(phi) * ripple * 0.9 + Math.sin(theta * 3) * 0.08,
        Math.sin(phi) * Math.sin(twist) * ripple * (1.04 + Math.cos(phi * 4) * 0.12)
      );
    }
  }

  for (let lat = 0; lat < latSegments; lat++) {
    for (let lon = 0; lon < lonSegments; lon++) {
      const a = lat * (lonSegments + 1) + lon;
      const b = a + lonSegments + 1;
      indices.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function makeProductCenters() {
  return PRODUCT_NAMES.map((name, index) => {
    const angle = (index / PRODUCT_NAMES.length) * Math.PI * 2 - Math.PI / 2;
    const radius = 3.15 + (index % 2) * 0.34;
    return {
      name,
      angle,
      base: new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle * 1.18) * 1.2, Math.sin(angle) * radius),
    };
  });
}

onMounted(() => {
  if (!fieldRef.value || !canvasRef.value) return;

  const field = fieldRef.value;
  const canvas = canvasRef.value;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const particleCount = prefersReducedMotion ? 1800 : isMobile ? 3200 : 8200;
  const random = seededRandom(20260706);
  const productCenters = makeProductCenters();

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setClearColor(0xffffff, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 8.4);

  const ambient = new THREE.AmbientLight(0xffffff, 1.4);
  const keyLight = new THREE.DirectionalLight(0x9fdcff, 2.2);
  keyLight.position.set(3, 5, 4);
  const rimLight = new THREE.PointLight(0x5d8fbe, 1.8, 16);
  rimLight.position.set(-3, -2, 4);
  scene.add(ambient, keyLight, rimLight);

  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const birth = new Float32Array(particleCount * 3);
  const core = new Float32Array(particleCount * 3);
  const ecosystem = new Float32Array(particleCount * 3);
  const phases = new Float32Array(particleCount);
  const amplitudes = new Float32Array(particleCount);
  const productIndex = new Int16Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    const theta = random() * Math.PI * 2;
    const phi = Math.acos(2 * random() - 1);
    const radius =
      1.18 +
      Math.sin(theta * 5 + phi * 2.1) * 0.34 +
      Math.cos(phi * 7 - theta * 1.6) * 0.18 +
      random() * 0.28;
    const twist = theta + Math.sin(phi * 3.2) * 0.42;
    const birthSpread = isMobile ? 5.1 : 7.3;

    birth[i3] = (random() - 0.5) * birthSpread * (isMobile ? 0.9 : 1.4);
    birth[i3 + 1] = (random() - 0.5) * birthSpread;
    birth[i3 + 2] = (random() - 0.5) * 2.4 - 0.6;

    core[i3] = Math.sin(phi) * Math.cos(twist) * radius;
    core[i3 + 1] = Math.cos(phi) * radius * 0.86 + Math.sin(theta * 4) * 0.12;
    core[i3 + 2] = Math.sin(phi) * Math.sin(twist) * radius * (1.05 + Math.cos(phi * 5) * 0.12);

    const assignedProduct = random() < 0.36 ? -1 : Math.floor(random() * PRODUCT_NAMES.length);
    productIndex[i] = assignedProduct;
    const center = assignedProduct === -1 ? new THREE.Vector3(0, 0, 0) : productCenters[assignedProduct]!.base;
    const clusterRadius = assignedProduct === -1 ? 1.16 + random() * 0.62 : 0.34 + random() * 0.52;
    const clusterTheta = random() * Math.PI * 2;
    const clusterPhi = Math.acos(2 * random() - 1);
    ecosystem[i3] = center.x + Math.sin(clusterPhi) * Math.cos(clusterTheta) * clusterRadius;
    ecosystem[i3 + 1] = center.y + Math.cos(clusterPhi) * clusterRadius * 0.8;
    ecosystem[i3 + 2] = center.z + Math.sin(clusterPhi) * Math.sin(clusterTheta) * clusterRadius;

    phases[i] = random() * Math.PI * 2;
    amplitudes[i] = 0.035 + random() * 0.09;

    positions[i3] = birth[i3]!;
    positions[i3 + 1] = birth[i3 + 1]!;
    positions[i3 + 2] = birth[i3 + 2]!;
  }

  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  particleGeometry.setDrawRange(0, 0);

  const particleMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    vertexColors: true,
    // Normal blending, not additive: this page's background is white
    // (--color-bg), and additive blending onto white always resolves back to
    // white regardless of the source color — every particle was rendering
    // (once the shader compile error above was fixed) but effectively
    // invisible for this reason. Additive only reads correctly over a dark
    // backdrop.
    blending: THREE.NormalBlending,
    uniforms: {
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uSize: { value: isMobile ? 15 : 18 },
      uOpacity: { value: 0.78 },
    },
    vertexShader: `
      varying vec3 vColor;
      uniform float uPixelRatio;
      uniform float uSize;

      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = uSize * uPixelRatio * (1.0 / max(0.22, -mvPosition.z));
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      uniform float uOpacity;

      void main() {
        vec2 uv = gl_PointCoord - vec2(0.5);
        float dist = length(uv);
        float alpha = smoothstep(0.5, 0.05, dist) * uOpacity;
        gl_FragColor = vec4(vColor, alpha);
      }
    `,
  });

  const particlePoints = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particlePoints);

  const lineCount = Math.min(520, Math.floor(particleCount / 12));
  const linePositions = new Float32Array(lineCount * 6);
  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x5d8fbe,
    transparent: true,
    opacity: 0,
    // Same white-background reasoning as particleMaterial above.
    blending: THREE.NormalBlending,
    depthWrite: false,
  });
  const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(lineSegments);

  const coreGroup = new THREE.Group();
  const coreMesh = new THREE.Mesh(
    makeCoreGeometry(),
    new THREE.MeshPhysicalMaterial({
      color: 0xf9fcff,
      metalness: 0.04,
      roughness: 0.18,
      clearcoat: 0.9,
      transparent: true,
      opacity: 0,
      emissive: new THREE.Color("#5d8fbe"),
      emissiveIntensity: 0.04,
    })
  );
  const coreEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(coreMesh.geometry, 22),
    new THREE.LineBasicMaterial({
      color: 0x5d8fbe,
      transparent: true,
      opacity: 0,
    })
  );
  coreGroup.add(coreMesh, coreEdges);
  scene.add(coreGroup);

  const nodeGeometry = new THREE.SphereGeometry(0.045, 16, 16);
  const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x5d8fbe, transparent: true, opacity: 0 });
  const productNodes = productCenters.map(({ base }) => {
    const node = new THREE.Mesh(nodeGeometry, nodeMaterial.clone());
    node.position.copy(base);
    scene.add(node);
    return node;
  });

  const pulseGeometry = new THREE.SphereGeometry(0.032, 12, 12);
  const pulseMaterial = new THREE.MeshBasicMaterial({
    color: 0x89d3ff,
    transparent: true,
    opacity: 0,
  });
  const pulses = Array.from({ length: 18 }, (_, index) => {
    const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial.clone());
    pulse.userData.productIndex = index % productCenters.length;
    pulse.userData.offset = random();
    scene.add(pulse);
    return pulse;
  });

  const mouse = new THREE.Vector2(0, 0);
  const mouseTarget = new THREE.Vector2(0, 0);
  const cameraTarget = new THREE.Vector3(0, 0, 0);
  const clock = new THREE.Clock();
  let animationFrame = 0;
  let activeIndex = -1;
  let selectedIndex = -1;

  const resize = () => {
    const rect = field.getBoundingClientRect();
    const width = Math.max(1, rect.width);
    const height = Math.max(1, rect.height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    particleMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
  };

  const handlePointerMove = (event: PointerEvent) => {
    const rect = field.getBoundingClientRect();
    mouseTarget.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    mouseTarget.y = -((event.clientY - rect.top) / rect.height - 0.5) * 2;
  };

  const visibleCountForTime = (elapsed: number, scrollProgress: number) => {
    if (prefersReducedMotion) return particleCount;
    if (scrollProgress > 0.04) return Math.max(120, Math.floor(particleCount * smoothstep(0.04, 0.22, scrollProgress)));
    if (elapsed < 0.8) return 0;
    if (elapsed < 1.8) return Math.floor(1 + smoothstep(0.8, 1.8, elapsed) * 5);
    if (elapsed < 2.7) return Math.floor(6 + smoothstep(1.8, 2.7, elapsed) * 14);
    if (elapsed < 3.65) return Math.floor(20 + smoothstep(2.7, 3.65, elapsed) * 80);
    return Math.floor(100 + smoothstep(3.65, 6.2, elapsed) * (particleCount - 100));
  };

  const productIndexForName = (name: string | null) =>
    name ? PRODUCT_NAMES.findIndex((productName) => productName === name) : -1;

  const render = () => {
    animationFrame = requestAnimationFrame(render);

    const delta = Math.min(clock.getDelta(), 0.04);
    const elapsed = clock.elapsedTime;
    const scroll = clamp01(props.scrollProgress);
    const converge = prefersReducedMotion ? 1 : smoothstep(0.08, 0.48, scroll);
    const ecosystemProgress = prefersReducedMotion ? 1 : smoothstep(0.56, 0.9, scroll);
    const visibleCount = visibleCountForTime(elapsed, scroll);
    const positionAttribute = particleGeometry.getAttribute("position") as THREE.BufferAttribute;
    const colorAttribute = particleGeometry.getAttribute("color") as THREE.BufferAttribute;

    activeIndex = productIndexForName(props.activeProduct);
    selectedIndex = productIndexForName(props.selectedProduct);
    mouse.lerp(mouseTarget, 0.06);

    const rotation = elapsed * (0.08 + ecosystemProgress * 0.1);
    const sinRotation = Math.sin(rotation);
    const cosRotation = Math.cos(rotation);
    const centerGlow = 0.72 + Math.sin(elapsed * 1.7) * 0.12;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const phase = phases[i]!;
      const amp = amplitudes[i]!;
      const product = productIndex[i]!;
      const fieldWave = Math.sin(elapsed * (0.72 + amp * 4) + phase);
      const wanderX = Math.cos(elapsed * 0.46 + phase) * amp;
      const wanderY = fieldWave * amp;
      const pointerDx = birth[i3]! - mouse.x * 2.2;
      const pointerDy = birth[i3 + 1]! - mouse.y * 1.65;
      const pointerField = Math.exp(-(pointerDx * pointerDx + pointerDy * pointerDy) * 0.22) * (1 - converge) * 0.42;

      const bx = birth[i3]! + wanderX + mouse.x * pointerField;
      const by = birth[i3 + 1]! + wanderY + mouse.y * pointerField;
      const bz = birth[i3 + 2]! + Math.sin(elapsed * 0.32 + phase) * amp;

      const corePulse = 1 + Math.sin(elapsed * 1.25 + phase) * 0.035;
      const cx = core[i3]! * corePulse + mouse.x * 0.055 * converge * (1 - ecosystemProgress);
      const cy = core[i3 + 1]! * corePulse + mouse.y * 0.055 * converge * (1 - ecosystemProgress);
      const cz = core[i3 + 2]! * corePulse;

      const ex0 = ecosystem[i3]!;
      const ey = ecosystem[i3 + 1]! + Math.sin(elapsed * 0.55 + phase) * amp * 0.8;
      const ez0 = ecosystem[i3 + 2]!;
      const ex = ex0 * cosRotation - ez0 * sinRotation;
      const ez = ex0 * sinRotation + ez0 * cosRotation;

      const ax = bx + (cx - bx) * converge;
      const ay = by + (cy - by) * converge;
      const az = bz + (cz - bz) * converge;

      positions[i3] = ax + (ex - ax) * ecosystemProgress;
      positions[i3 + 1] = ay + (ey - ay) * ecosystemProgress;
      positions[i3 + 2] = az + (ez - az) * ecosystemProgress;

      const selectedBoost = activeIndex === product || selectedIndex === product ? 1.45 : 1;
      const dim = activeIndex >= 0 && product !== activeIndex ? 0.32 : 1;
      const coreDim = product === -1 && activeIndex >= 0 ? 0.52 : 1;
      const energy = (0.58 + fieldWave * 0.13 + converge * 0.22 + ecosystemProgress * 0.08) * selectedBoost * dim * coreDim;
      colors[i3] = 0.14 * energy;
      colors[i3 + 1] = (0.44 + centerGlow * 0.1) * energy;
      colors[i3 + 2] = 0.86 * energy;
    }

    positionAttribute.needsUpdate = true;
    colorAttribute.needsUpdate = true;
    particleGeometry.setDrawRange(0, visibleCount);

    for (let line = 0; line < lineCount; line++) {
      const from = (line * 17) % Math.max(1, visibleCount);
      const to = (from + 41 + (line % 23) * 11) % Math.max(1, visibleCount);
      const lineIndex = line * 6;
      const fromIndex = from * 3;
      const toIndex = to * 3;

      linePositions[lineIndex] = positions[fromIndex]!;
      linePositions[lineIndex + 1] = positions[fromIndex + 1]!;
      linePositions[lineIndex + 2] = positions[fromIndex + 2]!;
      linePositions[lineIndex + 3] = positions[toIndex]!;
      linePositions[lineIndex + 4] = positions[toIndex + 1]!;
      linePositions[lineIndex + 5] = positions[toIndex + 2]!;
    }
    (lineGeometry.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
    lineMaterial.opacity = (0.04 + converge * 0.08 + ecosystemProgress * 0.1) * Math.min(1, visibleCount / 900);

    coreGroup.rotation.y += delta * (0.15 + converge * 0.24);
    coreGroup.rotation.x = Math.sin(elapsed * 0.22) * 0.1;
    coreGroup.scale.setScalar(0.72 + converge * 0.28 - ecosystemProgress * 0.12);
    (coreMesh.material as THREE.MeshPhysicalMaterial).opacity = converge * (1 - ecosystemProgress * 0.15) * 0.22;
    (coreEdges.material as THREE.LineBasicMaterial).opacity = converge * 0.22 + ecosystemProgress * 0.12;

    productNodes.forEach((node, index) => {
      const center = productCenters[index]!.base;
      const x = center.x * cosRotation - center.z * sinRotation;
      const z = center.x * sinRotation + center.z * cosRotation;
      node.position.set(x, center.y + Math.sin(elapsed + index) * 0.08, z);
      node.scale.setScalar(activeIndex === index || selectedIndex === index ? 2.3 : 1);
      (node.material as THREE.MeshBasicMaterial).opacity = ecosystemProgress * (activeIndex >= 0 && activeIndex !== index ? 0.25 : 0.95);
    });

    pulses.forEach((pulse) => {
      const index = pulse.userData.productIndex as number;
      const center = productCenters[index]!.base;
      const t = (elapsed * 0.14 + (pulse.userData.offset as number)) % 1;
      const ease = t * t * (3 - 2 * t);
      const x = center.x * cosRotation - center.z * sinRotation;
      const z = center.x * sinRotation + center.z * cosRotation;
      pulse.position.set(x * ease, center.y * ease, z * ease);
      (pulse.material as THREE.MeshBasicMaterial).opacity = ecosystemProgress * Math.sin(t * Math.PI) * 0.72;
    });

    if (selectedIndex >= 0) {
      const selectedCenter = productCenters[selectedIndex]!.base;
      const selectedX = selectedCenter.x * cosRotation - selectedCenter.z * sinRotation;
      const selectedZ = selectedCenter.x * sinRotation + selectedCenter.z * cosRotation;
      camera.position.lerp(new THREE.Vector3(selectedX * 0.58, selectedCenter.y * 0.34, 4.35 + selectedZ * 0.12), 0.055);
      cameraTarget.lerp(new THREE.Vector3(selectedX, selectedCenter.y, selectedZ), 0.055);
    } else {
      camera.position.lerp(new THREE.Vector3(mouse.x * 0.28, mouse.y * 0.18, 8.4 + ecosystemProgress * 1.5), 0.045);
      cameraTarget.lerp(new THREE.Vector3(mouse.x * 0.12, mouse.y * 0.08, 0), 0.04);
    }
    camera.lookAt(cameraTarget);

    renderer.render(scene, camera);
  };

  resize();
  window.addEventListener("pointermove", handlePointerMove, { passive: true });
  window.addEventListener("resize", resize);
  animationFrame = requestAnimationFrame(render);

  onUnmounted(() => {
    cancelAnimationFrame(animationFrame);
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("resize", resize);
    particleGeometry.dispose();
    particleMaterial.dispose();
    lineGeometry.dispose();
    lineMaterial.dispose();
    coreMesh.geometry.dispose();
    (coreMesh.material as THREE.Material).dispose();
    (coreEdges.geometry as THREE.BufferGeometry).dispose();
    (coreEdges.material as THREE.Material).dispose();
    nodeGeometry.dispose();
    pulseGeometry.dispose();
    productNodes.forEach((node) => (node.material as THREE.Material).dispose());
    pulses.forEach((pulse) => (pulse.material as THREE.Material).dispose());
    renderer.dispose();
  });
});
</script>

<template>
  <div ref="fieldRef" class="origin-field">
    <canvas ref="canvasRef" class="origin-field__canvas" aria-hidden="true" />
  </div>
</template>

<style scoped>
.origin-field {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.origin-field__canvas {
  display: block;
  height: 100%;
  width: 100%;
}
</style>
