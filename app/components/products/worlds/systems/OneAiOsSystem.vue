<script setup lang="ts">
// ONE AI OS — the operating system for enterprise intelligence. Enterprise systems
// stream into a central SVARA AI CORE while a natural-language command console
// runs live: commands are issued and the OS responds (revenue risk, workflow
// creation…). Deterministic SIMULATED transcript; SSR-safe.
import { reactive, ref } from 'vue'
import { useTicker, wave } from '~/composables/useSystemSim'

const root = ref<HTMLElement | null>(null)

const SYS = ['SAP', 'SALESFORCE', 'MICROSOFT', 'GOOGLE', 'ZOHO', 'TALLY', 'CRM', 'ERP', 'HRMS', 'LMS']
const nodes = SYS.map((label, i) => {
  const a = (-90 + i * 36) * Math.PI / 180
  return { label, x: 50 + 40 * Math.cos(a), y: 36 + 27 * Math.sin(a), dur: 1.6 + (i % 5) * 0.4 }
})

// flattened command/response transcript sequence
const SEQ: { k: 'cmd' | 'res' | 'ok'; t: string }[] = [
  { k: 'cmd', t: 'Show me today’s revenue risk.' },
  { k: 'res', t: 'REVENUE RISK        ₹18.4L' },
  { k: 'res', t: 'HIGH-RISK PIPELINES 7' },
  { k: 'res', t: 'PRIMARY DRIVER      REGION SOUTH' },
  { k: 'cmd', t: 'Create a follow-up workflow for high-risk leads.' },
  { k: 'ok', t: 'AGENT CREATED' },
  { k: 'ok', t: 'WORKFLOW DEPLOYED' },
  { k: 'ok', t: 'CRM UPDATED' },
]
const log = ref<{ k: string; t: string }[]>(SEQ.slice(0, 4))
let step = 4, lastLine = 0
const commandsMin = ref(342)
const uptime = ref(99.98)

// Headline figures settle on a beat instead of re-rolling every frame. Sweeping
// 210-480 and rounding each tick made the readout churn; a real console updates
// its counters, it does not flicker them.
let lastMetric = -99

useTicker((t) => {
  if (t - lastMetric > 1.1) {
    lastMetric = t
    commandsMin.value = Math.round(wave(t, 3, 210, 480))
    uptime.value = +wave(t, 7, 99.94, 99.99).toFixed(2)
  }
  if (t - lastLine > 1.2) {
    lastLine = t
    log.value = [...log.value, SEQ[step % SEQ.length]!].slice(-7)
    step++
  }
}, { fps: 6, rootRef: root })
</script>

<template>
  <div ref="root" class="os">
    <div class="os__bar">
      <span class="os__chip">CONNECTED SYSTEMS <em>{{ SYS.length }}</em></span>
      <span class="os__chip">COMMANDS/MIN <em>{{ commandsMin }}</em></span>
      <span class="os__chip os__chip--grow">UPTIME <em>{{ uptime }}%</em></span>
    </div>

    <div class="os__body">
      <div class="os__hub">
        <svg viewBox="0 0 100 72" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <g v-for="(n, i) in nodes" :key="`l${i}`">
            <line x1="50" y1="36" :x2="n.x" :y2="n.y" class="os__link" />
            <circle r="0.9" class="os__pk"><animateMotion :dur="`${n.dur}s`" repeatCount="indefinite" :path="`M${n.x} ${n.y} L50 36`" /></circle>
          </g>
          <g v-for="(n, i) in nodes" :key="`n${i}`" class="os__node">
            <circle :cx="n.x" :cy="n.y" r="2.6" />
            <text :x="n.x" :y="n.y + (n.y < 36 ? -3.6 : 5)" text-anchor="middle">{{ n.label }}</text>
          </g>
          <circle cx="50" cy="36" r="11" class="os__core-halo" />
          <circle cx="50" cy="36" r="7.5" class="os__core" />
          <text x="50" y="34.5" text-anchor="middle" class="os__core-t1">SVARA</text>
          <text x="50" y="39" text-anchor="middle" class="os__core-t2">AI CORE</text>
        </svg>
      </div>

      <div class="os__console">
        <span class="os__console-h">COMMAND CONSOLE</span>
        <div class="os__log">
          <p v-for="(l, i) in log" :key="i" class="os__line" :class="`os__line--${l.k}`">
            <span v-if="l.k === 'cmd'" class="os__pr">&gt;</span><span v-else-if="l.k === 'ok'" class="os__ok">✓</span><span v-else class="os__dot">·</span>
            {{ l.t }}
          </p>
          <p class="os__line os__line--caret"><span class="os__pr">&gt;</span><span class="os__caret">_</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.os { position: absolute; inset: 7% 5% 5%; background: #07101f; border-radius: 6px; overflow: hidden; display: flex; flex-direction: column; font-family: var(--font-mono, ui-monospace, monospace); color: #cfe0f5; box-shadow: inset 0 0 0 1px rgba(103, 232, 249, 0.12), inset 0 0 60px rgba(3, 12, 26, 0.9); }
.os__bar { display: flex; align-items: center; gap: 10px; padding: 6px 10px; border-bottom: 1px solid rgba(103, 232, 249, 0.14); font-size: 8px; letter-spacing: 0.08em; }
.os__chip { color: rgba(207, 224, 245, 0.6); text-transform: uppercase; white-space: nowrap; }
.os__chip em { color: #eaf6ff; font-style: normal; font-weight: 600; }
.os__chip--grow { margin-left: auto; }

.os__body { flex: 1; display: flex; min-height: 0; }
.os__hub { flex: 1.3; min-width: 0; display: grid; place-items: center; padding: 4px; }
.os__hub svg { width: 100%; height: 100%; }
.os__link { stroke: rgba(103, 232, 249, 0.2); stroke-width: 0.35; }
.os__pk { fill: #67e8f9; }
.os__node circle { fill: #0b1830; stroke: rgba(103, 232, 249, 0.5); stroke-width: 0.5; }
.os__node text { fill: rgba(207, 224, 245, 0.7); font-size: 2.5px; letter-spacing: 0.02em; }
.os__core-halo { fill: rgba(108, 135, 254, 0.14); animation: os-breathe 3s ease-in-out infinite; transform-origin: 50px 36px; }
@keyframes os-breathe { 50% { transform: scale(1.1); } }
.os__core { fill: #0b1830; stroke: #6c87fe; stroke-width: 0.8; }
.os__core-t1 { fill: #eaf6ff; font-size: 3.2px; font-weight: 700; }
.os__core-t2 { fill: rgba(103, 232, 249, 0.85); font-size: 2.4px; letter-spacing: 0.08em; }

.os__console { flex: 1.1; min-width: 0; border-left: 1px solid rgba(103, 232, 249, 0.14); padding: 8px 10px; display: flex; flex-direction: column; }
.os__console-h { font-size: 6.5px; letter-spacing: 0.12em; color: rgba(103, 232, 249, 0.7); }
.os__log { margin-top: 6px; display: flex; flex-direction: column; gap: 3px; }
.os__line { margin: 0; font-size: 8px; line-height: 1.5; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.os__line--cmd { color: #eaf6ff; }
.os__line--res { color: rgba(207, 224, 245, 0.75); }
.os__line--ok { color: #4ad991; }
.os__pr { color: #67e8f9; }
.os__ok { color: #4ad991; }
.os__dot { color: rgba(103, 232, 249, 0.5); }
.os__caret { animation: os-blink 1.05s steps(1) infinite; }
@keyframes os-blink { 50% { opacity: 0; } }

@media (prefers-reduced-motion: reduce) { .os__core-halo, .os__caret { animation: none; } }
@media (max-width: 560px) { .os__hub { display: none; } }
</style>
