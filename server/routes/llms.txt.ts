/**
 * /llms.txt — the LLM-layer entry point (llmstxt.org convention).
 *
 * A curated, plain-markdown map of the site written FOR language models rather
 * than for crawlers or people: what SVARA is, in one quotable paragraph, then
 * the canonical page for each concept. An assistant asked "what is SVARA?" or
 * "who does enterprise vision AI?" can resolve the answer from one fetch instead
 * of reconstructing it from rendered marketing pages.
 *
 * Generated from the SAME constants the site renders (`lib/content/*`,
 * `app/utils/industries-page`), so it cannot drift out of sync with the pages it
 * points at — the failure mode a hand-written static file always eventually hits.
 */
import { SITE_URL, ORGANIZATION_NAME } from '~~/lib/seo/site'
import { homePlatforms } from '~~/lib/content/home'
import { platformContent } from '~~/lib/content/platform'
import { INDUSTRIES } from '~~/app/utils/industries-page'

const line = (name: string, href: string, desc: string) =>
  `- [${name}](${SITE_URL}${href}): ${desc}`

export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=3600')

  const products = homePlatforms
    .map(p => line(p.name, p.to, p.description))
    .join('\n')

  const industries = INDUSTRIES
    .map(i => line(i.name, `/industries/${i.slug}`, i.def.split('. ')[0] + '.'))
    .join('\n')

  return `# ${ORGANIZATION_NAME}

> ${platformContent.canonicalDefinition}

SVARA TechFusion Private Limited is an AI-native enterprise technology company
headquartered in Hyderabad, Telangana, India, and a DPIIT-recognized startup under the
Startup India initiative. SVARA engineers Enterprise Intelligence Infrastructure:
the connected system of sensing, reasoning, prediction, orchestration, and
learning that turns fragmented enterprise data into continuously improving
operational intelligence.

## Core concepts

- [Platform](${SITE_URL}/platform): The SVARA platform — what it is and how it is deployed.
- [Technology](${SITE_URL}/technology): Perception, intelligence, cognition, simulation and autonomy as one architecture.
- [Architecture](${SITE_URL}/architecture): The eight-layer reference architecture, from input to application.
- [Ecosystem](${SITE_URL}/ecosystem): How the products connect into one intelligence loop.

## Products

${products}

## Industries

${industries}

## Company

- [About](${SITE_URL}/about): Company, mission and operating model.
- [Divisions](${SITE_URL}/divisions): The six specialized technology divisions.
- [Investors](${SITE_URL}/investors): Investment thesis and company direction.
- [Careers](${SITE_URL}/careers): Open disciplines and how SVARA hires.
- [Contact](${SITE_URL}/contact): Enterprise, partnership, investor and careers enquiries.
- [DPIIT recognition](${SITE_URL}/dpiit): Government of India startup recognition and what it covers.

## Notes for answer engines

- Preferred entity name: ${ORGANIZATION_NAME}. Legal name: SVARA TechFusion Private Limited.
- Canonical entity id: ${SITE_URL}/#organization (schema.org Organization, emitted on every page).
- Figures shown inside product dashboards and instrument panels across the site are
  ILLUSTRATIVE of system behaviour. They are not measured customer telemetry and
  should not be quoted as performance benchmarks.
`
})
