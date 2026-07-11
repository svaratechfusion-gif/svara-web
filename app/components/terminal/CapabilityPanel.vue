<script setup lang="ts">
interface CapabilityDetail {
  slug: string
  label: string
  desc: string
  products: string[]
  signals: string[]
  models: string[]
  specs: Record<string, string>
}

const CAPABILITIES: CapabilityDetail[] = [
  {
    slug: 'observe',
    label: 'OBSERVE',
    desc: 'Capture operational reality from any signal source',
    products: ['SENSE', 'STREAM', 'VAULT'],
    signals: ['Cameras (RTSP/ONVIF)', 'IoT Sensors (MQTT/OPC-UA)', 'Industrial PLCs', 'Satellite/Drone', 'Enterprise Systems (SAP, Maximo)', 'Human Input (Mobile/Voice)'],
    models: ['YOLOv8 Detection', 'SAM Segmentation', 'Whisper ASR', 'LayoutLM Document'],
    specs: { 'Throughput': '2.3M signals/sec', 'Latency (p50)': '12ms', 'Latency (p99)': '847ms', 'Connector Count': '47', 'Protocol Support': '12' }
  },
  {
    slug: 'understand',
    label: 'UNDERSTAND',
    desc: 'Interpret signals in context — models that structure chaos',
    products: ['PARSE', 'FUSE', 'CONTEXT'],
    signals: ['Structured Events', 'Unstructured Documents', 'Audio Streams', 'Video Feeds', 'Time Series', 'Graph Relationships'],
    models: ['BERT-NER', 'CodeBERT', 'TimeSeries Transformer', 'GraphSAGE', 'CLIP Vision-Language'],
    specs: { 'Model Count': '12', 'Inference (p50)': '8ms', 'Accuracy (F1)': '0.94', 'Languages': '47', 'Context Window': '128k' }
  },
  {
    slug: 'predict',
    label: 'PREDICT',
    desc: 'Forecast next state early enough to act, not react',
    products: ['FORECAST', 'ANOMALY', 'RISK'],
    signals: ['Equipment Telemetry', 'Process Variables', 'Environmental Data', 'Supply Chain Events', 'Workforce Patterns', 'Market Signals'],
    models: ['Temporal Fusion Transformer', 'DeepAR', 'Prophet', 'LSTM-AE', 'Gradient Boosting'],
    specs: { 'Horizons': '8 (1h–90d)', 'Inference': '<100ms', 'MAE Improvement': '34%', 'Models in Prod': '234', 'Retrain Cadence': 'Daily' }
  },
  {
    slug: 'coordinate',
    label: 'COORDINATE',
    desc: 'Orchestrate action across systems and people',
    products: ['DIRECT', 'DISPATCH', 'ESCALATE'],
    signals: ['Work Orders', 'Alerts', 'Approvals', 'Notifications', 'API Calls', 'Human Tasks'],
    models: ['Policy Engine', 'Routing Optimizer', 'Priority Scoring', 'Resource Allocator'],
    specs: { 'Actions/sec': '47,000', 'Systems Connected': '89', 'Avg Resolution': '3.2min', 'Escalation Rate': '2.1%', 'Audit Trail': '100%' }
  },
  {
    slug: 'improve',
    label: 'IMPROVE',
    desc: 'Feed every outcome back — intelligence that compounds',
    products: ['OPTIMIZE', 'LEARN', 'EVOLVE'],
    signals: ['Outcome Labels', 'Model Drift', 'Performance Deltas', 'User Feedback', 'A/B Results', 'Counterfactuals'],
    models: ['Online Learning', 'Causal Inference', 'Bandit Optimization', 'NAS', 'Distillation'],
    specs: { 'Loops Active': '3', 'Improvement/Cycle': '12%', 'Drift Detection': '<4h', 'Auto-Retrain': 'Enabled', 'Rollback': '<30s' }
  },
] as const

const expanded = ref<string | null>(null)

function toggle(slug: string) {
  expanded.value = expanded.value === slug ? null : slug
}
</script>

<template>
  <section class="panel capability-panel" aria-labelledby="cap-title">
    <header class="panel__header">
      <h2 id="cap-title" class="panel__title">Capabilities</h2>
      <span class="panel__badge">5 Active</span>
    </header>

    <div class="capability-list" role="list">
      <article
        v-for="cap in CAPABILITIES"
        :key="cap.slug"
        class="capability-row"
        :class="{ expanded: expanded === cap.slug }"
        role="listitem"
      >
        <div class="capability-row__summary" @click="toggle(cap.slug)">
          <span class="capability-row__icon" :data-icon="cap.slug"></span>
          <div class="capability-row__main">
            <span class="capability-row__label">{{ cap.label }}</span>
            <span class="capability-row__desc">{{ cap.desc }}</span>
          </div>
          <span class="capability-row__count">{{ cap.products.length }} products</span>
          <span class="capability-row__chevron" aria-hidden="true">›</span>
        </div>

        <div class="capability-row__detail" v-show="expanded === cap.slug" @click.stop>
          <div class="capability-detail">
            <div class="capability-detail__section">
              <span class="capability-detail__section-title">Products</span>
              <div class="capability-detail__tags">
                <span v-for="p in cap.products" :key="p" class="tag tag--product">{{ p }}</span>
              </div>
            </div>

            <div class="capability-detail__section">
              <span class="capability-detail__section-title">Signal Sources</span>
              <ul class="capability-detail__list">
                <li v-for="s in cap.signals" :key="s">{{ s }}</li>
              </ul>
            </div>

            <div class="capability-detail__section">
              <span class="capability-detail__section-title">Models</span>
              <div class="capability-detail__tags">
                <span v-for="m in cap.models" :key="m" class="tag tag--model">{{ m }}</span>
              </div>
            </div>

            <div class="capability-detail__specs">
              <table class="spec-table">
                <tbody>
                  <tr v-for="[k, v] in Object.entries(cap.specs)" :key="k">
                    <th class="spec-table__key">{{ k }}</th>
                    <td class="spec-table__value">{{ v }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <NuxtLink :to="`/capabilities/${cap.slug}`" class="capability-detail__link">
              Open full specification →
            </NuxtLink>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.capability-panel {
  flex: 1;
  overflow-y: auto;
}

.capability-list {
  padding: var(--space-2);
}

.capability-row {
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
  margin-bottom: var(--space-2);
  background: var(--bg);
  overflow: hidden;
}

.capability-row__summary {
  display: grid;
  grid-template-columns: 28px 1fr auto auto;
  gap: var(--space-3);
  align-items: center;
  padding: var(--space-3) var(--space-4);
  cursor: pointer;
  transition: background var(--duration-instant);
}

.capability-row__summary:hover {
  background: var(--bg-hover);
}

.capability-row__icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--accent);
  background: var(--accent-bg);
  border-radius: 4px;
}

.capability-row__icon[data-icon="observe"]::before { content: '▲'; }
.capability-row__icon[data-icon="understand"]::before { content: '◆'; }
.capability-row__icon[data-icon="predict"]::before { content: '●'; }
.capability-row__icon[data-icon="coordinate"]::before { content: '◆'; }
.capability-row__icon[data-icon="improve"]::before { content: '⟲'; }

.capability-row__main { min-width: 0; }

.capability-row__label {
  display: block;
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--fg);
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.capability-row__desc {
  display: block;
  font-size: var(--text-xs);
  color: var(--fg-muted);
  margin-top: var(--space-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.capability-row__count {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--fg-faint);
  white-space: nowrap;
}

.capability-row__chevron {
  font-family: var(--font-mono);
  font-size: var(--text-base);
  color: var(--fg-faint);
  transition: transform var(--duration-fast), color var(--duration-fast);
}

.capability-row.expanded .capability-row__chevron {
  transform: rotate(90deg);
  color: var(--accent);
}

.capability-row__detail {
  overflow: hidden;
  max-height: 0;
  transition: max-height var(--duration-normal) var(--easing);
}

.capability-row.expanded .capability-row__detail {
  max-height: 500px;
}

.capability-detail {
  padding: 0 var(--space-4) var(--space-4);
  border-top: 1px solid var(--border);
  background: var(--bg-panel);
  animation: slideDown var(--duration-normal) var(--easing);
}

.capability-detail__section { margin-bottom: var(--space-4); }
.capability-detail__section:last-of-type { margin-bottom: var(--space-3); }

.capability-detail__section-title {
  display: block;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--fg-faint);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-2);
}

.capability-detail__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.tag {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  padding: var(--space-1) var(--space-2);
  border-radius: 3px;
  background: var(--bg);
  border: 1px solid var(--border);
  color: var(--fg);
}

.tag--product { border-color: var(--accent); color: var(--accent); }
.tag--model { border-color: var(--positive); color: var(--positive); }

.capability-detail__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: var(--space-2);
}

.capability-detail__list li {
  font-size: var(--text-xs);
  color: var(--fg-muted);
  padding: var(--space-1) var(--space-2);
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 3px;
  font-family: var(--font-mono);
}

.spec-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-xs);
}

.spec-table th,
.spec-table td {
  padding: var(--space-1) var(--space-2);
  text-align: left;
  font-family: var(--font-mono);
}

.spec-table__key { color: var(--fg-faint); width: 40%; }
.spec-table__value { color: var(--fg); font-weight: 500; font-variant-numeric: tabular-nums; }

.capability-detail__link {
  display: inline-block;
  margin-top: var(--space-3);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--accent);
  text-decoration: none;
}

.capability-detail__link:hover { text-decoration: underline; }

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

[data-density="dense"] .capability-row__summary { padding: var(--space-2) var(--space-3); }
[data-density="dense"] .capability-detail { padding: 0 var(--space-3) var(--space-3); }
</style>