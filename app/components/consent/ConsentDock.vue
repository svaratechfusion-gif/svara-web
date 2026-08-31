<script setup lang="ts">
/**
 * ConsentDock — the first-visit consent surface.
 *
 * Rendered on the SERVER (never inside <ClientOnly>) so it exists in the initial
 * HTML for assistive tech and for a no-JS visitor. `needsDecision` is decoded
 * from the request cookie during the useState initializer, so a returning
 * visitor's HTML simply has no dock in it — nothing to hide, nothing to flash.
 *
 * `role="region"`, NOT `aria-modal`. The dock does not block the page: it does
 * not trap focus, does not lock scroll and does not hide the rest of the
 * document from a screen reader. Marking a visually non-modal banner as modal is
 * the most common failure in shipped cookie banners — it silently removes the
 * whole page from assistive tech while it stays mouse-operable.
 *
 * All three choices are one click at the same depth: rejecting is exactly as
 * easy as accepting, which is what makes the consent valid.
 */
import { useConsent, useConsentConsole } from '~/composables/useConsent'

const { needsDecision, acceptAll, rejectAll } = useConsent()
const consoleOpen = useConsentConsole()

/**
 * Closing RECORDS a refusal — identical to "Essential only" — rather than
 * dismissing without an answer. That is the protective direction: no
 * non-essential cookie is set, the decision is stored so the visitor is not
 * asked again, and it can be changed at any time from the footer or the Cookie
 * Policy page. What a close must never do is imply consent.
 */
function closeAsEssentialOnly() {
  rejectAll()
}

/** Escape does the same. Scoped to the dock — it is a region, not a dialog, so
 *  the handler is not bound to the document. */
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') closeAsEssentialOnly()
}
</script>

<template>
  <section
    v-if="needsDecision"
    class="cc__dock"
    role="region"
    aria-labelledby="cc-dock-title"
    @keydown="onKey"
  >
    <span class="cc__rail" aria-hidden="true" />

    <!-- The label states exactly what closing does. An unlabelled X on a consent
         banner is ambiguous at best and reads as "accept" at worst. -->
    <button
      type="button"
      class="cc__close"
      aria-label="Close and use essential cookies only"
      title="Close and use essential cookies only"
      @click="closeAsEssentialOnly"
    >
      <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" stroke-width="1.4" /></svg>
    </button>

    <p class="cc__eyebrow"><i aria-hidden="true" />Your privacy. Your control.</p>
    <h2 id="cc-dock-title" class="cc__title">
      We use cookies to operate, improve and understand how you experience SVARA.
    </h2>
    <p class="cc__body">
      Only strictly necessary cookies are set unless you choose otherwise.
    </p>

    <div class="cc__actions">
      <button type="button" class="cc__btn" @click="rejectAll">
        Essential only
      </button>
      <button type="button" class="cc__btn" @click="consoleOpen = true">
        Customise
      </button>
      <button type="button" class="cc__btn cc__btn--accent" @click="acceptAll">
        Accept all
      </button>
    </div>

    <p class="cc__note">
      You can update your preferences at any time. See our
      <NuxtLink to="/legal/cookies">Cookie Policy</NuxtLink>.
    </p>
  </section>
</template>
