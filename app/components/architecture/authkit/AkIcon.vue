<script setup lang="ts">
// A line-art glyph inside a perfect circle — the design's Feature Icon Tile: a
// 99999px container with a frosted tint and an outlined mono glyph. No fill, no
// colour variation between tiles.
import type { AkGlyph } from '~~/lib/architecture/authkit'

defineProps<{ glyph: AkGlyph, size?: number }>()
</script>

<template>
  <span class="ak-icon">
    <svg
      viewBox="0 0 24 24"
      :width="size ?? 22"
      :height="size ?? 22"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <template v-for="(s, i) in glyph" :key="i">
        <path v-if="s.d" :d="s.d" />
        <circle v-else-if="s.r" :cx="s.cx" :cy="s.cy" :r="s.r" />
        <rect v-else :x="s.x" :y="s.y" :width="s.w" :height="s.h" :rx="s.rx" />
      </template>
    </svg>
  </span>
</template>
