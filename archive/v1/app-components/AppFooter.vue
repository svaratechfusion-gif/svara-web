<script setup lang="ts">
const TRUST_LINKS = [
  { label: "Company", href: "/company" },
  { label: "DPIIT", href: "/dpiit" },
  { label: "Leadership", href: "/leadership" },
  { label: "Contact", href: "/contact" },
];
</script>

<template>
  <!-- Minimal, huge whitespace, one large closing statement — not a link farm. -->
  <footer id="contact" class="border-t px-8" style="border-color: var(--color-divider)" :style="{ paddingTop: 'var(--space-11)', paddingBottom: 'var(--space-8)' }">
    <p class="text-lg font-bold" style="color: var(--color-primary)">SVARA</p>
    <p class="mt-6 max-w-2xl text-3xl font-bold leading-tight sm:text-4xl" style="color: var(--color-primary)">
      Engineering<br >
      The Intelligence Layer<br >
      Of Tomorrow.
    </p>

    <nav
      class="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-sm"
      style="color: var(--color-muted-strong)"
      aria-label="Trust and company"
    >
      <NuxtLink
        v-for="link in TRUST_LINKS"
        :key="link.href"
        :to="link.href"
        class="hover:opacity-100"
        style="opacity: 0.8"
      >
        {{ link.label }}
      </NuxtLink>
    </nav>

    <div
      class="mt-12 flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between"
      style="color: var(--color-muted)"
    >
      <p>&copy; {{ new Date().getFullYear() }} SVARA TechFusion Private Limited.</p>
      <div class="flex gap-6">
        <a href="/legal/privacy" class="hover:opacity-100" style="opacity: 0.8">Privacy Policy</a>
        <a href="/legal/terms" class="hover:opacity-100" style="opacity: 0.8">Terms</a>
      </div>
    </div>
  </footer>
</template>