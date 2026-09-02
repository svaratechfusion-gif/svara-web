<script setup lang="ts">
// A line-art glyph in a circular container — the design's icon language: 1.5px
// stroke, no fill, no colour variation between tiles, Mist on a dark surface.
//
// The glyph is described as an array of <path>/<circle>/<rect> specs rather than a
// markup string: the shapes are hardcoded so there is no injection risk either way,
// but v-html is a rule this project lints against and a template renders it just as
// compactly.
import type { RayGlyph } from '~~/lib/technology/raycast'

defineProps<{ glyph: RayGlyph, size?: number }>()
</script>

<template>
  <span class="ray-icon">
    <svg
      viewBox="0 0 24 24"
      :width="size ?? 24"
      :height="size ?? 24"
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
