<script setup lang="ts">
// PERSISTENT SCENE HEADER — the only chrome in the experience (§9).
//
// A hairline-thin, translucent bar: two editorial navs flanking the SVARA
// wordmark. Rendered ONCE above the scene so it never flickers as the overlays
// cross-fade beneath it, and deliberately quiet so it can never compete with a
// dashboard. Not a navbar container — a rule and some type.
//
// Below the desktop width the flanking navs have no room, so it collapses to
// wordmark + a compact menu that opens the same routes.
//
// Routes are real routes from the site's navigation source; nothing here invents
// a destination.
import { onBeforeUnmount, ref, watch } from 'vue'
import { useSceneProgress } from '~/composables/useSceneProgress'

const LEFT = [
  { label: 'Products', to: '/products' },
  { label: 'Technology', to: '/technology' },
  { label: 'Industries', to: '/industries' },
]
const RIGHT = [
  { label: 'Company', to: '/about' },
  { label: 'Ecosystem', to: '/ecosystem' },
]
const CTA = { label: 'Contact', to: '/contact' }

const open = ref(false)
const progressEl = ref<HTMLElement | null>(null)

// A one-pixel read-out of where you are in the film. It is the only progress
// affordance in the experience — there are no section anchors to jump between.
useSceneProgress((p) => {
  const node = progressEl.value
  if (node) node.style.transform = `scaleX(${p.toFixed(4)})`
})

function lockScroll(locked: boolean): void {
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}
watch(open, (v) => lockScroll(v))
onBeforeUnmount(() => lockScroll(false))
</script>

<template>
  <header class="sh">
    <nav class="sh__nav sh__nav--l" aria-label="Primary">
      <NuxtLink v-for="i in LEFT" :key="i.to" :to="i.to" class="sh__link">{{ i.label }}</NuxtLink>
    </nav>

    <NuxtLink to="/" class="sh__brand" aria-label="SVARA — home">
      <span aria-hidden="true" class="sh__brand-rule sh__brand-rule--l" />
      <span class="sh__brand-mark">SVARA</span>
      <span aria-hidden="true" class="sh__brand-rule sh__brand-rule--r" />
    </NuxtLink>

    <nav class="sh__nav sh__nav--r" aria-label="Secondary">
      <NuxtLink v-for="i in RIGHT" :key="i.to" :to="i.to" class="sh__link">{{ i.label }}</NuxtLink>
      <NuxtLink :to="CTA.to" class="sh__link sh__link--cta">{{ CTA.label }}</NuxtLink>
    </nav>

    <button
      type="button"
      class="sh__burger"
      :aria-expanded="open"
      aria-controls="scene-menu"
      @click="open = !open"
    >
      {{ open ? 'Close' : 'Menu' }}
    </button>

    <div id="scene-menu" class="sh__sheet" :class="{ 'is-open': open }">
      <NuxtLink
        v-for="i in [...LEFT, ...RIGHT, CTA]"
        :key="`m-${i.to}`"
        :to="i.to"
        class="sh__sheet-link"
        @click="open = false"
      >{{ i.label }}</NuxtLink>
    </div>

    <span ref="progressEl" class="sh__progress" aria-hidden="true" />
  </header>
</template>

<style scoped>
.sh {
  position: absolute;
  inset-inline: 0;
  top: 0;
  z-index: 30;
  height: var(--ps-header-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: clamp(18px, 2.2vw, 34px);
  border-bottom: 1px solid var(--ps-line-soft);
  background: rgba(255, 255, 255, 0.62);
  backdrop-filter: blur(14px) saturate(1.2);
  -webkit-backdrop-filter: blur(14px) saturate(1.2);
  pointer-events: auto;
  font-size: 12.5px;
  letter-spacing: 0.01em;
  color: var(--ps-navy);
}

.sh__nav { display: flex; align-items: center; gap: clamp(18px, 2.2vw, 38px); }

.sh__link {
  color: var(--ps-muted);
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.25s ease;
}
.sh__link:hover { color: var(--ps-navy); }
.sh__link--cta { color: var(--ps-navy); text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 1px; }

.sh__brand {
  position: absolute;
  left: 50%;
  translate: -50% 0;
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: var(--ps-navy);
}
.sh__brand-mark { font-size: 13px; font-weight: 500; letter-spacing: 0.24em; }
.sh__brand-rule { width: 68px; height: 1px; }
.sh__brand-rule--l { background: linear-gradient(90deg, transparent, var(--ps-line)); }
.sh__brand-rule--r { background: linear-gradient(270deg, transparent, var(--ps-line)); }

.sh__burger {
  display: none;
  border: 0;
  background: none;
  padding: 6px 0;
  font: inherit;
  color: var(--ps-navy);
  cursor: pointer;
}

.sh__sheet {
  position: fixed;
  inset: var(--ps-header-h) 0 auto;
  display: none;
  flex-direction: column;
  gap: 2px;
  padding: 18px clamp(18px, 5vw, 34px) 26px;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-bottom: 1px solid var(--ps-line);
}
.sh__sheet.is-open { display: flex; }
.sh__sheet-link {
  padding: 11px 0;
  font-family: 'SVARA Display', var(--font-sans);
  font-size: 20px;
  font-weight: 200;
  letter-spacing: -0.02em;
  color: var(--ps-navy);
  text-decoration: none;
  border-bottom: 1px solid var(--ps-line-soft);
}

/* The film's one progress read-out. */
.sh__progress {
  position: absolute;
  inset-inline: 0;
  bottom: -1px;
  height: 1px;
  background: var(--ps-blue);
  transform: scaleX(0);
  transform-origin: 0 50%;
  opacity: 0.85;
}

@media (max-width: 900px) {
  .sh__nav { display: none; }
  .sh__brand { position: static; translate: none; }
  .sh__brand-rule { display: none; }
  .sh__burger { display: block; }
  .sh { justify-content: space-between; }
}
</style>
