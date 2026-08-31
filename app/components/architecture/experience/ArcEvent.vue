<script setup lang="ts">
// 17 · REAL-TIME ARCHITECTURE — how intelligence moves when something happens.
// The sequence activates step-by-step as the section enters the viewport.
import { onBeforeUnmount, onMounted, ref } from 'vue'
const steps = [
  'Camera detects anomaly', 'Edge inference', 'Event created', 'Event bus', 'Context enrichment',
  'AI reasoning', 'Policy check', 'Workflow triggered', 'Enterprise action', 'Result observed',
]
const root = ref<HTMLElement>()
const on = ref(false)
let observer: IntersectionObserver | null = null
onMounted(() => {
  observer = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { on.value = true; observer?.disconnect() } }, { threshold: 0.2 })
  if (root.value) observer.observe(root.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <section ref="root" class="aev hx-section" :class="{ 'is-on': on }">
    <div class="hx-container">
      <header class="aev__head">
        <p class="hx-eyebrow"><span class="hx-index">17</span> Real-Time Architecture</p>
        <h2 class="hx-title">When something happens, <span class="lite">intelligence moves.</span></h2>
        <p class="hx-lead">An event-driven architecture means signals don't wait — a single detection propagates through the stack into a governed enterprise action in real time.</p>
      </header>

      <ol class="aev__seq">
        <span class="aev__bus" aria-hidden="true" />
        <li v-for="(s, i) in steps" :key="s" class="aev__step" :style="{ '--k': i }">
          <span class="aev__dot" aria-hidden="true" />
          <span class="aev__n hx-mono">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="aev__t">{{ s }}</span>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.aev__head { max-width: 60ch; margin-bottom: clamp(44px, 5vw, 76px); }
.aev__seq { position: relative; list-style: none; margin: 0; padding: 0 0 0 8px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px 40px; }
.aev__bus { position: absolute; left: 13px; top: 8px; bottom: 8px; width: 1px; background: linear-gradient(180deg, var(--sig), var(--sig-soft)); opacity: 0.4; }
.aev__step { position: relative; display: flex; align-items: center; gap: 12px; padding: 12px 16px; border: 1px solid rgba(20,34,63,0.1); border-radius: 8px; background: rgba(255,255,255,0.5); opacity: 0.35; transform: translateX(-6px); transition: opacity 0.5s var(--ease-out), transform 0.5s var(--ease-out), border-color 0.5s var(--ease-out); transition-delay: calc(var(--k) * 0.12s); }
.is-on .aev__step { opacity: 1; transform: none; border-color: rgba(63,111,176,0.24); }
.aev__dot { width: 10px; height: 10px; border-radius: 50%; background: #fff; border: 1px solid rgba(20,34,63,0.3); flex: none; transition: all 0.5s var(--ease-out); transition-delay: calc(var(--k) * 0.12s); }
.is-on .aev__step:last-child .aev__dot, .is-on .aev__step:first-child .aev__dot { background: var(--sig); border-color: var(--sig); box-shadow: 0 0 0 4px rgba(63,111,176,0.14); }
.aev__n { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; color: var(--ink-muted); flex: none; }
.aev__t { font-size: 14px; font-weight: 500; letter-spacing: -0.01em; color: var(--ink-primary); }

@media (max-width: 760px) { .aev__seq { grid-template-columns: 1fr; } }
@media (prefers-reduced-motion: reduce) { .aev__step, .aev__dot { transition: none; opacity: 1; transform: none; } }
</style>
