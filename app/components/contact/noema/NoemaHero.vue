<script setup lang="ts">
/**
 * NoemaHero — the DOM overlay for the contact hero, layered above the
 * <HeadParticles> canvas.
 *
 * Layout — two layouts, one tree:
 * - **≥ 720px:** the split headline is vertically centred against the left and
 *   right edges and the bottom block is pinned to the floor, so the headline
 *   stays centred on a tall window while the bottom block hugs the bottom.
 * - **< 720px:** the same blocks become a flow column (the headline band taking
 *   `flex: 1`). Nothing is pinned, so nothing can collide: on a short phone the
 *   middle band shrinks and the headline moves with it, instead of the bottom
 *   block sliding up under absolutely-placed text.
 *
 * There is deliberately no header row here. The Noema reference put its brand,
 * clock and nav links along the top of the hero; this site has one global
 * navigation that owns that band on every page, and no page may reposition or
 * restyle it — so the hero starts below it and the meta that mattered (where we
 * are, how fast we answer) moves into the bottom-right card.
 *
 * Motion: everything springs in on the page's intro beat via CSS transitions,
 * staggered; hovers are separate leaf-level transitions so they never fight an
 * entrance transform.
 */
import NoemaHeadline from './NoemaHeadline.vue'

defineProps<{
  /** Has the page's intro beat fired? */
  revealed: boolean
  /** Where we are — verified HQ. */
  location: string
  /** How fast we answer — the promise the form section repeats. */
  response: string
}>()

const emit = defineEmits<{ start: [] }>()
</script>

<template>
  <div class="nmo">
    <!-- The accessible heading. The flanking display words are decorative. -->
    <h1 class="nmo__sr">
      Contact SVARA
    </h1>

    <NoemaHeadline left="Begin" right="Build" :revealed="revealed" />

    <div class="nmo__foot">
      <div class="nmo__lead" :class="{ 'is-in': revealed }">
        <p v-glitch="{ intensity: 0.68, delay: 2.6 }" class="nmo__sub">
          Tell us what you are trying to build. Enterprise, partnerships,
          investment and careers all start here — and reach a person, not a queue.
        </p>
        <!-- Two short CTAs side by side even on mobile: stacking them costs about
             50px of height on the phone layout's tightest axis and buys nothing. -->
        <div class="nmo__ctas">
          <button type="button" class="nmo__btn nmo__btn--primary" @click="emit('start')">
            Send a message
          </button>
          <NuxtLink to="/products" class="nmo__btn nmo__btn--ghost">
            See the platform
          </NuxtLink>
        </div>
      </div>

      <div class="nmo__card" :class="{ 'is-in': revealed }">
        <div class="nmo__card-mark" aria-hidden="true">
          <span class="nmo__card-orb" />
        </div>
        <div class="nmo__card-body">
          <p class="nmo__card-label">
            Direct line
          </p>
          <div class="nmo__card-lines">
            <p class="nmo__card-title">
              {{ location }}
            </p>
            <p class="nmo__card-meta">
              {{ response }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nmo {
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  color: var(--noema-ink, #fff);
}

/* visually hidden, still announced */
.nmo__sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}

.nmo__foot {
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  gap: 20px;
  padding: 0 20px 20px;
}

.nmo__lead,
.nmo__card {
  pointer-events: auto;
  opacity: 0;
  transform: translateY(30px);
  /* Soft, overdamped settle — glides to rest with no overshoot and no snap. */
  transition:
    opacity 900ms cubic-bezier(0.22, 1, 0.36, 1) var(--nmo-delay, 0ms),
    transform 900ms cubic-bezier(0.22, 1, 0.36, 1) var(--nmo-delay, 0ms);
}
.nmo__lead { --nmo-delay: 60ms; display: flex; flex-direction: column; gap: 16px; }
/* The global chatbot trigger is fixed to the bottom-right corner of every page,
   so the card is lifted clear of it rather than sitting on the floor with the
   lead. `align-items: flex-end` on the row means this moves only the card. */
.nmo__card { --nmo-delay: 180ms; margin-bottom: 62px; }
.nmo__lead.is-in,
.nmo__card.is-in { opacity: 1; transform: translateY(0); }

.nmo__sub {
  margin: 0;
  width: 100%;
  font-size: clamp(13px, 1.05vw, 15px);
  line-height: 1.5;
  color: color-mix(in srgb, var(--noema-ink, #fff) 70%, transparent);
}

.nmo__ctas { display: flex; gap: 12px; }

.nmo__btn {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 13px 16px;
  border: 0;
  font: inherit;
  font-size: clamp(12px, 0.95vw, 14px);
  line-height: 1.2;
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
  transition:
    background-color 450ms cubic-bezier(0.2, 0, 0, 1),
    transform 450ms cubic-bezier(0.2, 0, 0, 1);
}
.nmo__btn--primary {
  background: var(--noema-ink, #fff);
  color: var(--noema-backdrop, #000);
}
.nmo__btn--primary:hover {
  background: color-mix(in srgb, var(--noema-ink, #fff) 90%, transparent);
  transform: translateY(-2px);
}
.nmo__btn--ghost {
  background: color-mix(in srgb, var(--noema-ink, #fff) 20%, transparent);
  color: var(--noema-ink, #fff);
}
.nmo__btn--ghost:hover {
  background: color-mix(in srgb, var(--noema-ink, #fff) 30%, transparent);
  transform: translateY(-2px);
}

/* The card carries the two facts the dropped header row used to: where we are,
   and how fast we answer. Information, not navigation — so it is not a link. */
.nmo__card {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 12px;
  padding: 4px 12px 4px 4px;
  background: var(--noema-ink, #fff);
  color: var(--noema-backdrop, #000);
}
.nmo__card-mark {
  flex-shrink: 0;
  width: 72px;
  height: 72px;
  overflow: hidden;
  background: var(--noema-backdrop, #000);
}
.nmo__card-orb {
  display: block;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 45%, rgba(150, 185, 255, 0.95), rgba(20, 35, 80, 0.6) 45%, transparent 72%);
}
.nmo__card-body { display: flex; flex: 1; flex-direction: column; gap: 8px; }
.nmo__card-label {
  margin: 0;
  font-size: clamp(11px, 0.85vw, 13px);
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.nmo__card-lines { display: flex; flex-direction: column; gap: 4px; line-height: 1.2; }
.nmo__card-title { margin: 0; font-size: clamp(13px, 1vw, 15px); }
.nmo__card-meta {
  margin: 0;
  font-size: clamp(11px, 0.85vw, 13px);
  color: color-mix(in srgb, var(--noema-backdrop, #000) 55%, transparent);
}

@media (min-width: 720px) {
  .nmo__foot {
    position: absolute;
    inset-inline: 0;
    bottom: 0;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    gap: 32px;
    padding: 0 clamp(20px, 2.1vw, 30px) clamp(20px, 2.1vw, 30px);
  }
  .nmo__lead { gap: 26px; }
  .nmo__sub { width: 440px; max-width: 100%; }
  /* Sized by content, not by a fixed slab: a mono face's width per character is
     fixed but its total is not, and a hard width clips the label the moment the
     copy changes. Equal padding keeps the pair reading as a set. */
  .nmo__btn { flex: none; padding: 14px 26px; }
  .nmo__card { width: 380px; }
  .nmo__card-mark { width: 104px; height: 104px; }
  .nmo__card-body { gap: 18px; }
}

@media (prefers-reduced-motion: reduce) {
  .nmo__lead,
  .nmo__card { transition-duration: 1ms; transition-delay: 0ms; }
  .nmo__btn:hover { transform: none; }
}
</style>
