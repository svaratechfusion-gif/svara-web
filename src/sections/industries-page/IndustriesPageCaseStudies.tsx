import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const EXAMPLES = [
  { metric: "37%", description: "Manufacturing plant reduced operational downtime" },
  { metric: "28%", description: "Fleet intelligence improved delivery efficiency" },
  { metric: "62%", description: "Vision AI accelerated anomaly detection" },
];

export default function IndustriesPageCaseStudies() {
  return (
    <Section size="medium" className="bg-white">
      <Reveal className="relative mx-auto max-w-[1400px] text-center">
        <h2
          className="text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Intelligence In Action
        </h2>
        <p
          className="mx-auto mt-6 max-w-xl text-sm font-semibold uppercase tracking-[0.15em]"
          style={{ color: "#76A8D6" }}
        >
          Simulated example outcomes — not results from live client deployments
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {EXAMPLES.map((example) => (
            <div
              key={example.description}
              className="relative rounded-3xl border p-8 shadow-card"
              style={{ borderColor: "rgba(220,230,242,0.8)", background: "var(--tint)" }}
            >
              <span
                className="absolute right-4 top-4 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wide"
                style={{ borderColor: "rgba(220,230,242,0.8)", color: "#5D8FBE", background: "white" }}
              >
                Simulated
              </span>
              <div className="text-4xl font-extrabold" style={{ color: "#1D2E6D" }}>
                {example.metric}
              </div>
              <p className="mt-3 text-sm" style={{ color: "#5D8FBE" }}>
                {example.description}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
