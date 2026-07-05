import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

export default function ArchPageFinalCta() {
  return (
    <Section
      size="medium"
      className="text-center"
      style={{ background: "linear-gradient(135deg,#0F1B4D,#1D2E6D)" }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 30%, rgba(118,168,214,0.25) 0%, transparent 60%)",
        }}
      />
      <Reveal className="relative mx-auto max-w-2xl">
        <h2 className="text-cinematic-subheading font-extrabold text-white">
          One Architecture.
          <br />
          Infinite Intelligence.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-cinematic-body" style={{ color: "#A9C1E0" }}>
          SVARA&apos;s architecture transforms disconnected systems into
          intelligent infrastructure capable of sensing, reasoning,
          predicting, and acting at scale.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            className="btn-glow-pulse rounded-2xl bg-white px-8 py-4 text-lg font-bold shadow-card transition-all duration-300 hover:scale-105 hover:shadow-floating"
            style={{ color: "#1D2E6D" }}
          >
            Book Architecture Consultation
          </button>
          <button className="btn-glow-pulse rounded-2xl border border-white/40 px-8 py-4 text-lg font-bold text-white backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white/10">
            Talk to Architects
          </button>
        </div>
      </Reveal>
    </Section>
  );
}
