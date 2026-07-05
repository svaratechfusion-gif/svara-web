import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const SYNERGIES = ["AI + Simulation", "AI + SaaS", "AI + Engineering", "Intelligence + Growth"];

export default function DivisionsSynergy() {
  return (
    <Section
      size="medium"
      className="text-center"
      style={{ background: "linear-gradient(135deg,#0F1B4D,#1D2E6D)" }}
    >
      <Reveal className="relative mx-auto max-w-3xl">
        <h2 className="text-cinematic-subheading font-extrabold text-white">
          Independent Expertise.
          <br />
          Unified Execution.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-cinematic-body" style={{ color: "#A9C1E0" }}>
          Each SVARA division operates with deep specialization while
          remaining tightly connected to the broader ecosystem. This allows
          enterprises to access focused expertise without sacrificing
          integration.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {SYNERGIES.map((synergy) => (
            <span
              key={synergy}
              className="rounded-full border border-white/30 px-5 py-3 text-sm font-bold text-white backdrop-blur-xl"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              {synergy}
            </span>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
