<script setup lang="ts">
// Per-letter heading reveal: each letter rises from just below, fading up out of a
// soft blur, in an easeOutQuart cascade that starts when the heading scrolls into view.
//
// Words stay unbreakable — letters are inline-block inside an inline-block word — so
// the heading still wraps at spaces and never mid-word. The tag carries the full
// `aria-label`; the letter spans are aria-hidden, so a screen reader reads the heading
// once as text rather than character by character.
//
// A heading CONTAINING A DIGIT renders static. That is a rule from the source design,
// not an oversight: split numerals animate in as a jumble of unrelated glyphs.
import { computed } from 'vue'
import { useRevealCascade } from '~/composables/useRevealCascade'

const props = withDefaults(defineProps<{
  text: string
  tag?: 'h2' | 'h3'
  /** Per-letter target opacity given the letter's 0..1 position; default solid. */
  alpha?: (fraction: number) => number
}>(), { tag: 'h2', alpha: undefined })

const RISE = 16 // px each letter rises from
const BLUR = 8 // px start blur

const hasDigit = computed(() => /\d/.test(props.text))

/** Words, each carrying its letters' global timeline indices. */
const words = computed(() => {
  let i = 0
  return props.text.split(' ').map(word => ({
    word,
    letters: [...word].map(ch => ({ ch, i: i++ })),
  }))
})
const total = computed(() => words.value.reduce((n, w) => n + w.letters.length, 0))

const alphaFor = (i: number): number => {
  if (!props.alpha) return 1
  return props.alpha(total.value > 1 ? i / (total.value - 1) : 0)
}

const { rootRef } = useRevealCascade({
  total: () => total.value,
  apply: (_p, localProg) => {
    const root = rootRef.value
    if (!root) return
    const letters = root.querySelectorAll<HTMLElement>('[data-sl]')
    letters.forEach((el) => {
      const i = Number(el.dataset.sl)
      const lp = localProg(i)
      el.style.opacity = String(alphaFor(i) * lp)
      el.style.transform = `translateY(${RISE * (1 - lp)}px)`
      el.style.filter = `blur(${BLUR * (1 - lp)}px)`
    })
  },
})
</script>

<template>
  <component :is="tag" v-if="hasDigit" class="sx-h">{{ text }}</component>
  <component :is="tag" v-else ref="rootRef" class="sx-h" :aria-label="text">
    <template v-for="(w, wi) in words" :key="wi">
      <span aria-hidden="true" class="sx-h__w">
        <span
          v-for="l in w.letters"
          :key="l.i"
          :data-sl="l.i"
          class="sx-h__l"
        >{{ l.ch }}</span>
      </span><span v-if="wi < words.length - 1" aria-hidden="true">{{ ' ' }}</span>
    </template>
  </component>
</template>
