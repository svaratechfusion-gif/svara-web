<script setup lang="ts">
/**
 * NoemaHeadline — the split display headline flanking the head, animated
 * letter-by-letter.
 *
 * The two words mirror each other: the LEFT word's letters resolve left→right,
 * the RIGHT word's resolve right→left, each fading up out of a blur and drifting
 * in from its own side. Both are decorative (`aria-hidden`) — the accessible
 * heading is the visually-hidden <h1> in the parent.
 *
 * Layout — two layouts, one tree:
 * - **≥ 720px:** the words are pinned to the left and right edges, vertically
 *   centred, so the head sits between them.
 * - **< 720px:** there is no room to flank the head, so the wrapper becomes a
 *   flow band with one word at each end and the head showing between them. Being
 *   in flow is what keeps the words off the bottom block on a short phone.
 *
 * The reveal is a CSS transition per glyph rather than a spring: every letter
 * follows the same fixed 1300 ms easeOutQuart curve to a known end state, so a
 * per-letter `transition-delay` expresses the whole cascade with no JS clock and
 * no inline transforms to unwind. `prefers-reduced-motion` lands them at once.
 */
import { computed } from 'vue'

const props = defineProps<{
  left: string
  right: string
  /** Has the page's intro beat fired? Flips every glyph to its resolved state. */
  revealed: boolean
}>()

/** Per-letter stagger, ms. */
const STAGGER = 60

interface Glyph { ch: string, delay: number, key: string }

const glyphs = (word: string, reverse: boolean): Glyph[] => {
  const chars = [...word]
  // Spaces don't animate, so they don't consume a stagger slot either.
  const steps = chars.filter(c => c.trim() !== '').length
  let i = 0
  return chars.map((ch, idx) => {
    const isSpace = ch.trim() === ''
    const order = isSpace ? 0 : reverse ? steps - 1 - i++ : i++
    return { ch, delay: order * STAGGER, key: `${idx}-${ch}` }
  })
}

const leftGlyphs = computed(() => glyphs(props.left, false))
const rightGlyphs = computed(() => glyphs(props.right, true))
</script>

<template>
  <div class="nmh" aria-hidden="true">
    <div class="nmh__word nmh__word--left">
      <span
        v-for="g in leftGlyphs"
        :key="g.key"
        class="nmh__g"
        :class="{ 'is-in': revealed }"
        :style="{ '--d': `${g.delay}ms`, '--dir': '-1' }"
      >{{ g.ch === ' ' ? '&nbsp;' : g.ch }}</span>
    </div>

    <div class="nmh__word nmh__word--right">
      <span
        v-for="g in rightGlyphs"
        :key="g.key"
        class="nmh__g"
        :class="{ 'is-in': revealed }"
        :style="{ '--d': `${g.delay}ms`, '--dir': '1' }"
      >{{ g.ch === ' ' ? '&nbsp;' : g.ch }}</span>
    </div>
  </div>
</template>

<style scoped>
.nmh {
  pointer-events: none;
  display: flex;
  min-height: 0;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  padding: 24px 20px;
}

.nmh__word {
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: clamp(30px, 8.5vw, 44px);
  font-weight: 300;
  line-height: 1.1;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: var(--noema-ink, #fff);
}

.nmh__g {
  display: inline-block;
  /* inline-block baseline growth would otherwise break line-height: 1.1 */
  vertical-align: top;
  opacity: 0;
  filter: blur(16px);
  transform: translateX(calc(14px * var(--dir)));
  /* easeOutQuart — reaches zero velocity at the end, so letters glide to a stop
     instead of snapping. */
  transition:
    opacity 1300ms cubic-bezier(0.25, 1, 0.5, 1) var(--d),
    filter 1300ms cubic-bezier(0.25, 1, 0.5, 1) var(--d),
    transform 1300ms cubic-bezier(0.25, 1, 0.5, 1) var(--d);
}

.nmh__g.is-in {
  opacity: 1;
  filter: blur(0);
  transform: translateX(0);
}

@media (min-width: 720px) {
  .nmh {
    position: absolute;
    inset: 0;
    display: block;
    flex: none;
    padding: 0;
  }

  .nmh__word {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: clamp(38px, 4.4vw, 64px);
  }

  .nmh__word--left {
    left: clamp(20px, 2.1vw, 30px);
    justify-content: flex-start;
    text-align: left;
  }

  .nmh__word--right {
    right: clamp(20px, 2.1vw, 30px);
    justify-content: flex-end;
    text-align: right;
  }
}

@media (prefers-reduced-motion: reduce) {
  .nmh__g {
    transition-duration: 1ms;
    transition-delay: 0ms;
  }
}
</style>
