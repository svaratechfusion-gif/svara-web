// THE single GSAP entry point for the entire SVARA experience.
//
//   import { gsap, ScrollTrigger, EASES } from "~~/lib/gsap";
//
// ("~~" is Nuxt's project-root alias; "@/lib/gsap" resolves identically.)
//
// Importing this module guarantees every premium plugin is registered and
// the global motion config is applied — no component may call
// gsap.registerPlugin or set gsap defaults itself. The "gsap" specifier
// resolves to the npm "gsap" package (^3.15.0), which ships the former
// premium/Club plugins for free — there is no alias or vendored build.
import { registerAll, gsap, GSDevTools } from "./register";
import { applyGlobalConfig } from "./config";

registerAll();
applyGlobalConfig();

/**
 * Dev-only timeline scrubber. Call from a component/composable in
 * development to inspect the master timeline; no-ops in production builds
 * so it can never ship.
 */
export function mountDevTools(animation?: gsap.core.Animation) {
  if (!import.meta.dev || typeof window === "undefined") return null;
  return GSDevTools.create(animation ? { animation } : undefined);
}

export * from "./register";
export * from "./config";
export default gsap;
