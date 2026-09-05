import { fileURLToPath } from "node:url";
import { transformWithEsbuild } from "vite";
import { SITE_URL, ORGANIZATION_NAME, DEFAULT_LOGO } from "./lib/seo/site";
import { COOKIE_POLICY_VERSION } from "./lib/content/cookies";

// ── GOOGLE CONSENT MODE v2 ────────────────────────────────────────────────
// One inline script, emitted into <head> BEFORE the GTM loader, that does two
// things in a single synchronous pass:
//
//   1. Sets the DEFAULT to denied for every non-essential storage type, so the
//      container cannot fire a measuring tag for a visitor who has not agreed.
//   2. Restores a RETURNING visitor's stored decision, so their preference is
//      already in the dataLayer before gtm.js is even requested.
//
// Because step 2 is synchronous and happens here, `wait_for_update` is
// deliberately omitted — it exists for CMPs that resolve consent asynchronously
// and would otherwise delay every tag on every page load for nothing.
//
// THE COOKIE IS RE-PARSED HERE rather than read through useConsent(), because
// this has to run before any application module does. Its three validity checks
// mirror `decode()` in app/composables/useConsent.ts and MUST be kept in step
// with it: a record this script trusted but the app rejected would grant
// consent while the banner was still on screen asking for it.
const CONSENT_COOKIE_MAX_AGE_MS = 60 * 60 * 24 * 365 * 1000;
const CONSENT_MODE_BOOTSTRAP = [
  "window.dataLayer=window.dataLayer||[];",
  "function gtag(){dataLayer.push(arguments);}",
  "gtag('consent','default',{",
  "ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',",
  "analytics_storage:'denied',functionality_storage:'denied',",
  "personalization_storage:'denied',security_storage:'granted'});",
  "try{var m=document.cookie.match(/(?:^|;\\s*)svara_consent=([^;]*)/);",
  "if(m){var p=decodeURIComponent(m[1]).split('~');",
  "if(p[0]==='1'&&p[1]===" + JSON.stringify(COOKIE_POLICY_VERSION),
  "&&Date.now()-Number(p[2])<" + CONSENT_COOKIE_MAX_AGE_MS + "){",
  "gtag('consent','update',{",
  // analytics → analytics_storage. functional → the two behavioural stores.
  "analytics_storage:p[3]==='1'?'granted':'denied',",
  "functionality_storage:p[4]==='1'?'granted':'denied',",
  "personalization_storage:p[4]==='1'?'granted':'denied',",
  // The four advertising signals are granted by `marketing` ALONE. Accepting
  // analytics must never turn on ad personalisation.
  "ad_storage:p[5]==='1'?'granted':'denied',",
  "ad_user_data:p[5]==='1'?'granted':'denied',",
  "ad_personalization:p[5]==='1'?'granted':'denied'});}}}catch(e){}",
].join("");

export default defineNuxtConfig({
  compatibilityDate: "2026-07-06",
  devtools: { enabled: true },
  css: ["~/assets/css/terminal.css", "~~/styles/design-tokens.css", "~~/styles/consoles.css", "~~/styles/home-experience.css", "~~/styles/products-experience.css", "~~/styles/tech.css", "~~/styles/asme.css", "~~/styles/px.css", "~~/styles/system.css", "~~/styles/evolve.css", "~~/styles/ecosystem-world.css", "~~/styles/product-systems.css", "~~/styles/product-scene.css", "~~/styles/investors-dark.css", "~~/styles/global-font.css", "~~/styles/hero-heading.css", "~~/styles/svara-controls.css", "~~/styles/svara-instrument.css", "~~/styles/divisions-halftone.css", "~~/styles/ecosystem-clarix.css", "~~/styles/investors-synapse.css", "~~/styles/contact-noema.css", "~~/styles/consent.css", "~~/styles/stride.css", "~~/styles/architecture-authkit.css", "~~/styles/technology-raycast.css", "~~/styles/industries-impilo.css", "~~/styles/home-director.css", "~~/styles/about-huly.css", "~~/styles/careers-harness.css", "~~/styles/blog-phantom.css", "~~/styles/contact-eleven.css", "~~/styles/svara-shapes.css"],
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
        {
          // Space Grotesk is the substitute the architecture page's style reference
          // names for its display face (aeonikPro). Inter and JetBrains Mono — its
          // body and eyebrow substitutes — already ship via @fontsource in
          // app/assets/css/terminal.css, so this is the only face to fetch.
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500&display=swap",
        },
      ],

      // ── ANALYTICS ───────────────────────────────────────────────────────
      // ONE measurement path, and only one:
      //
      //     SVARA  →  GTM (GTM-KJ3LR4RJ)  →  GA4 (G-YNLSY6VW80)
      //
      // GA4 is configured as a tag INSIDE the container. There is deliberately
      // no gtag.js snippet here: a direct install alongside a GA4 tag in GTM
      // sends two page_view hits per load and doubles every traffic number.
      // Nothing in this codebase may send to G-YNLSY6VW80 independently.
      //
      // The container ID is public by design — it appears in the page source of
      // every site using GTM — so it is embedded directly rather than routed
      // through an environment variable.
      script: [
        {
          // FIRST, ALWAYS. Consent Mode defaults have to be in the dataLayer
          // before the container can act, so this entry precedes the loader
          // below and nothing may be inserted between them.
          innerHTML: CONSENT_MODE_BOOTSTRAP,
          tagPosition: "head",
        },
        {
          // `innerHTML`, not `src`: this is Google's official bootstrap, which
          // creates the real gtm.js tag itself.
          innerHTML:
            "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':"
            + "new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],"
            + "j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src="
            + "'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);"
            + "})(window,document,'script','dataLayer','GTM-KJ3LR4RJ');",
          // In <head>, before the app renders, so GTM is initialised for the
          // very first page view.
          tagPosition: "head",
        },
      ],
      // The noscript fallback belongs immediately after the opening <body>.
      // `tagPosition: "bodyOpen"` is how Nuxt expresses that; the app's markup
      // renders after it, so nothing in the UI moves.
      noscript: [
        {
          innerHTML:
            '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KJ3LR4RJ"'
            + ' height="0" width="0" style="display:none;visibility:hidden"></iframe>',
          tagPosition: "bodyOpen",
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

    // ── PRODUCTION SECURITY HEADERS ────────────────────────────────────────
    // Applied to every route. Deliberately WITHOUT a Content-Security-Policy:
    // this site inlines styles and scripts through Nuxt's payload, streams video
    // from CloudFront, loads Google Fonts, posts to formsubmit.co and compiles
    // WebGL shaders — a CSP tight enough to be worth having would need
    // 'unsafe-inline' plus a long allowlist, and one mistake silently breaks the
    // 3D scenes or the contact form. It should be added later behind a
    // Report-Only rollout, not blind before a launch.
    "/**": {
      headers: {
        // stop MIME sniffing turning a mis-typed response into script
        "X-Content-Type-Options": "nosniff",
        // legacy clickjacking guard, plus its modern CSP equivalent
        "X-Frame-Options": "SAMEORIGIN",
        "Content-Security-Policy": "frame-ancestors 'self'",
        // send the origin cross-site, the full path only same-origin
        "Referrer-Policy": "strict-origin-when-cross-origin",
        // no page here uses camera, mic or geolocation
        "Permissions-Policy": "camera=(), microphone=(), geolocation=(), interest-cohort=()",
        // 2 years + preload. Safe because the production domain is HTTPS-only;
        // browsers ignore this header entirely when served over plain HTTP, so it
        // cannot lock out local development.
        "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
      },
    },

    // ── INTERNAL LAB PAGES ─────────────────────────────────────────────────
    // Prototypes kept reachable by direct URL for the team, but never indexed.
    // The header is what search engines actually obey for a route-level rule;
    // the pages also carry their own `robots` meta (see each page). They are
    // excluded from the sitemap in the `sitemap` block below.
    "/lab/**": {
      headers: { "X-Robots-Tag": "noindex, nofollow" },
      robots: "noindex, nofollow",
    },
  },
  // @nuxtjs/sitemap v8 does not auto-discover the __sitemap__ endpoint — the
  // source has to be registered. Without this the sitemap listed only the 23
  // top-level routes and every dynamic knowledge page was missing.
  sitemap: {
    sources: ["/api/__sitemap__/urls"],
    // /lab/* are internal prototypes (Helios, Resonance). They stay reachable by
    // direct URL but must not be advertised to crawlers.
    exclude: ["/lab/**"],
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
