<template>
  <PageLoader />
  <!--
    Subtle scale-in synced to PageLoader finishing — the "camera pushes
    into hero" feel from a plain CSS transform, not an actual 3D camera
    move (which would need deep coordination with each page's own hero
    scene). transition-transform only (not opacity) since the loader's own
    overlay already handles the visual cover/reveal.

    transformDone drops the transform entirely (not just resetting it to
    scale(1)) once the transition finishes — a `transform` on ANY ancestor
    becomes the containing block for `position: fixed` descendants per the
    CSS Transforms spec, so leaving this scale in place permanently broke
    the header: it correctly reported `position: fixed` yet visibly
    scrolled with the page, anchored to this div instead of the viewport.
    Confirmed via computed rect (top went to -300px at scrollY 300, i.e.
    moving 1:1 with scroll instead of staying pinned).
  -->
  <div
    class="transition-transform duration-700 ease-out"
    :style="{ transform: transformDone ? undefined : pageRevealed ? 'scale(1)' : 'scale(0.97)' }"
  >
    <VueLenis root :options="lenisOptions">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </VueLenis>
  </div>
</template>

<script setup lang="ts">
// VueLenis + useLenis come straight from the vendored Lenis Vue package
// ("lenis/vue" is aliased to lib/lenis in nuxt.config.ts). app.vue owns the
// Lenis instance because <VueLenis root> lives here — and therefore owns the
// one raf pump too: gsap.ticker drives lenis.raf (Lenis runs autoRaf:false),
// and every lenis 'scroll' updates ScrollTrigger, so the smoothed scroll
// position and all triggers stay in perfect sync on a SINGLE rAF (gsap's).
//
// This raf pump stays HERE, at the Lenis lifecycle, deliberately: the world's
// MotionDirector is disposed and recreated on HMR, so a world-scoped owner
// would freeze scrolling on every edit. ScrollController owns scroll
// *semantics* (progress + velocity channels); app.vue owns the raw pump.
import { VueLenis, useLenis } from "lenis/vue";

const { $gsap, $ScrollTrigger } = useNuxtApp();

// Reduced motion → no smoothing (lerp 1 = instant). Accessible response is
// immediate scroll, not eased. Read once at setup (client only).
const lenisOptions = {
  autoRaf: false,
  lerp: import.meta.client && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : 0.1,
};
const pageRevealed = usePageReveal();
const transformDone = ref(false);

watch(pageRevealed, (revealed) => {
  if (!revealed) return;
  setTimeout(() => {
    transformDone.value = true;
  }, 700); // matches the transition duration above
});

// Every lenis 'scroll' re-evaluates ScrollTrigger on the SAME frame the
// smoothed scrollTop is written — the canonical Lenis×ScrollTrigger sync, so
// the master trigger never reads a frame-stale position.
const lenisRef = useLenis(() => {
  $ScrollTrigger.update();
});

// The one raf pump: gsap's ticker advances Lenis (autoRaf:false). Named so it
// can be removed on teardown — no leaked ticker callback across HMR of app.vue.
function driveLenis(time: number) {
  lenisRef.value?.raf(time * 1000);
}

function refreshTriggers() {
  $ScrollTrigger.refresh();
}

onMounted(() => {
  // Already revealed from a prior page in this session (useState persists
  // across client-side navigation) — skip straight to no-transform, no
  // need to replay the transition or wait it out.
  if (pageRevealed.value) transformDone.value = true;

  $gsap.ticker.add(driveLenis);
  $gsap.ticker.lagSmoothing(0);

  // The scene sections' svh heights are SSR-rendered, so layout is largely
  // stable at mount — but self-hosted Geist reflows text once it loads
  // (already refreshed via document.fonts.ready in the gsap plugin), and
  // async subtrees can settle a frame or two later. One post-mount refresh
  // plus a load-event refresh guarantee the master ScrollTrigger measures
  // against final layout.
  nextTick(() => {
    setTimeout(refreshTriggers, 100);
  });
  window.addEventListener("load", refreshTriggers);
});

onUnmounted(() => {
  $gsap.ticker.remove(driveLenis);
  window.removeEventListener("load", refreshTriggers);
});
</script>
