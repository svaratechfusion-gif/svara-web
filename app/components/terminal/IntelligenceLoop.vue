<script setup lang="ts">
interface Capability {
  id: string
  label: string
  desc: string
  count: string
  x: number
  y: number
}

const CAPABILITIES: Capability[] = [
  { id: 'observe', label: 'OBSERVE', desc: 'Capture operational reality from any signal source', count: '47 connectors', x: 160, y: 40 },
  { id: 'understand', label: 'UNDERSTAND', desc: 'Interpret signals in context — models that structure chaos', count: '12 models', x: 268, y: 110 },
  { id: 'predict', label: 'PREDICT', desc: 'Forecast next state early enough to act, not react', count: '8 horizons', x: 268, y: 210 },
  { id: 'coordinate', label: 'COORDINATE', desc: 'Orchestrate action across systems and people', count: '6 actions', x: 160, y: 280 },
  { id: 'improve', label: 'IMPROVE', desc: 'Feed every outcome back — intelligence that compounds', count: '3 loops', x: 52, y: 210 },
] as const

const selected = ref<string | null>(null)

function select(id: string) {
  selected.value = selected.value === id ? null : id
}
</script>

<template>
  <section class="panel loop-panel" aria-labelledby="loop-title">
    <header class="panel__header">
      <h2 id="loop-title" class="panel__title">Intelligence Loop</h2>
      <span class="panel__badge">5 Capabilities · 1 Loop</span>
    </header>

    <div class="loop-diagram" role="img" aria-label="Intelligence Loop: Observe → Understand → Predict → Coordinate → Improve → back to Observe">
      <svg viewBox="0 0 320 320" class="loop-svg" @click="select(null)">
        <!-- Background circle -->
        <circle cx="160" cy="160" r="130" fill="none" stroke="var(--border)" stroke-width="1"/>

        <!-- Arrows between nodes -->
        <g class="loop-arrows" fill="none" stroke="var(--border)" stroke-width="1.5">
          <path d="M160 40 C200 40 230 70 250 110" marker-end="url(#arrow)"/>
          <path d="M250 110 C270 150 270 190 250 230" marker-end="url(#arrow)"/>
          <path d="M250 230 C230 270 200 300 160 300" marker-end="url(#arrow)"/>
          <path d="M160 300 C100 300 70 270 50 230" marker-end="url(#arrow)"/>
          <path d="M50 230 C30 190 30 150 50 110" marker-end="url(#arrow)"/>
          <path d="M50 110 C70 70 100 40 160 40" marker-end="url(#arrow)"/>

          <!-- Improve → Observe (closing the loop) -->
          <path d="M90 160 C90 140 110 120 130 120" stroke="var(--accent)" stroke-width="2" marker-end="url(#arrow-accent)"/>
        </g>

        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L8,3 Z" fill="var(--border)"/>
          </marker>
          <marker id="arrow-accent" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L8,3 Z" fill="var(--accent)"/>
          </marker>
        </defs>

        <!-- Capability nodes -->
        <g class="loop-nodes">
          <g
            v-for="cap in CAPABILITIES"
            :key="cap.id"
            :class="['loop-node', { active: selected === cap.id, inactive: selected && selected !== cap.id }]"
            @click="select(cap.id)"
            @keydown.enter="select(cap.id)"
            @keydown.space.prevent="select(cap.id)"
            tabindex="0"
            role="button"
            :aria-pressed="selected === cap.id"
            :aria-label="`${cap.label}: ${cap.desc}`"
            transform="translate(0,0)"
          >
            <circle :cx="cap.x" :cy="cap.y" r="38" fill="var(--bg-panel)" stroke="var(--border)" stroke-width="1.5"/>
            <circle :cx="cap.x" :cy="cap.y" r="32" fill="none" stroke="var(--accent)" stroke-width="2" stroke-dasharray="4 4" opacity="0.3"/>

            <text :x="cap.x" :y="cap.y - 4" text-anchor="middle" class="loop-icon" font-size="20">●</text>
            <text :x="cap.x" :y="cap.y + 14" text-anchor="middle" class="loop-label">{{ cap.label }}</text>
          </g>
        </g>

        <!-- Center: IMPROVE (the loop closer) -->
        <g class="loop-center" @click="select('improve')" @keydown.enter="select('improve')" tabindex="0" role="button" aria-pressed="false" aria-label="Improve: Feed every outcome back">
          <circle cx="160" cy="160" r="44" fill="var(--accent)" opacity="0.08"/>
          <circle cx="160" cy="160" r="38" fill="var(--accent)" opacity="0.12"/>
          <circle cx="160" cy="160" r="30" fill="var(--accent)"/>
          <text x="160" y="152" text-anchor="middle" fill="white" font-family="var(--font-sans)" font-size="10" font-weight="600">IMPROVE</text>
          <text x="160" y="166" text-anchor="middle" fill="white" font-family="var(--font-mono)" font-size="9">3 loops</text>
        </g>
      </svg>
    </div>

    <!-- Detail panel -->
    <div v-if="selected" class="loop-detail" :data-capability="selected">
      <div class="loop-detail__header">
        <h3 class="loop-detail__title">{{ selectedCap.label }}</h3>
        <button class="loop-detail__close" @click="select(null)" aria-label="Close detail">×</button>
      </div>
      <p class="loop-detail__desc">{{ selectedCap.desc }}</p>
      <div class="loop-detail__meta">
        <span class="loop-detail__count">{{ selectedCap.count }}</span>
        <NuxtLink :to="`/capabilities/${selectedCap.id}`" class="loop-detail__link">
          View specification →
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.panel {
  background: var(--bg-panel);
  border: var(--panel-border);
  border-radius: var(--panel-radius);
  overflow: hidden;
  display: flex;
  flex-direction: column;
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

.loop-panel {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.loop-diagram {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);
  min-height: 320px;
  position: relative;
}

.loop-svg {
  width: 100%;
  max-width: 320px;
  height: auto;
}

.loop-nodes {
  pointer-events: auto;
}

.loop-node {
  cursor: pointer;
  transition: transform var(--duration-fast), filter var(--duration-fast);
}

.loop-node:not(.inactive):hover {
  transform: scale(1.04);
  filter: drop-shadow(0 4px 12px rgba(0,102,204,0.15));
}

.loop-node.inactive {
  opacity: 0.35;
  pointer-events: none;
}

.loop-node:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: 50%;
}

.loop-node.active .loop-label {
  fill: var(--accent);
  font-weight: 600;
}

.loop-icon {
  fill: var(--fg-muted);
  font-family: var(--font-mono);
}

.loop-node.active .loop-icon {
  fill: var(--accent);
}

.loop-label {
  fill: var(--fg);
  font-family: var(--font-sans);
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  transition: fill var(--duration-fast);
}

.loop-center {
  cursor: pointer;
  transition: transform var(--duration-fast);
}

.loop-center:hover {
  transform: scale(1.02);
}

.loop-center:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: 50%;
}

.loop-detail {
  padding: var(--space-4);
  border-top: 1px solid var(--border);
  background: var(--bg);
  animation: slideDown var(--duration-normal) var(--easing);
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

.loop-detail__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-3);
  margin-bottom: var(--space-2);
}

.loop-detail__title {
  font-family: var(--font-sans);
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--fg);
  text-transform: uppercase;
  letter-spacing: -0.01em;
}

.loop-detail__close {
  font-family: var(--font-mono);
  font-size: var(--text-xl);
  line-height: 1;
  color: var(--fg-faint);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--panel-radius);
}

.loop-detail__close:hover {
  color: var(--fg);
  background: var(--bg-hover);
}

.loop-detail__desc {
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
  color: var(--fg-muted);
  margin-bottom: var(--space-3);
}

.loop-detail__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: var(--space-3);
  border-top: 1px solid var(--border);
}

.loop-detail__count {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--fg-faint);
}

.loop-detail__link {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--accent);
  text-decoration: none;
}

.loop-detail__link:hover {
  text-decoration: underline;
}

[data-density="dense"] .loop-diagram { padding: var(--space-3); min-height: 280px; }
[data-density="dense"] .loop-detail { padding: var(--space-3); }
[data-density="comfortable"] .loop-diagram { padding: var(--space-5); min-height: 360px; }
[data-density="comfortable"] .loop-detail { padding: var(--space-5); }
</style>