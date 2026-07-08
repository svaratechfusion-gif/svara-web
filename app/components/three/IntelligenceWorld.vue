<script setup lang="ts">
// Scenes 01 (Birth), 02 (Emergence), and 03 (Intelligence) re-plumbed into
// the persistent world.
//
// Scene 01 is time-based, not scroll-based — blank -> one cursor-reactive
// particle -> a second particle shoots in -> cascade to full count over ~5s.
// Visitors haven't necessarily scrolled yet when this plays.
//
// Scene 02 is scroll-driven: once the cascade has particles, scrolling into
// the "emergence" scene range (registered by SceneEmergence.vue) organizes
// them toward a low-intensity nucleus and fades in connection lines between
// nearby particles. The nucleus is deliberately dim — "condensing," not yet
// "activated" (Scene 05's job).
//
// Scene 03 continues the same pool toward a text-shaped target (glyph) — the
// headline IS the particle field. Accessible heading in SceneIntelligence.vue
// is visually transparent over this canvas.
//
// Scene 04 "Data": particles flow across the screen (time-varying drift),
// then an abrupt, UNEASED visibility cut drops draw range to ~20% and
// survivors scatter apart.
//
// Scene 05 "SVARA": survivors converge back onto the same nucleus as Scene
// 02 (one persistent AI Core), now "activated" — full-brightness glow,
// connection lines snapping back in.
//
// Scene 06 "Products": pool splits into 7 clusters around a ring; each has a
// genuinely different shape+behavior (grid/ring/sphere/sub-swarms/split-pair/
// layered-plane/glyph-morph).
//
// Scene 07 "Industries": 6 clusters laid out along a line (lateral camera
// drift), each a lightweight primitive shape (columns/grid/waveform/lattice).
//
// Scene 08 "Scale": pool converges back onto nucleus + a separate dim
// background lattice fades in; camera dollys out to reveal everything as one
// bright cluster inside the larger lattice.
//
// Scene 09 "Ending": motion damps, connections fade to faint minimum, camera
// settles. No new geometry.
//
// PHASE 2 — RENDERING ENGINE ONLY. All pacing, scene sequencing, camera
// language lives in lib/experience/SceneDirector.ts; values arrive as
// ParticleEngine channels written by the ONE master timeline.

// --- ACT I — BIRTH TIMING -------------------------------------------------
// The 2-second void (the "did it load?" moment) is the opening statement.
// Nothing. White screen. Silence.
//
// Then the first particle appears like the first star being born — tiny,
// blue, tentative. It idles, notices the cursor (pulls toward it, doesn't
// follow), and after a moment a second particle shoots in from outside the
// frame — visible lateral motion, a clear "something is happening."
//
// Then the cascade: not a burst, not a fade — a growing constellation. The
// cascade takes ~5s to reach full count, biased to start slowly (trickle)
// and accelerate into a steady stream.
//
// After the count peaks, ~2.5s of settle time — residual drift damps, the
// field reads as a calm, waiting presence. The visitor has been watching
// for ~12s. They're curious. Now they scroll.
import * as THREE from "three";
import { useIntelligenceWorld } from "~/composables/useIntelligenceWorld";
import { sampleTextParticles, sampleTextBlock, assignTextBlockTargets } from "~/utils/sampleTextParticles";
import { PRODUCT_NAMES } from "~/utils/products";
import { INDUSTRY_NAMES } from "~/utils/industries";
import { gsap } from "~~/lib/gsap";
import { useMotionDirector, disposeMotionDirector } from "~~/lib/experience/MotionDirector";
import type { CameraLike } from "~~/lib/experience/CameraController";
import { SCRIPT_SVH } from "~~/lib/experience/pacing";
import { useWorldReady } from "~/composables/useWorldReady";

// --- Birth timing constants (seconds) ---
const VOID_DURATION = 2.0;        // Pure white void, nothing at all
const FIRST_PARTICLE_AT = 2.0;    // First star appears
const REACT_WINDOW_END = 3.8;     // First particle reacts to cursor, idles alone
const SECOND_PARTICLE_TRAVEL = 0.5; // Time for second particle to fly in
const CASCADE_START = REACT_WINDOW_END + SECOND_PARTICLE_TRAVEL; // ~4.3
const CASCADE_DURATION = 5.2;     // Growth from 2 → particleCount
const CASCADE_END = CASCADE_START + CASCADE_DURATION; // ~9.5
const SETTLE_DURATION = 2.5;      // Final drift damping after cascade completes
const SETTLE_END = CASCADE_END + SETTLE_DURATION; // ~12.0

// --- Scene 02 "Awareness" — the field notices the cursor -------------------
// Mouse moves. Particles notice. Not follow. Notice. Every cursor movement
// creates ripples — tiny, elegant, no chaos. Displacements are derived from
// each frame's base position (never accumulated), so the field always
// relaxes back to where the story wants it.
const MAX_RIPPLES = 6;
const RIPPLE_SPEED = 2.6; // world units/sec the ring front travels
const RIPPLE_LIFE = 1.3; // seconds a ripple survives
const RIPPLE_WIDTH = 0.55; // half-thickness of the ring band
const RIPPLE_AMP = 0.085; // max radial displacement
const NOTICE_RADIUS = 1.7; // particles inside this lean toward the cursor
const NOTICE_AMP = 0.06; // max lean — notice, never follow

const PRODUCT_RADIUS = 3.4;
const INDUSTRY_SPACING = 3.2;

// AI Agents (product 3) — a workflow graph, not a blob. Five agent NODES in
// a small DAG (intake → orchestrator → workers → output) and the edge list
// messenger particles travel: conversation, workflows, automation.
const AGENT_NODES = [
  { x: -0.62, y: 0.05, z: 0 }, // intake
  { x: -0.1, y: 0.34, z: 0.18 }, // orchestrator
  { x: -0.08, y: -0.26, z: -0.14 }, // worker A
  { x: 0.38, y: 0.1, z: 0.22 }, // worker B
  { x: 0.66, y: -0.12, z: -0.06 }, // output
];
const AGENT_EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [1, 3],
  [2, 4],
  [3, 4],
  [0, 2],
];

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

const { globalProgress, activeProduct, activeIndustry, typographySolid, typographyFontSvh, cameraEnter } =
  useIntelligenceWorld();
const worldReady = useWorldReady();

// Scene 05 "Typography is Created" — the headline the particles build.
const HEADLINE_LINES = ["ENGINEERING", "THE INTELLIGENCE", "LAYER", "OF TOMORROW"];
// Camera distance when the handoff happens (z = 8 - cameraPush * 1.1) and
// the world-height visible there — the DOM font size is derived from these
// so real text lands exactly on the particle text.
const CAMERA_HANDOFF_DIST = 6.9;
const VISIBLE_HALF_AT_HANDOFF = Math.tan((42 / 2) * (Math.PI / 180)) * CAMERA_HANDOFF_DIST;

const fieldRef = ref<HTMLElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  if (!fieldRef.value || !canvasRef.value) return;

  const canvas = canvasRef.value;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const particleCount = isMobile ? 3000 : 8000;
  const random = seededRandom(20260706);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 8);

  const director = useMotionDirector();
  director.attachCamera(camera as unknown as CameraLike);
  const engine = director.particles;
  const debugAwareness = import.meta.dev ? { awareness: 0, liveRipples: 0, pointerSeen: false, frames: 0 } : null;
  if (import.meta.dev) {
    const devWindow = window as unknown as Record<string, unknown>;
    devWindow.__svaraDirector = director;
    devWindow.__svaraAwareness = debugAwareness;
  }

  const birth = new Float32Array(particleCount * 3);
  const nucleus = new Float32Array(particleCount * 3);
  const glyph = new Float32Array(particleCount * 3);
  const stream = new Float32Array(particleCount * 3);
  const disconnected = new Float32Array(particleCount * 3);
  const flowSpeeds = new Float32Array(particleCount);
  const spawn = new Float32Array(particleCount * 3);
  const productBase = new Float32Array(particleCount * 3);
  const productIndexArr = new Int16Array(particleCount);
  const subSwarmIndex = new Int16Array(particleCount);
  const genGlyph = new Float32Array(particleCount * 3);
  const industryBase = new Float32Array(particleCount * 3);
  const industryIndexArr = new Int16Array(particleCount);

  const productCenters = Array.from({ length: PRODUCT_NAMES.length }, (_unused, idx) => {
    const angle = (idx / PRODUCT_NAMES.length) * Math.PI * 2 - Math.PI / 2;
    return {
      x: Math.cos(angle) * PRODUCT_RADIUS,
      y: Math.sin(angle * 1.3) * 0.9,
      z: Math.sin(angle) * PRODUCT_RADIUS,
    };
  });
  const industryCenters = Array.from({ length: INDUSTRY_NAMES.length }, (_unused, idx) => ({
    x: (idx - (INDUSTRY_NAMES.length - 1) / 2) * INDUSTRY_SPACING,
    y: 0,
    z: -1.5,
  }));
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const phases = new Float32Array(particleCount);
  const amplitudes = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;

    if (i === 0) {
      birth[i3] = 0.55;
      birth[i3 + 1] = 0.18;
      birth[i3 + 2] = 0.4;
      spawn[i3] = birth[i3]!;
      spawn[i3 + 1] = birth[i3 + 1]!;
      spawn[i3 + 2] = birth[i3 + 2]!;
    } else {
      const edgeBias = (random() < 0.5 ? -1 : 1) * (7 + random() * 6);
      spawn[i3] = edgeBias;
      spawn[i3 + 1] = (random() - 0.5) * 9;
      spawn[i3 + 2] = (random() - 0.5) * 4 - 1;
      birth[i3] = (random() - 0.5) * 11;
      birth[i3 + 1] = (random() - 0.5) * 7.5;
      birth[i3 + 2] = (random() - 0.5) * 3 - 0.5;
    }

    const theta = random() * Math.PI * 2;
    const phi = Math.acos(2 * random() - 1);
    const radius = 1.4 + random() * 0.3;
    nucleus[i3] = radius * Math.sin(phi) * Math.cos(theta);
    nucleus[i3 + 1] = radius * Math.cos(phi) * 0.86;
    nucleus[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

    phases[i] = random() * Math.PI * 2;
    amplitudes[i] = 0.02 + random() * 0.05;
    flowSpeeds[i] = 2.2 + random() * 1.8;

    stream[i3] = (random() - 0.5) * 20;
    stream[i3 + 1] = (random() - 0.5) * 1.2;
    stream[i3 + 2] = (random() - 0.5) * 2;

    const dtheta = random() * Math.PI * 2;
    const dphi = Math.acos(2 * random() - 1);
    const dradius = 3 + random() * 4;
    disconnected[i3] = dradius * Math.sin(dphi) * Math.cos(dtheta);
    disconnected[i3 + 1] = dradius * Math.cos(dphi);
    disconnected[i3 + 2] = dradius * Math.sin(dphi) * Math.sin(dtheta);

    const productIdx = Math.floor(random() * PRODUCT_NAMES.length);
    productIndexArr[i] = productIdx;
    const center = productCenters[productIdx]!;

    let localX = 0;
    let localY = 0;
    let localZ = 0;
    switch (productIdx) {
      case 0: {
        const gridSize = 6;
        const gx = Math.floor(random() * gridSize) - gridSize / 2;
        const gy = Math.floor(random() * gridSize) - gridSize / 2;
        localX = gx * 0.12;
        localY = gy * 0.12;
        localZ = (random() - 0.5) * 0.1;
        break;
      }
      case 1: {
        // Drone AI — the particle cloud becomes TERRAIN: a heightfield
        // patch mapped by a drone. ~5% of the cluster is the drone body
        // (flagged in subSwarmIndex; flight path is per-frame).
        if (i % 19 === 0) {
          subSwarmIndex[i] = 1;
          localX = (random() - 0.5) * 0.1;
          localY = (random() - 0.5) * 0.06;
          localZ = (random() - 0.5) * 0.1;
        } else {
          const tx = (random() - 0.5) * 1.8;
          const tz = (random() - 0.5) * 1.8;
          const elevation =
            0.22 * Math.sin(tx * 3.1) + 0.17 * Math.cos(tz * 2.7 + tx * 1.3) + 0.08 * Math.sin((tx + tz) * 5.2);
          localX = tx;
          localY = -0.42 + elevation;
          localZ = tz;
        }
        break;
      }
      case 3: {
        // AI Agents — nodes + messengers. ~3% of the cluster are flagged
        // (-1) as messages that fly the DAG edges per frame; the rest form
        // tight agent-node balls.
        if (i % 29 === 0) {
          subSwarmIndex[i] = -1;
          localX = 0;
          localY = 0;
          localZ = 0;
        } else {
          const nodeIdx = Math.floor(random() * AGENT_NODES.length);
          subSwarmIndex[i] = nodeIdx;
          const node = AGENT_NODES[nodeIdx]!;
          const ntheta = random() * Math.PI * 2;
          const nphi = Math.acos(2 * random() - 1);
          const nradius = 0.09 + random() * 0.07;
          localX = node.x + Math.sin(nphi) * Math.cos(ntheta) * nradius;
          localY = node.y + Math.cos(nphi) * nradius;
          localZ = node.z + Math.sin(nphi) * Math.sin(ntheta) * nradius;
        }
        break;
      }
      case 2: {
        // Digital Twin — a particle FACTORY: main hall, sawtooth roofline,
        // chimney stack, annex unit, ground pad. Shells only — a hologram
        // is a surface, not a volume.
        const pick = random();
        if (pick < 0.42) {
          // main hall shell (4 walls + flat roof)
          const face = Math.floor(random() * 5);
          const u = random();
          const v = random();
          if (face === 0 || face === 1) {
            localX = face === 0 ? -0.55 : 0.25;
            localY = -0.35 + v * 0.4;
            localZ = -0.3 + u * 0.6;
          } else if (face === 2 || face === 3) {
            localZ = face === 2 ? -0.3 : 0.3;
            localX = -0.55 + u * 0.8;
            localY = -0.35 + v * 0.4;
          } else {
            localY = 0.05;
            localX = -0.55 + u * 0.8;
            localZ = -0.3 + v * 0.6;
          }
        } else if (pick < 0.57) {
          // sawtooth roofline — three teeth; the silhouette that SAYS factory
          const u = random();
          const tooth = u * 3;
          localX = -0.55 + u * 0.8;
          localY = 0.05 + (tooth - Math.floor(tooth)) * 0.16;
          localZ = -0.3 + random() * 0.6;
        } else if (pick < 0.7) {
          // chimney stack
          const stackAngle = random() * Math.PI * 2;
          localX = 0.48 + Math.cos(stackAngle) * 0.055;
          localZ = -0.12 + Math.sin(stackAngle) * 0.055;
          localY = -0.35 + random() * 0.82;
        } else if (pick < 0.86) {
          // annex unit — snap one random axis to a face for the shell feel
          localX = 0.34 + random() * 0.36;
          localY = -0.35 + random() * 0.25;
          localZ = 0.02 + random() * 0.33;
          const snap = Math.floor(random() * 3);
          if (snap === 0) localY = random() < 0.5 ? -0.35 : -0.1;
          else if (snap === 1) localX = random() < 0.5 ? 0.34 : 0.7;
          else localZ = random() < 0.5 ? 0.02 : 0.35;
        } else {
          // ground pad
          localX = (random() - 0.5) * 1.7;
          localZ = (random() - 0.5) * 1.0;
          localY = -0.36;
        }
        break;
      }
      case 4: {
        const side = i % 2 === 0 ? -1 : 1;
        localX = side * 0.42 + (random() - 0.5) * 0.22;
        localY = (random() - 0.5) * 0.4;
        localZ = (random() - 0.5) * 0.4;
        break;
      }
      case 6: {
        // Business Cloud — a PLANET: central data-plane hub sphere, three
        // orbiting system moons (ERP / CRM / HR — placed per frame), and
        // connector streams (-1) flowing between everything and the hub.
        const pick = random();
        if (pick < 0.55) {
          subSwarmIndex[i] = 3; // hub shell
          const htheta = random() * Math.PI * 2;
          const hphi = Math.acos(2 * random() - 1);
          const hradius = 0.3 + random() * 0.06;
          localX = Math.sin(hphi) * Math.cos(htheta) * hradius;
          localY = Math.cos(hphi) * hradius;
          localZ = Math.sin(hphi) * Math.sin(htheta) * hradius;
        } else if (pick < 0.85) {
          subSwarmIndex[i] = Math.floor(random() * 3); // moon ball offset
          const mtheta = random() * Math.PI * 2;
          const mphi = Math.acos(2 * random() - 1);
          const mradius = 0.03 + random() * 0.08;
          localX = Math.sin(mphi) * Math.cos(mtheta) * mradius;
          localY = Math.cos(mphi) * mradius;
          localZ = Math.sin(mphi) * Math.sin(mtheta) * mradius;
        } else {
          subSwarmIndex[i] = -1; // connector stream
          localX = 0;
          localY = 0;
          localZ = 0;
        }
        break;
      }
      default: {
        const ptheta = random() * Math.PI * 2;
        const pphi = Math.acos(2 * random() - 1);
        const pradius = 0.4 + random() * 0.2;
        localX = Math.sin(pphi) * Math.cos(ptheta) * pradius;
        localY = Math.cos(pphi) * pradius;
        localZ = Math.sin(pphi) * Math.sin(ptheta) * pradius;
      }
    }
    productBase[i3] = center.x + localX;
    productBase[i3 + 1] = center.y + localY;
    productBase[i3 + 2] = center.z + localZ;

    const industryIdx = Math.floor(random() * INDUSTRY_NAMES.length);
    industryIndexArr[i] = industryIdx;
    const industryCenter = industryCenters[industryIdx]!;

    // Six living miniature worlds (docs: "every industry appears as a
    // living miniature world") — each diorama recognizable in silhouette.
    let ilx = 0;
    let ily = 0;
    let ilz = 0;
    switch (industryIdx) {
      case 0: {
        // Manufacturing — mini factory: hall shell, sawtooth roof, chimney
        const pick = random();
        if (pick < 0.5) {
          ilx = -0.55 + random() * 0.7;
          ily = -0.3 + random() * 0.3;
          ilz = (random() - 0.5) * 0.5;
          const snap = Math.floor(random() * 3);
          if (snap === 0) ily = random() < 0.5 ? -0.3 : 0;
          else if (snap === 1) ilx = random() < 0.5 ? -0.55 : 0.15;
          else ilz = random() < 0.5 ? -0.25 : 0.25;
        } else if (pick < 0.72) {
          const u = random();
          const tooth = u * 3;
          ilx = -0.55 + u * 0.7;
          ily = (tooth - Math.floor(tooth)) * 0.11;
          ilz = (random() - 0.5) * 0.5;
        } else if (pick < 0.85) {
          const stackAngle = random() * Math.PI * 2;
          ilx = 0.34 + Math.cos(stackAngle) * 0.045;
          ilz = Math.sin(stackAngle) * 0.045;
          ily = -0.3 + random() * 0.62;
        } else {
          ilx = (random() - 0.5) * 1.4;
          ily = -0.31;
          ilz = (random() - 0.5) * 0.7;
        }
        break;
      }
      case 1: {
        // Smart Cities — the skyline: columns of varied heights
        const columnCount = 6;
        const column = Math.floor(random() * columnCount) - columnCount / 2;
        const columnHeight = 0.35 + ((column + columnCount / 2) % 3) * 0.28 + random() * 0.1;
        ilx = column * 0.16;
        ily = random() * columnHeight - 0.2;
        ilz = (random() - 0.5) * 0.25;
        break;
      }
      case 2: {
        // Agriculture — field rows + a grain silo
        if (random() < 0.86) {
          const rows = 7;
          const row = Math.floor(random() * rows) - rows / 2;
          const col = Math.floor(random() * rows) - rows / 2;
          ilx = row * 0.14;
          ily = -0.2 + (random() - 0.5) * 0.04;
          ilz = col * 0.14;
        } else {
          const siloAngle = random() * Math.PI * 2;
          ilx = 0.62 + Math.cos(siloAngle) * 0.05;
          ilz = 0.3 + Math.sin(siloAngle) * 0.05;
          ily = -0.22 + random() * 0.34;
        }
        break;
      }
      case 3: {
        // Healthcare — hospital block with the CROSS above the roof
        const pick = random();
        if (pick < 0.52) {
          ilx = (random() - 0.5) * 0.6;
          ily = -0.3 + random() * 0.42;
          ilz = (random() - 0.5) * 0.4;
          const snap = Math.floor(random() * 3);
          if (snap === 0) ily = random() < 0.5 ? -0.3 : 0.12;
          else if (snap === 1) ilx = random() < 0.5 ? -0.3 : 0.3;
          else ilz = random() < 0.5 ? -0.2 : 0.2;
        } else if (pick < 0.82) {
          if (random() < 0.5) {
            ilx = -0.16 + random() * 0.32;
            ily = 0.3 + random() * 0.08;
          } else {
            ilx = -0.04 + random() * 0.08;
            ily = 0.2 + random() * 0.28;
          }
          ilz = (random() - 0.5) * 0.06;
        } else {
          ilx = (random() - 0.5) * 1.1;
          ily = -0.31;
          ilz = (random() - 0.5) * 0.6;
        }
        break;
      }
      case 4: {
        // Retail — storefront strip; shoppers (i % 5 < 2) drift out front
        if (i % 5 < 2) {
          ilx = (random() - 0.5) * 1.1;
          ily = -0.29;
          ilz = 0.3 + random() * 0.25;
        } else if (random() < 0.78) {
          ilx = (random() - 0.5) * 1.1;
          ily = -0.3 + random() * 0.22;
          ilz = (random() - 0.5) * 0.35;
          const snap = Math.floor(random() * 3);
          if (snap === 0) ily = random() < 0.5 ? -0.3 : -0.08;
          else if (snap === 1) ilx = random() < 0.5 ? -0.55 : 0.55;
          else ilz = random() < 0.5 ? -0.17 : 0.17;
        } else {
          ilx = (random() - 0.5) * 1.1;
          ily = -0.06;
          ilz = 0.18 + random() * 0.06;
        }
        break;
      }
      case 5: {
        // Logistics — cargo hub: runway, control tower; transports
        // (i % 3 === 0) run the strip per frame
        if (i % 3 === 0) {
          ilx = 0;
          ily = -0.27;
          ilz = 0.05 + (random() - 0.5) * 0.1;
        } else if (random() < 0.62) {
          ilx = (random() - 0.5) * 1.3;
          ily = -0.31;
          ilz = -0.02 + random() * 0.2;
        } else {
          const towerAngle = random() * Math.PI * 2;
          const isHead = random() < 0.35;
          ilx = -0.5 + Math.cos(towerAngle) * (isHead ? 0.09 : 0.04);
          ilz = -0.28 + Math.sin(towerAngle) * (isHead ? 0.09 : 0.04);
          ily = isHead ? 0.16 + random() * 0.07 : -0.3 + random() * 0.46;
        }
        break;
      }
      default: {
        ilx = (random() - 0.5) * 1.1;
        ily = (random() - 0.5) * 0.3;
        ilz = (random() - 0.5) * 0.3;
      }
    }
    industryBase[i3] = industryCenter.x + ilx;
    industryBase[i3 + 1] = industryCenter.y + ily;
    industryBase[i3 + 2] = industryCenter.z + ilz;

    positions[i3] = birth[i3]!;
    positions[i3 + 1] = birth[i3 + 1]!;
    positions[i3 + 2] = birth[i3 + 2]!;
  }

  // Generative AI morph target
  {
    const sampledGlyph = sampleTextParticles("AI", { worldWidth: 1.1, worldHeight: 0.34, fontSize: 160 });
    const genCenter = productCenters[5]!;
    if (sampledGlyph.count > 0) {
      for (let i = 0; i < particleCount; i++) {
        if (productIndexArr[i] !== 5) continue;
        const i3 = i * 3;
        const sourceIndex = i % sampledGlyph.count;
        const s3 = sourceIndex * 3;
        genGlyph[i3] = genCenter.x + sampledGlyph.positions[s3]!;
        genGlyph[i3 + 1] = genCenter.y + sampledGlyph.positions[s3 + 1]!;
        genGlyph[i3 + 2] = genCenter.z + sampledGlyph.positions[s3 + 2]!;
      }
    }
  }

  // Scene 05: sample the four-line headline, fit to the camera's handoff
  // framing (never wider than 92% of the visible width at that distance).
  const glyphOrder = new Float32Array(particleCount);
  const headlineWorldWidth = Math.min(
    5.6,
    2 * VISIBLE_HALF_AT_HANDOFF * (window.innerWidth / Math.max(1, window.innerHeight)) * 0.92
  );
  const sampleHeadline = () => {
    const sampled = sampleTextBlock(HEADLINE_LINES, { worldWidth: headlineWorldWidth });
    assignTextBlockTargets(glyph, glyphOrder, particleCount, sampled, random);
    typographyFontSvh.value = (sampled.fontWorld / (2 * VISIBLE_HALF_AT_HANDOFF)) * 100;
  };
  sampleHeadline();
  // Geist may arrive after mount — resample with real metrics so the canvas
  // text and the DOM handoff text share identical glyph geometry.
  let fontsSettled = false;
  document.fonts?.ready.then(() => {
    if (fontsSettled) return;
    fontsSettled = true;
    sampleHeadline();
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setDrawRange(0, prefersReducedMotion ? particleCount : 0);

  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    vertexColors: true,
    blending: THREE.NormalBlending,
    uniforms: {
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uSize: { value: isMobile ? 13 : 16 },
      // Scene 05 handoff: 1 = particles visible, 0 = vanished. Alpha, not
      // color — dimming color on a white page makes black dots, not absence.
      uVanish: { value: 1 },
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
      uniform float uVanish;
      void main() {
        vec2 uv = gl_PointCoord - vec2(0.5);
        float dist = length(uv);
        float alpha = smoothstep(0.5, 0.05, dist) * uVanish;
        gl_FragColor = vec4(vColor, alpha);
      }
    `,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  const lineCount = Math.min(600, Math.floor(particleCount / 12));
  const linePositions = new Float32Array(lineCount * 6);
  // Scene 03 "Emergence": connections are NEURONS, not decoration. Each line
  // pairs a particle with its nearest sampled neighbor in NUCLEUS space —
  // the two are destined to sit side by side once the field organizes — and
  // gets its own reveal moment so connections appear one by one, slowly,
  // growing from one particle toward the other until they touch.
  const linePairA = new Int32Array(lineCount);
  const linePairB = new Int32Array(lineCount);
  const lineReveal = new Float32Array(lineCount);
  for (let line = 0; line < lineCount; line++) {
    const a = Math.floor(random() * particleCount);
    const a3 = a * 3;
    let best = (a + 1) % particleCount;
    let bestDistSq = Infinity;
    for (let candidate = 0; candidate < 48; candidate++) {
      const b = Math.floor(random() * particleCount);
      if (b === a) continue;
      const b3 = b * 3;
      const dx = nucleus[a3]! - nucleus[b3]!;
      const dy = nucleus[a3 + 1]! - nucleus[b3 + 1]!;
      const dz = nucleus[a3 + 2]! - nucleus[b3 + 2]!;
      const distSq = dx * dx + dy * dy + dz * dz;
      if (distSq < bestDistSq) {
        bestDistSq = distSq;
        best = b;
      }
    }
    linePairA[line] = a;
    linePairB[line] = best;
    lineReveal[line] = 0.15 + 0.67 * random();
  }
  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x5d8fbe,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(lineSegments);

  // FINAL REVEAL: the gigantic intelligence lattice. Not a backdrop — a
  // jittered 3D GRID of node clusters, each one a small echo of the core
  // the visitor just spent the whole journey inside. The cell at the origin
  // is left empty: that hole is where THEIR node sits. Everything they
  // explored was one node.
  const latticeCount = isMobile ? 900 : 2200;
  const latticeSpacing = 5.2;
  const latticeRange = 3; // grid −3..3 per axis
  const latticeNodeCenters: { x: number; y: number; z: number }[] = [];
  for (let gx = -latticeRange; gx <= latticeRange; gx++) {
    for (let gy = -latticeRange; gy <= latticeRange; gy++) {
      for (let gz = -latticeRange; gz <= latticeRange; gz++) {
        const cx = gx * latticeSpacing + (random() - 0.5) * 1.3;
        const cy = gy * latticeSpacing * 0.72 + (random() - 0.5) * 1.3;
        const cz = gz * latticeSpacing + (random() - 0.5) * 1.3;
        // the hole: our entire experience occupies this cell
        if (Math.sqrt(cx * cx + cy * cy + cz * cz) < 6.5) continue;
        latticeNodeCenters.push({ x: cx, y: cy, z: cz });
      }
    }
  }
  const latticePositions = new Float32Array(latticeCount * 3);
  const perNode = Math.max(1, Math.floor(latticeCount / latticeNodeCenters.length));
  for (let i = 0; i < latticeCount; i++) {
    const i3 = i * 3;
    const node = latticeNodeCenters[Math.floor(i / perNode) % latticeNodeCenters.length]!;
    const ntheta = random() * Math.PI * 2;
    const nphi = Math.acos(2 * random() - 1);
    const nradius = random() * 0.38;
    latticePositions[i3] = node.x + Math.sin(nphi) * Math.cos(ntheta) * nradius;
    latticePositions[i3 + 1] = node.y + Math.cos(nphi) * nradius;
    latticePositions[i3 + 2] = node.z + Math.sin(nphi) * Math.sin(ntheta) * nradius;
  }
  const latticeGeometry = new THREE.BufferGeometry();
  latticeGeometry.setAttribute("position", new THREE.BufferAttribute(latticePositions, 3));
  const latticeMaterial = new THREE.PointsMaterial({
    color: 0x5d8fbe,
    size: isMobile ? 3 : 4,
    sizeAttenuation: false,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  const latticePoints = new THREE.Points(latticeGeometry, latticeMaterial);
  scene.add(latticePoints);

  // Lattice edges: each node connects to its nearest neighbors along the
  // grid axes — regular structure, not random chords. Regularity is what
  // makes it read as INFINITE: the eye extrapolates the pattern past the
  // frame edges.
  const latticeLineLimit = isMobile ? 380 : 950;
  const latticeEdges: number[] = [];
  const neighborMax = latticeSpacing * 1.35;
  for (let a = 0; a < latticeNodeCenters.length && latticeEdges.length / 2 < latticeLineLimit; a++) {
    const na = latticeNodeCenters[a]!;
    for (let b = a + 1; b < latticeNodeCenters.length && latticeEdges.length / 2 < latticeLineLimit; b++) {
      const nb = latticeNodeCenters[b]!;
      const dx = Math.abs(na.x - nb.x);
      const dy = Math.abs(na.y - nb.y);
      const dz = Math.abs(na.z - nb.z);
      // axis-aligned neighbor: close on one axis' spacing, tight on the others
      const axisAligned =
        (dx < neighborMax && dy < 2 && dz < 2 && dx > 2) ||
        (dy < neighborMax * 0.72 && dx < 2 && dz < 2 && dy > 1.4) ||
        (dz < neighborMax && dx < 2 && dy < 2 && dz > 2);
      if (axisAligned) latticeEdges.push(a, b);
    }
  }
  const latticeLineCount = latticeEdges.length / 2;
  const latticeLinePositions = new Float32Array(latticeLineCount * 6);
  for (let line = 0; line < latticeLineCount; line++) {
    const from = latticeNodeCenters[latticeEdges[line * 2]!]!;
    const to = latticeNodeCenters[latticeEdges[line * 2 + 1]!]!;
    const li = line * 6;
    latticeLinePositions[li] = from.x;
    latticeLinePositions[li + 1] = from.y;
    latticeLinePositions[li + 2] = from.z;
    latticeLinePositions[li + 3] = to.x;
    latticeLinePositions[li + 4] = to.y;
    latticeLinePositions[li + 5] = to.z;
  }
  const latticeLineGeometry = new THREE.BufferGeometry();
  latticeLineGeometry.setAttribute("position", new THREE.BufferAttribute(latticeLinePositions, 3));
  const latticeLineMaterial = new THREE.LineBasicMaterial({
    color: 0x5d8fbe,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  const latticeLineSegments = new THREE.LineSegments(latticeLineGeometry, latticeLineMaterial);
  scene.add(latticeLineSegments);

  const clock = new THREE.Clock();
  let qualityDrawScale = 1;
  let qualityHidden = false;
  let awarenessTierOff = false;

  // Scene 02 "Awareness" state. Ripples live in the points' local space.
  const rippleX = new Float32Array(MAX_RIPPLES);
  const rippleY = new Float32Array(MAX_RIPPLES);
  const rippleBorn = new Float32Array(MAX_RIPPLES).fill(-1e3);
  let nextRipple = 0;
  let lastRippleAt = -1e3;
  let travelAccum = 0;
  let lastCursorLocalX = 0;
  let lastCursorLocalY = 0;
  let cursorSampled = false;
  // The field must not react before the visitor has actually moved the mouse
  // — the smoothed cursor defaults to viewport center, which is presence,
  // not movement.
  let pointerSeen = false;
  const markPointerSeen = () => {
    pointerSeen = true;
  };
  window.addEventListener("pointermove", markPointerSeen, { once: true, passive: true });
  const cursorRay = new THREE.Vector3();
  // Live ripples compacted per frame so the particle loop stays lean.
  const frameRippleX = new Float32Array(MAX_RIPPLES);
  const frameRippleY = new Float32Array(MAX_RIPPLES);
  const frameRippleRadius = new Float32Array(MAX_RIPPLES);
  const frameRippleStrength = new Float32Array(MAX_RIPPLES);

  const resize = () => {
    const width = Math.max(1, window.innerWidth);
    const height = Math.max(1, window.innerHeight);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    material.uniforms.uPixelRatio!.value = Math.min(window.devicePixelRatio, 2);
  };

  /** How many particles are visible at a given elapsed wall-clock time. */
  const visibleCountForTime = (elapsed: number) => {
    if (prefersReducedMotion) return particleCount;
    // 0–2s: pure void — nothing. Not a single pixel.
    if (elapsed < VOID_DURATION) return 0;
    // 2–3.8s: one lone particle — the first star being born.
    if (elapsed < REACT_WINDOW_END) return 1;
    // 3.8–4.3s: two particles — the second star shoots in.
    if (elapsed < CASCADE_START) return 2;
    // 4.3–9.5s: cascade from 2 → particleCount.
    if (elapsed < CASCADE_END) {
      const p = smoothstep(CASCADE_START, CASCADE_END, elapsed);
      // Slow trickle for first 15%, then linear acceleration to full
      const eased = p < 0.15
        ? p * 0.3 * (p / 0.15)
        : 0.045 + (p - 0.15) * 1.123;
      return Math.max(2, Math.floor(2 + (particleCount - 2) * Math.min(1, eased)));
    }
    return particleCount;
  };

  const render = () => {
    const elapsed = prefersReducedMotion ? SETTLE_END + 1 : clock.getElapsedTime();
    const visibleCount = visibleCountForTime(elapsed);

    // Channels from the ONE master timeline (SceneDirector).
    const emergence = engine.read("emergence");
    const glyphBlend = engine.read("glyph");
    // Scene 04 "Birth of AI Core": not popping, not scaling — condensing.
    // coreLight contracts the nucleus like gravity; the same compression
    // applies at every later return to the nucleus (reconnect, scale), so
    // once the core is born it STAYS born.
    const coreLight = engine.read("coreLight");
    const coreCompress = 1 - coreLight * 0.45;
    // Scene 05 handoff: 0 = the headline is particles, 1 = the particles
    // have disappeared and only the real DOM typography remains.
    const typoSolid = engine.read("typoSolid");
    if (Math.abs(typographySolid.value - typoSolid) > 0.005 || (typoSolid === 0 && typographySolid.value !== 0)) {
      typographySolid.value = typoSolid;
    }
    // Scene 08 "SVARA": the wake begins with a pulse — one spherical
    // wavefront expanding from the core origin. Active only while the
    // front is traveling; it displaces particles outward as it passes and
    // lights them, fading as it expands.
    const pulse = engine.read("pulse");
    const pulseActive = pulse > 0.001 && pulse < 0.999;
    const pulseRadius = pulse * 9;
    const pulseFade = 1 - pulse;

    // Scene 06: mirror the flight for the DOM headline's fall into depth.
    const enterFlight = engine.read("enter");
    if (Math.abs(cameraEnter.value - enterFlight) > 0.005 || (enterFlight === 0 && cameraEnter.value !== 0)) {
      cameraEnter.value = enterFlight;
    }
    const streamProgress = engine.read("stream");
    const disconnectStep = engine.read("disconnect") >= 0.5 ? 1 : 0;
    const svara = engine.read("reconnect");
    const productsLayout = engine.read("productsLayout");
    const productsSweep = engine.read("productsSweep");
    const industriesLayout = engine.read("industriesLayout");
    const industriesSweep = engine.read("industriesSweep");
    const scaleProgress = engine.read("scale");
    const endingProgress = engine.read("ending");
    const scrollEnergy = engine.read("scrollEnergy");

    const activeFloat = productsSweep * PRODUCT_NAMES.length;
    const activeProductIndex = Math.min(PRODUCT_NAMES.length - 1, Math.floor(activeFloat));
    if (productsLayout > 0 && activeProduct.value !== PRODUCT_NAMES[activeProductIndex]) {
      activeProduct.value = PRODUCT_NAMES[activeProductIndex]!;
    } else if (productsLayout <= 0 && activeProduct.value !== null) {
      activeProduct.value = null;
    }
    const activeIndustryFloat = industriesSweep * INDUSTRY_NAMES.length;
    const activeIndustryIndex = Math.min(INDUSTRY_NAMES.length - 1, Math.floor(activeIndustryFloat));
    if (industriesLayout > 0 && activeIndustry.value !== INDUSTRY_NAMES[activeIndustryIndex]) {
      activeIndustry.value = INDUSTRY_NAMES[activeIndustryIndex]!;
    } else if (industriesLayout <= 0 && activeIndustry.value !== null) {
      activeIndustry.value = null;
    }

    const calm = 1 - endingProgress * 0.85;
    const reactWindow =
      smoothstep(FIRST_PARTICLE_AT, FIRST_PARTICLE_AT + 0.4, elapsed) *
      (1 - smoothstep(CASCADE_START - 0.3, CASCADE_START, elapsed));

    if (qualityHidden) return;

    const mouse = director.cursor.smoothed;
    const positionAttribute = geometry.getAttribute("position") as THREE.BufferAttribute;
    const colorAttribute = geometry.getAttribute("color") as THREE.BufferAttribute;

    // Drone AI (product 1): survey flight over the terrain — a lissajous
    // pass, computed once per frame; the drone-body particles ride it and
    // the lidar rings expand beneath its ground track.
    const droneX = Math.sin(elapsed * 0.55) * 0.62;
    const droneZ = Math.sin(elapsed * 1.1) * 0.5;
    const droneY = 0.34 + Math.sin(elapsed * 0.9) * 0.08;

    // --- Scene 02 "Awareness" ------------------------------------------
    // rotY is needed twice: to place the cursor in the points' local space
    // here, and to rotate the points themselves at the end of the frame.
    const rotY = (elapsed * 0.04 + emergence * 0.3) * (1 - glyphBlend) * (1 - productsLayout) * calm;
    // Awareness wakes with the cascade — intelligence waking up — and damps
    // whenever the field is holding a structured formation, so ripples never
    // fight the choreography.
    const fieldAwake = smoothstep(CASCADE_START, CASCADE_END, elapsed);
    const awareness =
      prefersReducedMotion || awarenessTierOff || !pointerSeen
        ? 0
        : fieldAwake *
          calm *
          // Awareness stays ALIVE while the field organizes (Scene 03's
          // "wait... is this reacting to me?" beat) — only lightly damped so
          // ripples read against the condensing nucleus without breaking it.
          (1 - emergence * 0.25) *
          (1 - glyphBlend) *
          (1 - streamProgress) *
          (1 - disconnectStep * (1 - svara)) *
          (1 - productsLayout) *
          (1 - industriesLayout) *
          (1 - scaleProgress * 0.7);
    const awarenessOn = awareness > 0.02;

    let cursorLocalX = lastCursorLocalX;
    let cursorLocalY = lastCursorLocalY;
    if (awarenessOn) {
      camera.updateMatrixWorld();
      cursorRay.set(mouse.x, mouse.y, 0.5).unproject(camera).sub(camera.position).normalize();
      const rayT = Math.abs(cursorRay.z) > 1e-4 ? -camera.position.z / cursorRay.z : -1;
      if (rayT > 0 && rayT < 60) {
        const worldX = camera.position.x + cursorRay.x * rayT;
        const worldY = camera.position.y + cursorRay.y * rayT;
        cursorLocalX = worldX * Math.cos(rotY);
        cursorLocalY = worldY;
        if (cursorSampled) {
          travelAccum += Math.hypot(cursorLocalX - lastCursorLocalX, cursorLocalY - lastCursorLocalY);
        }
        cursorSampled = true;
        lastCursorLocalX = cursorLocalX;
        lastCursorLocalY = cursorLocalY;
        // Movement, not presence, makes ripples — one per ~0.45 units of
        // cursor travel, throttled so a fast sweep leaves a trail of rings
        // rather than a smear.
        if (travelAccum > 0.45 && elapsed - lastRippleAt > 0.16) {
          rippleX[nextRipple] = cursorLocalX;
          rippleY[nextRipple] = cursorLocalY;
          rippleBorn[nextRipple] = elapsed;
          nextRipple = (nextRipple + 1) % MAX_RIPPLES;
          travelAccum = 0;
          lastRippleAt = elapsed;
        }
      }
    }

    let liveRipples = 0;
    if (awarenessOn) {
      for (let r = 0; r < MAX_RIPPLES; r++) {
        const age = elapsed - rippleBorn[r]!;
        if (age < 0 || age > RIPPLE_LIFE) continue;
        const fade = 1 - age / RIPPLE_LIFE;
        frameRippleX[liveRipples] = rippleX[r]!;
        frameRippleY[liveRipples] = rippleY[r]!;
        frameRippleRadius[liveRipples] = 0.15 + age * RIPPLE_SPEED;
        frameRippleStrength[liveRipples] = fade * fade * awareness;
        liveRipples++;
      }
    }
    if (debugAwareness) {
      debugAwareness.awareness = awareness;
      debugAwareness.liveRipples = liveRipples;
      debugAwareness.pointerSeen = pointerSeen;
      debugAwareness.frames++;
    }

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const phase = phases[i]!;
      const amp = amplitudes[i]!;
      const wanderDamp = (1 - glyphBlend) * calm * (1 + scrollEnergy * 1.5);
      const wander = Math.sin(elapsed * 0.7 + phase) * amp * wanderDamp;

      // --- Birth: particle arrival ---
      const preBirthRest = spawn[i3]!;
      const arrival = smoothstep(0, 280, visibleCount - i);
      let bx = preBirthRest + (birth[i3]! - preBirthRest) * arrival;
      let by = spawn[i3 + 1]! + (birth[i3 + 1]! - spawn[i3 + 1]!) * arrival;
      const bz = spawn[i3 + 2]! + (birth[i3 + 2]! - spawn[i3 + 2]!) * arrival + wander;

      if (i === 0) {
        bx += mouse.x * 0.35 * reactWindow;
        by += mouse.y * 0.25 * reactWindow;
      }

      const nx = bx + (nucleus[i3]! * coreCompress - bx) * emergence;
      const ny = by + (nucleus[i3 + 1]! * coreCompress - by) * emergence;
      const nz = bz + (nucleus[i3 + 2]! * coreCompress - bz) * emergence;

      // Scene 05 "Typography is Created": no fade, no slide — each letter
      // assembles in its own window of the glyph channel. Particles leave
      // the core, arc upward (the sin bump), and settle into their letter.
      const assemblyOrder = glyphOrder[i]!;
      const ap =
        glyphBlend <= 0
          ? 0
          : glyphBlend >= 1
            ? 1
            : smoothstep(assemblyOrder * 0.72, assemblyOrder * 0.72 + 0.28, glyphBlend);
      const gx = nx + (glyph[i3]! - nx) * ap;
      const gy = ny + (glyph[i3 + 1]! - ny) * ap + Math.sin(ap * Math.PI) * 0.45;
      const gz = nz + (glyph[i3 + 2]! - nz) * ap;

      const streamX = ((elapsed * flowSpeeds[i]! + phase * 3) % 20) - 10;
      const sx = gx + (streamX - gx) * streamProgress;
      const sy = gy + (stream[i3 + 1]! - gy) * streamProgress;
      const sz = gz + (stream[i3 + 2]! - gz) * streamProgress;

      const dx = sx + (disconnected[i3]! - sx) * disconnectStep;
      const dy = sy + (disconnected[i3 + 1]! - sy) * disconnectStep;
      const dz = sz + (disconnected[i3 + 2]! - sz) * disconnectStep;

      // Scene 05: reconnect onto nucleus (the born, compressed core)
      const rx = dx + (nucleus[i3]! * coreCompress - dx) * svara;
      const ry = dy + (nucleus[i3 + 1]! * coreCompress - dy) * svara;
      const rz = dz + (nucleus[i3 + 2]! * coreCompress - dz) * svara;

      // Scene 06: product focus / behaviors
      const productIdx = productIndexArr[i]!;
      const focus = productsLayout > 0 ? clamp01(1 - Math.abs(activeFloat - (productIdx + 0.5))) : 0;

      let px = productBase[i3]!;
      let py = productBase[i3 + 1]!;
      let pz = productBase[i3 + 2]!;
      let lidar = 0;
      let agentPulse = 0;
      let twinHolo = 0;
      let cloudFlow = 0;

      switch (productIdx) {
        case 1: { // Drone AI — drone flies the survey; terrain gets scanned
          const center = productCenters[1]!;
          if (subSwarmIndex[i] === 1) {
            // drone body: ride the flight path, keeping the tight offsets
            px += droneX;
            py += droneY;
            pz += droneZ;
          } else {
            // terrain: lidar rings expand under the drone's ground track —
            // the map lights up where it is being scanned
            const scanDx = px - (center.x + droneX);
            const scanDz = pz - (center.z + droneZ);
            const scanDist = Math.sqrt(scanDx * scanDx + scanDz * scanDz);
            if (scanDist < 0.9) {
              const ring = 0.5 + 0.5 * Math.sin(scanDist * 14 - elapsed * 6);
              lidar = (1 - scanDist / 0.9) * ring * 0.9;
            }
          }
          break;
        }
        case 2: { // Digital Twin — factory hologram on a turntable
          const center = productCenters[2]!;
          // Rotate: the twin turns so every side of the factory is seen —
          // and it follows the CURSOR's lead (the trace of "the twin
          // copies you"): your hand nudges the turntable, never drags it.
          const turn = elapsed * 0.3 + mouse.x * 0.35 * focus;
          const cosTurn = Math.cos(turn);
          const sinTurn = Math.sin(turn);
          const twinX = px - center.x;
          const twinZ = pz - center.z;
          px = center.x + twinX * cosTurn - twinZ * sinTurn;
          pz = center.z + twinX * sinTurn + twinZ * cosTurn;
          // ...and leans a few degrees with your vertical movement.
          py += (px - center.x) * mouse.y * 0.07 * focus;
          // Live telemetry: a rising scan plane sweeps the hologram, the
          // shell shimmers faintly, and sensor LEDs blink at machines.
          const scanY = ((elapsed * 0.3) % 1) * 0.95 - 0.45;
          const scanBand = 1 - Math.abs(py - center.y - scanY) / 0.06;
          twinHolo = (scanBand > 0 ? scanBand * 0.8 : 0) + 0.06 * Math.sin(elapsed * 16 + phase * 9);
          if (i % 31 === 0 && Math.sin(elapsed * 2.6 + phase * 11) > 0.55) twinHolo += 0.9;
          break;
        }
        case 3: { // AI Agents — conversation over the workflow graph
          const center = productCenters[3]!;
          if (subSwarmIndex[i] === -1) {
            // messenger: perpetually cycling its edge — automation needs
            // no trigger. The sine lift arcs it off the straight line.
            const edge = AGENT_EDGES[(i * 7 + 3) % AGENT_EDGES.length]!;
            const from = AGENT_NODES[edge[0]]!;
            const to = AGENT_NODES[edge[1]]!;
            const travel = (elapsed * (0.3 + (i % 5) * 0.06) + phase) % 1;
            px = center.x + from.x + (to.x - from.x) * travel;
            py = center.y + from.y + (to.y - from.y) * travel + Math.sin(travel * Math.PI) * 0.06;
            pz = center.z + from.z + (to.z - from.z) * travel;
            agentPulse = 0.85;
          } else {
            // node: breathes as work arrives, each on its own beat
            agentPulse = 0.22 + 0.22 * Math.sin(elapsed * 1.4 + subSwarmIndex[i]! * 1.9);
            px += Math.sin(elapsed * 0.6 + phase) * 0.014;
            py += Math.cos(elapsed * 0.5 + phase) * 0.012;
          }
          break;
        }
        case 4: { // Edge AI — split pair, cloud half delayed
          const isCloud = i % 2 === 1;
          const localElapsed = elapsed - (isCloud ? 0.6 : 0);
          px += Math.sin(localElapsed * 0.8 + phase) * 0.05;
          py += Math.cos(localElapsed * 0.7 + phase) * 0.05;
          break;
        }
        case 5: { // Generative AI — glyph morphing
          const morph = (Math.sin(elapsed * 0.6) + 1) / 2;
          px = px + (genGlyph[i3]! - px) * morph;
          py = py + (genGlyph[i3 + 1]! - py) * morph;
          pz = pz + (genGlyph[i3 + 2]! - pz) * morph;
          break;
        }
        case 6: { // Business Cloud — ERP, CRM, HR: everything connects
          const center = productCenters[6]!;
          const role = subSwarmIndex[i]!;
          if (role === 3) {
            // hub: slow planet spin, gentle breathing
            const spin = elapsed * 0.15;
            const cosSpin = Math.cos(spin);
            const sinSpin = Math.sin(spin);
            const hubX = px - center.x;
            const hubZ = pz - center.z;
            px = center.x + hubX * cosSpin - hubZ * sinSpin;
            pz = center.z + hubX * sinSpin + hubZ * cosSpin;
            cloudFlow = 0.12 + 0.12 * Math.sin(elapsed * 0.9 + phase);
          } else {
            // moon k's live orbital position (connectors route by i % 3)
            const k = role === -1 ? i % 3 : role;
            const moonAngle = k * 2.0944 + elapsed * 0.25;
            const moonX = Math.cos(moonAngle) * 0.72;
            const moonZ = Math.sin(moonAngle) * 0.72;
            const moonY = Math.sin(elapsed * 0.2 + k * 2.1) * 0.12;
            if (role === -1) {
              // connector: streams flow hub↔moon in both directions
              let travel = (elapsed * (0.4 + (i % 7) * 0.04) + phase) % 1;
              if (i % 2 === 0) travel = 1 - travel;
              px = center.x + moonX * travel;
              py = center.y + moonY * travel;
              pz = center.z + moonZ * travel;
              cloudFlow = 0.75;
            } else {
              px += moonX;
              py += moonY;
              pz += moonZ;
              cloudFlow = 0.2 + 0.2 * Math.sin(elapsed * 1.1 + k * 2.2);
            }
          }
          break;
        }
        default:
          break;
      }

      const qx = rx + (px - rx) * productsLayout;
      const qy = ry + (py - ry) * productsLayout;
      const qz = rz + (pz - rz) * productsLayout;

      // Scene 07: industry transforms
      const industryIdx = industryIndexArr[i]!;
      const industryFocus =
        industriesLayout > 0 ? clamp01(1 - Math.abs(activeIndustryFloat - (industryIdx + 0.5))) : 0;

      let ix = industryBase[i3]!;
      let iy = industryBase[i3 + 1]!;
      let iz = industryBase[i3 + 2]!;
      let industryLife = 0;

      if (i % 43 === 0) {
        // Blue streams connect all of them — one intelligence flowing
        // through many realities: braided threads riding above the worlds,
        // end to end along the whole line.
        const streamSpan = (INDUSTRY_NAMES.length - 1) * INDUSTRY_SPACING;
        const flowT = (elapsed * (0.05 + (i % 4) * 0.015) + (i % 11) / 11) % 1;
        ix = -streamSpan / 2 + flowT * streamSpan;
        iy = 0.42 + Math.sin(flowT * Math.PI * 5 + (i % 7)) * 0.18;
        iz = -1.5 + Math.sin(flowT * Math.PI * 3 + (i % 5)) * 0.3;
        industryLife = 0.75;
      } else {
        // Each world LIVES on its own rhythm.
        switch (industryIdx) {
          case 0: // factory hum
            industryLife = 0.1 + 0.1 * Math.sin(elapsed * 2.1 + phase * 4);
            break;
          case 1: // city windows blinking, sparse and random
            industryLife = Math.sin(elapsed * 2.8 + phase * 21) > 0.93 ? 0.5 : 0;
            break;
          case 2: // farm: wind wave rolling across the rows
            industryLife = 0.16 * (0.5 + 0.5 * Math.sin(industryBase[i3]! * 1.6 - elapsed * 1.1));
            break;
          case 3: {
            // hospital heartbeat — one sharp systole, then rest
            const beat = (elapsed * 1.15) % 1;
            industryLife = beat < 0.14 ? 0.5 * (1 - beat / 0.14) : 0;
            break;
          }
          case 4: // retail: only the shoppers drift, the building holds
            if (i % 5 < 2) {
              ix += Math.sin(elapsed * 0.35 + phase) * 0.32;
              industryLife = 0.3;
            }
            break;
          case 5: // logistics: transports run the runway
            if (i % 3 === 0) {
              const industryCenter = industryCenters[5]!;
              const travel = ((elapsed * 0.4 + phase) % 1) - 0.5;
              ix = industryCenter.x + travel * 1.3;
              industryLife = 0.35;
            }
            break;
          default:
            break;
        }
      }

      const ux = qx + (ix - qx) * industriesLayout;
      const uy = qy + (iy - qy) * industriesLayout;
      const uz = qz + (iz - qz) * industriesLayout;

      // Scene 08: converge back onto nucleus (the born, compressed core)
      let fx = ux + (nucleus[i3]! * coreCompress - ux) * scaleProgress;
      let fy = uy + (nucleus[i3 + 1]! * coreCompress - uy) * scaleProgress;
      const fz = uz + (nucleus[i3 + 2]! * coreCompress - uz) * scaleProgress;

      // Scene 02 "Awareness": nearby particles lean toward the cursor —
      // capped tiny and recomputed from base each frame, so they notice
      // without ever following — and each ripple ring nudges particles
      // outward as its front passes, with a brief glow.
      let awareGlow = 0;
      // Scene 08 pulse: the wavefront shoves particles outward as it
      // crosses them and lights them up — glow rides the same variable the
      // awareness system feeds into the color pass.
      if (pulseActive) {
        const pulseDist = Math.sqrt(fx * fx + fy * fy + fz * fz);
        const pulseBand = 1 - Math.abs(pulseDist - pulseRadius) / 0.9;
        if (pulseBand > 0) {
          const pulseStrength = pulseBand * pulseBand * pulseFade;
          if (pulseDist > 0.001) {
            fx += (fx / pulseDist) * pulseStrength * 0.14;
            fy += (fy / pulseDist) * pulseStrength * 0.14;
          }
          awareGlow += pulseStrength * 1.1;
        }
      }
      if (awarenessOn) {
        const noticeDx = cursorLocalX - fx;
        const noticeDy = cursorLocalY - fy;
        const noticeDist = Math.sqrt(noticeDx * noticeDx + noticeDy * noticeDy);
        if (noticeDist < NOTICE_RADIUS && noticeDist > 0.001) {
          const notice = (1 - noticeDist / NOTICE_RADIUS) ** 2;
          const lean = notice * awareness * NOTICE_AMP;
          fx += (noticeDx / noticeDist) * lean;
          fy += (noticeDy / noticeDist) * lean;
          awareGlow += notice * awareness * 0.3;
        }
        for (let r = 0; r < liveRipples; r++) {
          const rippleDx = fx - frameRippleX[r]!;
          const rippleDy = fy - frameRippleY[r]!;
          const rippleDist = Math.max(0.001, Math.sqrt(rippleDx * rippleDx + rippleDy * rippleDy));
          const band = 1 - Math.abs(rippleDist - frameRippleRadius[r]!) / RIPPLE_WIDTH;
          if (band <= 0) continue;
          const push = band * band * frameRippleStrength[r]! * RIPPLE_AMP;
          fx += (rippleDx / rippleDist) * push;
          fy += (rippleDy / rippleDist) * push;
          awareGlow += band * band * frameRippleStrength[r]! * 0.35;
        }
      }

      positionAttribute.array[i3] = fx;
      positionAttribute.array[i3 + 1] = fy;
      positionAttribute.array[i3 + 2] = fz;

      // Color dims during fragment/disconnect, brightens on activation
      const fragmentDim = disconnectStep * (1 - svara) * 0.5;
      const glow =
        (i === 0 ? 0.55 + reactWindow * 0.4 : 0.4 + Math.sin(elapsed * 1.1 + phase) * 0.08) +
        emergence * 0.2 +
        // Scene 04: everything becomes brighter as the core is born. Gated
        // off by the data stream so the birth glow never leaks downstream.
        coreLight * 0.5 * (1 - streamProgress) +
        // Scene 07: the torrent is BEAUTIFUL — blue everywhere — right up
        // until the cut. The loss lands harder because of what it takes.
        streamProgress * 0.3 * (1 - disconnectStep) +
        ap * 0.55 -
        fragmentDim +
        svara * 0.65 +
        focus * 0.5 +
        lidar * focus +
        agentPulse * focus +
        twinHolo * focus +
        cloudFlow * focus +
        industryFocus * 0.5 +
        industryLife * industriesLayout +
        scaleProgress * 0.3 +
        awareGlow;
      colors[i3] = 0.13 * glow;
      colors[i3 + 1] = 0.42 * glow;
      colors[i3 + 2] = 0.8 * glow;
    }

    positionAttribute.needsUpdate = true;
    colorAttribute.needsUpdate = true;
    // Scene 05 handoff: particles vanish (alpha) as the DOM headline takes
    // over the exact same rect.
    material.uniforms.uVanish!.value = 1 - typoSolid;
    // Scene 08: particles RETURN — the 80% lost in the collapse come back
    // as SVARA reconnects, so the awakened core is whole, not a remnant.
    const dataVisibleFraction = disconnectStep ? 0.2 + 0.8 * svara : 1;
    const finalVisibleCount = Math.floor(visibleCount * dataVisibleFraction * qualityDrawScale);
    geometry.setDrawRange(0, finalVisibleCount);

    // Connection lines — neurons finding each other. Each line waits for its
    // own reveal moment, then grows from particle A toward its destined
    // neighbor B until it touches. Before its moment (or if an endpoint is
    // culled by the quality ladder) it collapses to a degenerate point.
    for (let line = 0; line < lineCount; line++) {
      const lineIndex = line * 6;
      const a = linePairA[line]!;
      const b = linePairB[line]!;
      const reveal = lineReveal[line]!;
      const grow = smoothstep(reveal, reveal + 0.14, emergence);
      const aIndex = a * 3;
      const ax = positions[aIndex]!;
      const ay = positions[aIndex + 1]!;
      const az = positions[aIndex + 2]!;
      linePositions[lineIndex] = ax;
      linePositions[lineIndex + 1] = ay;
      linePositions[lineIndex + 2] = az;
      if (grow <= 0 || a >= finalVisibleCount || b >= finalVisibleCount) {
        linePositions[lineIndex + 3] = ax;
        linePositions[lineIndex + 4] = ay;
        linePositions[lineIndex + 5] = az;
        continue;
      }
      const bIndex = b * 3;
      linePositions[lineIndex + 3] = ax + (positions[bIndex]! - ax) * grow;
      linePositions[lineIndex + 4] = ay + (positions[bIndex + 1]! - ay) * grow;
      linePositions[lineIndex + 5] = az + (positions[bIndex + 2]! - az) * grow;
    }
    (lineGeometry.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
    // (1 - streamProgress): the torrent is raw, unconnected data — the
    // neuron web belongs to the organized states on either side of it.
    const lineVisibility =
      clamp01(emergence * (1 - glyphBlend) * (1 - streamProgress) * (1 - disconnectStep) + svara) *
        (1 - productsLayout) +
      endingProgress * 0.12;
    // Connections tighten AND brighten as the core condenses (Scene 04).
    lineMaterial.opacity =
      lineVisibility * (0.18 + coreLight * 0.14 * (1 - streamProgress)) * Math.min(1, finalVisibleCount / 900);

    points.rotation.y = rotY;
    lineSegments.rotation.copy(points.rotation);

    // FINAL REVEAL: the lattice arrives SUDDENLY — the dolly-out runs
    // quiet and empty until 60%, then the infinite structure resolves in
    // the last stretch. The realization, not a crossfade.
    const latticeVisibility = smoothstep(0.6, 0.88, scaleProgress) * (1 - endingProgress * 0.5);
    latticeMaterial.opacity = latticeVisibility * 0.55;
    latticeLineMaterial.opacity = latticeVisibility * 0.16;
    latticePoints.rotation.y = elapsed * 0.015;
    latticeLineSegments.rotation.copy(latticePoints.rotation);

    renderer.render(scene, camera);
  };

  // Stage geometry → director marks, then script builds into ONE master
  // timeline and the scroll scrubber starts.
  director.sceneDirector.setMarks({
    core: { x: 0, y: 0, z: 0 },
    products: productCenters,
    industries: industryCenters,
  });
  const scrollableSvh = ((document.documentElement.scrollHeight - window.innerHeight) / window.innerHeight) * 100;
  director.sceneDirector.buildScript(Math.max(0, scrollableSvh - SCRIPT_SVH));
  director.start();
  const unsubscribeProgress = director.scroll.onProgress((progress) => {
    globalProgress.value = progress;
  });

  // Quality ladder
  director.performance.onTier = (tier) => {
    // Degradation ladder (Performance Rules): shed pixel ratio and draw
    // counts BEFORE meaning. Lines survive to tier 2 (they ARE Scene 03),
    // and cursor awareness — interaction — is never sacrificed until the
    // canvas itself goes (tier 3): "Never sacrifice interaction."
    const showLines = tier < 2;
    lineSegments.visible = showLines;
    latticeLineSegments.visible = showLines;
    qualityDrawScale = tier >= 2 ? 0.6 : 1;
    awarenessTierOff = tier >= 3;
    renderer.setPixelRatio(tier >= 1 ? 1 : Math.min(window.devicePixelRatio, 2));
    qualityHidden = tier >= 3;
    if (fieldRef.value) fieldRef.value.style.visibility = qualityHidden ? "hidden" : "visible";
  };

  resize();
  window.addEventListener("resize", resize);
  gsap.ticker.add(render);
  worldReady.value = true;

  onUnmounted(() => {
    gsap.ticker.remove(render);
    window.removeEventListener("resize", resize);
    window.removeEventListener("pointermove", markPointerSeen);
    unsubscribeProgress();
    disposeMotionDirector();
    geometry.dispose();
    material.dispose();
    lineGeometry.dispose();
    lineMaterial.dispose();
    latticeGeometry.dispose();
    latticeMaterial.dispose();
    latticeLineGeometry.dispose();
    latticeLineMaterial.dispose();
    renderer.dispose();
  });
});
</script>

<template>
  <div ref="fieldRef" class="intelligence-world">
    <canvas ref="canvasRef" class="intelligence-world__canvas" aria-hidden="true" />
  </div>
</template>

<style scoped>
.intelligence-world {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.intelligence-world__canvas {
  display: block;
  height: 100%;
  width: 100%;
}
</style>
