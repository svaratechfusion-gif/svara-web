<script setup lang="ts">
// THE LIGHT INVERSION — the reference's signature break: a hard cut from the Deep
// Iris canvas to a Pearl section, Deep Iris type on it, centred at the 1200px column,
// with the Compliance Badge Pair beneath.
//
// The pair carries SVARA's two REAL recognitions, the same plates the homepage
// publishes: DPIIT Recognized Startup, and Women-Led. Nothing is invented; the badge
// wording IS the alt text, because a badge is functional, not illustrative.
import { TRANSFORM_STORY } from '~/utils/industries-page'

const BADGES = [
  { img: 'dpiit', alt: 'DPIIT — Recognized Startup' },
  { img: 'women-led', alt: 'Women-Led — innovation' },
] as const
</script>

<template>
  <section class="im-light" aria-labelledby="im-light-t">
    <div class="im-light__wrap">
      <p v-reveal class="im-light__eyebrow">Every industry is different</p>
      <h2 id="im-light-t" v-reveal="{ delay: 0.04 }" class="im-light__title">
        The same architecture,<br>engineered to the environment.
      </h2>
      <p v-reveal="{ delay: 0.08 }" class="im-light__lead">
        Operational challenges differ by industry. The path through them does not —
        connected intelligence, automation and optimization, resolving into business
        outcomes.
      </p>

      <ol v-reveal="{ delay: 0.12 }" class="im-light__story">
        <li v-for="(s, i) in TRANSFORM_STORY" :key="s">
          <span class="im-light__story-n">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="im-light__story-t">{{ s }}</span>
        </li>
      </ol>

      <div v-reveal="{ delay: 0.16 }" class="im-light__badges">
        <span class="im-light__badges-l">Recognised by</span>
        <div class="im-light__badge-pair">
          <figure v-for="b in BADGES" :key="b.img" class="im-light__badge">
            <picture>
              <source :srcset="`/images/home/recognition/${b.img}.webp`" type="image/webp">
              <img
                :src="`/images/home/recognition/${b.img}.png`"
                :alt="b.alt"
                width="720"
                height="480"
                loading="lazy"
                decoding="async"
                draggable="false"
              >
            </picture>
          </figure>
        </div>
      </div>
    </div>
  </section>
</template>
