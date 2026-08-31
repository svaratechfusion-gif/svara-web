<script setup lang="ts">
// SVARA AI — header (the chatbot's identity). A mouse-reactive intelligence core +
// title/eyebrow on the left; live status + minimize/close on the right. Tiny technical
// labels use monospace (.sv-mono); the title uses clean sans.
import { X, Minus } from '@lucide/vue'
import IntelligenceCore from './IntelligenceCore.vue'

defineEmits<{ minimize: [], close: [] }>()
</script>

<template>
  <header class="ch">
    <div class="ch__id">
      <IntelligenceCore :size="40" :rings="2" interactive />
      <div class="ch__titles">
        <p class="ch__title">SVARA AI</p>
        <p class="ch__eyebrow sv-mono">INTELLIGENCE LAYER</p>
      </div>
    </div>

    <div class="ch__right">
      <span class="ch__status sv-mono"><span class="ch__status-dot" />ONLINE</span>
      <button type="button" class="ch__btn" aria-label="Minimize" @click="$emit('minimize')">
        <Minus :size="16" :stroke-width="1.75" />
      </button>
      <button type="button" class="ch__btn" aria-label="Close SVARA AI" @click="$emit('close')">
        <X :size="16" :stroke-width="1.75" />
      </button>
    </div>
  </header>
</template>

<style scoped>
.ch {
  flex: 0 0 auto;
  height: 78px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 14px 0 16px;
  border-bottom: 1px solid var(--sv-border-soft, rgba(15, 27, 77, 0.08));
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(255, 255, 255, 0.55));
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
}

.ch__id { display: flex; align-items: center; gap: 12px; min-width: 0; }
.ch__titles { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
.ch__title {
  margin: 0;
  font-size: 15.5px;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: var(--sv-navy, #0f1b4d);
  line-height: 1.1;
}
.ch__eyebrow {
  margin: 0;
  font-size: 9.5px;
  letter-spacing: 0.22em;
  color: var(--sv-muted, rgba(15, 27, 77, 0.5));
  line-height: 1;
}

.ch__right { display: flex; align-items: center; gap: 6px; }
.ch__status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-right: 4px;
  font-size: 9.5px;
  letter-spacing: 0.14em;
  color: var(--sv-muted, rgba(15, 27, 77, 0.58));
}
.ch__status-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #35c07a;
  box-shadow: 0 0 0 3px rgba(53, 192, 122, 0.14);
}

.ch__btn {
  display: inline-grid;
  place-items: center;
  width: 30px; height: 30px;
  border-radius: 9px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--sv-muted, rgba(15, 27, 77, 0.6));
  cursor: pointer;
  transition: background 160ms ease, color 160ms ease;
}
.ch__btn:hover { background: var(--sv-surface, #f4f7fa); color: var(--sv-navy, #0f1b4d); }
.ch__btn:focus-visible { outline: 2px solid var(--sv-blue, #5d8fbe); outline-offset: 2px; }
</style>
