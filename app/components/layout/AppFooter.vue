<template>
  <!-- Minimal, huge whitespace, one large closing statement — not a link farm. -->
  <footer id="contact" class="border-t px-8" style="border-color: var(--color-divider)" :style="{ paddingTop: 'var(--space-11)', paddingBottom: 'var(--space-8)' }">
    <p class="text-lg font-bold" style="color: var(--color-primary)">SVARA</p>
    <p class="mt-6 max-w-2xl text-3xl font-bold leading-tight sm:text-4xl" style="color: var(--color-primary)">
      Engineering<br >
      The Intelligence Layer<br >
      Of Tomorrow.
    </p>
    <div
      class="mt-16 flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between"
      style="color: var(--color-muted)"
    >
      <p>&copy; {{ new Date().getFullYear() }} SVARA TechFusion Private Limited.</p>
      <div class="flex gap-6">
        <a href="/privacy-policy" class="hover:opacity-100" style="opacity: 0.8">Privacy Policy</a>
        <a href="/terms" class="hover:opacity-100" style="opacity: 0.8">Terms</a>
      </div>
    </div>
  </footer>
</template>
