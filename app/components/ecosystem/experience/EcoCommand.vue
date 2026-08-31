<script setup lang="ts">
// 11 · COMMAND CENTER — the climax. Every intelligence layer established across
// the page converges here into one control core: radial convergence, live scan,
// inbound signals. The final control layer of the whole architecture — not a
// generic analytics dashboard.
const layers = ['PHYSICAL', 'SENSE', 'PROCESS', 'UNDERSTAND', 'REASON', 'SIMULATE', 'ORCHESTRATE', 'OPERATE']
const spokes = layers.map((label, i) => {
  const a = ((i * 45 - 90) * Math.PI) / 180
  return {
    label,
    x2: 200 + Math.cos(a) * 148,
    y2: 200 + Math.sin(a) * 148,
    lx: 200 + Math.cos(a) * 176,
    ly: 200 + Math.sin(a) * 176 + 3,
    anchor: Math.abs(Math.cos(a)) < 0.3 ? 'middle' : Math.cos(a) > 0 ? 'start' : 'end',
  }
})
const readouts = [
  { k: 'SIGNALS', v: '12,480/s' },
  { k: 'SYSTEMS', v: '08 / 08' },
  { k: 'UPTIME', v: '100%' },
]
</script>

<template>
  <section class="cmd hx-section">
    <div class="hx-container">
      <div class="cmd__console">
        <span class="cmd__mount tl" /><span class="cmd__mount tr" /><span class="cmd__mount bl" /><span class="cmd__mount br" />
        <span class="cmd__code hx-mono">SVARA · COMMAND / CC-01</span>

        <div class="cmd__left">
          <p class="hx-eyebrow"><span class="hx-index">11</span> Command Center</p>
          <h2 class="cmd__title">Every signal.<br>Every system.<br><span class="lite">One command.</span></h2>
          <p class="cmd__body">Every intelligence pathway across the ecosystem resolves into one control layer — unified visibility, unified orchestration, one place to command it all.</p>
          <dl class="cmd__readouts">
            <div v-for="r in readouts" :key="r.k" class="cmd__readout">
              <dt class="hx-mono-label">{{ r.k }}</dt>
              <dd class="cmd__readout-v">{{ r.v }}</dd>
            </div>
          </dl>
        </div>

        <div class="cmd__stage" aria-hidden="true">
          <ClientOnly>
            <svg class="cmd__svg" viewBox="-48 -14 496 428">
              <defs>
                <radialGradient id="cmdGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0" stop-color="#8fb0d8" stop-opacity="0.3" />
                  <stop offset="0.6" stop-color="#8fb0d8" stop-opacity="0.05" />
                  <stop offset="1" stop-color="#8fb0d8" stop-opacity="0" />
                </radialGradient>
                <radialGradient id="cmdCore" cx="42%" cy="38%" r="70%">
                  <stop offset="0" stop-color="#ffffff" stop-opacity="0.95" />
                  <stop offset="0.45" stop-color="#c7d4e6" stop-opacity="0.82" />
                  <stop offset="1" stop-color="#2b3e63" stop-opacity="0.88" />
                </radialGradient>
                <linearGradient id="cmdSweep" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stop-color="#8fb0d8" stop-opacity="0" />
                  <stop offset="1" stop-color="#8fb0d8" stop-opacity="0.4" />
                </linearGradient>
              </defs>
              <circle cx="200" cy="200" r="180" fill="url(#cmdGlow)" />
              <circle cx="200" cy="200" r="150" fill="none" stroke="#14223f" stroke-opacity="0.1" />
              <circle cx="200" cy="200" r="110" fill="none" stroke="#14223f" stroke-opacity="0.08" />
              <circle class="cmd-seg" cx="200" cy="200" r="130" fill="none" stroke="#9aa3b2" stroke-opacity="0.5" stroke-width="1.2" stroke-dasharray="90 30 50 160 60 40" />
              <!-- convergence spokes + inbound signals -->
              <g class="cmd-spokes" stroke="#14223f" stroke-opacity="0.14" stroke-width="1">
                <line v-for="s in spokes" :key="s.label" x1="200" y1="200" :x2="s.x2" :y2="s.y2" />
              </g>
              <circle v-for="(s, i) in spokes" :key="`sig-${s.label}`" class="cmd-sig" r="2.4" fill="var(--sig)">
                <animateMotion :dur="`${3 + (i % 4) * 0.4}s`" :begin="`${i * 0.25}s`" repeatCount="indefinite" :path="`M${s.x2} ${s.y2} L200 200`" />
              </circle>
              <!-- scan -->
              <g class="cmd-scan">
                <path d="M200 200 L200 52 A148 148 0 0 1 305 95 Z" fill="url(#cmdSweep)" opacity="0.3" />
                <line x1="200" y1="200" x2="200" y2="52" stroke="var(--sig)" stroke-width="1.4" stroke-opacity="0.8" />
              </g>
              <!-- command core -->
              <circle class="cmd-pulse" cx="200" cy="200" r="34" fill="none" stroke="var(--sig)" stroke-opacity="0.5" stroke-width="1" />
              <circle cx="200" cy="200" r="30" fill="url(#cmdCore)" stroke="#14223f" stroke-opacity="0.2" />
              <ellipse cx="191" cy="191" rx="9" ry="6" fill="#fff" fill-opacity="0.7" />
              <!-- layer labels -->
              <text v-for="s in spokes" :key="`t-${s.label}`" :x="s.lx" :y="s.ly" :text-anchor="s.anchor" class="cmd-tx">{{ s.label }}</text>
            </svg>
          </ClientOnly>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cmd__console {
  position: relative; overflow: hidden;
  display: grid; grid-template-columns: 0.9fr 1.1fr; gap: clamp(32px, 4vw, 72px); align-items: center;
  padding: clamp(40px, 5vw, 80px);
  background: linear-gradient(158deg, rgba(255,255,255,0.5), rgba(255,255,255,0.26));
  border: 1px solid rgba(20,34,63,0.18);
  box-shadow: 0 60px 130px -56px rgba(16,42,91,0.5), inset 0 1px 0 rgba(255,255,255,0.6);
  clip-path: polygon(0 22px, 22px 0, calc(100% - 22px) 0, 100% 22px, 100% calc(100% - 22px), calc(100% - 22px) 100%, 22px 100%, 0 calc(100% - 22px));
}
.cmd__mount { position: absolute; width: 9px; height: 9px; border-radius: 50%; border: 1px solid rgba(20,34,63,0.3); background: rgba(255,255,255,0.7); z-index: 3; }
.cmd__mount.tl { top: 18px; left: 18px; } .cmd__mount.tr { top: 18px; right: 18px; } .cmd__mount.bl { bottom: 18px; left: 18px; } .cmd__mount.br { bottom: 18px; right: 18px; }
.cmd__code { position: absolute; top: 20px; left: 50%; transform: translateX(-50%); font-size: 9px; letter-spacing: 0.18em; color: var(--ink-muted); z-index: 3; }

.cmd__left { position: relative; z-index: 2; }
.cmd__title { margin: 22px 0 0; font-size: clamp(38px, 4.4vw, 68px); font-weight: 600; letter-spacing: -0.03em; line-height: 0.98; color: var(--ink-primary); }
.cmd__title .lite { color: var(--sig); }
.cmd__body { margin: 24px 0 0; max-width: 42ch; font-size: var(--type-lead); line-height: 1.55; color: var(--ink-secondary); }
.cmd__readouts { display: flex; flex-wrap: wrap; gap: 28px; margin: 32px 0 0; }
.cmd__readout dt { color: var(--ink-muted); }
.cmd__readout-v { margin: 6px 0 0; font-family: var(--font-mono); font-size: clamp(20px, 2vw, 28px); font-weight: 500; letter-spacing: -0.01em; color: var(--ink-primary); }

.cmd__stage { position: relative; z-index: 1; }
.cmd__svg { width: 100%; height: auto; display: block; }
.cmd-seg, .cmd-scan, .cmd-pulse { transform-origin: 200px 200px; }
.cmd-seg { animation: cmd-spin 50s linear infinite; }
.cmd-scan { animation: cmd-spin 9s linear infinite; }
.cmd-pulse { animation: cmd-pulse 3.4s ease-in-out infinite; }
.cmd-tx { font-family: var(--font-mono); font-size: 8px; letter-spacing: 0.1em; fill: #7a869e; }
@keyframes cmd-spin { to { transform: rotate(360deg); } }
@keyframes cmd-pulse { 0%, 100% { transform: scale(1); opacity: 0.5; } 50% { transform: scale(1.3); opacity: 0.15; } }

@media (max-width: 900px) {
  .cmd__console { grid-template-columns: 1fr; gap: 20px; }
  .cmd__stage { max-width: 460px; margin: 0 auto; }
}
@media (prefers-reduced-motion: reduce) {
  .cmd-seg, .cmd-scan, .cmd-pulse, .cmd-sig { animation: none; }
}
</style>
