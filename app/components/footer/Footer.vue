<script setup lang="ts">
// GLOBAL INTELLIGENCE NETWORK footer — the COBE globe as the calm, editorial
// centerpiece (Apple / Stripe / Vercel / Linear register). cobe stays the
// rendering engine; the config is tuned so it reads as a real light-gray
// Earth (visible continents, spherical depth) rather than a white blob on a
// white page: a light-gray base gives the sphere a silhouette and lets the
// continents contrast. Slow idle rotation + drag + smooth inertia. No
// labels, pills, or floating dots around the globe.
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'
import { useConsentConsole } from '~/composables/useConsent'
import { useIntelligenceEngine } from '~/composables/useIntelligenceEngine'
import { primaryNav } from '~~/lib/navigation'

// PAGE-AWARE THEME — the footer is transparent and adapts to whatever sits BEHIND it
// (not to the page's hero). DARK where a fixed dark backdrop shows through the footer:
// the Home/Ecosystem WebGL worlds and the Investors/Architecture/Blog fixed dark video.
// LIGHT everywhere else — Technology & About are page-scoped dark but the footer region
// is the light ground; Products (white scene), Divisions/Industries/Contact/Careers
// (bright video) and all default pages are light. Only `--footer-*` vars + the logo
// asset change; structure/layout are untouched.
const route = useRoute()
const consentConsole = useConsentConsole()
// /ecosystem is NOT here any more — it is the site's white Clarix page now.
const DARK_FOOTER = new Set(['/', '/investors', '/architecture', '/blog', '/divisions', '/contact'])
// The site routes with a trailing slash (`/divisions` 301s to `/divisions/`),
// so the raw path does not always match a bare entry. Normalise first.
const footerTheme = computed(() => {
  const path = route.path.length > 1 ? route.path.replace(/\/+$/, '') : route.path
  return DARK_FOOTER.has(path) ? 'dark' : 'light'
})
// Approved SVARA assets only — the official white lockup on dark, the full lockup on
// light. Never recoloured / never a CSS-faked white.
const logoSrc = computed(() =>
  footerTheme.value === 'dark' ? '/brand/logo/svara-logo-white.svg' : '/brand/logo/svara-logo-full.svg')

// SVARA blue markers only — subtle, ON the globe, no labels.
const MARKER_BLUE: [number, number, number] = [74 / 255, 144 / 255, 255 / 255]
const GLOBE_CONFIG = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.28,
  dark: 0,
  // depth + a clearly-visible light-gray Earth (fixes the white-blob look)
  diffuse: 1.0,
  mapSamples: 22000,
  mapBrightness: 1.35,
  mapBaseBrightness: 0.06,
  // deeper light-gray so the spin reads clearly against the white page
  baseColor: [0.76, 0.80, 0.86] as [number, number, number],
  markerColor: MARKER_BLUE,
  glowColor: [0.82, 0.88, 1] as [number, number, number],
  // clean globe — no markers
  markers: [] as { location: [number, number], size: number }[],
}

const root = ref<HTMLElement>()
const canvasRef = ref<HTMLCanvasElement>()

// ---- rotation: slow idle + drag + inertia ----
let phi = 0
let width = 0
let dragging = false
let lastX = 0
let velocity = 0
let reduced = false
let destroyGlobe: (() => void) | null = null
const AUTO = 0.008        // mid-speed idle spin — clearly visible
const DRAG_SENS = 0.005   // rad per px dragged
const DECAY = 0.93        // inertia decay after release

function onResize() { if (canvasRef.value) width = canvasRef.value.offsetWidth }
function setCursor(v: string) { if (canvasRef.value) canvasRef.value.style.cursor = v }

function onDown(clientX: number) { dragging = true; lastX = clientX; velocity = 0; setCursor('grabbing') }
function onMove(clientX: number) {
  if (!dragging) return
  const d = (clientX - lastX) * DRAG_SENS
  phi += d
  velocity = d
  lastX = clientX
}
function onUp() { dragging = false; setCursor('grab') } // velocity carries → inertia

// ---- Helios ambient field: thin the cloud while the footer is in view ----
const engine = useIntelligenceEngine()
let observer: IntersectionObserver | null = null

onMounted(async () => {
  if (root.value) {
    observer = new IntersectionObserver(
      ([entry]) => engine.value?.setDensity(entry?.isIntersecting ? 0.3 : 1),
      { threshold: 0.15 },
    )
    observer.observe(root.value)
  }
  if (!canvasRef.value) return
  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const { default: createGlobe } = await import('cobe')
  window.addEventListener('resize', onResize)
  onResize()

  const globe = createGlobe(canvasRef.value, {
    ...GLOBE_CONFIG,
    width: width * 2,
    height: width * 2,
    onRender: (state: Record<string, number>) => {
      if (!dragging) {
        if (!reduced) phi += AUTO
        phi += velocity
        velocity *= DECAY
        if (Math.abs(velocity) < 1e-4) velocity = 0
      }
      state.phi = phi
      state.width = width * 2
      state.height = width * 2
    },
  })
  destroyGlobe = () => globe.destroy()
  setTimeout(() => { if (canvasRef.value) canvasRef.value.style.opacity = '1' })
})

onBeforeUnmount(() => {
  destroyGlobe?.()
  window.removeEventListener('resize', onResize)
  observer?.disconnect()
  engine.value?.setDensity(1)
})

// ---- footer chrome ----
// "Explore" renders from the shared primaryNav (lib/navigation.ts) — the exact
// same source the Global Menu uses. Do not maintain a second list here.
const company = [
  { label: 'About', to: '/about' },
  { label: 'Privacy Policy', to: '/legal/privacy' },
  { label: 'Terms & Conditions', to: '/legal/terms' },
  { label: 'Cookie Policy', to: '/legal/cookies' },
]
// brand marks (Lucide dropped brand icons, so inline paths)
const social = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/svaratechfusion', path: 'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z' },
  { name: 'GitHub', href: 'https://github.com/svaratechfusion', path: 'M12 .3a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58l-.01-2.05c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.31-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.87.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.6-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22l-.01 3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .3z' },
  { name: 'Discord', href: 'https://discord.gg/svaratechfusion', path: 'M20.32 4.37A19.8 19.8 0 0 0 15.43 2.86a.07.07 0 0 0-.08.04c-.21.37-.44.86-.61 1.25a18.27 18.27 0 0 0-5.48 0 12.6 12.6 0 0 0-.62-1.25.08.08 0 0 0-.08-.04A19.74 19.74 0 0 0 3.68 4.37a.07.07 0 0 0-.03.03C.53 9.05-.32 13.58.1 18.06a.08.08 0 0 0 .03.05 19.9 19.9 0 0 0 6 3.03.08.08 0 0 0 .08-.03c.46-.63.87-1.3 1.23-2a.08.08 0 0 0-.04-.1 13.1 13.1 0 0 1-1.87-.9.08.08 0 0 1-.01-.12l.37-.3a.07.07 0 0 1 .08-.01c3.93 1.8 8.18 1.8 12.06 0a.07.07 0 0 1 .08.01l.37.3a.08.08 0 0 1 0 .12c-.6.35-1.22.65-1.87.9a.08.08 0 0 0-.04.1c.36.7.78 1.36 1.23 2a.08.08 0 0 0 .08.03 19.84 19.84 0 0 0 6-3.03.08.08 0 0 0 .03-.05c.5-5.18-.84-9.67-3.55-13.66a.06.06 0 0 0-.03-.03zM8.02 15.33c-1.18 0-2.16-1.08-2.16-2.42s.96-2.42 2.16-2.42c1.21 0 2.18 1.1 2.16 2.42 0 1.34-.96 2.42-2.16 2.42zm7.97 0c-1.18 0-2.15-1.08-2.15-2.42s.95-2.42 2.15-2.42c1.21 0 2.18 1.1 2.16 2.42 0 1.34-.95 2.42-2.16 2.42z' },
  { name: 'Instagram', href: 'https://instagram.com/svaratechfusion', path: 'M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.64.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85C2.28 3.93 3.8 2.38 7.05 2.23 8.32 2.17 8.7 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z' },
  { name: 'X', href: 'https://x.com/svaratechfusion', path: 'M18.24 2.25h3.31l-7.23 8.26 8.5 11.24H16.17l-5.21-6.82L4.99 21.75H1.68l7.73-8.84L1.25 2.25H8.08l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z' },
  { name: 'Facebook', href: 'https://facebook.com/svaratechfusion', path: 'M24 12.07C24 5.44 18.63.07 12 .07S0 5.44 0 12.07c0 5.99 4.39 10.95 10.13 11.85v-8.38H7.08v-3.47h3.05V9.43c0-3.01 1.79-4.67 4.53-4.67 1.31 0 2.69.24 2.69.24v2.95h-1.52c-1.49 0-1.96.93-1.96 1.87v2.25h3.33l-.53 3.47h-2.8v8.38C19.61 23.02 24 18.06 24 12.07z' },
]
const year = new Date().getFullYear()
</script>

<template>
  <footer ref="root" class="gf" :data-theme="footerTheme">
    <div class="gf__inner">
      <p class="gf__eyebrow">Global Intelligence Network</p>

      <!-- globe centerpiece -->
      <div class="gf__stage">
        <div class="gf__glow" aria-hidden="true" />
        <div class="gf__globe">
          <canvas
            ref="canvasRef"
            class="gf__canvas"
            aria-label="SVARA global network"
            @pointerdown="(e) => onDown(e.clientX)"
            @pointerup="onUp"
            @pointerleave="onUp"
            @mousemove="(e) => onMove(e.clientX)"
            @touchstart.passive="(e) => e.touches[0] && onDown(e.touches[0].clientX)"
            @touchmove.passive="(e) => e.touches[0] && onMove(e.touches[0].clientX)"
            @touchend="onUp"
          />
        </div>
      </div>

      <!-- tagline -->
      <h2 class="gf__title">Build Intelligence Without Borders</h2>
      <p class="gf__lede">SVARA engineers AI-native enterprise infrastructure that transforms fragmented systems into connected intelligence.</p>

      <!-- navigation -->
      <div class="gf__nav">
        <nav class="gf__col" aria-label="Explore">
          <h3 class="gf__col-title">Explore</h3>
          <ul class="gf__list">
            <li v-for="l in primaryNav" :key="l.to"><NuxtLink :to="l.to" class="gf__link gf__link--nav">{{ l.label }}</NuxtLink></li>
          </ul>
        </nav>
        <nav class="gf__col" aria-label="Company">
          <h3 class="gf__col-title">Company</h3>
          <ul class="gf__list">
            <li v-for="l in company" :key="l.label"><NuxtLink :to="l.to" class="gf__link">{{ l.label }}</NuxtLink></li>
            <!-- Withdrawal has to be as easy as giving consent, which means a
                 persistent entry point on every page — not only inside the
                 one-time banner. -->
            <li>
              <button type="button" class="gf__link gf__link--btn" @click="consentConsole = true">
                Cookie preferences
              </button>
            </li>
          </ul>
        </nav>
        <nav class="gf__col" aria-label="Connect">
          <h3 class="gf__col-title">Connect</h3>
          <ul class="gf__list">
            <li v-for="s in social" :key="s.name">
              <a :href="s.href" class="gf__link gf__social" target="_blank" rel="noopener" :aria-label="s.name">
                <svg class="gf__social-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path :d="s.path" /></svg>
                {{ s.name }}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- bottom bar -->
    <div class="gf__base">
      <NuxtLink to="/" class="gf__logo-link" aria-label="SVARA home">
        <img :src="logoSrc" alt="SVARA TechFusion" class="gf__logo" width="383" height="160" >
      </NuxtLink>
      <p class="gf__copy">© {{ year }} SVARA TechFusion Private Limited.</p>
      <p class="gf__copy gf__copy--muted">Engineering Intelligence For The Future Of Enterprise.</p>
    </div>
  </footer>
</template>

<style scoped>
/* a control that must read as a peer of the legal links beside it */
.gf__link--btn { border: 0; background: none; padding: 0; font: inherit; cursor: pointer; text-align: left; }
.gf {
  /* TRANSPARENT — the page's own background / atmosphere shows through, so the footer
     reads as part of the page instead of a separate colour block. No opaque surface. */
  background: transparent;
  border-top: 1px solid var(--footer-border);
  padding-block: var(--space-32) var(--space-12);

  /* Page-aware theme tokens — default = LIGHT (navy ink, subtle navy hairlines).
     The [data-theme="dark"] block below flips them for cinematic/dark backdrops. */
  --footer-text: #14223f;
  --footer-muted: rgba(20, 34, 63, 0.58);
  --footer-faint: rgba(20, 34, 63, 0.42);
  --footer-border: rgba(20, 34, 63, 0.12);
  --footer-accent: #3f6fb0;
}

/* DARK / cinematic / blue pages — light ink, subtle white-blue hairlines, brighter
   blue accent. Applied where a fixed dark backdrop shows through the transparent footer. */
.gf[data-theme="dark"] {
  --footer-text: #eef2f8;
  --footer-muted: rgba(228, 233, 242, 0.62);
  --footer-faint: rgba(228, 233, 242, 0.45);
  --footer-border: rgba(228, 233, 242, 0.16);
  --footer-accent: #6ba6ff;
}
.gf__inner {
  max-width: 1400px;
  margin-inline: auto;
  padding-inline: var(--container-pad);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
}

.gf__eyebrow {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--type-label);
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--footer-accent);
}

/* globe */
.gf__stage {
  position: relative;
  margin-top: var(--space-16);
  display: flex; align-items: center; justify-content: center;
}
.gf__glow {
  position: absolute;
  left: 50%; top: 50%;
  width: 120%; height: 120%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  background: radial-gradient(circle at 50% 50%,
    rgba(74, 144, 255, 0.07) 0%, rgba(74, 144, 255, 0.03) 38%, rgba(74, 144, 255, 0) 60%);
}
.gf__globe {
  position: relative;
  width: 680px; height: 680px;
  max-width: 82vw; max-height: 82vw;
}
.gf__canvas {
  width: 100%; height: 100%;
  opacity: 0;
  transition: opacity 0.6s var(--ease-smooth);
  cursor: grab;
  touch-action: none;
}

/* tagline */
.gf__title {
  margin: calc(var(--space-8) * -1) 0 0;
  font-size: clamp(28px, 3.4vw, 44px);
  font-weight: var(--weight-bold);
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: var(--footer-text);
}
.gf__lede {
  margin: var(--space-6) auto 0;
  max-width: 700px;
  font-size: var(--type-body);
  line-height: var(--leading-body);
  color: var(--footer-muted);
}

/* navigation */
.gf__nav {
  margin-top: var(--space-24);
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--gap-section);
  text-align: left;
}
.gf__col-title {
  margin: 0 0 var(--space-6);
  font-family: var(--font-mono); font-size: var(--type-label); font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--footer-muted);
}
.gf__list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--space-4); }
.gf__link {
  position: relative;
  display: inline-flex; align-items: center; gap: 9px;
  font-size: var(--type-small); color: var(--footer-text); text-decoration: none;
  transition: color 250ms var(--ease-smooth);
}
/* links: underline fade */
.gf__link::after {
  content: ""; position: absolute; left: 0; right: 0; bottom: -2px; height: 1px;
  background: var(--footer-accent);
  transform: scaleX(0); transform-origin: left;
  transition: transform 250ms var(--ease-smooth);
}
.gf__link:hover { color: var(--footer-accent); }
.gf__link:hover::after { transform: scaleX(1); }
.gf__link:focus-visible { outline: 2px solid var(--footer-accent); outline-offset: 3px; border-radius: 2px; }

/* Explore links mirror the Global Menu exactly: accent colour on hover,
   horizontal slide, underline reveal, and accent highlight for the active page. */
.gf__link--nav {
  transition: color 260ms var(--ease-smooth), transform 260ms var(--ease-smooth);
}
.gf__link--nav::after { transition: transform 300ms var(--ease-smooth); }
.gf__link--nav:hover { color: var(--footer-accent); transform: translateX(10px); }
.gf__link--nav.router-link-active { color: var(--footer-accent); }
/* social icon+label: subtle scale on hover, no underline */
.gf__social { transition: color 250ms var(--ease-smooth), transform 250ms var(--ease-smooth); transform-origin: left center; }
.gf__social::after { display: none; }
.gf__social:hover { transform: scale(1.05); }
.gf__social-icon { color: var(--footer-faint); flex-shrink: 0; transition: color 250ms var(--ease-smooth); }
.gf__social:hover .gf__social-icon { color: var(--footer-accent); }

/* bottom bar */
.gf__base {
  max-width: 1400px;
  margin: var(--space-24) auto 0;
  padding: var(--space-8) var(--container-pad) 0;
  border-top: 1px solid var(--footer-border);
  box-sizing: border-box;
  display: flex; flex-direction: column; gap: 2px; align-items: center;
  text-align: center;
}
.gf__logo-link { display: flex; justify-content: center; margin: var(--space-24) 0 var(--space-20); }
.gf__logo { display: block; height: 160px; width: auto; max-width: min(600px, 90vw); object-fit: contain; }
.gf__copy { margin: 0; font-size: var(--type-caption); color: var(--footer-muted); }
.gf__copy--muted { color: var(--footer-faint); }

@media (max-width: 1024px) {
  .gf__globe { width: 500px; height: 500px; }
}
@media (max-width: 720px) {
  .gf__nav { grid-template-columns: 1fr; gap: var(--space-12); justify-items: center; text-align: center; }
  .gf__link { justify-content: center; }
}
@media (max-width: 560px) {
  .gf__globe { width: 320px; height: 320px; max-width: 86vw; max-height: 86vw; }
}
</style>
