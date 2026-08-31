<script setup lang="ts">
// ABOUT · SECTION 2 (Asme rebuild) — "Who We Are": a small uppercase label + a
// large Instrument-Serif display statement (SVARA's canonical definition, with
// italic emphasis), on black with a subtle radial glow. motion-v in-view reveal.
import { motion } from 'motion-v'

const inView = { once: true, margin: '-100px' } as const
</script>

<template>
  <section class="aw">
    <div class="aw__glow" aria-hidden="true" />
    <div class="aw__inner">
      <motion.p
        class="aw__label"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :in-view-options="inView"
        :transition="{ duration: 0.6 }"
      >Who We Are</motion.p>

      <motion.h2
        class="aw__heading"
        :initial="{ opacity: 0, y: 40 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :in-view-options="inView"
        :transition="{ duration: 0.8, delay: 0.1 }"
      >SVARA is the enterprise intelligence infrastructure company that defines and delivers <em>the Intelligence Loop</em> — a connected system of sensing, reasoning, prediction, orchestration, and learning that transforms fragmented enterprise data into <em>continuously improving operational intelligence.</em></motion.h2>
    </div>
  </section>
</template>

<style scoped>
.aw { position: relative; overflow: hidden; background: #000; padding: 128px 24px 40px; }
@media (min-width: 768px) { .aw { padding: 176px 24px 56px; } }
.aw__glow { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(ellipse at top, rgba(255, 255, 255, 0.03) 0%, transparent 70%); }
.aw__inner { position: relative; max-width: 72rem; margin: 0 auto; }

.aw__label { margin: 0 0 24px; font-size: 14px; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255, 255, 255, 0.4); }

.aw__heading {
  margin: 0;
  font-size: clamp(28px, 5vw, 72px);
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: #fff;
  font-weight: 400;
  max-width: 20ch;
}
.aw__heading em { font-family: 'Instrument Serif', serif; font-style: italic; color: rgba(255, 255, 255, 0.6); }
</style>
