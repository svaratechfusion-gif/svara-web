<script setup lang="ts">
// DIVISIONS · HERO — a transparent, full-viewport section over the page's FIXED
// background video (in divisions.vue). The video persists while the sections
// below flow up over it — the homepage's fixed-background / flowing-content model.
// The existing SVARA content (label, animated heading, description, CTAs) sits at
// z1 over the video; no overlay/scrim.
import FadeUp from './FadeUp.vue'

const words = ['SIX', 'SPECIALIZED', 'DIVISIONS.', 'ONE', 'UNIFIED', 'VISION.']

function exploreDivisions() {
  if (typeof document === 'undefined') return
  document.querySelector('.divisions-page__body')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <section class="divhero">
    <div class="divhero__content">
      <FadeUp as="span" class="divhero__label" :delay="0.05" :y="20">SVARA DIVISIONS</FadeUp>

      <h2 class="divhero__heading svara-hero-h1">
        <template v-for="(w, i) in words" :key="i">
          <FadeUp as="span" class="divhero__word" :delay="0.15 + i * 0.08" :y="32">{{ w }}</FadeUp>
          <span v-if="i === 2" class="divhero__break" aria-hidden="true" />
        </template>
      </h2>

      <FadeUp as="p" class="divhero__desc" :delay="0.9" :y="24">
        SVARA operates through six specialized technology divisions engineered to solve every layer of enterprise transformation—from artificial intelligence and simulation to software, infrastructure and digital growth.
      </FadeUp>

      <FadeUp as="div" class="divhero__actions" :delay="1" :y="24">
        <button type="button" class="divhero__btn divhero__btn--primary" @click="exploreDivisions">
          Explore Divisions
        </button>
        <NuxtLink to="/technology" class="divhero__btn divhero__btn--secondary">
          View Technology Stack
        </NuxtLink>
      </FadeUp>
    </div>
  </section>
</template>

<style scoped>
@import url('https://db.onlinewebfonts.com/c/e66905e07608167a84e6ad52f638c3c6?family=Helvetica+Now+Var');

/* transparent full-viewport hero over the page's FIXED background video, so the
   sections below flow up over the persistent hero (homepage-style) */
.divhero {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  min-height: 100dvh;
  padding: 70px 32px 32px 32px;
  background: transparent;
}
.divhero,
.divhero :deep(*) {
  font-family: 'Helvetica Now Var', 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

.divhero__content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 720px;
}

.divhero__label {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(20, 34, 63, 0.72);
  margin-bottom: 22px;
}

.divhero__heading {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25em;
  margin: 0;
  font-size: clamp(26px, 3vw, 42px);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  color: #14223F;
}
.divhero__word { display: inline-block; }
.divhero__break { flex-basis: 100%; height: 0; }

.divhero__desc {
  margin-top: 24px;
  /* reference is 260px; widened for SVARA's longer copy (only content-driven change) */
  max-width: 460px;
  font-size: 14px;
  line-height: 1.65;
  color: rgba(20, 34, 63, 0.85);
}

.divhero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 30px;
}
.divhero__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 13px 24px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), background 0.3s ease, border-color 0.3s ease;
}
.divhero__btn:hover { transform: scale(1.02); }
.divhero__btn--primary {
  background: #ffffff;
  color: #0a0a0a;
  border: 1px solid #ffffff;
}
.divhero__btn--primary:hover { background: rgba(255, 255, 255, 0.88); }
.divhero__btn--secondary {
  background: rgba(20, 34, 63, 0.05);
  color: #14223F;
  border: 1px solid rgba(20, 34, 63, 0.35);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}
.divhero__btn--secondary:hover { background: rgba(20, 34, 63, 0.1); border-color: rgba(20, 34, 63, 0.6); }

@media (max-width: 900px) {
  .divhero { padding: 90px 18px 32px 18px; }
}
</style>
