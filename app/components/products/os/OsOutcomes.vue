<script setup lang="ts">
// OS · CUSTOMER OUTCOMES / POSITIONING — "we don't compete in a category, we
// define one" + strategic differentiators + the NOT/INSTEAD frame (Chapter 08).
import { OS_DIFFERENTIATORS } from '~/utils/svara-os'

const not = ['AI tool or model provider', 'Point-solution vendor', 'Cloud-only platform', 'Application-layer company', 'Feature competitor']
const instead = ['AI infrastructure company', 'Ecosystem platform provider', 'Edge + cloud intelligence layer', 'Full-stack enterprise platform', 'Category creator']
</script>

<template>
  <section class="oo">
    <div class="oo__inner">
      <header v-reveal class="oo__head">
        <p class="oo__eyebrow px-mono">Competitive Positioning</p>
        <h2 class="oo__title">We don't compete in a category.<br><span class="px-serif">We define one.</span></h2>
        <p class="oo__lead">SVARA brings AI, enterprise software, edge computing, simulation, autonomous systems and digital engineering into one integrated intelligence ecosystem — a competitive advantage that is not one feature, but the architecture that connects every capability into one continuously evolving enterprise platform.</p>
      </header>

      <ul class="oo__diff">
        <li v-for="(d, i) in OS_DIFFERENTIATORS" :key="d.k" v-reveal="{ delay: i * 0.05 }" class="oo__diff-i">
          <span class="oo__diff-k">{{ d.k }}</span>
          <span class="oo__diff-v">{{ d.v }}</span>
        </li>
      </ul>

      <div v-reveal="{ delay: 0.1 }" class="oo__compare">
        <div class="oo__col oo__col--not">
          <span class="oo__col-h px-mono">SVARA is not</span>
          <ul><li v-for="n in not" :key="n">{{ n }}</li></ul>
        </div>
        <span class="oo__arrow" aria-hidden="true">→</span>
        <div class="oo__col oo__col--yes">
          <span class="oo__col-h px-mono">SVARA is</span>
          <ul><li v-for="y in instead" :key="y">{{ y }}</li></ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.oo { padding: clamp(72px, 10vw, 130px) 24px; }
.oo__inner { max-width: 1140px; margin: 0 auto; }
.oo__head { max-width: 64ch; margin-bottom: clamp(40px, 5vw, 64px); }
.oo__eyebrow { margin: 0 0 14px; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--px-muted); }
.oo__title { margin: 0; font-size: clamp(30px, 4.6vw, 58px); line-height: 1.02; letter-spacing: -0.03em; color: var(--px-navy); font-weight: 500; }
.oo__title .px-serif { font-weight: 400; }
.oo__lead { margin: 22px 0 0; max-width: 62ch; font-size: clamp(15px, 1.4vw, 17px); line-height: 1.6; color: var(--px-ink); }

.oo__diff { list-style: none; margin: 0 0 clamp(48px, 6vw, 72px); padding: 0; display: grid; grid-template-columns: 1fr; gap: 16px; }
@media (min-width: 720px) { .oo__diff { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1000px) { .oo__diff { grid-template-columns: repeat(5, 1fr); } }
.oo__diff-i { display: flex; flex-direction: column; gap: 8px; padding: 20px 18px; border-radius: 6px; background: #fff; border: 1px solid var(--px-line); }
.oo__diff-k { font-size: 14px; font-weight: 600; letter-spacing: -0.01em; color: var(--px-navy); }
.oo__diff-v { font-size: 12.5px; line-height: 1.5; color: var(--px-muted); }

.oo__compare { display: grid; grid-template-columns: 1fr; gap: 20px; align-items: center; }
@media (min-width: 760px) { .oo__compare { grid-template-columns: 1fr auto 1fr; } }
.oo__col { padding: 26px 24px; border-radius: 8px; border: 1px solid var(--px-line); }
.oo__col--not { background: rgba(16,33,74,0.02); }
.oo__col--yes { background: var(--px-navy); border-color: var(--px-navy); }
.oo__col-h { display: block; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 14px; }
.oo__col--not .oo__col-h { color: var(--px-muted); }
.oo__col--yes .oo__col-h { color: var(--px-blue); }
.oo__col ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
.oo__col li { font-size: 14px; }
.oo__col--not li { color: var(--px-muted); }
.oo__col--yes li { color: #F6FCFF; font-weight: 500; }
.oo__arrow { color: var(--px-blue); font-size: 22px; text-align: center; }
</style>
