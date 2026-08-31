<script setup lang="ts">
// 06 · INTELLIGENCE STACK — one continuous, wide engineered pipeline from the
// physical world to enterprise command. Eight stages threaded on a single
// signal spine (not a vertical flowchart), a pulse travels the whole system.
interface Stage { n: string, name: string, prod: string }
const stages: Stage[] = [
  { n: '01', name: 'Sense', prod: 'Vision AI · Drone AI' },
  { n: '02', name: 'Process', prod: 'Edge AI' },
  { n: '03', name: 'Understand', prod: 'Generative AI' },
  { n: '04', name: 'Reason & Act', prod: 'AI Agents' },
  { n: '05', name: 'Simulate', prod: 'Digital Twin' },
  { n: '06', name: 'Orchestrate', prod: 'AI OS' },
  { n: '07', name: 'Operate', prod: 'Business Cloud' },
  { n: '08', name: 'Command', prod: 'Command Center' },
]
</script>

<template>
  <section class="stk hx-section">
    <div class="hx-container">
      <header class="stk__head">
        <p class="hx-eyebrow"><span class="hx-index">06</span> Intelligence Stack</p>
        <h2 class="hx-title">From the physical world <span class="lite">to enterprise command.</span></h2>
        <p class="hx-lead">One continuous intelligence architecture — signal enters at the edge and resolves at command, every stage physically integrated into the same system.</p>
      </header>

      <div class="stk__scroll">
        <div class="stk__pipe">
          <span class="stk__spine" aria-hidden="true" />
          <span class="stk__signal" aria-hidden="true" />
          <ol class="stk__stages">
            <li v-for="(s, i) in stages" :key="s.n" class="stk__stage" :class="{ 'stk__stage--last': i === stages.length - 1 }">
              <span class="stk__node" aria-hidden="true" />
              <div class="stk__mod">
                <span class="stk__n hx-mono">{{ s.n }}</span>
                <h3 class="stk__name">{{ s.name }}</h3>
                <span class="stk__prod">{{ s.prod }}</span>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stk__head { max-width: 60ch; }
.stk__scroll { margin-top: clamp(56px, 7vw, 100px); overflow-x: auto; scrollbar-width: none; }
.stk__scroll::-webkit-scrollbar { display: none; }
.stk__pipe { position: relative; min-width: 900px; }

.stk__spine { position: absolute; left: 0; right: 0; top: 12px; height: 1px; background: linear-gradient(90deg, rgba(20,34,63,0) 0%, rgba(20,34,63,0.2) 5%, rgba(20,34,63,0.2) 95%, rgba(20,34,63,0) 100%); }
.stk__signal { position: absolute; top: 9px; left: 0; width: 7px; height: 7px; border-radius: 50%; background: var(--sig); box-shadow: 0 0 0 4px rgba(63,111,176,0.14); animation: stk-run 7s var(--ease-smooth) infinite; }
@keyframes stk-run { 0% { left: 1%; opacity: 0; } 6% { opacity: 1; } 94% { opacity: 1; } 100% { left: 99%; opacity: 0; } }

.stk__stages { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(8, 1fr); gap: 14px; }
.stk__stage { position: relative; padding-top: 30px; }
.stk__node { position: absolute; top: 7px; left: 22px; width: 11px; height: 11px; border-radius: 50%; background: #fff; border: 1px solid rgba(20,34,63,0.3); }
.stk__stage:first-child .stk__node { background: var(--sig); border-color: var(--sig); box-shadow: 0 0 0 4px rgba(63,111,176,0.14); }
.stk__stage--last .stk__node { background: var(--ink-primary); border-color: var(--ink-primary); }

.stk__mod {
  position: relative; padding: 16px 15px 18px; min-height: 132px;
  background: linear-gradient(158deg, rgba(255,255,255,0.66), rgba(255,255,255,0.38));
  backdrop-filter: blur(14px);
  border: 1px solid rgba(20,34,63,0.13);
  box-shadow: 0 22px 46px -30px rgba(16,42,91,0.3), inset 0 1px 0 rgba(255,255,255,0.7);
  clip-path: polygon(0 12px, 12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%);
  transition: transform var(--motion-medium) var(--ease-out), box-shadow var(--motion-medium) var(--ease-out);
}
.stk__mod:hover { transform: translateY(-4px); box-shadow: 0 30px 56px -28px rgba(16,42,91,0.4); }
.stk__n { font-size: 10.5px; letter-spacing: 0.16em; color: var(--sig); }
.stk__name { margin: 10px 0 0; font-size: clamp(16px, 1.4vw, 20px); font-weight: 600; letter-spacing: -0.02em; line-height: 1.05; color: var(--ink-primary); }
.stk__prod { display: block; margin-top: 8px; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.04em; line-height: 1.4; color: var(--ink-secondary); }

@media (max-width: 1000px) {
  .stk__pipe { min-width: 0; }
  .stk__spine { left: 5px; right: auto; top: 0; bottom: 0; width: 1px; height: auto; background: linear-gradient(180deg, rgba(20,34,63,0) 0%, rgba(20,34,63,0.2) 4%, rgba(20,34,63,0.2) 96%, rgba(20,34,63,0) 100%); }
  .stk__signal { animation: stk-run-v 7s var(--ease-smooth) infinite; }
  @keyframes stk-run-v { 0% { top: 1%; left: 2px; opacity: 0; } 6% { opacity: 1; } 94% { opacity: 1; } 100% { top: 99%; left: 2px; opacity: 0; } }
  .stk__stages { grid-template-columns: 1fr; gap: 10px; }
  .stk__stage { padding: 0 0 0 30px; }
  .stk__node { top: 22px; left: 0; }
  .stk__mod { min-height: 0; display: grid; grid-template-columns: auto 1fr; align-items: center; gap: 2px 14px; }
  .stk__name { grid-column: 2; margin: 0; }
  .stk__n { grid-row: span 2; }
  .stk__prod { grid-column: 2; margin: 2px 0 0; }
}
@media (prefers-reduced-motion: reduce) { .stk__signal { animation: none; opacity: 0; } }
</style>
