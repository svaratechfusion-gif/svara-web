import {
  Eye,
  Sparkles,
  TrendingUp,
  Bot,
  Cpu,
  Brain,
  Plane,
  Boxes,
  Layers,
  GitBranch,
  ShieldAlert,
  Building2,
  Users,
  UserCog,
  Monitor,
  Cloud,
  Workflow,
  Route,
  ShieldCheck,
  Globe,
  Smartphone,
  Code2,
  Link2,
  Target,
  Megaphone,
  BarChart3,
} from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const DIVISIONS = [
  {
    number: "01",
    name: "Deep Tech & AI Lab",
    tagline: "Where Intelligence Is Engineered",
    body: "The Deep Tech & AI Lab serves as SVARA's research and innovation engine, focused on designing advanced AI models, perception systems, intelligent decision engines, and next-generation machine learning pipelines.",
    capabilities: [
      { label: "Computer Vision", icon: Eye },
      { label: "Machine Learning", icon: Sparkles },
      { label: "Predictive Analytics", icon: TrendingUp },
      { label: "LLM Engineering", icon: Bot },
      { label: "Edge AI", icon: Cpu },
      { label: "AI Model Training", icon: Brain },
    ],
    products: ["Vision AI", "Drone AI", "Edge AI", "AI Agents"],
    productIcons: [Eye, Plane, Cpu, Bot],
    value: "Transform raw data into intelligent, actionable insights.",
  },
  {
    number: "02",
    name: "Digital Twin Lab",
    tagline: "Predict Before Execution",
    body: "SVARA's Digital Twin Lab creates virtual replicas of physical systems, processes, and environments, enabling enterprises to simulate operations, forecast risks, and optimize outcomes before real-world implementation.",
    capabilities: [
      { label: "Simulation Modeling", icon: Boxes },
      { label: "Virtual Replicas", icon: Layers },
      { label: "Scenario Analysis", icon: GitBranch },
      { label: "Predictive Forecasting", icon: TrendingUp },
      { label: "Risk Optimization", icon: ShieldAlert },
    ],
    products: ["Digital Twin Platform", "Scenario Engine", "Forecast Models"],
    productIcons: [Boxes, GitBranch, TrendingUp],
    value: "Reduce uncertainty and optimize decisions using simulations.",
  },
  {
    number: "03",
    name: "SaaS Studio",
    tagline: "Enterprise Software Reimagined",
    body: "The SaaS Studio designs scalable enterprise software products that unify operations, workflows, and business intelligence across departments and locations.",
    capabilities: [
      { label: "ERP Platforms", icon: Building2 },
      { label: "CRM Systems", icon: Users },
      { label: "HRM Systems", icon: UserCog },
      { label: "Business Dashboards", icon: Monitor },
      { label: "Cloud Platforms", icon: Cloud },
    ],
    products: ["Unified Business Cloud", "Command Center", "ERP / CRM / HRM"],
    productIcons: [Cloud, Monitor, Building2],
    value: "Operationalize intelligence across the enterprise.",
  },
  {
    number: "04",
    name: "AI OS Division",
    tagline: "Operating Intelligence At Scale",
    body: "The AI OS Division builds SVARA's orchestration layer—an intelligent operating system that connects AI models, workflows, agents, automation rules, and enterprise infrastructure.",
    capabilities: [
      { label: "Agent Orchestration", icon: Bot },
      { label: "Workflow Automation", icon: Workflow },
      { label: "Intelligence Routing", icon: Route },
      { label: "Decision Engines", icon: Cpu },
      { label: "AI Governance", icon: ShieldCheck },
    ],
    products: ["AI OS", "AI Agents", "Workflow Engine"],
    productIcons: [Cpu, Bot, Workflow],
    value: "Convert intelligence into autonomous action.",
  },
  {
    number: "05",
    name: "Digital Engineering",
    tagline: "Engineering Digital Infrastructure",
    body: "SVARA's Digital Engineering division develops production-grade digital systems that power customer-facing applications, enterprise platforms, cloud infrastructure, and scalable integrations.",
    capabilities: [
      { label: "Web Platforms", icon: Globe },
      { label: "Mobile Apps", icon: Smartphone },
      { label: "Cloud Engineering", icon: Cloud },
      { label: "APIs", icon: Code2 },
      { label: "DevOps", icon: GitBranch },
      { label: "Enterprise Integrations", icon: Link2 },
    ],
    products: ["Web Platforms", "Mobile Apps", "API Infrastructure"],
    productIcons: [Globe, Smartphone, Code2],
    value: "Build secure, scalable digital infrastructure.",
  },
  {
    number: "06",
    name: "Growth & PR Tech",
    tagline: "Scaling Visibility Through Intelligence",
    body: "The Growth & PR Tech division combines data-driven marketing, brand intelligence, reputation management, and digital visibility systems to accelerate market expansion.",
    capabilities: [
      { label: "Digital Growth", icon: TrendingUp },
      { label: "Performance Marketing", icon: Target },
      { label: "Brand Intelligence", icon: Sparkles },
      { label: "PR Automation", icon: Megaphone },
      { label: "Analytics", icon: BarChart3 },
    ],
    products: ["Growth Dashboards", "Campaign Intelligence", "Brand Analytics"],
    productIcons: [Monitor, Target, BarChart3],
    value: "Accelerate adoption, awareness, and revenue growth.",
  },
];

export default function DivisionsDetail() {
  return (
    <div>
      {DIVISIONS.map((division, i) => (
        <Section
          key={division.number}
          size="medium"
          style={{ background: i % 2 === 0 ? "white" : "var(--tint)" }}
        >
          <Reveal className="relative mx-auto max-w-[1400px]">
            <span
              className="text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: "#5D8FBE" }}
            >
              Division {division.number}
            </span>
            <h2
              className="mt-4 text-cinematic-subheading font-extrabold"
              style={{ color: "#1D2E6D" }}
            >
              {division.name}
            </h2>
            <p
              className="mt-2 text-base font-semibold italic"
              style={{ color: "#5D8FBE" }}
            >
              {division.tagline}
            </p>
            <p className="mt-4 max-w-2xl text-cinematic-body" style={{ color: "#5D8FBE" }}>
              {division.body}
            </p>

            <div className="mt-10 grid gap-10 lg:grid-cols-2">
              <div>
                <h3
                  className="text-xs font-bold uppercase tracking-[0.2em]"
                  style={{ color: "#5D8FBE" }}
                >
                  Core Capabilities
                </h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {division.capabilities.map((cap) => (
                    <span
                      key={cap.label}
                      className="flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-semibold shadow-card"
                      style={{ borderColor: "rgba(220,230,242,0.8)", color: "#1D2E6D" }}
                    >
                      <cap.icon size={15} style={{ color: "#5D8FBE" }} />
                      {cap.label}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3
                  className="text-xs font-bold uppercase tracking-[0.2em]"
                  style={{ color: "#5D8FBE" }}
                >
                  Key Products Supported
                </h3>
                <div className="mt-4 flex flex-col gap-3">
                  {division.products.map((product, idx) => {
                    const Icon = division.productIcons[idx];
                    return (
                      <div
                        key={product}
                        className="flex items-center gap-3 rounded-2xl border bg-white px-4 py-3 shadow-card"
                        style={{ borderColor: "rgba(220,230,242,0.8)" }}
                      >
                        <Icon size={18} style={{ color: "#5D8FBE" }} />
                        <span
                          className="text-sm font-semibold"
                          style={{ color: "#1D2E6D" }}
                        >
                          {product}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <p
                  className="mt-6 text-sm font-semibold italic"
                  style={{ color: "#1D2E6D" }}
                >
                  {division.value}
                </p>
              </div>
            </div>
          </Reveal>
        </Section>
      ))}
    </div>
  );
}
