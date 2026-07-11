<script setup lang="ts">
// 01 HERO — 12-col grid, 5/7 split. Left: eyebrow, huge heading,
// description, primary + secondary CTA. Right: premium visual. Design and
// animation unchanged from prior sprint; copy from the Content Bible.
import { onMounted, ref } from 'vue'
import { gsap } from '~~/lib/gsap'
import { ease } from '~~/lib/animation/motion'
import GlassImage from '~/components/glass/GlassImage.vue'
import { homeHero } from '~~/lib/content/home'

const root = ref<HTMLElement>()

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const q = gsap.utils.selector(root.value!)
  const tl = gsap.timeline({ defaults: { ease: ease.out } })
  tl.fromTo(q('.hero__eyebrow'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
    .fromTo(q('.hero__line-inner'), { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.08 }, '-=0.3')
    .fromTo(q('.hero__sub, .hero__ctas'), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, '-=0.45')
    .fromTo(q('.hero__visual'), { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 1.1 }, 0.15)
})

// H1 supplied verbatim; broken into display lines for the line-reveal.
const lines = ['Engineering', 'Intelligence For', 'The Future Of', 'Enterprise']
</script>

<template>
  <section ref="root" class="hero">
    <div class="hero__grid">
      <div class="hero__copy">
        <p class="hero__eyebrow">{{ homeHero.eyebrow }}</p>
        <h1 class="hero__title">
          <span v-for="l in lines" :key="l" class="hero__line"><span class="hero__line-inner">{{ l }}</span></span>
        </h1>
        <p class="hero__sub">{{ homeHero.description }}</p>
        <div class="hero__ctas">
          <NuxtLink :to="homeHero.primaryCta.to" class="hero__cta">{{ homeHero.primaryCta.label }}</NuxtLink>
          <NuxtLink :to="homeHero.secondaryCta.to" class="hero__cta hero__cta--ghost">{{ homeHero.secondaryCta.label }}</NuxtLink>
        </div>
      </div>

      <GlassImage
        class="hero__visual"
        data-parallax="4"
        src="/images/home/hero-core.jpg"
        alt="SVARA intelligence core — architectural visualization"
        ratio="3/2.35"
        loading="eager"
        fetchpriority="high"
        :cursor="8"
      >
        <span class="telemetry-chip" style="top: 9%; left: 6%; animation-delay: 0s;" aria-hidden="true"><i />LATENCY 14MS</span>
        <span class="telemetry-chip" style="top: 22%; right: 5%; animation-delay: -2.4s;" aria-hidden="true"><i />UPTIME 99.97%</span>
        <span class="telemetry-chip" style="bottom: 10%; left: 10%; animation-delay: -4.8s;" aria-hidden="true"><i />NODES 241 ACTIVE</span>
      </GlassImage>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: var(--nav-height);
  box-sizing: border-box;
}
.hero__grid {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--container-pad);
  display: grid;
  grid-template-columns: 5fr 7fr; /* never equal halves */
  gap: var(--gap-card);
  align-items: center;
  box-sizing: border-box;
}
.hero__eyebrow {
  margin: 0 0 var(--space-6);
  font-family: var(--font-mono);
  font-size: var(--type-label);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-accent);
}
.hero__title {
  margin: 0;
  font-size: clamp(44px, 5.2vw, 88px);
  font-weight: var(--weight-extrabold);
  line-height: 1.08;
  letter-spacing: var(--tracking-display);
  color: var(--color-text);
}
.hero__line { display: block; overflow: hidden; padding-bottom: 0.16em; margin-bottom: -0.16em; }
.hero__line-inner { display: block; white-space: nowrap; }
.hero__sub {
  margin: var(--space-8) 0 0;
  max-width: 520px;
  font-size: var(--type-body);
  line-height: var(--leading-body);
  color: var(--color-text-secondary);
}
.hero__ctas {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  margin-top: var(--space-10);
}
.hero__cta {
  display: inline-flex;
  align-items: center;
  height: 56px;
  padding-inline: var(--space-8);
  border-radius: var(--radius-pill);
  background: var(--color-text);
  color: var(--color-inverse);
  font-size: var(--type-small);
  font-weight: var(--weight-semibold);
  text-decoration: none;
  transition: background var(--motion-medium) var(--ease-smooth),
              transform var(--motion-fast) var(--ease-smooth),
              border-color var(--motion-medium) var(--ease-smooth);
}
.hero__cta:hover { background: var(--color-accent); transform: translateY(-2px); }
.hero__cta:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }
.hero__cta--ghost {
  background: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border-strong);
}
.hero__cta--ghost:hover { background: transparent; color: var(--color-accent); border-color: var(--color-accent); }

/* frame/reflections/shadow now come from GlassImage */
.hero__visual { width: 100%; }

@media (max-width: 1024px) {
  .hero { min-height: auto; padding-block: calc(var(--nav-height) + var(--space-12)) var(--space-16); }
  .hero__grid { grid-template-columns: 1fr; gap: var(--space-12); }
  .hero__visual { order: 2; }
}
@media (prefers-reduced-motion: reduce) {
  .hero__cta { transition: none; }
}
</style>
