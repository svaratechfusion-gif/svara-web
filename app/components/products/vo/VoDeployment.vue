<script setup lang="ts">
// PRODUCTS · DEPLOYMENT MODELS — replaces the reference pricing section (no prices).
// Two cards (dark + light) in the exact reference card style: rounded-[40px],
// generous asymmetric padding, layered shadow. Enterprise Cloud / Private Deployment.
</script>

<template>
  <section class="vd">
    <div class="vd__inner">
      <header v-reveal class="vd__head">
        <p class="vd__eyebrow px-mono">Deployment Models</p>
        <h2 class="vd__title">Deploy on your <span class="px-serif">terms.</span></h2>
      </header>

      <div class="vd__grid">
        <article v-reveal="{ delay: 0.1 }" class="vd__card vd__card--dark">
          <h3 class="vd__card-title">Enterprise Cloud</h3>
          <p class="vd__card-desc">Fully managed AI infrastructure hosted by SVARA with rapid deployment and enterprise scalability.</p>
          <NuxtLink to="/contact" class="vd__cta vd__cta--light">Talk to Sales</NuxtLink>
        </article>

        <article v-reveal="{ delay: 0.2 }" class="vd__card vd__card--light">
          <h3 class="vd__card-title">Private Deployment</h3>
          <p class="vd__card-desc">Deploy SVARA products inside your own cloud or on-premise infrastructure with complete control.</p>
          <NuxtLink to="/contact" class="vd__cta vd__cta--dark">Contact Enterprise Team</NuxtLink>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.vd { padding: clamp(48px, 8vw, 88px) 24px; }
.vd__inner { max-width: 1100px; margin: 0 auto; }
.vd__head { margin-bottom: 40px; }
.vd__eyebrow { margin: 0 0 14px; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--px-muted); }
.vd__title { margin: 0; font-size: clamp(28px, 4vw, 46px); line-height: 1.05; letter-spacing: -0.025em; color: var(--px-navy); font-weight: 500; }
.vd__title .px-serif { font-weight: 400; }

.vd__grid { display: grid; grid-template-columns: 1fr; gap: 28px; }
@media (min-width: 820px) { .vd__grid { grid-template-columns: 1fr 1fr; gap: 32px; } }

.vd__card { border-radius: 40px; padding: 40px 40px 44px; display: flex; flex-direction: column; min-height: 300px; }
@media (min-width: 820px) { .vd__card { padding: 44px 88px 48px 40px; } }
.vd__card--dark { background: var(--px-navy); color: #F6FCFF; box-shadow: 0 30px 70px -30px rgba(16, 33, 74, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06); }
.vd__card--light { background: #fff; color: var(--px-navy); box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08), 0 0 0 0.5px rgba(16, 33, 74, 0.06); }
.vd__card-title { margin: 0; font-size: 22px; font-weight: 500; letter-spacing: -0.01em; }
.vd__card-desc { margin: 16px 0 0; font-size: 16px; line-height: 1.6; }
.vd__card--dark .vd__card-desc { color: #E0EBF0; }
.vd__card--light .vd__card-desc { color: var(--px-ink); }

.vd__cta { margin-top: auto; align-self: flex-start; display: inline-flex; align-items: center; padding: 12px 28px; border-radius: 999px; font-size: 15px; font-weight: 500; text-decoration: none; cursor: pointer; transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
.vd__cta:hover { transform: translateY(-2px); }
.vd__cta--light { background: #F6FCFF; color: var(--px-navy); box-shadow: inset 0 2px 8px 0 rgba(255, 255, 255, 0.5); }
.vd__cta--dark { background: var(--px-navy); color: #F6FCFF; box-shadow: 0 4px 4px 0 rgba(16, 33, 74, 0.09), 0 9px 6px 0 rgba(16, 33, 74, 0.05), inset 0 2px 8px 0 rgba(255, 255, 255, 0.3); }
.vd__cta { margin-top: 32px; }
</style>
