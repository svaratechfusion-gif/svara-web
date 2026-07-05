import { Cloud, Shuffle, Server } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const MODELS = [
  { name: "Cloud Deployment", description: "Deploy across AWS, Azure, and GCP for rapid scalability.", icon: Cloud },
  { name: "Hybrid Deployment", description: "Combine cloud infrastructure with edge intelligence.", icon: Shuffle },
  { name: "On-Prem Deployment", description: "Private infrastructure for secure enterprise environments.", icon: Server },
];

export default function ArchPageDeployment() {
  return (
    <Section size="medium" className="bg-white">
      <Reveal className="relative mx-auto max-w-[1400px]">
        <h2
          className="text-center text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Flexible Deployment Models
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {MODELS.map((model) => (
            <div
              key={model.name}
              className="flex flex-col items-center gap-4 rounded-3xl border border-[#DCE6F2] p-10 text-center shadow-card transition-all duration-300 hover:glow-lift"
              style={{ background: "var(--tint)" }}
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
