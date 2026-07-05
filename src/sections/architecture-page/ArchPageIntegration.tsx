import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const INTEGRATIONS = [
  "SAP",
  "Oracle",
  "Salesforce",
  "ERP Platforms",
  "MES Systems",
  "IoT Infrastructure",
  "REST APIs",
  "Webhooks",
];

export default function ArchPageIntegration() {
  return (
    <Section size="medium" className="bg-white text-center">
      <Reveal className="relative mx-auto max-w-3xl">
        <h2
          className="text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Designed For Enterprise Integration
        </h2>
        <p className="mt-6 text-cinematic-body" style={{ color: "#5D8FBE" }}>
          SVARA integrates with enterprise software, industrial hardware,
          legacy systems, and modern cloud infrastructure.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {INTEGRATIONS.map((name) => (
            <span
              key={name}
              className="rounded-full border px-6 py-3 text-sm font-bold"
              style={{
                borderColor: "rgba(220,230,242,0.8)",
                color: "#1D2E6D",
                background: "var(--tint)",
              }}
            >
              {name}
            </span>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
