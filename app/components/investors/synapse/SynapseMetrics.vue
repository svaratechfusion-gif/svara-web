<script setup lang="ts">
// SECTION 3 — the figures.
//
// These are the Content Bible's REAL numbers (lib/content/investors.ts → roi),
// carried here on an explicit decision. The page previously omitted hard
// figures as too strong for SVARA's stage; that was reversed deliberately —
// see the note at the top of pages/investors.vue before changing it back.
import { investorsContent } from '~~/lib/content/investors'

const VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095810_ecea3dd2-fc5e-4e41-8696-4219290b6589.mp4'

// The three headline figures, read off the content file so they cannot drift.
const [tam, segment, , ] = investorsContent.roi.metrics
const roi = investorsContent.roi.metrics.find(m => m.label === 'Customer ROI')

const METRICS = [
  { value: tam?.value ?? '', label: tam?.label ?? '' },
  { value: segment?.value ?? '', label: 'Manufacturing Segment' },
  { value: '300–500%', label: roi ? 'Customer ROI within 18 months' : '' },
]
</script>

<template>
  <section class="syn-metrics">
    <video class="syn-metrics__video" :src="VIDEO" autoplay muted loop playsinline preload="auto" aria-hidden="true" />
    <div class="syn-metrics__inner">
      <p class="syn-metrics__eyebrow">Market Opportunity</p>
      <div class="syn-metrics__grid">
        <div v-for="(m, i) in METRICS" :key="m.label" class="syn-metrics__item" :style="{ '--d': `${i * 0.15}s` }">
          <div class="syn-metrics__value">{{ m.value }}</div>
          <div class="syn-metrics__label">{{ m.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
