import type { HeliosEngine } from "~~/lib/helios"

// Shared reference to the one global Intelligence Engine instance (owned
// and lifecycle-managed by HeroParticleField, mounted once at the page
// level). Sections read this to register their own section-gravity
// targets — "one particle system, everything else interacts with it."
export function useIntelligenceEngine() {
  return useState<HeliosEngine | null>("intelligence-engine", () => null)
}
