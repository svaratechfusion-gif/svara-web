<script setup lang="ts">
const PRODUCTS = [
  { name: 'SENSE', capability: 'Observe', copy: 'Multi-modal ingestion at 2.3M signals/sec', span: 2, status: 'GA' },
  { name: 'PARSE', capability: 'Understand', copy: 'Structure unstructured — docs, logs, voice, video', span: 1, status: 'GA' },
  { name: 'FORECAST', capability: 'Predict', copy: '8 prediction horizons, sub-second inference', span: 1, status: 'GA' },
  { name: 'DIRECT', capability: 'Coordinate', copy: 'One decision → every system, every person', span: 1, status: 'Beta' },
  { name: 'OPTIMIZE', capability: 'Improve', copy: 'Closed-loop learning, every cycle smarter', span: 1, status: 'Beta' },
  { name: 'LOOP', capability: 'Platform', copy: 'Orchestration layer — deploy, monitor, govern', span: 2, status: 'GA' },
  { name: 'Industries', capability: 'Proof', copy: '12 reference architectures, deployed', span: 1, status: 'Live' },
  { name: 'Trust', capability: 'Proof', copy: 'DPIIT • SOC2 • ISO27001 • Women-led', span: 1, status: 'Verified' },
  { name: 'Deploy', capability: 'Action', copy: 'Cloud • Edge • Air-gapped • Hybrid', span: 1, status: 'Ready' },
] as const
</script>

<template>
  <div class="product-grid" role="list" aria-label="SVARA Products">
    <article
      v-for="p in PRODUCTS"
      :key="p.name"
      class="product-card"
      :class="`product-card--span-${p.span}`"
      role="listitem"
    >
      <div class="product-card__header">
        <span class="product-card__capability">{{ p.capability }}</span>
        <span class="product-card__status" :data-status="p.status.toLowerCase()">{{ p.status }}</span>
      </div>
      <h3 class="product-card__name">{{ p.name }}</h3>
      <p class="product-card__copy">{{ p.copy }}</p>
      <NuxtLink :to="`/products/${p.name.toLowerCase()}`" class="product-card__link">
        View specification →
      </NuxtLink>
    </article>
  </div>
</template>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-3);
  padding: var(--space-2);
}

.product-card {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  transition: border-color var(--duration-fast), box-shadow var(--duration-fast);
}

.product-card:hover {
  border-color: var(--border-strong);
  box-shadow: 0 4px 16px rgba(0,0,0,0.04);
}

.product-card--span-2 { grid-column: span 2; }

.product-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.product-card__capability {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
}

.product-card__status {
  font-family: var(--font-mono);
  font-size: 9px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 1px 6px;
  border-radius: 2px;
}

.product-card__status[data-status="ga"] { background: rgba(0,128,0,0.1); color: var(--positive); }
.product-card__status[data-status="beta"] { background: rgba(184,134,11,0.1); color: var(--warning); }
.product-card__status[data-status="live"],
.product-card__status[data-status="verified"],
.product-card__status[data-status="ready"] { background: var(--accent-bg); color: var(--accent); }

.product-card__name {
  font-family: var(--font-sans);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--fg);
  letter-spacing: -0.01em;
  margin: 0;
}

.product-card__copy {
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
  color: var(--fg-muted);
  margin: 0;
  flex: 1;
}

.product-card__link {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--accent);
  text-decoration: none;
  margin-top: auto;
  padding-top: var(--space-2);
  border-top: 1px solid var(--border);
}

.product-card__link:hover { text-decoration: underline; }

@media (max-width: 1000px) {
  .product-grid { grid-template-columns: repeat(2, 1fr); }
  .product-card--span-2 { grid-column: span 2; }
}

@media (max-width: 600px) {
  .product-grid { grid-template-columns: 1fr; }
  .product-card--span-2 { grid-column: span 1; }
}
</style>