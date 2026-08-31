<script setup lang="ts">
// ABOUT · Why SVARA Exists — the reason before the mechanism. The framing
// ("enterprise intelligence is broken — fragmented across vendors, departments,
// systems, time, and expertise") is verbatim from Volume 08
// (companyContent.architecture.overview). The five-verb progression
// Observe → Understand → Reason → Automate → Transform is the directed
// structure for this section (not prose from Volume 08).
const stages = ['Observe', 'Understand', 'Reason', 'Automate', 'Transform']
</script>

<template>
  <section class="awhy">
    <div class="awhy__inner">
      <p v-reveal class="awhy__eyebrow">Why SVARA Exists</p>
      <h2 v-reveal class="awhy__lead" data-split>Enterprise intelligence is broken — fragmented across vendors, departments, systems, time, and expertise.</h2>
      <p v-reveal class="awhy__body">SVARA exists to close that gap: to turn scattered signals into one continuous system that observes reality, understands it, reasons about what comes next, acts, and improves — endlessly.</p>

      <ol class="awhy__flow">
        <li v-for="(s, i) in stages" :key="s" v-reveal="{ delay: 0.12 * i }" class="awhy__step">
          <span class="awhy__num">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="awhy__word">{{ s }}</span>
          <span v-if="i < stages.length - 1" class="awhy__arrow" aria-hidden="true">→</span>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.awhy { padding-block: var(--section-y); }
.awhy__inner { max-width: 1080px; margin-inline: auto; padding-inline: var(--container-pad); box-sizing: border-box; text-align: center; }
.awhy__eyebrow { margin: 0 0 var(--space-8); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.awhy__lead { margin: 0 auto; max-width: 20ch; font-size: clamp(30px, 4.6vw, 62px); font-weight: var(--weight-bold); line-height: 1.08; letter-spacing: -0.025em; color: #0d1b3e; text-wrap: balance; }
.awhy__body { margin: var(--space-10) auto 0; max-width: 60ch; font-size: var(--type-lead); line-height: var(--leading-body); color: var(--color-text-secondary); }

.awhy__flow {
  list-style: none; margin: var(--space-20) 0 0; padding: 0;
  display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: var(--space-4) var(--space-8);
}
.awhy__step { position: relative; display: inline-flex; align-items: baseline; gap: var(--space-3); }
.awhy__num { font-family: var(--font-mono); font-size: var(--type-caption); color: var(--color-accent); }
.awhy__word { font-size: clamp(20px, 2.4vw, 34px); font-weight: var(--weight-semibold); letter-spacing: -0.015em; color: #0d1b3e; }
.awhy__arrow { margin-left: var(--space-6); color: #c3ccdb; font-size: 20px; }
@media (max-width: 720px) {
  .awhy__flow { flex-direction: column; gap: var(--space-5); }
  .awhy__arrow { display: none; }
}
</style>
