<script setup lang="ts">
// FAQ (Section 09) — accessible accordion. Native <details>/<summary> for
// zero-JS keyboard accessibility + semantics; questions/answers verbatim
// from the Content Bible. FAQPage JSON-LD is emitted from the page (index).
import { homeFaq } from '~~/lib/content/home'
</script>

<template>
  <section class="faq" aria-labelledby="faq-title">
    <div class="faq__inner">
      <div class="faq__head">
        <p v-reveal class="faq__eyebrow">FAQ</p>
        <h2 id="faq-title" class="faq__title" data-split>Answers for decision-makers.</h2>
      </div>

      <div class="faq__list">
        <details v-for="(item, i) in homeFaq" :key="i" class="faq__item" name="faq">
          <summary class="faq__q">
            <h3 class="faq__q-text">{{ item.question }}</h3>
            <span class="faq__icon" aria-hidden="true" />
          </summary>
          <div class="faq__a">{{ item.answer }}</div>
        </details>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq { background: var(--color-surface); border-block: 1px solid var(--color-border); }
.faq__inner {
  max-width: var(--container-max);
  margin-inline: auto;
  padding: var(--section-y) var(--container-pad);
  display: grid;
  grid-template-columns: 4fr 8fr;
  gap: var(--gap-section);
  align-items: start;
  box-sizing: border-box;
}
.faq__eyebrow {
  margin: 0 0 var(--space-6);
  font-family: var(--font-mono); font-size: var(--type-label);
  letter-spacing: var(--tracking-label); text-transform: uppercase;
  color: var(--color-accent);
}
.faq__title {
  margin: 0;
  font-size: clamp(34px, 4.4vw, 64px);
  font-weight: var(--weight-bold); line-height: 1.12; letter-spacing: -0.02em;
  color: var(--color-text); text-wrap: balance;
}

.faq__list { margin: 0; padding: 0; border-top: 1px solid var(--color-border); }
.faq__item { border-bottom: 1px solid var(--color-border); }
.faq__q {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-6);
  padding: var(--space-8) 0;
  cursor: pointer;
}
.faq__q::-webkit-details-marker { display: none; }
.faq__q-text {
  margin: 0;
  font-size: clamp(18px, 1.8vw, 22px);
  font-weight: var(--weight-semibold);
  letter-spacing: -0.01em;
  color: var(--color-text);
}
.faq__icon {
  position: relative;
  flex-shrink: 0;
  width: 18px; height: 18px;
}
.faq__icon::before,
.faq__icon::after {
  content: "";
  position: absolute;
  top: 50%; left: 50%;
  width: 14px; height: 2px;
  background: var(--color-accent);
  transform: translate(-50%, -50%);
  transition: transform var(--motion-medium) var(--ease-smooth);
}
.faq__icon::after { transform: translate(-50%, -50%) rotate(90deg); }
.faq__item[open] .faq__icon::after { transform: translate(-50%, -50%) rotate(0deg); }
.faq__q:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; border-radius: var(--radius-sm); }

.faq__a {
  margin: 0;
  padding: 0 0 var(--space-8);
  max-width: 62ch;
  font-size: var(--type-small);
  line-height: var(--leading-body);
  color: var(--color-text-secondary);
}

@media (max-width: 900px) {
  .faq__inner { grid-template-columns: 1fr; gap: var(--space-10); }
}
@media (prefers-reduced-motion: reduce) {
  .faq__icon::before, .faq__icon::after { transition: none; }
}
</style>
