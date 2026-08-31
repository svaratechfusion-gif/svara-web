<script setup lang="ts">
// WHY CHOOSE SVARA — interactive comparison: Traditional Software vs
// SVARA. A toggle stamps two states side-by-side; differences animate.
// Messaging is verbatim from the Content Bible (homeSection06 reasons +
// platformContent.comparisons contrasting point tools vs the connected
// system). Motion represents the shift from fragmentation to connected
// intelligence, not decoration.
import { ref } from 'vue'
import { homeSection06 } from '~~/lib/content/home'
import { platformContent } from '~~/lib/content/platform'

const mode = ref<'svara' | 'traditional'>('svara')

const reasons = homeSection06.reasons

// three contrast pairs derived from the Content Bible comparisons
const contrasts = platformContent.comparisons.map((c) => ({
  concept: c.concept,
  traditional: c.description,
  svara: c.differentiator,
}))
</script>

<template>
  <section class="wc">
    <div class="wc__head">
      <p class="wc__eyebrow">Why Organizations Choose SVARA</p>
      <h2 class="wc__title">Connected intelligence, not another point tool.</h2>
    </div>

    <div class="wc__toggle" role="tablist" aria-label="Compare SVARA with traditional software">
      <button
        class="wc__tab" :class="{ 'is-on': mode === 'traditional' }"
        @click="mode = 'traditional'"
      >Traditional Software</button>
      <button
        class="wc__tab wc__tab--accent" :class="{ 'is-on': mode === 'svara' }"
        @click="mode = 'svara'"
      >SVARA</button>
      <span class="wc__toggle-glide" :class="{ 'is-right': mode === 'svara' }" />
    </div>

    <div class="wc__board">
      <!-- traditional pane -->
      <div class="wc__pane" :class="{ 'is-dim': mode === 'svara' }">
        <h3 class="wc__pane-title wc__pane-title--trad">Traditional Software</h3>
        <ul class="wc__contrast">
          <li v-for="(c, i) in contrasts" :key="`t${i}`" class="wc__row" :class="{ 'is-off': mode === 'svara' }">
            <span class="wc__row-concept">{{ c.concept }}</span>
            <span class="wc__row-text">{{ c.traditional }}</span>
          </li>
        </ul>
      </div>
      <!-- SVARA pane -->
      <div class="wc__pane" :class="{ 'is-dim': mode !== 'svara' }">
        <h3 class="wc__pane-title wc__pane-title--acc">SVARA</h3>
        <ul class="wc__contrast">
          <li v-for="(c, i) in contrasts" :key="`s${i}`" class="wc__row" :class="{ 'is-off': mode !== 'svara' }">
            <span class="wc__row-concept">{{ c.concept }}</span>
            <span class="wc__row-text">{{ c.svara }}</span>
          </li>
        </ul>
      </div>
    </div>

    <ul class="wc__reasons">
      <li v-for="r in reasons" :key="r.title" class="wc__reason">
        <span class="wc__reason-mark" />
        <h4 class="wc__reason-title">{{ r.title }}</h4>
        <p class="wc__reason-desc">{{ r.description }}</p>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.wc {
  background: #F8FBFF;
  padding: var(--space-32) var(--container-pad);
}
.wc__head { max-width: 760px; margin: 0 auto var(--space-12); text-align: center; }
.wc__eyebrow {
  margin: 0 0 var(--space-4);
  font-family: var(--font-mono); font-size: var(--type-label);
  letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent);
}
.wc__title {
  margin: 0;
  font-size: clamp(34px, 4.4vw, 56px);
  font-weight: var(--weight-bold); line-height: 1.1;
  letter-spacing: -0.02em; color: var(--color-ink-strong);
}

/* ---- toggle ---- */
.wc__toggle {
  position: relative;
  display: inline-flex;
  margin: 0 auto var(--space-12);
  padding: 5px;
  gap: 4px;
  border-radius: var(--radius-pill);
  background: #EAF0F8;
  border: 1px solid var(--color-border);
  display: flex;
  width: max-content;
}
.wc__tab {
  position: relative; z-index: 2;
  padding: 11px 26px;
  border: none; background: transparent;
  border-radius: var(--radius-pill);
  font-size: 14px; font-weight: var(--weight-semibold); color: var(--color-text-secondary);
  cursor: pointer;
  transition: color var(--motion-medium) var(--ease-smooth);
}
.wc__tab--accent.is-on { color: #fff; }
.wc__tab.is-on { color: var(--color-ink-strong); }
.wc__toggle-glide {
  position: absolute; z-index: 1; top: 5px; left: 5px;
  width: calc(50% - 5px); height: calc(100% - 10px);
  border-radius: var(--radius-pill);
  background: var(--color-text-faint);
  transition: transform var(--motion-medium) var(--ease-out), background var(--motion-medium) var(--ease-smooth);
}
.wc__toggle-glide.is-right { transform: translateX(100%); background: var(--color-accent); }

/* ---- board ---- */
.wc__board {
  display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-6);
  max-width: 1180px; margin-inline: auto;
}
.wc__pane {
  border-radius: var(--radius-lg);
  background: #fff;
  border: 1px solid var(--color-border);
  padding: var(--space-10);
  box-shadow: 0 2px 8px rgba(16, 42, 91, 0.05), 0 20px 60px rgba(16, 42, 91, 0.06);
  transition: opacity var(--motion-medium) var(--ease-smooth), transform var(--motion-medium) var(--ease-out);
}
.wc__pane.is-dim { opacity: 0.42; transform: scale(0.99); }
.wc__pane-title { margin: 0 0 var(--space-6); font-size: 20px; font-weight: var(--weight-semibold); letter-spacing: -0.01em; }
.wc__pane-title--trad { color: var(--color-text-faint); }
.wc__pane-title--acc { color: var(--color-accent); }
.wc__contrast { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--space-5); }
.wc__row { border-top: 1px solid var(--color-border); padding-top: var(--space-5); display: flex; flex-direction: column; gap: 6px; transition: filter var(--motion-medium) var(--ease-smooth); }
.wc__row-concept { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-text-faint); }
.wc__row-text { font-size: 15px; line-height: 1.55; color: var(--color-text-secondary); }
.wc__row.is-off { filter: grayscale(0.6); }

/* ---- reasons ---- */
.wc__reasons {
  list-style: none; margin: var(--space-20) auto 0; padding: 0;
  max-width: 1180px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: var(--space-8);
}
.wc__reason {
  padding: var(--space-8);
  border-radius: var(--radius-md);
  background: #F1F6FE;
  border: 1px solid var(--color-border);
}
.wc__reason-mark { display: block; width: 28px; height: 3px; border-radius: 999px; background: var(--color-accent); margin-bottom: var(--space-5); }
.wc__reason-title { margin: 0 0 var(--space-3); font-size: 18px; font-weight: var(--weight-semibold); color: var(--color-ink-strong); letter-spacing: -0.01em; }
.wc__reason-desc { margin: 0; font-size: 14.5px; line-height: 1.6; color: var(--color-text-secondary); }

@media (max-width: 860px) {
  .wc__board { grid-template-columns: 1fr; }
  .wc__pane.is-dim { opacity: 1; transform: none; }
}
</style>