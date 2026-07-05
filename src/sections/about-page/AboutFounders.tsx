import { Clock, User } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const FOUNDER_SLOTS = [1, 2];

export default function AboutFounders() {
  return (
    <Section size="medium" className="bg-white">
      <Reveal className="relative mx-auto max-w-[1400px]">
        <h2
          className="text-center text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Founders
        </h2>
        <div className="mt-6 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-600">
            <Clock size={12} />
            Placeholder — awaiting founder details
          </span>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {FOUNDER_SLOTS.map((slot) => (
            <div
              key={slot}
              className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-[#DCE6F2] p-10 text-center shadow-card"
              style={{ background: "var(--tint)" }}
            >
              <div
                className="flex h-20 w-20 items-center justify-center rounded-full"
                style={{ background: "rgba(93,143,190,0.15)" }}
              >
                <User size={28} style={{ color: "#5D8FBE" }} />
              </div>
              <h3 className="text-base font-bold italic" style={{ color: "#5D8FBE" }}>
                [Founder name pending]
              </h3>
              <p className="text-sm italic" style={{ color: "#5D8FBE" }}>
                [Role / title pending]
              </p>
              <p className="text-sm italic" style={{ color: "#5D8FBE" }}>
                [Bio pending.]
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
