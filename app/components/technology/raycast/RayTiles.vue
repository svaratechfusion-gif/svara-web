<script setup lang="ts">
// The extension-tile grid: 8px radius, a hairline border, a tight 8px gap, the name
// at 14px and its category beneath in muted 12px. The design uses this for dense
// inventories, which is exactly what thirty technologies across five layers is.
//
// THE INSET INPUT FIELD, doing real work. The design defines it as a component and
// the page had it sitting in a form that posted nowhere. Here it filters the
// inventory — a search field over thirty technologies is what a dense grid actually
// needs, and it is the one use that isn't a dead end.
import { ref, computed } from 'vue'
import RayIcon from './RayIcon.vue'
import { RAY_TILES } from '~~/lib/technology/raycast'
import { useScrollScrub } from '~/composables/useScrollScrub'

const q = ref('')
const shown = computed(() => {
  const t = q.value.trim().toLowerCase()
  if (!t) return RAY_TILES
  return RAY_TILES.filter(x => x.name.toLowerCase().includes(t) || x.category.toLowerCase().includes(t))
})

// MOTION: the grid cascades in as it enters rather than appearing whole.
const grid = ref<HTMLElement | null>(null)
const { progress } = useScrollScrub(grid, { start: 'top 88%', end: 'bottom 74%' })
const reached = computed(() => progress.value * (shown.value.length + 6))
</script>

<template>
  <section class="ray-tiles" aria-label="Technologies in the stack">
    <div class="ray-wrap">
      <div class="ray-tiles__bar">
        <label class="ray-sr" for="ray-tile-q">Filter technologies</label>
        <input
          id="ray-tile-q" v-model="q" class="ray-input ray-tiles__input"
          type="search" placeholder="Filter the stack…" autocomplete="off"
        >
        <span class="ray-tiles__count">{{ shown.length }} / {{ RAY_TILES.length }}</span>
      </div>

      <ul ref="grid" class="ray-tiles__grid">
        <li
          v-for="(t, i) in shown" :key="`${t.n}-${t.name}`"
          class="ray-tile"
          :class="{ 'is-in': reached > i }"
        >
          <RayIcon :glyph="t.icon" :size="16" class="ray-tile__icon" />
          <span class="ray-tile__body">
            <span class="ray-tile__name">{{ t.name }}</span>
            <span class="ray-tile__cat">{{ t.category }}</span>
          </span>
        </li>
      </ul>

      <p v-if="!shown.length" class="ray-tiles__empty" role="status">
        Nothing in the stack matches “{{ q }}”.
      </p>
    </div>
  </section>
</template>
