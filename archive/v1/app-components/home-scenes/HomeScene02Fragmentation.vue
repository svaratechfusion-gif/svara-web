<script setup lang="ts">
// Scene 2 — Fragmentation. The consequence of the reality: systems that
// should connect don't. The diagram makes the fracture visible.

// The systems shown are the canonical fragmentation of an enterprise
// operating environment. Each one knows only its slice.
const SYSTEMS = [
  { id: "erp",    label: "ERP",    cx: 180, cy: 120 },
  { id: "mes",    label: "MES",    cx: 420, cy: 80  },
  { id: "scada",  label: "SCADA",  cx: 620, cy: 160 },
  { id: "iot",    label: "Sensors",cx: 320, cy: 260 },
  { id: "crm",    label: "CRM",    cx: 540, cy: 320 },
  { id: "video",  label: "Video",  cx: 120, cy: 320 },
  { id: "logs",   label: "Logs",   cx: 720, cy: 280 },
];

// Pairs that SHOULD connect — drawn as broken (dashed, faded) lines to
// make the disconnection visible, not asserted.
const BROKEN_LINKS = [
  ["erp", "mes"], ["mes", "scada"], ["scada", "iot"],
  ["iot", "video"], ["crm", "erp"], ["logs", "scada"],
  ["video", "iot"], ["crm", "logs"],
];

function nodeById(id: string) {
  return SYSTEMS.find((s) => s.id === id)!;
}
</script>

<template>
  <section class="fragmentation" aria-labelledby="fragmentation-title">
    <div class="fragmentation__inner">
      <p class="section__number">02 · Fragmentation</p>
      <h2 id="fragmentation-title" class="section__title">
        Enterprise systems are disconnected.
      </h2>
      <p class="section__lead">
        ERP, MES, SCADA, sensors, video, CRM, logs — each one knows only its
        slice. Nobody sees the full picture. The data is there. The
        intelligence isn't.
      </p>

      <div class="fragmentation__diagram" data-reveal-item>
        <svg
viewBox="0 0 840 420" class="problem__svg" role="img"
          aria-label="Disconnected enterprise systems shown as isolated circles with broken link lines between them">
          <!-- Broken connections, drawn first so the nodes sit on top. -->
          <g
class="problem__links" stroke="var(--color-divider)" stroke-width="1.5"
            stroke-dasharray="6 8" fill="none">
            <line
              v-for="(pair, i) in BROKEN_LINKS"
              :key="i"
              :x1="nodeById(pair[0]).cx"
              :y1="nodeById(pair[0]).cy"
              :x2="nodeById(pair[1]).cx"
              :y2="nodeById(pair[1]).cy"
            />
          </g>

          <!-- System nodes -->
          <g class="problem__nodes">
            <g v-for="sys in SYSTEMS" :key="sys.id" :transform="`translate(${sys.cx}, ${sys.cy})`">
              <circle r="44" fill="var(--color-bg)" stroke="var(--color-divider)" stroke-width="1.5" />
              <text
text-anchor="middle" dy="0.36em" font-size="14" font-weight="600"
                fill="var(--color-muted-strong)">{{ sys.label }}</text>
            </g>
          </g>
        </svg>
        <p class="problem__caption">
          Each system is its own silo. The connections that should exist — don't.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fragmentation {
  min-height: 100svh;
  padding: 8rem 1.5rem;
  display: flex;
  align-items: center;
}
.fragmentation__inner {
  max-width: 56rem;
  margin: 0 auto;
  width: 100%;
}
.section__number {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-muted);
  margin-bottom: 1.25rem;
}
.section__title {
  font-size: clamp(2.75rem, 7vw, 5.5rem);
  font-weight: 700;
  line-height: 0.98;
  letter-spacing: -0.035em;
  margin-bottom: 1.5rem;
}
.section__lead {
  font-size: 1.25rem;
  line-height: 1.6;
  color: var(--color-muted-strong);
  max-width: 42rem;
  margin-bottom: 3.5rem;
}
.fragmentation__diagram {
  background: var(--color-card);
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-card);
  padding: 2rem 1.5rem;
  box-shadow: var(--shadow-sm);
}
.fragmentation__svg {
  width: 100%;
  height: auto;
  display: block;
}
.fragmentation__caption {
  margin-top: 1.25rem;
  text-align: center;
  font-size: 0.9375rem;
  color: var(--color-muted);
  font-style: italic;
}

@media (max-width: 640px) {
  .fragmentation { padding: 6rem 1.25rem; }
  .section__lead { font-size: 1.0625rem; }
}
</style>