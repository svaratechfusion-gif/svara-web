<script setup lang="ts">
// SECTION 05 — "Designed For Modern Industries."
// Alternating layout: copy left, interactive visual right (mirrors Section
// 01/03). The visual is a rotating globe — industry markers orbit a shaded
// sphere; depth (scale/opacity/occlusion) is computed per frame from each
// marker's longitude, so markers "light up" as they rotate to the front and
// hide behind the sphere on the far side. Hovering/focusing a marker pauses
// rotation and surfaces its name. Names verbatim from the Content Bible;
// industry-specific content lives on the Industries page.
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from '~~/lib/gsap'
import { homeSection05, homeIndustries } from '~~/lib/content/home'
import SectionLink from '~/components/ui/SectionLink.vue'
import { useIntelligenceTargets } from '~/composables/useIntelligenceTargets'

const root = ref<HTMLElement>()

// section gravity: particles gather at the illuminated (front-facing)
// markers — "particles illuminate locations"
useIntelligenceTargets(root, () =>
  Array.from(root.value?.querySelectorAll<HTMLElement>('.globe__marker') ?? [])
    .filter(el => el.style.opacity !== '0'))

const GOLDEN = 2.399963229728653
const ROTATION_SPEED = 0.0035 // radians / frame

const industries = homeIndustries.map((ind, i) => ({
  ...ind,
  longitude: (i / homeIndustries.length) * Math.PI * 2,
  latitude: Math.sin(i * GOLDEN) * 26, // deterministic spread, % offset from center
}))

const markers: (HTMLElement | null)[] = []
function setMarkerRef(el: Element | null, i: number) { markers[i] = el as HTMLElement | null }

let angle = 0
let paused = false
const hoveredIndex = ref<number | null>(null)
const hoveredIndustry = ref<typeof industries[number] | null>(null)

function hover(i: number) { paused = true; hoveredIndex.value = i; hoveredIndustry.value = industries[i]!; place() }
function unhover() { paused = false; hoveredIndex.value = null; hoveredIndustry.value = null; place() }

function place() {
  industries.forEach((ind, i) => {
    const el = markers[i]
    if (!el) return
    const lon = ind.longitude + angle
    const depth = Math.cos(lon)
    if (depth < 0 && hoveredIndex.value !== i) {
      el.style.opacity = '0'
      el.style.pointerEvents = 'none'
      return
    }
    const x = 50 + Math.sin(lon) * 42
    const y = 50 + ind.latitude
    const scale = 0.55 + 0.55 * Math.max(depth, 0)
    // front-facing points illuminate; the hovered point always glows,
    // regardless of where rotation paused it
    const glow = hoveredIndex.value === i ? 1 : Math.max(depth, 0)
    el.style.left = x + '%'
    el.style.top = y + '%'
    el.style.transform = `translate(-50%, -50%) scale(${scale})`
    el.style.opacity = String(0.3 + 0.7 * Math.max(depth, 0))
    el.style.zIndex = String(Math.round(depth * 100) + 100)
    el.style.pointerEvents = 'auto'
    el.style.setProperty('--glow', String(glow))
  })
}

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  place()
  if (reduced) return
  const tick = () => { if (!paused) angle += ROTATION_SPEED; place() }
  gsap.ticker.add(tick)
  onUnmounted(() => gsap.ticker.remove(tick))
})
</script>

<template>
  <section ref="root" class="industries">
    <div class="industries__inner">
      <div v-reveal class="globe" role="img" aria-label="Industries SVARA serves, rotating">
        <div class="globe__sphere" aria-hidden="true" />
        <div class="globe__ring globe__ring--1" aria-hidden="true" />
        <div class="globe__ring globe__ring--2" aria-hidden="true" />

        <NuxtLink
          v-for="(ind, i) in industries" :key="ind.name"
          :to="ind.to"
          class="globe__marker"
          :aria-label="ind.name"
          :ref="(el) => setMarkerRef((el as { $el?: Element })?.$el ?? (el as Element), i)"
          @mouseenter="hover(i)"
          @mouseleave="unhover()"
          @focus="hover(i)"
          @blur="unhover()"
        >
          <span class="globe__dot" />
        </NuxtLink>

        <div class="globe__label" :class="{ 'globe__label--show': hoveredIndustry }" aria-live="polite">
          {{ hoveredIndustry?.name ?? '' }}
        </div>
      </div>

      <div class="industries__copy">
        <p v-reveal class="industries__eyebrow">Industries</p>
        <h2 v-reveal class="industries__title" data-split>{{ homeSection05.title }}</h2>
        <div v-reveal="{ delay: 0.1 }" class="industries__more"><SectionLink to="/industries" label="Explore all industries" /></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.industries {
  min-height: 90vh;
  display: flex;
  align-items: center;
}
.industries__inner {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding: var(--section-y) var(--container-pad);
  display: grid;
  grid-template-columns: 6fr 6fr;
  gap: var(--gap-section);
  align-items: center;
  box-sizing: border-box;
}
.industries__eyebrow {
  margin: 0 0 var(--space-6);
  font-family: var(--font-mono); font-size: var(--type-label);
  letter-spacing: var(--tracking-label); text-transform: uppercase;
  color: var(--color-accent);
}
.industries__title {
  margin: 0;
  font-size: clamp(34px, 4.4vw, 64px);
  font-weight: var(--weight-bold); line-height: 1.12; letter-spacing: -0.02em;
  color: var(--color-text);
}
.industries__more { margin-top: var(--space-8); }

/* the globe */
.globe {
  position: relative;
  aspect-ratio: 1 / 1;
}
.globe__sphere {
  position: absolute;
  inset: 6%;
  border-radius: 50%;
  background:
    radial-gradient(120% 120% at 30% 22%, #ffffff 0%, var(--color-surface) 45%, #DCE6F2 100%);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-glass), inset -18px -18px 40px rgba(16, 42, 91, 0.06);
}
.globe__ring {
  position: absolute;
  inset: 6%;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  animation: globe-spin 18s linear infinite;
}
.globe__ring--1 { transform: scaleY(0.32) rotate(0deg); }
.globe__ring--2 { transform: scaleY(0.32) rotate(60deg); animation-duration: 24s; animation-direction: reverse; }

.globe__marker {
  position: absolute;
  left: 50%; top: 50%;
  display: block;
  width: 14px; height: 14px;
  transform: translate(-50%, -50%);
  will-change: left, top, opacity, transform;
}
.globe__dot {
  display: block;
  width: 100%; height: 100%;
  border-radius: 50%;
  background: var(--color-accent); /* tiny blue lights, even at rest */
  border: 2px solid var(--color-bg);
  /* illuminates as the point rotates toward the front — --glow (0..1) is
     driven per-frame from JS */
  box-shadow: var(--shadow-soft),
    0 0 calc(var(--glow, 0) * 18px) rgba(47, 127, 230, calc(var(--glow, 0) * 0.9));
  transition: background var(--motion-fast) var(--ease-smooth), transform var(--motion-fast) var(--ease-smooth);
}
.globe__marker:hover .globe__dot,
.globe__marker:focus-visible .globe__dot {
  background: #ffffff;
  transform: scale(1.35);
}
.globe__marker:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; border-radius: 50%; }

.globe__label {
  position: absolute;
  left: 0; right: 0; bottom: -4%;
  text-align: center;
  font-size: var(--type-small); font-weight: var(--weight-semibold);
  color: var(--color-text);
  opacity: 0;
  transform: translateY(4px);
  transition: opacity var(--motion-medium) var(--ease-smooth), transform var(--motion-medium) var(--ease-smooth);
  pointer-events: none;
}
.globe__label--show { opacity: 1; transform: none; }

@keyframes globe-spin {
  from { transform: scaleY(0.32) rotate(0deg); }
  to { transform: scaleY(0.32) rotate(360deg); }
}

@media (max-width: 900px) {
  .industries__inner { grid-template-columns: 1fr; gap: var(--space-12); }
}
@media (prefers-reduced-motion: reduce) {
  .globe__ring { animation: none; }
  .globe__dot { transition: none; }
}
</style>
