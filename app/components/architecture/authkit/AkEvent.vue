<script setup lang="ts">
// The event chain as a glass card holding a numbered sequence — one detection
// travelling the whole stack. Each step is a badge on a hairline rail.
import { ref, computed } from 'vue'
import AkHead from './AkHead.vue'
import { AK_EVENT } from '~~/lib/architecture/authkit'
import { useScrollScrub } from '~/composables/useScrollScrub'

// MOTION: the whole point of this section is that a signal does not wait. The
// detection travels the ten steps as the section scrolls, each step resolving
// behind it — the chain animates the sentence it is making.
const chain = ref<HTMLElement | null>(null)
const { progress } = useScrollScrub(chain, { start: 'top 74%', end: 'bottom 64%' })
const reached = computed(() => progress.value * AK_EVENT.steps.length)
</script>

<template>
  <section class="ak-section ak-event">
    <div class="ak-wrap">
      <AkHead :eyebrow="AK_EVENT.eyebrow" :headline="AK_EVENT.headline" :body="AK_EVENT.body" />
      <div class="ak-card ak-event__card">
        <ol ref="chain" class="ak-event__chain">
          <span class="ak-event__rail" aria-hidden="true" />
          <span class="ak-event__signal" :style="{ transform: `scaleX(${progress})` }" aria-hidden="true" />
          <li
            v-for="(s, i) in AK_EVENT.steps" :key="s"
            class="ak-event__step"
            :class="{ 'is-lit': reached > i, 'is-here': Math.floor(reached) === i }"
          >
            <span class="ak-event__n">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="ak-event__label">{{ s }}</span>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
