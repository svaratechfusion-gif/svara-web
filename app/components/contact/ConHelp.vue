<script setup lang="ts">
// CONTACT · How Can We Help — the engagement transformation, told as an
// editorial horizontal flow. The five stage labels are the directed
// structure for this section (not prose from Volume 12).
const steps = [
  { name: 'Challenge', desc: 'You bring an operational challenge or an ambition to transform.' },
  { name: 'Consultation', desc: 'We listen first — understanding the business before the technology.' },
  { name: 'Architecture', desc: 'We design the intelligence architecture around your operations.' },
  { name: 'Deployment', desc: 'We deploy, integrate and prove value inside your environment.' },
  { name: 'Transformation', desc: 'Connected intelligence becomes part of how you operate.' },
]
</script>

<template>
  <section class="chelp">
    <div class="chelp__head">
      <p v-reveal class="chelp__eyebrow">How Can We Help?</p>
      <h2 v-reveal class="chelp__title" data-split>From challenge to transformation</h2>
    </div>
    <ol class="chelp__flow">
      <li v-for="(s, i) in steps" :key="s.name" v-reveal="{ delay: 0.08 * i }" class="chelp__step">
        <span class="chelp__index">{{ String(i + 1).padStart(2, '0') }}</span>
        <span class="chelp__name">{{ s.name }}</span>
        <p class="chelp__desc">{{ s.desc }}</p>
        <span v-if="i < steps.length - 1" class="chelp__arrow" aria-hidden="true">→</span>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.chelp { padding-block: var(--section-y); }
.chelp__head { max-width: var(--container-max); margin-inline: auto; padding-inline: var(--container-pad); text-align: center; box-sizing: border-box; }
.chelp__eyebrow { margin: 0 0 var(--space-6); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.chelp__title { margin: 0; font-size: clamp(28px, 3.4vw, 48px); font-weight: var(--weight-bold); letter-spacing: -0.02em; color: #0d1b3e; }
.chelp__flow {
  list-style: none; margin: var(--space-20) auto 0; padding: 0 var(--container-pad); max-width: 1240px; box-sizing: border-box;
  display: grid; grid-template-columns: repeat(5, 1fr); gap: var(--space-6); align-items: start;
}
.chelp__step { position: relative; }
.chelp__index { font-family: var(--font-mono); font-size: var(--type-caption); color: var(--color-accent); letter-spacing: 0.04em; }
.chelp__name { display: block; margin-top: var(--space-3); font-size: var(--type-lead); font-weight: var(--weight-semibold); letter-spacing: -0.01em; color: #0d1b3e; }
.chelp__desc { margin: var(--space-3) 0 0; font-size: var(--type-caption); line-height: var(--leading-body); color: var(--color-text-secondary); }
.chelp__arrow { position: absolute; right: calc(var(--space-6) * -0.6); top: 0; color: #c3ccdb; font-size: 18px; }
@media (max-width: 860px) {
  .chelp__flow { grid-template-columns: 1fr; gap: var(--space-8); }
  .chelp__arrow { display: none; }
}
</style>
