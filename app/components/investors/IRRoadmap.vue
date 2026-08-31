<script setup lang="ts">
// ROADMAP — interactive timeline showing product, customer, revenue,
// expansion, and long-term vision. Each track's stage details are sourced
// VERBATIM from the Content Bible (investors.ts + company.ts). Selecting a
// track reveals its milestone progression.
import { ref } from 'vue'
import { roadmapTracks } from '~/utils/investors'

const active = ref(0)
</script>

<template>
  <section class="rm">
    <div class="rm__head">
      <p class="rm__eyebrow">Strategic Roadmap</p>
      <h2 class="rm__title">Five tracks. One trajectory.</h2>
      <p class="rm__sub">The roadmap runs across product, customers, revenue, expansion, and long-term vision — every track converging toward category ownership.</p>
    </div>

    <div class="rm__layout">
      <ul class="rm__tracks" role="list">
        <li v-for="(t, i) in roadmapTracks" :key="t.track" class="rm__track" :class="{ 'is-on': active === i }">
          <button @click="active = i">{{ t.track }}</button>
        </li>
      </ul>

      <div :key="roadmapTracks[active]!.track" class="rm__timeline">
        <div class="rm__line" />
        <div v-for="(s, i) in roadmapTracks[active]!.stages" :key="s.label" class="rm__stage" :style="{ '--i': i }">
          <span class="rm__dot" />
          <span class="rm__stage-num">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="rm__stage-label">{{ s.label }}</span>
          <p class="rm__detail">{{ s.detail }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.rm { background: #F8FBFF; padding: var(--space-32) var(--container-pad); }
.rm__head { max-width: 760px; margin: 0 auto var(--space-16); text-align: center; }
.rm__eyebrow { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.rm__title { margin: 0; font-size: clamp(34px, 4.4vw, 56px); font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong); }
.rm__sub { margin: var(--space-5) 0 0; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }

.rm__layout { display: grid; grid-template-columns: 280px 1fr; gap: var(--space-12); max-width: 1180px; margin: var(--space-16) auto 0; align-items: start; }
.rm__tracks { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 4px; }
.rm__track button { display: block; width: 100%; padding: 12px 16px; background: transparent; border: 1px solid var(--color-border); border-radius: var(--radius-sm); font-size: 14px; font-weight: var(--weight-semibold); color: var(--color-text-secondary); text-align: left; cursor: pointer; transition: all var(--motion-medium) var(--ease-smooth); }
.rm__track button:hover { background: rgba(47, 127, 230, 0.06); color: var(--color-ink-strong); }
.rm__track.is-on button { background: var(--color-ink-strong); color: #fff; border-color: var(--color-ink-strong); }

.rm__timeline { position: relative; padding-left: 28px; }
.rm__line { position: absolute; left: 8px; top: 8px; bottom: 8px; width: 2px; background: rgba(16, 42, 91, 0.12); }
.rm__stage { position: relative; padding: var(--space-5) 0; animation: rm-reveal 0.5s var(--ease-out) backwards; animation-delay: calc(var(--i, 0) * 0.1s); }
@keyframes rm-reveal { from { opacity: 0; transform: translateX(-12px); } }
.rm__dot { position: absolute; left: -28px; top: var(--space-5); width: 14px; height: 14px; border-radius: 50%; background: var(--color-accent); border: 2px solid #fff; box-shadow: 0 0 0 4px rgba(47,127,230,0.16); }
.rm__stage-num { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em; color: var(--color-text-faint); }
.rm__stage-label { display: block; margin-top: 4px; font-size: 18px; font-weight: var(--weight-bold); color: var(--color-ink-strong); letter-spacing: -0.01em; }
.rm__detail { margin: 6px 0 0; max-width: 56ch; font-size: 14px; line-height: 1.6; color: var(--color-text-secondary); }
@media (max-width: 860px) { .rm__layout { grid-template-columns: 1fr; } .rm__tracks { flex-direction: row; flex-wrap: wrap; } .rm__track { flex: 1 1 45%; } }
@media (prefers-reduced-motion: reduce) { .rm__stage { animation: none; } }
</style>