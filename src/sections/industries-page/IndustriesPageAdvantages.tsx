import { Target, Puzzle, Monitor, TrendingUp, Expand, ShieldCheck } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const ADVANTAGES = [
  { name: "Domain-Aware AI", description: "Industry-specific intelligence models.", icon: Target },
  { name: "Modular Deployment", description: "Deploy only what you need.", icon: Puzzle },
  { name: "Real-Time Visibility", description: "Unified operational dashboards.", icon: Monitor },
  { name: "Predictive Decisions", description: "Move from reactive to proactive operations.", icon: TrendingUp },
  { name: "Scalable Infrastructure", description: "From pilots to enterprise rollouts.", icon: Expand },
  { name: "Secure Operations", description: "Built for mission-critical systems.", icon: ShieldCheck },
];

export default function IndustriesPageAdvantages() {
  return (
    <Section size="medium" style={{ background: "var(--tint)" }}>
      <Reveal className="relative mx-auto max-w-[1400px]">
        <h2
          className="text-center text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Why SVARA Across Industries
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ADVANTAGES.map((advantage) => (
            <div
              key={advantage.name}
              className="rounded-3xl border border-[#DCE6F2] bg-white p-8 shadow-card transition-all duration-300 hover:glow-lift"
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{ background: "linear-gradient(135deg,#1D2E6D,#5D8FBE)" }}
              >
                <advantage.icon size={22} color="white" />
              </div>
              <h3 className="mt-5 text-lg font-bold" style={{ color: "#1D2E6D" }}>
                {advantage.name}
              </h3>
              <p className="mt-2 text-sm" style={{ color: "#5D8FBE" }}>
                {advantage.description}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
