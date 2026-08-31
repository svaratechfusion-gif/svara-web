<script setup lang="ts">
// One ecosystem chapter — a TRANSPARENT full-screen narrative overlay that floats
// over the persistent WebGL world (no background, no card, no surface). Terminal /
// console chrome in the SVARA sky palette; copy alternates side so the core stands
// opposite. Reveals (line clip-up + word fade) when `active`.
interface Readout { k: string; v: string }
defineProps<{
  idx: string
  side: 'left' | 'right' | 'center'
  eyebrow: string
  title: string[]
  body: string
  readouts: Readout[]
  active: boolean
  cta?: string
}>()
defineEmits<{ cta: [] }>()
</script>

<template>
  <section class="ec-ch" :class="[`ec-ch--${side}`, { 'is-active': active }]">
    <div class="ec-ch__col">
      <p class="ec-ch__eyebrow"><span class="ec-ch__prompt">&gt;</span>{{ eyebrow }}<span class="ec-ch__caret">_</span></p>
      <h2 class="ec-ch__title svara-hero-h1">
        <span v-for="(line, i) in title" :key="i" class="ec-ch__line"><span class="ec-ch__line-in" :style="{ transitionDelay: `${120 + i * 95}ms` }">{{ line }}</span></span>
      </h2>
      <p class="ec-ch__body">{{ body }}</p>
      <div class="ec-ch__readouts">
        <div v-for="(r, i) in readouts" :key="i" class="ec-ch__readout">
          <span class="ec-ch__rk">&#9656; {{ r.k }}</span><span class="ec-ch__rv">{{ r.v }}</span>
        </div>
      </div>
      <button v-if="cta" type="button" class="ec-ch__cta" @click="$emit('cta')">[ {{ cta }} ]</button>
    </div>
  </section>
</template>

<style scoped>
.ec-ch {
  position: relative; z-index: 20;
  min-height: 100vh; min-height: 100dvh;
  display: flex; align-items: center;
  padding: 8rem 2rem 6rem;
  pointer-events: none;
}
@media (min-width: 768px) { .ec-ch { padding-inline: 4rem; } }
@media (min-width: 1024px) { .ec-ch { padding-inline: 6rem; } }
.ec-ch--left { justify-content: flex-start; }
.ec-ch--right { justify-content: flex-end; }
.ec-ch--center { justify-content: center; text-align: center; }

.ec-ch__col {
  max-width: 40rem; width: 100%;
  opacity: 0; transform: translateY(28px);
  transition: opacity 900ms cubic-bezier(0.16, 1, 0.3, 1), transform 900ms cubic-bezier(0.16, 1, 0.3, 1);
}
.ec-ch--center .ec-ch__col { max-width: 44rem; }
.ec-ch.is-active .ec-ch__col { opacity: 1; transform: none; }

.ec-ch__eyebrow {
  display: inline-flex; align-items: center; gap: 0.55rem; margin: 0 0 1.4rem;
  font-size: 0.72rem; letter-spacing: 0.42em; text-transform: uppercase;
  color: rgba(142, 203, 255, 0.75); font-weight: 500;
}
.ec-ch--center .ec-ch__eyebrow { justify-content: center; }
.ec-ch__prompt { color: rgba(142, 203, 255, 0.5); }
.ec-ch__caret { color: var(--brain-sky, #8ecbff); animation: ec-blink 1.05s steps(1) infinite; }
@keyframes ec-blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }

.ec-ch__title { margin: 0; font-weight: 600; letter-spacing: -0.02em; line-height: 1.14; color: #fff; font-size: clamp(2rem, 4.6vw, 3.4rem); }
/* ECOSYSTEM CTA ONLY (chapter 07 = the single `--center` chapter). The shared
   `svara-hero-h1` token renders this closing line far too large AND carries
   `overflow-wrap: break-word`, so long words split mid-character ("Engineerin/g").
   Scope a controlled, premium closing-statement size + WHOLE-WORD wrapping to this
   chapter only — the hero (chapter 01, `--left`) is NOT affected. */
.ec-ch--center .ec-ch__title {
  font-size: clamp(38px, 4.6vw, 82px) !important;
  line-height: 1.06 !important;
  overflow-wrap: normal !important;
  word-break: normal !important;
  hyphens: none !important;
}
.ec-ch__line { display: block; overflow: hidden; }
.ec-ch__line-in { display: block; transform: translateY(110%); opacity: 0; transition: transform 950ms cubic-bezier(0.22, 1, 0.36, 1), opacity 950ms cubic-bezier(0.22, 1, 0.36, 1); }
.ec-ch.is-active .ec-ch__line-in { transform: none; opacity: 1; }

.ec-ch__body { margin: 1.6rem 0 0; max-width: 34ch; font-size: clamp(1rem, 1.15vw, 1.18rem); line-height: 1.65; color: rgba(142, 203, 255, 0.72); }
.ec-ch--center .ec-ch__body { margin-inline: auto; }

.ec-ch__readouts { margin: 2rem 0 0; padding-top: 1.1rem; border-top: 1px solid rgba(142, 203, 255, 0.15); display: flex; flex-direction: column; gap: 0.5rem; }
.ec-ch--center .ec-ch__readouts { display: inline-flex; align-items: flex-start; text-align: left; }
.ec-ch__readout { display: flex; gap: 0.75rem; font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; font-variant-numeric: tabular-nums; }
.ec-ch__rk { color: rgba(142, 203, 255, 0.4); min-width: 12rem; }
.ec-ch__rv { color: rgba(142, 203, 255, 0.92); font-weight: 500; }

.ec-ch__cta {
  margin-top: 2.4rem; pointer-events: auto; cursor: pointer;
  background: transparent; border: 1px solid rgba(142, 203, 255, 0.4); color: var(--brain-sky, #8ecbff);
  font: inherit; font-size: 0.78rem; letter-spacing: 0.22em; text-transform: uppercase;
  padding: 0.9rem 1.6rem; border-radius: 2px;
  transition: background 260ms ease, border-color 260ms ease, color 260ms ease;
}
.ec-ch__cta:hover { background: rgba(31, 106, 224, 0.18); border-color: rgba(142, 203, 255, 0.8); color: #fff; }

@media (max-width: 767px) {
  .ec-ch { justify-content: center !important; text-align: left; }
  .ec-ch__rk { min-width: 9rem; }
}
</style>
