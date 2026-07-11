<script setup lang="ts">
// 04 PLATFORM OVERVIEW — full-width image, then 6 modules in a 3×2 grid.
// Hover: lift + shadow + image zoom (CSS only, token-driven).
const modules = [
  { img: '/images/home/mod-unified_dashboard.jpg', title: 'Unified Dashboard', copy: 'One pane across every system, site, and signal.' },
  { img: '/images/home/mod-real_time_monitoring.jpg', title: 'Real-Time Monitoring', copy: 'Live operational awareness at enterprise scale.' },
  { img: '/images/home/mod-ai_insights.jpg', title: 'AI Insights', copy: 'Reasoning over every stream, not just storage.' },
  { img: '/images/home/mod-predictive_analytics.jpg', title: 'Predictive Analytics', copy: 'See failures and demand before they happen.' },
  { img: '/images/home/mod-smart_workflows.jpg', title: 'Smart Workflows', copy: 'Decisions that trigger coordinated action.' },
  { img: '/images/home/mod-automation_engine.jpg', title: 'Automation Engine', copy: 'Closed-loop execution with human oversight.' },
]
</script>

<template>
  <section class="platform">
    <div class="platform__inner">
      <div v-reveal class="platform__head">
        <p class="platform__eyebrow">Platform</p>
        <h2 class="platform__title">One platform. Every layer of enterprise intelligence.</h2>
      </div>

      <figure v-reveal class="platform__wide">
        <img src="/images/home/platform-wide.jpg" alt="SVARA platform — unified operations view" loading="lazy" >
      </figure>

      <div class="platform__grid">
        <NuxtLink v-for="(m, i) in modules" :key="m.title" v-reveal="{ delay: (i % 3) * 0.07 }" to="/platform" class="platform__module">
          <span class="platform__module-img"><img :src="m.img" :alt="m.title" loading="lazy" ></span>
          <span class="platform__module-body">
            <span class="platform__module-title">{{ m.title }}</span>
            <span class="platform__module-copy">{{ m.copy }}</span>
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.platform { background: var(--color-surface); border-block: 1px solid var(--color-border); }
.platform__inner {
  max-width: var(--container-max);
  margin-inline: auto;
  padding: var(--section-y) var(--container-pad);
  box-sizing: border-box;
}
.platform__eyebrow {
  margin: 0 0 var(--space-6);
  font-family: var(--font-mono); font-size: var(--type-label);
  letter-spacing: var(--tracking-label); text-transform: uppercase;
  color: var(--color-accent);
}
.platform__title {
  margin: 0 0 var(--space-16);
  max-width: 18ch;
  font-size: clamp(34px, 4.4vw, 64px);
  font-weight: var(--weight-bold); line-height: 1.12; letter-spacing: -0.02em;
  color: var(--color-text); text-wrap: balance;
}
.platform__wide {
  margin: 0 0 var(--gap-section);
  border-radius: var(--radius-image);
  overflow: hidden;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-med);
}
.platform__wide img { display: block; width: 100%; aspect-ratio: 21 / 9; object-fit: cover; }

.platform__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--gap-card);
}
.platform__module {
  display: flex; flex-direction: column;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  text-decoration: none;
  transition: transform var(--motion-medium) var(--ease-smooth),
              box-shadow var(--motion-medium) var(--ease-smooth),
              border-color var(--motion-medium) var(--ease-smooth);
}
.platform__module:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-med);
  border-color: var(--color-border-strong);
}
.platform__module:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }
.platform__module-img { display: block; overflow: hidden; }
.platform__module-img img {
  display: block; width: 100%; aspect-ratio: 16 / 10; object-fit: cover;
  transition: transform var(--motion-slow) var(--ease-smooth);
}
.platform__module:hover .platform__module-img img { transform: scale(1.04); }
.platform__module-body { display: block; padding: var(--space-6) var(--space-6) var(--space-8); }
.platform__module-title {
  display: block; font-size: 18px; font-weight: var(--weight-semibold);
  color: var(--color-text); margin-bottom: var(--space-2);
}
.platform__module-copy { display: block; font-size: var(--type-caption); line-height: 1.5; color: var(--color-text-secondary); }

@media (max-width: 1024px) { .platform__grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .platform__grid { grid-template-columns: 1fr; } }
@media (prefers-reduced-motion: reduce) {
  .platform__module, .platform__module-img img { transition: none; }
  .platform__module:hover { transform: none; }
  .platform__module:hover .platform__module-img img { transform: none; }
}
</style>
