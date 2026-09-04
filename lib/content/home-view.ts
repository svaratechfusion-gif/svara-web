/**
 * HOME VIEW-MODEL — the Content Bible, shaped for the Director design.
 *
 * `lib/content/home.ts` is the single source of truth for homepage copy and its
 * sentences are used VERBATIM here. This file only does three things the design
 * needs and the bible does not carry:
 *
 *  1. splits a heading into its faded / solid halves (a purely visual split),
 *  2. attaches an existing image from public/images/home to a card,
 *  3. supplies short structural LABELS ("The Problem", "Signal Sources") that
 *     name a slot. No label makes a claim; every sentence below is quoted.
 *
 * Where a section needs deeper substance than the homepage teaser carries, it
 * pulls from the other approved content modules (platform.ts for the
 * Intelligence Loop, contact.ts for the real channels) rather than inventing it.
 */
import {
  homeFinalCta, homeHero, homePlatforms,
  homeSection01, homeSection02, homeSection03, homeSection04,
  homeSection05, homeSection06, homeSection07,
} from './home'
import { platformContent } from './platform'
import { divisionDetails } from './divisions'
import { SVARA_OS } from '~/utils/svara-os'

export interface HeadingParts { faded: string, bold: string }
export interface SpecRow { k: string, v: string }

/* ── HERO ────────────────────────────────────────────────────────────────── */
export const dxHero = {
  eyebrow: homeHero.eyebrow,
  /** The verbatim H1, split into the two corners it is set across.
   *  titleA + titleB read back as homeHero.h1 exactly. */
  titleA: ['Engineering', 'Intelligence'],
  titleB: ['For The Future', 'Of Enterprise'],
  description: homeHero.description,
  primaryCta: homeHero.primaryCta,
  secondaryCta: homeHero.secondaryCta,
  /** The Intelligence Loop's public capability names — each is a real route. */
  loop: [
    { label: 'Observe', to: '/capabilities/observe' },
    { label: 'Understand', to: '/capabilities/understand' },
    { label: 'Predict', to: '/capabilities/predict' },
    { label: 'Improve', to: '/capabilities/improve' },
  ],
} as const

/* ── 01 · THE PROBLEM ────────────────────────────────────────────────────── */
export const dxProblem = {
  heading: { faded: 'The Future Demands', bold: 'More Than Software' } as HeadingParts,
  description: homeSection01.teaser,
  cta: homeHero.primaryCta,
  tags: homeSection01.fragments,
  centerText: 'Rather Than Adding Another Layer Of Software',
  rightText: 'THE PROBLEM     THE SHIFT',
  cards: [
    {
      variant: 'left' as const,
      // webp: the PNG is 1.74 MB and was the largest asset the home page pulled;
      // the webp is 0.13 MB at identical dimensions (1254x1254)
      image: '/images/home/intelligence-layer/act.webp',
      alt: 'Operations connected through one intelligence layer',
      title: 'The Problem',
      body: 'Artificial intelligence is reshaping every industry, yet most organizations continue to rely on disconnected applications, isolated data, and fragmented operational systems.',
    },
    {
      variant: 'right' as const,
      image: '/images/home/sections/ecosystem-orbital.webp',
      alt: 'The SVARA ecosystem, drawn as one orbital system',
      badge: 'The Shift',
      title: 'Rather than adding another layer of software, we create the intelligence layer that connects everything.',
    },
  ],
}

/* ── 02 · THE CONNECTED ECOSYSTEM ────────────────────────────────────────── */
const loopLayers = platformContent.architecture.components.map((c, i) => ({
  n: String(i + 1).padStart(2, '0'),
  name: c.name.replace(/ Layer$/, ''),
  body: c.description,
}))

export const dxEcosystem = {
  heading: { faded: 'Enterprise Intelligence', bold: 'Starts With A Connected Ecosystem' } as HeadingParts,
  lead: homeSection02.description[1],
  pairs: [
    { k: 'The Loop', list: loopLayers.map(l => l.name) },
    { k: 'Data Flow', v: platformContent.architecture.dataFlow },
  ],
  main: {
    title: 'The Intelligence Loop',
    body: platformContent.architecture.overview,
    layers: loopLayers,
    cta: { label: 'Explore The Ecosystem', to: '/ecosystem' },
  },
  sides: [
    { title: 'Signal Sources', chips: homeSection02.sources as readonly string[] },
    { title: homeSection02.convergeLabel, body: homeSection02.paragraphs[2] },
  ],
}

/* ── 03 · TEN PLATFORMS ──────────────────────────────────────────────────── */
/** Real artwork already in public/images/home for each of the ten platforms. */
/* The images are the PRODUCTS PAGE's own set, read straight off SVARA_OS rather
   than re-listed here — the two lists are the same ten platforms in the same order,
   so a hand-written name→file map could only ever drift out of step with them. */
export const dxPlatforms = {
  label: homeSection03.centerLabel,
  heading: { faded: 'One Ecosystem.', bold: 'Ten Enterprise Platforms.' } as HeadingParts,
  note: homeSection03.intro,
  items: homePlatforms.map((p, i) => ({
    n: String(i + 1).padStart(2, '0'),
    title: p.name,
    body: p.description,
    to: p.to,
    // by position: homePlatforms and SVARA_OS are the same portfolio in the same
    // order, and their NAMES differ ('Generative & Cognitive AI' vs 'Cognitive AI'),
    // so the index is the only key that actually holds
    image: SVARA_OS[i]?.image ?? '/images/home/sections/products-stack.webp',
  })),
}

/* ── 04 · SIX DIVISIONS ──────────────────────────────────────────────────── */
/* Named by the DIVISIONS PAGE. homeSection04.divisions holds six generic
   disciplines lifted out of the section's prose — "Artificial Intelligence",
   "Enterprise Software", "Simulation" and so on — which are not what any division
   is called. divisionDetails is what /divisions renders, so its titles, order,
   numbering and artwork are used verbatim and the prose list is left to the prose. */
export const dxDivisions = {
  heading: { faded: 'Built Around Six', bold: 'Specialized Technology Divisions' } as HeadingParts,
  description: homeSection04.teaser,
  cta: { label: 'See The Divisions', to: '/divisions' },
  items: divisionDetails.map(d => ({
    n: d.n,
    name: d.title,
    to: `/divisions/${d.slug}`,
    image: `/images/divisions/${d.img}.webp`,
  })),
}

/* ── 05 · INDUSTRIES ─────────────────────────────────────────────────────── */
/* The EIGHT the industries page actually carries, with its artwork. homeIndustries
   listed fifteen, five of which have no page at all (Transportation, Warehousing,
   Education, Financial Services) and one of which — "Smart Manufacturing" — was a
   second entry pointing at the same Manufacturing route. The set is now the same
   one /industries renders, so the two can never disagree about what SVARA serves. */
const HOME_INDUSTRIES = [
  { name: 'Manufacturing', slug: 'manufacturing' },
  { name: 'Smart Cities', slug: 'smart-cities' },
  { name: 'Logistics', slug: 'logistics' },
  { name: 'Retail', slug: 'retail' },
  { name: 'Healthcare', slug: 'healthcare' },
  { name: 'Energy', slug: 'energy' },
  { name: 'Agriculture', slug: 'agriculture' },
  { name: 'Construction', slug: 'construction' },
] as const

export const dxIndustries = {
  heading: { faded: 'Designed For', bold: 'Modern Industries' } as HeadingParts,
  intro: homeSection05.intro,
  items: HOME_INDUSTRIES.map((it, i) => ({
    n: String(i + 1).padStart(2, '0'),
    name: it.name,
    to: `/industries/${it.slug}`,
    // .webp: the PNG originals are 2.1-2.7 MB EACH (19.6 MB for the eight), which
    // this section would pull on every home-page visit. The webp encodes are ~0.28 MB
    // — a 9x saving for no visible difference. agriculture.webp was the one missing
    // encode and has been generated at the same q82 as its siblings.
    image: `/images/home/industries/${it.slug}.webp`,
  })),
}

/* ── 06 · WHY SVARA ──────────────────────────────────────────────────────── */
export const dxWhy = {
  heading: { faded: 'Why Organizations', bold: 'Choose SVARA' } as HeadingParts,
  lead: homeSection06.reasons[0].description,
  reasons: homeSection06.reasons,
  cta: { label: 'Talk To Us', to: '/contact' },
}

/* ── 07 · THE VISION ─────────────────────────────────────────────────────── */
export const dxVision = {
  heading: { faded: 'Engineering The Next Era', bold: 'Of Enterprise Intelligence' } as HeadingParts,
  paragraphs: homeSection07.paragraphs,
}

/* ── CTA + CONTACT ───────────────────────────────────────────────────────── */
/* The closing panel only. Contact channels, legal and sitemap links belong to
   the site's shared footer, which follows this section — publishing them twice
   put a second, fake footer above the real one. */
export const dxContact = {
  title: homeFinalCta.title,
  description: homeFinalCta.description,
  primaryCta: homeFinalCta.primaryCta,
  secondaryCta: homeFinalCta.secondaryCta,
}
