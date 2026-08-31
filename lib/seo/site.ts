/**
 * ------------------------------------------------
 * Module
 *   site (constants)
 * Purpose
 *   One source of truth for the production site identity: domain, org
 *   name, and default social/brand assets. lib/seo helpers and any page-
 *   level schema reuse these — no second `SITE_URL` constant anywhere else
 *   in the repo. The Nuxt `site.url` config (nuxt.config.ts) and the
 *   runtime-config public value are deliberately kept in sync with these
 *   so the @nuxtjs/seo module (sitemap, robots, canonicals) does not
 *   diverge from the JSON-LD helpers here.
 *
 *   Domain is deferred until the production host is known — the constant
 *   is the ONE place to update when it lands. Do NOT inline "svaratechfusion"
 *   anywhere else.
 * Owner
 *   Engineering OS (SEO sub-system)
 * Dependencies
 *   none
 * Performance Budget
 *   <0.01ms per access (plain constants)
 * Inputs
 *   n/a
 * Outputs
 *   SITE_URL, SITE_NAME, ORGANIZATION_NAME, DEFAULT_OG_IMAGE, DEFAULT_LOGO
 * Acceptance
 *   - no other module exports a SITE_URL constant
 *   - lib/seo/meta.ts and lib/seo/jsonld.ts both import from here
 *   - og-image.png exists in public/; brand icons live in public/brand/logo/
 * ------------------------------------------------
 **/

/** Production canonical host. Update this one line to redirect SEO. */
export const SITE_URL = "https://svaratechfusion.com";

/** Site identity used in <title> suffix and og:site_name. */
export const SITE_NAME = "SVARA — Enterprise Intelligence Infrastructure";

/** Organization label for schema.org publisher/manufacturer nodes. */
export const ORGANIZATION_NAME = "SVARA TechFusion";

/** Default social preview asset (placed in public/og-image.png). */
export const DEFAULT_OG_IMAGE = "/og-image.png";

/** Default logo referenced by schema.org Organization.logo — the official
 *  square brand mark from public/brand/logo. */
export const DEFAULT_LOGO = "/brand/logo/android-chrome-512.png";