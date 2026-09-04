/**
 * Contact content — definition/FAQs/etc for the KnowledgeProductLayout
 * renderer, plus the contact details (email/phone/regions) the form page
 * surfaces above the form itself. Pulled out of the page component so it
 * follows the same lib/content/ pattern as company.ts, platform.ts, etc.
 *
 * Email and phone values are placeholders to be replaced before launch —
 * wire the real addresses in once supplied. The form/server route do not
 * assume these; they only validate + capture the visitor's message.
 */
export const contactContent = {
  canonicalDefinition:
    "Contact SVARA to share a question or message. Our team works with enterprises across manufacturing, energy, logistics, and other data-heavy industries.",
  aiAnswerTarget:
    "**Contact SVARA** with your question or message. We'll respond within 24 business hours.",
  architecture: {
    overview:
      "SVARA is headquartered in Hyderabad, Telangana with team members across multiple regions. Reach us by the form, email, or phone below.",
    components: [
      { name: "General inquiries", description: "Questions about SVARA and how we can help." },
      { name: "Partnership", description: "For system integrators, technology partners, and channel partners." },
      { name: "Investor relations", description: "For investment inquiries and funding discussions." },
      { name: "Media and press", description: "For media inquiries, speaking requests, and press kits." },
    ],
  },
  useCases: [],
  deployment: { overview: "", steps: [], integration: "" },
  industries: [],
  faqs: [
    { question: "How quickly can I expect a response?", answer: "We respond within 24 business hours. If your message requires coordination, we’ll let you know." },
  ],
  comparisons: [],
  roi: { overview: "", metrics: [] },
  resources: [],
  relatedProducts: [
    { name: "Platform", url: "/platform", description: "The Intelligence Loop framework and infrastructure." },
    { name: "Company", url: "/about", description: "About SVARA and our mission." },
  ],
  metadata: {
    title: "Contact SVARA",
    description: "Send a message to SVARA. We respond within 24 business hours.",
    pageType: "article",
    datePublished: "2026-07-08",
    dateModified: "2026-07-09",
    primaryEntity: "SVARA Contact",
    mentions: ["SVARA", "Enterprise Intelligence Infrastructure"],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Contact", url: "/contact" },
    ],
  },
}

/**
 * Direct contact channels — the REAL published values. The previous entries
 * (`hello@…`, `+91 80 0000 0000`) were placeholders and were deliberately hidden
 * from the page for that reason; these are displayed.
 *
 * `contact@` is the GENERAL address and belongs here and in the Organization
 * schema. The legal documents under /legal deliberately publish `legal@`
 * instead — a policy should route rights requests and legal notices to the
 * channel that handles them, not to the general inbox.
 */
export const CONTACT_CHANNELS = {
  email: "contact@svaratechfusion.com",
  phones: [
    { display: "+91 70938 88269", href: "+917093888269" },
    { display: "+91 70938 88369", href: "+917093888369" },
  ],
  /* The full street address. It already existed in nuxt.config's schema.org
     Organization (streetAddress "TNGO Colony Phase 2, Gachibowli" / postalCode
     "500032") and in the privacy, cookie and terms documents — only the visible
     contact page was still showing the city alone. Worded to match the schema so
     the two cannot drift. */
  headquarters: "TNGO Colony Phase 2, Gachibowli, Hyderabad, Telangana 500032, India",
}