/**
 * Dynamic sitemap sources.
 *
 * The sitemap previously listed only the 23 top-level routes. Every dynamic
 * knowledge page — 12 industries, 9 products, 5 capabilities, 4 technologies —
 * was absent, so more than half the site (and the half carrying the richest
 * schema: Article + FAQPage + BreadcrumbList + the AEO abstract) was invisible
 * to crawlers that rely on the sitemap for discovery.
 *
 * Slugs are derived from `lib/content/routes.ts`, the same module the dynamic
 * pages resolve against, so a page and its sitemap entry cannot drift apart.
 */
import { CONTENT_ROUTES } from '~~/lib/content/routes'

export default defineSitemapEventHandler(() =>
  CONTENT_ROUTES.map(loc => ({ loc, changefreq: 'monthly' as const, priority: 0.8 })),
)
