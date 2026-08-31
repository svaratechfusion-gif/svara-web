<script setup lang="ts">
// HERO — centered: the SVARA Intelligence Core (R3F scene) lives behind the
// hero as a fixed full-viewport WebGL canvas. The HTML content — heading,
// description, CTAs — sits above it as a transparent overlay. The GSAP
// entrance animation animates the text/CTAs in; the R3F scene is already
// live from mount (lazy-loaded). Mouse-reactive camera and scroll-driven
// core dissolution are handled internally by the renderer.
import { onMounted, ref } from 'vue'
import { gsap } from '~~/lib/gsap'
import { ease } from '~~/lib/animation/motion'
import { homeHero } from '~~/lib/content/home'

const root = ref<HTMLElement>()

// homeHero.h1 verbatim, wrapped into two display lines
const lines = ['Engineering Intelligence', 'For The Future Of Enterprise']

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const q = gsap.utils.selector(root.value!)
  const tl = gsap.timeline({ defaults: { ease: ease.out } })
  tl.fromTo(q('.hero__title'), { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' })
    .fromTo(q('.hero__sub'), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.5')
    .fromTo(q('.hero__ctas'), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
})
</script>

<template>
  <section ref="root" class="hero">
    <!-- R3F Intelligence Core — full viewport behind everything -->
    <SvaraCanvas />

    <div class="hero__vignette" aria-hidden="true" />

    <div class="hero__stack">
      <h1 class="hero__title">
        <span v-for="l in lines" :key="l" class="hero__line">{{ l }}</span>
      </h1>

      <p class="hero__sub">{{ homeHero.description }}</p>

      <div class="hero__ctas">
        <NuxtLink :to="homeHero.primaryCta.to" class="hero__cta">{{ homeHero.primaryCta.label }}</NuxtLink>
        <NuxtLink :to="homeHero.secondaryCta.to" class="hero__cta hero__cta--ghost">{{ homeHero.secondaryCta.label }}</NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: var(--nav-height);
  box-sizing: border-box;
  overflow: hidden;
  /* Own stacking context so the R3F canvas (its background layer) covers the
     global light BackgroundCanvas within the hero region only. No opaque CSS
     background — the WebGL scene renders the dark navy stage. */
  isolation: isolate;
  background: transparent;
}

/* Dark vignette overlay between the R3F canvas and text — ensures
   typography always reads clearly regardless of the 3D scene lighting */
.hero__vignette {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 100% 60% at 50% 50%, transparent 0%, rgba(5, 12, 28, 0.35) 80%, rgba(5, 12, 28, 0.55) 100%);
  pointer-events: none;
  z-index: 1;
}

.hero__stack {
  position: relative;
  width: 100%;
  max-width: 960px;
  margin-inline: auto;
  padding-inline: var(--container-pad);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
  z-index: 2;
}

.hero__title {
  margin: 0;
  font-size: clamp(34px, 4.8vw, 72px);
  font-weight: var(--weight-extrabold);
  line-height: 1.06;
  letter-spacing: var(--tracking-display);
  color: #ffffff;
}
.hero__line {
  display: block;
  white-space: nowrap;
}

.hero__sub {
  margin: var(--space-6) 0 0;
  max-width: 46ch;
  font-size: var(--type-body);
  line-height: var(--leading-body);
  color: rgba(233, 240, 250, 0.66);
}

.hero__ctas {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-4);
  margin-top: var(--space-8);
}
.hero__cta {
  display: inline-flex;
  align-items: center;
  height: 56px;
  padding-inline: var(--space-8);
  border-radius: var(--radius-pill);
  /* inverted for the dark stage */
  background: #ffffff;
  color: #0a1226;
  font-size: var(--type-small);
  font-weight: var(--weight-semibold);
  text-decoration: none;
  transition: background var(--motion-medium) var(--ease-smooth),
              transform var(--motion-fast) var(--ease-smooth),
              color var(--motion-medium) var(--ease-smooth),
              border-color var(--motion-medium) var(--ease-smooth);
}
.hero__cta:hover { background: var(--color-accent); color: #ffffff; transform: translateY(-2px); }
.hero__cta:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }
.hero__cta--ghost {
  background: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.28);
}
.hero__cta--ghost:hover { background: transparent; color: var(--color-accent); border-color: var(--color-accent); }

@keyframes hero-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 1024px) {
  .hero { min-height: auto; padding-block: calc(var(--nav-height) + var(--space-12)) var(--space-20); }
}
@media (prefers-reduced-motion: reduce) {
  .hero__cta { transition: none; }
}
</style>
