import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";
import EcosystemContent from "./EcosystemContent";

export default function Ecosystem() {
  return (
    <Section size="medium" overflow="visible" className="w-screen">
      <Reveal className="relative mx-auto">
        <EcosystemContent />
      </Reveal>
    </Section>
  );
}
