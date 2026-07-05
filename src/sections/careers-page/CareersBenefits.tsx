import { Clock } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const BENEFIT_SLOTS = ["01", "02", "03", "04"];

export default function CareersBenefits() {
  return (
    <Section size="medium" className="bg-white">
      <Reveal className="relative mx-auto max-w-[1400px]">
        <h2
          className="text-center text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Benefits
        </h2>
        <div className="mt-4 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-600">
            <Clock size={12} />
            Placeholder — awaiting content
          </span>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFIT_SLOTS.map((slot) => (
            <div
              key={slot}
              className="rounded-3xl border border-dashed border-[#DCE6F2] p-6 shadow-card"
              style={{ background: "var(--tint)" }}
            >
              <span className="text-xs font-bold" style={{ color: "#76A8D6" }}>
                {slot}
              </span>
              <h3 className="mt-3 text-base font-bold italic" style={{ color: "#5D8FBE" }}>
                [Benefit pending]
              </h3>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
