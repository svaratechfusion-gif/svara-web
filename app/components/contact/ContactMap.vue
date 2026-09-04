<script setup lang="ts">
/**
 * HQ MAP — the office, located.
 *
 * CONSENT-GATED, and deliberately so: this is the first third-party embed on the
 * site, and a Google Maps iframe sets Google cookies the moment it loads. The
 * site publishes a cookie policy and runs a consent dock, and useConsent.ts
 * already says the contract holds for exactly this case ("gate it on
 * consent.value.<category>"). A map is a `functional` third party, so:
 *   · consent already given  → the map loads on mount;
 *   · no consent yet         → a placeholder with the address and one button,
 *                              and nothing from Google is requested until the
 *                              visitor asks for it.
 * Either way the address is readable and the "open in Maps" link works, so the
 * information is never behind the gate — only the tracking is.
 *
 * The keyless `?output=embed` form is used on purpose: an API key in client
 * markup is a published credential.
 */
import { ref, onMounted } from 'vue'
import { CONTACT_CHANNELS } from '~~/lib/content/contact'

const query = encodeURIComponent(CONTACT_CHANNELS.headquarters)
const embedSrc = `https://www.google.com/maps?q=${query}&output=embed`
const openSrc = `https://www.google.com/maps/search/?api=1&query=${query}`

const shown = ref(false)
const { allows } = useConsent()

onMounted(() => { if (allows('functional')) shown.value = true })
</script>

<template>
  <figure class="co-map">
    <figcaption class="hx-mono-label co-map__cap">Headquarters</figcaption>

    <iframe
      v-if="shown"
      class="co-map__frame"
      :src="embedSrc"
      title="Map showing SVARA TechFusion's Gachibowli office"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      allowfullscreen
    />

    <div v-else class="co-map__ask">
      <p class="co-map__addr">{{ CONTACT_CHANNELS.headquarters }}</p>
      <p class="co-map__note">
        The map is served by Google and sets its own cookies, so it loads only when
        you ask for it.
      </p>
      <button type="button" class="hx-btn hx-btn--ghost co-map__btn" @click="shown = true">
        Show map
      </button>
    </div>

    <a :href="openSrc" target="_blank" rel="noopener noreferrer" class="hx-link co-map__open">
      Open in Google Maps
      <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M0 5h14M14 5l-4-4M14 5l-4 4" stroke="currentColor" stroke-width="1.3" /></svg>
    </a>
  </figure>
</template>
