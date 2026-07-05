import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";
import IndustriesContent from "./IndustriesContent";

export default function Industries() {
  return (
    <Section size="large">
      <Reveal className="relative mx-auto max-w-[1400px]">
        <IndustriesContent />
      </Reveal>
    </Section>
  );
}
