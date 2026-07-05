import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

export default function TechnologyIntro() {
  return (
    <Section size="medium" className="bg-white text-center">
      <Reveal className="relative mx-auto max-w-3xl">
        <h2
          className="text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Technology Beyond Software
        </h2>
        <p className="mt-6 text-cinematic-body" style={{ color: "#5D8FBE" }}>
          Modern enterprise intelligence requires far more than traditional
          software. It demands systems capable of sensing real-world
          signals, processing massive data streams, reasoning across
          complex scenarios, and orchestrating actions at scale.
        </p>
        <p className="mt-4 text-cinematic-body" style={{ color: "#5D8FBE" }}>
          SVARA&apos;s technology foundation is built precisely for this
          future.
        </p>
      </Reveal>
    </Section>
  );
}
