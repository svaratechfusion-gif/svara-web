import {
  Eye,
  Plane,
  Cpu,
  Wifi,
  Radio,
  Sparkles,
  MessageSquare,
  Bot,
  TrendingUp,
  Wand2,
  Workflow,
  Boxes,
  GitBranch,
  ShieldAlert,
  Cloud,
  Building2,
  Users,
  UserCog,
  Monitor,
} from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const LAYERS = [
  {
    number: "01",
    name: "Perception Layer",
    heading: "Sense The Physical World",
    body: "The Perception Layer captures signals from the physical and digital world, enabling enterprises to build awareness in real time.",
    itemsLabel: "Products",
    items: [
      { label: "Vision AI", icon: Eye },
      { label: "Drone AI", icon: Plane },
      { label: "Edge AI", icon: Cpu },
      { label: "IoT Integrations", icon: Wifi },
      { label: "Sensor Networks", icon: Radio },
    ],
    keyValue: "Turn raw operational signals into machine-readable intelligence.",
  },
  {
    number: "02",
    name: "Intelligence Layer",
    heading: "Understand What Matters",
    body: "The Intelligence Layer processes structured and unstructured data using advanced AI models, transforming signals into insights, patterns, and predictions.",
    itemsLabel: "Technologies",
    items: [
      { label: "Computer Vision", icon: Eye },
      { label: "Machine Learning", icon: Sparkles },
      { label: "NLP", icon: MessageSquare },
      { label: "LLMs", icon: Bot },
      { label: "Prediction Models", icon: TrendingUp },
    ],
    keyValue: "Extract intelligence from massive data streams.",
  },
  {
    number: "03",
    name: "Automation Layer",
    heading: "Automate Decision Execution",
    body: "SVARA's automation layer enables enterprises to reduce manual intervention by orchestrating workflows through AI agents and intelligent business rules.",
    itemsLabel: "Products",
    items: [
      { label: "AI Agents", icon: Bot },
      { label: "Generative AI", icon: Wand2 },
      { label: "AI OS", icon: Cpu },
      { label: "Workflow Engines", icon: Workflow },
    ],
    keyValue: "Convert intelligence into automated action.",
  },
  {
    number: "04",
    name: "Simulation Layer",
    heading: "Predict Before Action",
    body: "The Simulation Layer creates digital replicas of physical systems, enabling businesses to test scenarios, predict outcomes, and optimize operations before execution.",
    itemsLabel: "Products",
    items: [
      { label: "Digital Twin", icon: Boxes },
      { label: "Scenario Engine", icon: GitBranch },
      { label: "Forecast Models", icon: TrendingUp },
      { label: "Risk Analysis", icon: ShieldAlert },
    ],
    keyValue: "Reduce uncertainty using predictive simulations.",
  },
  {
    number: "05",
    name: "Enterprise Layer",
    heading: "Operationalize Intelligence",
    body: "The Enterprise Layer embeds intelligence into day-to-day business workflows, ensuring insights drive measurable business outcomes.",
    itemsLabel: "Products",
    items: [
      { label: "Unified Business Cloud", icon: Cloud },
      { label: "ERP", icon: Building2 },
      { label: "CRM", icon: Users },
      { label: "HRM", icon: UserCog },
      { label: "Command Center", icon: Monitor },
    ],
    keyValue: "Make intelligence usable across the organization.",
  },
];

export default function EcosystemLayers() {
  return (
    <div>
      {LAYERS.map((layer, i) => (
        <Section
          key={layer.number}
          size="medium"
          style={{ background: i % 2 === 0 ? "white" : "var(--tint)" }}
        >
          <Reveal className="relative mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: "#5D8FBE" }}
              >
                Layer {layer.number} — {layer.name}
              </span>
              <h2
                className="mt-4 text-cinematic-subheading font-extrabold"
                style={{ color: "#1D2E6D" }}
              >
                {layer.heading}
              </h2>
              <p className="mt-6 text-cinematic-body" style={{ color: "#5D8FBE" }}>
                {layer.body}
              </p>
              <p
                className="mt-6 text-sm font-semibold italic"
                style={{ color: "#1D2E6D" }}
              >
                {layer.keyValue}
              </p>
            </div>

            <div>
              <h3
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: "#5D8FBE" }}
              >
                {layer.itemsLabel}
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
