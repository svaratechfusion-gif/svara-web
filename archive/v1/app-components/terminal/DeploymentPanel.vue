<script setup lang="ts">
const DEPLOYMENT_TIERS = [
  {
    name: 'Starter',
    nodes: 3,
    signals: '100K/day',
    latency: '<1s',
    price: '$2,500/mo',
    features: ['Cloud (AWS/GCP/Azure)', '5 Connectors', 'Standard Support', 'SOC2 Type II', '99.9% SLA'],
    cta: 'Start Trial'
  },
  {
    name: 'Professional',
    nodes: 12,
    signals: '10M/day',
    latency: '<500ms',
    price: '$15,000/mo',
    features: ['Cloud + Edge', '25 Connectors', 'Priority Support', 'SOC2 + ISO27001', '99.95% SLA', 'Air-gap Option'],
    cta: 'Contact Sales',
    highlighted: true
  },
  {
    name: 'Enterprise',
    nodes: 50,
    signals: '100M+/day',
    latency: '<100ms',
    price: 'Custom',
    features: ['Any Topology', 'All 47 Connectors', 'Dedicated Support', 'Full Compliance Suite', '99.99% SLA', 'On-prem + Air-gap', 'Source Code Escrow'],
    cta: 'Contact Sales'
  }
] as const

const ARCHITECTURES = [
  { name: '3-Node (Dev/Test)', desc: 'Single region, managed Kubernetes', components: ['SENSE', 'PARSE', 'FORECAST', 'DIRECT'], useCase: 'POC, development, small pilots' },
  { name: '12-Node (Production)', desc: 'Multi-AZ, edge gateways', components: ['SENSE', 'STREAM', 'PARSE', 'FUSE', 'FORECAST', 'ANOMALY', 'DIRECT', 'DISPATCH', 'OPTIMIZE'], useCase: 'Standard production deployment' },
  { name: '50-Node (Global)', desc: 'Multi-region, air-gap capable', components: 'All 9 products + LOOP platform', useCase: 'Enterprise-wide, regulated industries' },
] as const

const ENVIRONMENTS = [
  { name: 'AWS', desc: 'EKS, Lambda, IoT Core, Greengrass', certs: ['SOC2', 'ISO27001', 'FedRAMP'] },
  { name: 'GCP', desc: 'GKE, Cloud Run, IoT Core, Edge TPU', certs: ['SOC2', 'ISO27001', 'FedRAMP'] },
  { name: 'Azure', desc: 'AKS, Functions, IoT Hub, Arc', certs: ['SOC2', 'ISO27001', 'FedRAMP'] },
  { name: 'On-Prem', desc: 'OpenShift, Tanzu, Rancher, bare metal', certs: ['Air-gap', 'Classified', 'ITAR'] },
  { name: 'Edge', desc: 'K3s, MicroK8s, custom gateway', certs: ['Ruggedized', 'Offline-first', 'Intermittent'] },
  { name: 'Hybrid', desc: 'Unified control plane across all', certs: ['Consistent API', 'GitOps', 'Policy-as-Code'] },
] as const
</script>

<template>
  <div class="deployment-panel">
    <header class="panel__header">
      <h2 class="panel__title">Deployment</h2>
      <span class="panel__badge">3 Tiers · Any Topology</span>
    </header>

    <div class="deployment-tiers">
      <article
        v-for="tier in DEPLOYMENT_TIERS"
        :key="tier.name"
        class="tier-card"
        :class="{ highlighted: tier.highlighted }"
      >
        <header class="tier-card__header">
          <h3 class="tier-card__name">{{ tier.name }}</h3>
          <span v-if="tier.highlighted" class="tier-card__badge">Popular</span>
        </header>

        <div class="tier-card__specs">
          <div class="tier-spec">
            <span class="tier-spec__label">Nodes</span>
            <span class="tier-spec__value">{{ tier.nodes }}</span>
          </div>
          <div class="tier-spec">
            <span class="tier-spec__label">Signals/day</span>
            <span class="tier-spec__value">{{ tier.signals }}</span>
          </div>
          <div class="tier-spec">
            <span class="tier-spec__label">Latency (p99)</span>
            <span class="tier-spec__value">{{ tier.latency }}</span>
          </div>
        </div>

        <div class="tier-card__price">
          <span class="tier-card__amount">{{ tier.price }}</span>
          <span class="tier-card__period">/month</span>
        </div>

        <ul class="tier-card__features">
          <li v-for="f in tier.features" :key="f">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" class="tier-card__check">
              <path d="M3 8l3 3 5-5"/>
            </svg>
            {{ f }}
          </li>
        </ul>

        <NuxtLink :to="`/contact?tier=${tier.name.toLowerCase()}`" class="tier-card__cta btn" :class="tier.highlighted ? 'btn--primary' : ''">
          {{ tier.cta }}
        </NuxtLink>
      </article>
    </div>

    <section class="architectures">
      <h3 class="architectures__title">Reference Architectures</h3>
      <div class="architectures__grid">
        <article v-for="arch in ARCHITECTURES" :key="arch.name" class="arch-card">
          <header class="arch-card__header">
            <h4 class="arch-card__name">{{ arch.name }}</h4>
            <span class="arch-card__desc">{{ arch.desc }}</span>
          </header>
          <p class="arch-card__usecase">{{ arch.useCase }}</p>
          <div class="arch-card__components">
            <span
              v-for="c in (typeof arch.components === 'string' ? [arch.components] : arch.components)"
              :key="c"
              class="tag tag--product"
            >
              {{ c }}
            </span>
          </div>
        </article>
      </div>
    </section>

    <section class="environments">
      <h3 class="environments__title">Supported Environments</h3>
      <div class="environments__grid">
        <div class="env-card" v-for="env in ENVIRONMENTS" :key="env.name">
          <span class="env-card__name">{{ env.name }}</span>
          <p class="env-card__desc">{{ env.desc }}</p>
          <div class="env-card__certs">
            <span class="tag tag--neutral" v-for="c in env.certs" :key="c">{{ c }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.deployment-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-2);
  overflow-y: auto;
}

.panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--border);
  background: var(--bg);
}

.panel__title {
  font-family: var(--font-sans);
  font-size: var(--text-md);
  font-weight: 600;
  color: var(--fg);
}

.panel__badge {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--fg-faint);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.deployment-tiers {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-3);
}

.tier-card {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  transition: border-color var(--duration-fast), box-shadow var(--duration-fast);
}

.tier-card.highlighted {
  border-color: var(--accent);
  box-shadow: 0 0 0 1px var(--accent-bg);
}

.tier-card:hover { border-color: var(--border-strong); }

.tier-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-3);
}

.tier-card__name {
  font-family: var(--font-sans);
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--fg);
  margin: 0;
}

.tier-card__badge {
  font-family: var(--font-mono);
  font-size: 9px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: var(--accent);
  color: white;
  padding: 1px 6px;
  border-radius: 2px;
}

.tier-card__specs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-2);
  margin-bottom: var(--space-3);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--border);
}

.tier-spec {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  text-align: center;
}

.tier-spec__label {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--fg-faint);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.tier-spec__value {
  font-family: var(--font-sans);
  font-size: var(--text-md);
  font-weight: 600;
  color: var(--fg);
}

.tier-card__price {
  display: flex;
  align-items: baseline;
  gap: var(--space-1);
  margin-bottom: var(--space-3);
}

.tier-card__amount {
  font-family: var(--font-mono);
  font-size: var(--text-2xl);
  font-weight: 600;
  color: var(--fg);
}

.tier-card__period {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--fg-faint);
}

.tier-card__features {
  list-style: none;
  padding: 0;
  margin: 0 0 var(--space-4);
  flex: 1;
}

.tier-card__features li {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--fg-muted);
  margin-bottom: var(--space-2);
  line-height: var(--leading-normal);
}

.tier-card__check {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  color: var(--positive);
  margin-top: 1px;
}

.tier-card__cta {
  text-align: center;
}

.architectures {
  margin-top: var(--space-2);
}

.architectures__title {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--fg-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 var(--space-3) var(--space-2);
}

.architectures__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-3);
}

.arch-card {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
  padding: var(--space-3);
}

.arch-card__header { margin-bottom: var(--space-2); }

.arch-card__name {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--fg);
  margin: 0 0 var(--space-1);
}

.arch-card__desc {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--fg-faint);
}

.arch-card__usecase {
  font-size: var(--text-xs);
  color: var(--fg-muted);
  margin: 0 0 var(--space-2);
}

.arch-card__components {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

.environments {
  margin-top: var(--space-2);
}

.environments__title {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--fg-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 var(--space-3) var(--space-2);
}

.environments__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-3);
}

.env-card {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
  padding: var(--space-3);
}

.env-card__name {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--fg);
  display: block;
  margin-bottom: var(--space-1);
}

.env-card__desc {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--fg-muted);
  margin: 0 0 var(--space-2);
}

.env-card__certs {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

@media (max-width: 1000px) {
  .deployment-tiers { grid-template-columns: 1fr; }
  .architectures__grid { grid-template-columns: 1fr; }
  .environments__grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 600px) {
  .environments__grid { grid-template-columns: 1fr; }
}
</style>