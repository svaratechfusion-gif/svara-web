import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";
import WhySvaraContent from "./WhySvaraContent";

export default function WhySvara() {
  return (
    <Section size="small">
      <Reveal className="relative mx-auto max-w-[1600px]">
        <WhySvaraContent />
      </Reveal>
    </Section>
  );
}
