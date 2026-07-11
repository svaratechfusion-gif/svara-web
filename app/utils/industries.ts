// Company Framework Level 5 — Industries
// Every industry maps to a primary capability.
//
// Single source of truth for: world cluster names (INDUSTRY_NAMES), the
// /industries index listing (slug + summary), and the slug keys the
// /[slug].vue content map must satisfy. Adding an industry here without a
// matching lib/content/<slug>.ts will surface as a 404 — by design.

export interface IndustryInfo {
  name: string;
  copy: string;
  capability: "Observe" | "Understand" | "Predict" | "Coordinate" | "Improve";
  /** URL slug — also the lib/content/<slug>.ts filename key. */
  slug: string;
  /** One-line summary for the /industries index listing. */
  summary: string;
}

export const INDUSTRIES: IndustryInfo[] = [
  { name: "Manufacturing", copy: "Intelligence on the factory floor, not just the dashboard.", capability: "Predict", slug: "manufacturing", summary: "Production intelligence, quality optimization, predictive maintenance." },
  { name: "Energy", copy: "Production, distribution, and consumption — one intelligent grid.", capability: "Predict", slug: "energy", summary: "Grid operations, plant optimization, infrastructure monitoring." },
  { name: "Logistics", copy: "Every shipment, tracked and routed intelligently.", capability: "Coordinate", slug: "logistics", summary: "Supply chain visibility, warehouse optimization, fleet intelligence." },
  { name: "Healthcare", copy: "Signal from every vital, connected to one system.", capability: "Understand", slug: "healthcare", summary: "Patient care optimization, operational intelligence." },
  { name: "Smart Cities", copy: "Infrastructure that senses and responds in real time.", capability: "Observe", slug: "smart-cities", summary: "Urban infrastructure intelligence, public safety." },
  { name: "Retail", copy: "Demand and inventory, moving in sync.", capability: "Coordinate", slug: "retail", summary: "Store operations, supply chain, customer experience." },
  { name: "Construction", copy: "Building sites that predict and adapt.", capability: "Predict", slug: "construction", summary: "Site intelligence, equipment monitoring, safety." },
  { name: "Mining", copy: "Underground operations, monitored and automated.", capability: "Observe", slug: "mining", summary: "Remote site operations, equipment monitoring, safety." },
  { name: "Ports", copy: "Cargo and logistics, orchestrated in real time.", capability: "Coordinate", slug: "ports", summary: "Container tracking, equipment optimization, security." },
  { name: "Defense", copy: "Mission-critical intelligence at the edge.", capability: "Understand", slug: "defense", summary: "Situational awareness, logistics, infrastructure protection." },
  { name: "Government", copy: "Citizen services, secured and intelligent.", capability: "Understand", slug: "government", summary: "Citizen services, infrastructure management, compliance." },
  { name: "Agriculture", copy: "Every field, monitored and optimized at scale.", capability: "Observe", slug: "agriculture", summary: "Precision farming, equipment monitoring, yield optimization." },
];

export const INDUSTRY_NAMES = INDUSTRIES.map((industry) => industry.name);

/** Industries index listing — the single canonical source for /industries. */
export const INDUSTRIES_LIST = INDUSTRIES.map((industry) => ({
  name: industry.name,
  description: industry.summary,
  url: `/industries/${industry.slug}`,
}));
