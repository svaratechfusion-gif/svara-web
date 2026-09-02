<script setup lang="ts">
// THE APP WINDOW MOCKUP — the design's signature block: "no photography, the product
// UI is the hero". A recreated command interface, 12px outer frame, a 16px command
// bar, 8px result rows, the key inner-shadow stack on the chrome so it reads as a
// physical object, and a single Coral Pulse highlight on the selected row.
//
// It is a still, not a control: no input, no focus trap, nothing to type into. It is
// the page's illustration, so it is aria-hidden with a text alternative beside it.
import { RAY_WINDOW } from '~~/lib/technology/raycast'
</script>

<template>
  <section class="ray-window-band" aria-label="The SVARA intelligence architecture">
    <div class="ray-wrap">
      <div class="ray-window" aria-hidden="true">
        <div class="ray-window__bar">
          <svg
viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor"
               stroke-width="1.6" stroke-linecap="round" class="ray-window__glyph">
            <circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.4 15.4 4 4" />
          </svg>
          <span class="ray-window__placeholder">{{ RAY_WINDOW.placeholder }}</span>
          <span class="ray-window__hint">{{ RAY_WINDOW.hint }}</span>
        </div>
        <ol class="ray-window__rows">
          <li
            v-for="r in RAY_WINDOW.rows"
            :key="r.n"
            class="ray-window__row"
            :class="{ 'is-active': r.active }"
          >
            <span class="ray-window__row-n">{{ r.n }}</span>
            <span class="ray-window__row-name">{{ r.name }}</span>
            <span class="ray-window__row-detail">{{ r.detail }}</span>
          </li>
        </ol>
        <p class="ray-window__foot">{{ RAY_WINDOW.footer[0] }}</p>
      </div>
      <p class="ray-sr">
        A command interface listing the five SVARA intelligence layers — Perception,
        Intelligence, Cognition, Simulation and Autonomy — resolving layer by layer
        into enterprise and physical action.
      </p>
    </div>
  </section>
</template>
