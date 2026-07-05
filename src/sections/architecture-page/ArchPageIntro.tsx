import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

export default function ArchPageIntro() {
  return (
    <Section size="medium" className="bg-white text-center">
      <Reveal className="relative mx-auto max-w-3xl">
        <h2
          className="text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Infrastructure Defines Intelligence
        </h2>
        <p className="mt-6 text-cinematic-body" style={{ color: "#5D8FBE" }}>
          Intelligence at enterprise scale cannot be achieved through
          isolated AI models alone. It requires a resilient architecture
          capable of processing real-world signals, orchestrating
          intelligence workflows, and delivering decisions in real time.
        </p>
        <p className="mt-4 text-cinematic-body" style={{ color: "#5D8FBE" }}>
          SVARA&apos;s architecture is built to power that future.
        </p>
      </Reveal>
    </Section>
  );
}
