<script setup lang="ts">
// HERO — cinematic, CENTERED composition. The fiber animation (the fixed
// scroll-scrubbed video behind) is the centrepiece; one unified content block
// sits centered beneath it, lifted into the visual centre of the viewport.
// No split layout, no side labels, no status card — that story begins on scroll.
const nuxtApp = useNuxtApp()

function toStack() {
  if (typeof document === 'undefined') return
  const el = document.querySelector('.st')
  if (!el) return
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lenis = (nuxtApp as any).$lenis
  if (lenis?.scrollTo) lenis.scrollTo(el as HTMLElement, { offset: -20 })
  else (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <section class="sx-screen sx-pad hero" aria-labelledby="hero-h1">
    <div class="hero__block">
      <p class="sx-mono hero__eyebrow" data-reveal data-reveal-delay="120">
        <span class="hero__eyebrow-dot" />Ten Intelligence Systems
      </p>

      <h1 id="hero-h1" class="sx-h1 sx-lift-lg hero__h1" data-reveal data-reveal-delay="220">
        Ten Intelligence Systems.<br>One Connected Stack.
      </h1>

      <p class="hero__desc sx-body-lg sx-lift" data-reveal data-reveal-delay="320">
        Specialized AI systems that sense, reason, predict, automate and transform enterprise
        operations—built independently and designed to work together.
      </p>

      <div class="hero__ctas" data-reveal data-reveal-delay="420">
        <button type="button" class="sx-btn sx-btn--primary hero__cta" @click="toStack">
          Explore Products
        </button>
        <NuxtLink to="/contact" class="sx-btn sx-btn--secondary hero__cta">
          Request Demo
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* override the shared screen's space-between → a single centred block */
.hero {
  justify-content: center;
  align-items: center;
  text-align: center;
}
.hero__block {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 780px;
  /* lift the block ~120–170px into the visual centre (above geometric centre) */
  transform: translateY(clamp(-170px, -14vh, -120px));
}

.hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 16px;
  border-radius: var(--radius-pill, 999px);
  background: var(--sx-glass);
  border: 1px solid var(--sx-border);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  font-size: 11px;
  color: var(--sx-navy-2);
}
.hero__eyebrow-dot {
  width: 6px; height: 6px; border-radius: 50%; background: var(--sx-blue);
  box-shadow: 0 0 0 3px rgba(47, 127, 230, 0.16);
}

.hero__h1 { margin: 26px 0 0; }
.hero__desc {
  margin: 20px 0 0;
  max-width: 46ch;
  color: rgba(19, 41, 91, 0.82);
  text-wrap: pretty;
}

.hero__ctas { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; margin-top: 34px; }
.hero__cta { padding: 13px 26px; font-size: 14px; font-weight: 500; }

@media (max-width: 760px) {
  .hero__block { transform: translateY(-40px); }
  .hero__h1 { margin-top: 20px; }
}
</style>
