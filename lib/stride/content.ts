// PRODUCTS PAGE CONTENT, for the Stride design system.
//
// "Stride" here names the DESIGN — the marquee, the chip statement, the bento, the
// hover columns, the card stack, the layered chrome reveal. The CONTENT is SVARA's,
// and almost all of it is derived from `app/utils/svara-os.ts`, which is transcribed
// from the SVARA Corporate Profile & Portfolio (Edition 2026). The design's own
// placeholder content — Northwind, Ledgerly, "120+ partners", "99.99% uptime", the
// stock testimonial and people photos — is gone.
//
// NO INVENTED FIGURES. Every number below is a count of something in SVARA_OS that you
// can verify by reading it: ten products, five categories, five Intelligence systems.
// There is deliberately no uptime, no customer count, no "data points per day" — the
// source design had those and SVARA has no sourced equivalent. See
// docs/CONTENT-CLAIMS-AUDIT.md.
import { SVARA_OS } from '~/utils/svara-os'

const IMG = '/images/products'

/** The five product categories, in the order they first appear in the portfolio. */
export const PRODUCT_CATEGORIES: string[] = [...new Set(SVARA_OS.map(p => p.category))]

const countIn = (category: string): number =>
  SVARA_OS.filter(p => p.category === category).length

// ── MARQUEE — the ten platform names, nothing invented ───────────────────────────
export const STRIDE_LOGOS = {
  label: 'The SVARA product stack',
  items: SVARA_OS.map(p => p.short),
}

// ── STATEMENT — the page's own positioning line, split for the chip treatment ────
export const STRIDE_ABOUT = {
  labelId: 'products-statement',
  eyebrow: 'The stack',
  lead: 'Ten intelligence platforms built on one',
  mutedLead: 'engineered stack, from edge to enterprise',
} as const

// ── BENTO — verifiable counts only ───────────────────────────────────────────────
export const STRIDE_STATS = {
  label: 'The stack by the numbers',
  brand: 'SVARA',
  /** A real SVARA product visual, not stock photography. */
  image: `${IMG}/edge-ai.png`,
  platforms: {
    value: String(SVARA_OS.length),
    desc: 'Flagship platforms engineered on one shared AI backbone.',
  },
  categories: {
    eyebrow: 'Product categories',
    value: String(PRODUCT_CATEGORIES.length).padStart(2, '0'),
    /** Replaces the source design's stock avatar stack. */
    chips: PRODUCT_CATEGORIES.map(c => ({ name: c, count: countIn(c) })),
    // Not a testimonial: the source design put a fabricated customer quote here. This
    // is the portfolio's own description of the layer that ties the stack together.
    statement:
      'A unified intelligence layer that sits above enterprise software, AI models, business applications and operational workflows.',
  },
  intelligence: {
    label: 'Intelligence systems',
    value: String(countIn('Intelligence')).padStart(2, '0'),
    desc: 'Vision, Drone, Edge, Cognitive and Agents — the perception and reasoning layer.',
  },
  deployment: { label: 'Deployment', value: 'Edge · Cloud · Hybrid' },
} as const

// ── SHOWCASE — four flagship systems, each with a real SVARA product visual ──────
const flagship = (id: string, image: string) => {
  const p = SVARA_OS.find(x => x.id === id)!
  return { id: p.id, prefix: p.category, name: p.short, image, to: p.to }
}

export const STRIDE_SHOWCASE = {
  heading: 'One engineered stack behind every system',
  cta: 'Explore the technology',
  ctaTo: '/technology',
  items: [
    // webp at identical dimensions — the PNGs are 1.5-1.7 MB each, the webp 0.12-0.14.
    // `drone-sq` and not `drone.webp`: a drone.webp already existed but is a DIFFERENT
    // crop (1600x901 vs this 1254x1254), so swapping to it would change the artwork.
    flagship('vision', `${IMG}/cctv.webp`),
    flagship('drone', `${IMG}/drone-sq.webp`),
    flagship('edge', `${IMG}/edge-ai.webp`),
    flagship('twin', `${IMG}/conveyor.webp`),
  ],
}

// ── CARD STACK — all ten products ────────────────────────────────────────────────
// Typographic system cards, not photographs: SVARA has no ten-product photo set, and
// inventing one from stock imagery is exactly what this rebuild is removing. The card
// design follows the site's own technical/editorial language.
export const STRIDE_WORKS = {
  heading: 'The Product Stack',
  viewLabel: 'Explore',
  items: SVARA_OS.map(p => ({
    id: p.id,
    n: p.n,
    name: p.short,
    fullName: p.name,
    category: p.category,
    tagline: p.tagline,
    status: p.status,
    deployment: p.deployment,
    to: p.to,
    image: p.image,
  })),
}

// ── LAYERED REVEAL — the chrome stage, then the platform explainer ───────────────
export const STRIDE_CHAIN = {
  heading: 'Intelligence, engineered',
  tagline:
    'Ten platforms, one backbone. Perception, reasoning, simulation and action are built as one system rather than assembled from parts — so intelligence compounds instead of fragmenting.',
  aside: 'from edge to enterprise',
  /** SVARA's own model, not the source design's chain. */
  model: '/ecosystem/hero-model.glb',
  base: '#1c3ee6',
  light: '#eef3ff',
  seed: 3.7,
} as const

/**
 * SCENE C — the interactive hero panel that REPLACED the chrome GLB model.
 *
 * Ported from the supplied reference hero. Its copy is SVARA's, not the
 * reference's placeholder: the headline and body are the chain's own, and the
 * pills are the FIVE REAL PRODUCT CATEGORIES carried on SVARA_OS, so selecting
 * them means something rather than being decoration.
 */
export const STRIDE_HERO = {
  video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4',
  headline: 'Intelligence,\nengineered.',
  body: STRIDE_CHAIN.tagline,
  promptTitle: 'What are you building?',
  promptSub: 'Select all that apply',
  /** distinct `category` values on SVARA_OS, in portfolio order */
  options: [...new Set(SVARA_OS.map(p => p.category))],
  emptyHint: 'Please click to select above.',
  bannerPrefix: 'Ready to talk about:',
  cta: "Let's go",
  ctaTo: '/contact',
} as const

const aios = SVARA_OS.find(p => p.id === 'aios')!

export const STRIDE_PRODUCT = {
  id: aios.id,
  labelId: 'products-explainer',
  heading: `What is ${aios.short}?`,
  cta: 'Explore the platform',
  ctaTo: aios.to,
  image: `${IMG}/crm.png`,
  cards: [
    {
      title: aios.tagline,
      // The full summary is one long sentence that overran the card. It splits at its
      // own em dash into a complete clause, so this stays verbatim rather than trimmed
      // mid-thought.
      body: `${aios.summary.split(' — ')[0]!.trim()}.`,
    },
    {
      title: 'One interface, every system',
      body: 'A natural-language command interface over a universal integration bus — SAP, Salesforce, Google and Microsoft included — so people ask for outcomes instead of navigating dashboards.',
    },
    {
      title: 'Built to be deployed',
      body: `${aios.deployment}. ${aios.status}.`,
    },
  ],
} as const
