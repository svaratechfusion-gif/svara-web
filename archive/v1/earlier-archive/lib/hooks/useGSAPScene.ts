// Component-scoped GSAP work with automatic, complete cleanup — the ONLY
// sanctioned way for a Vue component to create tweens/triggers directly.
// Everything runs inside one gsap.context() (optionally per-matchMedia
// variant), and ctx.revert() on unmount kills every tween, ScrollTrigger,
// and inline style the component created. No leaks, no HMR duplicates,
// no per-component plugin registration.
import { onMounted, onUnmounted } from "vue";
import { gsap, MOTION_QUERIES } from "~~/lib/gsap";

export interface GSAPSceneOptions {
  /** Scope selector/element — selector text inside build() resolves here. */
  scope?: Element | string;
  /**
   * When provided, build() runs per media variant via gsap.matchMedia()
   * (keys from MOTION_QUERIES or custom queries) and re-runs on changes.
   */
  media?: Record<string, string>;
}

export function useGSAPScene(
  build: (ctx: gsap.Context, conditions?: Record<string, boolean>) => void,
  options: GSAPSceneOptions = {}
) {
  let ctx: gsap.Context | null = null;
  let mm: gsap.MatchMedia | null = null;

  onMounted(() => {
    if (options.media) {
      mm = gsap.matchMedia();
      mm.add(options.media, (context) => {
        build(context as unknown as gsap.Context, context.conditions as Record<string, boolean>);
      });
    } else {
      ctx = gsap.context((self) => build(self), options.scope);
    }
  });

  onUnmounted(() => {
    ctx?.revert();
    ctx = null;
    mm?.revert();
    mm = null;
  });
}

export { MOTION_QUERIES };
