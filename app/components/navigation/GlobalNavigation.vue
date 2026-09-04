<script setup lang="ts">
// GLOBAL NAVIGATION — the single navigation system for the entire site.
// Rendered once by layouts/default.vue, so it is identical on every page and
// no page may reposition or restyle it.
//
// Three fixed floating elements (logo · MENU · Connect) stay pinned to the top
// and never resize or restyle — but the chrome intelligently auto-hides:
// scrolling down (past 80px) slides it up and fades it out; scrolling up (or
// returning near the top) brings it back. MENU opens a full-screen white
// overlay with large editorial links (staggered in, reverse-staggered out via
// a single GSAP timeline), socials at the bottom, and a Close capsule
// top-right. Reduced-motion falls back to a plain fade.
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { gsap } from '~~/lib/gsap'
import { primaryNav } from '~~/lib/navigation'

// Primary routes come from the single shared navigation source (lib/navigation.ts) —
// the same list the footer "Explore" column renders. Never redefine it here.
const links = primaryNav

// Social profiles (URLs + icon paths shared with the site footer).
const socials = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/svara-techfusion/', path: 'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z' },
  { name: 'GitHub', href: 'https://github.com/svaratechfusion-gif', path: 'M12 .3a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58l-.01-2.05c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.31-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.87.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.6-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22l-.01 3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .3z' },
  { name: 'Instagram', href: 'https://www.instagram.com/svaratechfusion/', path: 'M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.64.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85C2.28 3.93 3.8 2.38 7.05 2.23 8.32 2.17 8.7 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z' },
  { name: 'X', href: 'https://x.com/S_TechFusion', path: 'M18.24 2.25h3.31l-7.23 8.26 8.5 11.24H16.17l-5.21-6.82L4.99 21.75H1.68l7.73-8.84L1.25 2.25H8.08l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z' },
  { name: 'Facebook', href: 'https://www.facebook.com/svaratechfusion', path: 'M24 12.07C24 5.44 18.63.07 12 .07S0 5.44 0 12.07c0 5.99 4.39 10.95 10.13 11.85v-8.38H7.08v-3.47h3.05V9.43c0-3.01 1.79-4.67 4.53-4.67 1.31 0 2.69.24 2.69.24v2.95h-1.52c-1.49 0-1.96.93-1.96 1.87v2.25h3.33l-.53 3.47h-2.8v8.38C19.61 23.02 24 18.06 24 12.07z' },
]

// `pinned` opts out of the scroll auto-hide so the chrome stays permanently
// visible (used by the full-viewport /ecosystem experience). Default false =
// every other page keeps the intelligent auto-hide unchanged.
const props = defineProps<{ pinned?: boolean }>()

// ---- Notch theme ----
// The notch is a SOLID slab carved into the top edge, so it has to invert
// against whatever the page's ground is: a navy slab on light pages, a pale
// slab on the dark ones. Same per-route model the footer already uses
// (footer/Footer.vue DARK_FOOTER) — kept as its own list because the two do not
// always agree: /ecosystem is a dark-footer route historically but is now the
// site's one white page.
// Read off each route's ACTUAL declared ground, not from memory:
//   /            layouts/evolve.vue      #000
//   /products    layouts/scene.vue       #14223F
//   /technology  styles/technology-raycast.css  #040506
//   /architecture pages/architecture.vue #0a1730
//   /investors   pages/investors.vue     #0a1428
//   /blog        pages/blog.vue          #000
//   /about       styles/asme.css         #000
//   /divisions   styles/divisions-halftone.css --halftone-bg #04070F
//   /careers     styles/careers-harness.css    #070707
// Everything else (incl. /ecosystem, now the white Clarix page, and
// /contact · /industries) is a light ground.
const DARK_GROUND = new Set([
  '/', '/products', '/technology', '/architecture',
  '/investors', '/blog', '/about', '/divisions', '/contact', '/careers',
])
// This site routes with a trailing slash (`/technology` 301s to `/technology/`),
// so the raw path never matches a bare entry. Normalise before the lookup.
const isDarkGround = computed(() => {
  const path = route.path.length > 1 ? route.path.replace(/\/+$/, '') : route.path
  return DARK_GROUND.has(path)
})

// The logo sits ON the slab, so it inverts with the slab, not with the page.
const logoSrc = computed(() =>
  isDarkGround.value ? '/brand/logo/svara-logo-no-tagline.svg' : '/brand/logo/svara-logo-white.svg')

// ---- Wing geometry ----
// The detail that sells the notch: a concave fillet either side, so the slab
// reads as CARVED OUT of the top edge rather than stuck onto it. Same curve as
// the reference, top-oriented only (this nav never docks to the bottom).
const WING_LEFT = 'M 0 0 C 11.046 0 20 8.954 20 20 H 21 V -1 H 0 Z'
const WING_RIGHT = 'M 20 0 C 8.954 0 0 8.954 0 20 H -1 V -1 H 20 Z'

const open = ref(false)
const root = ref<HTMLElement | null>(null)
const overlay = ref<HTMLElement | null>(null)

let tl: gsap.core.Timeline | null = null
let reduced = false
const route = useRoute()

// ---- Intelligent auto-hide ----
// Scrolling down past REVEAL_ZONE hides the chrome; any upward scroll brings
// it back. Direction changes smaller than JITTER px are ignored so trackpad
// noise / rubber-banding never causes flicker. scrollY is sampled once per
// frame via rAF (passive listener, no per-pixel state updates).
const REVEAL_ZONE = 80 // px — always visible within this distance from the top
const JITTER = 8 // px — minimum travel before a direction change counts

const hidden = ref(false)
let anchorY = 0 // scroll position where the current direction started
let ticking = false

function updateHidden() {
  ticking = false
  const y = window.scrollY

  // Near the top: always visible, and re-anchor.
  if (y <= REVEAL_ZONE) {
    hidden.value = false
    anchorY = y
    return
  }

  const delta = y - anchorY
  if (Math.abs(delta) < JITTER) return // tiny movement — ignore

  hidden.value = delta > 0 // down → hide, up → show
  anchorY = y
}

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(updateHidden)
}

function lockScroll() {
  if (typeof document === 'undefined') return
  document.documentElement.style.overflow = 'hidden'
}
function unlockScroll() {
  if (typeof document === 'undefined') return
  document.documentElement.style.overflow = ''
}

function openMenu() {
  if (open.value) return
  open.value = true
  lockScroll()
  if (reduced || !tl) return
  tl.play()
}
function closeMenu() {
  if (!open.value) return
  if (reduced || !tl) {
    open.value = false
    unlockScroll()
    return
  }
  tl.reverse()
  // aria/inert flips immediately; scroll unlocks on reverse complete
  open.value = false
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) closeMenu()
}

onMounted(() => {
  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.addEventListener('keydown', onKey)
  // Pinned mode keeps the chrome always visible: skip the auto-hide scroll bus
  // entirely, so `hidden` stays false (bar never slides up, never goes inert).
  if (!props.pinned) window.addEventListener('scroll', onScroll, { passive: true })
  anchorY = window.scrollY

  if (reduced || !root.value || !overlay.value) return
  const q = gsap.utils.selector(root.value)
  tl = gsap.timeline({
    paused: true,
    onReverseComplete: () => { unlockScroll() },
  })
  tl.fromTo(overlay.value, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    .fromTo(q('.gnav__link'), { y: 46, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, stagger: 0.05, ease: 'power3.out' }, 0.08)
    .fromTo(q('.gnav__overlay-close, .gnav__socials'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0.2)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKey)
  window.removeEventListener('scroll', onScroll)
  unlockScroll()
  tl?.kill()
})

// Close on route change (covers link clicks and any programmatic nav).
watch(() => route.fullPath, () => { if (open.value) closeMenu() })
</script>

<template>
  <div ref="root" class="gnav" :class="{ 'is-dark': isDarkGround }">
    <!-- Fixed chrome — three slabs carved into the top edge.
         NOT `.gnav__pill`: styles/svara-controls.css and styles/svara-3d.css
         both force a chamfer clip-path and a bevel onto that class with
         `!important`, which would cut the notch shape apart. A separate class
         sidesteps the fight entirely instead of out-shouting it. -->
    <div class="gnav__bar" :class="{ 'is-hidden': hidden }" :inert="open || hidden">
      <!-- ≥1280px: three separate notches. Below that they merge into the one
           centred island below, which is what the reference does too. -->
      <NuxtLink to="/" class="gnav__notch gnav__notch--logo" aria-label="SVARA home">
        <img :src="logoSrc" alt="SVARA" class="gnav__logo-img" width="168" height="70">
        <svg class="gnav__wing gnav__wing--r" viewBox="0 0 20 20" aria-hidden="true"><path :d="WING_RIGHT" fill="currentColor" /></svg>
      </NuxtLink>

      <button
        type="button"
        class="gnav__notch gnav__notch--menu"
        :aria-expanded="open"
        aria-controls="global-menu"
        aria-label="Open menu"
        @click="openMenu"
      >
        <svg class="gnav__wing gnav__wing--l" viewBox="0 0 20 20" aria-hidden="true"><path :d="WING_LEFT" fill="currentColor" /></svg>
        <span class="gnav__menu-label">Menu</span>
        <span class="gnav__burger" aria-hidden="true"><i /><i /><i /></span>
        <svg class="gnav__wing gnav__wing--r" viewBox="0 0 20 20" aria-hidden="true"><path :d="WING_RIGHT" fill="currentColor" /></svg>
      </button>

      <NuxtLink to="/contact" class="gnav__notch gnav__notch--connect">
        <svg class="gnav__wing gnav__wing--l" viewBox="0 0 20 20" aria-hidden="true"><path :d="WING_LEFT" fill="currentColor" /></svg>
        <span>Connect</span>
      </NuxtLink>

      <!-- <1280px: one compact island carrying all three -->
      <div class="gnav__island">
        <svg class="gnav__wing gnav__wing--l" viewBox="0 0 20 20" aria-hidden="true"><path :d="WING_LEFT" fill="currentColor" /></svg>

        <NuxtLink to="/" class="gnav__island-logo" aria-label="SVARA home">
          <img :src="logoSrc" alt="SVARA" width="168" height="70">
        </NuxtLink>

        <button
          type="button"
          class="gnav__island-menu"
          :aria-expanded="open"
          aria-controls="global-menu"
          aria-label="Open menu"
          @click="openMenu"
        >
          <span class="gnav__menu-label">Menu</span>
          <span class="gnav__burger" aria-hidden="true"><i /><i /><i /></span>
        </button>

        <NuxtLink to="/contact" class="gnav__island-connect">Connect</NuxtLink>

        <svg class="gnav__wing gnav__wing--r" viewBox="0 0 20 20" aria-hidden="true"><path :d="WING_RIGHT" fill="currentColor" /></svg>
      </div>
    </div>

    <!-- Full-screen overlay -->
    <div
      id="global-menu"
      ref="overlay"
      class="gnav__overlay"
      :class="{ 'is-open': open }"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      :aria-hidden="!open"
      :inert="!open"
    >
      <NuxtLink to="/" class="gnav__overlay-logo" aria-label="SVARA home" @click="closeMenu">
        <img src="/brand/logo/svara-logo-no-tagline.svg" alt="SVARA" width="150" height="35" >
      </NuxtLink>

      <button
        type="button"
        class="gnav__pill gnav__overlay-close"
        aria-label="Close menu"
        @click="closeMenu"
      >Close</button>

      <nav class="gnav__nav" aria-label="Primary">
        <ul class="gnav__list">
          <li v-for="link in links" :key="link.to">
            <NuxtLink :to="link.to" class="gnav__link" @click="closeMenu">
              <span class="gnav__link-text">{{ link.label }}</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="gnav__socials">
        <a
          v-for="s in socials" :key="s.name"
          :href="s.href" target="_blank" rel="noopener noreferrer"
          class="gnav__social" :aria-label="s.name"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path :d="s.path" /></svg>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gnav {
  --gnav-top: 32px;
  --gnav-side: 48px;
}

/* ---- Notch chrome ----
   Three solid slabs hanging off the top edge, each finished with a concave
   fillet ("wing") so the edge flows into the slab and it reads as CARVED OUT of
   the page rather than floating on it. The wings are the whole trick: without
   them you just have three rectangles.

   Only the OUTER sides get wings. The reference also carries corner fillets,
   because its content sits inside a rounded inset frame; this site's pages run
   full-bleed to the viewport, so the logo and Connect slabs are flush to their
   edges and a corner fillet there would fill nothing. */
.gnav__bar {
  position: fixed;
  inset: 0 0 auto 0;
  height: 0;
  z-index: 100;
  pointer-events: none;
}
.gnav__bar > * { pointer-events: auto; }
.gnav__bar.is-hidden > * { pointer-events: none; }

/* Auto-hide: the slabs retract UP into the edge they were cut from. */
.gnav__bar.is-hidden .gnav__notch,
.gnav__bar.is-hidden .gnav__island { opacity: 0; transform: translateY(-110%); }
.gnav__bar.is-hidden .gnav__notch--menu,
.gnav__bar.is-hidden .gnav__island { transform: translateX(-50%) translateY(-110%); }
.gnav__bar.is-hidden .gnav__notch--logo { transform: translateY(-110%); }

/* The slab material. Inverts against the page ground so it always reads. */
.gnav {
  --gnav-notch-bg: #0d1b3e;
  --gnav-notch-ink: #f7f5f1;
  --gnav-notch-dim: rgba(247, 245, 241, 0.58);
  --gnav-notch-hover: rgba(247, 245, 241, 0.10);
  --gnav-radius: 24px;
  --gnav-wing: 16px;
}
.gnav.is-dark {
  --gnav-notch-bg: #eef2f8;
  --gnav-notch-ink: #0d1b3e;
  --gnav-notch-dim: rgba(13, 27, 62, 0.55);
  --gnav-notch-hover: rgba(13, 27, 62, 0.08);
}

.gnav__notch,
.gnav__island {
  position: fixed;
  top: 0;
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  /* `color` carries the slab colour so the wings can just use currentColor. */
  color: var(--gnav-notch-bg);
  background: var(--gnav-notch-bg);
  text-decoration: none;
  cursor: pointer;
  border: 0;
  font-family: var(--font-sans);
  transition: opacity 300ms var(--ease-smooth), transform 300ms var(--ease-smooth),
              background 250ms var(--ease-smooth);
}
.gnav__notch:focus-visible,
.gnav__island :focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: -4px;
}

/* The concave fillets. `overflow: visible` matters — the paths deliberately
   draw a pixel outside the 20×20 box so no hairline seam shows at the join. */
.gnav__wing {
  position: absolute;
  top: 0;
  width: var(--gnav-wing);
  height: var(--gnav-wing);
  overflow: visible;
  pointer-events: none;
  shape-rendering: geometricPrecision;
}
.gnav__wing--l { right: 100%; }
.gnav__wing--r { left: 100%; }

/* ---- 1 · Logo slab (flush left) ---- */
.gnav__notch--logo {
  left: 0;
  height: 60px;
  padding: 0 22px 0 var(--gnav-side);
  border-bottom-right-radius: var(--gnav-radius);
}
.gnav__logo-img { display: block; height: 34px; width: auto; object-fit: contain; }

/* ---- 2 · Menu slab (centred, the tallest — it is the primary control) ---- */
.gnav__notch--menu {
  left: 50%;
  transform: translateX(-50%);
  height: 54px;
  gap: 12px;
  padding: 0 28px;
  border-bottom-left-radius: var(--gnav-radius);
  border-bottom-right-radius: var(--gnav-radius);
  color: var(--gnav-notch-bg);
  font-size: 14px;
  font-weight: var(--weight-semibold);
  letter-spacing: 0.01em;
}
.gnav__notch--menu .gnav__menu-label,
.gnav__notch--menu .gnav__burger { color: var(--gnav-notch-ink); }
.gnav__notch--menu:hover { background: color-mix(in srgb, var(--gnav-notch-bg) 92%, var(--gnav-notch-ink)); }

/* ---- 3 · Connect slab (flush right) ---- */
.gnav__notch--connect {
  right: 0;
  height: 60px;
  padding: 0 var(--gnav-side) 0 22px;
  border-bottom-left-radius: var(--gnav-radius);
  font-size: 14px;
  font-weight: var(--weight-semibold);
  letter-spacing: 0.01em;
}
.gnav__notch--connect span { color: var(--gnav-notch-ink); }
.gnav__notch--connect:hover { background: color-mix(in srgb, var(--gnav-notch-bg) 88%, var(--color-accent)); }

.gnav__menu-label { line-height: 1; }
.gnav__burger {
  display: inline-flex;
  flex-direction: column;
  gap: 3.5px;
  width: 16px;
}
.gnav__burger i {
  display: block;
  height: 1.6px;
  background: currentColor;
  border-radius: 2px;
}

/* ---- Compact island (<1280px) ----
   One slab carrying all three, exactly as the reference collapses its three
   notches into a single centred island. No dropdown here: Menu already opens
   the full-screen overlay, so a second disclosure would be a duplicate. */
.gnav__island {
  left: 50%;
  transform: translateX(-50%);
  height: 54px;
  gap: 16px;
  padding: 0 20px;
  border-bottom-left-radius: var(--gnav-radius);
  border-bottom-right-radius: var(--gnav-radius);
}
.gnav__island-logo { display: inline-flex; align-items: center; }
.gnav__island-logo img { display: block; height: 26px; width: auto; }
.gnav__island-menu,
.gnav__island-connect {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 34px;
  padding: 0 14px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--gnav-notch-ink);
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: var(--weight-semibold);
  text-decoration: none;
  cursor: pointer;
  transition: background 200ms var(--ease-smooth);
}
.gnav__island-menu:hover,
.gnav__island-connect:hover { background: var(--gnav-notch-hover); }

/* Which set is live. The three-slab layout is the desktop composition; below
   1280 it would crowd, so the island takes over. */
.gnav__island { display: none; }
@media (max-width: 1279px) {
  .gnav__notch { display: none; }
  .gnav__island { display: inline-flex; }
}

/* ---- Full-screen overlay ---- */
.gnav__overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* top clears nothing (pills are hidden); extra bottom padding keeps the
     vertically-centred list clear of the absolutely-positioned social row */
  padding: clamp(48px, 7vh, 80px) 24px clamp(88px, 13vh, 128px);
  box-sizing: border-box;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}
.gnav__overlay.is-open { visibility: visible; pointer-events: auto; }

.gnav__overlay-close {
  position: fixed;
  top: var(--gnav-top);
  right: var(--gnav-side);
}
.gnav__overlay-close:hover { background: var(--color-accent); color: #fff; border-color: var(--color-accent); transform: scale(1.02); }

/* Official logo inside the overlay — top-left, matching the nav position */
.gnav__overlay-logo {
  position: fixed;
  top: var(--gnav-top);
  left: var(--gnav-side);
  display: inline-flex;
  align-items: center;
  height: 52px;
}
.gnav__overlay-logo img { display: block; height: 30px; width: auto; }

.gnav__nav { width: 100%; }
.gnav__list {
  list-style: none;
  margin: 0 auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* gap scales with height so all 11 links + socials always fit one viewport */
  gap: clamp(1px, 0.5vh, 12px);
  text-align: center;
}
.gnav__link {
  position: relative;
  display: inline-block;
  padding: 2px 4px;
  font-family: var(--font-sans);
  /* height-aware so the full list stays inside the viewport and centered;
     reaches the editorial 60–72px range on tall screens, shrinks on short ones */
  font-size: clamp(30px, min(6vw, 5.6vh), 68px);
  font-weight: var(--weight-bold);
  letter-spacing: -0.03em;
  line-height: 1.06;
  color: #0d1b3e;
  text-decoration: none;
  transition: color 260ms var(--ease-smooth), transform 260ms var(--ease-smooth);
}
/* underline animation */
.gnav__link::after {
  content: '';
  position: absolute;
  left: 4px;
  right: 4px;
  bottom: 2px;
  height: 2px;
  background: var(--color-accent);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 300ms var(--ease-smooth);
}
.gnav__link:hover { color: var(--color-accent); transform: translateX(10px); }
.gnav__link:hover::after { transform: scaleX(1); }
.gnav__link:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 4px; border-radius: 4px; }
.gnav__link.router-link-active { color: var(--color-accent); }

.gnav__socials {
  position: absolute;
  bottom: clamp(28px, 5vh, 56px);
  left: 0; right: 0;
  display: flex;
  justify-content: center;
  gap: 22px;
}
.gnav__social {
  color: #64748b;
  transition: color 200ms var(--ease-smooth), transform 200ms var(--ease-smooth);
  line-height: 0;
}
.gnav__social:hover { color: var(--color-accent); transform: translateY(-2px); }
.gnav__social:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 4px; border-radius: 4px; }

/* Reduced-motion: plain fade instead of the GSAP stagger */
@media (prefers-reduced-motion: reduce) {
  .gnav__overlay { transition: opacity 200ms linear; }
  .gnav__overlay.is-open { opacity: 1; }
  .gnav__notch, .gnav__island, .gnav__pill, .gnav__link, .gnav__social { transition: background 200ms linear, color 200ms linear, opacity 200ms linear; }
  .gnav__overlay-close:hover { transform: none; }
  .gnav__link:hover { transform: none; }
  /* Auto-hide degrades to a plain fade — no vertical travel */
  .gnav__bar.is-hidden .gnav__notch--logo { transform: none; }
  .gnav__bar.is-hidden .gnav__notch--menu,
  .gnav__bar.is-hidden .gnav__island { transform: translateX(-50%); }
}

/* ---- Responsive ---- */
@media (max-width: 1024px) {
  .gnav { --gnav-side: 32px; }
}
@media (max-width: 640px) {
  .gnav { --gnav-top: 20px; --gnav-side: 18px; --gnav-radius: 18px; --gnav-wing: 10px; }
  .gnav__island { height: 48px; gap: 8px; padding: 0 14px; }
  .gnav__island-logo img { height: 22px; }
  .gnav__island-menu, .gnav__island-connect { height: 30px; padding: 0 10px; font-size: 12px; gap: 8px; }
  .gnav__list { gap: 6px; }
}
</style>
