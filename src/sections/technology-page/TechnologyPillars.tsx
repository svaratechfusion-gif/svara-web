import {
  Eye,
  Video,
  Radio,
  ScanEye,
  Layers,
  Grid3x3,
  GraduationCap,
  Shuffle,
  Brain,
  Repeat,
  TrendingUp,
  ThumbsUp,
  Gauge,
  Route,
  Database,
  Boxes,
  Terminal,
  SlidersHorizontal,
  Bot,
  Cpu,
  CircuitBoard,
  Network,
  Activity,
  GitBranch,
  Workflow,
  Users,
  ShieldCheck,
  Cloud,
  Ship,
  Package,
  Code2,
} from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const PILLARS = [
  {
    number: "01",
    name: "Perception Systems",
    body: "Perception technologies enable machines to observe and interpret visual, spatial, and sensor-based signals from the physical world.",
    listLabel: "Core Technologies",
    items: [
      { label: "Computer Vision", icon: Eye },
      { label: "Video Analytics", icon: Video },
      { label: "Sensor Fusion", icon: Radio },
      { label: "Object Detection", icon: ScanEye },
      { label: "Image Segmentation", icon: Layers },
      { label: "Pattern Recognition", icon: Grid3x3 },
    ],
    secondaryLabel: "Use Cases",
    secondary: ["CCTV intelligence", "surveillance", "drone analytics", "defect detection"],
  },
  {
    number: "02",
    name: "Intelligence Models",
    body: "SVARA uses advanced AI and machine learning systems to detect patterns, infer meaning, predict outcomes, and improve continuously.",
    listLabel: "Technologies",
    items: [
      { label: "Supervised Learning", icon: GraduationCap },
      { label: "Unsupervised Learning", icon: Shuffle },
      { label: "Deep Learning", icon: Brain },
      { label: "Reinforcement Learning", icon: Repeat },
      { label: "Predictive Analytics", icon: TrendingUp },
      { label: "Recommendation Models", icon: ThumbsUp },
    ],
    secondaryLabel: "Model Functions",
    secondary: ["Classification", "Detection", "Prediction", "Optimization"],
  },
  {
    number: "03",
    name: "Language Intelligence",
    body: "Generative AI enables natural language reasoning, enterprise knowledge systems, copilots, and intelligent AI assistants.",
    listLabel: "Technologies",
    items: [
      { label: "LLM Orchestration", icon: Route },
      { label: "RAG Pipelines", icon: Database },
      { label: "Vector Databases", icon: Boxes },
      { label: "Prompt Engineering", icon: Terminal },
      { label: "Fine-Tuning", icon: SlidersHorizontal },
      { label: "Agent Memory Systems", icon: Bot },
    ],
    secondaryLabel: "Capabilities",
    secondary: ["reasoning", "summarization", "retrieval", "planning", "automation"],
  },
  {
    number: "04",
    name: "Edge Intelligence",
    body: "Edge infrastructure allows AI inference to run closer to devices and sensors, reducing latency and enabling real-time decision making.",
    listLabel: "Technologies",
    items: [
      { label: "Edge Nodes", icon: Cpu },
      { label: "GPU Accelerators", icon: Gauge },
      { label: "Embedded AI", icon: CircuitBoard },
      { label: "Distributed Inference", icon: Network },
      { label: "Stream Processing", icon: Activity },
    ],
    secondaryLabel: "Benefits",
    secondary: ["low latency", "local processing", "offline capability"],
  },
  {
    number: "05",
    name: "Simulation Intelligence",
    body: "SVARA's simulation stack creates digital replicas of physical systems to forecast scenarios and optimize decisions before real-world execution.",
    listLabel: "Technologies",
    items: [
      { label: "Simulation Engines", icon: Boxes },
      { label: "Predictive Models", icon: TrendingUp },
      { label: "Scenario Testing", icon: GitBranch },
      { label: "Optimization Algorithms", icon: Gauge },
      { label: "Virtual Modeling", icon: Layers },
    ],
    secondaryLabel: null,
    secondary: [],
  },
  {
    number: "06",
    name: "AI Orchestration Layer",
    body: "SVARA orchestrates data, AI models, agents, workflows, and business systems through a unified control layer.",
    listLabel: "Components",
    items: [
      { label: "AI OS", icon: Cpu },
      { label: "Workflow Engine", icon: Workflow },
      { label: "Decision Engine", icon: Brain },
      { label: "Agent Coordination", icon: Users },
      { label: "Policy Engine", icon: ShieldCheck },
    ],
    secondaryLabel: null,
    secondary: [],
  },
  {
    number: "07",
    name: "Scalable Infrastructure",
    body: "Enterprise intelligence requires resilient, scalable infrastructure that can process massive workloads reliably.",
    listLabel: "Infrastructure Stack",
    items: [
      { label: "Cloud Compute", icon: Cloud },
      { label: "Kubernetes", icon: Ship },
      { label: "Containerization", icon: Package },
      { label: "Microservices", icon: Network },
      { label: "APIs", icon: Code2 },
      { label: "Event Pipelines", icon: GitBranch },
    ],
    secondaryLabel: "Supported Platforms",
    secondary: ["AWS", "Azure", "GCP", "Private Cloud"],
  },
];

export default function TechnologyPillars() {
  return (
    <div>
      {PILLARS.map((pillar, i) => (
        <Section
          key={pillar.number}
          size="medium"
          style={{ background: i % 2 === 0 ? "white" : "var(--tint)" }}
        >
          <Reveal className="relative mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-2 lg:items-start">
            <div>
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
              <p className="text-cinematic-body mt-6" style={{ color: "#5D8FBE" }}>
                {pillar.body}
              </p>

              {pillar.secondaryLabel && (
                <div className="mt-10">
                  <h3
                    className="text-xs font-bold uppercase tracking-[0.2em]"
                    style={{ color: "#5D8FBE" }}
                  >
                    {pillar.secondaryLabel}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {pillar.secondary.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border bg-white px-4 py-2 text-xs font-semibold capitalize"
                        style={{ borderColor: "rgba(220,230,242,0.8)", color: "#1D2E6D" }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <h3
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: "#5D8FBE" }}
              >
                {pillar.listLabel}
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {pillar.items.map((item) => (
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
