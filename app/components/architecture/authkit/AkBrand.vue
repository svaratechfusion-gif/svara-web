<script setup lang="ts">
// CUSTOMIZATION SWATCH + THEME TOGGLE + LOGO MARK + OUTLINED PILL.
//
// The reference's "Your brand. Your style." section: colour swatch tiles in a row, a
// radius control, a logo picker, and the light/dark segmented toggle — the inspector
// controls that surround its workspace.
//
// Here they are what an architecture actually exposes as choices: the deployment
// grounds it runs on, the density it is drawn at, and the mode it is presented in.
// The controls are a still — the reference renders them as a showcase of what the
// product can look like, not as live settings.
import AkHead from './AkHead.vue'
import AkAuthCard from './AkAuthCard.vue'

const swatches = [
  { name: 'Edge', hex: '#663af3' },
  { name: 'Cloud', hex: '#56c2ff' },
  { name: 'Hybrid', hex: '#59d499' },
  { name: 'On-Prem', hex: '#e46d4c' },
]
</script>

<template>
  <section class="ak-section ak-brand">
    <div class="ak-wrap">
      <AkHead
        eyebrow="Your architecture. Your ground."
        :headline="['One system,', 'presented your way.']"
        body="The same architecture, deployed on the ground you choose and presented in the language your teams already read."
      />

      <div class="ak-brand__stage">
        <!-- the headline product card, centred -->
        <AkAuthCard />

        <!-- inspector panels, as the reference arranges them around the canvas -->
        <aside class="ak-ws__panel ak-brand__panel ak-brand__panel--tl">
          <span class="ak-ws__panel-l">Ground</span>
          <ul class="ak-swatches">
            <li v-for="s in swatches" :key="s.name">
              <span class="ak-swatch" :style="{ background: s.hex }" aria-hidden="true" />
              <span class="ak-swatch__l">{{ s.name }}</span>
            </li>
          </ul>
        </aside>

        <aside class="ak-ws__panel ak-brand__panel ak-brand__panel--tr">
          <span class="ak-ws__panel-l">Mode</span>
          <div class="ak-toggle" role="img" aria-label="Dark mode selected">
            <span class="ak-toggle__seg is-on">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z" /></svg>
            </span>
            <span class="ak-toggle__seg">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2.2M12 19.3v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6" /></svg>
            </span>
          </div>
        </aside>

        <aside class="ak-ws__panel ak-brand__panel ak-brand__panel--bl">
          <span class="ak-ws__panel-l">Density</span>
          <div class="ak-slider" role="img" aria-label="Density set to comfortable">
            <span class="ak-slider__track"><span class="ak-slider__fill" /><span class="ak-slider__knob" /></span>
            <span class="ak-slider__v">Comfortable</span>
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
