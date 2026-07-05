import { Eye, Zap, TrendingUp, Workflow, PiggyBank, Trophy } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const BENEFITS = [
  { name: "Unified Visibility", description: "Gain a single operational intelligence view.", icon: Eye },
  { name: "Faster Decisions", description: "Reduce latency between signal and action.", icon: Zap },
  { name: "Predictive Intelligence", description: "Move from reactive to proactive operations.", icon: TrendingUp },
  { name: "Scalable Automation", description: "Automate workflows at enterprise scale.", icon: Workflow },
  { name: "Lower Costs", description: "Reduce inefficiencies and hidden losses.", icon: PiggyBank },
  { name: "Competitive Advantage", description: "Build intelligence as strategic infrastructure.", icon: Trophy },
];

export default function EcosystemBenefits() {
  return (
    <Section size="medium" style={{ background: "var(--tint)" }}>
      <Reveal className="relative mx-auto max-w-[1400px]">
        <h2
          className="text-center text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Why The Ecosystem Matters
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((benefit) => (
            <div
              key={benefit.name}
              className="rounded-3xl border border-[#DCE6F2] bg-white p-8 shadow-card transition-all duration-300 hover:glow-lift"
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{ background: "linear-gradient(135deg,#1D2E6D,#5D8FBE)" }}
              >
                <benefit.icon size={22} color="white" />
              </div>
              <h3 className="mt-5 text-lg font-bold" style={{ color: "#1D2E6D" }}>
                {benefit.name}
              </h3>
              <p className="mt-2 text-sm" style={{ color: "#5D8FBE" }}>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
