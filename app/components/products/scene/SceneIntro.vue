<script setup lang="ts">
// SCENE 01 — the opening (§10).
//
// No dashboard yet, no card, no CTA button. Two enormous lightweight words at the
// vertical centre, a hairline, and the smallest possible amount of supporting
// copy pinned to the bottom edge. The whole point is that the page arrives before
// it explains itself.
//
// Copy is SVARA's own: the ten-platform architecture the rest of the film walks
// through, taken from the products catalogue rather than written for effect.
import { computed, ref } from 'vue'
import { SVARA_OS } from '~/utils/svara-os'
import { useSceneProgress, ramp, smoother } from '~/composables/useSceneProgress'
import type { Beat } from './scene-sequence'
import RevealText from './RevealText.vue'
import RevealItem from './RevealItem.vue'

const props = defineProps<{ beat: Beat }>()

const win = computed<[number, number]>(() => [0, props.beat.end * 0.62])

const words = ref<HTMLElement | null>(null)
const scrollCue = ref<HTMLElement | null>(null)

// The title block sinks slowly as you begin to scroll, so the first movement of
// the film is a camera move rather than a section change.
useSceneProgress((p) => {
  const t = smoother(ramp(p, 0, props.beat.end))
  if (words.value) {
    words.value.style.transform = `translate3d(0, ${(-t * 90).toFixed(1)}px, 0) scale(${(1 - t * 0.06).toFixed(4)})`
  }
  if (scrollCue.value) scrollCue.value.style.opacity = String(Math.max(0, 1 - t * 4))
})

const count = SVARA_OS.length
</script>

<template>
  <div class="si">
    <div ref="words" class="si__words">
      <RevealText text="Product" :window="win" variant="letter" tag="h1" class="si__word ps-display" />
      <RevealText text="Intelligence" :window="win" variant="letter" tag="p" class="si__word si__word--lite ps-display" :delay="240" />
    </div>

    <footer class="si__foot">
      <RevealItem :window="win" :delay="880" class="si__rule ps-rule-h" />
      <div class="si__foot-row">
        <RevealText
          :text="`${count} intelligence platforms. One engineered stack. Scroll to move through it.`"
          :window="win"
          variant="word"
          tag="p"
          class="si__lead ps-copy"
          :delay="960"
        />
        <RevealItem :window="win" :delay="1120" class="si__meta">
          <span class="ps-label">SVARA</span>
          <span class="ps-label ps-label--blue">Enterprise Intelligence OS</span>
        </RevealItem>
      </div>
    </footer>

    <div ref="scrollCue" class="si__cue">
      <span class="ps-label">Scroll</span>
      <span class="si__cue-line" aria-hidden="true" />
    </div>
  </div>
</template>

<style scoped>
.si { position: absolute; inset: 0; padding: 0 clamp(22px, 4vw, 72px) clamp(22px, 3.4vh, 44px); }

.si__words {
  position: absolute;
  top: 50%;
  left: clamp(22px, 4vw, 72px);
  right: clamp(22px, 4vw, 72px);
  translate: 0 -54%;
  will-change: transform;
}

.si__word {
  font-size: clamp(52px, 12.6vw, 214px);
  font-weight: 200;
  letter-spacing: -0.055em;
}
.si__word--lite { color: var(--ps-faint); }

.si__foot { position: absolute; inset-inline: clamp(22px, 4vw, 72px); bottom: clamp(22px, 3.4vh, 44px); }
.si__rule { margin-bottom: clamp(14px, 2vh, 24px); }
.si__foot-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: clamp(20px, 4vw, 64px);
}
.si__lead { max-width: 520px; }
.si__meta { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; text-align: right; }

.si__cue {
  position: absolute;
  right: clamp(22px, 4vw, 72px);
  top: 50%;
  translate: 0 -50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  writing-mode: vertical-rl;
}
.si__cue-line {
  width: 1px;
  height: 54px;
  background: linear-gradient(180deg, var(--ps-line), transparent);
}

@media (max-width: 900px) {
  /* 15.5vw put "INTELLIGENCE" ~90px past the right edge of a 390px phone, where
     the pinned scene's `overflow: hidden` simply cut the word off. Sized so the
     longest word in the headline fits the gutters at the narrowest supported
     viewport. */
  .si__word { font-size: clamp(30px, 11.8vw, 84px); }
  .si__foot-row { flex-direction: column; align-items: flex-start; gap: 14px; }
  .si__meta { align-items: flex-start; text-align: left; }
  .si__cue { display: none; }
}
</style>
