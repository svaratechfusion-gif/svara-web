<script setup lang="ts">
// HELIOS Background Intelligence System (BIS) v3 — Motion Rules.
//
// Nothing floats randomly. Everything has intent.
// Module lifecycle: assemble → connect → branch → merge → dissolve → rebuild.
// Speed: very slow, like breathing.
//
// Layers:
//   01 Blueprint Grid        (almost invisible)
//   02 Structural Hex Frameworks
//   03 Micro Modules          (thousands of tiny hexagonal engineering units)
//   04 Data Streams          (very thin animated pathways)
//   05 Connection Pulses     (occasional pulse travels)
//   06 Depth Fog             (almost invisible atmospheric haze)
//   07 Interactive Cursor    (nearby structures react, very subtly)

import { useLenis } from "lenis/vue";

interface Props {
  density?: "low" | "medium" | "high";
  parallax?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  density: "medium",
  parallax: true,
});

const { $gsap } = useNuxtApp();

const canvasRef = ref<HTMLCanvasElement | null>(null);
const glowRef = ref<HTMLDivElement | null>(null);

const reducedMotion = import.meta.client
  ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
  : false;

let ctx: CanvasRenderingContext2D | null = null;
let dpr = 1;
let width = 0;
let height = 0;
let renderId: number | null = null;

let scrollY = 0;
let scrollVelocity = 0;
let evolution = 0; // accumulated background evolution; never resets, only evolves
let mouseX = -300;
let mouseY = -300;
let targetMouseX = -300;
let targetMouseY = -300;
let time = 0;
let streamRebuildTimer = 0;

// Only subscribe to Lenis on client — SSR has no scroll context.
// useLenis is used here only to read scroll position and velocity.
// Lenis stays out of animation logic; it provides raw momentum state for
// the background's deterministic motion system.
if (import.meta.client) {
  useLenis(onScroll);
}

// Cached colors.
const C = {
  bg: "#f8fbff",
  grid: "rgba(215, 233, 255, 0.25)",
  structure: "rgba(215, 233, 255, 0.35)",
  medium: "rgba(118, 168, 214, 0.45)",
  brand: "rgba(93, 143, 190, 0.55)",
  deep: "rgba(29, 46, 109, 0.04)",
};

// Module lifecycle phases.
type Phase = "assemble" | "connect" | "branch" | "merge" | "dissolve" | "rebuild";

interface MicroModule {
  // Target lattice position.
  tx: number;
  ty: number;
  index: number;
  // Current position.
  x: number;
  y: number;
  size: number;
  phase: Phase;
  phaseTime: number;
  phaseDuration: number;
  opacity: number;
  connections: MicroModule[];
  branchOffset: number;
  phaseOffsetX: number;
  phaseOffsetY: number;
  // Scroll-driven dynamic target offsets.
  _dx: number;
  _dy: number;
}

interface DataStream {
  a: MicroModule;
  b: MicroModule;
  seed: number;
  dashOffset: number;
  opacity: number;
  pulse: number | null; // 0–1 progress of a traveling pulse, null when idle
  pulseSpeed: number;
  pulseCooldown: number;
}

interface HexFramework {
  cx: number;
  cy: number;
  r: number;
  phase: number;
  speed: number;
}

const frameworks: HexFramework[] = [];
const modules: MicroModule[] = [];
const streams: DataStream[] = [];

const DENSITY = {
  low: { modules: 220, frameworks: 5, streamsPerModule: 1 },
  medium: { modules: 420, frameworks: 8, streamsPerModule: 2 },
  high: { modules: 720, frameworks: 12, streamsPerModule: 2 },
};

function counts() {
  return DENSITY[props.density];
}

function stableOffset(index: number, scale: number, phase = 0) {
  return Math.sin(index * 0.97 + phase) * scale;
}

function buildFrameworks() {
  frameworks.length = 0;
  const c = counts();
  const cols = Math.ceil(Math.sqrt(c.frameworks * (width / height)));
  const rows = Math.ceil(c.frameworks / cols);
  const cellW = width / cols;
  const cellH = height / rows;

  for (let i = 0; i < c.frameworks; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const baseX = col * cellW + cellW * 0.5;
    const baseY = row * cellH + cellH * 0.5;
    const angle = (i / c.frameworks) * Math.PI * 2;

    frameworks.push({
      cx: baseX + stableOffset(i, cellW * 0.15, 1.2),
      cy: baseY + stableOffset(i, cellH * 0.15, 2.3),
      r: (80 + (i % 4) * 14) * dpr,
      phase: angle,
      speed: 0.00035 + ((i % 4) * 0.00008),
    });
  }
}

function buildModules() {
  modules.length = 0;
  const c = counts();
  const cols = Math.ceil(Math.sqrt(c.modules * (width / height)));
  const rows = Math.ceil(c.modules / cols);
  const cellW = width / cols;
  const cellH = height / rows;
  const clusterRadius = Math.min(cellW, cellH) * 0.18;

  for (let i = 0; i < c.modules; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const baseX = col * cellW + cellW * 0.5;
    const baseY = row * cellH + cellH * 0.5;
    const clusterAngle = ((i % 6) / 6) * Math.PI * 2;

    const tx = baseX + Math.cos(clusterAngle) * clusterRadius;
    const ty = baseY + Math.sin(clusterAngle) * clusterRadius;

    modules.push({
      tx,
      ty,
      index: i,
      x: tx + stableOffset(i, 40 * dpr, 0.5),
      y: ty + stableOffset(i, 36 * dpr, 1.7),
      size: (2.5 + ((i % 3) * 0.7)) * dpr,
      phase: "assemble",
      phaseTime: 0,
      phaseDuration: 240 + ((i % 4) * 60),
      opacity: 0,
      connections: [],
      branchOffset: (i % 6) * (Math.PI / 3),
      phaseOffsetX: 0,
      phaseOffsetY: 0,
      _dx: 0,
      _dy: 0,
    });
  }
}

function buildStreams() {
  streams.length = 0;
  const c = counts();
  const cols = Math.ceil(Math.sqrt(c.modules * (width / height)));

  // Clear old connection references.
  for (const m of modules) m.connections = [];

  for (const a of modules) {
    const row = Math.floor(a.index / cols);
    const right = modules[a.index + 1];
    const down = modules[a.index + cols];
    const downRight = modules[a.index + cols + 1];
    const neighbors: MicroModule[] = [];

    if (right && Math.floor(right.index / cols) === row) neighbors.push(right);
    if (down) neighbors.push(down);
    if (downRight && Math.floor(downRight.index / cols) === row + 1) neighbors.push(downRight);

    for (let i = 0; i < Math.min(neighbors.length, c.streamsPerModule); i++) {
      const b = neighbors[i];
      if (streams.some((s) => (s.a === a && s.b === b) || (s.a === b && s.b === a))) continue;
      streams.push({
        a,
        b,
        seed: a.index * 1000 + b.index,
        dashOffset: 0,
        opacity: 0,
        pulse: null,
        pulseSpeed: 0.003 + ((a.index % 4) * 0.0012),
        pulseCooldown: 120 + ((a.index % 5) * 80),
      });
      a.connections.push(b);
      b.connections.push(a);
    }
  }
}

function reorganizeTargets() {
  // Continuous evolution: the lattice itself warps as the user moves through
  // the page. Evolution accumulates — it never resets, only moves forward.
  // Modules shift into new topologies so the background feels like one
  // continuous, living intelligence.
  const cycle = (evolution % 4000) / 4000; // one full topology cycle every ~4000 units
  const wave = cycle * Math.PI * 2;
  const spread = Math.min(width, height) * 0.08;

  for (let i = 0; i < modules.length; i++) {
    const m = modules[i];
    const n = i / modules.length;

    // Primary evolution wave: modules shift laterally and vertically.
    const dx = Math.sin(wave + n * Math.PI * 4 + m.branchOffset) * spread;
    const dy = Math.cos(wave * 1.3 + n * Math.PI * 3 + m.branchOffset) * spread * 0.7;

    // Secondary wave for clustering/dispersal.
    const cluster = Math.sin(cycle * Math.PI * 3 + m.branchOffset * 2) * spread * 0.4;

    // Store dynamic targets as runtime offsets on the module for smooth follow.
    m._dx = dx + cluster;
    m._dy = dy + cluster * 0.6;
  }
}

function buildElements() {
  buildFrameworks();
  buildModules();
  buildStreams();
}

function resize() {
  const canvas = canvasRef.value;
  if (!canvas || !ctx) return;

  const rect = canvas.getBoundingClientRect();
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = rect.width * dpr;
  height = rect.height * dpr;
  canvas.width = width;
  canvas.height = height;
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  buildElements();
}

function hexPath(cx: number, cy: number, r: number, rotation = 0) {
  if (!ctx) return;
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i + rotation;
    ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
  }
  ctx.closePath();
}

function drawBlueprintGrid(parallaxX: number, parallaxY: number) {
  if (!ctx) return;
  const major = 160 * dpr;
  const minor = major / 4;
  const offsetX = (parallaxX * 0.01) % major;
  const offsetY = (parallaxY * 0.015) % major;

  ctx.strokeStyle = C.grid;
  ctx.lineWidth = 0.5 * dpr;

  for (let x = -offsetX; x < width; x += minor) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = -offsetY; y < height; y += minor) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Sparse coordinate readouts.
  ctx.fillStyle = "rgba(118, 168, 214, 0.15)";
  ctx.font = `${400 * dpr}px JetBrains Mono`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  for (let x = -offsetX; x < width; x += major) {
    for (let y = -offsetY; y < height; y += major) {
      if ((x + y) % (major * 2) < major) continue;
      ctx.fillText(`${Math.round((x + parallaxX) / 10)}:${Math.round((y + parallaxY) / 10)}`, x + 6 * dpr, y + 4 * dpr);
    }
  }
}

function drawFrameworks(parallaxX: number, parallaxY: number) {
  if (!ctx) return;

  ctx.strokeStyle = C.structure;
  ctx.lineWidth = 1 * dpr;

  for (const f of frameworks) {
    // Breathing scale.
    const breath = 1 + Math.sin(time * f.speed + f.phase) * 0.04;
    const r = f.r * breath;

    // Continuous evolution: frameworks shift in a slow wave.
    const cycle = (evolution % 6000) / 6000;
    const shiftX = Math.sin(cycle * Math.PI * 2 + f.phase) * Math.min(width, height) * 0.04;
    const shiftY = Math.cos(cycle * Math.PI * 1.5 + f.phase) * Math.min(width, height) * 0.03;

    const cx = f.cx + shiftX + parallaxX * 0.03;
    const cy = f.cy + shiftY + parallaxY * 0.04;

    // Main hex.
    hexPath(cx, cy, r, time * f.speed * 0.1);
    ctx.stroke();

    // Inner hex ring.
    hexPath(cx, cy, r * 0.82, time * f.speed * 0.1);
    ctx.lineWidth = 0.6 * dpr;
    ctx.stroke();
    ctx.lineWidth = 1 * dpr;

    // Six radial spokes to vertices.
    ctx.strokeStyle = "rgba(215, 233, 255, 0.18)";
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + r * 0.65 * Math.cos(a), cy + r * 0.65 * Math.sin(a));
      ctx.stroke();
    }
    ctx.strokeStyle = C.structure;
  }
}

function updateModuleLifecycle(m: MicroModule) {
  m.phaseTime++;

  // Transition phase when duration elapsed.
  if (m.phaseTime >= m.phaseDuration) {
    const order: Phase[] = ["assemble", "connect", "branch", "merge", "dissolve", "rebuild"];
    const idx = order.indexOf(m.phase);
    m.phase = order[(idx + 1) % order.length];
    m.phaseTime = 0;
    m.phaseDuration = 240 + ((m.index % 4) * 60); // 4–8s at 60fps
    m.phaseOffsetX = Math.sin(m.index * 0.71) * 40 * dpr;
    m.phaseOffsetY = Math.cos(m.index * 0.83) * 40 * dpr;
  }

  // Dynamic scroll-driven target.
  const dtx = m.tx + m._dx;
  const dty = m.ty + m._dy;

  // Phase behaviors.
  switch (m.phase) {
    case "assemble":
      // Move toward dynamic target, opacity rises.
      m.x += (dtx - m.x) * 0.03;
      m.y += (dty - m.y) * 0.03;
      m.opacity += (0.6 - m.opacity) * 0.02;
      break;
    case "connect":
      // Settle and hold.
      m.x += (dtx - m.x) * 0.02;
      m.y += (dty - m.y) * 0.02;
      m.opacity += (0.5 - m.opacity) * 0.02;
      break;
    case "branch":
      // Slight outward pull along branch offset.
      m.x += (dtx + Math.cos(m.branchOffset) * 12 * dpr - m.x) * 0.015;
      m.y += (dty + Math.sin(m.branchOffset) * 12 * dpr - m.y) * 0.015;
      m.opacity += (0.55 - m.opacity) * 0.02;
      break;
    case "merge":
      // Pull toward connected neighbors slightly.
      let cx = dtx;
      let cy = dty;
      if (m.connections.length) {
        for (const c of m.connections) {
          cx += c.tx + c._dx;
          cy += c.ty + c._dy;
        }
        cx /= m.connections.length + 1;
        cy /= m.connections.length + 1;
      }
      m.x += (cx - m.x) * 0.01;
      m.y += (cy - m.y) * 0.01;
      m.opacity += (0.5 - m.opacity) * 0.02;
      break;
    case "dissolve":
      // Fade and drift slightly away using stable offsets.
      m.x += (dtx + m.phaseOffsetX * 0.5 - m.x) * 0.01;
      m.y += (dty + m.phaseOffsetY * 0.5 - m.y) * 0.01;
      m.opacity += (0.05 - m.opacity) * 0.02;
      break;
    case "rebuild":
      // Reappear from dissolved state and move back toward dynamic target.
      m.x += (dtx + m.phaseOffsetX - m.x) * 0.02;
      m.y += (dty + m.phaseOffsetY - m.y) * 0.02;
      m.opacity += (0.45 - m.opacity) * 0.02;
      break;
  }
}

function drawMicroModules(parallaxX: number, parallaxY: number) {
  if (!ctx) return;
  const margin = 30 * dpr;

  // Cursor proximity for subtle interaction.
  const cursorX = mouseX * dpr;
  const cursorY = mouseY * dpr;

  for (const m of modules) {
    if (!reducedMotion) updateModuleLifecycle(m);

    const px = m.x + parallaxX * 0.05;
    const py = m.y + parallaxY * 0.07;

    if (px < -margin || px > width + margin || py < -margin || py > height + margin) continue;

    // Subtle cursor reaction.
    const dx = px - cursorX;
    const dy = py - cursorY;
    const dist = Math.hypot(dx, dy);
    const cursorBoost = dist < 120 * dpr ? (120 * dpr - dist) / (120 * dpr) * 0.25 : 0;

    const alpha = Math.min(0.15, Math.max(0, m.opacity) + cursorBoost);
    if (alpha < 0.005) continue;

    ctx.strokeStyle = `rgba(215, 233, 255, ${alpha})`;
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.lineWidth = 0.6 * dpr;

    hexPath(px, py, m.size);
    if (m.phase === "solid" || m.phase === "connect") {
      ctx.fill();
    } else {
      ctx.stroke();
    }
  }
}

function drawDataStreams(parallaxX: number, parallaxY: number) {
  if (!ctx) return;
  const connectionDistance = Math.min(width, height) * 0.12;

  ctx.lineWidth = 0.5 * dpr;

  for (const s of streams) {
    const ax = s.a.x + parallaxX * 0.05;
    const ay = s.a.y + parallaxY * 0.07;
    const bx = s.b.x + parallaxX * 0.05;
    const by = s.b.y + parallaxY * 0.07;

    // Fade stream based on current endpoint distance — old topology dissolves,
    // new topology appears as modules reorganize.
    const dist = Math.hypot(ax - bx, ay - by);
    const targetOpacity = dist < connectionDistance ? 0.12 : 0;
    s.opacity += (targetOpacity - s.opacity) * 0.03;
    if (s.opacity < 0.001) continue;

    ctx.strokeStyle = `rgba(215, 233, 255, ${s.opacity})`;

    // Very thin animated dashed pathway.
    ctx.setLineDash([3 * dpr, 8 * dpr]);
    s.dashOffset -= 0.03 * dpr;
    ctx.lineDashOffset = s.dashOffset;

    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
    ctx.stroke();

    ctx.setLineDash([]);
  }
}

function drawConnectionPulses(parallaxX: number, parallaxY: number) {
  if (!ctx) return;

  for (const s of streams) {
    // Manage pulse lifecycle deterministically.
    if (s.pulse === null) {
      s.pulseCooldown--;
      if (s.pulseCooldown <= 0) {
        s.pulse = 0;
      }
    } else {
      s.pulse += s.pulseSpeed;
      if (s.pulse >= 1) {
        s.pulse = null;
        s.pulseCooldown = 120 + ((s.seed % 5) * 80);
      }
    }

    if (s.pulse === null || s.opacity < 0.03) continue;

    const ax = s.a.x + parallaxX * 0.05;
    const ay = s.a.y + parallaxY * 0.07;
    const bx = s.b.x + parallaxX * 0.05;
    const by = s.b.y + parallaxY * 0.07;

    const x = ax + (bx - ax) * s.pulse;
    const y = ay + (by - ay) * s.pulse;

    ctx.fillStyle = `rgba(93, 143, 190, ${Math.min(0.15, s.opacity + 0.03)})`;
    ctx.beginPath();
    ctx.arc(x, y, 2 * dpr, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawDepthFog() {
  if (!ctx) return;
  // Very subtle atmospheric haze, lighter in center.
  const cx = width / 2;
  const cy = height / 2;
  const r = Math.max(width, height) * 0.7;
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  grad.addColorStop(0, "rgba(248, 251, 255, 0)");
  grad.addColorStop(0.6, "rgba(215, 233, 255, 0.03)");
  grad.addColorStop(1, "rgba(29, 46, 109, 0.04)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);
}

function drawCursorGlow() {
  if (!props.parallax) return;
  const glow = glowRef.value;
  if (!glow) return;
  glow.style.transform = `translate3d(${mouseX - 150}px, ${mouseY - 150}px, 0)`;
}

function render() {
  if (!ctx) return;
  ctx.clearRect(0, 0, width, height);

  time += 1;
  scrollY += scrollVelocity;
  scrollVelocity *= 0.94;

  // Background never resets; it evolves continuously with time and scroll.
  evolution += 0.15;

  mouseX += (targetMouseX - mouseX) * 0.06;
  mouseY += (targetMouseY - mouseY) * 0.06;

  // Reorganize the living lattice.
  reorganizeTargets();
  streamRebuildTimer++;
  if (streamRebuildTimer >= 90) {
    // Rebuild topology ~every 1.5s so old connections dissolve and new ones form.
    buildStreams();
    streamRebuildTimer = 0;
  }

  // Very subtle parallax: the architecture reorg is the main motion.
  const parallaxX = props.parallax ? scrollY * 0.08 + mouseX * 0.04 : 0;
  const parallaxY = props.parallax ? scrollY * 0.12 + mouseY * 0.06 : 0;

  // Layer 01: Blueprint Grid.
  drawBlueprintGrid(parallaxX, parallaxY);

  // Layer 06: Depth Fog (behind structures for atmospheric depth).
  drawDepthFog();

  if (!reducedMotion) {
    // Layer 02: Structural Hex Frameworks.
    drawFrameworks(parallaxX * 0.8, parallaxY * 0.8);

    // Layer 04: Data Streams.
    drawDataStreams(parallaxX, parallaxY);

    // Layer 05: Connection Pulses.
    drawConnectionPulses(parallaxX, parallaxY);

    // Layer 03: Micro Modules.
    drawMicroModules(parallaxX, parallaxY);
  }

  // Layer 07: Interactive Cursor.
  drawCursorGlow();
}

function onScroll(e: { scroll: number; velocity: number }) {
  scrollY = e.scroll;
  scrollVelocity = e.velocity;
  // Evolution advances with scroll distance, never backward.
  evolution += Math.abs(e.velocity) * 0.25;
}

function onMouseMove(e: MouseEvent) {
  targetMouseX = e.clientX;
  targetMouseY = e.clientY;
}

onMounted(() => {
  if (!canvasRef.value) return;
  ctx = canvasRef.value.getContext("2d");
  resize();
  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", onMouseMove, { passive: true });
  renderId = $gsap.ticker.add(render);
});

onUnmounted(() => {
  if (renderId !== null) $gsap.ticker.remove(render);
  window.removeEventListener("resize", resize);
  window.removeEventListener("mousemove", onMouseMove);
});
</script>

<template>
  <div class="background-architecture" aria-hidden="true">
    <canvas ref="canvasRef" class="background-architecture__canvas" />
    <div ref="glowRef" class="background-architecture__glow" />
  </div>
</template>

<style scoped>
.background-architecture {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.background-architecture__canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  will-change: transform;
}

.background-architecture__glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(118, 168, 214, 0.06) 0%, rgba(118, 168, 214, 0) 70%);
  pointer-events: none;
  will-change: transform;
  transform: translate3d(-300px, -300px, 0);
}

@media (pointer: coarse) {
  .background-architecture__glow {
    display: none;
  }
}
</style>
