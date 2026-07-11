<script setup lang="ts">
const KPIS = [
  { key: 'signals', label: 'Signals/sec', value: '2.3M', trend: '+12%', positive: true },
  { key: 'latency', label: 'P99 Latency', value: '847ms', trend: '-23ms', positive: true },
  { key: 'uptime', label: 'Uptime', value: '99.97%', trend: '+0.02%', positive: true },
  { key: 'deployments', label: 'Deployments', value: '1,247', trend: '+3', positive: true },
  { key: 'industries', label: 'Industries', value: '12', trend: '—', positive: false },
  { key: 'connectors', label: 'Connectors', value: '47', trend: '+2', positive: true },
] as const
</script>

<template>
  <div class="kpi-strip" role="region" aria-label="Key metrics">
    <div class="kpi-strip__inner">
      <div v-for="kpi in KPIS" :key="kpi.key" class="kpi">
        <span class="kpi__label">{{ kpi.label }}</span>
        <span class="kpi__value tabular-nums">{{ kpi.value }}</span>
        <span class="kpi__trend" :class="{ positive: kpi.positive, negative: !kpi.positive && kpi.trend !== '—' }">
          {{ kpi.trend }}
        </span>
      </div>
      <div class="kpi__divider" aria-hidden="true"></div>
      <div class="kpi__brand">
        <span class="kpi__logo">SVARA</span>
        <span class="kpi__tagline">Enterprise Intelligence Infrastructure</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.kpi-strip {
  border-bottom: 1px solid var(--border);
  background: var(--bg-panel);
  position: sticky;
  top: 0;
  z-index: 100;
}

.kpi-strip__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-2) var(--space-4);
  max-width: 100%;
  gap: var(--space-6);
}

.kpi {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  min-width: 0;
}

.kpi__label {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--fg-faint);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.kpi__value {
  font-family: var(--font-mono);
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--fg);
}

.kpi__trend {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 500;
}

.kpi__trend.positive { color: var(--positive); }
.kpi__trend.negative { color: var(--negative); }

.kpi__divider {
  width: 1px;
  height: 32px;
  background: var(--border);
}

.kpi__brand {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: auto;
}

.kpi__logo {
  font-family: var(--font-sans);
  font-size: var(--text-xl);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--fg);
}

.kpi__tagline {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--fg-faint);
}

@media (max-width: 900px) {
  .kpi-strip__inner { flex-wrap: wrap; gap: var(--space-3); }
  .kpi__brand { display: none; }
  .kpi__divider { display: none; }
}
</style>