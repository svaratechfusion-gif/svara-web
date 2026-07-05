import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

export default function DivisionsIntro() {
  return (
    <Section size="medium" className="bg-white text-center">
      <Reveal className="relative mx-auto max-w-3xl">
        <h2
          className="text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Building The Future Requires Specialized Excellence
        </h2>
        <p className="mt-6 text-cinematic-body" style={{ color: "#5D8FBE" }}>
          Modern enterprise transformation cannot be solved by isolated
          tools or generic software vendors. It requires deep specialization
          across AI, simulation, software engineering, infrastructure, and
          market acceleration.
        </p>
        <p className="mt-4 text-cinematic-body" style={{ color: "#5D8FBE" }}>
          SVARA brings these capabilities together under one unified
          ecosystem.
        </p>
      </Reveal>
    </Section>
  );
}
