import { Clock } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const MILESTONE_SLOTS = [1, 2, 3];

export default function AboutMilestones() {
  return (
    <Section size="medium" className="bg-white">
      <Reveal className="relative mx-auto max-w-3xl">
        <h2
          className="text-center text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Milestones
        </h2>
        <div className="mt-6 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-600">
            <Clock size={12} />
            Placeholder — awaiting content
          </span>
        </div>

        <div
          className="mt-10 flex flex-col gap-4 border-l-2 pl-6"
          style={{ borderColor: "rgba(220,230,242,0.8)" }}
        >
          {MILESTONE_SLOTS.map((slot) => (
            <div
              key={slot}
              className="rounded-2xl border border-dashed border-[#DCE6F2] p-5"
              style={{ background: "var(--tint)" }}
            >
              <span className="text-xs font-bold italic" style={{ color: "#76A8D6" }}>
                [Date pending]
              </span>
              <p className="mt-1 text-sm italic" style={{ color: "#5D8FBE" }}>
                [Milestone description pending.]
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
