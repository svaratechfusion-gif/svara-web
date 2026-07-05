import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

export default function InsightsIntro() {
  return (
    <Section size="medium" className="bg-white text-center">
      <Reveal className="relative mx-auto max-w-3xl">
        <h2
          className="text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Intelligence Evolves Through Knowledge
        </h2>
        <p className="mt-6 text-cinematic-body" style={{ color: "#5D8FBE" }}>
          The future of industry will be shaped by how intelligently
          organizations learn, adapt, and evolve. SVARA Insights publishes
          research-backed perspectives, product innovations, case studies,
          and strategic intelligence shaping tomorrow&apos;s enterprise
          landscape.
        </p>
      </Reveal>
    </Section>
  );
}
