<script setup lang="ts">
// SystemCard — the reusable Design System 2.0 card. A designed system panel (not a
// SaaS tile): low radius, hairline technical border, corner markers, an oversized
// index + technical label header, an optional framed media slot, and a metadata /
// status strip. Variants change the geometry and emphasis. Colours inherit from the
// consuming context (light .svara-home / .px or dark cinematic), with --sys-mark /
// --sys-line overridable. Composes styles/system.css.
withDefaults(defineProps<{
  variant?: 'framed' | 'angular' | 'split' | 'technical' | 'dashboard' | 'media' | 'hero'
  n?: string
  label?: string
  title?: string
  status?: string
  to?: string
}>(), { variant: 'framed' })
</script>

<template>
  <component
    :is="to ? resolveComponent('NuxtLink') : 'article'"
    :to="to || undefined"
    class="sc sys-corners"
    :class="[`sc--${variant}`, { 'sys-clip-tr': variant === 'angular', 'sys-clip-diag': variant === 'framed' || variant === 'technical' }]"
  >
    <header v-if="n || label" class="sc__head">
      <span v-if="n" class="sc__n sys-num">{{ n }}</span>
      <span class="sc__head-r">
        <span v-if="label" class="sc__label sys-label">{{ label }}</span>
        <span v-if="status" class="sc__status sys-status"><span class="sys-status-dot" /><span class="sys-label sys-label--sm">{{ status }}</span></span>
      </span>
    </header>

    <div v-if="$slots.media" class="sc__media sys-panel--sharp">
      <span class="sc__media-corner sc__media-corner--tl" aria-hidden="true" />
      <span class="sc__media-corner sc__media-corner--br" aria-hidden="true" />
      <slot name="media" />
    </div>

    <h3 v-if="title" class="sc__title">{{ title }}</h3>
    <div v-if="$slots.default" class="sc__body"><slot /></div>

    <div v-if="$slots.meta" class="sc__meta sys-metastrip"><slot name="meta" /></div>
  </component>
</template>

<style scoped>
.sc {
  position: relative; display: flex; flex-direction: column;
  padding: clamp(20px, 2.4vw, 32px);
  border: 1px solid var(--sys-line);
  background: var(--sys-surface, rgba(255, 255, 255, 0.5));
  color: inherit; text-decoration: none;
  transition: border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.sc:hover { border-color: var(--sys-line-strong); }
a.sc:hover { transform: translateY(-3px); }

.sc__head { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 20px; }
.sc__n { font-size: clamp(28px, 3vw, 46px); color: var(--sys-mark); opacity: 0.9; }
.sc__head-r { display: inline-flex; flex-direction: column; align-items: flex-end; gap: 8px; text-align: right; }
.sc__label { color: var(--sys-label-color, inherit); opacity: 0.7; }
.sc__status { gap: 8px; }

.sc__media { position: relative; margin-bottom: 20px; overflow: hidden; aspect-ratio: 16 / 10; background: rgba(10, 25, 50, 0.04); }
.sc__media :deep(img), .sc__media :deep(video), .sc__media :deep(canvas), .sc__media :deep(svg) { width: 100%; height: 100%; object-fit: cover; display: block; }
.sc__media-corner { position: absolute; width: 12px; height: 12px; z-index: 2; pointer-events: none; }
.sc__media-corner--tl { top: 8px; left: 8px; border-top: 1px solid var(--sys-mark); border-left: 1px solid var(--sys-mark); }
.sc__media-corner--br { bottom: 8px; right: 8px; border-bottom: 1px solid var(--sys-mark); border-right: 1px solid var(--sys-mark); }

.sc__title { margin: 0; font-size: clamp(19px, 2vw, 28px); font-weight: 600; letter-spacing: -0.02em; line-height: 1.08; }
.sc__body { margin-top: 12px; font-size: 14px; line-height: 1.6; opacity: 0.86; }

/* variant accents */
.sc--hero { padding: clamp(32px, 4vw, 56px); }
.sc--split .sc__head { margin-bottom: auto; }
.sc--split { min-height: 220px; }
.sc--media .sc__media { aspect-ratio: 4 / 3; }
.sc--dashboard { background: var(--sys-surface, #fff); }
.sc--technical .sc__n { font-size: clamp(20px, 2vw, 30px); }
</style>
