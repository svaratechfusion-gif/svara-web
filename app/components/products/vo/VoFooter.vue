<script setup lang="ts">
// PRODUCTS · FOOTER — editorial footer (reference layout) with SVARA nav + social
// links, plus a copyright bar. This is a page-local footer for the rebuilt Products
// page composition (the global site footer still renders from the default layout).
const nav = [
  { label: 'Products', to: '/products' },
  { label: 'Technology', to: '/technology' },
  { label: 'Industries', to: '/industries' },
  { label: 'Architecture', to: '/architecture' },
  { label: 'Developers', to: '/technology' },
  { label: 'Careers', to: '/careers' },
  { label: 'Investors', to: '/investors' },
  { label: 'Contact', to: '/contact' },
]
const social = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/svaratechfusion' },
  { label: 'GitHub', href: 'https://github.com/svaratechfusion' },
]
</script>

<template>
  <footer class="vfo">
    <div class="vfo__inner">
      <div class="vfo__top">
        <NuxtLink to="/contact" class="px-btn px-btn--primary">Book Enterprise Demo</NuxtLink>
        <div class="vfo__cols">
          <span class="vfo__arrow" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </span>
          <ul class="vfo__col">
            <li v-for="l in nav" :key="l.label"><NuxtLink :to="l.to" class="vfo__link">{{ l.label }}</NuxtLink></li>
          </ul>
          <ul class="vfo__col">
            <li v-for="s in social" :key="s.label"><a :href="s.href" target="_blank" rel="noopener" class="vfo__link">{{ s.label }}</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="vfo__bar">
      <span>SVARA · Enterprise Intelligence Infrastructure</span>
      <span>Hyderabad, India</span>
    </div>
  </footer>
</template>

<style scoped>
.vfo { padding: clamp(48px, 7vw, 80px) 24px 0; }
.vfo__inner { max-width: 1200px; margin: 0 auto; }
.vfo__top { display: flex; flex-direction: column; gap: 40px; align-items: flex-start; }
@media (min-width: 768px) { .vfo__top { flex-direction: row; justify-content: space-between; } }
.vfo__cols { display: flex; gap: clamp(40px, 8vw, 96px); }
.vfo__arrow { color: var(--px-navy); }
.vfo__col { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 14px; }
.vfo__link { font-size: 16px; color: var(--px-ink); text-decoration: none; transition: opacity 0.2s ease; }
.vfo__link:hover { opacity: 0.6; }

.vfo__bar { max-width: 1200px; margin: clamp(56px, 8vw, 88px) auto 0; padding: 20px 0; border-top: 1px solid var(--px-line); display: flex; flex-direction: column; gap: 8px; justify-content: space-between; font-size: 13px; color: var(--px-muted); }
@media (min-width: 640px) { .vfo__bar { flex-direction: row; } }
</style>
