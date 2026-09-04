<script setup lang="ts">
// THE PRODUCT-UI EVIDENCE — Huly's "Kanban Board Preview" and "Inbox/Chat Panel",
// wrapped in its "Product Screenshot Frame" (12px radius, soft black shadow,
// floating above the aurora). The reference is blunt about why these exist: "the
// system treats its own dark UI as the hero asset — the product is the photography".
//
// IT IS A SCHEMATIC, AND SAYS SO. These are not screenshots of a running deployment
// and there is no live data behind them — the columns are the Intelligence Loop's own
// five layers and the cards are their descriptions, verbatim from lib/content/platform.
// The panel carries a SCHEMATIC badge for the same reason /industries carries
// BLUEPRINT: a dark UI that looks live must never imply it is.
//
// MOTION: the board deals itself as the section scrolls — columns fade up in order,
// then their cards drop in one by one — and the whole frame parallaxes against the
// copy beside it.
import { ref, computed } from 'vue'
import { platformContent } from '~~/lib/content/platform'
import { useScrollScrub } from '~/composables/useScrollScrub'

const root = ref<HTMLElement | null>(null)
const { progress } = useScrollScrub(root, { start: 'top 88%', end: 'bottom 55%' })

/** The five loop layers become the board's columns; each carries its own role. */
const columns = computed(() =>
  platformContent.architecture.components.map((c, i) => ({
    n: String(i + 1).padStart(2, '0'),
    name: c.name.replace(/ Layer$/, ''),
    body: c.description,
  })),
)

function colT(i: number): number {
  const span = 1 / (columns.value.length + 1)
  return Math.min(1, Math.max(0, (progress.value - span * i * 0.8) / (span * 1.5)))
}
/** The frame drifts up against the copy — parallax, not a jump. */
const frameShift = computed(() => `translate3d(0, ${(1 - progress.value) * 40 - 12}px, 0)`)
</script>

<template>
  <section ref="root" class="au-board hx-section" aria-labelledby="au-board-t">
    <div class="hx-container au-board__grid">
      <header class="au-head au-head--left">
        <p class="au-eyebrow">The loop, laid out</p>
        <h2 id="au-board-t" class="au-display au-display--sm">Five layers, one continuous pass.</h2>
        <p class="au-body">{{ platformContent.architecture.overview }}</p>
        <div class="au-actions">
          <NuxtLink to="/platform" class="au-pill au-pill--fill">Read the platform</NuxtLink>
        </div>
      </header>

      <!-- the product screenshot frame -->
      <div class="au-frame" :style="{ transform: frameShift }">
        <div class="au-frame__chrome">
          <span class="au-frame__dot" /><span class="au-frame__dot" /><span class="au-frame__dot" />
          <span class="au-frame__title">Intelligence Loop</span>
          <span class="au-badge au-badge--sch">Schematic</span>
        </div>

        <div class="au-kanban">
          <div
            v-for="(c, i) in columns" :key="c.name"
            class="au-kanban__col"
            :style="{ opacity: String(colT(i)), transform: `translate3d(0, ${18 * (1 - colT(i))}px, 0)` }"
          >
            <p class="au-kanban__h">
              <span class="au-kanban__n">{{ c.n }}</span>{{ c.name }}
            </p>
            <div class="au-kanban__card">
              <span class="au-kanban__bar" />
              <p class="au-kanban__b">{{ c.body }}</p>
            </div>
          </div>
        </div>

        <p class="au-frame__foot">{{ platformContent.architecture.dataFlow }}</p>
      </div>
    </div>
  </section>
</template>
