<script setup lang="ts">
// SECTION 4 — why the category holds.
//
// The reference's four-item grid maps exactly onto the four thesis components
// in the Content Bible (Category Creation · Platform Business Model · Market
// Timing · Competitive Moat), so the copy is read from there verbatim.
import { investorsContent } from '~~/lib/content/investors'

const VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095750_32a52ce0-2005-45c9-9093-41f03fde9530.mp4'

const ITEMS = investorsContent.architecture.components
</script>

<template>
  <section class="syn-adapt">
    <video class="syn-adapt__video" :src="VIDEO" autoplay muted loop playsinline preload="auto" aria-hidden="true" />

    <div class="syn-adapt__top">
      <h2 class="syn-adapt__heading">Category<br>Definition</h2>
      <p class="syn-adapt__lead">
        Category creators capture disproportionate value — Salesforce in CRM, Workday in HCM,
        Palantir in AI analytics. SVARA defines and owns Enterprise Intelligence Infrastructure.
      </p>
    </div>

    <div class="syn-adapt__spacer" aria-hidden="true" />

    <div class="syn-adapt__grid">
      <div v-for="(item, i) in ITEMS" :key="item.name" class="syn-adapt__cell" :style="{ '--d': `${i * 0.1}s` }">
        <h3 class="syn-adapt__cell-title">{{ item.name }}</h3>
        <p class="syn-adapt__cell-body">{{ item.description }}</p>
      </div>
    </div>
  </section>
</template>
