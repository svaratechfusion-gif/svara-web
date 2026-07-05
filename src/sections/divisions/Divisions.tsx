import Reveal from "@/components/ui/reveal";
import DivisionsBackground from "./DivisionsBackground";
import DivisionsContent from "./DivisionsContent";

export default function Divisions() {
  return (
    <section className="relative overflow-hidden px-8 py-24 xl:px-12">
      <DivisionsBackground />
      <Reveal className="relative mx-auto max-w-[1400px]">
        <DivisionsContent />
      </Reveal>
    </section>
  );
}
