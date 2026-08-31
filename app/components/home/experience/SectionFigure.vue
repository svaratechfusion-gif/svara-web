<script setup lang="ts">
/**
 * SectionFigure — a full-width illustrative render inside a homepage section.
 *
 * WebP first with a PNG fallback: these renders are ~2.5MB as PNG and ~0.25MB as
 * WebP, and the homepage already ships several megabytes of product art.
 *
 * `zoomable` links the figure to the full-resolution file. The products render is
 * a dense infographic — at section width its body text is well below a readable
 * size, so without a way to open it full-size the words in it are decorative.
 * That link is not a substitute for real text: anything load-bearing in these
 * images should also exist as HTML.
 *
 * Class names avoid the `__card` / `__panel` / `__tile` / `__frame` suffixes —
 * styles/svara-3d.css attaches bevel, hover-lift and a cursor tilt to those by
 * attribute selector, which would drag a large static illustration around.
 */
defineProps<{
  /** Basename in /public/images/home/sections, without extension. */
  name: string
  /** Describes the image's CONTENT for anyone who cannot see it. */
  alt: string
  caption?: string
  /** Link through to the full-resolution file. */
  zoomable?: boolean
  /** Native pixel dimensions — set to reserve space and avoid layout shift. */
  width?: number
  height?: number
  /**
   * Side-by-side mode: the figure sits in its own column beside the section's
   * copy, so it fills that column instead of being capped and centred as a
   * standalone block.
   */
  side?: boolean
}>()

const DIR = '/images/home/sections'
</script>

<template>
  <figure class="sfig" :class="{ 'sfig--side': side }">
    <component
      :is="zoomable ? 'a' : 'div'"
      class="sfig__media"
      :class="{ 'is-zoomable': zoomable }"
      v-bind="zoomable ? {
        href: `${DIR}/${name}.png`,
        target: '_blank',
        rel: 'noopener',
        'aria-label': `${alt} — open the full-resolution image in a new tab`,
      } : {}"
    >
      <picture>
        <source :srcset="`${DIR}/${name}.webp`" type="image/webp">
        <img
          class="sfig__img"
          :src="`${DIR}/${name}.png`"
          :alt="alt"
          :width="width ?? 1254"
          :height="height ?? 1254"
          loading="lazy"
          decoding="async"
          draggable="false"
        >
      </picture>
      <span v-if="zoomable" class="sfig__zoom" aria-hidden="true">
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="4.2" stroke="currentColor" stroke-width="1.3" /><path d="M9.2 9.2 13 13M6 4.2v3.6M4.2 6h3.6" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" /></svg>
        View full size
      </span>
    </component>
    <figcaption v-if="caption" class="sfig__cap">{{ caption }}</figcaption>
  </figure>
</template>

<style scoped>
.sfig { margin: clamp(44px, 6vw, 80px) auto 0; }
/* In side-by-side mode the column already provides the width and the rhythm,
   so drop both the standalone cap and the leading margin. */
.sfig--side { margin: 0; }
.sfig--side .sfig__media { max-width: none; }
.sfig--side .sfig__cap { max-width: none; }
/* These renders are square, so at full container width they run past two
   viewport heights and stop being a supporting figure. Capped, and centred. */
.sfig__media {
  position: relative;
  display: block;
  max-width: 860px;
  margin-inline: auto;
  overflow: hidden;
  border-radius: 2px;
}
.sfig__img { display: block; width: 100%; height: auto; }

.sfig__zoom {
  position: absolute;
  right: 14px;
  bottom: 14px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 12px;
  font-family: var(--font-mono);
  font-size: 9.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-primary);
  background: rgba(255, 255, 255, 0.86);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  box-shadow: inset 0 0 0 1px rgba(20, 34, 63, 0.14);
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 220ms var(--ease-out, ease), transform 220ms var(--ease-out, ease);
}
.sfig__media.is-zoomable:hover .sfig__zoom,
.sfig__media.is-zoomable:focus-visible .sfig__zoom { opacity: 1; transform: none; }
/* keyboard users get the affordance without hover */
.sfig__media.is-zoomable:focus-visible { outline: 2px solid var(--sig, #3f6fb0); outline-offset: 3px; }

.sfig__cap {
  max-width: 860px;
  margin: 14px auto 0;
  font-family: var(--font-mono);
  font-size: 9.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-muted);
}

/* the zoom chip is a hover affordance; on touch it would never appear, so show it */
@media (hover: none) {
  .sfig__media.is-zoomable .sfig__zoom { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .sfig__zoom { transition: none; }
}
</style>
