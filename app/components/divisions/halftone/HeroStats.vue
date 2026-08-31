<script setup lang="ts">
// The 2×2 stat grid.
//
// A list, not a <dl>: the design puts the figure above its label, and a
// description list would force the label first. Source order follows the
// design, so it reads the same aloud as on screen.
//
// Every figure is COUNTED off the Content Bible rather than typed in, so the
// panel cannot drift out of step with the site it describes.
//
// The cards lift in on a short stagger and take no blur — blur is the text's
// move here, and a blurred border reads as a rendering fault, not as depth.
import { computed } from 'vue'
import SpringIn from './SpringIn.vue'
import { REVEAL_DELAY } from './reveal'
import { useEntrance } from '~/composables/useEntrance'
import { homeIndustries, homePlatforms, homeSection04 } from '~~/lib/content/home'

const { enabled, instant } = useEntrance()

/** Two digits, so the four figures sit as one column of marks. */
const pad = (value: number) => String(value).padStart(2, '0')

const stats = computed(() => [
  { value: pad(homeSection04.divisions.length), label: 'Divisions', accented: true },
  { value: pad(homePlatforms.length), label: 'Platforms', accented: false },
  { value: pad(homeIndustries.length), label: 'Industries', accented: false },
  { value: '01', label: 'Company', accented: true },
])
</script>

<template>
  <ul class="dvh__stats">
    <SpringIn
      v-for="(stat, index) in stats"
      :key="stat.label"
      as="li"
      variant="lift"
      class="dvh__stat"
      :class="{ 'is-accented': stat.accented }"
      :delay="REVEAL_DELAY.stats + index * REVEAL_DELAY.statStep"
      :enabled="enabled"
      :instant="instant"
    >
      <p class="dvh__stat-value">{{ stat.value }}</p>
      <p class="dvh__stat-label">{{ stat.label }}</p>
    </SpringIn>
  </ul>
</template>
