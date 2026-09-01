<script setup lang="ts">
// ABOUT · HERO (Asme) — fullscreen cinematic looping background video with a
// hand-rolled crossfade-to-black loop (canplay / timeupdate ≤0.55s / ended + rAF
// opacity, fadingOut guard so the fade-out fires once), Instrument-Serif heading,
// an email-bar-styled primary CTA (NO newsletter form), a subtitle, a secondary
// CTA, and LinkedIn/GitHub/Contact glass social buttons. All copy is SVARA's own.
// Content is centered in the viewport BELOW the global nav (nav-clearance padding
// + justify-center) — no header overlap. .liquid-glass comes from styles/asme.css.
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { motion } from 'motion-v'
import { heroInitial, heroAnimate, heroTransition } from '~/utils/hero-motion'
import { companyContent } from '~~/lib/content/company'

const VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4'

const subtitle = companyContent.aiAnswerTarget.replace(/\*\*/g, '')

const LINKEDIN = 'https://www.linkedin.com/company/svaratechfusion'
const GITHUB = 'https://github.com/svaratechfusion'

function discover(): void {
  if (typeof document === 'undefined') return
  document.getElementById('asme-story')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// ── crossfade-to-black looping video (vanilla rAF opacity, per the reference) ──
const videoEl = ref<HTMLVideoElement | null>(null)
let raf = 0
let fadingOut = false
let cleanup: (() => void) | null = null

function fade(to: number, ms: number): void {
  const v = videoEl.value
  if (!v) return
  cancelAnimationFrame(raf) // each new fade cancels the running one; resume from current opacity
  const from = Number(v.style.opacity || '0')
  const start = performance.now()
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / ms)
    v.style.opacity = String(from + (to - from) * t)
    if (t < 1) raf = requestAnimationFrame(step)
  }
  raf = requestAnimationFrame(step)
}

onMounted(() => {
  const v = videoEl.value
  if (!v) return
  v.style.opacity = '0'
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const onCanPlay = () => { v.play().catch(() => {}); fadingOut = false; fade(1, reduced ? 0 : 500) }
  const onTimeUpdate = () => {
    if (reduced || fadingOut || !v.duration) return
    if (v.duration - v.currentTime <= 0.55) { fadingOut = true; fade(0, 500) }
  }
  const onEnded = () => {
    v.style.opacity = '0'
    window.setTimeout(() => { v.currentTime = 0; v.play().catch(() => {}); fadingOut = false; fade(1, 500) }, 100)
  }

  v.addEventListener('canplay', onCanPlay)
  v.addEventListener('timeupdate', onTimeUpdate)
  v.addEventListener('ended', onEnded)
  if (v.readyState >= 3) onCanPlay()

  cleanup = () => {
    cancelAnimationFrame(raf)
    v.removeEventListener('canplay', onCanPlay)
    v.removeEventListener('timeupdate', onTimeUpdate)
    v.removeEventListener('ended', onEnded)
  }
})
onBeforeUnmount(() => cleanup?.())
</script>

<template>
  <section class="ah">
    <video ref="videoEl" class="ah__video" muted playsinline preload="auto" aria-hidden="true">
      <source :src="VIDEO" type="video/mp4">
    </video>

    <div class="ah__content">
      <div class="ah__row">
        <!-- left: heading -->
        <div class="ah__col ah__col--l">
          <motion.h1 v-glitch class="ah__title svara-hero-h1" :initial="heroInitial()" :animate="heroAnimate" :transition="heroTransition(0)">Intelligence for the <em>real world.</em></motion.h1>
        </div>

        <!-- right: subheading (with its CTA bar) + secondary CTA -->
        <div class="ah__col ah__col--r">
      <motion.div class="ah__panel" :initial="heroInitial()" :animate="heroAnimate" :transition="heroTransition(1)">
        <!-- primary CTA in the reference's email-bar position (a static CTA, no form) -->
        <button type="button" class="ah__cta-bar liquid-glass" @click="discover">
          <span class="ah__cta-bar-label">Discover Our Story</span>
          <span class="ah__cta-bar-go" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </span>
        </button>
        <p v-glitch="{ intensity: 0.68, delay: 1.35 }" class="ah__subtitle">{{ subtitle }}</p>
      </motion.div>

      <NuxtLink to="/contact" class="ah__cta-alt liquid-glass">Talk to SVARA</NuxtLink>
        </div>
      </div>
    </div>

    <!-- social footer: LinkedIn / GitHub / Contact -->
    <div class="ah__social">
      <a :href="LINKEDIN" target="_blank" rel="noopener" class="ah__social-btn liquid-glass" aria-label="SVARA on LinkedIn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.95 1.82-1.95 3.75-1.95C20.4 8.75 21 11 21 14v7h-4v-6.2c0-1.48-.03-3.4-2.07-3.4-2.07 0-2.39 1.62-2.39 3.29V21H9z" /></svg>
      </a>
      <a :href="GITHUB" target="_blank" rel="noopener" class="ah__social-btn liquid-glass" aria-label="SVARA on GitHub">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.85 9.73.5.1.68-.22.68-.49l-.01-1.7c-2.79.62-3.38-1.37-3.38-1.37-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" /></svg>
      </a>
      <NuxtLink to="/contact" class="ah__social-btn liquid-glass" aria-label="Contact SVARA">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 5h16v14H4zM4 6l8 6 8-6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.ah {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #000;
}
/* full-cover video, framed to show the lower portion (the reference's downward
   shift) via object-position — no black gap, so nothing reads as broken */
.ah__video { position: absolute; inset: 0; z-index: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 80%; opacity: 0; }

/* hero content — centered in the viewport BELOW the global nav (no overlap) */
.ah__content {
  position: relative;
  z-index: 10;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 24px;
  padding: calc(var(--nav-height, 80px) + 24px) clamp(24px, 5vw, 64px) 24px;
  text-align: left;
}

/* HEADING LEFT / SUBHEADING RIGHT — stacks on mobile, splits from 900px */
.ah__row { width: 100%; max-width: 1280px; margin-inline: auto; display: flex; flex-direction: column; align-items: flex-start; gap: 28px; }
.ah__col { width: 100%; min-width: 0; display: flex; flex-direction: column; align-items: flex-start; gap: 20px; }
@media (min-width: 900px) {
  /* the row spans the whole hero: heading pinned TOP-LEFT, subheading BOTTOM-RIGHT */
  .ah__row { flex: 1 1 auto; flex-direction: row; align-items: stretch; gap: clamp(36px, 5vw, 88px); }
  .ah__col--l { flex: 1 1 55%; justify-content: flex-start; }
  .ah__col--r { flex: 1 1 45%; justify-content: flex-end; padding-bottom: 6px; }
}

.ah__title {
  margin: 0;
  font-family: 'Instrument Serif', serif;
  font-weight: 400;
  color: #fff;
  letter-spacing: -0.02em;
  line-height: 1;
  font-size: clamp(48px, 10vw, 112px);
  max-width: 15ch;
}
@media (min-width: 900px) { .ah__title { max-width: none; } }
.ah__title em { font-style: italic; color: rgba(255, 255, 255, 0.62); }

/* max-w-xl container: primary CTA + subtitle */
.ah__panel { width: 100%; max-width: 34rem; display: flex; flex-direction: column; gap: 16px; }

/* primary CTA — styled like the reference email pill (glass bar + white go button) */
.ah__cta-bar {
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  width: 100%; padding: 8px 8px 8px 24px; border-radius: 999px; cursor: pointer;
}
.ah__cta-bar-label { font-size: 16px; color: #fff; }
.ah__cta-bar-go {
  display: inline-flex; align-items: center; justify-content: center;
  width: 44px; height: 44px; border-radius: 999px; background: #fff; color: #000; flex-shrink: 0;
  transition: transform 0.2s ease;
}
.ah__cta-bar:hover .ah__cta-bar-go { transform: translateX(2px); }

.ah__subtitle { margin: 0; font-size: 14px; line-height: 1.6; color: rgba(255, 255, 255, 0.85); padding: 0 4px; }

.ah__cta-alt {
  align-self: flex-start;
  padding: 12px 32px; border-radius: 999px; color: #fff; font-size: 14px; font-weight: 500;
  text-decoration: none; cursor: pointer; transition: background 0.2s ease;
}
.ah__cta-alt:hover { background: rgba(255, 255, 255, 0.05); }

.ah__social { position: relative; z-index: 10; width: 100%; max-width: 1280px; margin-inline: auto; display: flex; justify-content: flex-start; gap: 16px; padding: 0 clamp(24px, 5vw, 64px) 48px; }
.ah__social-btn {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 16px; border-radius: 999px; color: rgba(255, 255, 255, 0.8);
  transition: color 0.25s ease, background 0.25s ease;
}
.ah__social-btn:hover { color: #fff; background: rgba(255, 255, 255, 0.05); }

@media (prefers-reduced-motion: reduce) {
  .ah__cta-bar-go, .ah__cta-alt, .ah__social-btn { transition: none; }
}
</style>
