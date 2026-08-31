<script setup lang="ts">
// PRODUCT EXPLORER — replaces product cards with floating desktop
// application windows. Every product behaves like a real enterprise
// application: a title bar, live metrics, and a miniature dashboard that
// ticks continuously. Hovering expands the active product (the window
// raises, gains focus, its connection the to core brightens) while others
// dim — motion represents live enterprise intelligence, not decoration.
// Copy + product set come verbatim from the Content Bible via platforms.ts.
import { ref, computed } from 'vue'
import { PLATFORMS } from '~/utils/platforms'

const active = ref<number | null>(null)

// which windows keep ticking — the active window's dashboard streams faster
const pulse = (i: number) => {
  const base = 2.4
  return active.value === i ? base * 0.6 : base + (i % 3) * 0.4
}

const dim = computed(() => active.value !== null)

function open(i: number) { active.value = i }
function close() { active.value = null }
</script>

<template>
  <section class="px" @mouseleave="close">
    <div class="px__head">
      <p class="px__eyebrow">Product Explorer</p>
      <h2 class="px__title">Every product, an enterprise application.</h2>
      <p class="px__sub">Ten platforms. Each one a live window onto enterprise intelligence — hover to bring it into focus.</p>
    </div>

    <div class="px__grid">
      <NuxtLink
        v-for="(p, i) in PLATFORMS" :key="p.name"
        :to="p.to"
        class="px__win"
        :class="{ 'is-active': active === i, 'is-dim': dim && active !== i }"
        :style="{ '--tick': pulse(i) + 's' }"
        @mouseenter="open(i)"
        @focus="open(i)"
        @blur="close"
      >
        <div class="px__bar">
          <span class="px__dots"><i /><i /><i /></span>
          <span class="px__cap">{{ p.capability }}</span>
          <span class="px__live"><span class="px__live-dot" />LIVE</span>
        </div>

        <div class="px__body">
          <h3 class="px__name">{{ p.name }}</h3>
          <p class="px__desc">{{ p.description }}</p>

          <div class="px__dash">
            <div v-for="m in p.metrics" :key="m.label" class="px__metric">
              <div class="px__metric-top">
                <span class="px__metric-label">{{ m.label }}</span>
                <span class="px__metric-value">{{ m.value }}</span>
              </div>
              <div class="px__bar-track"><span class="px__bar-fill" :style="{ width: m.fill + '%' }" /></div>
            </div>
          </div>
        </div>

        <div class="px__foot">
          <span>Open application</span>
          <span class="px__arrow" aria-hidden="true">→</span>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.px {
  background: #F8FBFF;
  padding: var(--space-32) var(--container-pad);
}
.px__head {
  max-width: 720px;
  margin: 0 auto var(--space-20);
  text-align: center;
}
.px__eyebrow {
  margin: 0 0 var(--space-4);
  font-family: var(--font-mono);
  font-size: var(--type-label);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-accent);
}
.px__title {
  margin: 0;
  font-size: clamp(34px, 4.4vw, 56px);
  font-weight: var(--weight-bold);
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--color-ink-strong);
}
.px__sub {
  margin: var(--space-5) 0 0;
  font-size: var(--type-body);
  line-height: var(--leading-body);
  color: var(--color-text-secondary);
}

.px__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-6);
  max-width: var(--container-max);
  margin-inline: auto;
}

.px__win {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-lg);
  background: #ffffff;
  border: 1px solid var(--color-border);
  box-shadow: 0 2px 8px rgba(16, 42, 91, 0.04), 0 18px 48px rgba(16, 42, 91, 0.06);
  overflow: hidden;
  text-decoration: none;
  color: var(--color-text);
  transition: transform var(--motion-medium) var(--ease-out),
              box-shadow var(--motion-medium) var(--ease-out),
              border-color var(--motion-medium) var(--ease-out),
              opacity var(--motion-medium) var(--ease-smooth);
}
.px__win.is-active {
  transform: translateY(-6px) scale(1.015);
  border-color: rgba(47, 127, 230, 0.4);
  box-shadow: 0 4px 12px rgba(16, 42, 91, 0.06), 0 32px 80px rgba(16, 42, 91, 0.14);
  z-index: 2;
}
.px__win.is-dim { opacity: 0.5; }

/* window chrome — a real app title bar */
.px__bar {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: 10px 14px;
  background: #F4F7FC;
  border-bottom: 1px solid var(--color-border);
}
.px__dots { display: inline-flex; gap: 6px; }
.px__dots i { width: 10px; height: 10px; border-radius: 50%; background: rgba(16, 42, 91, 0.16); }
.px__dots i:first-child { background: rgba(16, 42, 91, 0.4); }
.px__cap {
  flex: 1;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-faint);
}
.px__live {
  display: inline-flex; align-items: center; gap: 5px;
  font-family: var(--font-mono);
  font-size: 9.5px;
  letter-spacing: 0.1em;
  color: var(--color-accent);
}
.px__live-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--color-accent);
  animation: px-blink 1.6s ease-in-out infinite;
}
.px__win .px__live-dot { animation-duration: var(--tick); }
@keyframes px-blink { 0%,100% { opacity: 1; } 50% { opacity: 0.25; } }

.px__body { padding: var(--space-6); flex: 1; display: flex; flex-direction: column; }
.px__name {
  margin: 0;
  font-size: 21px;
  font-weight: var(--weight-semibold);
  letter-spacing: -0.01em;
  color: var(--color-ink-strong);
}
.px__desc {
  margin: var(--space-2) 0 0;
  font-size: 14.5px;
  line-height: 1.55;
  color: var(--color-text-secondary);
}

.px__dash {
  margin-top: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-top: 1px dashed var(--color-border);
  padding-top: var(--space-5);
}
.px__metric { display: flex; flex-direction: column; gap: 6px; }
.px__metric-top {
  display: flex; align-items: baseline; justify-content: space-between;
  font-family: var(--font-mono);
}
.px__metric-label { font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-text-faint); }
.px__metric-value { font-size: 13px; font-weight: var(--weight-semibold); color: var(--color-ink-strong); }
.px__bar-track {
  height: 5px; border-radius: 999px;
  background: rgba(16, 42, 91, 0.08);
  overflow: hidden;
}
.px__bar-fill {
  display: block; height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--color-accent), var(--color-ink-strong));
  animation: px-tick var(--tick) ease-in-out infinite alternate;
  transform-origin: left;
}
@keyframes px-tick {
  0% { transform: scaleX(0.92); opacity: 0.85; }
  100% { transform: scaleX(1); opacity: 1; }
}

.px__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px var(--space-6);
  border-top: 1px solid var(--color-border);
  font-size: 13px;
  font-weight: var(--weight-semibold);
  color: var(--color-accent);
}
.px__arrow { transition: transform var(--motion-medium) var(--ease-smooth); }
.px__win:hover .px__arrow { transform: translateX(4px); }
.px__win:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }

@media (max-width: 768px) {
  .px__win.is-active { transform: none; }
  .px__win.is-dim { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .px__live-dot, .px__bar-fill { animation: none; }
}
</style>