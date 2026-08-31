<script setup lang="ts">
// The hero composition — one 1440×800 frame.
//
// Laid out against that frame in grid units (`--u`) so the adaptive scale moves
// the whole thing as one piece: at 1440×800 one unit is 16px and every number
// below is the design's px, 1:1. The top row is left to SVARA's global
// navigation, which owns that band on every page; this section's bottom row
// pins to the bottom, so a taller viewport grows the middle rather than
// stranding the pills mid-screen.
//
// TWO LAYOUTS, ONE DOM. Below 1024px the frame does not exist, so the pieces
// simply stack in source order and the page scrolls; from 1024px up they take
// the frame's absolute coordinates. Source order is therefore also the mobile
// reading order.
//
// The halftone field is a separate fixed background behind everything.
import HeroActions from './HeroActions.vue'
import HeroCopy from './HeroCopy.vue'
import HeroHeadline from './HeroHeadline.vue'
import HeroProof from './HeroProof.vue'
import HeroStats from './HeroStats.vue'
</script>

<template>
  <section class="dvh" aria-labelledby="divisions-hero-title">
    <HeroHeadline />
    <HeroCopy />
    <HeroStats />
    <HeroActions />
    <HeroProof />
  </section>
</template>

<style scoped>
/* The site's global reset does not reach these elements, and this frame is
   measured to the pixel: a content-box card would be its padding wider than the
   design, and the UA's `h1 { margin: .67em }` at an 80px display size would push
   the headline 52px off its coordinate. Declared first so the rules below win. */
.dvh,
.dvh :deep(*) {
  box-sizing: border-box;
}

.dvh :deep(:is(h1, p, ul)) {
  margin: 0;
}

/* ══ Mobile: a column as tall as it needs to be ══════════════════════════════
   Fitting this much copy, four cards and two pills into one phone screen would
   mean cutting most of it, so it scrolls — which is what a phone does anyway.
   The top padding clears the fixed global navigation. */
.dvh {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: calc(2.5 * var(--dv-u));
  padding: calc(5 * var(--dv-u)) calc(1.25 * var(--dv-u)) calc(2.5 * var(--dv-u));
  color: var(--dv-fg);
}

/* ── Headline ─────────────────────────────────────────────────────────────── */
.dvh :deep(.dvh__headline) {
  position: relative;
  width: 100%;
  font-size: var(--dv-t-display);
  line-height: 1;
}

.dvh :deep(.dvh__h1) {
  font-size: inherit;
  font-weight: 400;
  line-height: inherit;
  letter-spacing: -0.02em;
  color: inherit;
}

/* Sized in `em` against the headline, so it lands on the last line whether the
   headline wraps into two lines or three, and scales with the type instead of
   needing a second, hand-tuned mobile position. */
.dvh :deep(.dvh__bar) {
  position: absolute;
  bottom: -0.2em;
  left: -0.125em;
  display: block;
  width: 4.025em;
  height: 0.45em;
  border-radius: 9999px;
  background: var(--dv-accent);
}

/* ── Copy ─────────────────────────────────────────────────────────────────── */
.dvh :deep(.dvh__copy) {
  display: flex;
  gap: calc(1 * var(--dv-u));
}

.dvh :deep(.dvh__rule) {
  display: block;
  flex: 0 0 auto;
  width: 1px;
  background: var(--dv-fg);
}

.dvh :deep(.dvh__copy-text) {
  display: flex;
  flex-direction: column;
  gap: calc(1.5 * var(--dv-u));
}

.dvh :deep(.dvh__lead) {
  font-size: var(--dv-t-lead);
  line-height: 1.2;
  color: inherit;
}

.dvh :deep(.dvh__body) {
  font-size: var(--dv-t-body);
  line-height: 1.2;
  color: var(--dv-fg-muted);
}

/* ── Stats ────────────────────────────────────────────────────────────────── */
.dvh :deep(.dvh__stats) {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: calc(0.5 * var(--dv-u));
  margin: 0;
  padding: 0;
  list-style: none;
}

.dvh :deep(.dvh__stat) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: calc(0.75 * var(--dv-u));
  padding: calc(1 * var(--dv-u));
  border: 1px solid var(--dv-hairline);
  border-radius: var(--dv-radius-card);
  background: var(--dv-surface);
  -webkit-backdrop-filter: blur(14px);
  backdrop-filter: blur(14px);
}

.dvh :deep(.dvh__stat.is-accented) {
  border-color: var(--dv-accent);
}

.dvh :deep(.dvh__stat-value) {
  font-size: var(--dv-t-stat);
  font-style: italic;
  line-height: 1;
  color: var(--dv-fg);
}

.dvh :deep(.dvh__stat-label) {
  font-size: var(--dv-t-body);
  line-height: 1.2;
  color: var(--dv-fg-muted);
}

/* ── Actions ──────────────────────────────────────────────────────────────── */
/* On a phone the pill unrolls into a card: two full-width rows are reachable
   with a thumb, where the frame's single row would put a label and a button
   across 375px. The radius steps from full to the stat cards' corner — a tall
   stack with fully round ends reads as a lozenge, not a panel. */
.dvh :deep(.dvh__actions) {
  display: flex;
  flex-direction: column;
  gap: calc(0.75 * var(--dv-u));
  padding: calc(1 * var(--dv-u));
  border-radius: var(--dv-radius-card);
  background: var(--dv-ground);
}

.dvh :deep(.dvh__actions-ghost) {
  padding: 0;
  border: 0;
  background: none;
  font-size: var(--dv-t-body);
  line-height: 1.2;
  color: var(--dv-on-ground);
  text-align: left;
  cursor: pointer;
}

.dvh :deep(.dvh__actions-ghost:focus-visible) {
  outline: 2px solid var(--dv-accent);
  outline-offset: 3px;
}

.dvh :deep(.dvh__actions-hover) {
  display: flex;
  width: 100%;
  transform: scale(calc(1 + var(--h) * 0.02));
}

.dvh :deep(.dvh__actions-cta) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: calc(0.5 * var(--dv-u));
  width: 100%;
  height: calc(2.9375 * var(--dv-u));
  padding: 0 calc(1.5 * var(--dv-u));
  border-radius: 9999px;
  background: var(--dv-accent);
  font-size: var(--dv-t-body);
  line-height: 1.2;
  color: var(--dv-on-accent);
  text-decoration: none;
  white-space: nowrap;
}

.dvh :deep(.dvh__actions-dot) {
  flex: 0 0 auto;
  width: calc(0.5625 * var(--dv-u));
  height: calc(0.5625 * var(--dv-u));
  border: 1px solid var(--dv-ground);
  border-radius: 9999px;
  background: var(--dv-surface-solid);
}

/* ── Proof ────────────────────────────────────────────────────────────────── */
.dvh :deep(.dvh__proof) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: calc(3.1875 * var(--dv-u));
  padding: calc(0.125 * var(--dv-u)) calc(0.125 * var(--dv-u)) calc(0.125 * var(--dv-u)) calc(1.5 * var(--dv-u));
  border: 1px solid var(--dv-hairline);
  border-radius: 9999px;
  background: var(--dv-surface);
  -webkit-backdrop-filter: blur(14px);
  backdrop-filter: blur(14px);
}

.dvh :deep(.dvh__proof-label) {
  font-size: var(--dv-t-body);
  line-height: 1.2;
  color: var(--dv-fg);
}

.dvh :deep(.dvh__proof-marks) {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
}

.dvh :deep(.dvh__proof-mark) {
  display: grid;
  place-items: center;
  width: calc(2.9375 * var(--dv-u));
  height: calc(2.9375 * var(--dv-u));
  border: 1px solid var(--dv-hairline-strong);
  border-radius: 9999px;
  background: var(--dv-ground);
  font-size: calc(0.8125 * var(--dv-u));
  line-height: 1;
  color: var(--dv-on-ground);
}

.dvh :deep(.dvh__proof-mark:not(:last-child)) {
  margin-right: calc(-0.75 * var(--dv-u));
}

/* ══ The frame — 1440×800 ════════════════════════════════════════════════════
   Exactly the viewport, never more: the grid caps its scale by height, so the
   composition always fits whole and the page does not scroll here. Every piece
   is placed against this box; the two wrapper divs the mobile column needs drop
   to `display: contents` so their children position against the section
   instead of against a wrapper only the phone layout wanted. */
@media (min-width: 1024px) {
  .dvh {
    display: block;
    height: 100vh;
    padding: 0;
  }

  /* The headline clears SVARA's global navigation, whose logo capsule is a
     fixed 84px tall at a fixed 32px top. That does not scale with `--u`, so on
     a short or narrow window the scaled offset alone would slide under it —
     hence the floor. */
  .dvh :deep(.dvh__headline) {
    position: absolute;
    top: max(calc(9.5 * var(--dv-u)), 132px);
    left: calc(1.875 * var(--dv-u));
    width: calc(55 * var(--dv-u));
  }

  .dvh :deep(.dvh__copy),
  .dvh :deep(.dvh__copy-text) {
    display: contents;
  }

  .dvh :deep(.dvh__rule) {
    position: absolute;
    top: calc(24.3125 * var(--dv-u));
    left: calc(1.875 * var(--dv-u));
    height: calc(15 * var(--dv-u));
  }

  .dvh :deep(.dvh__lead) {
    position: absolute;
    top: calc(24.3125 * var(--dv-u));
    left: calc(3.875 * var(--dv-u));
    width: calc(25.6875 * var(--dv-u));
  }

  .dvh :deep(.dvh__body) {
    position: absolute;
    top: calc(34.5625 * var(--dv-u));
    left: calc(3.875 * var(--dv-u));
    width: calc(25.6875 * var(--dv-u));
  }

  .dvh :deep(.dvh__stats) {
    position: absolute;
    top: calc(24.3125 * var(--dv-u));
    right: calc(1.875 * var(--dv-u));
  }

  .dvh :deep(.dvh__stat) {
    width: calc(11.875 * var(--dv-u));
    padding: calc(1.5 * var(--dv-u));
  }

  .dvh :deep(.dvh__actions) {
    position: absolute;
    bottom: var(--dv-floor);
    left: calc(1.875 * var(--dv-u));
    flex-direction: row;
    align-items: center;
    gap: calc(0.6875 * var(--dv-u));
    padding: calc(0.125 * var(--dv-u)) calc(0.125 * var(--dv-u)) calc(0.125 * var(--dv-u)) calc(2 * var(--dv-u));
    border-radius: 9999px;
  }

  .dvh :deep(.dvh__actions-hover) {
    width: auto;
  }

  .dvh :deep(.dvh__actions-cta) {
    width: auto;
  }

  .dvh :deep(.dvh__proof) {
    position: absolute;
    right: calc(1.875 * var(--dv-u));
    bottom: var(--dv-floor);
    width: calc(24.25 * var(--dv-u));
  }

  .dvh :deep(.dvh__proof-label) {
    width: calc(13.8125 * var(--dv-u));
  }
}
</style>
