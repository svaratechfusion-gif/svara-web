<script setup lang="ts">
// The closing block on the design's Deep Glass modal surface, with its outline pill
// buttons. The system's actions are neutral — a frosted ghost fill and a hairline,
// never a chromatic CTA.
import AkHead from './AkHead.vue'
import { AK_CTA } from '~~/lib/architecture/authkit'
</script>

<template>
  <section class="ak-section ak-cta">
    <div class="ak-wrap">
      <div class="ak-modal">
        <AkHead :eyebrow="AK_CTA.eyebrow" :headline="AK_CTA.headline" :body="AK_CTA.body" />
        <div class="ak-actions">
          <NuxtLink :to="AK_CTA.primary.to" class="ak-btn ak-btn--fill">{{ AK_CTA.primary.label }}</NuxtLink>
          <NuxtLink :to="AK_CTA.secondary.to" class="ak-btn">{{ AK_CTA.secondary.label }}</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
