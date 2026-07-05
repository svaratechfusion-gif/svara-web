import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

export default function IndustriesPageIntro() {
  return (
    <Section size="medium" className="bg-white text-center">
      <Reveal className="relative mx-auto max-w-3xl">
        <h2
          className="text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Every Industry Has Unique Complexity
        </h2>
        <p className="mt-6 text-cinematic-body" style={{ color: "#5D8FBE" }}>
          No two industries operate the same way. Different workflows,
          infrastructure, operational risks, and decision cycles demand
          specialized intelligence systems.
        </p>
        <p className="mt-4 text-cinematic-body" style={{ color: "#5D8FBE" }}>
          SVARA delivers domain-aware AI infrastructure built for
          industry-specific transformation.
        </p>
      </Reveal>
    </Section>
  );
}
