<script setup lang="ts">
// Staggered text — the headline arrives a letter at a time from the left, the
// paragraphs a word at a time from below, both unblurring as they land. Two
// halves of one move, which is what keeps them reading as a single entrance
// rather than two effects.
//
// One component owns every unit's spring and writes all of them in a single
// ticker callback, so a 26-letter headline costs one subscriber, not 26.
//
// The split text is aria-hidden and a plain-text copy sits beside it: the
// visible glyphs are separate elements at opacity 0 until they land, which is
// not something a screen reader should have to reassemble.
import { computed, ref, watch } from 'vue'
import { REVEAL_SPRING, Spring } from '~~/lib/motion/spring'
import { useTicker } from '~/composables/useTicker'

const props = withDefaults(defineProps<{
  as?: string
  text: string
  /** Trailing accent run, rendered italic and split on the same timeline. */
  accent?: string
  split?: 'letter' | 'word'
  /** ms after the reveal signal, before the first unit moves. */
  delay?: number
  enabled?: boolean
  instant?: boolean
}>(), {
  as: 'p',
  accent: '',
  split: 'word',
  delay: 0,
  enabled: false,
  instant: false,
})

/** ms between neighbouring units. */
const STAGGER = { letter: 26, word: 45 } as const

interface Word {
  text: string
  characters: string[]
  accent: boolean
}

/**
 * Words are the layout unit even when letters are the animation unit: each word
 * is an unbreakable inline-block, so a line can only break *between* words.
 * Splitting straight to letters would let a line break mid-word.
 */
const words = computed<Word[]>(() => {
  const toWords = (run: string, accent: boolean): Word[] =>
    run.split(/\s+/).filter(Boolean).map((text) => ({ text, characters: [...text], accent }))

  return [...toWords(props.text, false), ...toWords(props.accent, true)]
})

const plain = computed(() => words.value.map((word) => word.text).join(' '))

/** How many springs this run needs — one per animated unit, in document order. */
const unitCount = computed(() =>
  props.split === 'letter'
    ? words.value.reduce((total, word) => total + word.characters.length, 0)
    : words.value.length,
)

const root = ref<HTMLElement | null>(null)
const settled = ref(false)

let springs: Spring[] = []

function units(): NodeListOf<HTMLElement> | undefined {
  return root.value?.querySelectorAll<HTMLElement>('[data-unit]')
}

watch(() => [props.enabled, props.instant, unitCount.value] as const, ([enabled, instant]) => {
  if (instant) {
    springs = []
    settled.value = true
    units()?.forEach((node) => node.style.setProperty('--p', '1'))
    return
  }
  if (!enabled || springs.length) return

  const step = STAGGER[props.split]
  springs = Array.from({ length: unitCount.value }, (_, index) => {
    const spring = new Spring(0, REVEAL_SPRING, props.delay + index * step)
    spring.setTarget(1)
    return spring
  })
}, { immediate: true })

useTicker((dt) => {
  if (!springs.length) return

  const nodes = units()
  if (!nodes) return

  let allSettled = true
  springs.forEach((spring, index) => {
    const value = spring.advance(dt)
    nodes[index]?.style.setProperty('--p', String(value))
    if (!spring.isSettled) allSettled = false
  })

  if (!allSettled) return
  // Settled: drop the springs and let the class clear the transform and blur,
  // so finished text stops carrying a compositing layer.
  springs = []
  settled.value = true
})
</script>

<template>
  <component :is="as" ref="root" class="dv-text" :class="{ 'is-settled': settled }">
    <span class="dv-text__sr">{{ plain }}</span>
    <span class="dv-text__split" aria-hidden="true"><template
      v-for="(word, wordIndex) in words"
      :key="`${wordIndex}-${word.text}`"
    ><component
      :is="word.accent ? 'i' : 'span'"
      class="dv-text__word"
    ><span
      v-for="(character, characterIndex) in (split === 'letter' ? word.characters : [word.text])"
      :key="characterIndex"
      data-unit
      class="dv-text__unit"
      :class="`dv-text__unit--${split}`"
      style="--p: 0"
    >{{ character }}</span></component><template v-if="wordIndex < words.length - 1">{{ ' ' }}</template></template></span>
  </component>
</template>

<style>
/* Unscoped for the same reason as SpringIn — `--p` is written per unit and the
   `dv-text` prefix is the namespace. */
.dv-text {
  position: relative;
}

/* The accessible copy: present to assistive tech, never painted. */
.dv-text__sr {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}

/* `pre-wrap` keeps the single space between words as a real, breakable text
   node — which is the only break opportunity in a row of inline-blocks. */
.dv-text__split {
  display: block;
  white-space: pre-wrap;
}

/* Unbreakable, so a line never splits a word between two of its letters. */
.dv-text__word {
  display: inline-block;
  vertical-align: top;
  white-space: pre;
}

.dv-text__unit {
  display: inline-block;
  /* Baseline-aligned inline-blocks grow the line box by the strut's descender,
     which would break `line-height: 1` on the display headline. */
  vertical-align: top;
  opacity: var(--p);
  will-change: transform, opacity, filter;
}

/* Letters slide in from the left; words rise from below. Blur is in px, not
   grid units — it is an optical amount, not a measured one. */
.dv-text__unit--letter {
  transform: translate3d(calc((1 - var(--p)) * -1.25 * var(--dv-u, 1rem)), 0, 0);
  filter: blur(calc((1 - var(--p)) * 10px));
}

.dv-text__unit--word {
  transform: translate3d(0, calc((1 - var(--p)) * 0.875 * var(--dv-u, 1rem)), 0);
  filter: blur(calc((1 - var(--p)) * 8px));
}

.dv-text.is-settled .dv-text__unit {
  opacity: 1;
  transform: none;
  filter: none;
  will-change: auto;
}
</style>
