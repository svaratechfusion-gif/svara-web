<script setup lang="ts">
// The bottom-right pill.
//
// The reference stacks three customer avatars here. Photographs of strangers
// would be a claim this page cannot make, so the same overlapping stack carries
// the division numerals instead — which is the thing the pill is asserting.
import { computed } from 'vue'
import SpringIn from './SpringIn.vue'
import { REVEAL_DELAY } from './reveal'
import { useEntrance } from '~/composables/useEntrance'
import { homeSection04 } from '~~/lib/content/home'

const { enabled, instant } = useEntrance()

/** Three marks and a remainder, so the stack reads as "six" without six discs. */
const SHOWN = 3

const marks = computed(() => {
  const total = homeSection04.divisions.length
  return [
    ...homeSection04.divisions.slice(0, SHOWN).map((name, index) => ({
      key: name,
      text: String(index + 1).padStart(2, '0'),
    })),
    { key: 'rest', text: `+${total - SHOWN}` },
  ]
})
</script>

<template>
  <SpringIn
    variant="lift"
    class="dvh__proof"
    :delay="REVEAL_DELAY.proof"
    :enabled="enabled"
    :instant="instant"
  >
    <p class="dvh__proof-label">One unified company</p>
    <ul class="dvh__proof-marks" aria-hidden="true">
      <li v-for="mark in marks" :key="mark.key" class="dvh__proof-mark">
        {{ mark.text }}
      </li>
    </ul>
  </SpringIn>
</template>
