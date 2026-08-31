<script setup lang="ts">
// CONTACT · Intelligent Contact Form — a five-step conversation:
// Interest → Industry → Company → Business Challenge → Contact Information.
// The form focuses on understanding the business need, then maps onto the
// existing /api/contact contract { name, email, message, inquiryType,
// company_url (honeypot) }. Industry, company, role and challenge are
// composed into `message`; interest becomes `inquiryType`.
import { ref, computed } from 'vue'

const STEPS = ['Interest', 'Industry', 'Company', 'Challenge', 'Contact'] as const
const step = ref(0)

const interests = ['Enterprise solutions', 'Strategic partnership', 'Investor relations', 'Media & press', 'General enquiry']
const industries = ['Manufacturing', 'Energy', 'Logistics', 'Financial services', 'Public sector', 'Other']

const form = ref({
  interest: '',
  industry: '',
  company: '',
  role: '',
  challenge: '',
  name: '',
  email: '',
  company_url: '', // honeypot
})

const state = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')
const errorMsg = ref('')

const canAdvance = computed(() => {
  switch (step.value) {
    case 0: return !!form.value.interest
    case 1: return !!form.value.industry
    case 2: return form.value.company.trim().length > 1
    case 3: return form.value.challenge.trim().length > 4
    case 4: return form.value.name.trim().length > 1 && /.+@.+\..+/.test(form.value.email)
    default: return false
  }
})

function next() { if (canAdvance.value && step.value < STEPS.length - 1) step.value++ }
function back() { if (step.value > 0) step.value-- }

async function submit() {
  if (!canAdvance.value || state.value === 'sending') return
  state.value = 'sending'
  errorMsg.value = ''
  const message = [
    `Interest: ${form.value.interest}`,
    `Industry: ${form.value.industry}`,
    `Company: ${form.value.company}${form.value.role ? ` (${form.value.role})` : ''}`,
    '',
    'Business challenge:',
    form.value.challenge,
  ].join('\n')
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.value.name,
        email: form.value.email,
        message,
        inquiryType: form.value.interest,
        company_url: form.value.company_url,
      },
    })
    state.value = 'sent'
  } catch (e: any) {
    state.value = 'error'
    errorMsg.value = e?.data?.message || 'Something went wrong. Please try again or email us directly.'
  }
}
</script>

<template>
  <section id="form" class="cform">
    <div class="cform__head">
      <p v-reveal class="cform__eyebrow">Start a Conversation</p>
      <h2 v-reveal class="cform__title" data-split>Tell us about your business</h2>
      <p v-reveal class="cform__sub">A few questions help us route your enquiry to the right team and come prepared.</p>
    </div>

    <div v-reveal class="cform__panel">
      <template v-if="state !== 'sent'">
        <ol class="cform__progress" aria-hidden="true">
          <li v-for="(s, i) in STEPS" :key="s" :class="{ 'is-done': i < step, 'is-active': i === step }">
            <span class="cform__dot" />{{ s }}
          </li>
        </ol>

        <div class="cform__body">
          <!-- Step 0 · Interest -->
          <fieldset v-show="step === 0" class="cform__step">
            <legend>What brings you to SVARA?</legend>
            <div class="cform__choices">
              <button
                v-for="opt in interests" :key="opt" type="button"
                class="cform__choice" :class="{ 'is-sel': form.interest === opt }"
                @click="form.interest = opt; next()"
              >{{ opt }}</button>
            </div>
          </fieldset>

          <!-- Step 1 · Industry -->
          <fieldset v-show="step === 1" class="cform__step">
            <legend>Which industry do you operate in?</legend>
            <div class="cform__choices cform__choices--grid">
              <button
                v-for="opt in industries" :key="opt" type="button"
                class="cform__choice" :class="{ 'is-sel': form.industry === opt }"
                @click="form.industry = opt; next()"
              >{{ opt }}</button>
            </div>
          </fieldset>

          <!-- Step 2 · Company -->
          <fieldset v-show="step === 2" class="cform__step">
            <legend>Tell us about your organization</legend>
            <label class="cform__field">
              <span>Company</span>
              <input v-model="form.company" type="text" placeholder="Company name" autocomplete="organization" >
            </label>
            <label class="cform__field">
              <span>Your role <em>(optional)</em></span>
              <input v-model="form.role" type="text" placeholder="e.g. VP Operations" autocomplete="organization-title" >
            </label>
          </fieldset>

          <!-- Step 3 · Challenge -->
          <fieldset v-show="step === 3" class="cform__step">
            <legend>What challenge are you looking to solve?</legend>
            <label class="cform__field">
              <span class="sr-only">Business challenge</span>
              <textarea v-model="form.challenge" rows="5" placeholder="Describe the operational challenge or ambition you'd like to explore with us." />
            </label>
          </fieldset>

          <!-- Step 4 · Contact -->
          <fieldset v-show="step === 4" class="cform__step">
            <legend>Where can we reach you?</legend>
            <label class="cform__field">
              <span>Full name</span>
              <input v-model="form.name" type="text" placeholder="Your name" autocomplete="name" >
            </label>
            <label class="cform__field">
              <span>Work email</span>
              <input v-model="form.email" type="email" placeholder="you@company.com" autocomplete="email" >
            </label>
            <!-- honeypot -->
            <input v-model="form.company_url" class="cform__hp" type="text" tabindex="-1" autocomplete="off" aria-hidden="true" >
          </fieldset>

          <p v-if="state === 'error'" class="cform__error">{{ errorMsg }}</p>

          <div class="cform__actions">
            <button v-if="step > 0" type="button" class="cform__btn cform__btn--ghost" @click="back">Back</button>
            <span class="cform__spacer" />
            <button v-if="step < STEPS.length - 1" type="button" class="cform__btn" :disabled="!canAdvance" @click="next">Continue</button>
            <button v-else type="button" class="cform__btn" :disabled="!canAdvance || state === 'sending'" @click="submit">
              {{ state === 'sending' ? 'Sending…' : 'Submit enquiry' }}
            </button>
          </div>
        </div>
      </template>

      <div v-else class="cform__done">
        <div class="cform__check" aria-hidden="true">✓</div>
        <h3>Thank you — your enquiry is on its way</h3>
        <p>We respond within 24 business hours. If your message requires coordination, we'll let you know.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cform { padding-block: var(--section-y); }
.cform__head { max-width: var(--container-max); margin-inline: auto; padding-inline: var(--container-pad); text-align: center; box-sizing: border-box; }
.cform__eyebrow { margin: 0 0 var(--space-6); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.cform__title { margin: 0; font-size: clamp(28px, 3.4vw, 48px); font-weight: var(--weight-bold); letter-spacing: -0.02em; color: #0d1b3e; }
.cform__sub { margin: var(--space-5) auto 0; max-width: 52ch; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }

.cform__panel {
  max-width: 720px; margin: var(--space-16) auto 0; padding: var(--space-12) var(--space-10);
  border-radius: var(--radius-lg); border: 1px solid var(--color-border); background: var(--color-bg); box-shadow: var(--shadow-med);
  box-sizing: border-box;
}
.cform__progress { list-style: none; display: flex; gap: var(--space-4); margin: 0 0 var(--space-10); padding: 0; flex-wrap: wrap; }
.cform__progress li { display: inline-flex; align-items: center; gap: 7px; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.04em; text-transform: uppercase; color: var(--color-text-faint); }
.cform__dot { width: 8px; height: 8px; border-radius: 50%; background: var(--color-border); transition: background var(--motion-medium) var(--ease-smooth); }
.cform__progress li.is-active { color: #0d1b3e; }
.cform__progress li.is-active .cform__dot { background: var(--color-accent); }
.cform__progress li.is-done .cform__dot { background: #102A5B; }

.cform__step { border: none; margin: 0; padding: 0; min-height: 220px; }
.cform__step legend { padding: 0; margin-bottom: var(--space-6); font-size: var(--type-lead); font-weight: var(--weight-semibold); letter-spacing: -0.01em; color: #0d1b3e; }
.cform__choices { display: flex; flex-direction: column; gap: var(--space-3); }
.cform__choices--grid { display: grid; grid-template-columns: 1fr 1fr; }
.cform__choice {
  text-align: left; padding: var(--space-4) var(--space-5); border-radius: var(--radius-md);
  border: 1px solid var(--color-border); background: var(--color-bg); cursor: pointer;
  font-size: var(--type-body); color: #0d1b3e;
  transition: border-color var(--motion-fast) var(--ease-smooth), background var(--motion-fast) var(--ease-smooth), transform var(--motion-fast) var(--ease-smooth);
}
.cform__choice:hover { border-color: var(--color-accent); transform: translateY(-1px); }
.cform__choice.is-sel { border-color: var(--color-accent); background: #f2f7ff; }

.cform__field { display: block; margin-bottom: var(--space-5); }
.cform__field span { display: block; margin-bottom: 8px; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.04em; text-transform: uppercase; color: var(--color-text-faint); }
.cform__field span em { text-transform: none; font-style: normal; color: var(--color-text-faint); }
.cform__field input, .cform__field textarea {
  width: 100%; box-sizing: border-box; padding: var(--space-4) var(--space-5);
  border: 1px solid var(--color-border); border-radius: var(--radius-md);
  font: inherit; font-size: var(--type-body); color: #0d1b3e; background: var(--color-bg);
  transition: border-color var(--motion-fast) var(--ease-smooth);
}
.cform__field input:focus, .cform__field textarea:focus { outline: none; border-color: var(--color-accent); }
.cform__field textarea { resize: vertical; }
.cform__hp { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; }

.cform__error { margin: 0 0 var(--space-4); font-size: var(--type-small); color: #c0392b; }
.cform__actions { display: flex; align-items: center; gap: var(--space-4); margin-top: var(--space-8); }
.cform__spacer { flex: 1; }
.cform__btn {
  height: 48px; padding-inline: var(--space-7); border: none; border-radius: var(--radius-pill);
  background: #102A5B; color: #fff; font-size: var(--type-small); font-weight: var(--weight-semibold); cursor: pointer;
  transition: background var(--motion-medium) var(--ease-smooth), opacity var(--motion-fast) var(--ease-smooth);
}
.cform__btn:hover:not(:disabled) { background: var(--color-accent); }
.cform__btn:disabled { opacity: 0.4; cursor: not-allowed; }
.cform__btn--ghost { background: transparent; color: var(--color-text-secondary); border: 1px solid var(--color-border); }
.cform__btn--ghost:hover:not(:disabled) { background: var(--color-surface, #f4f8ff); color: #0d1b3e; }

.cform__done { text-align: center; padding: var(--space-10) 0; }
.cform__check { width: 56px; height: 56px; margin: 0 auto var(--space-6); border-radius: 50%; display: grid; place-items: center; background: #102A5B; color: #fff; font-size: 24px; }
.cform__done h3 { margin: 0 0 var(--space-3); font-size: var(--type-h3); font-weight: var(--weight-bold); color: #0d1b3e; }
.cform__done p { margin: 0 auto; max-width: 44ch; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }

.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }

@media (max-width: 620px) {
  .cform__panel { padding: var(--space-8) var(--space-6); }
  .cform__choices--grid { grid-template-columns: 1fr; }
}
</style>
