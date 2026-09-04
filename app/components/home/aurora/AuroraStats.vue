<script setup lang="ts">
// THE STAT COUNTER MOSAIC — Huly's "oversized numeral in a 30px-radius circle is the
// section's visual signature", crossed with Harness's Phosphor Accent Card, which the
// system allows exactly once per viewport.
//
// THE NUMERALS COUNT. They tick up from zero when the row enters and the rings draw
// their stroke around them as they go — a stat card that just sits there is a label,
// not a counter.
//
// Every figure is COUNTED from the content modules — the platforms SVARA ships, the
// industries it has content files for, the divisions, the loop stages. No outcome is
// claimed and no metric is invented.
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { gsap, ScrollTrigger } from '~~/lib/gsap'
import { SVARA_OS } from '~/utils/svara-os'
import { INDUSTRIES, PLATFORM_SURROUND, OUTCOMES } from '~/utils/industries-page'

const DIVISIONS = 6

const stats = [
  { target: PLATFORM_SURROUND.length, l: 'Platforms', d: 'One engineered stack', tone: 'mint' },
  { target: INDUSTRIES.length, l: 'Environments', d: 'Operational industries', tone: 'iris' },
  { target: DIVISIONS, l: 'Divisions', d: 'Specialised disciplines', tone: 'plain' },
  { target: OUTCOMES.length, l: 'Loop stages', d: 'Observe to grow', tone: 'ember' },
]

const row = ref<HTMLElement | null>(null)
const counts = ref(stats.map(() => 0))
const drawn = ref(0)

const shown = computed(() => counts.value.map(n => String(Math.round(n)).padStart(2, '0')))
/** The ring stroke draws with the count — circumference of r=46 is ~289. */
const dash = computed(() => `${Math.max(0.001, drawn.value) * 289} 289`)

const flagship = computed(() =>
  ['vision', 'twin', 'aios']
    .map(id => SVARA_OS.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p)),
)

let st: ScrollTrigger | null = null
onMounted(() => {
  if (!row.value) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    counts.value = stats.map(s => s.target)
    drawn.value = 1
    return
  }
  st = ScrollTrigger.create({
    trigger: row.value,
    start: 'top 84%',
    once: true,
    onEnter: () => {
      const o = { v: 0 }
      gsap.to(o, {
        v: 1,
        duration: 1.5,
        ease: 'power3.out',
        onUpdate: () => {
          drawn.value = o.v
          counts.value = stats.map(s => s.target * o.v)
        },
      })
    },
  })
})
onBeforeUnmount(() => st?.kill())
</script>

<template>
  <section class="au-stats hx-section" aria-labelledby="au-stats-t">
    <div class="hx-container">
      <header class="au-head">
        <p class="au-eyebrow">The system in numbers</p>
        <h2 id="au-stats-t" class="au-display">One stack, counted.</h2>
      </header>

      <div ref="row" class="au-mosaic">
        <article v-for="(s, i) in stats" :key="s.l" class="au-stat" :class="`au-stat--${s.tone}`">
          <span class="au-stat__ring">
            <svg class="au-stat__arc" viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="50" cy="50" r="46" :stroke-dasharray="dash" transform="rotate(-90 50 50)" />
            </svg>
            <b class="au-stat__v">{{ shown[i] }}</b>
          </span>
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
