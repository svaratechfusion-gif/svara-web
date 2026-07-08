<script setup lang="ts">
// Vision AI's product moment (Scene: Products / "no cards, ever"). A CCTV
// monitor that reads as a LIVE feed: synthetic walkers tracked by bounding
// boxes, an accumulating presence heatmap, sensor grain, scanlines, and a
// tiny HUD. Everything is procedural — no video asset, no network, just a
// small 2D canvas driven by the shared gsap ticker while mounted. The
// panel's slow rotate lives in CSS (see .vision-feed animation).
//
// 3D explains, never distracts: every element here IS the product —
// detection boxes, confidence scores, heat accumulation. Nothing ornamental.
import { gsap } from "~~/lib/gsap";

const canvasRef = ref<HTMLCanvasElement | null>(null);
const timeLabel = ref("--:--:--");

const FEED_W = 416;
const FEED_H = 234;

interface Walker {
  phase: number;
  speed: number;
  /** Baseline (feet) y in feed pixels — also encodes depth. */
  lane: number;
  depth: number;
}

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  canvas.width = FEED_W;
  canvas.height = FEED_H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Heat accumulates on a low-res offscreen layer — presence over time.
  const heat = document.createElement("canvas");
  heat.width = FEED_W / 4;
  heat.height = FEED_H / 4;
  const heatCtx = heat.getContext("2d")!;

  // Pre-rendered noise tiles, cycled per frame — sensor grain without
  // per-pixel work every frame.
  const noiseTiles = Array.from({ length: 3 }, () => {
    const tile = document.createElement("canvas");
    tile.width = FEED_W / 2;
    tile.height = FEED_H / 2;
    const tileCtx = tile.getContext("2d")!;
    const image = tileCtx.createImageData(tile.width, tile.height);
    for (let i = 0; i < image.data.length; i += 4) {
      const v = Math.floor(Math.random() * 255);
      image.data[i] = v;
      image.data[i + 1] = v;
      image.data[i + 2] = v;
      image.data[i + 3] = 14;
    }
    tileCtx.putImageData(image, 0, 0);
    return tile;
  });

  const walkers: Walker[] = [
    { phase: 0.4, speed: 0.14, lane: 208, depth: 1 },
    { phase: 2.6, speed: 0.21, lane: 178, depth: 0.72 },
    { phase: 4.4, speed: 0.17, lane: 152, depth: 0.55 },
    { phase: 1.2, speed: 0.27, lane: 134, depth: 0.42 },
  ];

  const start = performance.now();
  let frame = 0;

  const draw = () => {
    const t = (performance.now() - start) / 1000;
    frame++;

    // --- backdrop: night forecourt, single hot lamp, floor plane ---
    const sky = ctx.createLinearGradient(0, 0, 0, FEED_H);
    sky.addColorStop(0, "#0a1322");
    sky.addColorStop(0.55, "#0d1826");
    sky.addColorStop(1, "#16283c");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, FEED_W, FEED_H);
    const lamp = ctx.createRadialGradient(FEED_W * 0.72, 30, 4, FEED_W * 0.72, 30, 130);
    lamp.addColorStop(0, "rgba(196,222,255,0.20)");
    lamp.addColorStop(1, "rgba(196,222,255,0)");
    ctx.fillStyle = lamp;
    ctx.fillRect(0, 0, FEED_W, FEED_H);
    ctx.strokeStyle = "rgba(120,160,205,0.10)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
      const y = 118 + i * 26;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(FEED_W, y);
      ctx.stroke();
    }

    // --- walkers: positions first (heat under silhouettes under boxes) ---
    const positions = walkers.map((w) => {
      const range = FEED_W * (0.34 + w.depth * 0.1);
      const x = FEED_W / 2 + Math.sin(t * w.speed * Math.PI + w.phase) * range;
      const height = 52 * w.depth;
      const width = height * 0.36;
      const bob = reduced ? 0 : Math.sin(t * 5.2 + w.phase * 3) * 1.4 * w.depth;
      return { x, top: w.lane - height + bob, width, height, lane: w.lane };
    });

    for (const p of positions) {
      // Presence map, palette-bound: electric cyan, not thermal orange —
      // the Color Language allows exactly five colors.
      heatCtx.fillStyle = "rgba(137,211,255,0.06)";
      heatCtx.beginPath();
      heatCtx.arc(p.x / 4, (p.lane - p.height * 0.4) / 4, (p.height / 4) * 0.8, 0, Math.PI * 2);
      heatCtx.fill();
    }
    ctx.globalAlpha = 0.55;
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(heat, 0, 0, FEED_W, FEED_H);
    ctx.globalAlpha = 1;

    for (const [i, p] of positions.entries()) {
      // silhouette — head + body, deliberately anonymous
      ctx.fillStyle = "rgba(198,216,238,0.88)";
      ctx.beginPath();
      ctx.arc(p.x, p.top + p.height * 0.12, p.height * 0.11, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.roundRect(p.x - p.width / 2, p.top + p.height * 0.24, p.width, p.height * 0.76, p.width * 0.3);
      ctx.fill();

      // detection box + label
      const pad = 4;
      ctx.strokeStyle = "#89d3ff";
      ctx.lineWidth = 1;
      ctx.strokeRect(p.x - p.width / 2 - pad, p.top - pad, p.width + pad * 2, p.height + pad * 2);
      const confidence = (0.91 + Math.sin(t * 1.6 + i * 2.1) * 0.045).toFixed(2);
      const label = `PERSON ${confidence}`;
      ctx.font = "600 7px ui-monospace, monospace";
      const labelWidth = ctx.measureText(label).width + 6;
      ctx.fillStyle = "rgba(137,211,255,0.94)";
      ctx.fillRect(p.x - p.width / 2 - pad, p.top - pad - 10, labelWidth, 10);
      ctx.fillStyle = "#07111f";
      ctx.fillText(label, p.x - p.width / 2 - pad + 3, p.top - pad - 3);
    }

    // --- sensor grain ---
    if (!reduced) {
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(noiseTiles[frame % 3]!, 0, 0, FEED_W, FEED_H);
      ctx.imageSmoothingEnabled = true;
    }

    // timestamp ~2×/sec is plenty; a per-frame reactive write would just
    // churn Vue for digits nobody can read that fast
    if (frame % 30 === 1) {
      timeLabel.value = new Date().toLocaleTimeString("en-GB", { hour12: false });
    }
  };

  if (reduced) {
    draw();
  } else {
    gsap.ticker.add(draw);
  }

  onUnmounted(() => {
    gsap.ticker.remove(draw);
  });
});
</script>

<template>
  <div class="vision-feed" aria-label="Live Vision AI demonstration: people detected and tracked on a CCTV feed">
    <canvas ref="canvasRef" class="vision-feed__canvas" aria-hidden="true" />
    <div class="vision-feed__scanlines" aria-hidden="true" />
    <div class="vision-feed__hud" aria-hidden="true">
      <span class="vision-feed__cam">CAM 04 · GATE B</span>
      <span class="vision-feed__rec"><i class="vision-feed__rec-dot" />REC</span>
      <span class="vision-feed__time">{{ timeLabel }}</span>
      <span class="vision-feed__meta">24 FPS · PEOPLE 4 · HEATMAP ON</span>
    </div>
  </div>
</template>

<style scoped>
.vision-feed {
  position: relative;
  width: min(58vw, 620px);
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border: 1px solid rgba(137, 211, 255, 0.16);
  border-radius: 10px;
  background: #0b1220;
  box-shadow:
    0 0 80px rgba(93, 143, 190, 0.28),
    0 24px 64px rgba(2, 6, 14, 0.6);
  /* "Rotate." — a slow, living sway; the monitor is never a static card. */
  animation: vision-feed-sway 9s ease-in-out infinite alternate;
}

@media (max-width: 768px) {
  .vision-feed {
    width: min(88vw, 620px);
  }
}

@keyframes vision-feed-sway {
  from {
    transform: perspective(1200px) rotateY(-4deg) rotateX(1.2deg);
  }
  to {
    transform: perspective(1200px) rotateY(4deg) rotateX(-1.2deg);
  }
}

.vision-feed__canvas {
  display: block;
  width: 100%;
  height: 100%;
}

.vision-feed__scanlines {
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(to bottom, transparent 0 2px, rgba(255, 255, 255, 0.02) 2px 3px),
    radial-gradient(ellipse at center, transparent 55%, rgba(2, 6, 14, 0.5) 100%);
  pointer-events: none;
}

.vision-feed__hud {
  position: absolute;
  inset: 0;
  color: rgba(184, 222, 255, 0.85);
  font-family: ui-monospace, "SF Mono", Menlo, monospace;
  font-size: 10px;
  letter-spacing: 0.08em;
  pointer-events: none;
}

.vision-feed__cam {
  position: absolute;
  top: 10px;
  left: 12px;
}

.vision-feed__rec {
  position: absolute;
  top: 10px;
  right: 12px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  /* The one sanctioned non-palette accent: diegetic REC red (signal token). */
  color: rgba(255, 61, 87, 0.95);
}

.vision-feed__rec-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-signal-red);
  animation: vision-feed-blink 1.6s steps(2, start) infinite;
}

@keyframes vision-feed-blink {
  to {
    visibility: hidden;
  }
}

.vision-feed__time {
  position: absolute;
  bottom: 10px;
  left: 12px;
}

.vision-feed__meta {
  position: absolute;
  right: 12px;
  bottom: 10px;
  color: rgba(184, 222, 255, 0.55);
}

@media (prefers-reduced-motion: reduce) {
  .vision-feed {
    animation: none;
  }

  .vision-feed__rec-dot {
    animation: none;
  }
}
</style>
