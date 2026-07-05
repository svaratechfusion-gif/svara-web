import { Clock } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const VALUE_SLOTS = ["01", "02", "03", "04"];

export default function AboutCoreValues() {
  return (
    <Section size="medium" style={{ background: "var(--tint)" }}>
      <Reveal className="relative mx-auto max-w-[1400px]">
        <h2
          className="text-center text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Core Values
        </h2>
        <div className="mt-6 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-600">
            <Clock size={12} />
            Placeholder — awaiting content
          </span>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUE_SLOTS.map((slot) => (
            <div
              key={slot}
              className="rounded-3xl border border-dashed border-[#DCE6F2] bg-white p-6 shadow-card transition-all duration-300 hover:glow-lift"
            >
              <span className="text-xs font-bold" style={{ color: "#76A8D6" }}>
                {slot}
              </span>
              <h3 className="mt-3 text-base font-bold italic" style={{ color: "#5D8FBE" }}>
                [Value name pending]
              </h3>
              <p className="mt-2 text-sm italic" style={{ color: "#5D8FBE" }}>
                [Value description pending.]
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
