import Reveal from "@/components/ui/reveal";
import FaqBackground from "./FaqBackground";
import FaqContent from "./FaqContent";

export default function Faq() {
  return (
    <section className="relative overflow-hidden px-8 py-24 xl:px-12">
      <FaqBackground />
      <Reveal className="relative mx-auto max-w-[1400px]">
        <FaqContent />
      </Reveal>
    </section>
  );
}
