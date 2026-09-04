<script setup lang="ts">
// THE METABRAIN MOSAIC — Huly's signature section, built rather than recoloured.
//
// "Breaks the grid with a centered display heading and a mixed-size card mosaic
// (large featured card + smaller supporting cards)", each card "a deep card with a
// soft radial gradient bleed in the corner — warm amber or cool iris — as the visual
// hook".
//
// IT IS PINNED AND SCRUBBED. The section holds while the mosaic assembles: the
// featured card rises and settles first, then the supporting cards fly in from their
// own directions, staggered across the scroll. Static grids are what made this page
// feel dead; this one builds itself while you watch.
//
// Content is the ten platforms SVARA ships, verbatim from app/utils/svara-os.ts.
import { ref, computed } from 'vue'
import { SVARA_OS } from '~/utils/svara-os'
import { useScrollScrub } from '~/composables/useScrollScrub'

const root = ref<HTMLElement | null>(null)
const stage = ref<HTMLElement | null>(null)
const { progress } = useScrollScrub(root, { start: 'top top', end: 'bottom bottom', pin: stage })

const hero = computed(() => SVARA_OS.find(p => p.id === 'aios') ?? SVARA_OS[0]!)
const rest = computed(() => SVARA_OS.filter(p => p.id !== hero.value.id).slice(0, 6))

/** Each card gets its own slice of the scroll, so the mosaic assembles in sequence. */
function beat(i: number, total: number): number {
  const span = 1 / (total + 1.4)
  const start = span * (i + 0.4)
  return Math.min(1, Math.max(0, (progress.value - start) / (span * 1.6)))
}

const heroT = computed(() => beat(-0.4, rest.value.length))
const cardT = computed(() => rest.value.map((_, i) => beat(i, rest.value.length)))

/** Alternating entry vectors — cards arrive from their own side of the canvas. */
const VECTORS = [
  { x: -70, y: 40 }, { x: 70, y: 40 }, { x: -50, y: 70 },
  { x: 50, y: 70 }, { x: -80, y: 10 }, { x: 80, y: 10 },
]
function style(i: number) {
  const t = cardT.value[i] ?? 0
  const v = VECTORS[i % VECTORS.length]!
  return {
    opacity: String(t),
    transform: `translate3d(${v.x * (1 - t)}px, ${v.y * (1 - t)}px, 0) scale(${0.92 + 0.08 * t})`,
  }
}
</script>

<template>
  <section ref="root" class="au-mos" aria-labelledby="au-mos-t">
    <div ref="stage" class="au-mos__stage">
      <div class="hx-container">
        <header class="au-head au-head--center">
          <p class="au-eyebrow">The stack</p>
          <h2 id="au-mos-t" class="au-display">Ten platforms. One brain.</h2>
        </header>

        <div class="au-mos__grid">
          <!-- the large featured card -->
          <article
            class="au-card au-card--hero au-card--glow"
            :style="{ opacity: String(heroT), transform: `translate3d(0, ${48 * (1 - heroT)}px, 0)` }"
          >
            <span class="au-card__n">{{ hero.n }}</span>
            <h3 class="au-card__t">{{ hero.short }}</h3>
            <p class="au-card__b">{{ hero.tagline }}</p>
            <ul class="au-chips au-chips--tight">
              <li v-for="m in hero.modules.slice(0, 4)" :key="m.k" class="au-chip">{{ m.k }}</li>
            </ul>
            <NuxtLink :to="hero.to" class="au-pill au-pill--fill au-card__cta">Open {{ hero.short }}</NuxtLink>
          </article>

          <!-- the supporting cards -->
          <NuxtLink
            v-for="(p, i) in rest" :key="p.id"
            :to="p.to"
            class="au-card au-card--sm"
            :class="{ 'au-card--iris': i % 3 === 1, 'au-card--ember': i % 3 === 2 }"
            :style="style(i)"
          >
            <span class="au-card__n">{{ p.n }}</span>
            <h3 class="au-card__t au-card__t--sm">{{ p.short }}</h3>
            <p class="au-card__b au-card__b--sm">{{ p.tagline }}</p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
