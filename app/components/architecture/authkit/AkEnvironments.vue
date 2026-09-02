<script setup lang="ts">
// Two glass cards side by side: where the architecture can be deployed, and what it
// connects to. The design's Glass Card (Feature) — a nearly invisible frost tint with
// elevation from an inset highlight and a soft halo, no hard border.
import AkHead from './AkHead.vue'
import { AK_ENVIRONMENTS, AK_CONNECT } from '~~/lib/architecture/authkit'
</script>

<template>
  <section class="ak-section ak-env">
    <div class="ak-wrap">
      <AkHead :eyebrow="AK_ENVIRONMENTS.eyebrow" :headline="AK_ENVIRONMENTS.headline" :body="AK_ENVIRONMENTS.body" />

      <div class="ak-grid ak-grid--2">
        <div class="ak-card">
          <h3 class="ak-card__title">Deployment targets</h3>
          <ul class="ak-tags">
            <li v-for="t in AK_ENVIRONMENTS.targets" :key="t" class="ak-tag">{{ t }}</li>
          </ul>
        </div>

        <div class="ak-card">
          <h3 class="ak-card__title">{{ AK_CONNECT.headline.join(' ') }}</h3>
          <p class="ak-body ak-card__body">{{ AK_CONNECT.body }}</p>
          <ul class="ak-tags">
            <li v-for="s in AK_CONNECT.surfaces" :key="s" class="ak-tag">{{ s }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
