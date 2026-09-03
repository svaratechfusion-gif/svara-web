<script setup lang="ts">
// THE STAT COUNTER MOSAIC — Huly's "oversized numeral in a 30px-radius circle is the
// section's visual signature", crossed with Harness's Phosphor Accent Card, which the
// system allows exactly once per viewport.
//
// Every figure is COUNTED from app/utils/svara-os.ts and the content modules — the
// platforms SVARA ships, the industries it has content files for, the divisions. No
// outcome is claimed and no metric is invented.
import { computed } from 'vue'
import { SVARA_OS } from '~/utils/svara-os'
import { INDUSTRIES, PLATFORM_SURROUND, OUTCOMES } from '~/utils/industries-page'

/** Two digits throughout — the numerals read as instrument-panel counters, and a
 *  bare "6" beside a "13" breaks that. */
const pad = (n: number) => String(n).padStart(2, '0')

const stats = computed(() => [
  { v: pad(PLATFORM_SURROUND.length), l: 'Platforms', d: 'One engineered stack', tone: 'mint' },
  { v: pad(INDUSTRIES.length), l: 'Environments', d: 'Operational industries', tone: 'iris' },
  { v: '06', l: 'Divisions', d: 'Specialised disciplines', tone: 'plain' },
  { v: pad(OUTCOMES.length), l: 'Loop stages', d: 'Observe to grow', tone: 'ember' },
])

/** The flagship three, for the mosaic's supporting cards. */
const flagship = computed(() =>
  ['vision', 'twin', 'aios']
    .map(id => SVARA_OS.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p)),
)
</script>

<template>
  <section class="au-stats hx-section" aria-labelledby="au-stats-t">
    <div class="hx-container">
      <header class="au-head">
        <p class="au-eyebrow">The system in numbers</p>
        <h2 id="au-stats-t" class="au-display">One stack, counted.</h2>
      </header>

      <!-- the mosaic: one accent card, then the supporting grid -->
      <div class="au-mosaic">
        <article v-for="s in stats" :key="s.l" class="au-stat" :class="`au-stat--${s.tone}`">
          <span class="au-stat__ring">{{ s.v }}</span>
          <h3 class="au-stat__l">{{ s.l }}</h3>
          <p class="au-stat__d">{{ s.d }}</p>
        </article>
      </div>

      <ul class="au-chips">
        <li v-for="p in flagship" :key="p.id" class="au-chip">{{ p.short }}</li>
        <li class="au-chip au-chip--ember">+ {{ PLATFORM_SURROUND.length - flagship.length }} more</li>
      </ul>
    </div>
  </section>
</template>
