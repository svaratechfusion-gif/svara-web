<script setup lang="ts">
// OS · PLATFORM ARCHITECTURE — the eight engineered layers + core technology stack
// (Chapter 04 / DOC 2026-024).
import { OS_STACK, OS_TECH } from '~/utils/svara-os'
</script>

<template>
  <section class="oa">
    <div class="oa__inner">
      <div class="oa__left">
        <header v-reveal>
          <p class="oa__eyebrow px-mono">Platform Architecture</p>
          <h2 class="oa__title">Engineering the <span class="px-serif">intelligence layer.</span></h2>
          <p class="oa__lead">Every SVARA platform is engineered on one AI-first foundation — infrastructure, AI services, data pipelines, security, orchestration and enterprise integrations shared across the entire ecosystem, so every improvement benefits every product.</p>
        </header>
        <ul class="oa__stack">
          <li v-for="(l, i) in OS_STACK" :key="l.n" v-reveal="{ delay: i * 0.04 }" class="oa__layer">
            <span class="oa__layer-n hx-mono">{{ l.n }}</span>
            <span class="oa__layer-name">{{ l.layer }}</span>
            <span class="oa__layer-detail">{{ l.detail }}</span>
          </li>
        </ul>
      </div>

      <aside v-reveal="{ delay: 0.1 }" class="oa__tech">
        <span class="oa__tech-h px-mono">Core Technology Stack</span>
        <ul>
          <li v-for="t in OS_TECH" :key="t.group">
            <span class="oa__tech-g">{{ t.group }}</span>
            <span class="oa__tech-i">{{ t.items }}</span>
          </li>
        </ul>
        <div class="oa__tech-foot">
          <span class="oa__tech-foot-v">60–70%</span>
          <span class="oa__tech-foot-l">Platform reuse cuts new-product engineering effort while keeping architectural consistency across every solution.</span>
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.oa { padding: clamp(72px, 10vw, 130px) 24px; }
.oa__inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr; gap: 40px; }
@media (min-width: 900px) { .oa__inner { grid-template-columns: 1.35fr 0.65fr; gap: clamp(48px, 6vw, 88px); align-items: start; } }
.oa__eyebrow { margin: 0 0 14px; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--px-muted); }
.oa__title { margin: 0; font-size: clamp(28px, 4vw, 46px); line-height: 1.06; letter-spacing: -0.025em; color: var(--px-navy); font-weight: 500; }
.oa__title .px-serif { font-weight: 400; }
.oa__lead { margin: 18px 0 40px; max-width: 54ch; font-size: clamp(15px, 1.4vw, 17px); line-height: 1.6; color: var(--px-ink); }

.oa__stack { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--px-line); }
.oa__layer { display: grid; grid-template-columns: auto 220px 1fr; gap: 20px; align-items: center; padding: 16px 4px; border-bottom: 1px solid var(--px-line); transition: background 0.25s; }
.oa__layer:hover { background: rgba(16,33,74,0.02); }
.oa__layer-n { font-size: 12px; color: var(--px-blue); }
.oa__layer-name { font-size: clamp(15px, 1.6vw, 18px); font-weight: 600; letter-spacing: -0.01em; color: var(--px-navy); }
.oa__layer-detail { font-size: 14px; color: var(--px-muted); }
@media (max-width: 620px) { .oa__layer { grid-template-columns: auto 1fr; } .oa__layer-detail { grid-column: 2; } }

.oa__tech { background: #fff; border: 1px solid var(--px-line); border-radius: 8px; padding: 26px 24px; box-shadow: 0 4px 24px -12px rgba(16,33,74,0.2); }
.oa__tech-h { display: block; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--px-muted); margin-bottom: 18px; }
.oa__tech ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 16px; }
.oa__tech-g { display: block; font-size: 14px; font-weight: 600; color: var(--px-navy); }
.oa__tech-i { display: block; margin-top: 4px; font-family: var(--font-mono); font-size: 11.5px; line-height: 1.5; color: var(--px-muted); }
.oa__tech-foot { margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--px-line); }
.oa__tech-foot-v { font-size: 30px; font-weight: 600; letter-spacing: -0.02em; color: var(--px-blue); }
.oa__tech-foot-l { display: block; margin-top: 8px; font-size: 13px; line-height: 1.55; color: var(--px-muted); }
</style>
