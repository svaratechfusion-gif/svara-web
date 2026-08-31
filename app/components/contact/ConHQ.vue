<script setup lang="ts">
// CONTACT · Headquarters — an elegant contact panel, no embedded map.
// Location (Hyderabad, Telangana, India) is per the page brief; the email is
// the single official address from Volume 12 (CONTACT_CHANNELS.email). The
// phone is Volume 12's placeholder and the business hours are a standard
// assumption — both flagged to be confirmed before launch.
import { CONTACT_CHANNELS } from '~~/lib/content/contact'

const EMAIL = CONTACT_CHANNELS.email
const PHONE = CONTACT_CHANNELS.phone
</script>

<template>
  <section class="chq">
    <div class="chq__inner">
      <div class="chq__intro">
        <p v-reveal class="chq__eyebrow">Headquarters</p>
        <h2 v-reveal class="chq__title" data-split>Hyderabad, Telangana, India</h2>
        <p v-reveal class="chq__sub">Engineering enterprise intelligence infrastructure from India, with team members across multiple regions.</p>
      </div>

      <dl v-reveal class="chq__grid">
        <div class="chq__item">
          <dt>Location</dt>
          <dd>Hyderabad, Telangana<br >India</dd>
        </div>
        <div class="chq__item">
          <dt>Business hours</dt>
          <dd>Monday – Friday<br >9:00 – 18:00 IST</dd>
        </div>
        <div class="chq__item">
          <dt>Phone</dt>
          <dd><a :href="`tel:${PHONE.replace(/[^+\d]/g, '')}`">{{ PHONE }}</a></dd>
        </div>
        <div class="chq__item">
          <dt>Email</dt>
          <dd><a :href="`mailto:${EMAIL}`">{{ EMAIL }}</a></dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.chq { padding-block: var(--section-y); }
.chq__inner {
  max-width: 1100px; margin-inline: auto; padding: var(--space-16) var(--container-pad);
  border-radius: var(--radius-lg); border: 1px solid var(--color-border);
  background: linear-gradient(180deg, #ffffff, #f4f8ff);
  box-sizing: border-box;
}
.chq__eyebrow { margin: 0 0 var(--space-5); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.chq__title { margin: 0; font-size: clamp(28px, 3.2vw, 44px); font-weight: var(--weight-bold); letter-spacing: -0.02em; color: #0d1b3e; }
.chq__sub { margin: var(--space-5) 0 0; max-width: 52ch; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }
.chq__grid {
  margin: var(--space-12) 0 0; display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-8);
  border-top: 1px solid var(--color-border); padding-top: var(--space-10);
}
.chq__item dt { font-family: var(--font-mono); font-size: 10px; letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-text-faint); }
.chq__item dd { margin: var(--space-3) 0 0; font-size: var(--type-small); line-height: 1.5; color: #0d1b3e; }
.chq__item a { color: var(--color-accent); text-decoration: none; font-weight: var(--weight-semibold); }
.chq__item a:hover { text-decoration: underline; }
@media (max-width: 720px) {
  .chq__grid { grid-template-columns: 1fr 1fr; gap: var(--space-6); }
}
</style>
