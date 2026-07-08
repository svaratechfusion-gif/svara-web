// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  // Vendored third-party code — the local premium GSAP package's shipped
  // builds (esm/src/umd/minified) and the local Lenis package are not ours
  // to lint. Our own architecture files (lib/gsap/*.ts, lib/experience,
  // lib/hooks) stay linted.
  ignores: ["lib/gsap/esm/**", "lib/gsap/src/**", "lib/gsap/umd/**", "lib/gsap/minified/**", "lib/lenis/**"],
});
