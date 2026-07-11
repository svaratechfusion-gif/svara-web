<script setup lang="ts">
// 09 ABOUT — photography, mission, compact timeline. Minimal.
import GlassImage from '~/components/glass/GlassImage.vue'
const timeline = [
  { year: '2024', event: 'SVARA TechFusion founded — DPIIT recognized' },
  { year: '2025', event: 'Platform architecture + first product lines' },
  { year: '2026', event: 'Enterprise Intelligence Infrastructure, unified' },
]
</script>

<template>
  <section class="about">
    <div class="about__inner">
      <GlassImage
        class="about__media"
        data-mask-reveal
        data-parallax="4"
        src="/images/home/about.jpg"
        alt="SVARA — engineering enterprise intelligence"
      />

      <div class="about__body">
        <p v-reveal class="about__eyebrow">Company</p>
        <h2 class="about__title" data-split>Engineering understanding, not just software.</h2>
        <p v-reveal="{ delay: 0.08 }" class="about__mission">SVARA exists to end Intelligence Fragmentation — the condition where enterprises drown in systems that inform but cannot coordinate. We are a women-led, AI-first team building the intelligence layer for the industries that run the world.</p>

        <ol class="about__timeline">
          <li v-for="t in timeline" :key="t.year" v-reveal class="about__step">
            <span class="about__year mono">{{ t.year }}</span>
            <span class="about__event">{{ t.event }}</span>
          </li>
        </ol>

        <NuxtLink v-reveal to="/company" class="about__link">About SVARA →</NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about { background: var(--color-surface); border-block: 1px solid var(--color-border); }
.about__inner {
  max-width: var(--container-max);
  margin-inline: auto;
  padding: var(--section-y) var(--container-pad);
  display: grid;
  grid-template-columns: 5fr 6fr;
  gap: var(--gap-section);
  align-items: center;
  box-sizing: border-box;
}
/* frame/reflections/shadow now come from GlassImage */
.about__media { aspect-ratio: 4 / 5; }

.about__eyebrow {
  margin: 0 0 var(--space-6);
  font-family: var(--font-mono); font-size: var(--type-label);
  letter-spacing: var(--tracking-label); text-transform: uppercase;
  color: var(--color-accent);
}
.about__title {
  margin: 0 0 var(--space-6);
  font-size: clamp(34px, 4vw, 56px);
  font-weight: var(--weight-bold); letter-spacing: -0.02em; line-height: 1.12;
  color: var(--color-text); text-wrap: balance;
}
.about__mission {
  margin: 0 0 var(--space-12);
  max-width: var(--paragraph-max);
  font-size: var(--type-body); line-height: var(--leading-body);
  color: var(--color-text-secondary);
}
.about__timeline { list-style: none; margin: 0 0 var(--space-10); padding: 0; }
.about__step {
  display: flex; gap: var(--space-8); align-items: baseline;
  padding: var(--space-4) 0;
  border-top: 1px solid var(--color-border);
}
.about__year {
  flex-shrink: 0; width: 64px;
  font-family: var(--font-mono); font-size: var(--type-caption);
  color: var(--color-accent);
}
.about__event { font-size: var(--type-small); color: var(--color-text); }
.about__link {
  font-size: var(--type-small); font-weight: var(--weight-semibold);
  color: var(--color-accent); text-decoration: none;
}
.about__link:hover { text-decoration: underline; }

@media (max-width: 900px) {
  .about__inner { grid-template-columns: 1fr; gap: var(--space-12); }
  .about__media { aspect-ratio: 16 / 10; }
}
</style>
