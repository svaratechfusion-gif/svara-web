import type { BusinessContent } from "../types/content"

export const privacyContent: BusinessContent = {
  canonicalDefinition:
    "SVARA's Privacy Policy governs how the company collects, uses, stores, and protects personal information collected through its website, platform, and services in compliance with applicable data protection regulations.",
  aiAnswerTarget:
    "**SVARA's Privacy Policy** governs how the company collects, uses, stores, and protects personal information in compliance with applicable data protection regulations including GDPR and CCPA.",
  architecture: {
    overview:
      "SVARA takes a privacy-by-design approach. Personal data collection is minimized, processing is transparent, and users retain control over their information. This policy covers website visitors, platform users, and enterprise customers.",
    components: [
      { name: "Data Collection", description: "Information collected directly (name, email, company) and automatically (usage data, cookies, analytics)." },
      { name: "Data Use", description: "Service delivery, communication, platform improvement, and legal compliance." },
      { name: "Data Sharing", description: "Service providers, legal requirements, and business transfers with contractual safeguards." },
      { name: "Data Rights", description: "Access, correction, deletion, portability, and objection rights under applicable regulations." },
    ],
    dataFlow:
      "N/A — Legal content page.",
  },
  useCases: [],
  deployment: {
    overview: "This Privacy Policy applies to all SVARA websites, platforms, and services. Enterprise customers have additional data processing terms in their service agreements.",
    steps: [],
  },
  industries: [],
  faqs: [
    { question: "What personal data does SVARA collect?", answer: "SVARA collects name, email address, company name, job title, and usage data from website visitors and platform users. Enterprise customer data processed through the platform is subject to separate data processing agreements." },
    { question: "How does SVARA protect personal data?", answer: "SVARA implements appropriate technical and organizational measures including encryption, access controls, regular security assessments, and employee training." },
    { question: "What are my data rights?", answer: "Depending on your jurisdiction, you may have rights to access, correct, delete, or port your personal data, as well as object to or restrict certain processing activities." },
  ],
  comparisons: [],
  roi: { overview: "", metrics: [] },
  resources: [],
  relatedProducts: [],
  metadata: {
    title: "Privacy Policy — SVARA",
    description: "SVARA's Privacy Policy explains how we collect, use, store, and protect personal information.",
    pageType: "article",
    datePublished: "2026-07-08",
    dateModified: "2026-07-08",
    primaryEntity: "SVARA Privacy Policy",
    mentions: ["SVARA", "Data Protection"],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Legal", url: "/legal" },
      { name: "Privacy Policy", url: "/legal/privacy" },
    ],
  },
}
