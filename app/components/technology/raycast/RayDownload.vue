<script setup lang="ts">
// DOWNLOAD BUTTON GROUP + INSET INPUT FIELD + FOOTER META STRIP.
//
// The reference's closing pattern: two neutral filled buttons side by side, each with
// a 15px glyph and Iron text on a Mist fill — the system has no chromatic CTA — with
// the version metadata beneath in monospace, separated by vertical pipes.
//
// The inset input is the reference's Text Input: an 8px radius on a 5% white fill that
// reads as a well you can type into. It posts nowhere — there is no backend here, so
// submitting just acknowledges locally.
import { ref } from 'vue'
import { RAY_META, RAY_CTA } from '~~/lib/technology/raycast'

const email = ref('')
const sent = ref(false)

function onSubmit(): void {
  // No endpoint: this is the design's component with SVARA content, and shipping a
  // form that silently drops what people type would be worse than saying so.
  sent.value = true
}
</script>

<template>
  <div class="ray-dl">
    <form class="ray-dl__form" @submit.prevent="onSubmit">
      <label class="ray-sr" for="ray-brief-email">Work email</label>
      <input
        id="ray-brief-email"
        v-model="email"
        class="ray-input"
        type="email"
        name="email"
        placeholder="you@company.com"
        autocomplete="email"
      >
      <button type="submit" class="ray-btn ray-btn--fill">
        <svg
viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor"
             stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 3v11m0 0 4-4m-4 4-4-4M4 19h16" />
        </svg>
        Get the architecture brief
      </button>
    </form>

    <div class="ray-actions">
      <NuxtLink :to="RAY_CTA.primary.to" class="ray-btn ray-btn--fill">
        <svg
viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor"
             stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M4 6.5h16M4 12h16M4 17.5h10" />
        </svg>
        {{ RAY_CTA.primary.label }}
      </NuxtLink>
      <NuxtLink :to="RAY_CTA.secondary.to" class="ray-btn ray-btn--fill">
        <svg
viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor"
             stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
          <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
        </svg>
        {{ RAY_CTA.secondary.label }}
      </NuxtLink>
    </div>

    <p v-if="sent" class="ray-dl__status" role="status">
      Nothing was sent — this brief has no endpoint wired up yet.
    </p>

    <p class="ray-meta">
      <template v-for="(m, i) in RAY_META" :key="m">
        <span>{{ m }}</span><span v-if="i < RAY_META.length - 1" class="ray-meta__pipe" aria-hidden="true">|</span>
      </template>
    </p>
  </div>
</template>
