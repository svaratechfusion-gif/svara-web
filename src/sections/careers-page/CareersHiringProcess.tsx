import { Clock } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const STEP_SLOTS = [1, 2, 3, 4];

export default function CareersHiringProcess() {
  return (
    <Section size="medium" className="text-center" style={{ background: "var(--tint)" }}>
      <Reveal className="relative mx-auto max-w-3xl">
        <h2
          className="text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Hiring Process
        </h2>
        <div className="mt-6 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-600">
            <Clock size={12} />
            Placeholder — awaiting content
          </span>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {STEP_SLOTS.map((step, i) => (
            <div key={step} className="flex items-center gap-3">
              <span
                className="rounded-full border border-dashed border-[#DCE6F2] bg-white px-5 py-3 text-sm font-bold italic"
                style={{ color: "#5D8FBE" }}
              >
                [Step {step} pending]
              </span>
              {i < STEP_SLOTS.length - 1 && (
                <span style={{ color: "#76A8D6" }}>→</span>
              )}
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
