<script setup lang="ts">
import { useKnowledgeProduct } from "~/composables/useKnowledgeProduct"
import { contactContent, CONTACT_CHANNELS } from "~~/lib/content/contact"

useKnowledgeProduct(contactContent)
</script>

<template>
  <div class="page-contact">
    <KnowledgeProductLayout :content="contactContent" />

    <section class="kp-section kp-section--contact bg-white">
      <div class="kp-container">
        <h2 class="kp-headline">Contact us</h2>
        <p class="kp-body contact-lead">
          Send a short message. We respond within 24 business hours.
        </p>

        <div class="contact-channels">
          <p>
            <span class="contact-channels__label">Email</span>
            <a :href="`mailto:${CONTACT_CHANNELS.email}`">{{ CONTACT_CHANNELS.email }}</a>
          </p>
          <p>
            <span class="contact-channels__label">Phone</span>
            <a :href="`tel:${CONTACT_CHANNELS.phone.replace(/[^+\d]/g, '')}`">{{ CONTACT_CHANNELS.phone }}</a>
          </p>
          <p>
            <span class="contact-channels__label">Headquarters</span>
            <span>{{ CONTACT_CHANNELS.headquarters }}</span>
          </p>
        </div>

        <ContactForm />
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-contact {
  --kp-max-w: 48rem;
}
.kp-section {
  padding: 6rem 1.5rem;
}
.kp-section--contact {
  padding-top: 4rem;
}
.kp-container {
  max-width: var(--kp-max-w);
  margin: 0 auto;
}
.kp-headline {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 1.5rem;
}
.kp-body {
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--color-muted);
}
.contact-lead {
  color: var(--color-muted-strong);
  margin-bottom: 2.5rem;
}
.contact-channels {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem 3rem;
  margin-bottom: 3rem;
  padding: 1.5rem 0;
  border-top: 1px solid var(--color-divider);
  border-bottom: 1px solid var(--color-divider);
}
.contact-channels p {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 1rem;
  color: var(--color-primary);
}
.contact-channels__label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-muted);
}
.contact-channels a {
  color: var(--color-svara-blue);
  font-weight: 600;
  text-decoration: none;
}
.contact-channels a:hover {
  text-decoration: underline;
}
</style>