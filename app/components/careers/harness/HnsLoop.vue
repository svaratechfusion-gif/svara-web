<script setup lang="ts">
/**
 * HOW WE BUILD — culture shown as a system, which is the page's existing and
 * correct idea; only its dress changes. The rail keeps the travelling signal dot
 * from the previous build, restyled to the reference's mint, and the steps become
 * the reference's nested Obsidian surface rather than free-floating labels.
 *
 * Mint is this viewport's ONE accent — the reference allows a single accent
 * surface per screen, so nothing else in this band is coloured.
 */
import { ref, computed } from 'vue'

const FLOW = [
  { k: 'Research', body: 'We start from the real problem — on the factory floor, in the field, at the edge.', x: 40 },
  { k: 'Design', body: 'Architecture and interface designed together, deep enough to be definitive.', x: 128 },
  { k: 'Build', body: 'Engineering across the whole stack — sensor to decision, no thin slices.', x: 216 },
  { k: 'Review', body: 'Cross-functional product reviews pressure-test every decision.', x: 304 },
  { k: 'Ship', body: 'Ship, measure, and feed what we learn straight back into research.', x: 392 },
]

const active = ref(0)
const current = computed(() => FLOW[active.value]!)
</script>

<template>
  <div>
    <div class="hns__head">
      <p class="hns__eyebrow">How we build</p>
      <h2 class="hns__h2">Culture is a system.</h2>
      <p class="hns__lede">
        Not perks and posters — a way of working. Every product moves through the
        same loop, and every loop feeds the next.
      </p>
    </div>

    <div class="hns__plate">
      <ClientOnly>
        <svg class="hns__loop-svg" viewBox="0 42 432 88" fill="none" aria-hidden="true">
          <path d="M40 60 H392" stroke="#2e3038" stroke-width="1.2" />
          <path
            d="M392 60 C420 60 420 110 392 110 L40 110 C12 110 12 60 40 60"
            stroke="#2e3038" stroke-width="1" stroke-dasharray="4 4" fill="none"
          />
          <circle r="3" fill="#70dcd3">
            <animateMotion
              dur="4.5s" repeatCount="indefinite"
              path="M40 60 H392 C420 60 420 110 392 110 L40 110 C12 110 12 60 40 60"
            />
          </circle>
          <g v-for="(f, i) in FLOW" :key="f.k">
            <circle
              :cx="f.x" cy="60" :r="active === i ? 7.5 : 5"
              :fill="active === i ? '#70dcd3' : '#0d0e12'"
              :stroke="active === i ? '#70dcd3' : '#d9dae5'" stroke-width="1.2"
            />
          </g>
        </svg>
      </ClientOnly>

      <ul class="hns__loop-steps">
        <li
          v-for="(f, i) in FLOW" :key="f.k"
          class="hns__loop-step" :class="{ 'is-on': active === i }"
          @mouseenter="active = i"
        >
          <span class="hns__loop-n">{{ String(i + 1).padStart(2, '0') }}</span>{{ f.k }}
        </li>
      </ul>

      <p class="hns__loop-say"><b>{{ current.k }}.</b> {{ current.body }}</p>
    </div>
  </div>
</template>
