<script setup lang="ts">
// AUTH-FORM MODAL CARD + TEXT INPUT + PROVIDER BUTTON + VIOLET CTA.
//
// The reference calls this "the headline product": a 16px card on rgba(5,6,15,0.97)
// with the three-layer shadow stack, holding inset text inputs, the one violet submit,
// an OR divider, and full-width provider buttons with a left-aligned icon.
//
// Rendered here with the content an architecture page actually has to offer — a route
// to the reference architecture and to the people who build on it.
//
// IT NOW POSTS. The card used to acknowledge locally and say so, because there was
// no endpoint. It sends through the same FormSubmit inbox the contact page uses
// (see app/pages/contact.vue), so a request from here lands beside every other
// enquiry rather than in a second system.
import { computed, ref } from 'vue'

const email = ref('')
const company = ref('')
/** Honeypot: invisible to people, irresistible to bots. Handed to FormSubmit's
 *  own `_honey`, exactly as the contact page does. */
const companyUrl = ref('')

const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')
const errorMsg = ref('')
const attempted = ref(false)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const emailError = computed(() => {
  const v = email.value.trim()
  if (!v) return 'Enter your work email.'
  if (!EMAIL_RE.test(v)) return 'Enter a valid email address.'
  return ''
})

/** The same inbox and the same contract as the contact page. One endpoint, so
 *  every reply is written from one place. */
const FORMSUBMIT = 'https://formsubmit.co/ajax/contact@svaratechfusion.com'

async function submit(): Promise<void> {
  attempted.value = true
  errorMsg.value = ''
  if (emailError.value) return
  // Also the duplicate-submission guard: the button is :disabled while sending.
  status.value = 'sending'

  // FormData built explicitly from the model rather than from the form element:
  // `new FormData(formEl)` would need a `name` on every input, and the markup
  // stays untouched this way.
  const fd = new FormData()
  fd.append('email', email.value.trim())
  fd.append('company', company.value.trim())
  fd.append('request', 'Reference architecture')
  fd.append('source', '/architecture')

  fd.append('_subject', 'SVARA — Reference architecture request')
  fd.append('_template', 'table')
  // Replying to the notification answers the visitor, not FormSubmit.
  fd.append('_replyto', email.value.trim())
  // Required, not optional: without it FormSubmit interrupts with its own captcha
  // page, which would replace the acknowledgement this card owns.
  fd.append('_captcha', 'false')
  fd.append('_honey', companyUrl.value)

  try {
    const res = await fetch(FORMSUBMIT, {
      method: 'POST',
      body: fd,
      headers: { Accept: 'application/json' },
    })
    const data = await res.json().catch(() => null) as { success?: string | boolean, message?: string } | null
    // FormSubmit returns `success` as the STRING "true", so a truthiness check on
    // it alone would also pass for "false". Compare against both forms.
    const ok = res.ok && (data?.success === true || String(data?.success) === 'true')
    if (!ok) throw new Error(data?.message || `Submission failed (${res.status})`)
    status.value = 'success'
  }
  catch (e: unknown) {
    status.value = 'error'
    const err = e as { message?: string, name?: string }
    // A network-level failure arrives as TypeError("Failed to fetch"), which is
    // not a sentence to show anyone. Only FormSubmit's own message is worth
    // passing through; everything else gets a way forward instead.
    errorMsg.value = err?.name === 'TypeError' || !err?.message
      ? 'Could not reach the server. Please try again, or email contact@svaratechfusion.com.'
      : err.message
  }
}
</script>

<template>
  <form class="ak-auth" novalidate @submit.prevent="submit">
    <header class="ak-auth__head">
      <span class="ak-logo">
        <span class="ak-logo__diamond" aria-hidden="true" />
        <span class="ak-logo__word">SVARA</span>
      </span>
      <h3 class="ak-auth__title">Get the reference architecture</h3>
      <p class="ak-auth__sub">The full stack, layer by layer.</p>
    </header>

    <label class="ak-sr" for="ak-email">Work email</label>
    <input
      id="ak-email" v-model="email" class="ak-input" type="email" placeholder="you@company.com"
      autocomplete="email" required
      :aria-invalid="attempted && !!emailError" :disabled="status === 'sending' || status === 'success'"
    >

    <label class="ak-sr" for="ak-company">Company</label>
    <input
      id="ak-company" v-model="company" class="ak-input" type="text" placeholder="Company"
      autocomplete="organization" :disabled="status === 'sending' || status === 'success'"
    >

    <!-- The bot trap. Hidden from people, left in the tab order's dead end. -->
    <label class="ak-sr" for="ak-company-url">Company URL</label>
    <input id="ak-company-url" v-model="companyUrl" class="ak-sr" type="text" tabindex="-1" autocomplete="off" aria-hidden="true">

    <button type="submit" class="ak-submit" :disabled="status === 'sending' || status === 'success'">
      {{ status === 'sending' ? 'Sending…' : status === 'success' ? 'Sent' : 'Continue' }}
    </button>

    <p class="ak-or"><span>or</span></p>

    <NuxtLink to="/contact#form" class="ak-provider">
      <svg
        viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor"
        stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
      >
        <circle cx="12" cy="8" r="3.4" /><path d="M4.5 20c.6-3.6 3.7-5.6 7.5-5.6s6.9 2 7.5 5.6" />
      </svg>
      Talk to a solution architect
    </NuxtLink>
    <NuxtLink to="/contact#form" class="ak-provider">
      <svg
        viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor"
        stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
      >
        <rect x="3.5" y="5" width="17" height="15" rx="2.5" /><path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" />
      </svg>
      Book a technical review
    </NuxtLink>

    <p v-if="attempted && emailError && status !== 'success'" class="ak-auth__status ak-auth__status--bad" role="alert">
      {{ emailError }}
    </p>
    <p v-else-if="status === 'success'" class="ak-auth__status ak-auth__status--ok" role="status">
      Thank you — we have your request and will send the reference architecture to {{ email.trim() }}.
    </p>
    <p v-else-if="status === 'error'" class="ak-auth__status ak-auth__status--bad" role="alert">
      {{ errorMsg }}
    </p>
  </form>
</template>
