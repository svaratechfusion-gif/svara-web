import { Building2, PlayCircle, TrendingUp, Handshake, Newspaper, Briefcase } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const INTENTS = [
  {
    name: "Enterprise Solutions",
    description: "For organizations exploring AI adoption and digital transformation.",
    cta: "Explore Solutions",
    icon: Building2,
  },
  {
    name: "Product Demo",
    description: "Experience SVARA products in action.",
    cta: "Schedule Demo",
    icon: PlayCircle,
  },
  {
    name: "Investor Relations",
    description: "Explore funding, strategic investment, and growth opportunities.",
    cta: "Connect With Team",
    icon: TrendingUp,
  },
  {
    name: "Partnerships",
    description: "Technology, integration, channel, and ecosystem partnerships.",
    cta: "Partner With Us",
    icon: Handshake,
  },
  {
    name: "Media & PR",
    description: "Press, interviews, speaking opportunities, and media collaborations.",
    cta: "Contact Media Desk",
    icon: Newspaper,
  },
  {
    name: "Careers",
    description: "Join our mission to engineer intelligence.",
    cta: "View Opportunities",
    icon: Briefcase,
  },
];

export default function ContactRouting() {
  return (
    <Section size="medium" style={{ background: "var(--tint)" }}>
      <Reveal className="relative mx-auto max-w-[1400px]">
        <h2
          className="text-center text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          What Brings You To SVARA?
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INTENTS.map((intent) => (
            <div
              key={intent.name}
              className="flex flex-col items-start gap-4 rounded-3xl border border-[#DCE6F2] bg-white p-8 shadow-card transition-all duration-300 hover:glow-lift"
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{ background: "linear-gradient(135deg,#1D2E6D,#5D8FBE)" }}
              >
                <intent.icon size={22} color="white" />
              </div>
              <h3 className="text-lg font-bold" style={{ color: "#1D2E6D" }}>
                {intent.name}
              </h3>
              <p className="text-sm" style={{ color: "#5D8FBE" }}>
                {intent.description}
              </p>
              <span
                className="mt-auto text-sm font-bold"
                style={{ color: "#1D2E6D" }}
              >
                {intent.cta} →
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
