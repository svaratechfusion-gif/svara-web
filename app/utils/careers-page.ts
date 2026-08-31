// SVARA CAREERS — Volume 10 (Careers) content layer.
// The canonical company mission, architecture overview, and components
// are imported VERBATIM from lib/content/company.ts. The closing narrative
// + final CTA come VERBATIM from lib/content/home.ts. No copy is rewritten
// or invented. Only UI-only metadata with no editorial voice — role
// categories, engineering-culture stages, career-growth levels, talent-
// network form fields — is added so the Careers page can render an
// invitation to join a world-class engineering organization.

import { companyContent } from "~~/lib/content/company"
import { homeFinalCta } from "~~/lib/content/home"

export { homeFinalCta as careersCta }

// HERO — framed by the canonical company definition + mission (verbatim).
export const careersHero = {
  eyebrow: "Careers",
  title: "Build The Future Of Enterprise Intelligence",
  mission: companyContent.architecture.components[0]!.description,
  def: companyContent.canonicalDefinition,
}

// The storytelling sequence: Learn → Build → Innovate → Scale → Lead.
export const LEGACY_STORY: string[] = [
  "Learn", "Build", "Innovate", "Scale", "Lead",
]

// WHY WORK AT SVARA — five immersive sections. Each section's framing copy
// is sourced VERBATIM from the Content Bible (company.ts architecture
// components). Section titles are from the brief.
export const whyWorkSections: { title: string; copy: string }[] = [
  { title: "Solve Meaningful Problems", copy: companyContent.architecture.overview },
  { title: "Build The Future Of AI", copy: companyContent.architecture.components[1]!.description },
  { title: "Learn Without Limits", copy: companyContent.architecture.dataFlow ?? companyContent.architecture.overview },
  { title: "Innovation Without Boundaries", copy: companyContent.architecture.components[2]!.description },
  { title: "Collaborative Engineering Culture", copy: companyContent.architecture.components[3]!.description },
]

// Interactive Role Explorer — 10 role categories from the brief.
export const ROLE_CATEGORIES: string[] = [
  "AI Engineering", "Software Engineering", "Computer Vision", "Cloud & DevOps",
  "Product Management", "Design", "Business Development", "Research",
  "Marketing", "Operations",
]

// Per-role metadata — UI-only structural fields (technologies, growth,
// projects). No marketing copy; factual role-domain descriptors.
export const ROLE_DETAILS: Record<string, {
  responsibilities: string[]
  technologies: string[]
  growth: string[]
  projects: string[]
}> = {
  "AI Engineering": {
    responsibilities: ["Architect and train production AI models", "Build inference pipelines for edge and cloud", "Own model performance and reliability"],
    technologies: ["PyTorch", "TensorRT", "ONNX", "Python", "Kubernetes"],
    growth: ["AI Architecture", "Principal ML Engineering", "Research Leadership"],
    projects: ["Vision AI models", "Digital Twin simulation engine", "AI Agents reasoning systems"],
  },
  "Software Engineering": {
    responsibilities: ["Build enterprise-grade platforms and APIs", "Own release integrity and production reliability", "Architect scalable cloud infrastructure"],
    technologies: ["Vue", "Nuxt", "Node.js", "PostgreSQL", "Docker"],
    growth: ["Senior Engineering", "Engineering Leadership", "Architecture"],
    projects: ["Business Cloud data plane", "One AI OS orchestration layer", "Unified API gateway"],
  },
  "Computer Vision": {
    responsibilities: ["Develop real-time vision inference pipelines", "Train and deploy detection/classification models", "Optimize for edge hardware"],
    technologies: ["OpenCV", "PyTorch", "TensorRT", "CUDA", "GStreamer"],
    growth: ["CV Architecture", "Vision Systems Leadership", "Research"],
    projects: ["Automated quality inspection", "Safety compliance monitoring", "Drone AI aerial intelligence"],
  },
  "Cloud & DevOps": {
    responsibilities: ["Operate cloud and hybrid infrastructure", "Build CI/CD pipelines and observability", "Ensure security and compliance"],
    technologies: ["Kubernetes", "Terraform", "AWS", "Grafana", "Prometheus"],
    growth: ["DevOps Architecture", "Platform Engineering", "SRE Leadership"],
    projects: ["Multi-region edge deployment", "CI/CD pipeline platform", "Zero-trust security layer"],
  },
  "Product Management": {
    responsibilities: ["Define product vision and roadmap", "Own customer outcomes and metrics", "Align engineering with enterprise needs"],
    technologies: ["Roadmapping", "Analytics", "Customer discovery", "OKRs"],
    growth: ["Senior PM", "Product Leadership", "GM"],
    projects: ["Intelligence Loop product strategy", "Industry vertical expansion", "Platform ecosystem roadmap"],
  },
  "Design": {
    responsibilities: ["Design enterprise-grade interfaces", "Create operational dashboards and visualizations", "Own the design system"],
    technologies: ["Figma", "Vue", "CSS", "Design systems", "Data visualization"],
    growth: ["Senior Design", "Design Leadership", "Design Systems Architecture"],
    projects: ["Operations dashboard platform", "Command Center interface", "Design system foundation"],
  },
  "Business Development": {
    responsibilities: ["Build enterprise client relationships", "Scope and close strategic partnerships", "Expand into new industries"],
    technologies: ["CRM", "Pipeline management", "Enterprise sales", "Negotiation"],
    growth: ["Senior BD", "BD Leadership", "Strategic Partnerships"],
    projects: ["Enterprise expansion", "Partner ecosystem", "Industry vertical growth"],
  },
  "Research": {
    responsibilities: ["Advance the state of enterprise AI", "Publish and patent novel approaches", "Bridge research and production"],
    technologies: ["PyTorch", "JAX", "Research frameworks", "Academic publishing"],
    growth: ["Senior Research", "Research Leadership", "Principal Scientist"],
    projects: ["Intelligence Loop research", "Multi-agent systems", "Edge-optimized inference"],
  },
  "Marketing": {
    responsibilities: ["Position SVARA as a category leader", "Build thought leadership content", "Drive demand generation"],
    technologies: ["Content", "SEO", "Analytics", "Marketing automation"],
    growth: ["Senior Marketing", "Marketing Leadership", "CMO track"],
    projects: ["Category creation", "Content engine", "Growth & PR tech"],
  },
  "Operations": {
    responsibilities: ["Scale the operating engine of the company", "Own finance, people, and systems", "Build the backbone for growth"],
    technologies: ["Operations", "Finance", "HR systems", "Process design"],
    growth: ["Senior Operations", "Operations Leadership", "COO track"],
    projects: ["Operating system", "Scaling framework", "People engine"],
  },
}

// Engineering Culture workflow stages.
export const CULTURE_FLOW: string[] = [
  "Experiment", "Prototype", "Build", "Deploy", "Learn", "Improve",
]

// Career Growth journey levels.
export const GROWTH_LEVELS: string[] = [
  "Intern", "Engineer", "Senior", "Lead", "Architect", "Director",
]

// Open Opportunities — currently no live openings. The page prominently
// features the Talent Network instead. (When roles are available, they'll
// be sourced from a content file — none exists today.)
export const HAS_OPENINGS = false

// Talent Network form fields — factual form structure.
export const TALENT_FORM = {
  title: "Join Our Talent Network",
  sub: "Submit your details and we'll reach out when a role matches your expertise. We're always looking for exceptional people.",
  fields: [
    { name: "name", label: "Full Name", type: "text", placeholder: "Your name" },
    { name: "email", label: "Email", type: "email", placeholder: "you@email.com" },
    { name: "linkedin", label: "LinkedIn Profile", type: "url", placeholder: "linkedin.com/in/you" },
    { name: "role", label: "Area of Interest", type: "select", options: ROLE_CATEGORIES },
  ] as const,
  resumeLabel: "Upload Resume",
  submitLabel: "Join the Network",
}