<script setup lang="ts">
// The homepage is the "Birth of Intelligence" cinematic experience — one
// persistent particle world (IntelligenceWorld) behind nine scroll-driven
// scenes. See docs/creative-direction.md for the full storyboard and
// architecture; each Scene component only registers its scroll range and
// renders its real-DOM copy, the visuals all live in the shared canvas.
useSeoMeta({
  title: "SVARA TechFusion — Engineering The Intelligence Layer Of Tomorrow",
  // What/who/problem/why-different, in one sentence each, for AI
  // Overviews/ChatGPT/Perplexity/Gemini as much as for search snippets —
  // structured content reads clearer to both than keyword-stuffed prose.
  description:
    "SVARA TechFusion is an AI-native intelligence infrastructure company for enterprise operations. It's built for manufacturing, energy, and other data-heavy industries whose operational data outpaces human interpretation. It replaces disconnected point tools with one system that sees, reasons, predicts, and automates. Unlike bolted-on AI add-ons, SVARA is engineered as intelligence from the ground up.",
});
</script>

<template>
  <div class="home-experience">
    <ClientOnly>
      <IntelligenceWorld />
      <WorldAtmosphere />
    </ClientOnly>

    <SceneBirth />
    <SceneEmergence />
    <SceneIntelligence />
    <SceneData />
    <SceneSvara />
    <SceneProducts />
    <SceneIndustries />
    <SceneScale />
    <SceneEnding />
    <!-- Guarantees scrollable height ≥ the scripted svh: the master
         ScrollTrigger spans the whole document, so a page SHORTER than the
         script makes the timeline run out before scroll does and every
         late-scene boundary drifts (measured 37svh of drift at the ending
         when the footer was the only thing below the last scene). This is
         pure silence, by design — the world settles, then the footer. -->
    <div class="home-experience__tail" aria-hidden="true" />
  </div>
</template>

<style scoped>
.home-experience {
  position: relative;
  background: #f9fafc;
}

.home-experience__tail {
  height: 100svh;
}
</style>
