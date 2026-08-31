<script setup lang="ts">
// INTERACTIVE INDUSTRY SELECTOR — left navigation listing all 12 industries,
// clicking one updates the right panel with: industry overview, operational
// challenges (components), recommended SVARA platforms, and expected business
// outcomes (use cases + ROI). All copy is VERBATIM from the Content Bible
// per-industry content files via industries-page.ts.
import { ref, computed } from 'vue'
import { INDUSTRIES } from '~/utils/industries-page'

const active = ref(0)
const selected = computed(() => INDUSTRIES[active.value]!)
</script>

<template>
  <section class="is">
    <div class="is__head">
      <p class="is__eyebrow">Interactive Industry Selector</p>
      <h2 class="is__title">Select an industry. See how SVARA adapts.</h2>
      <p class="is__sub">Every industry faces different operational challenges. The same SVARA Intelligence Loop adapts to each — select an industry to see its overview, challenges, recommended platforms, and expected outcomes.</p>
    </div>

    <div class="is__layout">
      <ul class="is__nav" role="list">
        <li v-for="(ind, i) in INDUSTRIES" :key="ind.name" class="is__item" :class="{ 'is-on': active === i }">
          <button @click="active = i">
            <span class="is__item-dot" />
            <span>{{ ind.name }}</span>
          </button>
        </li>
      </ul>

      <div :key="selected.name" class="is__panel">
        <div class="is__panel-head">
          <span class="is__panel-num">{{ String(active + 1).padStart(2, '0') }}</span>
          <h3 class="is__panel-name">{{ selected.name }}</h3>
        </div>

        <div class="is__section">
          <h4 class="is__label">Industry Overview</h4>
          <p class="is__def">{{ selected.def }}</p>
          <p class="is__overview">{{ selected.overview }}</p>
        </div>

        <div class="is__section">
          <h4 class="is__label">Operational Challenges</h4>
          <ul class="is__components" role="list">
            <li v-for="c in selected.components" :key="c.name">
              <span class="is__comp-name">{{ c.name }}</span>
              <span class="is__comp-desc">{{ c.description }}</span>
            </li>
          </ul>
        </div>

        <div class="is__section">
          <h4 class="is__label">Recommended SVARA Platforms</h4>
          <div class="is__platforms">
            <span v-for="p in selected.platforms" :key="p.name" class="is__platform">{{ p.name }}</span>
          </div>
        </div>

        <div class="is__section">
          <h4 class="is__label">Expected Business Outcomes</h4>
          <ul class="is__outcomes" role="list">
            <li v-for="uc in selected.useCases" :key="uc.title">
              <span class="is__uc-title">{{ uc.title }}</span>
              <span class="is__uc-desc">{{ uc.description }}</span>
            </li>
          </ul>
          <div class="is__roi">
            <span class="is__roi-overview">{{ selected.roiOverview }}</span>
            <div class="is__roi-metrics">
              <span v-for="m in selected.roiMetrics" :key="m.label" class="is__metric">
                <span class="is__ml">{{ m.label }}</span>
                <span class="is__mv">{{ m.value }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.is { background: #F1F6FE; padding: var(--space-32) var(--container-pad); }
.is__head { max-width: 760px; margin: 0 auto var(--space-16); text-align: center; }
.is__eyebrow { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.is__title { margin: 0; font-size: clamp(34px, 4.4vw, 56px); font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong); }
.is__sub { margin: var(--space-5) 0 0; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }

.is__layout { display: grid; grid-template-columns: 280px 1fr; gap: var(--space-12); max-width: 1180px; margin: var(--space-16) auto 0; align-items: start; }
.is__nav { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 3px; position: sticky; top: var(--space-8); }
.is__item button { display: flex; align-items: center; gap: 10px; width: 100%; padding: 11px 14px; background: transparent; border: 1px solid transparent; border-radius: var(--radius-sm); font-size: 14px; font-weight: var(--weight-medium); color: var(--color-text-secondary); text-align: left; cursor: pointer; transition: all var(--motion-medium) var(--ease-smooth); }
.is__item button:hover { background: rgba(47, 127, 230, 0.06); color: var(--color-ink-strong); }
.is__item.is-on button { background: var(--color-ink-strong); color: #fff; border-color: var(--color-ink-strong); }
.is__item-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--color-accent); box-shadow: 0 0 0 3px rgba(47,127,230,0.16); flex-shrink: 0; }
.is__item.is-on .is__item-dot { background: #fff; }

.is__panel { background: #fff; border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-10); box-shadow: 0 4px 14px rgba(16, 42, 91, 0.05), 0 30px 80px rgba(16, 42, 91, 0.08); animation: is-fade 0.4s var(--ease-out); }
@keyframes is-fade { from { opacity: 0; transform: translateY(12px); } }
.is__panel-head { display: flex; align-items: baseline; gap: var(--space-5); margin-bottom: var(--space-8); padding-bottom: var(--space-6); border-bottom: 2px solid var(--color-ink-strong); }
.is__panel-num { font-family: var(--font-mono); font-size: 14px; letter-spacing: 0.08em; color: var(--color-accent); }
.is__panel-name { margin: 0; font-size: clamp(28px, 3vw, 40px); font-weight: var(--weight-extrabold); letter-spacing: -0.02em; color: var(--color-ink-strong); }

.is__section { margin-top: var(--space-8); }
.is__label { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-text-faint); }
.is__def { margin: 0; font-size: 17px; line-height: 1.6; color: var(--color-ink-strong); font-weight: var(--weight-medium); }
.is__overview { margin: var(--space-3) 0 0; font-size: 14.5px; line-height: 1.65; color: var(--color-text-secondary); }

.is__components { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--space-4); }
.is__components li { display: flex; flex-direction: column; gap: 3px; padding: var(--space-3) 0; border-top: 1px dashed var(--color-border); }
.is__comp-name { font-size: 14px; font-weight: var(--weight-semibold); color: var(--color-ink-strong); }
.is__comp-desc { font-size: 13.5px; line-height: 1.55; color: var(--color-text-secondary); }

.is__platforms { display: flex; flex-wrap: wrap; gap: 8px; }
.is__platform { padding: 6px 14px; border-radius: var(--radius-pill); background: var(--color-accent-bg); border: 1px solid rgba(47, 127, 230, 0.3); font-size: 13px; font-weight: var(--weight-semibold); color: var(--color-accent); }

.is__outcomes { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--space-4); }
.is__outcomes li { display: flex; flex-direction: column; gap: 3px; padding: var(--space-3) 0; border-top: 1px dashed var(--color-border); }
.is__uc-title { font-size: 14px; font-weight: var(--weight-semibold); color: var(--color-ink-strong); }
.is__uc-desc { font-size: 13.5px; line-height: 1.55; color: var(--color-text-secondary); }
.is__roi { margin-top: var(--space-6); padding: var(--space-6); border-radius: var(--radius-md); background: #F8FBFF; border: 1px solid var(--color-border); }
.is__roi-overview { display: block; font-size: 14px; line-height: 1.6; color: var(--color-text-secondary); margin-bottom: var(--space-5); }
.is__roi-metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: var(--space-4); }
.is__metric { display: flex; flex-direction: column; gap: 4px; }
.is__ml { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-text-faint); }
.is__mv { font-size: 18px; font-weight: var(--weight-extrabold); color: var(--color-ink-strong); letter-spacing: -0.01em; }

@media (max-width: 860px) { .is__layout { grid-template-columns: 1fr; } .is__nav { position: static; flex-direction: row; flex-wrap: wrap; } .is__item { flex: 1 1 45%; } }
</style>