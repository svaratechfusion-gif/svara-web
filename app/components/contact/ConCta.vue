<script setup lang="ts">
// CONTACT · Final CTA — large typography, generous whitespace. Copy drawn from
// Volume 12: aiAnswerTarget's response promise ("We'll respond within 24
// business hours") and the single official email (CONTACT_CHANNELS.email).
import { CONTACT_CHANNELS } from '~~/lib/content/contact'

const EMAIL = CONTACT_CHANNELS.email
</script>

<template>
  <section class="ccta">
    <div class="ccta__inner">
      <h2 v-reveal class="ccta__title" data-split>Begin a strategic technology partnership</h2>
      <p v-reveal class="ccta__sub">Contact SVARA with your question or message. We'll respond within 24 business hours.</p>
      <div v-reveal class="ccta__actions">
        <a href="#form" class="ccta__btn ccta__btn--primary">Start a conversation <span aria-hidden="true">→</span></a>
        <a :href="`mailto:${EMAIL}`" class="ccta__btn ccta__btn--ghost">{{ EMAIL }}</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ccta { padding-block: calc(var(--section-y) * 1.15); }
.ccta__inner { max-width: 900px; margin-inline: auto; padding-inline: var(--container-pad); box-sizing: border-box; text-align: center; }
.ccta__title { margin: 0; font-size: clamp(34px, 5.4vw, 76px); font-weight: var(--weight-extrabold); line-height: 1.04; letter-spacing: -0.03em; color: #0d1b3e; text-wrap: balance; }
.ccta__sub { margin: var(--space-8) auto 0; max-width: 44ch; font-size: var(--type-lead); line-height: var(--leading-body); color: var(--color-text-secondary); }
.ccta__actions { margin-top: var(--space-12); display: inline-flex; flex-wrap: wrap; gap: var(--space-4); justify-content: center; }
.ccta__btn { display: inline-flex; align-items: center; gap: 8px; height: 56px; padding-inline: var(--space-8); border-radius: var(--radius-pill); font-size: var(--type-body); font-weight: var(--weight-semibold); text-decoration: none; transition: transform var(--motion-fast) var(--ease-smooth), background var(--motion-medium) var(--ease-smooth); }
.ccta__btn--primary { background: #102A5B; color: #fff; }
.ccta__btn--primary:hover { background: var(--color-accent); transform: translateY(-2px); }
.ccta__btn--ghost { border: 1px solid var(--color-border); color: #0d1b3e; }
.ccta__btn--ghost:hover { border-color: var(--color-accent); color: var(--color-accent); }
</style>
