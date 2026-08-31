<script setup lang="ts">
// ABOUT · Our Values — five immersive editorial panels that expand on hover.
// The five value NAMES are from the brief / Content Bible (Engineering
// Excellence, Innovation, Integrity, Collaboration, Customer Impact). Volume 08
// (companyContent) does not carry per-value descriptions, so the descriptions
// below are COMPOSED from official SVARA messaging (engineering-first,
// category-defining, product-not-services, founder/operator-led, outcome-bound)
// — no new facts invented. Replace with verbatim Content Bible value copy when
// available. [FLAG: value descriptions not verbatim in available content]
const values = [
  { name: 'Engineering Excellence', desc: 'We build the intelligence layer as production infrastructure — edge-to-cloud, reliable, and owned end-to-end by the engineers accountable for it.' },
  { name: 'Innovation', desc: 'We define a category rather than follow one — engineering the Intelligence Loop as a new standard for enterprise operations.' },
  { name: 'Integrity', desc: 'A product platform, not billable hours. We commit to repeatable systems and measurable outcomes over bespoke promises.' },
  { name: 'Collaboration', desc: 'Founder-led and operator-led, we work alongside enterprise teams — aligning our roadmap to how they actually operate.' },
  { name: 'Customer Impact', desc: 'Everything connects to the outcome — every signal to every decision to every action, proven against the customer\'s own KPIs.' },
]
</script>

<template>
  <section class="aval">
    <div class="aval__head">
      <p v-reveal class="aval__eyebrow">Our Values</p>
      <h2 v-reveal class="aval__title" data-split>What we hold to</h2>
    </div>

    <div v-reveal class="aval__panels">
      <article
        v-for="(v, i) in values" :key="v.name"
        class="aval__panel" tabindex="0"
      >
        <span class="aval__index">{{ String(i + 1).padStart(2, '0') }}</span>
        <h3 class="aval__name">{{ v.name }}</h3>
        <p class="aval__desc">{{ v.desc }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.aval { padding-block: var(--section-y); }
.aval__head { max-width: var(--container-max); margin-inline: auto; padding-inline: var(--container-pad); text-align: center; box-sizing: border-box; }
.aval__eyebrow { margin: 0 0 var(--space-6); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.aval__title { margin: 0; font-size: clamp(28px, 3.4vw, 48px); font-weight: var(--weight-bold); letter-spacing: -0.02em; color: #0d1b3e; }

.aval__panels {
  max-width: 1240px; margin: var(--space-16) auto 0; padding-inline: var(--container-pad); box-sizing: border-box;
  display: flex; gap: var(--space-4); align-items: stretch; min-height: 380px;
}
.aval__panel {
  position: relative; flex: 1 1 0; overflow: hidden;
  padding: var(--space-8);
  border-radius: var(--radius-lg); border: 1px solid var(--color-border);
  background: linear-gradient(180deg, #ffffff, #f4f8ff);
  display: flex; flex-direction: column; justify-content: flex-end;
  cursor: pointer; outline: none;
  transition: flex-grow var(--motion-slow, 450ms) var(--ease-smooth), box-shadow var(--motion-medium) var(--ease-smooth), border-color var(--motion-medium) var(--ease-smooth);
}
.aval__panel:hover, .aval__panel:focus-visible {
  flex-grow: 2.6; box-shadow: var(--shadow-med); border-color: rgba(47, 127, 230, 0.4);
}
.aval__index { font-family: var(--font-mono); font-size: var(--type-caption); color: var(--color-accent); }
.aval__name {
  margin: var(--space-4) 0 0; font-size: clamp(18px, 1.7vw, 24px); font-weight: var(--weight-bold);
  letter-spacing: -0.015em; line-height: 1.15; color: #0d1b3e;
}
.aval__desc {
  margin: var(--space-4) 0 0; max-width: 40ch;
  font-size: var(--type-small); line-height: var(--leading-body); color: var(--color-text-secondary);
  opacity: 0; transform: translateY(8px);
  transition: opacity var(--motion-medium) var(--ease-smooth), transform var(--motion-medium) var(--ease-smooth);
}
.aval__panel:hover .aval__desc, .aval__panel:focus-visible .aval__desc { opacity: 1; transform: none; }

@media (max-width: 860px) {
  .aval__panels { flex-direction: column; min-height: 0; }
  .aval__panel { flex: none; }
  .aval__panel:hover, .aval__panel:focus-visible { flex-grow: 0; }
  .aval__desc { opacity: 1; transform: none; }
}
</style>
