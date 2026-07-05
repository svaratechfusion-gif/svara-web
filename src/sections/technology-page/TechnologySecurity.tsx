import { Lock, UserCog, ShieldCheck, FileText, Scale, KeyRound } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const FEATURES = [
  { label: "Encryption", icon: Lock },
  { label: "Role-Based Access", icon: UserCog },
  { label: "Zero Trust Architecture", icon: ShieldCheck },
  { label: "Audit Logs", icon: FileText },
  { label: "Governance Policies", icon: Scale },
  { label: "Access Controls", icon: KeyRound },
];

export default function TechnologySecurity() {
  return (
    <Section size="medium" className="bg-white text-center">
      <Reveal className="relative mx-auto max-w-3xl">
        <h2
          className="text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Security By Design
        </h2>
        <p className="mt-6 text-cinematic-body" style={{ color: "#5D8FBE" }}>
          Security, governance, and compliance are embedded across every
          layer of the SVARA stack.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.label}
              className="flex items-center gap-3 rounded-2xl border px-4 py-4 shadow-card"
              style={{ borderColor: "rgba(220,230,242,0.8)", background: "var(--tint)" }}
            >
              <feature.icon size={18} style={{ color: "#5D8FBE" }} />
              <span className="text-sm font-semibold text-left" style={{ color: "#1D2E6D" }}>
                {feature.label}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
