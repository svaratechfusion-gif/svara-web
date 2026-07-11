<script setup lang="ts">
// Scene 4 — SVARA. The company appears only after the visitor has felt the
// reality, the fragmentation, and the possibility of intelligence. This is
// the moment the answer gets a name.
</script>

<template>
  <section class="svara" aria-labelledby="svara-title">
    <div class="svara__inner">
      <p class="section__number">04 · The answer</p>
      <h2 id="svara-title" class="svara__name">SVARA</h2>
      <p class="svara__statement">
        Enterprise Intelligence Infrastructure
      </p>
      <p class="svara__lead">
        SVARA turns fragmented enterprise data into one continuously improving
        loop of operational intelligence.
      </p>
      <NuxtLink to="/platform" class="svara__cta" data-reveal-item>
        See how it works
        <span aria-hidden="true">→</span>
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.svara {
  min-height: 100svh;
  padding: 8rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.svara__inner {
  max-width: 56rem;
  margin: 0 auto;
  width: 100%;
}
.section__number {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-muted);
  margin-bottom: 2rem;
}
.svara__name {
  font-size: clamp(4rem, 16vw, 11rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 0.9;
  color: var(--color-primary);
  margin-bottom: 1.5rem;
}
.svara__statement {
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-weight: 600;
  color: var(--color-svara-blue);
  margin-bottom: 1.5rem;
}
.svara__lead {
  font-size: clamp(1.125rem, 1.8vw, 1.5rem);
  font-weight: 400;
  line-height: 1.55;
  color: var(--color-muted-strong);
  max-width: 40rem;
  margin: 0 auto 3rem;
}
.svara__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.95rem 1.75rem;
  background: var(--color-primary);
  color: var(--color-bg);
  border-radius: var(--radius-pill);
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: transform var(--duration-fast) ease, opacity var(--duration-fast) ease;
}
.svara__cta:hover {
  transform: translateY(-2px);
  opacity: 0.92;
}
.svara__cta span {
  transition: transform var(--duration-fast) ease;
}
.svara__cta:hover span {
  transform: translateX(4px);
}

@media (max-width: 640px) {
  .svara { padding: 6rem 1.25rem; }
}
</style>
