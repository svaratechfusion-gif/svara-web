<script setup lang="ts">
</script>

<template>
  <header class="terminal-header" role="banner">
    <div class="terminal-header__left">
      <span class="terminal-header__logo">SVARA</span>
    </div>

    <nav class="terminal-header__nav" aria-label="Primary">
      <NuxtLink to="/platform" class="terminal-header__navlink">Platform</NuxtLink>
      <NuxtLink to="/products" class="terminal-header__navlink">Products</NuxtLink>
      <NuxtLink to="/technology" class="terminal-header__navlink">Technology</NuxtLink>
      <NuxtLink to="/industries" class="terminal-header__navlink">Industries</NuxtLink>
      <NuxtLink to="/company" class="terminal-header__navlink">Company</NuxtLink>
      <NuxtLink to="/contact" class="terminal-header__navlink terminal-header__navlink--cta">Contact Sales</NuxtLink>
    </nav>
  </header>
</template>

<style scoped>
.terminal-header {
  position: sticky;
  top: 0;
  z-index: 200;
  height: var(--header-height, 64px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  padding: 0 var(--space-4);
  box-sizing: border-box;
}

.terminal-header__logo {
  font-family: var(--font-sans);
  font-size: var(--text-xl);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--fg);
}

.terminal-header__nav {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.terminal-header__navlink {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--fg-muted);
  text-decoration: none;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--panel-radius);
  transition: color var(--duration-fast), background var(--duration-fast);
}

.terminal-header__navlink:hover {
  color: var(--fg);
  background: var(--bg-hover);
}

.terminal-header__navlink--cta {
  color: white;
  background: var(--accent);
  margin-left: var(--space-2);
}

.terminal-header__navlink--cta:hover {
  background: var(--accent-hover);
  color: white;
}

@media (max-width: 1200px) {
  .terminal-header__nav { display: none; }
}
</style>