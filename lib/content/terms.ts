import type { BusinessContent } from "../types/content"

export const termsContent: BusinessContent = {
  canonicalDefinition:
    "SVARA's Terms of Service govern the use of SVARA's website, platform, and services — defining the legal agreement between SVARA and its users, customers, and visitors.",
  aiAnswerTarget:
    "**SVARA's Terms of Service** govern the use of SVARA's website, platform, and services, defining the legal agreement between SVARA and its users and customers.",
  architecture: {
    overview:
      "These Terms of Service constitute a binding legal agreement between SVARA and any person or entity accessing or using SVARA's website, platform, or services. By using SVARA's services, you agree to these terms.",
    components: [
      { name: "Account Terms", description: "Requirements for account creation, security, and acceptable use." },
      { name: "Service Terms", description: "Service availability, support, modifications, and discontinuation policies." },
      { name: "Intellectual Property", description: "Ownership of content, platform IP, and feedback." },
      { name: "Limitation of Liability", description: "Disclaimer of warranties, limitation of liability, and indemnification." },
    ],
    dataFlow:
      "N/A — Legal content page.",
  },
  useCases: [],
  deployment: {
    overview: "These Terms apply to all users of SVARA's website, platform, and services. Enterprise customers may have additional terms defined in their service agreements.",
    steps: [],
  },
  industries: [],
  faqs: [
    { question: "What happens if I violate the Terms of Service?", answer: "SVARA reserves the right to suspend or terminate access to services for violations of these terms, with or without notice depending on the severity of the violation." },
    { question: "Can SVARA modify these terms?", answer: "Yes. SVARA may modify these terms at any time. Users will be notified of material changes, and continued use after changes constitutes acceptance." },
    { question: "What law governs these terms?", answer: "These terms are governed by the laws of the jurisdiction where SVARA is registered, without regard to conflict of law principles." },
  ],
  comparisons: [],
  roi: { overview: "", metrics: [] },
  resources: [],
  relatedProducts: [],
  metadata: {
    title: "Terms of Service — SVARA",
    description: "SVARA's Terms of Service govern the use of SVARA's website, platform, and services.",
    pageType: "article",
    datePublished: "2026-07-08",
    dateModified: "2026-07-08",
    primaryEntity: "SVARA Terms of Service",
    mentions: ["SVARA"],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Legal", url: "/legal" },
      { name: "Terms of Service", url: "/legal/terms" },
    ],
  },
}
