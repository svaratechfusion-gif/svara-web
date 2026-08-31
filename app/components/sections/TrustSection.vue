<script setup lang="ts">
// "Why Organizations Choose SVARA." Alternating layout: copy left, one
// interactive visual right — five large architectural cards, one per
// reason; each unfolds on hover/focus to reveal its description, closed
// otherwise. Framed by a very subtle animated white architectural-
// blueprint layer (corner brackets, grid lines, a slow scan line)
// bleeding around the cards' edges. Reasons verbatim from the Content
// Bible — titles unabridged (not the shorthand from the brief).
import { homeSection06 } from '~~/lib/content/home'
import SectionLink from '~/components/ui/SectionLink.vue'
</script>

<template>
  <section class="trust">
    <div class="trust__inner">
      <div class="trust__copy">
        <p v-reveal class="trust__eyebrow">Why SVARA</p>
        <h2 v-reveal class="trust__title" data-split>{{ homeSection06.title }}</h2>
        <div v-reveal="{ delay: 0.1 }" class="trust__more"><SectionLink to="/about" label="Learn more about SVARA" /></div>
      </div>

      <div class="trust__viz-wrap">
        <svg class="trust__blueprint" viewBox="0 0 400 500" preserveAspectRatio="none" aria-hidden="true">
          <path class="bp-corner" d="M12 40 V12 H40" />
          <path class="bp-corner" d="M360 12 H388 V40" />
          <path class="bp-corner" d="M388 460 V488 H360" />
          <path class="bp-corner" d="M40 488 H12 V460" />
          <line class="bp-grid" x1="0" y1="166" x2="400" y2="166" />
          <line class="bp-grid" x1="0" y1="333" x2="400" y2="333" />
          <line class="bp-grid" x1="133" y1="0" x2="133" y2="500" />
          <line class="bp-grid" x1="266" y1="0" x2="266" y2="500" />
        </svg>
        <div class="trust__scan" aria-hidden="true" />

        <div v-reveal class="trust__cards">
          <div
            v-for="(r, i) in homeSection06.reasons" :key="r.title"
            class="trust__card" tabindex="0"
          >
            <div class="trust__card-head">
              <span class="trust__card-num mono">{{ String(i + 1).padStart(2, '0') }}</span>
              <h3 class="trust__card-title">{{ r.title }}</h3>
            </div>
            <div class="trust__card-body">
              <p class="trust__card-desc">{{ r.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.trust {
  min-height: 90vh;
  display: flex;
  align-items: center;
}
.trust__inner {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding: var(--section-y) var(--container-pad);
  display: grid;
  grid-template-columns: 4fr 6fr;
  gap: var(--gap-section);
  align-items: center;
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
.trust__more { margin-top: var(--space-8); }

/* very subtle animated blueprint frame around the panel */
.trust__viz-wrap { position: relative; }
.trust__blueprint {
  position: absolute;
  inset: -28px;
  width: calc(100% + 56px);
  height: calc(100% + 56px);
  pointer-events: none;
}
.bp-corner {
  fill: none;
  stroke: var(--color-accent);
  stroke-width: 1.5;
  opacity: 0.16;
  vector-effect: non-scaling-stroke;
}
.bp-grid {
  stroke: var(--color-text-faint);
  stroke-width: 1;
  stroke-dasharray: 2 7;
  opacity: 0.2;
  vector-effect: non-scaling-stroke;
}
.trust__scan {
  position: absolute;
  left: -28px; right: -28px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(47, 127, 230, 0.28), transparent);
  animation: trust-scan 7s linear infinite;
  pointer-events: none;
}
@keyframes trust-scan {
  0% { top: -28px; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: calc(100% + 28px); opacity: 0; }
}

/* five large architectural cards — each unfolds on hover/focus */
.trust__cards { display: flex; flex-direction: column; gap: var(--space-4); }
.trust__card {
  padding: var(--space-8);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  cursor: default;
  transition: border-color var(--motion-medium) var(--ease-smooth),
              background var(--motion-medium) var(--ease-smooth);
}
.trust__card:hover,
.trust__card:focus-visible {
  border-color: var(--color-accent);
  background: var(--color-bg);
  outline: none;
}
.trust__card-head {
  display: flex;
  align-items: baseline;
  gap: var(--space-6);
}
.trust__card-num {
  font-size: var(--type-label); letter-spacing: var(--tracking-label);
  color: var(--color-text-faint);
}
.trust__card:hover .trust__card-num,
.trust__card:focus-visible .trust__card-num { color: var(--color-accent); }
.trust__card-title {
  margin: 0;
  font-size: clamp(20px, 2vw, 28px);
  font-weight: var(--weight-bold); letter-spacing: -0.01em;
  color: var(--color-text);
}
/* the "unfold" — grid-rows 0fr → 1fr, no JS height measurement needed */
.trust__card-body {
  display: grid;
  grid-template-rows: 0fr;
  overflow: hidden;
  transition: grid-template-rows var(--motion-medium) var(--ease-smooth);
}
.trust__card:hover .trust__card-body,
.trust__card:focus-visible .trust__card-body { grid-template-rows: 1fr; }
.trust__card-desc {
  min-height: 0;
  margin: 0;
  padding-top: var(--space-4);
  font-size: var(--type-body); line-height: var(--leading-body);
  color: var(--color-text-secondary);
  overflow: hidden;
}

@media (max-width: 900px) {
  .trust__inner { grid-template-columns: 1fr; gap: var(--space-10); }
}
@media (prefers-reduced-motion: reduce) {
  .trust__card, .trust__card-num, .trust__card-body { transition: none; }
  .trust__scan { animation: none; opacity: 0; }
}
</style>
