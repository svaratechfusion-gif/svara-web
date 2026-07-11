<script setup lang="ts">
// Prototype of the redesigned "Birth of Intelligence" opening beat — see
// docs/intelligence-engine-plan.md. Deliberately isolated from OriginField.vue
// (the live Hero's particle scene) rather than editing it in place: the shape/
// timing here needs to be judged and iterated on before it's worth folding
// into the real homepage.
//
// Two things this changes versus the current Hero sequence:
// 1. A genuinely staged reveal (blank -> one particle -> it notices the
//    cursor -> a second particle arrives -> cascade to thousands) instead of
//    one continuous convergence tween.
// 2. The final formation is a torus-knot tube with a superformula-shaped
//    (non-circular, petal/spike) cross-section, not a rippled UV sphere —
//    picked specifically to avoid reading as sphere/globe/blob/crystal/network.
//    The shape constants below are a first guess, meant to be tuned live.
import * as THREE from "three";

// --- Timeline (seconds) ---------------------------------------------------
const FIRST_PARTICLE_AT = 0.6; // blank stage duration before anything appears
const REACT_WINDOW_END = 2.0; // how long the lone first particle idles/reacts
const SECOND_PARTICLE_TRAVEL = 0.45; // time the second particle spends flying in
const CASCADE_START = REACT_WINDOW_END + SECOND_PARTICLE_TRAVEL; // ~2.45
const CASCADE_DURATION = 5.0; // "within five seconds... thousands" per brief
const CASCADE_END = CASCADE_START + CASCADE_DURATION; // ~7.45
const CONSTRUCT_TAIL = 1.6; // extra settle time after the last particle arrives
const CONSTRUCT_END = CASCADE_END + CONSTRUCT_TAIL; // ~9.05, shape at rest

// --- Shape (the "impossible geometry") ------------------------------------
// Torus-knot centerline: (p, q) coprime integers control how many times the
// curve winds before closing. Higher/coprime values read as more unfamiliar
// than the usual trefoil (2,3) or (3,8) demo knots.
const KNOT_P = 3;
const KNOT_Q = 8;
const KNOT_SCALE = 1.55;
const TUBE_RADIUS = 0.42;

// Gielis superformula cross-section profile — replaces a circular tube with
// a spiky/petaled one. m controls petal count; n1/n2/n3 control how sharp vs
// rounded the petals read.
const SUPERFORMULA = { m: 7, n1: 0.3, n2: 1.7, n3: 1.7 };

function superformulaRadius(theta: number) {
  const t1 = Math.abs(Math.cos((SUPERFORMULA.m * theta) / 4)) ** SUPERFORMULA.n2;
  const t2 = Math.abs(Math.sin((SUPERFORMULA.m * theta) / 4)) ** SUPERFORMULA.n3;
  return (t1 + t2) ** (-1 / SUPERFORMULA.n1);
}

function knotCenter(t: number, out: THREE.Vector3) {
  const r = 2 + Math.cos(KNOT_Q * t);
  out.set(r * Math.cos(KNOT_P * t), r * Math.sin(KNOT_P * t), Math.sin(KNOT_Q * t)).multiplyScalar(KNOT_SCALE * 0.42);
}

// Approximate Frenet frame via finite difference — exact enough for a point
// cloud (no shading dependent on precise normals), far simpler than a real
// parallel-transport frame.
const EPS = 0.001;
function knotFrame(t: number, tangent: THREE.Vector3, normal: THREE.Vector3, binormal: THREE.Vector3) {
  const p0 = new THREE.Vector3();
  const p1 = new THREE.Vector3();
  knotCenter(t, p0);
  knotCenter(t + EPS, p1);
  tangent.copy(p1).sub(p0).normalize();
  const up = Math.abs(tangent.y) > 0.95 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 1, 0);
  normal.crossVectors(up, tangent).normalize();
  binormal.crossVectors(tangent, normal).normalize();
}

function seededRandom(seed: number) {
  let state = seed;
  return () => {
    state += 0x6d2b79f5;
    let x = state;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const x = clamp01((value - edge0) / (edge1 - edge0));
  return x * x * (3 - 2 * x);
}

const fieldRef = ref<HTMLElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  if (!fieldRef.value || !canvasRef.value) return;

  const field = fieldRef.value;
  const canvas = canvasRef.value;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const particleCount = isMobile ? 1400 : 2600;
  const random = seededRandom(20260706);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 7.2);

  const birth = new Float32Array(particleCount * 3);
  const target = new Float32Array(particleCount * 3);
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const phases = new Float32Array(particleCount);
  const amplitudes = new Float32Array(particleCount);

  const tangent = new THREE.Vector3();
  const normal = new THREE.Vector3();
  const binormal = new THREE.Vector3();
  const centerPoint = new THREE.Vector3();

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;

    if (i === 0) {
      // The lone first particle: fixed, slightly off-center, not part of
      // the wide "entering from outside the viewport" scatter.
      birth[i3] = 0.55;
      birth[i3 + 1] = 0.18;
      birth[i3 + 2] = 0.4;
    } else {
      // Every other particle "shoots in" rather than fades — start well
      // outside the visible frustum, biased along x so the second particle
      // in particular reads as entering laterally.
      const edgeBias = (random() < 0.5 ? -1 : 1) * (7 + random() * 6);
      birth[i3] = edgeBias;
      birth[i3 + 1] = (random() - 0.5) * 9;
      birth[i3 + 2] = (random() - 0.5) * 4 - 1;
    }

    const t = random() * Math.PI * 2;
    const crossAngle = random() * Math.PI * 2;
    const profile = superformulaRadius(crossAngle);
    const rippled = TUBE_RADIUS * (0.55 + 0.45 * Math.min(2.2, profile)) * (0.85 + Math.sin(t * 5 + crossAngle * 2) * 0.15);

    knotCenter(t, centerPoint);
    knotFrame(t, tangent, normal, binormal);

    target[i3] = centerPoint.x + (normal.x * Math.cos(crossAngle) + binormal.x * Math.sin(crossAngle)) * rippled;
    target[i3 + 1] = centerPoint.y + (normal.y * Math.cos(crossAngle) + binormal.y * Math.sin(crossAngle)) * rippled;
    target[i3 + 2] = centerPoint.z + (normal.z * Math.cos(crossAngle) + binormal.z * Math.sin(crossAngle)) * rippled;

    phases[i] = random() * Math.PI * 2;
    amplitudes[i] = 0.02 + random() * 0.05;

    positions[i3] = birth[i3]!;
    positions[i3 + 1] = birth[i3 + 1]!;
    positions[i3 + 2] = birth[i3 + 2]!;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setDrawRange(0, prefersReducedMotion ? particleCount : 0);

  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    vertexColors: true,
    // Normal blending, not additive: additive blending onto a light/white
    // backdrop just washes out to white (confirmed against the live Hero's
    // near-identical particle material, which is invisible for exactly this
    // reason on this project's white background token). Additive only reads
    // correctly over a dark backdrop.
    blending: THREE.NormalBlending,
    uniforms: {
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uSize: { value: isMobile ? 14 : 17 },
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
      void main() {
        vec2 uv = gl_PointCoord - vec2(0.5);
        float dist = length(uv);
        float alpha = smoothstep(0.5, 0.05, dist);
        gl_FragColor = vec4(vColor, alpha);
      }
    `,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  const mouse = new THREE.Vector2(0, 0);
  const mouseTarget = new THREE.Vector2(0, 0);
  const clock = new THREE.Clock();
  let animationFrame = 0;

  const resize = () => {
    const rect = field.getBoundingClientRect();
    const width = Math.max(1, rect.width);
    const height = Math.max(1, rect.height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    material.uniforms.uPixelRatio!.value = Math.min(window.devicePixelRatio, 2);
  };

  const handlePointerMove = (event: PointerEvent) => {
    const rect = field.getBoundingClientRect();
    mouseTarget.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    mouseTarget.y = -((event.clientY - rect.top) / rect.height - 0.5) * 2;
  };

  const visibleCountForTime = (elapsed: number) => {
    if (prefersReducedMotion) return particleCount;
    if (elapsed < FIRST_PARTICLE_AT) return 0;
    if (elapsed < REACT_WINDOW_END) return 1;
    if (elapsed < CASCADE_START) return 2;
    if (elapsed < CASCADE_END) {
      const p = smoothstep(CASCADE_START, CASCADE_END, elapsed);
      const eased = p * p * p; // slow trickle, then a burst — not a linear count-up
      return Math.max(2, Math.floor(2 + (particleCount - 2) * eased));
    }
    return particleCount;
  };

  const render = () => {
    animationFrame = requestAnimationFrame(render);

    // .getElapsedTime() (not the .elapsedTime property read alone) is what
    // actually advances THREE.Clock's internal clock each call — reading the
    // property without ever calling getDelta()/getElapsedTime() leaves it
    // frozen at 0 forever, which was silently stuck on the blank stage.
    const elapsed = prefersReducedMotion ? CONSTRUCT_END : clock.getElapsedTime();
    const visibleCount = visibleCountForTime(elapsed);
    const converge = smoothstep(CASCADE_START, CONSTRUCT_END, elapsed);
    // Rises while the first particle is alone/reacting, fades out once the
    // cascade takes over — "acknowledges," not a permanent follow.
    const reactWindow =
      smoothstep(FIRST_PARTICLE_AT, FIRST_PARTICLE_AT + 0.3, elapsed) * (1 - smoothstep(CASCADE_START - 0.3, CASCADE_START, elapsed));

    mouse.lerp(mouseTarget, 0.06);

    const positionAttribute = geometry.getAttribute("position") as THREE.BufferAttribute;
    const colorAttribute = geometry.getAttribute("color") as THREE.BufferAttribute;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const phase = phases[i]!;
      const amp = amplitudes[i]!;
      const wander = Math.sin(elapsed * 0.8 + phase) * amp;

      let bx = birth[i3]!;
      let by = birth[i3 + 1]!;
      const bz = birth[i3 + 2]! + wander;

      if (i === 0) {
        bx += mouse.x * 0.35 * reactWindow;
        by += mouse.y * 0.25 * reactWindow;
      }

      positionAttribute.array[i3] = bx + (target[i3]! - bx) * converge;
      positionAttribute.array[i3 + 1] = by + (target[i3 + 1]! - by) * converge;
      positionAttribute.array[i3 + 2] = bz + (target[i3 + 2]! - bz) * converge;

      const glow = i === 0 ? 0.6 + reactWindow * 0.5 : 0.55 + Math.sin(elapsed * 1.4 + phase) * 0.1 + converge * 0.25;
      colors[i3] = 0.14 * glow;
      colors[i3 + 1] = 0.48 * glow;
      colors[i3 + 2] = 0.86 * glow;
    }

    positionAttribute.needsUpdate = true;
    colorAttribute.needsUpdate = true;
    geometry.setDrawRange(0, visibleCount);

    // Gentle idle drift once formed — the shape should read as at rest, not
    // still visibly animating, once CONSTRUCT_END has passed.
    const settleRotation = Math.min(1, converge) * elapsed * 0.05;
    points.rotation.y = settleRotation;
    points.rotation.x = Math.sin(elapsed * 0.15) * 0.05;

    camera.position.x = mouse.x * 0.2;
    camera.position.y = mouse.y * 0.14;
    camera.lookAt(0, 0, 0);

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
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  });
});
</script>

<template>
  <div ref="fieldRef" class="birth-field">
    <canvas ref="canvasRef" class="birth-field__canvas" aria-hidden="true" />
  </div>
</template>

<style scoped>
.birth-field {
  /* Cold open is a white/paper screen per the brief, not black — matches
     this project's --color-bg token (museum paper, #F9FAFC) rather than the
     near-black backdrop the additive-blended version of this effect would
     have needed. */
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: #f9fafc;
}

.birth-field__canvas {
  display: block;
  height: 100%;
  width: 100%;
}
</style>
