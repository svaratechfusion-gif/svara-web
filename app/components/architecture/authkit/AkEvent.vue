<script setup lang="ts">
// The event chain as a glass card holding a numbered sequence — one detection
// travelling the whole stack. Each step is a badge on a hairline rail.
import AkHead from './AkHead.vue'
import { AK_EVENT } from '~~/lib/architecture/authkit'
</script>

<template>
  <section class="ak-section ak-event">
    <div class="ak-wrap">
      <AkHead :eyebrow="AK_EVENT.eyebrow" :headline="AK_EVENT.headline" :body="AK_EVENT.body" />
      <div class="ak-card ak-event__card">
        <ol class="ak-event__chain">
          <li v-for="(s, i) in AK_EVENT.steps" :key="s" class="ak-event__step">
            <span class="ak-event__n">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="ak-event__label">{{ s }}</span>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
