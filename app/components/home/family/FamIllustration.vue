<script setup lang="ts">
// HERO ILLUSTRATION CLUSTER — the design's primary visual language.
//
// "Hand-drawn cartoon mascots with dot eyes and stick limbs, scattered confetti shapes
// (stars, coins, hearts, gears, leaves) filling the negative space around them.
// Organic radii of 40–72px, thin strokes." Two clusters flank a centred text block and
// never overlap the type.
//
// Drawn in the HOME PAGE'S OWN PALETTE, not the reference's primaries — the brief was
// to convert everything except the colours and the humanoid. So the mascots are built
// from --sig, --sig-soft and the lavender border tone rather than sky blue and coral.
//
// Purely decorative: inert, aria-hidden, and it carries no information the copy beside
// it does not already say.
defineProps<{ side: 'l' | 'r' }>()
</script>

<template>
  <div class="fam-ill" :class="`fam-ill--${side}`" aria-hidden="true">
    <!-- mascot: rounded square character with dot eyes and stick limbs -->
    <svg class="fam-ill__mascot" viewBox="0 0 120 140" fill="none">
      <rect x="22" y="30" width="76" height="72" rx="34" fill="var(--sig)" opacity="0.9" />
      <circle cx="46" cy="62" r="4.5" fill="#0d1526" />
      <circle cx="74" cy="62" r="4.5" fill="#0d1526" />
      <path d="M50 78q10 8 20 0" stroke="#0d1526" stroke-width="2.4" stroke-linecap="round" />
      <path d="M22 66H8M98 66h14M44 102v22M76 102v22" stroke="var(--ink-muted)" stroke-width="2.2" stroke-linecap="round" />
      <path d="M60 30V14" stroke="var(--ink-muted)" stroke-width="2.2" stroke-linecap="round" />
      <circle cx="60" cy="10" r="5" fill="var(--sig-soft)" />
    </svg>

    <!-- second mascot: a blob with a single eye -->
    <svg class="fam-ill__blob" viewBox="0 0 100 96" fill="none">
      <path d="M50 6c26 0 44 18 44 42s-18 42-44 42S6 72 6 48 24 6 50 6Z" fill="var(--sig-soft)" opacity="0.55" />
      <circle cx="50" cy="44" r="6" fill="#0d1526" />
      <path d="M36 62q14 10 28 0" stroke="#0d1526" stroke-width="2.4" stroke-linecap="round" />
    </svg>

    <!-- confetti: rings, stars, arcs, gears scattered asymmetrically -->
    <svg class="fam-ill__confetti" viewBox="0 0 200 220" fill="none">
      <circle cx="28" cy="26" r="9" stroke="var(--sv-border-lavender-strong)" stroke-width="2" />
      <path d="m164 18 3.6 7.6 8.4 1-6 6 1.4 8.4-7.4-4-7.4 4 1.4-8.4-6-6 8.4-1Z" fill="var(--sig-soft)" opacity="0.8" />
      <path d="M18 128a22 22 0 0 1 22-22" stroke="var(--sig)" stroke-width="2.4" stroke-linecap="round" />
      <rect x="150" y="120" width="18" height="18" rx="5" stroke="var(--ink-muted)" stroke-width="2" />
      <circle cx="96" cy="196" r="6" fill="var(--sig)" opacity="0.7" />
      <path d="M52 190h16M60 182v16" stroke="var(--sv-border-lavender-strong)" stroke-width="2.2" stroke-linecap="round" />
      <circle cx="182" cy="86" r="4" fill="var(--sig-soft)" />
      <path d="M8 74q10-10 20 0" stroke="var(--ink-muted)" stroke-width="2" stroke-linecap="round" />
    </svg>
  </div>
</template>
