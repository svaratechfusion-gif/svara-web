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

/**
 * A stepped scale — a maturity model, an autonomy spectrum, a level ladder.
 *
 * These already exist in the papers as prose definition lists ("Level 01 — Observe",
 * "Stage 05 — Autonomous"). Rendered as a rising ladder they become a real graphic that
 * shows PROGRESSION, which is the whole point of a maturity model and the one thing a
 * definition list cannot show.
 *
 * Note this carries no invented figures. The bar heights encode position in the sequence,
 * which the content itself states; nothing here implies a measured quantity.
 */
export interface ScaleBlock {
  kind: 'scale'
  caption?: string
  /** Ordered low to high. */
  levels: { label: string, text: string }[]
}

/**
 * A preformatted ASCII diagram, kept exactly as the author drew it.
 *
 * Some architecture diagrams — a boxed node, a branching fleet tree — cannot be expressed
 * by `stack` (linear layers) or `flow` (a single sequence). Rather than approximate them
 * or drop them, the monospace drawing is preserved. It suits the schematic design, which
 * is already monospace, and it is what an engineer would draw on a whiteboard.
 *
 * `alt` is REQUIRED, not optional: box-drawing characters read aloud as punctuation
 * soup, so the <pre> is hidden from assistive tech and this sentence is announced in its
 * place. A diagram without one would be unreadable to a screen reader.
 */
export interface AsciiBlock {
  kind: 'ascii'
  caption?: string
  alt: string
  art: string
}

/** A definition-style pair list: term plus its explanation. */
export interface DefsBlock {
  kind: 'defs'
  items: { term: string, text: string }[]
}

export type Block =
  | HeadingBlock | ProseBlock | StatementBlock | ListBlock
  | TableBlock | FlowBlock | DefsBlock | StackBlock | ScaleBlock | AsciiBlock

export interface Faq {
  q: string
  a: string
}

/**
 * What kind of publication this is.
 *
 *  article  — a journal piece, set as a broadsheet.
 *  paper    — a research white paper: numbered sections, a contents page, a cover, and
 *             no FAQ. Same block model and the same registry, schema and sitemap; only
 *             the presentation and a few required fields differ.
 *
 * This is NOT the layout flag that was removed. That one had a single value in practice
 * and described how to set one kind of thing; this describes two genuinely different
 * publications, which is why `faqs` becomes optional below.
 */
export type InsightKind = 'article' | 'paper'

/**
 * Which design a PAPER is set in. Papers are commissioned pieces and each one gets a
 * treatment suited to its argument, so this is a real axis rather than a speculative one:
 *
 *  press      — the broadsheet: light stock, Playfair/Spectral, numbered contents.
 *  schematic  — dark instrument panel, monospace, the document read as a system diagram.
 *               Suits a paper whose subject IS an architecture.
 *  report     — corporate research report: white stock, one vivid blue, full-bleed blue
 *               section dividers, hairline rules, dot-matrix cover, numbered folios.
 *               Suits an executive publication meant to be read by a board.
 *
 * Each design also carries its own typographic voice — serif, monospace and sans
 * respectively — so the three are distinguishable at a glance, not just by colour.
 *
 * Ignored when `kind` is 'article'.
 */
export type PaperDesign = 'press' | 'schematic' | 'report'

export interface Insight {
  slug: string
  /** Publication type; defaults to 'article'. */
  kind?: InsightKind
  /** Paper only. Defaults to 'press'. */
  design?: PaperDesign
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
  heroImage?: {
    name: string
    alt: string
    /**
     * The image's TRUE intrinsic size. These are used to reserve the box before the file
     * arrives, so they have to be the real numbers — a shared guess reserves the wrong
     * shape and the page shifts when the image lands. The five banners are not one
     * aspect ratio: they range from 1.50 to 1.78.
     */
    width: number
    height: number
  }
  blocks: Block[]
  /** Articles carry an FAQ (and emit FAQPage). A white paper does not. */
  faqs?: Faq[]
  closing: { heading: string, paragraphs: string[] }
  cta: { headline: string, body: string, links: { label: string, to: string }[] }
  /** Internal links surfaced as "Related" — keeps the cluster connected. */
  related: { label: string, to: string }[]
  /** Paper only: the standfirst that opens the document, before the contents. */
  corePosition?: { heading: string, paragraphs: string[] }
  /** Paper only: shown on the cover, e.g. "30–40 pages". */
  extent?: string
  /**
   * The publishing imprint shown on the cover and in the breadcrumb — "SVARA Research",
   * "SVARA Architecture Series". Papers are not all one series, and a technical
   * architecture brief filed under "White Paper" misdescribes itself.
   */
  imprint?: { name: string, label: string }
}
