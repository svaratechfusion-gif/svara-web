<script setup lang="ts">
// Blueprint annotations — coordinates, system IDs, construction marks,
// measurement ticks, technical labels. Deterministic placement, capped at
// 3% opacity: felt as craft, never read as content. Static.
// Strokes = stretched SVG (axis-aligned lines don't distort);
// text = %-positioned HTML (avoids viewBox distortion).
const cols = [8, 26, 44, 62, 80, 94]
const rows = [12, 38, 64, 88]

const labels = [
  { x: 8, y: 8, t: 'SYS-041 · GRID REF A' },
  { x: 62, y: 34, t: 'NODE CLUSTER 7 · CALIBRATED' },
  { x: 26, y: 60, t: 'SECTION C-C · 1:200' },
  { x: 78, y: 84, t: 'SVARA FIELD PLAN · REV 2.0' },
]
</script>

<template>
  <div class="annotations-layer" aria-hidden="true">
    <svg preserveAspectRatio="none" viewBox="0 0 100 100">
      <!-- construction crosses at grid intersections -->
      <g>
        <template v-for="cx in cols" :key="'c' + cx">
          <template v-for="cy in rows" :key="'r' + cy">
            <line :x1.attr="cx - 0.7" :y1.attr="cy" :x2.attr="cx + 0.7" :y2.attr="cy" />
            <line :x1.attr="cx" :y1.attr="cy - 1.2" :x2.attr="cx" :y2.attr="cy + 1.2" />
          </template>
        </template>
      </g>
      <!-- measurement ticks along top + left edges -->
      <g>
        <line v-for="i in 24" :key="'t' + i" :x1.attr="i * 4" y1="0" :x2.attr="i * 4" :y2.attr="i % 6 === 0 ? 1.6 : 0.8" />
        <line v-for="i in 12" :key="'l' + i" x1="0" :y1.attr="i * 8" :x2.attr="i % 3 === 0 ? 1.1 : 0.55" :y2.attr="i * 8" />
      </g>
    </svg>

    <!-- coordinates at intersections -->
    <template v-for="cx in cols" :key="'tc' + cx">
      <span
        v-for="cy in rows" :key="'tr' + cy"
        class="ann-coord"
        :style="{ left: cx + 1 + '%', top: cy - 2.6 + '%' }"
      >{{ cx }}·{{ cy }}</span>
    </template>

    <!-- system IDs / technical labels -->
    <span
      v-for="l in labels" :key="l.t"
      class="ann-label"
      :style="{ left: l.x + '%', top: l.y + '%' }"
    >{{ l.t }}</span>
  </div>
</template>

<style scoped>
.annotations-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.03; /* hard cap per spec */
}
.annotations-layer svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.annotations-layer line {
  stroke: var(--color-ink-strong);
  vector-effect: non-scaling-stroke;
  stroke-width: 1px;
}
.ann-coord,
.ann-label {
  position: absolute;
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.08em;
  color: var(--color-ink-strong);
  white-space: nowrap;
}
.ann-label { font-size: 10px; text-transform: uppercase; }
</style>
