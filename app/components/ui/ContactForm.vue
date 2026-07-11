<script setup lang="ts">
// Contact form — accessible, progressive-enhancement-friendly. Submits to
// /api/contact (see server/api/contact.post.ts). On no-JS, the form still
// performs a Nitro POST and the server returns JSON; the JS layer just
// surfaces a friendlier status and disables the button during submit.
//
// Honeypot field `company_url` is visually hidden and aria-hidden — bots
// fill it, humans never see it. Server silently drops ut supernatural fills.

interface SubmitState {
  status: "idle" | "submitting" | "success" | "error"
  error?: string
}

const state = reactive<SubmitState>({ status: "idle" })

async function handleSubmit(event: Event) {
  const form = event.target as HTMLFormElement
  const data = new FormData(form)
  const payload = Object.fromEntries(data.entries())

  state.status = "submitting"
  state.error = undefined

  try {
    const res = await $fetch<{ ok: boolean; error?: string }>("/api/contact", {
      method: "POST",
      body: payload,
    })
    if (res.ok) {
      state.status = "success"
      form.reset()
    } else {
      state.status = "error"
      state.error = res.error ?? "Something went wrong. Please try again."
    }
  } catch (err) {
    state.status = "error"
    state.error = (err as { data?: { error?: string } })?.data?.error ?? "Network error. Please try again."
  }
}
</script>

<template>
  <div class="contact-form">
    <div
      v-if="state.status === 'success'"
      class="contact-form__success"
      role="status"
    >
      Thank you — your message has been received. We will respond within 24 business hours.
    </div>

    <form
      v-else
      class="contact-form__form"
      method="POST"
      action="/api/contact"
      @submit.prevent="handleSubmit"
    >
      <div class="contact-form__row">
        <label class="contact-form__label" for="cf-name">Name</label>
        <input
          id="cf-name"
          name="name"
          type="text"
          class="contact-form__input"
          required
          maxlength="120"
          autocomplete="name"
        >
      </div>

      <div class="contact-form__row">
        <label class="contact-form__label" for="cf-email">Email</label>
        <input
          id="cf-email"
          name="email"
          type="email"
          class="contact-form__input"
          required
          maxlength="200"
          autocomplete="email"
        >
      </div>

      <div class="contact-form__row">
        <label class="contact-form__label" for="cf-inquiry">Topic</label>
        <select
          id="cf-inquiry"
          name="inquiryType"
          class="contact-form__input"
        >
          <option value="Other">Choose a topic</option>
          <option value="Partnership">Partnership</option>
          <option value="Investor">Investor relations</option>
          <option value="Press">Media / press</option>
          <option value="General">General</option>
        </select>
      </div>

      <div class="contact-form__row">
        <label class="contact-form__label" for="cf-message">Message</label>
        <textarea
          id="cf-message"
          name="message"
          class="contact-form__input contact-form__textarea"
          required
          maxlength="5000"
          rows="5"
        />
      </div>

      <!-- Honeypot: visually hidden, aria-hidden. Real users never see it. -->
      <div class="contact-form__honeypot" aria-hidden="true">
        <label for="cf-url">Company URL (leave empty)</label>
        <input
          id="cf-url"
          name="company_url"
          type="text"
          tabindex="-1"
          autocomplete="off"
        >
      </div>

      <button
        type="submit"
        class="contact-form__submit"
        :disabled="state.status === 'submitting'"
      >
        {{ state.status === "submitting" ? "Sending..." : "Send message" }}
      </button>

      <p
        v-if="state.status === 'error'"
        class="contact-form__error"
        role="alert"
      >
        {{ state.error }}
      </p>
    </form>
  </div>
</template>

<style scoped>
.contact-form__row {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}
.contact-form__label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-primary);
}
.contact-form__input {
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-input);
  background: var(--color-card);
  font: inherit;
  color: var(--color-primary);
  transition: border-color 200ms ease;
}
.contact-form__input:focus {
  outline: 2px solid var(--color-svara-blue);
  outline-offset: 2px;
  border-color: var(--color-svara-blue);
}
.contact-form__textarea {
  resize: vertical;
  min-height: 8rem;
}
.contact-form__honeypot {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
.contact-form__submit {
  padding: 0.85rem 1.5rem;
  background: var(--color-primary);
  color: var(--color-bg);
  border: none;
  border-radius: var(--radius-input);
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: opacity 200ms ease;
}
.contact-form__submit:hover:not(:disabled) {
  opacity: 0.85;
}
.contact-form__submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.contact-form__success {
  padding: 1.25rem 1.5rem;
  background: var(--color-accent-bg);
  border: 1px solid var(--color-svara-blue);
  border-radius: var(--radius-card);
  color: var(--color-primary);
  font-weight: 500;
}
.contact-form__error {
  margin-top: 1rem;
  color: var(--color-error);
  font-size: 0.875rem;
}
</style>