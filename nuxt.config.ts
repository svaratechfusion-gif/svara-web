import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";

// Every `import ... from "gsap"` / "gsap/<Plugin>" resolves to the local
// premium package at lib/gsap (full Club plugin set), and `lenis` / `lenis/vue`
// to the vendored Lenis monorepo — NOT the npm copies. The npm packages stay
// installed purely as the TypeScript declarations providers (tsc resolves
// types from node_modules independently of these runtime aliases; type-only
// resolution never reaches the bundle).
//
// gsap uses a string (prefix) find so `gsap` AND `gsap/ScrollTrigger` both
// map into the esm dir. Lenis uses EXACT regex finds so `lenis` → core and
// `lenis/vue` → the Vue package, while `lenis/nuxt` (the build-time module
// that registers <VueLenis>/useLenis) is left to resolve from npm — its
// generated runtime imports of "lenis/vue" then flow through the alias to
// the vendored code (confirmed: the npm module wires everything via the
// "lenis/vue" specifier, nothing hardcoded).
const localGsap = fileURLToPath(new URL("./lib/gsap/esm", import.meta.url));
const lenisCore = fileURLToPath(new URL("./lib/lenis/packages/core/index.ts", import.meta.url));
const lenisVue = fileURLToPath(new URL("./lib/lenis/packages/vue/index.ts", import.meta.url));

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2026-07-06",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      // Array form so gsap keeps prefix-matching while lenis is exact-matched.
      // Order matters only within regex specificity; these three never overlap.
      alias: [
        { find: "gsap", replacement: localGsap },
        { find: /^lenis$/, replacement: lenisCore },
        { find: /^lenis\/vue$/, replacement: lenisVue },
      ],
    },
  },
  // Nitro (standalone server routes) never touches Lenis — it's client-only —
  // so only gsap needs the server-side alias. The Vue app's SSR render is
  // built by Vite and already covered by vite.resolve.alias above.
  nitro: {
    alias: { gsap: localGsap },
  },
  // Without pathPrefix: false, Nuxt auto-registers nested components with
  // their directory name prepended (components/layout/AppHeader.vue would
  // become <LayoutAppHeader>, not <AppHeader>) — flat, predictable names
  // across the whole components/ tree instead.
  components: [{ path: "~/components", pathPrefix: false }],
  // No "lenis/nuxt" module: it registered npm's <VueLenis> component (baked
  // to an absolute npm path at build time, bypassing the Vite alias), which
  // split the global store from the vendored useLenis. app.vue instead
  // imports { VueLenis, useLenis } directly from "lenis/vue" (aliased to
  // vendored) — one package, one store, fully vendored.
  modules: ["@nuxtjs/seo", "@nuxt/eslint", "@tresjs/nuxt"],
  // Enables importing .glsl files as strings (vite-plugin-glsl under the
  // hood) — not used by anything in this phase yet, but the PRD calls for
  // custom GLSL shaders in later 3D work, so this is architecture worth
  // having wired now rather than revisited per-shader later.
  tres: { glsl: true },
  site: {
    name: "SVARA TechFusion",
    // TODO: replace with production domain once available.
    url: "https://svaratechfusion.com",
  },
  // Site-wide Organization identity for the schema.org graph @nuxtjs/seo
  // already auto-generates on every page (WebSite/WebPage nodes) — without
  // this it has no Organization node at all, which is what AI
  // Overviews/ChatGPT/Perplexity/Gemini and Google's own knowledge graph
  // use to resolve "who is SVARA" independent of any single page's prose.
  schemaOrg: {
    identity: {
      type: "Organization",
      name: "SVARA TechFusion",
      url: "https://svaratechfusion.com",
      // TODO: replace with the real logo asset once supplied.
      logo: "https://svaratechfusion.com/logo.png",
    },
  },
});
