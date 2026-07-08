// Nuxt bridge to the central GSAP module (~~/lib/gsap) — the module itself
// registers every premium plugin and applies global config on import; this
// plugin only exposes $gsap/$ScrollTrigger to the app and wires the one
// layout-stability refresh. All "gsap" specifiers resolve to the LOCAL
// premium package at lib/gsap/esm via the alias in nuxt.config.ts.
//
// .client.ts suffix excludes this file from the server bundle entirely — no
// import.meta.client guard needed inside it.
import { gsap, ScrollTrigger } from "~~/lib/gsap";

export default defineNuxtPlugin(() => {
  // Self-hosted Geist Sans loads asynchronously and reflows text once
  // ready (different metrics than the fallback font) — if that reflow
  // happens after ScrollTrigger has already measured trigger positions,
  // every trigger's start/end stays based on stale (pre-reflow) layout.
  // Confirmed: this was the cause of sections never revealing — their
  // scroll-trigger start points were calculated against a shorter page
  // than the one that existed once Geist finished loading.
  document.fonts.ready.then(() => ScrollTrigger.refresh());

  return { provide: { gsap, ScrollTrigger } };
});

// Without this, $gsap/$ScrollTrigger resolve to `unknown` on useNuxtApp() —
// a plugin's `provide` return value isn't auto-typed onto NuxtApp, it needs
// explicit module augmentation.
declare module "#app" {
  interface NuxtApp {
    $gsap: typeof gsap;
    $ScrollTrigger: typeof ScrollTrigger;
  }
}
