import { fileURLToPath } from "node:url";
import { SITE_URL, ORGANIZATION_NAME, DEFAULT_LOGO } from "./lib/seo/site";

export default defineNuxtConfig({
  compatibilityDate: "2026-07-06",
  devtools: { enabled: true },
  css: ["~/assets/css/terminal.css"],
  vite: {
    resolve: {
      alias: {
        '~/': fileURLToPath(new URL('./app/', import.meta.url)),
      },
    },
  },
  components: [{ path: "~/components", pathPrefix: false }],
  modules: ["@nuxtjs/seo", "@nuxt/eslint"],
  site: {
    name: ORGANIZATION_NAME,
    url: SITE_URL,
  },
  routeRules: {
    "/capabilities/sense": { redirect: "/capabilities/observe" },
    "/capabilities/think": { redirect: "/capabilities/understand" },
    "/capabilities/act": { redirect: "/capabilities/coordinate" },
    "/capabilities/learn": { redirect: "/capabilities/improve" },
  },
  schemaOrg: {
    identity: {
      type: "Organization",
      name: ORGANIZATION_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}${DEFAULT_LOGO}`,
    },
  },
});