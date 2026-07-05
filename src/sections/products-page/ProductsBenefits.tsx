import { Puzzle, Expand, Sparkles, ShieldCheck, Target, Network } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const BENEFITS = [
  { name: "Modular Architecture", icon: Puzzle },
  { name: "Enterprise Scalability", icon: Expand },
  { name: "AI Native Design", icon: Sparkles },
  { name: "Secure Deployment", icon: ShieldCheck },
  { name: "Industry Adaptability", icon: Target },
  { name: "Unified Ecosystem", icon: Network },
];

export default function ProductsBenefits() {
  return (
    <Section size="medium" className="bg-white">
      <Reveal className="relative mx-auto max-w-[1400px]">
        <h2
          className="text-center text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Why SVARA Products
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((benefit) => (
            <div
              key={benefit.name}
              className="flex items-center gap-4 rounded-2xl border border-[#DCE6F2] p-6 shadow-card transition-all duration-300 hover:glow-lift"
            >
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                style={{ background: "linear-gradient(135deg,#1D2E6D,#5D8FBE)" }}
              >
                <benefit.icon size={20} color="white" />
              </div>
              <span className="text-base font-bold" style={{ color: "#1D2E6D" }}>
                {benefit.name}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
