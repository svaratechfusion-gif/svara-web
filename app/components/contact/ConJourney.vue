<script setup lang="ts">
// CONTACT · Enterprise Consultation Journey — what partnering with SVARA looks
// like, stage by stage. The six stage labels are the directed structure for
// this section; the supporting prose is derived (not verbatim Volume 12).
const stages = [
  { n: 'Discovery', d: 'A first conversation to understand your operations, your data and your ambition.' },
  { n: 'Business Assessment', d: 'We map where intelligence creates the most value across your workflows.' },
  { n: 'Architecture', d: 'We design the technical and operational architecture around your environment.' },
  { n: 'Recommendation', d: 'A clear, prioritised plan — scope, sequence and expected outcomes.' },
  { n: 'Implementation', d: 'We build, integrate and deploy alongside your teams.' },
  { n: 'Success', d: 'Connected intelligence becomes part of how your organization runs and grows.' },
]
</script>

<template>
  <section id="consultation" class="cjrn">
    <div class="cjrn__head">
      <p v-reveal class="cjrn__eyebrow">The Consultation Journey</p>
      <h2 v-reveal class="cjrn__title" data-split>How a partnership unfolds</h2>
      <p v-reveal class="cjrn__sub">A considered path from first conversation to lasting transformation.</p>
    </div>

    <ol class="cjrn__track">
      <li v-for="(s, i) in stages" :key="s.n" v-reveal="{ delay: 0.06 * i }" class="cjrn__stage">
        <span class="cjrn__rail" aria-hidden="true"><span class="cjrn__node" /></span>
        <div class="cjrn__content">
          <span class="cjrn__step">Step {{ String(i + 1).padStart(2, '0') }}</span>
          <h3 class="cjrn__name">{{ s.n }}</h3>
          <p class="cjrn__desc">{{ s.d }}</p>
        </div>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.cjrn { padding-block: var(--section-y); }
.cjrn__head { max-width: var(--container-max); margin-inline: auto; padding-inline: var(--container-pad); text-align: center; box-sizing: border-box; }
.cjrn__eyebrow { margin: 0 0 var(--space-6); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.cjrn__title { margin: 0; font-size: clamp(28px, 3.4vw, 48px); font-weight: var(--weight-bold); letter-spacing: -0.02em; color: #0d1b3e; }
.cjrn__sub { margin: var(--space-5) auto 0; max-width: 52ch; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }

.cjrn__track { list-style: none; margin: var(--space-16) auto 0; padding: 0 var(--container-pad); max-width: 760px; box-sizing: border-box; }
.cjrn__stage { display: grid; grid-template-columns: 40px 1fr; gap: var(--space-6); }
.cjrn__rail { position: relative; display: flex; justify-content: center; }
.cjrn__rail::before { content: ''; position: absolute; top: 6px; bottom: -6px; width: 1px; background: var(--color-border); }
.cjrn__stage:last-child .cjrn__rail::before { display: none; }
.cjrn__node { position: relative; z-index: 1; width: 13px; height: 13px; margin-top: 4px; border-radius: 50%; background: var(--color-bg); border: 2px solid var(--color-accent); }
.cjrn__content { padding-bottom: var(--space-12); }
.cjrn__stage:last-child .cjrn__content { padding-bottom: 0; }
.cjrn__step { font-family: var(--font-mono); font-size: var(--type-caption); letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-accent); }
.cjrn__name { margin: var(--space-2) 0 0; font-size: var(--type-lead); font-weight: var(--weight-semibold); letter-spacing: -0.01em; color: #0d1b3e; }
.cjrn__desc { margin: var(--space-3) 0 0; font-size: var(--type-small); line-height: var(--leading-body); color: var(--color-text-secondary); }
</style>
