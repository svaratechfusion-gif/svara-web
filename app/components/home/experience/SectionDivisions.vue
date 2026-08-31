<script setup lang="ts">
// 07 · SIX SPECIALIZED DIVISIONS — one organisation, drawn in the hero's
// Intelligence-Fabric language: six structural modules mounted inside a single
// chassis and wired together by connector rails. Not six detached cards.
interface Division { n: string, name: string, copy: string }
const divisions: Division[] = [
  { n: '01', name: 'Artificial Intelligence', copy: 'Vision, generative and predictive model engineering.' },
  { n: '02', name: 'Enterprise Software', copy: 'Business platforms, workflows and integrations.' },
  { n: '03', name: 'Simulation', copy: 'Digital twins and physics-grade scenario modelling.' },
  { n: '04', name: 'Digital Engineering', copy: 'Scalable systems, data pipelines and cloud-native builds.' },
  { n: '05', name: 'Cloud Infrastructure', copy: 'Edge-to-cloud compute — secure, observable, elastic.' },
  { n: '06', name: 'Digital Transformation', copy: 'Strategy and change turned into measurable outcomes.' },
]
</script>

<template>
  <section class="dv hx-section">
    <div class="hx-container">
      <header class="dv__head">
        <p class="hx-eyebrow"><span class="hx-index">07</span> Divisions</p>
        <h2 class="hx-title">Six disciplines. <span class="lite">One engineered organisation.</span></h2>
        <p class="hx-lead">Every platform is built through specialised technology divisions — deep expertise, mounted on one shared architecture.</p>
      </header>

      <div class="dv__chassis">
        <span class="dv__mount tl" /><span class="dv__mount tr" /><span class="dv__mount bl" /><span class="dv__mount br" />
        <span class="dv__code hx-mono">SVARA · TECHNOLOGY FABRIC / DV-06</span>

        <svg class="dv__rails" viewBox="0 0 100 66" preserveAspectRatio="none" aria-hidden="true">
          <path class="hx-rail hx-rail--faint" d="M33.3 8 V58 M66.6 8 V58 M8 33 H92" />
          <g class="dv__nodes"><circle cx="33.3" cy="33" r="0.9" /><circle cx="66.6" cy="33" r="0.9" /></g>
          <circle class="dv__flow" r="0.7" fill="var(--sig)"><animateMotion dur="5s" repeatCount="indefinite" path="M8 33 H92" /></circle>
          <circle class="dv__flow" r="0.7" fill="var(--sig)"><animateMotion dur="6s" begin="1.5s" repeatCount="indefinite" path="M33.3 58 V8" /></circle>
        </svg>

        <div class="dv__grid">
          <article
            v-for="d in divisions" :key="d.n"
            class="dv__mod"
          >
            <span class="dv__jack" /><span class="hx-pin br" />
            <span class="dv__n hx-mono">{{ d.n }}</span>
            <h3 class="dv__name">{{ d.name }}</h3>
            <p class="dv__copy">{{ d.copy }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dv__head { max-width: 60ch; margin-bottom: clamp(44px, 5vw, 76px); }

.dv__chassis {
  position: relative; padding: clamp(20px, 3vw, 40px);
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.34), rgba(255, 255, 255, 0.14));
  border: 1px solid rgba(20, 34, 63, 0.16);
  box-shadow: 0 46px 100px -50px rgba(16, 42, 91, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.55);
  clip-path: polygon(0 3%, 3% 0, 97% 0, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0 97%);
}
.dv__mount { position: absolute; width: 9px; height: 9px; border-radius: 50%; border: 1px solid rgba(20, 34, 63, 0.3); background: rgba(255, 255, 255, 0.7); }
.dv__mount.tl { top: 14px; left: 14px; } .dv__mount.tr { top: 14px; right: 14px; } .dv__mount.bl { bottom: 14px; left: 14px; } .dv__mount.br { bottom: 14px; right: 14px; }
.dv__code { position: absolute; bottom: 14px; left: 50%; transform: translateX(-50%); font-size: 9px; letter-spacing: 0.18em; color: var(--ink-muted); }

.dv__rails { position: absolute; inset: clamp(20px, 3vw, 40px); width: auto; height: auto; overflow: visible; }
.dv__nodes { fill: var(--sig-soft); }
.dv__flow { filter: drop-shadow(0 0 1.5px rgba(63, 111, 176, 0.6)); }

.dv__grid { position: relative; display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(12px, 1.6vw, 22px); }
.dv__mod {
  position: relative; padding: 24px 22px 26px; min-height: 168px;
  display: flex; flex-direction: column;
  background: linear-gradient(158deg, rgba(255, 255, 255, 0.68), rgba(255, 255, 255, 0.4));
  backdrop-filter: blur(14px);
  border: 1px solid rgba(20, 34, 63, 0.12);
  box-shadow: 0 20px 44px -32px rgba(16, 42, 91, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.68);
  clip-path: polygon(0 13px, 13px 0, 100% 0, 100% calc(100% - 13px), calc(100% - 13px) 100%, 0 100%);
  transition: transform var(--motion-medium) var(--ease-out), box-shadow var(--motion-medium) var(--ease-out);
}
.dv__mod:hover { transform: translateY(-4px); box-shadow: 0 30px 60px -30px rgba(16, 42, 91, 0.4); }
.dv__jack { position: absolute; top: -5px; left: 22px; width: 9px; height: 9px; border-radius: 50%; background: #fff; border: 1px solid rgba(20, 34, 63, 0.28); }
.dv__n { font-size: 11px; letter-spacing: 0.18em; color: var(--sig); }
.dv__name { margin: 12px 0 0; font-size: clamp(18px, 1.9vw, 23px); font-weight: 600; letter-spacing: -0.02em; line-height: 1.1; color: var(--ink-primary); }
.dv__copy { margin: 12px 0 0; font-size: 13.5px; line-height: 1.5; color: var(--ink-secondary); }

@media (max-width: 860px) {
  .dv__grid { grid-template-columns: 1fr; }
  .dv__rails { display: none; }
  .dv__mod { min-height: 0; }
}
@media (prefers-reduced-motion: reduce) { .dv__flow { animation: none; display: none; } }
</style>
