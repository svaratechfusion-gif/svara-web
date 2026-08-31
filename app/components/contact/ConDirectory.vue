<script setup lang="ts">
// CONTACT · Interactive Team Directory — left navigation selects a department;
// the right panel updates with its description, official email, recommended
// next action and a CTA. Department descriptions are verbatim from Volume 12
// (contactContent.architecture.components) where they exist; Enterprise
// Solutions and Careers are not in Volume 12 (noted). Only the single
// official address from Volume 12 (CONTACT_CHANNELS.email) is used — SVARA
// has not supplied per-department addresses.
import { ref } from 'vue'
import { CONTACT_CHANNELS } from '~~/lib/content/contact'

const EMAIL = CONTACT_CHANNELS.email
interface Dept { name: string, desc: string, action: string, cta: { label: string, to: string } }
const departments: Dept[] = [
  { name: 'Enterprise Solutions', desc: 'For enterprises building connected intelligence across manufacturing, energy, logistics and other data-heavy operations.', action: 'Begin a strategic consultation', cta: { label: 'Start a consultation', to: '#consultation' } },
  { name: 'Strategic Partnerships', desc: 'For system integrators, technology partners, and channel partners.', action: 'Explore a partnership with SVARA', cta: { label: 'Explore partnership', to: `mailto:${EMAIL}?subject=Strategic%20Partnership` } },
  { name: 'Investors', desc: 'For investment inquiries and funding discussions.', action: 'Open a conversation with investor relations', cta: { label: 'Investor relations', to: '/investors' } },
  { name: 'Careers', desc: 'For engineers, researchers and operators who want to build enterprise intelligence infrastructure.', action: 'Explore how you can build with us', cta: { label: 'View careers', to: '/careers' } },
  { name: 'Media & Public Relations', desc: 'For media inquiries, speaking requests, and press kits.', action: 'Request media resources', cta: { label: 'Media enquiry', to: `mailto:${EMAIL}?subject=Media%20%26%20PR` } },
  { name: 'General Enquiries', desc: 'Questions about SVARA and how we can help.', action: 'Send us a message', cta: { label: 'Send a message', to: `mailto:${EMAIL}` } },
]
const active = ref(0)
</script>

<template>
  <section class="cdir">
    <div class="cdir__head">
      <p v-reveal class="cdir__eyebrow">Team Directory</p>
      <h2 v-reveal class="cdir__title" data-split>Reach the right team</h2>
    </div>

    <div v-reveal class="cdir__panel">
      <nav class="cdir__nav" aria-label="Departments">
        <button
          v-for="(d, i) in departments" :key="d.name" type="button"
          class="cdir__navitem" :class="{ 'is-active': active === i }"
          @click="active = i" @mouseenter="active = i"
        >{{ d.name }}<span class="cdir__navarrow" aria-hidden="true">→</span></button>
      </nav>

      <div class="cdir__detail">
        <Transition name="cdir-fade" mode="out-in">
          <div :key="active" class="cdir__card">
            <h3 class="cdir__dept">{{ departments[active]!.name }}</h3>
            <p class="cdir__desc">{{ departments[active]!.desc }}</p>
            <dl class="cdir__meta">
              <div><dt>Email</dt><dd><a :href="`mailto:${EMAIL}`">{{ EMAIL }}</a></dd></div>
              <div><dt>Next step</dt><dd>{{ departments[active]!.action }}</dd></div>
            </dl>
            <component
              :is="departments[active]!.cta.to.startsWith('mailto') ? 'a' : 'NuxtLink'"
              :href="departments[active]!.cta.to.startsWith('mailto') ? departments[active]!.cta.to : undefined"
              :to="departments[active]!.cta.to.startsWith('mailto') ? undefined : departments[active]!.cta.to"
              class="cdir__cta"
            >{{ departments[active]!.cta.label }} <span aria-hidden="true">→</span></component>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cdir { padding-block: var(--section-y); }
.cdir__head { max-width: var(--container-max); margin-inline: auto; padding-inline: var(--container-pad); text-align: center; box-sizing: border-box; }
.cdir__eyebrow { margin: 0 0 var(--space-6); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.cdir__title { margin: 0; font-size: clamp(28px, 3.4vw, 48px); font-weight: var(--weight-bold); letter-spacing: -0.02em; color: #0d1b3e; }

.cdir__panel {
  max-width: 1100px; margin: var(--space-20) auto 0; padding-inline: var(--container-pad); box-sizing: border-box;
  display: grid; grid-template-columns: 340px 1fr; gap: var(--space-16); align-items: start;
}
.cdir__nav { display: flex; flex-direction: column; }
.cdir__navitem {
  display: flex; align-items: center; justify-content: space-between;
  padding: var(--space-5) var(--space-4); border: none; border-bottom: 1px solid var(--color-border);
  background: transparent; text-align: left; cursor: pointer;
  font-size: var(--type-body); font-weight: var(--weight-medium); color: var(--color-text-secondary);
  transition: color var(--motion-fast) var(--ease-smooth), padding-left var(--motion-medium) var(--ease-smooth);
}
.cdir__navitem:first-child { border-top: 1px solid var(--color-border); }
.cdir__navarrow { opacity: 0; transform: translateX(-6px); transition: opacity var(--motion-medium) var(--ease-smooth), transform var(--motion-medium) var(--ease-smooth); color: var(--color-accent); }
.cdir__navitem.is-active { color: #0d1b3e; padding-left: var(--space-6); }
.cdir__navitem.is-active .cdir__navarrow { opacity: 1; transform: none; }
.cdir__navitem:focus-visible { outline: 2px solid var(--color-accent); outline-offset: -2px; }

.cdir__detail { min-height: 260px; }
.cdir__card {
  padding: var(--space-10); border-radius: var(--radius-lg);
  background: var(--color-bg); border: 1px solid var(--color-border); box-shadow: var(--shadow-med);
}
.cdir__dept { margin: 0; font-size: var(--type-h3); font-weight: var(--weight-bold); letter-spacing: -0.02em; color: #0d1b3e; }
.cdir__desc { margin: var(--space-4) 0 0; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }
.cdir__meta { margin: var(--space-8) 0 0; display: grid; gap: var(--space-5); }
.cdir__meta dt { font-family: var(--font-mono); font-size: 10px; letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-text-faint); }
.cdir__meta dd { margin: 4px 0 0; font-size: var(--type-small); color: #0d1b3e; }
.cdir__meta a { color: var(--color-accent); text-decoration: none; font-weight: var(--weight-semibold); }
.cdir__meta a:hover { text-decoration: underline; }
.cdir__cta {
  display: inline-flex; align-items: center; gap: 8px; margin-top: var(--space-8);
  height: 48px; padding-inline: var(--space-6); border-radius: var(--radius-pill);
  background: #102A5B; color: #fff; font-size: var(--type-small); font-weight: var(--weight-semibold); text-decoration: none;
  transition: background var(--motion-medium) var(--ease-smooth);
}
.cdir__cta:hover { background: var(--color-accent); }

.cdir-fade-enter-active, .cdir-fade-leave-active { transition: opacity 0.25s var(--ease-smooth), transform 0.25s var(--ease-smooth); }
.cdir-fade-enter-from { opacity: 0; transform: translateY(6px); }
.cdir-fade-leave-to { opacity: 0; transform: translateY(-6px); }

@media (max-width: 860px) {
  .cdir__panel { grid-template-columns: 1fr; gap: var(--space-8); }
}
</style>
