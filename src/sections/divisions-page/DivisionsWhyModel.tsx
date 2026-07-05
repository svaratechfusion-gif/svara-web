import { Award, Layers, Zap, Expand, Rocket, Trophy } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const BENEFITS = [
  { name: "Specialized Excellence", description: "Dedicated expertise in each technology domain.", icon: Award },
  { name: "Unified Delivery", description: "Integrated execution across divisions.", icon: Layers },
  { name: "Faster Innovation", description: "Rapid experimentation and deployment.", icon: Zap },
  { name: "Enterprise Scalability", description: "Designed for complex multi-system environments.", icon: Expand },
  { name: "Future Readiness", description: "Continuously evolving with emerging technologies.", icon: Rocket },
  { name: "Strategic Advantage", description: "Technology, execution, and growth under one ecosystem.", icon: Trophy },
];

export default function DivisionsWhyModel() {
  return (
    <Section size="medium" style={{ background: "var(--tint)" }}>
      <Reveal className="relative mx-auto max-w-[1400px]">
        <h2
          className="text-center text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Why The Division Model Matters
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
