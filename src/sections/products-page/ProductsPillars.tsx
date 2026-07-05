import {
  ScanEye,
  ShieldAlert,
  HardHat,
  Flame,
  Activity,
  AlertTriangle,
  UserCheck,
  Plane,
  Map,
  Thermometer,
  Sprout,
  ClipboardCheck,
  Cpu,
  Zap,
  CircuitBoard,
  Bot,
  Search,
  PenTool,
  FileText,
  MessageSquare,
  ListChecks,
  Workflow,
  Brain,
  Users,
  Route,
  ShieldCheck,
  Monitor,
  Boxes,
  GitBranch,
  TrendingUp,
  Gauge,
  Building2,
  UserCog,
  BarChart3,
  Bell,
  Factory,
  Truck,
} from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const PILLARS = [
  {
    number: "01",
    name: "Perception Intelligence",
    body: "Capture and interpret signals from the physical and digital world in real time.",
    products: [
      {
        name: "Vision AI",
        tagline: "See Beyond Human Observation",
        overview:
          "SVARA Vision AI transforms CCTV and video streams into real-time intelligence for surveillance, safety, compliance, and operational optimization.",
        capabilities: [
          { label: "Object Detection", icon: ScanEye },
          { label: "Intrusion Detection", icon: ShieldAlert },
          { label: "PPE Compliance", icon: HardHat },
          { label: "Fire & Smoke Detection", icon: Flame },
          { label: "Behavior Analysis", icon: Activity },
          { label: "Anomaly Detection", icon: AlertTriangle },
          { label: "Face Recognition (if enabled / compliant)", icon: UserCheck },
        ],
        industries: ["Manufacturing", "Smart Cities", "Retail", "Logistics", "Healthcare"],
        value: "Turn passive cameras into active intelligence systems.",
      },
      {
        name: "Drone AI",
        tagline: "Aerial Intelligence At Scale",
        overview:
          "SVARA Drone AI enables autonomous aerial monitoring, inspection, mapping, and analytics across large physical environments.",
        capabilities: [
          { label: "Drone Surveillance", icon: Plane },
          { label: "Mapping & Surveying", icon: Map },
          { label: "Thermal Detection", icon: Thermometer },
          { label: "Crop Analytics", icon: Sprout },
          { label: "Asset Inspection", icon: ClipboardCheck },
        ],
        industries: ["Agriculture", "Mining", "Construction", "Smart Cities", "Utilities"],
        value: "Monitor large-scale operations faster and more accurately.",
      },
      {
        name: "Edge AI",
        tagline: "Real-Time Intelligence At The Edge",
        overview:
          "SVARA Edge AI brings inference closer to data sources, reducing latency and enabling real-time decision making.",
        capabilities: [
          { label: "Local AI Processing", icon: Cpu },
          { label: "Stream Analytics", icon: Activity },
          { label: "Low-Latency Detection", icon: Zap },
          { label: "Embedded Intelligence", icon: CircuitBoard },
        ],
        industries: [],
        value: "Make decisions instantly without cloud dependency.",
      },
    ],
  },
  {
    number: "02",
    name: "Autonomous Intelligence",
    body: "",
    products: [
      {
        name: "Generative AI",
        tagline: "Create Intelligence At Human Speed",
        overview:
          "SVARA Generative AI enables intelligent content generation, summarization, knowledge assistance, enterprise copilots, and automated communication workflows.",
        capabilities: [
          { label: "Enterprise Copilots", icon: Bot },
          { label: "Knowledge Retrieval", icon: Search },
          { label: "Content Generation", icon: PenTool },
          { label: "Summarization", icon: FileText },
          { label: "AI Assistants", icon: MessageSquare },
        ],
        industries: [],
        value: "Augment workforce productivity using generative intelligence.",
      },
      {
        name: "AI Agents",
        tagline: "Autonomous AI Workers",
        overview:
          "SVARA AI Agents are autonomous systems capable of reasoning, planning, decision-making, and executing business workflows.",
        capabilities: [
          { label: "Task Planning", icon: ListChecks },
          { label: "Workflow Automation", icon: Workflow },
          { label: "Decision Support", icon: Brain },
          { label: "Multi-Agent Coordination", icon: Users },
        ],
        industries: [],
        value: "Automate complex workflows with intelligent agents.",
      },
      {
        name: "AI OS",
        tagline: "Operating Intelligence At Scale",
        overview:
          "SVARA AI OS acts as the orchestration layer connecting AI models, data pipelines, agents, business rules, and enterprise systems.",
        capabilities: [
          { label: "Orchestration", icon: Route },
          { label: "AI Governance", icon: ShieldCheck },
          { label: "Workflow Routing", icon: Workflow },
          { label: "Decision Engines", icon: Cpu },
          { label: "Monitoring", icon: Monitor },
        ],
        industries: [],
        value: "Centralize intelligence operations across the enterprise.",
      },
    ],
  },
  {
    number: "03",
    name: "Predictive Simulation",
    body: "",
    products: [
      {
        name: "Digital Twin",
        tagline: "Predict Before You Act",
        overview:
          "SVARA Digital Twin creates real-time digital replicas of physical systems to simulate scenarios, predict outcomes, and optimize decisions.",
        capabilities: [
          { label: "Virtual Replication", icon: Boxes },
          { label: "Scenario Simulation", icon: GitBranch },
          { label: "Predictive Forecasting", icon: TrendingUp },
          { label: "Risk Modeling", icon: ShieldAlert },
          { label: "Performance Optimization", icon: Gauge },
        ],
        industries: ["Manufacturing", "Agriculture", "Logistics", "Smart Infrastructure"],
        value: "Reduce risk and improve planning accuracy.",
      },
    ],
  },
  {
    number: "04",
    name: "Enterprise Intelligence",
    body: "",
    products: [
      {
        name: "Unified Business Cloud",
        tagline: "One Cloud. Unified Operations.",
        overview:
          "SVARA Unified Business Cloud centralizes enterprise workflows, operational data, business intelligence, and collaboration into a single cloud environment.",
        capabilities: [
          { label: "ERP", icon: Building2 },
          { label: "CRM", icon: Users },
          { label: "HRM", icon: UserCog },
          { label: "Analytics", icon: BarChart3 },
          { label: "Reporting", icon: FileText },
        ],
        industries: [],
        value: "Eliminate disconnected business tools.",
      },
      {
        name: "SVARA Command Center",
        tagline: "Command Intelligence In Real Time",
        overview:
          "The Command Center delivers a unified control interface for monitoring operations, alerts, KPIs, and intelligence-driven decisions.",
        capabilities: [
          { label: "Real-Time Dashboards", icon: Monitor },
          { label: "Alerts", icon: Bell },
          { label: "Incident Monitoring", icon: ShieldAlert },
          { label: "KPI Tracking", icon: TrendingUp },
          { label: "Executive Analytics", icon: BarChart3 },
        ],
        industries: [],
        value: "Gain complete operational visibility.",
      },
    ],
  },
];

const INDUSTRY_ICONS = {
  Manufacturing: Factory,
  "Smart Cities": Building2,
  Retail: ShieldCheck,
  Logistics: Truck,
  Healthcare: Activity,
  Agriculture: Sprout,
  Mining: Boxes,
  Construction: HardHat,
  Utilities: Zap,
  "Smart Infrastructure": Building2,
};

export default function ProductsPillars() {
  return (
    <div>
      {PILLARS.map((pillar, pillarIdx) => (
        <div key={pillar.number}>
          <Section
            size="medium"
            className="text-center"
            style={{ background: pillarIdx % 2 === 0 ? "white" : "var(--tint)" }}
          >
            <Reveal className="relative mx-auto max-w-3xl">
              <span
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: "#5D8FBE" }}
              >
                Pillar {pillar.number}
              </span>
              <h2
                className="mt-4 text-cinematic-subheading font-extrabold"
                style={{ color: "#1D2E6D" }}
              >
                {pillar.name}
              </h2>
              {pillar.body && (
                <p className="text-cinematic-body mt-6" style={{ color: "#5D8FBE" }}>
                  {pillar.body}
                </p>
              )}
            </Reveal>
          </Section>

          {pillar.products.map((product, productIdx) => {
            const productIndex =
              PILLARS.slice(0, pillarIdx).reduce(
                (sum, p) => sum + p.products.length,
                0
              ) +
              productIdx +
              1;
            return (
              <Section
                key={product.name}
                size="medium"
                style={{ background: productIdx % 2 === 0 ? "white" : "var(--tint)" }}
              >
                <Reveal className="relative mx-auto max-w-[1400px]">
                  <span
                    className="text-xs font-bold uppercase tracking-[0.2em]"
                    style={{ color: "#5D8FBE" }}
                  >
                    Product {String(productIndex).padStart(2, "0")}
                  </span>
                  <h3
                    className="mt-4 text-cinematic-subheading font-extrabold"
                    style={{ color: "#1D2E6D" }}
                  >
                    {product.name}
                  </h3>
                  <p
                    className="mt-2 text-base font-semibold italic"
                    style={{ color: "#5D8FBE" }}
                  >
                    {product.tagline}
                  </p>
                  <p className="text-cinematic-body mt-6 max-w-2xl" style={{ color: "#5D8FBE" }}>
                    {product.overview}
                  </p>

                  <div className="mt-10 grid gap-10 lg:grid-cols-2">
                    <div>
                      <h4
                        className="text-xs font-bold uppercase tracking-[0.2em]"
                        style={{ color: "#5D8FBE" }}
                      >
                        Core Capabilities
                      </h4>
                      <div className="mt-4 flex flex-wrap gap-3">
                        {product.capabilities.map((cap) => (
                          <span
                            key={cap.label}
                            className="flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-semibold shadow-card"
                            style={{
                              borderColor: "rgba(220,230,242,0.8)",
                              color: "#1D2E6D",
                            }}
                          >
                            <cap.icon size={15} style={{ color: "#5D8FBE" }} />
                            {cap.label}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      {product.industries.length > 0 && (
                        <>
                          <h4
                            className="text-xs font-bold uppercase tracking-[0.2em]"
                            style={{ color: "#5D8FBE" }}
                          >
                            Industries
                          </h4>
                          <div className="mt-4 flex flex-wrap gap-3">
                            {product.industries.map((industry) => {
                              const Icon =
                                INDUSTRY_ICONS[industry as keyof typeof INDUSTRY_ICONS] ??
                                Building2;
                              return (
                                <span
                                  key={industry}
                                  className="flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-semibold shadow-card"
                                  style={{
                                    borderColor: "rgba(220,230,242,0.8)",
                                    color: "#1D2E6D",
                                  }}
                                >
                                  <Icon size={15} style={{ color: "#5D8FBE" }} />
                                  {industry}
                                </span>
                              );
                            })}
                          </div>
                        </>
                      )}
                      <p
                        className="mt-6 text-sm font-semibold italic"
                        style={{ color: "#1D2E6D" }}
                      >
                        {product.value}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </Section>
            );
          })}
        </div>
      ))}
    </div>
  );
}
