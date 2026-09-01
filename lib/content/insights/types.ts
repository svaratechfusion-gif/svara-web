// INSIGHTS — the long-form article model behind /insights/<slug>.
//
// Articles are STRUCTURED DATA, not HTML strings. Every block is a typed node the renderer
// knows how to lay out, which is what lets one article serve three consumers at once:
//
//   · the page itself (typography, tables, callouts);
//   · schema.org Article + FAQPage (the FAQ is a real field, not scraped from markup);
//   · the sitemap and the insights index (title, dek, reading time, category).
//
// Storing prose as an HTML blob would have made the FAQ schema a parsing problem and left
// the index duplicating metadata the article already owns.

/** A cell may carry a tri-state mark so capability tables stay machine-readable. */
export type Cell = string

export interface TableBlock {
  kind: 'table'
  caption?: string
  headers: string[]
  rows: Cell[][]
}

export interface HeadingBlock {
  kind: 'h2' | 'h3'
  /** Stable anchor id; used by the on-page contents and by deep links. */
  id: string
  text: string
}

export interface ProseBlock {
  kind: 'p'
  text: string
}

/** A short, emphasised statement — the article's pull-quotes and core principles. */
export interface StatementBlock {
  kind: 'statement'
  text: string
  /** Optional label above the statement, e.g. "The Core Principle". */
  label?: string
}

export interface ListBlock {
  kind: 'ul' | 'ol'
  items: string[]
}

/** A labelled sequence rendered as a flow, e.g. Data → Perception → Understanding. */
export interface FlowBlock {
  kind: 'flow'
  steps: string[]
}

/**
 * A vertical architecture diagram: named layers, each with its own contents, read top to
 * bottom. Distinct from `flow`, which is a single horizontal sequence of labels — a stack
 * carries a name AND members per level ("EDGE INTELLIGENCE / real-time perception ·
 * local inference · immediate action"), which a flow cannot express.
 */
export interface StackBlock {
  kind: 'stack'
  layers: { name: string, items: string[] }[]
}

/** A definition-style pair list: term plus its explanation. */
export interface DefsBlock {
  kind: 'defs'
  items: { term: string, text: string }[]
}

export type Block =
  | HeadingBlock | ProseBlock | StatementBlock | ListBlock
  | TableBlock | FlowBlock | DefsBlock | StackBlock

export interface Faq {
  q: string
  a: string
}

/**
 * Which presentation an article uses.
 *
 *  newspaper  — THE DEFAULT. Broadsheet: nameplate, serif, drop cap, per-section columns.
 *               An article that sets nothing gets this, so new pieces need no opt-in.
 *  system     — the earlier instrument-panel treatment: sans, contents rail, wide tables.
 *               Retained as an explicit opt-in; nothing currently uses it.
 *
 * The two share ONE content model. A layout is a way of setting the same blocks, not a
 * different kind of article, so schema, sitemap and the index are unaffected by it.
 */
export type InsightLayout = 'system' | 'newspaper'

export interface Insight {
  slug: string
  /** Presentation variant. Omit for the newspaper broadsheet, which is the house style. */
  layout?: InsightLayout
  /** On-page H1. */
  title: string
  /** The line under the H1. */
  subtitle: string
  /** <title> — may differ from the H1, and usually should. */
  seoTitle: string
  metaDescription: string
  category: string
  contentType: string
  searchIntent: string
  readingTime: string
  /** ISO date. `updated` is set only when the article materially changes. */
  published: string
  updated?: string
  primaryKeywords: string[]
  secondaryKeywords: string[]
  /** Summary used by the insights index and as the article's schema description. */
  dek: string
  /**
   * The banner. `name` resolves to /images/insights/<name>.webp with a .png fallback.
   *
   * `alt` must describe what the image COMMUNICATES, not just name it. These banners are
   * dense infographics carrying real content — pipelines, comparison tables, autonomy
   * spectrums — so "banner image" would drop that content entirely for anyone using a
   * screen reader, and the same text is what an image search has to work from.
   */
  heroImage?: { name: string, alt: string }
  blocks: Block[]
  faqs: Faq[]
  closing: { heading: string, paragraphs: string[] }
  cta: { headline: string, body: string, links: { label: string, to: string }[] }
  /** Internal links surfaced as "Related" — keeps the cluster connected. */
  related: { label: string, to: string }[]
}
