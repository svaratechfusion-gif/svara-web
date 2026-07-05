import { Sparkles, Puzzle, Expand, Shuffle, ShieldCheck, Rocket } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const ADVANTAGES = [
  { name: "AI Native", description: "Designed around intelligence, not retrofitted.", icon: Sparkles },
  { name: "Modular", description: "Flexible architecture for evolving business needs.", icon: Puzzle },
  { name: "Scalable", description: "Supports exponential growth in workloads.", icon: Expand },
  { name: "Hybrid Ready", description: "Cloud, edge, and on-prem compatible.", icon: Shuffle },
  { name: "Secure", description: "Enterprise-grade reliability and governance.", icon: ShieldCheck },
  { name: "Future-Proof", description: "Built for next-generation AI systems.", icon: Rocket },
];

export default function ArchPageAdvantages() {
  return (
    <Section size="medium" className="bg-white">
      <Reveal className="relative mx-auto max-w-[1400px]">
        <h2
          className="text-center text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Why SVARA Architecture
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ADVANTAGES.map((advantage) => (
            <div
              key={advantage.name}
              className="rounded-3xl border border-[#DCE6F2] p-8 shadow-card transition-all duration-300 hover:glow-lift"
              style={{ background: "var(--tint)" }}
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
