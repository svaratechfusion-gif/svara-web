<script setup lang="ts">
// 08 · WHY SVARA — the strategic differentiation, tight and powerful. A
// numbered manifest of five reasons rather than five cards; oversized indices,
// one strong claim each, a single supporting line.
interface Reason { n: string, title: string, copy: string }
const reasons: Reason[] = [
  { n: '01', title: 'One unified AI stack', copy: 'Every capability shares one architecture — no silos, no integration tax.' },
  { n: '02', title: 'Physical + digital intelligence', copy: 'Cameras, drones, models and agents — the real world and the enterprise on one fabric.' },
  { n: '03', title: 'Edge-to-cloud by design', copy: 'Inference where it matters, scale where it counts, as one continuum.' },
  { n: '04', title: 'Enterprise scalability', copy: 'Security, governance and integration engineered in from day one.' },
  { n: '05', title: 'AI-native engineering', copy: 'Intelligence at the core of every product — never bolted on afterwards.' },
]
</script>

<template>
  <section class="wy hx-section">
    <div class="hx-container wy__grid">
      <header class="wy__head">
        <p class="hx-eyebrow"><span class="hx-index">08</span> Why SVARA</p>
        <h2 class="hx-title">The difference is <span class="lite">the architecture.</span></h2>
        <p class="hx-lead">Not a collection of AI products — one intelligence infrastructure that compounds in value as you adopt more of it.</p>
      </header>

      <ol class="wy__list">
        <li v-for="r in reasons" :key="r.n" class="wy__row">
          <span class="wy__n">{{ r.n }}</span>
          <div class="wy__text">
            <h3 class="wy__title">{{ r.title }}</h3>
            <p class="wy__copy">{{ r.copy }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.wy__grid { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: clamp(48px, 6vw, 110px); align-items: start; }
.wy__head { position: sticky; top: 130px; }

.wy__list { list-style: none; margin: 0; padding: 0; }
.wy__row {
  display: grid; grid-template-columns: auto 1fr; gap: clamp(20px, 3vw, 44px); align-items: baseline;
  padding: clamp(24px, 3vw, 38px) 0; border-top: 1px solid rgba(20, 34, 63, 0.12);
}
.wy__row:last-child { border-bottom: 1px solid rgba(20, 34, 63, 0.12); }
.wy__n {
  font-family: var(--font-mono); font-size: clamp(22px, 3vw, 40px); font-weight: 400;
  letter-spacing: -0.02em; color: var(--ink-muted); line-height: 1;
}
.wy__title { margin: 0; font-size: clamp(24px, 3vw, 40px); font-weight: 600; letter-spacing: -0.025em; line-height: 1.05; color: var(--ink-primary); }
.wy__copy { margin: 14px 0 0; max-width: 46ch; font-size: 16px; line-height: 1.55; color: var(--ink-secondary); }

@media (max-width: 900px) {
  .wy__grid { grid-template-columns: 1fr; gap: 40px; }
  .wy__head { position: static; }
  .wy__row { grid-template-columns: auto 1fr; gap: 18px; }
}
</style>
