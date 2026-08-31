<script setup lang="ts">
// OPERATIONS DASHBOARD — interactive operational dashboard showing
// industry-specific KPIs. Focus on operational visibility, automation,
// safety, efficiency, quality, compliance, and business intelligence.
// No fake customer data — KPI categories are factual operational domains;
// the supporting detail comes verbatim from the Content Bible
// (industry components + ROI metrics).
import { ref, computed } from 'vue'
import { INDUSTRIES, KPI_DOMAINS } from '~/utils/industries-page'

const active = ref(0)
const selected = computed(() => INDUSTRIES[active.value]!)

// map KPI domains to verbatim industry components for the detail line
const kpiData = computed(() =>
  KPI_DOMAINS.map((domain, i) => ({
    domain,
    detail: selected.value.components[i % selected.value.components.length]?.description ?? selected.value.overview,
    metric: selected.value.roiMetrics[i % selected.value.roiMetrics.length],
  })),
)
</script>

<template>
  <section class="od">
    <div class="od__head">
      <p class="od__eyebrow">Operations Dashboard</p>
      <h2 class="od__title">Operational visibility, in real time.</h2>
      <p class="od__sub">The same dashboard surface adapts to each industry's operational priorities — visibility, automation, safety, efficiency, quality, and compliance. Select an industry to see its operational KPI structure.</p>
    </div>

    <div class="od__selector">
      <button v-for="(ind, i) in INDUSTRIES" :key="ind.name" class="od__chip" :class="{ 'is-on': active === i }" @click="active = i">{{ ind.name }}</button>
    </div>

    <div :key="selected.name" class="od__board">
      <div class="od__bar">
        <span class="od__bar-dots"><i /><i /><i /></span>
        <span class="od__bar-title">{{ selected.name }} — Operations</span>
        <span class="od__bar-live">LIVE</span>
      </div>

      <div class="od__grid">
        <div v-for="k in kpiData" :key="k.domain" class="od__kpi">
          <div class="od__kpi-top">
            <span class="od__kpi-domain">{{ k.domain }}</span>
            <span v-if="k.metric" class="od__kpi-value">{{ k.metric.value }}</span>
          </div>
          <p class="od__kpi-detail">{{ k.detail }}</p>
          <div v-if="k.metric" class="od__kpi-label">{{ k.metric.label }}</div>
        </div>
      </div>

      <div class="od__footer">
        <span class="od__footer-item"><i />operational visibility active</span>
        <span class="od__footer-item"><i />automation engaged</span>
        <span class="od__footer-item"><i />continuous improvement loop</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.od { background: #F1F6FE; padding: var(--space-32) var(--container-pad); }
.od__head { max-width: 760px; margin: 0 auto var(--space-12); text-align: center; }
.od__eyebrow { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.od__title { margin: 0; font-size: clamp(34px, 4.4vw, 56px); font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong); }
.od__sub { margin: var(--space-5) 0 0; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }

.od__selector { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; max-width: 1000px; margin: 0 auto var(--space-12); }
.od__chip { padding: 7px 14px; border-radius: var(--radius-pill); background: transparent; border: 1px solid var(--color-border); font-size: 12px; font-weight: var(--weight-medium); color: var(--color-text-secondary); cursor: pointer; transition: all var(--motion-medium) var(--ease-smooth); }
.od__chip:hover { border-color: var(--color-accent); color: var(--color-ink-strong); }
.od__chip.is-on { background: var(--color-ink-strong); color: #fff; border-color: var(--color-ink-strong); }

.od__board { max-width: 1100px; margin: 0 auto; border-radius: var(--radius-lg); background: #fff; border: 1px solid var(--color-border); box-shadow: 0 4px 14px rgba(16, 42, 91, 0.05), 0 40px 90px rgba(16, 42, 91, 0.1); overflow: hidden; animation: od-fade 0.4s var(--ease-out); }
@keyframes od-fade { from { opacity: 0; transform: translateY(12px); } }
.od__bar { display: flex; align-items: center; gap: var(--space-3); padding: 12px 16px; background: #F4F7FC; border-bottom: 1px solid var(--color-border); }
.od__bar-dots { display: inline-flex; gap: 6px; }
.od__bar-dots i { width: 10px; height: 10px; border-radius: 50%; background: rgba(16, 42, 91, 0.16); }
.od__bar-dots i:first-child { background: rgba(16, 42, 91, 0.4); }
.od__bar-title { flex: 1; font-size: 13px; font-weight: var(--weight-semibold); color: var(--color-ink-strong); }
.od__bar-live { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em; color: var(--color-accent); animation: od-blink 1.6s ease-in-out infinite; }
@keyframes od-blink { 0%,100% { opacity: 1; } 50% { opacity: 0.25; } }

.od__grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1px; background: var(--color-border); }
.od__kpi { padding: var(--space-8); background: #fff; display: flex; flex-direction: column; gap: var(--space-3); }
.od__kpi-top { display: flex; align-items: baseline; justify-content: space-between; }
.od__kpi-domain { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-text-faint); }
.od__kpi-value { font-size: 20px; font-weight: var(--weight-extrabold); color: var(--color-ink-strong); letter-spacing: -0.02em; }
.od__kpi-detail { margin: 0; font-size: 13px; line-height: 1.55; color: var(--color-text-secondary); }
.od__kpi-label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-accent); }

.od__footer { display: flex; gap: var(--space-6); padding: var(--space-5) var(--space-8); border-top: 1px solid var(--color-border); background: #F4F7FC; flex-wrap: wrap; }
.od__footer-item { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-text-secondary); }
.od__footer-item i { width: 6px; height: 6px; border-radius: 50%; background: var(--color-accent); animation: od-blink 1.6s ease-in-out infinite; }
.od__footer-item:nth-child(2) i { animation-delay: -0.5s; }
.od__footer-item:nth-child(3) i { animation-delay: -1s; }
@media (prefers-reduced-motion: reduce) { .od__bar-live, .od__footer-item i, .od__board { animation: none; } }
</style>