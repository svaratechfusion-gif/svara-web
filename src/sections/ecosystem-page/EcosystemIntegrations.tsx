import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const INTEGRATIONS = [
  "SAP",
  "Oracle",
  "Salesforce",
  "AWS",
  "Azure",
  "MES",
  "IoT Platforms",
  "APIs",
];

export default function EcosystemIntegrations() {
  return (
    <Section size="medium" className="bg-white text-center">
      <Reveal className="relative mx-auto max-w-3xl">
        <h2
          className="text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Integrates With Existing Infrastructure
        </h2>
        <p className="mt-6 text-cinematic-body" style={{ color: "#5D8FBE" }}>
          SVARA is designed to integrate seamlessly with enterprise software,
          industrial systems, cloud platforms, and operational technologies.
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
