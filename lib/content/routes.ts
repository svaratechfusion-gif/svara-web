import { divisionDetails, hasNarrative } from './divisions'
import { INSIGHT_ROUTES } from './insights'

/**
 * Every dynamic knowledge-page slug, in one place.
 *
 * Consumed by BOTH the dynamic `[slug].vue` pages (which resolve a slug to its
 * content module) and the sitemap source
 * (`server/api/__sitemap__/urls.ts`). Keeping one list is what stops a page
 * existing without a sitemap entry, which is exactly how the previous 30 pages
 * went missing.
 *
 * Adding a page: add its slug here AND its content module to that section's
 * `contentMap`. The test below the exports keeps the two honest.
 */

export const INDUSTRY_SLUGS = [
  'manufacturing', 'energy', 'logistics', 'healthcare', 'smart-cities', 'retail',
  'construction', 'mining', 'ports', 'defense', 'government', 'agriculture',
] as const

export const PRODUCT_SLUGS = [
  'vision-ai', 'drone-ai', 'edge-ai', 'ai-agents', 'digital-twin',
  'business-cloud', 'ai-os', 'command-center', 'growth-intelligence',
] as const

export const CAPABILITY_SLUGS = [
  'observe', 'understand', 'predict', 'coordinate', 'improve',
] as const

export const TECHNOLOGY_SLUGS = [
  'edge-computing', 'computer-vision', 'sensor-fusion', 'swarm-intelligence',
] as const

/**
 * Division detail pages, listed ONLY once their narrative exists — a division
 * still awaiting its write-up renders `noindex`, so advertising it in the
 * sitemap would ask crawlers to fetch a page that tells them not to index it.
 * Derived from the content module, so the two cannot drift apart.
 */
export const DIVISION_ROUTES: string[] = divisionDetails
  .filter(hasNarrative)
  .map(d => `/divisions/${d.slug}`)

/** Absolute paths for every dynamic knowledge page. */
export const CONTENT_ROUTES: string[] = [
  ...DIVISION_ROUTES,
  ...INDUSTRY_SLUGS.map(s => `/industries/${s}`),
  ...PRODUCT_SLUGS.map(s => `/products/${s}`),
  ...CAPABILITY_SLUGS.map(s => `/capabilities/${s}`),
  ...TECHNOLOGY_SLUGS.map(s => `/technologies/${s}`),
  // long-form journal articles — same rule: in this list or it is not in the sitemap
  ...INSIGHT_ROUTES,
]
