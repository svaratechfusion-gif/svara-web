import { Clock } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const ROADMAP_SLOTS = [1, 2, 3];

export default function AboutFutureRoadmap() {
  return (
    <Section size="medium" style={{ background: "var(--tint)" }}>
      <Reveal className="relative mx-auto max-w-3xl">
        <h2
          className="text-center text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Future Roadmap
        </h2>
        <div className="mt-6 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-600">
            <Clock size={12} />
            Placeholder — awaiting content
          </span>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          {ROADMAP_SLOTS.map((slot) => (
            <div
              key={slot}
              className="rounded-2xl border border-dashed border-[#DCE6F2] bg-white p-5"
            >
              <p className="text-sm italic" style={{ color: "#5D8FBE" }}>
                [Roadmap item pending.]
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
