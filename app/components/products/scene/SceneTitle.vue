<script setup lang="ts">
// SCENE TITLE — the transition between two systems (§14).
//
// One enormous, very lightweight word crossing the frame while the outgoing
// dashboard drifts away and the incoming one is already rising out of depth
// behind it. It reads as a title sequence, not a section heading: the word
// arrives tight and defocused, opens out as it settles, and leaves by expanding
// its letter-spacing and dissolving — depth and typography, no flying colour.
//
// Driven continuously by the scroll rather than by a boolean, because the whole
// point of the beat is that scrolling IS the transition.
import { ref } from 'vue'
import { useSceneProgress, ramp, smooth, smoother, clamp01 } from '~/composables/useSceneProgress'
import type { Beat } from './scene-sequence'

const props = defineProps<{
  beat: Beat
  word: string
  line: string
  index: string
}>()

const root = ref<HTMLElement | null>(null)
const wordEl = ref<HTMLElement | null>(null)
const lineEl = ref<HTMLElement | null>(null)

const { start, end } = props.beat
const len = end - start
// Overlaps its neighbours on both sides so the hand-off is a dissolve.
const from = start - len * 0.34
const to = end + len * 0.34

useSceneProgress((p) => {
  const node = root.value
  if (!node) return
  const t = ramp(p, from, to)
  if (t <= 0 || t >= 1) {
    if (node.style.visibility !== 'hidden') {
      node.style.visibility = 'hidden'
      node.style.opacity = '0'
    }
    return
  }
  node.style.visibility = 'visible'

  // Enter over the first 42%, hold, leave over the last 38%.
  const enter = smoother(ramp(t, 0, 0.42))
  const exit = smoother(ramp(t, 0.62, 1))
  const opacity = clamp01(enter * (1 - exit))
  node.style.opacity = String(opacity)

  const w = wordEl.value
  if (w) {
    // Tracking opens as it arrives and keeps opening as it leaves.
    const track = -0.055 + enter * 0.045 + exit * 0.1
    const blur = (1 - enter) * 16 + exit * 20
    const scale = 0.94 + enter * 0.06 + exit * 0.05
    const y = (1 - enter) * 40 - exit * 46
    w.style.letterSpacing = `${track.toFixed(4)}em`
    w.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`
    w.style.filter = blur > 0.15 ? `blur(${blur.toFixed(2)}px)` : 'none'
  }

  const l = lineEl.value
  if (l) {
    const lt = smooth(ramp(t, 0.16, 0.5))
    l.style.opacity = String(clamp01(lt * (1 - exit)))
    l.style.transform = `translate3d(0, ${((1 - lt) * 18).toFixed(2)}px, 0)`
  }
})
</script>

<template>
  <div ref="root" class="st" aria-hidden="true">
    <span class="st__index ps-label">{{ index }}</span>
    <span ref="wordEl" class="st__word">{{ word }}</span>
    <span ref="lineEl" class="st__line ps-copy">{{ line }}</span>
  </div>
</template>

<style scoped>
.st {
  position: absolute;
  inset: 0;
  z-index: 12; /* over the dashboards — the word passes in front of the scene */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(10px, 1.4vh, 20px);
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  padding-inline: clamp(20px, 5vw, 80px);
  text-align: center;
}

.st__index { color: var(--ps-blue); }

.st__word {
  display: block;
  font-family: 'SVARA Display', var(--font-sans);
  font-size: clamp(52px, 12.5vw, 230px);
  font-weight: 200;
  line-height: 0.86;
  letter-spacing: -0.05em;
  text-transform: uppercase;
  color: var(--ps-navy);
  white-space: nowrap;
  will-change: transform, filter, letter-spacing;
}

.st__line {
  max-width: 40ch;
  opacity: 0;
  color: var(--ps-muted);
  will-change: transform, opacity;
}

@media (max-width: 900px) {
  .st__word { font-size: clamp(38px, 15vw, 88px); white-space: normal; }
}

@media (prefers-reduced-motion: reduce) {
  .st__word, .st__line { filter: none !important; }
}
</style>
