// STRIDE — every string and asset path the block renders, in one file.
//
// ⚠️ THIS IS THE SOURCE DESIGN'S PLACEHOLDER COPY, VERBATIM.
// The brand names (Northwind, Ledgerly, Vaulted…), the metrics (120+, 99.99%,
// 520k+, 60+) and the testimonial are the fintech template's own content — they
// are NOT SVARA's partners, uptime or figures. It is kept intact here because the
// brief was to reproduce the design exactly, and it is isolated to this one file
// so replacing it with real SVARA copy is a single-file edit that touches no
// component. See docs/CONTENT-CLAIMS-AUDIT.md before publishing these numbers.
//
// Asset paths point at public/stride/** (copied from the source project, so the
// block has no external host dependency).

const IMG = '/stride/images'

export interface StrideStat { value: string, label: string }

export interface StrideShowcaseItem {
  prefix: string
  name: string
  image: string
}

export interface StrideWorkItem {
  name: string
  year: string
  image: string
}

export const STRIDE_LOGOS = {
  label: 'Trusted by finance teams',
  items: [
    'Northwind',
    'Ledgerly',
    'Vaulted',
    'Paycore',
    'Finova',
    'Quanta',
    'Settle',
    'Corvus',
  ],
} as const

export const STRIDE_ABOUT = {
  labelId: 'stride-about-title',
  eyebrow: 'About us',
  lead: 'A fintech platform built to move money',
  mutedLead: 'smarter and settle payments faster',
} as const

export const STRIDE_STATS = {
  label: 'By the numbers',
  brand: 'LEDGERLY',
  collab: {
    value: '120+',
    desc: 'Partnered with leading banks and payment networks.',
  },
  commitment: {
    eyebrow: 'Commitment to uptime',
    value: '99.99%',
    quote:
      'Their payment rails completely reshaped how we move money. It\'s fast, reliable, and secure.',
  },
  data: {
    label: 'Data points',
    value: '520k+',
    desc: 'Analyzed every day to power smarter financial decisions.',
  },
  reach: { label: 'Countries', value: '60+' },
  people: `${IMG}/2nd/people.png`,
  avatars: [
    `${IMG}/2nd/avatars/1.png`,
    `${IMG}/2nd/avatars/2.png`,
    `${IMG}/2nd/avatars/3.png`,
    `${IMG}/2nd/avatars/4.png`,
  ],
} as const

export const STRIDE_SHOWCASE = {
  heading: 'Thoughtful engineering behind every detail',
  cta: 'Explore the platform',
  items: [
    { prefix: 'Our', name: 'Approach', image: `${IMG}/3rd/approach.png` },
    { prefix: 'Our', name: 'Technology', image: `${IMG}/3rd/technology.jpg` },
    { prefix: 'Our', name: 'Security', image: `${IMG}/3rd/security.jpg` },
    { prefix: 'Our', name: 'Team', image: `${IMG}/3rd/team.jpg` },
  ] as StrideShowcaseItem[],
}

export const STRIDE_WORKS = {
  heading: 'Our Portfolio',
  viewLabel: 'View project',
  items: [
    { name: 'Northwind', year: '2026', image: `${IMG}/portfolio/1.jpg` },
    { name: 'Ledgerly', year: '2025', image: `${IMG}/portfolio/2.jpg` },
    { name: 'Vaulted', year: '2025', image: `${IMG}/portfolio/3.jpg` },
    { name: 'Paycore', year: '2024', image: `${IMG}/portfolio/4.jpg` },
    { name: 'Finova', year: '2024', image: `${IMG}/portfolio/5.jpg` },
    { name: 'Corvus', year: '2023', image: `${IMG}/portfolio/6.jpg` },
  ] as StrideWorkItem[],
}

export const STRIDE_CHAIN = {
  heading: 'Financial momentum',
  tagline:
    'Watch your money work as hard as you do. Automated saving, real returns, and a clear view of where every dollar goes — no jargon, no guesswork.',
  aside: 'when it matters most',
  model: '/stride/chain.glb',
  // Same gradient palette as the source hero; a different seed → different blob layout.
  base: '#1c3ee6',
  light: '#eef3ff',
  seed: 3.7,
} as const

export const STRIDE_PRODUCT = {
  labelId: 'stride-product-title',
  heading: 'What is Northwind?',
  cta: 'Explore now',
  image: `${IMG}/6th.png`,
  cards: [
    {
      title: 'Capital that compounds',
      body: 'Your balance earns automatically as it\'s routed into vetted, high-yield lending markets.',
    },
    {
      title: 'Always liquid, always steady',
      body: 'Move your money the moment you need it — fully backed, with no lockups or waiting.',
    },
    {
      title: 'Fully hands-off',
      body: 'Nothing to manage. Northwind rebalances in the background, day and night.',
    },
  ],
} as const
