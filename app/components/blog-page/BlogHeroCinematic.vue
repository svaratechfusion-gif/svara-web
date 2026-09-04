<script setup lang="ts">
// BLOG · HERO — the cinematic streaming design language applied as a VISUAL SYSTEM
// only: bottom-anchored content (metadata row + title + description + CTAs + arrow
// pills), staggered blur-fade-up. All copy is SVARA's own Blog content. The reusable
// .liquid-glass comes from styles/asme.css. No in-hero navbar / no search / profile /
// mobile menu (the global site header is the only nav). The hero is TRANSPARENT — the
// cinematic video now lives as a FIXED full-page background in blog.vue, so every
// section flows up over it (dark design language via styles/blog-dark.css).
import { knowledgeHubContent } from '~~/lib/content/knowledge-hub'

const description = knowledgeHubContent.canonicalDefinition

function scrollTo(sel: string): void {
  if (typeof document === 'undefined') return
  document.querySelector(sel)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// Inter — the reference typography
useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap' },
  ],
})
</script>

<template>
  <section class="bh">
    <!-- transparent over the fixed page video (blog.vue) — no in-hero video -->

    <!-- nav band is the global header (skipped) — this spacer clears it -->
    <div class="bh__navspace" aria-hidden="true" />

    <!-- bottom-anchored hero content -->
    <div class="bh__content">
      <div class="bh__row">
        <div class="bh__left">
          <!-- metadata row (blog metadata — existing content) -->
          <div class="bh__meta bh-anim" style="animation-delay: 300ms">
            <span class="bh__meta-i">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 5h11a2 2 0 0 1 2 2v12H6a2 2 0 0 1-2-2zM17 8h2a1 1 0 0 1 1 1v8a2 2 0 0 1-2 2M7 8h6M7 11h6M7 14h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
              SVARA Intelligence Journal
            </span>
            <span class="bh__meta-i">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l8 4-8 4-8-4zM4 12l8 4 8-4M4 17l8 4 8-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
              Edition · Vol 01
            </span>
            <span class="bh__meta-i">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5l2.9 5.9 6.6.95-4.75 4.63 1.12 6.52L12 17.4l-5.9 3.1 1.12-6.52L2.5 9.35l6.6-.95z" /></svg>
              Featured · Research
            </span>
          </div>

          <h1 v-glitch class="bh__title svara-hero-h1 bh-anim" style="animation-delay: 400ms">Enterprise intelligence,<br>in writing.</h1>
        </div>

        <!-- right: subheading, CTAs and the section navigation pills -->
        <div class="bh__right">
          <p v-glitch="{ intensity: 0.68, delay: 1.35 }" class="bh__desc bh-anim" style="animation-delay: 500ms">{{ description }}</p>

          <div class="bh__ctas">
            <NuxtLink to="/technology" class="bh__cta bh__cta--solid bh-anim" style="animation-delay: 600ms">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 5h11a2 2 0 0 1 2 2v12H6a2 2 0 0 1-2-2zM17 8h2a1 1 0 0 1 1 1v8a2 2 0 0 1-2 2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
              Read the thinking
            </NuxtLink>
            <NuxtLink to="/contact" class="bh__cta liquid-glass bh-anim" style="animation-delay: 700ms">Talk to SVARA</NuxtLink>
          </div>

          <div class="bh__nav">
          <button type="button" class="bh__navbtn liquid-glass bh-anim" style="animation-delay: 800ms" @click="scrollTo('#featured')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
            Featured
          </button>
          <button type="button" class="bh__navbtn liquid-glass bh-anim" style="animation-delay: 900ms" @click="scrollTo('#journal')">
            The Journal
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bh {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: transparent; /* the fixed page video (blog.vue) shows through */
  font-family: 'Inter', system-ui, sans-serif;
  color: #fff;
}

.bh__navspace { min-height: calc(var(--nav-height, 80px) + 8px); flex-shrink: 0; }

.bh__content {
  position: relative; z-index: 10;
  flex: 1 1 auto;
  display: flex; flex-direction: column; justify-content: flex-end;
  padding: 16px 16px 32px;
  min-height: 0;
}
@media (min-width: 640px) { .bh__content { padding: 24px 24px 32px; } }
@media (min-width: 768px) { .bh__content { padding: 48px 48px 64px; } }

/* HEADING LEFT / SUBHEADING RIGHT — stacks on mobile, splits from 768px */
.bh__row { display: flex; flex-direction: column; align-items: flex-start; gap: 32px; }
.bh__left, .bh__right { width: 100%; min-width: 0; display: flex; flex-direction: column; align-items: flex-start; }
@media (min-width: 768px) {
  /* the row spans the whole hero: heading pinned TOP-LEFT, subheading BOTTOM-RIGHT */
  .bh__row { flex: 1 1 auto; flex-direction: row; align-items: stretch; gap: clamp(32px, 5vw, 72px); }
  .bh__left { flex: 1 1 56%; justify-content: flex-start; }
  .bh__right { flex: 1 1 44%; justify-content: flex-end; }
}

/* metadata row */
.bh__meta { display: flex; flex-wrap: wrap; gap: 12px 24px; margin-bottom: 24px; font-size: 12px; }
@media (min-width: 640px) { .bh__meta { font-size: 14px; margin-bottom: 32px; } }
.bh__meta-i { display: inline-flex; align-items: center; gap: 8px; font-weight: 500; color: #fff; }
.bh__meta-i svg { flex-shrink: 0; }

/* title */
.bh__title {
  margin: 0;
  font-weight: 400;
  letter-spacing: -0.04em;
  line-height: 1;
  font-size: clamp(30px, 6.4vw, 76px);
  color: #fff;
}
/* description */
.bh__desc { margin: 0 0 24px; max-width: 42rem; font-size: 16px; line-height: 1.55; color: rgba(255, 255, 255, 0.62); }
@media (min-width: 640px) { .bh__desc { font-size: 18px; } }
@media (min-width: 768px) { .bh__desc { margin-bottom: 48px; font-size: 20px; } }

/* CTAs */
.bh__ctas { display: flex; flex-wrap: wrap; gap: 12px; }
@media (min-width: 640px) { .bh__ctas { gap: 16px; } }
.bh__cta {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 24px; border-radius: 999px;
  font-size: 15px; font-weight: 500; text-decoration: none; cursor: pointer; color: #fff;
}
@media (min-width: 640px) { .bh__cta { padding: 12px 32px; } }
.bh__cta--solid { background: #fff; color: #000; transition: background 0.2s ease; }
.bh__cta--solid:hover { background: #e5e5e5; }
.bh__cta.liquid-glass { transition: background 0.2s ease; }
.bh__cta.liquid-glass:hover { background: rgba(255, 255, 255, 0.05); }

/* section nav pills — now under the right column's subheading + CTAs */
.bh__nav { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 24px; }
@media (min-width: 768px) { .bh__nav { margin-top: 32px; } }
.bh__navbtn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 24px; border-radius: 999px;
  font-size: 15px; font-weight: 500; color: #fff; cursor: pointer;
  transition: background 0.2s ease;
}
@media (min-width: 640px) { .bh__navbtn { padding: 12px 24px; } }
.bh__navbtn:hover { background: rgba(255, 255, 255, 0.05); }

/* blur-fade-up entrance */
@keyframes bh-blur-fade-up {
  from { opacity: 0; filter: blur(20px); transform: translateY(40px); }
  to { opacity: 1; filter: blur(0); transform: translateY(0); }
}
.bh-anim { opacity: 0; animation: bh-blur-fade-up 1s ease-out forwards; }

@media (prefers-reduced-motion: reduce) {
  .bh-anim { animation: none; opacity: 1; filter: none; transform: none; }
  .bh__cta, .bh__navbtn { transition: none; }
}
</style>
