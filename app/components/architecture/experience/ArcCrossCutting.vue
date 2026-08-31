<script setup lang="ts">
// 19–20 · CROSS-CUTTING — Security spans every layer (not an add-on), and
// Observability makes the whole system visible. Values are illustrative demo
// data; no certification claims.
const secLayers = ['INPUT', 'EDGE', 'DATA', 'AI', 'AGENTS', 'APPLICATIONS']
const secConcepts = ['IDENTITY', 'AUTHENTICATION', 'AUTHORIZATION', 'ROLE-BASED ACCESS', 'AGENT PERMISSIONS', 'DATA BOUNDARIES', 'API SECURITY', 'AUDITABILITY', 'HUMAN APPROVAL']
const telemetry = [
  { l: 'Model health', v: 'NOMINAL', tone: 'ok' }, { l: 'Inference status', v: 'ACTIVE', tone: 'sig' },
  { l: 'Agent activity', v: '18 running', tone: 'sig' }, { l: 'Workflow status', v: 'HEALTHY', tone: 'ok' },
  { l: 'Data pipelines', v: 'SYNCED', tone: 'ok' }, { l: 'Edge nodes', v: '124 online', tone: 'sig' },
  { l: 'System events', v: 'STREAMING', tone: 'sig' }, { l: 'Audit logs', v: 'RECORDING', tone: 'ok' },
]
</script>

<template>
  <section class="acc hx-section">
    <div class="hx-container">
      <!-- security -->
      <div class="acc__block acc__block--sec">
        <header class="acc__head">
          <p class="hx-eyebrow"><span class="hx-index">19</span> Security Across the Stack</p>
          <h2 class="hx-title">Control <span class="lite">at every layer.</span></h2>
          <p class="hx-lead">Security is part of the architecture, not an add-on — identity, access and auditability run through every layer of the stack.</p>
        </header>
        <div class="acc__sec">
          <div class="acc__matrix" aria-hidden="true">
            <span class="acc__matrix-rail hx-mono-label">SECURITY</span>
            <div class="acc__matrix-rows">
              <div v-for="s in secLayers" :key="s" class="acc__matrix-row"><span class="acc__matrix-ck">✓</span><span class="acc__matrix-l">{{ s }}</span><span class="acc__matrix-s hx-mono-label">SECURED</span></div>
            </div>
          </div>
          <ul class="acc__concepts">
            <li v-for="c in secConcepts" :key="c">{{ c }}</li>
          </ul>
        </div>
      </div>

      <!-- observability -->
      <div class="acc__block">
        <header class="acc__head">
          <p class="hx-eyebrow"><span class="hx-index">20</span> System Visibility</p>
          <h2 class="hx-title">See what the <span class="lite">intelligence is doing.</span></h2>
          <p class="hx-lead">An observability layer lets teams monitor, trace, understand and control the whole architecture — from model health to agent activity and audit logs.</p>
        </header>
        <div class="acc__console">
          <span class="hx-pin tl" /><span class="hx-pin tr" /><span class="hx-pin bl" /><span class="hx-pin br" />
          <div class="acc__console-bar">
            <span class="hx-mono"><span class="hx-dot" /> SVARA · OBSERVABILITY</span>
            <span class="hx-mono-label">MONITOR · TRACE · UNDERSTAND · CONTROL</span>
          </div>
          <div class="acc__console-grid">
            <div v-for="t in telemetry" :key="t.l" class="acc__tele">
              <span class="acc__tele-l">{{ t.l }}</span>
              <span class="acc__tele-v" :class="`acc__tele-v--${t.tone}`"><i />{{ t.v }}</span>
            </div>
          </div>
          <p class="acc__note hx-mono-label">* Illustrative demo telemetry</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.acc__block { margin-bottom: clamp(80px, 10vw, 150px); }
.acc__block:last-child { margin-bottom: 0; }
.acc__head { max-width: 60ch; margin-bottom: clamp(40px, 5vw, 64px); }

.acc__sec { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: clamp(32px, 4vw, 64px); align-items: center; }
.acc__matrix { position: relative; display: flex; gap: 16px; padding: 22px; background: rgba(63,111,176,0.05); border: 1px solid rgba(20,34,63,0.12); clip-path: polygon(0 12px, 12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%); }
.acc__matrix-rail { writing-mode: vertical-rl; text-align: center; color: var(--sig); letter-spacing: 0.2em; padding: 4px 0; border-right: 1px solid rgba(63,111,176,0.25); }
.acc__matrix-rows { flex: 1; display: flex; flex-direction: column; gap: 6px; }
.acc__matrix-row { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 12px; padding: 9px 12px; background: rgba(255,255,255,0.6); border: 1px solid rgba(20,34,63,0.1); border-radius: 6px; }
.acc__matrix-ck { color: var(--sig); font-size: 12px; }
.acc__matrix-l { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em; color: var(--ink-primary); }
.acc__matrix-s { color: var(--ink-muted); }
.acc__concepts { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 8px; align-content: flex-start; }
.acc__concepts li { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em; color: var(--ink-secondary); padding: 6px 12px; border: 1px solid rgba(20,34,63,0.14); border-radius: var(--radius-pill); background: rgba(255,255,255,0.44); }

.acc__console { position: relative; padding: 14px; background: linear-gradient(158deg, rgba(255,255,255,0.5), rgba(255,255,255,0.28)); border: 1px solid rgba(20,34,63,0.14); box-shadow: 0 40px 90px -50px rgba(16,42,91,0.34), inset 0 1px 0 rgba(255,255,255,0.6); clip-path: polygon(0 16px, 16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%); }
.acc__console-bar { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; padding: 3px 8px 14px; }
.acc__console-bar .hx-mono { display: inline-flex; align-items: center; gap: 8px; font-size: 9.5px; letter-spacing: 0.1em; color: var(--ink-primary); }
.acc__console-bar .hx-mono-label { color: var(--ink-muted); }
.acc__console-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: rgba(20,34,63,0.08); border: 1px solid rgba(20,34,63,0.08); border-radius: 12px; overflow: hidden; }
.acc__tele { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 16px; background: #fff; }
.acc__tele-l { font-size: 13px; font-weight: 500; color: var(--ink-primary); }
.acc__tele-v { display: inline-flex; align-items: center; gap: 7px; font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.06em; }
.acc__tele-v i { width: 6px; height: 6px; border-radius: 50%; }
.acc__tele-v--ok { color: #2f8f5b; } .acc__tele-v--ok i { background: #2f8f5b; box-shadow: 0 0 0 3px rgba(47,143,91,0.12); }
.acc__tele-v--sig { color: var(--sig); } .acc__tele-v--sig i { background: var(--sig); box-shadow: 0 0 0 3px rgba(63,111,176,0.14); }
.acc__note { margin: 14px 0 0; padding-left: 8px; color: var(--ink-muted); opacity: 0.7; text-transform: none; letter-spacing: 0.04em; }

@media (max-width: 900px) {
  .acc__sec { grid-template-columns: 1fr; gap: 28px; }
  .acc__console-grid { grid-template-columns: 1fr; }
}
</style>
