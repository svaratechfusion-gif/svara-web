<script setup lang="ts">
// 02 · THE INTELLIGENCE LAYER — the SVARA philosophy as one continuous
// engineered pipeline: SENSE → UNDERSTAND → PREDICT → ACT. Not four cards —
// four structural stages threaded on a single signal spine, UNDERSTAND
// raised as the intelligence core. A pulse travels the spine left→right.
interface Stage { id: string, name: string, copy: string, img: string }
const stages: Stage[] = [
  { id: '01', name: 'Sense', copy: 'Perceive the physical and digital world through vision, drones, sensors and signals.', img: 'sense' },
  { id: '02', name: 'Understand', copy: 'Turn raw streams into context, meaning and situational awareness in real time.', img: 'understand' },
  { id: '03', name: 'Predict', copy: 'Anticipate outcomes, risks and opportunities before they surface.', img: 'predict' },
  { id: '04', name: 'Act', copy: 'Execute decisions and automate operations across the whole enterprise.', img: 'act' },
]

// Bound at runtime (served from /public), NOT a static src — a literal
// "/images/..." on <img> makes Vite's SFC compiler try to bundle it as an
// asset import and 500 if absent. These are premium 3D renders; do not compress.
const IMG_BASE = '/images/home/intelligence-layer'
</script>

<template>
  <section class="il hx-section">
    <div class="hx-container">
      <div class="il__lede">
        <header class="il__head">
          <p class="hx-eyebrow"><span class="hx-index">02</span> The Intelligence Layer</p>
          <h2 class="hx-title">Enterprise systems should <span class="lite">sense, understand, predict</span> — and act.</h2>
          <p class="hx-lead">Not another layer of software. The intelligence layer that connects everything — so operations move from raw data to decisive action, continuously.</p>
        </header>

        <figure class="il__hero" v-reveal>
          <img
            class="il__hero-img"
            :src="`${IMG_BASE}/intelligence-layer-hero.png`"
            alt="SVARA intelligence layer — the sense, understand, predict and act pipeline"
            width="1536"
            height="1024"
            loading="lazy"
            decoding="async"
          >
        </figure>
      </div>

      <div class="il__track">
        <span class="il__spine" aria-hidden="true" />
        <span class="il__signal" aria-hidden="true" />

        <ol class="il__stages">
          <li
            v-for="(s, i) in stages"
            :key="s.id"
            class="il__stage"
            :class="{ 'il__stage--core': s.id === '02' }"
          >
            <span class="il__node" aria-hidden="true" />
            <span class="il__seg" aria-hidden="true" />
            <div class="il__body">
              <figure class="il__figure" v-reveal="{ delay: i * 0.06, y: 16 }">
                <img
                  class="il__img"
                  :src="`${IMG_BASE}/${s.img}.png`"
                  :alt="`${s.name} — SVARA intelligence stage`"
                  width="1254"
                  height="1254"
                  loading="lazy"
                  decoding="async"
                >
              </figure>
              <span class="il__id hx-mono">{{ s.id }}</span>
              <h3 class="il__name">{{ s.name }}</h3>
              <p class="il__copy">{{ s.copy }}</p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped>
.il__head { max-width: 62ch; }

/* ---- premium 3D renders (asset upgrade only) ----
   contain, transparent, no frame/box/shadow/filter — the illustration reads as
   part of the page. Entrances use the site's v-reveal (fade + rise). */
/* editorial two-column lede: copy LEFT, hero RIGHT (like the Products hero).
   Both columns vertically centered; the timeline stays below, unchanged. */
.il__lede {
  display: grid;
  grid-template-columns: minmax(420px, 42%) 1fr;
  align-items: center;
  gap: clamp(32px, 5vw, 80px);
}
.il__hero {
  margin: 0;
  width: 100%;
  max-width: 1000px;
  align-self: center;
  justify-self: end;
}
.il__hero-img { display: block; width: 100%; height: auto; object-fit: contain; }

/* tablet/mobile: stack naturally — text first, image second (source order) */
@media (max-width: 1024px) {
  .il__lede { grid-template-columns: 1fr; gap: clamp(28px, 4vw, 44px); }
  .il__hero { justify-self: center; max-width: 760px; }
}

.il__figure { margin: 0 0 16px; }
.il__img { display: block; width: 100%; height: auto; object-fit: contain; }

/* very subtle idle float on desktop only — max 8px, no rotation/bounce. Runs on
   the inner <img> so it never collides with v-reveal's transform on the figure. */
@media (min-width: 901px) {
  .il__img { animation: il-float 6s ease-in-out infinite; will-change: transform; }
  .il__stage:nth-child(2) .il__img { animation-delay: -1.5s; }
  .il__stage:nth-child(3) .il__img { animation-delay: -3s; }
  .il__stage:nth-child(4) .il__img { animation-delay: -4.5s; }
}
@keyframes il-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }

.il__track { position: relative; margin-top: clamp(64px, 8vw, 120px); }

/* the single signal spine every stage threads onto */
.il__spine {
  position: absolute; left: 0; right: 0; top: 10px; height: 1px;
  background: linear-gradient(90deg, rgba(20, 34, 63, 0) 0%, rgba(20, 34, 63, 0.18) 8%, rgba(20, 34, 63, 0.18) 92%, rgba(20, 34, 63, 0) 100%);
}
.il__signal {
  position: absolute; top: 7px; left: 0; width: 7px; height: 7px; border-radius: 50%;
  background: var(--sig); box-shadow: 0 0 0 4px rgba(63, 111, 176, 0.14);
  animation: il-travel 6s var(--ease-smooth) infinite;
}
@keyframes il-travel {
  0% { left: 2%; opacity: 0; }
  8% { opacity: 1; }
  92% { opacity: 1; }
  100% { left: 98%; opacity: 0; }
}

.il__stages {
  position: relative; list-style: none; margin: 0; padding: 0;
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 28px;
}
.il__stage { position: relative; padding-top: 34px; }
.il__node {
  position: absolute; top: 5px; left: 0; width: 11px; height: 11px; border-radius: 50%;
  background: #fff; border: 1px solid rgba(20, 34, 63, 0.28);
}
.il__seg {
  position: absolute; top: 10px; left: 5px; width: 1px; height: 24px;
  background: rgba(20, 34, 63, 0.16);
}
.il__id { display: block; font-size: 11px; letter-spacing: 0.2em; color: var(--ink-muted); }
.il__name {
  margin: 10px 0 0; font-size: clamp(28px, 3vw, 46px); font-weight: 600;
  letter-spacing: -0.02em; line-height: 1; color: var(--ink-primary);
}
.il__copy { margin: 14px 0 0; max-width: 26ch; font-size: 15px; line-height: 1.55; color: var(--ink-secondary); }

/* UNDERSTAND — the intelligence core, raised as a glass module */
.il__stage--core {
  margin-top: -20px; padding: 22px 22px 26px;
  background: linear-gradient(158deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.32));
  backdrop-filter: blur(16px);
  border: 1px solid rgba(20, 34, 63, 0.14);
  box-shadow: 0 34px 70px -38px rgba(16, 42, 91, 0.34), inset 0 1px 0 rgba(255, 255, 255, 0.7);
  clip-path: polygon(0 14px, 14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%);
}
.il__stage--core .il__node { background: var(--sig); border-color: var(--sig); box-shadow: 0 0 0 4px rgba(63, 111, 176, 0.14); }
.il__stage--core .il__seg { display: none; }
.il__stage--core .il__name { color: var(--ink-primary); }

@media (max-width: 900px) {
  .il__spine { left: 5px; right: auto; top: 0; bottom: 0; width: 1px; height: auto;
    background: linear-gradient(180deg, rgba(20, 34, 63, 0) 0%, rgba(20, 34, 63, 0.18) 6%, rgba(20, 34, 63, 0.18) 94%, rgba(20, 34, 63, 0) 100%); }
  .il__signal { animation: il-travel-v 6s var(--ease-smooth) infinite; }
  @keyframes il-travel-v { 0% { top: 2%; left: 2px; opacity: 0; } 8% { opacity: 1; } 92% { opacity: 1; } 100% { top: 98%; left: 2px; opacity: 0; } }
  .il__stages { grid-template-columns: 1fr; gap: 8px; }
  .il__stage { padding: 8px 0 8px 30px; }
  .il__node { top: 12px; }
  .il__seg { display: none; }
  .il__stage--core { margin-top: 0; padding: 20px 20px 22px 30px; }
  /* keep stacked cards readable — image never overflows, never dominates */
  .il__figure { max-width: 200px; margin-bottom: 12px; }
}
@media (prefers-reduced-motion: reduce) {
  .il__signal { animation: none; opacity: 0; }
  .il__img { animation: none; }
}
</style>
