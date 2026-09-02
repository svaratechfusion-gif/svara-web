<script setup lang="ts">
// THE COMMAND WINDOW — the design's headline visual. "No photography… the product UI
// is the hero": a recreated command interface rendered as if floating on the page.
//
// 12px outer frame on the key inner-shadow stack so it reads as a physical object, a
// 16px command bar, 8px result rows with their own glyphs and keyboard hints, and a
// single Coral Pulse highlight on the selected row — the one place the accent appears
// on this page.
//
// It is a still, not a control: nothing to type into, nothing to focus. It is the
// page's illustration, so the frame is aria-hidden and a text alternative sits beside it.
import RayIcon from './RayIcon.vue'
import { RAY_WINDOW } from '~~/lib/technology/raycast'
</script>

<template>
  <div class="ray-window" aria-hidden="true">
    <!-- window chrome -->
    <div class="ray-window__chrome">
      <span class="ray-window__dot" /><span class="ray-window__dot" /><span class="ray-window__dot" />
      <span class="ray-window__title">{{ RAY_WINDOW.hint }}</span>
    </div>

    <div class="ray-window__bar">
      <svg
viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
           stroke-width="1.6" stroke-linecap="round" class="ray-window__glyph">
        <circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.4 15.4 4 4" />
      </svg>
      <span class="ray-window__placeholder">{{ RAY_WINDOW.placeholder }}</span>
      <span class="ray-window__caret" />
      <span class="ray-window__kbd">⌘K</span>
    </div>

    <p class="ray-window__group">Layers</p>

    <ol class="ray-window__rows">
      <li
        v-for="r in RAY_WINDOW.rows"
        :key="r.n"
        class="ray-window__row"
        :class="{ 'is-active': r.active }"
      >
        <RayIcon :glyph="r.icon" :size="16" class="ray-window__row-icon" />
        <span class="ray-window__row-name">{{ r.name }}</span>
        <span class="ray-window__row-detail">{{ r.detail }}</span>
        <span class="ray-window__row-kind">Layer</span>
        <span v-if="r.active" class="ray-window__kbd ray-window__kbd--row">↵</span>
      </li>
    </ol>

    <div class="ray-window__foot">
      <span class="ray-window__foot-l">{{ RAY_WINDOW.footer[0] }}</span>
      <span class="ray-window__foot-r">
        <span class="ray-window__kbd">↑↓</span><span>Navigate</span>
        <span class="ray-window__kbd">↵</span><span>Open</span>
      </span>
    </div>
  </div>
</template>
