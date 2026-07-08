// Company Framework Level 5 — Industries
// Every industry maps to a primary capability.

export interface IndustryInfo {
  name: string;
  copy: string;
  capability: "Sense" | "Think" | "Predict" | "Act" | "Learn";
}

export const INDUSTRIES: IndustryInfo[] = [
  { name: "Manufacturing", copy: "Intelligence on the factory floor, not just the dashboard.", capability: "Predict" },
  { name: "Agriculture", copy: "Every field, monitored and optimized at scale.", capability: "Sense" },
  { name: "Healthcare", copy: "Signal from every vital, connected to one system.", capability: "Think" },
  { name: "Smart Cities", copy: "Infrastructure that senses and responds in real time.", capability: "Sense" },
  { name: "Retail", copy: "Demand and inventory, moving in sync.", capability: "Act" },
  { name: "Construction", copy: "Building sites that predict and adapt.", capability: "Predict" },
  { name: "Energy", copy: "Production, distribution, and consumption — one intelligent grid.", capability: "Predict" },
  { name: "Mining", copy: "Underground operations, monitored and automated.", capability: "Sense" },
  { name: "Ports", copy: "Cargo and logistics, orchestrated in real time.", capability: "Act" },
  { name: "Logistics", copy: "Every shipment, tracked and routed intelligently.", capability: "Act" },
  { name: "Defense", copy: "Mission-critical intelligence at the edge.", capability: "Think" },
  { name: "Government", copy: "Citizen services, secured and intelligent.", capability: "Think" },
];

export const INDUSTRY_NAMES = INDUSTRIES.map((industry) => industry.name);
