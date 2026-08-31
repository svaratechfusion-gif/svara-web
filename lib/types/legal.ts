/**
 * Shape for LONG-FORM legal documents (cookie policy, and any future policy that
 * must be published in full rather than summarised).
 *
 * The existing `privacy.ts` / `terms.ts` files are 4-bullet SUMMARIES rendered
 * through `KnowledgeProductLayout`, whose headings are literally "Architecture",
 * "Use Cases" and "ROI" — fine for a product page, wrong for a policy someone
 * may need to rely on. A legal document has to be reproducible verbatim, so it
 * gets its own shape and its own renderer.
 */

/** A run of prose, an optional lead-in, and an optional bullet list. */
export interface LegalBlock {
  /** Sub-heading inside a section (e.g. "Strictly Necessary Cookies"). */
  heading?: string
  /** Paragraphs, in order. */
  body?: string[]
  /** Bullet list following the paragraphs. */
  items?: string[]
}

export interface LegalSection {
  /** Display number, e.g. "1". Omit for an unnumbered preamble. */
  n?: string
  title: string
  blocks: LegalBlock[]
}

export interface LegalDocument {
  title: string
  /** ISO date the document took effect. Rendered as "Last updated". */
  updated: string
  /** Bumped whenever the substance changes — consent records store this. */
  version: string
  /** One-paragraph plain answer, reused for SEO + the AEO abstract. */
  summary: string
  /** Short intro shown above the numbered sections. */
  intro: string[]
  sections: LegalSection[]
  /** Optional Q&A, rendered after the sections and emitted as FAQPage schema. */
  faqs?: { question: string, answer: string }[]
  /**
   * Governing law and forum, rendered as an unnumbered clause before the
   * contact block. The Terms carry their own numbered Section 19 instead and
   * therefore leave this unset.
   */
  governingLaw?: { heading: string, body: string[] }
  /**
   * The legal entity a reader must contact to exercise rights under this
   * document. Rendered after the final section, where every one of these
   * policies ends with a "Contact" clause that points here.
   */
  contact?: {
    entity: string
    email: string
    /** E.164 for the tel: link, plus a readable form for display. */
    phones?: { display: string, href: string }[]
    addresses: { label: string, lines: string[] }[]
  }
  /** Closing sign-off line. */
  signoff?: string
  seo: { title: string, description: string }
}
