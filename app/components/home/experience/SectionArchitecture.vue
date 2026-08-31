<script setup lang="ts">
// 05 · ONE INTELLIGENCE ARCHITECTURE — the technical spine of the story.
// Physical sensing → edge → models → agents/simulation → enterprise software
// → command, rendered as one layered stack threaded by an edge-to-command
// data riser with an upward-travelling signal. The strongest storytelling beat.
interface Layer { n: string, name: string, tags: string[] }
const layers: Layer[] = [
  { n: '06', name: 'Command & Control', tags: ['One AI OS', 'Decisions', 'Live dashboards'] },
  { n: '05', name: 'Enterprise Software', tags: ['Business Cloud', 'Workflows', 'Integrations'] },
  { n: '04', name: 'Agents & Simulation', tags: ['AI Agents', 'Digital Twin', 'Scenarios'] },
  { n: '03', name: 'AI Models', tags: ['Vision', 'Generative', 'Predictive'] },
  { n: '02', name: 'Edge Intelligence', tags: ['On-site inference', 'Sensor fusion', 'Low latency'] },
  { n: '01', name: 'Physical World', tags: ['Cameras', 'Drones', 'Sensors', 'Machines'] },
]
</script>

<template>
  <section class="ar hx-section">
    <div class="hx-container ar__grid">
      <header class="ar__head">
        <p class="hx-eyebrow"><span class="hx-index">05</span> One Architecture</p>
        <h2 class="hx-title">From the sensor <span class="lite">to the decision</span> — one continuous stack.</h2>
        <p class="hx-lead">Physical-world sensing, edge intelligence, AI models, agents, simulation and enterprise software resolve into a single command layer. Signal rises from the edge to the decision without a seam.</p>
        <div class="ar__flow hx-mono-label" aria-hidden="true">
          <span>EDGE</span>
          <svg width="10" height="42" viewBox="0 0 10 42" fill="none"><path d="M5 42V4M5 4L1 8M5 4L9 8" stroke="var(--sig)" stroke-width="1.2" /></svg>
          <span>COMMAND</span>
        </div>
      </header>

      <div class="ar__stack">
        <span class="ar__riser" aria-hidden="true" />
        <span class="ar__signal" aria-hidden="true" />
        <div
          v-for="l in layers"
          :key="l.n"
          class="ar__layer"
          :class="{ 'ar__layer--top': l.n === '06', 'ar__layer--base': l.n === '01' }"
        >
          <span class="ar__node" aria-hidden="true" />
          <span class="ar__n hx-mono">{{ l.n }}</span>
          <h3 class="ar__name">{{ l.name }}</h3>
          <ul class="ar__tags">
            <li v-for="t in l.tags" :key="t">{{ t }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ar__grid { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: clamp(48px, 6vw, 110px); align-items: start; }
.ar__head { position: sticky; top: 120px; }
.ar__flow { display: inline-flex; flex-direction: column; align-items: center; gap: 8px; margin-top: 40px; color: var(--ink-muted); }

.ar__stack { position: relative; padding-left: 34px; display: flex; flex-direction: column; gap: 12px; }
.ar__riser { position: absolute; left: 10px; top: 14px; bottom: 14px; width: 1px; background: linear-gradient(180deg, rgba(20,34,63,0.05), rgba(20,34,63,0.2) 30%, rgba(20,34,63,0.2) 70%, rgba(20,34,63,0.05)); }
.ar__signal {
  position: absolute; left: 7.5px; bottom: 14px; width: 6px; height: 6px; border-radius: 50%;
  background: var(--sig); box-shadow: 0 0 0 4px rgba(63, 111, 176, 0.14);
  animation: ar-rise 5.5s var(--ease-smooth) infinite;
}
@keyframes ar-rise {
  0% { bottom: 14px; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { bottom: calc(100% - 14px); opacity: 0; }
}

.ar__layer {
  position: relative; padding: 20px 24px;
  display: grid; grid-template-columns: auto 1fr; grid-template-rows: auto auto; gap: 4px 16px; align-items: center;
  background: linear-gradient(158deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.28));
  backdrop-filter: blur(14px);
  border: 1px solid rgba(20, 34, 63, 0.12);
  box-shadow: 0 20px 44px -34px rgba(16, 42, 91, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.6);
  clip-path: polygon(0 12px, 12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%);
}
.ar__node { position: absolute; left: -29px; top: 50%; transform: translateY(-50%); width: 11px; height: 11px; border-radius: 50%; background: #fff; border: 1px solid rgba(20, 34, 63, 0.3); }
.ar__n { grid-row: span 2; font-size: 13px; color: var(--ink-muted); align-self: center; }
.ar__name { margin: 0; font-size: clamp(18px, 1.9vw, 24px); font-weight: 600; letter-spacing: -0.015em; color: var(--ink-primary); }
.ar__tags { grid-column: 2; list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 6px 8px; }
.ar__tags li {
  font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.04em; color: var(--ink-secondary);
  padding: 4px 9px; border: 1px solid rgba(20, 34, 63, 0.12); border-radius: var(--radius-pill); background: rgba(255, 255, 255, 0.4);
}
/* the two anchors of the stack read stronger */
.ar__layer--top { background: linear-gradient(158deg, rgba(255, 255, 255, 0.72), rgba(255, 255, 255, 0.44)); }
.ar__layer--top .ar__node { background: var(--sig); border-color: var(--sig); box-shadow: 0 0 0 4px rgba(63, 111, 176, 0.14); }
.ar__layer--base { background: linear-gradient(158deg, rgba(232, 238, 246, 0.6), rgba(255, 255, 255, 0.3)); }

@media (max-width: 900px) {
  .ar__grid { grid-template-columns: 1fr; gap: 44px; }
  .ar__head { position: static; }
}
@media (prefers-reduced-motion: reduce) { .ar__signal { animation: none; opacity: 0; } }
</style>
