<script setup lang="ts">
// REVEAL TEXT — the ONE way copy animates in this experience.
//
// Two variants, both drifting up from below through a blur + opacity dissolve:
//   `letter` — per character, tight stagger. For the display headings.
//   `word`   — per word, looser stagger. For taglines, descriptions, labels.
//
// The exit is the entry played backwards, staggered from the far end — so a block
// folds back the way it came instead of snapping off.
//
// BOTH variants split into WORDS first. Animating a heading letter-by-letter
// means every character becomes an `inline-block`, and a run of inline-blocks is
// breakable at every single one — which wraps headings mid-word ("ONE SY /
// STEM."). Each word is therefore its own unbreakable `inline-block` box, and the
// letters animate inside it; the stagger index still runs across the whole line,
// so the sweep is unbroken even though the wrapping is normal.
//
// Triggering. The overlays are pinned (`position: fixed`), so they never enter or
// leave the viewport: an IntersectionObserver would fire once at mount and never
// again. Instead a scene WINDOW BOOLEAN drives it, which works in both scroll
// directions — scroll progress on its own can't, because it only ever increases
// going forward and could never walk the animation back out.
//
// Accessibility + SEO: the real text is in the server-rendered HTML. The split
// spans carry `aria-hidden` and the container carries the readable label, so a
// screen reader hears one sentence, not one letter at a time.
import { computed } from 'vue'
import { useSceneWindow } from '~/composables/useSceneProgress'

const props = withDefaults(defineProps<{
  text: string
  /** The scene window that plays it in and out. */
  window: [number, number]
  variant?: 'letter' | 'word'
  tag?: string
  /** Hold the whole block behind the one before it, in ms. */
  delay?: number
  /** Per-step stagger, ms. */
  step?: number
  class?: string
}>(), {
  variant: 'word',
  tag: 'p',
  delay: 0,
  step: 0,
})

const active = useSceneWindow(props.window[0], props.window[1])

const stepMs = computed(() => props.step || (props.variant === 'letter' ? 26 : 48))

/**
 * Words, each carrying its animated pieces and the global index of its first
 * piece — so a per-letter stagger keeps sweeping across word boundaries.
 */
const words = computed(() => {
  const raw = props.text.split(/\s+/).filter(Boolean)
  let cursor = 0
  return raw.map((word) => {
    const pieces = props.variant === 'letter' ? [...word] : [word]
    const from = cursor
    cursor += pieces.length
    return { word, pieces, from }
  })
})

const total = computed(() => words.value.reduce((n, w) => n + w.pieces.length, 0))

function delayFor(i: number): string {
  // Entry runs front-to-back; the exit counts down from the end.
  const ms = active.value
    ? props.delay + i * stepMs.value
    : (total.value - 1 - i) * stepMs.value * 0.6
  return `${ms}ms`
}
</script>

<template>
  <component :is="tag" :class="['ps-reveal', props.class, { 'is-in': active }]" :aria-label="text">
    <!-- Between word boxes sits a real space TEXT NODE, not a span. Vue's
         template compiler condenses whitespace between elements away, so a plain
         newline here glues the words together ("ONESYSTEM."); and a span holding
         a space needs `white-space: pre` to survive, which then refuses to
         collapse and indents every wrapped line. A text node does both
         correctly: it wraps, and it disappears at the start of a line. -->
    <template v-for="(w, wi) in words" :key="`${w.from}-${w.word}`"><span
      class="ps-reveal__w"
      aria-hidden="true"
    ><span
      v-for="(piece, j) in w.pieces"
      :key="j"
      class="ps-reveal__p"
      :style="{ transitionDelay: delayFor(w.from + j) }"
    >{{ piece }}</span></span><template v-if="wi < words.length - 1">{{ ' ' }}</template></template>
  </component>
</template>

<style scoped>
.ps-reveal {
  display: block;
  /* The blur has to bleed past the glyph box, so no overflow clip. */
  margin: 0;
}

/* One unbreakable box per word — this is what keeps wrapping normal. */
.ps-reveal__w { display: inline-block; white-space: nowrap; }

.ps-reveal__p {
  display: inline-block;
  opacity: 0;
  transform: translateY(0.62em);
  filter: blur(9px);
  /* Soft and damped — eases up and settles, never snaps or overshoots. */
  transition:
    opacity 0.86s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.86s cubic-bezier(0.16, 1, 0.3, 1),
    filter 0.72s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform, filter;
}

.ps-reveal.is-in .ps-reveal__p {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

@media (prefers-reduced-motion: reduce) {
  .ps-reveal__p {
    opacity: 1;
    transform: none;
    filter: none;
    transition: none;
  }
}
</style>
