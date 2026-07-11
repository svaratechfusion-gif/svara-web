<template>
  <div ref="root" class="bis-canvas" aria-hidden="true"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import * as THREE from 'three';
import { gsap } from '~~/lib/gsap';
import { registerBackgroundIntelligence } from '~~/lib/experience/useBackgroundIntelligence';

const root = ref<HTMLDivElement | null>(null);

let renderer: THREE.WebGLRenderer | null = null;
let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;
let instanced: THREE.InstancedMesh | null = null;
let animationTl: GSAPTimeline | null = null;
let rafId = 0;

// default parameters — tuned for performance & visual language
const INSTANCE_COUNT = 1024; // safe default; can be adjusted via API
const GRID_SPACING = 1.25;
const HEX_RADIUS = 0.5;

function createHexGeometry() {
  // Hexagonal flat prism: Cylinder with 6 radial segments, short height
  return new THREE.CylinderGeometry(HEX_RADIUS, HEX_RADIUS, 0.06, 6);
}

function createMaterial() {
  // SVARA blue palette on white background, restrained opacity
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color('#76A8D6'),
    roughness: 0.9,
    metalness: 0.05,
    transparent: true,
    opacity: 0.22,
    depthWrite: false,
  });
}

function buildInstancedGrid(count: number, geometry: THREE.BufferGeometry, material: THREE.Material) {
  const mesh = new THREE.InstancedMesh(geometry, material, count);
  const dummy = new THREE.Object3D();
  const side = Math.ceil(Math.sqrt(count));
  let i = 0;
  for (let x = 0; x < side && i < count; x++) {
    for (let z = 0; z < side && i < count; z++) {
      const px = (x - side / 2) * GRID_SPACING;
      const pz = (z - side / 2) * GRID_SPACING;
      dummy.position.set(px, (Math.random() - 0.5) * 0.2, pz);
      dummy.rotation.set(Math.PI / 2, 0, (x + z) % 6 * (Math.PI / 3));
      const scale = 0.6 + Math.random() * 0.8;
      dummy.scale.set(scale, 1, scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      // small per-instance color variance stored in instanceColor if needed
      i++;
    }
  }
  mesh.instanceMatrix.needsUpdate = true;
  return mesh;
}

function init(canvasContainer: HTMLDivElement) {
  scene = new THREE.Scene();
  scene.background = new THREE.Color('#F8FAFC'); // engineered white

  const w = canvasContainer.clientWidth;
  const h = canvasContainer.clientHeight;

  camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 1000);
  camera.position.set(0, 8, 18);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(w, h, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.display = 'block';
  canvasContainer.appendChild(renderer.domElement);

  // lighting
  const ambient = new THREE.AmbientLight('#dbeefe', 0.6);
  const dir = new THREE.DirectionalLight('#d5ecff', 0.8);
  dir.position.set(5, 10, 7);
  scene.add(ambient, dir);

  const geom = createHexGeometry();
  const mat = createMaterial();
  instanced = buildInstancedGrid(INSTANCE_COUNT, geom, mat);
  instanced.castShadow = false;
  instanced.receiveShadow = false;
  scene.add(instanced);

  // slow structural evolution controlled by GSAP timeline
  animationTl = gsap.timeline({ repeat: -1, defaults: { duration: 8, ease: 'power1.inOut' } });
  animationTl.to(instanced.scale, { x: 0.9, y: 1, z: 0.9, duration: 12, yoyo: true, repeat: -1 }, 0);
  // subtle rotation on parent scene
  animationTl.to(instanced.rotation || (instanced as any).rotation, { y: Math.PI * 2, duration: 120, ease: 'none' }, 0);

  // render loop (use RAF to keep it independent of GSAP tick, but lightweight)
  const tick = () => {
    if (!renderer || !scene || !camera) return;
    renderer.render(scene, camera);
    rafId = requestAnimationFrame(tick);
  };
  rafId = requestAnimationFrame(tick);

  // responsive
  window.addEventListener('resize', onResize);
}

function onResize() {
  if (!root.value || !renderer || !camera) return;
  const w = root.value.clientWidth;
  const h = root.value.clientHeight;
  camera!.aspect = w / h;
  camera!.updateProjectionMatrix();
  renderer!.setSize(w, h, false);
}

function dispose() {
  if (rafId) cancelAnimationFrame(rafId);
  if (animationTl) animationTl.kill();
  window.removeEventListener('resize', onResize);
  if (instanced) {
    instanced.geometry.dispose();
    if (Array.isArray(instanced.material)) instanced.material.forEach(m => m.dispose());
    else instanced.material.dispose();
    scene?.remove(instanced);
    instanced = null;
  }
  if (renderer) {
    renderer.dispose();
    if (renderer.domElement && root.value?.contains(renderer.domElement)) {
      root.value.removeChild(renderer.domElement);
    }
    renderer = null;
  }
  scene = null;
  camera = null;
}

onMounted(() => {
  if (!root.value) return;
  init(root.value);
  // register API so scenes can control world without recreating it
  registerBackgroundIntelligence({
    setSceneIndex: (i: number) => {
      // example: morph density by changing instance scale
      if (!instanced) return;
      const t = gsap.timeline();
      t.to(instanced.scale, { x: 0.6 + (i % 3) * 0.2, y: 1, z: 0.6 + (i % 3) * 0.2, duration: 1.2, ease: 'power2.out' });
    },
    focusArea: (x: number, z: number) => {
      if (!instanced) return;
      // subtle camera nudge towards area
      if (camera) gsap.to(camera.position, { x: x * 0.75, z: camera.position.z - 1.2, duration: 1.2, ease: 'power2.out' });
    },
    dispose,
  });
});

onBeforeUnmount(() => {
  dispose();
});
</script>

<style scoped>
.bis-canvas {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
</style>
