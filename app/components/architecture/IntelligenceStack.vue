<script setup lang="ts">
// ENTERPRISE INTELLIGENCE STACK — full interactive layered architecture.
// All 13 layers render stacked; hovering expands the active layer with its
// supporting explanation pulled VERBATIM from the Content Bible via
// architecture.ts. Group tints distinguish surface / application /
// intelligence / data / integration / platform layers. Motion represents
// architectural depth, not decoration.
import { ref } from 'vue'
import { INTELLIGENCE_STACK } from '~/utils/architecture'

const active = ref<number | null>(null)
const dim = ref(false)
function open(i: number) { active.value = i; dim.value = true }
function close() { active.value = null; dim.value = false }
</script>

<template>
  <section class="is-stack" @mouseleave="close">
    <div class="is-stack__head">
      <p class="is-stack__eyebrow">Enterprise Intelligence Stack</p>
      <h2 class="is-stack__title">One stack, top to silicon.</h2>
      <p class="is-stack__sub">Hover any layer to inspect the architecture beneath it — every layer is a verbatim specification from the Content Bible, not an abstraction.</p>
    </div>

    <div class="is-stack__col">
      <button
        v-for="(l, i) in INTELLIGENCE_STACK" :key="l.name"
        class="is-layer"
        :class="[`is-layer--${l.group}`, { 'is-active': active === i, 'is-dim': dim && active !== i }]"
        @mouseenter="open(i)"
        @focus="open(i)"
        @blur="close"
      >
        <span class="is-layer__rail" />
        <span class="is-layer__num">{{ String(i + 1).padStart(2, '0') }}</span>
        <span class="is-layer__name">{{ l.name }}</span>
        <span class="is-layer__group">{{ l.group }}</span>
        <Transition name="is-expand">
          <span v-if="active === i" class="is-layer__exp">{{ l.explanation }}</span>
        </Transition>
      </button>
    </div>
  </section>
</template>

<style scoped>
.is-stack { background: #F1F6FE; padding: var(--space-32) var(--container-pad); }
.is-stack__head { max-width: 760px; margin: 0 auto var(--space-16); text-align: center; }
.is-stack__eyebrow { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.is-stack__title { margin: 0; font-size: clamp(34px, 4.4vw, 56px); font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong); }
.is-stack__sub { margin: var(--space-5) 0 0; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }

.is-stack__col { max-width: 880px; margin: var(--space-12) auto 0; display: flex; flex-direction: column; gap: 3px; }
.is-layer { position: relative; display: grid; grid-template-columns: 4px 32px 1fr auto; align-items: center; gap: var(--space-4); padding: 14px 22px; background: #fff; border: 1px solid var(--color-border); border-radius: var(--radius-md); text-align: left; cursor: pointer; transition: background var(--motion-medium) var(--ease-smooth), border-color var(--motion-medium) var(--ease-smooth), box-shadow var(--motion-medium) var(--ease-out), opacity var(--motion-medium) var(--ease-smooth), grid-template-rows var(--motion-medium) var(--ease-out); box-shadow: 0 2px 8px rgba(16, 42, 91, 0.03); }
.is-layer__rail { width: 4px; height: 28px; border-radius: 999px; background: var(--color-text-faint); transition: background var(--motion-medium) var(--ease-out), height var(--motion-medium) var(--ease-out); }
.is-layer__num { font-family: var(--font-mono); font-size: 11px; color: var(--color-text-faint); letter-spacing: 0.08em; }
.is-layer__name { font-size: clamp(16px, 1.8vw, 22px); font-weight: var(--weight-bold); color: var(--color-ink-strong); letter-spacing: -0.01em; }
.is-layer__group { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-text-faint); }

.is-layer--surface .is-layer__rail { background: var(--color-text-faint); }
.is-layer--application .is-layer__rail { background: var(--color-accent); }
.is-layer--orchestration .is-layer__rail, .is-layer--integration .is-layer__rail { background: var(--color-ink-strong); }

.is-layer.is-active { border-color: rgba(47, 127, 230, 0.4); box-shadow: 0 10px 32px rgba(16, 42, 91, 0.12); grid-template-rows: auto auto; }
.is-layer.is-active .is-layer__rail { height: 100%; background: var(--color-accent); }
.is-layer.is-active .is-layer__group { color: var(--color-accent); }
.is-layer.is-dim { opacity: 0.45; }

.is-layer__exp { grid-column: 1 / -1; display: block; margin-top: 6px; padding-top: 12px; border-top: 1px dashed var(--color-border); font-size: 14px; line-height: 1.6; color: var(--color-text-secondary); }
.is-expand-enter-active, .is-expand-leave-active { transition: opacity var(--motion-medium) var(--ease-smooth); }
.is-expand-enter-from, .is-expand-leave-to { opacity: 0; }

@media (max-width: 768px) {
  .is-layer { grid-template-columns: 4px 28px 1fr; gap: 8px; padding: 12px 16px; }
  .is-layer__group { display: none; }
  .is-layer.is-dim { opacity: 1; }
}
</style>