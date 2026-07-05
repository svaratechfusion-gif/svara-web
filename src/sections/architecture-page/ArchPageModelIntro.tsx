import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

export default function ArchPageModelIntro() {
  return (
    <Section size="medium" className="text-center" style={{ background: "var(--tint)" }}>
      <Reveal className="relative mx-auto max-w-3xl">
        <h2
          className="text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          The Seven-Layer
          <br />
          SVARA Architecture Stack
        </h2>
        <p className="mt-6 text-cinematic-body" style={{ color: "#5D8FBE" }}>
          SVARA operates through a modular seven-layer architecture that
          transforms raw signals into intelligent actions and continuous
          learning.
        </p>
      </Reveal>
    </Section>
  );
}
