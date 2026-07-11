<script setup lang="ts">
// Props default to the home page's own copy so existing usage
// (<HeroContent /> with no props) keeps working unchanged — every other
// page supplies its own eyebrow/headline/description through the same
// component instead of a bespoke one per page.
withDefaults(
  defineProps<{
    eyebrow?: string;
    headline?: string;
    description?: string;
  }>(),
  {
    eyebrow: "AI-Native Enterprise Intelligence Infrastructure",
    // Matches the EXPERIENCE 01 tagline and Scene 01's specified headline
    // exactly — also the same line used in the footer's closing statement,
    // an intentional open/close bookend.
    headline: "Engineering The Intelligence Layer Of Tomorrow.",
    description:
      "SVARA builds AI infrastructure for enterprises, industries, and intelligent cities.",
  }
);
</script>

<template>
  <!--
    Rendered normally (not client-only) — this is the SEO/LLM-crawlable
    payload for the page and must be present in the server-rendered HTML,
    not conjured client-side. Semantic H1 for the headline per SEO
    requirements.
  -->
  <div class="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center text-white">
    <p class="mb-4 text-xs font-semibold uppercase opacity-80">
      {{ eyebrow }}
    </p>
    <h1 class="text-hero max-w-4xl">
      {{ headline }}
    </h1>
    <p class="text-body mt-6 max-w-xl opacity-80">
      {{ description }}
    </p>
  </div>
</template>
