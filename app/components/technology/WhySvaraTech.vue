<script setup lang="ts">
// WHY SVARA TECHNOLOGY — interactive comparison: Traditional Technology
// vs SVARA. A toggle animates the transformation from disconnected systems
// to connected enterprise intelligence. The contrast pairs come VERBATIM
// from the Content Bible (platformContent.comparisons — point tools vs
// the connected system). Motion represents the shift from fragmentation
// to connected intelligence.
import { ref } from 'vue'
import { TECH_COMPARISONS } from '~/utils/technology'

const mode = ref<'svara' | 'traditional'>('svara')
const contrasts = TECH_COMPARISONS
</script>

<template>
  <section class="wt">
    <div class="wt__head">
      <p class="wt__eyebrow">Why SVARA Technology</p>
      <h2 class="wt__title">Connected enterprise intelligence, not disconnected tools.</h2>
    </div>

    <div class="wt__toggle" role="tablist" aria-label="Compare SVARA with traditional technology">
      <button class="wt__tab" :class="{ 'is-on': mode === 'traditional' }" @click="mode = 'traditional'">Traditional Technology</button>
      <button class="wt__tab wt__tab--accent" :class="{ 'is-on': mode === 'svara' }" @click="mode = 'svara'">SVARA</button>
      <span class="wt__glide" :class="{ 'is-right': mode === 'svara' }" />
    </div>

    <div class="wt__board">
      <div class="wt__pane" :class="{ 'is-dim': mode === 'svara' }">
        <h3 class="wt__pane-title wt__pane-title--trad">Traditional Technology</h3>
        <ul class="wt__contrast">
          <li v-for="(c, i) in contrasts" :key="`t${i}`" class="wt__row" :class="{ 'is-off': mode === 'svara' }">
            <span class="wt__row-concept">{{ c.concept }}</span>
            <span class="wt__row-text">{{ c.traditional }}</span>
          </li>
        </ul>
      </div>
      <div class="wt__pane" :class="{ 'is-dim': mode !== 'svara' }">
        <h3 class="wt__pane-title wt__pane-title--acc">SVARA</h3>
        <ul class="wt__contrast">
          <li v-for="(c, i) in contrasts" :key="`s${i}`" class="wt__row" :class="{ 'is-off': mode !== 'svara' }">
            <span class="wt__row-concept">{{ c.concept }}</span>
            <span class="wt__row-text">{{ c.svara }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- animated transformation bar -->
    <div class="wt__transform" :class="`wt__transform--${mode}`">
      <div class="wt__nodes wt__nodes--trad">
        <span v-for="n in [1,2,3,4]" :key="`t${n}`" class="wt__dot wt__dot--trad" />
      </div>
      <span class="wt__arrow" />
      <div class="wt__nodes wt__nodes--svara">
        <span class="wt__core">SVARA</span>
        <span v-for="n in [1,2,3,4]" :key="`s${n}`" class="wt__dot wt__dot--svara" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.wt { background: #F8FBFF; padding: var(--space-32) var(--container-pad); }
.wt__head { max-width: 760px; margin: 0 auto var(--space-12); text-align: center; }
.wt__eyebrow { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.wt__title { margin: 0; font-size: clamp(34px, 4.4vw, 56px); font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong); }

.wt__toggle { position: relative; display: flex; width: max-content; margin: 0 auto var(--space-12); padding: 5px; gap: 4px; border-radius: var(--radius-pill); background: #EAF0F8; border: 1px solid var(--color-border); }
.wt__tab { position: relative; z-index: 2; padding: 11px 26px; border: none; background: transparent; border-radius: var(--radius-pill); font-size: 14px; font-weight: var(--weight-semibold); color: var(--color-text-secondary); cursor: pointer; transition: color var(--motion-medium) var(--ease-smooth); }
.wt__tab--accent.is-on { color: #fff; }
.wt__tab.is-on { color: var(--color-ink-strong); }
.wt__glide { position: absolute; z-index: 1; top: 5px; left: 5px; width: calc(50% - 5px); height: calc(100% - 10px); border-radius: var(--radius-pill); background: var(--color-text-faint); transition: transform var(--motion-medium) var(--ease-out), background var(--motion-medium) var(--ease-smooth); }
.wt__glide.is-right { transform: translateX(100%); background: var(--color-accent); }

.wt__board { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-6); max-width: 1180px; margin-inline: auto; }
.wt__pane { border-radius: var(--radius-lg); background: #fff; border: 1px solid var(--color-border); padding: var(--space-10); box-shadow: 0 2px 8px rgba(16, 42, 91, 0.05), 0 20px 60px rgba(16, 42, 91, 0.06); transition: opacity var(--motion-medium) var(--ease-smooth), transform var(--motion-medium) var(--ease-out); }
.wt__pane.is-dim { opacity: 0.42; transform: scale(0.99); }
.wt__pane-title { margin: 0 0 var(--space-6); font-size: 20px; font-weight: var(--weight-semibold); letter-spacing: -0.01em; }
.wt__pane-title--trad { color: var(--color-text-faint); }
.wt__pane-title--acc { color: var(--color-accent); }
.wt__contrast { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--space-5); }
.wt__row { border-top: 1px solid var(--color-border); padding-top: var(--space-5); display: flex; flex-direction: column; gap: 6px; transition: filter var(--motion-medium) var(--ease-smooth); }
.wt__row-concept { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-text-faint); }
.wt__row-text { font-size: 15px; line-height: 1.55; color: var(--color-text-secondary); }
.wt__row.is-off { filter: grayscale(0.6); }

.wt__transform { display: flex; align-items: center; gap: var(--space-8); justify-content: center; max-width: 760px; margin: var(--space-16) auto 0; padding: var(--space-8); border-radius: var(--radius-lg); background: #F1F6FE; border: 1px solid var(--color-border); }
.wt__nodes { display: flex; align-items: center; gap: 10px; }
.wt__dot { width: 14px; height: 14px; border-radius: 50%; transition: all var(--motion-medium) var(--ease-out); }
.wt__dot--trad { background: var(--color-text-faint); opacity: 0.5; }
.wt__dot--svara { background: var(--color-accent); box-shadow: 0 0 0 3px rgba(47, 127, 230, 0.16); }
.wt__transform--svara .wt__nodes--trad { opacity: 0.3; }
.wt__transform--traditional .wt__nodes--svara { opacity: 0.3; }
.wt__arrow { font-size: 20px; color: var(--color-text-faint); }
.wt__core { padding: 5px 12px; border-radius: var(--radius-pill); background: var(--color-ink-strong); color: #fff; font-size: 12px; font-weight: var(--weight-bold); }

@media (max-width: 860px) { .wt__board { grid-template-columns: 1fr; } .wt__pane.is-dim { opacity: 1; transform: none; } .wt__transform { flex-direction: column; } .wt__arrow { transform: rotate(90deg); } }
</style>