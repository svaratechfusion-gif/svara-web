import { Mail } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

export default function InvestorsContact() {
  return (
    <Section
      size="medium"
      className="text-center"
      style={{ background: "linear-gradient(135deg,#0F1B4D,#1D2E6D)" }}
    >
      <Reveal className="relative mx-auto max-w-2xl">
        <h2 className="text-cinematic-subheading font-extrabold text-white">
          Investor Contact
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-cinematic-body" style={{ color: "#A9C1E0" }}>
          For investment discussions, strategic partnerships, and advisory
          conversations, reach out to the SVARA TechFusion team.
        </p>
        <a
          href="mailto:contact@svaratechfusion.com"
          className="btn-glow-pulse mt-10 inline-flex items-center gap-2 rounded-2xl border border-white/40 px-8 py-4 text-lg font-bold text-white backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white/10"
        >
          <Mail size={18} />
          contact@svaratechfusion.com
        </a>
      </Reveal>
    </Section>
  );
}
