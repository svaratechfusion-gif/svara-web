<script setup lang="ts">
// PLATFORM MAPPING — the reference's Dark Canvas Card at grid scale: ten Iris Shadow
// panels on Iris Border hairlines, each a line-art marker and a platform name.
// The ten platforms are PLATFORM_SURROUND, verbatim; the KPI domains beneath them are
// KPI_DOMAINS. Both are label-only lists — no metric, no claim.
import { PLATFORM_SURROUND, KPI_DOMAINS } from '~/utils/industries-page'
import ImIcon from './ImIcon.vue'

const ICONS = ['eye', 'route', 'cpu', 'layers', 'pulse', 'cube', 'cloud', 'grid', 'bolt', 'chart']
</script>

<template>
  <section class="im-plat" aria-labelledby="im-plat-t">
    <div class="hx-container">
      <header v-reveal class="im-plat__head">
        <p class="hx-eyebrow"><span class="hx-index">→</span> Platform mapping</p>
        <h2 id="im-plat-t" class="hx-title">Ten platforms. <span class="lite">Every environment.</span></h2>
        <p class="hx-lead">The same ten SVARA platforms deploy into every operational environment — what changes is which of them lead.</p>
      </header>

      <ul v-reveal="{ delay: 0.06 }" class="im-plat__grid">
        <li v-for="(p, i) in PLATFORM_SURROUND" :key="p" class="im-plat__card">
          <ImIcon :name="ICONS[i % ICONS.length]" boxed />
          <span class="im-plat__n">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="im-plat__name">{{ p }}</span>
        </li>
      </ul>

      <div v-reveal="{ delay: 0.1 }" class="im-plat__kpi">
        <span class="im-plat__kpi-l hx-mono-label">Operational domains</span>
        <ul class="im-plat__kpi-grid">
          <li v-for="k in KPI_DOMAINS" :key="k">{{ k }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>
