<script setup lang="ts">
// AUTH-FORM MODAL CARD + TEXT INPUT + PROVIDER BUTTON + VIOLET CTA.
//
// The reference calls this "the headline product": a 16px card on rgba(5,6,15,0.97)
// with the three-layer shadow stack, holding inset text inputs, the one violet submit,
// an OR divider, and full-width provider buttons with a left-aligned icon.
//
// Rendered here with the content an architecture page actually has to offer — a route
// to the reference architecture and to the people who build on it. It posts nowhere:
// there is no endpoint, so submitting acknowledges locally rather than silently
// dropping what someone typed.
import { ref } from 'vue'

const email = ref('')
const company = ref('')
const sent = ref(false)
</script>

<template>
  <form class="ak-auth" @submit.prevent="sent = true">
    <header class="ak-auth__head">
      <span class="ak-logo">
        <span class="ak-logo__diamond" aria-hidden="true" />
        <span class="ak-logo__word">SVARA</span>
      </span>
      <h3 class="ak-auth__title">Get the reference architecture</h3>
      <p class="ak-auth__sub">The full stack, layer by layer.</p>
    </header>

    <label class="ak-sr" for="ak-email">Work email</label>
    <input id="ak-email" v-model="email" class="ak-input" type="email" placeholder="you@company.com" autocomplete="email">

    <label class="ak-sr" for="ak-company">Company</label>
    <input id="ak-company" v-model="company" class="ak-input" type="text" placeholder="Company" autocomplete="organization">

    <button type="submit" class="ak-submit">Continue</button>

    <p class="ak-or"><span>or</span></p>

    <button type="button" class="ak-provider">
      <svg
viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor"
           stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="3.4" /><path d="M4.5 20c.6-3.6 3.7-5.6 7.5-5.6s6.9 2 7.5 5.6" />
      </svg>
      Talk to a solution architect
    </button>
    <button type="button" class="ak-provider">
      <svg
viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor"
           stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="3.5" y="5" width="17" height="15" rx="2.5" /><path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" />
      </svg>
      Book a technical review
    </button>

    <p v-if="sent" class="ak-auth__status" role="status">
      Nothing was sent — this form has no endpoint wired up yet.
    </p>
  </form>
</template>
