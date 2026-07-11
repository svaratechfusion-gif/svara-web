<script setup lang="ts">
// 09 TRUST — five credibility marks as a clean typographic ledger.
// No logos, no badges — statements of standing in the same register as
// the rest of the page.
const marks = [
  { k: 'DPIIT Recognized', v: 'Recognized startup under India\'s Department for Promotion of Industry and Internal Trade.' },
  { k: 'Women-Led', v: 'Founded and led by women engineers building deep-tech infrastructure.' },
  { k: 'Enterprise-First', v: 'Architected for the scale, security, and rigor enterprises require.' },
  { k: 'Scalable Architecture', v: 'One platform that grows from a single site to a national operation.' },
  { k: 'Investor Ready', v: 'A category-defining company built for long-term partnership.' },
]
</script>

<template>
  <section class="trust">
    <div class="trust__inner">
      <div class="trust__head">
        <p v-reveal class="trust__eyebrow">Trust</p>
        <h2 class="trust__title" data-split>Built to be trusted with what matters.</h2>
      </div>

      <dl class="trust__list">
        <div v-for="m in marks" :key="m.k" v-reveal class="trust__row">
          <dt class="trust__k">{{ m.k }}</dt>
          <dd class="trust__v">{{ m.v }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.trust__inner {
  max-width: var(--container-max);
  margin-inline: auto;
  padding: var(--section-y) var(--container-pad);
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: var(--gap-section);
  align-items: start;
  box-sizing: border-box;
}
.trust__eyebrow {
  margin: 0 0 var(--space-6);
  font-family: var(--font-mono); font-size: var(--type-label);
  letter-spacing: var(--tracking-label); text-transform: uppercase;
  color: var(--color-accent);
}
.trust__title {
  margin: 0;
  font-size: clamp(34px, 4.4vw, 64px);
  font-weight: var(--weight-bold); line-height: 1.12; letter-spacing: -0.02em;
  color: var(--color-text); text-wrap: balance;
}

.trust__list { margin: 0; padding: 0; border-top: 1px solid var(--color-border); }
.trust__row {
  display: grid;
  grid-template-columns: minmax(180px, 0.42fr) 1fr;
  gap: var(--space-8);
  padding: var(--space-8) 0;
  border-bottom: 1px solid var(--color-border);
  align-items: baseline;
}
.trust__k {
  font-size: 20px; font-weight: var(--weight-semibold);
  letter-spacing: -0.01em; color: var(--color-text);
}
.trust__v {
  margin: 0;
  font-size: var(--type-small); line-height: var(--leading-body);
  color: var(--color-text-secondary);
}

@media (max-width: 900px) {
  .trust__inner { grid-template-columns: 1fr; gap: var(--space-10); }
  .trust__row { grid-template-columns: 1fr; gap: var(--space-2); padding: var(--space-6) 0; }
}
</style>
