// Shared "particles form letters" technique — docs/creative-direction.md §8.
// Renders text to an offscreen 2D canvas, samples glyph-covered pixels, and
// maps them into world-space target coordinates a particle pool can lerp
// toward. Used by Scene 03 ("Intelligence") and reused as-is by Scene 06's
// Generative AI product behavior, per the creative direction doc.
//
// Deliberately Canvas 2D `fillText` + `getImageData`, not an external
// font-outline library (opentype.js etc) — sufficient for this effect and
// keeps the bundle free of an extra dependency.
export interface TextParticleOptions {
  canvasWidth?: number;
  canvasHeight?: number;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: number;
  /** Sample every Nth pixel — lower is denser (more points), higher is sparser. */
  step?: number;
  /** World-space size the sampled text plane maps onto. */
  worldWidth?: number;
  worldHeight?: number;
}

export function sampleTextParticles(text: string, options: TextParticleOptions = {}) {
  const {
    canvasWidth = 1024,
    canvasHeight = 256,
    fontSize = 140,
    fontFamily = "Geist Sans, sans-serif",
    fontWeight = 700,
    step = 3,
    worldWidth = 6.4,
    worldHeight = 1.6,
  } = options;

  const canvas = document.createElement("canvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) return { positions: new Float32Array(0), count: 0 };

  ctx.fillStyle = "#000000";
  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, canvasWidth / 2, canvasHeight / 2);

  const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
  const points: number[] = [];

  for (let y = 0; y < canvasHeight; y += step) {
    for (let x = 0; x < canvasWidth; x += step) {
      const alpha = imageData.data[(y * canvasWidth + x) * 4 + 3]!;
      if (alpha > 128) {
        // Canvas Y grows downward; world Y should grow upward.
        const worldX = (x / canvasWidth - 0.5) * worldWidth;
        const worldY = -(y / canvasHeight - 0.5) * worldHeight;
        points.push(worldX, worldY);
      }
    }
  }

  const count = points.length / 2;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = points[i * 2]!;
    positions[i * 3 + 1] = points[i * 2 + 1]!;
    positions[i * 3 + 2] = 0;
  }

  return { positions, count };
}

export interface TextBlockOptions {
  canvasWidth?: number;
  fontSize?: number;
  /** Line height in em — the DOM handoff text MUST use the same value. */
  lineHeightEm?: number;
  fontFamily?: string;
  fontWeight?: number;
  step?: number;
  /** World-space width the full canvas maps onto (height follows aspect). */
  worldWidth?: number;
}

export interface TextBlockSample {
  positions: Float32Array;
  /**
   * Per-point assembly order, 0..1 — letters count up left→right, line by
   * line (Scene 05: every letter literally assembles itself, in sequence).
   */
  order: Float32Array;
  count: number;
  /** World-space height of one font em — sizes the DOM handoff text. */
  fontWorld: number;
  lineHeightEm: number;
  worldWidth: number;
  worldHeight: number;
}

/**
 * Multi-line version of sampleTextParticles for Scene 05 ("Typography is
 * Created"): stacks centered lines and tags every sampled point with the
 * global index of the LETTER it belongs to (via measureText substring
 * advances, so kerning is exact), normalized to a 0..1 assembly order the
 * render loop staggers particle arrival by.
 */
export function sampleTextBlock(lines: string[], options: TextBlockOptions = {}): TextBlockSample {
  const {
    canvasWidth = 1024,
    fontSize = 100,
    lineHeightEm = 1.28,
    fontFamily = "Geist Sans, sans-serif",
    fontWeight = 700,
    step = 3,
    worldWidth = 5.5,
  } = options;

  const lineHeightPx = fontSize * lineHeightEm;
  const canvasHeight = Math.ceil(lineHeightPx * lines.length + fontSize);
  const worldHeight = worldWidth * (canvasHeight / canvasWidth);
  const fontWorld = (fontSize / canvasWidth) * worldWidth;
  const empty: TextBlockSample = {
    positions: new Float32Array(0),
    order: new Float32Array(0),
    count: 0,
    fontWorld,
    lineHeightEm,
    worldWidth,
    worldHeight,
  };

  const canvas = document.createElement("canvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) return empty;

  ctx.fillStyle = "#000000";
  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  let totalLetters = 0;
  for (const line of lines) totalLetters += line.replace(/\s/g, "").length;
  if (totalLetters === 0) return empty;

  interface CharRange {
    start: number;
    end: number;
    letter: number;
  }
  const lineCharRanges: CharRange[][] = [];
  let letterCursor = 0;
  lines.forEach((line, lineIndex) => {
    const centerY = canvasHeight / 2 + (lineIndex - (lines.length - 1) / 2) * lineHeightPx;
    ctx.fillText(line, canvasWidth / 2, centerY);
    const lineStartX = canvasWidth / 2 - ctx.measureText(line).width / 2;
    const ranges: CharRange[] = [];
    for (let c = 0; c < line.length; c++) {
      if (line[c] === " ") continue;
      ranges.push({
        start: lineStartX + ctx.measureText(line.slice(0, c)).width,
        end: lineStartX + ctx.measureText(line.slice(0, c + 1)).width,
        letter: letterCursor++,
      });
    }
    lineCharRanges.push(ranges);
  });

  const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
  const points: number[] = [];

  for (let y = 0; y < canvasHeight; y += step) {
    const lineIndex = Math.min(
      lines.length - 1,
      Math.max(0, Math.round((y - canvasHeight / 2) / lineHeightPx + (lines.length - 1) / 2))
    );
    const ranges = lineCharRanges[lineIndex]!;
    for (let x = 0; x < canvasWidth; x += step) {
      const alpha = imageData.data[(y * canvasWidth + x) * 4 + 3]!;
      if (alpha <= 128) continue;
      let letter = ranges.length ? ranges[ranges.length - 1]!.letter : 0;
      let inner = 1;
      for (const range of ranges) {
        if (x <= range.end + 1) {
          letter = range.letter;
          inner = Math.min(1, Math.max(0, (x - range.start) / Math.max(1, range.end - range.start)));
          break;
        }
      }
      const worldX = (x / canvasWidth - 0.5) * worldWidth;
      const worldY = -(y / canvasHeight - 0.5) * worldHeight;
      // Letters assemble strictly in sequence; the inner fraction adds a
      // subtle left→right sweep WITHIN each letter.
      points.push(worldX, worldY, (letter + inner * 0.5) / totalLetters);
    }
  }

  const count = points.length / 3;
  const positions = new Float32Array(count * 3);
  const order = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = points[i * 3]!;
    positions[i * 3 + 1] = points[i * 3 + 1]!;
    positions[i * 3 + 2] = 0;
    order[i] = points[i * 3 + 2]!;
  }

  return { positions, order, count, fontWorld, lineHeightEm, worldWidth, worldHeight };
}

/**
 * assignTextTargets for TextBlockSample — also copies each particle's
 * assembly order so the render loop can stagger letter arrival.
 */
export function assignTextBlockTargets(
  target: Float32Array,
  orderOut: Float32Array,
  particleCount: number,
  sampled: TextBlockSample,
  random: () => number,
  jitter = 0.02
) {
  if (sampled.count === 0) {
    target.fill(0);
    orderOut.fill(0);
    return;
  }
  for (let i = 0; i < particleCount; i++) {
    const sourceIndex = i % sampled.count;
    const i3 = i * 3;
    const s3 = sourceIndex * 3;
    target[i3] = sampled.positions[s3]! + (random() - 0.5) * jitter;
    target[i3 + 1] = sampled.positions[s3 + 1]! + (random() - 0.5) * jitter;
    target[i3 + 2] = sampled.positions[s3 + 2]! + (random() - 0.5) * jitter;
    orderOut[i] = sampled.order[sourceIndex]!;
  }
}

/**
 * Assigns one sampled glyph point to every particle in a pool, wrapping
 * (with small jitter so wrapped duplicates don't perfectly overlap) when the
 * particle count exceeds the sampled point count — the usual case, since
 * particle pools are sized for the densest scene, not for text.
 */
export function assignTextTargets(target: Float32Array, particleCount: number, sampled: { positions: Float32Array; count: number }, random: () => number, jitter = 0.02) {
  if (sampled.count === 0) {
    // No glyph data (e.g. canvas 2D unavailable) — leave particles at the
    // origin rather than throwing, so the scene degrades to "core only."
    target.fill(0);
    return;
  }
  for (let i = 0; i < particleCount; i++) {
    const sourceIndex = i % sampled.count;
    const i3 = i * 3;
    const s3 = sourceIndex * 3;
    target[i3] = sampled.positions[s3]! + (random() - 0.5) * jitter;
    target[i3 + 1] = sampled.positions[s3 + 1]! + (random() - 0.5) * jitter;
    target[i3 + 2] = sampled.positions[s3 + 2]! + (random() - 0.5) * jitter;
  }
}
