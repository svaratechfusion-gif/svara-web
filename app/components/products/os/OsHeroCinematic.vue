<script setup lang="ts">
// PRODUCTS · HERO — the NOVAFALL: IRIS design system implemented exactly, with
// SVARA branding / products / messaging. Layer order: black base → cinematic
// background image (scale 1.08) → WebGL atmospheric canvas → grid overlay →
// content (eyebrow → editorial headline → copy → CTA). Typography Archivo (200/
// 400) + Rajdhani (600 labels). Cyan #67E8F9 system, glass gradient-border shell.
// No in-hero navbar (global SVARA header only).
import DotField from '~/components/products/os/DotField.vue'

const BG = 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5ee0a38a-b5d3-4531-8793-98beed4af162_1600w.jpg'

const panel = [
  { k: 'Platform', v: 'Enterprise Intelligence Platform' },
  { k: 'Category', v: 'AI Infrastructure' },
  { k: 'Products', v: '10 Connected Systems' },
  { k: 'Deployment', v: 'Cloud • Edge • Hybrid' },
  { k: 'Coverage', v: 'Enterprise • Government • Industrial' },
  { k: 'Recognition', v: 'Startup India · DPIIT' },
  { k: 'Headquarters', v: 'Hyderabad, India' },
  { k: 'Status', v: 'Operational' },
]

useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Archivo:wght@200;400;600&family=Rajdhani:wght@500;600;700&display=swap' },
  ],
})

function explore(): void {
  if (typeof document === 'undefined') return
  document.getElementById('os-products')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <section class="oz">
    <!-- 1 · black base is the section background · 2 · cinematic background image -->
    <div class="oz__image" :style="{ backgroundImage: `url('${BG}')` }" aria-hidden="true" />
    <!-- 3 · WebGL atmospheric canvas -->
    <div class="oz__gl" aria-hidden="true"><DotField /></div>
    <!-- 4 · grid overlay -->
    <div class="oz__grid" aria-hidden="true" />
    <div class="oz__vignette" aria-hidden="true" />
    <div class="oz__seam" aria-hidden="true" />

    <!-- content -->
    <div class="oz__inner">
      <p class="oz__eyebrow oz-anim"><span class="oz__eyebrow-dot" />SVARA · ENTERPRISE INTELLIGENCE OPERATING SYSTEM</p>

      <h1 class="oz__title">
        <span class="oz-anim" style="animation-delay: 80ms">THE</span>
        <span class="oz-anim" style="animation-delay: 180ms">INTELLIGENCE</span>
        <span class="oz-anim oz__title-accent" style="animation-delay: 280ms">STACK</span>
      </h1>

      <p class="oz__sub oz-anim" style="animation-delay: 420ms">
        One unified intelligence layer connecting Vision AI, Digital Twins, AI Agents, Business Cloud,
        Edge AI, Growth Intelligence, Drone AI and Generative AI into one connected operating system.
      </p>

      <div class="oz__shell oz-anim" style="animation-delay: 540ms">
        <div class="oz__panel">
          <div v-for="row in panel" :key="row.k" class="oz__cell">
            <span class="oz__cell-k">{{ row.k }}</span>
            <span class="oz__cell-v">{{ row.v }}</span>
          </div>
        </div>
      </div>

      <button type="button" class="oz__cta oz-anim" style="animation-delay: 660ms" @click="explore">
        Explore Products
        <span class="oz__cta-arrow" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M6 13l6 6 6-6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.oz {
  position: relative; overflow: hidden; isolation: isolate;
  min-height: 100vh; min-height: 100dvh;
  display: flex; flex-direction: column; justify-content: center;
  padding: calc(var(--nav-height, 80px) + 32px) clamp(24px, 5vw, 64px) 96px;
  background: #000; color: #fff;
  font-family: 'Archivo', system-ui, sans-serif;
}
/* 2 · cinematic background image (scale 1.08 + graded filter) */
.oz__image { position: absolute; inset: 0; z-index: 1; background-size: cover; background-position: center; transform: scale(1.08); will-change: transform; filter: saturate(0.7) brightness(0.85) hue-rotate(-10deg); }
/* 3 · WebGL atmospheric canvas */
.oz__gl { position: absolute; inset: 0; z-index: 2; }
/* 4 · grid overlay */
.oz__grid { position: absolute; inset: 0; z-index: 3; pointer-events: none; background-image: linear-gradient(rgba(103,232,249,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(103,232,249,0.07) 1px, transparent 1px); background-size: 56px 56px; -webkit-mask-image: radial-gradient(120% 100% at 50% 42%, #000 42%, transparent 100%); mask-image: radial-gradient(120% 100% at 50% 42%, #000 42%, transparent 100%); }
.oz__vignette { position: absolute; inset: 0; z-index: 3; pointer-events: none; background: radial-gradient(120% 92% at 50% 40%, transparent 38%, rgba(0,0,0,0.72) 100%); }
.oz__seam { position: absolute; left: 0; right: 0; bottom: 0; z-index: 3; height: clamp(90px, 14vh, 180px); background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, #FDFCF8 100%); pointer-events: none; }

.oz__inner { position: relative; z-index: 10; width: 100%; max-width: 1120px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; text-align: center; }

/* eyebrow — Rajdhani label */
.oz__eyebrow { display: inline-flex; align-items: center; gap: 10px; margin: 0 0 clamp(24px, 5vw, 48px); font-family: 'Rajdhani', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 4.8px; text-transform: uppercase; color: rgba(255,255,255,0.78); }
.oz__eyebrow-dot { width: 7px; height: 7px; border-radius: 50%; background: #67E8F9; box-shadow: 0 0 0 3px rgba(103,232,249,0.2), 0 0 14px rgba(103,232,249,0.8); }

/* headline — Archivo 200, editorial, wide tracking (0.18em; size scaled so the
   long word fits — the guide's fixed 164px is calibrated for a short word) */
.oz__title { margin: 0; display: flex; flex-direction: column; font-family: 'Archivo', sans-serif; font-weight: 200; text-transform: uppercase; line-height: 0.98; letter-spacing: 0.18em; font-size: clamp(34px, 8.6vw, 128px); color: #fff; }
.oz__title-accent { color: #67E8F9; text-shadow: 0 0 46px rgba(103,232,249,0.55); }

.oz__sub { margin: clamp(26px, 4vw, 42px) 0 0; max-width: 60ch; font-family: 'Archivo', sans-serif; font-weight: 400; font-size: 16px; line-height: 24px; color: rgba(255,255,255,0.66); }

/* glass gradient-border shell (exact recipe) */
.oz__shell { width: 100%; max-width: 920px; margin: clamp(36px, 5vw, 56px) 0 0; padding: 1px; background: linear-gradient(135deg, rgba(103,232,249,0.5), rgba(255,255,255,0.08) 40%, rgba(255,255,255,0.04)); box-shadow: rgba(0,0,0,0.8) 0 0 80px, rgba(103,232,249,0.35) 0 0 14px; }
.oz__panel { background: rgba(0,0,0,0.42); backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px); border: 1px solid rgba(255,255,255,0.14); display: grid; grid-template-columns: repeat(4, 1fr); }
.oz__cell { display: flex; flex-direction: column; gap: 8px; padding: 20px 18px; text-align: left; border-right: 1px solid rgba(255,255,255,0.08); border-bottom: 1px solid rgba(255,255,255,0.08); min-width: 0; }
.oz__cell-k { font-family: 'Rajdhani', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 4.8px; text-transform: uppercase; color: #67E8F9; }
.oz__cell-v { font-family: 'Archivo', sans-serif; font-size: 13.5px; line-height: 1.4; color: #fff; }
@media (max-width: 760px) { .oz__panel { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 420px) { .oz__panel { grid-template-columns: 1fr; } }

/* CTA — primary button (white bg, black text, sharp corners, Rajdhani label) */
.oz__cta { display: inline-flex; align-items: center; gap: 12px; margin-top: clamp(32px, 5vw, 52px); padding: 14px 24px; background: #fff; color: #000; border: none; cursor: pointer; font-family: 'Rajdhani', sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 3.2px; text-transform: uppercase; transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s ease; }
.oz__cta:hover { transform: translateY(-2px); box-shadow: 0 0 32px rgba(103,232,249,0.55); }
.oz__cta-arrow { display: inline-flex; color: #06B6D4; animation: oz-bob 1.8s ease-in-out infinite; }
@keyframes oz-bob { 50% { transform: translateY(4px); } }

/* editorial entrance (content in DOM for SEO; animates in — 900ms, guide easing) */
@keyframes oz-up { from { opacity: 0; transform: translateY(24px); filter: blur(6px); } to { opacity: 1; transform: translateY(0); filter: blur(0); } }
.oz-anim { animation: oz-up 0.9s cubic-bezier(0.4, 0, 0.2, 1) both; }

@media (prefers-reduced-motion: reduce) {
  .oz-anim, .oz__cta-arrow { animation: none; }
  .oz__cta { transition: none; }
}
</style>
