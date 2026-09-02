<script setup lang="ts">
// DOWNLOAD BUTTON GROUP + INSET INPUT FIELD + FOOTER META STRIP.
//
// DOWNLOAD BUTTON GROUP + FOOTER META STRIP.
//
// The reference's closing pattern: two neutral filled buttons side by side, each with
// a 15px glyph and Iron text on a Mist fill — the system has no chromatic CTA — with
// the stack metadata beneath in monospace, separated by vertical pipes.
//
// The email field that used to sit above them posted nowhere. The design's Inset
// Input Field now does real work instead, as the filter over the technology grid, so
// this block is the two real destinations and the meta strip.
import { RAY_META, RAY_CTA } from '~~/lib/technology/raycast'
</script>

<template>
  <div class="ray-dl">

    <div class="ray-actions">
      <NuxtLink :to="RAY_CTA.primary.to" class="ray-btn ray-btn--fill">
        <svg
viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor"
             stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M4 6.5h16M4 12h16M4 17.5h10" />
        </svg>
        {{ RAY_CTA.primary.label }}
      </NuxtLink>
      <NuxtLink :to="RAY_CTA.secondary.to" class="ray-btn ray-btn--fill">
        <svg
viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor"
             stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
          <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
        </svg>
        {{ RAY_CTA.secondary.label }}
      </NuxtLink>
    </div>

    <p class="ray-meta">
      <template v-for="(m, i) in RAY_META" :key="m">
        <span>{{ m }}</span><span v-if="i < RAY_META.length - 1" class="ray-meta__pipe" aria-hidden="true">|</span>
      </template>
    </p>
  </div>
</template>
