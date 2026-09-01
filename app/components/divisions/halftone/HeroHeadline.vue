<script setup lang="ts">
// The headline and the bar behind it.
//
// Letters arrive one after another from the left, unblurring as they land. The
// line break is the box, not a <br>: at this width the accent word cannot fit
// beside the rest and wraps on its own, and the width is fixed against the
// frame and scaled whole, so the wrap point is the same at every desktop size.
import SpringIn from './SpringIn.vue'
import SpringText from './SpringText.vue'
import { REVEAL_DELAY } from './reveal'
import { useEntrance } from '~/composables/useEntrance'

const { enabled, instant } = useEntrance()
</script>

<template>
  <!-- The display size sits here, not only on the <h1>: the bar below is
       measured in `em`, so it needs the headline's own size to resolve
       against. The <h1> inherits it. -->
  <div class="dvh__headline">
    <!-- An independent bar, not an underline: it overhangs the text on both
         sides and sits low, so it is placed against the frame rather than sized
         to the glyphs. Declared before the heading so the heading paints over
         it. Anchored to the BOTTOM and sized in `em`, which is what lets one
         set of values serve both layouts — it lands on the last line whether
         the headline wraps into two lines or three. -->
    <SpringIn
      as="span"
      variant="scale-x"
      class="dvh__bar"
      aria-hidden="true"
      :delay="REVEAL_DELAY.headlineBar"
      :enabled="enabled"
      :instant="instant"
    />

    <SpringText
      id="divisions-hero-title"
      v-glitch="{ delay: 1.6 }"
      as="h1"
      class="dvh__h1"
      text="Six divisions, one"
      accent="company"
      split="letter"
      :delay="REVEAL_DELAY.headline"
      :enabled="enabled"
      :instant="instant"
    />
  </div>
</template>
