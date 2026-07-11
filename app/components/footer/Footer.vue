<script setup lang="ts">
// Minimal enterprise footer: four text columns, generous whitespace, no
// social icons besides LinkedIn/GitHub (rendered as text links).
const columns = [
  {
    title: 'Company',
    links: [
      { label: 'Roadmap', to: '/company#roadmap' },
      { label: 'Investors', to: '/investors' },
      { label: 'Careers', to: '/company#careers' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', to: '/legal/privacy' },
      { label: 'Terms', to: '/legal/terms' },
      { label: 'Cookies', to: '/legal/privacy#cookies' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/svaratechfusion' },
      { label: 'GitHub', href: 'https://github.com/svaratechfusion' },
      { label: 'Email', href: 'mailto:hello@svaratechfusion.com' },
    ],
  },
] as const
</script>

<template>
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__brand">
        <span class="footer__logo">SVARA</span>
        <p class="footer__tag">Enterprise Intelligence Infrastructure</p>
      </div>

      <div v-for="col in columns" :key="col.title" class="footer__col">
        <h3 class="footer__title">{{ col.title }}</h3>
        <ul class="footer__list">
          <li v-for="link in col.links" :key="link.label">
            <NuxtLink v-if="'to' in link" :to="link.to" class="footer__link">{{ link.label }}</NuxtLink>
            <a v-else :href="link.href" class="footer__link" rel="noopener" target="_blank">{{ link.label }}</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="footer__base">
      <span class="footer__copy">© {{ new Date().getFullYear() }} SVARA TechFusion Pvt. Ltd.</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--color-border);
  background: var(--color-bg);
  padding-block: var(--space-32) var(--space-12);
}
.footer__inner {
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--container-pad);
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: var(--gap-section);
  box-sizing: border-box;
}
.footer__logo {
  font-size: 24px;
  font-weight: var(--weight-extrabold);
  letter-spacing: -0.02em;
  color: var(--color-text);
}
.footer__tag {
  margin: var(--space-4) 0 0;
  font-size: var(--type-caption);
  color: var(--color-text-secondary);
  max-width: 280px;
  line-height: var(--leading-body);
}
.footer__title {
  margin: 0 0 var(--space-6);
  font-family: var(--font-mono);
  font-size: var(--type-label);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-text-secondary);
}
.footer__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.footer__link {
  font-size: var(--type-small);
  color: var(--color-text);
  text-decoration: none;
  transition: color var(--motion-fast) var(--ease-smooth);
}
.footer__link:hover { color: var(--color-accent); }
.footer__link:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}
.footer__base {
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--container-pad);
  margin-top: var(--space-24);
  padding-top: var(--space-8);
  border-top: 1px solid var(--color-border);
  box-sizing: border-box;
}
.footer__copy {
  font-size: var(--type-caption);
  color: var(--color-text-secondary);
}

@media (max-width: 900px) {
  .footer__inner { grid-template-columns: 1fr 1fr; gap: var(--space-16); }
}
@media (max-width: 520px) {
  .footer__inner { grid-template-columns: 1fr; }
}
</style>
