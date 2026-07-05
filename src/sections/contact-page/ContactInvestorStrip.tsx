import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

export default function ContactInvestorStrip() {
  return (
    <Section
      size="medium"
      className="text-center"
      style={{ background: "linear-gradient(135deg,#0F1B4D,#1D2E6D)" }}
    >
      <Reveal className="relative mx-auto max-w-2xl">
        <h2 className="text-cinematic-subheading font-extrabold text-white">
          Interested In Building
          <br />
          The Future With SVARA?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-cinematic-body" style={{ color: "#A9C1E0" }}>
          We welcome conversations with strategic investors, advisors, and
          ecosystem partners interested in shaping the future of enterprise
          intelligence.
        </p>
        <button className="btn-glow-pulse mt-10 rounded-2xl border border-white/40 px-8 py-4 text-lg font-bold text-white backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white/10">
          Investor Relations →
        </button>
      </Reveal>
    </Section>
  );
}
