<script setup lang="ts">
// Experience Zero — the first ~3.5 seconds before anything else.
// Not a loader. Not a hero. The moment intelligence is felt emerging.
// White canvas. Tiny blue pulses. Quiet connections. Then words assemble.
// Reduced-motion users skip straight to the page.

const emit = defineEmits<{ complete: [] }>();

const { $gsap } = useNuxtApp();

const show = ref(true);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const textRef = ref<HTMLDivElement | null>(null);

const reducedMotion = import.meta.client
  ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
  : false;

interface Node {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  appearProgress: number;
  pulseOffset: number;
  pulseSpeed: number;
}

interface Connection {
  a: Node;
  b: Node;
  progress: number;
}

let ctx: CanvasRenderingContext2D | null = null;
let dpr = 1;
let width = 0;
let height = 0;
let nodes: Node[] = [];
let connections: Connection[] = [];
let renderId: number | null = null;
let timeline: gsap.core.Timeline | null = null;

const NODE_COUNT = 7;
const CONNECTION_DISTANCE = 220;

function buildNodes() {
  nodes = [];
  connections = [];

  const cx = width / 2;
  const cy = height / 2;
  const spread = Math.min(width, height) * 0.22;

  // Relative constellation: a loose, living cluster near the visual center.
  const positions = [
    { x: 0, y: 0 },
    { x: 0.85, y: -0.45 },
    { x: -0.65, y: -0.7 },
    { x: -0.9, y: 0.35 },
    { x: 0.4, y: 0.8 },
    { x: 0.75, y: 0.5 },
    { x: -0.25, y: 0.55 },
  ];

  for (let i = 0; i < NODE_COUNT; i++) {
    const p = positions[i] ?? { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 };
    nodes.push({
      x: cx + p.x * spread,
      y: cy + p.y * spread,
      baseX: cx + p.x * spread,
      baseY: cy + p.y * spread,
      radius: 2.2 * dpr,
      appearProgress: 0,
      pulseOffset: i * 1.2,
      pulseSpeed: 0.004 + i * 0.0006,
    });
  }

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i];
      const b = nodes[j];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist < CONNECTION_DISTANCE * dpr) {
        connections.push({ a, b, progress: 0 });
      }
    }
  }
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

  buildNodes();
}

function render() {
  if (!ctx || !show.value) return;

  ctx.clearRect(0, 0, width, height);

  const now = performance.now();

  // Connections first so nodes sit on top.
  for (const conn of connections) {
    if (conn.progress <= 0) continue;
    const { a, b } = conn;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.strokeStyle = `rgba(118, 168, 214, ${0.22 * conn.progress})`;
    ctx.lineWidth = 1 * dpr;
    ctx.lineCap = "round";
    ctx.stroke();
  }

  for (const node of nodes) {
    if (node.appearProgress <= 0) continue;

    const pulse = 1 + Math.sin(now * node.pulseSpeed + node.pulseOffset) * 0.22;
    const r = node.radius * node.appearProgress * pulse;
    const alpha = node.appearProgress * 0.72;

    // Soft electric glow.
    const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 6);
    glow.addColorStop(0, `rgba(215, 233, 255, ${alpha * 0.35})`);
    glow.addColorStop(1, "rgba(215, 233, 255, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(node.x, node.y, r * 6, 0, Math.PI * 2);
    ctx.fill();

    // Core dot.
    ctx.fillStyle = `rgba(118, 168, 214, ${alpha})`;
    ctx.beginPath();
    ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
    ctx.fill();
  }
}

function lockScroll(lock: boolean) {
  if (!import.meta.client) return;
  document.body.style.overflow = lock ? "hidden" : "";
}

function finish() {
  lockScroll(false);
  show.value = false;
  emit("complete");
}

function startSequence() {
  if (!canvasRef.value || !textRef.value) return;

  ctx = canvasRef.value.getContext("2d");
  resize();
  window.addEventListener("resize", resize);
  renderId = $gsap.ticker.add(render);

  // Initial text state: not yet assembled.
  $gsap.set(textRef.value.children, {
    opacity: 0,
    y: 14,
    scale: 0.985,
    filter: "blur(8px)",
  });

  timeline = $gsap.timeline({
    onComplete: () => {
      // Hold the assembled state briefly, then dissolve the whole overlay.
      $gsap.to(textRef.value, {
        opacity: 0,
        scale: 1.01,
        duration: 0.5,
        ease: "power2.in",
        delay: 0.35,
      });
      $gsap.to(canvasRef.value, {
        opacity: 0,
        scale: 1.02,
        duration: 0.7,
        ease: "power2.inOut",
        delay: 0.45,
        onComplete: finish,
      });
    },
  });

  // Nodes wake up one by one — intelligence emerging, not loading.
  nodes.forEach((node, i) => {
    timeline!.to(
      node,
      { appearProgress: 1, duration: 0.45, ease: "power2.out" },
      0.35 + i * 0.22
    );
  });

  // Connections form almost imperceptibly after a few nodes exist.
  connections.forEach((conn, i) => {
    timeline!.to(
      conn,
      { progress: 1, duration: 0.9, ease: "power1.out" },
      0.9 + i * 0.1
    );
  });

  // Words assemble into focus — not faded, not slid, but resolved.
  timeline!.to(
    textRef.value.children,
    {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 0.85,
      stagger: 0.16,
      ease: "power2.out",
    },
    2.1
  );
}

onMounted(() => {
  if (reducedMotion) {
    finish();
    return;
  }
  lockScroll(true);
  startSequence();
});

onUnmounted(() => {
  if (renderId !== null) $gsap.ticker.remove(render);
  window.removeEventListener("resize", resize);
  lockScroll(false);
  timeline?.kill();
});
</script>

<template>
  <Transition
    enter-active-class="experience-zero--enter"
    leave-active-class="experience-zero--leave"
  >
    <div v-if="show" class="experience-zero" aria-hidden="true">
      <canvas ref="canvasRef" class="experience-zero__canvas" />
      <div ref="textRef" class="experience-zero__text">
        <span class="experience-zero__line">Engineering</span>
        <span class="experience-zero__line">The Intelligence Layer</span>
        <span class="experience-zero__line">Of Tomorrow</span>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.experience-zero {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  pointer-events: none;
}

.experience-zero--enter-active,
.experience-zero--leave-active {
  transition: opacity 0.6s ease;
}

.experience-zero--enter-from,
.experience-zero--leave-to {
  opacity: 0;
}

.experience-zero__canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.experience-zero__text {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35em;
  text-align: center;
  color: var(--color-primary);
  mix-blend-mode: multiply;
}

.experience-zero__line {
  display: block;
  font-size: clamp(1.75rem, 5vw, 3.5rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.1;
  will-change: opacity, transform, filter;
}
</style>
