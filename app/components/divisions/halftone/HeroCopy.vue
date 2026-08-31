<script setup lang="ts">
// The rule and the two paragraphs hanging off it.
//
// The copy rises a word at a time, unblurring as it settles — the same move as
// the headline turned through ninety degrees, which is what keeps the two
// reading as one entrance rather than two effects.
//
// Copy is the Content Bible's, verbatim: the teaser as the lead, and the
// divisions page's own standing description as the body.
import SpringIn from './SpringIn.vue'
import SpringText from './SpringText.vue'
import { REVEAL_DELAY } from './reveal'
import { useEntrance } from '~/composables/useEntrance'
import { homeSection04 } from '~~/lib/content/home'

const { enabled, instant } = useEntrance()

const BODY = 'SVARA operates through six specialized technology divisions engineered to solve every layer of enterprise transformation — from artificial intelligence and simulation to software, infrastructure and digital growth.'
</script>

<template>
  <div class="dvh__copy">
    <!-- Drawn downward from the top, so it reads as the copy's spine arriving
         rather than a line fading up. -->
    <SpringIn
      as="span"
      variant="scale-y"
      class="dvh__rule"
      aria-hidden="true"
      :delay="REVEAL_DELAY.rule"
      :enabled="enabled"
      :instant="instant"
    />

    <div class="dvh__copy-text">
      <SpringText
        as="p"
        class="dvh__lead"
        :text="homeSection04.teaser"
        split="word"
        :delay="REVEAL_DELAY.lead"
        :enabled="enabled"
        :instant="instant"
      />

      <SpringText
        as="p"
        class="dvh__body"
        :text="BODY"
        split="word"
        :delay="REVEAL_DELAY.body"
        :enabled="enabled"
        :instant="instant"
      />
    </div>
  </div>
</template>
