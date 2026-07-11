import type { ProductContent } from "../types/content"

export const aiOsContent: ProductContent = {
  canonicalDefinition:
    "AI OS is SVARA's operating system for enterprise intelligence — the foundational layer that manages, orchestrates, and governs all AI workloads, data flows, and intelligence capabilities across the enterprise.",
  aiAnswerTarget:
    "**AI OS** is SVARA's operating system for enterprise intelligence that manages, orchestrates, and governs all AI workloads, data flows, and intelligence capabilities across the enterprise.",
  architecture: {
    overview:
      "AI OS provides the runtime, resource management, and governance for all Intelligence Loop capabilities. It manages model deployment, data pipelines, compute resources, security policies, and observability across edge and cloud infrastructure.",
    components: [
      { name: "Intelligence Runtime", description: "Unified runtime for all AI models and intelligence workloads." },
      { name: "Resource Orchestrator", description: "Manages compute resources across edge and cloud infrastructure." },
      { name: "Data Pipeline Manager", description: "Governs data flows between Observe, Understand, Predict, Coordinate, and Improve layers." },
      { name: "Governance Engine", description: "Security, compliance, audit logging, and policy enforcement for all intelligence operations." },
    ],
    dataFlow:
      "AI OS sits beneath all Intelligence Loop layers, providing runtime and governance. Data flows are managed through the pipeline manager, compute is allocated by the resource orchestrator, and all operations are logged by the governance engine.",
  },
  useCases: [
    {
      title: "Enterprise AI Governance",
      description: "Centrally manage AI model deployments, access controls, audit trails, and compliance across all facilities and use cases.",
      industries: ["Manufacturing", "Energy", "Government"],
    },
    {
      title: "Multi-Site Intelligence Management",
      description: "Deploy and manage intelligence capabilities across multiple facilities from a single control plane.",
      industries: ["Manufacturing", "Retail", "Logistics"],
    },
  ],
  deployment: {
    overview:
      "AI OS deploys as the foundation layer before other Intelligence Loop capabilities. It establishes the runtime, governance, and resource management that all downstream capabilities depend on.",
    steps: [
      "Deploy AI OS control plane (cloud or on-premises)",
      "Register edge infrastructure with resource orchestrator",
      "Configure governance policies and access controls",
      "Enable audit logging and compliance reporting",
      "Deploy Intelligence Loop capabilities on AI OS",
    ],
  },
  industries: [
    { name: "Manufacturing", description: "Multi-factory intelligence management, centralized AI governance.", url: "/industries/manufacturing" },
    { name: "Energy", description: "Cross-plant AI operations, compliance management.", url: "/industries/energy" },
    { name: "Government", description: "Secure AI infrastructure, audit and compliance." },
  ],
  faqs: [
    { question: "Is AI OS required for other SVARA products?", answer: "AI OS is the foundation for all Intelligence Loop capabilities. Other products run on top of AI OS." },
    { question: "Can AI OS run on existing infrastructure?", answer: "Yes. AI OS deploys on existing edge hardware, private cloud, or public cloud infrastructure." },
    { question: "What governance policies does AI OS support?", answer: "Role-based access control, data lineage tracking, model versioning, audit logging, compliance reporting (SOC 2, ISO 27001), and data residency controls." },
  ],
  comparisons: [
    { concept: "MLOps Platforms", description: "Tools for managing ML model lifecycle.", differentiator: "AI OS is a complete intelligence operating system, not just MLOps. It manages data pipelines, compute resources, governance, and all Intelligence Loop capabilities." },
    { concept: "Container Orchestration (Kubernetes)", description: "Container management for general workloads.", differentiator: "AI OS is purpose-built for intelligence workloads with specialized scheduling for AI inference, data pipelines, and real-time processing." },
  ],
  capability: "Coordinate",
  outcomes: ["Coordinate"],
  roi: {
    overview:
      "AI OS deployments typically reduce AI infrastructure management overhead by 70%, accelerate model deployment from weeks to hours, and ensure enterprise-grade governance across all AI operations.",
    metrics: [
      { label: "Infrastructure Management Reduction", value: "70%" },
      { label: "Model Deployment Time", value: "Hours (vs. weeks)" },
      { label: "Compliance Coverage", value: "100% of AI operations" },
    ],
  },
  resources: [
    { title: "Operating Systems for Enterprise AI", type: "research" },
    { title: "AI Governance and Compliance Frameworks", type: "research" },
    { title: "ISO 27001 Information Security Management", type: "standard" },
  ],
  relatedProducts: [
    { name: "Command Center", url: "/products/command-center", description: "Centralized orchestration and control." },
    { name: "Business Cloud", url: "/products/business-cloud", description: "One data plane across every enterprise system." },
    { name: "Growth Intelligence", url: "/products/growth-intelligence", description: "Continuous optimization and outcome automation." },
  ],
  metadata: {
    title: "AI OS — Operating System for Enterprise Intelligence | SVARA",
    description: "AI OS manages, orchestrates, and governs all AI workloads, data flows, and intelligence capabilities across the enterprise.",
    pageType: "product",
    datePublished: "2026-07-08",
    dateModified: "2026-07-08",
    primaryEntity: "AI OS",
    mentions: ["Coordinate", "Command Center", "Business Cloud", "Enterprise Intelligence"],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Products", url: "/products" },
      { name: "AI OS", url: "/products/ai-os" },
    ],
  },
}
