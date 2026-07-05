import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

export default function EcosystemIntro() {
  return (
    <Section size="medium" className="bg-white text-center">
      <Reveal className="relative mx-auto max-w-3xl">
        <h2
          className="text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Intelligence Should Not Exist In Silos
        </h2>
        <p className="mt-6 text-cinematic-body" style={{ color: "#5D8FBE" }}>
          Most enterprises operate across disconnected software, fragmented
          data sources, and isolated operational systems. SVARA eliminates
          these silos by building a unified intelligence ecosystem where data
          flows seamlessly into decisions and actions.
        </p>
      </Reveal>
    </Section>
  );
}
