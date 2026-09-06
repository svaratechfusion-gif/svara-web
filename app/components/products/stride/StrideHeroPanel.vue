<script setup lang="ts">
/**
 * SCENE C — the interactive hero panel, in place of the chrome GLB model.
 *
 * Ported from the supplied React/Tailwind/Framer-Motion reference. Three
 * deliberate translations, because this project is none of those things:
 *
 *  · NO TAILWIND. Every utility is written as real CSS at its Tailwind value.
 *    Dead Tailwind classes render as NOTHING here — that mistake is already
 *    recorded elsewhere in this codebase, so the reference's class strings are
 *    translated rather than pasted.
 *  · NO FRAMER MOTION. The drop-ins, the spring check and the height-auto
 *    banner are CSS transitions and a <Transition>; they cost no runtime and
 *    honour reduced-motion for free.
 *  · NO NAVBAR. The reference ships its own ("Mainframe®", Labs/Studio/…);
 *    this site already has GlobalNavigation, and a second one would be both a
 *    duplicate and someone else's brand.
 *
 * THE CLIP IS GONE. The panel was a cursor-scrubbed humanoid video over an
 * opaque white ground, which hid two things the section already owned: the blue
 * gradient backdrop (STRIDE_CHAIN.base) and the travelling chrome model. The
 * panel is now transparent copy over that backdrop, so the blue reads again and
 * the model is the only figure in the frame. The scrub rig, its springs and its
 * ticker went with the clip — nothing else here used them.
 */
import { ref, computed } from 'vue'
import { Check } from '@lucide/vue'
import { useTypewriter } from '~/composables/useTypewriter'
import { STRIDE_HERO } from '~~/lib/stride/content'

const picked = ref<string[]>([])

const { displayed, done } = useTypewriter(STRIDE_HERO.headline, 38, 600)
const summary = computed(() => picked.value.join(', '))

function toggle(option: string) {
  picked.value = picked.value.includes(option)
    ? picked.value.filter(o => o !== option)
    : [...picked.value, option]
}

</script>

<template>
  <div class="sxh">
    <div class="sxh__content">
      <h2 class="sxh__headline">{{ displayed }}<span v-if="!done" class="sxh__caret" aria-hidden="true" /></h2>
      <p class="sxh__body">{{ STRIDE_HERO.body }}</p>

      <p class="sxh__prompt">{{ STRIDE_HERO.promptTitle }}</p>
      <p class="sxh__sub">{{ STRIDE_HERO.promptSub }}</p>

      <div class="sxh__pills" role="group" :aria-label="STRIDE_HERO.promptTitle">
        <button
          v-for="option in STRIDE_HERO.options" :key="option"
          type="button" class="sxh__pill"
          :class="{ 'is-on': picked.includes(option) }"
          :aria-pressed="picked.includes(option)"
          @click="toggle(option)"
        >
          <Transition name="sxh-check">
            <Check v-if="picked.includes(option)" class="sxh__check" :size="15" :stroke-width="3" />
          </Transition>
          {{ option }}
        </button>
      </div>

      <!-- Two independent transitions, deliberately NOT `mode="out-in"`: that mode
           holds the incoming element until the outgoing one's transition ENDS, so
           anywhere transitions do not run — a backgrounded tab, a stalled frame —
           the banner simply never arrives. Mutually exclusive conditions give the
           same result without depending on a transition firing. -->
      <p v-if="!picked.length" class="sxh__hint">{{ STRIDE_HERO.emptyHint }}</p>

      <Transition name="sxh-banner">
        <div v-if="picked.length" class="sxh__banner">
          <p class="sxh__banner-text">
            {{ STRIDE_HERO.bannerPrefix }} <strong>{{ summary }}</strong>
          </p>
          <NuxtLink :to="STRIDE_HERO.ctaTo" class="sxh__go">
            {{ STRIDE_HERO.cta }} <span aria-hidden="true">&#8594;</span>
          </NuxtLink>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
/* TRANSPARENT, deliberately: the blue gradient backdrop rendered by
   StrideChainProduct sits behind this panel, and an opaque ground here is what
   hid it. The ink below is light for the same reason. */
.sxh { position: relative; width: 100%; height: 100%; overflow: hidden; background: transparent; }

/* z-index 2: the travelling chrome model sits at 1, and the copy stays above it.
   Both share this stacking context — .sxh is position:relative, z-index auto. */
.sxh__content {
  position: relative; z-index: 2;
  display: flex; flex-direction: column; justify-content: center;
  width: 100%; max-width: 80rem; height: 100%;
  margin: 0 auto; padding: 3rem 1.5rem;
}
@media (min-width: 1024px) { .sxh__content { padding: 3rem 2.5rem; } }

/* headline — the reference's 76px cap, with its own blink caret */
.sxh__headline {
  margin: 0 0 2rem;
  max-width: 22ch;
  font-size: clamp(2.25rem, 6vw, 4.75rem);
  font-weight: 400; line-height: 1.08; letter-spacing: -0.02em;
  color: #fff; white-space: pre-wrap; user-select: none;
}
.sxh__caret {
  display: inline-block; width: 2px; height: 1.1em; margin-left: 2px;
  background: #fff; vertical-align: middle;
  animation: sxh-blink 1s step-end infinite;
}
@keyframes sxh-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

.sxh__body {
  margin: 0 0 3.5rem; max-width: 42rem;
  font-size: clamp(1rem, 1.2vw, 1.25rem); line-height: 1.7; color: rgb(255 255 255 / 0.82);
}

.sxh__prompt { margin: 0 0 0.5rem; font-size: 1.5rem; font-weight: 500; letter-spacing: -0.02em; color: #fff; }
.sxh__sub { margin: 0 0 2rem; font-size: 1rem; color: rgb(255 255 255 / 0.7); }

.sxh__pills { display: flex; flex-wrap: wrap; gap: 0.625rem; }
.sxh__pill {
  display: inline-flex; align-items: center; gap: 0.4rem;
  padding: 0.7rem 1.15rem; border-radius: 999px;
  border: 1px solid #f1f3f1; background: #fff; color: #1c2e1e;
  font: inherit; font-size: 0.95rem; cursor: pointer;
  transition: background-color 220ms ease, color 220ms ease, border-color 220ms ease, transform 220ms ease;
}
.sxh__pill:hover { background: rgb(241 243 241 / 0.55); }
.sxh__pill.is-on {
  background: #1c2e1e; color: #fff; border-color: #1c2e1e;
  box-shadow: 0 4px 14px rgb(6 46 30 / 0.14);
}
/* Sized in CSS as well as via the icon's own attributes, so the box is fixed
   whatever the icon library emits. */
.sxh__check { flex: none; width: 15px; height: 15px; }
/* the reference springs this in; a short overshoot reads the same */
.sxh-check-enter-active { transition: transform 260ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 160ms ease; }
.sxh-check-leave-active { transition: transform 140ms ease, opacity 140ms ease; }
.sxh-check-enter-from, .sxh-check-leave-to { transform: scale(0.2); opacity: 0; }

.sxh__hint { margin: 1.25rem 0 0; font-size: 0.8rem; font-style: italic; color: rgb(255 255 255 / 0.6); }

.sxh__banner {
  display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem;
  margin: 1.25rem 0 0; padding: 1rem 1.25rem;
  border: 1px solid #f1f3f1; border-radius: 1rem; background: #fafbf9;
}
.sxh__banner-text { margin: 0; font-size: 0.95rem; color: #1c2e1e; }
.sxh__go {
  display: inline-flex; align-items: center; gap: 0.4rem;
  font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase;
  color: #4d6d47; text-decoration: none;
}
.sxh__go:hover { text-decoration: underline; }

/* the banner grows in rather than appearing */
.sxh-banner-enter-active, .sxh-banner-leave-active { transition: opacity 260ms ease, transform 260ms ease; }
.sxh-banner-enter-from, .sxh-banner-leave-to { opacity: 0; transform: translateY(6px); }

@media (prefers-reduced-motion: reduce) {
  .sxh__caret { animation: none; }
  .sxh-check-enter-active, .sxh-check-leave-active,
  .sxh-banner-enter-active, .sxh-banner-leave-active { transition: none; }
}
</style>
