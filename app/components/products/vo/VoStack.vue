<script setup lang="ts">
// PRODUCTS · THE INTELLIGENCE STACK — replaces the reference quote section. Left:
// serif-accent heading + copy + enterprise capability badges. Right: a premium
// "intelligence fabric" visualization (product nodes connected to one core) in
// place of the reference portrait image.
const badges = ['Enterprise Ready', 'Cloud Native', 'API First', 'Private Deployment', 'Multi Tenant', 'AI Native']

// six node positions around a central core (viewBox 0..100)
const nodes = [
  { x: 50, y: 10 }, { x: 86, y: 32 }, { x: 86, y: 72 },
  { x: 50, y: 92 }, { x: 14, y: 72 }, { x: 14, y: 32 },
]
</script>

<template>
  <section class="vs">
    <div class="vs__grid">
      <div v-reveal class="vs__copy">
        <p class="vs__eyebrow px-mono">The Intelligence Stack</p>
        <h2 class="vs__title">Every Product.<br><span class="px-serif">One Intelligence Fabric.</span></h2>
        <p class="vs__lead">Each SVARA platform is designed independently yet connected through a unified AI infrastructure. Deploy individually. Scale together. Operate as one.</p>
        <ul class="vs__badges">
          <li v-for="(b, i) in badges" :key="b" v-reveal="{ delay: 0.05 + i * 0.05 }" class="vs__badge">{{ b }}</li>
        </ul>
      </div>

      <div v-reveal="{ delay: 0.1 }" class="vs__viz" aria-hidden="true">
        <div class="vs__viz-card">
          <span class="vs__viz-code px-mono">UNIFIED INTELLIGENCE FABRIC</span>
          <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            <g stroke="var(--px-line)" stroke-width="0.5">
              <line v-for="(n, i) in nodes" :key="`l${i}`" x1="50" y1="51" :x2="n.x" :y2="n.y" />
            </g>
            <g v-for="(n, i) in nodes" :key="`p${i}`">
              <circle class="vs__sig" r="0.9" fill="var(--px-blue)"><animateMotion :dur="`${3 + (i % 3)}s`" :begin="`${i * 0.4}s`" repeatCount="indefinite" :path="`M50 51 L${n.x} ${n.y}`" /></circle>
            </g>
            <circle v-for="(n, i) in nodes" :key="`n${i}`" :cx="n.x" :cy="n.y" r="3.2" fill="#fff" stroke="var(--px-navy)" stroke-width="0.8" />
            <circle class="vs__ring" cx="50" cy="51" r="13" fill="none" stroke="var(--px-blue)" stroke-width="0.6" opacity="0.5" />
            <circle cx="50" cy="51" r="9" fill="var(--px-navy)" />
            <text x="50" y="52.6" text-anchor="middle" font-size="3.4" fill="#fff" font-family="var(--font-mono)" letter-spacing="0.3">SVARA</text>
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.vs { padding: clamp(80px, 12vw, 140px) 24px; }
.vs__grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr; gap: 48px; align-items: center; }
@media (min-width: 900px) { .vs__grid { grid-template-columns: 1.05fr 0.95fr; gap: clamp(48px, 6vw, 88px); } }

.vs__eyebrow { margin: 0 0 20px; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--px-muted); }
.vs__title { margin: 0; font-size: clamp(30px, 4.4vw, 52px); line-height: 1.08; letter-spacing: -0.025em; color: var(--px-navy); font-weight: 500; }
.vs__title .px-serif { font-weight: 400; }
.vs__lead { margin: 24px 0 0; max-width: 46ch; font-size: clamp(15px, 1.4vw, 17px); line-height: 1.6; color: var(--px-ink); }
.vs__badges { list-style: none; margin: 32px 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 10px; }
.vs__badge { font-size: 12.5px; font-weight: 500; color: var(--px-navy); padding: 9px 16px; border-radius: 999px; background: #fff; box-shadow: 0 0 0 0.5px rgba(16, 33, 74, 0.08), 0 2px 12px rgba(16, 33, 74, 0.05); }

.vs__viz { display: flex; justify-content: center; }
.vs__viz-card { position: relative; width: 100%; max-width: 460px; aspect-ratio: 1; background: #fff; border-radius: 32px; padding: 32px; box-shadow: 0 0 0 0.5px rgba(16, 33, 74, 0.08), 0 20px 60px -24px rgba(16, 33, 74, 0.28); display: grid; place-items: center; }
.vs__viz-code { position: absolute; top: 18px; left: 20px; font-size: 9px; letter-spacing: 0.14em; color: var(--px-muted); }
.vs__viz-card svg { width: 100%; height: 100%; }
.vs__ring { transform-origin: 50px 51px; animation: vs-spin 32s linear infinite; }
@keyframes vs-spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .vs__ring, .vs__sig { animation: none; } }
</style>
