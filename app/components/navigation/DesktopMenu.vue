<script setup lang="ts">
// The link list rendered inside the fullscreen overlay. One place defines
// the site's primary routes.
const links = [
  { to: '/platform', label: 'Platform' },
  { to: '/products', label: 'Products' },
  { to: '/technology', label: 'Technology' },
  { to: '/industries', label: 'Industries' },
  { to: '/company', label: 'Company' },
  { to: '/contact', label: 'Contact' },
] as const

defineEmits<{ navigate: [] }>()
</script>

<template>
  <nav class="desktop-menu" aria-label="Primary">
    <ul class="desktop-menu__list">
      <li v-for="link in links" :key="link.to">
        <NuxtLink :to="link.to" class="desktop-menu__link" @click="$emit('navigate')">
          {{ link.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.desktop-menu__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.desktop-menu__link {
  display: inline-block;
  font-family: var(--font-sans);
  font-size: clamp(40px, 6vw, 88px);
  font-weight: var(--weight-extrabold);
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: var(--color-text);
  text-decoration: none;
  transition: color var(--motion-fast) var(--ease-smooth);
}
.desktop-menu__link:hover { color: var(--color-accent); }
.desktop-menu__link:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 4px;
}
</style>
