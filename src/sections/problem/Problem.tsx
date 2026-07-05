import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";
import ProblemContent from "./ProblemContent";

export default function Problem() {
  return (
    <Section size="large">
      <Reveal className="relative z-10 mx-auto max-w-[1600px]">
        <ProblemContent />
      </Reveal>
    </Section>
  );
}
