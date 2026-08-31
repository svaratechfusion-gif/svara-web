<script setup lang="ts">
// 09 · AI OS — the orchestration layer. Five intelligence pathways (models,
// agents, edge, twins, enterprise apps) physically converge into one central
// operating layer that governs the whole architecture.
interface Feed { label: string, x: number, y: number }
// x,y in the 100×60 conduit space; all converge to the core at (60,30)
const feeds: Feed[] = [
  { label: 'Models', x: 6, y: 8 },
  { label: 'Agents', x: 6, y: 23 },
  { label: 'Edge systems', x: 6, y: 38 },
  { label: 'Digital twins', x: 6, y: 52 },
  { label: 'Enterprise apps', x: 24, y: 58 },
]
const coreX = 60
const coreY = 30
</script>

<template>
  <section class="os hx-section">
    <div class="hx-container os__grid">
      <header class="os__head">
        <p class="hx-eyebrow"><span class="hx-index">09</span> AI OS</p>
        <h2 class="hx-title">The operating layer <span class="lite">for enterprise intelligence.</span></h2>
        <p class="hx-lead">One control plane over the entire architecture — AI OS orchestrates models, agents, edge systems, digital twins and enterprise applications into a single, governed intelligence surface.</p>
        <ul class="os__list">
          <li v-for="f in feeds" :key="f.label"><span class="os__tick" />{{ f.label }}</li>
        </ul>
      </header>

      <div class="os__diagram" aria-hidden="true">
        <ClientOnly>
          <svg class="os__wires" viewBox="0 0 100 60" preserveAspectRatio="none">
            <path
              v-for="f in feeds" :key="f.label"
              class="os__wire" :d="`M${f.x} ${f.y} C ${(f.x + coreX) / 2} ${f.y}, ${(f.x + coreX) / 2} ${coreY}, ${coreX} ${coreY}`"
              vector-effect="non-scaling-stroke"
            />
            <circle v-for="(f, i) in feeds" :key="`d-${f.label}`" class="os__flow" r="0.8" fill="var(--sig)">
              <animateMotion :dur="`${2.6 + i * 0.3}s`" repeatCount="indefinite" :path="`M${f.x} ${f.y} C ${(f.x + coreX) / 2} ${f.y}, ${(f.x + coreX) / 2} ${coreY}, ${coreX} ${coreY}`" />
            </circle>
          </svg>
        </ClientOnly>

        <div class="os__core">
          <span class="hx-pin tl" /><span class="hx-pin tr" /><span class="hx-pin bl" /><span class="hx-pin br" />
          <span class="os__core-kicker hx-mono-label"><span class="hx-dot" /> ORCHESTRATION</span>
          <span class="os__core-name">AI OS</span>
          <span class="os__core-sub">Operating layer · 100% online</span>
          <div class="os__bars"><i /><i /><i /><i /><i /><i /></div>
        </div>

        <div class="os__out">
          <svg width="60" height="12" viewBox="0 0 60 12" fill="none"><path d="M0 6h50M50 6l-5-4M50 6l-5 4" stroke="rgba(20,34,63,0.4)" stroke-width="1.2" /></svg>
          <span class="hx-mono-label">ENTERPRISE</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.os__grid { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: clamp(40px, 5vw, 90px); align-items: center; }
.os__list { list-style: none; margin: 30px 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 10px 22px; }
.os__list li { display: inline-flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.04em; color: var(--ink-secondary); }
.os__tick { width: 5px; height: 5px; border-radius: 50%; background: var(--sig); }

.os__diagram { position: relative; aspect-ratio: 100 / 60; }
.os__wires { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.os__wire { stroke: rgba(20,34,63,0.16); stroke-width: 1; fill: none; }

.os__core {
  position: absolute; left: 60%; top: 50%; transform: translate(-50%, -50%); z-index: 2;
  display: flex; flex-direction: column; align-items: flex-start; gap: 4px;
  padding: 20px 24px 18px; width: clamp(180px, 20vw, 240px);
  background: linear-gradient(158deg, rgba(255,255,255,0.78), rgba(238,242,248,0.5));
  backdrop-filter: blur(18px);
  border: 1px solid rgba(20,34,63,0.2);
  box-shadow: 0 40px 80px -34px rgba(16,42,91,0.46), inset 0 1px 0 rgba(255,255,255,0.85);
  clip-path: polygon(0 16px, 16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%);
}
.os__core-kicker { display: inline-flex; align-items: center; gap: 8px; color: var(--ink-muted); }
.os__core-name { font-size: clamp(30px, 3vw, 44px); font-weight: 600; letter-spacing: -0.03em; color: var(--ink-primary); line-height: 1; }
.os__core-sub { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.06em; color: var(--sig); }
.os__bars { display: flex; gap: 4px; align-items: flex-end; height: 22px; margin-top: 10px; width: 100%; }
.os__bars i { flex: 1; background: linear-gradient(var(--sig), rgba(63,111,176,0.25)); border-radius: 1px; animation: os-eq 1.8s var(--ease-smooth) infinite; }
.os__bars i:nth-child(1) { height: 40%; animation-delay: 0s; } .os__bars i:nth-child(2) { height: 75%; animation-delay: 0.2s; }
.os__bars i:nth-child(3) { height: 55%; animation-delay: 0.4s; } .os__bars i:nth-child(4) { height: 90%; animation-delay: 0.15s; }
.os__bars i:nth-child(5) { height: 62%; animation-delay: 0.5s; } .os__bars i:nth-child(6) { height: 48%; animation-delay: 0.3s; }
@keyframes os-eq { 0%, 100% { transform: scaleY(0.7); } 50% { transform: scaleY(1); } }

.os__out { position: absolute; right: 0; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; align-items: flex-start; gap: 6px; color: var(--ink-muted); }

@media (max-width: 900px) {
  .os__grid { grid-template-columns: 1fr; gap: 36px; }
  .os__core { left: 50%; }
}
@media (prefers-reduced-motion: reduce) { .os__bars i, .os__flow { animation: none; } }
</style>
