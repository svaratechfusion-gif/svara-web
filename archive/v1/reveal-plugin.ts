/**
 * ------------------------------------------------
 * Module
 *   reveal (Nuxt plugin + directive)
 * Purpose
 *   The single GSAP-owning boundary for engineered scene reveals.
 *   Registers `v-reveal` globally. Each section enters and exits with
 *   intentional, weighty motion — no random easing, no abrupt cuts.
 *
 *   Variants:
 *   - rise   (default)  translateY + opacity, heavy mass
 *   - fade              opacity only, for diagrams
 *   - drift             translateX + opacity, lateral arrival
 *   - focus             scale + blur + opacity, assembly feel
 *
 *   Staggered children marked with [data-reveal-item] follow the parent
 *   with a precise, engineered offset.
 * Owner
 *   Motion System (Helios)
 * Dependencies
 *   $gsap / $ScrollTrigger
 * Performance Budget
 *   <0.3ms per directive mount
 * Inputs
 *   v-reveal binding.value = undefined | "fade" | "rise" | "drift" | "focus" | { stagger?, variant? }
 * Outputs
 *   GSAP timeline driven by ScrollTrigger; classes kept for SSR fallback
 * Acceptance
 *   - SSR-safe
 *   - reduced-motion → instant reveal
 *   - ScrollTrigger + timeline cleaned up on unmount
 * ------------------------------------------------
 **/

import type { Directive, DirectiveBinding } from "vue";

type RevealVariant = "fade" | "rise" | "drift" | "focus";

interface RevealOptions {
  variant?: RevealVariant;
  stagger?: number;
}

function resolveOptions(value: unknown): RevealOptions {
  if (typeof value === "string") return { variant: value as RevealVariant };
  if (value && typeof value === "object") return value as RevealOptions;
  return {};
}

interface ElementWithReveal extends HTMLElement {
  __revealTimeline?: gsap.core.Timeline | undefined;
}

interface RevealState {
  y?: number;
  x?: number;
  opacity: number;
  scale?: number;
  filter?: string;
}

function getStates(variant: RevealVariant): { from: RevealState; to: RevealState } {
  const base = { opacity: 1 };
  switch (variant) {
    case "fade":
      return { from: { opacity: 0 }, to: base };
    case "drift":
      return { from: { x: -28, opacity: 0 }, to: { ...base, x: 0 } };
    case "focus":
      return { from: { scale: 0.985, opacity: 0, filter: "blur(6px)" }, to: { ...base, scale: 1, filter: "blur(0px)" } };
    case "rise":
    default:
      return { from: { y: 32, opacity: 0 }, to: { ...base, y: 0 } };
  }
}

function setup(el: ElementWithReveal, binding: DirectiveBinding) {
  const opts = resolveOptions(binding.value);
  if (!import.meta.client) return;

  const { $gsap } = useNuxtApp();
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Keep classes for SSR/reduced-motion fallback and for CSS-only consumers.
  const variantClass = opts.variant ? `reveal-${opts.variant}` : "reveal-rise";
  el.classList.add("reveal-pending", variantClass);

  if (prefersReducedMotion) {
    el.classList.add("is-revealed");
    el.classList.remove("reveal-pending", variantClass);
    return;
  }

  const items = opts.stagger
    ? Array.from(el.querySelectorAll<HTMLElement>("[data-reveal-item]"))
    : [];
  items.forEach((item) => item.classList.add("reveal-pending", variantClass));

  const { from, to } = getStates(opts.variant || "rise");

  // Set engineered initial state.
  $gsap.set([el, ...items], from);

  // Entrance timeline — weighty, deliberate, no random easing.
  const tl = $gsap.timeline({
    scrollTrigger: {
      trigger: el,
      start: "top 82%",
      end: "top 35%",
      toggleActions: "play reverse play reverse",
      onEnter: () => el.classList.add("is-revealed"),
      onLeaveBack: () => el.classList.remove("is-revealed"),
    },
  });

  tl.to(el, {
    ...to,
    duration: 0.9,
    ease: "power3.out", // heavy mass settling
  });

  if (items.length) {
    tl.to(
      items,
      {
        ...to,
        duration: 0.6,
        stagger: opts.stagger,
        ease: "power2.out", // lighter, precise follow-through
      },
      "-=0.55"
    );
  }

  el.__revealTimeline = tl;
}

function teardown(el: ElementWithReveal) {
  if (!import.meta.client) return;
  el.__revealTimeline?.scrollTrigger?.kill();
  el.__revealTimeline?.kill();
  el.__revealTimeline = undefined;
}

const revealDirective: Directive<ElementWithReveal, unknown> = {
  getSSRProps: () => ({}),
  mounted: setup,
  unmounted: teardown,
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("reveal", revealDirective);
});
