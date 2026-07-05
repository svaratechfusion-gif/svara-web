import { Sparkles, Zap, Puzzle, Shuffle, ShieldCheck } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const PRINCIPLES = [
  { name: "AI Native", description: "AI is embedded at the architecture level—not added as a feature.", icon: Sparkles },
  { name: "Real-Time", description: "Intelligence is valuable only when delivered in time for action.", icon: Zap },
  { name: "Modular", description: "Every component is composable, scalable, and interoperable.", icon: Puzzle },
  { name: "Hybrid", description: "Cloud, edge, and on-prem deployments work seamlessly.", icon: Shuffle },
  { name: "Enterprise Grade", description: "Security, reliability, and scale are foundational.", icon: ShieldCheck },
];

export default function TechnologyPhilosophy() {
  return (
    <Section size="medium" style={{ background: "var(--tint)" }}>
      <Reveal className="relative mx-auto max-w-[1400px]">
        <h2
          className="text-center text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Built Around Five Core Principles
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {PRINCIPLES.map((principle, i) => (
            <div
              key={principle.name}
              className="rounded-3xl border border-[#DCE6F2] bg-white p-6 shadow-card transition-all duration-300 hover:glow-lift"
            >
              <span
                className="text-xs font-bold"
                style={{ color: "#76A8D6" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div
                className="mt-3 flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ background: "linear-gradient(135deg,#1D2E6D,#5D8FBE)" }}
              >
                <principle.icon size={18} color="white" />
              </div>
              <h3 className="mt-4 text-base font-bold" style={{ color: "#1D2E6D" }}>
                {principle.name}
              </h3>
              <p className="mt-2 text-sm" style={{ color: "#5D8FBE" }}>
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
