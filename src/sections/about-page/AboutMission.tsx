import { Clock } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

export default function AboutMission() {
  return (
    <Section size="medium" className="text-center" style={{ background: "var(--tint)" }}>
      <Reveal className="relative mx-auto max-w-3xl">
        <h2
          className="text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Mission
        </h2>

        <span className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-600">
          <Clock size={12} />
          Placeholder — awaiting content
        </span>

        <p className="mx-auto mt-6 max-w-2xl text-cinematic-body italic" style={{ color: "#5D8FBE" }}>
          [Mission statement pending.]
        </p>
      </Reveal>
    </Section>
  );
}
