<script setup lang="ts">
// 19 · UNIFICATION — the six division identifiers converge back into one SVARA.
// A simplified divisional convergence (NOT the Ecosystem globe / Products hero).
interface Node { n: string, label: string, x: number, y: number, side: 'l' | 'r' }
const nodes: Node[] = [
  { n: '01', label: 'Deep Tech & Autonomous Intelligence', x: 15, y: 10, side: 'l' },
  { n: '03', label: 'Interactive AI & Simulation', x: 15, y: 30, side: 'l' },
  { n: '05', label: 'One AI OS & Intelligence Platform', x: 15, y: 50, side: 'l' },
  { n: '02', label: 'Business SaaS Studio', x: 85, y: 10, side: 'r' },
  { n: '04', label: 'Digital Engineering', x: 85, y: 30, side: 'r' },
  { n: '06', label: 'Digital Growth & PR Tech', x: 85, y: 50, side: 'r' },
]
const hx = 50
const hy = 30
</script>

<template>
  <section class="duni hx-section">
    <div class="hx-container">
      <header class="duni__head">
        <p class="hx-eyebrow"><span class="hx-index">19</span> One SVARA</p>
        <h2 class="hx-title">Six disciplines. <span class="lite">One unified technology company.</span></h2>
        <p class="hx-lead">Different disciplines. Different expertise. One shared intelligence architecture.</p>
      </header>

      <div class="duni__field">
        <ClientOnly>
          <svg class="duni__wires" viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true">
            <path v-for="node in nodes" :key="node.n" class="duni__wire" :d="`M${node.x} ${node.y} C ${(node.x + hx) / 2} ${node.y}, ${(node.x + hx) / 2} ${hy}, ${hx} ${hy}`" vector-effect="non-scaling-stroke" />
            <circle v-for="(node, i) in nodes" :key="`s-${node.n}`" class="duni__flow" r="0.8" fill="var(--sig)">
              <animateMotion :dur="`${2.8 + (i % 3) * 0.35}s`" :begin="`${i * 0.2}s`" repeatCount="indefinite" :path="`M${node.x} ${node.y} C ${(node.x + hx) / 2} ${node.y}, ${(node.x + hx) / 2} ${hy}, ${hx} ${hy}`" />
            </circle>
          </svg>
        </ClientOnly>

        <div
          v-for="node in nodes"
          :key="node.n"
          class="duni__node"
          :class="`duni__node--${node.side}`"
          :style="{ left: `${node.x}%`, top: `${(node.y / 60) * 100}%` }"
        >
          <span class="duni__node-n">{{ node.n }}</span>
          <span class="duni__node-label">{{ node.label }}</span>
        </div>

        <div class="duni__hub" :style="{ left: `${hx}%`, top: `${(hy / 60) * 100}%` }">
          <span class="duni__hub-dot" />
          <span class="duni__hub-name">SVARA</span>
          <span class="duni__hub-sub hx-mono-label">ONE COMPANY</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Centred. `text-align` alone is not enough: .hx-title and .hx-lead carry their
   own measures (20ch / 40ch), so they need margin-inline to centre as blocks.
   The head's own cap is dropped — it only existed to stop left-aligned copy
   running full width, which the children already handle. */
.duni__head { margin-bottom: clamp(44px, 5vw, 76px);; text-align: center; }
.duni__head .hx-title, .duni__head .hx-lead { margin-inline: auto; }
/* two lines, not a column: this lead is 81 characters, so it needs ~40ch
   to break in half. `balance` evens the two rather than leaving an orphan. */
.duni__head .hx-lead { max-width: 46ch; text-wrap: balance; }
.duni__field { position: relative; width: 100%; aspect-ratio: 100 / 58; }
.duni__wires { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.duni__wire { stroke: rgba(20,34,63,0.13); stroke-width: 1; fill: none; }

.duni__node {
  position: absolute; transform: translate(-50%, -50%); z-index: 2;
  display: inline-flex; align-items: center; gap: 9px; max-width: 40vw; padding: 9px 14px;
  background: rgba(255,255,255,0.6); backdrop-filter: blur(12px);
  border: 1px solid rgba(20,34,63,0.14);
  box-shadow: 0 16px 34px -24px rgba(16,42,91,0.3), inset 0 1px 0 rgba(255,255,255,0.7);
  clip-path: polygon(0 8px, 8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%);
}
.duni__node--r { flex-direction: row-reverse; }
.duni__node-n { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em; color: var(--sig); }
.duni__node-label { font-size: 12px; font-weight: 500; letter-spacing: -0.01em; color: var(--ink-primary); white-space: nowrap; }

.duni__hub {
  position: absolute; transform: translate(-50%, -50%); z-index: 3;
  display: flex; flex-direction: column; align-items: center; gap: 4px; text-align: center; padding: 20px 30px;
  background: radial-gradient(circle at 44% 34%, rgba(255,255,255,0.92), rgba(232,238,246,0.68) 58%, rgba(43,62,99,0.12));
  border: 1px solid rgba(20,34,63,0.2);
  box-shadow: 0 40px 84px -34px rgba(16,42,91,0.48), inset 0 2px 6px rgba(255,255,255,0.8);
  clip-path: polygon(0 14px, 14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%);
}
.duni__hub-dot { width: 9px; height: 9px; border-radius: 50%; background: var(--sig); box-shadow: 0 0 0 4px rgba(63,111,176,0.16); }
.duni__hub-name { font-size: clamp(22px, 2.4vw, 34px); font-weight: 600; letter-spacing: -0.02em; color: var(--ink-primary); line-height: 1; }
.duni__hub-sub { color: var(--ink-muted); }

@media (max-width: 860px) {
  .duni__field { aspect-ratio: auto; display: flex; flex-direction: column; gap: 8px; align-items: stretch; }
  .duni__wires { display: none; }
  .duni__node { position: static; transform: none; max-width: 100%; }
  .duni__node--r { flex-direction: row; }
  .duni__node-label { white-space: normal; }
  .duni__hub { position: static; transform: none; margin: 16px auto 0; }
}
@media (prefers-reduced-motion: reduce) { .duni__flow { animation: none; } }
</style>
