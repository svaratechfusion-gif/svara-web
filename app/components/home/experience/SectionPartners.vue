<script setup lang="ts">
// 10 · PARTNERS / INVESTORS — premium minimal. No fabricated logo wall: the
// ecosystem is expressed as collaborator categories + a genuine recognition
// strip, with a clear partnership CTA. Honest placeholders over fake marks.
interface Group { label: string, copy: string }
const groups: Group[] = [
  { label: 'Strategic Investors', copy: 'Capital partners backing an AI-native enterprise platform for the long term.' },
  { label: 'Advisory Board', copy: 'Operators and technologists guiding architecture, governance and scale.' },
  { label: 'Technology Partners', copy: 'Cloud, silicon and platform allies the ecosystem is engineered to run on.' },
  { label: 'Ecosystem Collaborators', copy: 'Integrators and industry partners deploying SVARA into the real world.' },
]
interface Recognition {
  /** Basename in /public/images/home/recognition. */
  img: string
  /** The wording the badge itself carries — this IS the alt text. A badge is
      functional, not illustrative: what a non-sighted reader needs is what it
      says, not a description of the plinth it is modelled on. */
  alt: string
}
// DPIIT leads because it is the one entry here awarded by someone else.
const recognitions: Recognition[] = [
  { img: 'dpiit', alt: 'DPIIT — Recognized Startup' },
  { img: 'ai-native', alt: 'AI Native — built for intelligence' },
  { img: 'enterprise-grade', alt: 'Enterprise Grade — security' },
  { img: 'scalable', alt: 'Scalable — infrastructure' },
  { img: 'enterprise-ready', alt: 'Enterprise Ready' },
  { img: 'women-led', alt: 'Women-Led — innovation' },
]
</script>

<template>
  <section class="pt hx-section">
    <div class="hx-container pt__grid">
      <header class="pt__head">
        <p class="hx-eyebrow"><span class="hx-index">10</span> Partners &amp; Investors</p>
        <h2 class="hx-title">Building the intelligence layer <span class="lite">alongside the right partners.</span></h2>
        <p class="hx-lead">SVARA advances through strategic investors, advisors, technology partners and ecosystem collaborators — aligned around one long-term mission.</p>
        <NuxtLink to="/investors" class="hx-btn hx-btn--primary pt__cta">
          Partner with SVARA
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M0 5h14M14 5l-4-4M14 5l-4 4" stroke="currentColor" stroke-width="1.3" /></svg>
        </NuxtLink>
      </header>

      <ul class="pt__groups">
        <li v-for="g in groups" :key="g.label" class="pt__group">
          <span class="pt__slot" aria-hidden="true"><span class="pt__mono">◆</span></span>
          <div>
            <h3 class="pt__label">{{ g.label }}</h3>
            <p class="pt__copy">{{ g.copy }}</p>
          </div>
        </li>
      </ul>
    </div>

    <div class="hx-container">
      <div class="pt__recog">
        <span class="pt__recog-label hx-mono-label">Recognised by</span>
        <ul class="pt__badges">
          <li v-for="r in recognitions" :key="r.img" class="pt__badge">
            <picture>
              <source :srcset="`/images/home/recognition/${r.img}.webp`" type="image/webp">
              <img
                class="pt__badge-img"
                :src="`/images/home/recognition/${r.img}.png`"
                :alt="r.alt"
                width="720"
                height="480"
                loading="lazy"
                decoding="async"
                draggable="false"
              >
            </picture>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pt__grid { display: grid; grid-template-columns: 0.95fr 1.05fr; gap: clamp(48px, 6vw, 100px); align-items: start; }
.pt__head { position: sticky; top: 130px; }
.pt__cta { margin-top: 34px; }

.pt__groups { list-style: none; margin: 0; padding: 0; }
.pt__group {
  display: grid; grid-template-columns: auto 1fr; gap: 22px; align-items: center;
  padding: clamp(22px, 2.6vw, 32px) 0; border-top: 1px solid rgba(20, 34, 63, 0.12);
}
.pt__group:last-child { border-bottom: 1px solid rgba(20, 34, 63, 0.12); }
.pt__slot {
  display: grid; place-items: center; width: 58px; height: 58px;
  background: rgba(255, 255, 255, 0.44); border: 1px solid rgba(20, 34, 63, 0.14);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6);
  clip-path: polygon(0 10px, 10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%);
}
.pt__mono { color: var(--sig); font-size: 18px; }
.pt__label { margin: 0; font-size: clamp(19px, 2vw, 26px); font-weight: 600; letter-spacing: -0.02em; color: var(--ink-primary); }
.pt__copy { margin: 8px 0 0; max-width: 46ch; font-size: 15px; line-height: 1.5; color: var(--ink-secondary); }

.pt__recog {
  margin-top: clamp(56px, 7vw, 96px); padding-top: 32px; border-top: 1px solid rgba(20, 34, 63, 0.12);
}
/* The label used to sit beside the pills. Six 3:2 plates need the full width, so
   it now leads the row from above. */
.pt__recog-label { display: block; margin-bottom: 20px; color: var(--ink-muted); }
.pt__badges {
  list-style: none; margin: 0; padding: 0;
  display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: clamp(12px, 1.4vw, 20px);
}
/* Each render carries its own grey studio ground rather than a cut-out, so the
   plate is FRAMED — the ground then reads as a deliberate surface the badge is
   mounted on instead of a stray rectangle floating on the dark world. */
.pt__badge picture {
  display: block; overflow: hidden; border-radius: 2px;
  box-shadow: inset 0 0 0 1px rgba(20, 34, 63, 0.16), 0 14px 30px -22px rgba(16, 42, 91, 0.55);
}
.pt__badge-img { display: block; width: 100%; height: auto; }

@media (max-width: 900px) {
  .pt__grid { grid-template-columns: 1fr; gap: 40px; }
  .pt__head { position: static; }
}
</style>
