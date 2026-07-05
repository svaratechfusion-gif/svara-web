import { Factory, Sprout, Truck, Building2 } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const USE_CASES = [
  { name: "Manufacturing", description: "Safety monitoring and predictive maintenance.", icon: Factory },
  { name: "Agriculture", description: "Crop analytics and drone intelligence.", icon: Sprout },
  { name: "Logistics", description: "Fleet orchestration and route optimization.", icon: Truck },
  { name: "Smart Cities", description: "Surveillance and traffic intelligence.", icon: Building2 },
];

export default function EcosystemUseCases() {
  return (
    <Section size="medium" className="bg-white">
      <Reveal className="relative mx-auto max-w-[1400px]">
        <h2
          className="text-center text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Intelligence In Action
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {USE_CASES.map((useCase) => (
            <div
              key={useCase.name}
              className="flex flex-col items-center gap-4 rounded-3xl border border-[#DCE6F2] p-8 text-center shadow-card transition-all duration-300 hover:glow-lift"
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{ background: "linear-gradient(135deg,#1D2E6D,#5D8FBE)" }}
              >
                <useCase.icon size={24} color="white" />
              </div>
              <h3 className="text-base font-bold" style={{ color: "#1D2E6D" }}>
                {useCase.name}
              </h3>
              <p className="text-sm" style={{ color: "#5D8FBE" }}>
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
