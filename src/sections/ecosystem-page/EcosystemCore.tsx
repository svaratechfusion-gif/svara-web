import { Shuffle, Route, Workflow, TrendingUp, Activity } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const CAPABILITIES = [
  { label: "Data Orchestration", icon: Shuffle },
  { label: "Intelligence Routing", icon: Route },
  { label: "Workflow Automation", icon: Workflow },
  { label: "Predictive Decisioning", icon: TrendingUp },
  { label: "Real-Time Monitoring", icon: Activity },
];

export default function EcosystemCore() {
  return (
    <Section size="medium" className="text-center" style={{ background: "var(--tint)" }}>
      <Reveal className="relative mx-auto max-w-3xl">
        <h2
          className="text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          The SVARA Core
        </h2>
        <p className="mt-6 text-cinematic-body" style={{ color: "#5D8FBE" }}>
          At the center of the ecosystem lies the SVARA Core—an intelligent
          orchestration engine that connects data, AI models, simulations,
          workflows, and business systems into one unified intelligence
          layer.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {CAPABILITIES.map((cap) => (
            <span
              key={cap.label}
              className="flex items-center gap-2 rounded-full border bg-white px-5 py-3 text-sm font-semibold shadow-card"
              style={{ borderColor: "rgba(220,230,242,0.8)", color: "#1D2E6D" }}
            >
              <cap.icon size={16} style={{ color: "#5D8FBE" }} />
              {cap.label}
            </span>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
