<script setup lang="ts">
// Scene 1 — Reality. The shared condition every enterprise buyer recognises.
// No product. No company. Just the truth: data has outpaced human capacity.
</script>

<template>
  <section class="reality" aria-labelledby="reality-statement">
    <div class="reality__inner">
      <p class="section__number">01 · Reality</p>
      <h1 id="reality-statement" class="reality__statement">
        Enterprise systems<br>
        produce more data<br>
        than people can act on.
      </h1>
      <p class="reality__sub">
        Cameras, sensors, ERP, MES, CRM, logs — every system generates signal.
        Most of it never becomes decision.
      </p>
    </div>
  </section>
</template>

<style scoped>
.reality {
  min-height: 100svh;
  padding: 8rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.reality__inner {
  max-width: 56rem;
  width: 100%;
  margin: 0 auto;
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
.reality__statement {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--color-primary);
  margin-bottom: 2rem;
}
.reality__sub {
  font-size: clamp(1.125rem, 1.6vw, 1.5rem);
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-muted-strong);
  max-width: 40rem;
}

@media (max-width: 640px) {
  .reality { padding: 6rem 1.25rem; }
  .section__number { font-size: 0.75rem; }
}
</style>