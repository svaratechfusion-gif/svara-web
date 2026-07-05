import { Clock } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const REASON_SLOTS = ["01", "02", "03"];

export default function CareersWhyJoin() {
  return (
    <Section size="medium" className="bg-white">
      <Reveal className="relative mx-auto max-w-[1400px]">
        <h2
          className="text-center text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Why Join SVARA
        </h2>
        <div className="mt-4 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-600">
            <Clock size={12} />
            Placeholder — awaiting content
          </span>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {REASON_SLOTS.map((slot) => (
            <div
              key={slot}
              className="rounded-3xl border border-dashed border-[#DCE6F2] bg-white p-8 shadow-card transition-all duration-300 hover:glow-lift"
              style={{ background: "var(--tint)" }}
            >
              <span className="text-xs font-bold" style={{ color: "#76A8D6" }}>
                {slot}
              </span>
              <h3 className="mt-3 text-base font-bold italic" style={{ color: "#5D8FBE" }}>
                [Reason title pending]
              </h3>
              <p className="mt-2 text-sm italic" style={{ color: "#5D8FBE" }}>
                [Reason description pending.]
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
