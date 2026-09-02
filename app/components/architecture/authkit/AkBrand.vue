<script setup lang="ts">
// CUSTOMIZATION SWATCH + THEME TOGGLE + LOGO MARK + OUTLINED PILL.
//
// The reference's "Your brand. Your style." section: colour swatch tiles in a row, a
// radius control, a logo picker, and the light/dark segmented toggle — the inspector
// controls that surround its workspace.
//
// Here they are what an architecture actually exposes as choices: the deployment
// grounds it runs on, the density it is drawn at, and the mode it is presented in.
//
// THEY ARE LIVE. In the reference these controls demonstrate the product adapting;
// rendering them as a still demonstrated nothing. Picking a ground re-tints the card,
// the toggle genuinely inverts it to the design's light treatment, and the density
// control redraws it — the section now performs the claim it makes.
import { ref, computed } from 'vue'
import AkHead from './AkHead.vue'
import AkAuthCard from './AkAuthCard.vue'

const swatches = [
  { name: 'Edge', hex: '#663af3' },
  { name: 'Cloud', hex: '#56c2ff' },
  { name: 'Hybrid', hex: '#59d499' },
  { name: 'On-Prem', hex: '#e46d4c' },
]
const DENSITIES = ['Compact', 'Comfortable', 'Spacious'] as const

const ground = ref(0)
const light = ref(false)
const density = ref(1)

const accent = computed(() => swatches[ground.value].hex)
const densityLabel = computed(() => DENSITIES[density.value])
</script>

<template>
  <section class="ak-section ak-brand">
    <div class="ak-wrap">
      <AkHead
        eyebrow="Your architecture. Your ground."
        :headline="['One system,', 'presented your way.']"
        body="The same architecture, deployed on the ground you choose and presented in the language your teams already read."
      />

      <div
        class="ak-brand__stage"
        :class="{ 'is-light': light, [`is-density-${density}`]: true }"
        :style="{ '--ak-accent': accent }"
      >
        <!-- the headline product card, centred -->
        <AkAuthCard />

        <!-- inspector panels, as the reference arranges them around the canvas -->
        <aside class="ak-ws__panel ak-brand__panel ak-brand__panel--tl">
          <span class="ak-ws__panel-l">Ground</span>
          <ul class="ak-swatches">
            <li v-for="(s, i) in swatches" :key="s.name">
              <button
                type="button"
                class="ak-swatch-btn"
                :class="{ 'is-on': ground === i }"
                :aria-pressed="ground === i"
                @click="ground = i"
              >
                <span class="ak-swatch" :style="{ background: s.hex }" aria-hidden="true" />
                <span class="ak-swatch__l">{{ s.name }}</span>
              </button>
            </li>
          </ul>
        </aside>

        <aside class="ak-ws__panel ak-brand__panel ak-brand__panel--tr">
          <span class="ak-ws__panel-l">Mode</span>
          <div class="ak-toggle" role="group" aria-label="Presentation mode">
            <button type="button" class="ak-toggle__seg" :class="{ 'is-on': !light }" :aria-pressed="!light" title="Dark" @click="light = false">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z" /></svg>
              <span class="ak-sr">Dark</span>
            </button>
            <button type="button" class="ak-toggle__seg" :class="{ 'is-on': light }" :aria-pressed="light" title="Light" @click="light = true">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2.2M12 19.3v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6" /></svg>
              <span class="ak-sr">Light</span>
            </button>
          </div>
        </aside>

        <aside class="ak-ws__panel ak-brand__panel ak-brand__panel--bl">
          <span class="ak-ws__panel-l">Density</span>
          <div class="ak-slider">
            <label class="ak-sr" for="ak-density">Density</label>
            <input
              id="ak-density" v-model.number="density" class="ak-slider__input"
              type="range" min="0" max="2" step="1"
            >
            <span class="ak-slider__track" aria-hidden="true">
              <span class="ak-slider__fill" :style="{ width: `${(density / 2) * 100}%` }" />
              <span class="ak-slider__knob" :style="{ left: `${(density / 2) * 100}%` }" />
            </span>
            <span class="ak-slider__v">{{ densityLabel }}</span>
          </div>
        </aside>

        <aside class="ak-ws__panel ak-brand__panel ak-brand__panel--br">
          <span class="ak-ws__panel-l">Mark</span>
          <span class="ak-logo ak-logo--lg">
            <span class="ak-logo__diamond" aria-hidden="true" />
            <span class="ak-logo__word">SVARA</span>
          </span>
          <span class="ak-btn ak-btn--outline">Outlined</span>
        </aside>
      </div>
    </div>
  </section>
</template>
