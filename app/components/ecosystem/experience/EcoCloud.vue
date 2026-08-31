<script setup lang="ts">
// 10 · UNIFIED BUSINESS CLOUD — eight business functions as one integrated
// operating surface (shared dividers, one chassis), not eight separate cards.
interface Fn { key: string, label: string, stat: string }
const fns: Fn[] = [
  { key: 'ERP', label: 'ERP', stat: 'RESOURCE' },
  { key: 'CRM', label: 'CRM', stat: 'CUSTOMER' },
  { key: 'HRM', label: 'HRM', stat: 'PEOPLE' },
  { key: 'FIN', label: 'Finance', stat: 'LEDGER' },
  { key: 'OPS', label: 'Operations', stat: 'RUNTIME' },
  { key: 'SCM', label: 'Supply Chain', stat: 'FLOW' },
  { key: 'PRJ', label: 'Projects', stat: 'DELIVERY' },
  { key: 'ANL', label: 'Analytics', stat: 'INSIGHT' },
]
</script>

<template>
  <section class="cld hx-section">
    <div class="hx-container">
      <header class="cld__head">
        <p class="hx-eyebrow"><span class="hx-index">10</span> Unified Business Cloud</p>
        <h2 class="hx-title">Intelligence <span class="lite">meets operations.</span></h2>
        <p class="hx-lead">Every business function inside one integrated enterprise operating architecture — sharing one data fabric, one intelligence layer, one source of truth.</p>
      </header>

      <div class="cld__surface">
        <div class="cld__bar">
          <span class="cld__bar-id hx-mono"><span class="hx-dot" /> SVARA · UNIFIED BUSINESS CLOUD</span>
          <span class="cld__bar-stat hx-mono-label">ONE OPERATING ARCHITECTURE · SYNCED</span>
        </div>
        <div class="cld__grid">
          <div v-for="f in fns" :key="f.key" class="cld__cell">
            <span class="cld__cell-stat hx-mono-label">{{ f.stat }}</span>
            <span class="cld__cell-label">{{ f.label }}</span>
            <svg class="cld__spark" viewBox="0 0 90 20" preserveAspectRatio="none" aria-hidden="true">
              <polyline fill="none" stroke="var(--sig)" stroke-width="1.4" points="0,15 15,11 30,13 45,6 60,10 75,4 90,7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cld__head { max-width: 60ch; margin-bottom: clamp(44px, 5vw, 76px); }

.cld__surface {
  position: relative;
  background: linear-gradient(160deg, rgba(255,255,255,0.5), rgba(255,255,255,0.28));
  border: 1px solid rgba(20,34,63,0.16);
  box-shadow: 0 46px 100px -52px rgba(16,42,91,0.4), inset 0 1px 0 rgba(255,255,255,0.6);
  clip-path: polygon(0 18px, 18px 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%);
  overflow: hidden;
}
.cld__bar { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; padding: 16px 24px; border-bottom: 1px solid rgba(20,34,63,0.12); background: rgba(255,255,255,0.3); }
.cld__bar-id { display: inline-flex; align-items: center; gap: 9px; font-size: 11px; letter-spacing: 0.12em; color: var(--ink-primary); }
.cld__bar-stat { color: var(--ink-muted); }

/* one surface: cells share hairline dividers, no gaps → not separate cards */
.cld__grid { display: grid; grid-template-columns: repeat(4, 1fr); }
.cld__cell {
  position: relative; padding: 26px 22px 24px; min-height: 130px;
  display: flex; flex-direction: column; gap: 8px;
  border-right: 1px solid rgba(20,34,63,0.1); border-bottom: 1px solid rgba(20,34,63,0.1);
  transition: background var(--motion-fast) var(--ease-smooth);
}
.cld__cell:hover { background: rgba(63,111,176,0.05); }
.cld__grid .cld__cell:nth-child(4n) { border-right: none; }
.cld__grid .cld__cell:nth-last-child(-n+4) { border-bottom: none; }
.cld__cell-stat { color: var(--ink-muted); }
.cld__cell-label { font-size: clamp(18px, 1.8vw, 24px); font-weight: 600; letter-spacing: -0.02em; color: var(--ink-primary); }
.cld__spark { width: 100%; height: 18px; margin-top: auto; opacity: 0.7; }

@media (max-width: 820px) {
  .cld__grid { grid-template-columns: repeat(2, 1fr); }
  .cld__grid .cld__cell:nth-child(4n) { border-right: 1px solid rgba(20,34,63,0.1); }
  .cld__grid .cld__cell:nth-child(2n) { border-right: none; }
  .cld__grid .cld__cell:nth-last-child(-n+4) { border-bottom: 1px solid rgba(20,34,63,0.1); }
  .cld__grid .cld__cell:nth-last-child(-n+2) { border-bottom: none; }
}
</style>
