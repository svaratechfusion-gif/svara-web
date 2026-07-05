import Reveal from "@/components/ui/reveal";
import FoundersBackground from "./FoundersBackground";
import FoundersContent from "./FoundersContent";

export default function Founders() {
  return (
    <section className="relative overflow-hidden px-8 py-24 xl:px-12">
      <FoundersBackground />
      <Reveal className="relative mx-auto max-w-[1400px]">
        <FoundersContent />
      </Reveal>
    </section>
  );
}
