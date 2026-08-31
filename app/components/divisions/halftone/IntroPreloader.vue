<script setup lang="ts">
// The intro — two stacked curtains over the whole page. A black one carrying
// the dial, and the accent one behind it. The count fills the ring; when it
// lands, the black lifts away and the accent follows a beat later, so the page
// is uncovered in two passes rather than one.
//
// Unmounts once the second curtain is clear: it covers the viewport and would
// swallow every pointer event if it lingered.
//
// > Announce the lift, not the landing.
// The hero animates BEHIND these curtains. Firing the reveal signal when they
// are gone leaves the page sitting blank for the ~650ms they take to clear, and
// then the field still has to accelerate from rest — it reads as a dead screen.
// So `markRevealed()` fires the instant the lift BEGINS.
import { onMounted, ref } from 'vue'
import { LIFT_SPRING, Spring } from '~~/lib/motion/spring'
import { useIntroReveal } from '~/composables/useIntroReveal'
import { useReducedMotion } from '~/composables/useReducedMotion'
import { useTicker } from '~/composables/useTicker'

/** How long the count takes, ms. Linear — an eased counter looks like it is lying. */
const COUNT_MS = 2200

/**
 * How far the veil trails the ground, ms. The design catches the pair mid-lift
 * with a sliver of accent showing under the black — about a seventh of the travel.
 */
const VEIL_DELAY = 150

/** Turns the disc makes over one count. */
const SPIN_TURNS = 2

const { revealed, markRevealed } = useIntroReveal()
const prefersReducedMotion = useReducedMotion()

const isGone = ref(false)
const percent = ref(0)

const ringEl = ref<SVGCircleElement | null>(null)
const discEl = ref<HTMLElement | null>(null)
const groundEl = ref<HTMLElement | null>(null)
const veilEl = ref<HTMLElement | null>(null)

/** Wall-clock start of the count, set on mount. See the ticker below. */
let startedAt = 0
let isLifting = false
let ground: Spring | null = null
let veil: Spring | null = null

function beginLift() {
  if (isLifting) return
  isLifting = true
  ground = new Spring(0, LIFT_SPRING)
  ground.setTarget(1)
  veil = new Spring(0, LIFT_SPRING, VEIL_DELAY)
  veil.setTarget(1)
  // The page starts animating now, not when the curtains have cleared.
  markRevealed()
}

onMounted(() => {
  // Already played this session (an SPA return to /divisions), or the visitor
  // asked for no motion: skip straight to the uncovered page.
  if (revealed.value || prefersReducedMotion.value) {
    markRevealed()
    isGone.value = true
    return
  }
  startedAt = performance.now()
})

useTicker((dt) => {
  if (isGone.value) return

  if (!isLifting) {
    // Wall-clock, NOT accumulated frame deltas. A page opened in a background
    // tab gets no animation frames at all, so a delta-summed counter freezes
    // mid-count and the curtain never lifts — the visitor switches back to a
    // black screen showing a stale percentage. Reading the clock means the
    // first frame after the tab becomes visible already resolves to 1 and the
    // curtains go up immediately, however long the tab sat hidden.
    const progress = Math.min((performance.now() - startedAt) / COUNT_MS, 1)

    ringEl.value?.setAttribute('stroke-dashoffset', String(1 - progress))
    if (discEl.value) discEl.value.style.rotate = `${progress * 360 * SPIN_TURNS}deg`
    percent.value = Math.round(progress * 100)

    if (progress >= 1) beginLift()
    return
  }

  if (ground) {
    const value = ground.advance(dt)
    if (groundEl.value) groundEl.value.style.transform = `translate3d(0, ${value * -100}%, 0)`
  }
  if (veil) {
    const value = veil.advance(dt)
    if (veilEl.value) veilEl.value.style.transform = `translate3d(0, ${value * -100}%, 0)`
    // The veil is the last thing covering the page.
    if (veil.isSettled) isGone.value = true
  }
})
</script>

<template>
  <div v-if="!isGone" class="dv-pre" aria-hidden="true">
    <div ref="veilEl" class="dv-pre__veil" />

    <div ref="groundEl" class="dv-pre__ground">
      <div class="dv-pre__dial">
        <!-- Ring geometry in its own SVG units: a 591px circle. `pathLength`
             normalises the stroke to 1, so the dash maths is just the progress
             value, and `rotate(90 …)` starts the sweep at 6 o'clock, where the
             disc's own gradient seam sits.

             Written as literal attributes, not bindings: these are fixed design
             constants, and Vue hydrates a bound SVG geometry attribute through
             the DOM *property* — which on SVGCircleElement is read-only, so
             `:cx`/`:r`/`:viewBox` each throw "has only a getter" on mount. -->
        <svg class="dv-pre__ring" viewBox="0 0 591 591">
          <circle
            ref="ringEl"
            cx="295.5"
            cy="295.5"
            r="295"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
            transform="rotate(90 295.5 295.5)"
            pathLength="1"
            stroke-dasharray="1"
            stroke-dashoffset="1"
          />
        </svg>

        <span ref="discEl" class="dv-pre__disc" />

        <p class="dv-pre__count">{{ percent }}%</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Above the global navigation (z-index 100) and its menu overlay (200): a
   curtain that something else paints over is not a curtain. */
.dv-pre,
.dv-pre * {
  box-sizing: border-box;
}

.dv-pre__count {
  margin: 0;
}

.dv-pre {
  position: fixed;
  inset: 0;
  z-index: 400;
  overflow: hidden;
}

.dv-pre__veil,
.dv-pre__ground {
  position: absolute;
  inset: 0;
  will-change: transform;
}

.dv-pre__veil {
  background: var(--dv-preloader-veil);
}

.dv-pre__ground {
  background: var(--dv-preloader-ground);
}

.dv-pre__dial {
  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  color: #ffffff;
}

.dv-pre__ring {
  position: absolute;
  width: calc(36.9375 * var(--dv-u));
  height: calc(36.9375 * var(--dv-u));
}

/* The seam of a conic gradient is its hard wrap — put it at 6 o'clock, where
   the ring's own sweep starts. */
.dv-pre__disc {
  width: calc(18.6875 * var(--dv-u));
  height: calc(18.6875 * var(--dv-u));
  border-radius: 9999px;
  background: conic-gradient(from 180deg, var(--dv-dial-from), var(--dv-dial-to));
  will-change: rotate;
}

.dv-pre__count {
  position: absolute;
  top: calc(50% + 12.6875 * var(--dv-u));
  font-size: var(--dv-t-stat);
  font-style: italic;
  line-height: 1;
  color: #ffffff;
}
</style>
