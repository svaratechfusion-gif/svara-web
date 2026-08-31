<script setup lang="ts">
// WHY SVARA IS DIFFERENT — interactive comparison: Traditional SaaS vs
// SVARA. Contrast pairs come VERBATIM from the Content Bible
// (investors.ts comparisons array). Focus on ecosystem strategy, shared
// architecture, AI-native design, platform expansion.
import { ref } from 'vue'
import { irComparisons } from '~/utils/investors'

const mode = ref<'svara' | 'traditional'>('svara')
</script>

<template>
  <section class="wd">
    <div class="wd__head">
      <p class="wd__eyebrow">Why SVARA Is Different</p>
      <h2 class="wd__title">An ecosystem, not a point tool.</h2>
    </div>

    <div class="wd__toggle" role="tablist" aria-label="Compare SVARA with traditional SaaS">
      <button class="wd__tab" :class="{ 'is-on': mode === 'traditional' }" @click="mode = 'traditional'">Traditional SaaS</button>
      <button class="wd__tab wd__tab--accent" :class="{ 'is-on': mode === 'svara' }" @click="mode = 'svara'">SVARA</button>
      <span class="wd__glide" :class="{ 'is-right': mode === 'svara' }" />
    </div>

    <div class="wd__board">
      <div class="wd__pane" :class="{ 'is-dim': mode === 'svara' }">
        <h3 class="wd__pane-title wd__pane-title--trad">Traditional SaaS</h3>
        <ul class="wd__contrast">
          <li v-for="(c, i) in irComparisons" :key="`t${i}`" class="wd__row" :class="{ 'is-off': mode === 'svara' }">
            <span class="wd__row-concept">{{ c.concept }}</span>
            <span class="wd__row-text">{{ c.traditional }}</span>
          </li>
        </ul>
      </div>
      <div class="wd__pane" :class="{ 'is-dim': mode !== 'svara' }">
        <h3 class="wd__pane-title wd__pane-title--acc">SVARA</h3>
        <ul class="wd__contrast">
          <li v-for="(c, i) in irComparisons" :key="`s${i}`" class="wd__row" :class="{ 'is-off': mode !== 'svara' }">
            <span class="wd__row-concept">{{ c.concept }}</span>
            <span class="wd__row-text">{{ c.svara }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.wd { background: #F8FBFF; padding: var(--space-32) var(--container-pad); }
.wd__head { max-width: 760px; margin: 0 auto var(--space-12); text-align: center; }
.wd__eyebrow { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.wd__title { margin: 0; font-size: clamp(34px, 4.4vw, 56px); font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong); }

.wd__toggle { position: relative; display: flex; width: max-content; margin: 0 auto var(--space-12); padding: 5px; gap: 4px; border-radius: var(--radius-pill); background: #EAF0F8; border: 1px solid var(--color-border); }
.wd__tab { position: relative; z-index: 2; padding: 11px 26px; border: none; background: transparent; border-radius: var(--radius-pill); font-size: 14px; font-weight: var(--weight-semibold); color: var(--color-text-secondary); cursor: pointer; transition: color var(--motion-medium) var(--ease-smooth); }
.wd__tab--accent.is-on { color: #fff; }
.wd__tab.is-on { color: var(--color-ink-strong); }
.wd__glide { position: absolute; z-index: 1; top: 5px; left: 5px; width: calc(50% - 5px); height: calc(100% - 10px); border-radius: var(--radius-pill); background: var(--color-text-faint); transition: transform var(--motion-medium) var(--ease-out), background var(--motion-medium) var(--ease-smooth); }
.wd__glide.is-right { transform: translateX(100%); background: var(--color-accent); }

.wd__board { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-6); max-width: 1180px; margin-inline: auto; }
.wd__pane { border-radius: var(--radius-lg); background: #fff; border: 1px solid var(--color-border); padding: var(--space-10); box-shadow: 0 2px 8px rgba(16, 42, 91, 0.05), 0 20px 60px rgba(16, 42, 91, 0.06); transition: opacity var(--motion-medium) var(--ease-smooth), transform var(--motion-medium) var(--ease-out); }
.wd__pane.is-dim { opacity: 0.4; transform: scale(0.99); }
.wd__pane-title { margin: 0 0 var(--space-6); font-size: 20px; font-weight: var(--weight-semibold); letter-spacing: -0.01em; }
.wd__pane-title--trad { color: var(--color-text-faint); }
.wd__pane-title--acc { color: var(--color-accent); }
.wd__contrast { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--space-5); }
.wd__row { border-top: 1px solid var(--color-border); padding-top: var(--space-5); display: flex; flex-direction: column; gap: 6px; transition: filter var(--motion-medium) var(--ease-smooth); }
.wd__row-concept { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-text-faint); }
.wd__row-text { font-size: 15px; line-height: 1.55; color: var(--color-text-secondary); }
.wd__row.is-off { filter: grayscale(0.6); }
@media (max-width: 860px) { .wd__board { grid-template-columns: 1fr; } .wd__pane.is-dim { opacity: 1; transform: none; } }
</style>