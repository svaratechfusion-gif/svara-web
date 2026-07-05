import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const STEPS = ["Ingest", "Process", "Store", "Analyze", "Predict", "Act"];

export default function TechnologyDataPipeline() {
  return (
    <Section
      size="medium"
      className="text-center"
      style={{ background: "linear-gradient(135deg,#0F1B4D,#1D2E6D)" }}
    >
      <Reveal className="relative mx-auto max-w-3xl">
        <h2 className="text-cinematic-subheading font-extrabold text-white">
          Data Flow Architecture
        </h2>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {STEPS.map((step, i) => (
            <div key={step} className="flex items-center gap-3">
              <span
                className="rounded-full border border-white/30 px-5 py-3 text-sm font-bold text-white backdrop-blur-xl"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                {step}
              </span>
              {i < STEPS.length - 1 && (
                <span style={{ color: "#76A8D6" }}>→</span>
              )}
            </div>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-cinematic-body" style={{ color: "#A9C1E0" }}>
          SVARA transforms raw enterprise data into structured intelligence
          pipelines that continuously improve business outcomes.
        </p>
      </Reveal>
    </Section>
  );
}
