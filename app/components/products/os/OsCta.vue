<script setup lang="ts">
// OS · ENTERPRISE CTA — the close. "The future is built together" (final chapter).
</script>

<template>
  <section class="oc">
    <div v-reveal class="oc__block">
      <div class="oc__grid" aria-hidden="true" />
      <div class="oc__content">
        <p class="oc__eyebrow px-mono">Own the stack · Own the future</p>
        <h2 class="oc__title">Build your enterprise on <span class="px-serif">one intelligence layer.</span></h2>
        <p class="oc__sub">The next generation of enterprises will not be defined by the software they purchase — but by the intelligence they build. Let's engineer yours.</p>
        <div class="oc__ctas">
          <NuxtLink to="/contact" class="px-btn px-btn--primary">Schedule Executive Consultation</NuxtLink>
          <NuxtLink to="/architecture" class="px-btn px-btn--ghost">Explore the Architecture</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.oc { padding: clamp(56px, 8vw, 96px) 24px clamp(80px, 12vw, 140px); }
.oc__block { position: relative; overflow: hidden; max-width: 1140px; margin: 0 auto; padding: clamp(72px, 12vw, 140px) 24px; border-radius: 12px; background: #fff; box-shadow: 0 0 0 0.5px rgba(16,33,74,0.06), 0 40px 100px -50px rgba(16,33,74,0.35); }
.oc__grid { position: absolute; inset: 0; pointer-events: none; background-image: linear-gradient(rgba(16,33,74,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(16,33,74,0.04) 1px, transparent 1px); background-size: 46px 46px; -webkit-mask-image: radial-gradient(90% 90% at 50% 100%, #000 30%, transparent 100%); mask-image: radial-gradient(90% 90% at 50% 100%, #000 30%, transparent 100%); }
.oc__content { position: relative; text-align: center; display: flex; flex-direction: column; align-items: center; }
.oc__eyebrow { margin: 0 0 18px; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--px-muted); }
.oc__title { margin: 0; font-size: clamp(30px, 5.4vw, 66px); line-height: 1.02; letter-spacing: -0.03em; color: var(--px-navy); font-weight: 500; max-width: 18ch; }
.oc__title .px-serif { font-weight: 400; }
.oc__sub { margin: 22px 0 0; max-width: 56ch; font-size: clamp(15px, 1.6vw, 19px); line-height: 1.6; color: var(--px-muted); }
.oc__ctas { margin-top: 34px; display: flex; flex-wrap: wrap; gap: 14px; justify-content: center; }
@media (max-width: 480px) { .oc__ctas { flex-direction: column; width: 100%; } .oc__ctas > * { width: 100%; } }
</style>
