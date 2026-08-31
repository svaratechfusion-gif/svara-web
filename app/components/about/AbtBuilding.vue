<script setup lang="ts">
// ABOUT · What We're Building — a forward-looking capability roadmap (no dates,
// not a corporate timeline). The five phase labels (Today → Enterprise AI →
// Connected Intelligence → Autonomous Enterprise → Tomorrow) are the directed
// structure for this section; the supporting lines are composed from official
// messaging (homeSection07: observing, reasoning, learning, acting) — no new
// facts invented.
const phases = [
  { k: 'Today', d: 'Fragmented systems, siloed data, human-limited operations.' },
  { k: 'Enterprise AI', d: 'Intelligence embedded in every platform — vision, reasoning, prediction, orchestration.' },
  { k: 'Connected Intelligence', d: 'One ecosystem where every signal reaches every decision across every function.' },
  { k: 'Autonomous Enterprise', d: 'Operations that observe, reason, learn, and act — improving without end.' },
  { k: 'Tomorrow', d: 'Enterprises that run on connected intelligence, engineered to endure for decades.' },
]
</script>

<template>
  <section class="abld">
    <div class="abld__head">
      <p v-reveal class="abld__eyebrow">What We're Building</p>
      <h2 v-reveal class="abld__title" data-split>The road ahead</h2>
    </div>

    <ol class="abld__rail">
      <li v-for="(p, i) in phases" :key="p.k" v-reveal="{ delay: 0.08 * i }" class="abld__phase">
        <span class="abld__marker" aria-hidden="true"><span class="abld__marker-core" /></span>
        <span class="abld__k">{{ p.k }}</span>
        <p class="abld__d">{{ p.d }}</p>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.abld { padding-block: var(--section-y); }
.abld__head { max-width: var(--container-max); margin-inline: auto; padding-inline: var(--container-pad); text-align: center; box-sizing: border-box; }
.abld__eyebrow { margin: 0 0 var(--space-6); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.abld__title { margin: 0; font-size: clamp(28px, 3.4vw, 48px); font-weight: var(--weight-bold); letter-spacing: -0.02em; color: #0d1b3e; }

.abld__rail {
  list-style: none; margin: var(--space-20) auto 0; padding: 0 var(--container-pad); max-width: 1240px; box-sizing: border-box;
  display: grid; grid-template-columns: repeat(5, 1fr); gap: var(--space-6); position: relative;
}
/* the connecting rail with a left-to-right accent gradient (progress → future) */
.abld__rail::before {
  content: ''; position: absolute; top: 11px; left: calc(var(--container-pad) + 10%); right: calc(var(--container-pad) + 10%);
  height: 2px; background: linear-gradient(90deg, var(--color-border), var(--color-accent));
}
.abld__phase { position: relative; text-align: center; }
.abld__marker {
  position: relative; z-index: 1; display: grid; place-items: center; width: 24px; height: 24px; margin: 0 auto var(--space-5);
  border-radius: 50%; background: var(--color-bg); border: 1.5px solid var(--color-accent);
}
.abld__marker-core { width: 8px; height: 8px; border-radius: 50%; background: var(--color-accent); }
.abld__k { display: block; font-size: clamp(15px, 1.5vw, 20px); font-weight: var(--weight-semibold); letter-spacing: -0.01em; color: #0d1b3e; }
.abld__d { margin: var(--space-3) 0 0; font-size: var(--type-caption); line-height: var(--leading-body); color: var(--color-text-secondary); }

@media (max-width: 860px) {
  .abld__rail { grid-template-columns: 1fr; gap: var(--space-8); text-align: left; }
  .abld__rail::before { top: 0; bottom: 0; left: 11px; right: auto; width: 2px; height: auto; background: linear-gradient(180deg, var(--color-border), var(--color-accent)); }
  .abld__phase { display: grid; grid-template-columns: 24px 1fr; column-gap: var(--space-5); align-items: start; text-align: left; }
  .abld__marker { margin: 0; }
  .abld__k { grid-column: 2; }
  .abld__d { grid-column: 2; }
}
</style>
