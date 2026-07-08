<script setup lang="ts">
// Replaces any CTA button entirely — the PRD explicitly bans "Book Demo" /
// "Get Started" / "Contact Us" in every hero. A scroll affordance only.
const cueRef = ref<HTMLElement | null>(null);

onMounted(() => {
  const { $gsap } = useNuxtApp();
  if (!cueRef.value) return;
  $gsap.to(cueRef.value, {
    y: 10,
    opacity: 0.4,
    duration: 1.4,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });
});
</script>

<template>
  <div ref="cueRef" class="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-white">
    <span class="text-[10px] font-medium uppercase opacity-70">Scroll</span>
    <svg width="14" height="22" viewBox="0 0 14 22" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="12" height="20" rx="6" stroke="currentColor" stroke-opacity="0.6" />
      <circle cx="7" cy="6" r="1.5" fill="currentColor" />
    </svg>
  </div>
</template>
