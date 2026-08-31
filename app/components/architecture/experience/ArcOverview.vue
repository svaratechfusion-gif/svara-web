<script setup lang="ts">
// 07 · THE FULL STACK — the architectural map for the rest of the page.
const flow = ['Sources', 'Edge', 'Data', 'Intelligence', 'Cognition', 'Orchestration', 'Applications', 'Action']
const cross = ['SECURITY', 'GOVERNANCE', 'OBSERVABILITY', 'INFRASTRUCTURE']
</script>

<template>
  <section class="aov hx-section">
    <div class="hx-container">
      <header class="aov__head">
        <p class="hx-eyebrow"><span class="hx-index">07</span> The Full Stack</p>
        <h2 class="hx-title">From the physical world <span class="lite">to enterprise action.</span></h2>
        <p class="hx-lead">SVARA is a layered intelligence architecture where every stage — from sensing and computation to reasoning and execution — can operate independently while remaining connected through one unified intelligence fabric.</p>
      </header>

      <div class="aov__map">
        <div class="aov__scroll">
          <div class="aov__flow">
            <span class="aov__spine" aria-hidden="true" />
            <span class="aov__signal" aria-hidden="true" />
            <ol class="aov__stages">
              <li v-for="(s, i) in flow" :key="s" class="aov__stage" :class="{ 'aov__stage--last': i === flow.length - 1 }">
                <span class="aov__node" aria-hidden="true" />
                <span class="aov__n hx-mono">{{ String(i + 1).padStart(2, '0') }}</span>
                <span class="aov__name">{{ s }}</span>
              </li>
            </ol>
          </div>
        </div>
        <div class="aov__cross">
          <span class="aov__cross-label hx-mono-label">CROSS-CUTTING</span>
          <div class="aov__cross-rails">
            <span v-for="c in cross" :key="c">{{ c }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.aov__head { max-width: 60ch; margin-bottom: clamp(48px, 6vw, 84px); }
.aov__scroll { overflow-x: auto; scrollbar-width: none; }
.aov__scroll::-webkit-scrollbar { display: none; }
.aov__flow { position: relative; min-width: 820px; }
.aov__spine { position: absolute; left: 0; right: 0; top: 12px; height: 1px; background: linear-gradient(90deg, rgba(20,34,63,0) 0%, rgba(20,34,63,0.2) 4%, rgba(20,34,63,0.2) 96%, rgba(20,34,63,0) 100%); }
.aov__signal { position: absolute; top: 9px; left: 0; width: 7px; height: 7px; border-radius: 50%; background: var(--sig); box-shadow: 0 0 0 4px rgba(63,111,176,0.14); animation: aov-run 7s var(--ease-smooth) infinite; }
@keyframes aov-run { 0% { left: 1%; opacity: 0; } 6% { opacity: 1; } 94% { opacity: 1; } 100% { left: 99%; opacity: 0; } }
.aov__stages { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(8, 1fr); gap: 10px; }
.aov__stage { position: relative; padding-top: 30px; }
.aov__node { position: absolute; top: 7px; left: 16px; width: 11px; height: 11px; border-radius: 50%; background: #fff; border: 1px solid rgba(20,34,63,0.3); }
.aov__stage:first-child .aov__node { background: var(--sig); border-color: var(--sig); }
.aov__stage--last .aov__node { background: var(--ink-primary); border-color: var(--ink-primary); }
.aov__n { display: block; font-size: 10px; letter-spacing: 0.14em; color: var(--ink-muted); }
.aov__name { display: block; margin-top: 8px; font-size: clamp(15px, 1.4vw, 20px); font-weight: 600; letter-spacing: -0.02em; color: var(--ink-primary); }

.aov__cross { margin-top: 22px; padding: 16px 20px; display: flex; align-items: center; gap: 18px; flex-wrap: wrap; background: rgba(63,111,176,0.05); border: 1px solid rgba(20,34,63,0.1); clip-path: polygon(0 10px, 10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%); }
.aov__cross-label { color: var(--ink-muted); flex: none; }
.aov__cross-rails { display: flex; flex-wrap: wrap; gap: 10px 18px; }
.aov__cross-rails span { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.1em; color: var(--sig); }

@media (prefers-reduced-motion: reduce) { .aov__signal { animation: none; opacity: 0; } }
</style>
