<script setup lang="ts">
// TECHNOLOGY · SECTION 2 — the "About"/intro reference, rebuilt: a label, a
// WordsPullUpMultiStyle heading (the middle sentence in Instrument Serif Italic),
// and an AnimatedLetter scroll-opacity paragraph. Dark theme, SVARA copy.
import WordsPullUpMultiStyle from '~/components/common/WordsPullUpMultiStyle.vue'
import AnimatedLetter from '~/components/common/AnimatedLetter.vue'

const segments = [
  { text: 'Our technology stack is' },
  { text: 'built for intelligence.', serif: true },
  { text: 'Designed to sense, reason and act across every enterprise.' },
]
const paragraph = 'SVARA combines Vision AI, Autonomous AI Agents, Digital Twins, Edge AI, Business Cloud, Digital Engineering and Growth Intelligence into one integrated technology fabric that enables enterprises to automate, predict and continuously optimize operations.'
</script>

<template>
  <section class="ti tec-dark">
    <div class="ti__inner">
      <p class="ti__label">Technology</p>
      <WordsPullUpMultiStyle :segments="segments" class="ti__heading" />
      <AnimatedLetter :text="paragraph" class="ti__para" />
    </div>
  </section>
</template>

<style scoped>
.ti { position: relative; background: var(--tec-bg); }
.ti__inner {
  max-width: 1831px;
  margin-inline: auto;
  padding: 96px 20px;
}
@media (min-width: 768px) { .ti__inner { padding: 140px 40px; } }

.ti__label {
  margin: 0 0 40px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: color-mix(in srgb, var(--tec-text) 62%, transparent);
}
@media (min-width: 768px) { .ti__label { margin-bottom: 56px; } }

.ti__heading {
  font-size: clamp(30px, 4.6vw, 66px);
  font-weight: 700;
  line-height: 1.12;
  letter-spacing: -0.01em;
  color: var(--tec-text);
  max-width: 20ch;
}
/* the serif line is the italic display accent (Instrument Serif) */
.ti__heading :deep(.tec-serif) {
  font-size: 1.08em;
  letter-spacing: 0;
}

.ti__para {
  margin-top: clamp(40px, 6vw, 88px);
  margin-left: auto;
  max-width: 720px;
  font-size: clamp(20px, 2.4vw, 34px);
  line-height: 1.4;
  font-weight: 300;
  color: var(--tec-text);
}
</style>
