<script setup lang="ts">
import { computed } from 'vue'

interface HudMetric {
  label: string
  value: string
}

const props = withDefaults(defineProps<{
  title: string
  systemId: string
  code?: string
  status?: string
  metrics?: HudMetric[]
  kind?: string
}>(), {
  code: 'DOC 2026',
  status: 'LIVE',
  metrics: () => [],
  kind: 'system',
})

const headMetrics = computed(() => props.metrics.slice(0, 3))
const footMetrics = computed(() => props.metrics.slice(0, 4))
const coord = computed(() => {
  const base = Number.parseInt(props.systemId, 10) || 0
  return `SV-${String(120 + base * 7).padStart(3, '0')}.${String(42 + base * 3).padStart(3, '0')}`
})
</script>

<template>
  <section class="hudw" :data-kind="kind" :aria-label="`${title} intelligence window`">
    <span class="hudw__cut hudw__cut--tl" aria-hidden="true" />
    <span class="hudw__cut hudw__cut--tr" aria-hidden="true" />
    <span class="hudw__cut hudw__cut--bl" aria-hidden="true" />
    <span class="hudw__cut hudw__cut--br" aria-hidden="true" />
    <span class="hudw__rail hudw__rail--l" aria-hidden="true">STREAM / INFERENCE / TELEMETRY</span>
    <span class="hudw__rail hudw__rail--r" aria-hidden="true">SVARA INTELLIGENCE WINDOW</span>

    <header class="hudw__header">
      <div class="hudw__identity">
        <span class="hudw__micro">SYS / {{ systemId }}</span>
        <strong>{{ title }}</strong>
      </div>
      <div class="hudw__state">
        <span class="hudw__live"><i aria-hidden="true" />{{ status }}</span>
        <span>{{ code }}</span>
        <span>COORD / {{ coord }}</span>
      </div>
      <div class="hudw__metrics" aria-hidden="true">
        <span v-for="m in headMetrics" :key="m.label">
          {{ m.label }} <b>{{ m.value }}</b>
        </span>
      </div>
    </header>

    <div class="hudw__canvas">
      <span class="hudw__coord hudw__coord--tl" aria-hidden="true">X0.{{ systemId }} / Y0.{{ systemId }}</span>
      <span class="hudw__coord hudw__coord--br" aria-hidden="true">SIG / 98.4</span>
      <div class="hudw__viewport">
        <slot />
      </div>
    </div>

    <footer class="hudw__footer">
      <span class="hudw__footer-label">LIVE DIAGNOSTIC STREAM</span>
      <span v-for="m in footMetrics" :key="m.label" class="hudw__foot-metric">
        {{ m.label }} / <b>{{ m.value }}</b>
      </span>
      <span class="hudw__footer-tail">LAT / 11MS&nbsp;&nbsp; STATE / NOMINAL</span>
    </footer>
  </section>
</template>

<style scoped>
.hudw {
  --hud-bg: #07101f;
  --hud-bg-2: #0b1630;
  --hud-line: rgba(89, 227, 255, 0.18);
  --hud-line-strong: rgba(89, 227, 255, 0.46);
  --hud-ink: #eaf6ff;
  --hud-muted: rgba(207, 224, 245, 0.62);
  --hud-cyan: #59e3ff;
  position: relative;
  isolation: isolate;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  min-height: clamp(680px, 52vw, 760px);
  width: 100%;
  overflow: hidden;
  color: var(--hud-ink);
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  background:
    radial-gradient(circle at 18% 8%, rgba(89, 227, 255, 0.12), transparent 28%),
    radial-gradient(circle at 86% 78%, rgba(77, 141, 255, 0.12), transparent 32%),
    linear-gradient(145deg, var(--hud-bg-2), var(--hud-bg) 56%, #040b17);
  border: 1px solid rgba(89, 227, 255, 0.24);
  clip-path: polygon(0 0, calc(100% - 34px) 0, 100% 34px, 100% 100%, 34px 100%, 0 calc(100% - 34px));
  box-shadow:
    0 54px 120px -56px rgba(4, 12, 30, 0.9),
    inset 0 0 0 1px rgba(255, 255, 255, 0.025),
    inset 0 0 80px rgba(1, 8, 22, 0.88);
}

.hudw::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -2;
  background-image:
    linear-gradient(rgba(89, 227, 255, 0.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(89, 227, 255, 0.055) 1px, transparent 1px),
    linear-gradient(135deg, transparent 0 48%, rgba(89, 227, 255, 0.06) 49%, transparent 50%);
  background-size: 32px 32px, 32px 32px, 100% 100%;
  mask-image: linear-gradient(180deg, transparent, #000 10%, #000 88%, transparent);
  pointer-events: none;
}

.hudw::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: -22%;
  height: 22%;
  z-index: 4;
  background: linear-gradient(180deg, transparent, rgba(89, 227, 255, 0.085), transparent);
  mix-blend-mode: screen;
  animation: hudw-scan 8s linear infinite;
  pointer-events: none;
}

.hudw__header,
.hudw__footer {
  position: relative;
  z-index: 2;
  display: grid;
  align-items: center;
  gap: 14px;
  min-width: 0;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.hudw__header {
  grid-template-columns: minmax(0, 1fr) auto;
  grid-template-areas:
    "identity state"
    "metrics metrics";
  padding: 15px 20px 14px;
  border-bottom: 1px solid var(--hud-line);
  background: linear-gradient(90deg, rgba(7, 16, 31, 0.94), rgba(12, 29, 55, 0.72));
}

.hudw__identity {
  grid-area: identity;
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
}

.hudw__identity strong {
  display: block;
  overflow: hidden;
  color: #fff;
  font-family: var(--font-sans, system-ui, sans-serif);
  font-size: clamp(13px, 1.15vw, 17px);
  font-weight: 650;
  letter-spacing: 0.02em;
  line-height: 1.1;
  white-space: normal;
}

.hudw__micro,
.hudw__state,
.hudw__metrics,
.hudw__footer {
  font-size: 10px;
  line-height: 1.35;
}

.hudw__micro,
.hudw__state,
.hudw__metrics span,
.hudw__footer-label,
.hudw__footer-tail,
.hudw__foot-metric {
  color: var(--hud-muted);
}

.hudw__state {
  grid-area: state;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  min-width: 0;
  white-space: nowrap;
}

.hudw__state span:last-child {
  display: none;
}

.hudw__live {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: var(--hud-cyan);
  font-weight: 700;
}

.hudw__live i {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: var(--hud-cyan);
  box-shadow: 0 0 14px rgba(89, 227, 255, 0.9);
  animation: hudw-live 1.45s steps(1) infinite;
}

.hudw__metrics {
  grid-area: metrics;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  min-width: 0;
}

.hudw__metrics span {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  min-width: 0;
  padding: 6px 8px;
  border: 1px solid rgba(89, 227, 255, 0.12);
  background: rgba(89, 227, 255, 0.045);
  white-space: normal;
}

.hudw__metrics b,
.hudw__foot-metric b {
  color: #fff;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.hudw__canvas {
  position: relative;
  z-index: 1;
  min-height: 0;
  padding: clamp(16px, 2vw, 28px);
}

.hudw__viewport {
  position: relative;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  border: 1px solid rgba(89, 227, 255, 0.16);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.018), transparent 20%),
    rgba(4, 12, 28, 0.62);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.018),
    inset 0 0 56px rgba(0, 0, 0, 0.28);
}

.hudw__viewport::before,
.hudw__viewport::after {
  content: "";
  position: absolute;
  z-index: 3;
  pointer-events: none;
}

.hudw__viewport::before {
  inset: 12px;
  border: 1px solid rgba(89, 227, 255, 0.08);
}

.hudw__viewport::after {
  inset: 0;
  background: repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.025) 0 1px, transparent 1px 4px);
  opacity: 0.28;
  mix-blend-mode: screen;
}

.hudw__footer {
  grid-template-columns: minmax(128px, auto) repeat(4, minmax(92px, 1fr)) auto;
  padding: 12px 20px 14px;
  border-top: 1px solid var(--hud-line);
  background: linear-gradient(90deg, rgba(7, 16, 31, 0.95), rgba(12, 29, 55, 0.72));
}

.hudw__footer-label {
  color: var(--hud-cyan);
  font-weight: 700;
  white-space: nowrap;
}

.hudw__footer-tail {
  justify-self: end;
  white-space: nowrap;
}

.hudw__cut {
  position: absolute;
  z-index: 5;
  width: 28px;
  height: 28px;
  border-color: var(--hud-line-strong);
  border-style: solid;
  pointer-events: none;
}

.hudw__cut--tl { top: 10px; left: 10px; border-width: 1px 0 0 1px; }
.hudw__cut--tr { top: 10px; right: 10px; border-width: 1px 1px 0 0; }
.hudw__cut--bl { bottom: 10px; left: 10px; border-width: 0 0 1px 1px; }
.hudw__cut--br { right: 10px; bottom: 10px; border-width: 0 1px 1px 0; }

.hudw__coord {
  position: absolute;
  z-index: 4;
  color: rgba(167, 242, 255, 0.48);
  font-size: 9px;
  letter-spacing: 0.12em;
  pointer-events: none;
}

.hudw__coord--tl { top: 7px; left: clamp(18px, 2.2vw, 32px); }
.hudw__coord--br { right: clamp(18px, 2.2vw, 32px); bottom: 7px; }

.hudw__rail {
  position: absolute;
  top: 50%;
  z-index: 4;
  color: rgba(167, 242, 255, 0.3);
  font-size: 8px;
  letter-spacing: 0.32em;
  line-height: 1;
  text-transform: uppercase;
  writing-mode: vertical-rl;
  pointer-events: none;
}

.hudw__rail--l {
  left: 7px;
  transform: translateY(-50%) rotate(180deg);
}

.hudw__rail--r {
  right: 7px;
  transform: translateY(-50%);
}

@keyframes hudw-live {
  50% { opacity: 0.35; }
}

@keyframes hudw-scan {
  to { top: 118%; }
}

@media (max-width: 1120px) {
  .hudw {
    min-height: clamp(600px, 68vw, 700px);
  }

  .hudw__header {
    grid-template-columns: 1fr;
    grid-template-areas:
      "identity"
      "state"
      "metrics";
  }

  .hudw__metrics {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .hudw__state {
    flex-wrap: wrap;
  }

  .hudw__footer {
    grid-template-columns: 1fr 1fr;
  }

  .hudw__footer-tail {
    justify-self: start;
  }
}

@media (max-width: 720px) {
  .hudw {
    min-height: 680px;
    clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px));
  }

  .hudw__header {
    padding: 13px 14px;
  }

  .hudw__metrics {
    grid-template-columns: 1fr;
  }

  .hudw__canvas {
    padding: 14px;
  }

  .hudw__footer {
    gap: 8px 12px;
    padding: 11px 14px 13px;
    font-size: 9px;
  }

  .hudw__rail,
  .hudw__coord {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hudw::after,
  .hudw__live i {
    animation: none;
  }
}
</style>
