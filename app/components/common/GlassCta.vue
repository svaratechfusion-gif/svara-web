<script setup lang="ts">
// GlassCta — the ONE reusable CTA, shared by every page that ends with a CTA
// (home §11 Intelligence Fabric, ecosystem, divisions, technology, architecture…).
// Design SKIN only: all copy/labels/links/icons come from the calling page via
// slots/props and are preserved verbatim.
//
// Structure = a two-column FLEX row inside a white card:
//   LEFT  (.gcta__content) — the SVARA CTA content
//   RIGHT (.gcta__visual)  — a flex container whose ONLY child is the orb <video>.
// The orb webm has an ALPHA (transparent) background, so it is simply a plain
// element in the flex row — never a section/body/canvas/absolute background, no
// stage/glow layer behind it, no tint on its parent.
interface CtaAction { label: string, to: string }

defineProps<{
  code: string        // the mono system tag, e.g. "SVARA · INTELLIGENCE FABRIC / IX-∞"
  lead: string        // the description paragraph (plain text)
  primary: CtaAction  // primary button (label + link) — kept exactly as the page has it
  secondary: CtaAction
}>()
</script>

<template>
  <section class="gcta hx-section">
    <div class="hx-container">
      <div class="gcta__card">
        <!-- LEFT: the CTA content -->
        <div class="gcta__content">
          <span class="gcta__code hx-mono">{{ code }}</span>
          <p class="gcta__eyebrow hx-mono"><slot name="eyebrow" /></p>
          <h2 class="gcta__title"><slot name="title" /></h2>
          <p class="gcta__lead">{{ lead }}</p>

          <div class="gcta__actions">
            <NuxtLink :to="primary.to" class="gcta__btn gcta__btn--primary">
              <span>{{ primary.label }}</span>
              <span class="gcta__btn-icon" aria-hidden="true">
                <svg width="14" height="10" viewBox="0 0 16 10" fill="none"><path d="M0 5h14M14 5l-4-4M14 5l-4 4" stroke="currentColor" stroke-width="1.5" /></svg>
              </span>
            </NuxtLink>
            <NuxtLink :to="secondary.to" class="gcta__btn gcta__btn--ghost">{{ secondary.label }}</NuxtLink>
          </div>
        </div>

        <!-- RIGHT: a flex container whose only child is the orb video -->
        <div class="gcta__visual">
          <video
            class="gcta__orb"
            src="/orb-blue.webm"
            autoplay
            loop
            muted
            playsinline
            preload="auto"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gcta { position: relative; }

/* one WHITE card, two columns as a flex row */
.gcta__card {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 40px;
  background: #ffffff;
  border: 1px solid rgba(16, 42, 91, 0.08);
  box-shadow: 0 44px 120px -48px rgba(16, 42, 91, 0.26);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
/* subtle layered gradient glow in the TOP-LEFT (#60B1FF / #319AFF) — behind the
   content only; NOT behind the orb */
.gcta__card::before {
  content: "";
  position: absolute;
  top: -22%;
  left: -10%;
  width: 52%;
  height: 90%;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(closest-side, rgba(96, 177, 255, 0.3), rgba(96, 177, 255, 0) 70%),
    radial-gradient(closest-side at 42% 32%, rgba(49, 154, 255, 0.22), rgba(49, 154, 255, 0) 72%);
  filter: blur(38px);
}
@media (min-width: 1024px) {
  .gcta__card { flex-direction: row; align-items: stretch; }
}

/* ---- LEFT column (content) ---- */
.gcta__content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  padding: clamp(40px, 5vw, 76px) clamp(28px, 4vw, 60px);
}
@media (min-width: 1024px) {
  .gcta__content { width: 50%; justify-content: center; }
}
.gcta__code { font-size: 9.5px; letter-spacing: 0.18em; color: var(--ink-muted); text-transform: uppercase; }
.gcta__eyebrow {
  margin: 22px 0 0;
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink-muted);
}
.gcta__eyebrow :deep(.hx-index) { color: var(--sig); }
.gcta__title {
  margin: 18px 0 0;
  font-family: var(--font-sans);
  font-size: clamp(36px, 3.9vw, 60px);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.03;
  color: var(--ink-primary);
  text-wrap: balance;
}
.gcta__title :deep(.lite) { color: var(--ink-secondary); }
.gcta__lead {
  margin: 22px 0 0;
  max-width: 46ch;
  font-size: var(--type-lead, 20px);
  line-height: 1.55;
  color: var(--ink-secondary);
  text-wrap: pretty;
}

/* ---- actions ---- */
.gcta__actions { margin-top: 36px; display: flex; flex-wrap: wrap; gap: 14px; justify-content: flex-start; }
.gcta__btn {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 14px 22px 14px 26px;
  border-radius: 16px;
  font-size: 15px; font-weight: 500; letter-spacing: -0.01em;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease;
}
.gcta__btn:hover { transform: scale(1.02); }
.gcta__btn--primary {
  color: #fff;
  background: rgba(0, 132, 255, 0.8);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow: inset 0 4px 4px 0 rgba(255, 255, 255, 0.35), 0 14px 34px -12px rgba(0, 132, 255, 0.55);
}
.gcta__btn--primary:hover { background: rgba(0, 132, 255, 0.9); }
.gcta__btn-icon {
  display: inline-flex; align-items: center; justify-content: center;
  width: 24px; height: 24px; border-radius: 50%;
  background: #fff; color: #0084ff;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.gcta__btn--primary:hover .gcta__btn-icon { transform: translateX(2px); }
.gcta__btn--ghost {
  color: var(--ink-primary);
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6);
  padding: 14px 26px;
}
.gcta__btn--ghost:hover { background: rgba(255, 255, 255, 0.55); }

/* ---- RIGHT column: a plain flex container, orb video as its only child ---- */
.gcta__visual {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;              /* orb centred vertically */
  justify-content: center;          /* orb centred horizontally */
  padding: clamp(24px, 5%, 56px);   /* orb occupies ~85–90% of the column */
  min-height: clamp(300px, 34vw, 500px);
  /* NO background, NO tint, NO glow layer behind the orb */
}
@media (min-width: 1024px) {
  .gcta__visual { width: 50%; }
}
/* orb — a normal element in the flex row (alpha webm, transparent bg). Copied
   from the reference: full-size, object-contain, screen blend, colour grade to
   SVARA blue. No absolute positioning, no scale bleed. */
.gcta__orb {
  width: 100%;
  height: 100%;
  object-fit: contain;
  mix-blend-mode: screen;
  filter: hue-rotate(-55deg) saturate(250%) brightness(1.2) contrast(1.1);
}

@media (max-width: 1023px) {
  .gcta__visual { order: 2; min-height: clamp(260px, 66vw, 420px); }
}
@media (max-width: 640px) {
  .gcta__card { border-radius: 28px; }
  .gcta__actions { flex-direction: column; align-items: stretch; width: 100%; max-width: 340px; }
  .gcta__btn { justify-content: center; }
}
</style>
