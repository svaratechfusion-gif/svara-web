<script setup lang="ts">
// THE image treatment for the whole site — every large image container
// renders through this one component:
//   · glass frame (radius token, hairline border, ambient shadow)
//   · LAYERED reflections: top sheen + cursor-following gloss (--mx/--my)
//   · subtle edge highlight (inner top-light line)
//   · cursor micro-parallax on the media plane (±strength px, CSS-only,
//     separate wrapper so it never fights GSAP scroll parallax / masks)
//   · slot for overlays (telemetry chips, captions)
// Outer attrs (data-mask-reveal, data-parallax, class) fall through to the
// <figure>, so scroll systems bind exactly as before.
withDefaults(defineProps<{
  src: string
  alt: string
  /** aspect ratio, e.g. '16/10'; 'auto' = natural */
  ratio?: string
  loading?: 'lazy' | 'eager'
  fetchpriority?: 'high' | 'low' | 'auto'
  /** cursor micro-parallax strength in px (0 disables) */
  cursor?: number
  /** corner radius token */
  radius?: 'glass' | 'image'
}>(), { ratio: 'auto', loading: 'lazy', fetchpriority: 'auto', cursor: 6, radius: 'image' })
</script>

<template>
  <figure
    class="glass-image"
    :class="`glass-image--r-${radius}`"
    :style="ratio !== 'auto' ? { aspectRatio: ratio } : undefined"
  >
    <span class="glass-image__cursor" :style="{ '--gi-cursor': cursor + 'px' }">
      <img :src="src" :alt="alt" :loading="loading" :fetchpriority="fetchpriority" class="glass-image__img" >
    </span>
    <span class="glass-image__sheen" aria-hidden="true" />
    <span class="glass-image__gloss" aria-hidden="true" />
    <span class="glass-image__edge" aria-hidden="true" />
    <slot />
  </figure>
</template>

<style scoped>
.glass-image {
  position: relative;
  margin: 0;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-glass);
  overflow: hidden;
  isolation: isolate;
}
.glass-image--r-image { border-radius: var(--radius-image); }
.glass-image--r-glass { border-radius: var(--radius-glass); }

/* media plane — cursor micro-parallax lives here, nothing else */
.glass-image__cursor {
  display: block;
  width: 100%;
  height: 100%;
  transform: translate3d(
    calc((var(--mx, 0.5) - 0.5) * var(--gi-cursor, 6px)),
    calc((var(--my, 0.5) - 0.5) * var(--gi-cursor, 6px)),
    0
  );
  will-change: transform;
}
.glass-image__img {
  display: block;
  width: calc(100% + (var(--gi-cursor, 6px) * 2));
  height: calc(100% + (var(--gi-cursor, 6px) * 2));
  margin: calc(var(--gi-cursor, 6px) * -1);
  object-fit: cover;
}

/* layered reflection 1 — static top sheen */
.glass-image__sheen {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0) 30%);
  opacity: 0.5;
  pointer-events: none;
}

/* layered reflection 2 — cursor-following gloss (very quiet) */
.glass-image__gloss {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    520px circle at calc(var(--mx, 0.5) * 100%) calc(var(--my, 0.35) * 100%),
    rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0) 60%
  );
  pointer-events: none;
}

/* edge highlight — inner top-light hairline */
.glass-image__edge {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.65), inset 0 0 0 1px rgba(255, 255, 255, 0.18);
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .glass-image__cursor { transform: none; will-change: auto; }
  .glass-image__gloss { display: none; }
}
</style>
