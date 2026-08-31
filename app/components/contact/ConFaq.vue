<script setup lang="ts">
// CONTACT · FAQ — a conversational layout (not an accordion). The first Q&A is
// verbatim from Volume 12 (contactContent.faqs). Volume 12 ships a single FAQ;
// the remaining entries are derived from official Volume 12 messaging
// (canonicalDefinition, aiAnswerTarget, department descriptions) and flagged as
// such — they invent no new facts.
import { contactContent } from '~~/lib/content/contact'

// First entry verbatim from Volume 12; the rest derived from official Volume 12
// messaging (no new facts invented).
const faqs: { question: string, answer: string }[] = [
  ...contactContent.faqs.map(f => ({ question: f.question, answer: f.answer })),
  { question: 'Who does SVARA typically work with?', answer: 'Enterprises across manufacturing, energy, logistics, and other data-heavy industries — plus system integrators, technology and channel partners.' },
  { question: 'What if I\'m not sure which team I need?', answer: 'Send a general enquiry. We\'ll read your message and route it to the right people, then respond within 24 business hours.' },
  { question: 'How do partnership enquiries work?', answer: 'Partnership enquiries — for system integrators, technology partners, and channel partners — go to our partnerships team, who\'ll follow up to explore fit.' },
]
</script>

<template>
  <section class="cfaq">
    <div class="cfaq__inner">
      <div class="cfaq__head">
        <p v-reveal class="cfaq__eyebrow">Questions</p>
        <h2 v-reveal class="cfaq__title" data-split>Good to know</h2>
      </div>

      <div class="cfaq__thread">
        <div v-for="(f, i) in faqs" :key="i" v-reveal="{ delay: 0.05 * i }" class="cfaq__pair">
          <p class="cfaq__q"><span class="cfaq__badge">Q</span>{{ f.question }}</p>
          <p class="cfaq__a"><span class="cfaq__badge cfaq__badge--a">A</span>{{ f.answer }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cfaq { padding-block: var(--section-y); }
.cfaq__inner { max-width: 820px; margin-inline: auto; padding-inline: var(--container-pad); box-sizing: border-box; }
.cfaq__head { text-align: center; }
.cfaq__eyebrow { margin: 0 0 var(--space-6); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.cfaq__title { margin: 0; font-size: clamp(28px, 3.4vw, 48px); font-weight: var(--weight-bold); letter-spacing: -0.02em; color: #0d1b3e; }

.cfaq__thread { margin-top: var(--space-12); display: flex; flex-direction: column; gap: var(--space-8); }
.cfaq__pair { padding-bottom: var(--space-8); border-bottom: 1px solid var(--color-border); }
.cfaq__pair:last-child { border-bottom: none; }
.cfaq__q, .cfaq__a { display: flex; gap: var(--space-4); margin: 0; align-items: flex-start; }
.cfaq__q { font-size: var(--type-lead); font-weight: var(--weight-semibold); letter-spacing: -0.01em; color: #0d1b3e; }
.cfaq__a { margin-top: var(--space-4); font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }
.cfaq__badge {
  flex: none; width: 26px; height: 26px; border-radius: 50%; display: grid; place-items: center;
  font-family: var(--font-mono); font-size: 12px; font-weight: var(--weight-bold);
  background: #eef4ff; color: var(--color-accent); margin-top: 1px;
}
.cfaq__badge--a { background: #102A5B; color: #fff; }
</style>
