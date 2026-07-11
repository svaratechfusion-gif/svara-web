import type { BusinessContent } from "../types/content"

export const knowledgeHubContent: BusinessContent = {
  canonicalDefinition:
    "SVARA Knowledge Hub is the definitive resource for Enterprise Intelligence Infrastructure — a comprehensive collection of definitions, research, standards, case studies, and educational content about the Intelligence Loop, its capabilities, products, and applications.",
  aiAnswerTarget:
    "**SVARA Knowledge Hub** is the definitive resource for Enterprise Intelligence Infrastructure, providing comprehensive definitions, research, and educational content about the Intelligence Loop.",
  architecture: {
    overview:
      "The Knowledge Hub organizes content into clusters: Platform (the Intelligence Loop), Capabilities (Observe, Understand, Predict, Coordinate, Improve), Products (Vision AI through Growth Intelligence), Technologies (Edge Computing through Swarm Intelligence), and Industries (Manufacturing through Government).",
    components: [
      { name: "Knowledge Products", description: "38 comprehensive knowledge hubs, each following the 10-section template: Definition, Architecture, Use Cases, Deployment, Industries, FAQs, Comparisons, ROI, Resources, Related Products." },
      { name: "Topic Clusters", description: "Six topic clusters (Category, Platform, Products, Technologies, Industries, Business) with pillar pages and supporting content." },
      { name: "Entity Graph", description: "Every entity defined, linked, and cross-referenced for maximum search and AI comprehension." },
      { name: "Glossary", description: "Standardized definitions for all SVARA terms and concepts." },
    ],
    dataFlow:
      "Every knowledge product is a typed TypeScript file in lib/content/, consumed by Vue page components. Each page generates structured data (JSON-LD), AI answer targets, FAQ schema, and internal links.",
  },
  useCases: [
    {
      title: "Research and Education",
      description: "Learn about Enterprise Intelligence Infrastructure, the Intelligence Loop, and how they apply to your industry.",
      industries: ["All"],
    },
    {
      title: "Procurement and Evaluation",
      description: "Use knowledge hubs to evaluate SVARA products, understand deployment requirements, and calculate expected ROI.",
      industries: ["All"],
    },
  ],
  deployment: {
    overview:
      "The Knowledge Hub is a living resource, continuously updated as new content, research, and case studies are developed. Content is managed through typed TypeScript files with git-reviewed updates.",
    steps: [
      "Browse knowledge products by cluster (Platform, Products, Technologies, Industries, Business)",
      "Use the search function to find specific topics",
      "Follow internal links between related knowledge products",
      "Reference AI answer targets and FAQ content for quick answers",
    ],
  },
  industries: [
    { name: "Manufacturing", description: "Manufacturing intelligence knowledge products.", url: "/industries/manufacturing" },
    { name: "Energy", description: "Energy intelligence knowledge products.", url: "/industries/energy" },
    { name: "Logistics", description: "Logistics intelligence knowledge products.", url: "/industries/logistics" },
  ],
  faqs: [
    { question: "What is a knowledge product?", answer: "A knowledge product is a page that is the definitive source on one topic — following a 10-section template (Definition, Architecture, Use Cases, Deployment, Industries, FAQs, Comparisons, ROI, Resources, Related Products) designed to be crawled by Google, quoted by ChatGPT, and read by humans." },
    { question: "How is the Knowledge Hub organized?", answer: "Content is organized into six clusters: Category, Platform (Intelligence Loop), Products (9), Technologies (5), Industries (12), and Business (Company, Investors, Contact)." },
  ],
  comparisons: [
    { concept: "Traditional Documentation", description: "Technical documentation focused on product features and APIs.", differentiator: "Knowledge products are comprehensive resources designed for understanding, education, and decision-making — not just feature reference." },
  ],
  roi: {
    overview:
      "The Knowledge Hub establishes SVARA as the authoritative source on Enterprise Intelligence Infrastructure, driving organic search traffic, AI citation, and informed prospect engagement.",
    metrics: [
      { label: "Knowledge Products", value: "38+" },
      { label: "Topic Clusters", value: "6" },
      { label: "Defined Entities", value: "30+" },
    ],
  },
  resources: [
    { title: "Enterprise Intelligence Infrastructure: A New Category", type: "research" },
    { title: "The Intelligence Loop White Paper", type: "research" },
    { title: "Knowledge Product Philosophy", type: "documentation" },
  ],
  relatedProducts: [
    { name: "Platform", url: "/platform", description: "The Intelligence Loop framework and infrastructure." },
    { name: "Company", url: "/company", description: "About SVARA and our mission." },
  ],
  metadata: {
    title: "Knowledge Hub — Enterprise Intelligence Infrastructure | SVARA",
    description: "SVARA Knowledge Hub is the definitive resource for Enterprise Intelligence Infrastructure — definitions, research, standards, and educational content about the Intelligence Loop.",
    pageType: "collection",
    datePublished: "2026-07-08",
    dateModified: "2026-07-08",
    primaryEntity: "SVARA Knowledge",
    mentions: ["Intelligence Loop", "Observe", "Understand", "Predict", "Coordinate", "Improve", "Enterprise Intelligence Infrastructure"],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Knowledge", url: "/knowledge" },
    ],
  },
}
