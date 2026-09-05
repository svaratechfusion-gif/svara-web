<script setup lang="ts">
/**
 * THE HERO — Scene 01, composited around the particle humanoid.
 *
 * There is no hero image here on purpose. The reference's full-bleed video slot
 * is occupied by the fixed WebGL head, which is the one thing this redesign was
 * told to keep, so every layer in this component is chrome arranged AROUND it:
 *
 *   z1  the framing ring, masked so it fades out toward the top
 *   z2  a progressive blur across the lower 60% — the shoulders defocus, the
 *       face stays sharp
 *   z3  a black gradient that grounds the model into the page below
 *   z4  the Intelligence Loop's four capability names, mix-blend-difference so
 *       they invert against whatever the head is doing behind them
 *   z5  the type, split across opposite corners — the first half of the headline
 *       top-left, the second half bottom-right, exactly as the rest of the site
 *       splits a hero, with the model living in the gap between them
 */
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { dxHero } from '~~/lib/content/home-view'
import ScrambleText from '~/components/home/director/ScrambleText.vue'

const play = ref(false)

// One painted frame first, so the scramble is seen starting rather than
// arriving mid-way. The site's BootSequence has usually just lifted by here.
onMounted(() => { requestAnimationFrame(() => requestAnimationFrame(() => { play.value = true })) })

/**
 * THE LOOP RUNS ONLY WHILE THE HERO IS ON SCREEN.
 *
 * The four capability names are the Intelligence Loop — the company's core idea —
 * and they sat here as inert text. A signal now travels through them, so the hero
 * states what SVARA does instead of only looking like it.
 *
 * The animation itself is pure CSS on `opacity`, which the compositor owns: no
 * ticker, no rAF, no JS per frame. This observer exists so that even that cost
 * stops once the hero scrolls away — the canvas behind it keeps its own journey,
 * but a loop nobody can see should not be animating.
 */
const heroEl = ref<HTMLElement | null>(null)
/**
 * FAIL-OPEN, deliberately: this starts true and the observer only ever turns it
 * OFF. Starting false would mean that anywhere IntersectionObserver is missing,
 * delayed, or throttled (a backgrounded tab, an embedded frame), the loop would
 * silently never run and the hero would look broken. The worst case with this
 * ordering is that a compositor-only opacity animation runs a moment longer than
 * it strictly needs to.
 */
const loopLive = ref(true)
let io: IntersectionObserver | null = null

onMounted(() => {
  const el = heroEl.value
  if (!el || typeof IntersectionObserver === 'undefined') return
  io = new IntersectionObserver(([e]) => { loopLive.value = !!e?.isIntersecting }, { threshold: 0 })
  io.observe(el)
})
onBeforeUnmount(() => { io?.disconnect(); io = null })
</script>

<template>
  <section ref="heroEl" class="dxh" aria-label="Introduction">
    <div class="dxh__ring-wrap" aria-hidden="true">
      <div class="dxh__ring" />
    </div>

    <div class="dxh__blur" aria-hidden="true" />
    <div class="dxh__fade" aria-hidden="true" />

    <!-- The Intelligence Loop, running. `--i` gives each capability its offset in
         the cycle; the CSS does the rest. Content and order are unchanged. -->
    <div class="dxh__loop" :class="{ 'is-live': loopLive }">
      <p class="dxh__loop-row">
        <span
          v-for="(step, i) in dxHero.loop" :key="step.label"
          class="dxh__loop-step" :style="{ '--i': i }"
        >{{ step.label }}</span>
      </p>
    </div>

    <div class="dxh__type">
      <p class="dxh__eyebrow">{{ dxHero.eyebrow }}</p>

      <h1 class="dxh__h1">
        <span class="dxh__blk dxh__blk--a">
          <ScrambleText :text="dxHero.titleA.join('\n')" :play="play" simultaneous />
        </span>
        <span class="dxh__blk dxh__blk--b">
          <ScrambleText :text="dxHero.titleB.join('\n')" :play="play" simultaneous />
        </span>
      </h1>

      <p class="dxh__desc">{{ dxHero.description }}</p>
    </div>
  </section>
</template>
