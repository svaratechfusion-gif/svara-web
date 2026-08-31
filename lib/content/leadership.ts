import type { BusinessContent } from "../types/content"

export const leadershipContent: BusinessContent = {
  canonicalDefinition:
    "SVARA's leadership team is the operating and architectural force behind the Intelligence Loop — the founders and functional leads who own product direction, engineering integrity, and customer alignment across the enterprise intelligence infrastructure.",
  aiAnswerTarget:
    "**SVARA**'s leadership team is the operating and architectural force behind the Intelligence Loop — the founders and functional leads who own product direction, engineering integrity, and customer alignment across the enterprise intelligence infrastructure.",
  architecture: {
    overview:
      "SVARA is led by a founder-led, operator-led structure that keeps technical and product decisions close to the customer. Leadership spans enterprise direction, core engineering, and strategy — ensuring the Intelligence Loop is owned end-to-end by accountable operators rather than distributed across committees.",
    components: [
      { name: "Founder & Chief Executive Officer", description: "Owns enterprise direction, customer commitments, and the Intelligence Loop product vision." },
      { name: "Chief Technology Officer", description: "Owns the technical architecture of the Intelligence Loop across edge and cloud, including sensing, reasoning, prediction, orchestration, and learning layers." },
      { name: "Head of Engineering", description: "Owns engineering execution, release integrity, and the production reliability of SVARA's nine-product ecosystem." },
      { name: "Head of Strategy", description: "Owns category positioning, partnerships, and the customer alignment between SVARA's roadmap and enterprise operating priorities." },
    ],
    dataFlow:
      "Leadership engagement flows from customer intro → use-case alignment → architectural decision → engineering accountability → strategic roadmap feedback, with the founder and functional leads retaining direct loop ownership.",
  },
  useCases: [
    { title: "Strategic Direction", description: "Engage founders and strategy leadership to align SVARA's roadmap with the customer's enterprise operating priorities and category ambitions.", industries: ["Manufacturing", "Energy", "Smart Cities"] },
    { title: "Engineering Integrity", description: "Engage the CTO and Head of Engineering on architecture, integration, and reliability commitments for SVARA's edge and cloud deployments.", industries: ["Manufacturing", "Government", "Smart Cities"] },
    { title: "Customer and Partnership Alignment", description: "Engage leadership directly to scope pilots, partnership terms, and the long-horizon Intelligence Loop roadmap for the customer's operational domain.", industries: ["All"] },
  ],
  deployment: {
    overview:
      "Customers engage SVARA leadership through a structured intro path that moves from initial conversation to committed partnership, keeping decision-makers on both sides directly involved.",
    steps: [
      "Intro call — meet the founder and relevant functional lead for a scoped operational discussion.",
      "Use-case alignment — leadership reviews current operations, data sources, and intelligence gaps against the Intelligence Loop.",
      "Architecture review — the CTO and engineering lead walk through edge, cloud, and integration commitments.",
      "Pilot scoping — leadership agrees scope, success KPIs, and timeline for a single-line or single-domain pilot.",
      "Partnership terms — strategy and founder align on commercial structure, roadmap commitments, and account ownership.",
      "Ongoing governance — leadership retains periodic checkpoints through pilot, scale, and optimize phases.",
    ],
  },
  industries: [
    { name: "Manufacturing", description: "Leadership-led engagement for plant intelligence and predictive maintenance programs.", url: "/industries/manufacturing" },
    { name: "Smart Cities", description: "Leadership-led scoping for municipal infrastructure and public safety intelligence.", url: "/industries/smart-cities" },
    { name: "Government", description: "Leadership engagement for procurement-aligned and compliance-led deployments.", url: "/industries/government" },
  ],
  faqs: [
    { question: "Can we meet the SVARA leadership team before signing?", answer: "Yes. SVARA is founder-led and operator-led, and leadership is engaged directly in the intro call, use-case alignment, and architecture review steps of every partnership." },
    { question: "Who owns the technical architecture of the Intelligence Loop?", answer: "Technical architecture is owned by the Chief Technology Officer and the Head of Engineering, with the founder retaining accountability for end-to-end direction across sensing, reasoning, prediction, orchestration, and learning layers." },
    { question: "How is product direction set at SVARA?", answer: "Product direction is set by the founder and the Head of Strategy, informed by customer engagement feedback and the engineering lead's view on architecture integrity, keeping the Intelligence Loop roadmap operator-owned rather than committee-driven." },
  ],
  comparisons: [
    { concept: "Founder-Led Leadership", description: "Direction and accountability concentrated with founders and functional owners.", differentiator: "SVARA keeps product, engineering, and customer commitments with operators who own outcomes — versus a distributed structure where decisions cycle through committees and hand-offs." },
    { concept: "Operator-Led vs Advisory-Led", description: "Advisory-led firms route decisions through a board or external advisors before execution.", differentiator: "SVARA is operator-led: the founder and functional leads make and own decisions directly, with advisory input rather than advisory gating of execution." },
  ],
  roi: {
    overview:
      "Leadership engagement value surfaces as decision speed and accountability — measured in faster use-case alignment and direct ownership of architectural commitments.",
    metrics: [
      { label: "Decision Speed", value: "Direct — founder-led alignment replaces committee cycles" },
      { label: "Accountability", value: "Operator-owned architecture and roadmap commitments" },
    ],
  },
  resources: [
    { title: "SVARA Leadership Team Directory", type: "documentation" },
    { title: "SVARA Company Timeline", type: "documentation" },
    { title: "SVARA Investor Brief", type: "documentation" },
  ],
  relatedProducts: [
    { name: "Platform", url: "/platform", description: "The Intelligence Loop framework and infrastructure." },
    { name: "AI OS", url: "/products/ai-os", description: "The operating system for enterprise intelligence." },
    { name: "Command Center", url: "/products/command-center", description: "Centralized orchestration and control." },
  ],
  metadata: {
    title: "SVARA Leadership — Enterprise Intelligence Infrastructure Leadership",
    description: "The founders and functional leads who own product direction, engineering integrity, and customer alignment across SVARA's Intelligence Loop.",
    pageType: "article",
    datePublished: "2026-07-08",
    dateModified: "2026-07-09",
    primaryEntity: "SVARA Leadership",
    mentions: ["Leadership", "Founder", "CTO", "Engineering"],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Trust", url: "/trust" },
      { name: "Leadership", url: "/leadership" },
    ],
  },
}