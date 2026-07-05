import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const INTEGRATIONS = ["ERP", "CRM", "SAP", "Oracle", "APIs", "Industrial Sensors", "MES Systems"];

export default function TechnologyIntegrations() {
  return (
    <Section size="medium" className="bg-white text-center">
      <Reveal className="relative mx-auto max-w-3xl">
        <h2
          className="text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Designed To Integrate
        </h2>
        <p className="mt-6 text-cinematic-body" style={{ color: "#5D8FBE" }}>
          SVARA integrates seamlessly with existing enterprise software,
          industrial systems, IoT devices, and operational platforms.
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
