<script setup lang="ts">
// 07 · INTELLIGENCE LIFECYCLE — on the shared TechnologySection instrument system
// (wide variant: full-width instrument). One continuous engineering loop, not 8
// cards. Content preserved verbatim.
import TechnologySection from './TechnologySection.vue'

const stages = ['Data', 'Train', 'Evaluate', 'Optimize', 'Deploy', 'Infer', 'Observe', 'Improve']
const tags = ['MODEL VERSIONING', 'EDGE OPTIMIZATION', 'EVALUATION', 'MONITORING', 'DRIFT DETECTION', 'DEPLOYMENT']
</script>

<template>
  <TechnologySection
    n="07"
    eyebrow="Intelligence Lifecycle"
    :headline="['From model', 'to production.']"
    body="SVARA technology is continuously engineered — models are versioned, optimized for the edge, evaluated, deployed, monitored for drift and improved, as one connected loop."
    :techs="tags"
  >
    <div class="lc2__scroll">
      <div class="lc2__pipe">
        <span class="lc2__spine" aria-hidden="true" />
        <span class="lc2__signal" aria-hidden="true" />
        <ol class="lc2__stages">
          <li v-for="(s, i) in stages" :key="s" class="lc2__stage" :class="{ 'lc2__stage--last': i === stages.length - 1 }">
            <span class="lc2__node" aria-hidden="true" />
            <span class="lc2__n hx-mono">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="lc2__name">{{ s }}</span>
          </li>
        </ol>
      </div>
    </div>
    <p class="lc2__return hx-mono-label"><span class="lc2__return-arrow">↺</span> IMPROVE feeds back into DATA — a continuous cycle</p>
  </TechnologySection>
</template>

<style scoped>
/* horizontal lifecycle pipe — inside the shared full-width .tsec__viz surface */
.lc2__scroll { overflow-x: auto; scrollbar-width: none; }
.lc2__scroll::-webkit-scrollbar { display: none; }
.lc2__pipe { position: relative; min-width: 720px; }
.lc2__spine { position: absolute; left: 0; right: 0; top: 12px; height: 1px; background: linear-gradient(90deg, rgba(20,34,63,0) 0%, rgba(20,34,63,0.2) 5%, rgba(20,34,63,0.2) 95%, rgba(20,34,63,0) 100%); }
.lc2__signal { position: absolute; top: 9px; left: 0; width: 7px; height: 7px; border-radius: 50%; background: var(--sig); box-shadow: 0 0 0 4px rgba(63,111,176,0.14); animation: lc2-run 7s linear infinite; }
@keyframes lc2-run { 0% { left: 1%; } 100% { left: 99%; } }
.lc2__stages { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(8, 1fr); gap: 12px; }
.lc2__stage { position: relative; padding-top: 30px; }
.lc2__node { position: absolute; top: 7px; left: 20px; width: 11px; height: 11px; border-radius: 50%; background: #fff; border: 1px solid rgba(20,34,63,0.3); }
.lc2__stage:first-child .lc2__node { background: var(--sig); border-color: var(--sig); }
.lc2__stage--last .lc2__node { background: var(--ink-primary); border-color: var(--ink-primary); }
.lc2__n { display: block; font-size: 10px; letter-spacing: 0.14em; color: var(--ink-muted); }
.lc2__name { display: block; margin-top: 8px; font-size: clamp(16px, 1.5vw, 21px); font-weight: 600; letter-spacing: -0.02em; color: var(--ink-primary); }
.lc2__return { display: inline-flex; align-items: center; gap: 8px; margin: 22px 0 0; color: var(--sig); text-transform: none; letter-spacing: 0.06em; }
.lc2__return-arrow { font-size: 15px; }

@media (prefers-reduced-motion: reduce) { .lc2__signal { animation: none; opacity: 0; } }
</style>
