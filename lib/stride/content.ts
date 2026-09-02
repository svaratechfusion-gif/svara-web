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
  return { prefix: p.category, name: p.short, image, to: p.to }
}

export const STRIDE_SHOWCASE = {
  heading: 'One engineered stack behind every system',
  cta: 'Explore the technology',
  ctaTo: '/technology',
  items: [
    flagship('vision', `${IMG}/cctv.png`),
    flagship('drone', `${IMG}/drone.png`),
    flagship('edge', `${IMG}/edge-ai.png`),
    flagship('twin', `${IMG}/conveyor.png`),
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

const aios = SVARA_OS.find(p => p.id === 'aios')!

export const STRIDE_PRODUCT = {
  labelId: 'products-explainer',
  heading: `What is ${aios.short}?`,
  cta: 'Explore the platform',
  ctaTo: aios.to,
  image: `${IMG}/crm.png`,
  cards: [
    {
      title: aios.tagline,
      body: aios.summary,
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
