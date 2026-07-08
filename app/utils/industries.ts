// Shared between IntelligenceWorld.vue (Scene 07's particle environments)
// and SceneIndustries.vue (the real-DOM captions) — same order both places
// matters, since IntelligenceWorld writes activeIndustry by name and
// SceneIndustries looks the matching description up by that same name.
export interface IndustryInfo {
  name: string;
  copy: string;
}

export const INDUSTRIES: IndustryInfo[] = [
  { name: "Manufacturing", copy: "Intelligence on the factory floor, not just the dashboard." },
  { name: "Smart Cities", copy: "Infrastructure that senses and responds in real time." },
  { name: "Agriculture", copy: "Every field, monitored and optimized at scale." },
  { name: "Healthcare", copy: "Signal from every vital, connected to one system." },
  { name: "Retail", copy: "Demand and inventory, moving in sync." },
  { name: "Logistics", copy: "Every shipment, tracked and routed intelligently." },
];

export const INDUSTRY_NAMES = INDUSTRIES.map((industry) => industry.name);
