<script setup lang="ts">
// ECOSYSTEM · Platform Windows — each platform as a floating desktop-style
// application window, slightly overlapping; hover brings the active window
// forward. Platform names + descriptions are verbatim from the Content Bible
// (homePlatforms). The small status metric per window is illustrative
// (subtle "live" motion), not Content-Bible copy.
import { ref } from 'vue'
import { homePlatforms, homeSection03 } from '~~/lib/content/home'

// illustrative live status line per platform (not Bible copy)
const metrics = ['12 streams live', 'fleet online', '42 ms edge latency', '1.2M tokens / min',
  '128 agents active', '56 twins synced', '24 apps connected', 'always on',
  'CI/CD healthy', '8.2K signals / day']
const platforms = homePlatforms.map((p, i) => ({ ...p, metric: metrics[i] ?? 'live' }))
const active = ref<number | null>(null)
</script>

<template>
  <section class="ewin">
    <div class="ewin__head">
      <p v-reveal class="ewin__eyebrow">Products</p>
      <h2 v-reveal class="ewin__title" data-split>{{ homeSection03.title }}</h2>
      <p v-reveal class="ewin__sub">{{ homeSection03.intro }}</p>
    </div>

    <div v-reveal class="ewin__deck" @mouseleave="active = null">
      <NuxtLink
        v-for="(p, i) in platforms" :key="p.name" :to="p.to"
        class="ewin__win" :class="{ 'is-active': active === i }"
        :style="{ '--i': i }"
        @mouseenter="active = i" @focus="active = i" @blur="active = null"
      >
        <div class="ewin__bar">
          <span class="ewin__dots"><i /><i /><i /></span>
          <span class="ewin__app">{{ p.name }}</span>
        </div>
        <div class="ewin__body">
          <p class="ewin__desc">{{ p.description }}</p>
          <p class="ewin__metric"><span class="ewin__led" />{{ p.metric }}</p>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.ewin { padding-block: var(--section-y); }
.ewin__head { max-width: var(--container-max); margin-inline: auto; padding-inline: var(--container-pad); text-align: center; box-sizing: border-box; }
.ewin__eyebrow { margin: 0 0 var(--space-6); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.ewin__title { margin: 0 auto; max-width: 20ch; font-size: clamp(28px, 3.4vw, 48px); font-weight: var(--weight-bold); letter-spacing: -0.02em; color: #0d1b3e; text-wrap: balance; }
.ewin__sub { margin: var(--space-6) auto 0; max-width: 640px; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }

.ewin__deck {
  max-width: 1200px; margin: var(--space-24) auto 0; padding: 0 var(--container-pad);
  display: flex; flex-wrap: wrap; justify-content: center; gap: 0; box-sizing: border-box;
}
.ewin__win {
  position: relative; z-index: 1;
  width: 288px; margin: -14px -18px; /* slight overlap */
  border-radius: 14px; overflow: hidden;
  background: var(--color-bg); border: 1px solid var(--color-border);
  box-shadow: 0 12px 34px rgba(16, 42, 91, 0.08);
  text-decoration: none;
  transform: rotate(calc((var(--i) - 4.5) * 0.6deg)) translateY(0);
  transition: transform var(--motion-medium) var(--ease-smooth), box-shadow var(--motion-medium) var(--ease-smooth), border-color var(--motion-medium) var(--ease-smooth);
}
.ewin__win.is-active {
  z-index: 20;
  transform: rotate(0deg) translateY(-8px) scale(1.03);
  border-color: var(--color-accent);
  box-shadow: 0 24px 60px rgba(16, 42, 91, 0.2);
}
.ewin__bar {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 14px; border-bottom: 1px solid var(--color-border);
  background: #f3f6fc;
}
.ewin__dots { display: inline-flex; gap: 5px; }
.ewin__dots i { width: 7px; height: 7px; border-radius: 50%; background: #d3dae6; }
.ewin__app { font-size: 12px; font-weight: var(--weight-semibold); color: #0d1b3e; letter-spacing: -0.01em; }
.ewin__body { padding: 16px; }
.ewin__desc { margin: 0; font-size: var(--type-caption); line-height: var(--leading-body); color: var(--color-text-secondary); min-height: 3.4em; }
.ewin__metric { margin: var(--space-4) 0 0; display: flex; align-items: center; gap: 7px; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.03em; text-transform: uppercase; color: var(--color-accent); }
.ewin__led { width: 6px; height: 6px; border-radius: 50%; background: var(--color-accent); animation: ewin-blink 1.8s ease-in-out infinite; }
@keyframes ewin-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

@media (max-width: 900px) {
  .ewin__deck { gap: var(--space-4); }
  .ewin__win { margin: 0; width: 100%; max-width: 340px; transform: none; }
  .ewin__win.is-active { transform: translateY(-4px) scale(1.02); }
}
@media (prefers-reduced-motion: reduce) { .ewin__led { animation: none; } }
</style>
