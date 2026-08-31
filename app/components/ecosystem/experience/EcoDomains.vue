<script setup lang="ts">
// 08 · THREE INTELLIGENCE DOMAINS — physical, cognitive, simulation — as three
// large alternating editorial compositions with bespoke engineered visuals,
// not stacked product cards.
interface Domain { n: string, kicker: string, title: string, body: string, prods: string[], key: string }
const domains: Domain[] = [
  { n: 'A', kicker: 'Physical Intelligence', title: 'See. Sense. Understand.', key: 'physical',
    body: 'Intelligence enters SVARA from cameras, machines, environments and aerial systems — the physical world, perceived continuously and turned into structured signal.',
    prods: ['Vision AI', 'Drone AI', 'Edge AI'] },
  { n: 'B', kicker: 'Cognitive Intelligence', title: 'Understand. Reason. Act.', key: 'cognitive',
    body: 'Information becomes reasoning and autonomous action — models that understand context, agents that decide and execute across enterprise systems.',
    prods: ['Generative AI', 'AI Agents'] },
  { n: 'C', kicker: 'Simulation Intelligence', title: 'Model reality. Predict what comes next.', key: 'simulation',
    body: 'Physical infrastructure gains a precise simulated counterpart — test, predict and optimise outcomes before committing a change in the real world.',
    prods: ['Digital Twin'] },
]
</script>

<template>
  <section class="dom hx-section">
    <div class="hx-container">
      <header class="dom__head">
        <p class="hx-eyebrow"><span class="hx-index">08</span> Intelligence Domains</p>
        <h2 class="hx-title">Three domains. <span class="lite">One flow of intelligence.</span></h2>
      </header>

      <div class="dom__rows">
        <article v-for="d in domains" :key="d.key" class="dom__row">
          <div class="dom__copy">
            <p class="dom__kicker hx-mono-label"><span class="dom__n">{{ d.n }}</span> · {{ d.kicker }}</p>
            <h3 class="dom__title">{{ d.title }}</h3>
            <p class="dom__body">{{ d.body }}</p>
            <div class="dom__prods">
              <span v-for="p in d.prods" :key="p" class="dom__chip">{{ p }}</span>
            </div>
          </div>

          <div class="dom__visual hx-panel">
            <span class="hx-pin tl" /><span class="hx-pin tr" /><span class="hx-pin bl" /><span class="hx-pin br" />
            <span class="dom__v-code hx-mono">{{ d.kicker.toUpperCase() }}</span>

            <!-- PHYSICAL: sources converge into the edge -->
            <svg v-if="d.key === 'physical'" class="dom__svg" viewBox="0 0 340 210" fill="none">
              <g stroke="rgba(20,34,63,0.2)" stroke-width="1.2">
                <path d="M78 46 L210 105 M78 105 L210 105 M78 164 L210 105" />
              </g>
              <g class="dom__sig" fill="var(--sig)">
                <circle r="3"><animateMotion dur="3s" repeatCount="indefinite" path="M78 46 L210 105" /></circle>
                <circle r="3"><animateMotion dur="3.6s" begin="0.5s" repeatCount="indefinite" path="M78 105 L210 105" /></circle>
                <circle r="3"><animateMotion dur="3.2s" begin="1s" repeatCount="indefinite" path="M78 164 L210 105" /></circle>
              </g>
              <g font-family="var(--font-mono)" font-size="9" fill="#55607A">
                <rect x="26" y="34" width="52" height="24" rx="2" fill="rgba(255,255,255,0.6)" stroke="rgba(20,34,63,0.2)" /><text x="34" y="49">CAMERA</text>
                <rect x="26" y="93" width="52" height="24" rx="2" fill="rgba(255,255,255,0.6)" stroke="rgba(20,34,63,0.2)" /><text x="34" y="108">DRONE</text>
                <rect x="26" y="152" width="52" height="24" rx="2" fill="rgba(255,255,255,0.6)" stroke="rgba(20,34,63,0.2)" /><text x="34" y="167">SENSOR</text>
              </g>
              <circle cx="228" cy="105" r="26" fill="rgba(63,111,176,0.06)" stroke="var(--sig)" stroke-width="1.4" />
              <text x="228" y="102" text-anchor="middle" font-family="var(--font-mono)" font-size="9" fill="#14223f">EDGE</text>
              <text x="228" y="114" text-anchor="middle" font-family="var(--font-mono)" font-size="8" fill="#7a869e">AI</text>
            </svg>

            <!-- COGNITIVE: stream → reasoning core → action -->
            <svg v-else-if="d.key === 'cognitive'" class="dom__svg" viewBox="0 0 340 210" fill="none">
              <g fill="rgba(20,34,63,0.35)"><circle cx="34" cy="70" r="2.5" /><circle cx="34" cy="105" r="2.5" /><circle cx="34" cy="140" r="2.5" /><circle cx="58" cy="88" r="2.5" /><circle cx="58" cy="122" r="2.5" /></g>
              <g stroke="rgba(20,34,63,0.16)" stroke-width="1"><path d="M60 88 L128 105 M60 122 L128 105 M40 70 L128 105 M40 140 L128 105" /></g>
              <circle cx="170" cy="105" r="42" fill="none" stroke="rgba(20,34,63,0.12)" />
              <circle class="dom__spin" cx="170" cy="105" r="42" fill="none" stroke="var(--sig)" stroke-width="1.6" stroke-dasharray="40 200" stroke-linecap="round" />
              <circle cx="170" cy="105" r="16" fill="rgba(63,111,176,0.1)" stroke="var(--sig)" stroke-width="1.2" />
              <text x="170" y="108" text-anchor="middle" font-family="var(--font-mono)" font-size="8" fill="#14223f">REASON</text>
              <g stroke="var(--sig)" stroke-width="1.4"><path d="M212 88 H300 M212 105 H300 M212 122 H288" /></g>
              <g class="dom__sig" fill="var(--sig)"><circle r="3"><animateMotion dur="2.4s" repeatCount="indefinite" path="M212 105 H300" /></circle></g>
              <text x="306" y="94" font-family="var(--font-mono)" font-size="8" fill="#55607A">ACT</text>
            </svg>

            <!-- SIMULATION: real object mirrored into a digital twin -->
            <svg v-else class="dom__svg" viewBox="0 0 340 210" fill="none">
              <line x1="170" y1="16" x2="170" y2="194" stroke="rgba(20,34,63,0.16)" stroke-dasharray="3 4" />
              <text x="86" y="26" text-anchor="middle" font-family="var(--font-mono)" font-size="8" fill="#7a869e">REAL</text>
              <text x="254" y="26" text-anchor="middle" font-family="var(--font-mono)" font-size="8" fill="var(--sig)">TWIN</text>
              <g stroke="rgba(20,34,63,0.34)" stroke-width="1.3">
                <path d="M54 150 L110 122 L110 74 L54 102 Z" fill="rgba(255,255,255,0.5)" />
                <path d="M110 74 L134 86 L134 134 L110 122" fill="rgba(20,34,63,0.05)" />
                <path d="M54 102 L78 114 L134 86 M78 114 L78 162 L134 134 M78 162 L110 150" />
              </g>
              <g stroke="var(--sig)" stroke-width="1.2" stroke-dasharray="4 3">
                <path d="M286 150 L230 122 L230 74 L286 102 Z" fill="rgba(63,111,176,0.05)" />
                <path d="M230 74 L206 86 L206 134 L230 122" />
                <path d="M286 102 L262 114 L206 86 M262 114 L262 162 L206 134 M262 162 L230 150" />
              </g>
              <circle class="dom__pulse" cx="170" cy="105" r="6" fill="var(--sig)" />
            </svg>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dom__head { margin-bottom: clamp(48px, 6vw, 90px); }
.dom__rows { display: flex; flex-direction: column; gap: clamp(72px, 10vw, 140px); }
.dom__row { display: grid; grid-template-columns: 1fr 1.02fr; gap: clamp(40px, 6vw, 90px); align-items: center; }
.dom__row:nth-child(even) .dom__copy { order: 2; }

.dom__kicker { color: var(--ink-muted); }
.dom__n { color: var(--sig); font-weight: 600; }
.dom__title { margin: 16px 0 0; font-size: clamp(32px, 4vw, 60px); font-weight: 600; letter-spacing: -0.03em; line-height: 1.0; color: var(--ink-primary); text-wrap: balance; max-width: 15ch; }
.dom__body { margin: 22px 0 0; max-width: 44ch; font-size: var(--type-lead); line-height: 1.55; color: var(--ink-secondary); letter-spacing: -0.01em; }
.dom__prods { margin-top: 26px; display: flex; flex-wrap: wrap; gap: 10px; }
.dom__chip { font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.04em; color: var(--ink-primary); padding: 7px 14px; border: 1px solid rgba(20,34,63,0.16); border-radius: var(--radius-pill); background: rgba(255,255,255,0.5); }

.dom__visual { position: relative; aspect-ratio: 340 / 210; padding: 14px; overflow: hidden; }
.dom__v-code { position: absolute; top: 12px; left: 16px; z-index: 2; font-size: 9.5px; letter-spacing: 0.14em; color: var(--ink-muted); }
.dom__svg { position: absolute; inset: 14px; width: calc(100% - 28px); height: calc(100% - 28px); margin-top: 10px; }
.dom__spin { transform-origin: 170px 105px; animation: dom-spin 8s linear infinite; }
.dom__pulse { animation: dom-pulse 3s ease-in-out infinite; }
@keyframes dom-spin { to { transform: rotate(360deg); } }
@keyframes dom-pulse { 0%, 100% { opacity: 0.5; r: 6; } 50% { opacity: 1; r: 8; } }

@media (max-width: 900px) {
  .dom__row { grid-template-columns: 1fr; gap: 30px; }
  .dom__row:nth-child(even) .dom__copy { order: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .dom__spin, .dom__pulse, .dom__sig circle { animation: none; }
}
</style>
