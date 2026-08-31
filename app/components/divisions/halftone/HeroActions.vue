<script setup lang="ts">
// The bottom-left action pill.
//
// The reference puts a request form here; a divisions page has nothing to
// request, so the same pill carries the two routes off this page instead — the
// existing hero's own CTAs, unchanged. Geometry is the form's: one dark round
// pill, a plain label on the left, and the accent button flush to its right end.
import SpringHover from './SpringHover.vue'
import SpringIn from './SpringIn.vue'
import { REVEAL_DELAY } from './reveal'
import { useEntrance } from '~/composables/useEntrance'

const { enabled, instant } = useEntrance()

/** The showcase is the next thing down the page — take the reader to it. */
function exploreDivisions() {
  document.querySelector('.divisions-page__body')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}
</script>

<template>
  <SpringIn
    variant="lift"
    class="dvh__actions"
    :delay="REVEAL_DELAY.actions"
    :enabled="enabled"
    :instant="instant"
  >
    <button type="button" class="dvh__actions-ghost" @click="exploreDivisions">
      Explore Divisions
    </button>

    <SpringHover class="dvh__actions-hover">
      <NuxtLink to="/technology" class="dvh__actions-cta">
        View Technology Stack
        <!-- One box, not a dot inside a disc: the ring is thinner than a device
             pixel at most scales, and two nested boxes snap their painted edges
             to the pixel grid independently, so a nested ring comes out
             lopsided. A border is painted as one box and cannot de-centre. -->
        <span class="dvh__actions-dot" aria-hidden="true" />
      </NuxtLink>
    </SpringHover>
  </SpringIn>
</template>
