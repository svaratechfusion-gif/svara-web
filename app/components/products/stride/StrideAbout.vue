<script setup lang="ts">
// The centred About statement. Its heading has inline icon chips, so it cannot use
// StrideHeading — it is assembled by hand over ONE shared timeline whose items are, in
// order: lead letters · chip 1 · muted letters · chip 2. Letters rise out of a blur;
// the chips scale up out of one (CHIP_MIN_SCALE 0.3) at their own slot in the same
// cascade, so the icons land as part of the sentence rather than after it.
import { computed, ref, onMounted } from 'vue'
import { useRevealCascade } from '~/composables/useRevealCascade'
import { useTicker } from '~/composables/useTicker'
import { STRIDE_ABOUT } from '~~/lib/stride/content'

const RISE = 16 // px letters rise from
const BLUR = 8 // px start blur
const CHIP_MIN_SCALE = 0.3 // chips scale up from this

const letterCount = (s: string): number => [...s].filter(c => c !== ' ').length

const leadLen = letterCount(STRIDE_ABOUT.lead)
const mutedLen = letterCount(STRIDE_ABOUT.mutedLead)
const chip1Idx = leadLen
const chip2Idx = leadLen + 1 + mutedLen
const total = chip2Idx + 1

/** Split a run into words carrying each letter's GLOBAL timeline index. */
function run(text: string, from: number) {
  let i = from
  return text.split(' ').map(word => ({
    letters: [...word].map(ch => ({ ch, i: i++ })),
  }))
}
const leadWords = computed(() => run(STRIDE_ABOUT.lead, 0))
const mutedWords = computed(() => run(STRIDE_ABOUT.mutedLead, chip1Idx + 1))

const { rootRef } = useRevealCascade({
  total: () => total,
  apply: (_p, localProg) => {
    const root = rootRef.value
    if (!root) return
    root.querySelectorAll<HTMLElement>('[data-sl]').forEach((el) => {
      const lp = localProg(Number(el.dataset.sl))
      el.style.opacity = String(lp)
      el.style.transform = `translateY(${RISE * (1 - lp)}px)`
      el.style.filter = `blur(${BLUR * (1 - lp)}px)`
    })
    root.querySelectorAll<HTMLElement>('[data-sc]').forEach((el) => {
      const lp = localProg(Number(el.dataset.sc))
      el.style.opacity = String(lp)
      el.style.transform = `scale(${CHIP_MIN_SCALE + (1 - CHIP_MIN_SCALE) * lp})`
      el.style.filter = `blur(${BLUR * (1 - lp)}px)`
    })
  },
})

// The eyebrow is a plain fade + rise on scroll-in (the source's <Inview>), separate
// from the heading's cascade.
const eyebrowRef = ref<HTMLElement | null>(null)
let eyebrowP = 0
let eyebrowOn = false
onMounted(() => {
  const el = eyebrowRef.value
  if (!el) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.style.opacity = '1'
    el.style.transform = 'none'
    eyebrowP = 1
    return
  }
  el.style.opacity = '0'
  el.style.transform = 'translateY(12px)'
  const io = new IntersectionObserver((entries) => {
    if (entries.some(e => e.isIntersecting)) {
      eyebrowOn = true
      io.disconnect()
    }
  }, { rootMargin: '0px 0px -15% 0px' })
  io.observe(el)
})
useTicker(() => {
  if (!eyebrowOn || eyebrowP >= 0.999) return
  eyebrowP += (1 - eyebrowP) * 0.12
  const el = eyebrowRef.value
  if (!el) return
  el.style.opacity = String(eyebrowP)
  el.style.transform = `translateY(${12 * (1 - eyebrowP)}px)`
})
</script>

<template>
  <section class="sx-about" :aria-labelledby="STRIDE_ABOUT.labelId">
    <p ref="eyebrowRef" class="sx-about__eyebrow">
      <span class="sx-about__dot" />{{ STRIDE_ABOUT.eyebrow }}
    </p>

    <h2
      :id="STRIDE_ABOUT.labelId"
      ref="rootRef"
      class="sx-about__h"
      :aria-label="`${STRIDE_ABOUT.lead} ${STRIDE_ABOUT.mutedLead}`"
    >
      <template v-for="(w, wi) in leadWords" :key="`l${wi}`">
        <span aria-hidden="true" class="sx-about__w">
          <span v-for="l in w.letters" :key="l.i" :data-sl="l.i" class="sx-about__l">{{ l.ch }}</span>
        </span><span aria-hidden="true">{{ ' ' }}</span>
      </template>

      <span :data-sc="chip1Idx" aria-hidden="true" class="sx-about__chipwrap">
        <span class="sx-about__chip sx-about__chip--blue">
          <svg viewBox="0 0 24 24" class="sx-about__ico sx-about__ico--chart" fill="currentColor" aria-hidden="true">
            <rect x="4" y="12" width="4" height="8" rx="1" />
            <rect x="10" y="7" width="4" height="13" rx="1" />
            <rect x="16" y="3" width="4" height="17" rx="1" />
          </svg>
        </span>
      </span>

      <span class="sx-about__muted">
        <template v-for="(w, wi) in mutedWords" :key="`m${wi}`">
          <span aria-hidden="true" class="sx-about__w">
            <span v-for="l in w.letters" :key="l.i" :data-sl="l.i" class="sx-about__l">{{ l.ch }}</span>
          </span><span aria-hidden="true">{{ ' ' }}</span>
        </template>

        <span :data-sc="chip2Idx" aria-hidden="true" class="sx-about__chipwrap">
          <span class="sx-about__chip sx-about__chip--lime">
            <svg viewBox="0 0 24 24" class="sx-about__ico sx-about__ico--bolt" fill="currentColor" aria-hidden="true">
              <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
            </svg>
          </span>
        </span>
      </span>
    </h2>
  </section>
</template>
