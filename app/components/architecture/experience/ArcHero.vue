<script setup lang="ts">
// ARCHITECTURE · HERO — the "Velorah" cinematic-video design language applied as a
// VISUAL SYSTEM only (fullscreen looping video, Instrument Serif display type,
// liquid-glass CTAs, fade-rise motion, minimal centered composition) inside SVARA's
// own brand: deep-navy ground nudged from the reference toward SVARA #14223F,
// SVARA blue accent, real SVARA Architecture copy + CTAs. No in-hero navbar (the
// global site header is the only nav). No Velorah branding. The hero's video is now
// a FIXED full-viewport background in architecture.vue (so the sections flow up over
// it, homepage/divisions-style); this section is transparent over it.

// Instrument Serif (display) + Inter (body) — the reference's typography.
useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500&display=swap',
    },
  ],
})
</script>

<template>
  <section class="ah">
    <!-- the hero's fullscreen video is now a FIXED page background (architecture.vue);
         this section is transparent over it. Soft seam resolves the dark video into
         the ivory sections below. -->
    <div class="ah__seam" aria-hidden="true" />

    <div class="ah__inner">
      <div class="ah__row">
        <!-- left: eyebrow + heading -->
        <div class="ah__col ah__col--l">
          <p class="ah__eyebrow rise">SVARA System Architecture</p>

          <h1 v-glitch class="ah__title svara-hero-h1 rise">
            One stack. Every layer<br><em class="ah__title-muted">of intelligence.</em>
          </h1>
        </div>

        <!-- right: subheading, CTAs, status readout -->
        <div class="ah__col ah__col--r">
      <p v-glitch="{ intensity: 0.68, delay: 1.35 }" class="ah__body rise rise--d1">
        SVARA connects physical systems, edge intelligence, enterprise data, AI
        models, autonomous agents, simulations and business applications through
        one unified AI-native architecture.
      </p>

      <div class="ah__ctas rise rise--d2">
        <NuxtLink to="/contact" class="ah-glass ah__cta ah__cta--primary">
          Build with SVARA
        </NuxtLink>
        <NuxtLink to="/technology" class="ah-glass ah__cta">
          Explore technology
        </NuxtLink>
      </div>

      <p class="ah__status rise rise--d2">
        <span class="ah__status-dot" />SVARA ARCHITECTURE // OPERATIONAL
      </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ah {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: stretch;
  justify-content: center;
  overflow: hidden;
  isolation: isolate;
  /* transparent — the FIXED page video (architecture.vue) shows through the hero */
  background: transparent;
  /* local dark theme (adapted from the reference toward SVARA) */
  --ah-fg: #ffffff;
  --ah-muted: rgba(233, 237, 246, 0.62);
  --ah-accent: #6ba6ff;
}

/* bottom seam → resolves into the page's warm-ivory ground (#f6f2ea) */
.ah__seam {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  height: clamp(120px, 18vh, 220px);
  background: linear-gradient(to bottom, rgba(16, 29, 56, 0) 0%, #f6f2ea 100%);
  pointer-events: none;
}

/* centered cinematic content */
.ah__inner {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1280px;
  margin-inline: auto;
  padding: calc(var(--nav-height, 80px) + 40px) clamp(20px, 6vw, 64px) clamp(96px, 16vh, 176px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

/* HEADING LEFT / SUBHEADING RIGHT — stacks on mobile, splits from 900px */
.ah__row { width: 100%; display: flex; flex-direction: column; align-items: flex-start; gap: 30px; }
.ah__col { width: 100%; min-width: 0; display: flex; flex-direction: column; align-items: flex-start; }
@media (min-width: 900px) {
  /* the row spans the whole hero: heading pinned TOP-LEFT, subheading BOTTOM-RIGHT */
  .ah__row { flex: 1 1 auto; flex-direction: row; align-items: stretch; gap: clamp(36px, 5vw, 88px); }
  .ah__col--l { flex: 1 1 56%; justify-content: flex-start; }
  .ah__col--r { flex: 1 1 44%; justify-content: flex-end; padding-bottom: 8px; }
}

.ah__eyebrow {
  margin: 0 0 26px;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--ah-muted);
}

.ah__title {
  margin: 0;
  font-family: 'Instrument Serif', serif;
  font-weight: 400;
  font-size: clamp(46px, 8.4vw, 118px);
  line-height: 0.95;
  letter-spacing: -0.028em;
  color: var(--ah-fg);
  text-wrap: balance;
}
.ah__title-muted { font-style: normal; color: var(--ah-muted); }

.ah__body {
  margin: 0;
  max-width: 620px;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: clamp(15px, 1.4vw, 19px);
  line-height: 1.65;
  color: var(--ah-muted);
}

/* CTAs */
.ah__ctas {
  margin-top: 32px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 14px;
}
.ah__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 40px;
  border-radius: 999px;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.01em;
  color: var(--ah-fg);
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), background 0.35s ease;
}
.ah__cta:hover { transform: scale(1.03); }
.ah__cta--primary { background: rgba(255, 255, 255, 0.07); }
.ah__cta--primary:hover { background: rgba(107, 166, 255, 0.16); }

/* status readout — real SVARA content, kept as a subtle technical label */
.ah__status {
  margin: 28px 0 0;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.16em;
  color: var(--ah-muted);
}
.ah__status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--ah-accent);
  box-shadow: 0 0 0 4px rgba(107, 166, 255, 0.16);
}

/* ── Liquid glass (exact reference implementation, scoped) ───────────────── */
.ah-glass {
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.01);
  background-blend-mode: luminosity;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: none;
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
}
.ah-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.4px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.45) 0%,
    rgba(255, 255, 255, 0.15) 20%,
    rgba(255, 255, 255, 0) 40%,
    rgba(255, 255, 255, 0) 60%,
    rgba(255, 255, 255, 0.15) 80%,
    rgba(255, 255, 255, 0.45) 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

/* ── fade-rise entrance (exact reference timing) ─────────────────────────── */
@keyframes ah-fade-rise {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
.rise { animation: ah-fade-rise 0.8s ease-out both; }
.rise--d1 { animation-delay: 0.2s; }
.rise--d2 { animation-delay: 0.4s; }

@media (max-width: 560px) {
  .ah__ctas { flex-direction: column; width: 100%; }
  .ah__cta { width: 100%; }
}

@media (prefers-reduced-motion: reduce) {
  .rise { animation: none; opacity: 1; transform: none; }
  .ah__cta { transition: none; }
}
</style>
