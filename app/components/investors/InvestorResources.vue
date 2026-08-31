<script setup lang="ts">
// INVESTOR RESOURCES — premium download and contact cards. Resource titles
// are VERBATIM from the Content Bible (investors.ts resources array).
// Contact CTA uses the final CTA primary action.
import { investorResources, investorContact } from '~/utils/investors'
</script>

<template>
  <section class="ir">
    <div class="ir__head">
      <p class="ir__eyebrow">Investor Resources</p>
      <h2 class="ir__title">Deep-dive materials.</h2>
      <p class="ir__sub">The full SVARA thesis, in writing. Request access to the materials below or connect directly with the founders.</p>
    </div>

    <div class="ir__grid">
      <div v-for="r in investorResources" :key="r.title" class="ir__card">
        <span class="ir__type">{{ r.type }}</span>
        <h3 class="ir__name">{{ r.title }}</h3>
        <span class="ir__action">Request access →</span>
      </div>

      <NuxtLink :to="investorContact.to" class="ir__card ir__card--contact">
        <span class="ir__type">direct</span>
        <h3 class="ir__name">{{ investorContact.label }}</h3>
        <span class="ir__action">Connect directly →</span>
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.ir { background: #F1F6FE; padding: var(--space-32) var(--container-pad); }
.ir__head { max-width: 760px; margin: 0 auto var(--space-16); text-align: center; }
.ir__eyebrow { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.ir__title { margin: 0; font-size: clamp(34px, 4.4vw, 56px); font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong); }
.ir__sub { margin: var(--space-5) 0 0; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }

.ir__grid { max-width: 1100px; margin: var(--space-16) auto 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: var(--space-6); }
.ir__card { display: flex; flex-direction: column; gap: 8px; padding: var(--space-8); border-radius: var(--radius-lg); background: #fff; border: 1px solid var(--color-border); box-shadow: 0 4px 14px rgba(16, 42, 91, 0.05), 0 20px 56px rgba(16, 42, 91, 0.06); text-decoration: none; color: inherit; transition: transform var(--motion-medium) var(--ease-out), border-color var(--motion-medium) var(--ease-smooth), box-shadow var(--motion-medium) var(--ease-out); }
.ir__card:hover { transform: translateY(-4px); border-color: rgba(47, 127, 230, 0.4); box-shadow: 0 8px 20px rgba(16, 42, 91, 0.08), 0 32px 80px rgba(16, 42, 91, 0.12); }
.ir__card--contact { background: var(--color-ink-strong); color: #fff; border-color: var(--color-ink-strong); }
.ir__type { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-text-faint); }
.ir__card--contact .ir__type { color: rgba(255, 255, 255, 0.5); }
.ir__name { margin: 0; font-size: 17px; font-weight: var(--weight-bold); color: var(--color-ink-strong); letter-spacing: -0.01em; }
.ir__card--contact .ir__name { color: #fff; }
.ir__action { margin-top: auto; padding-top: var(--space-5); font-size: 13px; font-weight: var(--weight-semibold); color: var(--color-accent); }
.ir__card--contact .ir__action { color: #cfe2fb; }
.ir__card:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }
</style>