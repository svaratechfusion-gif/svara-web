import { Cloud, Shuffle, Server } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const MODELS = [
  { name: "Cloud", description: "Fast deployment", icon: Cloud },
  { name: "Hybrid", description: "Cloud + Edge", icon: Shuffle },
  { name: "On-Prem", description: "Private infrastructure", icon: Server },
];

export default function ProductsDeployment() {
  return (
    <Section size="medium" style={{ background: "var(--tint)" }}>
      <Reveal className="relative mx-auto max-w-[1400px]">
        <h2
          className="text-center text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Flexible Deployment For Every Enterprise
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {MODELS.map((model) => (
            <div
              key={model.name}
              className="flex flex-col items-center gap-4 rounded-3xl border border-[#DCE6F2] bg-white p-10 text-center shadow-card transition-all duration-300 hover:glow-lift"
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{ background: "linear-gradient(135deg,#1D2E6D,#5D8FBE)" }}
              >
                <model.icon size={24} color="white" />
              </div>
              <h3 className="text-lg font-bold" style={{ color: "#1D2E6D" }}>
                {model.name}
              </h3>
              <p className="text-sm" style={{ color: "#5D8FBE" }}>
                {model.description}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
