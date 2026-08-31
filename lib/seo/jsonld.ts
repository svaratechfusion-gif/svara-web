import type { KnowledgeProductContent } from "~~/lib/types/content"

import { SITE_URL } from "./site"

/** Stable node ids so every schema on the page references ONE entity instead of
 *  restating it. This is what lets a search or answer engine resolve "SVARA" to a
 *  single subject across the whole site rather than treating each page's mention
 *  as a separate thing. */
export const ORG_ID = `${SITE_URL}/#organization`
export const SITE_ID = `${SITE_URL}/#website`

/** Reference form — use wherever a schema needs a publisher/author pointer. */
const ORGANIZATION = { "@id": ORG_ID } as const


/* The Organization entity is owned by `schemaOrg.identity` in nuxt.config.ts —
   see the note there. Nothing in this file should emit a rival Organization. */


interface Entity {
  name: string
  description?: string
  url?: string
}

interface BreadcrumbItem {
  name: string
  url: string
}

export function generateWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    name: "SVARA — Enterprise Intelligence Infrastructure",
    url: SITE_URL,
    description: "Enterprise Intelligence Infrastructure is the connected system of sensing, reasoning, prediction, orchestration, and learning that transforms fragmented enterprise data into continuously improving operational intelligence.",
    inLanguage: "en-US",
    publisher: ORGANIZATION,
  }
}

export function generateArticleJsonLd(page: {
  headline: string
  description: string
  url: string
  datePublished: string
  dateModified: string
  about: Entity
  mentions?: Entity[]
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.headline,
    description: page.description,
    author: ORGANIZATION,
    datePublished: page.datePublished,
    dateModified: page.dateModified,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}${page.url}`,
    },
    about: {
      "@type": "Thing",
      name: page.about.name,
      ...(page.about.description ? { description: page.about.description } : {}),
    },
    ...(page.mentions && page.mentions.length > 0
      ? {
          mentions: page.mentions.map((m) => ({
            "@type": "Thing",
            name: m.name,
            ...(m.description ? { description: m.description } : {}),
          })),
        }
      : {}),
  }
}

export function generateProductJsonLd(product: {
  name: string
  description: string
  category: string
  application?: { name: string }[]
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: product.category,
    ...(product.application && product.application.length > 0
      ? { application: product.application.map((i) => ({ "@type": "Thing", name: i.name })) }
      : {}),
    manufacturer: ORGANIZATION,
  }
}

export function generateDefinedTermJsonLd(term: {
  name: string
  description: string
  termCode: string
  url?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term.name,
    description: term.description,
    inDefinedTermSet: "SVARA Enterprise Intelligence Glossary",
    termCode: term.termCode,
    ...(term.url ? { url: `${SITE_URL}${term.url}` } : {}),
  }
}

export function generateFaqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

export function generateBreadcrumbJsonLd(path: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: path.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  }
}

export function generateCollectionPageJsonLd(page: {
  name: string
  description: string
  url: string
  hasPart: { name: string; url: string }[]
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: page.name,
    description: page.description,
    url: `${SITE_URL}${page.url}`,
    hasPart: page.hasPart.map((p) => ({
      "@type": "Thing",
      name: p.name,
      url: `${SITE_URL}${p.url}`,
    })),
  }
}

export function generateAboutPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About SVARA — Enterprise Intelligence Infrastructure",
    description: "SVARA builds the intelligence layer for enterprise operations. Our platform connects sensing, reasoning, prediction, orchestration, and learning into one continuous system.",
    mainEntity: ORGANIZATION,
  }
}

export function generateContactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact SVARA",
    description: "Get in touch with SVARA about enterprise intelligence infrastructure.",
  }
}

/** Strip authoring markdown so structured data carries clean prose. The
 *  `aiAnswerTarget` strings are written with **bold** emphasis for on-page use;
 *  emitting those asterisks into JSON-LD hands an answer engine literal
 *  markup to quote. */
const plain = (t: string) => t.replace(/\*\*/g, "").replace(/\s+/g, " ").trim()

export function generateKnowledgeProductJsonLd(content: KnowledgeProductContent, path = "") {
  const { metadata } = content
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": metadata.pageType === "product" ? "Product" : "Article",
    "@id": `${SITE_URL}${path}#page`,
    headline: metadata.title,
    description: metadata.description,
    // The AEO/GEO payload. `canonicalDefinition` and `aiAnswerTarget` were
    // authored specifically to give answer engines a direct, quotable response
    // (see the Product Content Bible) — but nothing consumed them, so the whole
    // mechanism was inert. `abstract` is the schema.org property answer engines
    // read for exactly this, and `disambiguatingDescription` pins the entity when
    // the term is ambiguous.
    abstract: plain(content.aiAnswerTarget),
    disambiguatingDescription: plain(content.canonicalDefinition),
    inLanguage: "en-US",
    isPartOf: { "@id": SITE_ID },
    publisher: ORGANIZATION,
    author: ORGANIZATION,
    datePublished: metadata.datePublished,
    dateModified: metadata.dateModified,
  }

  if (metadata.pageType === "product") {
    schema.category = metadata.primaryEntity
    schema.manufacturer = ORGANIZATION
  } else {
    schema.about = { "@type": "Thing", name: metadata.primaryEntity }
    if (metadata.mentions.length > 0) {
      schema.mentions = metadata.mentions.map((m) => ({ "@type": "Thing", name: m }))
    }
  }

  return schema
}
