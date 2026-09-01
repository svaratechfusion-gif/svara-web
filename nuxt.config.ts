import { fileURLToPath } from "node:url";
import { transformWithEsbuild } from "vite";
import { SITE_URL, ORGANIZATION_NAME, DEFAULT_LOGO } from "./lib/seo/site";

export default defineNuxtConfig({
  compatibilityDate: "2026-07-06",
  devtools: { enabled: true },
  css: ["~/assets/css/terminal.css", "~~/styles/design-tokens.css", "~~/styles/consoles.css", "~~/styles/home-experience.css", "~~/styles/products-experience.css", "~~/styles/tech.css", "~~/styles/asme.css", "~~/styles/px.css", "~~/styles/system.css", "~~/styles/evolve.css", "~~/styles/home-world.css", "~~/styles/ecosystem-world.css", "~~/styles/product-systems.css", "~~/styles/product-scene.css", "~~/styles/tech-dark.css", "~~/styles/architecture-dark.css", "~~/styles/investors-dark.css", "~~/styles/blog-dark.css", "~~/styles/global-font.css", "~~/styles/hero-heading.css", "~~/styles/svara-controls.css", "~~/styles/svara-instrument.css", "~~/styles/divisions-halftone.css", "~~/styles/ecosystem-clarix.css", "~~/styles/investors-synapse.css", "~~/styles/contact-noema.css", "~~/styles/consent.css"],
  vite: {
    resolve: {
      alias: {
        '~/': fileURLToPath(new URL('./app/', import.meta.url)),
      },
    },
    // Keep the React control-room and renderer runtimes out of Vue's JSX
    // transform. Nuxt's JSX plugin otherwise turns React children into Vue
    // slots at runtime.
    vueJsx: {
      exclude: ["**/lib/consoles/**", "**/lib/renderer/**"],
    },
    plugins: [
      {
        name: "svara:react-console-tsx",
        enforce: "pre",
        async transform(code, id) {
          if (!id.includes("/lib/consoles/") || !id.endsWith(".tsx")) return;

          return transformWithEsbuild(code, id, {
            loader: "tsx",
            jsxFactory: "React.createElement",
            jsxFragment: "React.Fragment",
          });
        },
      },
      // React TSX for the R3F renderer — same classic-JSX approach
      {
        name: "svara:renderer-tsx",
        enforce: "pre",
        async transform(code, id) {
          if (!id.includes("/lib/renderer/") || !id.endsWith(".tsx")) return;
          return transformWithEsbuild(code, id, {
            loader: "tsx",
            jsxFactory: "React.createElement",
            jsxFragment: "React.Fragment",
          });
        },
      },
    ],
    // React (for the vendored ParticleSphere.tsx and R3F renderer)
    // pre-bundled. Classic JSX runtime is pinned via per-file pragmas in
    // .tsx files, so no global JSX override is needed here.
    optimizeDeps: {
      include: [
        'react', 'react-dom', 'react-dom/client', 'framer-motion',
        '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing',
      ],
    },
  },
  // React components (vendored, consoles, renderer) are not our Vue code —
  // keep them out of vue-tsc since they compile with the classic React JSX
  // transform and their types would conflict with Vue's JSX types.
  typescript: {
    tsConfig: { exclude: ['../lib/vendor/**', '../lib/consoles/**', '../lib/renderer/**'] },
  },
  components: [{ path: "~/components", pathPrefix: false }],
  app: {
    head: {
      // Favicons / touch icons / manifest — all served from the official
      // brand folder (public/brand/logo). No duplicate icon assets elsewhere.
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/brand/logo/svara-icon.svg" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/brand/logo/favicon-32.png" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/brand/logo/favicon-16.png" },
        { rel: "icon", type: "image/png", sizes: "48x48", href: "/brand/logo/favicon-48.png" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/brand/logo/apple-touch-icon.png" },
        { rel: "manifest", href: "/site.webmanifest" },
        // Global type — Space Mono (the investors "SynapseX" hero typeface) is now the
        // site-wide face for every heading, subheading and body (see styles/global-font.css).
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap",
        },
      ],
    },
  },
  modules: ["@nuxtjs/seo", "@nuxt/eslint"],
  site: {
    name: ORGANIZATION_NAME,
    url: SITE_URL,
  },
  routeRules: {
    "/company": { redirect: "/about" },
    "/capabilities/sense": { redirect: "/capabilities/observe" },
    "/capabilities/think": { redirect: "/capabilities/understand" },
    "/capabilities/act": { redirect: "/capabilities/coordinate" },
    "/capabilities/learn": { redirect: "/capabilities/improve" },
  },
  // @nuxtjs/sitemap v8 does not auto-discover the __sitemap__ endpoint — the
  // source has to be registered. Without this the sitemap listed only the 23
  // top-level routes and every dynamic knowledge page was missing.
  sitemap: {
    sources: ["/api/__sitemap__/urls"],
  },
  // The single canonical Organization node for the whole site. @nuxtjs/seo emits
  // this (plus WebSite and WebPage) into one @graph with stable @ids, so page
  // schemas reference `#organization` / `#website` instead of restating them.
  // Do NOT hand-emit an Organization elsewhere — two nodes sharing an @id merge
  // unpredictably in consumers and can override the richer one.
  //
  // `sameAs` must list REAL, live profiles: it is the property search and answer
  // engines use to reconcile this entity across the web. These are the same URLs
  // the site footer links to.
  //
  // No telephone/email node: the values in lib/content/contact.ts are
  // placeholders, and a placeholder here would feed a wrong contact straight
  // into knowledge panels and assistant answers.
  schemaOrg: {
    identity: {
      type: "Organization",
      name: ORGANIZATION_NAME,
      legalName: "SVARA TechFusion Private Limited",
      url: SITE_URL,
      logo: `${SITE_URL}${DEFAULT_LOGO}`,
      description:
        "SVARA TechFusion is an AI-native enterprise technology company engineering Enterprise Intelligence Infrastructure — the connected system of sensing, reasoning, prediction, orchestration, and learning that turns fragmented enterprise data into continuously improving operational intelligence.",
      address: {
        streetAddress: "TNGO Colony Phase 2, Gachibowli",
        addressLocality: "Hyderabad",
        addressRegion: "Telangana",
        postalCode: "500032",
        addressCountry: "IN",
      },
      // Real, published values. The earlier omission was deliberate while the
      // email and phone in lib/content/contact.ts were placeholders — a
      // placeholder here feeds a wrong contact into knowledge panels.
      // Two points, because they route differently: general enquiries go to
      // contact@, and rights requests / legal notices raised by the /legal
      // documents go to legal@.
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "contact@svaratechfusion.com",
          telephone: "+917093888269",
          url: `${SITE_URL}/contact`,
          availableLanguage: ["en"],
        },
        {
          "@type": "ContactPoint",
          contactType: "legal",
          email: "legal@svaratechfusion.com",
          availableLanguage: ["en"],
        },
      ],
      sameAs: [
        "https://www.linkedin.com/company/svaratechfusion",
        "https://github.com/svaratechfusion",
        "https://x.com/svaratechfusion",
        "https://instagram.com/svaratechfusion",
        "https://facebook.com/svaratechfusion",
        "https://discord.gg/svaratechfusion",
      ],
    },
  },
});
