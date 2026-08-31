<script setup lang="ts">
// CAREERS · HERO — the "Mainframe" cinematic design language applied as a VISUAL
// SYSTEM only: blurred intro label, typewriter line, action-pill row with a
// copy-to-clipboard email pill. Helvetica Now Display typography. All copy + CTAs
// are SVARA's own (from the Careers page). No in-hero navbar / no Mainframe branding
// (the global site header is the only nav). The hero is TRANSPARENT — the "Mainframe"
// video now lives as a FIXED full-page background in careers.vue, so every section
// flows up over it (homepage/divisions/industries model).
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useTypewriter } from '~/composables/useTypewriter'
import { CONTACT_CHANNELS } from '~~/lib/content/contact'

// existing Careers page hero copy (verbatim)
const TYPE_TEXT =
  "We're building the connected system of sensing, reasoning, prediction and action for enterprise operations — and we're looking for people who want to build it at the intersection of AI, hardware, and the real world."

const EMAIL = CONTACT_CHANNELS.email // the existing SVARA contact address

const { displayed, done } = useTypewriter(TYPE_TEXT, 38, 600)

// pills fade in 400ms after load — independent of the typewriter
const pillsVisible = ref(false)
const copied = ref(false)
let pillTimer: ReturnType<typeof setTimeout> | null = null
let copyTimer: ReturnType<typeof setTimeout> | null = null

async function copyEmail(): Promise<void> {
  try {
    await navigator.clipboard.writeText(EMAIL)
    copied.value = true
    if (copyTimer) clearTimeout(copyTimer)
    copyTimer = setTimeout(() => { copied.value = false }, 1600)
  } catch { /* clipboard unavailable — no-op */ }
}

// Helvetica Now Display (heading) + Regular (body) — the reference's typography.
useHead({
  link: [
    { rel: 'preconnect', href: 'https://db.onlinewebfonts.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://db.onlinewebfonts.com/c/5ac3fe7c6abd2f62067f266d89671492?family=HelveticaNowDisplay-Medium' },
    { rel: 'stylesheet', href: 'https://db.onlinewebfonts.com/c/1aa3377e489837a26d019bba501e779d?family=HelveticaNowDisplayW01-Rg' },
  ],
})

onMounted(() => {
  pillTimer = setTimeout(() => { pillsVisible.value = true }, 400)
})

onBeforeUnmount(() => {
  if (pillTimer) clearTimeout(pillTimer)
  if (copyTimer) clearTimeout(copyTimer)
})
</script>

<template>
  <section class="mf">
    <!-- transparent over the fixed page video (careers.vue) — no in-hero video -->
    <div class="mf__content">
      <!-- blurred intro label (h1 for SEO — the real page heading) -->
      <h1 class="mf__intro">
        Careers at SVARA,<br>Build the intelligence layer.
      </h1>

      <!-- typewriter line -->
      <p class="mf__type">
        <span>{{ displayed }}</span><span v-if="!done" class="mf__cursor" aria-hidden="true" />
      </p>

      <!-- action pills — fade up 400ms after load -->
      <div class="mf__pills" :class="{ 'is-in': pillsVisible }">
        <a href="#roles" class="mf__pill">See where you fit</a>
        <NuxtLink to="/contact" class="mf__pill">Join the talent network</NuxtLink>
        <NuxtLink to="/contact" class="mf__pill">Introduce yourself</NuxtLink>
        <NuxtLink to="/about" class="mf__pill">About SVARA</NuxtLink>
        <button type="button" class="mf__pill mf__pill--email" @click="copyEmail">
          <span v-if="!copied">Reach us: <span class="mf__email">{{ EMAIL }}</span></span>
          <span v-else>Copied to clipboard</span>
          <svg class="mf__copy" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <rect x="3.4" y="3.4" width="6.1" height="6.1" rx="1.2" stroke="currentColor" stroke-width="1.1" />
            <path d="M8.2 2.5H3.2C2.54 2.5 2 3.04 2 3.7v5" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.mf {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: calc(var(--nav-height, 80px) + 12px) clamp(20px, 4vw, 40px) 48px;
  box-sizing: border-box;
  /* Helvetica Now (reference typography), scoped locally */
  --mf-heading: 'HelveticaNowDisplay-Medium', 'Helvetica Neue', Arial, sans-serif;
  --mf-body: 'HelveticaNowDisplayW01-Rg', 'Helvetica Neue', Arial, sans-serif;
  font-family: var(--mf-body);
  color: var(--ink-primary);
  background: transparent; /* the fixed page video (careers.vue) shows through */
}
@media (min-width: 768px) {
  .mf { justify-content: center; padding-bottom: 0; }
}

.mf__content { position: relative; z-index: 1; width: 100%; max-width: 36rem; }

/* 1 · blurred intro label */
.mf__intro {
  margin: 0 0 22px;
  font-family: var(--mf-body);
  font-weight: 400;
  font-size: clamp(18px, 4vw, 26px);
  line-height: 1.3;
  letter-spacing: normal;
  color: var(--ink-primary);
  filter: blur(4px);
  user-select: none;
  pointer-events: none;
}

/* 2 · typewriter line */
.mf__type {
  margin: 0 0 22px;
  min-height: 54px;
  font-family: var(--mf-body);
  font-weight: 400;
  font-size: clamp(18px, 4vw, 26px);
  line-height: 1.35;
  color: var(--ink-primary);
}
.mf__cursor {
  display: inline-block;
  width: 2px;
  height: 1.1em;
  margin-left: 2px;
  background: var(--ink-primary);
  vertical-align: middle;
  animation: mf-blink 1s step-end infinite;
}
@keyframes mf-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

/* 3 · action pills */
.mf__pills {
  display: flex;
  flex-wrap: wrap;
  row-gap: 4px;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.mf__pills.is-in { opacity: 1; transform: none; }

.mf__pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  margin: 0 0.2em 0.4em;
  padding: 0.3em 1.1em;
  border-radius: 999px;
  font-family: var(--mf-body);
  font-size: 13px;
  color: var(--ink-primary);
  background: #fff;
  border: 1px solid rgba(20, 34, 63, 0.1);
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
.mf__pill:hover { background: var(--ink-primary); color: #fff; border-color: var(--ink-primary); }

.mf__pill--email {
  gap: 8px;
  color: #fff;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.85);
}
.mf__pill--email:hover { background: #fff; color: var(--ink-primary); border-color: #fff; }
.mf__email { text-decoration: underline; text-underline-offset: 1px; }
.mf__copy { flex-shrink: 0; }

@media (min-width: 640px) {
  .mf__pill { font-size: 15px; padding: 0.3em 1.25em; margin: 0 0.2em 0.4em; }
  .mf__pill--email { gap: 12px; }
}

@media (prefers-reduced-motion: reduce) {
  .mf__cursor { animation: none; }
  .mf__pills { transition: none; opacity: 1; transform: none; }
}
</style>
