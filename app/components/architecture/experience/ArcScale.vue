<script setup lang="ts">
// 21 · ARCHITECTED TO SCALE — the same architecture, from one device to a
// distributed intelligence network. Focus on architectural scalability, not
// unsupported scale numbers.
const stages = [
  { n: '01', l: 'One Device', dots: 1 },
  { n: '02', l: 'One Site', dots: 4 },
  { n: '03', l: 'Multiple Sites', dots: 9 },
  { n: '04', l: 'Enterprise', dots: 16 },
  { n: '05', l: 'Distributed Network', dots: 25 },
]
</script>

<template>
  <section class="asc hx-section">
    <div class="hx-container">
      <header class="asc__head">
        <p class="hx-eyebrow"><span class="hx-index">21</span> Architected to Scale</p>
        <h2 class="hx-title">From one system <span class="lite">to an intelligence network.</span></h2>
        <p class="hx-lead">Edge nodes, data systems, AI services, agents and applications scale horizontally — the same architecture expands from a single device to a distributed intelligence network.</p>
      </header>

      <div class="asc__scroll">
        <div class="asc__stages">
          <span class="asc__rail" aria-hidden="true" />
          <div v-for="s in stages" :key="s.n" class="asc__stage">
            <div class="asc__viz" aria-hidden="true"><span v-for="d in s.dots" :key="d" /></div>
            <span class="asc__n hx-mono">{{ s.n }}</span>
            <span class="asc__l">{{ s.l }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.asc__head { max-width: 60ch; margin-bottom: clamp(48px, 6vw, 84px); }
.asc__scroll { overflow-x: auto; scrollbar-width: none; }
.asc__scroll::-webkit-scrollbar { display: none; }
.asc__stages { position: relative; display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; min-width: 720px; }
.asc__rail { position: absolute; left: 0; right: 0; bottom: 34px; height: 1px; background: linear-gradient(90deg, rgba(20,34,63,0) 0%, rgba(20,34,63,0.16) 8%, rgba(20,34,63,0.16) 92%, rgba(20,34,63,0) 100%); }
.asc__stage { display: flex; flex-direction: column; align-items: center; text-align: center; }
.asc__viz { display: grid; grid-template-columns: repeat(5, 6px); gap: 3px; justify-content: center; align-content: end; min-height: 44px; margin-bottom: 18px; }
.asc__viz span { width: 6px; height: 6px; border-radius: 50%; background: var(--sig); opacity: 0.85; animation: asc-pulse 2.6s ease-in-out infinite; }
.asc__viz span:nth-child(3n) { background: var(--sig-soft); animation-delay: 0.4s; }
.asc__viz span:nth-child(4n) { animation-delay: 0.8s; }
@keyframes asc-pulse { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
.asc__n { position: relative; z-index: 1; font-size: 10px; letter-spacing: 0.14em; color: var(--ink-muted); background: transparent; }
.asc__l { margin-top: 8px; font-size: clamp(14px, 1.4vw, 19px); font-weight: 600; letter-spacing: -0.02em; color: var(--ink-primary); }

@media (prefers-reduced-motion: reduce) { .asc__viz span { animation: none; } }
</style>
