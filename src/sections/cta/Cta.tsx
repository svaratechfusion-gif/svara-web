import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";
import CtaBackground from "./CtaBackground";
import CtaContent from "./CtaContent";

export default function Cta() {
  return (
    <Section size="large">
      <CtaBackground />
      <Reveal className="relative mx-auto max-w-[1400px]">
        <CtaContent />
      </Reveal>
    </Section>
  );
}
