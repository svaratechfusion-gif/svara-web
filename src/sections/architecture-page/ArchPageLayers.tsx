import {
  Video,
  Plane,
  Radio,
  Cog,
  Smartphone,
  Building2,
  Code2,
  Cpu,
  Archive,
  Filter,
  RefreshCw,
  Database,
  Activity,
  Brush,
  Settings2,
  Scale,
  Eye,
  Brain,
  Bot,
  Users,
  TrendingUp,
  ThumbsUp,
  Boxes,
  GitBranch,
  Gauge,
  ShieldAlert,
  Workflow,
  Route,
  ListChecks,
  Monitor,
  LayoutDashboard,
  Bell,
  FileText,
} from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const LAYERS = [
  {
    number: "01",
    name: "Physical Intelligence Layer",
    tagline: "Where Signals Originate",
    overview: "This layer captures raw operational signals from physical devices, industrial systems, and enterprise software.",
    listLabel: "Input Sources",
    items: [
      { label: "CCTV Cameras", icon: Video },
      { label: "Drones", icon: Plane },
      { label: "IoT Sensors", icon: Radio },
      { label: "Industrial Machines", icon: Cog },
      { label: "Mobile Devices", icon: Smartphone },
      { label: "ERP Systems", icon: Building2 },
      { label: "External APIs", icon: Code2 },
    ],
    purpose: "Capture structured and unstructured raw data from real-world operations.",
  },
  {
    number: "02",
    name: "Edge Processing Layer",
    tagline: "Process At Source",
    overview: "The Edge Processing Layer performs real-time local computation near the source of data to minimize latency and improve responsiveness.",
    listLabel: "Capabilities",
    items: [
      { label: "Video Stream Processing", icon: Video },
      { label: "Edge Inference", icon: Cpu },
      { label: "Data Compression", icon: Archive },
      { label: "Signal Filtering", icon: Filter },
      { label: "Device Synchronization", icon: RefreshCw },
    ],
    purpose: "Reduce latency and accelerate local intelligence.",
  },
  {
    number: "03",
    name: "Data Fusion Layer",
    tagline: "Unify Fragmented Data",
    overview: "The Data Fusion Layer consolidates multi-source data into standardized, interoperable intelligence pipelines.",
    listLabel: "Capabilities",
    items: [
      { label: "ETL Pipelines", icon: Database },
      { label: "Stream Processing", icon: Activity },
      { label: "Data Cleaning", icon: Brush },
      { label: "Feature Engineering", icon: Settings2 },
      { label: "Data Normalization", icon: Scale },
    ],
    purpose: "Transform fragmented data into structured intelligence-ready pipelines.",
  },
  {
    number: "04",
    name: "Intelligence Engine Layer",
    tagline: "Where Intelligence Happens",
    overview: "This layer powers SVARA's AI reasoning and prediction capabilities using advanced machine learning and deep learning systems.",
    listLabel: "Core Engines",
    items: [
      { label: "Computer Vision Models", icon: Eye },
      { label: "Machine Learning Models", icon: Brain },
      { label: "LLMs", icon: Bot },
      { label: "AI Agents", icon: Users },
      { label: "Prediction Engines", icon: TrendingUp },
      { label: "Recommendation Systems", icon: ThumbsUp },
    ],
    purpose: "Generate insights, predictions, and intelligence from data.",
  },
  {
    number: "05",
    name: "Simulation Layer",
    tagline: "Predict Before Execution",
    overview: "The Simulation Layer creates dynamic digital representations of physical systems for forecasting, scenario planning, and risk analysis.",
    listLabel: "Components",
    items: [
      { label: "Digital Twins", icon: Boxes },
      { label: "Forecast Models", icon: TrendingUp },
      { label: "Scenario Simulations", icon: GitBranch },
      { label: "Optimization Engines", icon: Gauge },
      { label: "Risk Models", icon: ShieldAlert },
    ],
    purpose: "Evaluate future outcomes before real-world action.",
  },
  {
    number: "06",
    name: "Orchestration Layer",
    tagline: "Convert Insight Into Action",
    overview: "The Orchestration Layer connects AI outputs to business workflows, automation engines, and decision systems.",
    listLabel: "Components",
    items: [
      { label: "AI OS", icon: Cpu },
      { label: "Workflow Engine", icon: Workflow },
      { label: "Agent Orchestration", icon: Route },
      { label: "Rule Engine", icon: ListChecks },
      { label: "Decision Routing", icon: GitBranch },
    ],
    purpose: "Turn intelligence into automated actions.",
  },
  {
    number: "07",
    name: "Experience Layer",
    tagline: "Human & Machine Interfaces",
    overview: "The Experience Layer delivers intelligence to users, systems, and applications through intuitive interfaces and programmable APIs.",
    listLabel: "Output Channels",
    items: [
      { label: "Dashboards", icon: Monitor },
      { label: "Command Center", icon: LayoutDashboard },
      { label: "Mobile Apps", icon: Smartphone },
      { label: "Alerts", icon: Bell },
      { label: "Reports", icon: FileText },
      { label: "APIs", icon: Code2 },
    ],
    purpose: "Operationalize intelligence across the enterprise.",
  },
];

export default function ArchPageLayers() {
  return (
    <div>
      {LAYERS.map((layer, i) => (
        <Section
          key={layer.number}
          size="medium"
          style={{ background: i % 2 === 0 ? "white" : "var(--tint)" }}
        >
          <Reveal className="relative mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <span
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: "#5D8FBE" }}
              >
                Layer {layer.number}
              </span>
              <h2
                className="mt-4 text-cinematic-subheading font-extrabold"
                style={{ color: "#1D2E6D" }}
              >
                {layer.name}
              </h2>
              <p
                className="mt-2 text-base font-semibold italic"
                style={{ color: "#5D8FBE" }}
              >
                {layer.tagline}
              </p>
              <p className="mt-4 text-cinematic-body" style={{ color: "#5D8FBE" }}>
                {layer.overview}
              </p>
              <p
                className="mt-6 text-sm font-semibold italic"
                style={{ color: "#1D2E6D" }}
              >
                {layer.purpose}
              </p>
            </div>

            <div>
              <h3
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: "#5D8FBE" }}
              >
                {layer.listLabel}
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {layer.items.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-2xl border bg-white px-4 py-3 shadow-card"
                    style={{ borderColor: "rgba(220,230,242,0.8)" }}
                  >
                    <item.icon size={18} style={{ color: "#5D8FBE" }} />
                    <span
                      className="text-sm font-semibold"
                      style={{ color: "#1D2E6D" }}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Section>
      ))}
    </div>
  );
}
